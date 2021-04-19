/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    const calculator = document.querySelector('.calculating');
    const genderBoxes = calculator.querySelectorAll('[data-gender]');
    const inputBox = calculator.querySelector('.calculating__choose_medium');
    const ratioBoxes = calculator.querySelectorAll('[data-ratio]');
    const result = calculator.querySelector('.calculating__result > span');
    const activeClass = 'calculating__choose-item_active';

    let sex = '';
    let height = 0;
    let weight = 0;
    let age = 0;
    let ratio = 0;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'male';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.55;
        localStorage.setItem('ratio', ratio);
    }

    function initLocalSettings() {
        genderBoxes.forEach((item) => {
            item.classList.remove(activeClass);

            if (item.dataset.gender === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }
        });

        ratioBoxes.forEach((item) => {
            item.classList.remove(activeClass);

            if (item.dataset.ratio === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });
    }
    initLocalSettings();

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round(
                (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
            );
        } else {
            result.textContent = Math.round(
                (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
            );
        }
    }
    calcTotal();

    calculator.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target && target.matches('[data-gender]')) {
            sex = target.dataset.gender;
            localStorage.setItem('sex', sex);
            genderBoxes.forEach((item) => item.classList.remove(activeClass));
            target.classList.add(activeClass);
            calcTotal();
        }

        if (target && target.matches('[data-ratio]')) {
            ratio = target.dataset.ratio;
            localStorage.setItem('ratio', ratio);
            ratioBoxes.forEach((item) => item.classList.remove(activeClass));
            target.classList.add(activeClass);
            calcTotal();
        }
    });

    inputBox.addEventListener('input', (evt) => {
        const target = evt.target;

        if (target && target.matches('[data-input]')) {
            if (target.value.match(/[^\d.]/g)) {
                target.style.border = '1px solid tomato';
            } else {
                target.style.border = 'none';
            }

            switch (target.dataset.input) {
                case 'height':
                    height = +target.value;
                    break;

                case 'weight':
                    weight = +target.value;
                    break;

                case 'age':
                    age = +target.value;
                    break;
            }
        }
        calcTotal();
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    class MenuCard {
        constructor(
            src,
            alt,
            title,
            description,
            price,
            parentSelector,
            ...classes
        ) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes.push('menu__item');
            }

            this.classes.forEach((className) =>
                element.classList.add(className)
            );

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt} />
                <h3 class="menu__item-subtitle">${this.title}"</h3>
                <div class="menu__item-descr">
                    ${this.description}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // fetch local db.json via json-server
    const urlGetLocalDB = 'http://localhost:3000/menu';

    // getData
    const getData = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch ${url}, status: ${response.status}`
            );
        }

        return await response.json();
    };

    getData(urlGetLocalDB).then((data) => {
        data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(
                img,
                altimg,
                title,
                descr,
                price,
                '.menu .container'
            ).render();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/modalHelpers */ "./js/utils/modalHelpers.js");


function forms(formsSelector, modalTimerId) {
    // fetch local db.json via json-server
    const urlPostLocalDB = 'http://localhost:3000/requests';

    // forms
    const forms = document.querySelectorAll(formsSelector);
    const message = {
        loading: './img/form/spinner.svg',
        success: 'Thanks for your order!',
        error: '! Something WRONG !'
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    // postData
    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await response.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 10px auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const dataForm = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(dataForm.entries()));

            postData(urlPostLocalDB, json)
                .then((data) => {
                    console.log(data);
                    showFormMessage(message.success);
                    statusMessage.remove();
                })
                .catch((err) => {
                    console.error(err);
                    showFormMessage(message.error);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showFormMessage(message) {
        const modalContent = document.querySelector('.modal__dialog');

        modalContent.classList.add('hide');
        (0,_utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalTimerId);

        const newModalContent = document.createElement('div');
        newModalContent.classList.add('modal__dialog');
        newModalContent.innerHTML = `
            <div class="modal__content">
                <div data-modal-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(newModalContent);

        setTimeout(() => {
            newModalContent.remove();
            modalContent.classList.add('show');
            modalContent.classList.remove('hide');
            (0,_utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
        }, 3000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/modalHelpers */ "./js/utils/modalHelpers.js");


function modal() {
    const modalTrigger = document.querySelectorAll('[data-modal]');

    // add handlers to open modal
    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', _utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__.openModal);
    });

    // close modal
    _utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__.modalBox.addEventListener('click', (evt) => {
        const target = evt.target;

        if (
            target &&
            (target.matches('[data-modal-close]') || target === _utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__.modalBox)
        ) {
            (0,_utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
        }
    });

    // close modal by 'Escape'
    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && _utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__.modalBox.classList.contains('show')) {
            (0,_utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
        }
    });

    // open modal by scroll to the end of page
    function onScrollModalOpen() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            (0,_utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__.openModal)();
            window.removeEventListener('scroll', onScrollModalOpen);
        }
    }

    window.addEventListener('scroll', onScrollModalOpen);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getZero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getZero */ "./js/utils/getZero.js");


function slider() {
    // slider #1
    // =========================================================

    // const slider = document.querySelector('.offer__slider');

    // const slides = slider.querySelectorAll('.offer__slide');
    // const currentSlide = slider.querySelector('#current');
    // const totalSlides = slider.querySelector('#total');
    // const sliderPrev = slider.querySelector('.offer__slider-prev');
    // const sliderNext = slider.querySelector('.offer__slider-next');

    // let sliderIndex = 1;

    // showSlides(sliderIndex);
    // totalSlides.textContent = getZero(slides.length);

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         sliderIndex = 1;
    //     }

    //     if (n < 1) {
    //         sliderIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.classList.add('hide'));
    //     slides[sliderIndex - 1].classList.replace('hide', 'show');
    //     currentSlide.textContent = getZero(sliderIndex);
    // }

    // function calculateSlide(n) {
    //     showSlides((sliderIndex += n));
    // }

    // sliderPrev.addEventListener('click', () => calculateSlide(-1));
    // sliderNext.addEventListener('click', () => calculateSlide(+1));

    // slider #2
    // =========================================================

    const slider = document.querySelector('.offer__slider');

    const slides = slider.querySelectorAll('.offer__slide');
    const sliderWrapper = slider.querySelector('.offer__slider-wrapper');
    const widthSliderWrapper = window.getComputedStyle(sliderWrapper).width;
    const sliderInner = slider.querySelector('.offer__slider-inner');

    const currentSlide = slider.querySelector('#current');
    const totalSlides = slider.querySelector('#total');
    const sliderPrev = slider.querySelector('.offer__slider-prev');
    const sliderNext = slider.querySelector('.offer__slider-next');

    let slideIndex = 1;
    let offset = 0;

    currentSlide.textContent = (0,_utils_getZero__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);
    totalSlides.textContent = (0,_utils_getZero__WEBPACK_IMPORTED_MODULE_0__.getZero)(slides.length);

    sliderInner.style.width = 100 * slides.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';
    sliderWrapper.style.overflow = 'hidden';

    slides.forEach((slide) => (slide.style.width = widthSliderWrapper));

    sliderNext.addEventListener('click', () => {
        if (offset == parseFloat(widthSliderWrapper) * (slides.length - 1)) {
            offset = 0;
            sliderInner.style.transition = '0.1s all';
        } else {
            offset += parseFloat(widthSliderWrapper);
            sliderInner.style.transition = '0.5s all';
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
        slideIndex = slideIndex == slides.length ? 1 : ++slideIndex;
        currentSlide.textContent = (0,_utils_getZero__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);
        setActiveDot();
    });

    sliderPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = parseFloat(widthSliderWrapper) * (slides.length - 1);
            sliderInner.style.transition = '0.1s all';
        } else {
            offset -= parseFloat(widthSliderWrapper);
            sliderInner.style.transition = '0.5s all';
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
        slideIndex = slideIndex == 1 ? slides.length : --slideIndex;
        currentSlide.textContent = (0,_utils_getZero__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);
        setActiveDot();
    });

    // carousel-dots
    // =========================================================

    const carouselDotsWrapper = document.createElement('ol');
    const carouselDots = [];
    carouselDotsWrapper.classList.add('carousel-indicators');

    slider.style.position = 'relative';
    slider.append(carouselDotsWrapper);

    for (let i = 0; i < slides.length; i++) {
        const dotCarousel = document.createElement('li');
        dotCarousel.setAttribute('data-slide-to', i + 1);
        dotCarousel.classList.add('dot');
        dotCarousel.style.opacity = i == 0 ? 1 : 0.5;

        carouselDotsWrapper.append(dotCarousel);
        carouselDots.push(dotCarousel);
    }

    function setActiveDot() {
        carouselDots.forEach((item) => (item.style.opacity = '0.5'));
        carouselDots[slideIndex - 1].style.opacity = '1';
    }

    carouselDotsWrapper.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target && target.matches('[data-slide-to]')) {
            slideIndex = target.getAttribute('data-slide-to');
            offset = parseFloat(widthSliderWrapper) * (slideIndex - 1);

            sliderInner.style.transform = `translateX(-${offset}px)`;
            currentSlide.textContent = (0,_utils_getZero__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);
            setActiveDot();
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
    const tabContainer = document.querySelector('.tabcontainer');
    const tabs = tabContainer.querySelectorAll('.tabcontent');
    const tabItems = tabContainer.querySelectorAll('.tabheader__item');
    const tabHeader = tabContainer.querySelector('.tabheader__items');

    const hideTabs = () => {
        tabs.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabItems.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    };

    const showTabs = (i = 0) => {
        tabs[i].classList.add('show', 'fade');
        tabs[i].classList.remove('hide');
        tabItems[i].classList.add('tabheader__item_active');
    };

    hideTabs();
    showTabs();

    tabHeader.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target && target.matches('.tabheader__item')) {
            tabItems.forEach((item, i) => {
                if (target == item) {
                    hideTabs();
                    showTabs(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getZero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getZero */ "./js/utils/getZero.js");


function timer() {
    const deadline = '2022-01-01';

    function getTimeRemaining(endtime) {
        const now = new Date();
        let timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
        let totalTimestamp = 0;

        if (timezoneOffset < 0) {
            timezoneOffset = Math.abs(timezoneOffset);
            totalTimestamp = Date.parse(endtime) - Date.now() - timezoneOffset;
        } else if (timezoneOffset > 0) {
            totalTimestamp = Date.parse(endtime) - Date.now() + timezoneOffset;
        } else {
            totalTimestamp = Date.parse(endtime) - Date.now();
        }

        const days = Math.floor(totalTimestamp / (1000 * 60 * 60 * 24)),
            hours = Math.floor((totalTimestamp / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((totalTimestamp / (1000 * 60)) % 60),
            seconds = Math.floor((totalTimestamp / 1000) % 60);

        return {
            total: totalTimestamp,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const total = getTimeRemaining(endtime);

            days.innerHTML = (0,_utils_getZero__WEBPACK_IMPORTED_MODULE_0__.getZero)(total.days);
            hours.innerHTML = (0,_utils_getZero__WEBPACK_IMPORTED_MODULE_0__.getZero)(total.hours);
            minutes.innerHTML = (0,_utils_getZero__WEBPACK_IMPORTED_MODULE_0__.getZero)(total.minutes);
            seconds.innerHTML = (0,_utils_getZero__WEBPACK_IMPORTED_MODULE_0__.getZero)(total.seconds);

            if (total.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/utils/getZero.js":
/*!*****************************!*\
  !*** ./js/utils/getZero.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
function getZero(number) {
    if (number >= 0 && number < 10) {
        return '0' + number;
    }
    return number;
}


/***/ }),

/***/ "./js/utils/modalHelpers.js":
/*!**********************************!*\
  !*** ./js/utils/modalHelpers.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalBox": () => (/* binding */ modalBox),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
const modalBox = document.querySelector('.modal');

function openModal(modalTimerId) {
    modalBox.classList.add('show');
    modalBox.classList.remove('hide');

    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}

function closeModal() {
    modalBox.classList.add('hide');
    modalBox.classList.remove('show');
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/modalHelpers */ "./js/utils/modalHelpers.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");


// utils


// modules








window.addEventListener('DOMContentLoaded', () => {
    // open modal by timeout
    const modalTimerId = setTimeout(() => {
        (0,_utils_modalHelpers__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalTimerId);
    }, 30000);

    // modules
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__.default)('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_6__.default)();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__.default)();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map