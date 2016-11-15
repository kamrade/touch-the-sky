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
		if (e.target.className == 'element') {
			moveTo(e);
		}
		$canva.appendChild(e.target);
		$canva.addEventListener('mousemove', moveTo, false)
		$canva.addEventListener('mouseup', unbindAll);

		function moveTo (e) {
			var left = e.pageX - $canva.offsetLeft - 50;
			var top = e.pageY - $canva.offsetTop -  50;
			if((left > -1) && (top > -1) && (left < maxLeft) && (top < maxTop) ) {
				e.target.style.left = left + 'px';
				e.target.style.top = top + 'px';
			}
		};
	}, false);

})();
// 		function unbindAll() {
// 			$canva.off("mousemove");
// 			$el.off("mouseup");
// 		};
//
// 	});
//
// 	return {
// 		test: 'test'
// 	};
//
// })();

// FUNCTIONALITY
function getRandColor() {
	return "rgba(" + getRand(0, 255) + "," + getRand(0, 255) + "," + getRand(0, 255) + "," + 1/getRand(1, 10) + ")"
}

function getRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
