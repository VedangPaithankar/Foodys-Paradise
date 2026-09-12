import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
const OUT_DIR = 'E:/Job Switch - Backend/Phase 5/frontend/public/images/dishes';
const UA = 'FoodysParadisePortfolioApp/1.0 (https://github.com/VedangPaithankar/Foodys-Paradise)';

const variants = [
  ['chicken-2', 'chicken curry bowl'], ['chicken-3', 'grilled chicken plate'], ['chicken-4', 'chicken masala dish restaurant'],
  ['vegetable-curry-2', 'mixed vegetable curry bowl'], ['vegetable-curry-3', 'vegetable sabzi indian dish'], ['vegetable-curry-4', 'vegetable stir fry dish'],
  ['continental-food-2', 'western food plate restaurant'], ['continental-food-3', 'grilled steak plate'], ['continental-food-4', 'european cuisine dish'],
  ['dal-2', 'dal tadka bowl'], ['dal-3', 'lentil curry dish'], ['dal-4', 'yellow dal rice bowl'],
  ['south-indian-food-2', 'south indian meals thali'], ['south-indian-food-3', 'kerala sadya feast'], ['south-indian-food-4', 'tamil food banana leaf'],
  ['mixed-indian-food-2', 'indian curry rice plate'], ['mixed-indian-food-3', 'indian dinner plate food'], ['mixed-indian-food-4', 'indian food restaurant table'],
  ['potato-2', 'aloo sabzi dish'], ['potato-3', 'potato curry bowl'], ['potato-4', 'roasted potatoes dish'],
  ['cake-2', 'birthday cake slice'], ['cake-3', 'cupcake dessert plate'], ['cake-4', 'cake dessert plate'],
  ['salad-2', 'green salad bowl fresh'], ['salad-3', 'fruit salad bowl'], ['salad-4', 'vegetable salad plate'],
  ['egg-2', 'scrambled eggs plate'], ['egg-3', 'boiled egg curry dish'], ['egg-4', 'omelette dish plate'],
  ['north-indian-food-2', 'punjabi thali food plate'], ['north-indian-food-3', 'north indian curry naan'], ['north-indian-food-4', 'indian restaurant thali'],
  ['rice-2', 'biryani rice plate'], ['rice-3', 'jeera rice bowl'], ['rice-4', 'rice dish bowl'],
];

async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent('filetype:bitmap ' + query)}&gsrlimit=8&prop=imageinfo&iiprop=url|size|mime&format=json&origin=*`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return [];
  return Object.values(pages).map(p=>p.imageinfo?.[0]).filter(i=>i&&(i.mime==='image/jpeg'||i.mime==='image/png')).filter(i=>i.width>=500&&i.height>=350).sort((a,b)=>b.width-a.width);
}
async function downloadTo(url, destPath) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
  return buf.length;
}
async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const [slug, query] of variants) {
    let ok = false;
    for (let attempt = 0; attempt < 3 && !ok; attempt++) {
      try {
        const cands = await searchCommons(query);
        const pick = cands[0];
        if (!pick) { console.log(`MISS ${slug}`); break; }
        const ext = pick.mime === 'image/png' ? 'png' : 'jpg';
        const bytes = await downloadTo(pick.url, path.join(OUT_DIR, `${slug}.${ext}`));
        console.log(`OK ${slug}.${ext} (${(bytes/1024).toFixed(0)}KB)`);
        ok = true;
      } catch (err) {
        console.log(`retry ${slug}: ${err.message}`);
        await new Promise(r=>setTimeout(r,1500));
      }
    }
    await new Promise(r=>setTimeout(r,350));
  }
}
main();
