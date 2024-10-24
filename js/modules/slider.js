import { getZerro } from "./timer";
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

    totalNumber.innerHTML = getZerro(sliderItem.length);
    currentNumber.innerHTML = getZerro(index + 1);

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

        currentNumber.innerHTML = getZerro(index + 1);
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

        currentNumber.innerHTML = getZerro(index + 1);
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[index].style.opacity = 1;
    });

    dots.forEach(item => {
        item.addEventListener("click", (e) => {
            const slideTo = +e.target.getAttribute("data-slide-to");
            index = slideTo;
            offset = Number.parseInt(width, 10) * (slideTo);

            sliderInner.style.transform = `translateX(-${offset}px)`;

            currentNumber.innerHTML = getZerro(index + 1);

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[index].style.opacity = 1;

        });
    });
}

export default slider;