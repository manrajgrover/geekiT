function remove(l) {
	var a = JSON.parse(localStorage.getItem('geekiT'));
	if(a.filter(function(p){return p.url == l}).length>0){
		var removed = jQuery.grep(a, function(p) {return p.url!== l;});
		localStorage.setItem('geekiT', JSON.stringify(removed));
	}
	location.reload();
	console.log(localStorage.getItem('geekiT'));	
}

function add(l,t) {
	var time= parseInt(new Date().getTime()/1000);
	if(t==""){
		t="GeeksForGeeks";
	}
	var a =JSON.parse(localStorage.getItem('geekiT'));
	console.log(a);
	if (a.filter(function (p) { return p.url == l}).length==0){
		a.push({url: l,title: t,stamp: time});
	}
	else{
		console.log("it was equal to 0");
	}
	localStorage.setItem('geekiT', JSON.stringify(a));
	console.log(localStorage.getItem('geekiT'));
}
function check(){
	if ($('#geekiT').prop('checked')){
		console.log(document.URL+' '+ $(document).find("title").text());
		add(document.URL,$(document).find("title").text());
		console.log('checked');
	}
	else{
		console.log(document.URL+' '+ document.title);
		remove(document.URL);
		console.log('unchecked');
	}
}
function cut() {
	var a= JSON.parse(localStorage["geekiT"]);
	$(".page-content a").each(function() {
		var link=this.href;
		if(a.filter(function(p){return p.url == link}).length>0){
			$(this).css("text-decoration","line-through");
		}
	});
}
$(document).ready(function() {
        console.log("Its working!!!!");
		if (typeof localStorage['geekiT'] == 'undefined') {
			var list = [];
			console.log("creating storage");
			localStorage.setItem('geekiT', JSON.stringify(list));
		}
		$(document).on('click','#geekiT',function(){
			console.log('dude yo');
			check();
		});
		var a =JSON.parse(localStorage.getItem('geekiT'));
		console.log(a);
		var l=document.URL;
		console.log(l);
		console.log(a.filter(function (p) { return p.url == l}));
		if (a.filter(function(p){return p.url == l}).length>0) {
			var geeked='<div id="topfixed" class="done">DONE</div>';
			var div = "<div id='ui'>geekiT?<input id='geekiT' name='geekiT' type='checkbox' checked='true' /></div>";		
		}
		else {
			var geeked='<div id="topfixed" class="notdone">NOT DONE</div>';
			var div = "<div id='ui'>geekiT?<input id='geekiT' name='geekiT' type='checkbox'/></div>";		
		}
		$("body").append(geeked);
		$("body").append(div);
		cut();
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			console.log("chrome running..");
			if (request.method == "getLocalStorage"){
				console.log("sending data...");
				sendResponse({data: localStorage[request.key]});
			}
			else
				sendResponse({});
		});
});