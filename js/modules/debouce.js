/**
 * Função utilitária de debounce.
 * @param {*} callback Função que será aplicado o debounce.
 * @param {*} tempo Tempo de debounce.
 * @returns Função com o debounce aplicado.
 */
export default function debounce(callback, tempo) {
  let timer = null;

  return (...args) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => callback(...args), tempo);
  };
}
