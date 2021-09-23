/**
 * Classe que controla o menu mobile.
 */
export default class MenuMobile {
  constructor(seletorMobileBtn, seletorMobileMenu, activeClass) {
    this.mobileBtn = document.querySelector(seletorMobileBtn);
    this.menuMobile = document.querySelector(seletorMobileMenu);

    if (activeClass === undefined) {
      this.activeClass = 'ativo';
    } else {
      this.activeClass = activeClass;
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenuOnClickOutside = this.closeMenuOnClickOutside.bind(this);
  }

  /**
   * Inicializa as funcionalidades.
   * @returns Instância atual.
   */
  init() {
    if (this.mobileBtn && this.menuMobile) {
      this.addEventMenuMobile();
    }

    return this;
  }

  /**
   * Adiciona tratador de evento de clique no menu mobile
   */
  addEventMenuMobile() {
    this.mobileBtn.addEventListener('click', this.toggleMenu);
  }

  /**
   * Tratador do evento do menu mobile, realiza a alternância entre
   * aberto e fechado
   */
  toggleMenu() {
    this.mobileBtn.classList.toggle(this.activeClass);
    this.menuMobile.classList.toggle(this.activeClass);

    if (this.mobileBtn.classList.contains(this.activeClass)) {
      document.documentElement.addEventListener('click', this.closeMenuOnClickOutside);
    } else {
      document.documentElement.removeEventListener('click', this.closeMenuOnClickOutside);
    }
  }

  /**
   * Fecha o menu mobile caso o usuário clique em qualquer elemento que não seja
   * do menu mobile
   */
  closeMenuOnClickOutside({ target }) {
    if (target !== this.mobileBtn && !this.menuMobile.contains(target)) {
      this.mobileBtn.classList.remove(this.activeClass);
      this.menuMobile.classList.remove(this.activeClass);
      document.documentElement.removeEventListener('click', this.closeMenuOnClickOutside);
    }
  }
}
