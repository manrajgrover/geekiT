chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.method == "setStorage") {
    localStorage.setItem("extdata", message.newData);
  }
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.method == "setBookmark") {
    localStorage.setItem("bookmark", message.newData);
  }
});
