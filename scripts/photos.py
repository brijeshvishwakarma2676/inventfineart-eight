"""Export the client's photographs into src/assets/images as WebP, all with one colour grade.

The photos come from many cameras and years, so their light disagrees (blue walls, yellow bulbs, grey days).
Every photo gets the same treatment so they read as one set:
  1. a partial white balance, measured only on near-neutral pixels (so a red sculpture stays red);
  2. a slight warm shift toward the site's limestone ground;
  3. softer blacks and highlights (a gentle matte), and a touch less saturation.

Usage:  python3 scripts/photos.py            (reads from $IFA_SRC, the site-v4 media-src/gallery folder)
        python3 scripts/photos.py ifa-ribbon  (re-export only the named images)
Requires Pillow.
"""
import os
import sys
from PIL import Image, ImageChops, ImageEnhance, ImageOps, ImageStat

SRC = os.environ.get(
    'IFA_SRC', '/home/brijesh/Mine-site/VernoraTech Projects/inventfineart/site-v4/media-src/gallery'
)
OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'images')

# name: (source under SRC, crop box in source pixels or None, longest edge, WebP quality)
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


def grade(im):
    gains = white_balance(im)
    luts = []
    for gain, warm in zip(gains, WARM):
        k = gain * warm
        luts += [round(LIFT + (TOP - LIFT) * min(255, x * k) / 255) for x in range(256)]
    im = im.point(luts)
    return ImageEnhance.Color(im).enhance(0.92)


def export(name, src, crop, edge, quality):
    path = next(p for p in (os.path.join(SRC, src + ext) for ext in ('.jpg', '.jpeg', '.png', '.webp')) if os.path.exists(p))
    im = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    if crop:
        im = im.crop(crop)
    im.thumbnail((edge, edge), Image.LANCZOS)
    im = grade(im)
    out = os.path.join(OUT, name + '.webp')
    im.save(out, 'WEBP', quality=quality, method=6)
    return im.size, os.path.getsize(out)


if __name__ == '__main__':
    names = sys.argv[1:] or list(PHOTOS)
    total = 0
    for name in names:
        (w, h), size = export(name, *PHOTOS[name])
        total += size
        print(f'{name:30} {w}x{h}  {size // 1024} KB')
    print(f'{len(names)} photos, {total // 1024} KB')
