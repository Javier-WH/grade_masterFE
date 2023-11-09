import { useState } from "react";
import { InputNumber } from 'primereact/inputnumber';

export default function Cedula() {

    const [value2, setValue2] = useState("");

    return <InputNumber inputId="input-ci" className="TP-ci" value={value2} onValueChange={(e) => setValue2(e.value)}  locale="de-DE" />
    
}