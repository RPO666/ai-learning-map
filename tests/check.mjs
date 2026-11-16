import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { TOPICS, CATEGORIES } from '../scripts/data.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => readFile(path.join(root, file), 'utf8');

// 這些是可自動化的靜態檢查，不等於完整的視覺或可用性驗收。
test('專案必要檔案存在', async () => {
  for (const file of ['index.html','guide.html','AGENTS.md','README.md','CHANGELOG.md', 'styles/main.css', 'scripts/data.js','scripts/app.js','assets/favicon.svg']) {
    assert.ok((await stat(path.join(root,file))).isFile(), `缺少 ${file}`);
  }
});

test('學習資料有四類與至少十二張概念卡', () => {
  assert.deepEqual(CATEGORIES, ['基礎觀念','模型架構','模型效率','工程實作']);
  assert.ok(TOPICS.length >= 12);
  for (const category of CATEGORIES) assert.ok(TOPICS.some(topic => topic.category === category), `缺少 ${category}`);
});

test('概念卡的 id 唯一、欄位齊全且格式正確', () => {
  const ids = new Set();
  for (const topic of TOPICS) {
    assert.match(topic.id, /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/, `${topic.title} id 格式錯誤`);
    assert.ok(!ids.has(topic.id), `重複 id：${topic.id}`);
    ids.add(topic.id);
    assert.ok(CATEGORIES.includes(topic.category), `未知分類：${topic.category}`);
    assert.ok(['入門','進階'].includes(topic.level), `程度錯誤：${topic.title}`);
    assert.ok(Number.isInteger(topic.minutes) && topic.minutes > 0);
    for (const key of ['title','summary','analogy','application']) {
      assert.ok(typeof topic[key] === 'string' && topic[key].trim().length >= 10, `${topic.id} ${key} 不能空白或過短`);
    }
    assert.ok(Array.isArray(topic.takeaways) && topic.takeaways.length === 3 && topic.takeaways.every(t => t.length >= 8), `${topic.id} 必須有三個重點`);
    assert.ok(Array.isArray(topic.tags) && topic.tags.length >= 2 && topic.tags.length <= 4);
  }
});

test('已依照規則新增 RAG 範例，原有互動資料格式不變', () => {
  const rag = TOPICS.find(topic => topic.id === 'rag');
  assert.ok(rag);
  assert.equal(rag.category, '工程實作');
  assert.equal(rag.takeaways.length, 3);
});

test('兩個 HTML 頁面有基本結構、可訪問導覽與相對路徑', async () => {
  for (const page of ['index.html', 'guide.html']) {
    const html = await read(page);
    for (const fragment of ['<!doctype html>', 'lang="zh-Hant"', 'name="viewport"', 'href="./styles/main.css"', '<main id="main-content">', 'href="./guide.html"', 'href="./index.html"', 'class="site-footer"', 'class="skip-link"']) {
      assert.ok(html.includes(fragment), `${page} 缺少：${fragment}`);
    }
    assert.ok(!html.includes('https://fonts.googleapis.com'), '網站不得依賴外部字體服務');
  }
});

test('互動入口、頁面節點與資料名稱相容', async () => {
  const home = await read('index.html');
  const js = await read('scripts/app.js');
  for (const id of ['concept-grid','search-input','category-filter','incomplete-only','topic-dialog','dialog-close','dialog-body','dialog-complete','progress-track','progress-fill','clear-filters','empty-reset','empty-state','hero-count','total-count','completed-count','progress-percent','results-status']) {
    assert.ok(home.includes(`id="${id}"`), `HTML 找不到節點 ${id}`);
    assert.ok(js.includes(`#${id}`), `app.js 找不到節點 ${id}`);
  }
  assert.ok(js.includes('localStorage'));
  assert.ok(!js.includes('innerHTML'), '避免不安全的 innerHTML 插入');
});

test('css 支援響應式與減少動態效果', async () => {
  const css = await read('styles/main.css');
  assert.ok(css.includes('@media (max-width: 720px)'));
  assert.ok(css.includes('@media (max-width: 480px)'));
  assert.ok(css.includes('prefers-reduced-motion'));
});

test('站內相對連結與資源路徑存在，頁內錨點可找到對應 id', async () => {
  for (const page of ['index.html','guide.html']) {
    const html = await read(page);
    const linkPattern = /\b(?:href|src)="([^"]+)"/g;
    for (const [, url] of html.matchAll(linkPattern)) {
      if (url.startsWith('#')) {
        assert.ok(html.includes(`id="${url.slice(1)}"`), `${page} 錨點不存在：${url}`);
      } else if (url.startsWith('./')) {
        const [filename, fragment] = url.slice(2).split('#');
        assert.ok((await stat(path.join(root,filename))).isFile(), `${page} 路徑不存在：${url}`);
        if (fragment) {
          const linked = await read(filename);
          assert.ok(linked.includes(`id="${fragment}"`), `${page} 連到不存在的錨點：${url}`);
        }
      }
    }
  }
});
