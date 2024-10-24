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

export default calc;