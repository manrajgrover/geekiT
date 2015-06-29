function remove(l) {
    var a = JSON.parse(localStorage.getItem('geekiT'));
    if (a.filter(function(p) {
            return p.url == l
        }).length > 0) {
        var removed = jQuery.grep(a, function(p) {
            return p.url !== l;
        });
        localStorage.setItem('geekiT', JSON.stringify(removed));
    }
    chrome.runtime.sendMessage({
        method: "setStorage",
        newData: localStorage.getItem('geekiT')
    });
}

function add(l, t) {
    var x = new Date();
    var year = x.getFullYear();
    var month = x.getMonth() + 1;
    var date = x.getDate();
    var time = year + '-' + month + '-' + date + ' 0:00PM';
    if (t == "") {
        t = "GeeksForGeeks";
    }
    var a = JSON.parse(localStorage.getItem('geekiT'));
    if (a.filter(function(p) {
            return p.url == l
        }).length == 0) {
        a.push({
            url: l,
            title: t,
            stamp: time
        });
    }
    localStorage.setItem('geekiT', JSON.stringify(a));
    chrome.runtime.sendMessage({
        method: "setStorage",
        newData: localStorage.getItem('geekiT')
    });
}

function check() {
    var tp = $('#topfixed');
    if ($('#geekiT').prop('checked')) {
        tp.removeClass('notdone');
        tp.addClass('done');
        tp.text('DONE');
        add(document.URL, $(document).find("title").text());
    } else {
        tp.removeClass('done');
        tp.addClass('notdone');
        tp.text('NOT DONE');
        remove(document.URL);
    }
}

function removeBookmark(l) {
    var a = JSON.parse(localStorage.getItem('bookmark'));
    if (a.filter(function(p) {
            return p.url == l
        }).length > 0) {
        var removed = jQuery.grep(a, function(p) {
            return p.url !== l;
        });
        localStorage.setItem('bookmark', JSON.stringify(removed));
    }
    chrome.runtime.sendMessage({
        method: "setBookmark",
        newData: localStorage.getItem('bookmark')
    });
}

function addBookmark(l, t) {
    var x = new Date();
    var year = x.getFullYear();
    var month = x.getMonth() + 1;
    var date = x.getDate();
    var time = year + '-' + month + '-' + date + ' 0:00PM';
    if (t == "") {
        t = "GeeksForGeeks";
    }
    var a = JSON.parse(localStorage.getItem('bookmark'));
    if (a.filter(function(p) {
            return p.url == l
        }).length == 0) {
        a.push({
            url: l,
            title: t,
            stamp: time
        });
    }
    localStorage.setItem('bookmark', JSON.stringify(a));
    chrome.runtime.sendMessage({
        method: "setBookmark",
        newData: localStorage.getItem('bookmark')
    });
}

function bm() {
    if ($('#bk').prop('checked')) {
        addBookmark(document.URL, $(document).find("title").text());
    } else {
        removeBookmark(document.URL);
    }
}



function cut() {
    var a = JSON.parse(localStorage["geekiT"]);
    $(".site-content a,#post a").each(function() {
        var link = this.href;
        if (a.filter(function(p) {
                return p.url == link
            }).length > 0) {
            $(this).css("text-decoration", "line-through");
        }
    });
}

function bkit() {
    var a = JSON.parse(localStorage["bookmark"]);
    $(".site-content a,#post a").each(function() {
        var link = this.href;
        if (a.filter(function(p) {
                return p.url == link
            }).length > 0) {
            $(this).css("color", "#FF0000");
            $(this).css("font-weight", "bold");
        }
    });
}

$(document).ready(function() {
    if (typeof localStorage['geekiT'] == 'undefined') {
        var list = [];
        localStorage.setItem('geekiT', JSON.stringify(list));
    }
    if (typeof localStorage['bookmark'] == 'undefined') {
        var list = [];
        localStorage.setItem('bookmark', JSON.stringify(list));
    }
    $(document).on('click', '#geekiT', function() {
        check();
    });
    $(document).on('click', '#bk', function() {
        bm();
    });

    var a = JSON.parse(localStorage.getItem('geekiT'));
    var send = localStorage.getItem('geekiT');
    var l = document.URL;
    var pat1 = "http://www.geeksforgeeks.org/";
    var pat2 = "http://www.geeksforgeeks.org/page/";
    var pat3 = "https://www.geeksforgeeks.org/";
    var pat4 = "https://www.geeksforgeeks.org/page/";

    if (!(l == pat1) && !(l == pat3) && !(l.search(pat2) >= 0) && !(l.search(pat4) >= 0)) {
        if (a.filter(function(p) {
                return p.url == l
            }).length > 0) {
            var geeked = '<div id="topfixed" class="done">DONE</div>';
            var div = "<div id='ui'>geek<span style='color:red;'>iT</span>? <input id='geekiT' name='geekiT' type='checkbox' checked='true' /></div>";
        } else {
            var geeked = '<div id="topfixed" class="notdone">NOT DONE</div>';
            var div = "<div id='ui'>geek<span style='color:red;'>iT</span>? <input id='geekiT' name='geekiT' type='checkbox'/></div>";
        }
        var a = JSON.parse(localStorage.getItem('bookmark'));
        var bookmark = localStorage.getItem('bookmark');
        var l = document.URL;
        if (a.filter(function(p) {
                return p.url == l
            }).length > 0) {
            var bk = "<div id='ui'>bookmark<span style='color:red;'>iT</span>? <input id='bk' name='bk' type='checkbox' checked='true' /></div>";
        } else {
            var bk = "<div id='ui'>bookmark<span style='color:red;'>iT</span>? <input id='bk' name='bk' type='checkbox'/></div>";
        }

        $("body").append(geeked);
        $("body").append("<div id='geekbox'></div>");
        $("#geekbox").append(div);
        $("#geekbox").append(bk);
    }
    cut();
    bkit();
    chrome.runtime.sendMessage({
        method: "setStorage",
        newData: send
    });
    var bookmark = localStorage.getItem('bookmark');
    chrome.runtime.sendMessage({
        method: "setBookmark",
        newData: bookmark
    });
});