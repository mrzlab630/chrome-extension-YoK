/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 08.02.2021
 * Time: 13:01
 * About:
 *
 */


{
    const rightSvg = (width=32,height=32,fill='#FFFFFF') => `<span class="yohoho-svg-right"><svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="${fill}" viewBox="0 0 24 24"><path d="M15.2929 14.2929L16 15L19 12L16 9L15.2929 9.70711L17.0858 11.5L5 11.5V12.5L17.0857 12.5L15.2929 14.2929Z"/></svg></span>`

    const yoLogo = (info='') => `<span id="yohoho-logo-info" class="yohoho-logo-info">YoK${rightSvg()} ${info}</span>`

    const InjectCode = (func) =>{

        if(!func){
            return
        }

        const script = document.createElement('script')
        script.textContent = `(${func})();`
        document.body.append(script)
    }

    const getYoLink = function ()
    {

        const date1 = new Date()
        const date2 = new Date('2021-10-21')
        const tld = date1 > date2 ? 'cc' : 'online'
        const options_url = 'https://ahoy.yohoho.' + tld + '?cache' + Math.random().toString().substr(2, 3)

        return options_url


    }

    const yo_get = async function (url, body)
    {
        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body
            });

            const res =   await response.text()
            return JSON.parse(res);

        }catch (e) {
            console.error({error:e.message})
        }
    }

    const fndFilmId = function ()
    {
        try {

            const queryString =  document.URL

            const regexObj = /^[+-]?\d+(\.\d+)?$/


            const fiposterLinkArr = queryString ? queryString.split('/') : false

            if(!Array.isArray(fiposterLinkArr)){
                throw new Error(`filme Id is empty`)
            }

            const filmeId =  fiposterLinkArr.map(itm => (regexObj.test(itm) ? itm : false))

            return filmeId.filter(itm => itm).pop()


        }catch (e) {
            console.error({error:e.message})
        }
    }

    const createNewElement = function({tag, id, className, content,inBody})
    {

        const divOne =  document.querySelector(".styles_title__3tVSa")
        const divTwo =  document.querySelector(".styles_watchOnlineContainer__3-xcJ")
        const divThree =  document.querySelector(".styles_hdContainer__3jCqC ")

        const div = divOne || divTwo || divThree

        const newElement = document.createElement(tag)
        newElement.setAttribute('id', id)
        newElement.setAttribute('class', className)
        newElement.innerHTML = content

        if(document.readyState !== 'interactive'){
            return
        }

        const lasrChldr = div.children[div.children.length-1]
        const lasrChldrId = lasrChldr.getAttribute('id')


        if(inBody){
            return document.body.append(newElement)
        }


        if(lasrChldrId && lasrChldrId === id){

            lasrChldr.parentNode.removeChild(lasrChldr)
        }

        return div.appendChild(newElement)

    }

    const renderLoading  = function (isLoading)
    {

        const id = 'yohoho-loading'
        const className = 'yohoho-block'
        const tag = 'div'
        const content = `<div class="yohoho-spinner-box">
                      <div class="yohoho-pulse-container">  
                        <div class="yohoho-pulse-bubble yohoho-pulse-bubble-1"></div>
                        <div class="yohoho-pulse-bubble yohoho-pulse-bubble-2"></div>
                        <div class="yohoho-pulse-bubble yohoho-pulse-bubble-3"></div>
                      </div>
                    </div>`

        if(isLoading){
            const elem = document.getElementById(id)
            return  elem ? elem.remove() : false
        }

        createNewElement({tag,id,className,content})

    }

    const renderYoBlock = function (players)
    {
        try {

            const renderPlayer = ({id,quality, translate, iframe}) => (`<button 
                                                                                id="yohoho-itm-${id}" 
                                                                                class="yohoho-itm"
                                                                                data-iframe="${iframe}"
                                                                                data-action="link"
                                                                                >${quality || translate ? `${quality} ${translate}` : `открыть`}</button>`)


            const renderPlayersAll = players ? Object.keys(players).map((itm,idx) => {

                const {quality, translate, iframe} = players[itm] || false

                if(quality, translate, iframe){
                    return renderPlayer({id:idx,quality, translate, iframe})
                }

            }).filter(itm => itm) : false
            const renderPlayers = Array.isArray(renderPlayersAll) && renderPlayersAll.length ? yoLogo('🍿🍿🍿')+' '+renderPlayersAll.join('') : yoLogo(`😿 не найдено`)


            createNewElement({
                tag:'div',
                id:'yohoho-block',
                className:'yohoho-block',
                content:renderPlayers
            })



        }catch (e) {
            console.error({error:e.message})
        }
    }

    const renderPopup = function ()
    {
        const {iframe} = window?.YoK || false

        const inBody = true
        const tag = 'div'
        const id = `yohoho-popup-wp`
        const className = 'yohoho-popup-wp yohoho-popup-off'
        const label = `yohoho-popup-video`
        const content = `
    <div id="yohoho-popup" class="yohoho-popup">
      <div class="yohoho-popup-content">
        <span class="yohoho-popup-closer" data-action="exit">&#215;</span>
        <div id="yohoho-popup-menu"></div>
        <div id="yohoho-popup-iframe-loading">
                    <div class="yohoho-spinner-box">
                      <div class="yohoho-pulse-container">  
                        <div class="yohoho-pulse-bubble-white yohoho-pulse-bubble-1"></div>
                        <div class="yohoho-pulse-bubble-white yohoho-pulse-bubble-2"></div>
                        <div class="yohoho-pulse-bubble-white yohoho-pulse-bubble-3"></div>
                      </div>
            </div>  
        </div>     
        <div id="yohoho-popup-iframe" class="yohoho-popup-iframe-wrap yohoho-popup-off">                      
        </div>       

      </div>
    </div>
  `

        createNewElement({tag,id,className,content,inBody})

    }

    const action = async function ()
    {
        try {

            renderLoading()

            const kinopoisk = await fndFilmId()

            if(!kinopoisk){
                throw new Error(`can't get filme Id`)
            }


            const players = ['videocdn','kodik','collaps','hdvb','bazon','ustore','alloha','pleer','videospider','torrent']

            const player = `player=${encodeURIComponent(players.join(','))}`

            const query = `${player}&kinopoisk=${kinopoisk}`


            const options_url = getYoLink()
            const d = await yo_get(options_url, query)

            renderYoBlock(d)
            renderLoading(true)




        }catch (e) {
            createNewElement({
                tag:'div',
                id:'yohoho-error',
                className:'yohoho-block',
                content:e.message})
            renderLoading(true)
        }
    }

    const scriptToInject = () => {

        window.iframeErrload = function (err){
            console.log('iframeErrload',err)
        }

        window.iframePreload = function (){

            const yohohoLoading = document.getElementById('yohoho-popup-iframe-loading')
            const yohohoPopupIframe = document.getElementById('yohoho-popup-iframe')

            yohohoLoading.classList.add("yohoho-popup-off")
            yohohoPopupIframe.classList.remove("yohoho-popup-off")
        }

    };

    const testIsset =  document.querySelector("#yohoho-block")
    const testInfo = document.querySelector("#yohoho-logo-info")
    const testPopup = document.querySelector('#yohoho-popup')

        if(!testPopup){
            renderPopup()
        }

        if(!testIsset || !testInfo){
            action()

            InjectCode(scriptToInject)
        }

}



window.onclick = async e => {

    const sleep = m => new Promise(r => setTimeout(r, m))

    const {dataset} = e?.target || false

    const {iframe,action} = dataset || false

    const yohohoPopup = document.getElementById('yohoho-popup-wp')
    const yohohoPopupIframe = document.getElementById('yohoho-popup-iframe')
    const yohohoPopupExternalLink = document.getElementById('yohoho-popup-menu')
    const yohohoLoading = document.getElementById('yohoho-popup-iframe-loading')

    const iframeRender = `<iframe 
                                  onload="iframePreload()"
                                  onerror="iframeErrload('onerror')"
                                  src="${iframe}" 
                                  class="yohoho-popup-iframe" 
                                  allow="fullscreen" 
                                  frameborder="0"
                                                >                    
            <div class="yohoho-popup-iframe-info">
            Ваш браузер не поддерживает фреймы! <a href="${iframe}" target="_blank"/>открыть видео в новом окне</a>
            </div>
         </iframe>`

    const menuRender = `<a class="yohoho-popup-btn" href="${iframe}" target="_blank">в новом окне<a/>
                                                <button 
                                                        id="yohoho-popup-iframe-refresh" 
                                                        data-action="iframe-refresh"
                                                        data-iframe="${iframe}" 
                                                        class="yohoho-popup-btn"
                                                >Обновить</button>`



    switch (action || 'none') {

        case 'iframe-refresh':
        case "link":
            yohohoPopupExternalLink.innerHTML = menuRender
            yohohoPopupIframe.innerHTML = iframeRender

            yohohoLoading.classList.remove("yohoho-popup-off")
            yohohoPopupIframe.classList.add("yohoho-popup-off")
            yohohoPopup.classList.remove("yohoho-popup-off")

            return

        case "exit":
            yohohoPopup.classList.add("yohoho-popup-off")
            yohohoLoading.classList.remove("yohoho-popup-off")
            yohohoPopupIframe.classList.add("yohoho-popup-off")

            yohohoPopupIframe.innerHTML =``

            return;
        default:
            console.log('action:',action)
    }



}


