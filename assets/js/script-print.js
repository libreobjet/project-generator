var rows = document.getElementsByTagName('tr');
for (var i=0;i<rows.length;i++) {
    var t = rows[i].innerText || rows[i].textContent;
    if (t.trim().length==0) rows[i].style.display='none';
}
