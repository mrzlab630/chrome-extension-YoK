/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-11-09
 * Time: 17:50
 * About:
 *
 */
const setChromeStorage = async function (obj)
{
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.set(obj, function () {
                resolve()
            })
        } catch (ex) {
            reject(ex)
        }
    })
}


chrome.tabs.onUpdated.addListener(
     async (tabId, changeInfo,d) => {

        if (changeInfo.status === 'complete') {
            await setChromeStorage({yohoho:d})
        }
    }
)