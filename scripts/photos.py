"""Export the client's photographs into src/assets/images as WebP, all with one colour grade.

The photos come from many cameras and years, so their light disagrees (blue walls, yellow bulbs, grey days).
Every photo gets the same treatment so they read as one set:
  1. a partial white balance, measured only on near-neutral pixels (so a red sculpture stays red);
  2. a slight warm shift toward the site's limestone ground;
  3. softer blacks and highlights (a gentle matte), and a touch less saturation.

Sources: entries starting "ks:" come from $KS_SRC, the founder's "Kiran Stone" folder (stone and metal work
from before and around the studio's founding). Others come from $IFA_SRC, the site-v4 media-src/gallery folder.
Retouched versions: if the folder holds "fix-<original name>" (any of .jpg/.jpeg/.png/.webp), that file is used
instead of the original, so a re-run picks up every fix. Originals are never written to.

Smaller copies: every export also writes narrower copies (640, 1024 and 1600 px wide, when the photo is wider)
to src/assets/images/w/, plus widths.json. The site lists them in srcset, so a phone or a small card downloads
and decodes a small file instead of the full photo; on low-memory devices this keeps scrolling smooth.

Usage:  python3 scripts/photos.py            (all images)
        python3 scripts/photos.py ifa-ribbon  (re-export only the named images)
        python3 scripts/photos.py --sizes     (only rebuild the smaller copies from the exported WebPs)
Requires Pillow.
"""
import os
import sys
from PIL import Image, ImageChops, ImageEnhance, ImageOps, ImageStat

SRC = os.environ.get(
    'IFA_SRC', '/home/brijesh/Mine-site/VernoraTech Projects/inventfineart/site-v4/media-src/gallery'
)
KS = os.environ.get('KS_SRC', '/run/media/brijesh/0050-1781/Kiran Stone')
OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'images')

# name: (source, crop box in source pixels or None, longest edge, WebP quality[, options])
# options: 'keep-light' skips the white balance (for night shots, whose warm lamp light is the point).
BIG, STD, SMALL = 2400, 1800, 1600
PHOTOS = {
    # Hero, banners and project heroes
    'ifa-lobby-installation': ('other_products/6', (0, 0, 3264, 2040), BIG, 80),
    'ifa-machine-lion': ('sculptures/80', None, BIG, 78),
    'ifa-grc-facade-front': ('grc_products/1', None, BIG, 78),
    # Sculptures
    'ifa-stone-ganesha': ('sculptures/18', None, STD, 80),
    'ifa-ribbon': ('sculptures/84', None, STD, 80),
    'ifa-bronze-birds': ('sculptures/25', None, STD, 78),
    'ifa-seated-figure': ('sculptures/56', None, STD, 80),
    'ifa-bronze-sphere': ('water_fountains/16', (525, 0, 1245, 900), STD, 80),
    'ifa-red-runner': ('sculptures/9', None, STD, 80),
    'ifa-climbing-columns': ('sculptures/8', None, STD, 80),
    'ifa-mesh-rhino': ('sculptures/35', None, STD, 78),
    'ifa-mesh-rhino-niche': ('sculptures/36', None, SMALL, 76),
    'ifa-kite-flyer': ('sculptures/44', None, STD, 78),
    'ifa-spinning-wheel': ('sculptures/46', None, STD, 78),
    'ifa-spinning-wheel-rear': ('sculptures/49', None, SMALL, 76),
    'ifa-freedom-of-press': ('sculptures/61', None, STD, 78),
    'ifa-buddha-head': ('sculptures/75', None, STD, 80),
    'ifa-machine-lion-workshop': ('sculptures/78', None, STD, 76),
    'ifa-climbing-wall': ('sculptures/65', None, SMALL, 78),
    'ifa-eagle-drawing': ('sculptures/22', None, STD, 80),
    'ifa-eagle-landmark': ('sculptures/83', None, STD, 78),
    'ifa-equestrian': ('sculptures/13', None, SMALL, 76),
    'ifa-gandhi': ('sculptures/40', None, SMALL, 76),
    'ifa-clay-portrait': ('sculptures/67', None, SMALL, 78),
    'ifa-dancers-workshop': ('sculptures/51', None, SMALL, 78),
    # Planters
    'ifa-face-planter': ('planters/4', None, STD, 74),
    'ifa-elephant-planter': ('planters/3', (520, 0, 2478, 2448), STD, 76),
    # Murals and wall features
    'ifa-relief-wall': ('wall_murals/34', (80, 200, 1400, 1205), SMALL, 80),
    'ifa-leaf-lights': ('wall_murals/35', None, STD, 78),
    'ifa-metal-leaf-wall': ('wall_murals/9', None, STD, 78),
    'ifa-blue-leaf-wall': ('wall_murals/10', None, SMALL, 78),
    'ifa-eagle-wall': ('wall_murals/21', None, STD, 78),
    'ifa-dancers-relief': ('wall_murals/33', None, STD, 78),
    'ifa-relief-panels': ('wall_murals/17', None, STD, 76),
    'ifa-grc-relief-panel': ('grc_products/13', None, SMALL, 78),
    # Customised FRP and GRC
    'ifa-grc-facade': ('grc_products/2', None, STD, 78),
    'ifa-grc-facade-corner': ('grc_products/3', None, STD, 76),
    'ifa-heritage-facade': ('grc_products/11', None, STD, 76),
    'ifa-facade-install': ('grc_products/8', None, SMALL, 76),
    'ifa-columns': ('other_products/4', None, SMALL, 74),
    'ifa-wave-sculpture': ('other_products/3', None, SMALL, 80),
    'ifa-leaf-table': ('other_products/8', None, STD, 76),
    'ifa-leaf-table-lounge': ('other_products/9', None, SMALL, 76),
    'ifa-curved-interior': ('other_products/11', None, STD, 76),
    'ifa-curved-interior-sphere': ('other_products/13', None, SMALL, 76),
    # Outdoor structures and water features
    'ifa-garden-pergola': ('other_products/16', None, SMALL, 78),
    'ifa-lattice-pergola': ('other_products/17', None, STD, 76),
    'ifa-gazebo': ('other_products/2', None, SMALL, 78),
    'ifa-lattice-gazebo': ('other_products/5', None, STD, 76),
    'ifa-rock-waterfall': ('water_fountains/20', None, SMALL, 82),
    'ifa-water-wall': ('water_fountains/15', None, SMALL, 78),
    'ifa-rockery': ('water_fountains/12', None, STD, 76),
    'ifa-rockery-build': ('water_fountains/1', None, STD, 76),
    'ifa-sphere-fountain': ('water_fountains/16', None, SMALL, 78),
    'ifa-rock-wall-fountain': ('water_fountains/7', None, STD, 76),
    # Kiran Stone: Sculpture of Hawker (metal wire, on a real bicycle)
    'ks-hawker-sky': ('ks:IMG_1095.jpg', None, BIG, 80),
    'ks-hawker-front': ('ks:IMG_1090.jpg', None, STD, 80),
    'ks-hawker-rear': ('ks:IMG_1094.jpg', None, STD, 80),
    'ks-hawker-trees': ('ks:IMG_1097.jpg', None, STD, 80),
    'ks-hawker-armature': ('ks:03092007380.jpg', None, SMALL, 80),
    'ks-hawker-welding': ('ks:18092007444.jpg', None, SMALL, 80),
    'ks-hawker-coils': ('ks:24092007487.jpg', None, SMALL, 80),
    'ks-hawker-workshop': ('ks:23092007485.jpg', None, SMALL, 80),
    # Kiran Stone: Statue of Freedom of Press (carved stone)
    'ks-press-sunset': ('ks:IMG_0765.JPG', (0, 0, 1600, 1040), BIG, 84),  # crop drops the camera's date stamp
    'ks-press-night-close': ('ks:IMG_0734.JPG', None, BIG, 80, 'keep-light'),
    'ks-press-night': ('ks:IMG_0740edit.jpg', None, STD, 80, 'keep-light'),
    'ks-press-night-plinth': ('ks:IMG_0758.JPG', None, STD, 82, 'keep-light'),
    'ks-stone-block': ('ks:IMG_0281.JPG', None, STD, 78),
    'ks-press-rough': ('ks:IMG_0296.JPG', None, STD, 78),
    'ks-press-carving': ('ks:IMG_0427.JPG', None, SMALL, 78),
    'ks-press-yard': ('ks:IMG_0442.JPG', None, STD, 78),
    'ks-stone-team': ('ks:IMG_0283.JPG', None, STD, 78),
    # Kiran Stone: figures in stone
    'ks-embrace-studio': ('ks:kiran1.jpg', None, STD, 84),
    'ks-embrace-yard': ('ks:IMG_0584.JPG', None, STD, 78),
    'ks-couple-garden': ('ks:DSC02065.jpg', None, STD, 80),
    'ks-couple-workshop': ('ks:DSC02064.JPG', None, STD, 78),
    'ks-torso': ('ks:07.JPG', None, STD, 78),
    'ks-pointing-frame': ('ks:DSC02056.JPG', None, STD, 78),
    'ks-hawker-unveiling': ('ks:sculpture of hawkers.jpg', None, STD, 82, 'keep-light'),
    # Kiran Stone: press cuttings, 7 January 2015 (e-paper pages). The crop is the printed page, for the card;
    # "-full" is the whole cutting with the article text, opened when the card is clicked.
    'press-lt-front': ('ks:english.jpg', (2, 2, 490, 612), STD, 84, 'keep-light'),
    'press-lt-front-full': ('ks:english.jpg', None, STD, 88, 'keep-light'),
    'press-lt-adate': ('ks:english.jpg1.jpg', (2, 2, 500, 624), STD, 84, 'keep-light'),
    'press-lt-adate-full': ('ks:english.jpg1.jpg', None, STD, 88, 'keep-light'),
    'press-ls-front': ('ks:hindi.jpg', (2, 2, 500, 624), STD, 84, 'keep-light'),
    'press-ls-front-full': ('ks:hindi.jpg', None, STD, 88, 'keep-light'),
    'press-ls-city': ('ks:hindi.jpg1.jpg', (2, 2, 515, 643), STD, 84, 'keep-light'),
    'press-ls-city-full': ('ks:hindi.jpg1.jpg', None, STD, 88, 'keep-light'),
    'press-lokmat-city': ('ks:7 jan 2015 lokmat.jpg', (2, 2, 525, 656), STD, 84, 'keep-light'),
    'press-lokmat-city-full': ('ks:7 jan 2015 lokmat.jpg', None, STD, 88, 'keep-light'),
}

WARM = (1.018, 1.0, 0.962)  # gentle shift toward the limestone ground
LIFT, TOP = 7, 249  # matte: blacks lifted, highlights rolled off


def white_balance(im):
    """Per-channel gains from near-neutral pixels only, applied at 60% strength."""
    small = im.copy()
    small.thumbnail((320, 320))
    _, s, v = small.convert('HSV').split()
    mask = ImageChops.multiply(s.point(lambda x: 255 if x < 48 else 0), v.point(lambda x: 255 if 60 < x < 245 else 0))
    if ImageStat.Stat(mask).mean[0] / 255 < 0.04:  # too few neutral pixels to judge: leave the colour alone
        return (1.0, 1.0, 1.0)
    r, g, b = ImageStat.Stat(small, mask).mean
    avg = (r + g + b) / 3
    return tuple(min(1.12, max(0.88, 1 + (avg / c - 1) * 0.6)) for c in (r, g, b))


def grade(im, keep_light=False):
    gains = (1.0, 1.0, 1.0) if keep_light else white_balance(im)
    luts = []
    for gain, warm in zip(gains, WARM):
        k = gain * warm
        luts += [round(LIFT + (TOP - LIFT) * min(255, x * k) / 255) for x in range(256)]
    im = im.point(luts)
    return ImageEnhance.Color(im).enhance(0.92)


WIDTHS = (640, 1024, 1600)
SIZES = os.path.join(OUT, 'w')


def variants(name):
    """Narrower copies of an exported WebP, for srcset. Returns the full width."""
    im = Image.open(os.path.join(OUT, name + '.webp'))
    os.makedirs(SIZES, exist_ok=True)
    for old in os.listdir(SIZES):
        if old.startswith(name + '.') and old.endswith('.webp'):
            os.remove(os.path.join(SIZES, old))
    for w in WIDTHS:
        if w < im.width * 0.9:
            im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(
                os.path.join(SIZES, f'{name}.{w}.webp'), 'WEBP', quality=76, method=6
            )
    return im.width


def write_widths():
    """widths.json: the full width of every exported image, so the site can describe it in srcset."""
    import json
    names = sorted(f[:-5] for f in os.listdir(OUT) if f.endswith('.webp'))
    widths = {n: Image.open(os.path.join(OUT, n + '.webp')).width for n in names}
    with open(os.path.join(SIZES, 'widths.json'), 'w') as f:
        json.dump(widths, f, indent=0, sort_keys=True)


EXTS = ('.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG')


def source(src):
    """The file for a source entry, preferring a retouched "fix-" copy beside the original."""
    if src.startswith('ks:'):
        folder, file = KS, src[3:]
        stem = os.path.splitext(file)[0]
        for p in [os.path.join(folder, 'fix-' + stem + e) for e in EXTS] + [os.path.join(folder, file)]:
            if os.path.exists(p):
                return p
    else:
        folder, base = os.path.split(os.path.join(SRC, src))
        for p in [os.path.join(folder, 'fix-' + base + e) for e in EXTS] + [os.path.join(folder, base + e) for e in EXTS]:
            if os.path.exists(p):
                return p
    raise FileNotFoundError(src)


def export(name, src, crop, edge, quality, *options):
    path = source(src)
    im = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    if crop and os.path.basename(path).startswith('fix-'):
        crop = None  # a retouched image is already framed
    if crop:
        im = im.crop(crop)
    im.thumbnail((edge, edge), Image.LANCZOS)
    im = grade(im, 'keep-light' in options)
    out = os.path.join(OUT, name + '.webp')
    im.save(out, 'WEBP', quality=quality, method=6)
    variants(name)
    return im.size, os.path.getsize(out)


if __name__ == '__main__':
    if sys.argv[1:] == ['--sizes']:
        names = sorted(f[:-5] for f in os.listdir(OUT) if f.endswith('.webp'))
        for name in names:
            variants(name)
        write_widths()
        print(f'smaller copies for {len(names)} images')
        sys.exit()
    names = sys.argv[1:] or list(PHOTOS)
    total = 0
    for name in names:
        (w, h), size = export(name, *PHOTOS[name])
        total += size
        fixed = ' (fix)' if os.path.basename(source(PHOTOS[name][0])).startswith('fix-') else ''
        print(f'{name:30} {w}x{h}  {size // 1024} KB{fixed}')
    write_widths()
    print(f'{len(names)} photos, {total // 1024} KB')
