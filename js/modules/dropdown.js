export default class Dropdown {
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

  init() {
    if (this.acionadoresMenuDropdown.length) {
      this.adicionaEventoAoCliqueEmTodosAcionadores();
    }

    return this;
  }

  adicionaEventoAoCliqueEmTodosAcionadores() {
    this.acionadoresMenuDropdown.forEach((acionador) => acionador.addEventListener('click', this.trataAberturaDoDropdown));
  }

  trataAberturaDoDropdown(event) {
    const acionador = event.target;
    const idAlvo = acionador.dataset.dropdown;
    const dropdown = document.querySelector(idAlvo);

    this.ativarDropdown(acionador, dropdown);
  }

  ativarDropdown(acionador, elemento) {
    elemento.classList.add(this.classeAtiva);
    acionador.removeEventListener('click', this.trataAberturaDoDropdown);
    acionador.addEventListener('click', this.trataFechamentoDoDropdown);

    setTimeout(() => this.adicionaEventoDeFechamentoDoDropdownNoHtml(acionador, elemento), 200);
  }

  trataFechamentoDoDropdown(event) {
    const acionador = event.target;
    const idAlvo = acionador.dataset.dropdown;
    const dropdown = document.querySelector(idAlvo);

    this.desativarDropdown(dropdown);
    acionador.removeEventListener('click', this.trataFechamentoDoDropdown);
    acionador.addEventListener('click', this.trataAberturaDoDropdown);
  }

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

  desativarDropdown(elemento) {
    elemento.classList.remove(this.classeAtiva);
  }
}
