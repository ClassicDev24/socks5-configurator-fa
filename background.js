// Note: since manifest.json now sets a default_popup for the toolbar
// action, chrome.action.onClicked no longer fires on icon click (the
// popup opens instead). This listener is kept only as a harmless
// fallback in case default_popup is ever removed.
chrome.action.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
})
