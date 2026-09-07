from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.lib.units import mm
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / '06-assets' / 'bao-rescue' / 'v3' / 'source'
OUT = ROOT / '06-assets' / 'bao-rescue' / 'v3' / 'bao-rescue-photo-guide-v3.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)

I = {
    'normal': SRC/'normal.jpg',
    'wrinkled': SRC/'wrinkled.jpg',
    'collapsed': SRC/'collapsed.jpg',
    'dense': SRC/'dense.jpg',
    'condensation': SRC/'condensation.jpg',
    'underproofed': SRC/'underproofed.jpg',
    'cracked': SRC/'cracked.jpg',
}
for p in I.values():
    if not p.exists(): raise FileNotFoundError(p)

W,H=A4; M=16*mm
BG=HexColor('#FAF6F1'); INK=HexColor('#201A16'); MUT=HexColor('#6E6259')
ACC=HexColor('#C46A3A'); ACC2=HexColor('#D99058'); LINE=HexColor('#E6DED7')
GOOD=HexColor('#4A7C59'); WARN=HexColor('#A3652A'); CARD=white

def wrap(c,s,x,y,w,size=10,font='Helvetica',color=INK,lead=13):
    words=s.split(); lines=[]; cur=''
    for word in words:
        t=(cur+' '+word).strip()
        if c.stringWidth(t,font,size)<=w: cur=t
        else:
            if cur: lines.append(cur)
            cur=word
    if cur: lines.append(cur)
    c.setFont(font,size); c.setFillColor(color); yy=y
    for ln in lines: c.drawString(x,yy,ln); yy-=lead
    return yy

def rr(c,x,y,w,h,r=10,fill=CARD,stroke=LINE):
    c.setFillColor(fill); c.setStrokeColor(stroke); c.setLineWidth(1); c.roundRect(x,y,w,h,r,fill=1,stroke=1)

def fit(path,maxw,maxh):
    im=Image.open(path); iw,ih=im.size; k=min(maxw/iw,maxh/ih); return iw*k,ih*k

def image(c,path,x,y,w,h):
    rr(c,x,y,w,h,12); iw,ih=fit(path,w,h); px=x+(w-iw)/2; py=y+(h-ih)/2
    c.drawImage(str(path),px,py,width=iw,height=ih,preserveAspectRatio=True,mask='auto')

def badge(c,s,x,y,fill=ACC):
    c.setFont('Helvetica-Bold',8); bw=c.stringWidth(s,'Helvetica-Bold',8)+16
    c.setFillColor(fill); c.roundRect(x,y,bw,18,9,fill=1,stroke=0); c.setFillColor(white); c.drawString(x+8,y+5.5,s)

def header(c,title,sub,p):
    c.setFillColor(BG); c.rect(0,0,W,H,fill=1,stroke=0); c.setFillColor(ACC); c.rect(0,H-16,W,16,fill=1,stroke=0)
    c.setFillColor(INK); c.setFont('Helvetica-Bold',24); c.drawString(M,H-28*mm,title)
    wrap(c,sub,M,H-35*mm,W-2*M,11,'Helvetica',MUT,15); c.setStrokeColor(LINE); c.line(M,H-39*mm,W-M,H-39*mm)
    c.setFont('Helvetica-Bold',9); c.setFillColor(MUT); c.drawRightString(W-M,10*mm,f'{p:02d}')

def bullets(c,title,items,x,y,w,h,tag=None,color=ACC):
    rr(c,x,y,w,h,12); top=y+h-18
    if tag: badge(c,tag,x+12,y+h-24,color); top=y+h-42
    c.setFont('Helvetica-Bold',12); c.setFillColor(INK); c.drawString(x+12,top,title); yy=top-20
    for item in items:
        c.setFillColor(ACC); c.circle(x+16,yy+3,2,fill=1,stroke=0)
        nxt=wrap(c,item,x+26,yy+6,w-38,9.5,'Helvetica',INK,12); yy=nxt-7

def footer(c):
    c.setFillColor(MUT); c.setFont('Helvetica',7.4)
    c.drawString(M,7.5*mm,'AI-generated photorealistic reference images for symptom recognition - not documentary photos of real failed batches.')

def symptom(c,p,title,key,look,checks,actions,label):
    header(c,title,'Use the photo first. Then check the highest-probability causes before changing multiple variables.',p)
    ix=M; iy=102*mm; iw=116*mm; ih=116*mm; image(c,I[key],ix,iy,iw,ih); badge(c,label,ix+12,iy+ih-24,ACC2)
    cx=ix+iw+7*mm; cw=W-M-cx; image(c,I['normal'],cx,iy+63*mm,cw,53*mm)
    c.setFillColor(GOOD); c.setFont('Helvetica-Bold',8); c.drawString(cx+3,iy+58*mm,'NORMAL REFERENCE')
    rr(c,cx,iy+10*mm,cw,43*mm,12); c.setFillColor(INK); c.setFont('Helvetica-Bold',11); c.drawString(cx+10,iy+43*mm,'What it looks like')
    wrap(c,look,cx+10,iy+34*mm,cw-20,9.2,'Helvetica',MUT,11.5)
    gap=6*mm; bw=(W-2*M-gap)/2
    bullets(c,'Check first',checks,M,21*mm,bw,69*mm,'PRIORITY',WARN)
    bullets(c,'Next batch: change one thing',actions,M+bw+gap,21*mm,bw,69*mm,'ACTION',GOOD); footer(c)

c=canvas.Canvas(str(OUT),pagesize=A4)
header(c,'Bao Rescue','A photo-first troubleshooting guide for steamed buns: compare the symptom, check likely causes, then change one variable.',1)
image(c,I['normal'],M,91*mm,120*mm,109*mm); x=145*mm; badge(c,'PHOTO-FIRST GUIDE',x,235*mm)
c.setFont('Helvetica-Bold',18); c.setFillColor(INK); c.drawString(x,224*mm,'Fast visual diagnosis')
wrap(c,'Not another long recipe PDF. Find the photo that looks closest to your batch and move straight to the most useful checks.',x,215*mm,46*mm,10.5,'Helvetica',MUT,14)
bullets(c,'Inside',[ '6 symptom pages with realistic reference photos','Normal-vs-failure comparison','Short diagnosis notes','30-second flow + next-batch worksheet'],x,136*mm,48*mm,58*mm)
bullets(c,'How to use',[ 'Match the visual symptom','Check the top cause first','Change only one major variable'],x,72*mm,48*mm,52*mm,'RULE',GOOD); footer(c); c.showPage()

header(c,'Quick Symptom Atlas','Start here. Find the closest visual match before reading the detailed page.',2)
cards=[('wrinkled','Wrinkled / elephant skin','Shrunk, puckered surface.'),('collapsed','Collapsed','Flattened or sunken shape.'),('dense','Dense / not fluffy','Tight, heavy interior crumb.'),('condensation','Wet / pitted','Drops, dimples, soggy spots.'),('underproofed','Barely rose','Small, tight, limited expansion.'),('cracked','Cracked / split','Top tears during steaming.')]
cw=(W-2*M-8*mm)/2; ch=74*mm; sy=174*mm
for i,(k,t,s) in enumerate(cards):
    r,co=divmod(i,2); xx=M+co*(cw+8*mm); yy=sy-r*(ch+8*mm); rr(c,xx,yy,cw,ch,12); image(c,I[k],xx+6,yy+20*mm,cw-12,47*mm)
    c.setFont('Helvetica-Bold',10.5); c.setFillColor(INK); c.drawString(xx+10,yy+13*mm,t); wrap(c,s,xx+10,yy+8*mm,cw-20,8.2,'Helvetica',MUT,10)
footer(c); c.showPage()

symptom(c,3,'Wrinkled / Elephant Skin','wrinkled','The skin looks puckered, crepey or slightly shrunken rather than smooth and full.',[
'Check proofing state first; weak structure can wrinkle after steaming.','Also check the post-steam lid transition; rapid cooling can worsen shrinkage.','If the shaped skin dried during proofing, roughness can become more obvious.'],[
'Keep the formula unchanged and adjust only proofing readiness or time.','If proofing looked right, test a gentler lid-opening transition.','Keep shaped buns covered so the outer skin stays supple.'],'WRINKLED'); c.showPage()

symptom(c,4,'Collapsed / Overproofed','collapsed','The buns flatten, sink, or lose volume. They may look puffy before steaming but cannot hold structure.',[
'Overproofing is a strong first candidate.','Check whether later batches waited much longer before steaming.','A sudden post-steam temperature change can amplify collapse in a weak bun.'],[
'Shorten final proof or keep later batches cooler while waiting.','Steam one small test batch earlier and compare.','If shape improves, keep the shorter proof as the next baseline.'],'COLLAPSED'); c.showPage()

symptom(c,5,'Dense / Not Fluffy','dense','The outside can look acceptable while the inside stays compact, tight, moist or heavy instead of airy.',[
'First ask whether the dough actually rose before steaming.','If it rose, check final proof, flour choice, hydration and dough structure.','Do not assume dense always means dead yeast.'],[
'Record the exact flour and hydration used.','Choose one test: slightly longer proof, yeast verification, or hydration correction.','Compare crumb after that single change.'],'DENSE'); c.showPage()

symptom(c,6,'Wet / Pitted Surface','condensation','The surface has shiny wet spots, droplets, dimples or soggy patches instead of an even steamed finish.',[
'Check for lid condensation dripping directly onto buns.','Metal steamer setups can concentrate droplets differently from bamboo.','Visible droplets make condensation a high-priority branch.'],[
'Control direct drips first and keep other variables the same.','Use a lid/cloth setup that moves condensation away from the buns.','If the surface becomes cleaner, you isolated a major cause.'],'CONDENSATION'); c.showPage()

symptom(c,7,'Barely Rose / Underproofed','underproofed','The buns remain smaller, tighter and more compact. The dough never becomes light and puffy enough before steaming.',[
'Check yeast freshness and the method appropriate to that yeast type.','Check room and ingredient temperature; cool dough moves more slowly.','Judge dough state, not the clock alone.'],[
'Give the dough a warmer, stable proof environment if needed.','Let one sample proof a little longer and compare volume and lightness.','Use visual and touch cues to decide when to steam.'],'UNDERPROOFED'); c.showPage()

symptom(c,8,'Cracked / Split Top','cracked','The outer skin tears instead of stretching smoothly as the bun expands under steam.',[
'Underproofing is a common branch: expansion continues aggressively during steaming.','A dry or overly tight surface can crack more easily.','Shaping tension and uneven structure can also contribute.'],[
'Proof a little further and compare whether the skin stretches more smoothly.','Keep shaped buns covered during proofing.','Keep shaping consistent and avoid excessive outer tension.'],'CRACKED'); c.showPage()

header(c,'30-Second Diagnosis Flow','Use this if you are not sure which symptom page to start with.',9); rr(c,M,41*mm,W-2*M,219*mm,14)
flow=[('1','Visible droplets / soggy pits?','YES -> Wet / Pitted'),('2','Stayed small and tight?','YES -> Underproofed'),('3','Flattened or sank?','YES -> Collapsed'),('4','Wrinkled / crepey skin?','YES -> Wrinkled'),('5','Heavy tight interior?','YES -> Dense'),('6','Top split open?','YES -> Cracked')]
y=237*mm
for n,q,a in flow:
    c.setFillColor(ACC); c.circle(M+17*mm,y,7,fill=1,stroke=0); c.setFillColor(white); c.setFont('Helvetica-Bold',9); c.drawCentredString(M+17*mm,y-3,n)
    c.setFillColor(INK); c.setFont('Helvetica-Bold',12); c.drawString(M+31*mm,y+3,q); c.setFillColor(GOOD); c.setFont('Helvetica-Bold',10); c.drawString(M+31*mm,y-13,a)
    c.setFillColor(MUT); c.setFont('Helvetica',9.5); c.drawString(M+112*mm,y-13,'NO -> continue'); y-=31*mm
footer(c); c.showPage()

header(c,'Next Batch Worksheet','A failed batch becomes useful only when the next test is clear.',10); rr(c,M,26*mm,W-2*M,229*mm,14)
fields=['Recipe / source','Flour used','Yeast type / freshness','Room temperature','First proof observations','Final proof observations','Steamer setup','Visible symptom','Main hypothesis','ONE variable to change next batch']
y=236*mm
for idx,f in enumerate(fields):
    c.setFillColor(INK); c.setFont('Helvetica-Bold',10); c.drawString(M+10*mm,y,f); bh=13*mm if idx<8 else 20*mm
    c.setStrokeColor(LINE); c.roundRect(M+10*mm,y-bh-4,W-2*M-20*mm,bh,4,fill=0,stroke=1); y-=bh+10
footer(c); c.showPage(); c.save(); print(OUT)
