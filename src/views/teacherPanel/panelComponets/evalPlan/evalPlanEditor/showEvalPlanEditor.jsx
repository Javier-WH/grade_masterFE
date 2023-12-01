import PropTypes from "prop-types"
import { Button } from 'primereact/button';
import Modal from '../../menuComponents/modal.jsx'
import { TeacherPanelContext } from "../../../../../context/teacherPanelContext.jsx"
import NoEvalPlanFound from "./noEvalPlanFound.jsx"
import EvalPlanEditor from "./evalPlanEditor.jsx"
import { useContext } from "react"

export default function ShowEPE({showEPE, setShowEPE}){

  const {evalPlanList, activeSubject} = useContext(TeacherPanelContext)

  const closeFunction = () =>{
    setShowEPE(false)
  }

  const handleContent=()=>{
    if(!activeSubject){
      return <h4>No ha seleccionado una materia</h4>
    }

    if(!evalPlanList){
      return  <NoEvalPlanFound setShowEPE ={setShowEPE}/>
    }
    
    return  <EvalPlanEditor/>
  }

  return<>
      <Modal header="Editar Plan de evaluacion" visible ={showEPE} setVisible={setShowEPE}>
        {
          handleContent()
        }
        <br />
        <br />
        <Button label="Cancelar" severity="danger"  onClick={closeFunction}/>
      </Modal>
  </>


}

ShowEPE.propTypes = {
  showEPE: PropTypes.bool.isRequired,
  setShowEPE: PropTypes.func.isRequired,
};