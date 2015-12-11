function parseDate(input) {
  var dateAndTime = input.split(' ');
  var parts = dateAndTime[0].split('-');
  return Date.UTC(parts[0], parts[1]-1, parts[2]);
}

$(document).ready(function() {
    $("#links").css("color", "black");
    $("#analyze").css("color", "lightgrey");
    $("#bookmark").css("color", "lightgrey");
    $("#analytics").hide();
    $("#bookmarked").hide();
    if (typeof localStorage['extdata'] == 'undefined') {
        var list = [];
        localStorage.setItem('extdata', JSON.stringify(list));
    }
    var a = JSON.parse(localStorage.getItem('extdata'));
    var p = 0;
    var d = "<table class='table'><thead><tr><th>#</th><th>Title</th><th>Date</th></tr></thead><tbody>";
    for (var i = a.length - 1; i >= 0; i--) {
        var time = a[i]['stamp'];
        time = time.substring(0, time.length - 7);
        time = time.split("-");
        var final_time = time[2]+"-"+time[1]+"-"+time[0];
        p++;
        d += "<tr><td>" + p + "</td><td><a href='" + a[i]['url'] + "' target='_blank'>" + a[i]['title'] + "</a></td><td style='width:150px;'>" + final_time + "</td></tr>";
    }
    d += "</tbody></table>";
    $("#content").html(d);
    if (typeof localStorage['bookmark'] == 'undefined') {
        var list = [];
        localStorage.setItem('bookmark', JSON.stringify(list));
    }
    var a = JSON.parse(localStorage.getItem('bookmark'));
    var p = 0;
    var d = "<table class='table'><thead><tr><th>#</th><th>Title</th><th>Date</th></tr></thead><tbody>";
    for (var i = a.length - 1; i >= 0; i--) {
        var time = a[i]['stamp'];
        time = time.substring(0, time.length - 7);
        time = time.split("-");
        var final_time = time[2]+"-"+time[1]+"-"+time[0];
        p++;
        d += "<tr><td>" + p + "</td><td><a href='" + a[i]['url'] + "' target='_blank'>" + a[i]['title'] + "</a></td><td style='width:150px;'>" + final_time + "</td></tr>";
    }
    d += "</tbody></table>";
    $("#bookmarked").html(d);
});
$(document).on("click", "#links", function() {
    $("#links").css("color", "black");
    $("#analyze").css("color", "lightgrey");
    $("#bookmark").css("color", "lightgrey");
    $("#analytics").hide();
    $("#bookmarked").hide();
    $("#content").show();
});
$(document).on("click", "#analyze", function() {
    $("#analyze").css("color", "black");
    $("#links").css("color", "lightgrey");
    $("#bookmark").css("color", "lightgrey");
    $("#content").hide();
    $("#bookmarked").hide();
    $("#analytics").show();
    var a = JSON.parse(localStorage.getItem('extdata'));
    var count = {};
    for (var i = 0; i < a.length; i++) {
        var s = a[i]['stamp'];
        if (!count.hasOwnProperty(a[i]['stamp'])) {
            count[s] = 1;
        } else {
            count[s] += 1;
        }
    }
    var arr = [];
    for (var prop in count) {
        arr.push([parseDate(prop), count[prop]]);
    }
    $('#analytics').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Your Progress',
            x: -20
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Questions solved'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ' Questions'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Progress',
            data: arr
        }]
    });
});

$(document).on("click", "#bookmark", function() {
    $("#links").css("color", "lightgrey");
    $("#analyze").css("color", "lightgrey");
    $("#bookmark").css("color", "black");
    $("#analytics").hide();
    $("#content").hide();
    $("#bookmarked").show();
});