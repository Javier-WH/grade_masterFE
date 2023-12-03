const apiUrl = import.meta.env.VITE_API_URL;

export default async function updateTeacherData(data) {

  let bodyContent = JSON.stringify(data);

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }

  let response = await fetch(`${apiUrl}/user/updateUserData`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  });

  if (response.ok) {
    return true
  } else {
    return false
  }
}