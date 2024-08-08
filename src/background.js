chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
});
chrome.runtime.onInstalled.addListener((details) => {
  chrome.runtime.setUninstallURL('https://example.com/uninstall');
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'https://example.com/install',
    });
  } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    // When extension is updated
  } else if (
    details.reason === chrome.runtime.OnInstalledReason.CHROME_UPDATE
  ) {
    // When browser is updated
  } else if (
    details.reason === chrome.runtime.OnInstalledReason.SHARED_MODULE_UPDATE
  ) {
    // When a shared module is updated
  }
});

chrome.runtime.onMessage.addListener(function sendResponse(
  request,
  sender,
  response
) {
  if (request.action === 'toggleBottomBar') {
    createOrHideBottomBarIcon(request.enabled);
  }

  if (request.action === 'openNewTab') {
    chrome.tabs.create({ url: request.url });
  }
});

function createOrHideBottomBarIcon(value) {
  if (value) {
    return chrome.storage.local.set({ bottomBarEnabled: true });
  }
  return chrome.storage.local.set({ bottomBarEnabled: false });
}
