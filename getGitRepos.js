
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