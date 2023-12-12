import { useState, useEffect } from "react";
import TeacherSubjects from "../fetch/fetchTeacherSubjects.js";

export default function useTeacherSubjects() {
  const id = sessionStorage.getItem('id')
  const [response, setResponse] = useState([]);

  useEffect(() => {
    setResponse('loading')
    const fetchData = async () => {
      try {
        let page = 1
        const data = await TeacherSubjects({page, id});
        const totalPages = data.totalPages
        let subjects = data.subjects

        while(page <= totalPages && totalPages > 1){
          page++
          const data = await TeacherSubjects({page, id});
          const _subjects = data.subjects
          subjects = [
            ...subjects,
            ..._subjects
          ]
        }
        setResponse(subjects);
      } catch (error) {
        setResponse(null);
      }
    };

    fetchData();
  }, [id]);
  
  return response;
}

