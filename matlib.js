
var squareArea = function(c) {
	return c * c;
}

var circleArea = function(r) {
	return Math.PI * Math.pow(r, 2);
}

module.exports = {
	circleArea: circleArea,
	squareArea: squareArea
}