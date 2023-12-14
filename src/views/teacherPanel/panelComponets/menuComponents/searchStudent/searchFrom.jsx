import PropTypes from "prop-types"
import Cedula from "../../../../../components/inputs/cedula.jsx";
import TextInput from "../../../../../components/inputs/textInput.jsx";
import { useContext, useState } from "react";
import fetchAStudent from "../../../../../fetch/fetchAStudent.js";
import { Button } from 'primereact/button';
import { ToastContext } from '../../../../../context/toastContext.jsx';

export default function SearchFrom({setStudent}){
  const [ciValue, setCiValue] = useState()
  const [nameValue, setNameValue] = useState("")
  const [lastNameValue, setLastNameValue] = useState("")
  const [loading, setLoading] = useState(false)
  const {showToast} = useContext(ToastContext)


  const handleSearch = () =>{
      
    if(!ciValue &&
      (!nameValue || nameValue.length === 0) &&
      (!lastNameValue || lastNameValue.length === 0) ){
       showToast({
          severity: 'info',
          summary: 'Advertencia',
          detail: 'Al menos debe llenar un campo'
        });
        return
    }

    let page = 1
    async function search(){
      setLoading(true)
      const searchData = {
        page,
        name: nameValue,
        lastname: lastNameValue,
        ci: ciValue
      }
      const studentData = await fetchAStudent(searchData)
      let {totalPages, studentsFounds:students} = studentData
     
      while(totalPages > page){
        page ++
        const studentData2 = await fetchAStudent(searchData)
        const {studentsFounds} = studentData2
        students = [...students, ...studentsFounds]
      }
      
      if(!students){
        showToast({
          severity: 'error',
          summary: 'Error',
          detail: 'No existe ningun alumno que cumpla alguno de los criterios solicitados'
        });
      }else{
        setStudent(students)
      }
      setLoading(false)
    }
    search()
  }

  return <div id='SS-search-from-container'>
    <Cedula value={ciValue} setValue={setCiValue} id="SE-ci-input" klass = "SE-input"/>
    <TextInput label = "Nombre del Estudiante" id="SE-name-input" setText = {setNameValue} text = {nameValue} klass = "SE-input"/>
    <TextInput label = "Apellido del Estudiante" id="SE-lastName-input" setText = {setLastNameValue} text = {lastNameValue} klass = "SE-input"/>
    <Button 
      label= {loading ? 'Espere...' : 'Buscar'} 
      severity={loading ? 'secondary' : ''} 
      icon={loading ? 'pi pi-spin pi-spinner' : 'pi pi-search'} 
      className={loading ? 'disabled' : ''}
      onClick={handleSearch}
    />
   
  </div>

}

SearchFrom.propTypes = {
  setStudent: PropTypes.func.isRequired
};