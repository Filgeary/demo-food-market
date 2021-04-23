function tabs({
    container,
    tabsSelector,
    tabHeaderSelector,
    tabItemsSelector,
    activeClass
}) {
    const tabContainer = document.querySelector(container);
    const tabs = tabContainer.querySelectorAll(tabsSelector);
    const tabHeader = tabContainer.querySelector(tabHeaderSelector);
    const tabItems = tabContainer.querySelectorAll(tabItemsSelector);

    const hideTabs = () => {
        tabs.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabItems.forEach((item) => {
            item.classList.remove(activeClass);
        });
    };

    const showTabs = (i = 0) => {
        tabs[i].classList.add('show', 'fade');
        tabs[i].classList.remove('hide');
        tabItems[i].classList.add(activeClass);
    };

    hideTabs();
    showTabs();

    tabHeader.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target && target.matches(tabItemsSelector)) {
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
