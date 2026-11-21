import*as a from'node:fs';
const e=process.env,I=e.MAKEFUN_INPUT_DIR||'/input',O=e.MAKEFUN_OUTPUT_DIR||'/output';
let W,G,P,B,J;const C='urdl';
const F=(s,X,k)=>{let V=new Map([[s,'']]),q=[s];for(let p of q){for(let i=0;i<4;i++){let n=p+J[i];if(k(n)&&!X.has(n)&&!V.has(n)){V.set(n,V.get(p)+C[i]);q.push(n)}}}return V};
const S=(R,b,g,E,x)=>{
let q=[[b,E,'',0]],v=new Set([b+':'+E]),m=1/0;
for(let[c,p,o,d]of q){
if(d>m||q.length>1e6)return null;
let X=new Set(c),V=F(p,X,n=>n==E||R.has(n));
if(c.every(z=>g.has(z))){if(d<m)m=d;if(!x||V.has(E))return[o,p];continue}
for(let i=0;i<c.length;i++)for(let k=0;k<4;k++){
let t=c[i]+J[k];
if(!R.has(t)||X.has(t)||(!g.has(t)&&(G[t-W]=='#'||G[t+W]=='#')&&(G[t-1]=='#'||G[t+1]=='#')))continue;
let s=c[i]-J[k];if(!V.has(s))continue;
let n=c.slice();n[i]=t;n.sort();let y=n+':'+c[i];
if(v.has(y))continue;v.add(y);q.push([n,c[i],o+V.get(s)+C[k],d+1])}}
return null};
const L=T=>{
let s=T.split('\n');
W=s[0].length+2;
G='#'.repeat(W)+s.map(z=>('#'+z.padEnd(W-2,'#')+'#')).join('')+'#'.repeat(W);
J=[-W,1,W,-1];B=new Set();let g=new Set();
for(let p=0;p<G.length;p++){let c=G[p];if('$*'.includes(c))B.add(p);if('.*+'.includes(c))g.add(p);if('@+'.includes(c))P=p}
let bx=[...B];
for(let v=0;v<2;v++){
let d=v?W:1,H=new Set(),a=P;while(G[a-d]!='#')a-=d;let f=P;while(G[f+d]!='#')f+=d;for(let p=a;p<=f;p+=d)H.add(p);
let R=[],ok=1;
for(let b of bx){
if(R.some(y=>y.R.has(b)))continue;
let V=F(b,new Set(),n=>G[n]!='#'&&!H.has(n)),bb=bx.filter(z=>V.has(z)),gg=[...g].filter(z=>V.has(z));
if(bb.length>4||bb.length!=gg.length){ok=0;break}
let E=-1;
for(let c of V.keys()){for(let k=0;k<4;k++)if(H.has(c+J[k])){E=c+J[k];break}if(E>=0)break}
if(E<0){ok=0;break}
R.push({R:V,b:bb,g:new Set(gg),E})}
if(!ok||bx.some(b=>!R.some(y=>y.R.has(b))))continue;
let out='',D=[];
const T=(r,x)=>{let p=F(P,B,n=>G[n]!='#').get(r.E);if(p==null)return -1;out+=p;P=r.E;let z=S(r.R,r.b,r.g,r.E,x);if(z==null)return 0;out+=z[0];P=z[1];r.b.forEach(y=>B.delete(y));r.g.forEach(y=>B.add(y));return 1};
for(let r of R){let t=T(r,1);if(t<0)return '';if(!t)D.push(r)}
for(let r of D){if(T(r,0)<1)return ''}
return out}
return ''};
for(const d of a.readdirSync(I).sort()){let o=L(a.readFileSync(I+'/'+d+'/level.txt','utf8'));a.mkdirSync(O+'/'+d,{recursive:true});a.writeFileSync(O+'/'+d+'/solution.txt',o)}
