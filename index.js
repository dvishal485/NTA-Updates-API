import getUpdates from './getUpdates'
import header from './header'

async function handleRequest(request) { /* Handle the incoming request */
    const headers = header(request.headers)
    const path = new URL(request.url).pathname; /* Get the pathname */

    if (request.method == 'GET') { /* Respond for GET request method */
        if (path.startsWith('/events')) { /* 
             */
            return new Response(await getUpdates('events'), {
                status: 200,
                headers
            })
        } else if (path.startsWith('/news')) { /* Product Page */
            return new Response(await getUpdates('news'), {
                status: 200,
                headers
            })
        }  else if (path.startsWith('/status')) { /* Product Page */
            return new Response(await getUpdates('status'), {
                status: 200,
                headers
            })
        } else {
            return new Response(JSON.stringify({ /* Extra curricular activities */
                alive: true,
                repository_name: 'JEE-Updates-API',
                repository_description: 'JEE Updates API written in javascript to fetch latest data from JEE Mains website',
                repository_url: 'https://github.com/dvishal485/JEE-Updates-API',
                made_by: 'https://github.com/dvishal485',
            }, null, 2), {
                status: 200,
                headers
            })
        }
    } else if (request.method === 'OPTIONS') { /* Respond for OPTIONS request method */
        return new Response("", {
            status: 200,
            headers
        })
    } else { /* Respond for other request methods */
        return Response.redirect("https://github.com/dvishal485/JEE-Updates-API", 301)
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})