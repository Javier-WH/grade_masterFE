import {createBrowserRouter} from "react-router-dom"
import Login from '../views/login/login.jsx'
import TeacherPanel from "../views/teacherPanel/teacherPanel.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <h1>Ocurrió un error inesperado</h1>

  },
  {
    path: "/teacher",
    element: <TeacherPanel/>,
    errorElement: <h1>Ocurrió un error inesperado</h1>
  }
]);

export default router

