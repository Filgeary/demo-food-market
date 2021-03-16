'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // tabs
    // =========================================================

    const tabs = document.querySelectorAll('.tabcontent');
    const tabItems = document.querySelectorAll('.tabheader__item');
    const tabHeader = document.querySelector('.tabheader__items');

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

    // timer
    // =========================================================

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

    function getZero(number) {
        if (number >= 0 && number < 10) {
            return '0' + number;
        }
        return number;
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

            days.innerHTML = getZero(total.days);
            hours.innerHTML = getZero(total.hours);
            minutes.innerHTML = getZero(total.minutes);
            seconds.innerHTML = getZero(total.seconds);

            if (total.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // modal
    // =========================================================

    const modal = document.querySelector('.modal');

    document.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target && target.matches('[data-modal]')) {
            modal.classList.toggle('hide');
        }
    });

    modal.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target && (target.matches('[data-modal-close]') || target === modal)) {
            modal.classList.toggle('hide');
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && !modal.classList.contains('hide')) {
            modal.classList.toggle('hide');
        }
    });
});
