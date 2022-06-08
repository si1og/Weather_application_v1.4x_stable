
const modal_menu_button = document.querySelectorAll(".header-main-menu__button");
const page_modal = document.querySelector(".page-modal");
const page_blur = document.querySelector(".page-blur");
const page_modal_settings = document.querySelector(".page-modal-settings");
const burger_ = document.querySelector(".header-menu-burger");
const header_function_menu_ = document.querySelector(".header-content__function-menu");
const main_menu_remove_ = document.querySelector(".main-menu-remove");
const page_modal_favorite_towns = document.querySelector(".page-modal-favorite-towns");
const page_modal_latest_towns = document.querySelector(".page-modal-latest-towns");

var modal_close_buttons = document.querySelectorAll(".modal-close-button");
var page_modal_blocks = document.querySelectorAll(".page-modal-block");

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
        document.body.style = "overflow: hidden;";
    });
});

function remove_modal() {
    page_modal.classList.add("remove-animation");
    page_modal_blocks.forEach(element => {
        element.classList.add("remove-animation");
    });

    setTimeout(function() {
        page_modal.classList.remove("remove-animation");
        page_modal.classList.add("disactive");
        page_modal_blocks.forEach(element => {
            element.classList.remove("remove-animation");
            element.classList.add("disactive");
        });
    }, 200);
    document.body.style = "";
}

function menu_event_add(element) {
    if (element.classList.contains("settings-button-atr")) {
        page_modal_settings.classList.remove("disactive");
    } 
    if (element.classList.contains("favorite-towns-button-atr")) {
        page_modal_favorite_towns.classList.remove("disactive");
    }
    if (element.classList.contains("latest-towns-button-atr")) {
        page_modal_latest_towns.classList.remove("disactive");
    }
}

function disactive_menu() {
    burger_.classList.remove("active");
    header_function_menu_.classList.remove("menu-active");
    main_menu_remove_.classList.add("disactive");
}