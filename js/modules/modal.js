export default class Modal {
  constructor(seletorAbrirModal, seletorFecharModal, classeAtiva) {

    this.buttonModal = document.querySelector(seletorAbrirModal);
    this.modalContainer = document.querySelector(this.buttonModal.dataset.modal);
    this.buttonCloseModal = this.modalContainer.querySelector(seletorFecharModal);

    if(classeAtiva !== undefined){
      this.classeAtiva = classeAtiva;
    }else{
      this.classeAtiva = 'ativo';
    }
    
    this.eventTypes = ['touchstart', 'click'];

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  init() {

    if(this.buttonModal && this.modalContainer && this.buttonCloseModal){
      this.addEventOpenModal();
    }

    return this;
  }

  addEventOpenModal() {
    this.eventTypes.forEach((eventType) => {
      this.buttonModal.addEventListener(eventType, this.openModal);
    });
  }

  addEventCloseModal() {
    this.eventTypes.forEach((eventType) => {
      this.buttonCloseModal.addEventListener(eventType, this.closeModal);
      window.addEventListener(eventType, this.closeModal);
    });
  }

  removeEventCloseModal() {
    this.eventTypes.forEach((eventType) => {
      this.buttonCloseModal.removeEventListener(eventType, this.closeModal);
      window.removeEventListener(eventType, this.closeModal);
    });
  }

  openModal(event) {
    event.preventDefault();
    this.modalContainer.classList.add(this.classeAtiva);
    this.addEventCloseModal();
  }

  closeModal(event) {
    const target = event.target;
    
    if(target === this.buttonCloseModal || target === this.modalContainer){
      this.modalContainer.classList.remove(this.classeAtiva);
      this.removeEventCloseModal();
    }
  }
}