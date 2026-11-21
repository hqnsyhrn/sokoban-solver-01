import{readdirSync,readFileSync,writeFileSync,mkdirSync}from'node:fs'
let{MAKEFUN_INPUT_DIR:A='/input',MAKEFUN_OUTPUT_DIR:B='/output'}=process.env
let w,n,D,s,W,p,G,E
let R=(X,Y)=>{
let T=new Set([X+','+Y]),Q=[[X,Y,'']],m,k
for(let i=0;i<Q.length;i++){
[X,Y,m]=Q[i]
let f=[Y];p.fill(-1);p[Y]=Y*4
for(let x of f)for(let j=4;j--;){let y=x+D[j];if(!W[y]&&!X.includes(y)&&p[y]<0){p[y]=x*4+j;f.push(y)}}
for(let a=X.length;a--;){let b=X[a]
for(let j=4;j--;){let d=D[j],t=b+d,g=b-d
if(p[g]<0||W[t]||X.includes(t)||(s[t-1]=='#'||s[t+1]=='#')&&(s[t-w]=='#'||s[t+w]=='#')&&!G.includes(t))continue
let v='';for(let x=g;x!==Y;x=(p[x]/4)|0)v='rldu'[p[x]%4]+v
let N=X.slice();N[a]=t;N.sort()
if(T.has(k=N+','+b))continue
T.add(k)
let u=m+v+'RLDU'[j]
if(N+''==G+'')return E=b,u
Q.push([N,b,u])
}}
}
return E=Y,''
}
let V=t=>{
let a=t.split('\n');w=a[0].length;s=a.join('');n=s.length;D=[1,-1,w,-w]
let Y=0,M={}
for(let i=n;i--;){let c=s[i],k=(i>=9*w?2:0)+((i%w)/7|0)
if(c=='$'||c=='*')(M[k]=M[k]||{b:[],g:[]}).b.push(i)
if(c=='.'||c=='*'||c=='+')(M[k]=M[k]||{b:[],g:[]}).g.push(i)
if(c=='@'||c=='+')Y=i}
p=new Int32Array(n)
let m=''
for(let k in M){let r=M[k]
if(!r.b.length)continue
r.b.sort()
W=Uint8Array.from(s,c=>c=='#'?1:0)
for(let j in M)if(j!=k)for(let b of M[j].b)W[b]=1
G=r.g.sort()
m+=R(r.b,Y);Y=E;r.b=r.g.slice()}
return m
}
for(let i of readdirSync(A)){let o=B+'/'+i,m=V(readFileSync(A+'/'+i+'/level.txt','utf8'));mkdirSync(o,{recursive:true});writeFileSync(o+'/solution.txt',m+'\n')}
