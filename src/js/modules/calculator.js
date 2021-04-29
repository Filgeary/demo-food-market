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
            result.textContent = '0';
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

export default calculator;
