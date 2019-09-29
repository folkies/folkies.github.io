"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();(function(){var e=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"calculatePeek",value:function(e,t,n){var i=[],r=!0,a=!1,o=void 0;try{for(var s,u=e[Symbol.iterator]();!(r=(s=u.next()).done);r=!0){for(var l=s.value,c=!1,h=0;h<i.length;h++){var f=i[h],m=f.value*(1+t),d=f.value*(1-t);if(l>=d&&l<=m){c=!0,f.count+=2,f.value=(f.value*(f.count-1)+l)/f.count,i[h]=f;break}}c||i.push({value:l,count:1})}}catch(p){a=!0,o=p}finally{try{!r&&u["return"]&&u["return"]()}finally{if(a)throw o}}i.sort(function(e,t){return t.count-e.count});var _=!0,v=!1,y=void 0;try{for(var g,w=i[Symbol.iterator]();!(_=(g=w.next()).done);_=!0){var S=g.value,k=S.value;if(k>=n)return k}}catch(p){v=!0,y=p}finally{try{!_&&w["return"]&&w["return"]()}finally{if(v)throw y}}return n}}]),e}(),t=e,n=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"mikelsFrequency",value:function(t,n,i){var r=0,a=2,o=e._calculatePeaks(t,a,t.length,0);o.sort(function(e,n){return t[n]-t[e]});for(var s=5,u=10,l=0,c=0,h=n/i,f=0;f<s;f++){for(var m=o[f],d=0,p=0;p<u;p++){for(var _=m+p*m,v=_-2,y=_+2,g=-1,w=v;w<=y;w++)w<t.length&&t[w]>g&&(g=t[w]);d+=g}d>l&&(l=d,c=m)}return r=c*h}},{key:"_calculatePeaks",value:function(e,t,n,i){var r=0;if(i>0)for(var a=0;a<n;a++)e[a]>r&&(r=e[a]);r*=i;var o=[];if(n>=t)for(var a=t;a<n-t;a++){var s=!0;if(e[a]>=r){for(var u=0;u<t;u++)if(e[a]<e[a-u]||e[a]<e[a+u]){s=!1;break}}else s=!1;s&&o.push(a)}return o}}]),e}(),i=n,r=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"dataURLToBlob",value:function(e){var t=";base64,";if(e.indexOf(t)==-1){for(var n=e.split(","),i=n[0].split(":")[1],r=n[1],a=(r.match(/%/g)||[]).length,o=r.length-2*a,s=new Uint8Array(o),u=0,l=0;u<r.length;l++)if("%"===r[u]){var c=r.substr(u+1,2);s[l]=parseInt(c,16),u+=3}else s[l]=r.charCodeAt(u),u++;return new Blob([s],{type:i})}for(var n=e.split(t),i=n[0].split(":")[1],r=window.atob(n[1]),h=r.length,s=new Uint8Array(h),u=0;u<h;++u)s[u]=r.charCodeAt(u);return new Blob([s],{type:i})}}]),e}(),a=new r,o=a,s=function N(){_classCallCheck(this,N),this.europeana={},this.keywordSearch={},this.notesSearch={},this.tune={}},u=new s,l=u,c=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"format",value:function(e){var t=e.getFullYear(),n=e.getMonth()+1,i=e.getDate(),r=e.getHours(),a=e.getMinutes(),o=e.getSeconds();return t+"-"+n+"-"+i+"%20"+r+"%3A"+a+"%3A"+o}}]),e}(),h=new c,f=h,m=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getItem",value:function(e){var t=localStorage.getItem(e);return t&&JSON.parse(t)}},{key:"setItem",value:function(e,t){localStorage.setItem(e,JSON.stringify(t))}}]),e}(),d=new m,p=d,_=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"calcFrameSize",value:function(e){var t=e/10,n=this.prevPow2(t),i=2*n;return i-t<n-t?i:n}},{key:"prevPow2",value:function(e){return Math.pow(2,Math.floor(Math.log(e)/Math.log(2)))}}]),e}(),v=new _,y=v,g=function(){function e(){_classCallCheck(this,e),this.smallScreen=600,this.mediumScreen=992,this.largeScreen=1200}return _createClass(e,[{key:"showSideNav",value:function(){$(".hamburger-button").sideNav("show")}},{key:"goBack",value:function(){1==history.length?location.replace("/#!/record"):history.back()}},{key:"doubleEncode",value:function(e){return encodeURIComponent(encodeURIComponent(e))}},{key:"initDropdown",value:function(){$(".dropdown-button").dropdown({constrain_width:!1})}},{key:"initTooltips",value:function(){$(".tooltipped").tooltip({position:"bottom",delay:50})}},{key:"isSmall",get:function(){return $(window).width()<=this.smallScreen}},{key:"isMedium",get:function(){return $(window).width()>this.smallScreen&&$(window).width()<=this.mediumScreen}},{key:"isLarge",get:function(){return $(window).width()>this.mediumScreen}},{key:"isMediumOrUp",get:function(){return $(window).width()>this.smallScreen}},{key:"isMediumOrDown",get:function(){return $(window).width()<=this.mediumScreen}},{key:"isLandscape",get:function(){var e=$(window).width(),t=$(window).height();return e<=this.mediumScreen?e>t:e-240>t}},{key:"isPortrait",get:function(){return!this.isLandscape}},{key:"navbarHeight",get:function(){return this.isMediumOrDown?56:64}}]),e}(),w=new g,S=w,k=function(){function e(){_classCallCheck(this,e),this.blob=o,this.cache=l,this.date=f,this.localStorage=p,this.transcriber=y,this.view=S,this.tuneCache=null,this.europeanaCache=null}return _createClass(e,[{key:"makeArray",value:function(){for(var e=arguments.length<=0||void 0===arguments[0]?0:arguments[0],t=arguments.length<=1||void 0===arguments[1]?10:arguments[1],n=arguments.length<=2||void 0===arguments[2]?1:arguments[2],i=[],r=e;r<=t;r+=n)i.push(r);return i}},{key:"defineProperty",value:function(e){var t=!0,n=!1,i=void 0;try{for(var r=arguments.length,a=Array(r>1?r-1:0),o=1;o<r;o++)a[o-1]=arguments[o];for(var s,u=a[Symbol.iterator]();!(t=(s=u.next()).done);t=!0)name=s.value,Object.defineProperty(e,name,{get:function(){return this["_"+name]},set:function(e){this["_"+name]=e}})}catch(l){n=!0,i=l}finally{try{!t&&u["return"]&&u["return"]()}finally{if(n)throw i}}}},{key:"createEnum",value:function(e){for(var t={},n=0;n<e.length;n++)t[e[n]]=n+1;return t}},{key:"createPolyfills",value:function(){"undefined"!=typeof navigator&&("undefined"==typeof navigator.mediaDevices&&(navigator.mediaDevices={}),"undefined"==typeof navigator.mediaDevices.getUserMedia&&!function(){var e=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;"undefined"!=typeof e&&(navigator.mediaDevices.getUserMedia=function(t){var n={};return e(t,function(e){return n.successCallback(e)},function(e){return n.errorCallback(e)}),{then:function(e){return n.successCallback=e},"catch":function(e){return n.errorCallback=e}}})}()),"undefined"!=typeof window&&(window.AudioContext=window.AudioContext||window.webkitAudioContext,window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return window.setTimeout(e,1e3/60)},window.cancelAnimationFrame=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(e){window.clearTimeout(e)}),"undefined"!=typeof AudioBuffer&&(AudioBuffer.prototype.copyToChannel=AudioBuffer.prototype.copyToChannel||function(e,t,n){this.getChannelData(t).set(e,n)}),"undefined"!=typeof Float32Array&&(Float32Array.prototype.slice=Float32Array.prototype.slice||function(e,t){e="undefined"!=typeof e?e:0,t="undefined"!=typeof t?t:this.length;var n=this.buffer.slice(4*e,4*t);return new Float32Array(n)})}},{key:"joinSet",value:function(e){var t="",n=0,i=!0,r=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(i=(o=s.next()).done);i=!0){var u=o.value;0!=n&&(t+=","),t+=u,n++}}catch(l){r=!0,a=l}finally{try{!i&&s["return"]&&s["return"]()}finally{if(r)throw a}}return t}}]),e}();Array.prototype.last=Array.prototype.last||function(){return this[this.length-1]};var A=new k;A.createPolyfills();var b=A,C=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?"D":arguments[0],n=arguments.length<=1||void 0===arguments[1]?"major":arguments[1];_classCallCheck(this,e),this.fundamental=t,this._pitchModel=e.PitchModel.FLUTE,this._knownFrequencies=new Array(e.ABC_NOTE_RANGE),this._midiNotes=new Array(e.MIDI_NOTE_RANGE),this._makeScale(n),this._makeMidiNotes()}return _createClass(e,[{key:"fundamental",get:function(){return this._fundamental},set:function(t){this._fundamental=t,this._fundamentalFrequency=e.FUNDAMENTAL_FREQUENCIES[t]}}]),_createClass(e,[{key:"_makeScale",value:function(t){var n=[1,2,4,5];if("major"==t){this._pitchModel==e.PitchModel.FLUTE?this._knownFrequencies[0]=this._fundamentalFrequency/Math.pow(e.RATIO,12):this._knownFrequencies[0]=this._fundamentalFrequency;for(var i=1;i<this._knownFrequencies.length;i++)e._isWholeToneInterval(i,n)?this._knownFrequencies[i]=this._knownFrequencies[i-1]*e.RATIO_SQUARED:this._knownFrequencies[i]=this._knownFrequencies[i-1]*e.RATIO}}},{key:"_makeMidiNotes",value:function(){this._midiNotes[0]=27.5;for(var t=1;t<this._midiNotes.length;t++)this._midiNotes[t]=this._midiNotes[t-1]*e.RATIO}},{key:"spellFrequency",value:function(t){var n=0,i=Number.MAX_VALUE;if(t<this._knownFrequencies[0]||t>this._knownFrequencies.last())return"Z";for(var r=0;r<this._knownFrequencies.length;r++){var a=Math.abs(t-this._knownFrequencies[r]);a<i&&(n=r,i=a)}return e.NOTE_NAMES[n]}},{key:"spellFrequencyAsMidi",value:function(t){var n=0,i=Number.MAX_VALUE;if(t<this._midiNotes[0]||t>this._midiNotes.last())return"Z";for(var r=0;r<this._midiNotes.length;r++){var a=abs(t-this._midiNotes[r]);a<i&&(n=r,i=a)}return n+=e.MIDI_OFFSET,n.toString()}}],[{key:"_isWholeToneInterval",value:function(e,t){return e%=8,t.some(function(t){return t==e})}}]),e}(),F=C;C.PitchModel=b.createEnum(["FLUTE","WHISTLE"]),C.RANGE=.1,C.RATIO=1.05946309436,C.RATIO_SQUARED=C.RATIO*C.RATIO,C.ABC_NOTE_RANGE=33,C.MIDI_NOTE_RANGE=87,C.MIDI_OFFSET=21,C.NOTE_NAMES=["D","E","F","G","A","B","C","C","D","E","F","G","A","B","C","C","D","E","F","G","A","B","C","C","D","E","F","G","A","B","C","C","D"],C.FUNDAMENTAL_FREQUENCIES={Bb:233.08,B:246.94,C:261.63,D:293.66,Eb:311.13,F:349.23,G:392};var E=function(){function e(t){_classCallCheck(this,e),this._inputSampleRate="undefined"!=typeof t.inputSampleRate?t.inputSampleRate:e.DEFAULT_SAMPLE_RATE,this._sampleTime="undefined"!=typeof t.sampleTime?t.sampleTime:e.DEFAULT_SAMPLE_TIME,this._blankTime="undefined"!=typeof t.blankTime?t.blankTime:e.DEFAULT_BLANK_TIME,this._fundamental="undefined"!=typeof t.fundamental?t.fundamental:e.DEFAULT_FUNDAMENTAL,this._enableSampleRateConversion="undefined"!=typeof t.enableSampleRateConversion&&t.enableSampleRateConversion,this._frameSize="undefined"!=typeof t.frameSize?t.frameSize:e.DEFAULT_FRAME_SIZE,this.onProgress="undefined"!=typeof t.onProgress?t.onProgress:function(){},this._enableSampleRateConversion?this._outputSampleRate=e.DEFAULT_SAMPLE_RATE:this._outputSampleRate=this._inputSampleRate,this._numInputSamples=this._inputSampleRate*(this._blankTime+this._sampleTime),this._numOutputSamples=this._outputSampleRate*(this._blankTime+this._sampleTime),"auto"===this._frameSize&&(this._frameSize=b.transcriber.calcFrameSize(this._outputSampleRate)),this._hopSize=this._frameSize*(1-e.OVERLAP),console.log("Frame size and hop size:",this._frameSize,this._hopSize),this._windowFunction=new WindowFunction(DSP.HANN),this._powerSpectrum=new FFT(this._frameSize,this._outputSampleRate)}return _createClass(e,[{key:"inputSampleRate",get:function(){return this._inputSampleRate}},{key:"sampleTime",get:function(){return this._sampleTime}},{key:"blankTime",get:function(){return this._blankTime}},{key:"fundamental",get:function(){return this._fundamental}},{key:"enableSampleRateConversion",get:function(){return this._enableSampleRateConversion}},{key:"progress",get:function(){return this._progress}},{key:"interrupted",get:function(){return this._interrupted}},{key:"signal",get:function(){return this._signal}},{key:"outputSampleRate",get:function(){return this._outputSampleRate}},{key:"numInputSamples",get:function(){return this._numInputSamples}},{key:"numOutputSamples",get:function(){return this._numOutputSamples}}]),_createClass(e,[{key:"transcribe",value:function(e){var t=!(arguments.length<=1||void 0===arguments[1])&&arguments[1];this._enableSampleRateConversion?this._signal=this._convertSampleRate(e):this._signal=e;for(var n=new F(this._fundamental),r=Math.floor((this._outputSampleRate*this._sampleTime-this._frameSize)/this._hopSize)+1,a=[],o="",s=this._blankTime*this._outputSampleRate,u=0;u<r;u++){if(this._interrupted)return"";var l=s+this._hopSize*u;this._progress=u/r,this.onProgress(this._progress);var c=this._signal.slice(l,l+this._frameSize);this._windowFunction.process(c);var h=this._powerSpectrum.forward(c),f=i.mikelsFrequency(h,this._outputSampleRate,this._frameSize),m=t?n.spellFrequencyAsMidi(f):n.spellFrequency(f);if(m!=o){o=m;var d={spelling:m,frequency:f,onset:l/this._outputSampleRate};a.push(d)}}var p=this._postProcess(a,t);return p}},{key:"_convertSampleRate",value:function(e){for(var t=new Float32Array(this.numOutputSamples),n=0,i=0;i<t.length;i++){var r=n;n=Math.floor((i+1)*this._inputSampleRate/this._outputSampleRate);for(var a=0,o=r;o<n;o++)a+=e[o];t[i]=a/(n-r)}return t}},{key:"_postProcess",value:function(e,n){for(var i="",r=0;r<e.length-1;r++)e[r].duration=e[r+1].onset-e[r].onset,e[r].duration<0&&console.log(e[r+1].onset,e[r].onset);e.last().duration=this._blankTime+this._sampleTime-e.last().onset;for(var a=new Array(e.length),r=0;r<e.length;r++)a[r]=e[r].duration;var o=t.calculatePeek(a,.33,.1),s=!0,u=!1,l=void 0;try{for(var c,h=e[Symbol.iterator]();!(s=(c=h.next()).done);s=!0){var f=c.value;if("Z"!=f.spelling){f.qq=Math.round(f.duration/o);var m=f.spelling;n&&(m+=","),m=m.repeat(f.qq),i+=m}}}catch(d){u=!0,l=d}finally{try{!s&&h["return"]&&h["return"]()}finally{if(u)throw l}}return i}}]),e}(),T=E;E.DEFAULT_SAMPLE_RATE=22050,E.DEFAULT_SAMPLE_TIME=12,E.DEFAULT_BLANK_TIME=2,E.DEFAULT_FUNDAMENTAL="D",E.DEFAULT_FRAME_SIZE="auto",E.OVERLAP=.75;var R=["/lib/dsp.js/dsp.js","/lib/babel/browser-polyfill.js"],M=function(){function e(){var t=this;_classCallCheck(this,e);for(var n=0;n<R.length;n++)importScripts(R[n]);self.addEventListener("message",function(e){return t.onMessage(e)})}return _createClass(e,[{key:"onMessage",value:function(e){var t=this,n=e.data,i=n.msg||{},r="success",a=void 0;switch(n.cmd){case"init":i.onProgress=function(e){return t._onProgress(e)},this._transcriber=new T(i),this._resetSignal();break;case"resetSignal":this._resetSignal();break;case"getSignal":a=this._transcriber.signal;break;case"pushSignal":a=this._pushSignal(i);break;case"transcribe":var o="undefined"!=typeof i.signal?i.signal:this._mergeSignal(),s="undefined"!=typeof i.midi&&i.midi,u=this._transcriber.transcribe(o,s);a={transcription:u,sampleRate:this._transcriber.outputSampleRate,numSamples:this._transcriber.numOutputSamples};break;case"close":self.close()}postMessage({id:n.id,cmd:n.cmd,result:r,msg:a})}},{key:"_onProgress",value:function(e){postMessage({cmd:"onProgress",msg:e})}},{key:"_resetSignal",value:function(){this._signal=[],this._currNumSamples=0}},{key:"_pushSignal",value:function(e){this._signal.push(e),this._currNumSamples+=e.length;var t=Number.MIN_VALUE,n=!0,i=!1,r=void 0;try{for(var a,o=e[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){var s=a.value;s>t&&(t=s)}}catch(u){i=!0,r=u}finally{try{!n&&o["return"]&&o["return"]()}finally{if(i)throw r}}return{amplitude:t,timeRecorded:this._currNumSamples/this._transcriber.inputSampleRate,isBufferFull:this._currNumSamples>=this._transcriber.numInputSamples}}},{key:"_mergeSignal",value:function(){var e=this._transcriber.numInputSamples,t=new Float32Array(e),n=0,i=!0,r=!1,a=void 0;try{for(var o,s=this._signal[Symbol.iterator]();!(i=(o=s.next()).done);i=!0){var u=o.value,l=n+u.length;l<=e?t.set(u,n):t.set(u.subarray(0,e-n),n),n=l}}catch(c){r=!0,a=c}finally{try{!i&&s["return"]&&s["return"]()}finally{if(r)throw a}}return t}}]),e}();"undefined"==typeof window&&new M}).call(void 0);