const apiUrl = import.meta.env.VITE_API_URL;

export default async function EvalPlan({ page, idSubject }) {

  let headersList = {
    "Accept": "*/*",
    "id": sessionStorage.getItem("id"),
    "Authorization": sessionStorage.getItem("Authorization"),
    "Content-Type": "application/json"
  }

  let bodyContent = JSON.stringify({
    page,
    idSubject
  });

  let response = await fetch(`${apiUrl}/evalPlan/evalPlan`, {
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