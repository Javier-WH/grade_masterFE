import { useState, useEffect } from "react";
import Seccion from "../fetch/fetchSeccions.js";

export default function useSeccions() {
  
  const [response, setResponse] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        let page = 1
        const data = await Seccion({page});
        const totalPages = data.totalPages
        let seccions = data.seccions

        while(page <= totalPages && totalPages > 1){
          page++
          const data = await Seccion({page});
          const _seccions = data.seccions
          seccions = [
            ...seccions,
            ..._seccions
          ]
        }
        setResponse(seccions);
      } catch (error) {
        setResponse(null);
      }
    };

    fetchData();
  }, []);
  
  return response;
}

