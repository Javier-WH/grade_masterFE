import TeacherPanelMenu from "./panelComponets/menu.jsx"
import AutoCompleteInput from "./panelComponets/autoComplete.jsx"
import Cedula from "../../components/inputs/cedula.jsx"
import StudentImage from "../../components/studentImage/studentImage.jsx"
import Container from '../../components/container/container.jsx'
import './teacherPanel.css'

export default function TeacherPanel (){

  return <div id='TP-main-container'>
    <TeacherPanelMenu/>
    <Container title = 'Matemáticas, Primero de Ciencias B, (2023-2024)'>
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
  </div>
}