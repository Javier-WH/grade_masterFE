import PropTypes from "prop-types"
import Modal from '../modal.jsx'
import TextInput from "../../../../../components/inputs/textInput.jsx"
import './showTeacherData.css'
import { useContext, useEffect, useState } from "react"
import { Button } from 'primereact/button';
import { TeacherPanelContext } from "../../../../../context/teacherPanelContext.jsx"
import fetchUpdateTeacherData from "../../../../../fetch/fetchUpdateTeacherData.js"
import { ToastContext } from '../../../../../context/toastContext.jsx'

export default function ShowTeacherData({showTeacherData, setShowTeacherData}){
  const { teacherData, setTeacherData } = useContext(TeacherPanelContext)
  const {showToast} = useContext(ToastContext)

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [ci, setCi] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("") 


  useEffect(()=>{
   
    if(!teacherData || teacherData.length === 0){
      return
    }
    setName(teacherData.name)
    setLastName(teacherData.lastName)
    setCi(teacherData.ci)
    setPhone(teacherData.phone)
    setEmail(teacherData.email)
  },[teacherData])
  

  const updateData = async () =>{

    const data = {...teacherData}
    data.name = name
    data.lastName = lastName
    data.ci = ci
    data.phone = phone
    data.email = email

    const isUpdated = await fetchUpdateTeacherData(data)

    if(!isUpdated){
      showToast(
        {
          severity : 'error',
          summary : 'Error',
          detail : 'Ha ocurrido un error, no se actualizaron los datos'
        }
      );
      return
    }
    
    setTeacherData(data)
    showToast(
      {
        severity : 'success',
        summary : 'Exito',
        detail : 'Se han actualizado los datos del profesor'
      }
    )
    setShowTeacherData(false)
  }


  return<>
      <Modal header="Datos del profesor" visible ={showTeacherData} setVisible={setShowTeacherData}>
        {
          <>
          <div id="TP-teacherdata-container">
            <TextInput id="TP-username-input" label="Nombres" setText ={setName} text = {name} klass={"TP-teacherDataInput"}/>
            <TextInput id="TP-userLastname-input" label="Apellidos" setText ={setLastName} text = {lastName} klass={"TP-teacherDataInput"}/>
            <TextInput id="TP-userCi-input" label="Cédula" setText ={setCi} text = {ci} klass={"TP-teacherDataInput"}/>
            <TextInput id="TP-userPhone-input" label="Teléfono" setText ={setPhone} text = {phone} klass={"TP-teacherDataInput"}/>
            <TextInput id="TP-userEmail-input" label="Email" setText ={setEmail} text = {email} klass={"TP-teacherDataInput"}/>
          </div>
          <div id="TP-teacherdata-buttonContainer" >
            <Button label="Cancelar" severity="secondary" onClick={()=> setShowTeacherData(false)} />
            <Button label="Aceptar" onClick={updateData}/>
          </div>
          </>
        }
      </Modal>
  </>


}

ShowTeacherData.propTypes = {
  showTeacherData: PropTypes.bool.isRequired,
  setShowTeacherData: PropTypes.func.isRequired,
};