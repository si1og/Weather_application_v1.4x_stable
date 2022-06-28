
const search_input = document.querySelector(".header-search__search-input");
const search = document.querySelector(".header-search");
const burger = document.querySelector(".header-menu-burger");
const header_function_menu = document.querySelector(".header-content__function-menu");
const main_menu_remove = document.querySelector(".main-menu-remove");
const key = '5ba78f463e9dddeead6f1f0cf154d3ca';
const token = 'pk.5458a1a49de64870a499080d6af514dc';

function display_weather(place) {

    if (!place) {
        return;
    }

    fetch("https://api.openweathermap.org/data/2.5/forecast/?q=" + place + ",&appid=" + key + "&lang=ru&cnt=8")  
    .then(function(resp) { return resp.json() })
    .then(function(data) {

        console.log(data);

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

    window.addEventListener("keydown", function(event) {
        if (event.keyCode == 27) {
            console.log("1");
        }
    });

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
        if (window.innerWidth <= 768 && !burger.classList.contains("active")) {
            setTimeout(function() {
                document.body.style = "overflow: hidden; height: 100vh;";
            }, 200);
        } else if (burger.classList.contains("active")) {
            setTimeout(function() {
                document.body.style = "";
            }, 200);
        }

        if (burger.classList.contains("active")) {
            disactive_menu();
        } else {
            burger.classList.add("active");
            header_function_menu.classList.add("menu-active");
            main_menu_remove.classList.remove("disactive");
        }
    });
    main_menu_remove.addEventListener("click", function() {
        disactive_menu();
    });
}

function disactive_menu() {
    burger.classList.remove("active");
    header_function_menu.classList.remove("menu-active");
    main_menu_remove.classList.add("disactive");
}

function link_scroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(element) {
            element.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function document_scroll() {	
    const scrollElements = document.querySelectorAll(".js-scroll");

    scrollElements.forEach((element) => {
        element.classList.add("not-scrolled");
    });

    const element_in_view = (element, margin) => {
        const element_top = element.getBoundingClientRect().top;
        
        return (
            element_top <= (window.innerHeight - margin || document.documentElement.clientHeight)
        );
        };

    const display_scroll_element = (element) => {
        element.classList.add("scrolled");
        element.classList.remove("not-scrolled");
    };

    const hide_scroll_element = (element) => {
        element.classList.add("not-scrolled");
    }

    const handle_scroll_animation = () => {
    scrollElements.forEach((element) => {
        if (element_in_view(element, 50)) {
            display_scroll_element(element);
        } else {
            hide_scroll_element(element);
        }
    })
    }

    window.addEventListener("scroll", () => {
        handle_scroll_animation();
    });

    window.addEventListener("load", () => {
        handle_scroll_animation();
    });
}

function get_user_location() {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    function success(pos) {
        const crd = pos.coords;

        get_city(crd.latitude, crd.longitude);
        
    }
    
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function get_city(lat, lng) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', `https://us1.locationiq.com/v1/reverse.php?key=${token}&lat=${lat}&lon=${lng}&format=json`, true);
    xhr.send();
    xhr.addEventListener("readystatechange", process_request, false);
  
    function process_request() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            let city = response.address.city;
            display_weather(city);
        }
    }
}

document_events();
document_scroll();
link_scroll();
get_user_location();