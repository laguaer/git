import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

serve(async (request) => {
      const url = new URL(request.url);
      const hostname = url.hostname;
      url.host = "github.com";
      
      const headers = new Headers(request.headers);
    headers.set('origin', 'https://github.com');
      
       const req = new Request(_url, {
      method: request.method,
      headers: headers,
      body: request.body,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
    });
 
const res = await fetch(req);
      
      const newRes = new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    });

      let location = newRes.headers.get('location');
      if (location !== null && location !== "") {
            location = location.replace('://github.com', '://' + hostname);
            newRes.headers.set('location', location);
      }
      return newRes 
});
