(function() {
  'use strict';

  document.documentElement.setAttribute("data-agent", navigator.userAgent);

  // object-fit polyfill run for images parallax
  objectFitImages();

  if(document.getElementById('priceChart') !== null) new Chart(document.getElementById("priceChart"), {
    type: 'line',
    data: {
      labels: ["08.17", "09.17", "10.17", "11.17"],
      datasets: [{
        data: ['3200', '3100', '3150', '3250'],
        label: "3 месяца",
        lineTension: 0,
        fill: false,
        borderColor: '#8ecdf6',
        backgroundColor: 'transparent',
        pointBorderColor: '#dddddd',
        pointBackgroundColor: '#d97c3e',
        pointRadius: 0,
        pointHoverRadius: 10,
        pointHitRadius: 60,
        pointBorderWidth: 6
      }, {
        data: ['3190', '3140', '3140', '3250', '3190', '3140', '3140', '3250'],
        label: "(6 месяцев)",
        lineTension: 0,
        fill: false,
        borderColor: '#d0d0d0',
        backgroundColor: 'transparent',
        pointBorderColor: '#dddddd',
        pointBackgroundColor: '#d97c3e',
        pointRadius: 0,
        pointHoverRadius: 10,
        pointHitRadius: 60,
        pointBorderWidth: 6
      }]
    },
    options: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'black'
        }
      }
    }
  });

  $(function() {
    var nua = navigator.userAgent;
    var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);

    if (isAndroid) {
      $('select.form-control').removeClass('form-control').css('width', '100%');
    }

    // product items rating
    initRaiting($('.js-rating'), '14px');

    // Rating for comments
    $('.js-rating-comment').on("rateyo.init", function(e, data) {
      $(this).next().html(data.rating);
    }).rateYo({
      numStars: 5,
      normalFill: '#ffffff',
      ratedFill: '#ca9109',
      starWidth: '16px',
      starSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 15.9"><style>.st0{stroke:#ca9109;stroke-miterlimit:10}</style><path class="st0" d="M9.3 1l1.8 3.6c.1.2.3.4.6.4l4 .6c.7.1 1 1 .5 1.4l-2.9 2.8c-.2.2-.3.5-.2.7l.7 3.9c.1.7-.6 1.2-1.3.9l-3.6-1.9c-.3-.1-.6-.1-.8 0l-3.6 1.9c-.6.3-1.4-.2-1.3-.9l.7-3.9c0-.3 0-.6-.2-.7L.8 7c-.6-.5-.3-1.3.4-1.4l4-.6c.3 0 .5-.2.6-.5L7.7 1C8 .3 9 .3 9.3 1z"/></svg>'
    });

    // Total stars rating
    $('.js-stars-rating-total').rateYo({
      numStars: 5,
      normalFill: '#d6d6d6',
      ratedFill: '#e89b24',
      starWidth: '16px',
      starSvg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 15.9"><path d="M9.3 1l1.8 3.6c.1.2.3.4.6.4l4 .6c.7.1 1 1 .5 1.4l-2.9 2.8c-.2.2-.3.5-.2.7l.7 3.9c.1.7-.6 1.2-1.3.9l-3.6-1.9c-.3-.1-.6-.1-.8 0l-3.6 1.9c-.6.3-1.4-.2-1.3-.9l.7-3.9c0-.3 0-.6-.2-.7L.8 7c-.6-.5-.3-1.3.4-1.4l4-.6c.3 0 .5-.2.6-.5L7.7 1C8 .3 9 .3 9.3 1z"/></svg>'
    });

    $(".js-toggle-callback").popover({
      placement: 'right',
      html: true,
      template: '<div class="popover callback-popover d-none d-md-block" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      content: function() {
        return $('#popover-content').html();
      }
    }).on('click', function() {
      $(".js-callback-scrollbar").mCustomScrollbar({
        theme: 'dark'
      });
    });

    $('.js-aside-video-vertical').mCustomScrollbar({
      theme: 'dark',
      mouseWheel: true,
      autoHideScrollbar: true
    });

    $('body').on('click', '.callback-popover .close', function() {
      $('.js-toggle-callback').trigger('click');
    });

    $('.js-form-regist').validator().on('submit', function (e) {
      if (e.isDefaultPrevented()) {
        e.preventDefault();

        var $this = $(this);

        $this.closest('form').addClass('was-validated');
      } else {
        // everything looks good!
      }
    });

    $('.js-form-logon').validator();

    $('.js-toggle-form-helper').on('click', function() {
      var $title = $('.form-account__title');
      var $this = $(this);

      $title.text($this.data('title'));

      $this.closest('form').addClass('d-none').siblings('form').removeClass('d-none');

      return false;
    });

    $('.js-password-hint').on('click', function() {
      var $this = $(this);
      var pass = $this.closest('form').find('.js-password, .js-confirm');

      $this.toggleClass('is-active');

      if (pass.attr('type') === 'password') {
        pass.attr('type', 'text');
      } else {
        pass.attr('type', 'password');
      }
    });

    $('.js-toggle-menu-second').on('click', function() {
      var $this = $(this);

      $this.parent().toggleClass('bg-light');
    });

    var mainSlider = new Swiper('.js-main-slider', {
      slidesPerView: 'auto',
      loop: true,
      spaceBetween: 10,
      autoplay: true,
      speed: 1200,
      grabCursor: true,
      clickable: false,
      simulateTouch: false, allowSwipeToNext: false, allowSwipeToPrev: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        1200: {
          slidesPerView: 3
        },
        992: {
          slidesPerView: 2
        },
        767: {
          slidesPerView: 1
        }
      }
    });

    var introSlider = new Swiper('.js-slider-intro-catalog', {
      loop: true,
      autoplay: true,
      speed: 4000,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      simulateTouch: false, allowSwipeToNext: false, allowSwipeToPrev: false
    });

    $('.js-row-slider').each(function() {
      var $this = $(this);

      var rowSliders = new Swiper($this, {
        loop: true,
        slidesPerView: 'auto',
        slidesPerGroup: 5,
        grabCursor: true,
        clickable: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: $this.parent().find('.swiper-button-next'),
          prevEl: $this.parent().find('.swiper-button-prev')
        },
        breakpoints: {
          1200: {
            slidesPerGroup: 4
          },
          992: {
            slidesPerGroup: 3
          },
          767: {
            slidesPerGroup: 2
          },
          580: {
            slidesPerGroup: 1
          }
        }
      });
    });

    // Слайдер для модалки "Успешное добавление в корзину"
    $('.js-modal-product-add-cart').on('show.bs.modal', function() {
      // Инициализация слайдера после события
      setTimeout(function() {
        var $rowSliderModal = $('.js-row-slider-modal');
        var $rowSliderModalInit = new Swiper($rowSliderModal, {
          loop: true,
          slidesPerView: 4,
          slidesPerGroup: 4,
          grabCursor: true,
          clickable: false,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: $rowSliderModal.parent().find('.swiper-button-next'),
            prevEl: $rowSliderModal.parent().find('.swiper-button-prev')
          },
          breakpoints: {
            767: {
              slidesPerView: 3,
              slidesPerGroup: 3
            },
            580: {
              slidesPerView: 2,
              slidesPerGroup: 2
            },
            440: {
              slidesPerView: 1,
              slidesPerGroup: 1
            }
          }
        });
      }, 300);
    });

    $('.js-row-slider-right').each(function() {
      var $this = $(this);

      var rowSlidersRight = new Swiper($this, {
        loop: true,
        slidesPerView: 'auto',
        slidesPerGroup: 4,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: $this.parent().find('.swiper-button-next'),
          prevEl: $this.parent().find('.swiper-button-prev')
        },
        breakpoints: {
          1200: {
            slidesPerGroup: 3
          },
          992: {
            slidesPerGroup: 2
          },
          767: {
            slidesPerGroup: 1
          }
        }
      });
    });

    var $sliderRelated = $('.js-product-related');

    var $sliderRelatedControl = $sliderRelated.parent().parent();

    var $sliderRelatedInit = new Swiper('.js-product-related', {
      loop: true,
      slidesPerView: 'auto',
      slidesPerGroup: 4,
      pagination: {
        el: $sliderRelatedControl.find('.swiper-pagination'),
        clickable: true
      },
      navigation: {
        nextEl: $sliderRelatedControl.find('.swiper-button-next'),
        prevEl: $sliderRelatedControl.find('.swiper-button-prev')
      },
      breakpoints: {
        1200: {
          slidesPerGroup: 3
        },
        992: {
          slidesPerGroup: 2
        },
        767: {
          slidesPerGroup: 1
        }
      }
    });

    var mobileSlider;

    $(window).on('resize load', function() {
      if ($(window).width() <= 767) {
        if (mobileSlider) {
          return;
        } else {
          $('.js-mobile-features').each(function() {
            var $this = $(this);

            mobileSlider = new Swiper($this, {
              spaceBetween: 0,
              clickable: false,
              pagination: {
                el: $this.find('.swiper-pagination'),
                clickable: true
              }
            });
          });

          $('.js-mobile-products').each(function() {
            var $this = $(this);

            mobileSlider = new Swiper($this, {
              slidesPerView: 2,
              spaceBetween: 0,
              clickable: false,
              pagination: {
                el: $this.find('.swiper-pagination'),
                clickable: true
              },
              paginationClickable: true,
              breakpoints: {
                480: {
                  slidesPerView: 1
                }
              }
            });
          });

          $('.js-mobile-partners').each(function() {
            var $this = $(this);

            mobileSlider = new Swiper($this, {
              slidesPerView: 4,
              slidesPerColumn: 2,
              spaceBetween: 0,
              onlyExternal: true,
              clickable: false,
              navigation: {
                nextEl: $this.parent().find('.swiper-button-next'),
                prevEl: $this.parent().find('.swiper-button-prev')
              },
              paginationClickable: true,
              breakpoints: {
                560: {
                  slidesPerView: 3
                },
                420: {
                  slidesPerView: 2
                },
                320: {
                  slidesPerView: 1
                }
              }
            });
          });
        }
      } else if (mobileSlider) {
        $('.js-mobile-slider').each(function() {
          this.swiper.destroy(true, true);
        });
        mobileSlider = undefined;
      }
    });

    var productGallery = $('.js-product-gallery');

    var productGalleryInit = new Swiper(productGallery, {
      spaceBetween: 5,
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      simulateTouch: false, allowSwipeToNext: false, allowSwipeToPrev: false,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true
      }
    });

    $('.xzoom-gallery').each(function() {
      $(this).xzoom({lens: '#ffffff', lensOpacity: '0.22', title: true, tintOpacity: '0', Xoffset: 15, scroll: false});
    })
    .parent().magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });

    var productThumbs = $('.js-product-gallery-thumbs');

    var productThumbsInit = new Swiper(productThumbs, {
      spaceBetween: 5,
      slidesPerView: 'auto',
      touchRatio: 0.8,
      navigation: {
        nextEl: '.js-product-gallery-next',
        prevEl: '.js-product-gallery-prev'
      }
    });

    productThumbs.on('mouseover', '.swiper-slide', function() {
      var $this = $(this);

      $this.siblings().removeClass('is-active');
      $this.addClass('is-active');

      productGalleryInit.slideTo($this.index());
    });

    productThumbs.on('click', '.swiper-slide', function() {
      var $slide = productGallery.find('.swiper-slide');
      var $slideActive = productGallery.find('.swiper-slide-active');
      var $videoID = $(this).data('id');
      var $iframe = '<iframe src="https://www.youtube.com/embed/' +
                    $videoID + '?&autoplay=1&loop=1&mude=0&rel=0&wmode=transparent"' +
                    'frameborder="0" allowfullscreen></iframe>';

      $slide.siblings().find('.video-contain')
      .addClass('d-none').find('iframe').remove();

      $slideActive.find('.video-contain')
      .removeClass('d-none').html($iframe);
    });

    $('.js-product-popup').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget);
      var title = button;
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this);
      modal.find('.js-product-title').text(title.text());

      modal.find('.js-btn-buy').on('click', function() {
        if (button.siblings('input').prop('checked') === false) {
          button.prev().trigger('click');
        }
      });
    });

    $('.js-article-video-play').on('click', function(e) {
      e.preventDefault();

      var $videoId = $(this).data('video');
      var $iframePaste = $('.js-main-article-video').attr('src', $videoId + '&autoplay=1');

      return $iframePaste;
    });

    $('.menu-category__list').on('click', 'li', function() {
      var $submenu = $(this).children('ul');

      if ($submenu) {
        $submenu.slideToggle(300);
      }
    });

    $('.js-toggle-show-list').on('click', function() {
      var $this = $(this);
      $this.siblings('.d-none').removeClass('d-none');
      $this.remove();
    });

    $('.js-product-props-toggle').on('click', function() {
      var $this = $(this);
      var $target = $('.js-product-props');

      $this.toggleClass('is-active');

      $target.children('.second').each(function() {
        $(this).toggleClass('d-none');
      });

      $target.children().not('.primary, .second').each(function() {
        $(this).toggleClass('d-flex');
      });

      return false;
    });

    $('.js-sidebarFilter__group-btn').on('click', function() {
      var $this = $(this);
      var $target = $this.parent().find('.collapse');

      $this.toggleClass('is-active');

      $target.slideToggle().toggleClass('is-active');

      return false;
    });

    $('.js-location__select').on('click', 'li', function() {
      var $this = $(this);
      var $value = $this.data('value');
      var $number = $this.data('number');

      $this.data('select', 'select');

      $('.js-location__number').attr('href', 'tel:' + $number.replace(/\s+/g, ''));
      $('.js-location__number').text($number);
      $('.js-location__input span').text($value);
    });

    $('body').on('click', '.js-closed-sidebar', function() {
      $('.js-toggle-sidebar').trigger('click');
    });

    $('.js-toggle-sidebar').on('click', function() {
      var $this = $(this);
      var $contentOffset = $('.sidebar, .blocked');
      var blockedEl = '<div class="blocked pointer js-closed-sidebar"></div>';

      if ($this.hasClass('is-active') === false) {
        $('body').addClass('sidebar-open').append(blockedEl);
        $this.addClass('is-active');
      } else {
        $this.removeClass('is-active');
        $('body').removeClass('sidebar-open').find('.blocked').remove();
      }
      return false;
    });

    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });

    $('.js-input-number').mask("00000000000000");

    $('.js-toggle-grid').on('click', function() {
      var $list = $(this).data('toggle');
      var $item = $('.js-grid-item');
      var $ratingUpdate = $item.find('.js-rating');

      $ratingUpdate.rateYo('destroy');

      $(this).addClass('is-active').parent().siblings()
      .find('.js-toggle-grid').removeClass('is-active');

      if ($list === 'list') {
        $item.addClass('item-list');
        initRaiting($ratingUpdate, '19px');
      } else {
        $item.removeClass('item-list');
        initRaiting($ratingUpdate, '14px');
      }

      return false;
    });

    function initRaiting(el, width) {
      el.rateYo({
        rating: 3.2,
        readOnly: true,
        numStars: 5,
        starWidth: width,
        normalFill: '#d6d6d6',
        ratedFill: '#e89b24'
      });
    }
  });
})();

/**
 * 01.03.2018
 */
$(document).ready(function() {
  var scrollSection = function(e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      scrollTop: $target.offset().top + 2
    }, 800, 'swing');

    window.location.hash = target;
  };

  var $scrollTop = $('.js-scroll-up');

  $(window).scroll(function() {
    var topPos = $(this).scrollTop();

    if (topPos > 500) {
      $scrollTop.addClass('is-active');
    } else {
      $scrollTop.removeClass('is-active');
    }
  });

  $scrollTop.click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

  $('.js-sticky-nav').on('click', 'a', scrollSection);

  $('.js-sticky-nav').on('click', 'a', function() {
    $(this).parent().addClass('is-active')
    .siblings().removeClass('is-active');
  });

  $('.js-toggle-zoom').on('click', function() {
    $(this).parent().toggleClass('is-active');
  });
});
