export default class AnimaTituloCampoFormulario {
  constructor(seletorTitulos, classeAtiva) {

    this.titulos = document.querySelectorAll(seletorTitulos);
    this.campos = [];

    if(classeAtiva !== undefined){
      this.classeAtiva = classeAtiva;
    }else{
      this.classeAtiva = 'ativo';
    }

    this.eventTypes = ['touchstart', 'click'];

    this.onFieldFocusOut = this.onFieldFocusOut.bind(this);
  }

  init() {
    if(this.titulos.length){
      this.getCampos();
      this.addEventOnClick();
      this.addEventFieldOnFocusOut();
    }

    return this;
  }

  getCampos() {
    this.titulos.forEach((t) => {
      const campoId = t.getAttribute('for');
      const campo = document.querySelector('#'.concat(campoId));

      if(campo){
        this.campos.push(campo);
      }
    });
  }

  addEventOnClick() {
    this.eventTypes.forEach((eventType) => {
      this.titulos.forEach((titulo) => {
        titulo.addEventListener(eventType, this.onLabelClick);
      })
    });
  }

  addEventFieldOnFocusOut() {
    this.campos.forEach((campo) => campo.addEventListener('focusout', this.onFieldFocusOut))
  }

  onLabelClick(event) {
    const titulo = event.currentTarget;

    const campoId = titulo.getAttribute('for');
    const campo = document.querySelector('#'.concat(campoId));

    if(campo){
      campo.focus();
    }
  }

  onFieldFocusOut(event) {
    const campo = event.currentTarget;

    if(campo.value.length > 0){
      campo.classList.add(this.classeAtiva);
    }else{
      campo.classList.remove(this.classeAtiva);
    }
  }
}
