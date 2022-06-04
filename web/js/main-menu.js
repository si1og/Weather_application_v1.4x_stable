
const modal_menu_button = document.querySelectorAll(".header-main-menu__button");
const page_modal = document.querySelector(".page-madal");
const page_modal_settings = document.querySelector(".page-madal-settings");

page_modal.addEventListener("click", function() {
    page_modal.classList.add("remove-animation");
    page_modal_settings.classList.add("remove-animation");
    setTimeout(function() {
        page_modal.classList.remove("remove-animation");
        page_modal_settings.classList.remove("remove-animation");
        page_modal.classList.add("disactive");
        page_modal_settings.classList.add("disactive");
    }, 200);

});

modal_menu_button.forEach(element => {
    element.addEventListener("click", function() {
        page_modal.classList.remove("disactive");
        menu_event_add(element);
    });
});

function menu_event_add(element) {
    if (element.classList.contains("settings-button-atr")) {
        page_modal_settings.classList.remove("disactive");
    }
}