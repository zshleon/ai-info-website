const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '../data/products.json');

async function sync() {
  console.log('🚀 Starting AI Data Sync...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

  try {
    // 1. Sync Google Gemini (Gemini 3 detection)
    console.log('🔍 Checking Google Gemini...');
    await page.goto('https://ai.google.dev/pricing', { waitUntil: 'domcontentloaded' });
    const geminiText = await page.innerText('body');
    if (geminiText.includes('Gemini 3.1')) {
      updateMetric(data, 'gemini', '旗舰模型', 'Gemini 3.1 Pro');
    } else if (geminiText.includes('Gemini 3')) {
      updateMetric(data, 'gemini', '旗舰模型', 'Gemini 3.0 Pro');
    }

    // 2. Sync OpenAI (GPT-5/o4 detection)
    console.log('🔍 Checking OpenAI...');
    await page.goto('https://openai.com/api/pricing/', { waitUntil: 'domcontentloaded' });
    const openaiText = await page.innerText('body');
    if (openaiText.includes('GPT-5.3')) {
      updateMetric(data, 'chatgpt', '旗舰模型', 'GPT-5.3 / o4');
    }

    // 3. Sync Anthropic (Claude Mythos detection)
    console.log('🔍 Checking Anthropic...');
    await page.goto('https://www.anthropic.com/pricing', { waitUntil: 'domcontentloaded' });
    const anthropicText = await page.innerText('body');
    if (anthropicText.includes('Claude Mythos')) {
       updateMetric(data, 'claude', '旗舰模型', 'Claude Mythos / Opus');
    }

    // Update Meta
    data.meta.last_updated = new Date().toISOString().split('T')[0];
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2));
    console.log('✅ Sync Complete. Data saved to products.json');

  } catch (err) {
    console.error('❌ Sync Failed:', err);
  } finally {
    await browser.close();
  }
}

function updateMetric(data, id, key, newValue) {
  const product = data.products.find(p => p.id === id);
  if (product) {
    const metric = product.metrics.find(m => m[0] === key);
    if (metric && metric[1] !== newValue) {
      console.log(`✨ Updating ${id} ${key}: ${metric[1]} -> ${newValue}`);
      metric[1] = newValue;
    }
  }
}

sync();
