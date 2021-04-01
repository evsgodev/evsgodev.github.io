const navbarStycky = $('.js-navbar-sticky').sticky({
  topSpacing: 0,
  zIndex: 10
});

const searchBar = $('.searchbar');
const $modalSearch = $('.modal-search');

$modalSearch.on('shown.bs.modal', function(e) {
  const $modal = $(this);

  $modal.on('scroll', function() {
    const $stickySearch = $('.modal-search__top');
    const $stickySearchWrap = '<div class="modal-search__top-wrap"></div>';
    const $fromTop = $modal.find('.modal-page__header').outerHeight();

    if ($modal.scrollTop() > $fromTop) {
      if ($('.modal-search__top-wrap').length < 1) {
        $stickySearch.wrap($stickySearchWrap);
      }
      $stickySearch
      .addClass('position-fixed').parent()
      .css('height', $stickySearch.height());
    } else {
      $stickySearch.removeClass('position-fixed');
    }
  });
});

// $('.js-aside-banner').stick_in_parent({
//   'offset_top': $('.page-header__navbar').parent().height() + 15,
//   'recalc_every': 1
// });

$('.card-registration').stick_in_parent({
  'offset_top': $('.page-header__navbar').parent().height() + 15
});

searchBar.sticky({
  topSpacing: $('.js-navbar-sticky').height(),
  zIndex: 10
});

navbarStycky.on('sticky-start', () => {
  navbarStycky.parent().addClass('page-header__navbar-wrap');
});

$(window).on('resize', function() {
  navbarStycky.sticky('update');
  searchBar.sticky('update');
});
