
import { useState } from "react";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import PropTypes from "prop-types";

export default function NewPasswordInput({passValue, setPassValue}) {
    
    
    const [lowerCase, setLowerCase] = useState(false)
    const [upperCase, setUpperCase] = useState(false)
    const [number, setNumber] = useState(false)
    const [length, setLength] = useState(false)

    const onChangeHandler = e =>{
        const inputValue = e.target.value
        setPassValue(inputValue)
        setLowerCase( /[a-z]/.test(inputValue))
        setUpperCase( /[A-Z]/.test(inputValue))
        setNumber( /[0-9]/.test(inputValue))
        setLength( /^.{8,}$/.test(inputValue))
    }
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Requisitos</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li className={lowerCase ? "invisible" : ""}>Al menos una minúscula</li>
                <li className={upperCase ? "invisible" : ""}>Al menos una mayúscula</li>
                <li className={number ? "invisible" : ""}>Al menos un número</li>
                <li className={length ? "invisible" : ""}>Al menos 8 caracteres</li>
            </ul>
        </>
    );

    return (
           <span className="p-float-label p-input-icon-left">
            <Password 
            id="login-password" 
            value={passValue} 
            onChange={onChangeHandler} 
            footer={footer} 
            promptLabel="Ingresa una contraseña" 
            weakLabel="Muy débil" 
            mediumLabel="Promedio" 
            strongLabel="Contraseña fuerte"
            toggleMask/>
            <label htmlFor="login-password">Contraseña</label>
           </span>
    )
}

NewPasswordInput.propTypes = {
  passValue: PropTypes.string.isRequired,
  setPassValue: PropTypes.func.isRequired,
};