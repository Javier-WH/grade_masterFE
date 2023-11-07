import { useContext, useState } from 'react'
import UserInput from '../../components/inputs/userInput.jsx'
import BasicPassword from '../../components/inputs/passwordInput.jsx'
import { Button } from 'primereact/button';
import {useNavigate} from 'react-router-dom';
import { ToastContext } from '../../context/toastContext.jsx';
//import { ConfirmDialogContext } from '../../context/confirmDialogoContext.jsx';
import Logo from '../logo/logo.jsx';
import './login.css'

export default function Login(){

  const navigate = useNavigate()
  const { showToast } = useContext(ToastContext)
  //const { showConfirmDialog} = useContext(ConfirmDialogContext);
  const [passValue, setPassValue] = useState("")
  const [userValue, setUserValue] = useState("")

 /* const handleDialog = option =>{
    alert(option)
  }*/

  const handleLogin = ()=>{
    navigate("/teacher")
    showToast(
      {
        severity: 'success', 
        summary: 'Hola', 
        detail: 'Esto es una prueba'
      }
      )
    /*showConfirmDialog(
      {
        header: 'Advertencia', 
        icon:'', 
        message: 'Desea Guardar los cambios',
        action: ()=> handleDialog
      }
    );*/
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


