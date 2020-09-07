import * as $ from 'jquery';
import 'slick-carousel';
import {WOW} from 'wowjs';
import icNext from './img/agents/ic-next.png';
import icPrev from './img/agents/ic-prev.png';
import './styles/styles.scss';

$('#menu-btn').on('click', function () {
  $('#menu-btn').toggleClass('active');
  $('#menu').toggleClass('active');

  if ($('body').css('overflow') === 'hidden') {
    $('body').css({overflow: 'visible'});
  } else if ($('body').css('overflow') === 'visible') {
    $('body').css({overflow: 'hidden'});
  }
});

$(window).scroll(function () {
  var $item = $('.menu__list');
  $item.each(function (_, el) {
    var top = $(el).offset().top; //+ 150;
    var bottom = top + $(el).height();
    var scroll = $(window).scrollTop();
    var id = $(el).attr('id');
    if (scroll > top && scroll < bottom) {
      $('a.active').removeClass('active');
      $('a[href="#' + id + '"]').addClass('active');
    }
  });
});

$('.menu').on('click', 'a', function (event) {
  event.preventDefault();

  var id = $(this).attr('href'),
    top = $(id).offset().top;

  $('.menu-btn').removeClass('active');
  $('.header__menu').removeClass('active');

  if ($('body').css('overflow') === 'hidden') {
    $('body').css({overflow: 'visible'});
  }

  $('body,html').animate({scrollTop: top}, 800);
});

function animate() {
  $('.number-item__img_number').each(function () {
    $(this)
      .prop('Counter', 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 2500,
          easing: 'swing',
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });
}

$('.agents__slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  speed: 300,
  nextArrow: `<img class="slider-arrows slider-arrows__right" src="${icNext}" alt="">`,
  prevArrow: `<img class="slider-arrows slider-arrows__left" src="${icPrev}" alt="">`,
  responsive: [
    {
      breakpoint: 1030,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

const wow = new WOW({
  boxClass: 'wow',
  animateClass: 'animated',
  offset: 100,
  mobile: true,
  live: true,
  callback: function (box) {
    if (box.classList[0] === 'statistics') {
      animate();
    }
  },
});
wow.init();
