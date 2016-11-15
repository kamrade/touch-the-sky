'use strict';

var $ = jQuery = require('jquery');

var maxLeft = 0;
var maxTop = 0;

module.exports = (function() {

	// cache dom
	var $canva = $(".canva");
	var $elements = $(".element");
	var rect = document.getElementById('canva').getBoundingClientRect()

	$elements.each((index, element)=>{
		var elementWidth = 100;
		var elementHeight = 100;
		console.dir($canva);
		maxLeft = $canva[0].clientWidth - elementWidth;
		maxTop = $canva[0].clientHeight - elementHeight;
		$(".maxLeft").find("span").text(maxLeft);
		$(".maxTop").find("span").text(maxTop);
		var left = getRand(1, maxLeft);
		var top = getRand(1, maxTop);
		$(element).css('left', left);
		$(element).css('top', top);
		$(element).css('background-color', getRandColor());
	});

	$elements.on('mousedown', function(e) {

		var $el = $(this);
		moveTo(e);
		$canva.append($el);
		$el.css("z-index", 100);

		$canva.on("mousemove", moveTo);
		$canva.on("mouseup", unbindAll);

		function moveTo (e) {
			var left = e.pageX - $canva[0].offsetLeft - 50;
			var top = e.pageY - $canva[0].offsetTop -  50;
			// console.log(`${left}, ${top}`);
			if((left > -1) && (top > -1) && (left < maxLeft) && (top < maxTop) ) {
				$el.css("left", left);
				$el.css("top", top);
				console.log(left, top);
			}
		};

		function unbindAll() {
			$canva.off("mousemove");
			$el.off("mouseup");
		};

	});

	return {
		test: 'test'
	};

})();

// FUNCTIONALITY
function getRandColor() {
	return "rgba(" + getRand(0, 255) + "," + getRand(0, 255) + "," + getRand(0, 255) + "," + 1/getRand(1, 10) + ")"
}

function getRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
