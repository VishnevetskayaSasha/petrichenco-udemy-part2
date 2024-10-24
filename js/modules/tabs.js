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

export default tabs;