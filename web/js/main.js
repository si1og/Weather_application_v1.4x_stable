
const search_input = document.querySelector(".header-search__search-input");
const search = document.querySelector(".header-search");
const burger = document.querySelector(".header-menu-burger");
const header_function_menu = document.querySelector(".header-content__function-menu");
const key = '5ba78f463e9dddeead6f1f0cf154d3ca';

function display_weather(place) {

    if (!place) {
        return;
    }

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + place + ",&appid=" + key + "&lang=ru&cnt=8")  
    .then(function(resp) { return resp.json() })
    .then(function(data) {

        error_index = 0;

        if (data.cod == 404) {
            console.log("town not found");
            return;
        } else if (data.cod != 200) {
            return;
        }
    })
    .catch(function() {
        if (!error_index) {
            return;
        }
        console.log("town not found");
    }); 
}

function document_events() {
    search_input.addEventListener("focus", function() {
        search.classList.add("header-search--active");
    });

    search_input.addEventListener("blur", function() {
        search.classList.remove("header-search--active");
    });

    search_input.addEventListener("keydown", function(event) {
        if (event.keyCode == 27) {
            search_input.blur();
        }
    });

    window.addEventListener("keydown", function(event) {
        if (event.keyCode == 111) {
            setTimeout(() => {
                search_input.focus();
            }, 10);
        }
    });

    burger.addEventListener("click", function() {
        if (burger.classList.contains("active")) {
            burger.classList.remove("active");
            header_function_menu.classList.remove("menu-active");
        } else {
            burger.classList.add("active");
            header_function_menu.classList.add("menu-active");
        }
    });

}


document_events();