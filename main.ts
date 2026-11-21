import fs from'node:fs'
let W,D,Z=(a,b)=>a-b
let F=(a,X)=>{let q=[a],v=new Set([a]);for(let c of q)for(let d of D)X[c+d]&&!v.has(c+d)&&(v.add(c+d),q.push(c+d));return v}
const E=process.env,I=E.MAKEFUN_INPUT_DIR??'/input',O=E.MAKEFUN_OUTPUT_DIR??'/output'
for(let i of fs.readdirSync(I)){
let L=fs.readFileSync(I+'/'+i+'/level.txt','utf8').split('\n');W=L[0].length;let G=L.join('');D=[1,-1,W,-W]
let B=[],g=new Set,P=0,H=[];
[...G].forEach((c,n)=>{H[n]=c!='#';if(c=='$'||c=='*')B.push(n);if(c=='.'||c=='*')g.add(n);if(c=='@'||c=='+')P=n})
B.sort(Z)
let Y=(P/W)|0,R=H.map((v,n)=>v&&((n/W|0)^Y)),o='',p=P,u
while(u=B.find(b=>!g.has(b))){
let m=F(u,R)
let Q=B.filter(x=>m.has(x)),c=[[Q,p,'']],S=new Set([Q+':'+p]),r=0
while(c.length&&!r){let n=[]
for(let[U,v,t]of c){
if(!m.has(v)&&U.every(b=>g.has(b))){r=[t,v,U];break}
for(let j=4;j--;){let y=v+D[j]
if(!m.has(y)&&((y/W|0)!=Y||!H[y]))continue
let k=U.indexOf(y),V=U,w2=c
if(k>=0){let z=y+D[j];if(!m.has(z)||U.includes(z))continue;V=U.slice();V[k]=z;V.sort(Z);if(!g.has(z)&&!(H[z+W]*H[z-W])&&!(H[z+1]*H[z-1]))continue;w2=n}
let K2=V+':'+y;!S.has(K2)&&(S.add(K2),w2.push([V,y,t+'rldu'[j]]))}}
c=n}
if(!r){o='';break}
o+=r[0];p=r[1];B=B.filter(x=>!m.has(x)).concat(r[2])}
fs.mkdirSync(O+'/'+i,{recursive:true});fs.writeFileSync(O+'/'+i+'/solution.txt',o+'\n')}
