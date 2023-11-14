import { useContext } from "react"
import { TeacherPanelContext } from "../../context/teacherPanelContext.jsx"
import "./studentListBySeccion.css"

export default function StudentListBySeccion(){

  const { studentList, setActiveStudent} = useContext(TeacherPanelContext)


  const handleClick = index =>{
    setActiveStudent(index)
  }



  return <>
    <div className="SL-student" id="SL-tableHeader">
        <div>Nombres</div>
        <div>Apellidos</div>
        <div>Cédula</div>
    </div>
    {
     studentList.map((student, index) =>{
      return <div 
      key={student.studentId} 
      id={student.studentId} 
      className="SL-student"
      onClick={()=>handleClick(index)}
      >
        <div>{student.studentName}</div>
        <div>{student.studentLastName}</div>
        <div>{student.studentCi}</div>
      </div>
     })
    }
  
  </>
}