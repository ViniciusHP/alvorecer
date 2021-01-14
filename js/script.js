import MenuMobile from './modules/menu-mobile.js';
import DeslocamentoScroll from './modules/anima-deslocamento-scroll.js';

const menuMobile = new MenuMobile('[data-menu-mobile-btn]', '[data-menu-mobile]');
menuMobile.init();

const deslocamentoScroll = new DeslocamentoScroll('[data-deslocamento-scroll]');
deslocamentoScroll.init();
