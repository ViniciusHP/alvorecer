import debounce from './debouce.js';
export default class Tooltip {
  constructor(seletorTooltips, classeTootip) {
    this.tooltips = document.querySelectorAll(seletorTooltips);

    if(classeTootip !== undefined){
      this.classeTootip = classeTootip;
    }else{
      this.classeTootip = 'tooltip';
    }

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseMove = debounce(this.onMouseMove.bind(this), 10);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  init() {
    if(this.tooltips.length){
      this.addEventTooltip();
    }

    return this;
  }

  addEventTooltip() {
    this.tooltips.forEach((tooltip) => {
      tooltip.addEventListener('mouseover', this.onMouseOver);
    })
  }
  
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
  
  onMouseMove(event) {
    this.tooltipReposition(event);
  }

  onMouseLeave(event) {
    const target = event.currentTarget;
    this.elementTooltip.remove();
    target.removeEventListener('mousemove', this.onMouseMove);
    target.removeEventListener('mouseleave', this.onMouseLeave);
  }

  tooltipReposition(event) {
    const top = event.pageY;
    const left = event.pageX;

    const halfWindowWidth = window.innerWidth / 2;

    const positionOffsetX = 20;
    const positionOffsetY = 20;

    const tooltipTop = top + positionOffsetY;
    let tooltipLeft;

    if(left > halfWindowWidth){
      tooltipLeft = left - positionOffsetX - 260;
    }else {
      tooltipLeft = left + positionOffsetX;
    }

    this.elementTooltip.style.top = `${tooltipTop}px`;
    this.elementTooltip.style.left = `${tooltipLeft}px`;
  }
}