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

export default tabs;
