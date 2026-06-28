import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const MAX_COLORS = 8;
const hexToRGB = hex => {
  const c = hex.replace('#','').padEnd(6,'0');
  return [parseInt(c.slice(0,2),16)/255, parseInt(c.slice(2,4),16)/255, parseInt(c.slice(4,6),16)/255];
};
const prepColors = input => {
  const base = (input&&input.length?input:['#A6C8FF','#5227FF','#FF9FFC']).slice(0,MAX_COLORS);
  const arr=[];for(let i=0;i<MAX_COLORS;i++)arr.push(hexToRGB(base[Math.min(i,base.length-1)]));
  const avg=[0,0,0];for(let i=0;i<base.length;i++){avg[0]+=arr[i][0];avg[1]+=arr[i][1];avg[2]+=arr[i][2];}
  avg[0]/=base.length;avg[1]/=base.length;avg[2]/=base.length;
  return {arr,count:base.length,avg};
};
const vertex=`attribute vec2 position;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.0,1.0);}`;
const fragment=`precision highp float;uniform vec3 iResolution;uniform vec2 iMouse;uniform float iTime;
uniform vec3 uColor0,uColor1,uColor2,uColor3,uColor4,uColor5,uColor6,uColor7;
uniform int uColorCount;uniform vec3 uBgColor,uMouseColor;
uniform float uSpeed;uniform int uStreakCount;uniform float uStreakWidth,uStreakLength;
uniform float uGlow,uDensity,uTwinkle,uZoom,uBgGlow,uOpacity;
uniform float uMouseEnabled,uMouseStrength,uMouseRadius;
varying vec2 vUv;
vec3 palette(float h){int count=uColorCount;if(count<1)count=1;int idx=int(floor(clamp(h,0.0,0.999999)*float(count)));
if(idx<=0)return uColor0;if(idx==1)return uColor1;if(idx==2)return uColor2;if(idx==3)return uColor3;
if(idx==4)return uColor4;if(idx==5)return uColor5;if(idx==6)return uColor6;return uColor7;}
vec3 tanhv(vec3 x){vec3 e=exp(-2.0*x);return(1.0-e)/(1.0+e);}
vec2 sceneC(vec2 frag,vec2 r){vec2 P=(frag+frag-r)/r.x;float z=0.0;float d=1e3;vec4 O=vec4(0.0);
for(int k=0;k<39;k++){if(d<=1e-4)break;O=z*normalize(vec4(P,uZoom,0.0))-vec4(0.0,4.0,1.0,0.0)/4.5;
d=1.0-sqrt(length(O*O));z+=d;}return vec2(O.x,atan(O.z,O.y));}
void mainImage(out vec4 o,vec2 C){vec2 r=iResolution.xy;vec2 uv0=(C+C-r)/r.x;
float T=0.1*iTime*uSpeed+9.0;float angRings=max(1.0,floor(6.28318530718*max(uDensity,0.05)+0.5));
vec2 Y=vec2(5e-3,6.28318530718/angRings);vec2 c0=sceneC(C,r);vec2 cdx=sceneC(C+vec2(1.0,0.0),r);
vec2 cdy=sceneC(C+vec2(0.0,1.0),r);vec2 dCx=cdx-c0;vec2 dCy=cdy-c0;
dCx.y-=6.28318530718*floor(dCx.y/6.28318530718+0.5);dCy.y-=6.28318530718*floor(dCy.y/6.28318530718+0.5);
vec2 fw=abs(dCx)+abs(dCy);C=c0;vec2 P=vec2(2.0,1.0)*uv0-(r/r.x)*vec2(0.0,1.0);
vec4 O=vec4(uBgColor*90.0*uBgGlow/(1e3*dot(P,P)+6.0),0.0);float mGlow=0.0;
if(uMouseEnabled>0.5){vec2 mN=(iMouse+iMouse-r)/r.x;float md=length(uv0-mN);
mGlow=exp(-md*md/max(uMouseRadius*uMouseRadius,1e-4))*uMouseStrength;O.rgb+=uMouseColor*mGlow*0.25;}
float zr=5e-4*uStreakWidth;vec2 rr=vec2(max(length(fw),1e-5));float tail=19.0/max(uStreakLength,0.05);
for(int m=0;m<16;m++){if(m>=uStreakCount)break;float jf=float(m)+1.0;
float ic=fract(sin(dot(vec2(jf,floor(C.x/Y.x+0.5)),vec2(7.0,11.0))*73.0));
vec2 Pp=C-(T+T*ic)*vec2(0.0,1.0);Pp-=floor(Pp/Y+0.5)*Y;float h=fract(8663.0*ic);vec3 col=palette(h);
float weight=mix(1.5,1.0+sin(T+7.0*h+4.0),uTwinkle);weight*=(1.0+mGlow*2.0);
vec2 inner=vec2(length(max(Pp,vec2(-1.0,0.0))),length(Pp)-zr)-zr;
vec2 sm=vec2(1.0)-smoothstep(-rr,rr,inner);O.rgb+=dot(sm,vec2(exp(tail*Pp.y),3.0))*col*weight;
C.x+=Y.x/8.0;}
vec3 colr=sqrt(tanhv(max(O.rgb*uGlow-vec3(0.04,0.08,0.02),0.0)));o=vec4(colr,uOpacity);}
void main(){vec4 color;mainImage(color,vUv*iResolution.xy);gl_FragColor=color;}`;

const Lightfall = ({
  className,dpr,paused=false,colors=['#A6C8FF','#5227FF','#FF9FFC'],
  backgroundColor='#0A29FF',speed=0.5,streakCount=2,streakWidth=1,
  streakLength=1,glow=1,density=0.6,twinkle=1,zoom=3,backgroundGlow=0.5,
  opacity=1,mouseInteraction=true,mouseStrength=0.5,mouseRadius=1,
  mouseDampening=0.15,mixBlendMode
}) => {
  const cRef=useRef(null),rRef=useRef(null),pRef=useRef(null),mRef=useRef(null);
  const gRef=useRef(null),reRef=useRef(null),tRef=useRef([0,0]),lRef=useRef(0);

  useEffect(()=>{
    const div=cRef.current;if(!div)return;
    const renderer=new Renderer({dpr:dpr??(window.devicePixelRatio||1),alpha:true,antialias:true});
    reRef.current=renderer;const gl=renderer.gl;const canvas=gl.canvas;
    canvas.style.cssText='width:100%;height:100%;display:block;position:absolute;inset:0';
    div.appendChild(canvas);
    const{arr,count,avg}=prepColors(colors);
    const uni={iResolution:{value:[gl.drawingBufferWidth,gl.drawingBufferHeight,1]},
      iMouse:{value:[0,0]},iTime:{value:0},uColor0:{value:arr[0]},uColor1:{value:arr[1]},
      uColor2:{value:arr[2]},uColor3:{value:arr[3]},uColor4:{value:arr[4]},uColor5:{value:arr[5]},
      uColor6:{value:arr[6]},uColor7:{value:arr[7]},uColorCount:{value:count},
      uBgColor:{value:hexToRGB(backgroundColor)},uMouseColor:{value:avg},
      uSpeed:{value:speed},uStreakCount:{value:Math.max(1,Math.min(16,Math.round(streakCount)))},
      uStreakWidth:{value:streakWidth},uStreakLength:{value:streakLength},
      uGlow:{value:glow},uDensity:{value:density},uTwinkle:{value:twinkle},
      uZoom:{value:zoom},uBgGlow:{value:backgroundGlow},uOpacity:{value:opacity},
      uMouseEnabled:{value:mouseInteraction?1:0},uMouseStrength:{value:mouseStrength},
      uMouseRadius:{value:mouseRadius}};
    const prog=new Program(gl,{vertex,fragment,uniforms:uni});pRef.current=prog;
    const geo=new Triangle(gl);gRef.current=geo;
    const mesh=new Mesh(gl,{geometry:geo,program:prog});mRef.current=mesh;
    const rs=()=>{const r=div.getBoundingClientRect();renderer.setSize(r.width,r.height);
      uni.iResolution.value=[gl.drawingBufferWidth,gl.drawingBufferHeight,1];};
    rs();const ro=new ResizeObserver(rs);ro.observe(div);
    const pm=e=>{const r=canvas.getBoundingClientRect(),s=renderer.dpr||1;
      tRef.current=[(e.clientX-r.left)*s,(r.height-(e.clientY-r.top))*s];
      if(mouseDampening<=0)uni.iMouse.value=tRef.current;};
    if(mouseInteraction)canvas.addEventListener('pointermove',pm);
    const loop=t=>{rRef.current=requestAnimationFrame(loop);uni.iTime.value=t*0.001;
      if(mouseDampening>0){if(!lRef.current)lRef.current=t;
        const dt=(t-lRef.current)/1000;lRef.current=t;
        let f=1-Math.exp(-dt/Math.max(1e-4,mouseDampening));if(f>1)f=1;
        const tar=tRef.current,cur=uni.iMouse.value;
        cur[0]+=(tar[0]-cur[0])*f;cur[1]+=(tar[1]-cur[1])*f;
      }else lRef.current=t;
      if(!paused&&pRef.current&&mRef.current){try{renderer.render({scene:mRef.current});}catch(e){}}};
    rRef.current=requestAnimationFrame(loop);
    return()=>{if(rRef.current)cancelAnimationFrame(rRef.current);
      if(mouseInteraction)canvas.removeEventListener('pointermove',pm);ro.disconnect();
      if(canvas.parentElement===div)div.removeChild(canvas);
      [pRef,gRef,mRef,reRef].forEach(o=>{if(o&&o.current&&typeof o.current.remove==='function')o.current.remove();o.current=null;});};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dpr,paused,colors,backgroundColor,speed,streakCount,streakWidth,streakLength,glow,density,twinkle,zoom,backgroundGlow,opacity,mouseInteraction,mouseStrength,mouseRadius,mouseDampening]);

  return <div ref={cRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'hidden',...(mixBlendMode?{mixBlendMode}:{})}} className={className}/>;
};

export default Lightfall;
