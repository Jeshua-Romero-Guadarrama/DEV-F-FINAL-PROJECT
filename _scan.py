import pathlib
for path in pathlib.Path('.').rglob('*'):
    if path.is_file() and path.suffix in {'.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.html', '.css'}:
        try:
            text = path.read_text(encoding='utf-8')
        except UnicodeDecodeError:
            continue
        if '\ufffd' in text:
            print(path)
