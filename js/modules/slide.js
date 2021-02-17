export default class Slide {
  constructor(seletorSlide, seletorSlideItens, seletorControlesContainer,
    seletorBotoesControles, tempoEntreSlides, classeAtivaControles) {
    this.slide = document.querySelector(seletorSlide);
    this.slideItens = this.slide.querySelectorAll(seletorSlideItens);

    this.controlesContainer = document.querySelector(seletorControlesContainer);
    this.controlesBotoes = this.controlesContainer.querySelectorAll(seletorBotoesControles);

    if (tempoEntreSlides === undefined) {
      this.tempoEntreSlides = 5000;
    } else {
      this.tempoEntreSlides = tempoEntreSlides;
    }

    if (classeAtivaControles === undefined) {
      this.classeAtivaControles = 'ativo';
    } else {
      this.classeAtivaControles = classeAtivaControles;
    }

    this.onMouseOverHandler = this.onMouseOverHandler.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
  }

  init() {
    if (this.slide && this.slideItens.length) {
      this.carregaDadosPosicionamentoTodosItens();
      this.exibeSlide(0);
      this.addEventControles();
      this.criarTimer();
      this.addEventOnMouseOver();
    }

    return this;
  }

  carregaDadosPosicionamentoAtual(indiceAtual) {
    const indiceFinal = this.dadosPosicionamentoTodosItensSlide.length - 1;

    let slideAnterior;
    let slidePosterior;
    const slideAtual = indiceAtual;

    if (indiceAtual <= 0) {
      slideAnterior = indiceFinal;
    } else {
      slideAnterior = indiceAtual - 1;
    }

    if (indiceAtual >= indiceFinal) {
      slidePosterior = 0;
    } else {
      slidePosterior = indiceAtual + 1;
    }

    this.dadosPosicaoAtual = {
      slideAnterior,
      slideAtual,
      slidePosterior,
    };
  }

  carregaDadosPosicionamentoTodosItens() {
    this.dadosPosicionamentoTodosItensSlide = [];

    this.slideItens.forEach((item, indice) => {
      const distancia = `${-(indice * 100)}vw`;
      const dados = {
        item,
        indice,
        distancia,
      };
      this.dadosPosicionamentoTodosItensSlide.push(dados);
    });
  }

  indicaSlideAtualNosControles(indice) {
    this.controlesBotoes.forEach((elemento, indiceBotao) => {
      if (indice === indiceBotao) {
        elemento.classList.add(this.classeAtivaControles);
      } else {
        elemento.classList.remove(this.classeAtivaControles);
      }
    });
  }

  exibeSlide(indice) {
    this.slide.style.transform = `translate3d(${this.dadosPosicionamentoTodosItensSlide[indice].distancia}, 0, 0)`;
    this.carregaDadosPosicionamentoAtual(indice);
    this.indicaSlideAtualNosControles(indice);
  }

  slidePosterior() {
    this.exibeSlide(this.dadosPosicaoAtual.slidePosterior);
  }

  slideAnterior() {
    this.exibeSlide(this.dadosPosicaoAtual.slideAnterior);
  }

  criarTimer() {
    this.timer = setInterval(() => {
      this.slidePosterior();
    }, this.tempoEntreSlides);

    this.isTimerLimpo = false;
  }

  limparTimer() {
    clearInterval(this.timer);

    this.isTimerLimpo = true;
  }

  addEventControles() {
    if (this.controlesBotoes.length) {
      this.controlesBotoes.forEach((elemento, indice) => {
        elemento.addEventListener('click', (event) => {
          event.preventDefault();

          this.limparTimer();
          this.exibeSlide(indice);
          this.criarTimer();
        });
      });
    }
  }

  addEventOnMouseOver() {
    this.slide.addEventListener('mouseover', this.onMouseOverHandler);
  }

  set isTimerLimpo(isTimerLimpo) {
    this._isTimerLimpo = isTimerLimpo;
  }

  get isTimerLimpo() {
    return this._isTimerLimpo;
  }

  onMouseOverHandler({ target }) {
    if (this.slide.contains(target) && !this.isTimerLimpo) {
      this.limparTimer();
      this.slide.addEventListener('mouseleave', this.onMouseLeaveHandler);
    }
  }

  onMouseLeaveHandler() {
    this.criarTimer();
    this.slide.removeEventListener('mouseleave', this.onMouseLeaveHandler);
  }
}
