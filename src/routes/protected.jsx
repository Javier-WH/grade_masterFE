import { Navigate, Outlet } from "react-router-dom";


const useAuth =()=>{
  const Authorization = sessionStorage.getItem("Authorization")
  const id = sessionStorage.getItem("id")
  
  if(!Authorization || !id){
    return false
  }
  return true
}

const ProtectedRoutes = () =>{
  const isAuth = useAuth();
  return isAuth ? <Outlet/> : <Navigate to="/" />
}

export default ProtectedRoutes