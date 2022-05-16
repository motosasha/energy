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

	// modals
	const modals = new HystModal({
		linkAttributeName: 'data-hystmodal',
		catchFocus: true,
		closeOnEsc: true,
		afterClose: function(modal){
			console.log('Message after modal has closed');
			console.log(modal);
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
		spaceBetween: 32
	});
	let reviewsSwiper = new Swiper('.reviews__slider', {
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
		spaceBetween: 32
	});
	let reviewsVideoSwiper = new Swiper('.reviews__video-slider', {
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
	});

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

	let projectTabs = document.querySelectorAll('.project .project__tab');
	function theProjectTabClicks(tabClickEvent) {
		let clickedTab = tabClickEvent.currentTarget;
		let tabParent = tabClickEvent.currentTarget.parentNode.parentNode.parentNode;
		let projectTabs = tabParent.querySelectorAll('.project .project__tab');
		for (let i = 0; i < projectTabs.length; i++) {
			projectTabs[i].classList.remove('project__tab_active');
		}
		console.log(tabParent);

		clickedTab.classList.add('project__tab_active');
		tabClickEvent.preventDefault();
		let contentPanes = tabParent.querySelectorAll('.project__item');
		for (let i = 0; i < contentPanes.length; i++) {
			contentPanes[i].classList.remove('project__item_active');
		}
		let anchorReference = tabClickEvent.target;
		let activePaneId = anchorReference.getAttribute('data-href');
		let activePane = tabParent.querySelector(activePaneId);
		activePane.classList.add('project__item_active');
	}
	for (let i = 0; i < projectTabs.length; i++) {
		projectTabs[i].addEventListener("click", theProjectTabClicks)
	}

	// before-after slider
	const viewers = document.querySelectorAll(".image-compare");
	const options = {
		controlColor: "#ffffff",
		controlShadow: false,
		addCircle: true,
		addCircleBlur: true,

		showLabels: true,
		labelOptions: {
			before: 'До ремонта',
			after: 'После ремонта',
			onHover: false
		},

		smoothing: true,
		smoothingAmount: 300,

		hoverStart: false,
		verticalMode: false,
		startingPoint: 50,
		fluidMode: false
	};
	viewers.forEach((element) => {
		let view = new ImageCompare(element, options).mount();
	});
};
