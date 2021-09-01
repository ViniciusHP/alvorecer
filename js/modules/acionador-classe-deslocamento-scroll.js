import debounce from './debouce.js';

/**
 * Classe responsável por adicionar classe CSS a partir do scroll.
 * Quando o scroll estiver em um elemento acionador, será adicionada uma
 * classe CSS tanto no elemento acionador quanto no elemento alvo.
 */
export default class AcionadorDeClasseAoDeslocamentoScroll {
  /**
   * @param {*} elementosAcionadores Seletor CSS dos elementos acionadores.
   * @param {*} elementosAlvo Seletor CSS dos elementos alvo.
   * @param {*} activeClass Classe que será adicionada ao elemento alvo.
   * @param {*} showClass Classe que será adicionada ao elemento acionador.
   */
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

  /**
   * Inicializa as funcionalidades
   * @returns Instância atual.
   */
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

  /**
   * Método responsável por extrair as posições de inicio e fim dos elementos
   * acionadores, assim como obter o elemento alvo correspondente ao acionador.
   */
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

  /**
   * Obtém um elemento alvo a partir do nome.
   * @param {*} nome Nome do alvo que está no dataset.
   * @returns Elemento alvo.
   */
  obtemElementoAlvoCorrespondenteAoNome(nome) {
    let alvo;

    this.elementosAlvo.forEach((elementoAlvo) => {
      if (nome === elementoAlvo.dataset.acionarAoScrollAlvo) {
        alvo = elementoAlvo;
      }
    });

    return alvo;
  }

  /**
   * Adiciona tanto evento que lida com o scroll, quando evento de
   * resize da tela, para que os dados de posicionamento sejam recarregados.
   */
  addEventAoScroll() {
    window.addEventListener('scroll', this.acionaAlvoHandler);
    window.addEventListener('resize', this.recarregaDadosDePosicionamento);
  }

  /**
   * Método responsável por tratar o evento de scroll.
   * Se o scroll estiver dentro da área de algum elemento acionador,
   * será adicionada uma classe CSS tanto no elemento acionador (para exibir o conteúdo)
   * quanto no elemento alvo (indicação na barra de menu qual a seção atual).
   */
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

  /**
   * Realiza a atualização dos dados de posicionamento.
   */
  recarregaDadosDePosicionamento() {
    setTimeout(() => {
      this.carregaDadosDePosicionamento();
      this.acionaAlvoHandler();
    }, 1000);
  }
}
