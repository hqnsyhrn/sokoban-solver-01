import{readdirSync as R,readFileSync as F,writeFileSync as w,mkdirSync as M}from"node:fs";
let s,W,N,D=[1,-1],C="rldu",G,B,P,Y,mn,EN,e=process.env,I=e.MAKEFUN_INPUT_DIR||"/input",O=e.MAKEFUN_OUTPUT_DIR||"/output",i,y;
let f=(p,b,r,m)=>{let a=[],q=[p];a[p]=p;mn=p;for(let h=0;h<q.length;h++)for(let k=0;k<4;k++){let j=q[h]+D[k];if(a[j]==null&&!b.includes(j)&&s[j]!="#"){if((j/W|0)==r)EN=j;else if(!m||m[j]>=0){a[j]=q[h];q.push(j);if(j<mn)mn=j}}}return a};
let T=(a,t,p)=>{let m="";for(let i=t;i!=p&&i>=0;i=a[i])m=C[D.indexOf(i-a[i])]+m;return m};
function S(l){
s=l.replace(/\n/g,"#");W=l.indexOf("\n")+1;N=s.length;D[2]=W;D[3]=-W;
G=[];B=[];
for(i=0;i<N;i++){let c=s[i];if(c=="."||c=="*")G.push(i);if(c=="$"||c=="*")B.push(i);if(c=="@")P=i}
Y=(P/W)|0;
let mv="",cB=B,cP=P,todo=B.slice();
while(todo.length){
EN=-1;let rm=f(todo[0],[],Y,null);
if(EN<0)return "";
rm[EN]=EN;
let rb=cB.filter(x=>rm[x]>=0),rg=G.filter(x=>rm[x]>=0),ot=cB.filter(x=>rm[x]==null);
let wp=f(cP,cB,-1,null);mv+=T(wp,EN,cP);cP=EN;
let Q=[[rb,EN,""]],K={},done=null;
f(EN,rb,-1,rm);K[rb+"."+mn]=1;
for(let st of Q){
let b=st[0],p=st[1],pa=f(p,b,-1,rm);
if(rg.every(x=>b.includes(x))&&pa[EN]>=0){done=[st[2],p,b];break}
for(let bi=0;bi<b.length;bi++){let bo=b[bi];
for(let k=0;k<4;k++){let t=bo+D[k],bh=bo-D[k];
if(pa[bh]>=0&&t!=EN&&rm[t]>=0&&!b.includes(t)){
let nb=b.slice();nb[bi]=t;nb.sort((x,y)=>x-y);
f(bo,nb,-1,rm);
if(!K[y=nb+"."+mn]){K[y]=1;Q.push([nb,bo,st[2]+T(pa,bh,p)+C[k]])}
}
}
}
}
if(!done)return "";
mv+=done[0];cP=done[1];cB=ot.concat(done[2]);todo=todo.filter(x=>rm[x]==null);
}
return mv;
}
for(let d of R(I)){M(O+"/"+d,{recursive:!0});w(O+"/"+d+"/solution.txt",S(F(I+"/"+d+"/level.txt","utf8"))+"\n")}
