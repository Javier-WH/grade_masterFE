import { useState, useEffect } from "react";
import LapseNames from "../fetch/fetchLapseNames.js";

export default function useLapseNames() {
  
  const [response, setResponse] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        let page = 1
        const data = await LapseNames({page});
        const totalPages = data.totalPages
        let lapseNames = data.lapseNames
   
        while(page <= totalPages && totalPages > 1){
          page++
          const data = await LapseNames({page});
          const _lapseNames = data.lapseNames
          lapseNames = [
            ...lapseNames,
            ..._lapseNames
          ]
        }
        setResponse(lapseNames);
      } catch (error) {
        setResponse(null);
      }
    };

    fetchData();
  }, []);
  
  return response;
}

