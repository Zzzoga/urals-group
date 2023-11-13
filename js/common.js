document.addEventListener('DOMContentLoaded', () => {

	function maskPhone(selector, masked = '+7 (___) ___-__-__') {
		const elems = document.querySelectorAll(selector);
	
		function mask(event) {
			const keyCode = event.keyCode;
			const template = masked,
				def = template.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, "");
			let i = 0,
				newValue = template.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
				});
			i = newValue.indexOf("_");
			if (i !== -1) {
				newValue = newValue.slice(0, i);
			}
			let reg = template.substr(0, this.value.length).replace(/_+/g,
				function (a) {
					return "\\d{1," + a.length + "}";
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
				this.value = newValue;
			}
			if (event.type === "blur" && this.value.length < 5) {
				this.value = "";
			}
	
		}
	
		for (const elem of elems) {
			elem.addEventListener("input", mask);
			elem.addEventListener("focus", mask);
			elem.addEventListener("blur", mask);
		}
		
	}
	
	maskPhone('input[type="tel"]')

	// MODAL FUNCTION

	document.querySelectorAll('a.btn').forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault()
			document.querySelector('.modal__container').classList.add('active')
			document.querySelector('body').style.overflowY = 'hidden'
		})
	})
	
	document.querySelector('.modal__close').addEventListener('click', e => {
		e.preventDefault()
		document.querySelector('.modal__container').classList.remove('active')
		document.querySelector('body').style.overflowY = 'visible'
	})
	
	document.querySelector('.modal__overlay').addEventListener('click', e => {
		e.preventDefault()
		document.querySelector('.modal__container').classList.remove('active')
		document.querySelector('body').style.overflowY = 'visible'
	})

	// SWIPER

	var swiper = new Swiper(".top__screen__slider", {
		autoplay: {
		  delay: 10000,
		  disableOnInteraction: false,
		}
	});

	var swiper1 = new Swiper(".project__img", {
		navigation: {
			nextEl: ".arrow__next",
			prevEl: ".arrow__prev",
		},
	});

	var swiper2 = new Swiper(".project__info", {
		spaceBetween: 60,
	});

	const swipeAllSliders = (index) => {
		swiper1.slideTo(index);
		swiper2.slideTo(index);
	}
	  
	swiper1.on('slideChange', () => swipeAllSliders(swiper1.activeIndex));
	swiper2.on('slideChange', () => swipeAllSliders(swiper2.activeIndex));

	// NAV 

	document.querySelector('.mobile__menu').addEventListener('click', e => {
		e.preventDefault()
		if (e.target.textContent == 'Меню') {
			e.target.innerHTML = 'Закрыть'
			e.target.classList.add('active')
			document.querySelector('.nav__container').classList.add('active')
		} else if (e.target.textContent == 'Закрыть') {
			e.target.classList.remove('active')
			document.querySelector('.nav__container').classList.remove('active')
			e.target.innerHTML = 'Меню'
		}
	})

	document.querySelectorAll('a.nav__link').forEach(btn => {
		btn.addEventListener('click', e => {
			document.querySelector('.mobile__menu').classList.remove('active')
			document.querySelector('.nav__container').classList.remove('active')
			document.querySelector('.mobile__menu').innerHTML = 'Меню'
		})
	})

	// SMOOTH SCROLL

	// Smooth scroll when link clicked
	const $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 800);
		return false;
	});

})



