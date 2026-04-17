import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home'
import { Login } from "./pages/Login";
import Calendar from "./pages/Calendar";

const router = createBrowserRouter([
  {
    children: [
      {path: '/', element: <Home />},
      {path: '/login', element: <Login />},
      {path: '/profile', element: <></>},
      {path: '/calendar', element: <Calendar/>},
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
