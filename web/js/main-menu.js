
const modal_menu_button = document.querySelectorAll(".header-main-menu__button");
const page_modal = document.querySelector(".page-modal");
const page_blur = document.querySelector(".page-blur");
const page_modal_settings = document.querySelector(".page-modal-settings");
const burger_ = document.querySelector(".header-menu-burger");
const header_function_menu_ = document.querySelector(".header-content__function-menu");
const main_menu_remove_ = document.querySelector(".main-menu-remove");
var modal_close_buttons = document.querySelectorAll(".modal-close-button");

modal_close_buttons.forEach(element => {
    element.addEventListener("click", function() {
        remove_modal();
    });
});

page_blur.addEventListener("click", function() {
    remove_modal();
});

modal_menu_button.forEach(element => {
    element.addEventListener("click", function() {
        page_modal.classList.remove("disactive");
        menu_event_add(element);

        disactive_menu();
    });
});

function remove_modal() {
    page_modal.classList.add("remove-animation");
    page_modal_settings.classList.add("remove-animation");
    setTimeout(function() {
        page_modal.classList.remove("remove-animation");
        page_modal_settings.classList.remove("remove-animation");
        page_modal.classList.add("disactive");
        page_modal_settings.classList.add("disactive");
    }, 200);
}

function menu_event_add(element) {
    if (element.classList.contains("settings-button-atr")) {
        page_modal_settings.classList.remove("disactive");
    }
}

function disactive_menu() {
    burger_.classList.remove("active");
    header_function_menu_.classList.remove("menu-active");
    main_menu_remove_.classList.add("disactive");
}