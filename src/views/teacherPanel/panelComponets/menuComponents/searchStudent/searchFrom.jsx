import PropTypes from "prop-types"
import Cedula from "../../../../../components/inputs/cedula.jsx";
import TextInput from "../../../../../components/inputs/textInput.jsx";
import { useState } from "react";
import { Button } from 'primereact/button';

export default function SearchFrom({setStudent}){
  const [ciValue, setCiValue] = useState()
  const [nameValue, setNameValue] = useState("")
  const [lastNameValue, setLastNameValue] = useState("")
  const [loading, setLoading] = useState(false)

  return <>
    <Cedula value={ciValue} setValue={setCiValue} id="SE-ci-input" klass = "SE-input"/>
    <TextInput label = "Nombre del Estudiante" id="SE-name-input" setText = {setNameValue} text = {nameValue} klass = "SE-input"/>
    <TextInput label = "Apellido del Estudiante" id="SE-lastName-input" setText = {setLastNameValue} text = {lastNameValue} klass = "SE-input"/>
    <div className="SE-buton-container">
      <Button 
        label= 'Cerrar'
        severity='secondary'
        icon='pi pi-map'
      />
      <Button 
        label= {loading ? 'Espere...' : 'Buscar'} 
        severity={loading ? 'secondary' : ''} 
        icon={loading ? 'pi pi-spin pi-spinner' : 'pi pi-search'} 
        className={loading ? 'disabled' : ''}
      />
    </div>
  </>

}

SearchFrom.propTypes = {
  setStudent: PropTypes.func.isRequired,
};