/***********************
 Отправка формы в php BEGIN
 ***********************/
$(function () {
	$(".ajax-form").on("submit", function (event) {
		var form = $(this);
		var send = true;
		event.preventDefault();

		$(this).find("[data-req='true']").each(function () {
			if ($(this).val() === "") {
				$(this).addClass('error');
				send = false;
			}
			if ($(this).is('select')) {
				if ($(this).val() === null) {
					$(this).addClass('error');
					send = false;
				}
			}
			if ($(this).is('input[type="checkbox"]')) {
				if ($(this).prop('checked') !== true) {
					$(this).addClass('error');
					send = false;
				}
			}
			if ($(this).is('input[type="tel"]')) {
				console.log($(this).cleanVal().length);
				if ($(this).cleanVal().length < 10) {
					$(this).addClass('error');
					send = false;
				}
			}
		});

		$(this).find("[data-req='true']").on('focus', function () {
			$(this).removeClass('error');
		});

		// empty file inputs fix for mac
		var fileInputs = $('input[type="file"]:not([disabled])', form);
		fileInputs.each(function (_, input) {
			if (input.files.length > 0) return;
			$(input).prop('disabled', true)
		});

		var form_data = new FormData(this);

		fileInputs.prop('disabled', false);

		$("[data-label]").each(function () {
			var input_name = $(this).attr('name');
			var input_label__name = input_name + '_label';
			var input_label__value = $(this).data('label').toString();
			form_data.append(input_label__name, input_label__value)
		});

		if (send === true) {
			$.ajax({
				type: "POST",
				async: true,
				url: "/send.php",
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,
				success: (function (result) {
					console.log(result);
					$.fancybox.close();
					if (result.indexOf("Mail FAIL") !== -1) {
						$.fancybox.open({src: '#modal-error'});
					} else {
						$.fancybox.open({src: '#modal-thanks'});
						setTimeout(function () {
							$.fancybox.close();
						}, 4500);
						form[0].reset();
					}
				})
			});
		}
	});
});
/***********************
 Отправка формы в php END
 ***********************/


/***********************
 Input mask BEGIN
 ***********************/
$(function () {
	$("input[type='tel']").mask("+7 (000) 000-00-00");
});
/***********************
 Input mask END
 ***********************/


/***********************
 fancybox BEGIN
 ***********************/
$.fancybox.defaults.backFocus = false;
$.fancybox.defaults.lang = 'ru';
$.fancybox.defaults.i18n =
	{
		'ru': {
			CLOSE: 'Закрыть',
			NEXT: 'Дальше',
			PREV: 'Назад',
			ERROR: 'Не удается загрузить. <br/> Попробуйте позднее.',
			PLAY_START: 'Начать слайдшоу',
			PLAY_STOP: 'Остановить слайдшоу',
			FULL_SCREEN: 'На весь экран',
			THUMBS: 'Превью'
		}
	};

function init_fancy() {
	$().fancybox({
		selector: '.fancy',
		buttons: ['close']
	});
	$().fancybox({
		selector: '.fancy-modal',
		touch: false
	});
	$().fancybox({
		selector: '.fancy-map',
		toolbar: false,
		smallBtn: true,
		defaultType: "iframe"
	});
}

function init_fancy__video() {
	$().fancybox({
		selector: '.fancy-video',
		toolbar: false,
		smallBtn: true,
		youtube: {
			controls: 1,
			showinfo: 0,
			autoplay: 1
		}
	});
}

$(function () {
	init_fancy();
	init_fancy__video();
});
/***********************
 fancybox END
 ***********************/


/***********************
 Прокрутка к секциям BEGIN
 ***********************/
$(function () {
	$('.scrollto').on('click', function () {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html,body').stop().animate({scrollTop: destination}, 1000);
		return false;
	});
});
/***********************
 Прокрутка к секциям END
 ***********************/


/***********************
 Waypoints BEGIN
 ***********************/
$(function () {
	$('.anim').waypoint(function () {
		$(this.element).toggleClass('animated');
	}, {
		offset: '85%'
	});

	$(window).on('scroll',function () {
		if ($(this).scrollTop() > 40){
			$('.header-sec').addClass('active');
		} else {
			$('.header-sec').removeClass('active');
		}

		if ($(this).scrollTop() > 1040){
			$('.big-head__circle').addClass('stop-anim');
		} else {
			$('.big-head__circle').removeClass('stop-anim');
		}
	});
});
/***********************
 Waypoints END
 ***********************/


/***********************
 Mobile menu BEGIN
 ***********************/
$(function(){
	$('.hamburger').on('click',function (e) {
		$(this).toggleClass('is-active');
		$('.mobile-menu-wrap').toggleClass('opened');
	});

	$(document).on('click touchstart',function (e) {
		var div = $(".hamburger,.mobile-menu-wrap");
		if (!div.is(e.target) && div.has(e.target).length === 0){
			$('.hamburger').removeClass('is-active');
			$('.mobile-menu-wrap').removeClass('opened');
		}
	});
});
/***********************
 Mobile menu END
 ***********************/


/***********************
 Link anchors BEGIN
 ***********************/
$(function($){

	$('.header__menu a').each(function () {
		var target = $(this).attr('href');
		$(target).addClass('__nav-section');
	});

	$(window).scroll(function() {
		var w_scroll = $(window).scrollTop();
		var w_height = $(window).height();
		$('.header__menu li').removeClass('active');
		$('.__nav-section').each(function() {
			var section_top = $(this).offset().top;
			var section_h = $(this).outerHeight();

			if ((w_scroll >= section_top-w_height/2) && (w_scroll < section_top + section_h-80)){
				var section_index = $(this).index('.__nav-section');
				$('.header__menu li').eq(section_index).addClass('active');
			}
		});
	});

});
/***********************
 Link anchors END
 ***********************/


/***********************
FullPage BEGIN
***********************/
// $(function($){
// 	$('#fullpage').fullpage({
// 		//options here
// 		autoScrolling:true,
// 		scrollHorizontally: true
// 	});
//
// 	//methods
// 	$.fn.fullpage.setAllowScrolling(false);
// });
/***********************
FullPage END
***********************/


/***********************
Flickity BEGIN
***********************/
function resultSliderInit(){
	$('.result__slider').flickity({
		// options
		cellAlign: 'left',
		pageDots: false,
		contain: true,
		adaptiveHeight: true,
		arrowShape: {
			x0: 25,
			x1: 55, y1: 35,
			x2: 60, y2: 30,
			x3: 35
		}
	});
}

$(function($){
	// Flickity options, defaults
	var aboutSertOptions = {
		cellAlign: 'center',
		wrapAround: true,
		pageDots: false,
		adaptiveHeight: true,
		arrowShape: {
			x0: 25,
			x1: 60, y1: 35,
			x2: 70, y2: 35,
			x3: 35
		}
	};
	// disable prev/next buttons at 680px
	if ( matchMedia('screen and (max-width: 680px)').matches ) {
		aboutSertOptions.contain = true;
		aboutSertOptions.cellAlign = 'left';
		aboutSertOptions.prevNextButtons = false;
	}
	$('.about__serts').flickity(aboutSertOptions);

	function problemSliderInit() {
		$('.problems__slider').flickity({
			prevNextButtons: false,
			pageDots: false,
			contain: true,
			draggable: false,
			selectedAttraction: 1,
			friction: 1
		});
		// 2nd carousel, navigation
		$('.problems__nav').flickity({
			asNavFor: '.problems__slider',
			contain: true,
			pageDots: false,
			draggable: false,
			prevNextButtons: false
		});
	}

	if($(window).width() > 768) {
		problemSliderInit();
	}
	$( window ).resize(function() {
		if($(window).width() > 768) {
			problemSliderInit();
		}
	});

	resultSliderInit();
});
/***********************
Flickity END
***********************/


/***********************
Result Nav BEGIN
***********************/
$(function($){
	$('.result__nav a').on('click', function (e) {
		e.preventDefault();
		$('.result__slider-wrap .result__slider').removeClass('active');
		$('.result__nav a').removeClass('active');

		$(this).addClass('active');
		$('.result__slider-wrap').find($(this).attr('href')).addClass('active');

		$('.result__slider').flickity('resize')
	});
});
/***********************
Result Nav END
***********************/


/***********************
Preims BEGIN
***********************/
$(function($){
	$('.benefits__slider').flickity({
		pageDots: false,
		contain: true,
		adaptiveHeight: true,
		arrowShape: {
			x0: 25,
			x1: 60, y1: 35,
			x2: 70, y2: 35,
			x3: 35
		}
	});
});
/***********************
Preims END
***********************/


/***********************
 Steps Slider BEGIN
 ***********************/
$(function($){
	var stepsSlider = $('.steps__slider');
	stepsSlider.flickity({
		//pageDots: false,
		contain: true,
		adaptiveHeight: true,
		prevNextButtons: false
	});

	var flkty = stepsSlider.data('flickity');
	var stepsDots = $('.steps__slider .dot');

	stepsSlider.on( 'select.flickity', function() {
		var index = flkty.selectedIndex;
		var this_dot = stepsDots.eq(index);
		this_dot.prevAll('.dot').addClass('active');
		this_dot.nextAll('.dot').removeClass('active');
	});
});
/***********************
 Steps Slider END
 ***********************/


/***********************
 Steps Slider BEGIN
 ***********************/
$(function($){
	var reviewsSlider = $('.reviews__slider');
	reviewsSlider.flickity({
		pageDots: false,
		//contain: true,
		//wrapAround: true,
		adaptiveHeight: true,
		arrowShape: {
			x0: 25,
			x1: 60, y1: 35,
			x2: 70, y2: 35,
			x3: 35
		}
	});

	var flkty = reviewsSlider.data('flickity');

	if($(window).width() > 680) {
		reviewsSlider.flickity( 'select', 2 );
		$('.reviews__slide').eq(0).addClass('first');
		$('.reviews__slide').eq(1).addClass('prev');
		$('.reviews__slide').eq(3).addClass('next');
		$('.reviews__slide').eq(4).addClass('last');
	}

	reviewsSlider.on( 'select.flickity', function() {
		var index = flkty.selectedIndex;
		var thisSlide = $('.reviews__slide.is-selected');
		var slide = $('.reviews__slide');
		if(index == 0) {
			// 1 slide active
			thisSlide.removeClass('prev next last first');
			slide.removeClass('prev next last first');
			thisSlide.next('.reviews__slide').addClass('next');
			slide.last().addClass('prev');
			slide.eq(2).addClass('last');
			slide.eq(slide.length - 2).addClass('first');
		} else if (index == slide.length - 1) {
			// last slide
			thisSlide.removeClass('prev next last first');
			slide.removeClass('prev next last first');
			thisSlide.prev('.reviews__slide').addClass('prev');
			slide.first().addClass('next');
			slide.eq(index - 2).addClass('first');
			slide.eq(1).addClass('last');
			console.log('last slide active');
		} else {
			thisSlide.removeClass('prev next last first');
			slide.removeClass('prev next last first');
			thisSlide.prev('.reviews__slide').addClass('prev');
			thisSlide.next('.reviews__slide').addClass('next');
			slide.eq( index + 2).addClass('last');
			slide.eq( index - 2).addClass('first');
		}
	});
});
/***********************
 Steps Slider END
 ***********************/


/***********************
Team quote BEGIN
***********************/
$(document).ready(function() {
	$('.team__item-quote').slideUp();
	var $teamList = $('.team__list');

	$('.team__item-more').on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		var $otherItems = $teamList.find('.team__item-more').not($this).closest('.team__item');

		$otherItems.find('.team__item-quote').slideUp();
		$otherItems.find('.team__item-quote-wrap').removeClass('active');
		$otherItems.find('.team__item-more').text('Подробнее');

		$(this).closest('.team__item-quote-wrap').toggleClass('active');
		$(this).prev('.team__item-quote').slideToggle().toggleClass('active');

		if($this.text() == 'Подробнее') {
			$this.text('Свернуть');
		} else {
			$this.text('Подробнее');
		}
	})
});
/***********************
Team quote END
***********************/


/**************************************************
 Google Maps
 ***************************************************/
$(document).ready(function(){
	if ($('#googlemap').length) {

		google.maps.event.addDomListener(window, 'load', initMap);

		function initMap() {
			var mapOptions = {
				zoom: 16,
				scrollwheel: false,
				zoomControlOptions: {
					position: google.maps.ControlPosition.LEFT_CENTER
				},
				mapTypeControl: false,
				center: new google.maps.LatLng(59.903319, 30.313501)
			};

			var mapElement = document.getElementById('googlemap');

			var map = new google.maps.Map(mapElement, mapOptions);

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(59.903319, 30.313501),
				map: map,
				title: '121170, г. Москва, ул. Неверовского, д. 10, стр. 3А (м. Парк Победы)',
				icon: '/img/contact/buble.png'
			});
		}
		initMap();

	}
});
/**************************************************
 End Google Maps
 ***************************************************/