var DSP={LEFT:0,RIGHT:1,MIX:2,SINE:1,TRIANGLE:2,SAW:3,SQUARE:4,LOWPASS:0,HIGHPASS:1,BANDPASS:2,NOTCH:3,BARTLETT:1,BARTLETTHANN:2,BLACKMAN:3,COSINE:4,GAUSS:5,HAMMING:6,HANN:7,LANCZOS:8,RECTANGULAR:9,TRIANGULAR:10,OFF:0,FW:1,BW:2,FWBW:3,TWO_PI:2*Math.PI};function setupTypedArray(t,e){"function"!=typeof this[t]&&"object"!=typeof this[t]&&(this[t]="function"==typeof this[e]&&"object"!=typeof this[e]?this[e]:function(t){return t instanceof Array?t:"number"==typeof t?new Array(t):void 0})}function FourierTransform(t,e){this.bufferSize=t,this.sampleRate=e,this.bandwidth=2/t*e/2,this.spectrum=new Float32Array(t/2),this.real=new Float32Array(t),this.imag=new Float32Array(t),this.peakBand=0,this.peak=0,this.getBandFrequency=function(t){return this.bandwidth*t+this.bandwidth/2},this.calculateSpectrum=function(){for(var e,s,i,a=this.spectrum,h=this.real,r=this.imag,n=2/this.bufferSize,l=Math.sqrt,o=0,u=t/2;o<u;o++)(i=n*l((e=h[o])*e+(s=r[o])*s))>this.peak&&(this.peakBand=o,this.peak=i),a[o]=i;return a}}function DFT(t,e){FourierTransform.call(this,t,e);var s=t/2*t,i=2*Math.PI;this.sinTable=new Float32Array(s),this.cosTable=new Float32Array(s);for(var a=0;a<s;a++)this.sinTable[a]=Math.sin(a*i/t),this.cosTable[a]=Math.cos(a*i/t)}function FFT(t,e){FourierTransform.call(this,t,e),this.reverseTable=new Uint32Array(t);for(var s,i=1,a=t>>1;i<t;){for(s=0;s<i;s++)this.reverseTable[s+i]=this.reverseTable[s]+a;i<<=1,a>>=1}for(this.sinTable=new Float32Array(t),this.cosTable=new Float32Array(t),s=0;s<t;s++)this.sinTable[s]=Math.sin(-Math.PI/s),this.cosTable[s]=Math.cos(-Math.PI/s)}function RFFT(t,e){FourierTransform.call(this,t,e),this.trans=new Float32Array(t),this.reverseTable=new Uint32Array(t),this.reverseBinPermute=function(t,e,s){var i,a=this.bufferSize,h=a>>>1,r=a-1,n=1,l=0;t[0]=e[s=void 0!==s?s:0];do{for(t[n]=e[s+(l+=h)],t[l]=e[s+n],n++,i=h<<1;!((l^=i>>=1)&i););l>=n&&(t[n]=e[s+l],t[l]=e[s+n],t[r-n]=e[s+r-l],t[r-l]=e[s+r-n]),n++}while(n<h);t[r]=e[s+r]},this.generateReverseTable=function(){var t,e=this.bufferSize,s=e>>>1,i=e-1,a=1,h=0;this.reverseTable[0]=0;do{for(this.reverseTable[a]=h+=s,this.reverseTable[h]=a,a++,t=s<<1;!((h^=t>>=1)&t););h>=a&&(this.reverseTable[a]=h,this.reverseTable[h]=a,this.reverseTable[i-a]=i-h,this.reverseTable[i-h]=i-a),a++}while(a<s);this.reverseTable[i]=i},this.generateReverseTable()}function Sampler(t,e,s,i,a,h,r,n){this.file=t,this.bufferSize=e,this.sampleRate=s,this.playStart=i||0,this.playEnd=a||1,this.loopStart=h||0,this.loopEnd=r||1,this.loopMode=n||DSP.OFF,this.loaded=!1,this.samples=[],this.signal=new Float32Array(e),this.frameCount=0,this.envelope=null,this.amplitude=1,this.rootFrequency=110,this.frequency=550,this.step=this.frequency/this.rootFrequency,this.duration=0,this.samplesProcessed=0,this.playhead=0;var l=document.createElement("AUDIO"),o=this;this.loadSamples=function(t){for(var e=DSP.getChannel(DSP.MIX,t.frameBuffer),s=0;s<e.length;s++)o.samples.push(e[s])},this.loadComplete=function(){o.samples=new Float32Array(o.samples),o.loaded=!0},this.loadMetaData=function(){o.duration=l.duration},l.addEventListener("MozAudioAvailable",this.loadSamples,!1),l.addEventListener("loadedmetadata",this.loadMetaData,!1),l.addEventListener("ended",this.loadComplete,!1),l.muted=!0,l.src=t,l.play()}function Oscillator(t,e,s,i,a){switch(this.frequency=e,this.amplitude=s,this.bufferSize=i,this.sampleRate=a,this.frameCount=0,this.waveTableLength=2048,this.cyclesPerSample=e/a,this.signal=new Float32Array(i),this.envelope=null,parseInt(t,10)){case DSP.TRIANGLE:this.func=Oscillator.Triangle;break;case DSP.SAW:this.func=Oscillator.Saw;break;case DSP.SQUARE:this.func=Oscillator.Square;break;default:case DSP.SINE:this.func=Oscillator.Sine}this.generateWaveTable=function(){Oscillator.waveTable[this.func]=new Float32Array(2048);for(var t=1/(this.waveTableLength/this.sampleRate),e=0;e<this.waveTableLength;e++)Oscillator.waveTable[this.func][e]=this.func(e*t/this.sampleRate)},void 0===Oscillator.waveTable&&(Oscillator.waveTable={}),void 0===Oscillator.waveTable[this.func]&&this.generateWaveTable(),this.waveTable=Oscillator.waveTable[this.func]}function ADSR(t,e,s,i,a,h){this.sampleRate=h,this.attackLength=t,this.decayLength=e,this.sustainLevel=s,this.sustainLength=i,this.releaseLength=a,this.sampleRate=h,this.attackSamples=t*h,this.decaySamples=e*h,this.sustainSamples=i*h,this.releaseSamples=a*h,this.update=function(){this.attack=this.attackSamples,this.decay=this.attack+this.decaySamples,this.sustain=this.decay+this.sustainSamples,this.release=this.sustain+this.releaseSamples},this.update(),this.samplesProcessed=0}function IIRFilter(t,e,s,i){switch(this.sampleRate=i,t){case DSP.LOWPASS:case DSP.LP12:this.func=new IIRFilter.LP12(e,s,i)}}function IIRFilter2(t,e,s,i){this.type=t,this.cutoff=e,this.resonance=s,this.sampleRate=i,this.f=Float32Array(4),this.f[0]=0,this.f[1]=0,this.f[2]=0,this.f[3]=0,this.calcCoeff=function(t,e){this.freq=2*Math.sin(Math.PI*Math.min(.25,t/(2*this.sampleRate))),this.damp=Math.min(2*(1-Math.pow(e,.25)),Math.min(2,2/this.freq-.5*this.freq))},this.calcCoeff(e,s)}function WindowFunction(t,e){switch(this.alpha=e,t){case DSP.BARTLETT:this.func=WindowFunction.Bartlett;break;case DSP.BARTLETTHANN:this.func=WindowFunction.BartlettHann;break;case DSP.BLACKMAN:this.func=WindowFunction.Blackman,this.alpha=this.alpha||.16;break;case DSP.COSINE:this.func=WindowFunction.Cosine;break;case DSP.GAUSS:this.func=WindowFunction.Gauss,this.alpha=this.alpha||.25;break;case DSP.HAMMING:this.func=WindowFunction.Hamming;break;case DSP.HANN:this.func=WindowFunction.Hann;break;case DSP.LANCZOS:this.func=WindowFunction.Lanczoz;break;case DSP.RECTANGULAR:this.func=WindowFunction.Rectangular;break;case DSP.TRIANGULAR:this.func=WindowFunction.Triangular}}function sinh(t){return(Math.exp(t)-Math.exp(-t))/2}function Biquad(t,e){this.Fs=e,this.type=t,this.parameterType=DSP.Q,this.x_1_l=0,this.x_2_l=0,this.y_1_l=0,this.y_2_l=0,this.x_1_r=0,this.x_2_r=0,this.y_1_r=0,this.y_2_r=0,this.b0=1,this.a0=1,this.b1=0,this.a1=0,this.b2=0,this.a2=0,this.b0a0=this.b0/this.a0,this.b1a0=this.b1/this.a0,this.b2a0=this.b2/this.a0,this.a1a0=this.a1/this.a0,this.a2a0=this.a2/this.a0,this.f0=3e3,this.dBgain=12,this.Q=1,this.BW=-3,this.S=1,this.coefficients=function(){return{b:[this.b0,this.b1,this.b2],a:[this.a0,this.a1,this.a2]}},this.setFilterType=function(t){this.type=t,this.recalculateCoefficients()},this.setSampleRate=function(t){this.Fs=t,this.recalculateCoefficients()},this.setQ=function(t){this.parameterType=DSP.Q,this.Q=Math.max(Math.min(t,115),.001),this.recalculateCoefficients()},this.setBW=function(t){this.parameterType=DSP.BW,this.BW=t,this.recalculateCoefficients()},this.setS=function(t){this.parameterType=DSP.S,this.S=Math.max(Math.min(t,5),1e-4),this.recalculateCoefficients()},this.setF0=function(t){this.f0=t,this.recalculateCoefficients()},this.setDbGain=function(t){this.dBgain=t,this.recalculateCoefficients()},this.recalculateCoefficients=function(){var e;e=t===DSP.PEAKING_EQ||t===DSP.LOW_SHELF||t===DSP.HIGH_SHELF?Math.pow(10,this.dBgain/40):Math.sqrt(Math.pow(10,this.dBgain/20));var s,i=DSP.TWO_PI*this.f0/this.Fs,a=Math.cos(i),h=Math.sin(i),r=0;switch(this.parameterType){case DSP.Q:r=h/(2*this.Q);break;case DSP.BW:r=h*sinh(Math.LN2/2*this.BW*i/h);break;case DSP.S:r=h/2*Math.sqrt((e+1/e)*(1/this.S-1)+2)}switch(this.type){case DSP.LPF:this.b0=(1-a)/2,this.b1=1-a,this.b2=(1-a)/2,this.a0=1+r,this.a1=-2*a,this.a2=1-r;break;case DSP.HPF:this.b0=(1+a)/2,this.b1=-(1+a),this.b2=(1+a)/2,this.a0=1+r,this.a1=-2*a,this.a2=1-r;break;case DSP.BPF_CONSTANT_SKIRT:this.b0=h/2,this.b1=0,this.b2=-h/2,this.a0=1+r,this.a1=-2*a,this.a2=1-r;break;case DSP.BPF_CONSTANT_PEAK:this.b0=r,this.b1=0,this.b2=-r,this.a0=1+r,this.a1=-2*a,this.a2=1-r;break;case DSP.NOTCH:this.b0=1,this.b1=-2*a,this.b2=1,this.a0=1+r,this.a1=-2*a,this.a2=1-r;break;case DSP.APF:this.b0=1-r,this.b1=-2*a,this.b2=1+r,this.a0=1+r,this.a1=-2*a,this.a2=1-r;break;case DSP.PEAKING_EQ:this.b0=1+r*e,this.b1=-2*a,this.b2=1-r*e,this.a0=1+r/e,this.a1=-2*a,this.a2=1-r/e;break;case DSP.LOW_SHELF:s=h*Math.sqrt((3^e)*(1/this.S-1)+2*e),this.b0=e*(e+1-(e-1)*a+s),this.b1=2*e*(e-1-(e+1)*a),this.b2=e*(e+1-(e-1)*a-s),this.a0=e+1+(e-1)*a+s,this.a1=-2*(e-1+(e+1)*a),this.a2=e+1+(e-1)*a-s;break;case DSP.HIGH_SHELF:s=h*Math.sqrt((3^e)*(1/this.S-1)+2*e),this.b0=e*(e+1+(e-1)*a+s),this.b1=-2*e*(e-1+(e+1)*a),this.b2=e*(e+1+(e-1)*a-s),this.a0=e+1-(e-1)*a+s,this.a1=2*(e-1-(e+1)*a),this.a2=e+1-(e-1)*a-s}this.b0a0=this.b0/this.a0,this.b1a0=this.b1/this.a0,this.b2a0=this.b2/this.a0,this.a1a0=this.a1/this.a0,this.a2a0=this.a2/this.a0},this.process=function(t){for(var e=new Float32Array(t.length),s=0;s<t.length;s++)e[s]=this.b0a0*t[s]+this.b1a0*this.x_1_l+this.b2a0*this.x_2_l-this.a1a0*this.y_1_l-this.a2a0*this.y_2_l,this.y_2_l=this.y_1_l,this.y_1_l=e[s],this.x_2_l=this.x_1_l,this.x_1_l=t[s];return e},this.processStereo=function(t){for(var e=t.length,s=new Float32Array(e),i=0;i<e/2;i++)s[2*i]=this.b0a0*t[2*i]+this.b1a0*this.x_1_l+this.b2a0*this.x_2_l-this.a1a0*this.y_1_l-this.a2a0*this.y_2_l,this.y_2_l=this.y_1_l,this.y_1_l=s[2*i],this.x_2_l=this.x_1_l,this.x_1_l=t[2*i],s[2*i+1]=this.b0a0*t[2*i+1]+this.b1a0*this.x_1_r+this.b2a0*this.x_2_r-this.a1a0*this.y_1_r-this.a2a0*this.y_2_r,this.y_2_r=this.y_1_r,this.y_1_r=s[2*i+1],this.x_2_r=this.x_1_r,this.x_1_r=t[2*i+1];return s}}function GraphicalEq(t){this.FS=t,this.minFreq=40,this.maxFreq=16e3,this.bandsPerOctave=1,this.filters=[],this.freqzs=[],this.calculateFreqzs=!0,this.recalculateFilters=function(){var t=Math.round(Math.log(this.maxFreq/this.minFreq)*this.bandsPerOctave/Math.LN2);this.filters=[];for(var e=0;e<t;e++){var s=this.minFreq*Math.pow(2,e/this.bandsPerOctave),i=new Biquad(DSP.PEAKING_EQ,this.FS);i.setDbGain(0),i.setBW(1/this.bandsPerOctave),i.setF0(s),this.filters[e]=i,this.recalculateFreqz(e)}},this.setMinimumFrequency=function(t){this.minFreq=t,this.recalculateFilters()},this.setMaximumFrequency=function(t){this.maxFreq=t,this.recalculateFilters()},this.setBandsPerOctave=function(t){this.bandsPerOctave=t,this.recalculateFilters()},this.setBandGain=function(t,e){if(t<0||t>this.filters.length-1)throw"The band index of the graphical equalizer is out of bounds.";if(!e)throw"A gain must be passed.";this.filters[t].setDbGain(e),this.recalculateFreqz(t)},this.recalculateFreqz=function(t){if(this.calculateFreqzs){if(t<0||t>this.filters.length-1)throw"The band index of the graphical equalizer is out of bounds. "+t+" is out of [0, "+this.filters.length-1+"]";if(!this.w){this.w=Float32Array(400);for(var e=0;e<this.w.length;e++)this.w[e]=Math.PI/this.w.length*e}this.freqzs[t]=DSP.mag2db(DSP.freqz([this.filters[t].b0,this.filters[t].b1,this.filters[t].b2],[this.filters[t].a0,this.filters[t].a1,this.filters[t].a2],this.w))}},this.process=function(t){for(var e=t,s=0;s<this.filters.length;s++)e=this.filters[s].process(e);return e},this.processStereo=function(t){for(var e=t,s=0;s<this.filters.length;s++)e=this.filters[s].processStereo(e);return e}}function MultiDelay(t,e,s,i){this.delayBufferSamples=new Float32Array(t),this.delayInputPointer=e,this.delayOutputPointer=0,this.delayInSamples=e,this.masterVolume=s,this.delayVolume=i}function SingleDelay(t,e,s){this.delayBufferSamples=new Float32Array(t),this.delayInputPointer=e,this.delayOutputPointer=0,this.delayInSamples=e,this.delayVolume=s}function Reverb(t,e,s,i,a,h){var r,n;for(this.delayInSamples=e,this.masterVolume=s,this.mixVolume=i,this.delayVolume=a,this.dampFrequency=h,this.NR_OF_MULTIDELAYS=6,this.NR_OF_SINGLEDELAYS=6,this.LOWPASSL=new IIRFilter2(DSP.LOWPASS,h,0,44100),this.LOWPASSR=new IIRFilter2(DSP.LOWPASS,h,0,44100),this.singleDelays=[],r=0;r<this.NR_OF_SINGLEDELAYS;r++)n=1+r/7,this.singleDelays[r]=new SingleDelay(t,Math.round(this.delayInSamples*n),this.delayVolume);for(this.multiDelays=[],r=0;r<this.NR_OF_MULTIDELAYS;r++)n=1+r/10,this.multiDelays[r]=new MultiDelay(t,Math.round(this.delayInSamples*n),this.masterVolume,this.delayVolume)}setupTypedArray("Float32Array","WebGLFloatArray"),setupTypedArray("Int32Array","WebGLIntArray"),setupTypedArray("Uint16Array","WebGLUnsignedShortArray"),setupTypedArray("Uint8Array","WebGLUnsignedByteArray"),DSP.invert=function(t){for(var e=0,s=t.length;e<s;e++)t[e]*=-1;return t},DSP.interleave=function(t,e){if(t.length!==e.length)throw"Can not interleave. Channel lengths differ.";for(var s=new Float32Array(2*t.length),i=0,a=t.length;i<a;i++)s[2*i]=t[i],s[2*i+1]=e[i];return s},DSP.deinterleave=function(){var t,e,s,i=[];return i[DSP.MIX]=function(t){for(var e=0,i=t.length/2;e<i;e++)s[e]=(t[2*e]+t[2*e+1])/2;return s},i[DSP.LEFT]=function(e){for(var s=0,i=e.length/2;s<i;s++)t[s]=e[2*s];return t},i[DSP.RIGHT]=function(t){for(var s=0,i=t.length/2;s<i;s++)e[s]=t[2*s+1];return e},function(a,h){return t=t||new Float32Array(h.length/2),e=e||new Float32Array(h.length/2),s=s||new Float32Array(h.length/2),h.length/2!==t.length&&(t=new Float32Array(h.length/2),e=new Float32Array(h.length/2),s=new Float32Array(h.length/2)),i[a](h)}}(),DSP.getChannel=DSP.deinterleave,DSP.mixSampleBuffers=function(t,e,s,i){for(var a=new Float32Array(t),h=0;h<t.length;h++)a[h]+=(s?-e[h]:e[h])/i;return a},DSP.LPF=0,DSP.HPF=1,DSP.BPF_CONSTANT_SKIRT=2,DSP.BPF_CONSTANT_PEAK=3,DSP.NOTCH=4,DSP.APF=5,DSP.PEAKING_EQ=6,DSP.LOW_SHELF=7,DSP.HIGH_SHELF=8,DSP.Q=1,DSP.BW=2,DSP.S=3,DSP.RMS=function(t){for(var e=0,s=0,i=t.length;s<i;s++)e+=t[s]*t[s];return Math.sqrt(e/i)},DSP.Peak=function(t){for(var e=0,s=0,i=t.length;s<i;s++)e=Math.abs(t[s])>e?Math.abs(t[s]):e;return e},DFT.prototype.forward=function(t){for(var e,s,i=this.real,a=this.imag,h=0;h<this.bufferSize/2;h++){e=0,s=0;for(var r=0;r<t.length;r++)e+=this.cosTable[h*r]*t[r],s+=this.sinTable[h*r]*t[r];i[h]=e,a[h]=s}return this.calculateSpectrum()},FFT.prototype.forward=function(t){var e=this.bufferSize,s=this.cosTable,i=this.sinTable,a=this.reverseTable,h=this.real,r=this.imag,n=Math.floor(Math.log(e)/Math.LN2);if(Math.pow(2,n)!==e)throw"Invalid buffer size, must be a power of 2.";if(e!==t.length)throw"Supplied buffer is not the same size as defined FFT. FFT Size: "+e+" Buffer Size: "+t.length;var l,o,u,c,p,f,d,y,S,m=1;for(S=0;S<e;S++)h[S]=t[a[S]],r[S]=0;for(;m<e;){l=s[m],o=i[m],u=1,c=0;for(var P=0;P<m;P++){for(S=P;S<e;)d=u*r[p=S+m]+c*h[p],h[p]=h[S]-(f=u*h[p]-c*r[p]),r[p]=r[S]-d,h[S]+=f,r[S]+=d,S+=m<<1;u=(y=u)*l-c*o,c=y*o+c*l}m<<=1}return this.calculateSpectrum()},FFT.prototype.inverse=function(t,e){var s=this.bufferSize,i=this.cosTable,a=this.sinTable,h=this.reverseTable;t=t||this.real,e=e||this.imag;var r,n,l,o,u,c,p,f,d,y=1;for(d=0;d<s;d++)e[d]*=-1;var S=new Float32Array(s),m=new Float32Array(s);for(d=0;d<t.length;d++)S[d]=t[h[d]],m[d]=e[h[d]];for(t=S,e=m;y<s;){r=i[y],n=a[y],l=1,o=0;for(var P=0;P<y;P++){for(d=P;d<s;)p=l*e[u=d+y]+o*t[u],t[u]=t[d]-(c=l*t[u]-o*e[u]),e[u]=e[d]-p,t[d]+=c,e[d]+=p,d+=y<<1;l=(f=l)*r-o*n,o=f*n+o*r}y<<=1}var b=new Float32Array(s);for(d=0;d<s;d++)b[d]=t[d]/s;return b},RFFT.prototype.forward=function(t,e){e=void 0!==e?e:0;var s,i,a,h,r,n,l,o,u,c,p,f,d,y,S,m,P,b,v,F,D,g,A,T,I,_,w=this.bufferSize,M=this.spectrum,R=this.trans,L=2*Math.PI,O=Math.sqrt,E=w>>>1,W=2/w;this.reverseBinPermute(R,t,e);for(var B=0,q=4;B<w;q*=4){for(var N=B;N<w;N+=q)P=R[N]-R[N+1],R[N]+=R[N+1],R[N+1]=P;B=2*(q-1)}for(s=2,h=w>>>1;h>>>=1;){B=0,q=(s<<=1)<<1,i=s>>>2,a=s>>>3;do{if(1!==i)for(N=B;N<w;N+=q)r=R[p=(c=(u=N)+i)+i]+R[f=p+i],R[f]-=R[p],R[p]=R[u]-r,R[u]+=r,u+=a,c+=a,n=R[p+=a]-R[f+=a],r=-(r=R[p]+R[f])*Math.SQRT1_2,n*=Math.SQRT1_2,R[f]=r+(P=R[c]),R[p]=r-P,R[c]=R[u]-n,R[u]+=n;else for(N=B;N<w;N+=q)r=R[p=(c=(u=N)+i)+i]+R[f=p+i],R[f]-=R[p],R[p]=R[u]-r,R[u]+=r;B=(q<<1)-s,q<<=2}while(B<w);g=L/s;for(var k=1;k<a;k++){A=k*g,v=Math.sin(A),F=4*(b=Math.cos(A))*(b*b-.75),D=4*v*(.75-v*v),B=0,q=s<<1;do{for(N=B;N<w;N+=q)r=R[S=(y=(d=N+i-k)+i)+i]*v+R[p=(c=(u=N+k)+i)+i]*b,l=R[m=S+i]*D+R[f=p+i]*F,P=(n=R[S]*b-R[p]*v)-(o=R[m]*F-R[f]*D),n+=o,o=P,R[m]=n+R[y],R[p]=n-R[y],P=l-r,r+=l,R[f]=(l=P)+R[c],R[S]=l-R[c],R[y]=R[u]-r,R[u]+=r,R[c]=o+R[d],R[d]-=o;B=(q<<1)-s,q<<=2}while(B<w)}}for(;--E;)(_=W*O((T=R[E])*T+(I=R[w-E-1])*I))>this.peak&&(this.peakBand=E,this.peak=_),M[E]=_;return M[0]=W*R[0],M},Sampler.prototype.applyEnvelope=function(){return this.envelope.process(this.signal),this.signal},Sampler.prototype.generate=function(){for(var t=this.playEnd*this.samples.length-this.playStart*this.samples.length,e=this.playStart*this.samples.length,s=this.playEnd*this.samples.length,i=0;i<this.bufferSize;i++){switch(this.loopMode){case DSP.OFF:this.playhead=Math.round(this.samplesProcessed*this.step+e),this.signal[i]=this.playhead<this.playEnd*this.samples.length?this.samples[this.playhead]*this.amplitude:0;break;case DSP.FW:this.playhead=Math.round(this.samplesProcessed*this.step%t+e),this.playhead<this.playEnd*this.samples.length&&(this.signal[i]=this.samples[this.playhead]*this.amplitude);break;case DSP.BW:this.playhead=s-Math.round(this.samplesProcessed*this.step%t),this.playhead<this.playEnd*this.samples.length&&(this.signal[i]=this.samples[this.playhead]*this.amplitude);break;case DSP.FWBW:this.playhead=Math.floor(this.samplesProcessed*this.step/t)%2==0?Math.round(this.samplesProcessed*this.step%t+e):s-Math.round(this.samplesProcessed*this.step%t),this.playhead<this.playEnd*this.samples.length&&(this.signal[i]=this.samples[this.playhead]*this.amplitude)}this.samplesProcessed++}return this.frameCount++,this.signal},Sampler.prototype.setFreq=function(t){var e=this.samplesProcessed*this.step;this.frequency=t,this.step=this.frequency/this.rootFrequency,this.samplesProcessed=Math.round(e/this.step)},Sampler.prototype.reset=function(){this.samplesProcessed=0,this.playhead=0},Oscillator.prototype.setAmp=function(t){if(!(t>=0&&t<=1))throw"Amplitude out of range (0..1).";this.amplitude=t},Oscillator.prototype.setFreq=function(t){this.frequency=t,this.cyclesPerSample=t/this.sampleRate},Oscillator.prototype.add=function(t){for(var e=0;e<this.bufferSize;e++)this.signal[e]+=t.signal[e];return this.signal},Oscillator.prototype.addSignal=function(t){for(var e=0;e<t.length&&!(e>=this.bufferSize);e++)this.signal[e]+=t[e];return this.signal},Oscillator.prototype.addEnvelope=function(t){this.envelope=t},Oscillator.prototype.applyEnvelope=function(){this.envelope.process(this.signal)},Oscillator.prototype.valueAt=function(t){return this.waveTable[t%this.waveTableLength]},Oscillator.prototype.generate=function(){for(var t,e=this.frameCount*this.bufferSize,s=this.waveTableLength*this.frequency/this.sampleRate,i=0;i<this.bufferSize;i++)t=Math.round((e+i)*s),this.signal[i]=this.waveTable[t%this.waveTableLength]*this.amplitude;return this.frameCount++,this.signal},Oscillator.Sine=function(t){return Math.sin(DSP.TWO_PI*t)},Oscillator.Square=function(t){return t<.5?1:-1},Oscillator.Saw=function(t){return 2*(t-Math.round(t))},Oscillator.Triangle=function(t){return 1-4*Math.abs(Math.round(t)-t)},Oscillator.Pulse=function(t){},ADSR.prototype.noteOn=function(){this.samplesProcessed=0,this.sustainSamples=this.sustainLength*this.sampleRate,this.update()},ADSR.prototype.noteOff=function(){this.sustainSamples=this.samplesProcessed-this.decaySamples,this.update()},ADSR.prototype.processSample=function(t){var e=0;return this.samplesProcessed<=this.attack?e=0+(this.samplesProcessed-0)/(this.attack-0)*1:this.samplesProcessed>this.attack&&this.samplesProcessed<=this.decay?e=1+(this.samplesProcessed-this.attack)/(this.decay-this.attack)*(this.sustainLevel-1):this.samplesProcessed>this.decay&&this.samplesProcessed<=this.sustain?e=this.sustainLevel:this.samplesProcessed>this.sustain&&this.samplesProcessed<=this.release&&(e=this.sustainLevel+(this.samplesProcessed-this.sustain)/(this.release-this.sustain)*(0-this.sustainLevel)),t*e},ADSR.prototype.value=function(){var t=0;return this.samplesProcessed<=this.attack?t=0+(this.samplesProcessed-0)/(this.attack-0)*1:this.samplesProcessed>this.attack&&this.samplesProcessed<=this.decay?t=1+(this.samplesProcessed-this.attack)/(this.decay-this.attack)*(this.sustainLevel-1):this.samplesProcessed>this.decay&&this.samplesProcessed<=this.sustain?t=this.sustainLevel:this.samplesProcessed>this.sustain&&this.samplesProcessed<=this.release&&(t=this.sustainLevel+(this.samplesProcessed-this.sustain)/(this.release-this.sustain)*(0-this.sustainLevel)),t},ADSR.prototype.process=function(t){for(var e=0;e<t.length;e++)t[e]*=this.value(),this.samplesProcessed++;return t},ADSR.prototype.isActive=function(){return!(this.samplesProcessed>this.release||-1===this.samplesProcessed)},ADSR.prototype.disable=function(){this.samplesProcessed=-1},IIRFilter.prototype.__defineGetter__("cutoff",(function(){return this.func.cutoff})),IIRFilter.prototype.__defineGetter__("resonance",(function(){return this.func.resonance})),IIRFilter.prototype.set=function(t,e){this.func.calcCoeff(t,e)},IIRFilter.prototype.process=function(t){this.func.process(t)},IIRFilter.prototype.addEnvelope=function(t){if(!(t instanceof ADSR))throw"Not an envelope.";this.func.addEnvelope(t)},IIRFilter.LP12=function(t,e,s){this.sampleRate=s,this.vibraPos=0,this.vibraSpeed=0,this.envelope=!1,this.calcCoeff=function(t,e){this.w=2*Math.PI*t/this.sampleRate,this.q=1-this.w/(2*(e+.5/(1+this.w))+this.w-2),this.r=this.q*this.q,this.c=this.r+1-2*Math.cos(this.w)*this.q,this.cutoff=t,this.resonance=e},this.calcCoeff(t,e),this.process=function(t){for(var e=0;e<t.length;e++)this.vibraSpeed+=(t[e]-this.vibraPos)*this.c,this.vibraPos+=this.vibraSpeed,this.vibraSpeed*=this.r,this.envelope?(t[e]=t[e]*(1-this.envelope.value())+this.vibraPos*this.envelope.value(),this.envelope.samplesProcessed++):t[e]=this.vibraPos}},IIRFilter.LP12.prototype.addEnvelope=function(t){this.envelope=t},IIRFilter2.prototype.process=function(t){for(var e,s,i=this.f,a=0;a<t.length;a++)i[3]=(e=t[a])-this.damp*i[2],i[0]=i[0]+this.freq*i[2],i[1]=i[3]-i[0],i[2]=this.freq*i[1]+i[2],s=.5*i[this.type],i[3]=e-this.damp*i[2],i[0]=i[0]+this.freq*i[2],i[1]=i[3]-i[0],i[2]=this.freq*i[1]+i[2],s+=.5*i[this.type],this.envelope?(t[a]=t[a]*(1-this.envelope.value())+s*this.envelope.value(),this.envelope.samplesProcessed++):t[a]=s},IIRFilter2.prototype.addEnvelope=function(t){if(!(t instanceof ADSR))throw"This is not an envelope.";this.envelope=t},IIRFilter2.prototype.set=function(t,e){this.calcCoeff(t,e)},WindowFunction.prototype.process=function(t,e,s){s=void 0!==s?s:t.length;for(var i=e=void 0!==e?e:0;i<s;i++)t[i]*=this.func(s,i,this.alpha);return t},WindowFunction.Bartlett=function(t,e){return 2/(t-1)*((t-1)/2-Math.abs(e-(t-1)/2))},WindowFunction.BartlettHann=function(t,e){return.62-.48*Math.abs(e/(t-1)-.5)-.38*Math.cos(DSP.TWO_PI*e/(t-1))},WindowFunction.Blackman=function(t,e,s){var i=s/2;return(1-s)/2-.5*Math.cos(DSP.TWO_PI*e/(t-1))+i*Math.cos(4*Math.PI*e/(t-1))},WindowFunction.Cosine=function(t,e){return Math.cos(Math.PI*e/(t-1)-Math.PI/2)},WindowFunction.Gauss=function(t,e,s){return Math.pow(Math.E,-.5*Math.pow((e-(t-1)/2)/(s*(t-1)/2),2))},WindowFunction.Hamming=function(t,e){return.54-.46*Math.cos(DSP.TWO_PI*e/(t-1))},WindowFunction.Hann=function(t,e){return.5*(1-Math.cos(DSP.TWO_PI*e/(t-1)))},WindowFunction.Lanczos=function(t,e){var s=2*e/(t-1)-1;return Math.sin(Math.PI*s)/(Math.PI*s)},WindowFunction.Rectangular=function(t,e){return 1},WindowFunction.Triangular=function(t,e){return 2/t*(t/2-Math.abs(e-(t-1)/2))},DSP.mag2db=function(t){for(var e=Math.pow(10,-6),s=Math.log,i=Math.max,a=Float32Array(t.length),h=0;h<t.length;h++)a[h]=20*s(i(t[h],e));return a},DSP.freqz=function(t,e,s){var i,a;if(!s)for(s=Float32Array(200),i=0;i<s.length;i++)s[i]=DSP.TWO_PI/s.length*i-Math.PI;var h=Float32Array(s.length),r=Math.sqrt,n=Math.cos,l=Math.sin;for(i=0;i<s.length;i++){var o={real:0,imag:0};for(a=0;a<t.length;a++)o.real+=t[a]*n(-a*s[i]),o.imag+=t[a]*l(-a*s[i]);var u={real:0,imag:0};for(a=0;a<e.length;a++)u.real+=e[a]*n(-a*s[i]),u.imag+=e[a]*l(-a*s[i]);h[i]=r(o.real*o.real+o.imag*o.imag)/r(u.real*u.real+u.imag*u.imag)}return h},MultiDelay.prototype.setDelayInSamples=function(t){this.delayInSamples=t,this.delayInputPointer=this.delayOutputPointer+t,this.delayInputPointer>=this.delayBufferSamples.length-1&&(this.delayInputPointer=this.delayInputPointer-this.delayBufferSamples.length)},MultiDelay.prototype.setMasterVolume=function(t){this.masterVolume=t},MultiDelay.prototype.setDelayVolume=function(t){this.delayVolume=t},MultiDelay.prototype.process=function(t){for(var e=new Float32Array(t.length),s=0;s<t.length;s++){var i=(null===this.delayBufferSamples[this.delayOutputPointer]?0:this.delayBufferSamples[this.delayOutputPointer])*this.delayVolume+t[s];this.delayBufferSamples[this.delayInputPointer]=i,e[s]=i*this.masterVolume,this.delayInputPointer++,this.delayInputPointer>=this.delayBufferSamples.length-1&&(this.delayInputPointer=0),this.delayOutputPointer++,this.delayOutputPointer>=this.delayBufferSamples.length-1&&(this.delayOutputPointer=0)}return e},SingleDelay.prototype.setDelayInSamples=function(t){this.delayInSamples=t,this.delayInputPointer=this.delayOutputPointer+t,this.delayInputPointer>=this.delayBufferSamples.length-1&&(this.delayInputPointer=this.delayInputPointer-this.delayBufferSamples.length)},SingleDelay.prototype.setDelayVolume=function(t){this.delayVolume=t},SingleDelay.prototype.process=function(t){for(var e=new Float32Array(t.length),s=0;s<t.length;s++)this.delayBufferSamples[this.delayInputPointer]=t[s],e[s]=this.delayBufferSamples[this.delayOutputPointer]*this.delayVolume,this.delayInputPointer++,this.delayInputPointer>=this.delayBufferSamples.length-1&&(this.delayInputPointer=0),this.delayOutputPointer++,this.delayOutputPointer>=this.delayBufferSamples.length-1&&(this.delayOutputPointer=0);return e},Reverb.prototype.setDelayInSamples=function(t){var e,s;for(this.delayInSamples=t,e=0;e<this.NR_OF_SINGLEDELAYS;e++)s=1+e/7,this.singleDelays[e].setDelayInSamples(Math.round(this.delayInSamples*s));for(e=0;e<this.NR_OF_MULTIDELAYS;e++)s=1+e/10,this.multiDelays[e].setDelayInSamples(Math.round(this.delayInSamples*s))},Reverb.prototype.setMasterVolume=function(t){this.masterVolume=t},Reverb.prototype.setMixVolume=function(t){this.mixVolume=t},Reverb.prototype.setDelayVolume=function(t){var e;for(this.delayVolume=t,e=0;e<this.NR_OF_SINGLEDELAYS;e++)this.singleDelays[e].setDelayVolume(this.delayVolume);for(e=0;e<this.NR_OF_MULTIDELAYS;e++)this.multiDelays[e].setDelayVolume(this.delayVolume)},Reverb.prototype.setDampFrequency=function(t){this.dampFrequency=t,this.LOWPASSL.set(t,0),this.LOWPASSR.set(t,0)},Reverb.prototype.process=function(t){var e=new Float32Array(t.length),s=DSP.deinterleave(t);this.LOWPASSL.process(s[DSP.LEFT]),this.LOWPASSR.process(s[DSP.RIGHT]);var i,a=DSP.interleave(s[DSP.LEFT],s[DSP.RIGHT]);for(i=0;i<this.NR_OF_MULTIDELAYS;i++)e=DSP.mixSampleBuffers(e,this.multiDelays[i].process(a),2%i==0,this.NR_OF_MULTIDELAYS);var h=new Float32Array(e.length);for(i=0;i<this.NR_OF_SINGLEDELAYS;i++)h=DSP.mixSampleBuffers(h,this.singleDelays[i].process(e),2%i==0,1);for(i=0;i<h.length;i++)h[i]*=this.mixVolume;for(e=DSP.mixSampleBuffers(h,t,0,1),i=0;i<e.length;i++)e[i]*=this.masterVolume;return e},"undefined"!=typeof module&&void 0!==module.exports&&(module.exports={DSP:DSP,DFT:DFT,FFT:FFT,RFFT:RFFT,Sampler:Sampler,Oscillator:Oscillator,ADSR:ADSR,IIRFilter:IIRFilter,IIRFilter2:IIRFilter2,WindowFunction:WindowFunction,sinh:sinh,Biquad:Biquad,GraphicalEq:GraphicalEq,MultiDelay:MultiDelay,SingleDelay:SingleDelay,Reverb:Reverb});