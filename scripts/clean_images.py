import re

# Cloudfront photos map
cf_photos = [
    "https://d22fxaf9t8d39k.cloudfront.net/ca8312fc57ec21a391345f33020a52e030349e70a5fee4dc9806fa6e01792342466763.jpg",
    "https://d22fxaf9t8d39k.cloudfront.net/23ded51650e4311d9538f582b5f873338667313e94fcd7d7603bf8d3595a3818466763.jpg",
    "https://d22fxaf9t8d39k.cloudfront.net/6472c905867ad8d562bf38c2395b5b10f7fa921fadba6aa0d0fb88a4f3b2ed14466763.jpg",
    "https://d22fxaf9t8d39k.cloudfront.net/179b70366be62483d6cb18922249ffa8d6bc8ac69ea53ce461ad61101bab8f2d466763.jpg",
    "https://d22fxaf9t8d39k.cloudfront.net/6db6e534003861e5572bae4eb67cde08963f4a8f4a8d530378623f4a0c091d79466763.jpg",
    "https://d22fxaf9t8d39k.cloudfront.net/a9b6ce1bd1c7323c23de5fab33c4a086f1ac731b411b63fa59537736a122db01466763.jpg",
    "https://d22fxaf9t8d39k.cloudfront.net/8acf9964eea1a0c405bcdd3fcc10c18263c0a1970d63afe65fe008ed40e14f82466763.jpg",
    "https://d22fxaf9t8d39k.cloudfront.net/831af11b56044326fccc106b89de21eb72692e303fddec387a062defcf550b2d466763.jpg",
    "https://d22fxaf9t8d39k.cloudfront.net/8e88e15d99e302000e6362428e137b9f64fd5b6d004a668ddf4d02fadb4bcb56466763.jpg",
    "https://d22fxaf9t8d39k.cloudfront.net/44d79c226eaa92c228654fe429d81f229d77214f7ba34674dc704c0b1bf22663466763.jpg"
]

with open('santospirito-store/src/data/products.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace any unsplash url with alternating high quality cloudfront photos
unsplash_matches = re.findall(r'https://images\.unsplash\.com/[^\"]+', text)
for i, match in enumerate(unsplash_matches):
    rep = cf_photos[i % len(cf_photos)]
    text = text.replace(f'"{match}"', f'"{rep}"')

with open('santospirito-store/src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(text)

print(f"Replaced {len(unsplash_matches)} external placeholders with official CloudFront CDN photoshoot images!")
