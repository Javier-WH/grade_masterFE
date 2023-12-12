import { Password } from 'primereact/password';
import PropTypes from "prop-types";

export default function BasicPassword({passValue, setPassValue, label, loading}) {
    


    return (
          <span className="p-float-label ">
            <Password
              id='pass'  
              inputStyle={{width: "100%"}}
              style={{width: "100%"}}
              value={passValue} 
              onChange={(e) => setPassValue(e.target.value)} 
              feedback={false} 
              tabIndex={1} 
              toggleMask
              disabled = {loading}
             />
            <label htmlFor="pass">{label ? label : "Contraseña"}</label>
         </span>
    )
}

BasicPassword.propTypes = {
  passValue: PropTypes.string.isRequired,
  setPassValue: PropTypes.func.isRequired,
  label: PropTypes.string,
  loading: PropTypes.bool
};