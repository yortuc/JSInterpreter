log("\u{001B}[0;31mwelcome to git explorer\u{001B}[0;0m")

// ask user name
log("enter github username");
var userName = input();

// download github user data
var dataString = download("https://api.github.com/users/"+ userName +"/repos");
var objData = JSON.parse(dataString);

// list repos of user
log(userName + "'s repos (" + objData.length + ")");

objData.forEach(function(repo) {
	log(repo.name);
});