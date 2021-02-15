/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/accordion.js":
/*!*********************************!*\
  !*** ./js/modules/accordion.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Accordion)\n/* harmony export */ });\nclass Accordion {\n  constructor(elementosAcionadores, classeAtiva) {\n    this.elementosAcionadores = document.querySelectorAll(elementosAcionadores);\n\n    if(classeAtiva === undefined){\n      this.classeAtiva = 'ativo';\n    }else{\n      this.classeAtiva = classeAtiva;\n    }\n\n    this.callbackAccordionToggle = [];\n\n    this.acionadorHandler = this.acionadorHandler.bind(this);\n  }\n\n  init() {\n    if(this.elementosAcionadores.length){\n      this.addEventAccordion();\n    }\n\n    return this;\n  }\n\n  addEventAccordion() {\n    this.elementosAcionadores.forEach((acionador) => {\n        acionador.addEventListener('click', this.acionadorHandler);\n    });\n  }\n\n  acionadorHandler(event){\n    event.preventDefault();\n    const acionador = event.currentTarget;\n    const href = acionador.getAttribute('href');\n      \n    if(href !== undefined){\n      const alvo = document.querySelector(href);\n\n      if(acionador && alvo){\n        acionador.classList.toggle(this.classeAtiva);\n        alvo.classList.toggle(this.classeAtiva);\n        this.executeAllCallbacksAccordionToggle();\n      }\n    }\n  }\n\n  addCallbackAccordionToggle(callback){\n    this.callbackAccordionToggle.push(callback);\n  }\n\n  executeAllCallbacksAccordionToggle(){\n    this.callbackAccordionToggle.forEach((callback) => {\n      callback();\n    });\n  }\n}\n\n\n//# sourceURL=webpack://alvorecer/./js/modules/accordion.js?");

/***/ }),

/***/ "./js/modules/acionador-classe-deslocamento-scroll.js":
/*!************************************************************!*\
  !*** ./js/modules/acionador-classe-deslocamento-scroll.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AcionadorDeClasseAoDeslocamentoScroll)\n/* harmony export */ });\n/* harmony import */ var _debouce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debouce.js */ \"./js/modules/debouce.js\");\n\n\nclass AcionadorDeClasseAoDeslocamentoScroll {\n  constructor(elementosAcionadores, elementosAlvo, activeClass, showClass) {\n    this.elementosAcionadores = document.querySelectorAll(elementosAcionadores);\n    this.elementosAlvo = document.querySelectorAll(elementosAlvo);\n\n    if(activeClass !== undefined){\n      this.activeClass = activeClass;\n    }else{\n      this.activeClass = 'ativo';\n    }\n\n    if(showClass !== undefined){\n      this.showClass = showClass;\n    }else{\n      this.showClass = 'show';\n    }\n\n    this.acionaAlvoHandler = (0,_debouce_js__WEBPACK_IMPORTED_MODULE_0__.default)(this.acionaAlvoHandler.bind(this), 100);\n    this.recarregaDadosDePosicionamento = this.recarregaDadosDePosicionamento.bind(this);\n  }\n\n  init() {\n    if(this.elementosAcionadores.length && this.elementosAlvo.length){\n      // Espera que todos componentes sejam carregados para depois calcular as distâncias\n      setTimeout(() => {\n        this.carregaDadosDePosicionamento();\n        this.addEventAoScroll();\n        this.acionaAlvoHandler();\n      }, 200);\n    }\n\n    return this;\n  }\n\n  carregaDadosDePosicionamento() {\n    this.dadosDePosicionamentoERelacionamento = [];\n\n    this.elementosAcionadores.forEach((acionador) => {\n\n      let inicio = acionador.offsetTop;\n      const altura = acionador.offsetHeight;\n      let fim = inicio + altura;\n\n      const umQuartoDaTela = window.outerHeight / 4;\n      const alturaMenuBar = document.querySelector(\".barra-menu\").offsetHeight;\n\n      if(alturaMenuBar) {\n        inicio -= alturaMenuBar;\n        fim -= alturaMenuBar;\n      }\n      inicio -= umQuartoDaTela;\n      fim -= umQuartoDaTela;\n\n      const nomeAlvo = acionador.dataset.acionarAoScrollAcionador;\n      const alvo = this.obtemElementoAlvoCorrespondenteAoNome(nomeAlvo);\n\n      const dados = {\n        acionador,\n        inicio,\n        fim,\n        alvo,\n      };\n\n      this.dadosDePosicionamentoERelacionamento.push(dados);\n    });\n  }\n\n  obtemElementoAlvoCorrespondenteAoNome(nome) {\n    let alvo;\n\n    this.elementosAlvo.forEach((elementoAlvo) => {\n        \n      if(nome === elementoAlvo.dataset.acionarAoScrollAlvo){\n        alvo = elementoAlvo;\n      }\n    })\n\n    return alvo;\n  }\n\n  addEventAoScroll(){\n    window.addEventListener('scroll', this.acionaAlvoHandler);\n    window.addEventListener('resize', this.recarregaDadosDePosicionamento);\n  }\n\n  acionaAlvoHandler() {\n    const currentPageYOffset = Math.floor(window.pageYOffset);\n    this.dadosDePosicionamentoERelacionamento.forEach((dados) => {\n\n      const inicio = dados.inicio;\n      const fim = dados.fim;\n\n      if(currentPageYOffset > inicio && currentPageYOffset < fim){\n        dados.alvo.classList.add(this.activeClass);\n        dados.acionador.classList.add(this.activeClass);\n        dados.acionador.classList.add(this.showClass);\n      }else{\n        dados.alvo.classList.remove(this.activeClass);\n        dados.acionador.classList.remove(this.activeClass);\n      }\n    })\n  }\n\n  recarregaDadosDePosicionamento() {\n    setTimeout(() => {\n    this.carregaDadosDePosicionamento();\n    this.acionaAlvoHandler();\n    }, 1000);\n  }\n}\n\n//# sourceURL=webpack://alvorecer/./js/modules/acionador-classe-deslocamento-scroll.js?");

/***/ }),

/***/ "./js/modules/anima-deslocamento-ate-alvo.js":
/*!***************************************************!*\
  !*** ./js/modules/anima-deslocamento-ate-alvo.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DeslocamentoAteOAlvo)\n/* harmony export */ });\nclass DeslocamentoAteOAlvo {\n  constructor(botoesAcionadores, scrollIntoViewOptions) {\n    this.botoesAcionadoresDeslocamento = document.querySelectorAll(botoesAcionadores);\n    \n    if(scrollIntoViewOptions !== undefined){\n      this.scrollIntoViewOptions = scrollIntoViewOptions;\n    }else{\n      this.scrollIntoViewOptions = {\n        block: 'start',\n        behavior: 'smooth'\n      };\n    }\n\n    this.deslocaAteOAlvo = this.deslocaAteOAlvo.bind(this);\n  }\n\n  init() {\n    if(this.botoesAcionadoresDeslocamento.length){\n      this.addEventDeslocamentoScroll();\n    }\n\n    return this;\n  }\n\n  addEventDeslocamentoScroll() {\n    this.botoesAcionadoresDeslocamento.forEach((botao) => botao.addEventListener('click', this.deslocaAteOAlvo));\n  }\n\n  deslocaAteOAlvo(event) {\n    event.preventDefault();\n    const botaoAcionador = event.currentTarget;\n    const seletor = botaoAcionador.dataset.deslocamentoAteAlvo;\n    \n    const elementoAlvo = document.querySelector(seletor);\n\n    if(elementoAlvo){\n      elementoAlvo.scrollIntoView(this.scrollIntoViewOptions);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://alvorecer/./js/modules/anima-deslocamento-ate-alvo.js?");

/***/ }),

/***/ "./js/modules/anima-numeros.js":
/*!*************************************!*\
  !*** ./js/modules/anima-numeros.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AnimaNumero)\n/* harmony export */ });\nclass AnimaNumero {\n  constructor(seletorElementoASerObservado, classeASerObservada\n    , seletorElementoParaAnimar, milisegundosAnimacao) {\n    \n    this.elementoASerObservado = document.querySelector(seletorElementoASerObservado);\n    this.classeASerObservada = classeASerObservada;\n    this.elementoParaAnimar = document.querySelector(seletorElementoParaAnimar);\n    this.milisegundosAnimacao = milisegundosAnimacao;\n    \n    this.observerCallback = this.observerCallback.bind(this);\n  }\n\n  init() {\n    \n    if(this.elementoASerObservado && this.classeASerObservada && this.elementoParaAnimar){\n      this.addObserver();\n    }else if(this.elementoParaAnimar){\n      this.animarNumero();\n    }\n\n    return this;\n  }\n\n  addObserver() {\n    this.observer = new MutationObserver(this.observerCallback);\n    this.observer.observe(this.elementoASerObservado, {attributes: true});\n  }\n\n  observerCallback() {\n    if(this.elementoASerObservado.classList.contains(this.classeASerObservada)){\n      this.animarNumero();\n      this.observer.disconnect();\n    }\n  }\n\n  animarNumero() {\n    const total = Number(this.elementoParaAnimar.innerText);\n    const iteracoes = 100;\n\n    const incremento = Math.ceil(total / iteracoes);\n    const passo = this.milisegundosAnimacao / iteracoes;\n    let soma = 0;\n\n    this.elementoParaAnimar.innerText = 0;\n\n    for(let count = 0; count < iteracoes; count++){\n      setTimeout(() => {\n        soma += incremento;\n\n        if(soma > total){\n          this.elementoParaAnimar.innerText = total;\n        }else{\n          this.elementoParaAnimar.innerText = soma;\n        }\n      }, count * passo);\n    }\n  }\n}\n\n//# sourceURL=webpack://alvorecer/./js/modules/anima-numeros.js?");

/***/ }),

/***/ "./js/modules/anima-titulo-campos-formulario.js":
/*!******************************************************!*\
  !*** ./js/modules/anima-titulo-campos-formulario.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AnimaTituloCampoFormulario)\n/* harmony export */ });\nclass AnimaTituloCampoFormulario {\n  constructor(seletorTitulos, classeAtiva) {\n\n    this.titulos = document.querySelectorAll(seletorTitulos);\n    this.campos = [];\n\n    if(classeAtiva !== undefined){\n      this.classeAtiva = classeAtiva;\n    }else{\n      this.classeAtiva = 'ativo';\n    }\n\n    this.eventTypes = ['touchstart', 'click'];\n\n    this.onFieldFocusOut = this.onFieldFocusOut.bind(this);\n  }\n\n  init() {\n    if(this.titulos.length){\n      this.getCampos();\n      this.addEventOnClick();\n      this.addEventFieldOnFocusOut();\n      this.verificaSeAlgumCampoJaEstaPreenchido();\n    }\n\n    return this;\n  }\n\n  getCampos() {\n    this.titulos.forEach((t) => {\n      const campoId = t.getAttribute('for');\n      const campo = document.querySelector('#'.concat(campoId));\n\n      if(campo){\n        this.campos.push(campo);\n      }\n    });\n  }\n\n  addEventOnClick() {\n    this.eventTypes.forEach((eventType) => {\n      this.titulos.forEach((titulo) => {\n        titulo.addEventListener(eventType, this.onLabelClick);\n      })\n    });\n  }\n\n  addEventFieldOnFocusOut() {\n    this.campos.forEach((campo) => campo.addEventListener('focusout', this.onFieldFocusOut))\n  }\n\n  onLabelClick(event) {\n    const titulo = event.currentTarget;\n\n    const campoId = titulo.getAttribute('for');\n    const campo = document.querySelector('#'.concat(campoId));\n\n    if(campo){\n      campo.focus();\n    }\n  }\n\n  onFieldFocusOut(event) {\n    const campo = event.currentTarget;\n\n    this.adicionaClasseAoCampoSePreenchido(campo);\n  }\n\n  verificaSeAlgumCampoJaEstaPreenchido() {\n    this.campos.forEach((campo) => {\n      this.adicionaClasseAoCampoSePreenchido(campo);\n    })\n  }\n\n  adicionaClasseAoCampoSePreenchido(campo) {\n    if(campo.value.length > 0){\n      campo.classList.add(this.classeAtiva);\n    }else{\n      campo.classList.remove(this.classeAtiva);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://alvorecer/./js/modules/anima-titulo-campos-formulario.js?");

/***/ }),

/***/ "./js/modules/debouce.js":
/*!*******************************!*\
  !*** ./js/modules/debouce.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ debounce)\n/* harmony export */ });\nfunction debounce(callback, tempo){\n  let timer = null;\n\n  return function(...args) {\n\n    if(timer !== null){\n      clearTimeout(timer);\n    }\n\n    timer = setTimeout(() => callback(...args), tempo);\n  }\n}\n\n//# sourceURL=webpack://alvorecer/./js/modules/debouce.js?");

/***/ }),

/***/ "./js/modules/fetch-numero-visitantes.js":
/*!***********************************************!*\
  !*** ./js/modules/fetch-numero-visitantes.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ fetchNumeroVisitantes)\n/* harmony export */ });\n/* harmony import */ var _anima_numeros_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./anima-numeros.js */ \"./js/modules/anima-numeros.js\");\n\nasync function fetchNumeroVisitantes(url, elementoAlvo){\n  const elemento = document.querySelector(elementoAlvo);\n  const response = await fetch(url);\n\n  if(response.ok && response.status === 200){\n    const json = await response.json();\n    const numeroVisitantes = json.numeroVisitantes;\n\n    if(numeroVisitantes !== undefined){\n      elemento.innerHTML = json.numeroVisitantes;\n    }\n  }\n  \n  const animaNumeroVisitantes = new _anima_numeros_js__WEBPACK_IMPORTED_MODULE_0__.default('#opinioes-section', 'ativo', '[data-anima-numeros]', 2000);\n  animaNumeroVisitantes.init();\n}\n\n//# sourceURL=webpack://alvorecer/./js/modules/fetch-numero-visitantes.js?");

/***/ }),

/***/ "./js/modules/menu-mobile.js":
/*!***********************************!*\
  !*** ./js/modules/menu-mobile.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MenuMobile)\n/* harmony export */ });\nclass MenuMobile {\n  constructor(seletorMobileBtn, seletorMobileMenu, activeClass){\n    this.mobileBtn = document.querySelector(seletorMobileBtn);\n    this.menuMobile = document.querySelector(seletorMobileMenu);\n\n    if(activeClass == undefined){\n      this.activeClass = 'ativo';\n    }else{\n      this.activeClass = activeClass;\n    }\n\n    this.toggleMenu = this.toggleMenu.bind(this);\n    this.closeMenuOnClickOutside = this.closeMenuOnClickOutside.bind(this);\n  }\n\n  init(){\n    if(this.mobileBtn && this.menuMobile) {\n      this.addEventMenuMobile();\n    }\n\n    return this;\n  }\n\n  addEventMenuMobile(){\n    this.mobileBtn.addEventListener('click', this.toggleMenu);\n  }\n\n  toggleMenu(event){\n    this.mobileBtn.classList.toggle(this.activeClass);\n    this.menuMobile.classList.toggle(this.activeClass);\n\n    if(this.mobileBtn.classList.contains(this.activeClass)){\n      document.documentElement.addEventListener('click', this.closeMenuOnClickOutside);\n    }else{\n      document.documentElement.removeEventListener('click', this.closeMenuOnClickOutside);\n    }\n  }\n\n  closeMenuOnClickOutside(event){\n    const target = event.target;\n\n    if(target !== this.mobileBtn && !this.menuMobile.contains(target)){\n      this.mobileBtn.classList.remove(this.activeClass);\n      this.menuMobile.classList.remove(this.activeClass);\n      document.documentElement.removeEventListener('click', this.closeMenuOnClickOutside);\n    }\n  }\n}\n\n//# sourceURL=webpack://alvorecer/./js/modules/menu-mobile.js?");

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Modal)\n/* harmony export */ });\nclass Modal {\n  constructor(seletorAbrirModal, seletorFecharModal, classeAtiva) {\n\n    this.buttonModal = document.querySelector(seletorAbrirModal);\n    this.modalContainer = document.querySelector(this.buttonModal.dataset.modal);\n    this.buttonCloseModal = this.modalContainer.querySelector(seletorFecharModal);\n\n    if(classeAtiva !== undefined){\n      this.classeAtiva = classeAtiva;\n    }else{\n      this.classeAtiva = 'ativo';\n    }\n    \n    this.eventTypes = ['touchstart', 'click'];\n\n    this.openModal = this.openModal.bind(this);\n    this.closeModal = this.closeModal.bind(this);\n  }\n\n  init() {\n\n    if(this.buttonModal && this.modalContainer && this.buttonCloseModal){\n      this.addEventOpenModal();\n    }\n\n    return this;\n  }\n\n  addEventOpenModal() {\n    this.eventTypes.forEach((eventType) => {\n      this.buttonModal.addEventListener(eventType, this.openModal);\n    });\n  }\n\n  addEventCloseModal() {\n    this.eventTypes.forEach((eventType) => {\n      this.buttonCloseModal.addEventListener(eventType, this.closeModal);\n      window.addEventListener(eventType, this.closeModal);\n    });\n  }\n\n  removeEventCloseModal() {\n    this.eventTypes.forEach((eventType) => {\n      this.buttonCloseModal.removeEventListener(eventType, this.closeModal);\n      window.removeEventListener(eventType, this.closeModal);\n    });\n  }\n\n  openModal(event) {\n    event.preventDefault();\n    this.modalContainer.classList.add(this.classeAtiva);\n    this.addEventCloseModal();\n  }\n\n  closeModal(event) {\n    const target = event.target;\n    \n    if(target === this.buttonCloseModal || target === this.modalContainer){\n      this.modalContainer.classList.remove(this.classeAtiva);\n      this.removeEventCloseModal();\n    }\n  }\n}\n\n//# sourceURL=webpack://alvorecer/./js/modules/modal.js?");

/***/ }),

/***/ "./js/modules/slide.js":
/*!*****************************!*\
  !*** ./js/modules/slide.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Slide)\n/* harmony export */ });\nclass Slide {\n  constructor(seletorSlide, seletorSlideItens, seletorControlesContainer,\n        seletorBotoesControles, tempoEntreSlides, classeAtivaControles) {\n    this.slide = document.querySelector(seletorSlide);\n    this.slideItens = this.slide.querySelectorAll(seletorSlideItens);\n\n    this.controlesContainer = document.querySelector(seletorControlesContainer);\n    this.controlesBotoes =  this.controlesContainer.querySelectorAll(seletorBotoesControles);\n\n    if(tempoEntreSlides === undefined) {\n      this.tempoEntreSlides = 5000;\n    }else{\n      this.tempoEntreSlides = tempoEntreSlides;\n    }\n\n    if(classeAtivaControles === undefined){\n      this.classeAtivaControles = 'ativo';\n    }else{\n      this.classeAtivaControles = classeAtivaControles;\n    }\n\n    this.onMouseOverHandler = this.onMouseOverHandler.bind(this);\n    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);\n  }\n\n  init() {\n\n    if(this.slide && this.slideItens.length){\n      this.carregaDadosPosicionamentoTodosItens();\n      this.exibeSlide(0);\n      this.addEventControles();\n      this.criarTimer();\n      this.addEventOnMouseOver();\n    }\n    \n    return this;\n  }\n\n  carregaDadosPosicionamentoAtual(indiceAtual) {\n\n    const indiceFinal = this.dadosPosicionamentoTodosItensSlide.length - 1;\n\n    let slideAnterior;\n    let slidePosterior;\n    let slideAtual = indiceAtual;\n\n    if(indiceAtual <= 0){\n      slideAnterior = indiceFinal;\n    }else{\n      slideAnterior = indiceAtual - 1;\n    }\n\n    if(indiceAtual >= indiceFinal){\n      slidePosterior = 0;\n    }else{\n      slidePosterior = indiceAtual + 1;\n    }\n\n    this.dadosPosicaoAtual = {\n      slideAnterior,\n      slideAtual,\n      slidePosterior\n    };\n  }\n\n  carregaDadosPosicionamentoTodosItens() {\n    this.dadosPosicionamentoTodosItensSlide = [];\n\n    this.slideItens.forEach((item, indice) => {\n      const distancia = -(indice * 100) + \"vw\";\n      const dados = {\n        item,\n        indice,\n        distancia\n      };\n      this.dadosPosicionamentoTodosItensSlide.push(dados);\n    });\n  }\n\n  indicaSlideAtualNosControles(indice){\n    this.controlesBotoes.forEach((elemento, indiceBotao) => {\n      if(indice === indiceBotao){\n        elemento.classList.add(this.classeAtivaControles);\n      }else{\n        elemento.classList.remove(this.classeAtivaControles);\n      }\n    })\n  }\n\n  exibeSlide(indice) {\n    this.slide.style.transform = `translate3d(${this.dadosPosicionamentoTodosItensSlide[indice].distancia}, 0, 0)`;\n    this.carregaDadosPosicionamentoAtual(indice);\n    this.indicaSlideAtualNosControles(indice);\n  }\n\n  slidePosterior() {\n    this.exibeSlide(this.dadosPosicaoAtual.slidePosterior);\n  }\n\n  slideAnterior() {\n    this.exibeSlide(this.dadosPosicaoAtual.slideAnterior);\n  }\n\n  criarTimer() {\n    this.timer = setInterval(() => {\n      this.slidePosterior();\n    }, this.tempoEntreSlides);\n\n    this.isTimerLimpo = false;\n  }\n\n  limparTimer(){\n    clearInterval(this.timer);\n\n    this.isTimerLimpo = true;\n  }\n\n  addEventControles() {\n    if(this.controlesBotoes.length){\n      this.controlesBotoes.forEach((elemento, indice) => {\n        elemento.addEventListener('click', (event) => {\n          event.preventDefault();\n\n          this.limparTimer();\n          this.exibeSlide(indice);\n          this.criarTimer();\n        });\n      })\n    }\n  }\n\n  addEventOnMouseOver() {\n    this.slide.addEventListener('mouseover', this.onMouseOverHandler);\n  }\n\n  set isTimerLimpo(isTimerLimpo) {\n    this._isTimerLimpo = isTimerLimpo;\n  }\n\n  get isTimerLimpo() {\n    return this._isTimerLimpo;\n  }\n\n  onMouseOverHandler(event) {\n    const target = event.target;\n\n    if(this.slide.contains(target) && !this.isTimerLimpo){\n      this.limparTimer();\n      this.slide.addEventListener('mouseleave', this.onMouseLeaveHandler);\n    }\n  }\n\n  onMouseLeaveHandler() {\n    this.criarTimer();\n    this.slide.removeEventListener('mouseleave', this.onMouseLeaveHandler);\n  }\n}\n\n\n//# sourceURL=webpack://alvorecer/./js/modules/slide.js?");

/***/ }),

/***/ "./js/modules/tab-nav.js":
/*!*******************************!*\
  !*** ./js/modules/tab-nav.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TabNav)\n/* harmony export */ });\nclass TabNav {\n  constructor(seletorAcionador, seletorAlvo, classeAtiva) {\n    this.acionadores = document.querySelectorAll(seletorAcionador);\n    this.alvos = document.querySelectorAll(seletorAlvo);\n\n    if(classeAtiva === undefined){\n      this.classeAtiva = 'ativo';\n    }else{\n      this.classeAtiva = classeAtiva;\n    }\n\n    this.callbackTabNavChange = [];\n\n    this.acionadorHandler = this.acionadorHandler.bind(this);\n  }\n\n  init() {\n\n    if(this.acionadores.length && this.alvos.length){\n      this.addEventAcionadores();\n      this.acionar(this.acionadores[0], this.alvos[0]);\n    }\n\n    return this;\n  }\n\n  addEventAcionadores() {\n    this.acionadores.forEach(acionador => {\n      acionador.addEventListener('click', this.acionadorHandler);\n    });\n  }\n\n  acionadorHandler(event) {\n    event.preventDefault();\n    const acionador = event.currentTarget;\n    const href = acionador.getAttribute('href');\n    const alvo = document.querySelector(href);\n\n    this.desacionarTodos();\n    this.acionar(acionador, alvo);\n    this.executeAllCallbacksTabNavChange();\n  }\n\n  acionar(acionador, alvo){\n    acionador.classList.add(this.classeAtiva);\n    alvo.classList.add(this.classeAtiva);\n  }\n\n  desacionarTodos(){\n    this.acionadores.forEach(acionador => acionador.classList.remove(this.classeAtiva));\n    this.alvos.forEach(alvo => alvo.classList.remove(this.classeAtiva));\n  }\n\n  addCallbackTabNavChange(callback){\n    this.callbackTabNavChange.push(callback);\n  }\n\n  executeAllCallbacksTabNavChange(){\n    this.callbackTabNavChange.forEach((callback) => {\n      callback();\n    });\n  }\n}\n\n\n//# sourceURL=webpack://alvorecer/./js/modules/tab-nav.js?");

/***/ }),

/***/ "./js/modules/tooltip.js":
/*!*******************************!*\
  !*** ./js/modules/tooltip.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Tooltip)\n/* harmony export */ });\n/* harmony import */ var _debouce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debouce.js */ \"./js/modules/debouce.js\");\n\nclass Tooltip {\n  constructor(seletorTooltips, classeTootip) {\n    this.tooltips = document.querySelectorAll(seletorTooltips);\n\n    if(classeTootip !== undefined){\n      this.classeTootip = classeTootip;\n    }else{\n      this.classeTootip = 'tooltip';\n    }\n\n    this.onMouseOver = this.onMouseOver.bind(this);\n    this.onMouseMove = (0,_debouce_js__WEBPACK_IMPORTED_MODULE_0__.default)(this.onMouseMove.bind(this), 10);\n    this.onMouseLeave = this.onMouseLeave.bind(this);\n  }\n\n  init() {\n    if(this.tooltips.length){\n      this.addEventTooltip();\n    }\n\n    return this;\n  }\n\n  addEventTooltip() {\n    this.tooltips.forEach((tooltip) => {\n      tooltip.addEventListener('mouseover', this.onMouseOver);\n    })\n  }\n  \n  onMouseOver(event) {\n    const target = event.currentTarget;\n    const contentTooltip = target.getAttribute('aria-label');\n\n    this.elementTooltip = document.createElement('div');\n    this.elementTooltip.innerText = contentTooltip;\n    this.elementTooltip.classList.add(this.classeTootip);\n    this.tooltipReposition(event);\n    document.body.appendChild(this.elementTooltip);\n\n    target.addEventListener('mousemove', this.onMouseMove);\n    target.addEventListener('mouseleave', this.onMouseLeave);\n  }\n  \n  onMouseMove(event) {\n    this.tooltipReposition(event);\n  }\n\n  onMouseLeave(event) {\n    const target = event.currentTarget;\n    this.elementTooltip.remove();\n    target.removeEventListener('mousemove', this.onMouseMove);\n    target.removeEventListener('mouseleave', this.onMouseLeave);\n  }\n\n  tooltipReposition(event) {\n    const top = event.pageY;\n    const left = event.pageX;\n\n    const halfWindowWidth = window.innerWidth / 2;\n\n    const positionOffsetX = 20;\n    const positionOffsetY = 20;\n\n    const tooltipTop = top + positionOffsetY;\n    let tooltipLeft;\n\n    if(left > halfWindowWidth){\n      tooltipLeft = left - positionOffsetX - 260;\n    }else {\n      tooltipLeft = left + positionOffsetX;\n    }\n\n    this.elementTooltip.style.top = `${tooltipTop}px`;\n    this.elementTooltip.style.left = `${tooltipLeft}px`;\n  }\n}\n\n//# sourceURL=webpack://alvorecer/./js/modules/tooltip.js?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_menu_mobile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/menu-mobile.js */ \"./js/modules/menu-mobile.js\");\n/* harmony import */ var _modules_anima_deslocamento_ate_alvo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/anima-deslocamento-ate-alvo.js */ \"./js/modules/anima-deslocamento-ate-alvo.js\");\n/* harmony import */ var _modules_acionador_classe_deslocamento_scroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/acionador-classe-deslocamento-scroll.js */ \"./js/modules/acionador-classe-deslocamento-scroll.js\");\n/* harmony import */ var _modules_slide_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slide.js */ \"./js/modules/slide.js\");\n/* harmony import */ var _modules_tab_nav_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tab-nav.js */ \"./js/modules/tab-nav.js\");\n/* harmony import */ var _modules_fetch_numero_visitantes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/fetch-numero-visitantes.js */ \"./js/modules/fetch-numero-visitantes.js\");\n/* harmony import */ var _modules_accordion_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/accordion.js */ \"./js/modules/accordion.js\");\n/* harmony import */ var _modules_tooltip_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/tooltip.js */ \"./js/modules/tooltip.js\");\n/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/modal.js */ \"./js/modules/modal.js\");\n/* harmony import */ var _modules_anima_titulo_campos_formulario_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/anima-titulo-campos-formulario.js */ \"./js/modules/anima-titulo-campos-formulario.js\");\n\n\n\n\n\n\n\n\n\n\n\nconst menuMobile = new _modules_menu_mobile_js__WEBPACK_IMPORTED_MODULE_0__.default('[data-menu-mobile-btn]', '[data-menu-mobile]');\nmenuMobile.init();\n\nconst deslocamentoAteOAlvo = new _modules_anima_deslocamento_ate_alvo_js__WEBPACK_IMPORTED_MODULE_1__.default('[data-deslocamento-ate-alvo]');\ndeslocamentoAteOAlvo.init();\n\nconst acionadorDeClasseAoDeslocamentoScroll = \n        new _modules_acionador_classe_deslocamento_scroll_js__WEBPACK_IMPORTED_MODULE_2__.default('[data-acionar-ao-scroll-acionador]', '[data-acionar-ao-scroll-alvo]');\nacionadorDeClasseAoDeslocamentoScroll.init();\n\nconst slide = new _modules_slide_js__WEBPACK_IMPORTED_MODULE_3__.default('[data-slide]', '[data-slide-item]',\n        '[data-slide-controls]', '[data-slide-controls-botao]', 5000);\nslide.init();\n\nconst tabNav = new _modules_tab_nav_js__WEBPACK_IMPORTED_MODULE_4__.default('[data-tab-nav=\"acionador\"]','[data-tab-nav=\"alvo\"]');\ntabNav.init();\ntabNav.addCallbackTabNavChange(() => acionadorDeClasseAoDeslocamentoScroll.recarregaDadosDePosicionamento());\n\n(0,_modules_fetch_numero_visitantes_js__WEBPACK_IMPORTED_MODULE_5__.default)('../numero-visitantes.json', '[data-numero-visitantes]');\n\nconst accordion = new _modules_accordion_js__WEBPACK_IMPORTED_MODULE_6__.default('[data-accordion-item]');\naccordion.init();\naccordion.addCallbackAccordionToggle(() => acionadorDeClasseAoDeslocamentoScroll.recarregaDadosDePosicionamento());\n\nconst tooltip = new _modules_tooltip_js__WEBPACK_IMPORTED_MODULE_7__.default('[data-tooltip]');\ntooltip.init();\n\nconst modal = new _modules_modal_js__WEBPACK_IMPORTED_MODULE_8__.default('[data-modal]','[data-modal-close]', 'ativo');\nmodal.init();\n\nconst animaTitulosFormulario = new _modules_anima_titulo_campos_formulario_js__WEBPACK_IMPORTED_MODULE_9__.default('[data-anime=\"titulo-formulario\"]', 'preenchido');\nanimaTitulosFormulario.init();\n\n/* Removendo o redirecionamento para páginas que ainda não existem */\ndocument.querySelectorAll('a[href$=\".html\"]').forEach((a) => {\n    a.addEventListener('click', (event) => event.preventDefault());\n})\n\n\n//# sourceURL=webpack://alvorecer/./js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;