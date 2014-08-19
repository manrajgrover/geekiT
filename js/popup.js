$(document).ready(function() {
        console.log("here");
		$("#links").css("color","black");
		$("#analyze").css("color","lightgrey");
		$("#analytics").hide();
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
			var time = a[i]['stamp'];
			var p=i+1;
			d+="<tr><td>"+p+"</td><td><a href='"+a[i]['url']+"' target='_blank'>"+a[i]['title']+"</a></td><td style='width:150px;'>"+time+"</td></tr>";
		}
		d+="</tbody></table>";
		$("#content").html(d);
    });
	$(document).on("click","#links",function(){
		console.log("here links");
		$("#links").css("color","black");
		$("#analyze").css("color","lightgrey");
		$("#analytics").hide();
		$("#content").show();
	});
	$(document).on("click","#analyze",function(){
		console.log("here analyze");
		$("#analyze").css("color","black");
		$("#links").css("color","lightgrey");
		$("#content").hide();
		$("#analytics").show();
		var a = JSON.parse(localStorage.getItem('extdata'));
		console.log(a);
		var count = {};
		for(var i=0;i<a.length;i++){
			var s=a[i]['stamp'];
			if(!count.hasOwnProperty(a[i]['stamp'])){
				count[s]=1;
				console.log("pushing "+a[i]['stamp']);
			}
			else{
				count[s]+=1;
				console.log("pushing "+count[s]);
			}
		}
		//console.log(count);
		var arr = [];
		for (var prop in count) {
			arr.push([prop,count[prop]]);
		}
		console.log(arr);
		//console.log(JSON.parse(count));
		var plot1 = $.jqplot('analytics', [arr], {
			title:'Your Progress',
			tickOptions:{formatString:'%b %#d, %y'},
			tickInterval:'1 month',
			axes:{xaxis:{renderer:$.jqplot.DateAxisRenderer}},
			series:[{lineWidth:4, markerOptions:{style:'square'}}]
		});
});