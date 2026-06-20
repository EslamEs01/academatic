#!/usr/bin/env python3
"""Build contact sheets (montages) so the full screenshot set can be visually reviewed group-by-group.
   - full-page sheets grouped by role+module (top-cropped thumbnails, labeled by slug)
   - modal/dialog interaction sheets (real modal layouts captured during the crawl)
   No ImageMagick needed (uses Pillow). Emits PNGs + an index JSON/MD.
"""
import os, json, collections, math
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT,"output"); DEEP=os.path.join(ROOT,"frontend-planning-deep")
CS = os.path.join(DEEP,"contact-sheets"); os.makedirs(CS, exist_ok=True)
pages = json.load(open(os.path.join(DEEP,"02-all-pages-expanded-inventory.json")))

THUMB_W=360; CROP_H=820; COLS=4; ROWS=5; LABEL_H=26; PAD=6; BG=(245,246,248); LBL_BG=(30,33,40); LBL_FG=(255,255,255)
PER=COLS*ROWS
try:
    FONT=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",13)
except Exception:
    FONT=ImageFont.load_default()

def make_thumb(path, label, http):
    cell_w=THUMB_W; cell_h=CROP_H//2  # display height (half of crop for compactness)
    cell=Image.new("RGB",(cell_w,cell_h+LABEL_H),(255,255,255))
    try:
        im=Image.open(path).convert("RGB")
        w,h=im.size
        nw=THUMB_W; nh=int(h*nw/w)
        im=im.resize((nw,nh))
        crop=im.crop((0,0,nw,min(nh,CROP_H)))
        crop=crop.resize((cell_w,cell_h))
        cell.paste(crop,(0,LABEL_H))
    except Exception as e:
        d=ImageDraw.Draw(cell); d.text((6,LABEL_H+10),"(missing)",fill=(200,60,60),font=FONT)
    d=ImageDraw.Draw(cell)
    lblbg = (150,40,40) if http and http!=200 else LBL_BG
    d.rectangle([0,0,cell_w,LABEL_H],fill=lblbg)
    txt=label if len(label)<=46 else label[:44]+"…"
    if http and http!=200: txt=f"[{http}] "+txt
    d.text((4,5),txt,fill=LBL_FG,font=FONT)
    return cell

def build_sheet(items, title, outname):
    n=len(items); cell_w=THUMB_W; cell_h=CROP_H//2+LABEL_H
    HEAD=30
    sheet_w=COLS*cell_w+(COLS+1)*PAD
    rows=math.ceil(n/COLS)
    sheet_h=HEAD+rows*cell_h+(rows+1)*PAD
    sheet=Image.new("RGB",(sheet_w,sheet_h),BG)
    d=ImageDraw.Draw(sheet); d.rectangle([0,0,sheet_w,HEAD],fill=(20,22,28)); d.text((8,8),title,fill=(255,255,255),font=FONT)
    for i,(path,label,http) in enumerate(items):
        r,c=divmod(i,COLS)
        x=PAD+c*(cell_w+PAD); y=HEAD+PAD+r*(cell_h+PAD)
        sheet.paste(make_thumb(path,label,http),(x,y))
    sheet.save(os.path.join(CS,outname))
    return outname

index={"full":[],"modals":[]}
# ---- full-page sheets by role+module
groups=collections.defaultdict(list)
for p in pages:
    mod=p["modules"][0] if p["modules"] else "General"
    groups[(p["role"],mod)].append(p)
order={"admin":0,"teacher":1,"family":2}
for (role,mod),plist in sorted(groups.items(), key=lambda kv:(order[kv[0][0]],kv[0][1])):
    plist=sorted(plist,key=lambda x:x["slug"])
    nch=math.ceil(len(plist)/PER)
    for c in range(nch):
        chunk=plist[c*PER:(c+1)*PER]
        items=[(os.path.join(OUT,"roles",role,"screenshots",p["slug"]+"-full.png"),p["slug"],p["httpStatus"]) for p in chunk]
        safe_mod=mod.replace(" / ","-").replace(" ","_").replace("/","-")
        name=f"full__{role}__{safe_mod}"+(f"__{c+1}" if nch>1 else "")+".png"
        build_sheet(items,f"{role} · {mod}"+(f" [{c+1}/{nch}]" if nch>1 else ""),name)
        index["full"].append({"file":name,"role":role,"module":mod,"slugs":[p["slug"] for p in chunk]})

# ---- modal / dialog interaction sheets (read raw page jsons for interaction screenshots)
modal_shots=[]
for role in ["admin","teacher","family"]:
    pdir=os.path.join(OUT,"roles",role,"pages")
    for fn in sorted(os.listdir(pdir)):
        if not fn.endswith(".json"): continue
        try: j=json.load(open(os.path.join(pdir,fn)))
        except: continue
        for it in (j.get("interactions") or []):
            if it.get("type")=="modal_or_dialog" and it.get("screenshot"):
                sp=os.path.join(OUT,"roles",role,it["screenshot"]) if not it["screenshot"].startswith("output") else os.path.join(ROOT,it["screenshot"])
                # screenshot path in json is like "screenshots/<file>.png"
                sp=os.path.join(OUT,"roles",role,it["screenshot"])
                label=(it.get("triggerText") or j.get("displayName") or fn[:-5])[:40]
                modal_shots.append((sp,f"{role}:{label}",200))
# also include a sample of dropdown interactions for variety (cap)
nch=math.ceil(len(modal_shots)/PER)
for c in range(nch):
    chunk=modal_shots[c*PER:(c+1)*PER]
    name=f"modals__{c+1}.png"
    build_sheet(chunk,f"Modal/dialog captures [{c+1}/{nch}]",name)
    index["modals"].append({"file":name,"count":len(chunk)})

json.dump(index, open(os.path.join(CS,"_index.json"),"w"), indent=1)
print("full sheets:", len(index["full"]), "modal sheets:", len(index["modals"]), "modal shots:", len(modal_shots))
for s in index["full"]: print("  ", s["file"], len(s["slugs"]))
for s in index["modals"]: print("  ", s["file"], s["count"])
