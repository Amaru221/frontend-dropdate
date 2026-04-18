import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const api = axios.create({
  //Para DEV
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:8000/api',
  //Para PROD
  //baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085/api',
});


api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers = config.headers || {};
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Interceptor de response para detectar JWT expirado
api.interceptors.response.use(
  response => response, // si todo va bien, devuelve la respuesta
  error => {
    if (error.response?.status === 401) {
      // Comprueba si el mensaje del backend indica que el token expiró
      const message = error.response.data?.message || '';
      if (message.toLowerCase().includes('expired jwt token')) {
        // Cerrar sesión automáticamente
        localStorage.removeItem('token');
        toast.error("La sesión ha expirado. Por favor, inicia sesión de nuevo.", {
          toastId: "session-expired-error", // ID único para evitar duplicados
        });
        window.location.reload(); // Recarga la página para que el estado de autenticación se actualice
      }
    }
    return Promise.reject(error); // propaga el error
  }
);

export const patchWithMerge = (url, data) =>
  api.patch(url, data, {
    headers: { 
      ...api.defaults.headers,
      'Content-Type': 'application/merge-patch+json' }
  });


export default api;