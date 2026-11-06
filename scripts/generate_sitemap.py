import re
from datetime import datetime

with open('santospirito-store/src/data/products.js', 'r', encoding='utf-8') as f:
    content = f.read()

slugs = re.findall(r'slug:\s*["\']([^"\']+)["\']', content)
today = datetime.now().strftime('%Y-%m-%d')

urls = [
    ('https://santospirito-store.vercel.app/', '1.0', 'daily'),
    ('https://santospirito-store.vercel.app/?cat=ambos-mujer', '0.9', 'weekly'),
    ('https://santospirito-store.vercel.app/?cat=ambos-hombre', '0.9', 'weekly'),
    ('https://santospirito-store.vercel.app/?cat=ambos-unisex', '0.9', 'weekly'),
    ('https://santospirito-store.vercel.app/?cat=chaquetas', '0.8', 'weekly'),
    ('https://santospirito-store.vercel.app/?cat=pantalones', '0.8', 'weekly'),
    ('https://santospirito-store.vercel.app/?cat=accesorios', '0.7', 'weekly'),
]

for s in set(slugs):
    urls.append((f'https://santospirito-store.vercel.app/?product={s}', '0.8', 'weekly'))

xml = ['<?xml version="1.0" encoding="UTF-8"?>']
xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
xml.append('        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">')

for loc, priority, changefreq in urls:
    xml.append('  <url>')
    xml.append(f'    <loc>{loc}</loc>')
    xml.append(f'    <lastmod>{today}</lastmod>')
    xml.append(f'    <changefreq>{changefreq}</changefreq>')
    xml.append(f'    <priority>{priority}</priority>')
    if loc == 'https://santospirito-store.vercel.app/':
        xml.append('    <image:image>')
        xml.append('      <image:loc>https://santospirito-store.vercel.app/brand/og-banner.jpg</image:loc>')
        xml.append('      <image:title>SantoSpirito - Ambos Médicos y Chaquetas de Diseño</image:title>')
        xml.append('      <image:caption>Catálogo Oficial SantoSpirito en Tucumán y envíos a todo el país</image:caption>')
        xml.append('    </image:image>')
    xml.append('  </url>')

xml.append('</urlset>')

with open('santospirito-store/public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write('\n'.join(xml))

print(f"Generated sitemap.xml with {len(urls)} URLs")
