import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output',C='udlr';
let W=0,H=0,B=1e6,Z;
const U=()=>new Uint8Array(W*H),N=()=>new Int32Array(W*H).fill(-1);
function P(s){const R=s.split('\n');W=Math.max(...R.map(r=>r.length));H=R.length;Z=[-W,W,-1,1];
const w=U().fill(1),g=U(),b=[],G=[];let p=-1;
R.forEach((r,y)=>{for(let x=0;x<r.length;x++){const c=r[x],i=y*W+x;if(c=='#')continue;w[i]=0;
if('.*+'.includes(c)){g[i]=1;G.push(i)}if('$*'.includes(c))b.push(i);if('@+'.includes(c))p=i}});
return{w,g,b,G,p}}
function A(w,o,a,z){if(a==z)return'';const q=[a],v=N();v[a]=a;
for(let k=0;k<q.length;k++){const c=q[k];
for(let e=0;e<4;e++){const n=c+Z[e];
if(w[n]||o[n]||v[n]>=0)continue;v[n]=c;
if(n==z){let s='',t=n;while(t!=a){const p=v[t];s=C[Z.indexOf(t-p)]+s;t=p}return s}q.push(n)}}
return z<0?v:null}
function F(m,G,b0,p0,g,wW){
const d=N(),q=[...G];
for(let k=0;k<q.length;k++){const c=q[k];if(k<G.length)d[c]=0;
for(let e=0;e<4;e++){const n=c+Z[e];
if(!m[n]||d[n]>=0)continue;d[n]=d[c]+1;q.push(n)}}
const J=bs=>bs.reduce((s,z)=>s+(d[z]<0?999:d[z]),0);
const K=n=>n.b+'|'+n.p,V=new Map(),Q=[];let M=0,N2=1;
const st={b:[...b0],p:p0,g:0,r:null,v:null},h0=J(st.b);
if(!h0)return[];if(h0>900)return null;
V.set(K(st),0);(Q[h0]=Q[h0]||[]).push(st);
while(N2--){while(!Q[M]?.length)M++;const n=Q[M].pop();
if(n.g>V.get(K(n)))continue;
if(--B<0)return null;
const o=U();n.b.forEach(z=>o[z]=1);
const s=A(wW,o,n.p,-1);
for(let j=0;j<n.b.length;j++){const b=n.b[j];
for(let e=0;e<4;e++){const t=b+Z[e];
if(!m[t]||o[t])continue;
if(s[b-Z[e]]<0)continue;
if(!g[t]&&(wW[t-W]||wW[t+W])&&(wW[t-1]||wW[t+1]))continue;
const nb=[...n.b];nb[j]=t;nb.sort((x,y)=>x-y);
const h1=J(nb);if(h1>900)continue;
const nn={b:nb,p:b,g:n.g+1,r:n,v:[b,e]},k=K(nn);
if(V.has(k)&&V.get(k)<=nn.g)continue;
V.set(k,nn.g);
if(!h1){const out=[];let c=nn;while(c.v){out.push(c.v);c=c.r}return out.reverse()}
const f=nn.g+h1;(Q[f]=Q[f]||[]).push(nn);N2++}}}
return null}
function E(w,b0,p0,ps){
const o=U(),b=[...b0];b.forEach(z=>o[z]=1);
let v='',p=p0;
for(const[box,e]of ps){const q=A(w,o,p,box-Z[e]);if(q==null)return null;
v+=q+C[e];o[box]=0;const t=box+Z[e];o[t]=1;b[b.indexOf(box)]=t;p=box}
return{v,p,b,w}}
function L(t){
const{w,g,b,G,p}=P(t),hr=(p/W)|0;let R=[],a=U();
for(let x=0;x<W;x++){const c=hr*W+x;if(w[c])continue;
for(const dy of[-1,1]){const n=c+dy*W;if(w[n]||a[n])continue;
const m=U(),q=[n];m[n]=1;a[n]=1;
for(let k=0;k<q.length;k++){const cc=q[k];
for(let e=0;e<4;e++){const z=cc+Z[e];
if(w[z]||m[z]||(z/W|0)==hr)continue;m[z]=1;a[z]=1;q.push(z)}}
R.push({m,h:c,b:b.filter(z=>m[z]),G:G.filter(z=>m[z])})}}
let ok=R.length>0&&b.every(z=>a[z])&&R.every(r=>r.b.length==r.G.length);
if(!ok){const m=Uint8Array.from(w,x=>!x);R=[{m,h:-1,b,G}]}
R.sort((u,v)=>u.h-v.h);
let v='',cur=p;const all=[...b];
const O=()=>{const o=U();all.forEach(z=>o[z]=1);return o};
for(const r of R){
const wW=Uint8Array.from(r.m,(v,i)=>!v&&i!=r.h);
if(r.h>=0){const l=A(w,O(),cur,r.h);if(l==null)return'';v+=l;cur=r.h}
const ps=F(r.m,r.G,r.b,r.h<0?p:r.h,g,wW);if(!ps)return'';
const e=E(wW,r.b,r.h<0?p:r.h,ps);if(!e)return'';v+=e.v;
for(let i=0;i<r.b.length;i++)all[all.indexOf(r.b[i])]=e.b[i];
if(r.h>=0){const ex=A(e.w,O(),e.p,r.h);if(ex==null)return'';v+=ex;cur=r.h}}
return v}
for(const id of readdirSync(I).sort()){const v=L(readFileSync(I+'/'+id+'/level.txt','utf8'));mkdirSync(O+'/'+id,{recursive:true});writeFileSync(O+'/'+id+'/solution.txt',v+'\n')}
