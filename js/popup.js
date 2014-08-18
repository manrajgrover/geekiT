$(document).ready(function() {
        console.log("here");
		$("#links").css("color","black");
		$("#analyze").css("color","lightgrey");
		chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		if(message.method == "setStorage"){
					localStorage.setItem("extdata", message.newData);
					console.log("message"+message.data);
				}
		});
    });
	$(document).on("click","#links",function(){
		console.log("here links");
		$("#links").css("color","black");
		$("#analyze").css("color","lightgrey");
		$("#content").empty();
		var a = JSON.parse(localStorage.getItem('extdata'));
		var d="<table><thead><tr><th>Title</th><th>Date</th></tr></thead><tbody>";
		for(var i=0;i<a.length;i++){
			var date = new Date(a.stamp*1000);
			d+="<tr><td><a href='"+a.url+"'>"+a.title+"</a></td><td>"+date+"</td></tr>";
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