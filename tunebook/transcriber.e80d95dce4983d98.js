(()=>{"use strict";const _=Symbol("Comlink.proxy"),U=Symbol("Comlink.endpoint"),O=Symbol("Comlink.releaseProxy"),k=Symbol("Comlink.thrown"),D=t=>"object"==typeof t&&null!==t||"function"==typeof t,R=new Map([["proxy",{canHandle:t=>D(t)&&t[_],serialize(t){const{port1:e,port2:s}=new MessageChannel;return b(t,e),[s,[s]]},deserialize:t=>(t.start(),function j(t,e){return T(t,[],e)}(t))}],["throw",{canHandle:t=>D(t)&&k in t,serialize({value:t}){let e;return e=t instanceof Error?{isError:!0,value:{message:t.message,name:t.name,stack:t.stack}}:{isError:!1,value:t},[e,[]]},deserialize(t){throw t.isError?Object.assign(new Error(t.value.message),t.value):t.value}}]]);function b(t,e=self){e.addEventListener("message",function s(r){if(!r||!r.data)return;const{id:o,type:a,path:n}=Object.assign({path:[]},r.data),i=(r.data.argumentList||[]).map(m);let c;try{const l=n.slice(0,-1).reduce((f,h)=>f[h],t),u=n.reduce((f,h)=>f[h],t);switch(a){case"GET":c=u;break;case"SET":l[n.slice(-1)[0]]=m(r.data.value),c=!0;break;case"APPLY":c=u.apply(l,i);break;case"CONSTRUCT":c=function B(t){return Object.assign(t,{[_]:!0})}(new u(...i));break;case"ENDPOINT":{const{port1:f,port2:h}=new MessageChannel;b(t,h),c=function z(t,e){return q.set(t,e),t}(f,[f])}break;case"RELEASE":c=void 0;break;default:return}}catch(l){c={value:l,[k]:0}}Promise.resolve(c).catch(l=>({value:l,[k]:0})).then(l=>{const[u,f]=w(l);e.postMessage(Object.assign(Object.assign({},u),{id:o}),f),"RELEASE"===a&&(e.removeEventListener("message",s),I(e))})}),e.start&&e.start()}function I(t){(function H(t){return"MessagePort"===t.constructor.name})(t)&&t.close()}function A(t){if(t)throw new Error("Proxy has been released and is not useable")}function T(t,e=[],s=function(){}){let r=!1;const o=new Proxy(s,{get(a,n){if(A(r),n===O)return()=>d(t,{type:"RELEASE",path:e.map(i=>i.toString())}).then(()=>{I(t),r=!0});if("then"===n){if(0===e.length)return{then:()=>o};const i=d(t,{type:"GET",path:e.map(c=>c.toString())}).then(m);return i.then.bind(i)}return T(t,[...e,n])},set(a,n,i){A(r);const[c,l]=w(i);return d(t,{type:"SET",path:[...e,n].map(u=>u.toString()),value:c},l).then(m)},apply(a,n,i){A(r);const c=e[e.length-1];if(c===U)return d(t,{type:"ENDPOINT"}).then(m);if("bind"===c)return T(t,e.slice(0,-1));const[l,u]=P(i);return d(t,{type:"APPLY",path:e.map(f=>f.toString()),argumentList:l},u).then(m)},construct(a,n){A(r);const[i,c]=P(n);return d(t,{type:"CONSTRUCT",path:e.map(l=>l.toString()),argumentList:i},c).then(m)}});return o}function W(t){return Array.prototype.concat.apply([],t)}function P(t){const e=t.map(w);return[e.map(s=>s[0]),W(e.map(s=>s[1]))]}const q=new WeakMap;function w(t){for(const[e,s]of R)if(s.canHandle(t)){const[r,o]=s.serialize(t);return[{type:"HANDLER",name:e,value:r},o]}return[{type:"RAW",value:t},q.get(t)||[]]}function m(t){switch(t.type){case"HANDLER":return R.get(t.name).deserialize(t.value);case"RAW":return t.value}}function d(t,e,s){return new Promise(r=>{const o=function G(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}();t.addEventListener("message",function a(n){!n.data||!n.data.id||n.data.id!==o||(t.removeEventListener("message",a),r(n.data))}),t.start&&t.start(),t.postMessage(Object.assign({id:o},e),s)})}class L{static mikelsFrequency(e,s,r){let o=0;const n=L.calculatePeaks(e,2,e.length,0);n.sort((h,g)=>e[g]-e[h]);let l=0,u=0;const f=s/r;for(let h=0;h<5;h++){const g=n[h];let F=0;for(let N=0;N<10;N++){const C=g+N*g,ce=C+2;let M=-1;for(let y=C-2;y<=ce;y++)y<e.length&&e[y]>M&&(M=e[y]);F+=M}F>l&&(l=F,u=g)}return o=u*f,o}static calculatePeaks(e,s,r,o){let a=0;if(o>0)for(let i=0;i<r;i++)e[i]>a&&(a=e[i]);a*=o;const n=[];if(r>=s)for(let i=s;i<r-s;i++){let c=!0;if(e[i]>=a){for(let l=0;l<s;l++)if(e[i]<e[i-l]||e[i]<e[i+l]){c=!1;break}}else c=!1;c&&n.push(i)}return n}}const E=1.05946309436,Y=["D","E","F","G","A","B","C","C","D","E","F","G","A","B","C","C","D","E","F","G","A","B","C","C","D","E","F","G","A","B","C","C","D"],$={Bb:233.08,B:246.94,C:261.63,D:293.66,Eb:311.13,F:349.23,G:392};var p=(()=>{return(t=p||(p={}))[t.FLUTE=0]="FLUTE",t[t.WHISTLE=1]="WHISTLE",p;var t})();class S{constructor(e="D",s="major"){this.fundamentalFrequency=$[e],this.pitchModel=p.FLUTE,this.knownFrequencies=new Array(33),this.midiNotes=new Array(87),this.makeScale(s),this.makeMidiNotes()}makeScale(e){const s=[1,2,4,5];if("major"==e){this.knownFrequencies[0]=this.pitchModel==p.FLUTE?this.fundamentalFrequency/Math.pow(E,12):this.fundamentalFrequency;for(let r=1;r<this.knownFrequencies.length;r++)this.knownFrequencies[r]=S.isWholeToneInterval(r,s)?1.1224620483108665*this.knownFrequencies[r-1]:this.knownFrequencies[r-1]*E}}static isWholeToneInterval(e,s){return e%=8,s.some(r=>r==e)}makeMidiNotes(){this.midiNotes[0]=27.5;for(let e=1;e<this.midiNotes.length;e++)this.midiNotes[e]=this.midiNotes[e-1]*E}spellFrequency(e){let s=0,r=Number.MAX_VALUE;if(e<this.knownFrequencies[0]||e>this.knownFrequencies.slice(-1)[0])return"Z";for(let o=0;o<this.knownFrequencies.length;o++){const a=Math.abs(e-this.knownFrequencies[o]);a<r&&(s=o,r=a)}return Y[s]}spellFrequencyAsMidi(e){let s=0,r=Number.MAX_VALUE;if(e<this.midiNotes[0]||e>this.midiNotes.slice(-1)[0])return"Z";for(let o=0;o<this.midiNotes.length;o++){const a=Math.abs(e-this.midiNotes[o]);a<r&&(s=o,r=a)}return s+=21,s.toString()}}class se{constructor(e){this.inputSampleRate=void 0!==e.inputSampleRate?e.inputSampleRate:44100,this.sampleTime=void 0!==e.sampleTime?e.sampleTime:12,this.blankTime=void 0!==e.blankTime?e.blankTime:2,this.fundamental=void 0!==e.fundamental?e.fundamental:"D",this.frameSize=void 0!==e.frameSize?e.frameSize:4096}transcribe(e){const s=new S(this.fundamental),r=[];let o="",a=0;for(const i of e){const c=i.map(f=>this.decibelToLinear(f)),l=L.mikelsFrequency(Array.from(c),this.inputSampleRate,this.frameSize),u=s.spellFrequency(l);u!=o&&(o=u,r.push({spelling:u,frequency:l,onset:a})),a+=.02}return this.postProcess(r,!1)}postProcess(e,s){let r="";for(let n=0;n<e.length-1;n++)e[n].duration=e[n+1].onset-e[n].onset,e[n].duration<0&&console.log(e[n+1].onset,e[n].onset);e.slice(-1)[0].duration=this.blankTime+this.sampleTime-e.slice(-1)[0].onset;const o=new Array(e.length);for(let n=0;n<e.length;n++)o[n]=e[n].duration;const a=class V{static calculatePeak(e,s,r){const o=[];for(const a of e){let n=!1;for(let i=0;i<o.length;i++){const c=o[i],l=c.value*(1+s);if(a>=c.value*(1-s)&&a<=l){n=!0,c.count+=2,c.value=(c.value*(c.count-1)+a)/c.count,o[i]=c;break}}n||o.push({value:a,count:1})}o.sort((a,n)=>n.count-a.count);for(const a of o){const n=a.value;if(n>=r)return n}return r}}.calculatePeak(o,.33,.1);for(const n of e){if("Z"==n.spelling)continue;n.qq=Math.round(n.duration/a);let i=n.spelling;s&&(i+=","),i=i.repeat(n.qq),r+=i}return r}decibelToLinear(e){return Math.pow(10,e/20)}}b(new class ie{initialize(e){this.transcriber=new se(e),this.resetSignal()}resetSignal(){this.signal=[]}transcribe(){const e=this.transcriber.transcribe(this.signal);return console.log(`Worker: transcription: ${e}`),{transcription:e}}pushSignal(e){this.signal.push(e);let s=Number.MIN_VALUE;for(const r of e)r>s&&(s=r);return{amplitude:s,timeRecorded:0,isBufferFull:!1}}})})();