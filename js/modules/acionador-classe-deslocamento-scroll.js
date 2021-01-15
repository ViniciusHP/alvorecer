export default class AcionadorDeClasseAoDeslocamentoScroll {
  constructor(elementosAcionadores, elementosAlvo, activeClass) {
    this.elementosAcionadores = document.querySelectorAll(elementosAcionadores);
    this.elementosAlvo = document.querySelectorAll(elementosAlvo);

    if(activeClass !== undefined){
      this.activeClass = activeClass;
    }else{
      this.activeClass = 'ativo';
    }

    this.acionaAlvoHandler = this.acionaAlvoHandler.bind(this);
  }

  init() {
    if(this.elementosAcionadores.length && this.elementosAlvo.length){
      this.extraiDados();
      this.addEventAoScroll();
    }

    return this;
  }

  extraiDados() {
    this.dadosDePosicionamentoERelacionamento = [];

    this.elementosAcionadores.forEach((acionador) => {

      const inicio = acionador.offsetTop;
      const altura = acionador.offsetHeight;
      const fim = inicio + altura;
      const nomeAlvo = acionador.dataset.acionarAoScrollAcionador;
      const alvo = this.obtemElementoAlvoCorrespondenteAoNome(nomeAlvo);

      const dados = {
        acionador,
        inicio,
        altura,
        fim,
        alvo,
      };

      this.dadosDePosicionamentoERelacionamento.push(dados);
    });
  }

  obtemElementoAlvoCorrespondenteAoNome(nome) {
    let alvo;

    this.elementosAlvo.forEach((elementoAlvo) => {
        
      if(nome === elementoAlvo.dataset.acionarAoScrollAlvo){
        alvo = elementoAlvo;
      }
    })

    return alvo;
  }

  addEventAoScroll(){
    window.addEventListener('scroll', this.acionaAlvoHandler);
  }

  acionaAlvoHandler() {
    const currentPageYOffset = window.pageYOffset;
    const quarter = window.outerHeight / 4; 
    this.dadosDePosicionamentoERelacionamento.forEach((dados) => {
      if(dados.inicio - quarter < currentPageYOffset && dados.fim - quarter > currentPageYOffset){
        dados.alvo.classList.add(this.activeClass);
      }else{
        dados.alvo.classList.remove(this.activeClass);
      }
    })
  }
}