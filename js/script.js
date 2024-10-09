window.addEventListener("DOMContentLoaded", ()=>{

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

    hideTabsContent()

    function showTabsContent (i = 0) {
        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("show", "fade");
        tabs[i].classList.add("tabheader__item_active");
    }

    showTabsContent()

    tabsParent.addEventListener("click", (e) => {
        const target = e.target;
        if( target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabsContent()
                    showTabsContent(i)
                }
            })
        }
    })















})