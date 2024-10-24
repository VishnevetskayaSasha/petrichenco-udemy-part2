import { getResource } from "../services/services";
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
    getResource("http://localhost:3000/menu")
        .then(data => {
            // перебираем все объекты в массиве меню
            data.forEach(({img, altimg, title, descr, price}) => {
                // через renderCard создаем карточки 
                new Card(img, altimg, title, descr, price).renderCard();
            });
        });

}

export default cards;