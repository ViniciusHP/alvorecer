(()=>{"use strict";function e(e,t){let o=null;return(...s)=>{null!==o&&clearTimeout(o),o=setTimeout((()=>e(...s)),t)}}class t{constructor(e,t,o,s){this.elementoASerObservado=document.querySelector(e),this.classeASerObservada=t,this.elementoParaAnimar=document.querySelector(o),this.milisegundosAnimacao=s,this.observerCallback=this.observerCallback.bind(this)}init(){return this.elementoASerObservado&&this.classeASerObservada&&this.elementoParaAnimar?this.addObserver():this.elementoParaAnimar&&this.animarNumero(),this}addObserver(){this.observer=new MutationObserver(this.observerCallback),this.observer.observe(this.elementoASerObservado,{attributes:!0})}observerCallback(){this.elementoASerObservado.classList.contains(this.classeASerObservada)&&(this.animarNumero(),this.observer.disconnect())}animarNumero(){const e=Number(this.elementoParaAnimar.innerText),t=Math.ceil(e/100),o=this.milisegundosAnimacao/100;let s=0;this.elementoParaAnimar.innerText=0;const i=()=>{s+=t,this.elementoParaAnimar.innerText=s>e?e:s};for(let e=0;e<100;e+=1)setTimeout(i,e*o)}}new class{constructor(e,t,o){this.mobileBtn=document.querySelector(e),this.menuMobile=document.querySelector(t),this.activeClass=null==o?"ativo":o,this.toggleMenu=this.toggleMenu.bind(this),this.closeMenuOnClickOutside=this.closeMenuOnClickOutside.bind(this)}init(){return this.mobileBtn&&this.menuMobile&&this.addEventMenuMobile(),this}addEventMenuMobile(){this.mobileBtn.addEventListener("click",this.toggleMenu)}toggleMenu(e){this.mobileBtn.classList.toggle(this.activeClass),this.menuMobile.classList.toggle(this.activeClass),this.mobileBtn.classList.contains(this.activeClass)?document.documentElement.addEventListener("click",this.closeMenuOnClickOutside):document.documentElement.removeEventListener("click",this.closeMenuOnClickOutside)}closeMenuOnClickOutside(e){const t=e.target;t===this.mobileBtn||this.menuMobile.contains(t)||(this.mobileBtn.classList.remove(this.activeClass),this.menuMobile.classList.remove(this.activeClass),document.documentElement.removeEventListener("click",this.closeMenuOnClickOutside))}}("[data-menu-mobile-btn]","[data-menu-mobile]").init(),new class{constructor(e,t){this.botoesAcionadoresDeslocamento=document.querySelectorAll(e),this.scrollIntoViewOptions=void 0!==t?t:{block:"start",behavior:"smooth"},this.deslocaAteOAlvo=this.deslocaAteOAlvo.bind(this)}init(){return this.botoesAcionadoresDeslocamento.length&&this.addEventDeslocamentoScroll(),this}addEventDeslocamentoScroll(){this.botoesAcionadoresDeslocamento.forEach((e=>e.addEventListener("click",this.deslocaAteOAlvo)))}deslocaAteOAlvo(e){e.preventDefault();const t=e.currentTarget.dataset.deslocamentoAteAlvo,o=document.querySelector(t);o&&o.scrollIntoView(this.scrollIntoViewOptions)}}("[data-deslocamento-ate-alvo]").init();const o=new class{constructor(t,o,s,i){this.elementosAcionadores=document.querySelectorAll(t),this.elementosAlvo=document.querySelectorAll(o),this.activeClass=void 0!==s?s:"ativo",this.showClass=void 0!==i?i:"show",this.acionaAlvoHandler=e(this.acionaAlvoHandler.bind(this),100),this.recarregaDadosDePosicionamento=this.recarregaDadosDePosicionamento.bind(this)}init(){return this.elementosAcionadores.length&&this.elementosAlvo.length&&setTimeout((()=>{this.carregaDadosDePosicionamento(),this.addEventAoScroll(),this.acionaAlvoHandler()}),200),this}carregaDadosDePosicionamento(){this.dadosDePosicionamentoERelacionamento=[],this.elementosAcionadores.forEach((e=>{let t=e.offsetTop,o=t+e.offsetHeight;const s=window.outerHeight/4,i=document.querySelector(".barra-menu").offsetHeight;i&&(t-=i,o-=i),t-=s,o-=s;const a=e.dataset.acionarAoScrollAcionador,n={acionador:e,inicio:t,fim:o,alvo:this.obtemElementoAlvoCorrespondenteAoNome(a)};this.dadosDePosicionamentoERelacionamento.push(n)}))}obtemElementoAlvoCorrespondenteAoNome(e){let t;return this.elementosAlvo.forEach((o=>{e===o.dataset.acionarAoScrollAlvo&&(t=o)})),t}addEventAoScroll(){window.addEventListener("scroll",this.acionaAlvoHandler),window.addEventListener("resize",this.recarregaDadosDePosicionamento)}acionaAlvoHandler(){const e=Math.floor(window.pageYOffset);this.dadosDePosicionamentoERelacionamento.forEach((t=>{const{inicio:o,fim:s}=t;e>o&&e<s?(t.alvo.classList.add(this.activeClass),t.acionador.classList.add(this.activeClass),t.acionador.classList.add(this.showClass)):(t.alvo.classList.remove(this.activeClass),t.acionador.classList.remove(this.activeClass))}))}recarregaDadosDePosicionamento(){setTimeout((()=>{this.carregaDadosDePosicionamento(),this.acionaAlvoHandler()}),1e3)}}("[data-acionar-ao-scroll-acionador]","[data-acionar-ao-scroll-alvo]");o.init(),new class{constructor(e,t,o,s,i,a){this.slide=document.querySelector(e),this.slideItens=this.slide.querySelectorAll(t),this.controlesContainer=document.querySelector(o),this.controlesBotoes=this.controlesContainer.querySelectorAll(s),this.tempoEntreSlides=void 0===i?5e3:i,this.classeAtivaControles=void 0===a?"ativo":a,this.onMouseOverHandler=this.onMouseOverHandler.bind(this),this.onMouseLeaveHandler=this.onMouseLeaveHandler.bind(this)}init(){return this.slide&&this.slideItens.length&&(this.carregaDadosPosicionamentoTodosItens(),this.exibeSlide(0),this.addEventControles(),this.criarTimer(),this.addEventOnMouseOver()),this}carregaDadosPosicionamentoAtual(e){const t=this.dadosPosicionamentoTodosItensSlide.length-1;let o,s,i=e;o=e<=0?t:e-1,s=e>=t?0:e+1,this.dadosPosicaoAtual={slideAnterior:o,slideAtual:i,slidePosterior:s}}carregaDadosPosicionamentoTodosItens(){this.dadosPosicionamentoTodosItensSlide=[],this.slideItens.forEach(((e,t)=>{const o={item:e,indice:t,distancia:-100*t+"vw"};this.dadosPosicionamentoTodosItensSlide.push(o)}))}indicaSlideAtualNosControles(e){this.controlesBotoes.forEach(((t,o)=>{e===o?t.classList.add(this.classeAtivaControles):t.classList.remove(this.classeAtivaControles)}))}exibeSlide(e){this.slide.style.transform=`translate3d(${this.dadosPosicionamentoTodosItensSlide[e].distancia}, 0, 0)`,this.carregaDadosPosicionamentoAtual(e),this.indicaSlideAtualNosControles(e)}slidePosterior(){this.exibeSlide(this.dadosPosicaoAtual.slidePosterior)}slideAnterior(){this.exibeSlide(this.dadosPosicaoAtual.slideAnterior)}criarTimer(){this.timer=setInterval((()=>{this.slidePosterior()}),this.tempoEntreSlides),this.isTimerLimpo=!1}limparTimer(){clearInterval(this.timer),this.isTimerLimpo=!0}addEventControles(){this.controlesBotoes.length&&this.controlesBotoes.forEach(((e,t)=>{e.addEventListener("click",(e=>{e.preventDefault(),this.limparTimer(),this.exibeSlide(t),this.criarTimer()}))}))}addEventOnMouseOver(){this.slide.addEventListener("mouseover",this.onMouseOverHandler)}set isTimerLimpo(e){this._isTimerLimpo=e}get isTimerLimpo(){return this._isTimerLimpo}onMouseOverHandler(e){const t=e.target;this.slide.contains(t)&&!this.isTimerLimpo&&(this.limparTimer(),this.slide.addEventListener("mouseleave",this.onMouseLeaveHandler))}onMouseLeaveHandler(){this.criarTimer(),this.slide.removeEventListener("mouseleave",this.onMouseLeaveHandler)}}("[data-slide]","[data-slide-item]","[data-slide-controls]","[data-slide-controls-botao]",5e3).init();const s=new class{constructor(e,t,o){this.acionadores=document.querySelectorAll(e),this.alvos=document.querySelectorAll(t),this.classeAtiva=void 0===o?"ativo":o,this.callbackTabNavChange=[],this.acionadorHandler=this.acionadorHandler.bind(this)}init(){return this.acionadores.length&&this.alvos.length&&(this.addEventAcionadores(),this.acionar(this.acionadores[0],this.alvos[0])),this}addEventAcionadores(){this.acionadores.forEach((e=>{e.addEventListener("click",this.acionadorHandler)}))}acionadorHandler(e){e.preventDefault();const t=e.currentTarget,o=t.getAttribute("href"),s=document.querySelector(o);this.desacionarTodos(),this.acionar(t,s),this.executeAllCallbacksTabNavChange()}acionar(e,t){e.classList.add(this.classeAtiva),t.classList.add(this.classeAtiva)}desacionarTodos(){this.acionadores.forEach((e=>e.classList.remove(this.classeAtiva))),this.alvos.forEach((e=>e.classList.remove(this.classeAtiva)))}addCallbackTabNavChange(e){this.callbackTabNavChange.push(e)}executeAllCallbacksTabNavChange(){this.callbackTabNavChange.forEach((e=>{e()}))}}('[data-tab-nav="acionador"]','[data-tab-nav="alvo"]');s.init(),s.addCallbackTabNavChange((()=>{o.recarregaDadosDePosicionamento()})),async function(e,o){const s=document.querySelector("[data-numero-visitantes]"),i=await fetch("../numero-visitantes.json");if(i.ok&&200===i.status){const e=await i.json(),{numeroVisitantes:t}=e;void 0!==t&&(s.innerHTML=e.numeroVisitantes)}new t("#opinioes-section","ativo","[data-anima-numeros]",2e3).init()}();const i=new class{constructor(e,t){this.elementosAcionadores=document.querySelectorAll(e),this.classeAtiva=void 0===t?"ativo":t,this.callbackAccordionToggle=[],this.acionadorHandler=this.acionadorHandler.bind(this)}init(){return this.elementosAcionadores.length&&this.addEventAccordion(),this}addEventAccordion(){this.elementosAcionadores.forEach((e=>{e.addEventListener("click",this.acionadorHandler)}))}acionadorHandler(e){e.preventDefault();const t=e.currentTarget,o=t.getAttribute("href");if(void 0!==o){const e=document.querySelector(o);t&&e&&(t.classList.toggle(this.classeAtiva),e.classList.toggle(this.classeAtiva),this.executeAllCallbacksAccordionToggle())}}addCallbackAccordionToggle(e){this.callbackAccordionToggle.push(e)}executeAllCallbacksAccordionToggle(){this.callbackAccordionToggle.forEach((e=>{e()}))}}("[data-accordion-item]");i.init(),i.addCallbackAccordionToggle((()=>{o.recarregaDadosDePosicionamento()})),new class{constructor(t,o){this.tooltips=document.querySelectorAll(t),this.classeTootip=void 0!==o?o:"tooltip",this.onMouseOver=this.onMouseOver.bind(this),this.onMouseMove=e(this.onMouseMove.bind(this),10),this.onMouseLeave=this.onMouseLeave.bind(this)}init(){return this.tooltips.length&&this.addEventTooltip(),this}addEventTooltip(){this.tooltips.forEach((e=>{e.addEventListener("mouseover",this.onMouseOver)}))}onMouseOver(e){const t=e.currentTarget,o=t.getAttribute("aria-label");this.elementTooltip=document.createElement("div"),this.elementTooltip.innerText=o,this.elementTooltip.classList.add(this.classeTootip),this.tooltipReposition(e),document.body.appendChild(this.elementTooltip),t.addEventListener("mousemove",this.onMouseMove),t.addEventListener("mouseleave",this.onMouseLeave)}onMouseMove(e){this.tooltipReposition(e)}onMouseLeave(e){const t=e.currentTarget;this.elementTooltip.remove(),t.removeEventListener("mousemove",this.onMouseMove),t.removeEventListener("mouseleave",this.onMouseLeave)}tooltipReposition(e){const t=e.pageY,o=e.pageX,s=t+20;let i;i=o>window.innerWidth/2?o-20-260:o+20,this.elementTooltip.style.top=`${s}px`,this.elementTooltip.style.left=`${i}px`}}("[data-tooltip]").init(),new class{constructor(e,t,o){this.buttonModal=document.querySelector(e),this.modalContainer=document.querySelector(this.buttonModal.dataset.modal),this.buttonCloseModal=this.modalContainer.querySelector(t),this.classeAtiva=void 0!==o?o:"ativo",this.eventTypes=["touchstart","click"],this.openModal=this.openModal.bind(this),this.closeModal=this.closeModal.bind(this)}init(){return this.buttonModal&&this.modalContainer&&this.buttonCloseModal&&this.addEventOpenModal(),this}addEventOpenModal(){this.eventTypes.forEach((e=>{this.buttonModal.addEventListener(e,this.openModal)}))}addEventCloseModal(){this.eventTypes.forEach((e=>{this.buttonCloseModal.addEventListener(e,this.closeModal),window.addEventListener(e,this.closeModal)}))}removeEventCloseModal(){this.eventTypes.forEach((e=>{this.buttonCloseModal.removeEventListener(e,this.closeModal),window.removeEventListener(e,this.closeModal)}))}openModal(e){e.preventDefault(),this.modalContainer.classList.add(this.classeAtiva),this.addEventCloseModal()}closeModal(e){const t=e.target;t!==this.buttonCloseModal&&t!==this.modalContainer||(this.modalContainer.classList.remove(this.classeAtiva),this.removeEventCloseModal())}}("[data-modal]","[data-modal-close]","ativo").init(),new class{constructor(e,t){this.titulos=document.querySelectorAll(e),this.campos=[],this.classeAtiva=void 0!==t?t:"ativo",this.eventTypes=["touchstart","click"],this.onFieldFocusOut=this.onFieldFocusOut.bind(this)}init(){return this.titulos.length&&(this.getCampos(),this.addEventOnClick(),this.addEventFieldOnFocusOut(),this.verificaSeAlgumCampoJaEstaPreenchido()),this}getCampos(){this.titulos.forEach((e=>{const t=e.getAttribute("for"),o=document.querySelector("#".concat(t));o&&this.campos.push(o)}))}addEventOnClick(){this.eventTypes.forEach((e=>{this.titulos.forEach((t=>{t.addEventListener(e,this.onLabelClick)}))}))}addEventFieldOnFocusOut(){this.campos.forEach((e=>e.addEventListener("focusout",this.onFieldFocusOut)))}onLabelClick(e){const t=e.currentTarget.getAttribute("for"),o=document.querySelector("#".concat(t));o&&o.focus()}onFieldFocusOut(e){const t=e.currentTarget;this.adicionaClasseAoCampoSePreenchido(t)}verificaSeAlgumCampoJaEstaPreenchido(){this.campos.forEach((e=>{this.adicionaClasseAoCampoSePreenchido(e)}))}adicionaClasseAoCampoSePreenchido(e){e.value.length>0?e.classList.add(this.classeAtiva):e.classList.remove(this.classeAtiva)}}('[data-anime="titulo-formulario"]',"preenchido").init(),document.querySelectorAll('a[href$=".html"]').forEach((e=>{e.addEventListener("click",(e=>e.preventDefault()))}))})();