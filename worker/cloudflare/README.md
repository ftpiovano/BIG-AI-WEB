# Cloudflare Worker Chat Backend

This worker exposes:

- `POST /api/chat` -> `{ reply: string }`

It is locked to:

- `https://ftpiovano.github.io` (CORS allowlist)

## 1) Prerequisites

- Node.js 18+
- Cloudflare account
- Wrangler CLI:

```bash
npm i -g wrangler
```

## 2) Login and deploy

From `worker/cloudflare`:

```bash
wrangler login
wrangler secret put OPENAI_API_KEY
wrangler deploy
```

After deploy, Wrangler prints your worker URL, for example:

`https://big-ai-web-chat.<subdomain>.workers.dev`

## 3) Frontend configuration

In `index.html`, before loading `assets/js/chat-widget.js`, set:

```html
<script>
  window.BIGAI_CHAT_API_URL = "https://big-ai-web-chat.<subdomain>.workers.dev/api/chat";
</script>
```

If omitted, frontend defaults to `"/api/chat"`.

## Notes

- Rate limiting is in-memory per IP (best-effort).
- Keep secrets in Cloudflare (`wrangler secret`), never in GitHub Pages code.
