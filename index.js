import getUpdates from './getUpdates'
import header from './header'

async function handleRequest(request) {
    const headers = header()
    var path = new URL(request.url).pathname;

    if (request.method == 'GET') {
        var website = `jee`
        if (path.split('/').length > 2) {
            website = path.split('/')[1].toLowerCase()
            path = `/${path.split('/')[2]}`.toLowerCase()
        }
        if (path.startsWith('/events')) {
            return await getUpdates('events', website)
        } else if (path.startsWith('/news')) {
            return await getUpdates('news', website)
        } else if (path.startsWith('/status')) {
            return await getUpdates('status', website)
        } else if (path.startsWith('/special')) {
            return await getUpdates('special', website)
        } else {
            if (path.split('/').length == 2 && path.split('/')[1].toLowerCase() != '') { website = path.split('/')[1].toLowerCase() }
            const url = `https://${website}.nta.nic.in/`
            const alive = (await fetch(url)).ok
            return new Response(JSON.stringify({
                website_alive: alive,
                repository_name: 'NTA Updates API',
                version: '1.1.0',
                exam_code: website,
                repository_description: 'NTA Updates API written in javascript to fetch latest data from NTA managed website',
                repository_url: 'https://github.com/dvishal485/JEE-Updates-API',
                made_by: 'https://github.com/dvishal485',
                api_endpoints: {
                    'events': 'https://nta.dvishal485.workers.dev/{exam_code}/events',
                    'news': 'https://nta.dvishal485.workers.dev/{exam_code}/news',
                    'status': 'https://nta.dvishal485.workers.dev/{exam_code}/status',
                    'special': 'https://nta.dvishal485.workers.dev/{exam_code}/special'
                }
            }, null, 2), {
                status: 200,
                headers
            })
        }
    } else {
        return Response.redirect("https://github.com/dvishal485/JEE-Updates-API", 301)
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})