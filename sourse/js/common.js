const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			// document.addEventListener('mouseup', (event) => {
			// 	let container = event.target.closest(".menu-mobile--js.active"); // (1)
			// 	if (!container) {
			// 		this.closeMenu();
			// 	}
			// });
			$('.toggle-menu-mobile--js').click(function (){
				this.classList.toggle('active');
			})

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// табы  .
	tabscostume(tab) {

		// let tabs = {
		// 	Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
		// 	BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
		// 	Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		// }
		// tabs.Btn.forEach((element, index) => {
		// 	element.addEventListener('click', () => {
		// 		if (!element.classList.contains('active')) {
		// 			let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
		// 			let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
		// 			siblings.classList.remove('active');
		// 			siblingsContent.classList.remove('active')
		// 			element.classList.add('active');
		// 			tabs.Content[index].classList.add('active');
		// 		}
		// 	})
		// })
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>')

		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$("form").submit(function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear(); 
		}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	//JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	var x = window.location.host;
	let screenName;
	screenName = 'orders.png';
	if (screenName && x === "localhost:3000") {
		$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// /добавляет подложку для pixel perfect


	function whenResize() {
		const topH = $("header ").innerHeight();
		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});
	// modal window

	//luckyone js
	// var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
	// var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
	// 	return new bootstrap.Popover(popoverTriggerEl, {
	// 		template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div><div class="text-center text-primary ttu pb-2">Свободен</div></div>',
	// 		trigger: 'focus',
	// 		placement: 'auto'
	// 	});
	// });

	//top-nav popover
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'))
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl, {
			template:
				'<div class="popover top-nav-popover" role="tooltip">' +
					'<div class="popover-arrow"></div>' +
					'<h3 class="popover-header"></h3>' +
					'<div class="popover-body"></div>' +
					'<div class="popover-bell"><img loading="lazy" src="img/svg/bell.svg" alt=""></div>' +
				'</div>',
		});
	});

	//header block slider
	//
	let banerSliderJs = new Swiper('.baner-slider-js', {
		slidesPerView: 1,
		loop: true,
		//autoplay: 5000,

		breakpoints: {
			0: {
				spaceBetween: 25,
			},
			1200: {
				spaceBetween: 40,
			},
		},

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3,
		},

	});

	let menuSlider = new Swiper('.menu-slider-js', {
		slidesPerView: 'auto',
		loop: true,
		//autoplay: 5000,

		breakpoints: {
			0: {
				spaceBetween: 10,
			},
			992: {
				spaceBetween: 25,
			},
			1500: {
				spaceBetween: 40,
			},
		},

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 18,
		},
		//nav
		navigation: {
			nextEl: '.menu-next--js',
			prevEl: '.menu-prev--js',
		},

	});

	//img-svg
	$('img.img-svg-js').each(function () {
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			} // Remove any invalid XML tags as per http://validator.w3.org


			$svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			} // Replace image with new SVG

			$img.replaceWith($svg);
		}, 'xml');
	});

	//filter sliders
	$(".sKitchen").each(function () {
		let filterSlider = new Swiper($(this).find(".filter-slider-js"), {
			slidesPerView: 'auto',
			//autoplay: 5000,

			breakpoints: {
				0: {
					spaceBetween: 11.63,
				},
				992: {
					spaceBetween: 0,
				},
			},

		});
	});
	//filter links

	$('.filter-slider-js').click(function (){
		let target = event.target;

		if (target.classList.contains('filter-link-js')){
			event.preventDefault();
			target.classList.toggle('active');
		}
	});


	//like slider
	let likeSlider = new Swiper('.like-slider-js', {
		slidesPerView: 'auto',
		loop: true,
		//autoplay: 5000,

		breakpoints: {
			0: {
				spaceBetween: 10,
			},
			992: {
				spaceBetween: 25,
			},
			1200: {
				spaceBetween: 40,
			},
		},

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 18,
		},
		//nav
		navigation: {
			nextEl: '.menu-next--js',
			prevEl: '.menu-prev--js',
		},

	});
	//sub mob-menu  toggle js
	let lvl1ToggleLinks = document.querySelectorAll('.toggle-link-js-lvl-1');
	//let Alllvl2ToggleLinks = document.querySelectorAll('.toggle-link-js-lvl-2');
	$('.menu-mobile--js').click(function (){
		let target = event.target;
		if (target.classList.contains('toggle-link-js-lvl-1')){
			event.preventDefault();

			for (let link of lvl1ToggleLinks){
				if (link === target) {
					toggleSubMenu(link);
				}
				else{
					let lvl2ToggleLinks = link.parentElement.querySelectorAll('.toggle-link-js-lvl-2');
					for (let subLink of lvl2ToggleLinks){
						closeSubMenu(subLink);
					}

					closeSubMenu(link);
				}
			}

		}
		if (target.classList.contains('toggle-link-js-lvl-2')){
			event.preventDefault();
			let lvl2ToggleLinks = target.parentElement.parentElement.querySelectorAll('.toggle-link-js-lvl-2');

			for (let link of lvl2ToggleLinks){
				if (target === link){
					toggleSubMenu(link);
				}
				else{
					closeSubMenu(link);
				}
			}
		}
	});
	function toggleSubMenu(link){
		$(link).toggleClass('active');
		let submenu = link.parentElement.querySelector('.submenu-js');
		$(submenu).slideToggle(function (){
			$(this).toggleClass('active');
		})
	}
	function closeSubMenu(link){
		$(link).removeClass('active');
		let submenu = link.parentElement.querySelector('.submenu-js');
		$(submenu).slideUp(function (){
			$(this).removeClass('active');
		});
	}
	// custom popups

	//profile popup js
	function togglePopUp(qSelector){
		$(qSelector).toggleClass('active');
		document.body.classList.toggle("fixed");
		document.querySelector('html').classList.toggle("fixed");
	}
	function closePopUp(qSelector){
		$(qSelector).removeClass('active');
		document.body.classList.remove("fixed");
		document.querySelector('html').classList.remove("fixed");
	}

	$('.profile-btn-js').click(function (){
		event.preventDefault();
		closePopUp('.cart-pp--js');
		togglePopUp('.profile-pp--js');
	});
	$('.profile-pp--js').click(function (){
		if (!event.target.closest('.profile-pp__container--js')){
			closePopUp('.profile-pp--js');
		}
	});

	//cart popup js
	$('.cart-btn-js').click(function (){
		event.preventDefault();
		closePopUp('.profile-pp--js');
		togglePopUp('.cart-pp--js');
	});
	$('.cart-pp--js').click(function (){
		if (!event.target.closest('.cart-pp__container--js')){
			closePopUp('.cart-pp--js');
		}
	});
	$('.cart-pp__close-btn--js').click(function (){
		closePopUp('.cart-pp--js');
	});

	//04.12.2020
	let tagsSlider = new Swiper('.tags-slider-js', {
		slidesPerView: 'auto',

		breakpoints: {
			0: {
				spaceBetween: 20,
			},
			992: {
				spaceBetween: 0,
			},
		},

	});
	//end 04.12.2020

	//09.12.2020
	$('.search-btn-js').click(function (){
		event.stopPropagation();
		document.removeEventListener('click', SearchPpMissClick);

		$('.SearchBlockWrap').fadeToggle(function (){
			$(this).toggleClass('active');
		})

		document.addEventListener('click', SearchPpMissClick);
	})

	function SearchPpMissClick(){
		if (event.target.closest('.SearchBlockWrap')) return
		$('.SearchBlockWrap').fadeOut(function (){
			$(this).removeClass('active');
		})

		document.removeEventListener('click', SearchPpMissClick);
	}
	//end 09.12.2020

	//end luckyone js
	
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
