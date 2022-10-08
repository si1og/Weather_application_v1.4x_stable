
const modal_menu_button = document.querySelectorAll(".main-menu__button");
const page_modal = document.querySelector(".page-modal");
const page_blur = document.querySelector(".page-blur");
const header_function_menu_ = document.querySelector(".header-content__function-menu");
const main_menu_remove_ = document.querySelector(".main-menu-remove");
const page_modal_favorite_towns = document.querySelector(".page-modal-favorite-towns");
const page_modal_latest_towns = document.querySelector(".page-modal-latest-towns");
const main_content_elements = document.querySelectorAll(".header, .main, .footer");
const header_main_menu = document.querySelector(".main-menu");
const page_modal_content = document.querySelectorAll(".page-modal-info-content, .page-modal-settings-content");
const favorite_towns_add_towns = document.querySelector(".favorite-towns-add-towns");
const favorite_towns_add_towns_input = document.querySelector(".favorite-towns-add-towns__input");
const favorite_towns_add_towns_button = document.querySelector(".favorite-towns-add-towns__button");
const favorite_towns_no_towns = document.querySelector(".favorite-towns-no-towns");
const favorite_towns = document.querySelector(".favorite-towns");
const add_town_button_focus = document.querySelector(".favorite-towns__add-button");
const add_button_towns = document.querySelector(".favorite-towns-add-towns__button");

var modal_close_buttons = document.querySelectorAll(".modal-close-button");
var page_modal_blocks = document.querySelectorAll(".page-modal-block");

sessionStorage.setItem("resize-menu", JSON.stringify(false));

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

addEventListener('resize', () => {

    const menu_resize = JSON.parse(sessionStorage.getItem("resize-menu"));

    switch (menu_resize) {
        case "menu":
            calc_transform(burger_position());
            break;
        case "menu-block":
            calc_transform(burger_position(), "not_default");
            break;
        default: 
            burger.style = `left: ${burger_position()}px`;
            break;
    }
});

addEventListener("load", () => {
    burger.classList.remove("disactive");
    burger.style = `left: ${burger_position()}px`;

    create_favorite_towns();
    favorite_towns_event();
});

main_menu_remove.addEventListener("click", () => {
    remove_main_disactive();
    disactive_menu();
});


let main_menu_ = document.querySelector(".main-menu");
main_menu_.addEventListener("click", (event) => {main_menu_event(event)})

function main_menu_event(event) {
    let target = event.target;

    if (target.classList.contains("main-menu__button") && !target.classList.contains("triger-button")) {
        page_modal.classList.remove("disactive");
        menu_event_add(target);
        active_menu_block();
        document.body.style = "overflow: hidden;";
    }
} 

page_modal_content.forEach(element => {
    element.addEventListener("scroll", () => {
        const prev_element = element.previousElementSibling;

        if (element.scrollTop > 5) {
            prev_element.classList.add("scrolled");
        } else {
            prev_element.classList.remove("scrolled");
        }
    });
});

favorite_towns_add_towns_input.addEventListener("input", () => {
    button_add();
});

favorite_towns_add_towns_input.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) {
        add_town_event();
    }
});

favorite_towns_add_towns_input.addEventListener("focus", () => {
    button_add();
});

favorite_towns_add_towns_input.addEventListener("blur", () => {
    favorite_towns_add_towns.classList.remove("active");
});

add_town_button_focus.addEventListener("click", () => {
    favorite_towns_add_towns_input.focus();
});

add_button_towns.addEventListener("mousedown", () => {
    add_town_event();
});

function add_town_event() {
    let favorite_towns_arr = JSON.parse(localStorage.getItem("favorite-towns"));
    
    if (is_new(favorite_towns_arr, favorite_towns_add_towns_input.value) && isNaN(favorite_towns_add_towns_input.value)) {
        let loading = setTimeout(() => {
            favorite_towns_add_towns.classList.add("loading");
        }, 200);
    
        sessionStorage.setItem("loading-t", JSON.stringify(loading));
    
        add_town(favorite_towns_add_towns_input.value);
    }
}

function button_add() {
    let value = favorite_towns_add_towns_input.value;
    let favorite_towns_arr = JSON.parse(localStorage.getItem("favorite-towns"));

    if (value.length >= 1 && is_new(favorite_towns_arr, value)) {
        favorite_towns_add_towns.classList.add("active");
    } else {
        favorite_towns_add_towns.classList.remove("active");
    }
}

function create_favorite_towns() {
    let favorite_towns_arr = JSON.parse(localStorage.getItem("favorite-towns"));

    if (isNaN(favorite_towns_arr)) {
        favorite_towns_no_towns.classList.add("disactive");

        favorite_towns_arr.forEach(element => {
            create_favorite_town(element.name, element.lat, element.lon);
        });
    }
}

function favorite_town_menu_event(element) {
    element.addEventListener("focusout", () => {
        remove_info_menu();
    });

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        element.addEventListener("focus", () => {
            _event_town_menu(element);
        }); 
        return;
    }

    element.addEventListener("mousedown", () => {
        _event_town_menu(element);
    }); 
}

function _event_town_menu(element) {
    sessionStorage.setItem("is-search", true);
    let delay = setTimeout(() => {
        info_menu_add(element);
        sessionStorage.setItem("is-search", false);
    }, 300);
    sessionStorage.setItem("favotite-towns-delay-id", JSON.stringify(delay));
}

function favorite_towns_event() {
    let favorite_towns_ = document.querySelector(".favorite-towns");
    sessionStorage.setItem("is-search", true);

    favorite_towns_.addEventListener("click", (event) => {
        let delay = JSON.parse(sessionStorage.getItem("favotite-towns-delay-id"));
        let is_serch = JSON.parse(sessionStorage.getItem("is-search"));
        if (is_serch) {
            clearTimeout(delay);
            towns_event_click(event);
        }
    });   
}

function info_menu_add(e) {
    let favorite_towns = document.querySelector('.favorite-towns');
    let margin = 12;
    let page_padding = 15;

    let rect_element = e.getBoundingClientRect();
    let rect_favotite_towns = favorite_towns.getBoundingClientRect();
    let menu_top = rect_element.top - rect_favotite_towns.top + rect_element.height + margin - 3;

    let menu_left = rect_element.left - rect_favotite_towns.left;
    let conteiner_height = rect_favotite_towns.height;

    let info_menu = document.createElement("div");
    info_menu.className = "info-menu";
    info_menu.innerHTML = `
    <button class="info-menu__button" id="info-del-button">Удалить</button>
    <button class="info-menu__button" id="info-search-button">Поиск</button>
    `
    
    favorite_towns.appendChild(info_menu);
    
    let info_menu_height = info_menu.clientHeight;
    let menu_bottom = rect_element.top - rect_favotite_towns.top - margin + 2 - info_menu_height;

    if (conteiner_height - (menu_top + info_menu_height) >= page_padding) {
        info_menu.style = `top: ${menu_top}px; left: ${menu_left}px`;
        info_menu.classList.add("top");
    } else if (menu_bottom > 0) {
        info_menu.style = `top: ${menu_bottom}px; left: ${menu_left}px`;
        info_menu.classList.add("bottom");
    } else {
        info_menu.remove();
    }

    info_menu.addEventListener("mousedown", (event) => {
        let target = event.target;

        if (target.id == "info-del-button") {
            e.remove();
            let favorite_towns = JSON.parse(localStorage.getItem("favorite-towns"));
            if (favorite_towns.length == 1) {
                setTimeout(() => {
                    favorite_towns_no_towns.classList.remove("disactive");
                    favorite_towns_no_towns.classList.add("add-animation");
                }, 200);
            }
            for (let i = 0; i < favorite_towns.length; i++) {
                if (favorite_towns[i]["name"] == e.value) {
                    favorite_towns.splice(i, 1);
                }
            }
            localStorage.setItem("favorite-towns", JSON.stringify(favorite_towns));
        } else if (target.id == "info-search-button") {
            update_page();
            display_weather(e.value);
            remove_modal();
        }
    });
} 

function remove_info_menu() {
    let elements = document.querySelectorAll(".info-menu");

    if (!isNaN(elements)) {
        return;
    }

    elements.forEach(element => {
        if (element.classList.contains("top")) {
            element.classList.add("remove-top");
        } else {
            element.classList.add("remove-bottom");
        }
        setTimeout(() => {
            element.remove();
        }, 190);
    });
}

function towns_event_click(event) {
    let target = event.target;

    if (target.classList.contains("favorite-town")) {
        update_page();
        display_weather(target.value);
        remove_modal();
    }
}

function add_town(place) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${place}&appid=${key}&lang=ru&cnt=1`)  
    .then((resp) => { return resp.json() })
    .then((data) => {

        if (data.cod == 404) {
            let loading = JSON.parse(sessionStorage.getItem("loading-t"));

            clearTimeout(loading);
            favorite_towns_add_towns.classList.remove("loading"); 
            return;
        }

        let favorite_towns_arr = JSON.parse(localStorage.getItem("favorite-towns"));

        if (isNaN(favorite_towns_arr)) {

            create_favorite_town(place, data.city.coord.lat, data.city.coord.lon);

            favorite_towns_arr.push({name: place, lat: Math.round(data.city.coord.lat), lon: Math.round(data.city.coord.lon)})
            localStorage.setItem("favorite-towns", JSON.stringify(favorite_towns_arr));
        } else {
            favorite_towns_no_towns.classList.add('remove-animation');

            setTimeout(() => {
                favorite_towns_no_towns.classList.remove('remove-animation');
                favorite_towns_no_towns.classList.add('disactive');
                create_favorite_town(place, data.city.coord.lat, data.city.coord.lon);
            }, 200);

            localStorage.setItem("favorite-towns", JSON.stringify([{
                name: place, 
                lat: Math.round(data.city.coord.lat), 
                lon: Math.round(data.city.coord.lon)
            }]));
        }
    });
}

function is_new(arr, place) {
    if (!arr) {
        return true;
    }

    place = place.toLowerCase();

    let is_ret = true;

    arr.forEach(element => {
        let town = element.name.toLowerCase();

        if (town == place) {
            is_ret = false;
        }
    });

    return is_ret;
}

function create_favorite_town(place, lat, lon) {
    let town = document.createElement("button");
    town.classList.add("favorite-town");
    town.value = place;
    town.innerHTML = `
        <span class="favorite-town__name">${place}</span>
        <span class="favorite-town__coords">${Math.round(lat)}° / ${Math.round(lon)}°</span>
    `;

    favorite_towns.appendChild(town);
    favorite_town_menu_event(town);

    let loading = JSON.parse(sessionStorage.getItem("loading-t"));

    clearTimeout(loading);
    favorite_towns_add_towns.classList.remove("loading", "active");
}

let activate_main_menu = () => {
    const settings = JSON.parse(localStorage.getItem("document-settings"));

    if (!settings["menu-animation"]) {
        main_content_elements.forEach(element => {
            element.classList.add("main-disactive-menu-acitve");
        }); 
    }
}

let disactive_main_menu = () => {
    main_content_elements.forEach(element => {
        element.classList.remove("main-disactive-menu-acitve");
    });     
}

let remove_main_disactive = () => {
    main_content_elements.forEach(element => {
        element.classList.remove("main-disactive");
    });
}

let active_menu = () => {
    const settings = JSON.parse(localStorage.getItem("document-settings"));

    if (!settings["menu-animation"]) {
        main_content_elements.forEach(element => {
            element.classList.add("main-disactive");
        });
    }

    document.body.style = "overflow: hidden; height: 100vh;";

    sessionStorage.setItem("resize-menu", JSON.stringify("menu"));

    calc_transform(burger_position());
    burger.classList.add("active");
    header_function_menu.classList.add("menu-active");
    main_menu_remove.classList.remove("menu-disactive");

    setTimeout(() => {
        header_main_menu.classList.add("active");
    }, 10);
}

let calc_transform = (pos, mode="default") => {
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

let burger_position = () => {
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
    const button_atr = element.id;
    const menu = document.querySelector(`.${button_atr}`);

    if (isNaN(menu)) {
        menu.classList.remove("disactive");
    } else {
        throw new Error(`No menu with that atr: ${button_atr}`);
    }
}

let active_menu_block = () => {

    sessionStorage.setItem("resize-menu", JSON.stringify("menu-block"));

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

    sessionStorage.setItem("resize-menu", JSON.stringify("default"));

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