/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2022-11-01
 * Time: 09:51
 * About:
 *
 */

const action = async function () {

    let YOK = {}

    const getChromeStorage = async function (keys) {
        return new Promise((resolve, reject) => {
            try {
                chrome.storage.local.get(keys, function (value) {
                    resolve(value)
                })
            } catch (ex) {
                resolve({})
            }
        })
    }
    const getMovies = async function (url, body){
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', //'application/json',
                    'origin':'https://4h0y.gitlab.io',
                    'referer':'https://4h0y.gitlab.io/',
                    'accept':'*/*',
                    'accept-encoding':'gzip, deflate, br',
                    'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
                },
                body
            })
            const result = await response.json()
            return {result}

        }catch (e) {
            return {error:e.message}
        }
    }


    const newElement = ({tag,id,className,content}) => {
        const el = document.createElement(tag)
        el.setAttribute('id', id)
        el.setAttribute('class', className)
        el.innerHTML = content
        return el
    }

    const renderData = function (content){
        try {

            const buttonBlock = document.querySelectorAll('div[class^="styles_buttons__"]')[0]
            if (!buttonBlock) {
                throw new Error('блок кнопок не найден ')
            }




            buttonBlock.appendChild(newElement({
                tag: 'div',
                id: 'yohoho-block',
                className: 'yohoho-block',
                content: `<div>${yoLogo('🍿🍿🍿')}</div><div id="yohoho-block-content">${content}</div>`
            }))

        }catch (e) {
            document.body.appendChild(newElement({
                tag: 'div',
                id: 'yohoho-block-error',
                className: 'yohoho-block-error',
                content: `<div class="yohoho-block-error-wrap"><div>${yoLogo('🍿🍿🍿')}</div><div>${e?.message}</div></div>`

            }))
        }
    }

    const linkMovie = ({lable,href}) => `<a class="yohoho-itm" href='${href}' target='_blank'>${lable}</a>`
    const rightSvg = (width=32,height=32,fill='#FFFFFF') => `<span class="yohoho-svg-right"><svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="${fill}" viewBox="0 0 24 24"><path d="M15.2929 14.2929L16 15L19 12L16 9L15.2929 9.70711L17.0858 11.5L5 11.5V12.5L17.0857 12.5L15.2929 14.2929Z"/></svg></span>`
    const yoLogo = (info='') => `<span id="yohoho-logo-info" class="yohoho-logo-info">YoK${rightSvg()} ${info}</span>`
    const progressBar = `<div class="yohoho-spinner-box">
                      <div class="yohoho-pulse-container">  
                        <div class="yohoho-pulse-bubble yohoho-pulse-bubble-1"></div>
                        <div class="yohoho-pulse-bubble yohoho-pulse-bubble-2"></div>
                        <div class="yohoho-pulse-bubble yohoho-pulse-bubble-3"></div>
                      </div>
                    </div>`




    try {
        const storage = await getChromeStorage('YOK')
        YOK = storage?.YOK

        if(!YOK?.kinopoisk){
            return
        }
        renderData(progressBar)


        /**
         *  loading data
         */

        const player = `player=${encodeURIComponent(YOK?.players.join(','))}`
        const query = `${player}&kinopoisk=${YOK?.kinopoisk}`

        const {result:moviesList, error:loadingErr} = await getMovies(YOK?.yoLink, query)

        if(loadingErr){
            throw new Error(loadingErr)
        }

        YOK.moviesList = moviesList

    } catch (e) {
        YOK.error = e.message
    } finally {




        const renderInfo =  (content) =>{
            const yohohoBlock = document.querySelector('div[id="yohoho-block-content"]')

            if(yohohoBlock){
                yohohoBlock.innerHTML = content
                return
            }


            return renderData(content)
        }



        const {error,moviesList} = YOK

        if(error){
            renderInfo(error)
            return
        }

        if(!moviesList || Object.keys(moviesList).length === 0){
            renderInfo(`😿 не найдено`)
            return
        }

        const linkMovieList = []

        console.log(moviesList)

        Object.keys(moviesList).forEach(itm => {

            const {iframe,quality,translate} = moviesList[itm]

            if(!iframe){
                return
            }
                linkMovieList.push( linkMovie({
                    href:iframe,
                    lable:quality ? `${quality} ${translate}` : 'смотреть'
                })  )


        }
        )

        renderInfo(linkMovieList.join(''))



    }

}

document.addEventListener("DOMContentLoaded", action)