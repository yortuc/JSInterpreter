JSInterpreter
=====================

![JSInterpreter](screen.png)

This is an experiment on Swift, JavaScriptCore and out-of-xcode compilation of
Swift and Objective-C projects. 

JSInterpreter is a javascript interpreter which has native functions to create simple applications for command line.

##Native functions
*require(fileName:String) -> JSValue * : imports common.js module and returns the object exposed via module.exports

*input() -> String * : reads from command line and returns the value as a string

*log(text:String)* : prints out to command line

*download(url:String) -> String* : downloads the content of given url

##Compile project
First of all, you need to compile project using swift compiler.

```bash
$ swiftc jsinterpreter.swift -o jsint
```

Then simply run the sample app

```bash
$ jsint app
```

jsinterpeter loads and executes the file which path (without .js extension) is given as first argument.


##Sample App
```js
var lib = require('matlib');		// (1)

log("compute area of a circle");	// (2)
log("enter radius");
var radius = input();				// (3)

log("area = " + lib.circleArea(radius));
```

Three basic functinality demonstrated here. 

1. first, load a module called 'matlib' which cotains  functions we need. 

2. log something to the command line

3. read from command line and assign the user typed value to a variable

##Download contents of url

```js
log("welcome to git explorer");

// ask user name
log("enter github username");
var userName = input();

// download github user data
var dataString = download('https://api.github.com/users/'+ userName +'/repos');

var objData = JSON.parse(dataString);

// list repos of user
log(userName + "'s repos (" + objData.length + ")")
objData.forEach(function(repo) {
	log(repo.name);
});
```

The way *download* function works is synchronous. i plan to add a non-blocking version so a progressbar can be implemented. 

##Roadmap
1. improve require function

	▢ improve to load modules from relative paths

	✓ some commonjs modules cannot be loaded (markdown.js), create actual evaluation of module.exports object. markdown.js works now.

2. expose more native functions

	✓ download contents of url

	▢ $.post

3. improve logging function

	▢ colors, icons etc ... : all tehese commandline specific make-up features can be developed in js. planning to develop a standart library in js.
