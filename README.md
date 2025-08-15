
# cipherbikram.com — Static Site

Purple neon hacker theme for GitHub Pages.

## Structure
- `/ebooks` — PDFs
- `/techniques` — terminal-style snippets
- `/images/hacker-gallery` — images
- `/tools` — scripts/tools
- `/blogs` — blog posts (HTML)
- `/data/*.json` — lists used to render pages

## Add Items
- Add a PDF to `/ebooks` and an entry to `/data/ebooks.json`:
  ```json
  {"title": "Your PDF", "desc": "Short description", "href": "ebooks/your.pdf"}
  ```

- Add a technique to `/data/techniques.json`:
  ```json
  {"title":"Title","desc":"What it does","command":"your command","level":"Beginner"}
  ```

- Add a gallery image under `/images/hacker-gallery/` and reference in `/data/gallery.json`:
  ```json
  {"title":"Name","href":"images/hacker-gallery/your.png"}
  ```

- Add a tool to `/tools` and list it in `/data/tools.json`:
  ```json
  {"title":"Tool Name","desc":"Short","href":"tools/script.sh"}
  ```

- Add a blog post as HTML in `/blogs` and add it to `/data/blogs.json`:
  ```json
  {"title":"Post Title","desc":"Short desc","href":"blogs/your-post.html","date":"2025-08-15","tags":["tag1","tag2"]}
  ```

## Deploy (GitHub Pages)
1. Create a new repo named `cipherbikram.github.io` **or** any repo, then enable Pages from **Settings → Pages** and set branch to `main` (root).
2. Upload all files from this folder to the repo root.
3. If using a custom domain (cipherbikram.com): in **Settings → Pages**, add the domain and create DNS `A` records to GitHub Pages IPs and a `CNAME` to `cipherbikram.github.io`.
4. Commit & push. Done.

## Notes
- The homepage search pulls from JSON files.
- No external JS libraries required.
