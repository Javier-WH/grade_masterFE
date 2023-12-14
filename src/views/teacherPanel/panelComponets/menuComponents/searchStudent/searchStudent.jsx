import PropTypes from "prop-types"
import Modal from '../../menuComponents/modal.jsx'
import SearchFrom from "./searchFrom.jsx";
import StudentDataPanel from "./studentDataPanel.jsx";
import { useEffect, useState } from "react";
import './searchStudent.css'

export default function SearchStudent({showSearchStudent, setShowSearchStudent}){
  const [student, setStudent] = useState(null)

  useEffect(()=>{
    if(!showSearchStudent){
      setStudent(null)
    }
  },[showSearchStudent])

  return<>
      <Modal header="Buscar Estudiante" visible ={showSearchStudent} setVisible={setShowSearchStudent}>
        {
          !student ?
          <SearchFrom setStudent = {setStudent} />
          :
          <StudentDataPanel student={student} />
        }
      </Modal>
  </>


}

SearchStudent.propTypes = {
  showSearchStudent: PropTypes.bool.isRequired,
  setShowSearchStudent: PropTypes.func.isRequired,
};