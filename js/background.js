chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendRequest(tab.id, {method: "getLocalStorage"}, function(response) {
    var myObjectRetrieved = JSON.parse(response.data);
    console.log(myObjectRetrieved);
  });
});


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		console.log("message2"+message.newData);
		if(message.method == "setStorage"){
					localStorage.setItem("extdata", message.newData);
					console.log("it worked...partayyy! :D");
				}
});
/*
// Automatically inject all pages with the content script when the extension
// first installed by the user. Instead of refreshing the page all the time.
// From: http://stackoverflow.com/questions/2399389/chrome-extension-first-run/2401788#2401788
function onInstall() {
  // Install the content script to all opened windows.
  // From: https://github.com/mohamedmansour/reload-all-tabs-extension/blob/master/js/reload_controller.js#L96
  chrome.windows.getAll({ populate: true }, function(windows) {
    for (var w = 0; w < windows.length; w++) {
      var tabs = windows[w].tabs;
      for (var t = 0; t < tabs.length; t++) {
        var tab = tabs[t];
        if (tab.url.indexOf('http') == 0) { // Only inject in web pages.
          chrome.tabs.executeScript(tab.id, { file: 'page.js' });
        }
      }
    }
  });
}
 
function getVersion() {
  var details = chrome.app.getDetails();
  return details.version;
}
 
var currVersion = getVersion();
var prevVersion = localStorage['version']
if (currVersion != prevVersion) {
  // Check if we just installed this extension.
  if (typeof prevVersion == 'undefined') {
    onInstall();
  }
  localStorage['version'] = currVersion;
}*/