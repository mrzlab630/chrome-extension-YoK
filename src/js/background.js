/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 08.02.2021
 * Time: 12:49
 * About:
 *
 */

chrome.tabs.onUpdated.addListener(function (tabId , info) {
    if (info.status === 'complete') {
        chrome.tabs.executeScript({
            file: 'js/action.js',
            runAt: "document_start"
        }, () => chrome.runtime.lastError)
    }
});

