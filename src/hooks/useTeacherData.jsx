import { useState, useEffect } from "react";
import TeacherData from "../fetch/fetchUserData";

export default function useTeacherData() {
  const userId = sessionStorage.getItem('id')
  const [response, setResponse] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await TeacherData({userId});
        setResponse(data);
      } catch (error) {
        setResponse(null);
      }
    };

    fetchData();
  }, [userId]);
  
  return [response, setResponse];
}
