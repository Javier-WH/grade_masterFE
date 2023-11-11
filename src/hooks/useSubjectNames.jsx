import { useState, useEffect } from "react";
import SubjecName from "../fetch/fetchSubjectNames.js";

export default function useSubjectNames() {
  
  const [response, setResponse] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        let page = 1
        const data = await SubjecName({page});
        const totalPages = data.totalPages
        let subjecNames = data.subjecNames

        while(page <= totalPages && totalPages > 1){
          page++
          const data = await SubjecName({page});
          const _subjecNames = data.subjecNames
          subjecNames = [
            ...subjecNames,
            ..._subjecNames
          ]
        }
        setResponse(subjecNames);
      } catch (error) {
        setResponse(null);
      }
    };

    fetchData();
  }, []);
  
  return response;
}

