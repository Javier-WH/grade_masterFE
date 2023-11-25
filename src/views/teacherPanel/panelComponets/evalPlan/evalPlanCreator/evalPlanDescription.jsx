import { useState, useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";
import PropTypes from "prop-types";

export default function EvalPlanDesCription({index, evaluationList, setEvalEuationList}) {
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    
    const evaluations = [
     'Exámen escrito',
     'Exámen oral', 
     'Exámen grupal', 
     'Debate', 
     'Debate grupal', 
     'Informe', 
     'Informe + exposición', 
     'Exposición', 
     'Trabajo', 
     'Trabajo grupal', 
     'Trabajo + exposición', 
     'Trabajo grupal + exposición', 
     'Mapa mental', 
     'Revisión de cuaderno', 
     'Prácticas', 
     'Intervención en clase', 
    ];
    
    
    const search = (event) => {
        setItems(evaluations.filter(evaluation => {
          const input = event.query

          if(evaluation.toLowerCase().includes(input.toLowerCase())){
            return evaluation
          }

        }));
    }

    useEffect(()=>{
      if(!value){
        return
      }
      const list = [...evaluationList]
      list[index].desc = value
      setEvalEuationList(list)

       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value])

    
    return (
        <div className="card flex justify-content-center">
            <AutoComplete value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} />
        </div>
    )
}

EvalPlanDesCription.propTypes = {
  index: PropTypes.number.isRequired,
  evaluationList: PropTypes.array.isRequired,
  setEvalEuationList: PropTypes.func.isRequired
};
