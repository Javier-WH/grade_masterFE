import { useState, useEffect } from "react";
import EvalPlan from "../fetch/fetchEvalPlan.js";

export default function useEvalPlan({idSubject}) {
  
  const [response, setResponse] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        let page = 1
        const data = await EvalPlan({page, idSubject});
        const totalPages = data.totalPages
        let evaluationPlans = data.evaluationPlans
   
        while(page <= totalPages && totalPages > 1){
          page++
          const data = await EvalPlan({page, idSubject});
          const _evaluationPlans = data.evaluationPlans
          evaluationPlans = [
            ...evaluationPlans,
            ..._evaluationPlans
          ]
        }
        setResponse(evaluationPlans);
      } catch (error) {
        setResponse(null);
      }
    };

    fetchData();
  }, [idSubject]);
  
  return [response, setResponse];
}

