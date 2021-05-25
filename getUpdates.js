const getUpdates = async (factor) => {
    const url = `https://jeemain.nta.nic.in/webinfo2021`
    const jeeWebsite = await (await fetch(url)).text()
    var SideBar = jeeWebsite.split('<nav id="sidebar">')
    var i, result = [];
    if (factor == 'events') {
        var EventSideBar = SideBar[1].split('</nav>')[0]
        var Events = EventSideBar.split('<li>')
        for (i = 1; i < Events.length; i++) {
            try {
                var event_link = Events[i].split('<a href="')[1].split('"')[0]
                var status = Events[i].split("alt='new'").length

                result.push({
                    name: (Events[i].split(event_link)[1].split('>')[1]).split('<')[0].replace(/&#39;/gi, "'").replace(/&amp;/gi, "&").replace(/&quot;/gi, "'").replace(/&#x27;/gi, "'"),
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
                    name: (News[i].split(news_link)[1].split('>')[1]).split('<')[0].replace(/&#39;/gi, "'").replace(/&amp;/gi, "&").replace(/&quot;/gi, "'").replace(/&#x27;/gi, "'"),
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
                name: status_name.replace(/&#39;/gi, "'").replace(/&amp;/gi, "&").replace(/&quot;/gi, "'").replace(/&#x27;/gi, "'"),
                new: status > 1,
                url: status_link
            })
        }

    }
    return JSON.stringify({
        total_result: result.length,
        result
    }, null, 2)
}


export default getUpdates