"""Generates tonal, gallery-lit SVG 'plates' used as replaceable placeholder imagery."""
import math, os, random

import pathlib
OUT = str(pathlib.Path(__file__).resolve().parent.parent / "src" / "assets" / "images")
os.makedirs(OUT, exist_ok=True)

class S:
    def __init__(self, name, w, h):
        self.name, self.w, self.h = name, w, h
        self.defs, self.body, self.n = [], [], 0
    def id(self, p="g"):
        self.n += 1
        return f"{p}{self.n}"
    def lin(self, stops, x1=0, y1=0, x2=0, y2=1):
        i = self.id("l")
        s = "".join(f'<stop offset="{o}" stop-color="{c}" stop-opacity="{a}"/>' for o, c, a in [(t + (1,))[:3] if len(t) == 2 else t for t in stops])
        self.defs.append(f'<linearGradient id="{i}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">{s}</linearGradient>')
        return f"url(#{i})"
    def rad(self, stops, cx=.5, cy=.5, r=.5, fx=None, fy=None):
        i = self.id("r")
        s = "".join(f'<stop offset="{o}" stop-color="{c}" stop-opacity="{a}"/>' for o, c, a in [(t + (1,))[:3] if len(t) == 2 else t for t in stops])
        f = f' fx="{fx}" fy="{fy}"' if fx is not None else ""
        self.defs.append(f'<radialGradient id="{i}" cx="{cx}" cy="{cy}" r="{r}"{f}>{s}</radialGradient>')
        return f"url(#{i})"
    def blur(self, sd):
        i = self.id("b")
        self.defs.append(f'<filter id="{i}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="{sd}"/></filter>')
        return f"url(#{i})"
    def add(self, x):
        self.body.append(x)
    def save(self):
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="{self.w}" height="{self.h}" preserveAspectRatio="xMidYMid slice">'
               f'<defs>{"".join(self.defs)}</defs>{"".join(self.body)}</svg>')
        with open(f"{OUT}/{self.name}.svg", "w") as f:
            f.write(svg)

# ---------- shared scene pieces ----------
def room(s, horizon=.74, wall=("#EEE7DC", "#D8CDBC"), floor=("#C8BAA3", "#9C8D76"), light=(.28, .22), warmth=.55):
    w, h = s.w, s.h
    hy = h * horizon
    s.add(f'<rect width="{w}" height="{hy}" fill="{s.lin([(0, wall[0]), (1, wall[1])])}"/>')
    s.add(f'<rect y="{hy}" width="{w}" height="{h-hy}" fill="{s.lin([(0, floor[0]), (1, floor[1])])}"/>')
    # raking light pool on wall
    s.add(f'<ellipse cx="{w*light[0]}" cy="{h*light[1]}" rx="{w*.7}" ry="{h*.55}" fill="{s.rad([(0,"#FFF8EC",warmth),(1,"#FFF8EC",0)])}"/>')
    # skirting shadow
    s.add(f'<rect y="{hy-2}" width="{w}" height="{h*.02}" fill="#6F6455" opacity=".18" filter="{s.blur(6)}"/>')
    return hy

def vignette(s, strength=.38):
    s.add(f'<rect width="{s.w}" height="{s.h}" fill="{s.rad([(0,"#000",0),(.65,"#000",0),(1,"#1E1A16",strength)], r=.75)}"/>')

def floor_shadow(s, cx, cy, rx, ry, op=.45, sd=None):
    s.add(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#3B3229" opacity="{op}" filter="{s.blur(sd or rx*.12)}"/>')

def cast(s, pts, op=.22, sd=18):
    p = " ".join(f"{x},{y}" for x, y in pts)
    s.add(f'<polygon points="{p}" fill="#4A3F33" opacity="{op}" filter="{s.blur(sd)}"/>')

def sphere(s, cx, cy, r, base, hi, lo, spec=.55):
    s.add(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{s.rad([(0,hi),(.45,base),(1,lo)], cx=.36, cy=.32, r=.75)}"/>')
    s.add(f'<ellipse cx="{cx-r*.38}" cy="{cy-r*.42}" rx="{r*.16}" ry="{r*.11}" fill="#FFF6E6" opacity="{spec}" filter="{s.blur(r*.05)}"/>')
    # bounce light from floor
    s.add(f'<ellipse cx="{cx}" cy="{cy+r*.82}" rx="{r*.6}" ry="{r*.14}" fill="#E8D9C0" opacity=".14" filter="{s.blur(r*.06)}"/>')

def box(s, x, y, w, h, light="#E2D9CB", mid="#CFC4B3", dark="#A99C88", side=0):
    s.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{s.lin([(0,light),(.55,mid),(1,dark)], x2=1, y2=0)}"/>')
    if side:
        s.add(f'<polygon points="{x+w},{y} {x+w+side},{y-side*.35} {x+w+side},{y+h-side*.35} {x+w},{y+h}" fill="{dark}" opacity=".9"/>')
        s.add(f'<polygon points="{x},{y} {x+side},{y-side*.35} {x+w+side},{y-side*.35} {x+w},{y}" fill="{light}"/>')

def cylinder(s, cx, top, bot, rx, ry, light, mid, dark, rim=None):
    s.add(f'<rect x="{cx-rx}" y="{top}" width="{rx*2}" height="{bot-top}" fill="{s.lin([(0,light),(.35,mid),(1,dark)], x2=1, y2=0)}"/>')
    s.add(f'<ellipse cx="{cx}" cy="{bot}" rx="{rx}" ry="{ry}" fill="{s.lin([(0,light),(.35,mid),(1,dark)], x2=1, y2=0)}"/>')
    s.add(f'<ellipse cx="{cx}" cy="{top}" rx="{rx}" ry="{ry}" fill="{rim or light}"/>')

def foliage(s, cx, cy, spread, count, seed, colors=("#5E6650", "#717A60", "#4A5240", "#868D72"), leaf=(26, 9), droop=0):
    rnd = random.Random(seed)
    for _ in range(count):
        a = rnd.uniform(0, math.tau)
        d = spread * math.sqrt(rnd.random())
        x = cx + math.cos(a) * d
        y = cy + math.sin(a) * d * .7 + droop * (d / spread)
        rot = rnd.uniform(-80, 80)
        c = rnd.choice(colors)
        lx, ly = leaf[0] * rnd.uniform(.7, 1.3), leaf[1] * rnd.uniform(.7, 1.2)
        s.add(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{lx:.1f}" ry="{ly:.1f}" fill="{c}" opacity="{rnd.uniform(.75,1):.2f}" transform="rotate({rot:.0f} {x:.1f} {y:.1f})"/>')

def grasses(s, cx, base, width, height, count, seed, colors=("#7C8263", "#99946E", "#6A6F55", "#B3A57E")):
    rnd = random.Random(seed)
    for _ in range(count):
        x0 = cx + rnd.uniform(-width / 2, width / 2) * .55
        lean = rnd.uniform(-width * .55, width * .55)
        hh = height * rnd.uniform(.55, 1)
        c = rnd.choice(colors)
        s.add(f'<path d="M{x0:.1f},{base} Q{x0+lean*.3:.1f},{base-hh*.6:.1f} {x0+lean:.1f},{base-hh:.1f}" stroke="{c}" stroke-width="{rnd.uniform(2,5):.1f}" fill="none" stroke-linecap="round"/>')

# ---------- plates ----------
def hero():
    s = S("hero", 2000, 1400)
    hy = room(s, .76, wall=("#EFE8DD", "#D6C9B6"), light=(.32, .18), warmth=.7)
    # GRC monolith with circular void
    mx, mw, mt = 740, 400, 150
    s.defs.append(f'<mask id="void"><rect width="2000" height="1400" fill="#fff"/><circle cx="{mx+mw/2}" cy="{mt+340}" r="120" fill="#000"/></mask>')
    cast(s, [(mx+mw, hy), (mx+mw+520, hy+70), (mx+mw+560, hy+120), (mx+mw, hy+40)], .2, 26)
    s.add(f'<g mask="url(#void)">')
    box(s, mx, mt, mw, hy - mt + 14, "#E4DBCD", "#CEC2AE", "#A3957F", side=44)
    s.add('</g>')
    # inner void shading
    s.add(f'<circle cx="{mx+mw/2}" cy="{mt+340}" r="120" fill="none" stroke="#7E705C" stroke-width="10" opacity=".55" filter="{s.blur(4)}"/>')
    # bronze sphere in front on low plinth
    floor_shadow(s, 1270, hy + 190, 280, 40, .5)
    box(s, 1060, hy + 40, 400, 150, "#DDD3C4", "#C6B9A4", "#9C8E78", side=30)
    floor_shadow(s, 1260, hy + 36, 150, 16, .55, 8)
    sphere(s, 1260, hy - 120, 160, "#80542F", "#D9A86C", "#2E1F14")
    floor_shadow(s, 980, hy + 30, 260, 26, .35)
    vignette(s, .42)
    s.save()

def monolith():
    s = S("sc-monolith", 1200, 1600)
    hy = room(s, .78, light=(.2, .2))
    cast(s, [(720, hy), (1150, hy + 90), (1180, hy + 150), (720, hy + 40)], .25, 22)
    s.defs.append('<mask id="m2"><rect width="1200" height="1600" fill="#fff"/><path d="M530,560 a70,140 0 1,0 0.1,0" fill="#000"/></mask>')
    s.add('<g mask="url(#m2)">')
    s.add(f'<path d="M470,{hy+20} L470,420 Q470,300 600,300 Q730,300 730,420 L730,{hy+20} Z" fill="{s.lin([(0,"#E6DECF"),(.5,"#CBBFAB"),(1,"#97897A")], x2=1, y2=0)}"/>')
    s.add('</g>')
    s.add(f'<path d="M530,560 a70,140 0 1,0 0.1,0" fill="none" stroke="#6E6252" stroke-width="12" opacity=".5" filter="{s.blur(5)}"/>')
    floor_shadow(s, 600, hy + 26, 190, 20, .5)
    vignette(s)
    s.save()

def orbit():
    s = S("sc-orbit", 1200, 1600)
    hy = room(s, .8, wall=("#E9E1D4", "#CFC2AE"), light=(.7, .15))
    box(s, 380, 980, 440, hy - 980 + 30, "#D9CFBF", "#C4B7A2", "#988A74")
    floor_shadow(s, 610, hy + 34, 280, 26, .5)
    cast(s, [(380, hy), (60, hy + 80), (40, hy + 130), (380, hy + 40)], .2, 22)
    floor_shadow(s, 600, 976, 190, 18, .6, 10)
    sphere(s, 600, 790, 200, "#7A4E2B", "#E0AE70", "#2A1B10")
    # carved meridian groove
    s.add(f'<path d="M600,590 Q760,790 600,990" fill="none" stroke="#2A1B10" stroke-width="10" opacity=".55"/>')
    s.add(f'<path d="M606,590 Q766,790 606,990" fill="none" stroke="#E8BD84" stroke-width="3" opacity=".45"/>')
    vignette(s)
    s.save()

def ribbon():
    s = S("sc-ribbon", 2000, 1300)
    hy = room(s, .74, wall=("#ECE5DA", "#D2C6B3"), light=(.5, .2))
    floor_shadow(s, 1000, hy + 150, 620, 50, .4)
    g = s.lin([(0, "#F4EEE4"), (.4, "#DCD2C2"), (1, "#8F8270")], x1=0, y1=0, x2=1, y2=1)
    g2 = s.lin([(0, "#B8AB97"), (1, "#5E5446")], x1=0, y1=0, x2=1, y2=0)
    s.add(f'<path d="M380,{hy+140} C460,420 820,300 1010,560 C1180,800 1460,700 1600,{hy+130} L1480,{hy+150} C1400,900 1180,980 980,740 C800,560 600,640 560,{hy+150} Z" fill="{g}"/>')
    s.add(f'<path d="M1010,560 C1180,800 1460,700 1600,{hy+130} L1480,{hy+150} C1400,900 1180,980 980,740 Z" fill="{g2}" opacity=".55"/>')
    vignette(s, .35)
    s.save()

def cairn():
    s = S("sc-cairn", 1200, 1600)
    hy = room(s, .8, wall=("#E6DED2", "#C9BCA8"), light=(.25, .25))
    floor_shadow(s, 610, hy + 20, 260, 26, .5)
    stones = [(600, hy - 70, 230, 92, "#A79A86"), (620, hy - 225, 180, 76, "#C9BEAE"), (590, hy - 355, 140, 62, "#8E8170"), (610, hy - 462, 98, 48, "#D6CCBD"), (600, hy - 540, 62, 34, "#7E7262")]
    for cx, cy, rx, ry, c in stones:
        s.add(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{s.rad([(0,"#F2EBE0"),(.5,c),(1,"#4E453A")], cx=.35, cy=.3, r=.8)}"/>')
        s.add(f'<ellipse cx="{cx}" cy="{cy+ry*.92}" rx="{rx*.7}" ry="{ry*.12}" fill="#2E271F" opacity=".35" filter="{s.blur(6)}"/>')
    vignette(s)
    s.save()

def fluted_planter():
    s = S("pl-fluted", 1200, 1600)
    hy = room(s, .8, light=(.22, .2))
    floor_shadow(s, 600, hy + 30, 300, 30, .5)
    cast(s, [(860, hy), (1200, hy + 60), (1200, hy + 120), (860, hy + 40)], .2, 20)
    # trunk
    s.add(f'<path d="M590,1020 C580,880 640,760 610,610 M600,830 C660,760 720,700 760,600 M600,760 C540,700 480,640 450,560" stroke="#5B4A39" stroke-width="16" fill="none" stroke-linecap="round"/>')
    foliage(s, 610, 470, 300, 520, 7, leaf=(24, 7))
    top, bot = 1020, hy + 20
    cylinder(s, 600, top, bot, 260, 34, "#E6DDCE", "#CDBFAA", "#8F816C", rim="#B9AB95")
    for i in range(14):
        x = 600 - 250 + i * 38.5
        s.add(f'<rect x="{x}" y="{top+10}" width="10" height="{bot-top}" fill="#6E6150" opacity="{.10+.18*(i/13)}"/>')
    s.add(f'<ellipse cx="600" cy="{top}" rx="232" ry="24" fill="#4D4135"/>')
    vignette(s)
    s.save()

def bowl_planter():
    s = S("pl-bowl", 2000, 1300)
    hy = room(s, .7, wall=("#EAE2D5", "#CFC2AD"), light=(.65, .2))
    floor_shadow(s, 1000, hy + 240, 600, 50, .45)
    grasses(s, 1000, hy - 20, 820, 520, 260, 3)
    s.add(f'<path d="M420,{hy-30} Q450,{hy+250} 1000,{hy+250} Q1550,{hy+250} 1580,{hy-30} Z" fill="{s.lin([(0,"#E3D9C9"),(.5,"#C3B5A0"),(1,"#7E705C")], x2=1, y2=0)}"/>')
    s.add(f'<ellipse cx="1000" cy="{hy-30}" rx="580" ry="44" fill="#B8AA94"/>')
    s.add(f'<ellipse cx="1000" cy="{hy-26}" rx="550" ry="34" fill="#4E4236"/>')
    grasses(s, 1000, hy - 26, 700, 300, 120, 4)
    vignette(s, .34)
    s.save()

def trio():
    s = S("pl-trio", 2000, 1300)
    hy = room(s, .76, wall=("#E9E0D2", "#CDBFA9"), light=(.3, .25))
    specs = [(620, 300, 170, 120, "#D6CBBB", 1), (1040, 520, 210, 150, "#B9AA92", 2), (1440, 380, 150, 105, "#8D7D67", 3)]
    for cx, hgt, rt, rb, c, sd in specs:
        floor_shadow(s, cx, hy + 40, rt * 1.2, 22, .5)
        top = hy + 30 - hgt
        foliage(s, cx, top - 50, rt * .9, 160, sd, leaf=(20, 8))
        s.add(f'<path d="M{cx-rt},{top} L{cx-rb},{hy+30} L{cx+rb},{hy+30} L{cx+rt},{top} Z" fill="{s.lin([(0,"#EFE6D8"),(.4,c),(1,"#5D5243")], x2=1, y2=0)}"/>')
        s.add(f'<ellipse cx="{cx}" cy="{top}" rx="{rt}" ry="18" fill="#4A3E32"/>')
    vignette(s, .34)
    s.save()

def ripple():
    s = S("mu-ripple", 2000, 1300)
    s.add(f'<rect width="2000" height="1300" fill="{s.lin([(0,"#E8E0D3"),(1,"#CDBFAA")])}"/>')
    for i in range(34):
        r = 60 + i * 52
        s.add(f'<circle cx="1420" cy="980" r="{r}" fill="none" stroke="#FFF7EA" stroke-width="7" opacity=".55" transform="translate(-4 -4)"/>')
        s.add(f'<circle cx="1420" cy="980" r="{r}" fill="none" stroke="#7D6F5C" stroke-width="7" opacity=".38" transform="translate(5 6)"/>')
        s.add(f'<circle cx="1420" cy="980" r="{r}" fill="none" stroke="#D8CCBA" stroke-width="8"/>')
    s.add(f'<rect width="2000" height="1300" fill="{s.lin([(0,"#FFF8EC",.45),(1,"#FFF8EC",0)], x2=1, y2=1)}"/>')
    vignette(s, .3)
    s.save()

def arches_relief():
    s = S("mu-arches", 1200, 1600)
    s.add(f'<rect width="1200" height="1600" fill="{s.lin([(0,"#E4DACB"),(1,"#C2B39C")])}"/>')
    for row in range(5):
        for col in range(5):
            x = 40 + col * 230 + (115 if row % 2 else 0) - 60
            y = 60 + row * 310
            d = f"M{x},{y+260} L{x},{y+90} A90,90 0 0,1 {x+180},{y+90} L{x+180},{y+260} Z"
            s.add(f'<path d="{d}" fill="#7A6B57" opacity=".35" transform="translate(9 10)" filter="{s.blur(5)}"/>')
            s.add(f'<path d="{d}" fill="{s.lin([(0,"#EFE7DB"),(1,"#CBBDA8")], x2=1, y2=1)}"/>')
            s.add(f'<path d="M{x+30},{y+250} L{x+30},{y+100} A60,60 0 0,1 {x+150},{y+100} L{x+150},{y+250}" fill="none" stroke="#A39279" stroke-width="5" opacity=".6"/>')
    s.add(f'<rect width="1200" height="1600" fill="{s.lin([(0,"#FFF8EC",.4),(1,"#FFF8EC",0)], x2=1, y2=1)}"/>')
    vignette(s, .32)
    s.save()

def sun_mural():
    s = S("mu-sun", 2000, 1300)
    s.add(f'<rect width="2000" height="1300" fill="{s.lin([(0,"#E3D3BE"),(1,"#C8B193")])}"/>')
    s.add(f'<circle cx="760" cy="640" r="330" fill="{s.rad([(0,"#C47A4E"),(1,"#93502F")], cx=.4, cy=.35)}"/>')
    for i, (r, c) in enumerate([(430, "#A8643E"), (520, "#B98B62"), (610, "#9C6B48"), (700, "#C9A47D")]):
        s.add(f'<path d="M{760-r},640 A{r},{r} 0 0,1 {760+r},640" fill="none" stroke="{c}" stroke-width="{46-i*6}" opacity=".9"/>')
    s.add(f'<rect x="1180" y="160" width="520" height="980" fill="#8A5636" opacity=".85"/>')
    s.add(f'<rect x="1260" y="240" width="360" height="820" fill="#D9C2A3"/>')
    s.add(f'<path d="M1260,1060 L1260,520 A180,180 0 0,1 1620,520 L1620,1060" fill="#B57A52"/>')
    s.add(f'<rect y="1080" width="2000" height="220" fill="#6F4730" opacity=".12"/>')
    s.add(f'<rect width="2000" height="1300" fill="{s.lin([(0,"#FFF4E2",.35),(1,"#FFF4E2",0)], x2=1, y2=1)}"/>')
    vignette(s, .3)
    s.save()

def loop():
    s = S("fr-loop", 2000, 1300)
    s.add(f'<rect width="2000" height="900" fill="{s.lin([(0,"#D9D4CB"),(1,"#EDE6DA")])}"/>')
    s.add(f'<rect y="900" width="2000" height="400" fill="{s.lin([(0,"#BDB09A"),(1,"#8E8069")])}"/>')
    # distant building
    s.add('<rect x="80" y="430" width="560" height="470" fill="#CFC6B8"/>')
    for i in range(6):
        s.add(f'<rect x="{110+i*88}" y="470" width="44" height="400" fill="#B8AE9F"/>')
    floor_shadow(s, 1150, 1080, 520, 50, .45)
    s.add(f'<ellipse cx="1150" cy="640" rx="380" ry="400" fill="none" stroke="{s.lin([(0,"#F7F2EA"),(.5,"#D5CBBC"),(1,"#7E7262")], x2=1, y2=1)}" stroke-width="110" transform="rotate(-18 1150 640)"/>')
    s.add(f'<ellipse cx="1150" cy="640" rx="380" ry="400" fill="none" stroke="#5E5447" stroke-width="20" opacity=".25" transform="rotate(-18 1158 652)" filter="{s.blur(8)}"/>')
    vignette(s, .3)
    s.save()

def bench():
    s = S("fr-bench", 2000, 1300)
    hy = room(s, .62, wall=("#E7DFD3", "#CABCA7"), floor=("#BFB19B", "#8E7F69"), light=(.4, .2))
    floor_shadow(s, 1000, hy + 380, 760, 60, .45)
    top = s.lin([(0, "#3F3A35"), (1, "#24211E")])
    s.add(f'<path d="M260,{hy+260} C420,{hy+110} 700,{hy+180} 1000,{hy+150} C1300,{hy+120} 1580,{hy+80} 1760,{hy+230} L1760,{hy+350} C1580,{hy+210} 1300,{hy+250} 1000,{hy+280} C700,{hy+310} 420,{hy+240} 260,{hy+380} Z" fill="{top}"/>')
    s.add(f'<path d="M260,{hy+260} C420,{hy+110} 700,{hy+180} 1000,{hy+150} C1300,{hy+120} 1580,{hy+80} 1760,{hy+230}" fill="none" stroke="#8E8478" stroke-width="6" opacity=".7"/>')
    vignette(s, .34)
    s.save()

def jali():
    s = S("gr-jali", 1200, 1600)
    s.add(f'<rect width="1200" height="1600" fill="#3A332B"/>')
    pat = s.id("p")
    s.defs.append(f'<pattern id="{pat}" width="150" height="150" patternUnits="userSpaceOnUse"><rect width="150" height="150" fill="#fff"/><path d="M75,14 L136,75 L75,136 L14,75 Z" fill="#000"/><circle cx="0" cy="0" r="24" fill="#000"/><circle cx="150" cy="0" r="24" fill="#000"/><circle cx="0" cy="150" r="24" fill="#000"/><circle cx="150" cy="150" r="24" fill="#000"/></pattern>')
    s.defs.append(f'<mask id="jm"><rect width="1200" height="1600" fill="url(#{pat})"/></mask>')
    # light seen through the screen
    s.add(f'<rect width="1200" height="1600" fill="{s.rad([(0,"#F6E2BC"),(1,"#B88A55")], cx=.3, cy=.25, r=.9)}"/>')
    # screen depth/shadow then face
    s.add(f'<g mask="url(#jm)" transform="translate(14 16)"><rect width="1200" height="1600" fill="#5A4E40"/></g>')
    s.add(f'<g mask="url(#jm)"><rect width="1200" height="1600" fill="{s.lin([(0,"#E8DFD0"),(1,"#B5A68F")], x2=1, y2=1)}"/></g>')
    vignette(s, .4)
    s.save()

def fins():
    s = S("gr-fins", 2000, 1300)
    s.add(f'<rect width="2000" height="1300" fill="{s.lin([(0,"#DAD3C8"),(1,"#EDE7DD")])}"/>')
    s.add('<rect x="0" y="180" width="2000" height="1120" fill="#C9BEAD"/>')
    for i in range(22):
        x = -40 + i * 96
        s.add(f'<polygon points="{x+30},180 {x+120},180 {x+170},1300 {x+80},1300" fill="#7C705F" opacity=".35" filter="{s.blur(10)}"/>')
        s.add(f'<rect x="{x}" y="180" width="34" height="1120" fill="{s.lin([(0,"#F1EBE1"),(1,"#B4A792")], x2=1, y2=0)}"/>')
    s.add('<rect x="0" y="170" width="2000" height="22" fill="#B3A690"/>')
    vignette(s, .3)
    s.save()

def colonnade():
    s = S("gr-colonnade", 2000, 1300)
    s.add(f'<rect width="2000" height="1300" fill="{s.lin([(0,"#E2D8C9"),(1,"#C9BBA5")])}"/>')
    s.add(f'<rect y="1000" width="2000" height="300" fill="{s.lin([(0,"#B9AA92"),(1,"#857660")])}"/>')
    for i in range(5):
        x = 60 + i * 400
        # opening shows bright courtyard
        s.add(f'<path d="M{x+60},1000 L{x+60},460 A140,140 0 0,1 {x+340},460 L{x+340},1000 Z" fill="{s.lin([(0,"#FBF1DE"),(1,"#E2C9A0")])}"/>')
        s.add(f'<path d="M{x+60},1000 L{x+60},460 A140,140 0 0,1 {x+340},460" fill="none" stroke="#8C7C66" stroke-width="18" opacity=".35" filter="{s.blur(6)}"/>')
        # light falling through arches onto floor
        s.add(f'<polygon points="{x+60},1000 {x+340},1000 {x+420},1300 {x+150},1300" fill="#FFF3DC" opacity=".35"/>')
    vignette(s, .38)
    s.save()

def workshop():
    s = S("st-workshop", 1200, 1600)
    hy = room(s, .74, wall=("#D9CEBD", "#B8A992"), floor=("#A89A84", "#7A6D5A"), light=(.2, .3), warmth=.25)
    s.add(f'<rect x="90" y="160" width="300" height="700" fill="{s.lin([(0,"#FFF8EA"),(1,"#F0DDBA")])}"/>')
    s.add('<rect x="234" y="160" width="12" height="700" fill="#A79881"/><rect x="90" y="500" width="300" height="12" fill="#A79881"/>')
    s.add(f'<polygon points="90,860 390,860 1100,{hy+380} 600,{hy+400}" fill="#FFF3DC" opacity=".35" filter="{s.blur(14)}"/>')
    s.add(f'<polygon points="390,160 390,860 980,1100 980,600" fill="#FFF3DC" opacity=".18" filter="{s.blur(30)}"/>')
    # turntable stand
    s.add(f'<rect x="690" y="{hy-160}" width="24" height="200" fill="#4C4136"/>')
    s.add(f'<ellipse cx="702" cy="{hy-160}" rx="150" ry="22" fill="#5B4E41"/>')
    floor_shadow(s, 702, hy + 42, 150, 18, .5)
    # form under work: stacked rounded volumes with sculpting marks
    s.add(f'<path d="M600,{hy-170} C580,{hy-380} 640,{hy-460} 700,{hy-560} C770,{hy-460} 820,{hy-380} 800,{hy-170} Z" fill="{s.lin([(0,"#EDE5D8"),(.5,"#CFC3B0"),(1,"#8C7E69")], x2=1, y2=0)}"/>')
    for i in range(7):
        y = hy - 220 - i * 46
        s.add(f'<path d="M{620+i*6},{y} q80,-18 {150-i*12},0" stroke="#8F816C" stroke-width="3" fill="none" opacity=".5"/>')
    vignette(s, .45)
    s.save()

def texture():
    s = S("st-texture", 1400, 1400)
    s.add(f'<rect width="1400" height="1400" fill="#CDBFA9"/>')
    for i in range(24):
        x = i * 60
        s.add(f'<rect x="{x}" width="60" height="1400" fill="{s.lin([(0,"#F2EADF"),(.5,"#CDBFA9"),(1,"#7C6E5B")], x2=1, y2=0)}"/>')
    s.add(f'<rect width="1400" height="1400" fill="{s.lin([(0,"#FFF6E6",.45),(1,"#2B241D",.35)])}"/>')
    rnd = random.Random(9)
    for _ in range(260):
        x, y = rnd.uniform(0, 1400), rnd.uniform(0, 1400)
        s.add(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{rnd.uniform(1,3.5):.1f}" fill="#5D5244" opacity="{rnd.uniform(.2,.5):.2f}"/>')
    s.save()

def moulds():
    s = S("st-moulds", 2000, 1300)
    s.add(f'<rect width="2000" height="1300" fill="{s.lin([(0,"#CFC3B1"),(1,"#AE9F88")])}"/>')
    for sy in (420, 860):
        s.add(f'<rect x="0" y="{sy}" width="2000" height="26" fill="#6E5F4C"/>')
        s.add(f'<rect x="0" y="{sy+26}" width="2000" height="30" fill="#3E342A" opacity=".25" filter="{s.blur(8)}"/>')
    rnd = random.Random(2)
    x = 80
    while x < 1900:
        kind = rnd.choice(["half", "box", "cone"])
        for sy in (420, 860):
            w = rnd.randint(110, 220)
            c = rnd.choice(["#EFE7DA", "#E2D7C6", "#D5C8B3"])
            g = s.lin([(0, c), (1, "#8D7E68")], x2=1, y2=0)
            if kind == "half":
                s.add(f'<path d="M{x},{sy} A{w/2},{w/2} 0 0,1 {x+w},{sy} Z" fill="{g}"/>')
                s.add(f'<path d="M{x+18},{sy} A{w/2-18},{w/2-18} 0 0,1 {x+w-18},{sy}" fill="#7B6C58" opacity=".5"/>')
            elif kind == "box":
                hh = rnd.randint(120, 220)
                s.add(f'<rect x="{x}" y="{sy-hh}" width="{w}" height="{hh}" fill="{g}"/>')
                s.add(f'<rect x="{x+20}" y="{sy-hh+20}" width="{w-40}" height="{hh-40}" fill="#8A7B66" opacity=".35"/>')
            else:
                hh = rnd.randint(160, 260)
                s.add(f'<polygon points="{x},{sy} {x+w},{sy} {x+w*.68},{sy-hh} {x+w*.32},{sy-hh}" fill="{g}"/>')
        x += rnd.randint(250, 330)
    vignette(s, .4)
    s.save()

def sketch():
    s = S("st-sketch", 2000, 1300)
    s.add('<rect width="2000" height="1300" fill="#EFE9DE"/>')
    for i in range(0, 2000, 50):
        s.add(f'<line x1="{i}" y1="0" x2="{i}" y2="1300" stroke="#C9BCA6" stroke-width="{2 if i%250==0 else 1}" opacity=".6"/>')
    for i in range(0, 1300, 50):
        s.add(f'<line x1="0" y1="{i}" x2="2000" y2="{i}" stroke="#C9BCA6" stroke-width="{2 if i%250==0 else 1}" opacity=".6"/>')
    ink = "#3A332C"
    s.add(f'<path d="M500,1050 L500,560 Q500,360 720,360 Q940,360 940,560 L940,1050" fill="none" stroke="{ink}" stroke-width="4"/>')
    s.add(f'<circle cx="720" cy="660" r="120" fill="none" stroke="{ink}" stroke-width="3"/>')
    s.add(f'<line x1="380" y1="1050" x2="1100" y2="1050" stroke="{ink}" stroke-width="5"/>')
    s.add(f'<line x1="500" y1="1110" x2="940" y2="1110" stroke="#8A5A32" stroke-width="2"/><line x1="500" y1="1095" x2="500" y2="1125" stroke="#8A5A32" stroke-width="2"/><line x1="940" y1="1095" x2="940" y2="1125" stroke="#8A5A32" stroke-width="2"/>')
    # elevation on right
    s.add(f'<rect x="1300" y="500" width="380" height="550" fill="none" stroke="{ink}" stroke-width="3"/>')
    for i in range(1, 8):
        s.add(f'<line x1="{1300+i*47.5}" y1="500" x2="{1300+i*47.5}" y2="1050" stroke="{ink}" stroke-width="1.5" opacity=".6"/>')
    s.add(f'<path d="M1300,500 L1490,330 L1680,500" fill="none" stroke="{ink}" stroke-width="2" stroke-dasharray="10 8"/>')
    s.add(f'<circle cx="1490" cy="760" r="60" fill="#8A5A32" opacity=".18"/>')
    s.save()

for fn in [hero, monolith, orbit, ribbon, cairn, fluted_planter, bowl_planter, trio, ripple, arches_relief, sun_mural, loop, bench, jali, fins, colonnade, workshop, texture, moulds, sketch]:
    fn()
print(sorted(os.listdir(OUT)))
