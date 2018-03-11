const webview = document.querySelector('webview')

webview.addEventListener('dom-ready', function() {
    webview.insertCSS("body::-webkit-scrollbar { width: 0 !important; }");
});
