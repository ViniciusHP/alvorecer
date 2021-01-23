export default class Accordion {
  constructor(elementosAcionadores, classeAtiva) {
    this.elementosAcionadores = document.querySelectorAll(elementosAcionadores);

    if(classeAtiva === undefined){
      this.classeAtiva = 'ativo';
    }else{
      this.classeAtiva = classeAtiva;
    }

    this.callbackAccordionToggle = [];

    this.acionadorHandler = this.acionadorHandler.bind(this);
  }

  init() {
    if(this.elementosAcionadores.length){
      this.addEventAccordion();
    }

    return this;
  }

  addEventAccordion() {
    this.elementosAcionadores.forEach((acionador) => {
        acionador.addEventListener('click', this.acionadorHandler);
    });
  }

  acionadorHandler(event){
    event.preventDefault();
    const acionador = event.currentTarget;
    const href = acionador.getAttribute('href');
      
    if(href !== undefined){
      const alvo = document.querySelector(href);

      if(acionador && alvo){
        acionador.classList.toggle(this.classeAtiva);
        alvo.classList.toggle(this.classeAtiva);
        this.executeAllCallbacksAccordionToggle();
      }
    }
  }

  addCallbackAccordionToggle(callback){
    this.callbackAccordionToggle.push(callback);
  }

  executeAllCallbacksAccordionToggle(){
    this.callbackAccordionToggle.forEach((callback) => {
      callback();
    });
  }
}
