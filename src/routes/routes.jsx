import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../views/login/login.jsx';
import TeacherPanel from "../views/teacherPanel/teacherPanel.jsx";
import NotFoundPage from "../components/notFound/notFound.jsx";
import ProtectedRoutes from "./protected.jsx";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Login/>} path="/"/>
        <Route element={<ProtectedRoutes/>} >
          <Route element={<TeacherPanel/>} path="/teacher" />
        </Route>
        <Route element={<NotFoundPage/>} path="*" />
      </Routes>
    </Router>
  );
};

export default AppRouter;