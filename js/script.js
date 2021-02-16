import MenuMobile from './modules/menu-mobile.js';
import DeslocamentoAteOAlvo from './modules/anima-deslocamento-ate-alvo.js';
import AcionadorDeClasseAoDeslocamentoScroll from './modules/acionador-classe-deslocamento-scroll.js';
import Slide from './modules/slide.js';
import TabNav from './modules/tab-nav.js';
import fetchNumeroVisitantes from './modules/fetch-numero-visitantes.js';
import Accordion from './modules/accordion.js';
import Tooltip from './modules/tooltip.js';
import Modal from './modules/modal.js';
import AnimaTituloCampoFormulario from './modules/anima-titulo-campos-formulario.js';

const menuMobile = new MenuMobile('[data-menu-mobile-btn]', '[data-menu-mobile]');
menuMobile.init();

const deslocamentoAteOAlvo = new DeslocamentoAteOAlvo('[data-deslocamento-ate-alvo]');
deslocamentoAteOAlvo.init();

const acionadorDeClasseAoDeslocamentoScroll = new AcionadorDeClasseAoDeslocamentoScroll('[data-acionar-ao-scroll-acionador]', '[data-acionar-ao-scroll-alvo]');
acionadorDeClasseAoDeslocamentoScroll.init();

const slide = new Slide('[data-slide]', '[data-slide-item]',
  '[data-slide-controls]', '[data-slide-controls-botao]', 5000);
slide.init();

const tabNav = new TabNav('[data-tab-nav="acionador"]', '[data-tab-nav="alvo"]');
tabNav.init();
tabNav.addCallbackTabNavChange(() => {
  acionadorDeClasseAoDeslocamentoScroll.recarregaDadosDePosicionamento();
});

fetchNumeroVisitantes('../numero-visitantes.json', '[data-numero-visitantes]');

const accordion = new Accordion('[data-accordion-item]');
accordion.init();
accordion.addCallbackAccordionToggle(() => {
  acionadorDeClasseAoDeslocamentoScroll.recarregaDadosDePosicionamento();
});

const tooltip = new Tooltip('[data-tooltip]');
tooltip.init();

const modal = new Modal('[data-modal]', '[data-modal-close]', 'ativo');
modal.init();

const animaTitulosFormulario = new AnimaTituloCampoFormulario('[data-anime="titulo-formulario"]', 'preenchido');
animaTitulosFormulario.init();

/* Removendo o redirecionamento para páginas que ainda não existem */
document.querySelectorAll('a[href$=".html"]').forEach((a) => {
  a.addEventListener('click', (event) => event.preventDefault());
});
