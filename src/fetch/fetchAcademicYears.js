const apiUrl = import.meta.env.VITE_API_URL;
export default async function AcademicYears({ page }) {

  let headersList = {
    "Accept": "*/*",
    "Authorization": sessionStorage.getItem('Authorization'),
    "id": sessionStorage.getItem("id"),
    "Content-Type": "application/json"
  }


  let bodyContent = JSON.stringify({
    page
  });

  let response = await fetch(`${apiUrl}/basic/academicYears`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  });

  if (response.ok) {
    return response.json()
  }

  const errorText = await response.text();
  throw new Error(errorText);
}