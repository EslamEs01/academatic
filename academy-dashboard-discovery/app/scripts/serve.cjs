/* Minimal local static server (dev + screenshots). Serves the app/ dir.
 * No CDN, no framework — just enough to load native ES modules + assets.
 * Usage: node scripts/serve.cjs [port]   (default 4178). "/" → dashboard.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../public'); // serve the built static site
const PORT = Number(process.argv[2]) || Number(process.env.PORT) || 4178;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const ROUTES = {
  '/': '/dashboard.html',
  '/dashboard': '/dashboard.html',
  '/reports': '/reports.html',
  '/gallery': '/gallery.html',
};

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (ROUTES[urlPath]) urlPath = ROUTES[urlPath];
    let filePath = path.normalize(path.join(ROOT, urlPath));
    if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('forbidden'); }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
    if (!fs.existsSync(filePath)) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('not found: ' + urlPath); }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(filePath).pipe(res);
  } catch (e) {
    res.writeHead(500); res.end('error: ' + e.message);
  }
});

server.listen(PORT, () => console.log(`[serve] http://localhost:${PORT}  (root: ${ROOT})`));
module.exports = { server, PORT };
