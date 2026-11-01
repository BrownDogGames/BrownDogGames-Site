// Dependency-free structural smoke tests for the GitHub Pages site.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html','utf8');
const css = fs.readFileSync('assets/site-polish.css','utf8');
const errors = [];
function test(name, fn) {
  try { fn(); console.log('PASS', name); }
  catch (error) { errors.push(name + ': ' + error.message); console.error('FAIL', name, error.message); }
}
test('HTML document shell', () => {
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<main id="main">/);
  assert.match(html, /<\/html>\s*$/);
});
test('Site polish stylesheet loaded', () => {
  assert.match(html, /href="\/assets\/site-polish\.css"/);
  assert.ok(css.includes('@media(max-width:480px)'));
});
test('All existing sections remain', () => {
  for (const id of ['games','steam','tools','downloads','quizzes','rewards','links']) {
    assert.ok(html.includes('id="' + id + '"'), 'Missing section: ' + id);
  }
});
test('All nine games remain', () => {
  for (const id of ['tictactoe','guess','rps','memory','simon','reaction','typing','snake','hilo']) {
    assert.ok(html.includes('id="game-' + id + '"'), 'Missing game: ' + id);
  }
});
test('Inline JavaScript parses', () => {
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
  assert.ok(scripts.length >= 1);
  for (const [,source] of scripts) {
    if (source.trim()) new Function(source);
  }
});
test('Local image references use existing paths', () => {
  const imageRefs = [...html.matchAll(/<img\b[^>]*\bsrc="(\/assets\/[^"]+)"/gi)];
  for (const [,src] of imageRefs) {
    assert.ok(fs.existsSync(src.slice(1)), 'Missing image: ' + src);
  }
});
if (errors.length) {
  console.error('\n' + errors.length + ' smoke test(s) failed.');
  process.exitCode = 1;
} else console.log('\nAll structural smoke tests passed.');
