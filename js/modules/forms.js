import { openModal, closeModal } from '../utils/modalHelpers';

function forms(formsSelector, modalTimerId) {
    // fetch local db.json via json-server
    const urlPostLocalDB = 'http://localhost:3000/requests';

    // forms
    const forms = document.querySelectorAll(formsSelector);
    const message = {
        loading: './img/form/spinner.svg',
        success: 'Thanks for your order!',
        error: '! Something WRONG !'
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    // postData
    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await response.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 10px auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const dataForm = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(dataForm.entries()));

            postData(urlPostLocalDB, json)
                .then((data) => {
                    console.log(data);
                    showFormMessage(message.success);
                    statusMessage.remove();
                })
                .catch((err) => {
                    console.error(err);
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
        openModal(modalTimerId);

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
}

export default forms;
