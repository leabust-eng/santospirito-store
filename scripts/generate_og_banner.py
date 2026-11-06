import os
from PIL import Image, ImageDraw, ImageFont

def create_og_banner():
    width = 1200
    height = 630
    
    # Create base dark slate image with subtle gradient
    base = Image.new("RGBA", (width, height), (18, 20, 24, 255))
    draw = ImageDraw.Draw(base)
    
    # Draw horizontal gradient
    for y in range(height):
        # gradient from top-left dark teal/gray to bottom-right deep charcoal
        factor = y / height
        r = int(18 + 10 * factor)
        g = int(24 + 5 * (1 - factor))
        b = int(28 + 8 * (1 - factor))
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
    
    # Add subtle luxury geometric accent lines / borders
    draw.rectangle([20, 20, width - 20, height - 20], outline=(45, 55, 72, 160), width=1)
    draw.rectangle([26, 26, width - 26, height - 26], outline=(30, 41, 59, 120), width=1)
    
    # Accent top border (SantoSpirito teal accent)
    draw.line([(30, 20), (width - 30, 20)], fill=(13, 148, 136, 255), width=3)
    
    # Load fonts
    windir = os.environ.get('WINDIR', 'C:\\Windows')
    font_bold_path = os.path.join(windir, 'Fonts', 'segoeuib.ttf')
    font_semi_path = os.path.join(windir, 'Fonts', 'segoeui.ttf')
    
    f_tag = ImageFont.truetype(font_bold_path, 20)
    f_title = ImageFont.truetype(font_bold_path, 46)
    f_sub = ImageFont.truetype(font_semi_path, 26)
    f_badge = ImageFont.truetype(font_bold_path, 19)
    f_url = ImageFont.truetype(font_bold_path, 21)
    
    # Place Logo
    logo_path = os.path.join('santospirito-store', 'public', 'brand', 'santospirito-logo-horizontal.png')
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        
        # We need a white/light version for the dark background
        r, g, b, a = logo.split()
        white_logo = Image.new("RGBA", logo.size, (255, 255, 255, 255))
        # blend or mask with original alpha
        logo_light = Image.composite(white_logo, Image.new("RGBA", logo.size, (0, 0, 0, 0)), a)
        
        # Resize logo nicely
        target_w = 480
        aspect = logo.size[1] / logo.size[0]
        target_h = int(target_w * aspect)
        logo_resized = logo_light.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Paste centered in upper half
        logo_x = (width - target_w) // 2
        logo_y = 110
        base.paste(logo_resized, (logo_x, logo_y), logo_resized)
    
    # Tag pill above title
    pill_text = "COLECCIÓN SPANDEX 2026 • SAN MIGUEL DE TUCUMÁN"
    pill_bbox = draw.textbbox((0, 0), pill_text, font=f_tag)
    pill_w = pill_bbox[2] - pill_bbox[0]
    pill_x = (width - pill_w) // 2
    
    # Draw pill background
    draw.rounded_rectangle(
        [pill_x - 18, 230, pill_x + pill_w + 18, 266],
        radius=18,
        fill=(13, 148, 136, 40),
        outline=(13, 148, 136, 180),
        width=1
    )
    draw.text((pill_x, 236), pill_text, fill=(45, 212, 191), font=f_tag)
    
    # Main Headline
    headline = "AMBOS Y CHAQUETAS DE DISEÑO"
    h_bbox = draw.textbbox((0, 0), headline, font=f_title)
    h_w = h_bbox[2] - h_bbox[0]
    draw.text(((width - h_w) // 2, 290), headline, fill=(255, 255, 255), font=f_title)
    
    # Subtitle
    sub = "Elegancia, Calce Anatómico & Máxima Libertad de Movimiento"
    s_bbox = draw.textbbox((0, 0), sub, font=f_sub)
    s_w = s_bbox[2] - s_bbox[0]
    draw.text(((width - s_w) // 2, 355), sub, fill=(203, 213, 225), font=f_sub)
    
    # Feature Badges
    badges = [
        ("3 CUOTAS SIN INTERÉS", (234, 179, 8)),
        ("10% OFF TRANSFERENCIA", (52, 211, 153)),
        ("ENVÍOS A TODO EL PAÍS", (56, 189, 248)),
        ("VESTUARIO VIRTUAL 3D", (192, 132, 252))
    ]
    
    total_badge_w = 0
    badge_widths = []
    for b_text, _ in badges:
        bw = draw.textbbox((0, 0), b_text, font=f_badge)[2] + 36
        badge_widths.append(bw)
        total_badge_w += bw
    
    gap = 16
    total_badge_w += gap * (len(badges) - 1)
    start_bx = (width - total_badge_w) // 2
    
    current_bx = start_bx
    for i, (b_text, color) in enumerate(badges):
        bw = badge_widths[i]
        draw.rounded_rectangle(
            [current_bx, 425, current_bx + bw, 467],
            radius=12,
            fill=(30, 41, 59, 220),
            outline=(color[0], color[1], color[2], 140),
            width=1
        )
        tb = draw.textbbox((0, 0), b_text, font=f_badge)
        tw = tb[2] - tb[0]
        draw.text((current_bx + (bw - tw) // 2, 434), b_text, fill=color, font=f_badge)
        current_bx += bw + gap
    
    # Bottom Bar with website and instagram
    draw.line([(80, 525), (width - 80, 525)], fill=(51, 65, 85, 120), width=1)
    
    footer_text = "santospirito-store.vercel.app  •  Instagram: @santospirito.ok  •  WhatsApp: 381-530-7474"
    fb_bbox = draw.textbbox((0, 0), footer_text, font=f_url)
    fb_w = fb_bbox[2] - fb_bbox[0]
    draw.text(((width - fb_w) // 2, 550), footer_text, fill=(148, 163, 184), font=f_url)
    
    # Convert RGBA to RGB and save
    final_rgb = base.convert("RGB")
    out_path = os.path.join('santospirito-store', 'public', 'brand', 'og-banner.jpg')
    final_rgb.save(out_path, quality=92)
    print(f"Generated OG banner at {out_path} ({width}x{height})")

if __name__ == "__main__":
    create_og_banner()
