import { useEffect, useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import PropTypes from "prop-types";

export default function Cedula({ studentCi }) {

    const [value2, setValue2] = useState("");

    useEffect(()=>{
        if(studentCi){
            setValue2(studentCi)
        }
    },[studentCi])


    return <InputNumber inputId="input-ci" className="TP-ci" value={value2} onValueChange={(e) => setValue2(e.value)}  locale="de-DE" />
    
}

Cedula.propTypes = {
  studentCi: PropTypes.string
};