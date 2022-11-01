/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-11-01
 * Time: 09:50
 * About:
 *
 */
const setChromeStorage = async function (obj){
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

chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, async (tab) => {

        const YOK = {
            yoLink:`https://ahoy.yohoho.cc`,
            players:['videocdn','kodik','collaps','hdvb','bazon','ustore','alloha','pleer','videospider','torrent','iframe']
        }

        try {
            const {url} = tab

            if(!url){
                throw  new Error('url страницы не найден')
            }

            const kinopoisk = url.split('/')?.filter(itm => itm.length > 0)

            if(!kinopoisk){
                throw  new Error('id фильма не найден')
            }

            YOK.kinopoisk = kinopoisk.length === 4 ? kinopoisk.pop() : undefined

        }catch (e) {
            YOK.error = e.message
        }finally {
            await setChromeStorage({YOK})
        }

    })
})