export default class MenuMobile {
  constructor(seletorMobileBtn, seletorMobileMenu, activeClass){
    this.mobileBtn = document.querySelector(seletorMobileBtn);
    this.menuMobile = document.querySelector(seletorMobileMenu);

    if(activeClass == undefined){
      this.activeClass = 'ativo';
    }else{
      this.activeClass = activeClass;
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenuOnClickOutside = this.closeMenuOnClickOutside.bind(this);
  }

  init(){
    if(this.mobileBtn && this.menuMobile) {
      this.addEventMenuMobile();
    }

    return this;
  }

  addEventMenuMobile(){
    this.mobileBtn.addEventListener('click', this.toggleMenu);
  }

  toggleMenu(event){
    this.mobileBtn.classList.toggle(this.activeClass);
    this.menuMobile.classList.toggle(this.activeClass);

    if(this.mobileBtn.classList.contains(this.activeClass)){
      document.documentElement.addEventListener('click', this.closeMenuOnClickOutside);
    }else{
      document.documentElement.removeEventListener('click', this.closeMenuOnClickOutside);
    }
  }

  closeMenuOnClickOutside(event){
    const target = event.target;

    if(target !== this.mobileBtn && !this.menuMobile.contains(target)){
      this.mobileBtn.classList.remove(this.activeClass);
      this.menuMobile.classList.remove(this.activeClass);
      document.documentElement.removeEventListener('click', this.closeMenuOnClickOutside);
    }
  }
}