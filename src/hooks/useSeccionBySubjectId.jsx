import { useState, useEffect } from "react";
import SeccionBySubjectId from "../fetch/fetchSeccionBySubjectId";

export default function useSeccionBySubjectId({id, idPeriod}) {
  
  const [response, setResponse] = useState([]);

  useEffect(() => {

    setResponse('loading')
  
      if (!id || id.length === 0 || !idPeriod) {
        setResponse([]);
      return;
    }
  
    const fetchData = async () => {
      try {
        let page = 1
        const data = await SeccionBySubjectId({page, id, idPeriod});
        const totalPages = data.totalPages
        let students = data.students

        while(page <= totalPages && totalPages > 1){
          page++
          const data = await SeccionBySubjectId({page, id, idPeriod});
          const _students = data.students
          students = [
            ...students,
            ..._students
          ]
        }
        setResponse(students);
      } catch (error) {
        setResponse([]);
      }
    };

    fetchData();
  }, [id, idPeriod]);
  
  return [response, setResponse];
}
