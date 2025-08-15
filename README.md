
# CipherBikram — Ultimate BasePath Edition (FINAL)

- Auto-detects base path → works as **User Site** and **Project Page**.
- Pro Hacker UI, terminal hero, dark/light mode.
- Ebooks page with **auto thumbnails** (GitHub Action) + preview + search.
- Techniques page with search and safe code rendering.
- Blogs + Giscus-ready.
- PWA offline (manifest + service worker).

**Deploy**
1. Upload contents of this folder to repo root.
2. Push to `main` (or `master`).
3. Add PDFs into `/ebooks/` and push — workflow will update `ebooks_list.json` and `thumbnails/`.

**Giscus**
Edit `/blogs/index.html` → set your `data-repo`, `data-repo-id`, `data-category-id`.
