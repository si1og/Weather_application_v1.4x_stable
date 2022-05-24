
const search_input = document.querySelector(".header-search__search-input");
const search = document.querySelector(".header-search");

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
        if (event.keyCode == 191) {
            search_input.focus();
        }
    });
}

document_events();