// Keeps Fyr in line with the Messaging Framework.
//   node tools/sync-framework.mjs           inject docs/messaging-framework.json into the prototype, then check the copy
//   node tools/sync-framework.mjs --check   only check the copy (exit 1 on any error)
// The framework document (see source.url in the JSON) is the source; figures and the brand's "never" list come from the Simployer Brand system (brand.url, docs/BRAND.md). When it changes: update the JSON, run this, fix what it flags.
import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const FW = new URL('docs/messaging-framework.json', root);
const TARGET = new URL('prototype/v0.3/index.html', root);
const BEGIN = '/* MF:BEGIN generated from docs/messaging-framework.json by tools/sync-framework.mjs. Do not edit by hand. */';
const END = '/* MF:END */';

// Top-level blocks in the prototype that hold customer-facing copy (slides, truth, packs, ads, talk tracks).
const COPY_BLOCKS = ['L', 'PRULES', 'DISC_QUOTES', 'FEATURES', 'FL', 'NEWF', 'ADS', 'VADS', 'SOCIAL', 'RELEASES', 'TPL', 'LOC', 'REFS', 'EXAMPLE', 'BATTLE',
  'PILLARS', 'ROADMAP', 'RM_UI', 'vRoadmap', 'slideHTML', 'vDeck', 'genFields', 'itemBody', 'adFromRelease', 'autoFill', 'autoItem', 'vBanner', 'BC'];

const fw = JSON.parse(await readFile(FW, 'utf8'));
let html = await readFile(TARGET, 'utf8');

if (!process.argv.includes('--check')) {
  const a = html.indexOf(BEGIN), b = html.indexOf(END);
  if (a < 0 || b < a) throw new Error(`Markers not found in ${TARGET.pathname}`);
  html = html.slice(0, a) + `${BEGIN}\nconst MF = ${JSON.stringify(fw)};\n` + html.slice(b);
  await writeFile(TARGET, html);
  console.log(`Synced Messaging Framework ${fw.source.version} into ${TARGET.pathname.split('/Fyr/')[1]}`);
}

// Copy check: every avoid pattern against the customer-facing blocks.
const rules = fw.avoid.map(r => ({ ...r, re: new RegExp(r.pattern, 'gi') }));
let ctx = null, errors = 0, warnings = 0;
html.split('\n').forEach((line, i) => {
  const m = line.match(/^(?:const|let|async function|function)\s+([A-Za-z_$]+)|^Object\.assign\(([A-Za-z_$]+)/);
  if (m) ctx = m[1] || m[2];
  if (!COPY_BLOCKS.includes(ctx)) return;
  for (const r of rules) {
    if ((r.skip || []).includes(ctx)) continue;
    for (const hit of line.matchAll(r.re)) {
      const at = Math.max(0, hit.index - 50), warn = r.level === 'warn';
      warn ? warnings++ : errors++;
      console.log(`${warn ? 'warn ' : 'ERROR'} l.${i + 1} [${ctx}] ${r.why}\n      …${line.slice(at, hit.index + hit[0].length + 40)}…`);
    }
  }
});
// The deal room page (D-036) is customer-facing copy too: check its visible text.
const ROOM = new URL('prototype/v0.3/deal-room/index.html', root);
try {
  const text = (await readFile(ROOM, 'utf8')).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
  for (const r of rules) {
    for (const hit of text.matchAll(r.re)) {
      const warn = r.level === 'warn'; warn ? warnings++ : errors++;
      console.log(`${warn ? 'warn ' : 'ERROR'} [deal-room] ${r.why}\n      …${text.slice(Math.max(0, hit.index - 50), hit.index + hit[0].length + 40)}…`);
    }
  }
} catch (e) { if (e.code !== 'ENOENT') throw e; }
// Framework lines typed by hand: every line must be read from MF, never copied into the code (CLAUDE.md).
const mfAt = [html.indexOf(BEGIN), html.indexOf(END)];
const outside = html.slice(0, mfAt[0]) + html.slice(mfAt[1]);
const lines = [];
for (const [lg, b] of Object.entries(fw.langs)) {
  for (const k of ['line', 'reason', 'how', 'howLong', 'category', 'trust', 'opener', 'automation']) if (b[k]) lines.push([`${lg}.${k}`, b[k]]);
  if (b.sia) lines.push([`${lg}.sia.line`, b.sia.line]);
  if (b.experts) lines.push([`${lg}.experts.line`, b.experts.line]);
  (b.pillars || []).forEach(p => { lines.push([`${lg}.pillar.${p.key}.head`, p.head]); lines.push([`${lg}.pillar.${p.key}.proof`, p.proof]); });
}
for (const [k, t] of lines) {
  const n = outside.split(t).length - 1;
  if (n) { warnings++; console.log(`warn  ${k} typed by hand ${n}× (read it from MF instead)\n      “${t}”`); }
}
console.log(`Copy check: ${errors} error(s), ${warnings} warning(s) against Messaging Framework ${fw.source.version} and Simployer Brand ${fw.brand ? fw.brand.version : '(not set)'}.`);
process.exit(errors ? 1 : 0);
