import debounce from './debouce.js';

export default class AcionadorDeClasseAoDeslocamentoScroll {
  constructor(elementosAcionadores, elementosAlvo, activeClass) {
    this.elementosAcionadores = document.querySelectorAll(elementosAcionadores);
    this.elementosAlvo = document.querySelectorAll(elementosAlvo);

    if(activeClass !== undefined){
      this.activeClass = activeClass;
    }else{
      this.activeClass = 'ativo';
    }

    this.acionaAlvoHandler = debounce(this.acionaAlvoHandler.bind(this), 100);
    this.recarregaDadosDePosicionamento = this.recarregaDadosDePosicionamento.bind(this);
  }

  init() {
    if(this.elementosAcionadores.length && this.elementosAlvo.length){
      this.carregaDadosDePosicionamento();
      this.addEventAoScroll();
      this.acionaAlvoHandler();
    }

    return this;
  }

  carregaDadosDePosicionamento() {
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
    window.addEventListener('resize', this.recarregaDadosDePosicionamento);
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

  recarregaDadosDePosicionamento() {
    this.carregaDadosDePosicionamento();
    this.acionaAlvoHandler();
  }
}