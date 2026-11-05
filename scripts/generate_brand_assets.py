import os
import fitz

def drawings_to_svg(drawings, padding=4, color_map=None, force_fill=None):
    if not drawings:
        return ''
    
    min_x = min(d['rect'].x0 for d in drawings)
    min_y = min(d['rect'].y0 for d in drawings)
    max_x = max(d['rect'].x1 for d in drawings)
    max_y = max(d['rect'].y1 for d in drawings)
    
    ox = min_x - padding
    oy = min_y - padding
    width = (max_x - min_x) + 2 * padding
    height = (max_y - min_y) + 2 * padding
    
    svg_parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.2f} {height:.2f}" width="{width:.2f}" height="{height:.2f}">'
    ]
    
    for d in drawings:
        orig_hex = None
        if d.get('fill'):
            r, g, b = [int(round(c * 255)) for c in d['fill'][:3]]
            orig_hex = f'#{r:02x}{g:02x}{b:02x}'
        
        fill_color = force_fill
        if not fill_color:
            if color_map and orig_hex in color_map:
                fill_color = color_map[orig_hex]
            else:
                fill_color = orig_hex
        
        path_cmds = []
        curr_pt = None
        for it in d['items']:
            cmd = it[0]
            if cmd == 'l':
                p1, p2 = it[1], it[2]
                if curr_pt != (p1.x, p1.y):
                    path_cmds.append(f'M {p1.x - ox:.2f} {p1.y - oy:.2f}')
                path_cmds.append(f'L {p2.x - ox:.2f} {p2.y - oy:.2f}')
                curr_pt = (p2.x, p2.y)
            elif cmd == 'c':
                p1, p2, p3, p4 = it[1], it[2], it[3], it[4]
                if curr_pt != (p1.x, p1.y):
                    path_cmds.append(f'M {p1.x - ox:.2f} {p1.y - oy:.2f}')
                path_cmds.append(f'C {p2.x - ox:.2f} {p2.y - oy:.2f} {p3.x - ox:.2f} {p3.y - oy:.2f} {p4.x - ox:.2f} {p4.y - oy:.2f}')
                curr_pt = (p4.x, p4.y)
            elif cmd == 're':
                rect = it[1]
                path_cmds.append(f'M {rect.x0 - ox:.2f} {rect.y0 - oy:.2f} H {rect.x1 - ox:.2f} V {rect.y1 - oy:.2f} H {rect.x0 - ox:.2f} Z')
                curr_pt = None
        
        if path_cmds:
            d_str = ' '.join(path_cmds) + ' Z'
            fill_attr = f'fill="{fill_color}"' if fill_color else 'fill="none"'
            svg_parts.append(f'  <path d="{d_str}" {fill_attr} />')
    
    svg_parts.append('</svg>')
    return '\n'.join(svg_parts)


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    out_dir = os.path.join(project_dir, 'public', 'brand')
    os.makedirs(out_dir, exist_ok=True)
    
    pdf_path = r'C:\Users\leabu\.gemini\antigravity\brain\0d773a53-8e6a-4f6a-8bef-c194b5080b58\.user_uploaded\media_1793878647312_5b8feda9.pdf'
    doc = fitz.open(pdf_path)
    p1 = doc[0]
    drawings_p1 = p1.get_drawings()
    
    # 1. Main Ribbon "S" ISO (drawings 0..6 on page 1)
    iso_drawings = drawings_p1[0:7]
    with open(os.path.join(out_dir, 'santospirito-iso.svg'), 'w', encoding='utf-8') as f:
        f.write(drawings_to_svg(iso_drawings, padding=4))
    
    # Negative color mapping (White curves + Silver fold shadow + White text)
    color_map_negative = {
        '#5d6568': '#ffffff',
        '#737b7f': '#f1f5f9',
        '#555d60': '#94a3b8',
        '#e2e3e8': '#ffffff'
    }

    # Negative (white) ISO
    with open(os.path.join(out_dir, 'santospirito-iso-white.svg'), 'w', encoding='utf-8') as f:
        f.write(drawings_to_svg(iso_drawings, padding=4, color_map=color_map_negative))
        
    # 2. Horizontal Logo: S icon (26..32) + SANTOSPIRITO letters (14..25)
    horiz_drawings = drawings_p1[26:33] + drawings_p1[14:26]
    with open(os.path.join(out_dir, 'santospirito-logo-horizontal.svg'), 'w', encoding='utf-8') as f:
        f.write(drawings_to_svg(horiz_drawings, padding=6))
        
    # Negative (white) Horizontal Logo
    with open(os.path.join(out_dir, 'santospirito-logo-horizontal-white.svg'), 'w', encoding='utf-8') as f:
        f.write(drawings_to_svg(horiz_drawings, padding=6, color_map=color_map_negative))

    # 3. Logo Bolsa: Stacked S icon + SANTO / SPIRITO (page 4)
    p4 = doc[3]
    drawings_p4 = p4.get_drawings()
    bolsa_drawings = drawings_p4[12:19] + drawings_p4[0:12]
    with open(os.path.join(out_dir, 'santospirito-logo-bolsa.svg'), 'w', encoding='utf-8') as f:
        f.write(drawings_to_svg(bolsa_drawings, padding=6))
        
    with open(os.path.join(out_dir, 'santospirito-logo-bolsa-white.svg'), 'w', encoding='utf-8') as f:
        f.write(drawings_to_svg(bolsa_drawings, padding=6, color_map=color_map_negative))

    # Also render ultra high-res transparent PNGs
    rect_horiz = fitz.Rect(114, 450, 505, 526)
    pix = p1.get_pixmap(clip=rect_horiz, dpi=300, alpha=True)
    pix.save(os.path.join(out_dir, 'santospirito-logo-horizontal.png'))
    
    rect_iso = fitz.Rect(274, 73, 428, 260)
    pix_iso = p1.get_pixmap(clip=rect_iso, dpi=300, alpha=True)
    pix_iso.save(os.path.join(out_dir, 'santospirito-iso.png'))

    rect_bolsa = fitz.Rect(90, 370, 506, 513)
    pix_bolsa = p4.get_pixmap(clip=rect_bolsa, dpi=300, alpha=True)
    pix_bolsa.save(os.path.join(out_dir, 'santospirito-logo-bolsa.png'))

    print("Successfully generated all brand assets in public/brand!")

if __name__ == '__main__':
    main()
