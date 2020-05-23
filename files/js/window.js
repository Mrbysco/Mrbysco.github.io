var ids = ["#notepad", "#msn", "#internet"];

$( document ).ready(function () {
    $("#internet").draggable({
        start: function () {
            focus("#internet");
        },
        handle: "#internet-header",
        cancel: ".controls"
    });
    $("#msn").draggable({
        start: function () {
            focus("#msn");
        },
        handle: "#msn-header",
        cancel: ".controls"
    });
    $("#notepad").draggable({
        start: function () {
            focus("#notepad");
        },
        handle: "#notepad-header",
        cancel: ".controls"
    });

    $("#notepad").resizable();
    $("#notepad").click(function(e){
        var id = e.target.id;
        if(id === "notepad-minimize") {
            minimize("#notepad");
        } else if(id === "notepad-fullscreen") {
            toggleFullscreen("#notepad");
        } else if(id === "notepad-close") {
            toggleFile("#notepad");
        } else {
            focus("#notepad");
        }
    });
    $("#notepad-shortcut").click(function(){
        focus("#notepad");
    });
    $("#notepad-shortcut").toggle();

    $("#msn").resizable();
    $("#msn").click(function(e){
        var id = e.target.id;
        if(id === "msn-minimize") {
            minimize("#msn");
        } else if(id === "msn-fullscreen") {
            toggleFullscreen("#msn");
        } else if(id === "msn-close") {
            toggleFile("#msn");
        } else {
            focus("#msn");
        }
    });
    $("#msn-shortcut").click(function(){
        focus("#msn");
    });
    $("#msn-shortcut").toggle();

    $("#internet").resizable();
    $("#internet").draggable("disable");
    $("#internet").click(function(e){
         var id = e.target.id;
         if(id === "internet-minimize") {
             minimize("#internet");
         } else if(id === "internet-fullscreen") {
             toggleFullscreen("#internet");
         } else if(id === "internet-close") {
             toggleFile("#internet");
         } else {
             focus("#internet");
         }
    });
    $("#internet-shortcut").click(function(){
        focus("#internet");
    });
    $("#internet-shortcut").toggle();
});

function toggleFullscreen(str) {
    var window = $(str);
    window.toggleClass("fullscreen");
    if(window.hasClass("fullscreen")) {
        window.draggable("disable");
        window.resizable("disable");
    } else {
        window.draggable("enable");
        window.resizable("enable");
    }
}

function focus(str) {
    $(str).css("z-index", "2");
    var shortcut = str + "-shortcut";
    if(!$(shortcut).hasClass("focused")){
        $(shortcut).toggleClass("focused");
    }
    unfocus(str);
}

function unfocus(str) {
    if(!$(str).is(":visible")) {
        $(str).toggle();
    }
    var shortcut = "";
    for(i = 0; i < ids.length; i += 1) {
        if(ids[i] !== str) {
            $(ids[i]).css("z-index", "0");
            shortcut = ids[i] + "-shortcut";
            if($(shortcut).hasClass("focused")) {
                $(shortcut).removeClass("focused");
            }
        }
    }
}

function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
}
function allowDrop(e) {
    e.preventDefault();
}
function drop(e) {
    e.preventDefault();
    var t = e.dataTransfer.getData("text");
    document.getElementById("trash_icon").src = "files/images/trash_full.png";
    var n = document.getElementById(t);
    n.style.display = "none";
    e.target.appendChild(n);
    playSound("./files/sound/recycle.ogg");
}
function playSound(e) {
    var t = new Audio(e);
    t.type = "audio/ogg";
    t.volume = 0.2;
    t.play();
}
function openFile(e) {
    window.location.href = e;
    playSound("./files/sound/start.ogg");
}

function minimize(str) {
    $(str).toggle();
    var shortcut = str + "-shortcut";
    if($(shortcut).hasClass("focused")){
        $(shortcut).removeClass("focused");
    }
}

function toggleFile(str) {
    $(str).toggle();
    var shortcut = str + "-shortcut";
    var shortcutVar = $(shortcut);
    shortcutVar.toggle();
    shortcutVar.toggleClass("focused");
    if(!str.is(":visible")) {
        if(shortcutVar.hasClass("focused")){
            shortcutVar.removeClass("focused");
        }
    }
    playSound("./files/sound/start.ogg");
}