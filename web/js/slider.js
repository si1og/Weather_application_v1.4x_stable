
var seven_day_forecast_slider = new Swiper(".seven-day-forecast-short__content", {
    slidesPerView: 7,
    spaceBetween: 10,
    breakpoints: {
        280: {
            slidesPerView: 2
        },
        370: {
            slidesPerView: 3
        },
        450: {
            slidesPerView: 4
        },
        600: {
            slidesPerView: 5
        },
        800: {
            slidesPerView: 6
        },
        950: {
            slidesPerView: 7
        },
        1200: {
            slidesPerView: 5
        },
        1300: {
            slidesPerView: 5
        },
        1440: {
            slidesPerView: 5
        }
    }
});

var swiper_settings = new Swiper(".swiper-settings", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    mousewheel: true,
});