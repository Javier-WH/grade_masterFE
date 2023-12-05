import PropTypes from "prop-types"
import Modal from '../modal.jsx'
import TextInput from "../../../../../components/inputs/textInput.jsx"
import PasswordInput from "../../../../../components/inputs/passwordInput.jsx"
import {useContext, useState } from "react"
import { Button } from 'primereact/button';
import { ToastContext } from '../../../../../context/toastContext.jsx'
import updateTeacherPassword from "../../../../../fetch/fetchUpdateTeacherPassword.js";
import "./showTeacherPassword.css"

export default function ShowTeacherPassword({showTeacherPassword, setShowTeacherPassword}){

  const {showToast} = useContext(ToastContext)

  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPassword2, setNewPassword2] = useState("")
  
  
  const upDatePass = async () =>{

    if(user.length === 0 ||
      password.length === 0 ||
      newPassword.length === 0 ||
      newPassword2.length === 0
      ){
        showToast(
          {
            severity : 'warn',
            summary : 'Advertencia',
            detail : 'Debe llenar todos los campos'
          }
        );
        return
      }

      if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/.test(newPassword))){
        showToast(
          {
            severity : 'error',
            summary : 'Error',
            detail : 'La contraseña debe tener al menos 8 caracteres e incluir al menos una letra minúscula, una letra mayúscula y un dígito'
          }
        );
        return
      }

      if(newPassword !== newPassword2){
        showToast(
          {
            severity : 'error',
            summary : 'Error',
            detail : 'Las contraseñas son diferentes'
          }
        );
        return
      }

    const isUpdated = await updateTeacherPassword(
        {
          user,
          password,
          newPassword
        }
      )

    if(!isUpdated){
      showToast(
        {
          severity : 'error',
          summary : 'Error',
          detail : 'Ha ocurrido un error, no se actualizó la contraseña'
        }
      );
      return
    }
    showToast(
      {
        severity : 'success',
        summary : 'Exito',
        detail : 'Se ha actualizado la contraseña'
      }
    )
    setShowTeacherPassword(false)

  }

  return<>
      <Modal header="Cambiar Contraseña" visible ={showTeacherPassword} setVisible={setShowTeacherPassword}>
        {
          <>
            <div id="TP-updatePassword-container">
               <TextInput label = "Usuario" id="TP-updatePassword-user" setText = {setUser} text = {user} klass = "TP-updatePassword-input"/>
               <PasswordInput passValue={password} setPassValue={setPassword}/>
               <PasswordInput passValue={newPassword} setPassValue={setNewPassword} label = "Nueva contraseña"/>
               <PasswordInput passValue={newPassword2} setPassValue={setNewPassword2} label = "Repite la nueva contraseña" />
            </div>
            <div id="TP-updatePassword-button-container">
                <Button label="Cacelar" severity="secondary" onClick={()=>setShowTeacherPassword(false)} />
                <Button label="Aceptar" onClick={upDatePass} />
            </div>
          </>
        }
      </Modal>
  </>


}

ShowTeacherPassword.propTypes = {
  showTeacherPassword: PropTypes.bool.isRequired,
  setShowTeacherPassword: PropTypes.func.isRequired,
};