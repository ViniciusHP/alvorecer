export default class DeslocamentoScroll {
  constructor(botoesAcionadores, scrollIntoViewOptions) {
    this.botoesAcionadoresDeslocamento = document.querySelectorAll(botoesAcionadores);
    
    if(scrollIntoViewOptions !== undefined){
      this.scrollIntoViewOptions = scrollIntoViewOptions;
    }else{
      this.scrollIntoViewOptions = {
        block: 'start',
        behavior: 'smooth'
      };
    }

    this.deslocaAteOAlvo = this.deslocaAteOAlvo.bind(this);
  }

  init() {
    if(this.botoesAcionadoresDeslocamento.length){
      this.addEventDeslocamentoScroll();
    }

    return this;
  }

  addEventDeslocamentoScroll() {
    this.botoesAcionadoresDeslocamento.forEach((botao) => botao.addEventListener('click', this.deslocaAteOAlvo));
  }

  deslocaAteOAlvo(event) {
    event.preventDefault();
    const botaoAcionador = event.currentTarget;
    const idAlvo = botaoAcionador.dataset.deslocamentoScroll;
    
    if(idAlvo.startsWith('#')){
      const elementoAlvo = document.querySelector(idAlvo);
      elementoAlvo.scrollIntoView(this.scrollIntoViewOptions);
    }
  }
}
