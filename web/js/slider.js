
var seven_day_forecast_slider = new Swiper(".seven-day-forecast-short__content", {
    slidesPerView: 7,
    spaceBetween: 10,
    breakpoints: {
        280: {
            slidesPerView: 2
        },
        680: {
            slidesPerView: 3
        },
        850: {
            slidesPerView: 4
        },
        950: {
            slidesPerView: 4
        },
        1175: {
            slidesPerView: 2
        },
        1225: {
            slidesPerView: 3
        },
        1350: {
            slidesPerView: 4
        }
    }
});
