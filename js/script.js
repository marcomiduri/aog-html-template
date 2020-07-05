window.addEventListener('DOMContentLoaded', function () {
	`use strict`;
	//variable declaration
	const navBox = document.querySelector('.navbar'),
		 navIcon = document.querySelector('.nav-icon'),
		 inputBox = document.querySelectorAll('.input_box input'),
		 btnUp = document.createElement('i');
		
	//add new elements
	btnUp.classList.add('btn-up');

	document.body.appendChild(btnUp);

	//active all function
	navIcon.addEventListener('click', toggleMenu);

	btnUp.addEventListener('click', scrollToTop);

	window.addEventListener('resize', resizeDoc);

	window.addEventListener('scroll', scrollDoc);

	navBox.addEventListener('click', function(e){
		if(e.target == this){
			this.classList.toggle('open');
			navIcon.classList.toggle('open');
		}
	})

	for(let i = 0; i < inputBox.length; i++){
		inputBox[i].addEventListener('focus', focusInput);
		inputBox[i].addEventListener('blur', blurInput);
	}

	//all function inner content

	function toggleMenu(){
		this.classList.toggle('open');
		navBox.classList.toggle('open');
		if(navBox.classList.contains('open')){
			document.body.setAttribute('style', 'overflow: hidden')
		}else{
			document.body.removeAttribute('style')
		}	
	}

	function focusInput(e){// input box eventes
		let target = e.target;
		target.closest('.input_box').classList.add('target');

	}

	function blurInput(e){// input box eventes
		let target = e.target;
		if(target.value == ""){
			target.closest('.input_box').classList.remove('target');
		}
	}

	function scrollToTop() {
		var scrollStep = -window.scrollY / (800 / 15),
			scrollInterval = setInterval(function(){
			if ( window.scrollY != 0 ) {
				window.scrollBy( 0, scrollStep );
			}
			else clearInterval(scrollInterval); 
		},15);
	}

	function scrollDoc(){
		if(window.scrollY > 200){
			btnUp.classList.add('show');
		} else{
			btnUp.classList.remove('show');
		}
	}

	function resizeDoc(){//resize document function
		if(document.documentElement.clientWidth > 1100){
			navIcon.classList.remove('open');
			navBox.classList.remove('open');
			document.body.removeAttribute('style')
		}
	}

});
