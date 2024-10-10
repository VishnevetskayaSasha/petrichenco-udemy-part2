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
    const modalsBntClose = document.querySelector("[data-close]");
    
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

    modalsBntClose.addEventListener("click", closeModal);

    // закрытие модального окна при клике на темную подложку
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
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
    const modalTimer = setTimeout(openModal, 5000);

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

})