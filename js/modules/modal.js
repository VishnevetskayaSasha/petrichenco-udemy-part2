function openModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = 'hidden'; // запрещаем прокрутку страницы при открытом модальном окне

    if(modalTimer) { // если в функцию openModal передаем второй аргумент (modalTimer), сработает удаление таймера
        clearInterval(modalTimer); // если пользователь сам открыл модальное окно, удаляем автоматическое открытие 
    }
}
    

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimer){
    const modalsBntOpen = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    // const modalsBntClose = document.querySelector("[data-close]");

    modalsBntOpen.forEach(item => {
        item.addEventListener("click", () => openModal(modalSelector, modalTimer)); 
        // так как мы не должны сразу вызывать колбэк функцию в обработчике события, но нам надо передать аргумент -- прописываем срелочную функцию
    });

    // т.к. дальше в коде мы создаем еще один крестик динамически, closeModal на нем не сработает 
    // modalsBntClose.addEventListener("click", closeModal); 

    // закрытие модального окна при клике на темную подложку + элемент с отрибутом "data-close" (наш крестик)
    modal.addEventListener("click", (e) => {
        // если мы кликаем на темную подложку или на элемент с отрибутом "data-close" (наш крестик)
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal(modalSelector);
        }
    });

    // закрытие модального окна при нажатии на Escape
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });



    // автоматическое открытие модального окна когда пользователь долистал до конца сайта
    function showModalByScroll() {
        // количество пикселей, которые уже проскроллены + видимая часть сайта >= 
        // высоты содержимого элемента, включая содержимое, не видимое на экране из-за переполнения.
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener("scroll", showModalByScroll); // удаляем обработчик события после открытия окна, 
            // что бы открытие сработало один раз, а не каждый раз как пользователь долистывает до конца
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export {openModal, closeModal};