/**
 * Classe que faz Nevar!
 */
export default class Neve {
  constructor(classeContainerNeve, classeFlocoDeNeve, classeFlocoDeNeveNaEspera,
    numeroDeFlocosDeNeve, tempoEntreFlocos, arrayUrlsTiposDeFlocosDeNeve) {
    this.classeContainerNeve = classeContainerNeve;
    this.classeFlocoDeNeve = classeFlocoDeNeve;
    this.classeFlocoDeNeveNaEspera = classeFlocoDeNeveNaEspera;

    this.arrayUrlsTiposDeFlocosDeNeve = arrayUrlsTiposDeFlocosDeNeve;

    if (numeroDeFlocosDeNeve === undefined || numeroDeFlocosDeNeve <= 0) {
      this.numeroDeFlocosDeNeve = 30;
    } else {
      this.numeroDeFlocosDeNeve = numeroDeFlocosDeNeve;
    }

    if (tempoEntreFlocos === undefined || tempoEntreFlocos < 0) {
      this.tempoEntreFlocos = 300;
    } else {
      this.tempoEntreFlocos = tempoEntreFlocos;
    }

    this.infoFlocos = [];
    this.blobFlocosDeNeve = [];
  }

  /**
   * Inicializa as funcionalidades.
   * @returns Instância atual.
   */
  init() {
    if (this.classeContainerNeve && this.classeFlocoDeNeve) {
      this.selecionarContainerNeve();
      this.criarTodosFlocosDeNeve();
    }

    return this;
  }

  /**
   * Seleciona o elemento que servirá de container para os flocos de neve.
   */
  selecionarContainerNeve() {
    this.containerNeve = document.querySelector(this.classeContainerNeve);

    if (!this.containerNeve) {
      this.containerNeve = document.createElement('div');
      this.containerNeve.classList.add(this.classeContainerNeve);
      document.body.appendChild(this.containerNeve);
    }
  }

  /**
   * Cria um array com todos os flocos de neve.
   */
  criarTodosFlocosDeNeve() {
    const listaFlocosDeNeve = [];

    for (let count = 0; count < this.numeroDeFlocosDeNeve; count += 1) {
      listaFlocosDeNeve.push(this.criaFlocoDeNeve());
    }

    listaFlocosDeNeve.forEach((floco) => {
      this.infoFlocos.push({
        flocoDeNeve: floco,
        isNaTela: false,
        isAnimacaoFinalizada: true,
        isPresenteNoDOM: false,
      });
    });
  }

  /**
   * Cria cada floco de maneira unitária.
   * @returns Elemento <i>
   */
  criaFlocoDeNeve() {
    const flocoDeNeve = document.createElement('i');
    this.adicionarClasseDeEsperaAoFlocoDeNeve(flocoDeNeve);
    return flocoDeNeve;
  }

  /**
   * Altera os estilos do floco de neve de maneira aleatória.
   * @param {*} flocoDeNeve Floco que receberá novos estilos.
   * @returns Flocos com os estilos alterados.
   */
  alterarParametrosFlocoDeNeve(flocoDeNeve) {
    const duracaoDaAnimacaoCaidaDoFlocoDeNeve = Math.floor(Math.random() * 3) + 5;
    const duracaoDoAnimacaoDeMovimentoDoFlocoDeNeve = Math.random() * 5 + 5;

    flocoDeNeve.style.animationDuration = `${
      duracaoDaAnimacaoCaidaDoFlocoDeNeve}s, ${duracaoDoAnimacaoDeMovimentoDoFlocoDeNeve}s`;
    flocoDeNeve.style.opacity = Math.random();
    flocoDeNeve.style.left = `${Math.random() * (window.innerWidth - 20)}px`;

    flocoDeNeve.style.content = `url(${this.blobFlocosDeNeve[Math.floor(Math.random()
      * this.blobFlocosDeNeve.length)]})`;

    const width = `${Math.random() * 10 + 10}px`;
    flocoDeNeve.style.width = width;
    flocoDeNeve.style.height = width;

    return flocoDeNeve;
  }

  /**
   * Realizar requisições assíncronas para obter as imagens dos flocos
   */
  fazerFetchParaObterImagensDosFlocos() {
    this.arrayPromisesObtencaoDasImagensDosFlocos = [];

    for (const url of this.arrayUrlsTiposDeFlocosDeNeve) {
      const promise = fetch(url)
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((blobUrl) => this.blobFlocosDeNeve.push(blobUrl));
      this.arrayPromisesObtencaoDasImagensDosFlocos.push(promise);
    }
  }

  /**
   * Inicia a animação da neve.
   */
  iniciarNevasca() {
    /* Se os flocos de neve não estão carregados,
    realiza as requisições antes de iniciar a animação */
    if (this.blobFlocosDeNeve.length !== this.arrayUrlsTiposDeFlocosDeNeve.length) {
      this.fazerFetchParaObterImagensDosFlocos();
      Promise.all(this.arrayPromisesObtencaoDasImagensDosFlocos)
        .then(() => this.iniciarTodosParametrosDeTodosFlocos())
        .then(() => this.iniciarIntervalo());
    } else {
      this.iniciarIntervalo();
    }
  }

  /**
   * Inicializa os estilos de todos os flocos criados.
   */
  iniciarTodosParametrosDeTodosFlocos() {
    this.infoFlocos.forEach((info) => {
      info.flocoDeNeve = this.alterarParametrosFlocoDeNeve(info.flocoDeNeve);
    });
  }

  /**
   * Inicializa o timer da neve.
   */
  iniciarIntervalo() {
    this.posicaoDoCursorNoArray = 0;

    this.intervaloNevasca = setInterval(() => {
      const infoFlocoAtual = this.infoFlocos[this.posicaoDoCursorNoArray];

      if (infoFlocoAtual.isAnimacaoFinalizada && !infoFlocoAtual.isNaTela) {
        this.animarFlocoAtual(infoFlocoAtual);
      }
    }, this.tempoEntreFlocos);
  }

  /**
   * Para a animação da neve.
   */
  pararNevasca() {
    if (this.intervaloNevasca) {
      clearInterval(this.intervaloNevasca);
      this.intervaloNevasca = null;
    }
  }

  /**
   * Anima cada floco separadamente.
   * @param {*} infoFlocoAtual Informações do floco atual.
   */
  animarFlocoAtual(infoFlocoAtual) {
    const floco = infoFlocoAtual.flocoDeNeve;
    this.adicionarClasseDeFlocoDeNeve(floco);
    this.removerClasseDeEsperaDoFlocoDeNeve(floco);

    if (!infoFlocoAtual.isPresenteNoDOM) {
      this.containerNeve.appendChild(floco);
      infoFlocoAtual.isPresenteNoDOM = true;
    }

    infoFlocoAtual.isNaTela = true;
    infoFlocoAtual.isAnimacaoFinalizada = false;

    setTimeout(() => {
      this.removerClasseDeFlocoDeNeve(floco);
      this.adicionarClasseDeEsperaAoFlocoDeNeve(floco);

      infoFlocoAtual.flocoDeNeve = this.alterarParametrosFlocoDeNeve(infoFlocoAtual.flocoDeNeve);
      infoFlocoAtual.isNaTela = false;
      infoFlocoAtual.isAnimacaoFinalizada = true;
    }, 8000);

    this.posicaoDoCursorNoArray += 1;

    if (this.posicaoDoCursorNoArray >= this.infoFlocos.length) {
      this.posicaoDoCursorNoArray = 0;
    }
  }

  /**
   * Adiciona classe de floco de neve no elemento.
   * @param {*} elemento Elemento que receberá o estilo.
   */
  adicionarClasseDeFlocoDeNeve(elemento) {
    elemento.classList.add(this.classeFlocoDeNeve);
  }

  /**
   * Remove classe de floco de neve no elemento.
   * @param {*} elemento Elemento que terá o estilo removido.
   */
  removerClasseDeFlocoDeNeve(elemento) {
    elemento.classList.remove(this.classeFlocoDeNeve);
  }

  /**
   * Adiciona classe que faz o floco de neve volte para cima.
   * @param {*} elemento Elemento que representa o floco de neve.
   */
  adicionarClasseDeEsperaAoFlocoDeNeve(elemento) {
    elemento.classList.add(this.classeFlocoDeNeveNaEspera);
  }

  /**
   * Remove classe de espera do floco de neve.
   * @param {*} elemento Elemento que representa o floco de neve.
   */
  removerClasseDeEsperaDoFlocoDeNeve(elemento) {
    elemento.classList.remove(this.classeFlocoDeNeveNaEspera);
  }
}
