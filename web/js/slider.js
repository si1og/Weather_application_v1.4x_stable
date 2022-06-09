
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

var seven_day_forecast_slider = new Swiper(".seven-day-forecast-short__content", {
    slidesPerView: 7,
    spaceBetween: 10,
    breakpoints: {
        1000: {
            slidesPerView: 7
        },
        1200: {
            slidesPerView: 5
        },
        1300: {
            slidesPerView: 6
        },
        1440: {
            slidesPerView: 7
        }
    }
});