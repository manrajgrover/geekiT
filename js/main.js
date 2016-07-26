function remove(link) {
  var a = JSON.parse(localStorage.getItem('geekiT'));
  if (a.filter(function(obj) {
      return obj.url == link
    }).length > 0) {
    var removed = jQuery.grep(a, function(obj) {
      return obj.url !== link;
    });
    localStorage.setItem('geekiT', JSON.stringify(removed));
  }
  chrome.runtime.sendMessage({
    method: "setStorage",
    newData: localStorage.getItem('geekiT')
  });
}

function add(link, title) {
  var x = new Date();
  var year = x.getFullYear();
  var month = x.getMonth() + 1;
  var date = x.getDate();
  var time = year + '-' + month + '-' + date + ' 0:00PM';
  title = (title == "" ? "GeeksForGeeks" : title);
  var a = JSON.parse(localStorage.getItem('geekiT'));
  if (a.filter(function(obj) {
      return obj.url == link
    }).length == 0) {
    a.push({
      url: link,
      title: title,
      stamp: time
    });
  }
  localStorage.setItem('geekiT', JSON.stringify(a));
  chrome.runtime.sendMessage({
    method: "setStorage",
    newData: localStorage.getItem('geekiT')
  });
}

function removeBookmark(link) {
  var a = JSON.parse(localStorage.getItem('bookmark'));
  if (a.filter(function(obj) {
      return obj.url == link
    }).length > 0) {
    var removed = jQuery.grep(a, function(obj) {
      return obj.url !== link;
    });
    localStorage.setItem('bookmark', JSON.stringify(removed));
  }
  chrome.runtime.sendMessage({
    method: "setBookmark",
    newData: localStorage.getItem('bookmark')
  });
}

function addBookmark(link, title) {
  var x = new Date();
  var year = x.getFullYear();
  var month = x.getMonth() + 1;
  var date = x.getDate();
  var time = year + '-' + month + '-' + date + ' 0:00PM';
  title = (title == "" ? "GeeksForGeeks" : title);
  var a = JSON.parse(localStorage.getItem('bookmark'));
  if (a.filter(function(obj) {
      return obj.url == link
    }).length == 0) {
    a.push({
      url: link,
      title: title,
      stamp: time
    });
  }
  localStorage.setItem('bookmark', JSON.stringify(a));
  chrome.runtime.sendMessage({
    method: "setBookmark",
    newData: localStorage.getItem('bookmark')
  });
}

function bookmarkHelper() {
  if ($('#bk').prop('checked')) {
    addBookmark(document.URL, $(document).find("title").text());
  } else {
    removeBookmark(document.URL);
  }
}

function check() {
  var topFixed = $('#topfixed');
  if ($('#geekiT').prop('checked')) {
    topFixed.removeClass('notdone').addClass('done').text('DONE');
    add(document.URL, $(document).find("title").text());
  } else {
    topFixed.removeClass('done').addClass('notdone').text('NOT DONE');
    remove(document.URL);
  }
}


function cutLinks() {
  var a = JSON.parse(localStorage["geekiT"]);
  $(".site-content a,#post a").each(function() {
    var link = this.href;
    if (a.filter(function(obj) {
        return obj.url == link
      }).length > 0) {
      $(this).css({
        "color": "#006600",
        "text-decoration": "line-through"
      });
    }
  });
}

function bookmarkLinks() {
  var a = JSON.parse(localStorage["bookmark"]);
  $(".site-content a,#post a").each(function() {
    var link = this.href;
    if (a.filter(function(obj) {
        return obj.url == link
      }).length > 0) {
      $(this).css({
        "color": "#CC0000",
        "font-weight": "bold"
      });
    }
  });
}

$(document).ready(function() {
  if (typeof localStorage['geekiT'] == 'undefined') {
    localStorage.setItem('geekiT', JSON.stringify([]));
  }
  if (typeof localStorage['bookmark'] == 'undefined') {
    localStorage.setItem('bookmark', JSON.stringify([]));
  }

  var a = JSON.parse(localStorage.getItem('geekiT'));
  var send = localStorage.getItem('geekiT');
  var link = document.URL;
  var pat1 = "http://www.geeksforgeeks.org/";
  var pat2 = "http://www.geeksforgeeks.org/page/";
  var pat3 = "https://www.geeksforgeeks.org/";
  var pat4 = "https://www.geeksforgeeks.org/page/";

  if (!(link == pat1) && !(link == pat3) && !(link.search(pat2) >= 0) && !(link.search(pat4) >= 0)) {
    if (a.filter(function(obj) {
        return obj.url == link
      }).length > 0) {
      var geeked = '<div id="topfixed" class="done">DONE</div>';
      var div = "<div id='ui'>geek<span style='color:red;'>iT</span>? <input id='geekiT' name='geekiT' type='checkbox' checked='true' /></div>";
    } else {
      var geeked = '<div id="topfixed" class="notdone">NOT DONE</div>';
      var div = "<div id='ui'>geek<span style='color:red;'>iT</span>? <input id='geekiT' name='geekiT' type='checkbox'/></div>";
    }
    var a = JSON.parse(localStorage.getItem('bookmark'));
    var bookmark = localStorage.getItem('bookmark');
    var link = document.URL;
    if (a.filter(function(obj) {
        return obj.url == link
      }).length > 0) {
      var bk = "<div id='ui'>bookmark<span style='color:red;'>iT</span>? <input id='bk' name='bk' type='checkbox' checked='true' /></div>";
    } else {
      var bk = "<div id='ui'>bookmark<span style='color:red;'>iT</span>? <input id='bk' name='bk' type='checkbox'/></div>";
    }

    $("body").append(geeked).append("<div id='geekbox'></div>");
    $("#geekbox").append(div).append(bk).show();
    $("#bk").show();
  }
  cutLinks();
  bookmarkLinks();
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
$(document).on('click', '#geekiT', function() {
  check();
});
$(document).on('click', '#bk', function() {
  bookmarkHelper();
});
