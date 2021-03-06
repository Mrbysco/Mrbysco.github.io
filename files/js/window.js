var ids = ["#notepad", "#msn", "#internet"];

  $( function() {
    $("#draggable-1").draggable({
        revert: "invalid",
        revertDuration: 0,
        containment: "document",
        cursor: "move"});
    $("#draggable-2").draggable({
        revert: "invalid",
        revertDuration: 0,
        containment: "document",
        cursor: "move"});
    $("#draggable-3").draggable({
        revert: "invalid",
        revertDuration: 0,
        containment: "document",
        cursor: "move"});
    $("#draggable-4").draggable({
        revert: "invalid",
        revertDuration: 0,
        containment: "document",
        cursor: "move"});
    $("#trashcan").droppable({
        accept: "#desktop-icons > div:not(#trashcan)",
        drop: function( event, ui ) {
            drop( ui.draggable );
			playSound("./files/sound/recycle.ogg");
        }
    });
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
            closeFile("#notepad");
        } else {
            focus("#notepad");
        }
    });
    $("#notepad-shortcut").click(function(){
        focus("#notepad");
    });

    $("#msn").resizable();
    $("#msn").click(function(e){
        var id = e.target.id;
        if(id === "msn-minimize") {
            minimize("#msn");
        } else if(id === "msn-fullscreen") {
            toggleFullscreen("#msn");
        } else if(id === "msn-close") {
            closeFile("#msn");
        } else {
            focus("#msn");
        }
    });
    $("#msn-shortcut").click(function(){
        focus("#msn");
    });

    $("#internet").resizable();
    $("#internet").resizable("disable");
    $("#internet").draggable("disable");
    $("#internet").click(function(e){
        var id = e.target.id;
        if(id === "internet-minimize") {
            minimize("#internet");
        } else if(id === "internet-fullscreen") {
            toggleFullscreen("#internet");
        } else if(id === "internet-close") {
            closeFile("#internet");
        } else {
            focus("#internet");
        }
    });
    $("#internet-shortcut").click(function(){
        focus("#internet");
    });
});


function drop(item) {
    var icon = $("#" + item.attr('id'));
    icon.hide();
    $("#trash_icon").append(icon);
    $("#trash_icon").attr("src", "files/images/trash_full.png");
}


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

function openFile(str) {
    $(str).toggle();
    var shortcut = str + "-shortcut";
    var shortcutVar = $(shortcut);
    shortcutVar.toggle();
    focus(str);

    playSound("./files/sound/start.ogg");
}

function closeFile(str) {
    $(str).toggle();
    var shortcut = str + "-shortcut";
    var shortcutVar = $(shortcut);
    if($(shortcut).hasClass("focused")) {
        $(shortcut).removeClass("focused");
    }
    shortcutVar.toggle();

    playSound("./files/sound/start.ogg");
}