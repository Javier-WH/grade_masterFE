const apiUrl = import.meta.env.VITE_API_URL;

export default async function getConfig() {
  let headersList = {
    "Accept": "*/*"
  };
  
  let response = await fetch(`${apiUrl}/config/getConfig`, {
    method: "GET",
    headers: headersList
  });

  if (response.ok) {
    return response.json()
  }

  const errorText = await response.text();
  throw new Error(errorText);
}