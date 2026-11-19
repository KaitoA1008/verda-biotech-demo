# Verda biotech landing page concept

Local preview: http://127.0.0.1:4180

GitHub repository: https://github.com/KaitoA1008/verda-biotech-demo

GitHub Pages review URL (available after publication): https://kaitoa1008.github.io/verda-biotech-demo/

The earlier Sites publication has been made private at the user's request GitHub is the publishing destination for this demo

This is a fictional English-language biotech concept prepared for design discussion with Jun Kad. It has eight sections: Hero, Technology & Applications, Problem & Solution, Folia molecule highlight, Vision, Founders & Advisors, FAQ, Contact

## Reference revision

### Animation pass

After a second direct review of Cardasun and Novonesis, motion adds a short staggered headline entrance, slow photographic drift, editorial image reveals, a drawn process line, a gently floating molecular illustration with subtle orbit lines, menu transitions and native FAQ height transitions where supported

The Pause control now pauses all decorative animation and smooth scrolling It preserves loop phases when paused Animation loops stop outside their viewport or while the tab is hidden Reduced motion removes the animation and shows readable final states No animation library or rendering loop is added

The compact navigation is 64px tall on desktop and 60px on mobile Hero scenes change every 4.25 seconds with a 0.8-second crossfade and an 8.5-second drift cycle

Hero height follows the viewport after accounting for navigation and the utility bar Media controls occupy their own grid row instead of overlaying the copy Short screens use tighter spacing and responsive display type so Pause and the scene selectors remain visible

The second design pass follows a direct browser review of Novonesis: full-width photographic hero, centered display typography, pale mint fields, rectangular photography, quiet green buttons, generous editorial spacing and a dark green footer

Hero imagery crossfades gently between nature and laboratory scenes The visitor can choose an image or pause/resume the sequence Automatic changes stop when the hero is out of view, the tab is hidden or reduced motion is requested

The client's screenshot mentions two websites with the same look and concept, each around 5–7 main pages This deliverable remains the original eight-section single-page demo A second brand/site and a multi-page content structure require the individual briefs and approved content

## Run locally

Run `node serve.cjs` or `npm start` from this directory. The server binds only to `127.0.0.1:4180`. It needs Node.js and has no runtime package dependencies. If the port is occupied, use PowerShell `$env:PORT=4181` before starting

The preview launched during authoring is running in a hidden process. Its process ID is recorded in `preview.pid`. Do not start a second copy on the same port

## Change client content

- `content.js`: brand name, section copy, applications, product facts, team, FAQ and contact feedback
- `app.js`: page structure, labels, menu and form behavior
- `style.css`: palette tokens, typography, responsive layout and motion
- `assets/`: local photographs, original SVG illustrations and licensed fonts
- `index.html`: document metadata and script/style entry points

The logo is an original inline SVG in `app.js`. To replace it, update the `mark` variable and the favicon. Replace the image paths in `app.js` and team entries in `content.js` for client-supplied images

## Hosting handoff

`dist/` contains the runtime files only, ready for static hosting. `hostinger-ready.zip` contains the same files with `index.html` at archive root. After the client approves the direction, those files can be uploaded to Hostinger `public_html`. There is no build process, CMS, account system or backend

This is plain HTML, CSS and JavaScript. A future Framer version would need to be recreated or embedded; this is not a native Framer project

Public hosting is authorized for temporary review No client message or external form submission is made by this project

## Demo behavior

- Section anchors, responsive menu with Escape dismissal, native keyboard-accessible FAQ
- Required name, email and message with inline validation and first-invalid-field focus
- Successful validation explicitly says no message was sent or saved
- No endpoint, fetch, analytics, localStorage, sessionStorage or cookies
- Local image/font assets and reduced-motion support
- Fictional people and product; no clinical, safety, performance or regulatory claims

## Design references and provenance

Cardasun: https://cardasun.com/ — inspected public HTML, colors, section structure and hero image. Design cues: mint/teal, restrained amber, nature plus chemistry, clear single-page narrative

Novonesis: https://www.novonesis.com/en — inspected public page content, colors and hero imagery. Design cues: substantial typography, nature-led imagery, generous spacing and alternating visual rhythm

Neither reference's logo, photography, product, text or illustrations is included in the deliverable. Reference images were used only for inspection and kept outside this project

Nature images are downloaded from Unsplash and stored locally under the Unsplash license (https://unsplash.com/license)

- Leaves: https://images.unsplash.com/photo-1518531933037-91b2f5f229cc
- Forest: https://images.unsplash.com/photo-1441974231531-c6227db76b6e
- Laboratory samples: https://images.unsplash.com/photo-1532187863486-abf9dbad1b69
- Glassware: https://images.unsplash.com/photo-1532094349884-543bc11b234d
- Plant: https://images.unsplash.com/photo-1501004318641-b39e6451bec6

The molecule, four vector portraits, brand mark and application icons are original code-drawn SVG illustrations created for this concept. The molecule is artistic and is not a chemical structure

Manrope font: https://github.com/google/fonts/tree/main/ofl/manrope — SIL Open Font License included in `assets/manrope-OFL.txt`

## Verification

Run `npm ci` then `npm test` with the preview server running. `qa.cjs` uses isolated headless Chromium; it does not attach to the user's existing Brave session. Set `QA_CHROMIUM` to an installed Chromium executable if required

`qa-report.json` records the initial design checks `qa-cua-report.json` records the photographic revision's checks `qa-motion-cua-report.json` records the animation pass, including real transform changes and phase-preserving pause checks `screenshots/animation-*` contains the latest desktop/mobile motion views

The initial version was checked in isolated headless Chromium after native Brave access was stopped The Novonesis revision was visually inspected and tested directly through CUA in the in-app browser at 320, 375, 768, 1024 and 1440px
