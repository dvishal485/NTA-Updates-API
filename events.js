const events = async (host) => {

    const jeeWebsite = await (await fetch(`https://jeemain.nta.nic.in/webinfo2021`)).text()
    //var Box = jeeWebsite.split('<div class="boxdesignCurrentEvents">')
    var SideBar = jeeWebsite.split('<nav id="sidebar">')
    var EventSideBar = SideBar[1].split('</nav>')[0]
    var Events = EventSideBar.split('<li>')

   var i, result = [];
    for (i = 1; i < Events.length; i++) {
        try {
            var event_link = Events[i].split('<a href="')[1].split('"')[0]
            var status =  Events[i].split("alt='new'").length

                result.push({
                    name: (Events[i].split(event_link)[1].split('>')[1]).split('<')[0].replace(/&#39;/gi, "'").replace(/&amp;/gi, "&").replace(/&quot;/gi, "'").replace(/&#x27;/gi, "'"),
                    new: status>1,
                    url: event_link
                })
            
        } catch (err) { }

    }
    return JSON.stringify({
        status: true,
        total_result: result.length,
        result
    }, null, 2)
}


export default events