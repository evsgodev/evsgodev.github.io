const siteSearch = () => {
  const $modalSearch = $('#modalSearch');
  const $modalSearchInput = $modalSearch.find('input[type="search"]');

  $modalSearch.on('shown.bs.modal', () => {
    $modalSearchInput.focus();
  });

  $modalSearch.on('shown.bs.modal', () => {
    $('html').addClass('modal-open');
  });

  $modalSearch.on('hidden.bs.modal', () => {
    $('html').removeClass('modal-open');

    $modalSearchInput.focus();
  });
};

siteSearch();
