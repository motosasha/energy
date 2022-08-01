'use strict';

let thanks;

window.onload = function() {
	// scrollbar width
	let scrollBarWidth = window.innerWidth - document.body.clientWidth;
	document.documentElement.style.setProperty('--scrollbar-width', scrollBarWidth + 'px');

	// mobile menu
	let $body = document.querySelector('body');
	let $menuTrigger = document.querySelector('.header__menu');
	let $navLinks = document.querySelectorAll('.nav .nav__links-item');
	let $navCallBack = document.querySelector('.nav .connections__callback');
	$menuTrigger.addEventListener('click', function () {
		let bodyState = $body.getAttribute('data-state');
		bodyState === 'open' ? $body.dataset.state = '' : $body.dataset.state = 'open'
	});
	$navCallBack.addEventListener('click', function () {
		$body.dataset.state = ''
	});
	for (let i = 0; i < $navLinks.length; i++) {
		$navLinks[i].addEventListener('click', function () {
			$body.dataset.state = ''
		});
	}

	// embed video
	const players = Plyr.setup('.popup__video');

	// modals
	const modals = new HystModal({
		linkAttributeName: 'data-hystmodal',
		catchFocus: true,
		closeOnEsc: true,
		afterClose: function(modal){
			let videoFrame = modal.openedWindow.querySelector('iframe');
			if(videoFrame){
				videoFrame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
			}
		},
	});
	thanks = function () {
		modals.open('#thanks')
	};

	// input
	let inputs = document.querySelectorAll('input');
	for (let input of inputs) {
		input.addEventListener('input', function() {
			if(this.value.length !== 0) {
				this.classList.add('field__input_has-value');
			}
			else {
				this.classList.remove('field__input_has-value');
			}
		})
	}

	// phone mask
	let phoneFields = document.querySelectorAll('input[type=tel]');
	for (let field of phoneFields) {
		let phoneMask = IMask(field, {
			mask: '+{7} (000) 000-00-00',
		});
	}

	// smooth scroll
	let scroll = new SmoothScroll('a[href*="#"]', {
		speed: 500
	});

	// logo scroll to top
	let logotype = document.querySelector('.header__logotype')
	logotype.addEventListener('click', function(e) {
		e.preventDefault();
		window.scrollTo({top: 0, behavior: 'smooth'});
	})

	// sliders
	let teamSwiper = new Swiper('.team__slider', {
		loop: true,
		navigation: {
			nextEl: '.team__next',
			prevEl: '.team__prev',
		},
		slidesPerView: 'auto',
	});
	let docsSwiper = new Swiper('.docs__slider', {
		lazy: true,
		loop: true,
		navigation: {
			nextEl: '.docs__next',
			prevEl: '.docs__prev',
		},
		breakpoints: {
			992: {
				slidesPerView: 3,
				spaceBetween: 32
			},
			767: {
				slidesPerView: 2,
				spaceBetween: 32
			},
		},
		slidesPerView: 1,
		spaceBetween: 32,
		watchSlidesProgress: true,
	});
	let reviewsSwiper = new Swiper('.reviews__slider', {
		lazy: true,
		loop: true,
		navigation: {
			nextEl: '.reviews__next',
			prevEl: '.reviews__prev',
		},
		breakpoints: {
			992: {
				slidesPerView: 4,
				spaceBetween: 32
			},
			767: {
				slidesPerView: 2,
				spaceBetween: 32
			},
		},
		slidesPerView: 1,
		spaceBetween: 32,
		watchSlidesProgress: true,
	});
	/*let reviewsVideoSwiper = new Swiper('.reviews__video-slider', {
		navigation: {
			nextEl: '.reviews__video-next',
			prevEl: '.reviews__video-prev',
		},
		breakpoints: {
			767: {
				slidesPerView: 2,
				spaceBetween: 32
			},
		},
		slidesPerView: 1,
		spaceBetween: 32
	});*/

	// works
	let tabLabels = document.querySelectorAll('.works__tabs-head .works__tab');
	let tabPanes = document.querySelectorAll('.works__tabs-content');
	function activateTab(e) {
		e.preventDefault();
		tabLabels.forEach(function(label, index){
			label.classList.remove('works__tab_active');
		});
		[].forEach.call(tabPanes, function(pane, index){
			pane.classList.remove('works__tabs-content_active');
		});
		e.target.classList.add('works__tab_active');
		let clickedTab = e.target.getAttribute('data-href');
		document.querySelector(clickedTab).classList.add('works__tabs-content_active');
	}
	tabLabels.forEach(function(label, index){
		label.addEventListener("click", activateTab);
	});

	let projectsTabs = document.querySelectorAll('.project-tabs .project-tabs__tab');
	function theTabClicks(tabClickEvent) {
		let clickedTab = tabClickEvent.currentTarget;
		let tabParent = tabClickEvent.currentTarget.parentNode.parentNode.parentNode.parentNode;
		let projectsTabs = tabParent.querySelectorAll('.project-tabs .project-tabs__tab');
		for (let i = 0; i < projectsTabs.length; i++) {
			projectsTabs[i].classList.remove('project-tabs__tab_active');
		}

		clickedTab.classList.add('project-tabs__tab_active');
		tabClickEvent.preventDefault();
		let contentPanes = tabParent.querySelectorAll('.project-tabs__tabs-content');
		for (let i = 0; i < contentPanes.length; i++) {
			contentPanes[i].classList.remove('project-tabs__tabs-content_active');
		}
		let anchorReference = tabClickEvent.target;
		let activePaneId = anchorReference.getAttribute('data-href');
		let activePane = tabParent.querySelector(activePaneId);
		activePane.classList.add('project-tabs__tabs-content_active');
	}
	for (let i = 0; i < projectsTabs.length; i++) {
		projectsTabs[i].addEventListener("click", theTabClicks)
	}

	let projectSliders = document.querySelectorAll('.project__tabs');
	for (let i = 0; i < projectSliders.length; i++) {
		let projectSlider = projectSliders[i].querySelector('.project-slider');
		let projectThumbs = projectSliders[i].querySelector('.project-thumbs');

		let thumbsInstance = new Swiper(projectThumbs, {
			lazy: true,
			centeredSlides: true,
			slidesPerView: 7,
			spaceBetween: 4,
			slideToClickedSlide: true,
			navigation: {
				nextEl: '.project-thumbs__next',
				prevEl: '.project-thumbs__prev',
			},
			watchSlidesProgress: true,
		});
		let sliderInstance = new Swiper(projectSlider, {
			lazy: true,
			spaceBetween: 10,
			navigation: {
				nextEl: '.project-slider__next',
				prevEl: '.project-slider__prev',
			},
			thumbs: {
				swiper: thumbsInstance
			},
			watchSlidesProgress: true,
		});
		sliderInstance.on('activeIndexChange', function () {
			thumbsInstance.slideTo(sliderInstance.activeIndex);
		});
		thumbsInstance.on('activeIndexChange', function () {
			sliderInstance.slideTo(thumbsInstance.activeIndex);
		});
	}

	// ranges
	function makeSliderLink(range, input) {
		range.noUiSlider.on('update', function (values, handle) {
			let rangeVal = values[handle];
			input.value = Math.floor(rangeVal)
		});
		input.addEventListener('change', function (e) {
			range.noUiSlider.set(this.value);
		});
		input.addEventListener('keypress', function(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				range.noUiSlider.set(this.value);
			}
		});
	}
	let areaInput = document.querySelector('#input-area');
	let areaRange = document.querySelector('.calc__range_area');
	let areaOptions = {
		start: 125,
		connect: 'lower',
		padding: 20,
		range: {
			'min': -10,
			'max': 520
		},
		step: 1,
		tooltips: wNumb({
			decimals: 0,
			postfix: ' м²'
		}),
		pips: {
			mode: 'values',
			density: 5,
			values: [10, 125, 250, 375, 500],
			format: wNumb({
				decimals: 0,
			})
		}
	}
	let roomsInput = document.querySelector('#input-rooms');
	let roomsRange = document.querySelector('.calc__range_rooms');
	let roomsOptions = {
		start: 3,
		connect: 'lower',
		padding: 1,
		range: {
			'min': 0,
			'max': 11
		},
		step: 1,
		tooltips: wNumb({
			decimals: 0,
			postfix: ' к'
		}),
		pips: {
			mode: 'values',
			density: 10,
			values: [1, 5, 10],
			format: wNumb({
				decimals: 0,
			})
		}
	}
	let bathroomsInput = document.querySelector('#input-bathrooms');
	let bathroomsRange = document.querySelector('.calc__range_bathrooms');
	let bathroomsOptions = {
		start: 1,
		connect: 'lower',
		padding: 1,
		range: {
			'min': 0,
			'max': 6
		},
		step: 1,
		tooltips: wNumb({
			decimals: 0,
			postfix: ' су'
		}),
		pips: {
			mode: 'values',
			density: 20,
			values: [1, 2, 3, 4, 5],
			format: wNumb({
				decimals: 0,
			})
		}
	}
	noUiSlider.create(areaRange, areaOptions);
	noUiSlider.create(roomsRange, roomsOptions);
	noUiSlider.create(bathroomsRange, bathroomsOptions);
	makeSliderLink(areaRange, areaInput);
	makeSliderLink(roomsRange, roomsInput);
	makeSliderLink(bathroomsRange, bathroomsInput);

	// calc form
	let calcForm = document.querySelector('#calc-form');
	let steps = document.querySelectorAll('.calc__step');
	let nextSteps = document.querySelectorAll('.calc__button[data-step="next"]');
	let prevSteps = document.querySelectorAll('.calc__button[data-step="prev"]');
	let currentStep = 0;
	let calcSection = document.querySelector('#calc');
	function stepDirection(direction) {
		for(let i = 0; i < steps.length; i++) {
			steps[i].classList.remove('calc__step_active')
		}
		if(direction === 'next') ++currentStep;
		if(direction === 'prev') --currentStep;
		steps[currentStep].classList.add('calc__step_active')
		calcSection.scrollIntoView({behavior: "smooth"})
	}
	function makeStep(trigger, direction) {
		for (let step of trigger) {
			step.addEventListener('click', function () {
				stepDirection(direction);
			})
		}
	}
	makeStep(nextSteps, 'next')
	makeStep(prevSteps, 'prev')
	const ajaxSend = async (formData) => {
		// change 'https://reqres.in/api/users
		const fetchResp = await fetch('https://reqres.in/api/users', {
			method: 'POST',
			//body: formData
			body: {
				"name": "test"
			}
		});
		if (!fetchResp.ok) {
			throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
		}
		return await fetchResp.text();
	};
	calcForm.addEventListener('submit', function (e) {
		e.preventDefault();
		const formData = new FormData(this);
		ajaxSend(formData)
			.then((response) => {
				console.log(response);
				stepDirection('next');
				calcForm.reset();
			})
			.catch((err) => console.error(err))
	});

	// lightbox
	const lightbox = GLightbox({
		selector: '.project__link',
		touchNavigation: true
	});
	const lightbox2 = GLightbox({
		selector: '.docs__link',
		touchNavigation: true,
		loop: true
	});
	const lightbox3 = GLightbox({
		selector: '.reviews__link',
		touchNavigation: true,
		loop: true
	});
};
