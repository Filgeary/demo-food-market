import { modalBox, openModal, closeModal } from '../utils/modalHelpers';

function modal(triggerSelector, modalCloseSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector);

    // add handlers to open modal
    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', () => openModal(modalTimerId));
    });

    // close modal
    modalBox.addEventListener('click', (evt) => {
        const target = evt.target;

        if (
            target &&
            (target.matches(modalCloseSelector) || target === modalBox)
        ) {
            closeModal();
        }
    });

    // close modal by 'Escape'
    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && modalBox.classList.contains('show')) {
            closeModal();
        }
    });

    // open modal by scroll to the end of page
    function onScrollModalOpen() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal(modalTimerId);
            window.removeEventListener('scroll', onScrollModalOpen);
        }
    }

    window.addEventListener('scroll', onScrollModalOpen);
}

export default modal;
