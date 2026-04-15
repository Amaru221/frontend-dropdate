import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    children: [
      {path: '/', element: <Home />},
      {path: '/profile', element: <></>},
      {path: '/calendar', element: <></>},
      {path: '/calendar', element: <></>},
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
