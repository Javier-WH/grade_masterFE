import { useContext, useState } from 'react'
import Container from '../../components/container/container.jsx'
import UserInput from '../../components/inputs/userInput.jsx'
import BasicPassword from '../../components/inputs/passwordInput.jsx'
import { Button } from 'primereact/button';
import {useNavigate} from 'react-router-dom';
import { GlobalContext } from '../../context/globalContext.jsx';
import Logo from '../logo/logo.jsx';
import './login.css'

export default function Login(){

  const navigate = useNavigate()
  const {setToast} = useContext(GlobalContext)
  const [passValue, setPassValue] = useState("")
  const [userValue, setUserValue] = useState("")

  const handleLogin = ()=>{
    navigate("/hola")
    setToast({severity: 'success', summary: 'exito', detail: 'detalles'})
  }

  return (
    <>
    <Logo/>
      <div className='login-container'>
        <UserInput userValue= {userValue} setUserValue={setUserValue}/>
        <BasicPassword passValue ={passValue} setPassValue={setPassValue}/>
        <Button label='Ingresar' icon='pi pi-reply' onClick={handleLogin}/>
        <div id='passRecovery-container'>
          <span className ='passRecovery-text'>Olvidé mi contraseña</span>
          <span className ='passRecovery-text'>Registrarse</span>
        </div>
      </div>
    </>
  )

}


