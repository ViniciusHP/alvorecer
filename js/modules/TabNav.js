/**
 * Classe que controla navegação de abas.
 */
export default class TabNav {
  constructor(seletorAcionador, seletorAlvo, classeAtiva) {
    this.acionadores = document.querySelectorAll(seletorAcionador);
    this.alvos = document.querySelectorAll(seletorAlvo);

    if (classeAtiva === undefined) {
      this.classeAtiva = 'ativo';
    } else {
      this.classeAtiva = classeAtiva;
    }

    this.callbackTabNavChange = [];

    this.acionadorHandler = this.acionadorHandler.bind(this);
  }

  /**
   * Inicializa as funcionalidades.
   * @returns Instância atual.
   */
  init() {
    if (this.acionadores.length && this.alvos.length) {
      this.addEventAcionadores();
      this.acionar(this.acionadores[0], this.alvos[0]);
    }

    return this;
  }

  /**
   * Adiciona tratador de evento de clique nos botões acionadores.
   */
  addEventAcionadores() {
    this.acionadores.forEach((acionador) => {
      acionador.addEventListener('click', this.acionadorHandler);
    });
  }

  /**
   * Trata evento de clique, desacionando outras abas e ativando a que foi acionada.
   * @param {*} event Evento
   */
  acionadorHandler(event) {
    event.preventDefault();
    const acionador = event.currentTarget;
    const href = acionador.getAttribute('href');
    const alvo = document.querySelector(href);

    this.desacionarTodos();
    this.acionar(acionador, alvo);
    this.executeAllCallbacksTabNavChange();
  }

  /**
   * Aciona a aba atual.
   * @param {*} acionador Elemento navegador
   * @param {*} alvo Elemento aba
   */
  acionar(acionador, alvo) {
    acionador.classList.add(this.classeAtiva);
    alvo.classList.add(this.classeAtiva);
  }

  /**
   * Desacionada todas as abas.
   */
  desacionarTodos() {
    this.acionadores.forEach((acionador) => acionador.classList.remove(this.classeAtiva));
    this.alvos.forEach((alvo) => alvo.classList.remove(this.classeAtiva));
  }

  /**
   * Adiciona uma callback para ser chamada quando uma navegação ocorre.
   * Isso é importante quando o conteúdo da aba variar, fazendo com que o tamanho
   * da página mude e por consequência as distâncias das seções também.
   * @param {*} callback Função que deve ser chamada após ocorrer uma navegação.
   */
  addCallbackTabNavChange(callback) {
    this.callbackTabNavChange.push(callback);
  }

  /**
   * Executa todas as callbacks quando ocorrer uma navegação.
   */
  executeAllCallbacksTabNavChange() {
    this.callbackTabNavChange.forEach((callback) => {
      callback();
    });
  }
}
