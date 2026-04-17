import React, { useState, useContext } from 'react';
import api from '../api/http';
import { AuthContext } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import '../index.css'

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeSection, setActiveSection] = useState('session');
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (activeSection === 'forgot') {
            try {
                await api.post('/forgot-password', { email });
                toast.success("Si el correo está registrado, recibirás un enlace pronto.");
                setActiveSection('session');
            } catch (err) {
                toast.error("Error al procesar la solicitud");
            } finally {
                setLoading(false);
            }
            return;
        }

        const endpoint = activeSection === 'session' ? '/login' : '/register';

        try {
            const res = await api.post(endpoint, { email, password });
            login(res.data.token, res.data.user.email);
            toast.success(activeSection === 'session' ? "Bienvenido de nuevo" : "Cuenta creada con éxito");
            navigate(redirect);
        } catch (err) {
            toast.error(err.response?.data?.message || "Hubo un error en la operación");
            setLoading(false);
        }
    };

    const loginGoogle = async (googleToken) => {
        setLoading(true);
        try {
            const res = await api.post('/login/google', { credential: googleToken });
            login(res.data.token, res.data.user.email);
            toast.success("Sesión iniciada con Google");
            navigate(redirect);
        } catch (err) {
            toast.error("Error al autenticar con Google");
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0f1a]">
            
            {/* TOAST */}
            <Toaster position="top-right" />

            {/* SMOKE BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none smoke-layer">
                <div className="smoke smoke1" />
                <div className="smoke smoke2" />
                <div className="smoke smoke3" />
                <div className="smoke smoke4" />
            </div>

            {/* LOADING OVERLAY */}
            {loading && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
            )}

            {/* CARD */}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 text-white">
                
                {/* TABS */}
                <div className="flex mb-6 bg-white/5 rounded-xl p-1">
                    <button
                        onClick={() => setActiveSection('session')}
                        className={`flex-1 py-2 rounded-lg text-sm transition ${
                            activeSection === 'session' ? 'bg-white text-black' : 'text-white/70'
                        }`}
                    >
                        Iniciar sesión
                    </button>
                    <button
                        onClick={() => setActiveSection('register')}
                        className={`flex-1 py-2 rounded-lg text-sm transition ${
                            activeSection === 'register' ? 'bg-white text-black' : 'text-white/70'
                        }`}
                    >
                        Registro
                    </button>
                </div>

                <h2 className="text-2xl font-semibold mb-6 text-center">
                    {activeSection === 'session' ? 'Bienvenido' : 'Crea tu cuenta'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />

                    {activeSection !== 'forgot' && (
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:scale-[1.02] transition"
                    >
                        {activeSection === 'session' && 'ENTRAR'}
                        {activeSection === 'register' && 'REGISTRARME'}
                        {activeSection === 'forgot' && 'ENVIAR ENLACE'}
                    </button>
                </form>

                {activeSection === 'session' && (
                    <p
                        onClick={() => setActiveSection('forgot')}
                        className="mt-4 text-sm text-white/60 cursor-pointer hover:text-white text-center"
                    >
                        ¿Olvidaste tu contraseña?
                    </p>
                )}

                {activeSection === 'forgot' && (
                    <p
                        onClick={() => setActiveSection('session')}
                        className="mt-4 text-sm text-emerald-400 cursor-pointer hover:text-emerald-300 text-center"
                    >
                        Volver al inicio de sesión
                    </p>
                )}

                <div className="my-6 text-center text-white/40 text-sm">o continúa con</div>

                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={(res) => loginGoogle(res.credential)}
                        onError={() => toast.error("Error al conectar cuenta de Google")}
                        theme="outline"
                        shape="pill"
                    />
                </div>
            </div>
        </div>
    );
}