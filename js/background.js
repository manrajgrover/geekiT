chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		console.log("message2"+message.newData);
		if(message.method == "setStorage"){
					localStorage.setItem("extdata", message.newData);
					console.log("it worked...partayyy! :D");
				}
});