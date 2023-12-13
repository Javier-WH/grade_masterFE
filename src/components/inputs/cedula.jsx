import { InputNumber } from 'primereact/inputnumber';
import PropTypes from "prop-types";

export default function Cedula({ value, setValue, label, klass, id }) {
      return <span className={`p-float-label ${klass}`} style={{width: '100%'}}>
        <InputNumber id={id}  inputId="input-ci" className="TP-ci" value={value} onValueChange={(e) => setValue(e.value)}  locale="de-DE" /> 
        <label htmlFor={id}>{label ? label : "Cedula"}</label>
      </span>
}

Cedula.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string,
  klass: PropTypes.string,
  id: PropTypes.string.isRequired,
};