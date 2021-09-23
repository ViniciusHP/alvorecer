/**
 * Classe que controla o modal.
 */
export default class Modal {
  constructor(seletorAbrirModal, seletorFecharModal, classeAtiva) {
    this.buttonModal = document.querySelector(seletorAbrirModal);
    this.modalContainer = document.querySelector(this.buttonModal.dataset.modal);
    this.buttonCloseModal = this.modalContainer.querySelector(seletorFecharModal);

    if (classeAtiva !== undefined) {
      this.classeAtiva = classeAtiva;
    } else {
      this.classeAtiva = 'ativo';
    }

    this.eventTypes = ['touchstart', 'click'];

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * Inicializa as funcionalidades.
   * @returns Instância atual.
   */
  init() {
    if (this.buttonModal && this.modalContainer && this.buttonCloseModal) {
      this.addEventOpenModal();
    }

    return this;
  }

  /**
   * Adiciona os tratadores de eventos de exibição do modal
   */
  addEventOpenModal() {
    this.eventTypes.forEach((eventType) => {
      this.buttonModal.addEventListener(eventType, this.openModal);
    });
  }

  /**
   * Adiciona os tratadores de eventos de ocultamento do modal
   */
  addEventCloseModal() {
    this.eventTypes.forEach((eventType) => {
      this.buttonCloseModal.addEventListener(eventType, this.closeModal);
      window.addEventListener(eventType, this.closeModal);
    });
  }

  /**
   * Remove os tratadores de eventos de ocultamento do modal
   */
  removeEventCloseModal() {
    this.eventTypes.forEach((eventType) => {
      this.buttonCloseModal.removeEventListener(eventType, this.closeModal);
      window.removeEventListener(eventType, this.closeModal);
    });
  }

  /**
   * Exibe o modal
   */
  openModal(event) {
    event.preventDefault();
    this.modalContainer.classList.add(this.classeAtiva);
    this.addEventCloseModal();
  }

  /**
   * Oculta o modal
   */
  closeModal({ target }) {
    if (target === this.buttonCloseModal || target === this.modalContainer) {
      this.modalContainer.classList.remove(this.classeAtiva);
      this.removeEventCloseModal();
    }
  }
}
