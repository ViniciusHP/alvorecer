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

  init() {
    if (this.classeContainerNeve && this.classeFlocoDeNeve) {
      this.selecionarContainerNeve();
      this.criarTodosFlocosDeNeve();
    }

    return this;
  }

  selecionarContainerNeve() {
    this.containerNeve = document.querySelector(this.classeContainerNeve);

    if (!this.containerNeve) {
      this.containerNeve = document.createElement('div');
      this.containerNeve.classList.add(this.classeContainerNeve);
      document.body.appendChild(this.containerNeve);
    }
  }

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

  criaFlocoDeNeve() {
    const flocoDeNeve = document.createElement('i');
    this.adicionarClasseDeEsperaAoFlocoDeNeve(flocoDeNeve);
    return flocoDeNeve;
  }

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

  async fazerFetchParaObterImagensDosFlocos() {
    for (const url of this.arrayUrlsTiposDeFlocosDeNeve) {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      this.blobFlocosDeNeve.push(blobUrl);
    }
  }

  async iniciarNevasca() {
    /* Se os flocos de neve não estão carregados,
    realiza as requisições antes de iniciar a animação */
    if (this.blobFlocosDeNeve.length !== this.arrayUrlsTiposDeFlocosDeNeve.length) {
      await this.fazerFetchParaObterImagensDosFlocos();
      this.infoFlocos.forEach((info) => {
        info.flocoDeNeve = this.alterarParametrosFlocoDeNeve(info.flocoDeNeve);
      });
    }

    this.posicaoDoCursorNoArray = 0;
    this.intervaloNevasca = setInterval(() => {
      const infoFlocoAtual = this.infoFlocos[this.posicaoDoCursorNoArray];

      if (infoFlocoAtual.isAnimacaoFinalizada && !infoFlocoAtual.isNaTela) {
        this.animarFlocoAtual(infoFlocoAtual);
      }
    }, this.tempoEntreFlocos);
  }

  pararNevasca() {
    if (this.intervaloNevasca) {
      clearInterval(this.intervaloNevasca);
      this.intervaloNevasca = null;
    }
  }

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

  adicionarClasseDeFlocoDeNeve(elemento) {
    elemento.classList.add(this.classeFlocoDeNeve);
  }

  removerClasseDeFlocoDeNeve(elemento) {
    elemento.classList.remove(this.classeFlocoDeNeve);
  }

  adicionarClasseDeEsperaAoFlocoDeNeve(elemento) {
    elemento.classList.add(this.classeFlocoDeNeveNaEspera);
  }

  removerClasseDeEsperaDoFlocoDeNeve(elemento) {
    elemento.classList.remove(this.classeFlocoDeNeveNaEspera);
  }
}
