
class VideoBlog {
  constructor(
    tabs
  ) {
    this.activeCls = `${tabs}--active`;
    this.tab = document.querySelectorAll('.js-video-tab');
    this.iframe = document.querySelector('.js-video-container iframe');
    this.events();
  }

  events() {
    this.tab.forEach(item => {
      item.addEventListener('click', () => {
        const url = $(item).data('url');

        this.tab.forEach(el => el.classList.remove(this.activeCls));

        item.classList.add(this.activeCls);
        this.iframe.src = url;
      });
    });
  }
}

const franchiseVideo = new VideoBlog('franchise-tab');

export {franchiseVideo};
