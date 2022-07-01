
const search_input = document.querySelector(".header-search__search-input");
const search = document.querySelector(".header-search");
const burger = document.querySelector(".header-menu-burger");
const header_function_menu = document.querySelector(".header-content__function-menu");
const main_menu_remove = document.querySelector(".main-menu-remove");
var weather_content = document.querySelectorAll(".weather-content");
const key = '5ba78f463e9dddeead6f1f0cf154d3ca';
const token = 'pk.5458a1a49de64870a499080d6af514dc';

// weater consts
const weather_main = document.querySelector(".weather-main");
const hourly_forecast = document.querySelector(".hourly-forecast__slider-content");
const full_daily_forecast = document.querySelector(".seven-days-foracast-ditails");

const set_temp = (temp_k) => {
    let temp = Math.round(temp_k - 273.15);
    let temp_ret = "";

    if (temp > 0) {
        temp_ret = `+${temp}`;
    } else {
        temp_ret = temp;
    }

    return temp_ret;
}

const convent_dt_txt = (dt) => {
    let hours = dt.split(" ")[1];
    let time = hours.split(":");
    return `${time[0]}:${time[1]}`;
}

const set_icon = (index) => {
    return `./icons/weather_icons/${index}.svg`;
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

function generate_hourly_forecast(arr) {

    const add_new_day_date = (element, index) => {
        let day_next = index + 2;
        const date = new Date();
        date.setDate(date.getDate() + (day_next+(7-date.getDay())) % 7);

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
        } else {
            content.className = "slider-block swiper-slide";
        }
        counter++;
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

    const get_date = (index) => {
        let day_next = index - 2;
        const date = new Date();
        date.setDate(date.getDate() + (day_next+(7-date.getDay())));

        if (day_next != -1) {
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

    day_data = [];
    counter_data = 1;
    for (let i = 0; i < arr.length; i++) {
        day_data.push(arr[i]);
        
        if (day_data.length == 8 && i == 7) {
            day_data = [];
        }
        if (convent_dt_txt(day_data[day_data.length - 1].dt_txt) == "21:00" && day_data.length < 8) {
            day_data = [];
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
                <div class="day-info-block-content__block">
                    <div class="day-info-block-day-time">
                        <span class="day-info-block-day-time__label">Ночью</span>
                        <div class="day-info-block-day-time__content">
                            <div class="day-info-block-day-time__info-block-1">
                                <span class="day-info-block-day-time__temp">${set_temp(day_data[1].main.temp)}</span>
                                <span class="day-info-block-day-time__status">
                                    <span class="day-info-block-day-time__icon" style="background-image: url('${set_icon(day_data[1].weather[0].icon)}')"></span>
                                    ${day_data[1].weather[0].description}
                                </span>
                            </div>
                            <div class="day-info-block-day-time__info-block-2">
                                <span class="day-info-block-day-time__wind">${Math.round(day_data[1].wind.speed)}</span>
                                <span class="day-info-block-day-time__humidity">${day_data[1].main.humidity}</span>
                                <span class="day-info-block-day-time__pressure">${day_data[1].main.pressure}</span>
                            </div>
                        </div>
                    </div>
                    <div class="day-info-block-day-time">
                        <span class="day-info-block-day-time__label">Утром</span>
                        <div class="day-info-block-day-time__content">
                            <div class="day-info-block-day-time__info-block-1">
                                <span class="day-info-block-day-time__temp">${set_temp(day_data[3].main.temp)}</span>
                                <span class="day-info-block-day-time__status">
                                    <span class="day-info-block-day-time__icon" style="background-image: url('${set_icon(day_data[3].weather[0].icon)}')"></span>
                                    ${day_data[3].weather[0].description}
                                </span>
                            </div>
                            <div class="day-info-block-day-time__info-block-2">
                                <span class="day-info-block-day-time__wind">${Math.round(day_data[3].wind.speed)}</span>
                                <span class="day-info-block-day-time__humidity">${day_data[3].main.humidity}</span>
                                <span class="day-info-block-day-time__pressure">${day_data[3].main.pressure}</span>
                            </div>
                        </div>
                    </div>
                    <div class="day-info-block-day-time">
                        <span class="day-info-block-day-time__label">Днём</span>
                        <div class="day-info-block-day-time__content">
                            <div class="day-info-block-day-time__info-block-1">
                                <span class="day-info-block-day-time__temp">${set_temp(day_data[5].main.temp)}</span>
                                <span class="day-info-block-day-time__status">
                                    <span class="day-info-block-day-time__icon" style="background-image: url('${set_icon(day_data[5].weather[0].icon)}')"></span>
                                    ${day_data[5].weather[0].description}
                                </span>
                            </div>
                            <div class="day-info-block-day-time__info-block-2">
                                <span class="day-info-block-day-time__wind">${Math.round(day_data[5].wind.speed)}</span>
                                <span class="day-info-block-day-time__humidity">${day_data[5].main.humidity}</span>
                                <span class="day-info-block-day-time__pressure">${day_data[5].main.pressure}</span>
                            </div>
                        </div>
                    </div>
                    <div class="day-info-block-day-time">
                        <span class="day-info-block-day-time__label">Вечером</span>
                        <div class="day-info-block-day-time__content">
                            <div class="day-info-block-day-time__info-block-1">
                                <span class="day-info-block-day-time__temp">${set_temp(day_data[7].main.temp)}</span>
                                <span class="day-info-block-day-time__status">
                                    <span class="day-info-block-day-time__icon" style="background-image: url('${set_icon(day_data[5].weather[0].icon)}')"></span>
                                    ${day_data[7].weather[0].description}
                                </span>
                            </div>
                            <div class="day-info-block-day-time__info-block-2">
                                <span class="day-info-block-day-time__wind">${Math.round(day_data[7].wind.speed)}</span>
                                <span class="day-info-block-day-time__humidity">${day_data[7].main.humidity}</span>
                                <span class="day-info-block-day-time__pressure">${day_data[7].main.pressure}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="day-info-block-content__other"></div>
            </div>
            `;
            counter_data++;
            full_daily_forecast.append(forecast_day);
            day_data = [];
        }
    }
}

function display_weather(place) {
    if (!place) {
        return;
    }

    fetch("https://api.openweathermap.org/data/2.5/forecast/?q=" + place + ",&appid=" + key + "&lang=ru&cnt=40")  
    .then(function(resp) { return resp.json() })
    .then(function(data) {

        weather_content.forEach(element => {
            element.classList.remove("disactive")
        });

        if (data.cod == 404) {
            console.log("town not found");
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
                <span class="weather-main__wind-block">${Math.round(weather_now.wind.speed)}</span>
            </span>
            <span class="weather-main__humidity">
                <span class="weather-main__humidity-block">${weather_now.main.humidity}</span>
            </span>
            <span class="weather-main__pressure">
                <span class="weather-main__pressure-block">${weather_now.main.pressure}</span>
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

        set_round_data("clouds", weather_now.clouds.all);
        set_round_data("pop", weather_now.pop);
        generate_hourly_forecast(data.list);
        generate_full_daily_forecast(data.list);
        document_scroll();

    });
    // .catch(function() {
    //     console.log("town not found");
    //     var weather_now = data.list[0];
    //     const convent_dt = (dt) => {
    //         return dt.duration().asMinutes();
    //     }
    //     console.log(convent_dt(weather_now.dt));
    // }); 
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
link_scroll();
get_user_location();