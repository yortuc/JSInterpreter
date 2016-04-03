/**********************************
 * Koli Standart Library          *
 **********************************/

/*
promptList:
	promt user to select items from given list
	returns selected object

	title = "What is your favorite text editor?"
	items = [
		{text: "Sublime", value: "sublime", id: 123},
		{text: "Atom", value: "atom": id:45},
		{text: "Emacs", value: "emacs": id: 55},
		{text: "Vim", value: "vim", id: 66}
	]
*/

function promptList(param){

	var indexShift = 1;
	var selectedIndex = null;
	var win = new Box({title: "Question #1"});

	win.log(param.title);
	for(var i=0; i<param.items.length; i++){
		win.log( (i+indexShift).toString() + ". " + param.items[i].text);
	}

	drawObject(win);

	do {
		
		log("please enter the number of your choice:");
		selectedIndex = parseInt(input()) - indexShift;

	} while ( 
		isNaN(selectedIndex) || 
		selectedIndex < 0 ||
		selectedIndex >= param.items.length);

	return param.items[selectedIndex];
}

/**************** GUI ****************/

function Box(opt){
	opt = opt || {};
	this.title = opt.title || "New Box";
	this.autoSize = true;
	this.width = 0;
	this.lines = opt.content || [];

	this.resize();
}

Box.prototype.log = function(text) {
	this.lines.push(text);
	this.resize();
}

Box.prototype.resize = function() {
	this.lines.forEach(function(line){
		if(this.width < line.length) {
			this.width = line.length;
		}
	}.bind(this))
}

Box.prototype.render = function(){
	log("╔" + drawLine(this.width) + "╗");
	log("║" + centerPad(this.title, this.width) + "║");
	log("╠" + drawLine(this.width) + "╣");

	this.lines.forEach(function(line){
		log("║" + leftPad(line, this.width) + "║");
	}.bind(this));

	log("╚" + drawLine(this.width) + "╝");
}

function leftPad (str, width) {
	var left = width - str.length;
	if(left<= 0) return str;
	for(var i=0; i<left; i++){
		str += " ";
	}
	return str;
}

function centerPad(str, width) {
	var left = Math.floor((width - str.length) / 2);
	if(left<=0) return str;
	for(var i=0;i<left;i++){
		str = " " + str;
	}
	var right = width - str.length;
	for(var j=0;j<right;j++){
		str += " ";
	}
	return str;
}

function drawLine(width, character){
	character = character || "═";
	var ret = "";
	for(var i=0; i<width; i++) {
		ret += character;
	}
	return ret;
}

function drawObject(guiObject) {
	if(guiObject.render){
		guiObject.render();	
	} 
}

/********************************/

module.exports = {
	console : {
		promptList: promptList
	},
	gui: {
		Box: Box,
		drawObject: drawObject,
		drawLine: drawLine
	}
}