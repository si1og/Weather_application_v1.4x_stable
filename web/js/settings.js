
const select_button = document.querySelectorAll(".select__button");
const select__options = document.querySelectorAll(".select__option");
const settings_checkboxhes = document.querySelectorAll(".settings-button__checkbox, .main-menu__button-input");

const document_default_settings = {
    "night-mode": false,
    "fix-header": true,
    "menu-animation": true,
    "24-hours-time": true,
    "system-theme": true,
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
        init_settings(document_settings);
    } else {
        localStorage.setItem("document-settings", JSON.stringify(document_default_settings));
        document_settings = JSON.parse(localStorage.getItem("document-settings"));
        init_settings(document_settings);
    }
} else {
    localStorage.setItem("document-settings", JSON.stringify(document_default_settings));
    document_settings = JSON.parse(localStorage.getItem("document-settings"));
    init_settings(document_settings);
}

function init_settings(settings) {
    set_select_option(settings["units"]["temp"], "temp");
    set_select_option(settings["units"]["speed"], "speed");
    set_select_option(settings["units"]["pressure"], "pressure");

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
            get_select_option(element, "temp");
            get_select_option(element, "speed");
            get_select_option(element, "pressure");

            const latest_towns = JSON.parse(sessionStorage.getItem("latest-towns"));

            if (isNaN(latest_towns)) {
                update_page();
                display_weather(latest_towns[latest_towns.length-1]);
            }
        });
    });
    
    settings_checkboxhes.forEach(element => {
        element.addEventListener("change", (event) => {;
            let settings = JSON.parse(localStorage.getItem("document-settings"));
            settings[element.id] = event.currentTarget.checked;
            localStorage.setItem("document-settings", JSON.stringify(settings));
        });
    
        set_checked_option(element, element.id);
    });
}

function set_checked_option(element, option) {
    let settings = JSON.parse(localStorage.getItem("document-settings"));
    element.checked = settings[option];
}

function set_select_option(option, option_type) {
    const select_button_new = document.querySelector(`.select__button.${option_type}`);
    const select_button_class_names = select_button_new.classList;
    const select_button_classes = []
    
    for (let i = 0; i < 3; i++) {
        if (i == 2) {
            select_button_classes.push(option);    
        } else {
            select_button_classes.push(select_button_class_names[i]);
        }
    }
    select_button_new.className = select_button_classes.join(" ");

    let select_element = document.getElementById(option);
    console.log(select_element);
    select_button_new.textContent = select_element.textContent;
}

function get_select_option(element, option) {
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

        let settings = JSON.parse(localStorage.getItem("document-settings"));
        settings["units"][option] = element.id;
        localStorage.setItem("document-settings", JSON.stringify(settings));

        select_button_new.className = select_button_classes.join(" ");
        select_button_new.textContent = element.textContent;
    }
}

function get_dict_keys(dict, dict_size, first_key=null, all_keys=[], counter=0) {
    let keys = [];
    if (isNaN(first_key)) {
        try {
            keys = Object.keys(dict[first_key]);
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
