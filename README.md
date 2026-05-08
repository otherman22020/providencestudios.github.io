# ONI Cell Alpha-7 — GitHub Pages Site

A classified UNSC Office of Naval Intelligence intranet, themed for Halo roleplay/collaborative fiction.

## Deployment (GitHub Pages)

1. Create a new **public** GitHub repository (e.g. `oni-cell-alpha7`)
2. Upload all files maintaining the folder structure:
   ```
   index.html
   documents.html
   personnel.html
   operations.html
   _config.yml
   assets/
     css/boot.css
     js/boot.js
   docs/
     handbook.html
     _TEMPLATE.html
     (add more docs here)
   ```
3. Go to **Settings → Pages → Source → Deploy from branch → main / (root)**
4. Your site will be live at: `https://yourusername.github.io/oni-cell-alpha7/`

## Passcode

The boot screen passcode is set in `assets/js/boot.js`:

```javascript
const PASSCODE = 'ONI-ALPHA';
```

Change this to whatever you like. Set it to `''` (empty string) to skip authentication.

## Adding New Documents

1. Copy `docs/_TEMPLATE.html` and rename it (e.g. `docs/my-directive.html`)
2. Edit the masthead, metadata, and content sections
3. Add a card for it in `documents.html` pointing to your new file
4. That's it — no build step needed

## Customising

- **Cell name/title**: Search and replace `CELL ALPHA-7` across all HTML files
- **Colors**: Edit CSS variables at the top of `assets/css/boot.css`
- **Boot sequence lines**: Edit the `bootLines` array in `assets/js/boot.js`
- **Nav links**: Add pages and nav links as needed (copy the pattern from existing pages)

## File Structure

```
/
├── index.html          — Dashboard (boot screen entry point)
├── documents.html      — Document library index
├── personnel.html      — Personnel roster
├── operations.html     — Operations board
├── _config.yml         — GitHub Pages config
├── assets/
│   ├── css/boot.css    — All styles
│   └── js/boot.js      — Boot sequence + clock logic
└── docs/
    ├── _TEMPLATE.html  — Blank document template
    └── handbook.html   — Example: Cell Handbook
```
