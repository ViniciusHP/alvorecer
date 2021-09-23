/**
 * Classe utilizada para realizar o deslocamento do scroll
 * quando um elemento acionador for clicado.
 */
export default class DeslocamentoAteOAlvo {
  constructor(botoesAcionadores, scrollIntoViewOptions) {
    this.botoesAcionadoresDeslocamento = document.querySelectorAll(botoesAcionadores);

    if (scrollIntoViewOptions !== undefined) {
      this.scrollIntoViewOptions = scrollIntoViewOptions;
    } else {
      this.scrollIntoViewOptions = {
        block: 'start',
        behavior: 'smooth',
      };
    }

    this.deslocaAteOAlvo = this.deslocaAteOAlvo.bind(this);
  }

  /**
   * Inicializa as funcionalidades.
   * @returns Instância atual.
   */
  init() {
    if (this.botoesAcionadoresDeslocamento.length) {
      this.addEventDeslocamentoScroll();
    }

    return this;
  }

  /**
   * Adiciona tratamento de evento de click para os acionadores.
   */
  addEventDeslocamentoScroll() {
    this.botoesAcionadoresDeslocamento.forEach((botao) => botao.addEventListener('click', this.deslocaAteOAlvo));
  }

  /**
   * Método responsável por realizar o scroll suave até o elemento alvo.
   * @param {*} event Evento de click
   */
  deslocaAteOAlvo(event) {
    event.preventDefault();
    const botaoAcionador = event.currentTarget;
    const seletor = botaoAcionador.dataset.deslocamentoAteAlvo;

    const elementoAlvo = document.querySelector(seletor);

    if (elementoAlvo) {
      elementoAlvo.scrollIntoView(this.scrollIntoViewOptions);
    }
  }
}
