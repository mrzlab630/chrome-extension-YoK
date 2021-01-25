'use strict'


const getYoLink = function () {

    const date1 = new Date()
    const date2 = new Date('2021-10-21')
    const tld = date1 > date2 ? 'cc' : 'online'
    const options_url = 'https://ahoy.yohoho.' + tld + '?cache' + Math.random().toString().substr(2, 3)

    return options_url


}

const yo_get = async function (url, body,callback)
{
    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body //JSON.stringify(body) // body data type must match "Content-Type" header
        });

        const res =   await response.text()
        return JSON.parse(res);


        /*
                const YoXmlHttp = new XMLHttpRequest();
                YoXmlHttp.onreadystatechange = function() {
                    if (YoXmlHttp.readyState === 4) {
                        if (YoXmlHttp.status === 200) {
                            callback(YoXmlHttp.responseText);
                        }
                        else {
                            callback({}, '');
                        }
                    }
                };
                YoXmlHttp.open('POST', url, true);
                YoXmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                YoXmlHttp.send(body);
*/

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


const renderYoBlock = function (players) {
    try {

        if(!players){
            return
        }

        const divOne =  document.querySelector(".styles_title__3tVSa")
        const divTwo =  document.querySelector(".styles_watchOnlineContainer__3-xcJ")

        const div = divOne || divTwo

        const elementTag = 'div'
        const elementId = 'yohoho-block'

        const renderPlayer = ({quality, translate, iframe}) => (`<div id="yohoho-itm" class="yohoho-itm">
                                                                    <a href="${iframe}" target="_blank">
                                                                      <span>${quality}</span>
                                                                      <span>${translate}</span>
                                                                      </a>                                                                    
                                                                </div>`)


       const renderPlayers = Object.keys(players).map(itm => {

               const {quality, translate, iframe} = players[itm] || false

               if(quality, translate, iframe){
                   return renderPlayer({quality, translate, iframe})
               }
           }).filter(itm => itm).join('')


        if(div){
            const newElement = document.createElement(elementTag)
            newElement.setAttribute('id', elementId)
            newElement.setAttribute('class', elementId)
            newElement.innerHTML = renderPlayers
            div.appendChild(newElement)
        }


    }catch (e) {
        console.error({error:e.message})
    }
}


const go = async () =>{
    /*
"https://ahoy.yohoho.online?cache746"
"player=videocdn%2Ckodik%2Ccollaps%2Chdvb%2Cbazon%2Custore%2Calloha%2Cpleer%2Cvideospider%2Ctorrent&kinopoisk=1112702"
videocdn,kodik,collaps,hdvb,bazon,ustore,alloha,pleer,videospider,torrent
*/
    try{

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

    }catch (e) {
        console.error({error:e.message})
    }

}

document.body.onload = go()