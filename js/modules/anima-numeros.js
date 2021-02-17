export default class AnimaNumero {
  constructor(seletorElementoASerObservado, classeASerObservada,
    seletorElementoParaAnimar, milisegundosAnimacao) {
    this.elementoASerObservado = document.querySelector(seletorElementoASerObservado);
    this.classeASerObservada = classeASerObservada;
    this.elementoParaAnimar = document.querySelector(seletorElementoParaAnimar);
    this.milisegundosAnimacao = milisegundosAnimacao;

    this.observerCallback = this.observerCallback.bind(this);
  }

  init() {
    if (this.elementoASerObservado && this.classeASerObservada && this.elementoParaAnimar) {
      this.addObserver();
    } else if (this.elementoParaAnimar) {
      this.animarNumero();
    }

    return this;
  }

  addObserver() {
    this.observer = new MutationObserver(this.observerCallback);
    this.observer.observe(this.elementoASerObservado, { attributes: true });
  }

  observerCallback() {
    if (this.elementoASerObservado.classList.contains(this.classeASerObservada)) {
      this.animarNumero();
      this.observer.disconnect();
    }
  }

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
