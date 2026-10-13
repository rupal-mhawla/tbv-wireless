# TBV Wireless website

Responsive static landing page with 10 Georgia stores, contact links, directions, and ZIP proximity search.

## Files

- `dist/index.html`: landing page
- `dist/styles.css`: responsive styling
- `dist/app.js`: location search and ZIP lookup
- `dist/assets/`: original and transparent logo images
- `build.mjs`: generates the HTML from the store list

## Edit and preview

Edit styles and search code directly in `dist/`. To change store information or page copy, edit `build.mjs` and run `node build.mjs`. Generated HTML is committed so the hosting server does not need Node.js.

Open `dist/index.html` in a browser, or serve `dist/` with a local static server. ZIP proximity search requires internet access to api.zippopotam.us. Distances use ZIP centers and are approximate straight-line distances, not driving distances or precise storefront distances.

## GoDaddy hosting

Upload the **contents** of `dist/` to the document root configured for your domain using your hosting file manager or FTP/SFTP access. The document root must contain `index.html`, `styles.css`, `app.js`, and the `assets/` folder together. Do not upload the entire repository as the public website.

For hosting without cPanel, check your GoDaddy product's exact name and configured document root before uploading. Deployment details depend on the hosting product. GoDaddy Website Builder requires a different publishing workflow; this repository is a standalone static website.

The separately provided `tbv-wireless-hosting.zip` contains only the website files, ready to extract into the domain's document root. No database, PHP, or Node.js server is needed. GitHub stores the source; pushing changes there does not automatically update GoDaddy. Upload the changed website files after edits.

Keep hosting passwords and FTP/SFTP credentials out of the repository.
