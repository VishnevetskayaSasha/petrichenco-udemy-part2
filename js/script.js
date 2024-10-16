window.addEventListener("DOMContentLoaded", ()=>{

    // tabs
    const tabsParent = document.querySelector(".tabheader__items");
    const tabs = tabsParent.querySelectorAll(".tabheader__item");
    const tabsContent = document.querySelectorAll(".tabcontent");

    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.remove("show", "fade");
            item.classList.add("hide");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    hideTabsContent();

    function showTabsContent (i = 0) {
        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("show", "fade");
        tabs[i].classList.add("tabheader__item_active");
    }

    showTabsContent();

    tabsParent.addEventListener("click", (e) => {
        const target = e.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) { // если эвент совпал с элементом
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

// timer
   //const deadline = "2024-12-31"; // дата не прошла - время по Гринвичу 
   //const deadline = "2024-10-01"; // дата прошла - время по Гринвичу 
   const deadline = "December 31, 2024"; // дата не прошла - мое время 

    // определение разницы между дедлайном и текущей датой
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()); // кол-во миллисекунд в endtime - кол-во миллисекунд текущей даты
        let days;
        let hours;
        let minutes;
        let seconds;

        if (t <= 0) { // если дедлайн прошел, присвоиваем данным 0, чтобы при загрузке страницы не отображались отрицательные значения 
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / (1000 * 60)) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return { // функция возвращает обьект в котором на основе расчетов получены отдельные данные.
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    // подставляем 0 перед числом меньше 10 (8 => 08)
    function getZerro(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // функция установки таймера на странице
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector("#days");
        const hours = timer.querySelector("#hours");
        const minutes = timer.querySelector("#minutes");
        const seconds = timer.querySelector("#seconds");
        const timeInterval = setInterval(updateClock, 1000);

        updateClock(); //запускается тут, что бы не было скачков при перезагрузке страницы и она начинала действовать с момента загрузки

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZerro(t.days);
            hours.innerHTML = getZerro(t.hours);
            minutes.innerHTML = getZerro(t.minutes);
            seconds.innerHTML = getZerro(t.seconds);

            // останавливаем таймер
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }


    setClock(".timer", deadline);

    // модальное окно 
    const modalsBntOpen = document.querySelectorAll("[data-modal]");
    const modal = document.querySelector(".modal");
    // const modalsBntClose = document.querySelector("[data-close]");
    
    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = 'hidden'; // запрещаем прокрутку страницы при открытом модальном окне

        clearInterval(modalTimer); // если пользователь сам открыл модальное окно, удаляем автоматическое открытие 
    }

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = '';
    }

    modalsBntOpen.forEach(item => {
        item.addEventListener("click", openModal);
    });

    // т.к. дальше в коде мы создаем еще один крестик динамически, closeModal на нем не сработает 
    // modalsBntClose.addEventListener("click", closeModal); 

    // закрытие модального окна при клике на темную подложку + элемент с отрибутом "data-close" (наш крестик)
    modal.addEventListener("click", (e) => {
        // если мы кликаем на темную подложку или на элемент с отрибутом "data-close" (наш крестик)
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal();
        }
    });

    // закрытие модального окна при нажатии на Escape
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    // автоматическое открытие модального окна через заданное время
    const modalTimer = setTimeout(openModal, 50000);

    // автоматическое открытие модального окна когда пользователь долистал до конца сайта
    function showModalByScroll() {
        // количество пикселей, которые уже проскроллены + видимая часть сайта >= 
        // высоты содержимого элемента, включая содержимое, не видимое на экране из-за переполнения.
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll); // удаляем обработчик события после открытия окна, 
            // что бы открытие сработало один раз, а не каждый раз как пользователь долистывает до конца
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    // карточки меню через class
    class Card {
        constructor(img, alt, name, text, price) {
            this.img = img;
            this.alt = alt;
            this.name = name;
            this.text = text;
            this.price = price;
            this.transfer = 105;
            this.changeToRub();
        }

        changeToRub() {
            this.price = this.price * this.transfer;
        }

        renderCard() {
            const menu = document.querySelector(".menu__field .container");
            menu.innerHTML += `
                <div class="menu__item">
                    <img src="${this.img}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">Меню "${this.name}"</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
            `
        }
    }
    const vargyText = `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
    Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`;
    const eliteText = `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное 
    исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`;
    const postText = `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов
    животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков 
    за счет тофу и импортных вегетарианских стейков.`;

    // const vegy = new Card("img/tabs/vegy.jpg", "vegy", "Фитнес", vargyText, 2500);
    // const elite = new Card("img/tabs/elite.jpg", "elite", "Премиум", eliteText, 5500);
    // const post = new Card("img/tabs/post.jpg", "post", "Постное", postText, 4300);

    // vegy.renderCard();
    // elite.renderCard();
    // post.renderCard();

    new Card(
        "img/tabs/vegy.jpg", 
        "vegy", 
        "Фитнес", 
        vargyText, 
        20).renderCard();

    new Card(
        "img/tabs/elite.jpg", 
        "elite", 
        "Премиум", 
        eliteText, 
        50).renderCard();

    new Card(
        "img/tabs/post.jpg", 
        "post", 
        "Постное", 
        postText, 
        30).renderCard();

    // отправляем данные из формы обратной связи на сервер 
    const forms = document.querySelectorAll("form");

    // ответы для пользователя 
    const message = {
        loading: "./icons/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    // для всех форм обратной связи вызывем функцию postData
    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img"); // создаем img
            statusMessage.src = message.loading; // добавляем картинке атрибут с ссылкой на спиннер 
            // добавляем стили для картикни, но лучше делать это через добавление класса 
            statusMessage.style.cssText = ` 
                display: block;
                margin: 0 auto;
            `;
            // добавляем спиннер в форму 
            //form.append(statusMessage);
            form.insertAdjacentElement("afterend", statusMessage);

            // ==== заменяем на fetch ====
            // const request = new XMLHttpRequest();
            // request.open("POST", "server.php"); 
            //request.setRequestHeader("Content-type", "multipart/form-data"); // когда используем связку XMLHttpRequest() + FormData() нам не нужно устанавливать заголовок 
            //request.setRequestHeader("Content-type", "application/json"); // но если нам надо поменять формат данных и отправлят на сервер json прописываем "application/json"
            
            

            const formData = new FormData(form);

            // превращаем formData в json
            const obj = {}; // создаем пустой объект 
            formData.forEach((valye, key) => { // перебираем formData
                obj[key] = valye; // и помещаем все данные из formData в obj
            })

            // ==== заменяем на fetch ====
            //request.send(json); 

            fetch("server.php", {
                method: "POST",
                headers:  {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj) // конвертируем объект в json
            })
            .then(data => data.text())
            .then(data => { // data - то, что возвращает сервер
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove(); // удаляем сообщение 
            }).catch(() => {
                showThanksModal(message.failure)
            }).finally(() => {
                form.reset(); // очистка формы в любом случае
            });

            // ==== заменяем на fetch ====
            // request.addEventListener("load", () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset(); // очистка формы после успешной отправки
            //         statusMessage.remove(); // удаляем сообщение 
                    
            //     } else {
            //         showThanksModal(message.failure)
            //     }
            // })
        });
    }

    // функция для показа статуса отправки данных на сервер
    function showThanksModal(message){
        // работаем с уже существующим модальным окном 
        const modalContent = document.querySelector(".modal__dialog"); 
        // скрываем его содержимое 
        modalContent.classList.add("hide");
        openModal();

        // создаем новый див и добавляем в него нужную разметку 
        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        modal.append(thanksModal);

        // через 4 секунды удаляем созданный контент + возвращаем контент нашей изначальной формы + закрываем модальное окно
        setTimeout(() => {
            thanksModal.remove();
            modalContent.classList.add("show");
            modalContent.classList.remove("hide");
            closeModal();
        }, 4000);
    }


      
});