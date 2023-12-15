import {useContext, useEffect, useState } from 'react'
import UserInput from '../../components/inputs/userInput.jsx'
import BasicPassword from '../../components/inputs/passwordInput.jsx'
import LoginButton from './loginComponents/splitutton.jsx';
import {useNavigate} from 'react-router-dom';
import { ToastContext } from '../../context/toastContext.jsx';
import Logo from '../logo/logo.jsx';
import { ProgressBar } from 'primereact/progressbar'
import { useEventListener } from 'primereact/hooks';
import loginTeacher from './functions/loginTeacher.js';
import './login.css'


export default function Login(){

  const navigate = useNavigate()
  
  const {showToast} = useContext(ToastContext)
  const [passValue, setPassValue] = useState("")
  const [userValue, setUserValue] = useState("")
  const [loading, setLoading]= useState(false)

  //cuando se pisa la tecla enter, intenta hacer login
  const [bindKeyUp, unbindKeyUp] = useEventListener({
      type: 'keyup',
      listener: (e) => {
        if(e.code === 'Enter'){
          handleLogin()
        }
      }
  }); 
  useEffect(() => {
    bindKeyUp();
    return () => {   
        unbindKeyUp();
    };
  }, [bindKeyUp, unbindKeyUp]);


  const handleLogin = async ()=>{
    if(userValue.length === 0 ){
      showToast({
        severity: 'warn',
        summary: 'Advertencia',
        detail: "Debe suministrar un nombre de usuario"
      });
      return
    }
    if(passValue.length === 0 ){
      showToast({
        severity: 'warn',
        summary: 'Advertencia',
        detail: "Debe suministrar una contraseña"
      });
      return
    }
    setLoading(true)
    loginTeacher(userValue, passValue)
    .then(({ id, Authorization }) =>{
      setLoading(false)
      sessionStorage.setItem('Authorization', Authorization);
      sessionStorage.setItem('id', id);
      navigate("/teacher");
    }).catch(error => {
      setLoading(false)
      showToast({
        severity: 'error',
        summary: 'Error',
        detail: error.message
      });
    })
  }

  return (
    <>
      <Logo/>
      <div id='login-progress-container'>
        <ProgressBar mode='indeterminate' id='login-progress-bar' className={ loading ? '' : 'hideBar'}/>
      </div>
      <div className='login-container'>
        <UserInput 
          userValue= {userValue} 
          setUserValue={setUserValue}
          loading = {loading}
          
        />
        <BasicPassword 
          passValue ={passValue} 
          setPassValue={setPassValue}
          loading = {loading}
        />
        <LoginButton
          loading = {loading}
          setLoading = {setLoading}
          action = {handleLogin}
        />

        <div id='passRecovery-container'>
          <span className ='passRecovery-text'>Olvidé mi contraseña</span>
          <span className ='passRecovery-text'>Registrarse</span>
        </div>
      </div>
    </>
  )

}


