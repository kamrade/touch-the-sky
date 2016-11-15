'use strict';

var maxLeft = 0;
var maxTop = 0;

module.exports = (function() {

	// CONST
	const elWidth = 100;
	const elHeight = 100;

	// cache dom
	var $canva = document.querySelector(".canva");
	var $elements = document.querySelectorAll(".element");
	var rect = $canva.getBoundingClientRect();
	console.log(rect);

	// вычисленные значения
	var maxLeft = $canva.clientWidth - elWidth;
	var maxTop = $canva.clientHeight - elHeight;
	document.querySelector(".maxLeft span").innerText = maxLeft;
	document.querySelector(".maxTop span").innerText = maxTop;

	for(var i = 0, l = $elements.length; i < l; i++) {
		let left = getRand(1, maxLeft);
		let top  = getRand(1, maxTop);
		$elements[i].style.left = left + "px";
		$elements[i].style.top = top + "px";
		$elements[i].style.backgroundColor = getRandColor();
	}

	$canva.addEventListener('mousedown', function(e) {
		var target;
		if (e.target.className == 'element') {
			target = e.target;
			moveTo(e);
		} else {
			return 0;
		}
		$canva.appendChild(target);
		document.addEventListener('mousemove', moveTo, false)
		document.addEventListener('mouseup', unbindAll);

		function unbindAll () {
			document.removeEventListener('mousemove', moveTo);
			document.removeEventListener('mouseup', unbindAll);
		}

		function moveTo (e) {
			var left = e.pageX - $canva.offsetLeft - 50;
			var top = e.pageY - $canva.offsetTop -  50;
			if((left < -1) && (top > -1) && (top < maxTop)) {
				target.style.left = '0px';
				target.style.top = top + 'px';
			} else if ((top < -1) && (left < maxLeft) && (left > -1))  {
				target.style.left = left + 'px';
				target.style.top = '0px';
			} else if ((left > maxLeft) && (top > -1) && (top < maxTop)) {
				target.style.left = maxLeft + 'px';
				target.style.top = top + 'px';
			} else if ((top > maxTop) && (left > -1) && (left < maxLeft)) {
				target.style.left = left + 'px';
				target.style.top = maxTop + 'px';
			} else if ((left < -1) && (top < -1)) {
				target.style.left = '0px';
				target.style.top = '0px';
			} else if ((left > maxLeft) && (top > maxTop)) {
				target.style.left = maxLeft + 'px';
				target.style.top = maxTop + 'px';
			} else if ((top < -1) && (left > maxLeft)) {
				target.style.left = maxLeft + 'px';
				target.style.top = '0px';
			} else if ((left < -1) && (top > maxTop)) {
				target.style.left = '0px';
				target.style.top = maxTop + 'px';
			} else {
				target.style.left = left + 'px';
				target.style.top = top + 'px';
			}
		};
	}, false);

})();

// FUNCTIONALITY
function getRandColor() {
	var opacity = (getRand(30, 100)*0.01).toString();
	return "rgba(" + getRand(0, 255) + "," + getRand(0, 255) + "," + getRand(0, 255) + "," + opacity + ")"
}

function getRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
