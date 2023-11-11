import { useState, useEffect } from "react";

export default function useLogin() {
  
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)
  const [response, setResponse] = useState([]);


  useEffect(() => {
    if(user === null && password === null){
        return
    }
    const fetchData = async () => {
      try {
        const data = await login(user, password);
        setResponse(data);
      } catch (error) {
        setResponse({error: error.message, id: null, Authorization: null});
      }
    };

    fetchData();
  }, [user, password]);

  const setData = ({user, password}) =>{
    setUser(user)
    setPassword(password)
  }

  return [response, setData];
}

async function login(user, password) {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    user,
    password,
  });

  const response = await fetch(`${apiUrl}/user/login`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  if (response.ok) {
    const { id, Authorization } = await response.json();
    return {error: null, id, Authorization};
  }

  const errorText = await response.text();
  throw new Error(errorText);
}