import { lifestyle, music, photodiary } from './template/index.js';

// PAGES RENDER
class HTMLWrapper {
  element() {
    return document.getElementById('wrapper');
  }
}

class Page extends HTMLWrapper {
  constructor(html) {
    super();
    this.html = html;
  }

  render() {
    const element = super.element();
    element.innerHTML = '';
    element.insertAdjacentHTML('beforeend', this.html);
  }
}

// ROUTER
const PAGES = {
  '/': new Page(lifestyle),
  '/music': new Page(music),
  '/photodiary': new Page(photodiary),
};

class Router {
  constructor() {
    this.pathname = window.location.pathname;
    this.init();
  }

  changeRoute(pathname) {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    PAGES[pathname].render();
  }

  init() {
    window.addEventListener('load', () => {
      PAGES[this.pathname].render();
    });
  }
}

class Links extends Router {
  constructor(link) {
    super();

    this.links = document.querySelectorAll(link);
    this.event();
  }

  event() {
    this.links.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        super.changeRoute(event.target.pathname);
      });
    });
  }
}

new Links('.nav__links');
