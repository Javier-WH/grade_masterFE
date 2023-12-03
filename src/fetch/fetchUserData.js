const apiUrl = import.meta.env.VITE_API_URL;

export default async function TeacherData({userId}) {
  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify({
    userId
  });


  let response = await fetch(`${apiUrl}/user/getUserData`, {
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