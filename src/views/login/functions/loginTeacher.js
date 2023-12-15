export default async function loginTeacher(user, password) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    user,
    password,
  });

  const response = await fetch(`${apiUrl}/user/login`, {
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