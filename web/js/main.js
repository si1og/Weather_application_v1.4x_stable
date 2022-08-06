
const search_input = document.querySelector(".header-search__search-input");
const search = document.querySelector(".header-search");
const burger = document.querySelector(".menu-burger");
const header_function_menu = document.querySelector(".header-content__function-menu");
const main_menu_remove = document.querySelector(".main-menu-remove");
const animation = document.querySelector(".loading-animation--conteiner");
const notification_cont = document.querySelector(".error-notification");
const notification_button = document.querySelector(".error-notification__button");
var weather_content = document.querySelectorAll(".weather-content");
var document_blocks = document.querySelectorAll(".js-scroll");
const key = '5ba78f463e9dddeead6f1f0cf154d3ca';
const token = 'pk.5458a1a49de64870a499080d6af514dc';

// weater consts
const weather_main = document.querySelector(".weather-main");
const hourly_forecast = document.querySelector(".hourly-forecast__slider-content");
const full_daily_forecast = document.querySelector(".seven-days-foracast-ditails");
const short_daily_forecast = document.querySelector(".seven-day-forecast-short__slider");

const average = (array) => array.reduce((a, b) => a + b) / array.length;

const get_date = (index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);

    if (index != 0) {
        var options = {
            weekday: 'long',
            month: 'long', 
            day: 'numeric' 
        };

        return date.toLocaleDateString('ru-RU', options);
    } else {
        var options = {
            month: 'long', 
            day: 'numeric' 
        };

        return `завтра, ${date.toLocaleDateString('ru-RU', options)}`;
    }
}

const dt_conventer = (dt) => {
    var options = {
        hour: '2-digit',
        minute:'2-digit'
    }
    const date = new Date(dt*1000);
    return date.toLocaleDateString('ru-RU', options).split(", ")[1];
}

const array_min = (arr) => {
    return arr.reduce(function (p, v) {
        return ( p < v ? p : v );
    });
}

const array_max = (arr) => {
    return arr.reduce(function (p, v) {
        return ( p > v ? p : v );
    });
}

const set_temp = (temp_k) => {
    let temp = 0;
    const settings = JSON.parse(localStorage.getItem("document-settings"));
    const temp_mode = settings["units"]["temp"];

    if (temp_mode == "c") {
        temp = Math.round(temp_k - 273.15);
    } else if (temp_mode == "f") {
        temp = Math.round((temp_k - 273.15) * 9/5 + 32);
    } else if (temp_mode == "k") {
        temp = Math.round(temp_k);
    }

    let temp_ret = "";

    if (temp > 0) {
        temp_ret = `+${temp}`;
    } else {
        temp_ret = temp;
    }

    return temp_ret;
}

const set_temp_atr = () => {
    const temp_elements = document.querySelectorAll(".weather-main__temp-block, .day-card__temp, .day-info-block-day-time__temp, .slider-block__temp, .weather-main__self-temp-block");
    const settings = JSON.parse(localStorage.getItem("document-settings"));

    temp_elements.forEach(element => {
        element.classList.add(settings["units"]["temp"]);
    });
}

const set_speed = (speed) => {
    const settings = JSON.parse(localStorage.getItem("document-settings"));
    const speed_mode = settings["units"]["speed"];

    if (speed_mode == "mps") {
        return Math.round(speed);
    } else if (speed_mode == "kmph") {
        return Math.round(speed * 3.6);
    } else if (speed_mode == "milph") {
        return Math.round(speed * 2.23694);
    }
}

const set_speed_atr = () => {
    const temp_elements = document.querySelectorAll(".weather-main__wind-block, .day-card__wind-block, .day-info-block-day-time__wind");
    const settings = JSON.parse(localStorage.getItem("document-settings"));

    temp_elements.forEach(element => {
        element.classList.add(settings["units"]["speed"]);
    });
}

const set_pressure = (pressure) => {
    const settings = JSON.parse(localStorage.getItem("document-settings"));
    const speed_mode = settings["units"]["pressure"];

    if (speed_mode == "mm-rt") {
        return Math.round(pressure * 0.75);
    } else if (speed_mode == "hpa") {
        return pressure;
    } else if (speed_mode == "atm") {
        return Math.round(pressure * 0.75 / 760.002 * 10**5) / 10**5;
    }
}

const set_pressure_atr = () => {
    const temp_elements = document.querySelectorAll(".weather-main__pressure-block, .day-info-block-day-time__pressure");
    const settings = JSON.parse(localStorage.getItem("document-settings"));

    temp_elements.forEach(element => {
        element.classList.add(settings["units"]["pressure"]);
    });
}

const convent_dt_txt = (dt) => {
    let hours = dt.split(" ")[1];
    let time = hours.split(":");
    return `${time[0]}:${time[1]}`;
}

const set_icon = (index) => {
    return `./icons/weather_icons/${index}.svg`;
}

const update_page = () => {
    var slider_blocks = document.querySelectorAll(".slider-block, .day-info-block, .day-card");

    slider_blocks.forEach(element => {
        element.remove();
    });
    document_blocks.forEach(element => {
        element.classList.add("disactive");
    });
    animation.classList.remove("disactive");
    notification_cont.classList.add("disactive");
}

const construct_date = () => {
    const set_format = (value) => {
        if (value / 10 < 1) {
            return `0${value}`;
        } else {
            return value;
        }
    }

    const date = new Date();
    const hours = set_format(date.getHours());
    const min = set_format(date.getMinutes());

    return `${hours}:${min}`;
}

function generate_err_notification(err, place="none") {
    const notification_label = document.querySelector(".error-notification__label");

    const old_notification_button = document.querySelector(".error-notification__button");
    const new_notification_button = notification_button.cloneNode(true);
    old_notification_button.parentNode.replaceChild(new_notification_button, old_notification_button);

    new_notification_button.classList.remove("search", "location");
    notification_cont.classList.remove("not-found", "geolocation")
    animation.classList.add("disactive");

    switch (err) {
        case "geolocation":
            notification_cont.classList.remove("disactive");
            notification_cont.classList.add("geolocation");
            notification_label.textContent = "Не удалось определить ваше местоположение";
            new_notification_button.classList.add("search");
            new_notification_button.textContent = "Перейти к поиску";

            new_notification_button.addEventListener("click", () => {
                search_input.focus();
            });

            break;
        case "not-found":
            notification_cont.classList.remove("disactive");
            notification_cont.classList.add("not-found");
            notification_label.textContent = `Не удалось найти город "${place}"`;
            new_notification_button.classList.add("location");
            new_notification_button.textContent = "Определить местоположение";

            new_notification_button.addEventListener("click", () => {
                update_page();
                get_user_location();
            });
            break;
    }
}

const generate_short_daily_forecast = (arr) => {

    const mode = (arr) => {
        return arr.sort((a,b) =>
              arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop();
    }

    const add_new_day_date = (index) => {
        const date = new Date();
        date.setDate(date.getDate() + index + 1);

        var options = {
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('ru-RU', options);
    }

    const add_week_day = (index) => {
        const date = new Date();
        date.setDate(date.getDate() + index + 1);

        if (index != 0) {
            var options = { 
                weekday: 'long',
            };
            return date.toLocaleDateString('ru-RU', options);
        } else {
            return "завтра";
        }
    }

    const set_min_max_temp = (arr) => {
        return `${set_temp(array_max(arr))} / ${set_temp(array_min(arr))}`;
    }

    var icon_arr = [];
    var temp_arr = [];
    var wind_arr = [];
    var humidity_arr = [];
    var status_arr = [];
    let date_counter = 0;

    day_data = [];
    for (let i = 0; i < arr.length; i++) {
        day_data.push(arr[i]);
        
        if (day_data.length == 8 && i == 7) {
            day_data = [];
        }
        if (day_data.length > 0) {
            if (convent_dt_txt(day_data[day_data.length - 1].dt_txt) == "21:00" && day_data.length < 8) {
                day_data = [];
            }
        }

        if (day_data.length == 8) {
            day_data.forEach(element => {
                icon_arr.push(element.weather[0].icon);
                temp_arr.push(element.main.temp);
                wind_arr.push(set_speed(element.wind.speed));
                humidity_arr.push(element.main.humidity);
                status_arr.push(element.weather[0].description);
            });
            const forecast_element = document.createElement("a");
            forecast_element.className = "day-card swiper-slide";
            forecast_element.href = `#day-info-block-${date_counter}`;
            forecast_element.innerHTML = `
            <div class="day-card__label--conteiner">
                <span class="day-card__label">
                    ${add_week_day(date_counter)}
                </span>
                <span class="day-card__date">
                    ${add_new_day_date(date_counter)}
                </span>
            </div>
            <span class="day-card__weather-icon" style="background-image: url('./icons/weather_icons/${mode(icon_arr)}.svg');"></span>
            <span class="day-card__status">${mode(status_arr)}</span>
            <div class="day-card__main-info">
                <span class="day-card__temp-block">
                    <span class="day-card__temp">${set_min_max_temp(temp_arr)}</span>
                </span>
            </div>
            <div class="day-card__second-block">
                <span class="day-card__wind">
                    <span class="day-card__wind-block">${Math.round(average(wind_arr))}</span>
                </span>
                <span class="day-card__humidity">
                    <span class="day-card__humidity-block">${Math.round(average(humidity_arr))}</span>
                </span>
            </div>
            `;

            day_data = [];
            icon_arr = [];
            temp_arr = [];
            wind_arr = [];
            humidity_arr = [];
            date_counter++;

            short_daily_forecast.append(forecast_element);
        }
    link_scroll();
    }

}

function generate_hourly_forecast(arr) {

    const add_new_day_date = (element, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);

        var options = {
            month: 'numeric', 
            day: 'numeric' 
        };

        const date_element = document.createElement("span");
        date_element.className = "slider-date";
        date_element.textContent = date.toLocaleDateString('ru-RU', options);
        element.append(date_element);
    }

    counter = 1;
    arr.forEach(element => {
        let content = document.createElement("div");

        let time_data = "";

        if (arr[0] != element) {
            time_data = convent_dt_txt(element.dt_txt);
        } else {
            time_data = construct_date();
        }

        content.innerHTML = `
        <span class="slider-block__time">${time_data}</span>
        <span class="slider-block__status-icon" style="background-image: url(${set_icon(element.weather[0].icon)});"></span>
        <span class="slider-block__temp-block">
            <span class="slider-block__temp">${set_temp(element.main.temp)}</span>
        </span>
        `;
        hourly_forecast.append(content);
        if (convent_dt_txt(element.dt_txt) == "00:00" && arr[0] != element) {
            
            content.className = "new-day slider-block swiper-slide";
            add_new_day_date(content, counter);
            counter++;
        } else {
            content.className = "slider-block swiper-slide";
        }
    });

    var swiper_hourly_foresast = new Swiper(".hourly-forecast__slider-block", {
        slidesPerView: "auto",
        spaceBetween: 10,
        slidesPerGroup: 3,
        keyboard: {
            enabled: true,
          },
        navigation: {
            nextEl: '.hourly-forecast__right-button',
            prevEl: '.hourly-forecast__left-button',
        }
    });
}

function generate_full_daily_forecast(arr) {
    day_data = [];
    counter_data = 0;
    for (let i = 0; i < arr.length; i++) {
        day_data.push(arr[i]);
        
        if (day_data.length == 8 && i == 7) {
            day_data = [];
        }
        if (day_data.length > 0) {
            if (convent_dt_txt(day_data[day_data.length - 1].dt_txt) == "21:00" && day_data.length < 8) {
                day_data = [];
            }
        }

        if (day_data.length == 8) {

            const forecast_day = document.createElement("section");
            forecast_day.className = "day-info-block js-scroll";
            forecast_day.id = `day-info-block-${counter_data}`;

            forecast_day.innerHTML = `
            <h2 class="info-name-block">
            <div class="info-name-block__day-info">
                <span class="info-name-block__week-day">${get_date(counter_data)}</span>
            </div>
            </h2>
            <div class="day-info-block-content">
                <div class="day-info-block-content__block"></div>
                <div class="day-info-block-content__other"></div>
            </div>
            `;
            full_daily_forecast.append(forecast_day);

            const day_info_content = document.querySelectorAll(".day-info-block-content__block");

            let counter_data_1 = 0;
            let counter_data_2 = 1;
            const day_time_arr = ["Ночью", "Утром", "Днём", "Вечером"]

            for (let i = 0; i < 4; i++) {
                const day_info_block_time = document.createElement("div");
                day_info_block_time.className = "day-info-block-day-time";
                day_info_block_time.innerHTML = `
                <span class="day-info-block-day-time__label">${day_time_arr[i]}</span>
                <div class="day-info-block-day-time__content">
                    <div class="day-info-block-day-time__info-block-1">
                        <span class="day-info-block-day-time__temp">${set_temp(Math.round(average([day_data[counter_data_1].main.temp, day_data[counter_data_2].main.temp])))}</span>
                        <span class="day-info-block-day-time__status">
                            <span class="day-info-block-day-time__icon" style="background-image: url('${set_icon(day_data[counter_data_2].weather[0].icon)}')"></span>
                            ${day_data[counter_data_2].weather[0].description}
                        </span>
                    </div>
                    <div class="day-info-block-day-time__info-block-2">
                        <span class="day-info-block-day-time__wind">${Math.round(average([set_speed(day_data[counter_data_1].wind.speed), set_speed(day_data[counter_data_1].wind.speed)]))}</span>
                        <span class="day-info-block-day-time__humidity">${Math.round(average([day_data[counter_data_1].main.humidity, day_data[counter_data_2].main.humidity]))}</span>
                        <span class="day-info-block-day-time__pressure">${Math.round(average([set_pressure(day_data[counter_data_1].main.pressure), set_pressure(day_data[counter_data_2].main.pressure)]))}</span>
                    </div>
                </div>
                `;

                day_info_content[counter_data].append(day_info_block_time);
                counter_data_1 += 2;
                counter_data_2 += 2;
            }

            counter_data++;
            day_data = [];
        }
    }
}

function display_weather(place) {
    if (!place) {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${place}&appid=${key}&lang=ru&cnt=40`)  
    .then(function(resp) { return resp.json() })
    .then(function(data) {

        let latest_towns = JSON.parse(sessionStorage.getItem("latest-towns"));
        if (isNaN(latest_towns)) {
            if (latest_towns[length-1] != place) {
                latest_towns.push(place);
                sessionStorage.setItem("latest-towns", JSON.stringify(latest_towns));
            }
        } else {
            try {
                latest_towns.push(place);
                sessionStorage.setItem("latest-towns", JSON.stringify(latest_towns));
            } catch {}
        }

        weather_content.forEach(element => {
            element.classList.remove("disactive")
        });
        animation.classList.add("disactive");

        if (data.cod == 404) {
            generate_err_notification("not-found", place);
            weather_content.forEach(element => {
                element.classList.add("disactive")
            });
            return;
        } else if (data.cod != 200) {
            return;
        }
        var weather_now = data.list[0];

        construct_date();
        weather_main.innerHTML = `
        <div class="weather-main__text">
            <h2 class="weather-main__label">
                Погода в горде
                <span class="weather-main__town">${place}</span>
            </h2>
            Данные на
            <span class="weather-main__time">${construct_date()}</span>
        </div>
        <div class="weather-main__content">
            <span class="weather-main__temp">
                <span class="weather-main__temp-block" id="temp">${set_temp(weather_now.main.temp)}</span>
            </span>
            <div class="weather-main__status">
                <img src="${set_icon(weather_now.weather[0].icon)}" class="weather-main__staus-icon" alt>
                <span class="weather-main__status-block">${weather_now.weather[0].description}</span>
                <div class="weather-main__self-temp">
                    <span class="weather-main__self-temp--label">Ощущается как </span>
                    <span class="weather-main__self-temp-block">${set_temp(weather_now.main.feels_like)}</span>
                </div>
            </div>
        </div>
        <div class="weather-main__second-block">
            <span class="weather-main__wind">
                <span class="weather-main__wind-block">${set_speed(weather_now.wind.speed)}</span>
            </span>
            <span class="weather-main__humidity">
                <span class="weather-main__humidity-block">${weather_now.main.humidity}</span>
            </span>
            <span class="weather-main__pressure">
                <span class="weather-main__pressure-block">${set_pressure(weather_now.main.pressure)}</span>
            </span>
        </div>
        `;

        const set_round_data = (element_sp, data) => {
            const element_data = document.querySelector(`.weather-ditails__data.${element_sp}`);
            const round = document.querySelector(`#${element_sp}`);

            element_data.textContent = data;

            if (data) {
                round.style = `stroke-dasharray: ${250*(data/100)} 400;`;
            } else {
                round.style = "stroke: transparent;";
            }
        }

        const set_dt = (data) => {
            const sunrise = document.querySelector(".sinrise-sunset__sunrise-time");
            const sunset = document.querySelector(".sinrise-sunset__sunset-time");

            sunrise.textContent = dt_conventer(data.city.sunrise);
            sunset.textContent = dt_conventer(data.city.sunset);
        }

        document_blocks.forEach(element => {
            element.classList.remove("disactive");
        });

        set_dt(data);
        set_round_data("clouds", weather_now.clouds.all);
        set_round_data("pop", weather_now.pop*100);
        generate_hourly_forecast(data.list);
        generate_short_daily_forecast(data.list);
        generate_full_daily_forecast(data.list);
        document_scroll();
        set_temp_atr();
        set_speed_atr();
        set_pressure_atr();
    })
}

function search_event() {
    const search = document.querySelector(".header-search__search-input");

    search.addEventListener("keydown", (event) => {
        if (event.keyCode == 13) {
            if (search.value == "") {
                get_user_location();
            }
            update_page();
            display_weather(search.value);
        }
    })
}

function document_events() {

    sessionStorage.setItem("latest-towns", JSON.stringify([]));

    search_event();

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
}

function disactive_menu() {
    const header_main_menu = document.querySelector(".main-menu");

    burger.classList.remove("active");
    header_function_menu.classList.remove("menu-active");
    main_menu_remove.classList.add("menu-disactive");
    header_main_menu.classList.remove("active");

    setTimeout(() => {
        header_main_menu.classList.add("disactive");
    }, 300);
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
        if (element_in_view(element, 0)) {
            display_scroll_element(element);
        } else {
            hide_scroll_element(element);
        }
    })
    }

    window.addEventListener("scroll", () => {
        handle_scroll_animation();
    });


    handle_scroll_animation();
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
        search_input.value = "";
        
    }
    
    function error() {
        generate_err_notification("geolocation");
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
            let place = "";

            if (response.address.town) {
                place = response.address.town;
            } else {
                place = response.address.city;
            }
            display_weather(place);
        }
    }
}

document_events();
get_user_location();