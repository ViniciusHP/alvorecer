/**
 * Classe que controla o slide.
 */
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

  /**
   * Inicializa as funcionalidades.
   * @returns Instância atual.
   */
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

  /**
   * Atualiza os dados do índice do slide, como o próximo indice,
   * o índice anterior e o novo índice atual.
   * @param {*} indiceAtual Índice atual do slide.
   */
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

  /**
   * Carrega as posições dos itens do slide.
   */
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

  /**
   * Adiciona classe nos botões de controle, indicando qual o slide atual.
   * @param {*} indice Índice do slide atual.
   */
  indicaSlideAtualNosControles(indice) {
    this.controlesBotoes.forEach((elemento, indiceBotao) => {
      if (indice === indiceBotao) {
        elemento.classList.add(this.classeAtivaControles);
      } else {
        elemento.classList.remove(this.classeAtivaControles);
      }
    });
  }

  /**
   * Exibe determinado item do slide a partir de seu índice.
   * @param {*} indice Índice do item do slide.
   */
  exibeSlide(indice) {
    this.slide.style.transform = `translate3d(${this.dadosPosicionamentoTodosItensSlide[indice].distancia}, 0, 0)`;
    this.carregaDadosPosicionamentoAtual(indice);
    this.indicaSlideAtualNosControles(indice);
  }

  /**
   * Move o slide para o item anterior.
   */
  slidePosterior() {
    this.exibeSlide(this.dadosPosicaoAtual.slidePosterior);
  }

  /**
   * Move o slide para o próximo item.
   */
  slideAnterior() {
    this.exibeSlide(this.dadosPosicaoAtual.slideAnterior);
  }

  /**
   * Inicializa timer para movimentar o slide.
   */
  criarTimer() {
    this.timer = setInterval(() => {
      this.slidePosterior();
    }, this.tempoEntreSlides);

    this.isTimerLimpo = false;
  }

  /**
   * Finaliza o timer que movimenta o slide.
   */
  limparTimer() {
    clearInterval(this.timer);

    this.isTimerLimpo = true;
  }

  /**
   * Adiciona tratamento de evento de clique nos botões de controle
   * do slide.
   */
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

  /**
   * Adiciona tratamento de evento quando o mouse estiver no slide.
   */
  addEventOnMouseOver() {
    this.slide.addEventListener('mouseover', this.onMouseOverHandler);
  }

  set isTimerLimpo(isTimerLimpo) {
    this._isTimerLimpo = isTimerLimpo;
  }

  get isTimerLimpo() {
    return this._isTimerLimpo;
  }

  /**
   * Se o mouse estiver em cima do slide, a animação dele é parada.
   */
  onMouseOverHandler({ target }) {
    if (this.slide.contains(target) && !this.isTimerLimpo) {
      this.limparTimer();
      this.slide.addEventListener('mouseleave', this.onMouseLeaveHandler);
    }
  }

  /**
   * Se o mouse não estiver em cima do slide, a animação dele é iniciada.
   */
  onMouseLeaveHandler() {
    this.criarTimer();
    this.slide.removeEventListener('mouseleave', this.onMouseLeaveHandler);
  }
}
