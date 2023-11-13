import AutoCompleteInput from "../panelComponets/autoComplete.jsx"
import Cedula from "../../../components/inputs/cedula.jsx"
import StudentImage from "../../../components/studentImage/studentImage.jsx"
import Container from '../../../components/container/container.jsx'
import { TeacherPanelContext } from "../../../context/teacherPanelContext.jsx"
import StudentListBySeccion from "../../../components/studentListBySeccion/studentListBySeccion.jsx"
import StarterMenu from "./starterMenu.jsx"
import { useContext } from "react"

export default function StudentDataContainer(){

  const { activeSubject, studentList, activeStudent} = useContext(TeacherPanelContext) 

  if(!activeSubject){
    return <StarterMenu />
  }else if (studentList.length === 0){

    return<>
      <Container title = {activeSubject  ? activeSubject : ""}>
        <div id = 'TP-noStudentFound'>
            <i className="pi pi-exclamation-triangle" style={{ fontSize: '4rem' }}></i>
            <br />
            <span> No se encontraron estudiates inscritos en esta sección </span>
        </div>
      </Container>
    </> 

  }else if (!activeStudent){
    return <div id="TP-notActiveStudent">
        <div id="TP-notActiveStudent-title">Escoge un estudiante</div>
        <StudentListBySeccion/> 
      </div>
  }else {
    return <>
      <Container title = {activeSubject  ? activeSubject : ""}>
        <div id="TP-studentData-container">
          <StudentImage/>
          <div className="TP-name-container">
            <label className="TP-label">Estudiante</label>
            <AutoCompleteInput/>
          </div>
          <div className="TP-name-container">
            <label className="TP-label">Cédula</label>
            <Cedula/>
          </div>
        </div>
      </Container>
    </>   


  }



}