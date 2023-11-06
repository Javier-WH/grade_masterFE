import {createBrowserRouter} from "react-router-dom"
import Login from '../views/login/login.jsx'
import Logo from "../views/logo/logo.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <h1>Ocurrió un error inesperado</h1>

  },
  {
    path: "/hola",
    element: <h1>Hola!!!!!!</h1>,
    errorElement: <h1>Ocurrió un error inesperado</h1>
  }
]);

export default router

