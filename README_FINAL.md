Final Professional Site Build
- Dark/Light theme toggle
- Hero section with background image and animations (assets/img/hero-bg.jpg)
- Inline SVG icons and social links (footer)
- Contact form page at /contact.html (Formspree placeholder)
- GitHub Actions workflow at .github/workflows/deploy.yml (auto-build & deploy)
- PWA manifest & service worker included
- Preserved original content (ebooks, blogs, gallery)

To deploy:
1. Replace the repo contents with these files at the root of cipherbikramdey.github.io
2. Commit and push to main. GitHub Actions will minify and deploy automatically.
3. Replace Formspree form ID in /contact.html with your Formspree endpoint.
