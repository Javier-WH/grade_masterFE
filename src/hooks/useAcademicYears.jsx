import { useState, useEffect } from "react";
import AcademicYears from "../fetch/fetchAcademicYears.js";

export default function useAcademicYears() {
  
  const [response, setResponse] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        let page = 1
        const data = await AcademicYears({page});
        const totalPages = data.totalPages
        let academicYears = data.academicYears
   
        while(page <= totalPages && totalPages > 1){
          page++
          const data = await AcademicYears({page});
          const _academicYears = data.academicYears
          academicYears = [
            ...academicYears,
            ..._academicYears
          ]
        }
        setResponse(academicYears);
      } catch (error) {
        setResponse(null);
      }
    };

    fetchData();
  }, []);
  
  return response;
}

