export default async function fetchNumeroVisitantes(url, elementoAlvo){
  const elemento = document.querySelector(elementoAlvo);
  const response = await fetch(url);

  if(response.ok && response.status === 200){
    const json = await response.json();
    const numeroVisitantes = json.numeroVisitantes;

    if(numeroVisitantes !== undefined){
      elemento.innerHTML = json.numeroVisitantes;
    }
  }
}