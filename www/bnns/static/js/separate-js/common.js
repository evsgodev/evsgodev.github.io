$(function () {
    'use strict';

    var isMobile = $('html').hasClass('touch');

    window.objectFitImages();

    // Add Modernizr test
    Modernizr.addTest('isios', function() {
        return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
    });

    CookieBanner();
    Nav()
    introSlider();
    validation();
    NewsModal();
    Services()
    ServicesOverview()
    Testimonials();
    GridMasonry();
    Filter();

    switch(page) {
        case 'home':
            sliderCases();
            break;

        case 'services details':
            sliderCases();
            video();
            break;

        case 'cases details':
            video();
            lightboxGallery('.js-cases-gallery');
            break;

        case 'about':
            video();
            break;
    }

    AOS.init({
        duration: 800,
        delay: 300
    });

    $(window).on("resize orientationchange", function() {
        AOS.refreshHard();
    });

    $('.js-scroll-to').on('click', scrollTo);
    $('.js-next-section').on('click', scrollNextSection);

    function scrollNextSection(e) {
        e.preventDefault();

        var $target = $(this).closest('.section-scroll').height() - 50;

        $('html, body').stop().animate({
            scrollTop: $target
        }, 800, 'swing');
    }
    function scrollTo(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            scrollTop: $target.offset().top
        }, 800, 'swing');
    }
});
