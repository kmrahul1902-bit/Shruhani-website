# Shruhani Technologies — website

A single-page static site. The whole site is in `index.html`. `package.json`
exists only so Railway knows how to serve it (a tiny Node static server called
`serve`).

## Files
- `index.html` — the website (edit content here)
- `package.json` — start command for Railway
- `.gitignore`

## Deploy on Railway — option A (GitHub, recommended)
1. Put these files in a GitHub repo (root level, not in a subfolder).
2. In Railway: **New Project → Deploy from GitHub repo** and pick the repo.
3. Railway auto-detects Node, runs `npm install`, then `npm start`. No config needed.
4. Once it's live, open **Settings → Networking → Generate Domain** to get a
   `*.up.railway.app` URL and confirm it loads.

## Deploy on Railway — option B (CLI)
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

## Point your own domain
1. Railway project → **Settings → Networking → Custom Domain** → add your domain
   (e.g. `www.yourdomain.com`).
2. Railway shows a CNAME target. Add that CNAME record at your domain registrar.
3. For a root/apex domain (`yourdomain.com`), use your registrar's ALIAS/ANAME, or
   redirect the apex to `www`. HTTPS is issued automatically once DNS resolves.

## Run locally (optional)
```bash
npm install
npm start
# open the printed localhost URL
```
