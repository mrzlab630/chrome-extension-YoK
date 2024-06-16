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
    const YOK = {
        targetApi: 'kinobox',
        kinopoiskId: null,
        moviesList: null,
        error: null,
        apis: [
            {
                name: 'yohoho',
                apiLink: 'https://ahoy.yohoho.cc',
                players: ['videocdn', 'kodik', 'collaps', 'hdvb', 'bazon', 'ustore', 'alloha', 'pleer', 'videospider', 'torrent', 'iframe'],
                method: 'POST',
                headers: {
                    'origin': 'https://4h0y.gitlab.io',
                    'referer': 'https://4h0y.gitlab.io/',
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            },
            {
                name: 'kinobox',
                apiLink: 'https://kinobox.tv/api',
                players: ['all', 'alloha', 'kodik', 'videocdn'],
                method: 'GET',
                headers: {
                    'origin': 'https://kinomix.web.app',
                    'referer': 'https://kinomix.web.app/',
                    'Content-Type': 'application/json',
                }
            }
        ]
    };

    const getMovieData = function () {
        try {
            const context = document.querySelector('script[type="application/ld+json"]');
            if (!context) {
                throw new Error('context не найден');
            }
            return JSON.parse(context.innerHTML);
        } catch (e) {
            return { error: e?.message };
        }
    };

    const getMovies = async function ({ url, method, headers, body }) {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'accept': '*/*',
                    'accept-encoding': 'gzip, deflate, br',
                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                    ...headers
                },
                body
            });

            if (response.status !== 200) {
                throw new Error('ошибка загрузки списка фильмов. ' + response.statusText);
            }

            const result = await response.json();
            return { result };
        } catch (e) {
            return { error: e.message };
        }
    };

    const newElement = ({ tag, id, className, content }) => {
        const el = document.createElement(tag);
        if (id) el.setAttribute('id', id);
        if (className) el.setAttribute('class', className);
        el.innerHTML = content;
        return el;
    };

    const renderData = function (content) {
        try {

            const buttonBlocks = document.querySelectorAll('div[class^="styles_buttons__"], div[class^="styles_watchOnlineBlock__"], div[class^="styles_watchOnlineDescription__"]');
            const buttonBlock = buttonBlocks[0];

            if (!buttonBlock) {
                throw new Error('блок кнопок не найден');
            }

            const existingYokBlock = document.getElementById('YOK-block');
            if (existingYokBlock) {
                existingYokBlock.innerHTML = `<div>${yoLogo('🍿🍿🍿')}</div><div id="YOK-block-content">${content}</div>`;
            } else {
                buttonBlock.appendChild(newElement({
                    tag: 'div',
                    id: 'YOK-block',
                    className: 'YOK-block',
                    content: `<div>${yoLogo('🍿🍿🍿')}</div><div id="YOK-block-content">${content}</div>`
                }));
            }
        } catch (e) {
            const existingErrorBlock = document.getElementById('YOK-block-error');
            if (existingErrorBlock) {
                existingErrorBlock.innerHTML = `<div class="YOK-block-error-wrap"><div>${yoLogo('🍿🍿🍿')}</div><div>${content || e?.message}</div></div>`;
            } else {
                document.body.appendChild(newElement({
                    tag: 'div',
                    id: 'YOK-block-error',
                    className: 'YOK-block-error',
                    content: `<div class="YOK-block-error-wrap"><div>${yoLogo('🍿🍿🍿')}</div><div>${content || e?.message}</div></div>`
                }));
            }
        }
    };

    const renderInfo = (content) => {
        const yokBlockContent = document.getElementById('YOK-block-content');
        if (yokBlockContent) {
            yokBlockContent.innerHTML = content;
        } else {
            renderData(content);
        }
    };



    const linkMovie = ({ label, href }) => `<a class="YOK-itm" href='${href}' target='_blank'>${label}</a>`;
    const rightSvg = (width = 32, height = 32, fill = '#FFFFFF') => `<span class="YOK-svg-right"><svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="${fill}" viewBox="0 0 24 24"><path d="M15.2929 14.2929L16 15L19 12L16 9L15.2929 9.70711L17.0858 11.5L5 11.5V12.5L17.0857 12.5L15.2929 14.2929Z"/></svg></span>`;
    const yoLogo = (info = '') => `<span id="YOK-logo-info" class="YOK-logo-info">YoK${rightSvg()} ${info}</span>`;
    const progressBar = `<div class="YOK-spinner-box">
                      <div class="YOK-pulse-container">
                        <div class="YOK-pulse-bubble YOK-pulse-bubble-1"></div>
                        <div class="YOK-pulse-bubble YOK-pulse-bubble-2"></div>
                        <div class="YOK-pulse-bubble YOK-pulse-bubble-3"></div>
                      </div>
                    </div>`

    let renderInPage                
                    
    try {
        
        renderInfo(progressBar)

        
        const { url, error } = getMovieData();
        if (error) {
            throw new Error(error);
        }

        const kinopoisk = url.split('/').filter(itm => Number(itm)).pop();
        if (!kinopoisk) {
            throw new Error('id фильма не найден');
        }

        YOK.kinopoiskId = kinopoisk;
       

        /**
         *  loading data
         */

        const { apiLink, players, method, headers } = YOK.apis.filter(itm => itm.name === YOK.targetApi).pop();
        let player;
        let query;
        let apiUrl = apiLink;

        if (!apiLink) {
            throw new Error('api link не найден');
        }

        switch (YOK.targetApi) {
            case 'yohoho':
                player = `player=${encodeURIComponent(players.join(','))}`;
                query = `${player}&kinopoisk=${YOK?.kinopoiskId}`;
                break;

            case 'kinobox':
                apiUrl = `${apiLink}/players?kinopoisk=${YOK?.kinopoiskId}`;
                break;
        }


        const getMlist = await getMovies({
            url: apiUrl,
            method,
            headers,
            body: query
        });

        const { 
                    result: moviesList, 
                    error: loadingErr, 
                    message: loadingError 
                } = getMlist

                const errLoading = loadingErr || loadingError

        if (errLoading) {
            throw new Error(errLoading)
        }

        YOK.moviesList = moviesList;
        let linkMovieList = [];

        switch (YOK.targetApi) {
            case 'yohoho':
                if (!moviesList || Object.keys(moviesList).length === 0) {
                    throw new Error(`не найдено`)               
                }

                Object.keys(moviesList).forEach(itm => {
                    const { iframe, quality, translate } = moviesList[itm];

                    if (!iframe) {
                        return;
                    }
                    linkMovieList.push(linkMovie({
                        href: iframe,
                        label: quality ? `${quality} ${translate}` : 'смотреть'
                    }));
                });
                break;

            case 'kinobox':
                if (!Array.isArray(moviesList) || moviesList.length === 0) {
                    throw new Error(`не найдено`)                 
                }

                const dataVideocdn = moviesList.filter(itm => itm.source.toLocaleLowerCase() === 'videocdn').pop()

                if(!dataVideocdn){
                    throw new Error(`не найдено`)     
                }

                linkMovieList = linkMovie({ href: dataVideocdn.iframeUrl, label: 'смотреть' })


                // или все источники
                // linkMovieList = moviesList.map(({
                //     iframeUrl,
                //     source,
                //     translations,
                // }) => {     
                //     console.log('source',source)    
                    
                //     // Alloha is dead!
                //     if (!Array.isArray(translations) || translations.length === 0 || source === 'Alloha' )
                //          {
                //         return;
                //     }


                //     return linkMovie({
                //                         href: iframeUrl,
                //                         label: source ? `${source}` : 'смотреть'
                //                     })

                // }).filter(i => i)


                break;
        }
        
            if(linkMovieList.length === 0){
                throw new Error(`<span class="YOK-error">не найдено</span>`)
            }

            renderInPage = linkMovieList //.join('')

    } catch (e) {
        YOK.error = e.message;
        renderInPage = `<span class="YOK-error">😿 ${e?.message || 'не найдено'}</span>`

    }finally{
        if(!renderInPage){
            return
        }
        renderInfo(renderInPage)
    }
}

const fillContent = () => {
    const url = window.location.href;
    const yBlock = document.getElementById('YOK-block');

    if (!url?.includes('series') && !url?.includes('film')) {
        return;
    }
    if (yBlock) {
        yBlock.remove();
    }

    action();
};

document.addEventListener("DOMContentLoaded", fillContent);

chrome.storage.onChanged.addListener(changes => {
    try {
        const { YOK } = changes;
        const { newValue, oldValue } = YOK;

        if (newValue?.title === oldValue?.title) {
            return;
        }
        fillContent();

    } catch (e) {
        console.error({ YOK: e.message });
    }
});
