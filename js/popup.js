$(document).ready(function() {
        console.log("here");
		$("#links").css("color","black");
		$("#analyze").css("color","lightgrey");
		console.log("message1"+localStorage.getItem("extdata"));
		if (typeof localStorage['extdata'] == 'undefined') {
			var list = [];
			console.log("creating storage");
			localStorage.setItem('extdata', JSON.stringify(list));
		}
		var a = JSON.parse(localStorage.getItem('extdata'));
		console.log(a);
		var d="<table class='table'><thead><tr><th>#</th><th>Title</th><th>Date</th></tr></thead><tbody>";
		for(var i=0;i<a.length;i++){
			var x= new Date(a[i]['stamp']*1000);
			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			var year = x.getFullYear();
			var month = months[x.getMonth()];
			var date = x.getDate();
			var hour = x.getHours();
			var min = x.getMinutes();
			var sec = x.getSeconds();
			var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
			var p=i+1;
			d+="<tr><td>"+p+"</td><td><a href='"+a[i]['url']+"' target='_blank'>"+a[i]['title']+"</a></td><td style='width:150px;'>"+time+"</td></tr>";
		}
		d+="</tbody></table>";
		$("#content").html(d);
		/*chrome.browserAction.onClicked.addListener(function(tab) {
			chrome.tabs.sendRequest(tab.id, {method: "getLocalStorage"}, function(response) {
				var myObjectRetrieved = JSON.parse(response.data);
				console.log(myObjectRetrieved);
			});
		});*/
		/*chrome.runtime.onMessage.addListener(
			function(request, sender, sendResponse) {
				console.log(sender.tab ?
						"from a content script:" + sender.tab.url :
						"from the extension");
				if (request.greeting == "hello")
					sendResponse({farewell: "goodbye"});
		});
		chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		console.log("message2"+message.data);
		if(message.method == "setStorage"){
					localStorage.setItem("extdata", message.newData);
					console.log("message"+message.data);
				}
		});*/
    });
	$(document).on("click","#links",function(){
		console.log("here links");
		$("#links").css("color","black");
		$("#analyze").css("color","lightgrey");
		$("#content").empty();
		var a = JSON.parse(localStorage.getItem('extdata'));
		console.log(a);
		var d="<table class='table'><thead><tr><th>#</th><th>Title</th><th>Date</th></tr></thead><tbody>";
		for(var i=0;i<a.length;i++){
			var x= new Date(a[i]['stamp']*1000);
			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			var year = x.getFullYear();
			var month = months[x.getMonth()];
			var date = x.getDate();
			var hour = x.getHours();
			var min = x.getMinutes();
			var sec = x.getSeconds();
			var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
			var p=i+1;
			d+="<tr><td>"+p+"</td><td><a href='"+a[i]['url']+"' target='_blank'>"+a[i]['title']+"</a></td><td style='width:150px;'>"+time+"</td></tr>";
		}
		d+="</tbody></table>";
		$("#content").html(d);
	});
	$(document).on("click","#analyze",function(){
		console.log("here analyze");
		$("#analyze").css("color","black");
		$("#links").css("color","lightgrey");
		$("#content").empty();
		$("#content").html("This is analyze");
});