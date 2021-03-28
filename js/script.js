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
    const modalTrigger = document.querySelectorAll('[data-modal]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // TODO: uncomment for switch Timer
        // clearTimeout(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
    }

    // add handlers to open modal
    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    // close modal
    modal.addEventListener('click', (evt) => {
        const target = evt.target;

        if (
            target &&
            (target.matches('[data-modal-close]') || target === modal)
        ) {
            closeModal();
        }
    });

    // close modal by 'Escape'
    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // open modal by timeout
    // TODO: uncomment for switch Timer
    // const modalTimerId = setTimeout(toggleModal, 30000);

    // open modal by scroll to the end of page
    function onScrollModalOpen() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener('scroll', onScrollModalOpen);
        }
    }

    window.addEventListener('scroll', onScrollModalOpen);

    // menu cards render
    // =========================================================

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

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        319,
        '.menu .container'
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        414,
        '.menu .container'
    ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        521,
        '.menu .container'
    ).render();

    // post FormData
    // =========================================================

    const forms = document.querySelectorAll('form');
    const message = {
        loading: './img/form/spinner.svg',
        success: 'Thanks for your order!',
        error: '! Something WRONG !'
    };

    forms.forEach((item) => {
        postForm(item);
    });

    function postForm(form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 10px auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const url = 'https://echo.htmlacademy.ru';
            const dataForm = new FormData(form);

            fetch(url, {
                method: 'POST',
                body: dataForm
            })
                .then((response) => response.text())
                .then((data) => {
                    console.log(data);
                    showFormMessage(message.success);
                    statusMessage.remove();
                })
                .catch((err) => {
                    console.error('ERROR', err);
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
        openModal();

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
            closeModal();
        }, 3000);
    }

    // fetch local db.json via json-server
    // =========================================================

    const requestUrlLocalDB = 'http://localhost:3000/menu';
    const postUrlLocalDB = 'http://localhost:3000/requests';

    function requestLocalDB(url) {
        fetch(url)
            .then((data) => data.json())
            .then((json) => console.log(json));
    }
    // requestLocalDB(requestUrlLocalDB);
});
