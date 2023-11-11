import { useState, useEffect } from "react";
import SeccionName from "../fetch/fetchSeccionNames";

export default function useSeccionNames() {
  
  const [response, setResponse] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        let page = 1
        const data = await SeccionName({page});
        const totalPages = data.totalPages
        let seccionNames = data.seccionNames

        while(page <= totalPages && totalPages > 1){
          page++
          const data = await SeccionName({page});
          const _seccionNames = data.seccionNames
          seccionNames = [
            ...seccionNames,
            ..._seccionNames
          ]
        }
        setResponse(seccionNames);
      } catch (error) {
        setResponse(null);
      }
    };

    fetchData();
  }, []);
  
  return response;
}

