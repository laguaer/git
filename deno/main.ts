import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

serve(async (request) => {
      const url = new URL(request.url);
      const hostname = url.hostname;
      url.host = "github.com";
      const req = new Request(url, request);
      req.headers.set('origin', 'https://github.com');
      
      const res = await fetch(req);
      let newRes = new Response(res.body, res);
      
      let location = newRes.headers.get('location');
      if (location !== null && location !== "") {
            location = location.replace('://github.com', '://freegit.deno.dev');
            newRes.headers.set('location', location);
      }
      return newRes 
});

