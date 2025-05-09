import os
import json

BASE = 'img'
entries = []

for root, _, files in os.walk(BASE):
    for file in sorted(files):
        if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.mp4', '.webm')):
            rel_path = os.path.join(root, file).replace('\\', '/')
            entries.append(rel_path)

# 1. manifest.json mentése
with open(os.path.join(BASE, 'manifest.json'), 'w', encoding='utf-8') as f:
    json.dump(entries, f, indent=2, ensure_ascii=False)

# 2. osszes_kep.html mentése
with open('osszes_kep.html', 'w', encoding='utf-8') as f:
    f.write("""<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <title>Galéria</title>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f8f8f8; }
    .grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
    .item { background: #fff; padding: 10px; border: 1px solid #ccc; text-align: center; font-size: 0.9em; }
    .item img, .item video { max-width: 100%; max-height: 120px; display: block; margin: 0 auto 5px; }
    .caption { font-weight: bold; margin-top: 5px; }
    .index { color: #777; font-size: 0.8em; }
  </style>
</head>
<body>
<h1>Galéria (összes kép/videó)</h1>
<div class="grid">
""")

    for i, path in enumerate(entries, 1):
        f.write('<div class="item">')
        if path.lower().endswith('.mp4'):
            f.write(f'<video src="{path}" controls muted></video>')
        else:
            f.write(f'<img src="{path}" alt="">')
        f.write(f'<div class="caption">{os.path.basename(path)}</div>')
        f.write(f'<div class="index">#{i}</div>')
        f.write('</div>\n')

    f.write("</div></body></html>")
