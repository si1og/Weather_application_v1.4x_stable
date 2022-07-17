
const modal_menu_button = document.querySelectorAll(".header-main-menu__button");
const page_modal = document.querySelector(".page-modal");
const page_blur = document.querySelector(".page-blur");
const page_modal_settings = document.querySelector(".page-modal-settings");
const burger_ = document.querySelector(".header-menu-burger");
const header_function_menu_ = document.querySelector(".header-content__function-menu");
const main_menu_remove_ = document.querySelector(".main-menu-remove");
const page_modal_favorite_towns = document.querySelector(".page-modal-favorite-towns");
const page_modal_latest_towns = document.querySelector(".page-modal-latest-towns");
const main_content_elements = document.querySelectorAll(".header, .main, .footer");
const header_main_menu = document.querySelector(".header-main-menu");

var modal_close_buttons = document.querySelectorAll(".modal-close-button");
var page_modal_blocks = document.querySelectorAll(".page-modal-block");

let resise_modificator = true;

modal_close_buttons.forEach(element => {
    element.addEventListener("click", () => {
        remove_modal();
    });
});

page_blur.addEventListener("click", () => {
    remove_modal();
});

burger.addEventListener("click", () => {
    if (window.innerWidth <= 768 && !burger.classList.contains("active")) {
        setTimeout(() => {
            document.body.style = "overflow: hidden; height: 100vh;";
        }, 200);
    } else if (burger.classList.contains("active")) {
        setTimeout(() => {
            document.body.style = "";
        }, 200);
        main_content_elements.forEach(element => {
            element.classList.remove("main-disactive");
        });
    }

    if (burger.classList.contains("active")) {
        remove_main_disactive();
        disactive_menu();
    } else {
        main_content_elements.forEach(element => {
            element.classList.add("main-disactive");
        });
        document.body.style = "overflow: hidden; height: 100vh;";

        resise_modificator = false;

        calc_transform(burger_position());
        burger.classList.add("active");
        header_function_menu.classList.add("menu-active");
        main_menu_remove.classList.remove("menu-disactive");
        header_main_menu.classList.remove("disactive");

        setTimeout(() => {
            header_main_menu.classList.add("active");
        }, 10);
    }
});

main_menu_remove.addEventListener("click", () => {
    remove_main_disactive();
    disactive_menu();
});

window.addEventListener('resize', () => {
    if (resise_modificator) {
        burger.style = `left: ${burger_position()}px`;
    } else {
        calc_transform(burger_position());
    }
});

window.addEventListener("load", () => {
    burger.style = `left: ${burger_position()}px`;
});

modal_menu_button.forEach(element => {
    element.addEventListener("click", () => {
        page_modal.classList.remove("disactive");
        menu_event_add(element);
        setTimeout(() => {
            disactive_menu();
        }, 200);
        document.body.style = "overflow: hidden;";
    });
});

const remove_main_disactive = () => {
    main_content_elements.forEach(element => {
        element.classList.remove("main-disactive");
    });   
}

const calc_transform = (pos) => {
    const main = document.querySelector(".main");

    const conteiner = main.offsetWidth;
    const win_width = window.innerWidth;
    const burger_width = burger.offsetWidth;
    const position_on_menu = (win_width - conteiner) / 2;
    const menu_right = 185;

    burger.style = `left: ${pos}px; transform: translateX(${win_width - conteiner - burger_width - position_on_menu - menu_right}px)`;
}

const burger_position = () => {
    const main = document.querySelector(".main");

    const burger_width = burger.offsetWidth;
    const win_width = window.innerWidth;
    const padding = 20;
    const conteiner = main.offsetWidth;

    const pos = win_width - padding - burger_width - ((win_width - conteiner) / 2);
    return pos;
}

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
    }, 190);
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
    const header_main_menu = document.querySelector(".header-main-menu");

    resise_modificator = true;

    burger_.classList.remove("active");
    header_function_menu_.classList.remove("menu-active");
    main_menu_remove_.classList.add("menu-disactive");

    burger.style = `left: ${burger_position()}px`;

    setTimeout(() => {
        header_main_menu.classList.remove("active");
    }, 50);

    setTimeout(() => {
        header_main_menu.classList.add("disactive");
    }, 300);
}