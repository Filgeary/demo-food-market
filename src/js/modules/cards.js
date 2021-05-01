import { getData } from '../utils/services';

function cards(urlGetData) {
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

    getData(urlGetData)
        .then((data) => {
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
        })
        .catch((err) => {
            throw new Error('Invalid data', err);
        });
}

export default cards;
