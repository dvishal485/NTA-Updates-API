const header = () => {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Max-Age": "86400",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Made-By": atob('VmlzaGFsIERhcyBodHRwczovL2dpdGh1Yi5jb20vZHZpc2hhbDQ4NQ==')
    }
}

export default header