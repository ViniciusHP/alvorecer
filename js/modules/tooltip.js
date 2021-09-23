import debounce from './debouce.js';

/**
 * Classe que controla o tooltip.
 */
export default class Tooltip {
  constructor(seletorTooltips, classeTootip) {
    this.tooltips = document.querySelectorAll(seletorTooltips);

    if (classeTootip !== undefined) {
      this.classeTootip = classeTootip;
    } else {
      this.classeTootip = 'tooltip';
    }

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseMove = debounce(this.onMouseMove.bind(this), 10);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  /**
   * Inicializa as funcionalidades.
   * @returns Instância atual.
   */
  init() {
    if (this.tooltips.length) {
      this.addEventTooltip();
    }

    return this;
  }

  /**
   * Adiciona tratamento de evento mouseover nos elementos com tooltip
   */
  addEventTooltip() {
    this.tooltips.forEach((tooltip) => {
      tooltip.addEventListener('mouseover', this.onMouseOver);
    });
  }

  /**
   * Trata o evento mouseover, exibindo o tooltip.
   * @param {*} event Evento
   */
  onMouseOver(event) {
    const target = event.currentTarget;
    const contentTooltip = target.getAttribute('aria-label');

    this.elementTooltip = document.createElement('div');
    this.elementTooltip.innerText = contentTooltip;
    this.elementTooltip.classList.add(this.classeTootip);
    this.tooltipReposition(event);
    document.body.appendChild(this.elementTooltip);

    target.addEventListener('mousemove', this.onMouseMove);
    target.addEventListener('mouseleave', this.onMouseLeave);
  }

  /**
   * Trata o evento de mousemove, reposicionando o tooltip.
   * @param {*} event Evento
   */
  onMouseMove(event) {
    this.tooltipReposition(event);
  }

  /**
   * Trata o evento de mouseleave, removendo o tooltip
   * @param {*} event Evento
   */
  onMouseLeave(event) {
    const target = event.currentTarget;
    this.elementTooltip.remove();
    target.removeEventListener('mousemove', this.onMouseMove);
    target.removeEventListener('mouseleave', this.onMouseLeave);
  }

  /**
   * Reposiciona o tooltip de acordo com o mouse.
   * @param {*} event Evento de mouse.
   */
  tooltipReposition(event) {
    const top = event.pageY;
    const left = event.pageX;

    const halfWindowWidth = window.innerWidth / 2;

    const positionOffsetX = 20;
    const positionOffsetY = 20;

    const tooltipTop = top + positionOffsetY;
    let tooltipLeft;

    if (left > halfWindowWidth) {
      tooltipLeft = left - positionOffsetX - 260;
    } else {
      tooltipLeft = left + positionOffsetX;
    }

    this.elementTooltip.style.top = `${tooltipTop}px`;
    this.elementTooltip.style.left = `${tooltipLeft}px`;
  }
}
