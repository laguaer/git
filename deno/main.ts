import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

serve(async (request) => {
    const url = new URL(request.url);
    url.host = "github.com";
    return await fetch(url, request);
});
