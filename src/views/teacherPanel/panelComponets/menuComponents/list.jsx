import PropTypes from "prop-types"
import StudentListBySeccion from '../../../../components/studentListBySeccion/studentListBySeccion.jsx'
import Modal from './modal.jsx'
import { TeacherPanelContext } from "../../../../context/teacherPanelContext.jsx"
import { useContext } from "react"
export default function ShowStudentList({showList, setShowList}){

  const { activeSubject, studentList } = useContext(TeacherPanelContext)

  const renderContent = () =>{

    if(!activeSubject){
      return <h3>No ha seleccionado ninguna seccion</h3>
    }else if (studentList.length === 0){
       return <h3>No hay estudiantes en la sección</h3>
    }else{
      return <StudentListBySeccion/>
    }
  }

  return<>
      <Modal header="lista de Estudiantes" visible ={showList} setVisible={setShowList}>
        {
          renderContent()
        }
      </Modal>
  </>


}

ShowStudentList.propTypes = {
  showList: PropTypes.bool.isRequired,
  setShowList: PropTypes.func.isRequired,
};