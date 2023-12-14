const apiUrl = import.meta.env.VITE_API_URL;

export default async function fetchAStudent(data) {

  let bodyContent = JSON.stringify(data);

  let headersList = {
    "Accept": "*/*",
    "Authorization": sessionStorage.getItem('Authorization'),
    "id": sessionStorage.getItem("id"),
    "Content-Type": "application/json"
  }

  let response = await fetch(`${apiUrl}/students/getStudent`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  });

  if (response.ok) {
    return response.json()
  }
  return []

}