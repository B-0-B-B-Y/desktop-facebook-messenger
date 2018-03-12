const { ipcRenderer } = require('electron');
const webview = document.querySelector('webview')

//Inject Own JS to remove some elements from messenger site taht are not needed
webview.addEventListener('dom-ready', function() {
    webview.insertCSS("body::-webkit-scrollbar { width: 0 !important; }");
    var siteName = webview.getURL()
    if(siteName.includes('https://www.messenger.com')) {
      webview.executeJavaScript("var advertAppStores = document.getElementById('u_0_6');advertAppStores.style.display = \"none\";var irrelevantMenuItem1 = document.getElementById('u_0_b');irrelevantMenuItem1.style.display = \"none\";var irrelevantMenuItem2 = document.getElementById('u_0_c');irrelevantMenuItem2.style.display = \"none\";var irrelevantMenuItem3 = document.getElementById('u_0_d');irrelevantMenuItem3.style.display = \"none\";var irrelevantMenuItem4 = document.getElementById('u_0_9');irrelevantMenuItem4.style.display = \"none\";var irrelevantMenuItem5 = document.getElementById('u_0_8');irrelevantMenuItem5.style.display = \"none\";")
    }
})

//Setup minimise button
var buttonBack = document.getElementById('btn-back')

buttonBack.addEventListener('click', function () {
  webview.goBack()
})

//Setup minimise button
var buttonForward = document.getElementById('btn-forward')

buttonForward.addEventListener('click', function () {
  webview.goForward()
})

//Setup minimise button
var buttonHide = document.getElementById('btn-hide')

buttonHide.addEventListener('click', function () {
  ipcRenderer.send('button-press-hide', 'Hide the app')
})

//Setup close button
var buttonClose = document.getElementById('btn-close')

buttonClose.addEventListener('click', function () {
  ipcRenderer.send('button-press-close', 'Close the app')
})

//Prevent menu bar from being selectable with mouse click + drag
var unFocus = function () {
    if (document.selection) {
        document.selection.empty()
    } else {
        window.getSelection().removeAllRanges()
    }
}

document.getElementById('menu').onmousemove = function () {
    unFocus()
}

document.getElementById('menu').onmouseup = function () {
    unFocus()
}
