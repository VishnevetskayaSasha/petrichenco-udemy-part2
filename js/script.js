import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calc";
import forms from "./modules/forms";
import sloder from "./modules/slider";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", ()=>{
    // автоматическое открытие модального окна через заданное время
    const modalTimer = setTimeout(() => openModal(".modal", modalTimer), 50000);
    

    tabs(".tabheader__item", ".tabcontent",  ".tabheader__items", "tabheader__item_active");
    modal("[data-modal]", ".modal", modalTimer);
    timer(".timer", "December 31, 2024");
    cards();
    calc();
    forms("form", modalTimer);
    sloder({
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