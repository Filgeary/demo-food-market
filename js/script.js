'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // modules
    const calculator = require('./modules/calculator');
    const cards = require('./modules/cards');
    const forms = require('./modules/forms');
    const modal = require('./modules/modal');
    const slider = require('./modules/slider');
    const tabs = require('./modules/tabs');
    const timer = require('./modules/timer');

    // modules
    calculator();
    cards();
    forms();
    modal();
    slider();
    tabs();
    timer();
});
