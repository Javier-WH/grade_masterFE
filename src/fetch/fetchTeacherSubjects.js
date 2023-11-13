const apiUrl = import.meta.env.VITE_API_URL;

export default async function TeacherSubjects({ page, id}) {

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify({
    id,
    page
  });


  let response = await fetch(`${apiUrl}/user/subjects`, {
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