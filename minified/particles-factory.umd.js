var ht=Object.defineProperty;var j=c=>{throw TypeError(c)};var nt=(c,m,g)=>m in c?ht(c,m,{enumerable:!0,configurable:!0,writable:!0,value:g}):c[m]=g;var R=(c,m,g)=>nt(c,typeof m!="symbol"?m+"":m,g),q=(c,m,g)=>m.has(c)||j("Cannot "+g);var r=(c,m,g)=>(q(c,m,"read from private field"),g?g.call(c):m.get(c)),M=(c,m,g)=>m.has(c)?j("Cannot add the same private member more than once"):m instanceof WeakSet?m.add(c):m.set(c,g),x=(c,m,g,E)=>(q(c,m,"write to private field"),E?E.call(c,g):m.set(c,g),g),d=(c,m,g)=>(q(c,m,"access private method"),g);var t,e;t=this,e=function(c){var E,u,P,v,b,F,C,h,W,O,Y,H,N,X,G,J,K,Q,B,L,U,V,Z,$,_,tt,it,D,et;class m{constructor(i,s,a,n,o,l,p=null){this.canvas=i,this.ctx=this.canvas.getContext("2d"),this.x=s,this.y=a,this.size=n,this.speed=o,this.fillStyle=l,this.imageSrc=p,p&&this.loadImage(p),this.updateSpeed(o)}loadImage(i){this.image=new Image,this.image.src=i,this.image.onload=()=>{this.imageLoaded=!0},this.imageLoaded=!1}drawParticle(i,s,a,n,o){const l=this.ctx;switch(o&&(l.strokeStyle=o),l.globalAlpha=s,l.beginPath(),n){case"circle":this.createCircle(l,a);break;case"square":this.createPolygon(l,a,4,-Math.PI/4,1,"square");break;case"rhombus":this.createPolygon(l,a,4,0,2/3,"rhombus");break;case"hexagon":this.createPolygon(l,a,6,0,1,"hexagon");break;case"triangle":this.createPolygon(l,a,3,-Math.PI/2,1,"triangle");break;case"image":this.imageLoaded&&this.image&&this.drawImage(l,a)}l.fill(),o&&(l.strokeStyle=o,l.stroke())}drawImage(i,s){this.image&&i.drawImage(this.image,this.x-s/2,this.y-s/2,s,s)}createCircle(i,s){i.arc(this.x,this.y,s/2,0,2*Math.PI)}createPolygon(i,s,a,n,o){const l=2*Math.PI/a,p=s/2;i.moveTo(this.x+p*Math.cos(n),this.y+p*Math.sin(n/o));for(let f=1;a>=f;f++)i.lineTo(this.x+p*Math.cos(l*f+n),this.y+p*Math.sin(l*f+n)/o);i.closePath()}keepInBoundaries(i){let{x:s,y:a,size:n}=this;const{width:o,height:l}=this.canvas;i?n/=2:n=0,s>n&&o-n>s||(this.x=s>n?o-n:n,this.xSpeed*=-1),a>n&&l-n>a||(this.y=a>n?l-n:n,this.ySpeed*=-1)}particlesCollision(i,s,a,n,o){const l=i?a.size+n.size:2*s;Math.abs(o)<l/2&&[a,n].forEach(p=>{for(let f of["xSpeed","ySpeed"])p[f]*=6>p[f]?-1.001:-.01})}updateCoords(i){this.size=this.size,this.keepInBoundaries(i),this.x+=this.xSpeed,this.y+=this.ySpeed}updateSpeed(i){this.xSpeed=i*(2*Math.random()-1),this.ySpeed=i*(2*Math.random()-1)}handleMouseMove(i,s,a,n){if(!+s)return;const o=i.clientX,l=i.clientY,{x:p,y:f}=this;let y=o-a-p,S=l-n-f;const w=Math.sqrt(y*y+S*S);if(w&&s>w){y/=w,S/=w;const z=2;this.x=p+y*-z,this.y=f+S*-z}}}const T=class T{constructor(i={canvas:{id:"particles-canvas"}}){M(this,h);M(this,E);M(this,u);M(this,P);M(this,v);M(this,b);M(this,F);M(this,C);R(this,"getCanvasSize",()=>{const{width:i,height:s,prevDimensions:a}=d(this,h,J).call(this);d(this,h,K).call(this,i,s),this.main.isResponsive&&d(this,h,_).call(this,i,s,a)});var a;const s=T.defaultConfig;for(const n in s)Object.preventExtensions(this[n]={...s[n],...i[n]});if(!this.particles.draw&&!this.lines.draw)throw new Error("You need to define at least either a particles- or a lines-object to draw.");x(this,u,[]),x(this,F,((a=this.particles)==null?void 0:a.size)||2),x(this,C,d(this,h,it).call(this,d(this,h,L))),d(this,h,W).call(this),d(this,h,O).call(this),d(this,h,B).call(this),d(this,h,D).call(this)}setFillMode(i){i==="noFill"?(this.particles.noFill=!0,r(this,u).forEach(s=>s.fillStyle="transparent")):(this.particles.noFill=!1,i==="random"&&(this.particles.randomFill=!0),i==="fill"&&(this.particles.randomFill=!0,r(this,u).forEach(s=>s.fillStyle=this.particles.fillStyle)))}setSpeed(i){this.main.speed=i,r(this,u).forEach(s=>{s.updateSpeed(i)})}setNumParticles(i){i=Math.round(i);const s=r(this,u).length;let a=i-s;i&&a&&a>0?d(this,h,Z).call(this,a):d(this,h,$).call(this,s,-a),this.main.numParticles=s+a}setBaseSize(i){const s=(i=Math.round(i))/r(this,F);r(this,u).forEach(a=>{a.size*=s}),x(this,F,i)}toggleFullScreen(){this.main.isFullScreen=!this.main.isFullScreen,this.getCanvasSize()}toggleAnimation(){r(this,P)?d(this,h,et).call(this):d(this,h,D).call(this)}};E=new WeakMap,u=new WeakMap,P=new WeakMap,v=new WeakMap,b=new WeakMap,F=new WeakMap,C=new WeakMap,h=new WeakSet,W=function(){this.canvasEl=document.getElementById(this.canvas.id),x(this,E,this.canvasEl.getContext("2d")),x(this,v,document.createElement("canvas")),x(this,b,r(this,v).getContext("2d")),this.getCanvasSize()},O=function(){const{x:i,y:s}=this.canvasEl.getBoundingClientRect();this.canvasEl.addEventListener("pointermove",a=>{r(this,u).forEach(n=>{n.handleMouseMove(a,this.main.mouseDistance,i,s)})}),window.addEventListener("resize",()=>{this.main.isFullScreen&&(this.getCanvasSize(),d(this,h,L).call(this))})},Y=function(){return"#"+(16777215*Math.random()|0).toString(16).padStart(6,"0")},H=function(i,s,a){return{x:Math.random()*(i-a/2),y:Math.random()*(s-a/2)}},N=function(i){return i*Math.max(.2,Math.random())},X=function(i,s,a,n){const o=a-i,l=n-s;return Math.sqrt(o**2+l**2)},G=function(i,s){if(i&&s)return d(this,h,X).call(this,i.x,i.y,s.x,s.y)},J=function(){const{innerWidth:i,innerHeight:s}=window,a=this.main.isFullScreen,n=s;return{width:a?i:this.canvas.width,height:a?n:this.canvas.height,prevDimensions:{width:this.canvasEl.width,height:this.canvasEl.height}}},K=function(i,s){r(this,v).width=this.canvasEl.width=i,r(this,v).height=this.canvasEl.height=s},Q=function(){const{width:i,height:s}=r(this,v),{size:a,randomSize:n,fillStyle:o,randomFill:l,shape:p,draw:f,imageSrc:y}=this.particles;let S=o,w=a;f&&(l&&(S=d(this,h,Y).call(this)),n&&(w=d(this,h,N).call(this,a)));const{x:z,y:I}=d(this,h,H).call(this,i,s,a);return new m(r(this,v),z,I,w,this.main.speed,S,p==="image"?y:null)},B=function(i=this.main.numParticles){for(;i;)r(this,u).push(d(this,h,Q).call(this)),i--},L=function(){const i=this.main.numParticles,{draw:s,collision:a,randomFill:n,noFill:o,fillStyle:l,stroke:p,opacity:f,randomSize:y,size:S,shape:w,imageSrc:z}=this.particles,I=p?this.lines.strokeStyle:void 0,A=r(this,b);A.fillStyle=this.main.fillStyle,A.globalAlpha=1,A.fillRect(0,0,this.canvasEl.width,this.canvasEl.height),r(this,u).forEach(k=>k.updateCoords(this.particles.draw)),r(this,u).forEach((k,st)=>{if((this.lines.draw&&+this.lines.connectDistance||a)&&d(this,h,tt).call(this,k,st,i),s){let at=o?"transparent":n?k.fillStyle:l;k.drawParticle(at,f,y?k.size:S,w,I)}}),d(this,h,U).call(this)},U=function(){r(this,E).drawImage(r(this,v),0,0)},V=function(i,s,a,n){var y;if(!s||!a||!((y=this.lines)!=null&&y.draw))return;const{strokeStyle:o,lineWidth:l,opacity:p,connectDistance:f}=this.lines;if(f>=n){const{x:S,y:w}=s,{x:z,y:I}=a;i.beginPath(),i.moveTo(S,w),i.lineTo(z,I),i.strokeStyle=o,i.lineWidth=l,i.globalAlpha=p,i.stroke()}},Z=function(i){d(this,h,B).call(this,i)},$=function(i,s){r(this,u).splice(i-s,s),this.numParticles=r(this,u).length},_=function(i,s,a){const n=i/a.width,o=s/a.height;r(this,u).forEach(l=>{l.x*=n,l.y*=o})},tt=function(i,s,a){var n,o;for(let l=s+1;a>l;l++){const p=r(this,u)[l],f=d(this,h,G).call(this,i,p),{randomSize:y,size:S}=this.particles;(n=this.lines)!=null&&n.draw&&d(this,h,V).call(this,r(this,b),i,p,f),(o=this.particles)!=null&&o.collision&&i.particlesCollision(y,S,i,p,f)}},it=function(i){let s;return function(){s||(i.apply(this,arguments),s=!0,setTimeout(()=>s=!1,1e3/this.main.frameRate))}},D=function(){r(this,C).call(this),x(this,P,requestAnimationFrame(d(this,h,D).bind(this)))},et=function(){cancelAnimationFrame(r(this,P)),x(this,P,null)},R(T,"defaultConfig",{canvas:{id:"particles-canvas",width:500,height:500},main:{frameRate:30,numParticles:80,speed:.2,mouseDistance:80,fillStyle:"#000",isFullScreen:!0,isResponsive:!0},particles:{shape:"triangle",fillStyle:"#ff0000",randomFill:!0,noFill:!1,stroke:!0,size:44,randomSize:!0,draw:!0,collision:!1,opacity:1,imageSrc:null},lines:{connectDistance:100,strokeStyle:"#ffffff",draw:!0,lineWidth:.5,opacity:1}});let g=T;typeof window<"u"&&(window.ParticlesFactory=g),c.ParticlesFactory=g,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})},typeof exports=="object"&&typeof module<"u"?e(exports):typeof define=="function"&&define.amd?define(["exports"],e):e((t=typeof globalThis<"u"?globalThis:t||self).ParticlesFactory={});
