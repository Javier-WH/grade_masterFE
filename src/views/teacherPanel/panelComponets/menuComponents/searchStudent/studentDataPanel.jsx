import PropTypes from "prop-types"
import {useState } from "react";
import StudentImage from "../../../../../components/studentImage/studentImage.jsx";


export default function StudentDataPanel ({student}){
  
  const [selectedStudent, setSelectedStudent] = useState(null)
  

  if(student.length > 1 && selectedStudent === null){
    return <>
      <div className="SS-search-from-list">
          <h5>Nombre</h5>
          <h5>Apellido</h5>
          <h5>Cédula</h5>  
          <h5>Grado</h5>  
          <h5>Sección</h5>  
      </div>
      {
        student.map((std, i)=>{
          return <div key={`studentf${i}`} onClick={()=>setSelectedStudent(i)} className="SS-search-from-list">
            <span>{std.studentName}</span>
            <span>{std.studentLastname}</span>
            <span>{std.studentCi}</span>  
            <span>{std.academicYear}</span>  
            <span>{std.seccionName}</span>  
          </div>
        })
      }
    </>
  }
  const std = student[selectedStudent ? selectedStudent : 0]

  return <>
          <div id="SS-studentimage-container">
              <StudentImage forcedStudent ={std}/>
          </div>
          <h4 className="SS-student-data-title" >Datos del estudiante</h4>
          <div className={`SS-student-data-container ${std.studentName ? "" : "hide"}`}>
            <label htmlFor='SS-std-name'>Nombre del estudiante</label>
            <span id='SS-std-name'>{std.studentName}</span>
          </div>

          <div className={`SS-student-data-container ${std.studentLastname ? "" : "hide"}`}>
            <label htmlFor='SS-std-lastName'>Apellido del estudiante</label>
            <span id='SS-std-lastName'>{std.studentLastname}</span>
          </div>
          
          <div className={`SS-student-data-container ${std.studentCi ? "" : "hide"}`}>
            <label htmlFor='SS-std-studentCi'>Cédula del estudiante</label>
            <span id='SS-std-studentCi'>{std.studentCi}</span>
          </div>

          <div className={`SS-student-data-container ${std.studentGender ? "" : "hide"}`}>
            <label htmlFor='SS-std-studentGender'>Género del estudiante</label>
            <span id='SS-std-studentGender'>{std.studentGender  ? (std.studentGender === 'M'? 'Masculino' : 'Femenino') : ""}</span>
          </div>

          <div className={`SS-student-data-container ${std.studentBirthDate ? "" : "hide"}`}>
            <label htmlFor='SS-std-studentBirthDate'>Fecha de nacimiento</label>
            <span id='SS-std-studentBirthDate'>{std.studentBirthDate}</span>
          </div>

          <div className={`SS-student-data-container ${std.academicYear ? "" : "hide"}`}>
            <label htmlFor='SS-std-academicYear'>Grado Escolar</label>
            <span id='SS-std-academicYear'>{std.academicYear}</span>
          </div>

          <div className={`SS-student-data-container ${std.seccionName ? "" : "hide"}`}>
            <label htmlFor='SS-std-seccionName'>Sección</label>
            <span id='SS-std-seccionName'>{std.seccionName}</span>
          </div>
          
          {
            std.tutorName || std.tutorLastName || std.tutorCi || std.tutorPhone || std.tutorEmail ?
            <h4 className="SS-student-data-title" >Datos del tutor</h4>
            :
            ""  
          }
        
          <div className={`SS-student-data-container ${std.tutorName ? "" : "hide"}`}>
            <label htmlFor='SS-std-tutorName'>Nombre del tutor</label>
            <span id='SS-std-tutorName'>{std.tutorName}</span>
          </div>

          <div className={`SS-student-data-container ${std.tutorLastName ? "" : "hide"}`}>
            <label htmlFor='SS-std-tutorLastName'>Apellido del tutor</label>
            <span id='SS-std-tutorLastName'>{std.tutorLastName}</span>
          </div>
     
          <div className={`SS-student-data-container ${std.tutorCi ? "" : "hide"}`}>
            <label htmlFor='SS-std-tutorCi'>Cédula del tutor</label>
            <span id='SS-std-tutorCi'>{std.tutorCi}</span>
          </div>

          <div className={`SS-student-data-container ${std.tutorPhone ? "" : "hide"}`}>
            <label htmlFor='SS-std-tutorPhone'>Télefono del tutor</label>
            <span id='SS-std-tutorPhone'>{std.tutorPhone}</span>
          </div>

          <div className={`SS-student-data-container ${std.tutorEmail ? "" : "hide"}`}>
            <label htmlFor='SS-std-tutorEmail'>Email del tutor</label>
            <span id='SS-std-tutorEmail'>{std.tutorEmail}</span>
          </div>

          {
            std.fatherName || std.fatherLastName || std.fatherCi || std.fatherPhone || std.fatherEmail ?
            <h4 className="SS-student-data-title" >Datos del padre</h4>
            :
            ""  
          }

          <div className={`SS-student-data-container ${std.fatherName ? "" : "hide"}`}>
            <label htmlFor='SS-std-fatherName'>Nombre del padre</label>
            <span id='SS-std-fatherName'>{std.fatherName}</span>
          </div>

          <div className={`SS-student-data-container ${std.fatherLastName ? "" : "hide"}`}>
            <label htmlFor='SS-std-fatherLastName'> Apellido del padre</label>
            <span id='SS-std-fatherLastName'>{std.fatherLastName}</span>
          </div>
     
          <div className={`SS-student-data-container ${std.fatherCi ? "" : "hide"}`}>
            <label htmlFor='SS-std-fatherCi'>Cédula del padre</label>
            <span id='SS-std-fatherCi'>{std.fatherCi}</span>
          </div>

          <div className={`SS-student-data-container ${std.fatherPhone ? "" : "hide"}`}>
            <label htmlFor='SS-std-fatherPhone'> Télefono del padre</label>
            <span id='SS-std-fatherPhone'>{std.fatherPhone}</span>
          </div>
       
         <div className={`SS-student-data-container ${std.fatherEmail ? "" : "hide"}`}>
            <label htmlFor='SS-std-fatherEmail'> Email del padre</label>
            <span id='SS-std-fatherEmail'>{std.fatherEmail}</span>
          </div>

          {
            std.motherName || std.motherLastName || std.motherCi || std.motherPhone || std.motherEmail ?
            <h4 className="SS-student-data-title" >Datos de la madre</h4>
            :
            ""  
          }

          <div className={`SS-student-data-container ${std.motherName ? "" : "hide"}`}>
            <label htmlFor='SS-std-motherName'> Nombre de la madre</label>
            <span id='SS-std-motherName'>{std.motherName}</span>
          </div>

          <div className={`SS-student-data-container ${std.motherLastName ? "" : "hide"}`}>
            <label htmlFor='SS-std-motherLastName'> Apellido de la madre</label>
            <span id='SS-std-motherLastName'>{std.motherLastName}</span>
          </div>
     
          <div className={`SS-student-data-container ${std.motherCi ? "" : "hide"}`}>
            <label htmlFor='SS-std-motherCi'>Cédula de la madre</label>
            <span id='SS-std-motherCi'>{std.motherCi}</span>
          </div>

          <div className={`SS-student-data-container ${std.motherPhone ? "" : "hide"}`}>
            <label htmlFor='SS-std-motherPhone'> Télefono de la madre</label>
            <span id='SS-std-motherPhone'>{std.motherPhone}</span>
          </div>
       
         <div className={`SS-student-data-container ${std.motherEmail ? "" : "hide"}`}>
            <label htmlFor='SS-std-motherEmail'> Email de la madre </label>
            <span id='SS-std-motherEmail'>{std.motherEmail}</span>
          </div>
   
  </>
}

StudentDataPanel.propTypes = {
  student: PropTypes.array.isRequired
};