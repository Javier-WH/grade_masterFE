import AutoCompleteInput from "./studentDataContainerComponents/autoComplete.jsx"
import StudentImage from "../../../components/studentImage/studentImage.jsx"
import Container from '../../../components/container/container.jsx'
import { TeacherPanelContext } from "../../../context/teacherPanelContext.jsx"
import StarterMenu from "./studentDataContainerComponents/starterMenu.jsx"
import { useContext } from "react"
import { Button } from 'primereact/button';
import NotFoundStudent from "./studentDataContainerComponents/notFoundStudent.jsx"
import NotActiveStudent from "./studentDataContainerComponents/notActiveStudent.jsx"

export default function StudentDataContainer(){

  const { activeSubject, studentList, activeStudent, setActiveStudent} = useContext(TeacherPanelContext) 


  const navigateToStudent = (index) => {
    const listLength = studentList.length;
    if (index < 0) {
      setActiveStudent(listLength - 1);
    } else if (index >= listLength) {
      setActiveStudent(0);
    } else {
      setActiveStudent(index);
    }
  };

  const handleNext = () => {
    navigateToStudent(activeStudent + 1);
  };

  const handleBack = () => {
    navigateToStudent(activeStudent - 1);
  };

  const title = activeSubject  ? activeSubject : ""

  if(!activeSubject){
    return <StarterMenu />
  }else if (studentList.length === 0){
    return <NotFoundStudent title = {title}/>
  }else if (activeStudent === null){
    return <NotActiveStudent/>
  }else {
    const student = studentList[activeStudent]
    const studentName = `${student.studentLastName} ${student.studentName}`
    const studentCi  = Number.parseInt(student?.studentCi).toLocaleString("es-ES", { 
      useGrouping: true,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      minimumIntegerDigits: 1,
      style: "decimal",
      notation: "standard"
    })
 
    return <>
      <Container title = {title}>
        <div id="TP-studentData-container">
          <StudentImage/>
          <div className="TP-name-container">
            <label className="TP-label">Estudiante</label>
            <AutoCompleteInput studentName= {studentName}/>
          </div>
          <div id="TP-ci-buttons-container">
            <div className="TP-name-container">
              <label className="TP-label">Cédula</label>
              <span id="TP-studentCi">{studentCi}</span>
            </div>
            <div id="TP-buttonContainer">
              <Button icon="pi pi-arrow-left" rounded outlined aria-label="Filter" className="TP-student-button" onClick={()=> handleBack()}/>
              <Button icon="pi pi-arrow-right" rounded outlined aria-label="Filter" className="TP-student-button" onClick={()=> handleNext()}/>
            </div>   
          </div>
        </div>
        
      </Container>
    </>   


  }
}