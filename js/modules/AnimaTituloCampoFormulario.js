/**
 * Classe que anima os títulos de campos de formulário.
 */
export default class AnimaTituloCampoFormulario {
  /**
   * @param {*} seletorTitulos Seletor CSS dos títulos dos campos.
   * @param {*} classeAtiva Classe CSS para animar título.
   */
  constructor(seletorTitulos, classeAtiva) {
    this.titulos = document.querySelectorAll(seletorTitulos);
    this.campos = [];

    if (classeAtiva !== undefined) {
      this.classeAtiva = classeAtiva;
    } else {
      this.classeAtiva = 'ativo';
    }

    this.eventTypes = ['touchstart', 'click'];

    this.onFieldFocusOut = this.onFieldFocusOut.bind(this);
  }

  /**
   * Inicializa as funcionalidades.
   * @returns Instância atual.
   */
  init() {
    if (this.titulos.length) {
      this.getCampos();
      this.addEventOnClick();
      this.addEventFieldOnFocusOut();
      this.verificaSeAlgumCampoJaEstaPreenchido();
    }

    return this;
  }

  /**
   * Obtém os campos que estão associados aos títulos.
   */
  getCampos() {
    this.titulos.forEach((t) => {
      const campoId = t.getAttribute('for');
      const campo = document.querySelector('#'.concat(campoId));

      if (campo) {
        this.campos.push(campo);
      }
    });
  }

  /**
   * Adiciona tratamento de evento de click e touchstart para os títulos.
   */
  addEventOnClick() {
    this.eventTypes.forEach((eventType) => {
      this.titulos.forEach((titulo) => {
        titulo.addEventListener(eventType, this.onLabelClick);
      });
    });
  }

  /**
   * Adiciona tratamento de evento de perda de foco dos campos.
   */
  addEventFieldOnFocusOut() {
    this.campos.forEach((campo) => campo.addEventListener('focusout', this.onFieldFocusOut));
  }

  /**
   * Método que trata o click no título.
   * @param {*} event - Evento de click ou touchstart.
   */
  onLabelClick(event) {
    const titulo = event.currentTarget;

    const campoId = titulo.getAttribute('for');
    const campo = document.querySelector('#'.concat(campoId));

    if (campo) {
      campo.focus();
    }
  }

  /**
   * Método que trata o evento de perda de foco dos campos.
   * @param {*} event - Evento de focusout.
   */
  onFieldFocusOut(event) {
    const campo = event.currentTarget;

    this.adicionaClasseAoCampoSePreenchido(campo);
  }

  /**
   * Verifica se algum campo está preenchido ou não
   */
  verificaSeAlgumCampoJaEstaPreenchido() {
    this.campos.forEach((campo) => {
      this.adicionaClasseAoCampoSePreenchido(campo);
    });
  }

  /**
   * Adiciona classe CSS se o campo atual preenchido, e remove a classe
   * caso ele não esteja preenchido.
   * @param {*} campo Campo atual
   */
  adicionaClasseAoCampoSePreenchido(campo) {
    if (campo.value.length > 0) {
      campo.classList.add(this.classeAtiva);
    } else {
      campo.classList.remove(this.classeAtiva);
    }
  }
}
