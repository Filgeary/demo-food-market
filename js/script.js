'use strict';

// utils
import { openModal } from './utils/modalHelpers';

// modules
import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {
    // open modal by timeout
    const modalTimerId = setTimeout(() => {
        openModal(modalTimerId);
    }, 30000);

    // modules
    calculator();
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]', '[data-modal-close]', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner',
        currentCounter: '#current',
        totalCounter: '#total',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next'
    });
    tabs({
        container: '.tabcontainer',
        tabsSelector: '.tabcontent',
        tabHeaderSelector: '.tabheader__items',
        tabItemsSelector: '.tabheader__item',
        activeClass: 'tabheader__item_active'
    });
    timer('.timer', '2022-01-01');
});
