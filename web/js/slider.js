
var seven_day_forecast_slider = new Swiper(".seven-day-forecast-short__content", {
    slidesPerView: 7,
    spaceBetween: 10,
    breakpoints: {
        280: {
            slidesPerView: 2
        },
        450: {
            slidesPerView: 3
        },
        570: {
            slidesPerView: 4
        },
        640: {
            slidesPerView: 3
        },
        768: {
            slidesPerView: 4
        },
        950: {
            slidesPerView: 5
        },
        1175: {
            slidesPerView: 3
        },
        1320: {
            slidesPerView: 4
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