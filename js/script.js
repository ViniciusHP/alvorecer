import MenuMobile from './modules/MenuMobile.js';
import DeslocamentoAteOAlvo from './modules/DeslocamentoAteOAlvo.js';
import AcionadorDeClasseAoDeslocamentoScroll from './modules/AcionadorDeClasseAoDeslocamentoScroll.js';
import Slide from './modules/Slide.js';
import TabNav from './modules/TabNav.js';
import fetchNumeroVisitantes from './modules/fetch-numero-visitantes.js';
import Accordion from './modules/Accordion.js';
import Tooltip from './modules/Tooltip.js';
import Modal from './modules/Modal.js';
import AnimaTituloCampoFormulario from './modules/AnimaTituloCampoFormulario.js';
import Dropdown from './modules/Dropdown.js';

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

fetchNumeroVisitantes('./numero-visitantes.json', '[data-numero-visitantes]');

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

const dropdown = new Dropdown('[data-dropdown]', 'ativo');
dropdown.init();

/* Removendo o redirecionamento para páginas que ainda não existem */
document.querySelectorAll('a[href$=".html"]').forEach((a) => {
  a.addEventListener('click', (event) => event.preventDefault());
});

/* Adiciona a animação de flocos de neve se for o mês de Dezembro */
const dataHoje = new Date();
const mes = dataHoje.getMonth() + 1;
const isDezembro = mes === 12;

function carregaEstiloCssNeve() {
  const href = '../css/neve.css';
  const elementoLink = document.createElement('link');
  elementoLink.setAttribute('rel', 'stylesheet');
  elementoLink.setAttribute('type', 'text/css');
  elementoLink.setAttribute('href', href);
  document.head.appendChild(elementoLink);
}

async function carregarNeve() {
  const { default: Neve } = await import('./modules/Neve.js');

  const arrayUrlsTiposDeFlocosDeNeve = ['./img/flocos-de-neve/floco-neve-1.png',
    './img/flocos-de-neve/floco-neve-2.png',
    './img/flocos-de-neve/floco-neve-3.png',
    './img/flocos-de-neve/floco-neve-4.png'];

  const neve = new Neve('container-flocos-de-neve', 'floco-neve',
    'floco-neve-na-espera', 30, 300, arrayUrlsTiposDeFlocosDeNeve);
  neve.init().iniciarNevasca();
}

if (isDezembro) {
  carregaEstiloCssNeve();
  carregarNeve();
}
