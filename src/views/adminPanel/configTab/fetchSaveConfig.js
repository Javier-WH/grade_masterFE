const apiUrl = import.meta.env.VITE_API_URL;

export default async function fetchSaveConfig(configList) {

  let bodyContent = JSON.stringify(configList);

  let headersList = {
    "Accept": "*/*",
    "Authorization": sessionStorage.getItem('Authorization'),
    "id": sessionStorage.getItem("id"),
    "Content-Type": "application/json"
  }

  let response = await fetch(`${apiUrl}/config/setConfig`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  });

  if (response.ok) {
    return response.text()
  }
  
  const errorText = await response.text();
  throw new Error(errorText);

}