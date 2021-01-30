export default class TabNav {
  constructor(seletorAcionador, seletorAlvo, classeAtiva) {
    this.acionadores = document.querySelectorAll(seletorAcionador);
    this.alvos = document.querySelectorAll(seletorAlvo);

    if(classeAtiva === undefined){
      this.classeAtiva = 'ativo';
    }else{
      this.classeAtiva = classeAtiva;
    }

    this.callbackTabNavChange = [];

    this.acionadorHandler = this.acionadorHandler.bind(this);
  }

  init() {

    if(this.acionadores.length && this.alvos.length){
      this.addEventAcionadores();
      this.acionar(this.acionadores[0], this.alvos[0]);
    }

    return this;
  }

  addEventAcionadores() {
    this.acionadores.forEach(acionador => {
      acionador.addEventListener('click', this.acionadorHandler);
    });
  }

  acionadorHandler(event) {
    event.preventDefault();
    const acionador = event.currentTarget;
    const href = acionador.getAttribute('href');
    const alvo = document.querySelector(href);

    this.desacionarTodos();
    this.acionar(acionador, alvo);
    this.executeAllCallbacksTabNavChange();
  }

  acionar(acionador, alvo){
    acionador.classList.add(this.classeAtiva);
    alvo.classList.add(this.classeAtiva);
  }

  desacionarTodos(){
    this.acionadores.forEach(acionador => acionador.classList.remove(this.classeAtiva));
    this.alvos.forEach(alvo => alvo.classList.remove(this.classeAtiva));
  }

  addCallbackTabNavChange(callback){
    this.callbackTabNavChange.push(callback);
  }

  executeAllCallbacksTabNavChange(){
    this.callbackTabNavChange.forEach((callback) => {
      callback();
    });
  }
}
