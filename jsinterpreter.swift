import Foundation
import JavaScriptCore

let context = JSContext()

let log: @convention(block) String -> Void = { text in
	print(">> \(text)")
}

let input: @convention(block) Void -> String = {
    let keyboard = NSFileHandle.fileHandleWithStandardInput()
    let inputData = keyboard.availableData
    return NSString(data: inputData, encoding:NSUTF8StringEncoding) as! String
}

let require: @convention(block) String -> JSValue = { moduleName in
	print("loading file \(moduleName)")

	context.evaluateScript("var module = {};")

	let path = NSBundle.mainBundle().pathForResource(moduleName, ofType: "js")
	let contentData = NSFileManager.defaultManager().contentsAtPath(path!)
	let content = NSString(data: contentData!, encoding: NSUTF8StringEncoding) as? String
	let jsv = context.evaluateScript(content)

	return jsv
}

context.setObject(unsafeBitCast(require, AnyObject.self), forKeyedSubscript: "require")
context.setObject(unsafeBitCast(log, AnyObject.self), forKeyedSubscript: "log")
context.setObject(unsafeBitCast(input, AnyObject.self), forKeyedSubscript: "input")

print("welcome to js interpreter")

// execute file with agrs
if Process.arguments.count > 1 {
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