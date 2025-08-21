chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchContent') {
    sendResponse({ text: document.body.innerText });
  }
});
