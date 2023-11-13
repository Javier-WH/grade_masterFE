import TeacherPanelMenu from "./panelComponets/menu.jsx"
import StudentDataContainer from "./panelComponets/studentDataContainer.jsx"
import { TeacherPanelContextProvider } from "../../context/teacherPanelContext.jsx"
import './teacherPanel.css'


export default function TeacherPanel (){
  return <>
    <TeacherPanelContextProvider>
      <div id='TP-main-container'>
        <TeacherPanelMenu/>
        <StudentDataContainer/>
      </div>
    </TeacherPanelContextProvider>
  </> 
}