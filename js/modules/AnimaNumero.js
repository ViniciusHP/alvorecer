/**
 * Classe que executa a animação de contagem progressiva até determinado número.
 */
export default class AnimaNumero {
  /**
   * @param {*} seletorElementoASerObservado Seletor CSS do elemento que terá classe
   * a ser observada.
   * @param {*} classeASerObservada Classe CSS que será observada.
   * @param {*} seletorElementoParaAnimar Seletor CSS do elemento que contém o número.
   * @param {*} milisegundosAnimacao Tempo de duração da animação.
   */
  constructor(seletorElementoASerObservado, classeASerObservada,
    seletorElementoParaAnimar, milisegundosAnimacao) {
    this.elementoASerObservado = document.querySelector(seletorElementoASerObservado);
    this.classeASerObservada = classeASerObservada;
    this.elementoParaAnimar = document.querySelector(seletorElementoParaAnimar);
    this.milisegundosAnimacao = milisegundosAnimacao;

    this.observerCallback = this.observerCallback.bind(this);
  }

  /**
   * Inicializa as funcionalidades.
   * @returns Instância atual.
   */
  init() {
    if (this.elementoASerObservado && this.classeASerObservada && this.elementoParaAnimar) {
      this.addObserver();
    } else if (this.elementoParaAnimar) {
      this.animarNumero();
    }

    return this;
  }

  /**
   * Método que adiciona um observador a mutação de atributos de 'elementoASerObservado'
   */
  addObserver() {
    this.observer = new MutationObserver(this.observerCallback);
    this.observer.observe(this.elementoASerObservado, { attributes: true });
  }

  /**
   * Método que processa as mutações de atributos.
   * Se a 'classeASerObservada' estiver presente em 'elementoASerObservado',
   * a animação dos números será iniciada.
   */
  observerCallback() {
    if (this.elementoASerObservado.classList.contains(this.classeASerObservada)) {
      this.animarNumero();
      this.observer.disconnect();
    }
  }

  /**
   * Método que executa a animação dos números
   */
  animarNumero() {
    const total = Number(this.elementoParaAnimar.innerText);
    const iteracoes = 100;

    const incremento = Math.ceil(total / iteracoes);
    const passo = this.milisegundosAnimacao / iteracoes;
    let soma = 0;

    this.elementoParaAnimar.innerText = 0;

    const incrementaSoma = () => {
      soma += incremento;

      if (soma > total) {
        this.elementoParaAnimar.innerText = total;
      } else {
        this.elementoParaAnimar.innerText = soma;
      }
    };

    for (let count = 0; count < iteracoes; count += 1) {
      setTimeout(incrementaSoma, count * passo);
    }
  }
}
