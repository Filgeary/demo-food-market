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
    forms();
    modal();
    slider();
    tabs();
    timer();
});
