const apiUrl = import.meta.env.VITE_API_URL;

export default async function InsertEvalPlan(evalPlan) {
 
  let bodyContent = JSON.stringify(evalPlan);

  let headersList = {
    "Accept": "*/*",
    "id": sessionStorage.getItem("id"),
    "Authorization": sessionStorage.getItem("Authorization"),
    "Content-Type": "application/json"
  }


  let response = await fetch(`${apiUrl}/evalplan/insert`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  });


  if (response.ok) {
    return await response.text()
  }

  return null
}