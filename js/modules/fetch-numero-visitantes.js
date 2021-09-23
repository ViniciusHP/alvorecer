import AnimaNumero from './AnimaNumero.js';

/**
 * Função que executa requisição ajax para obter valor de numérico de 'número de visitantes'
 * @param {*} url Url onde está arquivo JSON o número de visitantes
 * @param {*} elementoAlvo Elemento que receberá o valor obtido
 */
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

  /* A animação dos números só estará disponível após a requisição */
  const animaNumeroVisitantes = new AnimaNumero('#opinioes-section', 'ativo', '[data-anima-numeros]', 2000);
  animaNumeroVisitantes.init();
}
