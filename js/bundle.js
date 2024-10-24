/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector(".calculating__result span");

    let sex, height, weight, age, ratio; 

    // если в localStorage уже указан (сохранен) пол, записываем это значение в переменную sex
    if(localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else { // если в localStorage еще не указан (не сохранен) пол, записываем значение поумолчанию female в переменную sex
        sex = "female"
        // и записываем в localStorage пол -- female
        localStorage.setItem("sex", "female");
    }

    if(localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375
        localStorage.setItem("ratio", 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        // перебираем все элементы 
        elements.forEach(elem => {
            // удаляем у всех класс активности
            elem.classList.remove(activeClass);
            // если id элемента совпадает со значением sex в localStorage
            if(elem.getAttribute("id") === localStorage.getItem("sex")) {
                // добавляем этому элементу клас активности
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

    function calcTotal() {
        // если не выбрано хоть одно из полей, код дальше не пойдет
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = "______";
            return;
        }
        // формула из инет для женщин и мудчин
        if(sex ==="female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    // получаем данные статичных блоков 
    function getStaticInformation(selector,  activeClass) {
        const elements = document.querySelectorAll(`${selector}`);

        elements.forEach(elem => {
            elem.addEventListener("click", (e) => {
                if(e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                    // записываем значение в localStorage
                    localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id"));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                // добавляем класс активности элементу, на котором сработал клик
                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    // так как у нас 2 родительских элемента, вызываем функцию для каждого 
    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

    // получаем данные динамических элементов 
    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {
            if(input.value.match(/\D/g)) { // не число
                input.style.border = "1px solid red"; // типа ошибка
            } else {
                input.style.border = "none";
            }
            switch(input.getAttribute("id")) {
                case "height": 
                    height = +input.value;
                    break;
                case "weight": 
                    weight = +input.value;
                    break;
                case "age": 
                    age = +input.value;
                    break;
            } 
            calcTotal();
        }); 
    }

    // вызываем ыункцию для каждого из селекторов
    getDinamicInformation("#height");
    getDinamicInformation("#weight");
    getDinamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
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
                    <h3 class="menu__item-subtitle">${this.name}</h3>
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

    /* заменяем ручной ввод на запрос данных с сервера 
    const vargyText = `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
    Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`;
    const eliteText = `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное 
    исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`;
    const postText = `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов
    животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков 
    за счет тофу и импортных вегетарианских стейков.`; */ 

   /* === Тоже самое что и код ниже, но длинне ===
    const vegy = new Card("img/tabs/vegy.jpg", "vegy", "Фитнес", vargyText, 2500);
    const elite = new Card("img/tabs/elite.jpg", "elite", "Премиум", eliteText, 5500);
    const post = new Card("img/tabs/post.jpg", "post", "Постное", postText, 4300);

    vegy.renderCard();
    elite.renderCard();
    post.renderCard(); */

    /* заменяем ручной ввод атрибутов на запрос данных с сервера 
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
        30).renderCard(); */ 

    // обрахаемся к серверу и получаем данные массива меню
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu")
        .then(data => {
            // перебираем все объекты в массиве меню
            data.forEach(({img, altimg, title, descr, price}) => {
                // через renderCard создаем карточки 
                new Card(img, altimg, title, descr, price).renderCard();
            });
        });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



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
            ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimer);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
        }, 4000);
    }

    // запрос через json-server
    fetch("http://localhost:3000/menu")
        .then(data => data.json())
        .then(res => console.log(res))
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");

function slider({container, slide, rowNext, rowPrev, totalCounter, currentCounter, wrapper, field}){
    const sliderContent = document.querySelector(container);
    const slider = sliderContent.querySelector(wrapper);
    const sliderInner = slider.querySelector(field);
    const width = window.getComputedStyle(slider).width; // ширина 1 слайда
    const sliderItem = slider.querySelectorAll(slide);
    const rowRight = sliderContent.querySelector(rowNext);
    const rowLeft = sliderContent.querySelector(rowPrev);
    const currentNumber = sliderContent.querySelector(currentCounter);
    const totalNumber = sliderContent.querySelector(totalCounter);

/* === простой слайдер === 
    sliderItem.forEach((item) => {
        item.classList.add("hide")
    })

    let index = 0;
    totalNumber.innerHTML = getZerro(sliderItem.length);

    function sliderShowImg(index) {
        sliderItem[index].classList.remove("hide");
        sliderItem[index].classList.add("show");
        currentNumber.innerHTML = getZerro(index + 1);
    }

    sliderShowImg(index);

    function sliderHideImg(index) {
        sliderItem[index].classList.remove("show");
        sliderItem[index].classList.add("hide");
    }

    rowRight.addEventListener("click", () => {
        sliderHideImg(index);
        index += 1;
        if(index > sliderItem.length - 1) {
            index = 0;
        }
        sliderShowImg(index);
    })

    rowLeft.addEventListener("click", () => {
        sliderHideImg(index);
        index -= 1;
        if(index < 0) {
            index = sliderItem.length - 1;
        }
        sliderShowImg(index);
    }) */ 
    

    // кол-во слайдов * 100% -- получаем ширину, в которую поместятся все слайды 
    sliderInner.style.width = 100 * sliderItem.length + "%";
    sliderInner.style.display = "flex";
    sliderInner.style.transition = "0.5s all";
    // скрываем переполнение слайдера, чтобы видно было только один слайд 
    slider.style.overflow = "hidden";
    // устанавливаем всем слайдам одинаковую ширину 
    sliderItem.forEach(item => item.style.width = width);

    sliderContent.style.position = "relative";

    // создаем блок с точками-индикаторами
    const indicator = document.createElement("ol");
    const dots = [];

    indicator.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    sliderContent.append(indicator);

    for (let i = 0; i < sliderItem.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if( i == 0) {
            dot.style.opacity = 1; 
        }

        indicator.append(dot);
        dots.push(dot);
    }

    let index = 0;
    let offset = 0; // сюда будем записывать на сколько мы передвинулись по слайдеру  

    totalNumber.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZerro)(sliderItem.length);
    currentNumber.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZerro)(index + 1);

    rowRight.addEventListener("click", () => {
        if (offset == Number.parseInt(width, 10) * (sliderItem.length - 1)) {
            offset = 0;
        } else {
            offset += Number.parseInt(width, 10);
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;
        
        if(index == sliderItem.length - 1) {
            index = 0;
        } else {
            index += 1;
        }

        currentNumber.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZerro)(index + 1);
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[index].style.opacity = 1;
    });

    rowLeft.addEventListener("click", () => {
        if (offset == 0) {
            offset = Number.parseInt(width, 10) * (sliderItem.length - 1);
        } else {
            offset -= Number.parseInt(width, 10);
        }
        sliderInner.style.transform = `translateX(-${offset}px)`

        if(index <= 0) {
            index = sliderItem.length - 1;
        } else {
            index -= 1;
        }

        currentNumber.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZerro)(index + 1);
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[index].style.opacity = 1;
    });

    dots.forEach(item => {
        item.addEventListener("click", (e) => {
            const slideTo = +e.target.getAttribute("data-slide-to");
            index = slideTo;
            offset = Number.parseInt(width, 10) * (slideTo);

            sliderInner.style.transform = `translateX(-${offset}px)`;

            currentNumber.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZerro)(index + 1);

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[index].style.opacity = 1;

        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabsParent = document.querySelector(tabsParentSelector);
    const tabs = tabsParent.querySelectorAll(tabsSelector); 
    const tabsContent = document.querySelectorAll(tabsContentSelector);

    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.remove("show", "fade");
            item.classList.add("hide");
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    hideTabsContent();

    function showTabsContent (i = 0) {
        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("show", "fade");
        tabs[i].classList.add(activeClass);
    }

    showTabsContent();

    tabsParent.addEventListener("click", (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) { // если эвент совпал с элементом
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getZerro: () => (/* binding */ getZerro)
/* harmony export */ });
   // подставляем 0 перед числом меньше 10 (8 => 08)
function getZerro(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}
function timer(id, deadline) {
    // deadline переносим в script.js в вызов timer()
    //const deadline = "2024-12-31"; // дата не прошла - время по Гринвичу 
   //const deadline = "2024-10-01"; // дата прошла - время по Гринвичу 
   //const deadline = "December 31, 2024"; // дата не прошла - мое время 

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

   setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
// гибкая настройка запроса на сервер (не привязываемся к url)
const postData = async (url, data) => { // async -- указывает, что внутри функции будет асинхронный  код
    const result = await fetch(url, { // await -- пара для async  -- скрипт пойдет работать дальше только после выполнения запроса с await
        method: "POST",
        headers:  {
            "Content-type": "application/json"
        },
        body: data
    });
    return await result.json() // возвращаем промис в json формате
}

// гибкая настройка запроса данных с сервер (не привязываемся к url)
const getResource = async (url) => { // async -- указывает, что внутри функции будет асинхронный  код
    const result = await fetch(url); // await -- пара для async  -- скрипт пойдет работать дальше только после выполнения запроса с await  
    // если fetch столкнется с ошибкой HTTP запроса (404, 500, 502...) он не выдаст catch
    // поэтому такие ошибки мы обрабатываем вручную
    if(!result.ok) {
        throw new Error(`Не получается произвести fetch ${url}, status: ${res.status}`); 
    }
    
    return await result.json(); // возвращаем промис в json формате
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener("DOMContentLoaded", ()=>{
    // автоматическое открытие модального окна через заданное время
    const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", modalTimer), 50000);
    

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent",  ".tabheader__items", "tabheader__item_active");
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimer);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "December 31, 2024");
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimer);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: ".offer__slider",
        rowNext: ".offer__slider-next",
        rowPrev: ".offer__slider-prev",
        slide: ".offer__slide",
        totalCounter: "#total",
        currentCounter: "#current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });

    

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map