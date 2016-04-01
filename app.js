var lib = require('matlib');

log("Compute area of a circle");
log("enter radius");
var radius = input();

log("area = " + lib.circleArea(radius));