import MenuMobile from './modules/menu-mobile.js';
import DeslocamentoAteOAlvo from './modules/anima-deslocamento-ate-alvo.js';

const menuMobile = new MenuMobile('[data-menu-mobile-btn]', '[data-menu-mobile]');
menuMobile.init();

const deslocamentoAteOAlvo = new DeslocamentoAteOAlvo('[data-deslocamento-scroll]');
deslocamentoAteOAlvo.init();
