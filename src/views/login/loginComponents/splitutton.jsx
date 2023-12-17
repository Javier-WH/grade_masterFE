import PropTypes from "prop-types";
import { SplitButton } from 'primereact/splitbutton';
import loginTutor from '../functions/loginTutor.js';
import loginAdmin from '../functions/loginAdmin.js'
import loginTeacher from "../functions/loginTeacher.js";
import { ToastContext } from '../../../context/toastContext.jsx';
import { useContext } from "react";
import {useNavigate} from 'react-router-dom';

export default function LoginButton ({loading, setLoading, action, userValue, passValue}) {

    const {showToast} = useContext(ToastContext)
    const navigate = useNavigate()

    const items = [
        {
            label: 'Ingresar como Administrador',
            icon: 'pi pi-star',
            command: () => {
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
                      sessionStorage.setItem('admin', true);
                      loginAdmin(id).then(()=>{
                         navigate("/admin");
                      }).catch(error => {
                      setLoading(false)
                      showToast({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message
                      });
                    })
                    }).catch(error => {
                      setLoading(false)
                      showToast({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message
                      });
                    })
            }
        },
        {
            label: 'Ingresar como representante',
            icon: 'pi pi-pencil',
            command: () => {
               loginTutor()
            }
        }
    ];

    return (
        <div className="card flex justify-content-center">
            <SplitButton 
              label={loading ? 'Espere...' : 'Ingresar'}  
              severity={loading ? 'secondary' : ''}  
              icon="pi pi-reply" 
              onClick={action} 
              model={items} 
              loading={loading} 
              className={loading ? 'disabled' : ''}
              style={{width: "100%"}} />
        </div>
    )
}
        
LoginButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  userValue: PropTypes.string.isRequired, 
  passValue: PropTypes.string.isRequired
};