import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env;
const V=L=>{
let W=L.indexOf('\n'),G=L.replaceAll('\n',''),D=[-W,-1,1,W],K='ulrd',B=[],g=new Set(),pl=0;
for(let i=0,c;c=G[i];i++){if(c=='$'||c=='*')B.push(i);if(c=='.'||c=='*')g.add(i);if(c=='@'||c=='+')pl=i}
let hr=pl/W|0;
let F=(s,o)=>{let P={[s]:''},q=[s];for(let c of q)for(let k=0;k<4;k++){let d=D[k],t=c+d;if(!(t in P)&&o(t)){P[t]=P[c]+K[k];q.push(t)}}return P};
let S=R=>{
let o=i=>R.c.has(i)||i==R.e;
let q=[{b:B.filter(x=>R.c.has(x)),p:R.e,s:''}],v=new Set([q[0].b.join()+'|'+R.e]);
for(let n of q){
let P=F(n.p,i=>o(i)&&!n.b.includes(i));
if(n.b.every(x=>g.has(x))&&(g.has(R.d)||R.d in P))return n;
for(let x of n.b)for(let k=0;k<4;k++){let d=D[k],t=x+d,f=x-d;
if(!o(t)||n.b.includes(t)||!(f in P))continue;
let m=n.b.map(y=>y==x?t:y).sort((a,b)=>a-b),e=m.join()+'|'+x;
if(!v.has(e)&&!m.some(y=>!g.has(y)&&((!o(y-W)||!o(y+W))&&(!o(y-1)||!o(y+1))))){v.add(e);q.push({b:m,p:x,s:n.s+P[f]+K[k]})}}}
return null};
let M=[];
for(let r of[hr-1,hr+1])for(let c=W;c--;){let i=r*W+c;
if(G[i]=='#')continue;
let P=F(i,j=>G[j]!='#'&&(j/W|0)!=hr),C=new Set();
for(let j in P)C.add(+j);
M.push({c:C,d:i,e:i-(r-hr)*W})}
let Y=M.map(S);
if(Y.some(s=>!s))return'';
let t=i=>Y[i].b.includes(M[i].d),O2=[...Y.keys()].sort((a,b)=>t(a)-t(b)),cur=pl,out='';
for(let n=0;n<O2.length;n++){let i=O2[n],m=M[i],s=Y[i],P=F(cur,j=>G[j]!='#');
out+=(P[m.e]||'')+s.s;cur=s.p;
if(n+1<O2.length&&s.s){let Q=F(cur,j=>G[j]!='#'&&!s.b.includes(j));
out+=(Q[m.d]||'')+(m.d<m.e?'d':'u');cur=m.e}}
return out};
for(let id of readdirSync(I)){mkdirSync(O+'/'+id);writeFileSync(O+'/'+id+'/solution.txt',V(readFileSync(I+'/'+id+'/level.txt','utf8'))+'\n')}
