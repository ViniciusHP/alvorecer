/**
 * Classe responsável pela funcionalidade de Accordion.
 */
export default class Accordion {
  /**
   * @param {*} elementosAcionadores Seletor CSS dos elementos acionadores.
   * @param {*} classeAtiva Classe CSS que será adicionada ao elemento acinado.
   */
  constructor(elementosAcionadores, classeAtiva) {
    this.elementosAcionadores = document.querySelectorAll(elementosAcionadores);

    if (classeAtiva === undefined) {
      this.classeAtiva = 'ativo';
    } else {
      this.classeAtiva = classeAtiva;
    }

    this.callbackAccordionToggle = [];

    this.acionadorHandler = this.acionadorHandler.bind(this);
  }

  /**
   * Inicializa a funcionalidade de Accordion.
   * @returns Instância atual de Accordion.
   */
  init() {
    if (this.elementosAcionadores.length) {
      this.addEventAccordion();
    }

    return this;
  }

  /**
   * Adiciona evento de click aos acionadores.
   */
  addEventAccordion() {
    this.elementosAcionadores.forEach((acionador) => {
      acionador.addEventListener('click', this.acionadorHandler);
    });
  }

  /**
   * Método responsável por tratar o evento de click do acionador.
   * @param {*} event - evento de click
   */
  acionadorHandler(event) {
    event.preventDefault();
    const acionador = event.currentTarget;
    const href = acionador.getAttribute('href');

    if (href !== undefined) {
      const alvo = document.querySelector(href);

      if (acionador && alvo) {
        acionador.classList.toggle(this.classeAtiva);
        alvo.classList.toggle(this.classeAtiva);
        this.executeAllCallbacksAccordionToggle();
      }
    }
  }

  /**
   * Adiciona uma callback que será chamada toda vez que o Accordion
   * alternar entre aberto e fechado.
   * @param {*} callback - função que será chamada
   */
  addCallbackAccordionToggle(callback) {
    this.callbackAccordionToggle.push(callback);
  }

  /**
   * Executa o código de todas as callbacks que foram adicionadas através do método
   * addCallbackAccordionToggle.
   */
  executeAllCallbacksAccordionToggle() {
    this.callbackAccordionToggle.forEach((callback) => {
      callback();
    });
  }
}
