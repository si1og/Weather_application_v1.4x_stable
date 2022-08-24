
const select_button = document.querySelectorAll(".select__button");
const select__options = document.querySelectorAll(".select__option");
const settings_checkboxhes = document.querySelectorAll(".settings-button__checkbox, .main-menu__button-input");

const document_default_settings = {
    "night-mode": "auto",
    "fix-header": true,
    "menu-animation": false,
    "time-format": "24h",
    "system-theme": true,
    "data-update": "10min",
    "units": {
        "temp": "c",
        "speed": "mps",
        "pressure": "mm-rt"
    }
}

let document_settings = JSON.parse(localStorage.getItem("document-settings"));

if (isNaN(document_settings)) {

    let settings_default = get_dict_keys(document_default_settings, Object.keys(document_default_settings).length);
    let settings_user = get_dict_keys(document_settings, Object.keys(document_settings).length);

    if (compartion_of_two_arr(settings_default, settings_user)) {
        init_settings();
    } else {
        localStorage.setItem("document-settings", JSON.stringify(document_default_settings));
        document_settings = JSON.parse(localStorage.getItem("document-settings"));
        init_settings();
    }
} else {
    localStorage.setItem("document-settings", JSON.stringify(document_default_settings));
    document_settings = JSON.parse(localStorage.getItem("document-settings"));
    init_settings();
}

function update_settings(settings, path, value) {
    const keys = path.split('.');
    const targetKey = keys.pop();
    let current = settings;
    for (let i = 0; i < keys.length; ++i) {
      current = current[keys[i]];
      if (!current) {
        throw new Error('Specified key not found. ' + keys[i]);
      }
    }
    current[targetKey] = value;

    localStorage.setItem("document-settings", JSON.stringify(settings));
  }

function get_settings_value(settings, path) {
    const keys = path.split('.');
    const targetKey = keys.pop();
    let current = settings;
    for (let i = 0; i < keys.length; ++i) {
      current = current[keys[i]];
      if (!current) {
        throw new Error('Specified key not found. ' + keys[i]);
      }
    }
    return current[targetKey];
}

function init_settings() {
    set_select_option("units.temp", "temp");
    set_select_option("units.speed", "speed");
    set_select_option("units.pressure", "pressure");
    set_select_option("data-update", "data-update");
    set_select_option("time-format", "time-format");

    select_button.forEach(element => {
        element.addEventListener('click', () => {
            let id = element.classList[2];
            let element_option = document.getElementById(id);
    
            if (element.classList.contains("active")) {
                element.classList.remove("active");
                reset_select();
            } else {
                remove_select();
                element.classList.add("active");
                element_option.classList.add("disactive");
            }
        });
    });
    
    select__options.forEach(element => {
        element.addEventListener("click", () => {
            remove_select();
            reset_select();

            const settings = JSON.parse(localStorage.getItem("document-settings"));
            const weater_interval = JSON.parse(sessionStorage.getItem("weather-interval"));

            if (isNaN(settings)) {
                get_select_option(element, settings, "units.temp", "temp");
                get_select_option(element, settings, "units.speed", "speed");
                get_select_option(element, settings, "units.pressure", "pressure");
                get_select_option(element, settings, "data-update", "data-update");
                get_select_option(element, settings, "time-format", "time-format");
            }

            const latest_towns = JSON.parse(sessionStorage.getItem("latest-towns"));

            if (isNaN(latest_towns)) {
                update_page();
                display_weather(latest_towns[latest_towns.length-1]);

                clearInterval(weater_interval);
                
                if (settings["data-update"] != "disable") {
                    const weather_interval = setInterval(() => {
                        display_weather(latest_towns[latest_towns.length-1]);
                    }, transfer_time_from_settings_to_ms());
    
                    sessionStorage.setItem("weather-interval", JSON.stringify(weather_interval));
                }
            }
        });
    });
    
    settings_checkboxhes.forEach(element => {
        element.addEventListener("change", (event) => {;
            let settings = JSON.parse(localStorage.getItem("document-settings"));
            settings[element.id] = event.currentTarget.checked;
            localStorage.setItem("document-settings", JSON.stringify(settings));

            set_option_on_check(element);
        });
    
        set_checked_option(element, element.id);
    });
}

function set_checked_option(element, option) {
    let settings = JSON.parse(localStorage.getItem("document-settings"));
    element.checked = settings[option];
}

function set_option_on_check(element) {
    switch (element.id) {
        case "fix-header":
            fix_header_option();
            break;
    }
}

function fix_header_option() {
    const header = document.querySelector(".header");
    const page_scroll = 170;

    if (window.pageYOffset < page_scroll) {
        return;
    }

    if (header.classList.contains("scrolled")) {
        header.classList.add("back-animation");
        
        setTimeout(() => {
            header.classList.remove("scrolled");
            header.classList.remove("back-animation");
        }, 200);
    } else {
        header.classList.add("top-animation");
        header.classList.add("scrolled");
        
        setTimeout(() => {
            header.classList.remove("top-animation");
        }, 200);
    }
}

function set_select_option(path, option_type) {
    const settings = JSON.parse(localStorage.getItem("document-settings"));

    if (!isNaN(settings)) {
        throw new Error("Settings not found");
    }

    const select_button_new = document.querySelector(`.select__button.${option_type}`);
    const select_button_class_names = select_button_new.classList;
    const select_button_classes = []
    
    for (let i = 0; i < 3; i++) {
        if (i == 2) {
            select_button_classes.push(get_settings_value(settings, path));    
        } else {
            select_button_classes.push(select_button_class_names[i]);
        }
    }
    select_button_new.className = select_button_classes.join(" ");

    let select_element = document.getElementById(get_settings_value(settings, path));
    select_button_new.textContent = select_element.textContent;
}

function get_select_option(element, settings, path, option) {
    if (element.parentElement.classList.contains(option)) {
        const select_button_new = document.querySelector(`.select__button.${option}`);
        const select_button_class_names = select_button_new.classList;
        const select_button_classes = []
        
        for (let i = 0; i < 3; i++) {
            if (i == 2) {
                select_button_classes.push(element.id);    
            } else {
                select_button_classes.push(select_button_class_names[i]);
            }
        }

        update_settings(settings, path, element.id);

        select_button_new.className = select_button_classes.join(" ");
        select_button_new.textContent = element.textContent;
    }
}


function get_dict_keys(dict, dict_size, first_key=null ,all_keys=[], counter=0) {
    let keys = [];
    if (isNaN(first_key)) {
        try {
            if (typeof dict[first_key] != "string") {
                keys = Object.keys(dict[first_key]);
            }
        } catch {
            keys = [];
        }
    } else {
        keys = Object.keys(dict);
    }

    if (keys != [] && counter <= dict_size) {
        keys.forEach(element => {
            all_keys.push(element);
            counter++;
            keys_arr = [];
            return get_dict_keys(dict, dict_size, element, all_keys, counter);
        });
    }

    return all_keys;
}

function compartion_of_two_arr(arr1, arr2) {
    counter = 0;
    arr1.forEach(element1 => {
        arr2.forEach(element2 => {
            if (element1 == element2) {
                counter++;
            }
        })
    });

    if (counter == arr1.length && counter == arr2.length) {
        return true;
    } else {
        return false
    }
}

function reset_select() {
    setTimeout(() => {
        select__options.forEach(element => {
            element.classList.remove("disactive");
        });
    }, 200);
}

function remove_select() {
    select_button.forEach(element2 => {
        element2.classList.remove("active");
    });
}
