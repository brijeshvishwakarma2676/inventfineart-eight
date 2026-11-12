# Kiran Stone photographs: what is used, what needs fixing

Source folder: `/run/media/brijesh/0050-1781/Kiran Stone` (145 photos, 2006–2016). These are our founder's own works: the Sculpture of Hawker (wound metal wire, on a real bicycle), the Statue of Freedom of Press (carved stone), several stone figures, the workshop and stone yard, plus press cuttings and event photos.

The originals are never changed. `scripts/photos.py` reads them, grades them like every other photo on the site and writes WebP files to `src/assets/images` (names start with `ks-`).

**Retouched files:** save a retouched image in the same folder as `fix-<original name>`, for example `fix-IMG_0765.JPG`. Then run `python3 scripts/photos.py`. The script uses the `fix-` file instead of the original. If the original had a crop in the script, that crop is skipped, because a retouched image is already framed.

## 1. Used on the site now (23 photos, the unveiling photo and 5 press cuttings)

| Original | Site image | Where |
|---|---|---|
| IMG_1095.jpg | ks-hawker-sky | Hero of the Sculpture of Hawker project (focused on the raised paper) |
| IMG_1090.jpg | ks-hawker-front | Hawker project gallery; lead photo of the Sculpture of Hawker in Collections |
| IMG_1094.jpg | ks-hawker-rear | Hawker project gallery; hover photo in Collections |
| IMG_1097.jpg | ks-hawker-trees | Home, "From the workshop" strip |
| 03092007380.jpg | ks-hawker-armature | Hawker project: the frame of rods |
| 18092007444.jpg | ks-hawker-welding | Hawker project: wrapping in wire |
| 24092007487.jpg | ks-hawker-coils | Hawker project: nearly finished |
| 23092007485.jpg | ks-hawker-workshop | About, Behind the scenes |
| IMG_0765.JPG | ks-press-sunset | Hero of the Freedom of Press project (cropped to remove the date stamp) |
| IMG_0281.JPG | ks-stone-block | Freedom of Press project: the raw block |
| IMG_0296.JPG | ks-press-rough | Freedom of Press project: roughed out |
| IMG_0427.JPG | ks-press-carving | Freedom of Press project: carving |
| IMG_0442.JPG | ks-press-yard | Freedom of Press project: finished in the yard |
| IMG_0740edit.jpg | ks-press-night | Freedom of Press project: lit at night |
| IMG_0734.JPG | ks-press-night-close | Freedom of Press project: close view at night |
| IMG_0758.JPG | ks-press-night-plinth | Hover photo of the Statue of Freedom of Press in Collections |
| IMG_0283.JPG | ks-stone-team | About, Behind the scenes |
| DSC02056.JPG | ks-pointing-frame | About, Behind the scenes |
| kiran1.jpg | ks-embrace-studio | Collections, "Embrace, in stone" (lead); Home strip |
| IMG_0584.JPG | ks-embrace-yard | Collections, "Embrace, in stone" (hover) |
| DSC02065.jpg | ks-couple-garden | Collections, "Couple, in stone" (lead) |
| DSC02064.JPG | ks-couple-workshop | Collections, "Couple, in stone" (hover) |
| 07.JPG | ks-torso | Collections, "Torso, in stone" |
| sculpture of hawkers.jpg | ks-hawker-unveiling | Hawker project: the unveiling, January 2015 |
| english.jpg | press-lt-front (+ -full) | "In the press" on About and the Hawker project: Lokmat Times, front page |
| english.jpg1.jpg | press-lt-adate (+ -full) | "In the press": Lokmat Times, "Capturing commitment in art a tough task: Adate" (also the source of the founder's quote) |
| hindi.jpg | press-ls-front (+ -full) | "In the press": Lokmat Samachar, front page |
| hindi.jpg1.jpg | press-ls-city (+ -full) | "In the press": Lokmat Samachar, city page |
| 7 jan 2015 lokmat.jpg | press-lokmat-city (+ -full) | "In the press": Lokmat (Marathi), city page |

The press cards show the printed page. Selecting one opens the whole cutting, with the article text, in a viewer; "Full size" opens it in a new tab for zooming on a phone. Their text is in `src/data/press.js`.

## 2. Worth using after retouching

Every prompt asks the editor to leave the sculpture itself unchanged. AI editors tend to "improve" a sculpture's face, proportions or surface. A changed sculpture is no longer a true record of the work, so check each result against the original before saving it.

### IMG_0765.JPG → fix-IMG_0765.JPG
Replaces the current Freedom of Press hero, which today is only 1600 px wide and cropped.
> Professional architectural photo retouch of this photograph of a stone sculpture of two seated figures reading a newspaper, on a stepped stone plinth at sunset. Remove the orange camera date stamp "04/05/2007 18:22" in the lower right and rebuild the grass beneath it. Remove the man walking on the left of the plinth and the person sitting at the right edge of the plinth, and rebuild the fountain, wall and grass behind them. Lift the shadows on the sculpture and plinth so the carved stone texture is clearly visible, while keeping the warm sunset sky and its colours. Correct the slight tilt so the building's vertical edges are straight. Upscale to at least 3200 px wide, sharpen fine detail naturally and remove JPEG noise. Do not change the sculpture's shape, faces, proportions, newspaper or stone texture in any way. No added objects, no text, natural photographic look.

### IMG_1089.jpg → fix-IMG_1089.jpg
A wide view of the Hawker on site, for its project gallery.
> Clean-up retouch of this photograph of a dark wound-wire sculpture of a man on a real bicycle, raising a newspaper, standing on a rusted steel base plate in a paved courtyard. Remove the white plastic sacks, cardboard boxes, the broom and the loose debris on the paving to the right of the sculpture, and the small table and loose items on the far left. Rebuild clean paving and kerb stones in their place. Keep the trees, the building and the sky. Balance the exposure so the dark wire texture of the figure is readable against the bright sky, with a natural daylight white balance. Upscale 1.5× and sharpen naturally. Do not change the sculpture, bicycle or base plate in any way.

### IMG_0708.JPG → fix-IMG_0708.JPG
"Being fixed on its plinth", for the Freedom of Press project.
> Retouch of this photograph of a stone sculpture of two seated figures being installed on a stone plinth under a temporary bamboo and cloth canopy. Remove the orange camera date stamp in the lower right corner and rebuild the stone plinth beneath it. Correct the exposure so the shaded sculpture under the canopy is clearly visible without blowing out the bright sky. Apply a neutral white balance and reduce noise. Keep the workers, the canopy and the scaffolding, because they show the installation. Do not alter the sculpture.

### 05.jpg → fix-05.jpg and 05 (1) copy.jpg → fix-05 (1) copy.jpg
Two views of a red sandstone embrace (one smooth figure, one ridged), for a new Collections piece. Both are tiny (about 400 × 600 px).
> Upscale this small photograph of a red sandstone sculpture of two embracing figures (one smooth, one carved in horizontal ridges) to 4× its size with a high-quality, detail-preserving upscaler, then retouch it as a professional product photograph. Replace the background (wall, floor, plant and vase) with a seamless, softly lit warm-grey studio backdrop with a gentle floor shadow under the sculpture. Correct the white balance so the stone reads as natural red sandstone, not orange. Sharpen the ridged carving naturally and remove JPEG artefacts. Keep the sculpture's exact shape, proportions, ridges and colour. Do not invent detail that is not there.

### 000 (1).JPG → fix-000 (1).JPG
A pink sandstone frame with metal reeds, for Collections.
> Upscale this small photograph (480 × 640) of a rough-hewn pink sandstone sculpture shaped like an open rectangular frame, with thin dark metal reeds rising inside it, to 3× its size with a detail-preserving upscaler. Replace the creased grey cloth backdrop with a smooth, seamless light-grey studio backdrop and a soft floor shadow. Even out the lighting, correct the white balance to neutral and sharpen the chiselled stone texture naturally. Keep the sculpture's shape, the reeds and the stone colour exactly.

### DSC02062.jpg → fix-DSC02062.jpg
An embracing couple in white stone, photographed lying in the dust of the stone yard.
> Product-photo retouch of this photograph of a white stone sculpture of two embracing figures, lying on a dusty stone-yard floor, photographed from above. Replace the dusty ground, stone chips and the shoe at the bottom left with a clean, even, light concrete surface, keeping a soft natural shadow around the sculpture. Correct the exposure so the white stone is bright but not clipped, with a neutral white balance. Straighten and centre the composition, with a little space around the sculpture. Do not change the sculpture's shape, the figures or the stone texture.

### DSC02063.JPG → fix-DSC02063.JPG
Reclining figures in white stone.
> Product-photo retouch of this photograph of a white stone sculpture of reclining embracing figures, lying on sandy ground in a stone yard. Replace the sand, debris and stone fragments with a clean, even, light concrete surface and a soft shadow under the sculpture. Use a neutral white balance and bright, unclipped highlights. Sharpen the carved texture naturally. Keep the sculpture exactly as it is.

### DSC02061.jpg → fix-DSC02061.jpg
Two stone torsos side by side.
> Retouch of this photograph of two standing stone torsos (one smooth, one carved in fine horizontal ridges) in a stone yard. Remove the yellow sign with lettering on the left and the loose rubble and plastic sheet at the base. Replace the background with a clean, softly blurred, neutral stone-yard backdrop, or a seamless light-grey studio backdrop. Even out the lighting so both torsos are equally exposed, with a neutral white balance. Keep both sculptures exactly as they are.

### 29092007535.jpg → fix-29092007535.jpg
The finished Hawker in the workshop, with an artisan.
> Correct this washed-out phone photograph of a large dark wire sculpture of a man on a bicycle in a workshop, with an artisan working on it. Recover the blown-out highlights in the background, bring back contrast and detail in the dark wire figure, and correct the yellow-magenta cast to a neutral white balance. Reduce phone-camera noise and sharpen gently. Do not change the sculpture or the people.

### 02102007557.jpg → fix-02102007557.jpg
The Hawker at night, in the workshop yard.
> Correct this low-light phone photograph of a large wire sculpture of a man on a bicycle, at night. Remove the heavy orange colour cast so the sculpture reads as dark bronze-brown metal under warm light, not saturated orange. Reduce noise strongly while keeping the wire texture. Darken the busy background slightly so the figure stands out. Remove the ladder on the right edge. Do not alter the sculpture.

### LANDSCAPE ART INSTALLATION I.jpg → fix-LANDSCAPE ART INSTALLATION I.jpg (and II)
Sliced steel figures on a yellow rock, on a lawn.
> Restore this heavily compressed photograph of a landscape art installation: two human figures built from stacked horizontal steel slices, one seated and one stepping, on a yellow rock, set in a bed of grey stone chips on a green lawn. Remove the JPEG blocking and colour banding, sharpen the edges of the steel slices naturally, and correct the white balance to natural daylight. Remove the red post box and signboard on the left (version II) and soften the busy background. Keep the sculpture, the rock and the stone bed exactly as they are.

### IMG_0005 (33).jpg → fix-IMG_0005 (33).jpg
A tall carved stone column-figure (424 × 717 px).
> Upscale this small photograph of a tall, pale carved stone sculpture, a stylised standing figure with crisp vertical planes, to 3× its size with a detail-preserving upscaler. Replace the dark blue tiled background with a seamless warm-grey studio backdrop and a soft floor shadow. Use a neutral white balance and sharpen the chisel marks naturally. Keep the sculpture's exact shape.

## 3. Not used, and why

| Files | Reason |
|---|---|
| MSR_2090–2094.JPG | Felicitation on stage: people, not the work. Could support a future "Recognition" section |
| 2015-01-07~06ngp-vruttapatra_ns.jpg | Unveiling crowd, small (388 × 400); "sculpture of hawkers.jpg" is the better copy and is used |
| english.jpg1 - Copy.jpg | Exact copy of english.jpg1.jpg |
| 01102007542-002.jpg, 24092007503.jpg | Personal portraits |
| DSC05062.JPG, DSC05064.JPG | Gallery visit with people, 640 × 480 |
| IMG_0257.JPG, IMG_0258.JPG | Fort and quarry landscapes, not the studio's work |
| IMG_0760–0764, 0766, Copy of IMG_0762, 00 (3).JPG | Repeats of the sunset view, all with date stamps (IMG_0765 is the best of them) |
| IMG_0699, 0700, 0732, 0739, 0741, 0745–0747, 0753, 0759 | Repeats of the night views (the best three are used) |
| IMG_0091–0095, IMG_1091–1093, 1096, 1098, 1099 | Repeats of the Hawker on site (the best four are used) |
| 03092007367/373/375/378/382, 04092007390/394/395, 13092007415, 16092007421/425, 17092007431, 20092007450–461, 21092007473, 23092007484/486, 24072007116, 29092007524–534, 02102007553/558 | More of the Hawker being made: duplicates, blown-out or blurred phone shots. The clearest are used |
| IMG_0266, 0282, 0285, 0287, 0298, 0428, 0431, 0448, 0449, 0505, 0635, 0636 (and its copy), 0639, 0641, 0643, 0697, 0709, 0710 | More of the Freedom of Press being carved: repeats of the shots used. IMG_0431, 0636 and 0505 (wire saw) are good spares |
| DSC02051–02053, 02055, 02057–02060, 07 (1).JPG, 04.jpg | Spares of the stone yard and stone figures, or rotated/duplicate shots |
| IMG_0740.JPG | The unedited original of IMG_0740edit.jpg, which is used |
