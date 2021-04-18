'use strict';

// modules
import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {
    // modules
    calculator();
    cards();
    forms();
    modal();
    slider();
    tabs();
    timer();
});
