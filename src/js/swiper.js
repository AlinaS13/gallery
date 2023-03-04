import Swiper, { Scrollbar, Controller, EffectFade } from 'swiper';

const pageSlider = new Swiper('.slider', {
  modules: [Scrollbar, Controller],
  direction: 'horizontal',
  loop: true,
  grabCursor: true,

  speed: 1000,
  scrollbar: {
    el: '.slider__scrollbar',
    draggable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      centeredSlides: false,
    },
    992: {
      slidesPerView: 2,
      centeredSlides: true,
    },
  },
});

const page = document.querySelector('.page');
const images = document.querySelectorAll('.slide__picture');

if (images.length) {
  let backgroundSlides = ``;
  let textSlides = ``;

  images.forEach(image => {
    backgroundSlides += `
  <div class="background__slide swiper-slide">
  <div class="background__image">
  <img src="${image.getAttribute('src')}" alt="${image.alt}"/>
  </div>
  </div>
   `;
    textSlides += `
  <div class="text__slide swiper-slide">
  <span>${image.dataset.title ? image.dataset.title : ''}</span >
  </div>
  `;
  });

  const background = `
<div class =" background swiper">
<div class =" background__wrapper swiper-wrapper">
${backgroundSlides}
</div>
</div>
`;
  const text = `
<div class ="text swiper">
<div class ="text__wrapper swiper-wrapper">
${textSlides}
</div>
</div>
`;

  page.insertAdjacentHTML('afterbegin', background);
  page.insertAdjacentHTML('beforeend', text);

  const pageBgSlider = new Swiper('.background', {
    modules: [Scrollbar, Controller],
    speed: 500,
  });
  const pageTextSlider = new Swiper('.text', {
    modules: [Scrollbar, Controller, EffectFade],
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
  });

  pageSlider.controller.control = pageBgSlider;
  pageBgSlider.controller.control = pageTextSlider;
}