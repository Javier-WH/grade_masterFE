import TeacherPanelMenu from "./panelComponets/menu.jsx"
import AutoCompleteInput from "./panelComponets/autoComplete.jsx"
import Container from '../../components/container/container.jsx'
import './teacherPanel.css'

export default function TeacherPanel (){

  return <div id='TP-main-container'>
    <TeacherPanelMenu/>
    <Container title = ''>
        <label className="TP-label">Estudiante</label>
        <AutoCompleteInput/>
    </Container>
  </div>
}