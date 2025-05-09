# generate_gallery.py
import os, json

BASE = 'img/feltoltott'
entries = []

for root, _, files in os.walk(BASE):
    for file in sorted(files):
        if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.mp4', '.webm')):
            rel_path = os.path.join(root, file).replace('\\', '/')
            entries.append(rel_path)

with open(os.path.join(BASE, 'manifest.json'), 'w', encoding='utf-8') as f:
    json.dump(entries, f, indent=2, ensure_ascii=False)

with open('osszes_kep.html', 'w', encoding='utf-8') as f:
    f.write("""<!DOCTYPE html>
<html lang="hu"><head><meta charset="UTF-8"><title>Összes feltöltött fájl</title>
<style>body{font-family:sans-serif;padding:20px;}table{border-collapse:collapse;width:100%;}
td,th{border:1px solid #ccc;padding:8px;}img,video{max-width:200px;max-height:150px;}</style>
</head><body><h1>Feltöltött fájlok</h1><table><thead><tr><th>#</th><th>Fájl</th><th>Előnézet</th></tr></thead><tbody>""")
    for i, path in enumerate(entries, 1):
        f.write(f"<tr><td>{i}</td><td><code>{path}</code></td><td>")
        if path.endswith('.mp4'):
            f.write(f'<video src="{path}" controls></video>')
        else:
            f.write(f'<img src="{path}">')
        f.write("</td></tr>\n")
    f.write("</tbody></table></body></html>")
