// Axons art source code:
// https://axons.art
// https://etherscan.io/address/0xc7ad37edae28d8cd04bbe4a6ecf072314faed1be
// https://ipfs.io/ipfs/QmepMLoRLNUX2ratx24a12oQFuRhLsgMhM6ni3HfMzK3Fu?x=NTM4NzQ2NjQ3Njg3OTc3

// Renders a p5js sketch with the given input, calling back with each frame
const sketch = (input, callback) => p5 => {
    class Mx{constructor(t,r){this.rZ=t,this.cols=r,this.data=Array(this.rZ).fill().map((()=>Array(this.cols).fill(0)))}copy(){let t=new Mx(this.rZ,this.cols);for(let r=0;r<this.rZ;r++)for(let s=0;s<this.cols;s++)t.data[r][s]=this.data[r][s];return t}static fromArray(t){return new Mx(t.length,1).map(((r,s)=>t[s]))}static subtract(t,r){if(t.rZ===r.rZ&&t.cols===r.cols)return new Mx(t.rZ,t.cols).map(((s,a,i)=>t.data[a][i]-r.data[a][i]))}toArray(){let t=[];for(let r=0;r<this.rZ;r++)for(let s=0;s<this.cols;s++)t.push(this.data[r][s]);return t}rdz(){return this.map((t=>2*rng()-1))}add(t){if(t instanceof Mx){if(this.rZ!==t.rZ||this.cols!==t.cols)return;return this.map(((r,s,a)=>r+t.data[s][a]))}return this.map((r=>r+t))}static trp(t){return new Mx(t.cols,t.rZ).map(((r,s,a)=>t.data[a][s]))}static mtp(t,r){if(t.cols===r.rZ)return new Mx(t.rZ,r.cols).map(((s,a,i)=>{let o=0;for(let s=0;s<t.cols;s++)o+=t.data[a][s]*r.data[s][i];return o}))}mtp(t){if(t instanceof Mx){if(this.rZ!==t.rZ||this.cols!==t.cols)return;return this.map(((r,s,a)=>r*t.data[s][a]))}return this.map((r=>r*t))}map(t){for(let r=0;r<this.rZ;r++)for(let s=0;s<this.cols;s++){let a=this.data[r][s];this.data[r][s]=t(a,r,s)}return this}static map(t,r){return new Mx(t.rZ,t.cols).map(((s,a,i)=>r(t.data[a][i],a,i)))}serialize(){return JSON.stringify(this)}static dsr(t){"string"==typeof t&&(t=JSON.parse(t));let r=new Mx(t.rZ,t.cols);return r.data=t.data,r}}"undefined"!=typeof module&&(module.exports=Mx);
    class AAF{constructor(i,t){this.func=i,this.dfunc=t}}let sigmoid=new AAF((i=>1/(1+Math.exp(-i))),(i=>i*(1-i)));
    class NNN{constructor(i,t,s){(this.seed=Number.isInteger(input.number)?input.number:parseInt(input.number),rng=srand(this.seed),this.i_n=i,this.h_n=t,this.o_n=s,this.w_hi=new Mx(this.h_n,this.i_n),this.w_ho=new Mx(this.o_n,this.h_n),this.w_hi.rdz(),this.w_ho.rdz(),this.bias_h=new Mx(this.h_n,1),this.bias_o=new Mx(this.o_n,1),this.bias_h.rdz(),this.bias_o.rdz()),this.setLearningRate(),this.setAAF()}predict(i){let t=Mx.fromArray(i),s=Mx.mtp(this.w_hi,t);s.add(this.bias_h),s.map(this.a_f.func);let e=Mx.mtp(this.w_ho,s);return e.add(this.bias_o),e.map(this.a_f.func),e.toArray()}setLearningRate(i=.1){this.l_r=i}setAAF(i=sigmoid){this.a_f=i}serialize(){return JSON.stringify(this)}static dsr(i){"string"==typeof i&&(i=JSON.parse(i));let t=new NNN(i.i_n,i.h_n,i.o_n);return t.w_hi=Mx.dsr(i.w_hi),t.w_ho=Mx.dsr(i.w_ho),t.bias_h=Mx.dsr(i.bias_h),t.bias_o=Mx.dsr(i.bias_o),t.l_r=i.l_r,t}copy(){return new NNN(this)}mtT(i){function t(t){return rng()<i?t+p5.randomGaussian(0,.1):t}this.w_hi.map(t),this.w_ho.map(t),this.bias_h.map(t),this.bias_o.map(t)}}
    class Art{constructor(t){this.score=0,this.fitness=0,this.frame=0,this.rate=1,this.brain=t?t.copy():new NNN(1,8,38)}cvC(t,r,e){return[Math.round(255*t[0]+.35*r*this.ouT[35]),Math.round(255*t[1]+.35*r*this.ouT[36]),Math.round(255*t[2])+.35*r*this.ouT[37]]}gCN(t,r,e){t%=35,t=Math.round((Math.sin(t)+1)/2*55)-1,this.brain.seed%3==0?t=-1*Math.abs(t):this.brain.seed%3==1&&(t=Math.abs(t));return this.ouT[6+3*t]?[this.ouT[6+3*t],this.ouT[6+4*t],this.ouT[6+5*t]]:[-1,-1,-1]}show(t,r,e){pF||(pF=p5.color(0),p5.fill(pF));var i,n=0+Math.round(5*this.ouT[0]),a=Math.max(this.ouT[1]+3e-7*t,.01)*t/12,s=Math.max(this.ouT[2]+3e-7*r,.01)*r/12,o=12e3*this.ouT[4]+(1-8e3*this.ouT[3]),u=Math.round(a*o+s*(1-o)*n),h=this.gCN(u);-1==h[0]?this.cf=pF:(i=this.cvC(h,t,r),p5.drawingContext.fillStyle="rgb("+i[0]+","+i[1]+","+i[2]+")",this.cf=i,"rgba(0, 0, 0, 0.00)"===p5.drawingContext.fillStyle?(p5.drawingContext.fillStyle=`rgb(${pF[0]}, ${pF[1]}, ${pF[2]})`,this.cf=pF):pF=i);let l=4*(r*e*p5.width+t*e),c=[p5.pixels[l],p5.pixels[l+1],p5.pixels[l+2],p5.pixels[l+3]];c[0]==this.cf[0]&&c[1]==this.cf[1]&&c[2]==this.cf[2]||p5.drawingContext.fillRect(t*e,r*e,e,e)}mtT(){this.brain.mtT(.9)}think(){this.frame+=this.rate,5e-6*this.frame>15&&(this.frame=-5,crA.brain.mtT(.9));let t=[];t[0]=5e-6*this.frame-5;let r=this.brain.predict(t);this.ouT=r}update(){this.score++}}
    function srand(t){return function(){var r=t+=1831565813;return r=Math.imul(r^r>>>15,1|r),(((r^=r+Math.imul(r^r>>>7,61|r))^r>>>14)>>>0)/4294967296}}
    function nextArt(p5){crA=arts.shift(),crA.update(),p5.redraw()}
    const TOTAL=10;let crA,rng,arts=[];var pS=5,pF;
    let ctx;

    p5.setup = () => {
        arts=[];
        p5.pixelDensity(1),
        p5.colorMode(p5.RGB);
        ctx = p5.createCanvas(500,500).canvas.getContext('2d');
        for(var t=0;t<TOTAL;t++)arts.push(new Art);
        p5.frameRate(10);
        nextArt(p5);
    }
    p5.draw = () => {
        p5.noStroke();
        p5.loadPixels();
        crA.think();
        for(var t=0;t<p5.height/pS;t++)for(var r=0;r<p5.width/pS;r++)crA.show(r,t,pS,p5);
        callback(ctx.getImageData(0,0, p5.width, p5.height));
    }
    p5.keyPressed = e => {e.keyCode===90&&crA.brain.mtT(.1),e.keyCode===68&&crA.rate++,e.keyCode===65&&crA.rate--}
}
module.exports = {sketch};
