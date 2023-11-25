import PropTypes from "prop-types"
import EvalPlanCreator from "./evalPlanCreator.jsx"
import Modal from '../../menuComponents/modal.jsx'


export default function ShowEPC({showEPC, setShowEPC}){

  const closeFunction = () =>{
    setShowEPC(false)
  }

  return<>
      <Modal header="Crear Plan de evaluacion" visible ={showEPC} setVisible={setShowEPC}>
        {
         <EvalPlanCreator closeFunction = {closeFunction} />
        }
      </Modal>
  </>


}

ShowEPC.propTypes = {
  showEPC: PropTypes.bool.isRequired,
  setShowEPC: PropTypes.func.isRequired,
};