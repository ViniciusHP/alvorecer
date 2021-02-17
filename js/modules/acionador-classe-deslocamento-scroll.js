import debounce from './debouce.js';

export default class AcionadorDeClasseAoDeslocamentoScroll {
  constructor(elementosAcionadores, elementosAlvo, activeClass, showClass) {
    this.elementosAcionadores = document.querySelectorAll(elementosAcionadores);
    this.elementosAlvo = document.querySelectorAll(elementosAlvo);

    if (activeClass !== undefined) {
      this.activeClass = activeClass;
    } else {
      this.activeClass = 'ativo';
    }

    if (showClass !== undefined) {
      this.showClass = showClass;
    } else {
      this.showClass = 'show';
    }

    this.acionaAlvoHandler = debounce(this.acionaAlvoHandler.bind(this), 100);
    this.recarregaDadosDePosicionamento = this.recarregaDadosDePosicionamento.bind(this);
  }

  init() {
    if (this.elementosAcionadores.length && this.elementosAlvo.length) {
      // Espera que todos componentes sejam carregados para depois calcular as distâncias
      setTimeout(() => {
        this.carregaDadosDePosicionamento();
        this.addEventAoScroll();
        this.acionaAlvoHandler();
      }, 200);
    }

    return this;
  }

  carregaDadosDePosicionamento() {
    this.dadosDePosicionamentoERelacionamento = [];

    this.elementosAcionadores.forEach((acionador) => {
      let inicio = acionador.offsetTop;
      const altura = acionador.offsetHeight;
      let fim = inicio + altura;

      const umQuartoDaTela = window.outerHeight / 4;
      const alturaMenuBar = document.querySelector('.barra-menu').offsetHeight;

      if (alturaMenuBar) {
        inicio -= alturaMenuBar;
        fim -= alturaMenuBar;
      }
      inicio -= umQuartoDaTela;
      fim -= umQuartoDaTela;

      const nomeAlvo = acionador.dataset.acionarAoScrollAcionador;
      const alvo = this.obtemElementoAlvoCorrespondenteAoNome(nomeAlvo);

      const dados = {
        acionador,
        inicio,
        fim,
        alvo,
      };

      this.dadosDePosicionamentoERelacionamento.push(dados);
    });
  }

  obtemElementoAlvoCorrespondenteAoNome(nome) {
    let alvo;

    this.elementosAlvo.forEach((elementoAlvo) => {
      if (nome === elementoAlvo.dataset.acionarAoScrollAlvo) {
        alvo = elementoAlvo;
      }
    });

    return alvo;
  }

  addEventAoScroll() {
    window.addEventListener('scroll', this.acionaAlvoHandler);
    window.addEventListener('resize', this.recarregaDadosDePosicionamento);
  }

  acionaAlvoHandler() {
    const currentPageYOffset = Math.floor(window.pageYOffset);
    this.dadosDePosicionamentoERelacionamento.forEach((dados) => {
      const { inicio, fim } = dados;

      if (currentPageYOffset > inicio && currentPageYOffset < fim) {
        dados.alvo.classList.add(this.activeClass);
        dados.acionador.classList.add(this.activeClass);
        dados.acionador.classList.add(this.showClass);
      } else {
        dados.alvo.classList.remove(this.activeClass);
        dados.acionador.classList.remove(this.activeClass);
      }
    });
  }

  recarregaDadosDePosicionamento() {
    setTimeout(() => {
      this.carregaDadosDePosicionamento();
      this.acionaAlvoHandler();
    }, 1000);
  }
}
