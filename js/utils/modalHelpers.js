export const modalBox = document.querySelector('.modal');

export function openModal() {
    modalBox.classList.add('show');
    modalBox.classList.remove('hide');
    // TODO: uncomment for switch Timer
    // clearTimeout(modalTimerId);
}

export function closeModal() {
    modalBox.classList.add('hide');
    modalBox.classList.remove('show');
}
