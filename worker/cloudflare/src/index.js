const ALLOWED_ORIGIN = "https://ftpiovano.github.io";
const SYSTEM_PROMPT =
    "You are BIG Intelligence AI's website assistant. Be concise, helpful, and ask clarifying questions. If asked for pricing, respond with ranges and suggest booking a call. Avoid collecting sensitive data.";

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;
const ipBuckets = new Map();

function jsonResponse(status, payload, origin = ALLOWED_ORIGIN) {
    return new Response(JSON.stringify(payload), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    });
}

function sanitizeMessages(messages) {
    if (!Array.isArray(messages)) return [];
    const out = [];
    for (const msg of messages) {
        if (!msg || (msg.role !== "user" && msg.role !== "assistant")) continue;
        if (typeof msg.content !== "string") continue;
        const content = msg.content.trim().slice(0, 1000);
        if (!content) continue;
        out.push({ role: msg.role, content });
    }
    return out.slice(-20);
}

function checkRateLimit(ip) {
    const now = Date.now();
    const bucket = ipBuckets.get(ip) || [];
    const fresh = bucket.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    if (fresh.length >= RATE_LIMIT_MAX_REQUESTS) {
        ipBuckets.set(ip, fresh);
        return false;
    }
    fresh.push(now);
    ipBuckets.set(ip, fresh);
    return true;
}

export default {
    async fetch(request, env) {
        const origin = request.headers.get("Origin") || "";
        const isAllowedOrigin = origin === ALLOWED_ORIGIN;

        if (request.method === "OPTIONS") {
            if (!isAllowedOrigin) return new Response(null, { status: 403 });
            return new Response(null, {
                status: 204,
                headers: {
                    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                }
            });
        }

        const url = new URL(request.url);
        if (url.pathname !== "/api/chat") {
            return new Response("Not found", { status: 404 });
        }

        if (request.method !== "POST") {
            return jsonResponse(405, { error: "Method not allowed" }, isAllowedOrigin ? ALLOWED_ORIGIN : "null");
        }

        if (!isAllowedOrigin) {
            return jsonResponse(403, { error: "Forbidden origin" }, "null");
        }

        const ip = request.headers.get("CF-Connecting-IP") || "unknown";
        if (!checkRateLimit(ip)) {
            return jsonResponse(429, { error: "Too many requests. Please try again soon." });
        }

        let body;
        try {
            body = await request.json();
        } catch (err) {
            return jsonResponse(400, { error: "Invalid JSON payload" });
        }

        const messages = sanitizeMessages(body?.messages);
        if (!messages.length) {
            return jsonResponse(400, { error: "No valid messages provided" });
        }

        if (!env.OPENAI_API_KEY) {
            return jsonResponse(500, { error: "Server misconfiguration" });
        }

        try {
            const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    temperature: 0.4,
                    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages]
                })
            });

            if (!openAiResponse.ok) {
                const errText = await openAiResponse.text();
                return jsonResponse(502, { error: "Upstream model call failed", details: errText.slice(0, 500) });
            }

            const data = await openAiResponse.json();
            const reply = data?.choices?.[0]?.message?.content?.trim();
            if (!reply) {
                return jsonResponse(502, { error: "Empty model response" });
            }

            return jsonResponse(200, { reply });
        } catch (err) {
            return jsonResponse(500, { error: "Unexpected server error" });
        }
    }
};
