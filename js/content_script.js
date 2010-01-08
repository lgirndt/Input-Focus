chrome.extension.sendRequest({action:"get-config"}, function(response) {
    console.log(response.focusShortcut);
    var focusSwitcher = new FocusSwitcher({shortcut:response.focusShortcut});
});
