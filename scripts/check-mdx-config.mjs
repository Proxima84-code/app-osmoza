import fs from 'fs/promises';
import path from 'path';

const cfgPath = path.resolve(process.cwd(), 'next.config.ts');

try {
  const src = await fs.readFile(cfgPath, 'utf8');
  const issues = [];

  if (!/createMDX/.test(src)) {
    issues.push('Brak importu lub użycia `createMDX`.');
  }

  if (!/pageExtensions\s*:\s*\[([\s\S]*?)\]/m.test(src) || !/mdx/.test(src)) {
    issues.push('`pageExtensions` nie zawiera `mdx` (sprawdź `next.config.ts`).');
  }

  if (!/export\s+default/.test(src)) {
    issues.push('Brak `export default` w `next.config.ts`.');
  }

  if (issues.length === 0) {
    console.log('OK: `next.config.ts` wygląda poprawnie dla MDX.');
    process.exit(0);
  }

  console.error('Znaleziono problemy w `next.config.ts`:');
  issues.forEach(i => console.error('- ' + i));
  process.exit(2);
} catch (err) {
  console.error('Nie można odczytać `next.config.ts`:', err.message);
  process.exit(1);
}
