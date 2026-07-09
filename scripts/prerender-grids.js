#!/usr/bin/env node
/* Intelekta Skola — pre-renders the LV homepage grids into static HTML.
 *
 * scripts/ai-home.js builds #courseGrid, #toolGrid, #whyGrid, #roadList and
 * #companyGrid client-side, so a crawler (or a slow connection) sees empty
 * <div>s until JS runs. This script reads the SAME data (T.lv, COURSE_META,
 * TOOL_META, WHY_ICONS, the icon path map) directly out of ai-home.js — no
 * copy-pasted text, so the two can never drift — and writes the equivalent
 * HTML into index.html between marker comments. ai-home.js is untouched: it
 * still runs in the browser and overwrites these nodes for animations, tilt,
 * and the EN/RU language switch. This is progressive enhancement, not a
 * replacement.
 *
 * Zero npm dependencies (matches the rest of the site). Run with:
 *   node scripts/prerender-grids.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const AI_HOME_JS = path.join(ROOT, 'scripts', 'ai-home.js');
const INDEX_HTML = path.join(ROOT, 'index.html');

// ---------- extract data literals out of ai-home.js without duplicating them ----------

function extractLiteral(src, declRegex, scopeVars) {
  const m = declRegex.exec(src);
  if (!m) throw new Error('Could not find declaration matching ' + declRegex);
  const openChar = src[m.index + m[0].length - 1];
  const closeChar = openChar === '{' ? '}' : ']';
  const start = m.index + m[0].length - 1;
  let depth = 0, inStr = false, strChar = '';
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === strChar) inStr = false;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { inStr = true; strChar = c; continue; }
    if (c === openChar) depth++;
    else if (c === closeChar) {
      depth--;
      if (depth === 0) {
        const literal = src.slice(start, i + 1);
        const argNames = Object.keys(scopeVars || {});
        const argValues = argNames.map((k) => scopeVars[k]);
        return new Function(...argNames, 'return (' + literal + ')')(...argValues);
      }
    }
  }
  throw new Error('Unbalanced literal for ' + declRegex);
}

// The Stripe checkout links are plain string consts near the top of ai-home.js;
// COURSE_META references them by name, so pull them into scope for that eval.
function extractStringConst(src, name) {
  const m = new RegExp(`const ${name} = '([^']*)'`).exec(src);
  if (!m) throw new Error('Could not find string const ' + name);
  return m[1];
}

const src = fs.readFileSync(AI_HOME_JS, 'utf8');
const STRIPE_VARS = {
  STRIPE_MAIN: extractStringConst(src, 'STRIPE_MAIN'),
  STRIPE_INDIVIDUAL: extractStringConst(src, 'STRIPE_INDIVIDUAL'),
  STRIPE_PROMPT: extractStringConst(src, 'STRIPE_PROMPT'),
  STRIPE_AUTOMATION: extractStringConst(src, 'STRIPE_AUTOMATION'),
  STRIPE_CHATGPT: extractStringConst(src, 'STRIPE_CHATGPT'),
};
const T = extractLiteral(src, /const T = \{/);
const ICONS = extractLiteral(src, /const I = \{/);
const COURSE_META = extractLiteral(src, /let COURSE_META = \[/, STRIPE_VARS);
const TOOL_META = extractLiteral(src, /const TOOL_META = \[/);
const WHY_ICONS = extractLiteral(src, /const WHY_ICONS = \[/);

// ---------- tiny re-implementation of ai-home.js's render logic (LV only) ----------
// Mirrors ai-home.js's renderCourseGrid / toolGrid / whyGrid / roadList / companyGrid
// template strings exactly, so the DOM shape matches what the client JS re-renders.

const icon = (k, cls) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="${cls || 'h-6 w-6'}">${ICONS[k] || ''}</svg>`;

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function courseGridHTML() {
  return COURSE_META.map((m, i) => {
    const item = T.lv.courses.items[i];
    return `
    <article class="reveal glass glow-hover rounded-3xl p-7 ${m.featured ? 'ring-1 ring-brand/40' : ''}" style="transition-delay:${i * 0.06}s" data-tilt>
      <div class="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-electric">${icon(m.icon)}</div>
      ${m.featured ? `<div class="mb-2 inline-block rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-electric" data-i18n="courses.items.${i}.badge">${esc(item.badge || '')}</div>` : ''}
      <h3 class="text-xl font-bold" data-i18n="courses.items.${i}.title">${esc(item.title)}</h3>
      <p class="mt-2 text-sm leading-relaxed text-zinc-400" data-i18n="courses.items.${i}.desc">${esc(item.desc)}</p>
      <a href="${m.href}" target="_blank" rel="noopener" class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-electric hover:text-brandlt">
        <span data-i18n="courses.items.${i}.cta">${esc(item.cta)}</span> <span aria-hidden="true">→</span>
      </a>
    </article>`;
  }).join('');
}

function toolGridHTML() {
  return TOOL_META.map((m, i) => {
    const item = T.lv.tools.items[i];
    return `
    <a ${m.href ? `href="${m.href}"` : 'role="button" aria-disabled="true"'} class="reveal glass ${m.href ? 'glow-hover' : 'opacity-70'} block rounded-3xl p-7" style="transition-delay:${i * 0.06}s" data-tilt>
      <div class="mb-5 flex items-center justify-between">
        <span class="inline-grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-electric">${icon(m.icon)}</span>
        ${m.live
          ? `<span class="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300" data-i18n="tools.live">${esc(T.lv.tools.live)}</span>`
          : `<span class="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400" data-i18n="tools.soon">${esc(T.lv.tools.soon)}</span>`}
      </div>
      <h3 class="text-xl font-bold" data-i18n="tools.items.${i}.title">${esc(item.title)}</h3>
      <p class="mt-2 text-sm leading-relaxed text-zinc-400" data-i18n="tools.items.${i}.desc">${esc(item.desc)}</p>
      <div class="mt-6 inline-flex items-center gap-2 text-sm font-bold ${m.href ? 'text-electric' : 'text-zinc-500'}" data-i18n="${m.href ? 'tools.open' : 'tools.comingSoon'}">${esc(m.href ? T.lv.tools.open : T.lv.tools.comingSoon)}</div>
    </a>`;
  }).join('');
}

function whyGridHTML() {
  return WHY_ICONS.map((ic, i) => {
    const item = T.lv.why.items[i];
    return `
    <div class="reveal glass glow-hover rounded-3xl p-6" style="transition-delay:${i * 0.05}s" data-tilt>
      <div class="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-electric">${icon(ic, 'h-5 w-5')}</div>
      <h3 class="text-lg font-bold" data-i18n="why.items.${i}.title">${esc(item.title)}</h3>
      <p class="mt-2 text-sm leading-relaxed text-zinc-400" data-i18n="why.items.${i}.desc">${esc(item.desc)}</p>
    </div>`;
  }).join('');
}

function roadListHTML() {
  return T.lv.roadmap.items.map((item, i) => `
    <li class="road-node relative" style="transition-delay:${i * 0.14}s">
      <div class="flex items-center gap-4 md:flex-col md:text-center">
        <div class="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl glass glow text-lg font-extrabold text-electric">0${i + 1}</div>
        <div>
          <h3 class="text-base font-bold md:mt-4" data-i18n="roadmap.items.${i}.title">${esc(item.title)}</h3>
          <p class="mt-1 text-sm text-zinc-400" data-i18n="roadmap.items.${i}.desc">${esc(item.desc)}</p>
        </div>
      </div>
    </li>`).join('');
}

function companyGridHTML() {
  return T.lv.company.rows.map((row, i) => `
    <div class="rounded-2xl bg-white/[.03] p-4 hairline">
      <div class="text-xs uppercase tracking-wider text-zinc-500" data-i18n="company.rows.${i}.k">${esc(row.k)}</div>
      <div class="mt-1 font-semibold" data-i18n-html="company.rows.${i}.v">${row.good ? `<span class="text-emerald-300">${esc(row.v)}</span>` : esc(row.v)}</div>
    </div>`).join('');
}

// ---------- inject into index.html between marker comments ----------

const GRIDS = {
  courseGrid: courseGridHTML(),
  toolGrid: toolGridHTML(),
  whyGrid: whyGridHTML(),
  roadList: roadListHTML(),
  companyGrid: companyGridHTML(),
};

let html = fs.readFileSync(INDEX_HTML, 'utf8');
let injectedCount = 0;

for (const [id, innerHTML] of Object.entries(GRIDS)) {
  const re = new RegExp(`(<!-- PRERENDER:${id} -->)[\\s\\S]*?(<!-- /PRERENDER -->)`);
  if (re.test(html)) {
    html = html.replace(re, `$1${innerHTML}$2`);
    injectedCount++;
  } else {
    console.warn(`[prerender-grids] No marker comments found for #${id} — skipping. Add <!-- PRERENDER:${id} --><!-- /PRERENDER --> inside the #${id} container.`);
  }
}

fs.writeFileSync(INDEX_HTML, html, 'utf8');
console.log(`[prerender-grids] Injected ${injectedCount}/${Object.keys(GRIDS).length} grids into index.html`);
