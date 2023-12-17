import { useState, useEffect } from "react";
import getConfig from "../fetch/fetchConfig.js";

export default function useConfig() {
  
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getConfig();
        setResponse(data);
      } catch (error) {
        setResponse(null);
      }
    };

    fetchData();
  }, []);
  
  return [response, setResponse];
}

