// ==UserScript==
// @include chrome://mozapps/content/downloads/unknownContentType.xul
// ==/UserScript==
location == "chrome://mozapps/content/downloads/unknownContentType.xul" && (function () {
	var saveas = document.documentElement.getButton("extra1");
	saveas.setAttribute("hidden", "false");
	saveas.setAttribute("label", "Save As");
	saveas.setAttribute("oncommand", 'var file=(dialog.promptForSaveToFileAsync||dialog.promptForSaveToFile).call(dialog,dialog.mLauncher,window,dialog.mLauncher.suggestedFileName,"",true);if(file){dialog.mLauncher.saveToDisk(file,1);dialog.onCancel=function(){};close()}')
})()