import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimer){
    // отправляем данные из формы обратной связи на сервер 
    const forms = document.querySelectorAll(formSelector);

    // ответы для пользователя 
    const message = {
        loading: "./icons/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    // для всех форм обратной связи вызывем функцию postData
    forms.forEach(item => {
        bindPostData(item);
    })

    

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img"); // создаем img
            statusMessage.src = message.loading; // добавляем картинке атрибу с ссылкой на спиннер 
            // добавляем стили для картикни, но лучше делать это через добавление класса 
            statusMessage.style.cssText = ` 
                display: block;
                margin: 0 auto;
            `;
            // добавляем спиннер в форму 
            //form.append(statusMessage);
            form.insertAdjacentElement("afterend", statusMessage);

           /* ==== заменяем на fetch ====
            const request = new XMLHttpRequest();
            request.open("POST", "server.php"); 
            request.setRequestHeader("Content-type", "multipart/form-data"); // когда используем связку XMLHttpRequest() + FormData() нам не нужно устанавливать заголовок 
            request.setRequestHeader("Content-type", "application/json"); // но если нам надо поменять формат данных и отправлят на сервер json прописываем "application/json" */
            
            const formData = new FormData(form);

            /* превращаем formData в json -- старый метод
            const obj = {}; // создаем пустой объект 
            formData.forEach((valye, key) => { // перебираем formData
                obj[key] = valye; // и помещаем все данные из formData в obj
            }) */ 

            // превращаем formData в json -- новый метод
            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            /* === заменяем на fetch ===
            request.send(json); */ 

            /* заменяем функцией postData()
            fetch("server.php", {
                method: "POST",
                headers:  {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj) // конвертируем объект в json
            }) */ 
            postData("http://localhost:3000/requests", json)
            .then(data => { // data - то, что возвращает сервер
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove(); // удаляем сообщение 
            }).catch(() => {
                showThanksModal(message.failure)
            }).finally(() => {
                form.reset(); // очистка формы в любом случае
            });

            /* ==== заменяем на fetch ====
            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset(); // очистка формы после успешной отправки
                    statusMessage.remove(); // удаляем сообщение 
                    
                } else {
                    showThanksModal(message.failure)
                }
            }) */ 
        });
    }

    // функция для показа статуса отправки данных на сервер
    function showThanksModal(message){
        // работаем с уже существующим модальным окном 
        const modalContent = document.querySelector(".modal__dialog"); 
        // скрываем его содержимое 
        modalContent.classList.add("hide");
        openModal(".modal", modalTimer);

        // создаем новый див и добавляем в него нужную разметку 
        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        // через 4 секунды удаляем созданный контент + возвращаем контент нашей изначальной формы + закрываем модальное окно
        setTimeout(() => {
            thanksModal.remove();
            modalContent.classList.add("show");
            modalContent.classList.remove("hide");
            closeModal(".modal");
        }, 4000);
    }

    // запрос через json-server
    fetch("http://localhost:3000/menu")
        .then(data => data.json())
        .then(res => console.log(res))
}

export default forms;