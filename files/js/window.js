var ids = ["#notepad", "#msn", "#internet"];

$(document).ready(function () {
    $("#notepad").resizable(),
    $("#notepad").draggable({
        start: function () {
            focus("#notepad");
        },
        handle: "#notepad-header",
    }),
    $("#msn").resizable(),
    $("#msn").draggable({
        start: function () {
            focus("#msn");
        },
        handle: "#msn-header",
    });
    $("#internet").resizable(),
    $("#internet").draggable({
        start: function () {
            focus("#internet");
        },
        handle: "#internet-header",
    });
    $("#internet").draggable('disable');

    $("#notepad").click(function(){
        focus("#notepad");
    });
    $("#msn").click(function(){
        focus("#msn");
    });
    $("#internet").click(function(){
        focus("#internet");
    });
});

function toggleFullscreen(str) {
    var window = $(str);
    window.toggleClass("fullscreen");
    if(window.hasClass("fullscreen")) {
        window.draggable('disable');
        window.resizable('disable');
    } else {
        window.draggable('enable');
        window.resizable('enable');
    }
}

function focus(str) {
    $(str).css("z-index", "2");
    unfocus(str);
}

function unfocus(str) {
    for(i = 0; i < ids.length; i++) {
        var id = ids[i];
        if(id !== str) {
            $(id).css("z-index", "0")
        };
    }
}