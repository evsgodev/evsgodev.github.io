import Slideout from 'slideout';

const slideMenu = new Slideout({
  panel: document.getElementById('panel'),
  menu: document.getElementById('menu'),
  padding: 256,
  tolerance: 70
});

const slideMenuToggle = document.querySelector('.js-toggle-menu');
const slidePanels = document.querySelectorAll('.js-slide-panel');

const slideOutPanelFloat = x => {
  slidePanels.forEach(e => {
    e.style.transition = 'transform 300ms ease';
    e.style.transform = `translateX(${x})`;
  });
};

slideMenuToggle.addEventListener('click', () => slideMenu.toggle());

slideMenu.on('beforeopen', function() {
  slideOutPanelFloat('256px');
});

slideMenu.on('beforeclose', function() {
  slideOutPanelFloat('0px');
});

slideMenu.disableTouch();
