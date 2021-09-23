/**
 * Classe que controla Dropdowns.
 */
export default class Dropdown {
  /**
   * @param {*} seletorDropdowns Seletor CSS do dropdown.
   * @param {*} classeAtiva Classe CSS que deve ser aplicada quando o dropdown estiver ativo.
   */
  constructor(seletorDropdowns, classeAtiva) {
    this.acionadoresMenuDropdown = document.querySelectorAll(seletorDropdowns);

    if (classeAtiva === undefined) {
      this.classeAtiva = 'ativa';
    } else {
      this.classeAtiva = classeAtiva;
    }

    this.infoDropdowns = [];

    this.trataAberturaDoDropdown = this.trataAberturaDoDropdown.bind(this);
    this.trataFechamentoDoDropdown = this.trataFechamentoDoDropdown.bind(this);
  }

  /**
   * Inicializa as funcionalidades.
   * @returns Instância atual.
   */
  init() {
    if (this.acionadoresMenuDropdown.length) {
      this.adicionaEventoAoCliqueEmTodosAcionadores();
    }

    return this;
  }

  /**
   * Método que adiciona o tratamento de evento de click nos dropdowns.
   */
  adicionaEventoAoCliqueEmTodosAcionadores() {
    this.acionadoresMenuDropdown.forEach((acionador) => acionador.addEventListener('click', this.trataAberturaDoDropdown));
  }

  /**
   * Método que trata o evento de click de cada dropdown para ativação do dropdown.
   * @param {*} event Evento de click.
   */
  trataAberturaDoDropdown(event) {
    const acionador = event.target;
    const idAlvo = acionador.dataset.dropdown;
    const dropdown = document.querySelector(idAlvo);

    this.ativarDropdown(acionador, dropdown);
  }

  /**
   * Método que faz com que o dropdown esteja ativo.
   * @param {*} acionador Elemento que ativa o dropdown.
   * @param {*} elemento Elemento que é exibido quando o dropdown está ativo.
   */
  ativarDropdown(acionador, elemento) {
    elemento.classList.add(this.classeAtiva);
    acionador.removeEventListener('click', this.trataAberturaDoDropdown);
    acionador.addEventListener('click', this.trataFechamentoDoDropdown);

    setTimeout(() => this.adicionaEventoDeFechamentoDoDropdownNoHtml(acionador, elemento), 200);
  }

  /**
   * Método que trata o evento de click de cada dropdown para desativação do dropdown.
   * @param {*} event Evento de click.
   */
  trataFechamentoDoDropdown(event) {
    const acionador = event.target;
    const idAlvo = acionador.dataset.dropdown;
    const dropdown = document.querySelector(idAlvo);

    this.desativarDropdown(dropdown);
    acionador.removeEventListener('click', this.trataFechamentoDoDropdown);
    acionador.addEventListener('click', this.trataAberturaDoDropdown);
  }

  /**
   * Método que trata o evento de click do elemento html, se for clicado fora do dropdown
   * ele será desativado.
   * @param {*} acionador Elemento que ativa o dropdown.
   * @param {*} elemento Elemento que é exibido quando o dropdown está ativo.
   */
  adicionaEventoDeFechamentoDoDropdownNoHtml(acionador, elemento) {
    const html = document.documentElement;
    const trataFechamentoDoDropdownNoHtml = (event) => {
      const { target } = event;

      if (this.target === acionador || !elemento.contains(target)) {
        this.desativarDropdown(elemento);
        this.trataFechamentoDoDropdown({ target: acionador });
        html.removeEventListener('click', trataFechamentoDoDropdownNoHtml);
      }
    };

    html.addEventListener('click', trataFechamentoDoDropdownNoHtml);
  }

  /**
   * Remove a exibição do dropdown.
   * @param {*} elemento Elemento que é exibido quando o dropdown está ativo.
   */
  desativarDropdown(elemento) {
    elemento.classList.remove(this.classeAtiva);
  }
}
