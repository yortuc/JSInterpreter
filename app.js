var std = require('std');

var favoriteEditor = std.console.promptList({
	title: "Please select your favorite text editor ",
	items: [
		{text: "Sublime" },
		{text: "Atom" },
		{text: "Emacs" },
		{text: "Vim" }
	]
});

std.gui.drawObject(
	new Box({
		title: "Answer",
		content: ["favorite editor is " + favoriteEditor.text]
	})
);

/*
var lib = require('matlib');



log("Compute area of a circle");
log("enter radius");
var radius = input();

log("area = " + lib.circleArea(radius));*/