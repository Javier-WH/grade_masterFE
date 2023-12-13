import PropTypes from "prop-types"
import Modal from '../../menuComponents/modal.jsx'
import SearchFrom from "./searchFrom.jsx";
import { useState } from "react";

export default function SearchStudent({showSearchStudent, setShowSearchStudent}){
  const [student, setStudent] = useState(null)
  return<>
      <Modal header="Buscar Estudiante" visible ={showSearchStudent} setVisible={setShowSearchStudent}>
        {
          !student ?
          <SearchFrom setStudent = {setStudent}/>
          :
          <h1>Estudiante econtrado</h1>
        }
      </Modal>
  </>


}

SearchStudent.propTypes = {
  showSearchStudent: PropTypes.bool.isRequired,
  setShowSearchStudent: PropTypes.func.isRequired,
};