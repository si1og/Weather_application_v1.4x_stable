
const modal_menu_button = document.querySelectorAll(".main-menu__button");
const page_modal = document.querySelector(".page-modal");
const page_blur = document.querySelector(".page-blur");
const page_modal_settings = document.querySelector(".page-modal-settings");
const header_function_menu_ = document.querySelector(".header-content__function-menu");
const main_menu_remove_ = document.querySelector(".main-menu-remove");
const page_modal_favorite_towns = document.querySelector(".page-modal-favorite-towns");
const page_modal_latest_towns = document.querySelector(".page-modal-latest-towns");
const main_content_elements = document.querySelectorAll(".header, .main, .footer");
const header_main_menu = document.querySelector(".main-menu");

var modal_close_buttons = document.querySelectorAll(".modal-close-button");
var page_modal_blocks = document.querySelectorAll(".page-modal-block");

let resise_modificator = true;

page_blur.addEventListener("click", () => {
    remove_modal();
});

burger.addEventListener("click", () => {
    if (window.innerWidth <= 768 && !burger.classList.contains("active")) {
        setTimeout(() => {
            document.body.style = "overflow: hidden; height: 100vh;";
        }, 300);
    } else if (burger.classList.contains("active")) {
        main_content_elements.forEach(element => {
            element.classList.remove("main-disactive");
        });
    }

    if (burger.classList.contains("arrow")) {
        remove_modal("back_main");
        active_menu();
        burger.classList.add("active");
        burger.classList.remove("arrow");
    } else if (burger.classList.contains("active")) {
        remove_main_disactive();
        disactive_menu();
    } else {
        active_menu();
    }
});

window.addEventListener('resize', () => {
    if (resise_modificator) {
        burger.style = `left: ${burger_position()}px`;
    } else {
        calc_transform(burger_position());
    }
});

window.addEventListener("load", () => {
    burger.classList.remove("disactive");
    burger.style = `left: ${burger_position()}px`;
});

main_menu_remove.addEventListener("click", () => {
    remove_main_disactive();
    disactive_menu();
});

modal_menu_button.forEach(element => {
    element.addEventListener("click", () => {
        if (!element.classList.contains("triger-button")) {
            page_modal.classList.remove("disactive");
            menu_event_add(element);
            active_menu_block();
            document.body.style = "overflow: hidden;";
        }
    });
});

const activate_main_menu = () => {
    main_content_elements.forEach(element => {
        element.classList.add("main-disactive-menu-acitve");
    });      
}

const disactive_main_menu = () => {
    main_content_elements.forEach(element => {
        element.classList.remove("main-disactive-menu-acitve");
    });     
}

const remove_main_disactive = () => {
    main_content_elements.forEach(element => {
        element.classList.remove("main-disactive");
    });
}

const active_menu = () => {
    main_content_elements.forEach(element => {
        element.classList.add("main-disactive");
    });
    document.body.style = "overflow: hidden; height: 100vh;";

    resise_modificator = false;

    calc_transform(burger_position());
    burger.classList.add("active");
    header_function_menu.classList.add("menu-active");
    main_menu_remove.classList.remove("menu-disactive");

    setTimeout(() => {
        header_main_menu.classList.add("active");
    }, 10);
}

const calc_transform = (pos, mode="default") => {
    const main = document.querySelector(".main");

    const conteiner = main.offsetWidth;
    const win_width = window.innerWidth;
    const burgerwidth = burger.offsetWidth;
    const position_on_menu = (win_width - conteiner) / 2;

    if (window.innerWidth > 768 && mode == "default") {
        const menu_right = 190;
        burger.style = `left: ${pos}px; transform: translateX(${win_width - conteiner - burgerwidth - position_on_menu - menu_right}px)`;
    } else if (window.innerWidth > 768 && mode == "not_default") {
        const menu_right = 387;
        burger.style = `left: ${pos}px; transform: translateX(${win_width - conteiner - burgerwidth - position_on_menu - menu_right}px)`;
    } else {
        burger.style = `left: ${pos}px;`;
    }
}

const burger_position = () => {
    const main = document.querySelector(".main");

    const burgerwidth = burger.offsetWidth;
    const win_width = window.innerWidth;
    const padding = 20;
    const conteiner = main.offsetWidth;

    const pos = win_width - padding - burgerwidth - (win_width - conteiner) / 2;
    return pos;
}

function remove_modal(mode="default") {
    page_modal.classList.add("remove-animation");
    if (mode == "default") {
        page_modal_blocks.forEach(element => {
            element.classList.add("remove-animation");
        });
    } else if (mode == "back_main") {
        page_modal_blocks.forEach(element => {
            element.classList.add("back-main-animation");
        });
        setTimeout(() => {
            page_modal_blocks.forEach(element => {
                element.classList.remove("back-main-animation");
            });
        }, 300);
    }
    disactive_main_menu();

    setTimeout(() => {
        header_main_menu.classList.remove("active");
    }, 5);

    burger.classList.remove("active");
    burger.classList.remove("arrow");

    burger.style = `left: ${burger_position()}px;`;

    setTimeout(function() {
        page_modal.classList.remove("remove-animation");
        page_modal.classList.add("disactive");
        page_modal_blocks.forEach(element => {
            element.classList.remove("remove-animation");
            element.classList.add("disactive");
        });
    }, 300);
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

const active_menu_block = () => {
    const header_main_menu = document.querySelector(".main-menu");

    resise_modificator = false;

    main_menu_remove_.classList.add("menu-disactive");

    calc_transform(burger_position(), "not_default");
    activate_main_menu();

    burger.classList.remove("active");
    burger.classList.add("arrow");

    main_content_elements.forEach(element => {
        element.classList.remove("main-disactive");
    });
}

function disactive_menu() {
    const header_main_menu = document.querySelector(".main-menu");

    resise_modificator = true;

    burger.classList.remove("active");
    burger.classList.remove("arrow");
    header_function_menu_.classList.remove("menu-active");
    main_menu_remove_.classList.add("menu-disactive");

    burger.style = `left: ${burger_position()}px`;

    main_content_elements.forEach(element => {
        element.classList.remove("main-disactive");
    });

    setTimeout(() => {
        document.body.style = "";
    });

    setTimeout(() => {
        header_main_menu.classList.remove("active");
    }, 5);
}