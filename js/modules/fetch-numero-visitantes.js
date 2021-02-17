import AnimaNumero from './anima-numeros.js';

export default async function fetchNumeroVisitantes(url, elementoAlvo) {
  const elemento = document.querySelector(elementoAlvo);
  const response = await fetch(url);

  if (response.ok && response.status === 200) {
    const json = await response.json();
    const { numeroVisitantes } = json;

    if (numeroVisitantes !== undefined) {
      elemento.innerHTML = json.numeroVisitantes;
    }
  }

  const animaNumeroVisitantes = new AnimaNumero('#opinioes-section', 'ativo', '[data-anima-numeros]', 2000);
  animaNumeroVisitantes.init();
}
