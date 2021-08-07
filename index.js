import getUpdates from './getUpdates'
import header from './header'

async function handleRequest(request) {
    const headers = header()
    const path = new URL(request.url).pathname;

    if (request.method == 'GET') {
        if (path.startsWith('/events')) {
            return await getUpdates('events')
        } else if (path.startsWith('/news')) {
            return await getUpdates('news')
        } else if (path.startsWith('/status')) {
            return await getUpdates('status')
        } else if (path.startsWith('/special')) {
            return await getUpdates('special')
        } else {
            const url = `https://jeemain.nta.nic.in/webinfo2021`
            const alive = (await fetch(url)).ok
            return new Response(JSON.stringify({
                website_alive: alive,
                repository_name: 'JEE Updates API',
                repository_description: 'JEE Updates API written in javascript to fetch latest data from JEE Mains website',
                repository_url: 'https://github.com/dvishal485/JEE-Updates-API',
                made_by: 'https://github.com/dvishal485',
                api_endpoints: {
                    'events': 'https://jee-updates-api.dvishal485.workers.dev/events',
                    'news': 'https://jee-updates-api.dvishal485.workers.dev/news',
                    'status': 'https://jee-updates-api.dvishal485.workers.dev/status',
                    'special': 'https://jee-updates-api.dvishal485.workers.dev/special'
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