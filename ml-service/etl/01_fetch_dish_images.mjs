// Sources one real, freely-licensed food photo per "dish bucket" from Wikimedia
// Commons (open API, no auth needed, no rate-limit wall for this volume) and
// saves it locally under frontend/public/images/dishes/. This replaces the
// dead archanaskitchen.com hotlinks with self-hosted images that can't rot.
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = 'E:/Job Switch - Backend/Phase 5/frontend/public/images/dishes';
const UA = 'FoodysParadisePortfolioApp/1.0 (https://github.com/VedangPaithankar/Foodys-Paradise)';

// slug -> Wikimedia Commons search query. Order doesn't matter here (SQL
// bucket-assignment priority is handled separately) -- this just needs one
// good photo per slug.
const buckets = [
  ['biryani', 'chicken biryani'],
  ['pulao', 'vegetable pulao rice'],
  ['dosa', 'masala dosa'],
  ['idli', 'idli sambar'],
  ['uttapam', 'uttapam'],
  ['sambar', 'sambar south indian'],
  ['rasam', 'rasam soup'],
  ['vada', 'medu vada'],
  ['upma', 'upma'],
  ['poha', 'poha'],
  ['khichdi', 'khichdi'],
  ['paratha', 'aloo paratha'],
  ['naan', 'naan bread'],
  ['roti', 'chapati roti'],
  ['samosa', 'samosa'],
  ['pakora', 'pakora fritters'],
  ['dhokla', 'dhokla'],
  ['thepla', 'thepla'],
  ['chaat', 'bhel puri chaat'],
  ['tikka', 'paneer tikka'],
  ['kebab', 'seekh kebab'],
  ['korma', 'chicken korma'],
  ['kofta', 'malai kofta'],
  ['tandoori', 'tandoori chicken'],
  ['halwa', 'gajar halwa'],
  ['kheer', 'kheer rice pudding'],
  ['laddu', 'laddu sweets'],
  ['barfi', 'barfi sweet'],
  ['gulab-jamun', 'gulab jamun'],
  ['cake', 'chocolate cake'],
  ['cookies', 'cookies baked'],
  ['pasta', 'pasta italian'],
  ['pizza', 'pizza'],
  ['sandwich', 'sandwich'],
  ['soup', 'vegetable soup'],
  ['salad', 'fresh salad'],
  ['momos', 'momos dumplings'],
  ['noodles', 'noodles stir fry'],
  ['fried-rice', 'vegetable fried rice'],
  ['chutney', 'chutney condiment'],
  ['pickle', 'indian pickle achar'],
  ['raita', 'raita yogurt'],
  ['chicken', 'chicken curry'],
  ['paneer', 'paneer curry'],
  ['egg', 'egg curry'],
  ['fish', 'fish curry'],
  ['mushroom', 'mushroom curry'],
  ['dal', 'dal lentil curry'],
  ['potato', 'aloo potato curry'],
  ['spinach', 'palak spinach curry'],
  ['rice', 'steamed rice bowl'],
  ['vegetable-curry', 'vegetable curry indian'],
  ['bread', 'bread loaf'],
  ['dessert', 'indian sweets dessert'],
  ['italian-food', 'italian food pasta'],
  ['mexican-food', 'mexican food tacos'],
  ['asian-food', 'asian food stir fry'],
  ['continental-food', 'continental food plate'],
  ['south-indian-food', 'south indian thali'],
  ['north-indian-food', 'north indian thali'],
  ['west-indian-food', 'gujarati thali food'],
  ['east-indian-food', 'bengali food'],
  ['fusion-food', 'fusion cuisine plate'],
  ['mixed-indian-food', 'indian food thali'],
];

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent('filetype:bitmap ' + query)}&gsrlimit=8&prop=imageinfo&iiprop=url|size|mime&format=json&origin=*`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Commons search HTTP ${res.status}`);
  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return null;
  const candidates = Object.values(pages)
    .map((p) => p.imageinfo?.[0])
    .filter((info) => info && (info.mime === 'image/jpeg' || info.mime === 'image/png'))
    .filter((info) => info.width >= 500 && info.height >= 350)
    .sort((a, b) => b.width - a.width);
  return candidates[0] || null;
}

async function downloadTo(url, destPath) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Download HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
  return buf.length;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const results = [];
  for (const [slug, query] of buckets) {
    try {
      const info = await searchCommons(query);
      if (!info) {
        console.log(`MISS  ${slug}  (no result for "${query}")`);
        results.push({ slug, ok: false });
        continue;
      }
      const ext = info.mime === 'image/png' ? 'png' : 'jpg';
      const destPath = path.join(OUT_DIR, `${slug}.${ext}`);
      const bytes = await downloadTo(info.url, destPath);
      console.log(`OK    ${slug}.${ext}  (${(bytes / 1024).toFixed(0)} KB, ${info.width}x${info.height})`);
      results.push({ slug, ok: true, ext, bytes });
    } catch (err) {
      console.log(`ERROR ${slug}  ${err.message}`);
      results.push({ slug, ok: false, error: err.message });
    }
    // Small delay to stay well within Commons' fair-use expectations.
    await new Promise((r) => setTimeout(r, 250));
  }
  const misses = results.filter((r) => !r.ok);
  console.log(`\n${results.length - misses.length}/${results.length} succeeded.`);
  if (misses.length) console.log('Misses:', misses.map((m) => m.slug).join(', '));
  await writeFile(
    'C:/Users/Vedan/AppData/Local/Temp/claude/e--Job-Switch---Backend/9bffe7ed-0791-4185-a620-40e79a3649eb/scratchpad/dish-image-results.json',
    JSON.stringify(results, null, 2)
  );
}

main();
