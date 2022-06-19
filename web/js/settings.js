
var settings_buttons = document.querySelector(".settings-button");

settings_buttons.forEach(element => {
    element.addEventListener("click", function() {
        if (!element.classList.contains("active")) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });
});