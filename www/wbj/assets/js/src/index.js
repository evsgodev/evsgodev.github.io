window.Dropzone.autoDiscover = false;
import objectFitImages from 'object-fit-images';

objectFitImages();

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  $('html').addClass('is-mobile');
}

import './datepicker';
import './map.js';
import './menu.js';
import './search.js';
import './sticky.js';
import './forms.js';
import './slider-schedule.js';
import './page-slider';
import './tables';
import './video';

$('body').removeClass('page-load');

$('.modal-page').on('show.bs.modal', () => {
  $('html').addClass('modal-open');
})
.on('hidden.bs.modal', () => {
  $('html').removeClass('modal-open');
});
