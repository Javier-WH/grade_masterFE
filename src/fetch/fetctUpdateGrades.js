const apiUrl = import.meta.env.VITE_API_URL;

export default async function updateGrades({ grade }) {

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify(grade);

  let response = await fetch(`${apiUrl}/students/updateGrades`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  });

  if (response.ok) {
    return true
  }else{
    return false
  }
}