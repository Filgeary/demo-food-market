export const modalBox = document.querySelector('.modal');

export function openModal(modalTimerId) {
    modalBox.classList.add('show');
    modalBox.classList.remove('hide');

    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}

export function closeModal() {
    modalBox.classList.add('hide');
    modalBox.classList.remove('show');
}
