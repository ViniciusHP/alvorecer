import MenuMobile from './modules/menu-mobile.js';
import DeslocamentoAteOAlvo from './modules/anima-deslocamento-ate-alvo.js';
import AcionadorDeClasseAoDeslocamentoScroll from './modules/acionador-classe-deslocamento-scroll.js';
import Slide from './modules/slide.js';

const menuMobile = new MenuMobile('[data-menu-mobile-btn]', '[data-menu-mobile]');
menuMobile.init();

const deslocamentoAteOAlvo = new DeslocamentoAteOAlvo('[data-deslocamento-ate-alvo]');
deslocamentoAteOAlvo.init();

const acionadorDeClasseAoDeslocamentoScroll = 
        new AcionadorDeClasseAoDeslocamentoScroll('[data-acionar-ao-scroll-acionador]', '[data-acionar-ao-scroll-alvo]');
acionadorDeClasseAoDeslocamentoScroll.init();

const slide = new Slide('[data-slide]', '[data-slide-item]',
        '[data-slide-controls]', '[data-slide-controls-botao]', 5000);
slide.init();
