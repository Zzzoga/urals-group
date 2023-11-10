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

	// PROJECT ACCORDION

	function clearProjects() {
		document.querySelectorAll('a.accordion__btn').forEach(btn => {
			btn.classList.remove('active')
		})
		document.querySelectorAll('.project__item').forEach(project => {
			project.classList.remove('active')
		})
	}
	
	document.querySelectorAll('a.accordion__btn').forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault()
			const btn = e.target
			if (btn.classList.contains('btn__1')) {
				clearProjects()
				btn.classList.add('active')
				document.querySelector('.project__item.project__1').classList.add('active')
				if (document.documentElement.clientWidth < 768) {
					document.querySelector('.accordion__body').style.height = '690px'
				}
			} else if (btn.classList.contains('btn__2')) {
				clearProjects()
				btn.classList.add('active')
				document.querySelector('.project__item.project__2').classList.add('active')
				if (document.documentElement.clientWidth < 768) {
					document.querySelector('.accordion__body').style.height = '520px'
				}
			} else if (btn.classList.contains('btn__3')) {
				clearProjects()
				btn.classList.add('active')
				document.querySelector('.project__item.project__3').classList.add('active')
				if (document.documentElement.clientWidth < 768) {
					document.querySelector('.accordion__body').style.height = '445px'
				}
			}
		})
	})

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



