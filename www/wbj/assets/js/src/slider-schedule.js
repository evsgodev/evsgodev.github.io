export const sliderIntroInit = function() {
  $('.js-slider-intro').bxSlider({
    mode: 'fade',
    auto: true,
    autoStart: true,
    pause: 10000,
    speed: 1000,
    responsive: true,
    touchEnabled: false
  });
};

export const sliderSheduleInit = function() {
  const sliderSheduleDate = $('.js-tl-schedule-date-title').bxSlider({
    mode: 'fade',
    speed: 1000,
    pager: false,
    infiniteLoop: false,
    onSlideNext: syncSlider,
    onSlidePrev: syncSlider,
    touchEnabled: false
  });

  const sliderShedule = $('.js-tl-schedule').bxSlider({
    mode: 'vertical',
    speed: 1000,
    pager: false,
    infiniteLoop: false,
    onSlideNext: syncSlider,
    onSlidePrev: syncSlider,
    touchEnabled: false
  });

  $('.js-tl-schedule-prev').on('click', () => {
    sliderSheduleDate.goToPrevSlide();
    sliderShedule.goToPrevSlide();
  });

  $('.js-tl-schedule-next').on('click', () => {
    sliderSheduleDate.goToNextSlide();
    sliderShedule.goToNextSlide();
  });

  /**
   * @param {Number} el current index slide
   * @param {Object} old prev index slide
   * @param {Object} newi current slide
   */
  function syncSlider(el, old, newi) {
    sliderSheduleDate.goToSlide(newi);
    sliderShedule.goToSlide(newi);
  }
};

sliderIntroInit();

$('#modalSchedule').on('shown.bs.modal', function() {
  sliderSheduleInit();
});
