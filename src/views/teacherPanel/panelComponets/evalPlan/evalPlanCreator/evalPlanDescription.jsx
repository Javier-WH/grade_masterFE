import { useState} from "react";
import { AutoComplete } from "primereact/autocomplete";
import PropTypes from "prop-types";

export default function EvalPlanDesCription({index, evaluationList, setEvalEuationList}) {

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



    const handleValue = val =>{
      const list = [...evaluationList]
      list[index].desc = val
      setEvalEuationList(list)

    }
    
    return <AutoComplete value={evaluationList[index].desc} suggestions={items} completeMethod={search} onChange={(e) => handleValue(e.value)} inputStyle={{width:'100%'}}/>
    
 
}

EvalPlanDesCription.propTypes = {
  index: PropTypes.number.isRequired,
  evaluationList: PropTypes.array.isRequired,
  setEvalEuationList: PropTypes.func.isRequired
};
