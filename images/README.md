# Image checklist

Every image slot on the site is currently a dashed placeholder `<div>` labeled
with the filename it expects. Drop client photography into the matching
subfolder under `/images/` using these exact filenames (or update the
`data-expected` attribute in the HTML if a filename changes) and the
placeholders will just need the `<div>` swapped for an `<img>` tag using the
same path.

Export everything as **WebP** (AVIF as a bonus second format) at the display
size noted below — never a 2500px "-scaled" original dropped into a 600px
card. All images need real alt text describing the actual photo (drafts are
already in the HTML `alt`/`data-expected` attributes as placeholders).

---

## `/images/general/` — Home, About, Get a Quote

| Filename | Used on | Purpose | Recommended size |
|---|---|---|---|
| `hero-carving-shop.webp` | Home | Hero image — a carver at work or a striking finished piece | 1200×900 (4:3) |
| `about-shop-floor.webp` | About | Shop floor / yard, gives a sense of scale and real operation | 900×1200 (3:4) |
| `quote-workshop.webp` | Get a Quote | Secondary supporting image next to contact info | 900×1200 (3:4) |

## `/images/materials/` — Materials page detail sections

| Filename | Material | Recommended size |
|---|---|---|
| `cantera-columns-01.webp` | Cantera Columns | 1200×675 (16:9) |
| `cantera-carved-panel-01.webp` | Carved Cantera Panels | 1200×675 (16:9) |
| `indiana-limestone-01.webp` | Indiana Limestone | 1200×675 (16:9) |
| `texas-limestone-01.webp` | Texas Cream Limestone | 1200×675 (16:9) |
| `carrara-marble-01.webp` | Carrara Marble | 1200×675 (16:9) |
| `emperador-marble-01.webp` | Emperador Marble | 1200×675 (16:9) |
| `balustrade-01.webp` | Balustrades & Newels | 1200×675 (16:9) |
| `window-surround-01.webp` | Window & Door Surrounds | 1200×675 (16:9) |
| `thin-veneer-01.webp` | Thin Stone Veneer | 1200×675 (16:9) |
| `full-bed-facade-01.webp` | Full-Bed Facades | 1200×675 (16:9) |

## `/images/services/` — Services page detail sections

| Filename | Service | Recommended size |
|---|---|---|
| `columns-bases-01.webp` | Columns & Bases | 1200×675 (16:9) |
| `headers-sills-01.webp` | Headers & Sills | 1200×675 (16:9) |
| `fountains-01.webp` | Fountains | 1200×675 (16:9) |
| `pool-coping-01.webp` | Pool Coping & Pavers | 1200×675 (16:9) |
| `hardscaping-01.webp` | Hardscaping | 1200×675 (16:9) |
| `range-hood-01.webp` | Kitchens & Range Hoods | 1200×675 (16:9) |
| `hand-carved-01.webp` | Hand-Carved Fabrication | 1200×675 (16:9) |
| `restoration-01.webp` | Stone ID & Restoration | 1200×675 (16:9) |
| `installation-01.webp` | Installation & Transport | 1200×675 (16:9) |

## `/images/fireplaces/` — Fireplaces & Mantels (standalone page)

| Filename | Section | Recommended size |
|---|---|---|
| `hero-mantel-showroom.webp` | Hero | 1200×900 (4:3) |
| `home-teaser-mantel.webp` | Homepage teaser panel | 1200×675 (16:9) |
| `modern-01.webp` / `modern-02.webp` / `modern-03.webp` | Modern Mantels cards | 800×800 (1:1) |
| `stock-01.webp` / `stock-02.webp` / `stock-03.webp` | Mantels in Stock cards | 800×800 (1:1) |
| `classic-01.webp` / `classic-02.webp` / `classic-03.webp` | Classic Mantels cards | 800×800 (1:1) |
| `gallery-01.webp` … `gallery-04.webp` | Fireplace gallery strip (lightbox) | 1000×1000 (1:1), also usable at 1600×1600 for the enlarged lightbox view |

## `/images/gallery/` — Main project gallery (lightbox)

| Filename | Project | Recommended size |
|---|---|---|
| `fireplace-01.webp` | Fluted pilaster mantel, Frisco TX | 1000×1000, up to 1600×1600 for lightbox |
| `fireplace-02.webp` | Cantera arch surround, Highland Park TX | same |
| `fireplace-03.webp` | Floating ledge surround, Plano TX | same |
| `facade-01.webp` | Full-bed limestone facade, downtown Dallas | same |
| `facade-02.webp` | Window surrounds & quoins, McKinney TX | same |
| `facade-03.webp` | Thin veneer retrofit, Garland TX | same |
| `hardscape-01.webp` | Limestone patio & retaining wall, Southlake TX | same |
| `hardscape-02.webp` | Pool coping & paver deck, Rockwall TX | same |
| `hardscape-03.webp` | Stone steps & balustrade, Heath TX | same |
| `interior-01.webp` | Carrara range hood surround, Plano TX | same |
| `interior-02.webp` | Marble bar top, Uptown Dallas | same |
| `interior-03.webp` | Emperador fireplace hearth, Mesquite TX | same |

---

### Notes for whoever drops these in

- Use `loading="lazy"` on every `<img>` except the homepage hero (that one should load eagerly since it's above the fold).
- Provide each photo as a `srcset` with at least two widths (e.g. 1x/2x, or the card width and double for retina) so mobile doesn't download a desktop-sized file.
- Alt text should describe the actual photo, not just repeat the filename — draft alt text is already noted in the HTML source for each slot; adjust once the real photo is in place.
