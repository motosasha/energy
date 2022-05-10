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
	let modals = new HystModal({
		linkAttributeName: 'data-hystmodal',
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
};
