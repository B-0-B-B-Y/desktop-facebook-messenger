const { ipcRenderer } = require('electron');
const webview = document.querySelector('webview')

webview.addEventListener('dom-ready', function() {
    webview.insertCSS("body::-webkit-scrollbar { width: 0 !important; }");
    webview.executeJavaScript("var advertAppStores = document.getElementById('u_0_6');advertAppStores.style.display = \"none\";var irrelevantMenuItem1 = document.getElementById('u_0_b');irrelevantMenuItem1.style.display = \"none\";var irrelevantMenuItem2 = document.getElementById('u_0_c');irrelevantMenuItem2.style.display = \"none\";var irrelevantMenuItem3 = document.getElementById('u_0_d');irrelevantMenuItem3.style.display = \"none\";var irrelevantMenuItem4 = document.getElementById('u_0_9');irrelevantMenuItem4.style.display = \"none\";var irrelevantMenuItem5 = document.getElementById('u_0_8');irrelevantMenuItem5.style.display = \"none\";")
});

var buttonHide = document.getElementById('btn-hide')

buttonHide.addEventListener('click', function () {
  ipcRenderer.send('button-press-hide', 'Hide the app')
})

var buttonClose = document.getElementById('btn-close')

buttonClose.addEventListener('click', function () {
  ipcRenderer.send('button-press-close', 'Close the app')
})
