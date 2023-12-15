export default async function loginAdmin(idUser){
  const apiUrl = import.meta.env.VITE_API_URL;

  let bodyContent = JSON.stringify({
    idUser
  });

  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const response = await fetch(`${apiUrl}/user/admin`, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  if (response.ok) {
    return await response.json();
  }

  const errorText = await response.text();
  throw new Error(errorText);
}