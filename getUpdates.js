import header from './header'

const getUpdates = async (factor, website) => {
    const headers = header()
    var url = `https://jeemain.nta.nic.in/webinfo2021`
    switch (website.toLowerCase()) {
        case 'jeemain':
        case 'jee':
            url = `https://jeemain.nta.nic.in/webinfo2021`
            break;
        case 'neet':
            url = `https://${website.toLowerCase()}.nta.nic.in`
            break;
        case 'arpit':
        case 'cucet':
            url = `https://${website.toLowerCase()}.nta.nic.in/WebInfoCms/Page/Page?PageId=1&LangId=P`
            break;
        default:
            url = `https://${website.toLowerCase()}.nta.nic.in/webinfo`
    }
    var dataWeb = await fetch(url, { redirect: 'follow' })
    dataWeb = await dataWeb.text()
    var WebsiteHtml = dataWeb.replace(/\s{2,}/g, '').trim()
    var SideBar = WebsiteHtml.split('<nav id="sidebar">')
    var i, result = [];
    try {
        if (factor == 'events') {
            var EventSideBar = SideBar[1].split('</nav>')[0]
            var Events = EventSideBar.split('<li>')
            for (i = 1; i < Events.length; i++) {
                try {
                    var event_link = Events[i].split('<a href="')[1].split('"')[0]
                    var status = Events[i].split("alt='new'").length
                    result.push({
                        name: (Events[i].split(event_link)[1].split('>')[1]).split('<')[0].replace(/&#39;/gi, "'").replace(/&amp;/gi, "&").replace(/&quot;/gi, "'").replace(/&#x27;/gi, "'").trim(),
                        new: status > 1,
                        url: event_link
                    })
                } catch (err) { }
            }
        } else if (factor == 'news') {
            var NewsSideBar = SideBar[4].split('</nav>')[0]
            var News = NewsSideBar.split('<li>')
            for (i = 1; i < News.length; i++) {
                try {
                    var news_link = News[i].split('<a href="')[1].split('"')[0]
                    var status = News[i].split("alt='new'").length

                    result.push({
                        name: (News[i].split(news_link)[1].split('>')[1]).split('<')[0].replace(/&#39;/gi, "'").replace(/&amp;/gi, "&").replace(/&quot;/gi, "'").replace(/&#x27;/gi, "'").trim(),
                        new: status > 1,
                        url: news_link
                    })

                } catch (err) { }
            }
        } else if (factor == 'status') {
            var StatusSideBar = SideBar[3].split('</nav>')[0]
            var Status = StatusSideBar.split('<a class="')
            for (i = 1; i < Status.length; i++) {
                var status_link = Status[i].split('href="')[1].split('"')[0]
                var status_name = Status[i].split('>')[1].split('<')[0]
                var status = Status[i].split("alt='new'").length
                result.push({
                    name: status_name.replace(/&#39;/gi, "'").replace(/&amp;/gi, "&").replace(/&quot;/gi, "'").replace(/&#x27;/gi, "'").trim(),
                    new: status > 1,
                    url: status_link
                })
            }

        } else if (factor == 'special') {
            var topics = WebsiteHtml.split('<legend')
            var highlights = []
            for (var i = 1; i < topics.length; i++) {
                highlights.push(lastEntry(topics[i].split('</legend>')[0].split('>')))
            }
            var link = WebsiteHtml.split('<a')
            var links = []
            for (var i = 1; i < link.length; i++) {
                var nameTosend = lastEntry(link[i].split('</a>')[0].replace(/alt="new">/g, '').split('>')).split('<')[0].trim()
                var urlTosend = link[i].split('href="')[1].split('"')[0]
                if (!invalidName(nameTosend) && isUseful(urlTosend)) {
                    links.push({
                        name: nameTosend,
                        url: urlTosend
                    })
                }
            }
            result.push(
                {
                    'highlights': highlights,
                    'links': links
                }
            )
        }

        return new Response(JSON.stringify(
            result
            , null, 2), {
            status: 200,
            headers
        })
    } catch (e) {
        var x = new Response(
            JSON.stringify({
                error_message: e.message
            }, null, 2), {
            status: 301,
            headers
        })
        return x
    }

}

const lastEntry = (x) => {
    var a = x[x.length - 1]
    if (a == '' || a == ' ') {
        try {
            var b = x[x.length - 2]
            if (b != undefined) { return b }
        } catch (e) { return '' }
    }
    return a
}

const isUseful = (urlTosend) => {
    var x = lastEntry(urlTosend)
    var y = lastEntry(urlTosend.split('/'))
    if (urlTosend == '' || x == '#') { return false }
    if (y == 'home.aspx' || y == 'abhyas') { return false }
    if (x == '/') {
        return urlTosend.split('/').length > 4
    } else {
        return urlTosend.split('/').length > 3
    }
}

const invalidName = (name) => {
    if (name[0] == '.') { return true }
    var invalid = ['home', 'contact us', '2021', '2020', '2022', '']
    for (var i = 0; i < invalid.length; i++) {
        if (name.toLowerCase() == invalid[i]) {
            return true
        }
    }
    return false
}

export default getUpdates