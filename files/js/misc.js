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
    (n.style.display = "none"), e.target.appendChild(n), playSound("./files/sound/recycle.ogg");
}
function playSound(e) {
    var t = new Audio(e);
    (t.type = "audio/ogg"), (t.volume = 0.2), t.play();
}
function openFile(e) {
    (window.location.href = e), playSound("./files/sound/start.ogg");
}
function openFile2(e) {
    $(e).show(), playSound("./files/sound/start.ogg");
}
function closeFile(e) {
    $(e).hide(), playSound("./files/sound/start.ogg");
}
