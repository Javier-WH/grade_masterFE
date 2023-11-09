import {createBrowserRouter} from "react-router-dom"
import Login from '../views/login/login.jsx'
import TeacherPanel from "../views/teacherPanel/teacherPanel.jsx";
import NotFoundPage from "../components/notFound/notFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <NotFoundPage/>

  },
  {
    path: "/teacher",
    element: <TeacherPanel/>,
    errorElement: <NotFoundPage/>
  }
]);

export default router

