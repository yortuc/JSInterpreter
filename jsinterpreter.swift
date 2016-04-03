import Foundation
import JavaScriptCore

let context = JSContext()

var debugLog = false

context.exceptionHandler = { context, exception in
    print("JS Error: \(exception)")
}

let log: @convention(block) String -> Void = { text in
	print("\(text)")
}

let input: @convention(block) Void -> String = {
    let keyboard = NSFileHandle.fileHandleWithStandardInput()
    let inputData = keyboard.availableData
    let inputString = NSString(data: inputData, encoding:NSUTF8StringEncoding) as! String
    let cleanedString = inputString.stringByReplacingOccurrencesOfString("\n", withString: "", options: .RegularExpressionSearch)
    return cleanedString
}

let require: @convention(block) String -> JSValue = { moduleName in
	if debugLog {
		print("loading file \(moduleName)")
	}

	context.evaluateScript("var module = {};")
	context.evaluateScript("module.exports = {};")
	context.evaluateScript("var exports = module.exports;")

	let path = NSBundle.mainBundle().pathForResource(moduleName, ofType: "js")
	let contentData = NSFileManager.defaultManager().contentsAtPath(path!)
	let content = NSString(data: contentData!, encoding: NSUTF8StringEncoding) as? String
	let jsv = context.evaluateScript(content)

	let moduleObject = context.objectForKeyedSubscript("module")
	let moduleExports = moduleObject.valueForProperty("exports")

	return moduleExports
}

let download: @convention(block) String -> String = { url in
	print("downloading \(url)")
	if let data = NSData(contentsOfURL: NSURL(string: url)!) {
		let datastring = NSString(data: data, encoding: NSUTF8StringEncoding) as! String
		return datastring
	}
	else{
		print("data cannot be downloaded")
		return "no-data"
	}
}

context.setObject(unsafeBitCast(require, AnyObject.self), forKeyedSubscript: "require")
context.setObject(unsafeBitCast(log, AnyObject.self), forKeyedSubscript: "log")
context.setObject(unsafeBitCast(input, AnyObject.self), forKeyedSubscript: "input")
context.setObject(unsafeBitCast(download, AnyObject.self), forKeyedSubscript: "download")

print("welcome to js interpreter")

// execute file with agrs
if Process.arguments.count > 1 {
	context.setObject(Process.arguments, forKeyedSubscript: "_args")
	print("running \(Process.arguments[1])")
	require(Process.arguments[1])
}
else {
	// repl 
	while true {
		let jsExpression = input()
		let jsv = context.evaluateScript(jsExpression)
		print("> \(jsv)")
	}
}
