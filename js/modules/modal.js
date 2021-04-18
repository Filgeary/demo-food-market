function modal() {
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
}

export default modal;
