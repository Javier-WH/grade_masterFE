import PropTypes from "prop-types"
import SaveGrades from "./saveGrades.jsx"
import Modal from '../modal.jsx'

export default function ShowSave({showSave, setShowSave}){

  const closeFunction = () =>{
    setShowSave(false)
  }

  return<>
      <Modal header="Guardando notas" visible ={showSave} setVisible={setShowSave}>
        {
         <SaveGrades closeFunction = {closeFunction} />
        }
      </Modal>
  </>


}

ShowSave.propTypes = {
  showSave: PropTypes.bool.isRequired,
  setShowSave: PropTypes.func.isRequired,
};