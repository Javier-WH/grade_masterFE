import { Navigate, Outlet } from "react-router-dom";


const useAuth =()=>{
  const admin = sessionStorage.getItem("admin")

  if(!admin){
    return false
  }
  return true
}

const ProtectedAdmin= () =>{
  const isAuth = useAuth();
  return isAuth ? <Outlet/> : <Navigate to="/" />
}

export default ProtectedAdmin