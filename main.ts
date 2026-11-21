import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
let E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output';
for(let d of readdirSync(I).sort()){
let t=readFileSync(I+'/'+d+'/level.txt','utf8'),W=t.indexOf('\n'),S=t.replace(/\n/g,''),A=[],B=[],G=[],Y=0;
for(let i=0,x;i<S.length;i++){x=S.charCodeAt(i);A[i]=x==35;if(x%6==0)B.push(i);if(x>41&&x<47)G[i]=1;if(x==43||x>63)Y=i}
let D=[1,-1,W,-W],C='rldu',H=(Y/W)|0,g=(x,y)=>x-y;
let F=(f,b,a)=>{let p=[],q=[f];p[f]=' ';for(let c of q)for(let k=0;k<4;k++){let n=c+D[k];if(a(n)&&!b.includes(n)&&!p[n]){p[n]=p[c]+C[k];q.push(n)}}return p};
let o='',u=Y;
for(let b of B){
if(!B.includes(b))continue;
let M=F(b,[],n=>!A[n]&&(n/W|0)!=H);
let e=0;for(let c in M)if(((c/W|0)-H)**2==1){e=c;break}
let w=H*W+e%W,a=n=>M[n]||n==w;
let r=B.filter(x=>M[x]).sort(g);
o+=F(u,B,n=>!A[n])[w];u=w;
let q=[{b:r,p:w,s:''}],v={},z=null;
v[r+'|'+w]=1;
for(let j=0;j<q.length&&!z;j++){
let s=q[j];
if(s.b.every(b=>G[b])){z=s;break}
let P=F(s.p,s.b,a);
for(let b of s.b)for(let k in D){
let t=b+D[k],h=b-D[k];
if(!M[t]||s.b.includes(t)||!P[h])continue;
if(!G[t]&&(A[t-1]||A[t+1])&&(A[t-W]||A[t+W]))continue;
let n=s.b.map(x=>x==b?t:x).sort(g);
let y=n+'|'+b;
if(v[y])continue;v[y]=1;
q.push({b:n,p:b,s:s.s+P[h]+C[k]});
}}
if(!z){o='';break}
o+=z.s;u=z.p;
B=B.filter(x=>!M[x]).concat(z.b);
}
mkdirSync(O+'/'+d,{recursive:true});
writeFileSync(O+'/'+d+'/solution.txt',o+'\n');
}
