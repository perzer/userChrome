// ==UserScript==
// @name		download_enhance.uc.js
// @note		testversion: 20130416 minofix lastdream2013 
// @description	下载另存为+修改下载文件名
// @author   	紫云飞
// @include  	chrome://mozapps/content/downloads/unknownContentType.xul
// ==/UserScript==
(function() {
	switch (location.href) {
	case "chrome://browser/content/browser.xul":
		break;
	case "chrome://mozapps/content/downloads/unknownContentType.xul":
		download_dialog_changeName();// 下载改名
		download_dialog_saveas();// 另存为...
		download_dialog_showCompleteURL();// 下载弹出窗口双击链接复制完整链接
		break;
	}

	function download_dialog_showCompleteURL() {
		var s = document.querySelector("#source");
		s.value = dialog.mLauncher.source.spec;
		s.setAttribute("crop", "center");
		s.setAttribute("tooltiptext", dialog.mLauncher.source.spec);
		s.addEventListener("dblclick", function() {
			Components.classes["@mozilla.org/widget/clipboardhelper;1"]
					.getService(Components.interfaces.nsIClipboardHelper)
					.copyString(dialog.mLauncher.source.spec)
		}, false);
	}

	function download_dialog_changeName() {
		if (location != "chrome://mozapps/content/downloads/unknownContentType.xul")
			return;
		document.querySelector("#mode").addEventListener(
				"select",
				function() {
					if (dialog.dialogElement("save").selected) {
						if (!document.querySelector("#locationtext")) {
							var locationtext = document
									.querySelector("#location").parentNode
									.insertBefore(document
											.createElement("textbox"), document
											.querySelector("#location"));
							locationtext.id = "locationtext";
							locationtext.setAttribute("style",
									"margin-top:-2px;margin-bottom:-3px");
							locationtext.value = document
									.querySelector("#location").value;
						}
						document.querySelector("#location").hidden = true;
						document.querySelector("#locationtext").hidden = false;
					} else {
						document.querySelector("#locationtext").hidden = true;
						document.querySelector("#location").hidden = false;
					}
				}, false)
		dialog.dialogElement("save").click();
		window
				.addEventListener(
						"dialogaccept",
						function() {
							if ((document.querySelector("#locationtext").value != document
									.querySelector("#location").value)
									&& dialog.dialogElement("save").selected) {
								var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"]
										.getService(
												Components.interfaces.nsIWindowMediator)
										.getMostRecentWindow(
												"navigator:browser");
								mainwin
										.eval(
												"("
														+ mainwin.internalSave
																.toString()
																.replace(
																		"let ",
																		"")
																.replace(
																		"var fpParams",
																		"fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams")
														+ ")")
										(
												dialog.mLauncher.source.asciiSpec,
												null,
												document
														.querySelector("#locationtext").value,
												null,
												null,
												null,
												null,
												null,
												null,
												mainwin.document,
												Components.classes['@mozilla.org/preferences-service;1']
														.getService(
																Components.interfaces.nsIPrefBranch)
														.getBoolPref(
																"browser.download.useDownloadDir"),
												null);
								document.documentElement
										.removeAttribute("ondialogaccept");
							}
						}, false);
	}

	function download_dialog_saveas() {
		var saveas = document.documentElement.getButton("extra1");
		saveas.setAttribute("hidden", "false");
		// chinese
		// saveas.setAttribute("label", "\u53E6\u5B58\u4E3A");
		saveas.setAttribute("label", "Save As");
		saveas
				.setAttribute(
						"oncommand",
						'var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser"); mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")(dialog.mLauncher.source.asciiSpec, null, (document.querySelector("#locationtext") ? document.querySelector("#locationtext").value : dialog.mLauncher.suggestedFileName), null, null, null, null, null, null, mainwin.document, 0, null);close()');
	}
})();