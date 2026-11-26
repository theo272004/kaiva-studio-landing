#!/usr/bin/env node
/**
 * QA Gate estático para kaivastudio.com
 * Valida cumplimiento legal (cookies/privacidad), contraste, SEO básico,
 * JSON-LD, sitemap, llms.txt y sintaxis de JS en assets/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const IGNORE_DIRS = new Set(['.git', '.github', '.claude', '.agents', '_site', 'node_modules', 'tool']);
const errors = [];

function walk(dir, ext, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, ext, acc);
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      acc.push(full);
    }
  }
  return acc;
}

function isRedirectPage(content, bytes) {
  return bytes < 2000 && (/http-equiv=["']refresh["']/i.test(content) || content.includes('location.replace('));
}

const sitemapPath = path.join(ROOT, 'sitemap.xml');
const llmsPath = path.join(ROOT, 'llms.txt');
const consentPath = path.join(ROOT, 'assets', 'consentimiento.js');

const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
const llms = fs.existsSync(llmsPath) ? fs.readFileSync(llmsPath, 'utf8') : '';

if (!sitemap) errors.push('Falta sitemap.xml');
if (!llms) errors.push('Falta llms.txt');

if (!fs.existsSync(consentPath)) {
  errors.push('Falta assets/consentimiento.js');
} else {
  const consentJs = fs.readFileSync(consentPath, 'utf8');
  if (/#94a3b8/i.test(consentJs)) {
    errors.push('assets/consentimiento.js contiene el color prohibido #94a3b8 (bajo contraste).');
  }
}

const assetsDir = path.join(ROOT, 'assets');
if (fs.existsSync(assetsDir)) {
  for (const jsFile of walk(assetsDir, '.js').sort()) {
    const rel = path.relative(ROOT, jsFile).replace(/\\/g, '/');
    try {
      execFileSync(process.execPath, ['--check', jsFile], { stdio: 'pipe' });
    } catch (e) {
      errors.push(`${rel}: error de sintaxis JS (${e.message}).`);
    }
  }
}

const htmlFiles = walk(ROOT, '.html').sort();
let realCount = 0;

for (const file of htmlFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const bytes = Buffer.byteLength(content, 'utf8');

  if (isRedirectPage(content, bytes)) continue;
  realCount++;

  if (/#94a3b8/i.test(content)) {
    errors.push(`${rel}: contiene el color prohibido #94a3b8.`);
  }
  if (!content.includes('data-kv-cookies')) {
    errors.push(`${rel}: falta enlace de revocación data-kv-cookies.`);
  }
  if (!content.includes('consentimiento.js')) {
    errors.push(`${rel}: no carga /assets/consentimiento.js.`);
  }
  if (!/<title>[^<]+<\/title>/i.test(content)) {
    errors.push(`${rel}: falta <title>.`);
  }
  if (!/<meta\s+name=["']description["']\s+content=["'][^"']+["']/i.test(content)) {
    errors.push(`${rel}: falta meta[name="description"].`);
  }
  if (rel !== '404.html' && !/<link\s+rel=["']canonical["']\s+href=["'][^"']+["']/i.test(content)) {
    errors.push(`${rel}: falta link[rel="canonical"].`);
  }

  const imgs = content.match(/<img\b[^>]*>/gi) || [];
  for (const img of imgs) {
    if (!/\balt\s*=/i.test(img)) {
      errors.push(`${rel}: etiqueta <img> sin atributo alt -> ${img.slice(0, 80)}`);
      break;
    }
  }

  const loopLinks = content.match(/href=["']\/(?:diagnostico|monitor)\/?["']/gi) || [];
  if (loopLinks.length > 0) {
    errors.push(`${rel}: contiene enlace de bucle a ${loopLinks.join(', ')}.`);
  }

  const ldMatches = [...content.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (rel !== '404.html' && ldMatches.length === 0) {
    errors.push(`${rel}: falta bloque JSON-LD (application/ld+json).`);
  }
  for (const m of ldMatches) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      errors.push(`${rel}: JSON-LD inválido (${e.message}).`);
    }
  }

  if (rel.startsWith('blog/') && rel !== 'blog/index.html') {
    const slug = rel.replace(/^blog\//, '').replace(/\/index\.html$/, '');
    const expectedUrl = `/blog/${slug}/`;
    if (sitemap && !sitemap.includes(expectedUrl)) {
      errors.push(`${rel}: no está registrado en sitemap.xml (${expectedUrl}).`);
    }
    if (llms && !llms.includes(expectedUrl)) {
      errors.push(`${rel}: no está registrado en llms.txt (${expectedUrl}).`);
    }
  }
}

if (errors.length > 0) {
  console.error(`QA FALLÓ con ${errors.length} error(es) en ${realCount} páginas reales:`);
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}

console.log(`QA OK: ${realCount} páginas reales verificadas sin errores.`);
