import {useContext, useEffect, useState } from 'react'
import UserInput from '../../components/inputs/userInput.jsx'
import BasicPassword from '../../components/inputs/passwordInput.jsx'
import { Button } from 'primereact/button';
import useLogin from '../../hooks/useLogin.jsx';
import {useNavigate} from 'react-router-dom';
import { ToastContext } from '../../context/toastContext.jsx';
//import { ConfirmDialogContext } from '../../context/confirmDialogoContext.jsx';
import Logo from '../logo/logo.jsx';
import './login.css'

export default function Login(){

  const navigate = useNavigate()
  
  const {showToast} = useContext(ToastContext)
  const [passValue, setPassValue] = useState("")
  const [userValue, setUserValue] = useState("")
  const [data, setData] = useLogin()



  const handleLogin = async ()=>{
    setData({
      user: userValue,
      password: passValue
    })
  }

 useEffect(() => {
    const { error, id, Authorization } = data;
    if (error) {
      showToast({
        severity: 'error',
        summary: 'Error',
        detail: error
      });
    } else if (id && Authorization) {
      sessionStorage.setItem('Authorization', Authorization);
      sessionStorage.setItem('id', id);
      navigate("/teacher");
    }
  }, [data, showToast, navigate]);

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


