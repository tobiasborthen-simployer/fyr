// Keeps Fyr in line with the Messaging Framework.
//   node tools/sync-framework.mjs           inject docs/messaging-framework.json into the prototype, then check the copy
//   node tools/sync-framework.mjs --check   only check the copy (exit 1 on any error)
// The framework document (see source.url in the JSON) is the source. When it changes: update the JSON, run this, fix what it flags.
import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const FW = new URL('docs/messaging-framework.json', root);
const TARGET = new URL('prototype/v0.3/index.html', root);
const BEGIN = '/* MF:BEGIN generated from docs/messaging-framework.json by tools/sync-framework.mjs. Do not edit by hand. */';
const END = '/* MF:END */';

// Top-level blocks in the prototype that hold customer-facing copy (slides, truth, packs, ads, talk tracks).
const COPY_BLOCKS = ['L', 'PRULES', 'FEATURES', 'FL', 'NEWF', 'ADS', 'VADS', 'SOCIAL', 'RELEASES', 'TPL', 'LOC', 'REFS', 'EXAMPLE', 'BATTLE',
  'slideHTML', 'vDeck', 'genFields', 'itemBody', 'adFromRelease', 'autoFill', 'autoItem'];

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
    for (const hit of line.matchAll(r.re)) {
      const at = Math.max(0, hit.index - 50), warn = r.level === 'warn';
      warn ? warnings++ : errors++;
      console.log(`${warn ? 'warn ' : 'ERROR'} l.${i + 1} [${ctx}] ${r.why}\n      …${line.slice(at, hit.index + hit[0].length + 40)}…`);
    }
  }
});
console.log(`Copy check: ${errors} error(s), ${warnings} warning(s) against Messaging Framework ${fw.source.version}.`);
process.exit(errors ? 1 : 0);
