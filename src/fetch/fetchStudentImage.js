const apiUrl = import.meta.env.VITE_API_URL;

export default async function getStudentImage({ id }) {
  let headersList = {
    "Accept": "*/*",
    "id": sessionStorage.getItem("id"),
    "Authorization": sessionStorage.getItem("Authorization"),
    "Content-Type": "application/json"
  }

  let response = await fetch(`${apiUrl}/students/photo?id=${id}`, {
    method: "GET",
    headers: headersList
  });


  if (response.ok) {
    return response.blob()
  }

  const errorText = await response.text();
  throw new Error(errorText);
}
