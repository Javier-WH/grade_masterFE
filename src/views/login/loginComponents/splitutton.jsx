import PropTypes from "prop-types";
import { SplitButton } from 'primereact/splitbutton';
import loginTutor from '../functions/loginTutor.js';
import loginAdmin from '../functions/loginAdmin.js'


export default function LoginButton ({loading, setLoading, action}) {

    const items = [
        {
            label: 'Ingresar como Administrador',
            icon: 'pi pi-star',
            command: () => {
                loginAdmin()
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
  action: PropTypes.func.isRequired
};