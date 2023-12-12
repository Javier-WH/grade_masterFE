import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";

export default function UserInput({userValue, setUserValue, loading}) {
   
  return (
    <span className="p-float-label p-input-icon-left">
         <i className="pi pi-user" />
        <InputText
          id="username" 
          value={userValue} 
          onChange={(e) => setUserValue(e.target.value)} 
          style={{width: "100%"}}
          disabled={loading}
         />
        <label htmlFor="username">Usuario</label>
    </span>
  )
}

UserInput.propTypes = {
  userValue: PropTypes.string.isRequired,
  setUserValue: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};