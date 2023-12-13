import {useContext, useEffect, useState } from 'react'
import UserInput from '../../components/inputs/userInput.jsx'
import BasicPassword from '../../components/inputs/passwordInput.jsx'
import { Button } from 'primereact/button';
import useLogin from '../../hooks/useLogin.jsx';
import {useNavigate} from 'react-router-dom';
import { ToastContext } from '../../context/toastContext.jsx';
import Logo from '../logo/logo.jsx';
import { ProgressBar } from 'primereact/progressbar'
import { useEventListener } from 'primereact/hooks';
import './login.css'


export default function Login(){

  const navigate = useNavigate()
  
  const {showToast} = useContext(ToastContext)
  const [passValue, setPassValue] = useState("")
  const [userValue, setUserValue] = useState("")
  const [data, setData] = useLogin()
  const [loading, setLoading]= useState(false)


  const handleLogin = async ()=>{
    setLoading(true)
    setData({
      user: userValue,
      password: passValue
    })
  }

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
    setLoading(false)
  }, [data, showToast, navigate]);
  

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
        <Button 
          label= {loading ? 'Espere...' : 'Ingresar'} 
          severity={loading ? 'secondary' : ''} 
          icon={loading ? 'pi pi-spin pi-spinner' : 'pi pi-reply'} 
          className={loading ? 'disabled' : ''}
          onClick={handleLogin
        }/>
        <div id='passRecovery-container'>
          <span className ='passRecovery-text'>Olvidé mi contraseña</span>
          <span className ='passRecovery-text'>Registrarse</span>
        </div>
      </div>
    </>
  )

}


