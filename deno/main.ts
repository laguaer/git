import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

serve(async (request) => {
      const _url = new URL(request.url);
 4    const hostname = _url.hostname
 5    _url.hostname = "github.com"
 6    const req = new Request(_url, request);
 7    req.headers.set('origin', 'https://github.com');
 8    
 9    const res = await fetch(req);
10    let newres = new Response(res.body, res);
11
12    let location = newres.headers.get('location');
13    if (location !== null && location !== "") {
14      location = location.replace('://github.com', '://'+hostname);
15      newres.headers.set('location', location);
16    }
17    return newres 
});

