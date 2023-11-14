import { useContext, useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import PropTypes from "prop-types";
import { TeacherPanelContext } from "../../../../context/teacherPanelContext.jsx";

export default function AutoCompleteInput({ studentName }) {
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const { studentList, setActiveStudent} = useContext(TeacherPanelContext)

    useEffect(()=>{
        if(studentName){
        setValue(studentName)
        }
    },[studentName])

    const search = (event) => {
        const suggestions = studentList.map((student) => {
        const name = `${student.studentLastName} ${student.studentName}`;
        return name.toLowerCase().includes(event.query.toLowerCase()) ? name : null;
        });

        setItems(suggestions.filter((suggestion) => suggestion !== null));
    };


    const handleSelect = (e) => {

        const selectedStudent = e.value;

        const index = studentList.findIndex((student) => {
        const name = `${student.studentLastName} ${student.studentName}`;
        return name === selectedStudent;
        });

        setActiveStudent(index);
    };



    return (
        <AutoComplete 
            value={value} 
            suggestions={items} 
            completeMethod={search} 
            onChange={(e) => setValue(e.value)}
            onSelect={handleSelect}
            className="p-autocomplete-custom" 
            id="p-autocomplete-custom"
        />
    )
}
        
AutoCompleteInput.propTypes = {
  studentName: PropTypes.string
};