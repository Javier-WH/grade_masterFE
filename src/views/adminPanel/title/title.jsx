import { Button } from 'primereact/button';
import './title.css'
import { useNavigate } from 'react-router-dom';

export default function Title (){
  const navigate = useNavigate()

  const handleLogOut = ()=>{
    sessionStorage.clear();
    navigate("/");
  }
  return <div className="AP-title-container">
    <span>Panel de Administración</span>
    <Button label="Salir" severity="secondary" text  onClick={handleLogOut}/>
  </div>
}