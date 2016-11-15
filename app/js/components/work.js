'use strict';

var $ = jQuery = require('jquery');

module.exports = (function() {

	// cache dom
	var $canva = $(".canva");
	var rect = document.getElementById('canva').getBoundingClientRect()
	console.log(rect);

	$('.element').each((index, element)=>{
		var elementWidth = 100;
		var elementHeight = 100;
		var maxLeft = $canva.width() - elementWidth;
		var maxTop = $canva.height() - elementHeight;
		var left = getRand(1, maxLeft);
		var top = getRand(1, maxTop);
		$(element).css('left', left);
		$(element).css('top', top);
		$(element).css('background-color', getRandColor());
	});

	$canva.on('click', function(e) {
		console.dir(e.clientX);
		console.dir(e.clientY);
		console.dir($canva);
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
