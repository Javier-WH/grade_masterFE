import { useState, useEffect } from "react";
import Periods from "../fetch/fetchPeriods.js";

export default function usePeriods() {
  
  const [response, setResponse] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        let page = 1
        const data = await Periods({page});
        const totalPages = data.totalPages
        let periods = data.periods

        while(page <= totalPages && totalPages > 1){
          page++
          const data = await Periods({page});
          const _periods = data.periods
          periods = [
            ...periods,
            ..._periods
          ]
        }
        setResponse(periods);
      } catch (error) {
        setResponse(null);
      }
    };

    fetchData();
  }, []);
  
  return response;
}

