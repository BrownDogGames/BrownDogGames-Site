// Browser-level smoke checks for the real DOM, JS startup and mobile layout.
const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const server = spawn('python3', ['-m','http.server','8765','--bind','127.0.0.1'], { stdio: 'ignore' });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  let browser;
  try {
    await sleep(1200);
    browser = await chromium.launch({ headless: true });
    for (const width of [375, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 850 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      // Third-party advertising can be unreliable and is not needed for website regression checks.
      await page.route(/https?:\/\/(?!127\.0\.0\.1)/, route => route.abort());
      await page.goto('http://127.0.0.1:8765/', { waitUntil: 'domcontentloaded' });
      await page.locator('#gamePicker').waitFor();
      assert.equal(await page.locator('#gamePicker .game-picker-item').count(), 9);
      if (width < 761) {
        await page.locator('#menuToggle').click();
        assert.equal(await page.locator('#menuToggle').getAttribute('aria-expanded'), 'true');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#menuToggle').getAttribute('aria-expanded'), 'false');
      }
      await page.locator('#gameSearch').fill('snake');
      assert.match(await page.locator('#gameSearchCount').innerText(), /1 of 9/);
      await page.locator('#gameSearch').fill('');
      await page.locator('#steamSearch').fill('MMA');
      assert.equal(await page.locator('#steamGrid [data-game]:visible').count(), 1);
      await page.locator('#steamClear').click();
      assert.equal(await page.locator('#steamGrid [data-game]:visible').count(), 4);
      if (width === 375) {
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
        assert.equal(overflow, false, 'Horizontal page overflow at mobile width');
      }
      assert.deepEqual(errors, [], 'Browser JavaScript errors');
      console.log('PASS browser smoke at ' + width + 'px');
      await page.close();
    }
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
