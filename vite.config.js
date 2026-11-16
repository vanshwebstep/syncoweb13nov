import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { execSync } from 'child_process';

const REMOTE_BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/';

const imagePathMap = new Map();
try {
  const tree = execSync('git ls-tree -r HEAD --name-only', { encoding: 'utf-8' });
  tree.split('\n').forEach((line) => {
    line = line.trim();
    if (line.startsWith('src/images/')) {
      const rel = line.replace('src/images/', '');
      imagePathMap.set(rel.toLowerCase(), rel);
      const base = path.basename(rel).toLowerCase();
      if (!imagePathMap.has(base)) {
        imagePathMap.set(base, rel);
      }
    }
  });
} catch (e) {
  console.warn('Could not read git tree for image paths:', e.message);
}

function remoteImagesPlugin() {
  return {
    name: 'remote-images-plugin',
    enforce: 'pre',
    resolveId(source) {
      if (source.includes('images/') || /\.(png|jpg|jpeg|gif|svg|webp|ico)(\?.*)?$/i.test(source)) {
        const clean = source.split('?')[0].split('#')[0];
        const match = clean.match(/images\/(.+)$/);
        const imgRel = match ? match[1] : path.basename(clean);
        const exact = imagePathMap.get(imgRel.toLowerCase()) || imgRel;
        return `\0remote-img:${exact}`;
      }
      return null;
    },
    load(id) {
      if (id.startsWith('\0remote-img:')) {
        const imgPath = id.replace('\0remote-img:', '');
        return `export default "${REMOTE_BASE}${imgPath}";`;
      }
      return null;
    },
    transform(code, id) {
      if (id.endsWith('.css') || id.includes('.css?')) {
        return {
          code: code.replace(/url\(['"]?(?:(?:\/src)?\/images\/|\.\.\/images\/)([^'")]+)['"]?\)/g, (m, p) => {
            const cleanP = p.split('?')[0].split('#')[0];
            const exact = imagePathMap.get(cleanP.toLowerCase()) || cleanP;
            return `url("${REMOTE_BASE}${exact}")`;
          }),
          map: null,
        };
      }
      if (/\.[jt]sx?(\?.*)?$/.test(id)) {
        const transformed = code.replace(
          /import\s+([A-Za-z0-9_$]+)\s+from\s+['"](https:\/\/webstepdev\.com\/demo\/syncoWebsiteImages\/[^'"]+)['"];?/g,
          (m, varName, url) => {
            const fixedUrl = url.replace(/footerlogo\.png/i, 'footerLogo.png');
            return `const ${varName} = "${fixedUrl}";`;
          }
        );
        return { code: transformed, map: null };
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [remoteImagesPlugin(), react()],
  build: {
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
