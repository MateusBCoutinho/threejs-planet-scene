var IS=Object.defineProperty,CS=Object.defineProperties;var RS=Object.getOwnPropertyDescriptors;var Bc=Object.getOwnPropertySymbols;var H0=Object.prototype.hasOwnProperty,z0=Object.prototype.propertyIsEnumerable;var V0=(n,e,t)=>e in n?IS(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Nt=(n,e)=>{for(var t in e||={})H0.call(e,t)&&V0(n,t,e[t]);if(Bc)for(var t of Bc(e))z0.call(e,t)&&V0(n,t,e[t]);return n},Sn=(n,e)=>CS(n,RS(e));var G0=(n,e)=>{var t={};for(var i in n)H0.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&Bc)for(var i of Bc(n))e.indexOf(i)<0&&z0.call(n,i)&&(t[i]=n[i]);return t};var Jt=null,Vc=!1,Ff=1,DS=null,pi=Symbol("SIGNAL");function et(n){let e=Jt;return Jt=n,e}function Hc(){return Jt}var zc={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function j0(n){if(Vc)throw new Error("");if(Jt===null)return;Jt.consumerOnSignalRead(n);let e=Jt.producersTail;if(e!==void 0&&e.producer===n)return;let t,i=Jt.recomputing;if(i&&(t=e!==void 0?e.nextProducer:Jt.producers,t!==void 0&&t.producer===n)){Jt.producersTail=t,t.lastReadVersion=n.version;return}let r=n.consumersTail;if(r!==void 0&&r.consumer===Jt&&(!i||PS(r,Jt)))return;let s=Ls(Jt),o={producer:n,consumer:Jt,nextProducer:t,prevConsumer:r,lastReadVersion:n.version,nextConsumer:void 0};Jt.producersTail=o,e!==void 0?e.nextProducer=o:Jt.producers=o,s&&Z0(n,o)}function W0(){Ff++}function $0(n){if(!(Ls(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===Ff)){if(!n.producerMustRecompute(n)&&!Vf(n)){Of(n);return}n.producerRecomputeValue(n),Of(n)}}function kf(n){if(n.consumers===void 0)return;let e=Vc;Vc=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||NS(i)}}finally{Vc=e}}function Uf(){return Jt?.consumerAllowSignalWrites!==!1}function NS(n){n.dirty=!0,kf(n),n.consumerMarkedDirty?.(n)}function Of(n){n.dirty=!1,n.lastCleanEpoch=Ff}function Bf(n){return n&&q0(n),et(n)}function q0(n){n.producersTail=void 0,n.recomputing=!0}function X0(n,e){et(e),n&&Y0(n)}function Y0(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(Ls(n))do t=Hf(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function Vf(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,i=e.lastReadVersion;if(i!==t.version||($0(t),i!==t.version))return!0}return!1}function Gc(n){if(Ls(n)){let e=n.producers;for(;e!==void 0;)e=Hf(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function Z0(n,e){let t=n.consumersTail,i=Ls(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)Z0(r.producer,r)}function Hf(n){let e=n.producer,t=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:e.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(e.consumers=i,!Ls(e)){let s=e.producers;for(;s!==void 0;)s=Hf(s)}return t}function Ls(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function K0(n){DS?.(n)}function PS(n,e){let t=e.producersTail;if(t!==void 0){let i=e.producers;do{if(i===n)return!0;if(i===t)break;i=i.nextProducer}while(i!==void 0)}return!1}function J0(n,e){return Object.is(n,e)}function LS(){throw new Error}var Q0=LS;function ey(n){Q0(n)}function zf(n){Q0=n}var OS=null;function Gf(n,e){let t=Object.create(iy);t.value=n,e!==void 0&&(t.equal=e);let i=()=>ty(t);return i[pi]=t,K0(t),[i,o=>jf(t,o),o=>ny(t,o)]}function ty(n){return j0(n),n.value}function jf(n,e){Uf()||ey(n),n.equal(n.value,e)||(n.value=e,FS(n))}function ny(n,e){Uf()||ey(n),jf(n,e(n.value))}var iy=Sn(Nt({},zc),{equal:J0,value:void 0,kind:"signal"});function FS(n){n.version++,W0(),kf(n),OS?.(n)}function rt(n){return typeof n=="function"}function jc(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var Wc=jc(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Xo(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var ln=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(rt(i))try{i()}catch(s){e=s instanceof Wc?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{ry(s)}catch(o){e=e??[],o instanceof Wc?e=[...e,...o.errors]:e.push(o)}}if(e)throw new Wc(e)}}add(e){var t;if(e&&e!==this)if(this.closed)ry(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&Xo(t,e)}remove(e){let{_finalizers:t}=this;t&&Xo(t,e),e instanceof n&&e._removeParent(this)}};ln.EMPTY=(()=>{let n=new ln;return n.closed=!0,n})();var Wf=ln.EMPTY;function $c(n){return n instanceof ln||n&&"closed"in n&&rt(n.remove)&&rt(n.add)&&rt(n.unsubscribe)}function ry(n){rt(n)?n():n.unsubscribe()}var Kn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Os={setTimeout(n,e,...t){let{delegate:i}=Os;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=Os;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function qc(n){Os.setTimeout(()=>{let{onUnhandledError:e}=Kn;if(e)e(n);else throw n})}function $f(){}var sy=qf("C",void 0,void 0);function oy(n){return qf("E",void 0,n)}function ay(n){return qf("N",n,void 0)}function qf(n,e,t){return{kind:n,value:e,error:t}}var Ur=null;function Fs(n){if(Kn.useDeprecatedSynchronousErrorHandling){let e=!Ur;if(e&&(Ur={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=Ur;if(Ur=null,t)throw i}}else n()}function cy(n){Kn.useDeprecatedSynchronousErrorHandling&&Ur&&(Ur.errorThrown=!0,Ur.error=n)}var Br=class extends ln{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,$c(e)&&e.add(this)):this.destination=BS}static create(e,t,i){return new ks(e,t,i)}next(e){this.isStopped?Yf(ay(e),this):this._next(e)}error(e){this.isStopped?Yf(oy(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?Yf(sy,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},kS=Function.prototype.bind;function Xf(n,e){return kS.call(n,e)}var Zf=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){Xc(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){Xc(i)}else Xc(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){Xc(t)}}},ks=class extends Br{constructor(e,t,i){super();let r;if(rt(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&Kn.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&Xf(e.next,s),error:e.error&&Xf(e.error,s),complete:e.complete&&Xf(e.complete,s)}):r=e}this.destination=new Zf(r)}};function Xc(n){Kn.useDeprecatedSynchronousErrorHandling?cy(n):qc(n)}function US(n){throw n}function Yf(n,e){let{onStoppedNotification:t}=Kn;t&&Os.setTimeout(()=>t(n,e))}var BS={closed:!0,next:$f,error:US,complete:$f};var Us=typeof Symbol=="function"&&Symbol.observable||"@@observable";function ly(n){return n}function uy(n){return n.length===0?ly:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var Ht=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let s=HS(t)?t:new ks(t,i,r);return Fs(()=>{let{operator:o,source:a}=this;s.add(o?o.call(s,a):a?this._subscribe(s):this._trySubscribe(s))}),s}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=dy(i),new i((r,s)=>{let o=new ks({next:a=>{try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});this.subscribe(o)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[Us](){return this}pipe(...t){return uy(t)(this)}toPromise(t){return t=dy(t),new t((i,r)=>{let s;this.subscribe(o=>s=o,o=>r(o),()=>i(s))})}}return n.create=e=>new n(e),n})();function dy(n){var e;return(e=n??Kn.Promise)!==null&&e!==void 0?e:Promise}function VS(n){return n&&rt(n.next)&&rt(n.error)&&rt(n.complete)}function HS(n){return n&&n instanceof Br||VS(n)&&$c(n)}function zS(n){return rt(n?.lift)}function Bs(n){return e=>{if(zS(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function Yc(n,e,t,i,r){return new Kf(n,e,t,i,r)}var Kf=class extends Br{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var fy=jc(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var Fi=(()=>{class n extends Ht{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new Zc(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new fy}next(t){Fs(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){Fs(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){Fs(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:s}=this;return i||r?Wf:(this.currentObservers=null,s.push(t),new ln(()=>{this.currentObservers=null,Xo(s,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:s}=this;i?t.error(r):s&&t.complete()}asObservable(){let t=new Ht;return t.source=this,t}}return n.create=(e,t)=>new Zc(e,t),n})(),Zc=class extends Fi{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:Wf}};var Yo=class extends Fi{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};function hy(n){return n&&rt(n.schedule)}function GS(n){return n[n.length-1]}function py(n){return hy(GS(n))?n.pop():void 0}function gy(n,e,t,i){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(d){o(d)}}function c(u){try{l(i.throw(u))}catch(d){o(d)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(n,e||[])).next())})}function my(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Vr(n){return this instanceof Vr?(this.v=n,this):new Vr(n)}function yy(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(h){return function(m){return Promise.resolve(m).then(h,d)}}function a(h,m){i[h]&&(r[h]=function(y){return new Promise(function(g,p){s.push([h,y,g,p])>1||c(h,y)})},m&&(r[h]=m(r[h])))}function c(h,m){try{l(i[h](m))}catch(y){f(s[0][3],y)}}function l(h){h.value instanceof Vr?Promise.resolve(h.value.v).then(u,d):f(s[0][2],h)}function u(h){c("next",h)}function d(h){c("throw",h)}function f(h,m){h(m),s.shift(),s.length&&c(s[0][0],s[0][1])}}function xy(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof my=="function"?my(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(s){t[s]=n[s]&&function(o){return new Promise(function(a,c){o=n[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var Kc=n=>n&&typeof n.length=="number"&&typeof n!="function";function Jc(n){return rt(n?.then)}function Qc(n){return rt(n[Us])}function el(n){return Symbol.asyncIterator&&rt(n?.[Symbol.asyncIterator])}function tl(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function jS(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var nl=jS();function il(n){return rt(n?.[nl])}function rl(n){return yy(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield Vr(t.read());if(r)return yield Vr(void 0);yield yield Vr(i)}}finally{t.releaseLock()}})}function sl(n){return rt(n?.getReader)}function Vs(n){if(n instanceof Ht)return n;if(n!=null){if(Qc(n))return WS(n);if(Kc(n))return $S(n);if(Jc(n))return qS(n);if(el(n))return vy(n);if(il(n))return XS(n);if(sl(n))return YS(n)}throw tl(n)}function WS(n){return new Ht(e=>{let t=n[Us]();if(rt(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function $S(n){return new Ht(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function qS(n){return new Ht(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,qc)})}function XS(n){return new Ht(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function vy(n){return new Ht(e=>{ZS(n,e).catch(t=>e.error(t))})}function YS(n){return vy(rl(n))}function ZS(n,e){var t,i,r,s;return gy(this,void 0,void 0,function*(){try{for(t=xy(n);i=yield t.next(),!i.done;){let o=i.value;if(e.next(o),e.closed)return}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=t.return)&&(yield s.call(t))}finally{if(r)throw r.error}}e.complete()})}function mi(n,e,t,i=0,r=!1){let s=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(s),!r)return s}function ol(n,e=0){return Bs((t,i)=>{t.subscribe(Yc(i,r=>mi(i,n,()=>i.next(r),e),()=>mi(i,n,()=>i.complete(),e),r=>mi(i,n,()=>i.error(r),e)))})}function al(n,e=0){return Bs((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function _y(n,e){return Vs(n).pipe(al(e),ol(e))}function by(n,e){return Vs(n).pipe(al(e),ol(e))}function Ey(n,e){return new Ht(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function My(n,e){return new Ht(t=>{let i;return mi(t,e,()=>{i=n[nl](),mi(t,e,()=>{let r,s;try{({value:r,done:s}=i.next())}catch(o){t.error(o);return}s?t.complete():t.next(r)},0,!0)}),()=>rt(i?.return)&&i.return()})}function cl(n,e){if(!n)throw new Error("Iterable cannot be null");return new Ht(t=>{mi(t,e,()=>{let i=n[Symbol.asyncIterator]();mi(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function Sy(n,e){return cl(rl(n),e)}function Ty(n,e){if(n!=null){if(Qc(n))return _y(n,e);if(Kc(n))return Ey(n,e);if(Jc(n))return by(n,e);if(el(n))return cl(n,e);if(il(n))return My(n,e);if(sl(n))return Sy(n,e)}throw tl(n)}function wy(n,e){return e?Ty(n,e):Vs(n)}function Jf(...n){let e=py(n);return wy(n,e)}function Qf(n,e){return Bs((t,i)=>{let r=0;t.subscribe(Yc(i,s=>{i.next(n.call(e,s,r++))}))})}var eh;function ll(){return eh}function gi(n){let e=eh;return eh=n,e}var Ay=Symbol("NotFound");function Hs(n){return n===Ay||n?.name==="\u0275NotFound"}var Ge=class extends Error{code;constructor(e,t){super(js(e,t)),this.code=e}};function tT(n){return`NG0${Math.abs(n)}`}function js(n,e){return`${tT(n)}${e?": "+e:""}`}function ft(n){for(let e in n)if(n[e]===ft)return e;throw Error("")}function zr(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(zr).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function gh(n,e){return n?e?`${n} ${e}`:n:e||""}var nT=ft({__forward_ref__:ft});function ml(n){return n.__forward_ref__=ml,n.toString=function(){return zr(this())},n}function wn(n){return Ny(n)?n():n}function Ny(n){return typeof n=="function"&&n.hasOwnProperty(nT)&&n.__forward_ref__===ml}function Mt(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function gl(n){return iT(n,yl)}function iT(n,e){return n.hasOwnProperty(e)&&n[e]||null}function rT(n){let e=n?.[yl]??null;return e||null}function nh(n){return n&&n.hasOwnProperty(dl)?n[dl]:null}var yl=ft({\u0275prov:ft}),dl=ft({\u0275inj:ft}),Fe=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=Mt({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function yh(n){return n&&!!n.\u0275providers}var xh=ft({\u0275cmp:ft}),vh=ft({\u0275dir:ft}),_h=ft({\u0275pipe:ft});var ih=ft({\u0275fac:ft}),$r=ft({__NG_ELEMENT_ID__:ft}),Iy=ft({__NG_ENV_ID__:ft});function Py(n){return typeof n=="string"?n:n==null?"":String(n)}function Ly(n){return typeof n=="function"?n.name||n.toString():typeof n=="object"&&n!=null&&typeof n.type=="function"?n.type.name||n.type.toString():Py(n)}var Oy=ft({ngErrorCode:ft}),sT=ft({ngErrorMessage:ft}),oT=ft({ngTokenPath:ft});function bh(n,e){return Fy("",-200,e)}function xl(n,e){throw new Ge(-201,!1)}function Fy(n,e,t){let i=new Ge(e,n);return i[Oy]=e,i[sT]=n,t&&(i[oT]=t),i}function aT(n){return n[Oy]}var rh;function ky(){return rh}function Tn(n){let e=rh;return rh=n,e}function Eh(n,e,t){let i=gl(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(e!==void 0)return e;xl(n,"Injector")}var cT={},Hr=cT,lT="__NG_DI_FLAG__",sh=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=Gr(t)||0;try{return this.injector.get(e,i&8?null:Hr,i)}catch(r){if(Hs(r))return r;throw r}}};function uT(n,e=0){let t=ll();if(t===void 0)throw new Ge(-203,!1);if(t===null)return Eh(n,void 0,e);{let i=dT(e),r=t.retrieve(n,i);if(Hs(r)){if(i.optional)return null;throw r}return r}}function ht(n,e=0){return(ky()||uT)(wn(n),e)}function ge(n,e){return ht(n,Gr(e))}function Gr(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function dT(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function oh(n){let e=[];for(let t=0;t<n.length;t++){let i=wn(n[t]);if(Array.isArray(i)){if(i.length===0)throw new Ge(900,!1);let r,s=0;for(let o=0;o<i.length;o++){let a=i[o],c=fT(a);typeof c=="number"?c===-1?r=a.token:s|=c:r=a}e.push(ht(r,s))}else e.push(ht(i))}return e}function fT(n){return n[lT]}function Gs(n,e){let t=n.hasOwnProperty(ih);return t?n[ih]:null}function Uy(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function By(n){return n.flat(Number.POSITIVE_INFINITY)}function vl(n,e){n.forEach(t=>Array.isArray(t)?vl(t,e):e(t))}function Mh(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function ea(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}var qr={},jr=[],Bi=new Fe(""),Sh=new Fe("",-1),Th=new Fe(""),Ko=class{get(e,t=Hr){if(t===Hr){let r=Fy("",-201);throw r.name="\u0275NotFound",r}return t}};function cr(n){return n[xh]||null}function _l(n){return n[vh]||null}function wh(n){return n[_h]||null}function lr(n){return{\u0275providers:n}}function Vy(n){return lr([{provide:Bi,multi:!0,useValue:n}])}function Hy(...n){return{\u0275providers:bl(!0,n),\u0275fromNgModule:!0}}function bl(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return vl(e,o=>{let a=o;fl(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&zy(r,s),t}function zy(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];Ah(r,s=>{e(s,i)})}}function fl(n,e,t,i){if(n=wn(n),!n)return!1;let r=null,s=nh(n),o=!s&&cr(n);if(!s&&!o){let c=n.ngModule;if(s=nh(c),s)r=c;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let c=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let l of c)fl(l,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let l;try{vl(s.imports,u=>{fl(u,e,t,i)&&(l||=[],l.push(u))})}finally{}l!==void 0&&zy(l,e)}if(!a){let l=Gs(r)||(()=>new r);e({provide:r,useFactory:l,deps:jr},r),e({provide:Th,useValue:r,multi:!0},r),e({provide:Bi,useValue:()=>ht(r),multi:!0},r)}let c=s.providers;if(c!=null&&!a){let l=n;Ah(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function Ah(n,e){for(let t of n)yh(t)&&(t=t.\u0275providers),Array.isArray(t)?Ah(t,e):e(t)}var hT=ft({provide:String,useValue:ft});function Gy(n){return n!==null&&typeof n=="object"&&hT in n}function pT(n){return!!(n&&n.useExisting)}function mT(n){return!!(n&&n.useFactory)}function hl(n){return typeof n=="function"}var ta=new Fe(""),ul={},Cy={},th;function na(){return th===void 0&&(th=new Ko),th}var gn=class{},Wr=class extends gn{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,ch(e,o=>this.processProvider(o)),this.records.set(Sh,zs(void 0,this)),r.has("environment")&&this.records.set(gn,zs(void 0,this));let s=this.records.get(ta);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(Th,jr,{self:!0}))}retrieve(e,t){let i=Gr(t)||0;try{return this.get(e,Hr,i)}catch(r){if(Hs(r))return r;throw r}}destroy(){Zo(this),this._destroyed=!0;let e=et(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),et(e)}}onDestroy(e){return Zo(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){Zo(this);let t=gi(this),i=Tn(void 0),r;try{return e()}finally{gi(t),Tn(i)}}get(e,t=Hr,i){if(Zo(this),e.hasOwnProperty(Iy))return e[Iy](this);let r=Gr(i),s,o=gi(this),a=Tn(void 0);try{if(!(r&4)){let l=this.records.get(e);if(l===void 0){let u=_T(e)&&gl(e);u&&this.injectableDefInScope(u)?l=zs(ah(e),ul):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,r)}let c=r&2?na():this.parent;return t=r&8&&t===Hr?null:t,c.get(e,t)}catch(c){let l=aT(c);throw l===-200||l===-201?new Ge(l,null):c}finally{Tn(a),gi(o)}}resolveInjectorInitializers(){let e=et(null),t=gi(this),i=Tn(void 0),r;try{let s=this.get(Bi,jr,{self:!0});for(let o of s)o()}finally{gi(t),Tn(i),et(e)}}toString(){let e=[],t=this.records;for(let i of t.keys())e.push(zr(i));return`R3Injector[${e.join(", ")}]`}processProvider(e){e=wn(e);let t=hl(e)?e:wn(e&&e.provide),i=yT(e);if(!hl(e)&&e.multi===!0){let r=this.records.get(t);r||(r=zs(void 0,ul,!0),r.factory=()=>oh(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=et(null);try{if(t.value===Cy)throw bh(zr(e));return t.value===ul&&(t.value=Cy,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&vT(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{et(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=wn(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function ah(n){let e=gl(n),t=e!==null?e.factory:Gs(n);if(t!==null)return t;if(n instanceof Fe)throw new Ge(204,!1);if(n instanceof Function)return gT(n);throw new Ge(204,!1)}function gT(n){if(n.length>0)throw new Ge(204,!1);let t=rT(n);return t!==null?()=>t.factory(n):()=>new n}function yT(n){if(Gy(n))return zs(void 0,n.useValue);{let e=jy(n);return zs(e,ul)}}function jy(n,e,t){let i;if(hl(n)){let r=wn(n);return Gs(r)||ah(r)}else if(Gy(n))i=()=>wn(n.useValue);else if(mT(n))i=()=>n.useFactory(...oh(n.deps||[]));else if(pT(n))i=(r,s)=>ht(wn(n.useExisting),s!==void 0&&s&8?8:void 0);else{let r=wn(n&&(n.useClass||n.provide));if(xT(n))i=()=>new r(...oh(n.deps));else return Gs(r)||ah(r)}return i}function Zo(n){if(n.destroyed)throw new Ge(205,!1)}function zs(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function xT(n){return!!n.deps}function vT(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function _T(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function ch(n,e){for(let t of n)Array.isArray(t)?ch(t,e):t&&yh(t)?ch(t.\u0275providers,e):e(t)}function ia(n,e){let t;n instanceof Wr?(Zo(n),t=n):t=new sh(n);let i,r=gi(t),s=Tn(void 0);try{return e()}finally{gi(r),Tn(s)}}function Wy(){return ky()!==void 0||ll()!=null}var un=0,Ee=1,Be=2,Pt=3,Bn=4,Vn=5,An=6,ra=7,In=8,Hn=9,Vi=10,Lt=11,Ws=12,Ih=13,$s=14,Cn=15,ur=16,Xr=17,vi=18,sa=19,Ch=20,Ui=21,El=22,oa=23,Rn=24,Yr=25,aa=26,Ot=27,$y=1,Jn=6,_i=7,ca=8,Zr=9,en=10;function zn(n){return Array.isArray(n)&&typeof n[$y]=="object"}function Dn(n){return Array.isArray(n)&&n[$y]===!0}function Rh(n){return(n.flags&4)!==0}function qs(n){return n.componentOffset>-1}function Dh(n){return(n.flags&1)===1}function Kr(n){return!!n.template}function Jr(n){return(n[Be]&512)!==0}function dr(n){return(n[Be]&256)===256}var qy="svg",Xy="math";function Qn(n){for(;Array.isArray(n);)n=n[un];return n}function Hi(n,e){return Qn(e[n.index])}function la(n,e){return n.data[e]}function fr(n,e){let t=e[n];return zn(t)?t:t[un]}function Yy(n){return(n[Be]&4)===4}function Ml(n){return(n[Be]&128)===128}function Zy(n){return Dn(n[Pt])}function ua(n,e){return e==null?null:n[e]}function Nh(n){n[Xr]=0}function Ph(n){n[Be]&1024||(n[Be]|=1024,Ml(n)&&Xs(n))}function da(n){return!!(n[Be]&9216||n[Rn]?.dirty)}function Sl(n){n[Vi].changeDetectionScheduler?.notify(8),n[Be]&64&&(n[Be]|=1024),da(n)&&Xs(n)}function Xs(n){n[Vi].changeDetectionScheduler?.notify(0);let e=or(n);for(;e!==null&&!(e[Be]&8192||(e[Be]|=8192,!Ml(e)));)e=or(e)}function Lh(n,e){if(dr(n))throw new Ge(911,!1);n[Ui]===null&&(n[Ui]=[]),n[Ui].push(e)}function Ky(n,e){if(n[Ui]===null)return;let t=n[Ui].indexOf(e);t!==-1&&n[Ui].splice(t,1)}function or(n){let e=n[Pt];return Dn(e)?e[Pt]:e}function Jy(n){return n[ra]??=[]}function Qy(n){return n.cleanup??=[]}function ex(n,e,t,i){let r=Jy(e);r.push(t),n.firstCreatePass&&Qy(n).push(i,r.length-1)}var st={lFrame:fx(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var lh=!1;function tx(){return st.lFrame.elementDepthCount}function nx(){st.lFrame.elementDepthCount++}function Oh(){st.lFrame.elementDepthCount--}function ix(){return st.bindingsEnabled}function Fh(){return st.skipHydrationRootTNode!==null}function kh(n){return st.skipHydrationRootTNode===n}function rx(n){st.skipHydrationRootTNode=n}function Uh(){st.skipHydrationRootTNode=null}function tn(){return st.lFrame.lView}function Tl(){return st.lFrame.tView}function bi(){let n=Bh();for(;n!==null&&n.type===64;)n=n.parent;return n}function Bh(){return st.lFrame.currentTNode}function sx(){let n=st.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function wl(n,e){let t=st.lFrame;t.currentTNode=n,t.isParent=e}function Vh(){return st.lFrame.isParent}function ox(){st.lFrame.isParent=!1}function Hh(){return lh}function zh(n){let e=lh;return lh=n,e}function ax(n){return st.lFrame.bindingIndex=n}function cx(){return st.lFrame.inI18n}function lx(n,e){let t=st.lFrame;t.bindingIndex=t.bindingRootIndex=n,Al(e)}function ux(){return st.lFrame.currentDirectiveIndex}function Al(n){st.lFrame.currentDirectiveIndex=n}function Gh(){return st.lFrame.currentQueryIndex}function Il(n){st.lFrame.currentQueryIndex=n}function bT(n){let e=n[Ee];return e.type===2?e.declTNode:e.type===1?n[Vn]:null}function jh(n,e,t){if(t&4){let r=e,s=n;for(;r=r.parent,r===null&&!(t&1);)if(r=bT(s),r===null||(s=s[$s],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=st.lFrame=dx();return i.currentTNode=e,i.lView=n,!0}function Cl(n){let e=dx(),t=n[Ee];st.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function dx(){let n=st.lFrame,e=n===null?null:n.child;return e===null?fx(n):e}function fx(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function hx(){let n=st.lFrame;return st.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var Wh=hx;function Rl(){let n=hx();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function px(){return st.lFrame.selectedIndex}function hr(n){st.lFrame.selectedIndex=n}function $h(){return st.lFrame.currentNamespace}var mx=!0;function gx(){return mx}function zi(n){mx=n}function uh(n,e=null,t=null,i){let r=yx(n,e,t,i);return r.resolveInjectorInitializers(),r}function yx(n,e=null,t=null,i,r=new Set){let s=[t||jr,Hy(n)];return i=i||(typeof n=="object"?void 0:zr(n)),new Wr(s,e||na(),i||null,r)}var yi=class n{static THROW_IF_NOT_FOUND=Hr;static NULL=new Ko;static create(e,t){if(Array.isArray(e))return uh({name:""},t,e,"");{let i=e.name??"";return uh({name:i},e.parent,e.providers,i)}}static \u0275prov=Mt({token:n,providedIn:"any",factory:()=>ht(Sh)});static __NG_ELEMENT_ID__=-1},dn=new Fe(""),Qr=(()=>{class n{static __NG_ELEMENT_ID__=ET;static __NG_ENV_ID__=t=>t}return n})(),dh=class extends Qr{_lView;constructor(e){super(),this._lView=e}get destroyed(){return dr(this._lView)}onDestroy(e){let t=this._lView;return Lh(t,e),()=>Ky(t,e)}};function ET(){return new dh(tn())}var xx=!1,pr=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new Yo(!1);get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new Ht(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=Mt({token:n,providedIn:"root",factory:()=>new n})}return n})(),fh=class extends Fi{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,Wy()&&(this.destroyRef=ge(Qr,{optional:!0})??void 0,this.pendingTasks=ge(pr,{optional:!0})??void 0)}emit(e){let t=et(null);try{super.next(e)}finally{et(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),s=c.error?.bind(c),o=c.complete?.bind(c)}this.__isAsync&&(s=this.wrapInTimeout(s),r&&(r=this.wrapInTimeout(r)),o&&(o=this.wrapInTimeout(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof ln&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},ki=fh;function pl(...n){}function qh(n){let e,t;function i(){n=pl;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function Xh(n){return queueMicrotask(()=>n()),()=>{n=pl}}var Yh="isAngularZone",Jo=Yh+"_ID",MT=0,Qt=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new ki(!1);onMicrotaskEmpty=new ki(!1);onStable=new ki(!1);onError=new ki(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:s=xx}=e;if(typeof Zone>"u")throw new Ge(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&i,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,o.scheduleInRootZone=s,wT(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Yh)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new Ge(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new Ge(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,ST,pl,pl);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},ST={};function Zh(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function TT(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){qh(()=>{n.callbackScheduled=!1,hh(n),n.isCheckStableRunning=!0,Zh(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),hh(n)}function wT(n){let e=()=>{TT(n)},t=MT++;n._inner=n._inner.fork({name:"angular",properties:{[Yh]:!0,[Jo]:t,[Jo+t]:!0},onInvokeTask:(i,r,s,o,a,c)=>{if(AT(c))return i.invokeTask(s,o,a,c);try{return Ry(n),i.invokeTask(s,o,a,c)}finally{(n.shouldCoalesceEventChangeDetection&&o.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),Dy(n)}},onInvoke:(i,r,s,o,a,c,l)=>{try{return Ry(n),i.invoke(s,o,a,c,l)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!IT(c)&&e(),Dy(n)}},onHasTask:(i,r,s,o)=>{i.hasTask(s,o),r===s&&(o.change=="microTask"?(n._hasPendingMicrotasks=o.microTask,hh(n),Zh(n)):o.change=="macroTask"&&(n.hasPendingMacrotasks=o.macroTask))},onHandleError:(i,r,s,o)=>(i.handleError(s,o),n.runOutsideAngular(()=>n.onError.emit(o)),!1)})}function hh(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function Ry(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function Dy(n){n._nesting--,Zh(n)}var Qo=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new ki;onMicrotaskEmpty=new ki;onStable=new ki;onError=new ki;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function AT(n){return vx(n,"__ignore_ng_zone__")}function IT(n){return vx(n,"__scheduler_tick__")}function vx(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var xi=class{_console=console;handleError(e){this._console.error("ERROR",e)}},mr=new Fe("",{factory:()=>{let n=ge(Qt),e=ge(gn),t;return i=>{n.runOutsideAngular(()=>{e.destroyed&&!t?setTimeout(()=>{throw i}):(t??=e.get(xi),t.handleError(i))})}}}),_x={provide:Bi,useValue:()=>{let n=ge(xi,{optional:!0})},multi:!0},CT=new Fe("",{factory:()=>{let n=ge(dn).defaultView;if(!n)return;let e=ge(mr),t=s=>{e(s.reason),s.preventDefault()},i=s=>{s.error?e(s.error):e(new Error(s.message,{cause:s})),s.preventDefault()},r=()=>{n.addEventListener("unhandledrejection",t),n.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),ge(Qr).onDestroy(()=>{n.removeEventListener("error",i),n.removeEventListener("unhandledrejection",t)})}});function Kh(){return lr([Vy(()=>void ge(CT))])}function fa(n,e){let[t,i,r]=Gf(n,e?.equal),s=t,o=s[pi];return s.set=i,s.update=r,s.asReadonly=bx.bind(s),s}function bx(){let n=this[pi];if(n.readonlyFn===void 0){let e=()=>this();e[pi]=n,n.readonlyFn=e}return n.readonlyFn}var Dl=(()=>{class n{view;node;constructor(t,i){this.view=t,this.node=i}static __NG_ELEMENT_ID__=RT}return n})();function RT(){return new Dl(tn(),bi())}var ar=class{},ha=new Fe("",{factory:()=>!0});var Jh=new Fe(""),Nl=(()=>{class n{internalPendingTasks=ge(pr);scheduler=ge(ar);errorHandler=ge(mr);add(){let t=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(t)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(t))}}run(t){let i=this.add();t().catch(this.errorHandler).finally(i)}static \u0275prov=Mt({token:n,providedIn:"root",factory:()=>new n})}return n})(),Qh=(()=>{class n{static \u0275prov=Mt({token:n,providedIn:"root",factory:()=>new ph})}return n})(),ph=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||i.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,i]of this.queues)t===null?e||=this.flushQueue(i):e||=t.run(()=>this.flushQueue(i));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let i of e)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},mh=class{[pi];constructor(e){this[pi]=e}destroy(){this[pi].destroy()}};var Pl={JSACTION:"jsaction"};function Qx(n){return{toString:n}.toString()}function WT(n){return typeof n=="function"}function ev(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}var Vl=class{previousValue;currentValue;firstChange;constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}};function $T(n){return n.type.prototype.ngOnChanges&&(n.setInput=XT),qT}function qT(){let n=nv(this),e=n?.current;if(e){let t=n.previous;if(t===qr)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function XT(n,e,t,i,r){let s=this.declaredInputs[i],o=nv(n)||YT(n,{previous:qr,current:null}),a=o.current||(o.current={}),c=o.previous,l=c[s];a[s]=new Vl(l&&l.currentValue,t,c===qr),ev(n,e,r,t)}var tv="__ngSimpleChanges__";function nv(n){return n[tv]||null}function YT(n,e){return n[tv]=e}var Ex=[];var ot=function(n,e=null,t){for(let i=0;i<Ex.length;i++){let r=Ex[i];r(n,e,t)}},tt=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(tt||{});function ZT(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=$T(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function KT(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function Ll(n,e,t){iv(n,e,3,t)}function Ol(n,e,t,i){(n[Be]&3)===t&&iv(n,e,t,i)}function ep(n,e){let t=n[Be];(t&3)===e&&(t&=16383,t+=1,n[Be]=t)}function iv(n,e,t,i){let r=i!==void 0?n[Xr]&65535:0,s=i??-1,o=e.length-1,a=0;for(let c=r;c<o;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[Xr]+=65536),(a<s||s==-1)&&(JT(n,t,e,c),n[Xr]=(n[Xr]&4294901760)+c+2),c++}function Mx(n,e){ot(tt.LifecycleHookStart,n,e);let t=et(null);try{e.call(n)}finally{et(t),ot(tt.LifecycleHookEnd,n,e)}}function JT(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[Be]>>14<n[Xr]>>16&&(n[Be]&3)===e&&(n[Be]+=16384,Mx(a,s)):Mx(a,s)}var Zs=-1,ga=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function QT(n){return(n.flags&8)!==0}function ew(n){return(n.flags&16)!==0}function tw(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];iw(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function nw(n){return n===3||n===4||n===6}function iw(n){return n.charCodeAt(0)===64}function Ip(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?Sx(n,t,r,null,e[++i]):Sx(n,t,r,null,null))}}return n}function Sx(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){r!==null&&(n[s+1]=r);return}s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),r!==null&&n.splice(s++,0,r)}function rv(n){return n!==Zs}function Hl(n){return n&32767}function rw(n){return n>>16}function zl(n,e){let t=rw(n),i=e;for(;t>0;)i=i[$s],t--;return i}var ap=!0;function Tx(n){let e=ap;return ap=n,e}var sw=256,sv=sw-1,ov=5,ow=0,Ei={};function aw(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty($r)&&(i=t[$r]),i==null&&(i=t[$r]=ow++);let r=i&sv,s=1<<r;e.data[n+(r>>ov)]|=s}function av(n,e){let t=cv(n,e);if(t!==-1)return t;let i=e[Ee];i.firstCreatePass&&(n.injectorIndex=e.length,tp(i.data,n),tp(e,null),tp(i.blueprint,null));let r=Cp(n,e),s=n.injectorIndex;if(rv(r)){let o=Hl(r),a=zl(r,e),c=a[Ee].data;for(let l=0;l<8;l++)e[s+l]=a[o+l]|c[o+l]}return e[s+8]=r,s}function tp(n,e){n.push(0,0,0,0,0,0,0,0,e)}function cv(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function Cp(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=hv(r),i===null)return Zs;if(t++,r=r[$s],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return Zs}function cw(n,e,t){aw(n,e,t)}function lv(n,e,t){if(t&8||n!==void 0)return n;xl(e,"NodeInjector")}function uv(n,e,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=n[Hn],s=Tn(void 0);try{return r?r.get(e,i,t&8):Eh(e,i,t&8)}finally{Tn(s)}}return lv(i,e,t)}function dv(n,e,t,i=0,r){if(n!==null){if(e[Be]&2048&&!(i&2)){let o=fw(n,e,t,i,Ei);if(o!==Ei)return o}let s=fv(n,e,t,i,Ei);if(s!==Ei)return s}return uv(e,t,i,r)}function fv(n,e,t,i,r){let s=uw(t);if(typeof s=="function"){if(!jh(e,n,i))return i&1?lv(r,t,i):uv(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&8))xl(t);else return o}finally{Wh()}}else if(typeof s=="number"){let o=null,a=cv(n,e),c=Zs,l=i&1?e[Cn][Vn]:null;for((a===-1||i&4)&&(c=a===-1?Cp(n,e):e[a+8],c===Zs||!Ax(i,!1)?a=-1:(o=e[Ee],a=Hl(c),e=zl(c,e)));a!==-1;){let u=e[Ee];if(wx(s,a,u.data)){let d=lw(a,e,t,o,i,l);if(d!==Ei)return d}c=e[a+8],c!==Zs&&Ax(i,e[Ee].data[a+8]===l)&&wx(s,a,e)?(o=u,a=Hl(c),e=zl(c,e)):a=-1}}return r}function lw(n,e,t,i,r,s){let o=e[Ee],a=o.data[n+8],c=i==null?qs(a)&&ap:i!=o&&(a.type&3)!==0,l=r&1&&s===a,u=Fl(a,o,t,c,l);return u!==null?Gl(e,o,u,a,r):Ei}function Fl(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,c=n.directiveStart,l=n.directiveEnd,u=s>>20,d=i?a:a+u,f=r?a+u:l;for(let h=d;h<f;h++){let m=o[h];if(h<c&&t===m||h>=c&&m.type===t)return h}if(r){let h=o[c];if(h&&Kr(h)&&h.type===t)return c}return null}function Gl(n,e,t,i,r){let s=n[t],o=e.data;if(s instanceof ga){let a=s;if(a.resolving){let h=Ly(o[t]);throw bh(h)}let c=Tx(a.canSeeViewProviders);a.resolving=!0;let l=o[t].type||o[t],u,d=a.injectImpl?Tn(a.injectImpl):null,f=jh(n,i,0);try{s=n[t]=a.factory(void 0,r,o,n,i),e.firstCreatePass&&t>=i.directiveStart&&ZT(t,o[t],e)}finally{d!==null&&Tn(d),Tx(c),a.resolving=!1,Wh()}}return s}function uw(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty($r)?n[$r]:void 0;return typeof e=="number"?e>=0?e&sv:dw:e}function wx(n,e,t){let i=1<<n;return!!(t[e+(n>>ov)]&i)}function Ax(n,e){return!(n&2)&&!(n&1&&e)}var ts=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return dv(this._tNode,this._lView,e,Gr(i),t)}};function dw(){return new ts(bi(),tn())}function fw(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[Be]&2048&&!Jr(o);){let a=fv(s,o,t,i|2,Ei);if(a!==Ei)return a;let c=s.parent;if(!c){let l=o[Ch];if(l){let u=l.get(t,Ei,i);if(u!==Ei)return u}c=hv(o),o=o[$s]}s=c}return r}function hv(n){let e=n[Ee],t=e.type;return t===2?e.declTNode:t===1?n[Vn]:null}function hw(){return to(bi(),tn())}function to(n,e){return new Ma(Hi(n,e))}var Ma=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=hw}return n})();function pw(n){return n instanceof Ma?n.nativeElement:n}function mw(){return this._results[Symbol.iterator]()}var jl=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new Fi}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=By(e);(this._changesDetected=!Uy(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=mw},pv="ngSkipHydration",gw="ngskiphydration";function mv(n){let e=n.mergedAttrs;if(e===null)return!1;for(let t=0;t<e.length;t+=2){let i=e[t];if(typeof i=="number")return!1;if(typeof i=="string"&&i.toLowerCase()===gw)return!0}return!1}function gv(n){return n.hasAttribute(pv)}function Wl(n){return(n.flags&128)===128}function yv(n){if(Wl(n))return!0;let e=n.parent;for(;e;){if(Wl(n)||mv(e))return!0;e=e.parent}return!1}var Rp=(function(n){return n[n.OnPush=0]="OnPush",n[n.Default=1]="Default",n})(Rp||{}),xv=new Map,yw=0;function xw(){return yw++}function vw(n){xv.set(n[sa],n)}function cp(n){xv.delete(n[sa])}var Ix="__ngContext__";function ya(n,e){zn(e)?(n[Ix]=e[sa],vw(e)):n[Ix]=e}function vv(n){return bv(n[Ws])}function _v(n){return bv(n[Bn])}function bv(n){for(;n!==null&&!Dn(n);)n=n[Bn];return n}var lp;function Dp(n){lp=n}function Ev(){if(lp!==void 0)return lp;if(typeof document<"u")return document;throw new Ge(210,!1)}var Mi=new Fe("",{factory:()=>_w}),_w="ng";var Ql=new Fe(""),Sa=new Fe("",{providedIn:"platform",factory:()=>"unknown"});var eu=new Fe("",{factory:()=>ge(dn).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var no=(()=>{class n{static \u0275prov=Mt({token:n,providedIn:"root",factory:()=>{let t=new n;return t.store=bw(ge(dn),ge(Mi)),t}});store={};onSerializeCallbacks={};get(t,i){return this.store[t]!==void 0?this.store[t]:i}set(t,i){this.store[t]=i}remove(t){delete this.store[t]}hasKey(t){return this.store.hasOwnProperty(t)}get isEmpty(){return Object.keys(this.store).length===0}onSerialize(t,i){this.onSerializeCallbacks[t]=i}toJson(){for(let t in this.onSerializeCallbacks)if(this.onSerializeCallbacks.hasOwnProperty(t))try{this.store[t]=this.onSerializeCallbacks[t]()}catch(i){console.warn("Exception in onSerialize callback: ",i)}return JSON.stringify(this.store).replace(/</g,"\\u003C")}}return n})();function bw(n,e){let t=n.getElementById(e+"-state");if(t?.textContent)try{return JSON.parse(t.textContent)}catch(i){console.warn("Exception while restoring TransferState for app "+e,i)}return{}}var Mv="h",Sv="b",Ew="f",Mw="n",Tv="e",wv="t",tu="c",Np="x",xa="r",Av="i",Iv="n",Pp="d";var Cv="di",Rv="s",Dv="p";var Ta=new Fe(""),Nv=!1,Lp=new Fe("",{factory:()=>Nv});var Op=new Fe(""),Pv=!1,Lv=new Fe(""),Fp=new Fe("",{factory:()=>new Map});var wa="ngb";var Ov=(n,e,t)=>{let i=n,r=i.__jsaction_fns??new Map,s=r.get(e)??[];s.push(t),r.set(e,s),i.__jsaction_fns=r},Fv=(n,e)=>{let t=n,i=t.getAttribute(wa)??"",r=e.get(i)??new Set;r.has(t)||r.add(t),e.set(i,r)};var kv=n=>{n.removeAttribute(Pl.JSACTION),n.removeAttribute(wa),n.__jsaction_fns=void 0},Uv=new Fe("",{factory:()=>({})});function kp(n,e){let t=e?.__jsaction_fns?.get(n.type);if(!(!t||!e?.isConnected))for(let i of t)i(n)}var up=new Map;function Bv(n,e){return up.set(n,e),()=>up.delete(n)}var Cx=!1,Sw=(n,e,t,i)=>{};function Vv(){Cx||(Sw=(n,e,t,i)=>{let r=n[Hn].get(Mi);up.get(r)?.(e,t,i)},Cx=!0)}var nu=new Fe("");function iu(n){return(n.flags&32)===32}var Tw="__nghData__",Up=Tw,ww="__nghDeferData__",Hv=ww;var kl="ngh",zv="nghm",Gv=()=>null;function Aw(n,e,t=!1){let i=n.getAttribute(kl);if(i==null)return null;let[r,s]=i.split("|");if(i=t?s:r,!i)return null;let o=s?`|${s}`:"",a=t?r:o,c={};if(i!==""){let u=e.get(no,null,{optional:!0});u!==null&&(c=u.get(Up,[])[Number(i)])}let l={data:c,firstChild:n.firstChild??null};return t&&(l.firstChild=n,ru(l,0,n.nextSibling)),a?n.setAttribute(kl,a):n.removeAttribute(kl),l}function jv(){Gv=Aw}function Wv(n,e,t=!1){return Gv(n,e,t)}function $v(n){let e=n._lView;return e[Ee].type===2?null:(Jr(e)&&(e=e[Ot]),e)}function Iw(n){return n.textContent?.replace(/\s/gm,"")}function Cw(n){let e=Ev(),t=e.createNodeIterator(n,NodeFilter.SHOW_COMMENT,{acceptNode(s){let o=Iw(s);return o==="ngetn"||o==="ngtns"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),i,r=[];for(;i=t.nextNode();)r.push(i);for(let s of r)s.textContent==="ngetn"?s.replaceWith(e.createTextNode("")):s.remove()}function ru(n,e,t){n.segmentHeads??={},n.segmentHeads[e]=t}function dp(n,e){return n.segmentHeads?.[e]??null}function qv(n){return n.get(Lv,!1,{optional:!0})}function Rw(n,e){let t=n.data,i=t[Tv]?.[e]??null;return i===null&&t[tu]?.[e]&&(i=Bp(n,e)),i}function Xv(n,e){return n.data[tu]?.[e]??null}function Bp(n,e){let t=Xv(n,e)??[],i=0;for(let r of t)i+=r[xa]*(r[Np]??1);return i}function Dw(n){if(typeof n.disconnectedNodes>"u"){let e=n.data[Pp];n.disconnectedNodes=e?new Set(e):null}return n.disconnectedNodes}function Yv(n,e){if(typeof n.disconnectedNodes>"u"){let t=n.data[Pp];n.disconnectedNodes=t?new Set(t):null}return!!Dw(n)?.has(e)}function su(n,e){let t=n[An];return t!==null&&!Fh()&&!iu(e)&&!Yv(t,e.index-Ot)}function Nw(n,e){let t=e.get(nu),r=e.get(no).get(Hv,{}),s=!1,o=n,a=null,c=[];for(;!s&&o;){s=t.has(o);let l=t.hydrating.get(o);if(a===null&&l!=null){a=l.promise;break}c.unshift(o),o=r[o][Dv]}return{parentBlockPromise:a,hydrationQueue:c}}function np(n){return!!n&&n.nodeType===Node.COMMENT_NODE&&n.textContent?.trim()===zv}function Rx(n){for(;n&&n.nodeType===Node.TEXT_NODE;)n=n.previousSibling;return n}function Zv(n){for(let i of n.body.childNodes)if(np(i))return;let e=Rx(n.body.previousSibling);if(np(e))return;let t=Rx(n.head.lastChild);if(!np(t))throw new Ge(-507,!1)}function Kv(n,e){let t=n.contentQueries;if(t!==null){let i=et(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];Il(s),a.contentQueries(2,e[o],o)}}}finally{et(i)}}}function fp(n,e,t){Il(0);let i=et(null);try{e(n,t)}finally{et(i)}}function Jv(n,e,t){if(Rh(e)){let i=et(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let c=t[o];a.contentQueries(1,c,o)}}}finally{et(i)}}}var ti=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(ti||{});var Pw=/^>|^->|<!--|-->|--!>|<!-$/g,Lw=/(<|>)/g,Ow="\u200B$1\u200B";function Fw(n){return n.replace(Pw,e=>e.replace(Lw,Ow))}function Qv(n,e){return n.createText(e)}function e_(n,e){return n.createComment(Fw(e))}function Vp(n,e,t){return n.createElement(e,t)}function $l(n,e,t,i,r){n.insertBefore(e,t,i,r)}function t_(n,e,t){n.appendChild(e,t)}function Dx(n,e,t,i,r){i!==null?$l(n,e,t,i,r):t_(n,e,t)}function Hp(n,e,t,i){n.removeChild(null,e,t,i)}function n_(n){n.textContent=""}function kw(n,e,t){n.setAttribute(e,"style",t)}function Uw(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function i_(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&tw(n,e,i),r!==null&&Uw(n,e,r),s!==null&&kw(n,e,s)}function r_(n){return n.ownerDocument.body}function Bw(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}var s_="ng-template";function Vw(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&Bw(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(zp(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function zp(n){return n.type===4&&n.value!==s_}function Hw(n,e,t){let i=n.type===4&&!t?s_:n.value;return e===i}function zw(n,e,t){let i=4,r=n.attrs,s=r!==null?Ww(r):0,o=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!o&&!ei(i)&&!ei(c))return!1;if(o&&ei(c))continue;o=!1,i=c|i&1;continue}if(!o)if(i&4){if(i=2|i&1,c!==""&&!Hw(n,c,t)||c===""&&e.length===1){if(ei(i))return!1;o=!0}}else if(i&8){if(r===null||!Vw(n,r,c,t)){if(ei(i))return!1;o=!0}}else{let l=e[++a],u=Gw(c,r,zp(n),t);if(u===-1){if(ei(i))return!1;o=!0;continue}if(l!==""){let d;if(u>s?d="":d=r[u+1].toLowerCase(),i&2&&l!==d){if(ei(i))return!1;o=!0}}}}return ei(i)||o}function ei(n){return(n&1)===0}function Gw(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return $w(e,n)}function jw(n,e,t=!1){for(let i=0;i<e.length;i++)if(zw(n,e[i],t))return!0;return!1}function Ww(n){for(let e=0;e<n.length;e++){let t=n[e];if(nw(t))return e}return n.length}function $w(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function Nx(n,e){return n?":not("+e.trim()+")":e}function qw(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!ei(o)&&(e+=Nx(s,r),r=""),i=o,s=s||!ei(i);t++}return r!==""&&(e+=Nx(s,r)),e}function Xw(n){return n.map(qw).join(",")}function Yw(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!ei(r))break;r=s}i++}return t.length&&e.push(1,...t),e}var Gp={};function o_(n,e,t,i,r,s,o,a,c,l,u){let d=Ot+i,f=d+r,h=Zw(d,f),m=typeof l=="function"?l():l;return h[Ee]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:c,consts:m,incompleteFirstPass:!1,ssrId:u}}function Zw(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:Gp);return t}function Kw(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=o_(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function jp(n,e,t,i,r,s,o,a,c,l,u){let d=e.blueprint.slice();return d[un]=r,d[Be]=i|4|128|8|64|1024,(l!==null||n&&n[Be]&2048)&&(d[Be]|=2048),Nh(d),d[Pt]=d[$s]=n,d[In]=t,d[Vi]=o||n&&n[Vi],d[Lt]=a||n&&n[Lt],d[Hn]=c||n&&n[Hn]||null,d[Vn]=s,d[sa]=xw(),d[An]=u,d[Ch]=l,d[Cn]=e.type==2?n[Cn]:d,d}function Jw(n,e,t){let i=Hi(e,n),r=Kw(t),s=n[Vi].rendererFactory,o=l_(n,jp(n,r,null,a_(t),i,e,null,s.createRenderer(i,t),null,null,null));return n[e.index]=o}function a_(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function c_(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function l_(n,e){return n[Ws]?n[Ih][Bn]=e:n[Ws]=e,n[Ih]=e,e}function Qw(n,e,t,i){if(!i)if((e[Be]&3)===3){let s=n.preOrderCheckHooks;s!==null&&Ll(e,s,t)}else{let s=n.preOrderHooks;s!==null&&Ol(e,s,0,t)}hr(t)}var ou=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(ou||{});function hp(n,e,t,i){let r=et(null);try{let[s,o,a]=n.inputs[t],c=null;(o&ou.SignalBased)!==0&&(c=e[s][pi]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,c,i,t,s):ev(e,c,s,i)}finally{et(r)}}var is=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(is||{}),eA;function Wp(n,e){return eA(n,e)}var Qs=new Set,au=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(au||{}),gr=new Fe(""),Px=new Set;function rs(n){Px.has(n)||(Px.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var $p=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=Mt({token:n,providedIn:"root",factory:()=>new n})}return n})(),u_=[0,1,2,3],d_=(()=>{class n{ngZone=ge(Qt);scheduler=ge(ar);errorHandler=ge(xi,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){ge(gr,{optional:!0})}execute(){let t=this.sequences.size>0;t&&ot(tt.AfterRenderHooksStart),this.executing=!0;for(let i of u_)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let s=r.hooks[i];return s(r.pipelinedValue)},r.snapshot))}catch(s){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(s)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),t&&ot(tt.AfterRenderHooksEnd)}register(t){let{view:i}=t;i!==void 0?((i[Yr]??=[]).push(t),Xs(i),i[Be]|=8192):this.executing?this.deferredRegistrations.add(t):this.addSequence(t)}addSequence(t){this.sequences.add(t),this.scheduler.notify(7)}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}maybeTrace(t,i){return i?i.run(au.AFTER_NEXT_RENDER,t):t()}static \u0275prov=Mt({token:n,providedIn:"root",factory:()=>new n})}return n})(),ql=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(e,t,i,r,s,o=null){this.impl=e,this.hooks=t,this.view=i,this.once=r,this.snapshot=o,this.unregisterOnDestroy=s?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let e=this.view?.[Yr];e&&(this.view[Yr]=e.filter(t=>t!==this))}};function f_(n,e){let t=e?.injector??ge(yi);return rs("NgAfterNextRender"),nA(n,t,e,!0)}function tA(n){return n instanceof Function?[void 0,void 0,n,void 0]:[n.earlyRead,n.write,n.mixedReadWrite,n.read]}function nA(n,e,t,i){let r=e.get($p);r.impl??=e.get(d_);let s=e.get(gr,null,{optional:!0}),o=t?.manualCleanup!==!0?e.get(Qr):null,a=e.get(Dl,null,{optional:!0}),c=new ql(r.impl,tA(n),a?.view,i,o,s?.snapshot(null));return r.impl.register(c),c}var iA=new Fe("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:ge(gn)})});function h_(n,e,t){let i=n.get(iA);if(Array.isArray(e))for(let r of e)i.queue.add(r),t?.detachedLeaveAnimationFns?.push(r);else i.queue.add(e),t?.detachedLeaveAnimationFns?.push(e);i.scheduler&&i.scheduler(n)}function rA(n,e){for(let[t,i]of e)h_(n,i.animateFns)}function Lx(n,e,t,i){let r=n?.[aa]?.enter;e!==null&&r&&r.has(t.index)&&rA(i,r)}function Ys(n,e,t,i,r,s,o,a){if(r!=null){let c,l=!1;Dn(r)?c=r:zn(r)&&(l=!0,r=r[un]);let u=Qn(r);n===0&&i!==null?(Lx(a,i,s,t),o==null?t_(e,i,u):$l(e,i,u,o||null,!0)):n===1&&i!==null?(Lx(a,i,s,t),$l(e,i,u,o||null,!0)):n===2?Ox(a,s,t,d=>{Hp(e,u,l,d)}):n===3&&Ox(a,s,t,()=>{e.destroyNode(u)}),c!=null&&xA(e,n,t,c,s,i,o)}}function sA(n,e){p_(n,e),e[un]=null,e[Vn]=null}function oA(n,e,t,i,r,s){i[un]=r,i[Vn]=e,cu(n,i,t,1,r,s)}function p_(n,e){e[Vi].changeDetectionScheduler?.notify(9),cu(n,e,e[Lt],2,null,null)}function aA(n){let e=n[Ws];if(!e)return ip(n[Ee],n);for(;e;){let t=null;if(zn(e))t=e[Ws];else{let i=e[en];i&&(t=i)}if(!t){for(;e&&!e[Bn]&&e!==n;)zn(e)&&ip(e[Ee],e),e=e[Pt];e===null&&(e=n),zn(e)&&ip(e[Ee],e),t=e&&e[Bn]}e=t}}function qp(n,e){let t=n[Zr],i=t.indexOf(e);t.splice(i,1)}function Xp(n,e){if(dr(e))return;let t=e[Lt];t.destroyNode&&cu(n,e,t,3,null,null),aA(e)}function ip(n,e){if(dr(e))return;let t=et(null);try{e[Be]&=-129,e[Be]|=256,e[Rn]&&Gc(e[Rn]),uA(n,e),lA(n,e),e[Ee].type===1&&e[Lt].destroy();let i=e[ur];if(i!==null&&Dn(e[Pt])){i!==e[Pt]&&qp(i,e);let r=e[vi];r!==null&&r.detachView(n)}cp(e)}finally{et(t)}}function Ox(n,e,t,i){let r=n?.[aa];if(r==null||r.leave==null||!r.leave.has(e.index))return i(!1);n&&Qs.add(n),h_(t,()=>{if(r.leave&&r.leave.has(e.index)){let o=r.leave.get(e.index),a=[];if(o){for(let c=0;c<o.animateFns.length;c++){let l=o.animateFns[c],{promise:u}=l();a.push(u)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),cA(n,i)}else n&&Qs.delete(n),i(!1)},r)}function cA(n,e){let t=n[aa]?.running;if(t){t.then(()=>{n[aa].running=void 0,Qs.delete(n),e(!0)});return}e(!1)}function lA(n,e){let t=n.cleanup,i=e[ra];if(t!==null)for(let o=0;o<t.length-1;o+=2)if(typeof t[o]=="string"){let a=t[o+3];a>=0?i[a]():i[-a].unsubscribe(),o+=2}else{let a=i[t[o+1]];t[o].call(a)}i!==null&&(e[ra]=null);let r=e[Ui];if(r!==null){e[Ui]=null;for(let o=0;o<r.length;o++){let a=r[o];a()}}let s=e[oa];if(s!==null){e[oa]=null;for(let o of s)o.destroy()}}function uA(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof ga)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],c=s[o+1];ot(tt.LifecycleHookStart,a,c);try{c.call(a)}finally{ot(tt.LifecycleHookEnd,a,c)}}else{ot(tt.LifecycleHookStart,r,s);try{s.call(r)}finally{ot(tt.LifecycleHookEnd,r,s)}}}}}function dA(n,e,t){return fA(n,e.parent,t)}function fA(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[un];if(qs(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===ti.None||r===ti.Emulated)return null}return Hi(i,t)}function hA(n,e,t){return mA(n,e,t)}function pA(n,e,t){return n.type&40?Hi(n,t):null}var mA=pA,Fx;function gA(n,e,t,i){let r=dA(n,i,e),s=e[Lt],o=i.parent||e[Vn],a=hA(o,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)Dx(s,r,t[c],a,!1);else Dx(s,r,t,a,!1);Fx!==void 0&&Fx(s,i,e,t,r)}function pa(n,e){if(e!==null){let t=e.type;if(t&3)return Hi(e,n);if(t&4)return pp(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return pa(n,i);{let r=n[e.index];return Dn(r)?pp(-1,r):Qn(r)}}else{if(t&128)return pa(n,e.next);if(t&32)return Wp(e,n)()||Qn(n[e.index]);{let i=m_(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=or(n[Cn]);return pa(r,i)}else return pa(n,e.next)}}}return null}function m_(n,e){if(e!==null){let i=n[Cn][Vn],r=e.projection;return i.projection[r]}return null}function pp(n,e){let t=en+n+1;if(t<e.length){let i=e[t],r=i[Ee].firstChild;if(r!==null)return pa(i,r)}return e[_i]}function Yp(n,e,t,i,r,s,o){for(;t!=null;){let a=i[Hn];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(o&&e===0&&(c&&ya(Qn(c),i),t.flags|=2),!iu(t))if(l&8)Yp(n,e,t.child,i,r,s,!1),Ys(e,n,a,r,c,t,s,i);else if(l&32){let u=Wp(t,i),d;for(;d=u();)Ys(e,n,a,r,d,t,s,i);Ys(e,n,a,r,c,t,s,i)}else l&16?yA(n,e,i,t,r,s):Ys(e,n,a,r,c,t,s,i);t=o?t.projectionNext:t.next}}function cu(n,e,t,i,r,s){Yp(t,i,n.firstChild,e,r,s,!1)}function yA(n,e,t,i,r,s){let o=t[Cn],c=o[Vn].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];Ys(e,n,t[Hn],r,u,i,s,t)}else{let l=c,u=o[Pt];Wl(i)&&(l.flags|=128),Yp(n,e,l,u,r,s,!0)}}function xA(n,e,t,i,r,s,o){let a=i[_i],c=Qn(i);a!==c&&Ys(e,n,t,s,a,r,o);for(let l=en;l<i.length;l++){let u=i[l];cu(u[Ee],u,n,e,s,a)}}function g_(n,e,t,i,r){let s=px(),o=i&2;try{hr(-1),o&&e.length>Ot&&Qw(n,e,Ot,!1);let a=o?tt.TemplateUpdateStart:tt.TemplateCreateStart;ot(a,r,t),t(i,r)}finally{hr(s);let a=o?tt.TemplateUpdateEnd:tt.TemplateCreateEnd;ot(a,r,t)}}function y_(n,e,t){EA(n,e,t),(t.flags&64)===64&&MA(n,e,t)}function x_(n,e,t=Hi){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function vA(n,e,t,i){let s=i.get(Lp,Nv)||t===ti.ShadowDom||t===ti.ExperimentalIsolatedShadowDom,o=n.selectRootElement(e,s);return _A(o),o}function _A(n){v_(n)}var v_=()=>null;function bA(n){gv(n)?n_(n):Cw(n)}function __(){v_=bA}function EA(n,e,t){let i=t.directiveStart,r=t.directiveEnd;qs(t)&&Jw(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||av(t,e);let s=t.initialInputs;for(let o=i;o<r;o++){let a=n.data[o],c=Gl(e,n,o,t);if(ya(c,e),s!==null&&wA(e,o-i,c,a,t,s),Kr(a)){let l=fr(t.index,e);l[In]=Gl(e,n,o,t)}}}function MA(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=ux();try{hr(s);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];Al(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&SA(c,l)}}finally{hr(-1),Al(o)}}function SA(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function TA(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let s=t[r];jw(e,s.selectors,!1)&&(i??=[],Kr(s)?i.unshift(s):i.push(s))}return i}function wA(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;a+=2){let c=o[a],l=o[a+1];hp(i,t,c,l)}}function b_(n,e,t,i,r){let s=Ot+t,o=e[Ee],a=r(o,e,n,i,t);e[s]=a,wl(n,!0);let c=n.type===2;return c?(i_(e[Lt],a,n),(tx()===0||Dh(n))&&ya(a,e),nx()):ya(a,e),gx()&&(!c||!iu(n))&&gA(o,e,a,n),n}function E_(n){let e=n;return Vh()?ox():(e=e.parent,wl(e,!1)),e}function M_(n,e){let t=n[Hn];if(!t)return;let i;try{i=t.get(mr,null)}catch{i=null}i?.(e)}function S_(n,e,t,i,r){let s=n.inputs?.[i],o=n.hostDirectiveInputs?.[i],a=!1;if(o)for(let c=0;c<o.length;c+=2){let l=o[c],u=o[c+1],d=e.data[l];hp(d,t[l],u,r),a=!0}if(s)for(let c of s){let l=t[c],u=e.data[c];hp(u,l,i,r),a=!0}return a}function AA(n,e){let t=fr(e,n),i=t[Ee];IA(i,t);let r=t[un];r!==null&&t[An]===null&&(t[An]=Wv(r,t[Hn])),ot(tt.ComponentStart);try{Zp(i,t,t[In])}finally{ot(tt.ComponentEnd,t[In])}}function IA(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function Zp(n,e,t){Cl(e);try{let i=n.viewQuery;i!==null&&fp(1,i,t);let r=n.template;r!==null&&g_(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[vi]?.finishViewCreation(n),n.staticContentQueries&&Kv(n,e),n.staticViewQueries&&fp(2,n.viewQuery,t);let s=n.components;s!==null&&CA(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[Be]&=-5,Rl()}}function CA(n,e){for(let t=0;t<e.length;t++)AA(n,e[t])}function T_(n,e,t,i){let r=et(null);try{let s=e.tView,a=n[Be]&4096?4096:16,c=jp(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[ur]=l;let u=n[vi];return u!==null&&(c[vi]=u.createEmbeddedView(s)),Zp(s,c,t),c}finally{et(r)}}function mp(n,e){return!e||e.firstChild===null||Wl(n)}function va(n,e,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let s=e[t.index];s!==null&&i.push(Qn(s)),Dn(s)&&w_(s,i);let o=t.type;if(o&8)va(n,e,t.child,i);else if(o&32){let a=Wp(t,e),c;for(;c=a();)i.push(c)}else if(o&16){let a=m_(e,t);if(Array.isArray(a))i.push(...a);else{let c=or(e[Cn]);va(c[Ee],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function w_(n,e){for(let t=en;t<n.length;t++){let i=n[t],r=i[Ee].firstChild;r!==null&&va(i[Ee],i,r,e)}n[_i]!==n[un]&&e.push(n[_i])}function A_(n){if(n[Yr]!==null){for(let e of n[Yr])e.impl.addSequence(e);n[Yr].length=0}}var I_=[];function RA(n){return n[Rn]??DA(n)}function DA(n){let e=I_.pop()??Object.create(PA);return e.lView=n,e}function NA(n){n.lView[Rn]!==n&&(n.lView=null,I_.push(n))}var PA=Sn(Nt({},zc),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{Xs(n.lView)},consumerOnSignalRead(){this.lView[Rn]=this}});function LA(n){let e=n[Rn]??Object.create(OA);return e.lView=n,e}var OA=Sn(Nt({},zc),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=or(n.lView);for(;e&&!C_(e[Ee]);)e=or(e);e&&Ph(e)},consumerOnSignalRead(){this.lView[Rn]=this}});function C_(n){return n.type!==2}function R_(n){if(n[oa]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[oa])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=t&&!!(n[Be]&8192)}}var FA=100;function D_(n,e=0){let i=n[Vi].rendererFactory,r=!1;r||i.begin?.();try{kA(n,e)}finally{r||i.end?.()}}function kA(n,e){let t=Hh();try{zh(!0),gp(n,e);let i=0;for(;da(n);){if(i===FA)throw new Ge(103,!1);i++,gp(n,1)}}finally{zh(t)}}function UA(n,e,t,i){if(dr(e))return;let r=e[Be],s=!1,o=!1;Cl(e);let a=!0,c=null,l=null;s||(C_(n)?(l=RA(e),c=Bf(l)):Hc()===null?(a=!1,l=LA(e),c=Bf(l)):e[Rn]&&(Gc(e[Rn]),e[Rn]=null));try{Nh(e),ax(n.bindingStartIndex),t!==null&&g_(n,e,t,2,i);let u=(r&3)===3;if(!s)if(u){let h=n.preOrderCheckHooks;h!==null&&Ll(e,h,null)}else{let h=n.preOrderHooks;h!==null&&Ol(e,h,0,null),ep(e,0)}if(o||BA(e),R_(e),N_(e,0),n.contentQueries!==null&&Kv(n,e),!s)if(u){let h=n.contentCheckHooks;h!==null&&Ll(e,h)}else{let h=n.contentHooks;h!==null&&Ol(e,h,1),ep(e,1)}HA(n,e);let d=n.components;d!==null&&L_(e,d,0);let f=n.viewQuery;if(f!==null&&fp(2,f,i),!s)if(u){let h=n.viewCheckHooks;h!==null&&Ll(e,h)}else{let h=n.viewHooks;h!==null&&Ol(e,h,2),ep(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[El]){for(let h of e[El])h();e[El]=null}s||(A_(e),e[Be]&=-73)}catch(u){throw s||Xs(e),u}finally{l!==null&&(X0(l,c),a&&NA(l)),Rl()}}function N_(n,e){for(let t=vv(n);t!==null;t=_v(t))for(let i=en;i<t.length;i++){let r=t[i];P_(r,e)}}function BA(n){for(let e=vv(n);e!==null;e=_v(e)){if(!(e[Be]&2))continue;let t=e[Zr];for(let i=0;i<t.length;i++){let r=t[i];Ph(r)}}}function VA(n,e,t){ot(tt.ComponentStart);let i=fr(e,n);try{P_(i,t)}finally{ot(tt.ComponentEnd,i[In])}}function P_(n,e){Ml(n)&&gp(n,e)}function gp(n,e){let i=n[Ee],r=n[Be],s=n[Rn],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&Vf(s)),o||=!1,s&&(s.dirty=!1),n[Be]&=-9217,o)UA(i,n,i.template,n[In]);else if(r&8192){let a=et(null);try{R_(n),N_(n,1);let c=i.components;c!==null&&L_(n,c,1),A_(n)}finally{et(a)}}}function L_(n,e,t){for(let i=0;i<e.length;i++)VA(n,e[i],t)}function HA(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)hr(~r);else{let s=r,o=t[++i],a=t[++i];lx(o,s);let c=e[s];ot(tt.HostBindingsUpdateStart,c);try{a(2,c)}finally{ot(tt.HostBindingsUpdateEnd,c)}}}}finally{hr(-1)}}function Kp(n,e){let t=Hh()?64:1088;for(n[Vi].changeDetectionScheduler?.notify(e);n;){n[Be]|=t;let i=or(n);if(Jr(n)&&!i)return n;n=i}return null}function zA(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function O_(n,e,t,i=!0){let r=e[Ee];if(jA(r,e,n,t),i){let o=pp(t,n),a=e[Lt],c=a.parentNode(n[_i]);c!==null&&oA(r,n[Vn],a,e,c,o)}let s=e[An];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function GA(n,e){let t=Xl(n,e);return t!==void 0&&Xp(t[Ee],t),t}function Xl(n,e){if(n.length<=en)return;let t=en+e,i=n[t];if(i){let r=i[ur];r!==null&&r!==n&&qp(r,i),e>0&&(n[t-1][Bn]=i[Bn]);let s=ea(n,en+e);sA(i[Ee],i);let o=s[vi];o!==null&&o.detachView(s[Ee]),i[Pt]=null,i[Bn]=null,i[Be]&=-129}return i}function jA(n,e,t,i){let r=en+i,s=t.length;i>0&&(t[r-1][Bn]=e),i<s-en?(e[Bn]=t[r],Mh(t,en+i,e)):(t.push(e),e[Bn]=null),e[Pt]=t;let o=e[ur];o!==null&&t!==o&&F_(o,e);let a=e[vi];a!==null&&a.insertView(n),Sl(e),e[Be]|=128}function F_(n,e){let t=n[Zr],i=e[Pt];if(zn(i))n[Be]|=2;else{let r=i[Pt][Cn];e[Cn]!==r&&(n[Be]|=2)}t===null?n[Zr]=[e]:t.push(e)}var eo=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[Ee];return va(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[In]}set context(e){this._lView[In]=e}get destroyed(){return dr(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[Pt];if(Dn(e)){let t=e[ca],i=t?t.indexOf(this):-1;i>-1&&(Xl(e,i),ea(t,i))}this._attachedToViewContainer=!1}Xp(this._lView[Ee],this._lView)}onDestroy(e){Lh(this._lView,e)}markForCheck(){Kp(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[Be]&=-129}reattach(){Sl(this._lView),this._lView[Be]|=128}detectChanges(){this._lView[Be]|=1024,D_(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new Ge(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=Jr(this._lView),t=this._lView[ur];t!==null&&!e&&qp(t,this._lView),p_(this._lView[Ee],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new Ge(902,!1);this._appRef=e;let t=Jr(this._lView),i=this._lView[ur];i!==null&&!t&&F_(i,this._lView),Sl(this._lView)}};var _a=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=WA;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let s=T_(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new eo(s)}}return n})();function WA(){return Jp(bi(),tn())}function Jp(n,e){return n.type&4?new _a(e,n,to(n,e)):null}function k_(n,e,t,i,r){let s=n.data[e];if(s===null)s=$A(n,e,t,i,r),cx()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=sx();s.injectorIndex=o===null?-1:o.injectorIndex}return wl(s,!0),s}function $A(n,e,t,i,r){let s=Bh(),o=Vh(),a=o?s:s&&s.parent,c=n.data[e]=XA(n,a,t,e,i,r);return qA(n,c,s,o),c}function qA(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function XA(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return Fh()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,fieldIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:s,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var YA=new RegExp(`^(\\d+)*(${Sv}|${Mv})*(.*)`);function ZA(n){let e=n.match(YA),[t,i,r,s]=e,o=i?parseInt(i,10):r,a=[];for(let[c,l,u]of s.matchAll(/(f|n)(\d*)/g)){let d=parseInt(u,10)||1;a.push(l,d)}return[o,...a]}function KA(n){return!n.prev&&n.parent?.type===8}function rp(n){return n.index-Ot}function JA(n,e){let t=n.i18nNodes;if(t)return t.get(e)}function lu(n,e,t,i){let r=rp(i),s=JA(n,r);if(s===void 0){let o=n.data[Iv];if(o?.[r])s=eI(o[r],t);else if(e.firstChild===i)s=n.firstChild;else{let a=i.prev===null,c=i.prev??i.parent;if(KA(i)){let l=rp(i.parent);s=dp(n,l)}else{let l=Hi(c,t);if(a)s=l.firstChild;else{let u=rp(c),d=dp(n,u);if(c.type===2&&d){let h=Bp(n,u)+1;s=uu(h,d)}else s=l.nextSibling}}}}return s}function uu(n,e){let t=e;for(let i=0;i<n;i++)t=t.nextSibling;return t}function QA(n,e){let t=n;for(let i=0;i<e.length;i+=2){let r=e[i],s=e[i+1];for(let o=0;o<s;o++)switch(r){case Ew:t=t.firstChild;break;case Mw:t=t.nextSibling;break}}return t}function eI(n,e){let[t,...i]=ZA(n),r;if(t===Mv)r=e[Cn][un];else if(t===Sv)r=r_(e[Cn][un]);else{let s=Number(t);r=Qn(e[s+Ot])}return QA(r,i)}var tI=!1;function U_(n){tI=n}function nI(n){let e=n[An];if(e){let{i18nNodes:t,dehydratedIcuData:i}=e;if(t&&i){let r=n[Lt];for(let s of i.values())iI(r,t,s)}e.i18nNodes=void 0,e.dehydratedIcuData=void 0}}function iI(n,e,t){for(let i of t.node.cases[t.case]){let r=e.get(i.index-Ot);r&&Hp(n,r,!1)}}function Qp(n){let e=n[Jn]??[],i=n[Pt][Lt],r=[];for(let s of e)s.data[Cv]!==void 0?r.push(s):B_(s,i);n[Jn]=r}function rI(n){let{lContainer:e}=n,t=e[Jn];if(t===null)return;let r=e[Pt][Lt];for(let s of t)B_(s,r)}function B_(n,e){let t=0,i=n.firstChild;if(i){let r=n.data[xa];for(;t<r;){let s=i.nextSibling;Hp(e,i,!1),i=s,t++}}}function du(n){Qp(n);let e=n[un];zn(e)&&Yl(e);for(let t=en;t<n.length;t++)Yl(n[t])}function Yl(n){nI(n);let e=n[Ee];for(let t=Ot;t<e.bindingStartIndex;t++)if(Dn(n[t])){let i=n[t];du(i)}else zn(n[t])&&Yl(n[t])}function em(n){let e=n._views;for(let t of e){let i=$v(t);i!==null&&i[un]!==null&&(zn(i)?Yl(i):du(i))}}function sI(n,e,t,i){n!==null&&(t.cleanup(e),du(n.lContainer),em(i))}function oI(n,e){let t=[];for(let i of e)for(let r=0;r<(i[Np]??1);r++){let s={data:i,firstChild:null};i[xa]>0&&(s.firstChild=n,n=uu(i[xa],n)),t.push(s)}return[n,t]}var V_=()=>null,aI=()=>null;function H_(){V_=cI,aI=lI}function cI(n,e){return z_(n,e)?n[Jn].shift():(Qp(n),null)}function yp(n,e){return V_(n,e)}function lI(n,e,t){if(e.tView.ssrId===null)return null;let i=yp(n,e.tView.ssrId);return t[Ee].firstUpdatePass&&i===null&&uI(t,e),i}function uI(n,e){let t=e;for(;t;){if(kx(n,t))return;if((t.flags&256)===256)break;t=t.prev}for(t=e.next;t&&(t.flags&512)===512;){if(kx(n,t))return;t=t.next}}function z_(n,e){let t=n[Jn];return!e||t===null||t.length===0?!1:t[0].data[Av]===e}function kx(n,e){let t=e.tView?.ssrId;if(t==null)return!1;let i=n[e.index];return Dn(i)&&z_(i,t)?(Qp(i),!0):!1}var G_=class{},fu=class{},xp=class{resolveComponentFactory(e){throw new Ge(917,!1)}},hu=class{static NULL=new xp},ns=class{};var j_=(()=>{class n{static \u0275prov=Mt({token:n,providedIn:"root",factory:()=>null})}return n})();var Ul={},Ks=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){let r=this.injector.get(e,Ul,i);return r!==Ul||t===Ul?r:this.parentInjector.get(e,t,i)}};function Zl(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=gh(r,a);else if(s==2){let c=a,l=e[++o];i=gh(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function pu(n,e=0){let t=tn();if(t===null)return ht(n,e);let i=bi();return dv(i,t,wn(n),e)}function dI(n,e,t,i,r){let s=i===null?null:{"":-1},o=r(n,t);if(o!==null){let a=o,c=null,l=null;for(let u of o)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(o);break}pI(n,e,t,a,s,c,l)}s!==null&&i!==null&&fI(t,i,s)}function fI(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new Ge(-301,!1);i.push(e[r],s)}}function hI(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function pI(n,e,t,i,r,s,o){let a=i.length,c=null;for(let f=0;f<a;f++){let h=i[f];c===null&&Kr(h)&&(c=h,hI(n,t,f)),cw(av(t,e),n,h.type)}_I(t,n.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let f=0;f<a;f++){let h=i[f];h.providersResolver&&h.providersResolver(h)}let l=!1,u=!1,d=c_(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let f=0;f<a;f++){let h=i[f];if(t.mergedAttrs=Ip(t.mergedAttrs,h.hostAttrs),gI(n,t,e,d,h),vI(d,h,r),o!==null&&o.has(h)){let[y,g]=o.get(h);t.directiveToIndex.set(h.type,[d,y+t.directiveStart,g+t.directiveStart])}else(s===null||!s.has(h))&&t.directiveToIndex.set(h.type,d);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let m=h.type.prototype;!l&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(m.ngOnChanges||m.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}mI(n,t,s)}function mI(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))Ux(0,e,r,i),Ux(1,e,r,i),Vx(e,i,!1);else{let s=t.get(r);Bx(0,e,s,i),Bx(1,e,s,i),Vx(e,i,!0)}}}function Ux(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o;n===0?o=e.inputs??={}:o=e.outputs??={},o[s]??=[],o[s].push(i),W_(e,s)}}function Bx(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o=r[s],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[o]??=[],a[o].push(i,s),W_(e,o)}}function W_(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function Vx(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:s}=n;if(i===null||!t&&r===null||t&&s===null||zp(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let o=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let u of l)if(u===e){o??=[],o.push(c,i[a+1]);break}}else if(t&&s.hasOwnProperty(c)){let l=s[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){o??=[],o.push(l[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(o)}function gI(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=Gs(r.type,!0)),o=new ga(s,Kr(r),pu,null);n.blueprint[i]=o,t[i]=o,yI(n,e,i,c_(n,t,r.hostVars,Gp),r)}function yI(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;xI(o)!=a&&o.push(a),o.push(t,i,s)}}function xI(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function vI(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;Kr(e)&&(t[""]=n)}}function _I(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function $_(n,e,t,i,r,s,o,a){let c=e[Ee],l=c.consts,u=ua(l,o),d=k_(c,n,t,i,u);return s&&dI(c,e,d,ua(l,a),r),d.mergedAttrs=Ip(d.mergedAttrs,d.attrs),d.attrs!==null&&Zl(d,d.attrs,!1),d.mergedAttrs!==null&&Zl(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function q_(n,e){KT(n,e),Rh(e)&&n.queries.elementEnd(e)}function bI(n,e,t,i,r,s){let o=e.consts,a=ua(o,r),c=k_(e,n,t,i,a);if(c.mergedAttrs=Ip(c.mergedAttrs,c.attrs),s!=null){let l=ua(o,s);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1)}return c.attrs!==null&&Zl(c,c.attrs,!1),c.mergedAttrs!==null&&Zl(c,c.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,c),c}var vp=Symbol("BINDING");var _p=class extends hu{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=cr(e);return new ba(t,this.ngModule)}};function EI(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],s={propName:t,templateName:e,isSignal:(i&ou.SignalBased)!==0};return r&&(s.transform=r),s})}function MI(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function SI(n,e,t){let i=e instanceof gn?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new Ks(t,i):t}function TI(n){let e=n.get(ns,null);if(e===null)throw new Ge(407,!1);let t=n.get(j_,null),i=n.get(ar,null);return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1}}function wI(n,e){let t=X_(n);return Vp(e,t,t==="svg"?qy:t==="math"?Xy:null)}function X_(n){return(n.selectors[0][0]||"div").toLowerCase()}var ba=class extends fu{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=EI(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=MI(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=Xw(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r,s,o){ot(tt.DynamicComponentStart);let a=et(null);try{let c=this.componentDef,l=AI(i,c,o,s),u=SI(c,r||this.ngModule,e),d=TI(u),f=d.rendererFactory.createRenderer(null,c),h=i?vA(f,i,c.encapsulation,u):wI(c,f),m=o?.some(Hx)||s?.some(p=>typeof p!="function"&&p.bindings.some(Hx)),y=jp(null,l,null,512|a_(c),null,null,d,f,u,null,Wv(h,u,!0));y[Ot]=h,Cl(y);let g=null;try{let p=$_(Ot,y,2,"#host",()=>l.directiveRegistry,!0,0);i_(f,h,p),ya(h,y),y_(l,y,p),Jv(l,p,y),q_(l,p),t!==void 0&&CI(p,this.ngContentSelectors,t),g=fr(p.index,y),y[In]=g[In],Zp(l,y,null)}catch(p){throw g!==null&&cp(g),cp(y),p}finally{ot(tt.DynamicComponentEnd),Rl()}return new Kl(this.componentType,y,!!m)}finally{et(a)}}};function AI(n,e,t,i){let r=n?["ng-version","21.0.3"]:Yw(e.selectors[0]),s=null,o=null,a=0;if(t)for(let u of t)a+=u[vp].requiredVars,u.create&&(u.targetIdx=0,(s??=[]).push(u)),u.update&&(u.targetIdx=0,(o??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let d=i[u];if(typeof d!="function")for(let f of d.bindings){a+=f[vp].requiredVars;let h=u+1;f.create&&(f.targetIdx=h,(s??=[]).push(f)),f.update&&(f.targetIdx=h,(o??=[]).push(f))}}let c=[e];if(i)for(let u of i){let d=typeof u=="function"?u:u.type,f=_l(d);c.push(f)}return o_(0,null,II(s,o),1,a,c,null,null,null,[r],null)}function II(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let i of n)i.create();if(t&2&&e)for(let i of e)i.update()}}function Hx(n){let e=n[vp].kind;return e==="input"||e==="twoWay"}var Kl=class extends G_{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=la(t[Ee],Ot),this.location=to(this._tNode,t),this.instance=fr(this._tNode.index,t)[In],this.hostView=this.changeDetectorRef=new eo(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,s=S_(i,r[Ee],r,e,t);this.previousInputValues.set(e,t);let o=fr(i.index,r);Kp(o,1)}get injector(){return new ts(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function CI(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null&&s.length?Array.from(s):null)}}var mu=(()=>{class n{static __NG_ELEMENT_ID__=RI}return n})();function RI(){let n=bi();return Z_(n,tn())}var DI=mu,Y_=class extends DI{_lContainer;_hostTNode;_hostLView;constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return to(this._hostTNode,this._hostLView)}get injector(){return new ts(this._hostTNode,this._hostLView)}get parentInjector(){let e=Cp(this._hostTNode,this._hostLView);if(rv(e)){let t=zl(e,this._hostLView),i=Hl(e),r=t[Ee].data[i+8];return new ts(r,t)}else return new ts(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=zx(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-en}createEmbeddedView(e,t,i){let r,s;typeof i=="number"?r=i:i!=null&&(r=i.index,s=i.injector);let o=yp(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},s,o);return this.insertImpl(a,r,mp(this._hostTNode,o)),a}createComponent(e,t,i,r,s,o,a){let c=e&&!WT(e),l;if(c)l=t;else{let g=t||{};l=g.index,i=g.injector,r=g.projectableNodes,s=g.environmentInjector||g.ngModuleRef,o=g.directives,a=g.bindings}let u=c?e:new ba(cr(e)),d=i||this.parentInjector;if(!s&&u.ngModule==null){let p=(c?d:this.parentInjector).get(gn,null);p&&(s=p)}let f=cr(u.componentType??{}),h=yp(this._lContainer,f?.id??null),m=h?.firstChild??null,y=u.create(d,r,m,s,o,a);return this.insertImpl(y.hostView,l,mp(this._hostTNode,h)),y}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(Zy(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[Pt],l=new Y_(c,c[Vn],c[Pt]);l.detach(l.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return O_(o,r,s,i),e.attachToViewContainerRef(),Mh(sp(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=zx(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=Xl(this._lContainer,t);i&&(ea(sp(this._lContainer),t),Xp(i[Ee],i))}detach(e){let t=this._adjustIndex(e,-1),i=Xl(this._lContainer,t);return i&&ea(sp(this._lContainer),t)!=null?new eo(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function zx(n){return n[ca]}function sp(n){return n[ca]||(n[ca]=[])}function Z_(n,e){let t,i=e[n.index];return Dn(i)?t=i:(t=zA(i,e,null,n),e[n.index]=t,l_(e,t)),K_(t,e,n,i),new Y_(t,n,e)}function NI(n,e){let t=n[Lt],i=t.createComment(""),r=Hi(e,n),s=t.parentNode(r);return $l(t,s,i,t.nextSibling(r),!1),i}var K_=Q_,J_=()=>!1;function Q_(n,e,t,i){if(n[_i])return;let r;t.type&8?r=Qn(i):r=NI(e,t),n[_i]=r}function PI(n,e,t){if(n[_i]&&n[Jn])return!0;let i=t[An],r=e.index-Ot;if(!i||yv(e)||Yv(i,r))return!1;let o=dp(i,r),a=i.data[tu]?.[r],[c,l]=oI(o,a);return n[_i]=c,n[Jn]=l,!0}function LI(n,e,t,i){J_(n,t,e)||Q_(n,e,t,i)}function eb(){K_=LI,J_=PI}var bp=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},Ep=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<i;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)tm(e,t).matches!==null&&this.queries[t].setDirty()}},Mp=class{flags;read;predicate;constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=zI(e):this.predicate=e}},Sp=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,s=this.getByIndex(i).embeddedTView(e,r);s&&(s.indexInDeclarationView=i,t!==null?t.push(s):t=[s])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},Tp=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let s=i[r];this.matchTNodeWithReadOption(e,t,OI(t,s)),this.matchTNodeWithReadOption(e,t,Fl(t,e,s,!1,!1))}else i===_a?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,Fl(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===Ma||r===mu||r===_a&&t.type&4)this.addMatch(t.index,-2);else{let s=Fl(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function OI(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function FI(n,e){return n.type&11?to(n,e):n.type&4?Jp(n,e):null}function kI(n,e,t,i){return t===-1?FI(e,n):t===-2?UI(n,e,i):Gl(n,n[Ee],t,e)}function UI(n,e,t){if(t===Ma)return to(e,n);if(t===_a)return Jp(e,n);if(t===mu)return Z_(e,n)}function tb(n,e,t,i){let r=e[vi].queries[i];if(r.matches===null){let s=n.data,o=t.matches,a=[];for(let c=0;o!==null&&c<o.length;c+=2){let l=o[c];if(l<0)a.push(null);else{let u=s[l];a.push(kI(e,u,o[c+1],t.metadata.read))}}r.matches=a}return r.matches}function wp(n,e,t,i){let r=n.queries.getByIndex(t),s=r.matches;if(s!==null){let o=tb(n,e,r,t);for(let a=0;a<s.length;a+=2){let c=s[a];if(c>0)i.push(o[a/2]);else{let l=s[a+1],u=e[-c];for(let d=en;d<u.length;d++){let f=u[d];f[ur]===f[Pt]&&wp(f[Ee],f,l,i)}if(u[Zr]!==null){let d=u[Zr];for(let f=0;f<d.length;f++){let h=d[f];wp(h[Ee],h,l,i)}}}}}return i}function BI(n,e){return n[vi].queries[e].queryList}function VI(n,e,t){let i=new jl((t&4)===4);return ex(n,e,i,i.destroy),(e[vi]??=new Ep).queries.push(new bp(i))-1}function HI(n,e,t){let i=Tl();return i.firstCreatePass&&(GI(i,new Mp(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),VI(i,tn(),e)}function zI(n){return n.split(",").map(e=>e.trim())}function GI(n,e,t){n.queries===null&&(n.queries=new Sp),n.queries.track(new Tp(e,t))}function tm(n,e){return n.queries.getByIndex(e)}function jI(n,e){let t=n[Ee],i=tm(t,e);return i.crossesNgTemplate?wp(t,n,e,[]):tb(t,n,i,e)}var Jl=class{};var Ea=class extends Jl{injector;componentFactoryResolver=new _p(this);instance=null;constructor(e){super();let t=new Wr([...e.providers,{provide:Jl,useValue:this},{provide:hu,useValue:this.componentFactoryResolver}],e.parent||na(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function nm(n,e,t=null){return new Ea({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var WI=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=bl(!1,t.type),r=i.length>0?nm([i],this._injector,`Standalone[${t.type.name}]`):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=Mt({token:n,providedIn:"environment",factory:()=>new n(ht(gn))})}return n})();function Aa(n){return Qx(()=>{let e=YI(n),t=Sn(Nt({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===Rp.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(WI).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||ti.Emulated,styles:n.styles||jr,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&rs("NgStandalone"),ZI(t);let i=n.dependencies;return t.directiveDefs=Gx(i,$I),t.pipeDefs=Gx(i,wh),t.id=KI(t),t})}function $I(n){return cr(n)||_l(n)}function qI(n,e){if(n==null)return qr;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],s,o,a,c;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s,c=r[3]||null):(s=r,o=r,a=ou.None,c=null),t[s]=[i,a,c],e[s]=o}return t}function XI(n){if(n==null)return qr;let e={};for(let t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function YI(n){let e={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||qr,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||jr,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,inputs:qI(n.inputs,e),outputs:XI(n.outputs),debugInfo:null}}function ZI(n){n.features?.forEach(e=>e(n))}function Gx(n,e){return n?()=>{let t=typeof n=="function"?n():n,i=[];for(let r of t){let s=e(r);s!==null&&i.push(s)}return i}:null}function KI(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let s of i.join("|"))e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,"c"+e}var JI=nb;function nb(n,e,t,i){return zi(!0),e[Lt].createComment("")}function QI(n,e,t,i){let r=!su(e,t);zi(r);let s=e[An]?.data[wv]?.[i]??null;if(s!==null&&t.tView!==null&&t.tView.ssrId===null&&(t.tView.ssrId=s),r)return nb(n,e);let o=e[An],a=lu(o,n,e,t);ru(o,i,a);let c=Bp(o,i);return uu(c,a)}function ib(){JI=QI}var Nn=(function(n){return n[n.NOT_STARTED=0]="NOT_STARTED",n[n.IN_PROGRESS=1]="IN_PROGRESS",n[n.COMPLETE=2]="COMPLETE",n[n.FAILED=3]="FAILED",n})(Nn||{}),jx=0,eC=1,Ft=(function(n){return n[n.Placeholder=0]="Placeholder",n[n.Loading=1]="Loading",n[n.Complete=2]="Complete",n[n.Error=3]="Error",n})(Ft||{});var tC=0,Ia=1;var nC=4,iC=5;var rC=7,Js=8,sC=9,im=(function(n){return n[n.Manual=0]="Manual",n[n.Playthrough=1]="Playthrough",n})(im||{});function Bl(n,e){let t=aC(n),i=e[t];if(i!==null){for(let r of i)r();e[t]=null}}function oC(n){Bl(1,n),Bl(0,n),Bl(2,n)}function aC(n){let e=nC;return n===1?e=iC:n===2&&(e=sC),e}function rb(n){return n+1}function io(n,e){let t=n[Ee],i=rb(e.index);return n[i]}function Ca(n,e){let t=rb(e.index);return n.data[t]}function cC(n,e,t){let i=e[Ee],r=Ca(i,t);switch(n){case Ft.Complete:return r.primaryTmplIndex;case Ft.Loading:return r.loadingTmplIndex;case Ft.Error:return r.errorTmplIndex;case Ft.Placeholder:return r.placeholderTmplIndex;default:return null}}function Wx(n,e){return e===Ft.Placeholder?n.placeholderBlockConfig?.[jx]??null:e===Ft.Loading?n.loadingBlockConfig?.[jx]??null:null}function lC(n){return n.loadingBlockConfig?.[eC]??null}function $x(n,e){if(!n||n.length===0)return e;let t=new Set(n);for(let i of e)t.add(i);return n.length===t.size?n:Array.from(t)}function uC(n,e){let t=e.primaryTmplIndex+Ot;return la(n,t)}var dC=(()=>{class n{cachedInjectors=new Map;getOrCreateInjector(t,i,r,s){if(!this.cachedInjectors.has(t)){let o=r.length>0?nm(r,i,s):null;this.cachedInjectors.set(t,o)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=Mt({token:n,providedIn:"environment",factory:()=>new n})}return n})();var sb=new Fe("");function op(n,e,t){return n.get(dC).getOrCreateInjector(e,n,t,"")}function fC(n,e,t){if(n instanceof Ks){let r=n.injector,s=n.parentInjector,o=op(s,e,t);return new Ks(r,o)}let i=n.get(gn);if(i!==n){let r=op(i,e,t);return new Ks(n,r)}return op(n,e,t)}function es(n,e,t,i=!1){let r=t[Pt],s=r[Ee];if(dr(r))return;let o=io(r,e),a=o[Ia],c=o[rC];if(!(c!==null&&n<c)&&qx(a,n)&&qx(o[tC]??-1,n)){let l=Ca(s,e),d=!i&&!0&&(lC(l)!==null||Wx(l,Ft.Loading)!==null||Wx(l,Ft.Placeholder))?mC:pC;try{d(n,o,t,e,r)}catch(f){M_(r,f)}}}function hC(n,e){let t=n[Jn]?.findIndex(r=>r.data[Rv]===e[Ia])??-1;return{dehydratedView:t>-1?n[Jn][t]:null,dehydratedViewIx:t}}function pC(n,e,t,i,r){ot(tt.DeferBlockStateStart);let s=cC(n,r,i);if(s!==null){e[Ia]=n;let o=r[Ee],a=s+Ot,c=la(o,a),l=0;GA(t,l);let u;if(n===Ft.Complete){let m=Ca(o,i),y=m.providers;y&&y.length>0&&(u=fC(r[Hn],m,y))}let{dehydratedView:d,dehydratedViewIx:f}=hC(t,e),h=T_(r,c,null,{injector:u,dehydratedView:d});if(O_(t,h,l,mp(c,d)),Kp(h,2),f>-1&&t[Jn]?.splice(f,1),(n===Ft.Complete||n===Ft.Error)&&Array.isArray(e[Js])){for(let m of e[Js])m();e[Js]=null}}ot(tt.DeferBlockStateEnd)}function qx(n,e){return n<e}function Xx(n,e,t){n.loadingPromise.then(()=>{n.loadingState===Nn.COMPLETE?es(Ft.Complete,e,t):n.loadingState===Nn.FAILED&&es(Ft.Error,e,t)})}var mC=null;var rm=new Fe("");function sm(n){return!!n&&typeof n.then=="function"}function ob(n){return!!n&&typeof n.subscribe=="function"}var ab=new Fe("");var om=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=ge(ab,{optional:!0})??[];injector=ge(yi);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=ia(this.injector,r);if(sm(s))t.push(s);else if(ob(s)){let o=new Promise((a,c)=>{s.subscribe({complete:a,error:c})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Mt({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),ro=new Fe("");function cb(){zf(()=>{let n="";throw new Ge(600,n)})}function lb(n){return n.isBoundToModule}var gC=10;var ni=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=ge(mr);afterRenderManager=ge($p);zonelessEnabled=ge(ha);rootEffectScheduler=ge(Qh);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new Fi;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=ge(pr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(Qf(t=>!t))}constructor(){ge(gr,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=ge(gn);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=yi.NULL){return this._injector.get(Qt).run(()=>{ot(tt.BootstrapComponentStart);let o=t instanceof fu;if(!this._injector.get(om).done){let m="";throw new Ge(405,m)}let c;o?c=t:c=this._injector.get(hu).resolveComponentFactory(t),this.componentTypes.push(c.componentType);let l=lb(c)?void 0:this._injector.get(Jl),u=i||c.selector,d=c.create(r,[],u,l),f=d.location.nativeElement,h=d.injector.get(rm,null);return h?.registerApplication(f),d.onDestroy(()=>{this.detachView(d.hostView),ma(this.components,d),h?.unregisterApplication(f)}),this._loadComponent(d),ot(tt.BootstrapComponentEnd,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){ot(tt.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(au.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw ot(tt.ChangeDetectionEnd),new Ge(101,!1);let t=et(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,et(t),this.afterTick.next(),ot(tt.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(ns,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<gC;){ot(tt.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{ot(tt.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!da(r))continue;let s=i&&!this.zonelessEnabled?0:1;D_(r,s),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>da(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;ma(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(ro,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>ma(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new Ge(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Mt({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function ma(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function yC(){let n,e;return{promise:new Promise((i,r)=>{n=i,e=r}),resolve:n,reject:e}}function ub(n,e,t){let i=e[Hn],r=e[Ee];if(n.loadingState!==Nn.NOT_STARTED)return n.loadingPromise??Promise.resolve();let s=io(e,t),o=uC(r,n);n.loadingState=Nn.IN_PROGRESS,Bl(1,s);let a=n.dependencyResolverFn,c=i.get(Nl).add();return a?(n.loadingPromise=Promise.allSettled(a()).then(l=>{let u=!1,d=[],f=[];for(let h of l)if(h.status==="fulfilled"){let m=h.value,y=cr(m)||_l(m);if(y)d.push(y);else{let g=wh(m);g&&f.push(g)}}else{u=!0;break}if(u){if(n.loadingState=Nn.FAILED,n.errorTmplIndex===null){let m=new Ge(-750,!1);M_(e,m)}}else{n.loadingState=Nn.COMPLETE;let h=o.tView;if(d.length>0){h.directiveRegistry=$x(h.directiveRegistry,d);let m=d.map(g=>g.type),y=bl(!1,...m);n.providers=y}f.length>0&&(h.pipeRegistry=$x(h.pipeRegistry,f))}}),n.loadingPromise.finally(()=>{n.loadingPromise=null,c()})):(n.loadingPromise=Promise.resolve().then(()=>{n.loadingPromise=null,n.loadingState=Nn.COMPLETE,c()}),n.loadingPromise)}function xC(n,e){return e[Hn].get(sb,null,{optional:!0})?.behavior!==im.Manual}function vC(n,e,t){let i=e[Ee],r=e[t.index];if(!xC(n,e))return;let s=io(e,t),o=Ca(i,t);switch(oC(s),o.loadingState){case Nn.NOT_STARTED:es(Ft.Loading,t,r),ub(o,e,t),o.loadingState===Nn.IN_PROGRESS&&Xx(o,t,r);break;case Nn.IN_PROGRESS:es(Ft.Loading,t,r),Xx(o,t,r);break;case Nn.COMPLETE:es(Ft.Complete,t,r);break;case Nn.FAILED:es(Ft.Error,t,r);break;default:}}async function db(n,e,t){let i=n.get(nu);if(i.hydrating.has(e))return;let{parentBlockPromise:s,hydrationQueue:o}=Nw(e,n);if(o.length===0)return;s!==null&&o.shift(),EC(i,o),s!==null&&await s;let a=o[0];i.has(a)?await Yx(n,o,t):i.awaitParentBlock(a,async()=>await Yx(n,o,t))}async function Yx(n,e,t){let i=n.get(nu),r=i.hydrating,s=n.get(pr),o=s.add();for(let c=0;c<e.length;c++){let l=e[c],u=i.get(l);if(u!=null){if(await SC(u),await MC(n),_C(u)){rI(u),Zx(e.slice(c),i);break}r.get(l).resolve()}else{bC(c,e,i),Zx(e.slice(c),i);break}}let a=e[e.length-1];await r.get(a)?.promise,s.remove(o),t&&t(e),sI(i.get(a),e,i,n.get(ni))}function _C(n){return io(n.lView,n.tNode)[Ia]===Ft.Error}function bC(n,e,t){let i=n-1,r=i>-1?t.get(e[i]):null;r&&du(r.lContainer)}function Zx(n,e){let t=e.hydrating;for(let i in n)t.get(i)?.reject();e.cleanup(n)}function EC(n,e){for(let t of e)n.hydrating.set(t,yC())}function MC(n){return new Promise(e=>f_(e,{injector:n}))}async function SC(n){let{tNode:e,lView:t}=n,i=io(t,e);return new Promise(r=>{TC(i,r),vC(2,t,e)})}function TC(n,e){Array.isArray(n[Js])||(n[Js]=[]),n[Js].push(e)}var vB=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";function Kx(n,e,t,i,r){S_(e,n,t,r?"class":"style",i)}function am(n,e,t,i){let r=tn(),s=r[Ee],o=n+Ot,a=s.firstCreatePass?$_(o,r,2,e,TA,ix(),t,i):s.data[o];if(b_(a,r,n,e,dm),Dh(a)){let c=r[Ee];y_(c,r,a),Jv(c,a,r)}return i!=null&&x_(r,a),am}function cm(){let n=Tl(),e=bi(),t=E_(e);return n.firstCreatePass&&q_(n,t),kh(t)&&Uh(),Oh(),t.classesWithoutHost!=null&&QT(t)&&Kx(n,t,tn(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&ew(t)&&Kx(n,t,tn(),t.stylesWithoutHost,!1),cm}function gu(n,e,t,i){return am(n,e,t,i),cm(),gu}function lm(n,e,t,i){let r=tn(),s=r[Ee],o=n+Ot,a=s.firstCreatePass?bI(o,s,2,e,t,i):s.data[o];return b_(a,r,n,e,dm),i!=null&&x_(r,a),lm}function um(){let n=bi(),e=E_(n);return kh(e)&&Uh(),Oh(),um}function yu(n,e,t,i){return lm(n,e,t,i),um(),yu}var dm=(n,e,t,i,r)=>(zi(!0),Vp(e[Lt],i,$h()));function wC(n,e,t,i,r){let s=!su(e,t);if(zi(s),s)return Vp(e[Lt],i,$h());let o=e[An],a=lu(o,n,e,t);return Xv(o,r)&&ru(o,r,a.nextSibling),o&&(mv(t)||gv(a))&&qs(t)&&(rx(t),n_(a)),a}function fb(){dm=wC}var AC=(n,e,t,i,r)=>(zi(!0),e_(e[Lt],""));function IC(n,e,t,i,r){let s,o=!su(e,t);if(zi(o),o)return e_(e[Lt],"");let a=e[An],c=lu(a,n,e,t),l=Rw(a,r);return ru(a,r,c),s=uu(l,c),s}function hb(){AC=IC}var Ra="en-US";var CC=Ra;function pb(n){typeof n=="string"&&(CC=n.toLowerCase().replace(/_/g,"-"))}function fm(n,e,t){HI(n,e,t)}function hm(n){let e=tn(),t=Tl(),i=Gh();Il(i+1);let r=tm(t,i);if(n.dirty&&Yy(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let s=jI(e,i);n.reset(s,pw),n.notifyOnChanges()}return!0}return!1}function pm(){return BI(tn(),Gh())}var RC=(n,e,t,i,r)=>(zi(!0),Qv(e[Lt],i));function DC(n,e,t,i,r){let s=!su(e,t);if(zi(s),s)return Qv(e[Lt],i);let o=e[An];return lu(o,n,e,t)}function mb(){RC=DC}var gb=(()=>{class n{applicationErrorHandler=ge(mr);appRef=ge(ni);taskService=ge(pr);ngZone=ge(Qt);zonelessEnabled=ge(ha);tracing=ge(gr,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new ln;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Jo):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(ge(Jh,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?Xh:qh;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Jo+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.taskService.remove(t),this.applicationErrorHandler(i)}finally{this.cleanup()}this.useMicrotaskScheduler=!0,Xh(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Mt({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function yb(){return[{provide:ar,useExisting:gb},{provide:Qt,useClass:Qo},{provide:ha,useValue:!0}]}function NC(){return typeof $localize<"u"&&$localize.locale||Ra}var mm=new Fe("",{factory:()=>ge(mm,{optional:!0,skipSelf:!0})||NC()});var _m={JSACTION:"__jsaction",OWNER:"__owner"},bb={};function PC(n){return n[_m.JSACTION]}function xb(n,e){n[_m.JSACTION]=e}function LC(n){return bb[n]}function OC(n,e){bb[n]=e}var Se={AUXCLICK:"auxclick",CHANGE:"change",CLICK:"click",CLICKMOD:"clickmod",CLICKONLY:"clickonly",DBLCLICK:"dblclick",FOCUS:"focus",FOCUSIN:"focusin",BLUR:"blur",FOCUSOUT:"focusout",SUBMIT:"submit",KEYDOWN:"keydown",KEYPRESS:"keypress",KEYUP:"keyup",MOUSEUP:"mouseup",MOUSEDOWN:"mousedown",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",MOUSEMOVE:"mousemove",POINTERUP:"pointerup",POINTERDOWN:"pointerdown",POINTEROVER:"pointerover",POINTEROUT:"pointerout",POINTERENTER:"pointerenter",POINTERLEAVE:"pointerleave",POINTERMOVE:"pointermove",POINTERCANCEL:"pointercancel",GOTPOINTERCAPTURE:"gotpointercapture",LOSTPOINTERCAPTURE:"lostpointercapture",ERROR:"error",LOAD:"load",UNLOAD:"unload",TOUCHSTART:"touchstart",TOUCHEND:"touchend",TOUCHMOVE:"touchmove",INPUT:"input",SCROLL:"scroll",TOGGLE:"toggle",CUSTOM:"_custom"},FC=[Se.MOUSEENTER,Se.MOUSELEAVE,"pointerenter","pointerleave"],MB=[Se.CLICK,Se.DBLCLICK,Se.FOCUSIN,Se.FOCUSOUT,Se.KEYDOWN,Se.KEYUP,Se.KEYPRESS,Se.MOUSEOVER,Se.MOUSEOUT,Se.SUBMIT,Se.TOUCHSTART,Se.TOUCHEND,Se.TOUCHMOVE,"touchcancel","auxclick","change","compositionstart","compositionupdate","compositionend","beforeinput","input","select","copy","cut","paste","mousedown","mouseup","wheel","contextmenu","dragover","dragenter","dragleave","drop","dragstart","dragend","pointerdown","pointermove","pointerup","pointercancel","pointerover","pointerout","gotpointercapture","lostpointercapture","ended","loadedmetadata","pagehide","pageshow","visibilitychange","beforematch"],kC=[Se.FOCUS,Se.BLUR,Se.ERROR,Se.LOAD,Se.TOGGLE],bm=n=>kC.indexOf(n)>=0;function UC(n){return n===Se.MOUSEENTER?Se.MOUSEOVER:n===Se.MOUSELEAVE?Se.MOUSEOUT:n===Se.POINTERENTER?Se.POINTEROVER:n===Se.POINTERLEAVE?Se.POINTEROUT:n}function BC(n,e,t,i){let r=!1;bm(e)&&(r=!0);let s=typeof i=="boolean"?{capture:r,passive:i}:r;return n.addEventListener(e,t,s),{eventType:e,handler:t,capture:r,passive:i}}function VC(n,e){if(n.removeEventListener){let t=typeof e.passive=="boolean"?{capture:e.capture}:e.capture;n.removeEventListener(e.eventType,e.handler,t)}else n.detachEvent&&n.detachEvent(`on${e.eventType}`,e.handler)}function HC(n){n.preventDefault?n.preventDefault():n.returnValue=!1}var vb=typeof navigator<"u"&&/Macintosh/.test(navigator.userAgent);function zC(n){return n.which===2||n.which==null&&n.button===4}function GC(n){return vb&&n.metaKey||!vb&&n.ctrlKey||zC(n)||n.shiftKey}function jC(n,e,t){let i=n.relatedTarget;return(n.type===Se.MOUSEOVER&&e===Se.MOUSEENTER||n.type===Se.MOUSEOUT&&e===Se.MOUSELEAVE||n.type===Se.POINTEROVER&&e===Se.POINTERENTER||n.type===Se.POINTEROUT&&e===Se.POINTERLEAVE)&&(!i||i!==t&&!t.contains(i))}function WC(n,e){let t={};for(let i in n){if(i==="srcElement"||i==="target")continue;let r=i,s=n[r];typeof s!="function"&&(t[r]=s)}return n.type===Se.MOUSEOVER?t.type=Se.MOUSEENTER:n.type===Se.MOUSEOUT?t.type=Se.MOUSELEAVE:n.type===Se.POINTEROVER?t.type=Se.POINTERENTER:t.type=Se.POINTERLEAVE,t.target=t.srcElement=e,t.bubbles=!1,t._originalEvent=n,t}var $C=typeof navigator<"u"&&/iPhone|iPad|iPod/.test(navigator.userAgent),bu=class{element;handlerInfos=[];constructor(e){this.element=e}addEventListener(e,t,i){$C&&(this.element.style.cursor="pointer"),this.handlerInfos.push(BC(this.element,e,t(this.element),i))}cleanUp(){for(let e=0;e<this.handlerInfos.length;e++)VC(this.element,this.handlerInfos[e]);this.handlerInfos=[]}},qC={NAMESPACE_ACTION_SEPARATOR:".",EVENT_ACTION_SEPARATOR:":"};function yr(n){return n.eventType}function Em(n,e){n.eventType=e}function vu(n){return n.event}function Eb(n,e){n.event=e}function Mb(n){return n.targetElement}function Sb(n,e){n.targetElement=e}function Tb(n){return n.eic}function XC(n,e){n.eic=e}function YC(n){return n.timeStamp}function ZC(n,e){n.timeStamp=e}function _u(n){return n.eia}function wb(n,e,t){n.eia=[e,t]}function gm(n){n.eia=void 0}function xu(n){return n[1]}function KC(n){return n.eirp}function Ab(n,e){n.eirp=e}function Ib(n){return n.eir}function Cb(n,e){n.eir=e}function Rb(n){return{eventType:n.eventType,event:n.event,targetElement:n.targetElement,eic:n.eic,eia:n.eia,timeStamp:n.timeStamp,eirp:n.eirp,eiack:n.eiack,eir:n.eir}}function JC(n,e,t,i,r,s,o,a){return{eventType:n,event:e,targetElement:t,eic:i,timeStamp:r,eia:s,eirp:o,eiack:a}}var ym=class n{eventInfo;constructor(e){this.eventInfo=e}getEventType(){return yr(this.eventInfo)}setEventType(e){Em(this.eventInfo,e)}getEvent(){return vu(this.eventInfo)}setEvent(e){Eb(this.eventInfo,e)}getTargetElement(){return Mb(this.eventInfo)}setTargetElement(e){Sb(this.eventInfo,e)}getContainer(){return Tb(this.eventInfo)}setContainer(e){XC(this.eventInfo,e)}getTimestamp(){return YC(this.eventInfo)}setTimestamp(e){ZC(this.eventInfo,e)}getAction(){let e=_u(this.eventInfo);if(e)return{name:e[0],element:e[1]}}setAction(e){if(!e){gm(this.eventInfo);return}wb(this.eventInfo,e.name,e.element)}getIsReplay(){return KC(this.eventInfo)}setIsReplay(e){Ab(this.eventInfo,e)}getResolved(){return Ib(this.eventInfo)}setResolved(e){Cb(this.eventInfo,e)}clone(){return new n(Rb(this.eventInfo))}},QC={},eR=/\s*;\s*/,tR=Se.CLICK,xm=class{a11yClickSupport=!1;clickModSupport=!0;syntheticMouseEventSupport;updateEventInfoForA11yClick=void 0;preventDefaultForA11yClick=void 0;populateClickOnlyAction=void 0;constructor({syntheticMouseEventSupport:e=!1,clickModSupport:t=!0}={}){this.syntheticMouseEventSupport=e,this.clickModSupport=t}resolveEventType(e){this.clickModSupport&&yr(e)===Se.CLICK&&GC(vu(e))?Em(e,Se.CLICKMOD):this.a11yClickSupport&&this.updateEventInfoForA11yClick(e)}resolveAction(e){Ib(e)||(this.populateAction(e,Mb(e)),Cb(e,!0))}resolveParentAction(e){let t=_u(e),i=t&&xu(t);gm(e);let r=i&&this.getParentNode(i);r&&this.populateAction(e,r)}populateAction(e,t){let i=t;for(;i&&i!==Tb(e)&&(i.nodeType===Node.ELEMENT_NODE&&this.populateActionOnElement(i,e),!_u(e));)i=this.getParentNode(i);let r=_u(e);if(r&&(this.a11yClickSupport&&this.preventDefaultForA11yClick(e),this.syntheticMouseEventSupport&&(yr(e)===Se.MOUSEENTER||yr(e)===Se.MOUSELEAVE||yr(e)===Se.POINTERENTER||yr(e)===Se.POINTERLEAVE)))if(jC(vu(e),yr(e),xu(r))){let s=WC(vu(e),xu(r));Eb(e,s),Sb(e,xu(r))}else gm(e)}getParentNode(e){let t=e[_m.OWNER];if(t)return t;let i=e.parentNode;return i?.nodeName==="#document-fragment"?i?.host??null:i}populateActionOnElement(e,t){let i=this.parseActions(e),r=i[yr(t)];r!==void 0&&wb(t,r,e),this.a11yClickSupport&&this.populateClickOnlyAction(e,t,i)}parseActions(e){let t=PC(e);if(!t){let i=e.getAttribute(Pl.JSACTION);if(!i)t=QC,xb(e,t);else{if(t=LC(i),!t){t={};let r=i.split(eR);for(let s=0;s<r.length;s++){let o=r[s];if(!o)continue;let a=o.indexOf(qC.EVENT_ACTION_SEPARATOR),c=a!==-1,l=c?o.substr(0,a).trim():tR,u=c?o.substr(a+1).trim():o;t[l]=u}OC(i,t)}xb(e,t)}}return t}addA11yClickSupport(e,t,i){this.a11yClickSupport=!0,this.updateEventInfoForA11yClick=e,this.preventDefaultForA11yClick=t,this.populateClickOnlyAction=i}},Db=(function(n){return n[n.I_AM_THE_JSACTION_FRAMEWORK=0]="I_AM_THE_JSACTION_FRAMEWORK",n})(Db||{}),vm=class{dispatchDelegate;actionResolver;eventReplayer;eventReplayScheduled=!1;replayEventInfoWrappers=[];constructor(e,{actionResolver:t,eventReplayer:i}={}){this.dispatchDelegate=e,this.actionResolver=t,this.eventReplayer=i}dispatch(e){let t=new ym(e);this.actionResolver?.resolveEventType(e),this.actionResolver?.resolveAction(e);let i=t.getAction();if(i&&nR(i.element,t)&&HC(t.getEvent()),this.eventReplayer&&t.getIsReplay()){this.scheduleEventInfoWrapperReplay(t);return}this.dispatchDelegate(t)}scheduleEventInfoWrapperReplay(e){this.replayEventInfoWrappers.push(e),!this.eventReplayScheduled&&(this.eventReplayScheduled=!0,Promise.resolve().then(()=>{this.eventReplayScheduled=!1,this.eventReplayer(this.replayEventInfoWrappers)}))}};function nR(n,e){return n.tagName==="A"&&(e.getEventType()===Se.CLICK||e.getEventType()===Se.CLICKMOD)}var Nb=Symbol.for("propagationStopped"),Mm={REPLAY:101};var iR="`preventDefault` called during event replay.";var rR="`composedPath` called during event replay.",Eu=class{dispatchDelegate;clickModSupport;actionResolver;dispatcher;constructor(e,t=!0){this.dispatchDelegate=e,this.clickModSupport=t,this.actionResolver=new xm({clickModSupport:t}),this.dispatcher=new vm(i=>{this.dispatchToDelegate(i)},{actionResolver:this.actionResolver})}dispatch(e){this.dispatcher.dispatch(e)}dispatchToDelegate(e){for(e.getIsReplay()&&aR(e),sR(e);e.getAction();){if(cR(e),bm(e.getEventType())&&e.getAction().element!==e.getTargetElement()||(this.dispatchDelegate(e.getEvent(),e.getAction().name),oR(e)))return;this.actionResolver.resolveParentAction(e.eventInfo)}}};function sR(n){let e=n.getEvent(),t=n.getEvent().stopPropagation.bind(e),i=()=>{e[Nb]=!0,t()};ss(e,"stopPropagation",i),ss(e,"stopImmediatePropagation",i)}function oR(n){return!!n.getEvent()[Nb]}function aR(n){let e=n.getEvent(),t=n.getTargetElement(),i=e.preventDefault.bind(e);ss(e,"target",t),ss(e,"eventPhase",Mm.REPLAY),ss(e,"preventDefault",()=>{throw i(),new Error(iR+"")}),ss(e,"composedPath",()=>{throw new Error(rR+"")})}function cR(n){let e=n.getEvent(),t=n.getAction()?.element;t&&ss(e,"currentTarget",t,{configurable:!0})}function ss(n,e,t,{configurable:i=!1}={}){Object.defineProperty(n,e,{value:t,configurable:i})}function Pb(n,e){n.ecrd(t=>{e.dispatch(t)},Db.I_AM_THE_JSACTION_FRAMEWORK)}function lR(n){return n?.q??[]}function uR(n){n&&(_b(n.c,n.et,n.h),_b(n.c,n.etc,n.h,!0))}function _b(n,e,t,i){for(let r=0;r<e.length;r++)n.removeEventListener(e[r],t,i)}var dR=!1,Lb=(()=>{class n{static MOUSE_SPECIAL_SUPPORT=dR;containerManager;eventHandlers={};browserEventTypeToExtraEventTypes={};dispatcher=null;queuedEventInfos=[];constructor(t){this.containerManager=t}handleEvent(t,i,r){let s=JC(t,i,i.target,r,Date.now());this.handleEventInfo(s)}handleEventInfo(t){if(!this.dispatcher){Ab(t,!0),this.queuedEventInfos?.push(t);return}this.dispatcher(t)}addEvent(t,i,r){if(t in this.eventHandlers||!this.containerManager||!n.MOUSE_SPECIAL_SUPPORT&&FC.indexOf(t)>=0)return;let s=(a,c,l)=>{this.handleEvent(a,c,l)};this.eventHandlers[t]=s;let o=UC(i||t);if(o!==t){let a=this.browserEventTypeToExtraEventTypes[o]||[];a.push(t),this.browserEventTypeToExtraEventTypes[o]=a}this.containerManager.addEventListener(o,a=>c=>{s(t,c,a)},r)}replayEarlyEvents(t=window._ejsa){t&&(this.replayEarlyEventInfos(t.q),uR(t),delete window._ejsa)}replayEarlyEventInfos(t){for(let i=0;i<t.length;i++){let r=t[i],s=this.getEventTypesForBrowserEventType(r.eventType);for(let o=0;o<s.length;o++){let a=Rb(r);Em(a,s[o]),this.handleEventInfo(a)}}}getEventTypesForBrowserEventType(t){let i=[];return this.eventHandlers[t]&&i.push(t),this.browserEventTypeToExtraEventTypes[t]&&i.push(...this.browserEventTypeToExtraEventTypes[t]),i}handler(t){return this.eventHandlers[t]}cleanUp(){this.containerManager?.cleanUp(),this.containerManager=null,this.eventHandlers={},this.browserEventTypeToExtraEventTypes={},this.dispatcher=null,this.queuedEventInfos=[]}registerDispatcher(t,i){this.ecrd(t,i)}ecrd(t,i){if(this.dispatcher=t,this.queuedEventInfos?.length){for(let r=0;r<this.queuedEventInfos.length;r++)this.handleEventInfo(this.queuedEventInfos[r]);this.queuedEventInfos=null}}}return n})();function Ob(n,e=window){return lR(e._ejsas?.[n])}function Sm(n,e=window){e._ejsas&&(e._ejsas[n]=void 0)}var Tm=new Fe(""),PR=new Fe("");function Da(n){return!n.moduleRef}function LR(n){let e=Da(n)?n.r3Injector:n.moduleRef.injector,t=e.get(Qt);return t.run(()=>{Da(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get(mr),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),Da(n)){let s=()=>e.destroy(),o=n.platformInjector.get(Tm);o.add(s),e.onDestroy(()=>{r.unsubscribe(),o.delete(s)})}else{let s=()=>n.moduleRef.destroy(),o=n.platformInjector.get(Tm);o.add(s),n.moduleRef.onDestroy(()=>{ma(n.allPlatformModules,n.moduleRef),r.unsubscribe(),o.delete(s)})}return FR(i,t,()=>{let s=e.get(pr),o=s.add(),a=e.get(om);return a.runInitializers(),a.donePromise.then(()=>{let c=e.get(mm,Ra);if(pb(c||Ra),!e.get(PR,!0))return Da(n)?e.get(ni):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(Da(n)){let u=e.get(ni);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return OR?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>void s.remove(o))})})}var OR;function FR(n,e,t){try{let i=t();return sm(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n(i)),i}}var Su=null;function kR(n=[],e){return yi.create({name:e,providers:[{provide:ta,useValue:"platform"},{provide:Tm,useValue:new Set([()=>Su=null])},...n]})}function UR(n=[]){if(Su)return Su;let e=kR(n);return Su=e,cb(),BR(e),e}function BR(n){let e=n.get(Ql,null);ia(n,()=>{e?.forEach(t=>t())})}function Vb(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;ot(tt.BootstrapApplicationStart);try{let s=r?.injector??UR(i),o=[yb(),_x,...t||[]],a=new Ea({providers:o,parent:s,debugName:"",runEnvironmentInitializers:!1});return LR({r3Injector:a.injector,platformInjector:s,rootComponent:e})}catch(s){return Promise.reject(s)}finally{ot(tt.BootstrapApplicationEnd)}}var Mu=new WeakSet,Fb="",Tu=[];function kb(n){return n.get(Op,Pv)}function Hb(){let n=[{provide:Op,useFactory:()=>{let e=!0;{let t=ge(Mi);e=!!window._ejsas?.[t]}return e&&rs("NgEventReplay"),e}}];return n.push({provide:Bi,useValue:()=>{let e=ge(ni),{injector:t}=e;if(!Mu.has(e)){let i=ge(Fp);if(kb(t)){Vv();let r=t.get(Mi),s=Bv(r,(o,a,c)=>{o.nodeType===Node.ELEMENT_NODE&&(Ov(o,a,c),Fv(o,i))});e.onDestroy(s)}}},multi:!0},{provide:ro,useFactory:()=>{let e=ge(ni),{injector:t}=e;return()=>{if(!kb(t)||Mu.has(e))return;Mu.add(e);let i=t.get(Mi);e.onDestroy(()=>{Mu.delete(e),Sm(i)}),e.whenStable().then(()=>{if(e.destroyed)return;let r=t.get(Uv);VR(r,t);let s=t.get(Fp);s.get(Fb)?.forEach(kv),s.delete(Fb);let o=r.instance;qv(t)?e.onDestroy(()=>o.cleanUp()):o.cleanUp()})}},multi:!0}),n}var VR=(n,e)=>{let t=e.get(Mi),i=window._ejsas[t],r=n.instance=new Lb(new bu(i.c));for(let a of i.et)r.addEvent(a);for(let a of i.etc)r.addEvent(a);let s=Ob(t);r.replayEarlyEventInfos(s),Sm(t);let o=new Eu(a=>{HR(e,a,a.currentTarget)});Pb(r,o)};function HR(n,e,t){let i=(t&&t.getAttribute(wa))??"";/d\d+/.test(i)?zR(i,n,e,t):e.eventPhase===Mm.REPLAY&&kp(e,t)}function zR(n,e,t,i){Tu.push({event:t,currentTarget:i}),db(e,n,GR)}function GR(n){let e=[...Tu],t=new Set(n);Tu=[];for(let{event:i,currentTarget:r}of e){let s=r.getAttribute(wa);t.has(s)?kp(i,r):Tu.push({event:i,currentTarget:r})}}var Ub=!1;function jR(){Ub||(Ub=!0,jv(),fb(),mb(),hb(),ib(),eb(),H_(),__())}function WR(n){return n.whenStable()}function zb(){let n=[{provide:Ta,useFactory:()=>{let e=!0;return e=!!ge(no,{optional:!0})?.get(Up,null),e&&rs("NgHydration"),e}},{provide:Bi,useValue:()=>{U_(!1);let e=ge(dn);ge(Ta)&&(Zv(e),jR())},multi:!0}];return n.push({provide:Lp,useFactory:()=>ge(Ta)},{provide:ro,useFactory:()=>{if(ge(Ta)){let e=ge(ni);return()=>{WR(e).then(()=>{e.destroyed||em(e)})}}return()=>{}},multi:!0}),lr(n)}var Gb=null;function Pa(){return Gb}function wm(n){Gb??=n}var Na=class{};function Am(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}var La=class{};var jb="browser";var Oa=class{_doc;constructor(e){this._doc=e}manager},Au=(()=>{class n extends Oa{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,s){return t.addEventListener(i,r,s),()=>this.removeEventListener(t,i,r,s)}removeEventListener(t,i,r,s){return t.removeEventListener(i,r,s)}static \u0275fac=function(i){return new(i||n)(ht(dn))};static \u0275prov=Mt({token:n,factory:n.\u0275fac})}return n})(),Ru=new Fe(""),Dm=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(o=>{o.manager=this});let r=t.filter(o=>!(o instanceof Au));this._plugins=r.slice().reverse();let s=t.find(o=>o instanceof Au);s&&this._plugins.push(s)}addEventListener(t,i,r,s){return this._findPluginFor(i).addEventListener(t,i,r,s)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new Ge(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)(ht(Ru),ht(Qt))};static \u0275prov=Mt({token:n,factory:n.\u0275fac})}return n})(),Im="ng-app-id";function Wb(n){for(let e of n)e.remove()}function $b(n,e){let t=e.createElement("style");return t.textContent=n,t}function $R(n,e,t,i){let r=n.head?.querySelectorAll(`style[${Im}="${e}"],link[${Im}="${e}"]`);if(r)for(let s of r)s.removeAttribute(Im),s instanceof HTMLLinkElement?i.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&t.set(s.textContent,{usage:0,elements:[s]})}function Rm(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var Nm=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,$R(t,i,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,$b);i?.forEach(r=>this.addUsage(r,this.external,Rm))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let s=i.get(t);s?s.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(Wb(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])Wb(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,$b(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,Rm(i,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)(ht(dn),ht(Mi),ht(eu,8),ht(Sa))};static \u0275prov=Mt({token:n,factory:n.\u0275fac})}return n})(),Cm={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Pm=/%COMP%/g;var Xb="%COMP%",qR=`_nghost-${Xb}`,XR=`_ngcontent-${Xb}`,YR=!0,ZR=new Fe("",{factory:()=>YR});function KR(n){return XR.replace(Pm,n)}function JR(n){return qR.replace(Pm,n)}function Yb(n,e){return e.map(t=>t.replace(Pm,n))}var Lm=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;platformIsServer;constructor(t,i,r,s,o,a,c=null,l=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.ngZone=a,this.nonce=c,this.tracingService=l,this.platformIsServer=!1,this.defaultRenderer=new Fa(t,o,a,this.platformIsServer,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof Cu?r.applyToHost(t):r instanceof ka&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.platformIsServer,f=this.tracingService;switch(i.encapsulation){case ti.Emulated:s=new Cu(c,l,i,this.appId,u,o,a,d,f);break;case ti.ShadowDom:return new Iu(c,t,i,o,a,this.nonce,d,f,l);case ti.ExperimentalIsolatedShadowDom:return new Iu(c,t,i,o,a,this.nonce,d,f);default:s=new ka(c,l,i,u,o,a,d,f);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)(ht(Dm),ht(Nm),ht(Mi),ht(ZR),ht(dn),ht(Qt),ht(eu),ht(gr,8))};static \u0275prov=Mt({token:n,factory:n.\u0275fac})}return n})(),Fa=class{eventManager;doc;ngZone;platformIsServer;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r,s){this.eventManager=e,this.doc=t,this.ngZone=i,this.platformIsServer=r,this.tracingService=s}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(Cm[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(qb(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(qb(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new Ge(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=Cm[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=Cm[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(is.DashCase|is.Important)?e.style.setProperty(t,i,r&is.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&is.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=Pa().getGlobalEventTarget(this.doc,e),!e))throw new Ge(5102,!1);let s=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(e,t,s)),this.eventManager.addEventListener(e,t,s,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function qb(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Iu=class extends Fa{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,i,r,s,o,a,c,l){super(e,r,s,a,c),this.hostEl=t,this.sharedStylesHost=l,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let u=i.styles;u=Yb(i.id,u);for(let f of u){let h=document.createElement("style");o&&h.setAttribute("nonce",o),h.textContent=f,this.shadowRoot.appendChild(h)}let d=i.getExternalStyles?.();if(d)for(let f of d){let h=Rm(f,r);o&&h.setAttribute("nonce",o),this.shadowRoot.appendChild(h)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},ka=class extends Fa{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,s,o,a,c,l){super(e,s,o,a,c),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let u=i.styles;this.styles=l?Yb(l,u):u,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Qs.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Cu=class extends ka{contentAttr;hostAttr;constructor(e,t,i,r,s,o,a,c,l){let u=r+"-"+i.id;super(e,t,i,s,o,a,c,l,u),this.contentAttr=KR(u),this.hostAttr=JR(u)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var Du=class n extends Na{supportsDOMEvents=!0;static makeCurrent(){wm(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=QR();return t==null?null:eD(t)}resetBaseElement(){Ua=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return Am(document.cookie,e)}},Ua=null;function QR(){return Ua=Ua||document.head.querySelector("base"),Ua?Ua.getAttribute("href"):null}function eD(n){return new URL(n,document.baseURI).pathname}var tD=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Mt({token:n,factory:n.\u0275fac})}return n})(),Zb=["alt","control","meta","shift"],nD={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},iD={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},Kb=(()=>{class n extends Oa{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,s){let o=n.parseEventName(i),a=n.eventCallback(o.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Pa().onAndCancel(t,o.domEventName,a,s))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),Zb.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),o+=l+".")}),o+=s,i.length!=0||s.length===0)return null;let c={};return c.domEventName=r,c.fullKey=o,c}static matchEventFullKeyCode(t,i){let r=nD[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),Zb.forEach(o=>{if(o!==r){let a=iD[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)(ht(dn))};static \u0275prov=Mt({token:n,factory:n.\u0275fac})}return n})();function Om(n,e,t){let i=Nt({rootComponent:n,platformRef:t?.platformRef},rD(e));return Vb(i)}function rD(n){return{appProviders:[...lD,...n?.providers??[]],platformProviders:cD}}function sD(){Du.makeCurrent()}function oD(){return new xi}function aD(){return Dp(document),document}var cD=[{provide:Sa,useValue:jb},{provide:Ql,useValue:sD,multi:!0},{provide:dn,useFactory:aD}];var lD=[{provide:ta,useValue:"root"},{provide:xi,useFactory:oD},{provide:Ru,useClass:Au,multi:!0},{provide:Ru,useClass:Kb,multi:!0},Lm,Nm,Dm,{provide:ns,useExisting:Lm},{provide:La,useClass:tD},[]];var Ba=class n{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(e){e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(t=>{let i=t.indexOf(":");if(i>0){let r=t.slice(0,i),s=t.slice(i+1).trim();this.addHeaderEntry(r,s)}})}:typeof Headers<"u"&&e instanceof Headers?(this.headers=new Map,e.forEach((t,i)=>{this.addHeaderEntry(i,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(e).forEach(([t,i])=>{this.setHeaderEntries(t,i)})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let t=this.headers.get(e.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,t){return this.clone({name:e,value:t,op:"a"})}set(e,t){return this.clone({name:e,value:t,op:"s"})}delete(e,t){return this.clone({name:e,value:t,op:"d"})}maybeSetNormalizedName(e,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,e)}init(){this.lazyInit&&(this.lazyInit instanceof n?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(t=>{this.headers.set(t,e.headers.get(t)),this.normalizedNames.set(t,e.normalizedNames.get(t))})}clone(e){let t=new n;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof n?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([e]),t}applyUpdate(e){let t=e.name.toLowerCase();switch(e.op){case"a":case"s":let i=e.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(e.name,t);let r=(e.op==="a"?this.headers.get(t):void 0)||[];r.push(...i),this.headers.set(t,r);break;case"d":let s=e.value;if(!s)this.headers.delete(t),this.normalizedNames.delete(t);else{let o=this.headers.get(t);if(!o)return;o=o.filter(a=>s.indexOf(a)===-1),o.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,o)}break}}addHeaderEntry(e,t){let i=e.toLowerCase();this.maybeSetNormalizedName(e,i),this.headers.has(i)?this.headers.get(i).push(t):this.headers.set(i,[t])}setHeaderEntries(e,t){let i=(Array.isArray(t)?t:[t]).map(s=>s.toString()),r=e.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(e,r)}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>e(this.normalizedNames.get(t),this.headers.get(t)))}};var uD="text/plain",dD="application/json",i8=`${dD}, ${uD}, */*`;var km=(function(n){return n[n.Sent=0]="Sent",n[n.UploadProgress=1]="UploadProgress",n[n.ResponseHeader=2]="ResponseHeader",n[n.DownloadProgress=3]="DownloadProgress",n[n.Response=4]="Response",n[n.User=5]="User",n})(km||{}),Fm=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(e,t=200,i="OK"){this.headers=e.headers||new Ba,this.status=e.status!==void 0?e.status:t,this.statusText=e.statusText||i,this.url=e.url||null,this.redirected=e.redirected,this.responseType=e.responseType,this.ok=this.status>=200&&this.status<300}};var Nu=class n extends Fm{body;constructor(e={}){super(e),this.body=e.body!==void 0?e.body:null}type=km.Response;clone(e={}){return new n({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0,redirected:e.redirected??this.redirected,responseType:e.responseType??this.responseType})}};var Jb=new Fe("");var fD=new Fe(""),hD="b",pD="h",mD="s",gD="st",yD="u",xD="rt",Um=new Fe(""),vD=["GET","HEAD"];function _D(n,e){let h=ge(Um),{isCacheActive:t}=h,i=G0(h,["isCacheActive"]),{transferCache:r,method:s}=n;if(!t||r===!1||s==="POST"&&!i.includePostRequests&&!r||s!=="POST"&&!vD.includes(s)||!i.includeRequestsWithAuthHeaders&&bD(n)||i.filter?.(n)===!1)return e(n);let o=ge(no);if(ge(fD,{optional:!0}))throw new Ge(2803,!1);let c=n.url,l=ED(n,c),u=o.get(l,null),d=i.includeHeaders;if(typeof r=="object"&&r.includeHeaders&&(d=r.includeHeaders),u){let{[hD]:m,[xD]:y,[pD]:g,[mD]:p,[gD]:M,[yD]:E}=u,T=m;switch(y){case"arraybuffer":T=new TextEncoder().encode(m).buffer;break;case"blob":T=new Blob([m]);break}let I=new Ba(g);return Jf(new Nu({body:T,headers:I,status:p,statusText:M,url:E}))}return e(n)}function bD(n){return n.headers.has("authorization")||n.headers.has("proxy-authorization")}function Qb(n){return[...n.keys()].sort().map(e=>`${e}=${n.getAll(e)}`).join("&")}function ED(n,e){let{params:t,method:i,responseType:r}=n,s=Qb(t),o=n.serializeBody();o instanceof URLSearchParams?o=Qb(o):typeof o!="string"&&(o="");let a=[i,r,e,o,s].join("|"),c=MD(a);return c}function MD(n){let e=0;for(let t of n)e=Math.imul(31,e)+t.charCodeAt(0)<<0;return e+=2147483648,e.toString()}function eE(n){return[{provide:Um,useFactory:()=>(rs("NgHttpTransferCache"),Nt({isCacheActive:!0},n))},{provide:Jb,useValue:_D,multi:!0},{provide:ro,multi:!0,useFactory:()=>{let e=ge(ni),t=ge(Um);return()=>{e.whenStable().then(()=>{t.isCacheActive=!1})}}}]}var Pu=(function(n){return n[n.NoHttpTransferCache=0]="NoHttpTransferCache",n[n.HttpTransferCacheOptions=1]="HttpTransferCacheOptions",n[n.I18nSupport=2]="I18nSupport",n[n.EventReplay=3]="EventReplay",n[n.IncrementalHydration=4]="IncrementalHydration",n})(Pu||{});function SD(n,e=[],t={}){return{\u0275kind:n,\u0275providers:e}}function tE(){return SD(Pu.EventReplay,Hb())}function nE(...n){let e=[],t=new Set;for(let{\u0275providers:r,\u0275kind:s}of n)t.add(s),r.length&&e.push(r);let i=t.has(Pu.HttpTransferCacheOptions);return lr([[],zb(),t.has(Pu.NoHttpTransferCache)||i?[]:eE({}),e])}var iE={providers:[Kh(),nE(tE())]};var Dr={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Nr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},VE=0,bg=1,HE=2;var Eg=1,Td=2,Ni=3,li=0,Kt=1,qn=2,Pi=0,hs=1,wc=2,Mg=3,Sg=4,zE=5,Tr=100,GE=101,jE=102,WE=103,$E=104,qE=200,XE=201,YE=202,ZE=203,sd=204,od=205,KE=206,JE=207,QE=208,eM=209,tM=210,nM=211,iM=212,rM=213,sM=214,wd=0,Ad=1,Id=2,ps=3,Cd=4,Rd=5,Dd=6,Nd=7,Tg=0,oM=1,aM=2,ir=0,cM=1,lM=2,uM=3,dM=4,fM=5,hM=6,pM=7,fg="attached",mM="detached",hg=300,Es=301,Ms=302,Pd=303,Ld=304,Ac=306,Ti=1e3,Wn=1001,bo=1002,Xt=1003,Od=1004;var Ss=1005;var Yt=1006,ko=1007;var di=1008;var fi=1009,wg=1010,Ag=1011,Uo=1012,Fd=1013,Pr=1014,Xn=1015,Ts=1016,kd=1017,Ud=1018,Bo=1020,Ig=35902,Cg=35899,Rg=1021,Dg=1022,kn=1023,Eo=1026,Vo=1027,Bd=1028,Vd=1029,Hd=1030,zd=1031;var Gd=1033,Ic=33776,Cc=33777,Rc=33778,Dc=33779,jd=35840,Wd=35841,$d=35842,qd=35843,Xd=36196,Yd=37492,Zd=37496,Kd=37808,Jd=37809,Qd=37810,ef=37811,tf=37812,nf=37813,rf=37814,sf=37815,of=37816,af=37817,cf=37818,lf=37819,uf=37820,df=37821,ff=36492,hf=36494,pf=36495,mf=36283,gf=36284,yf=36285,xf=36286,gM=2200,yM=2201,xM=2202,ms=2300,gs=2301,rd=2302,ds=2400,fs=2401,Za=2402,vf=2500,vM=2501,Ng=0,Nc=1,Ho=2,_M=3200,bM=3201;var Pg=0,EM=1,rr="",zt="srgb",Zt="srgb-linear",Ka="linear",ct="srgb";var us=7680;var pg=519,MM=512,SM=513,TM=514,Lg=515,wM=516,AM=517,IM=518,CM=519,ad=35044;var Og="300 es",ai=2e3,Ja=2001;function Fg(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Mo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function RM(){let n=Mo("canvas");return n.style.display="block",n}var rE={},So=null;function Qa(...n){let e="THREE."+n.shift();So?So("log",e,...n):console.log(e,...n)}function xe(...n){let e="THREE."+n.shift();So?So("warn",e,...n):console.warn(e,...n)}function We(...n){let e="THREE."+n.shift();So?So("error",e,...n):console.error(e,...n)}function To(...n){let e=n.join(" ");e in rE||(rE[e]=!0,xe(...n))}function DM(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var ui=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sE=1234567,Xa=Math.PI/180,ys=180/Math.PI;function ci(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[t&63|128]+nn[t>>8&255]+"-"+nn[t>>16&255]+nn[t>>24&255]+nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]).toLowerCase()}function je(n,e,t){return Math.max(e,Math.min(t,n))}function kg(n,e){return(n%e+e)%e}function TD(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function wD(n,e,t){return n!==e?(t-n)/(e-n):0}function Ya(n,e,t){return(1-t)*n+t*e}function AD(n,e,t,i){return Ya(n,e,1-Math.exp(-t*i))}function ID(n,e=1){return e-Math.abs(kg(n,e*2)-e)}function CD(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function RD(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function DD(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ND(n,e){return n+Math.random()*(e-n)}function PD(n){return n*(.5-Math.random())}function LD(n){n!==void 0&&(sE=n);let e=sE+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function OD(n){return n*Xa}function FD(n){return n*ys}function kD(n){return(n&n-1)===0&&n!==0}function UD(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function BD(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function VD(n,e,t,i,r){let s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+i)/2),u=o((e+i)/2),d=s((e-i)/2),f=o((e-i)/2),h=s((i-e)/2),m=o((i-e)/2);switch(r){case"XYX":n.set(a*u,c*d,c*f,a*l);break;case"YZY":n.set(c*f,a*u,c*d,a*l);break;case"ZXZ":n.set(c*d,c*f,a*u,a*l);break;case"XZX":n.set(a*u,c*m,c*h,a*l);break;case"YXY":n.set(c*h,a*u,c*m,a*l);break;case"ZYZ":n.set(c*m,c*h,a*u,a*l);break;default:xe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function oi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function at(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Pc={DEG2RAD:Xa,RAD2DEG:ys,generateUUID:ci,clamp:je,euclideanModulo:kg,mapLinear:TD,inverseLerp:wD,lerp:Ya,damp:AD,pingpong:ID,smoothstep:CD,smootherstep:RD,randInt:DD,randFloat:ND,randFloatSpread:PD,seededRandom:LD,degToRad:OD,radToDeg:FD,isPowerOfTwo:kD,ceilPowerOfTwo:UD,floorPowerOfTwo:BD,setQuaternionFromProperEuler:VD,normalize:at,denormalize:oi},Te=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Bt=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],h=s[o+1],m=s[o+2],y=s[o+3];if(a<=0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a>=1){e[t+0]=f,e[t+1]=h,e[t+2]=m,e[t+3]=y;return}if(d!==y||c!==f||l!==h||u!==m){let g=c*f+l*h+u*m+d*y;g<0&&(f=-f,h=-h,m=-m,y=-y,g=-g);let p=1-a;if(g<.9995){let M=Math.acos(g),E=Math.sin(M);p=Math.sin(p*M)/E,a=Math.sin(a*M)/E,c=c*p+f*a,l=l*p+h*a,u=u*p+m*a,d=d*p+y*a}else{c=c*p+f*a,l=l*p+h*a,u=u*p+m*a,d=d*p+y*a;let M=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=M,l*=M,u*=M,d*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[o],f=s[o+1],h=s[o+2],m=s[o+3];return e[t]=a*m+u*d+c*h-l*f,e[t+1]=c*m+u*f+l*d-a*h,e[t+2]=l*m+u*h+a*f-c*d,e[t+3]=u*m-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(s/2),f=c(i/2),h=c(r/2),m=c(s/2);switch(o){case"XYZ":this._x=f*u*d+l*h*m,this._y=l*h*d-f*u*m,this._z=l*u*m+f*h*d,this._w=l*u*d-f*h*m;break;case"YXZ":this._x=f*u*d+l*h*m,this._y=l*h*d-f*u*m,this._z=l*u*m-f*h*d,this._w=l*u*d+f*h*m;break;case"ZXY":this._x=f*u*d-l*h*m,this._y=l*h*d+f*u*m,this._z=l*u*m+f*h*d,this._w=l*u*d-f*h*m;break;case"ZYX":this._x=f*u*d-l*h*m,this._y=l*h*d+f*u*m,this._z=l*u*m-f*h*d,this._w=l*u*d+f*h*m;break;case"YZX":this._x=f*u*d+l*h*m,this._y=l*h*d+f*u*m,this._z=l*u*m-f*h*d,this._w=l*u*d-f*h*m;break;case"XZY":this._x=f*u*d-l*h*m,this._y=l*h*d-f*u*m,this._z=l*u*m+f*h*d,this._w=l*u*d+f*h*m;break;default:xe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(s-l)*h,this._z=(o-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+l)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(s-l)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(o-r)/h,this._x=(s+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},A=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(oE.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(oE.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-s*d,this.z=r+c*d+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Bm.copy(this).projectOnVector(e),this.sub(Bm)}reflect(e){return this.sub(Bm.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Bm=new A,oE=new Bt,He=class n{constructor(e,t,i,r,s,o,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],h=i[5],m=i[8],y=r[0],g=r[3],p=r[6],M=r[1],E=r[4],T=r[7],I=r[2],w=r[5],R=r[8];return s[0]=o*y+a*M+c*I,s[3]=o*g+a*E+c*w,s[6]=o*p+a*T+c*R,s[1]=l*y+u*M+d*I,s[4]=l*g+u*E+d*w,s[7]=l*p+u*T+d*R,s[2]=f*y+h*M+m*I,s[5]=f*g+h*E+m*w,s[8]=f*p+h*T+m*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*s,h=l*s-o*c,m=t*d+i*f+r*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=d*y,e[1]=(r*l-u*i)*y,e[2]=(a*i-r*o)*y,e[3]=f*y,e[4]=(u*t-r*c)*y,e[5]=(r*s-a*t)*y,e[6]=h*y,e[7]=(i*c-l*t)*y,e[8]=(o*t-i*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Vm.makeScale(e,t)),this}rotate(e){return this.premultiply(Vm.makeRotation(-e)),this}translate(e,t){return this.premultiply(Vm.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Vm=new He,aE=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cE=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function HD(){let n={enabled:!0,workingColorSpace:Zt,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ct&&(r.r=Yi(r.r),r.g=Yi(r.g),r.b=Yi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ct&&(r.r=_o(r.r),r.g=_o(r.g),r.b=_o(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===rr?Ka:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return To("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return To("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Zt]:{primaries:e,whitePoint:i,transfer:Ka,toXYZ:aE,fromXYZ:cE,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:e,whitePoint:i,transfer:ct,toXYZ:aE,fromXYZ:cE,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}}),n}var Je=HD();function Yi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function _o(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var so,cd=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{so===void 0&&(so=Mo("canvas")),so.width=e.width,so.height=e.height;let r=so.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=so}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Mo("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Yi(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Yi(t[i]/255)*255):t[i]=Yi(t[i]);return{data:t,width:e.width,height:e.height}}else return xe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},zD=0,wo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zD++}),this.uuid=ci(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Hm(r[o].image)):s.push(Hm(r[o]))}else s=Hm(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Hm(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?cd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(xe("Texture: Unable to serialize Texture."),{})}var GD=0,zm=new A,_n=(()=>{class n extends ui{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=Wn,s=Wn,o=Yt,a=di,c=kn,l=fi,u=n.DEFAULT_ANISOTROPY,d=rr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:GD++}),this.uuid=ci(),this.name="",this.source=new wo(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new Te(0,0),this.repeat=new Te(1,1),this.center=new Te(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(zm).x}get height(){return this.source.getSize(zm).y}get depth(){return this.source.getSize(zm).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){xe(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let s=this[i];if(s===void 0){xe(`Texture.setValues(): property '${i}' does not exist.`);continue}s&&r&&s.isVector2&&r.isVector2||s&&r&&s.isVector3&&r.isVector3||s&&r&&s.isMatrix3&&r.isMatrix3?s.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ti:t.x=t.x-Math.floor(t.x);break;case Wn:t.x=t.x<0?0:1;break;case bo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ti:t.y=t.y-Math.floor(t.y);break;case Wn:t.y=t.y<0?0:1;break;case bo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=hg,n.DEFAULT_ANISOTROPY=1,n})(),it=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],m=c[9],y=c[2],g=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(m+g)<.1&&Math.abs(l+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(l+1)/2,T=(h+1)/2,I=(p+1)/2,w=(u+f)/4,R=(d+y)/4,O=(m+g)/4;return E>T&&E>I?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=w/i,s=R/i):T>I?T<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),i=w/r,s=O/r):I<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),i=R/s,r=O/s),this.set(i,r,s,t),this}let M=Math.sqrt((g-m)*(g-m)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(d-y)/M,this.z=(f-u)/M,this.w=Math.acos((l+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ld=class extends ui{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);let r={width:e,height:t,depth:i.depth},s=new _n(r);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new wo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},wi=class extends ld{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},ec=class extends _n{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ud=class extends _n{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var On=class{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ii):ii.fromBufferAttribute(s,o),ii.applyMatrix4(e.matrixWorld),this.expandByPoint(ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Lu.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Lu.copy(i.boundingBox)),Lu.applyMatrix4(e.matrixWorld),this.union(Lu)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ii),ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Va),Ou.subVectors(this.max,Va),oo.subVectors(e.a,Va),ao.subVectors(e.b,Va),co.subVectors(e.c,Va),xr.subVectors(ao,oo),vr.subVectors(co,ao),os.subVectors(oo,co);let t=[0,-xr.z,xr.y,0,-vr.z,vr.y,0,-os.z,os.y,xr.z,0,-xr.x,vr.z,0,-vr.x,os.z,0,-os.x,-xr.y,xr.x,0,-vr.y,vr.x,0,-os.y,os.x,0];return!Gm(t,oo,ao,co,Ou)||(t=[1,0,0,0,1,0,0,0,1],!Gm(t,oo,ao,co,Ou))?!1:(Fu.crossVectors(xr,vr),t=[Fu.x,Fu.y,Fu.z],Gm(t,oo,ao,co,Ou))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Gi=[new A,new A,new A,new A,new A,new A,new A,new A],ii=new A,Lu=new On,oo=new A,ao=new A,co=new A,xr=new A,vr=new A,os=new A,Va=new A,Ou=new A,Fu=new A,as=new A;function Gm(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){as.fromArray(n,s);let a=r.x*Math.abs(as.x)+r.y*Math.abs(as.y)+r.z*Math.abs(as.z),c=e.dot(as),l=t.dot(as),u=i.dot(as);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var jD=new On,Ha=new A,jm=new A,yn=class{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):jD.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ha.subVectors(e,this.center);let t=Ha.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ha,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(jm.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ha.copy(e.center).add(jm)),this.expandByPoint(Ha.copy(e.center).sub(jm))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ji=new A,Wm=new A,ku=new A,_r=new A,$m=new A,Uu=new A,qm=new A,Zi=class{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ji)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ji.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ji.copy(this.origin).addScaledVector(this.direction,t),ji.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Wm.copy(e).add(t).multiplyScalar(.5),ku.copy(t).sub(e).normalize(),_r.copy(this.origin).sub(Wm);let s=e.distanceTo(t)*.5,o=-this.direction.dot(ku),a=_r.dot(this.direction),c=-_r.dot(ku),l=_r.lengthSq(),u=Math.abs(1-o*o),d,f,h,m;if(u>0)if(d=o*c-a,f=o*a-c,m=s*u,d>=0)if(f>=-m)if(f<=m){let y=1/u;d*=y,f*=y,h=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-m?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l):f<=m?(d=0,f=Math.min(Math.max(-s,-c),s),h=f*(f+2*c)+l):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Wm).addScaledVector(ku,f),h}intersectSphere(e,t){ji.subVectors(e.center,this.origin);let i=ji.dot(this.direction),r=ji.dot(ji)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ji)!==null}intersectTriangle(e,t,i,r,s){$m.subVectors(t,e),Uu.subVectors(i,e),qm.crossVectors($m,Uu);let o=this.direction.dot(qm),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;_r.subVectors(this.origin,e);let c=a*this.direction.dot(Uu.crossVectors(_r,Uu));if(c<0)return null;let l=a*this.direction.dot($m.cross(_r));if(l<0||c+l>o)return null;let u=-a*_r.dot(qm);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ke=class n{constructor(e,t,i,r,s,o,a,c,l,u,d,f,h,m,y,g){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,d,f,h,m,y,g)}set(e,t,i,r,s,o,a,c,l,u,d,f,h,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,r=1/lo.setFromMatrixColumn(e,0).length(),s=1/lo.setFromMatrixColumn(e,1).length(),o=1/lo.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=o*u,h=o*d,m=a*u,y=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+m*l,t[5]=f-y*l,t[9]=-a*c,t[2]=y-f*l,t[6]=m+h*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,m=l*u,y=l*d;t[0]=f+y*a,t[4]=m*a-h,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-m,t[6]=y+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,m=l*u,y=l*d;t[0]=f-y*a,t[4]=-o*d,t[8]=m+h*a,t[1]=h+m*a,t[5]=o*u,t[9]=y-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,h=o*d,m=a*u,y=a*d;t[0]=c*u,t[4]=m*l-h,t[8]=f*l+y,t[1]=c*d,t[5]=y*l+f,t[9]=h*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,h=o*l,m=a*c,y=a*l;t[0]=c*u,t[4]=y-f*d,t[8]=m*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+m,t[10]=f-y*d}else if(e.order==="XZY"){let f=o*c,h=o*l,m=a*c,y=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+y,t[5]=o*u,t[9]=h*d-m,t[2]=m*d-h,t[6]=a*u,t[10]=y*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(WD,e,$D)}lookAt(e,t,i){let r=this.elements;return Pn.subVectors(e,t),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),br.crossVectors(i,Pn),br.lengthSq()===0&&(Math.abs(i.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),br.crossVectors(i,Pn)),br.normalize(),Bu.crossVectors(Pn,br),r[0]=br.x,r[4]=Bu.x,r[8]=Pn.x,r[1]=br.y,r[5]=Bu.y,r[9]=Pn.y,r[2]=br.z,r[6]=Bu.z,r[10]=Pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],h=i[13],m=i[2],y=i[6],g=i[10],p=i[14],M=i[3],E=i[7],T=i[11],I=i[15],w=r[0],R=r[4],O=r[8],b=r[12],_=r[1],N=r[5],k=r[9],V=r[13],j=r[2],G=r[6],q=r[10],J=r[14],z=r[3],ne=r[7],se=r[11],we=r[15];return s[0]=o*w+a*_+c*j+l*z,s[4]=o*R+a*N+c*G+l*ne,s[8]=o*O+a*k+c*q+l*se,s[12]=o*b+a*V+c*J+l*we,s[1]=u*w+d*_+f*j+h*z,s[5]=u*R+d*N+f*G+h*ne,s[9]=u*O+d*k+f*q+h*se,s[13]=u*b+d*V+f*J+h*we,s[2]=m*w+y*_+g*j+p*z,s[6]=m*R+y*N+g*G+p*ne,s[10]=m*O+y*k+g*q+p*se,s[14]=m*b+y*V+g*J+p*we,s[3]=M*w+E*_+T*j+I*z,s[7]=M*R+E*N+T*G+I*ne,s[11]=M*O+E*k+T*q+I*se,s[15]=M*b+E*V+T*J+I*we,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],m=e[3],y=e[7],g=e[11],p=e[15];return m*(+s*c*d-r*l*d-s*a*f+i*l*f+r*a*h-i*c*h)+y*(+t*c*h-t*l*f+s*o*f-r*o*h+r*l*u-s*c*u)+g*(+t*l*d-t*a*h-s*o*d+i*o*h+s*a*u-i*l*u)+p*(-r*a*u-t*c*d+t*a*f+r*o*d-i*o*f+i*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],m=e[12],y=e[13],g=e[14],p=e[15],M=d*g*l-y*f*l+y*c*h-a*g*h-d*c*p+a*f*p,E=m*f*l-u*g*l-m*c*h+o*g*h+u*c*p-o*f*p,T=u*y*l-m*d*l+m*a*h-o*y*h-u*a*p+o*d*p,I=m*d*c-u*y*c-m*a*f+o*y*f+u*a*g-o*d*g,w=t*M+i*E+r*T+s*I;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/w;return e[0]=M*R,e[1]=(y*f*s-d*g*s-y*r*h+i*g*h+d*r*p-i*f*p)*R,e[2]=(a*g*s-y*c*s+y*r*l-i*g*l-a*r*p+i*c*p)*R,e[3]=(d*c*s-a*f*s-d*r*l+i*f*l+a*r*h-i*c*h)*R,e[4]=E*R,e[5]=(u*g*s-m*f*s+m*r*h-t*g*h-u*r*p+t*f*p)*R,e[6]=(m*c*s-o*g*s-m*r*l+t*g*l+o*r*p-t*c*p)*R,e[7]=(o*f*s-u*c*s+u*r*l-t*f*l-o*r*h+t*c*h)*R,e[8]=T*R,e[9]=(m*d*s-u*y*s-m*i*h+t*y*h+u*i*p-t*d*p)*R,e[10]=(o*y*s-m*a*s+m*i*l-t*y*l-o*i*p+t*a*p)*R,e[11]=(u*a*s-o*d*s-u*i*l+t*d*l+o*i*h-t*a*h)*R,e[12]=I*R,e[13]=(u*y*r-m*d*r+m*i*f-t*y*f-u*i*g+t*d*g)*R,e[14]=(m*a*r-o*y*r-m*i*c+t*y*c+o*i*g-t*a*g)*R,e[15]=(o*d*r-u*a*r+u*i*c-t*d*c-o*i*f+t*a*f)*R,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,d=a+a,f=s*l,h=s*u,m=s*d,y=o*u,g=o*d,p=a*d,M=c*l,E=c*u,T=c*d,I=i.x,w=i.y,R=i.z;return r[0]=(1-(y+p))*I,r[1]=(h+T)*I,r[2]=(m-E)*I,r[3]=0,r[4]=(h-T)*w,r[5]=(1-(f+p))*w,r[6]=(g+M)*w,r[7]=0,r[8]=(m+E)*R,r[9]=(g-M)*R,r[10]=(1-(f+y))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements,s=lo.set(r[0],r[1],r[2]).length(),o=lo.set(r[4],r[5],r[6]).length(),a=lo.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ri.copy(this);let l=1/s,u=1/o,d=1/a;return ri.elements[0]*=l,ri.elements[1]*=l,ri.elements[2]*=l,ri.elements[4]*=u,ri.elements[5]*=u,ri.elements[6]*=u,ri.elements[8]*=d,ri.elements[9]*=d,ri.elements[10]*=d,t.setFromRotationMatrix(ri),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=ai,c=!1){let l=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r),m,y;if(c)m=s/(o-s),y=o*s/(o-s);else if(a===ai)m=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(a===Ja)m=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=ai,c=!1){let l=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r),m,y;if(c)m=1/(o-s),y=o/(o-s);else if(a===ai)m=-2/(o-s),y=-(o+s)/(o-s);else if(a===Ja)m=-1/(o-s),y=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},lo=new A,ri=new ke,WD=new A(0,0,0),$D=new A(1,1,1),br=new A,Bu=new A,Pn=new A,lE=new ke,uE=new Bt,wr=(()=>{class n{constructor(t=0,i=0,r=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,s=this._order){return this._x=t,this._y=i,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let s=t.elements,o=s[0],a=s[4],c=s[8],l=s[1],u=s[5],d=s[9],f=s[2],h=s[6],m=s[10];switch(i){case"XYZ":this._y=Math.asin(je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-je(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-d,m),this._y=0);break;default:xe("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return lE.makeRotationFromQuaternion(t),this.setFromRotationMatrix(lE,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return uE.setFromEuler(this),this.setFromQuaternion(uE,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),tc=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},qD=0,dE=new A,uo=new Bt,Wi=new ke,Vu=new A,za=new A,XD=new A,YD=new Bt,fE=new A(1,0,0),hE=new A(0,1,0),pE=new A(0,0,1),mE={type:"added"},ZD={type:"removed"},fo={type:"childadded",child:null},Xm={type:"childremoved",child:null},At=(()=>{class n extends ui{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qD++}),this.uuid=ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new A,i=new wr,r=new Bt,s=new A(1,1,1);function o(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(o),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ke},normalMatrix:{value:new He}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return uo.setFromAxisAngle(t,i),this.quaternion.multiply(uo),this}rotateOnWorldAxis(t,i){return uo.setFromAxisAngle(t,i),this.quaternion.premultiply(uo),this}rotateX(t){return this.rotateOnAxis(fE,t)}rotateY(t){return this.rotateOnAxis(hE,t)}rotateZ(t){return this.rotateOnAxis(pE,t)}translateOnAxis(t,i){return dE.copy(t).applyQuaternion(this.quaternion),this.position.add(dE.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(fE,t)}translateY(t){return this.translateOnAxis(hE,t)}translateZ(t){return this.translateOnAxis(pE,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wi.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Vu.copy(t):Vu.set(t,i,r);let s=this.parent;this.updateWorldMatrix(!0,!1),za.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wi.lookAt(za,Vu,this.up):Wi.lookAt(Vu,za,this.up),this.quaternion.setFromRotationMatrix(Wi),s&&(Wi.extractRotation(s.matrixWorld),uo.setFromRotationMatrix(Wi),this.quaternion.premultiply(uo.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(We("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(mE),fo.child=t,this.dispatchEvent(fo),fo.child=null):We("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(ZD),Xm.child=t,this.dispatchEvent(Xm),Xm.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(mE),fo.child=t,this.dispatchEvent(fo),fo.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,s=this.children.length;r<s;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(za,t,XD),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(za,YD,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>Sn(Nt({},c),{boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>Nt({},c)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){let f=l[u];o(t.shapes,f)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(o(t.materials,this.material[l]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];s.animations.push(o(t.animations,l))}}if(i){let c=a(t.geometries),l=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),m=a(t.animations),y=a(t.nodes);c.length>0&&(r.geometries=c),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),d.length>0&&(r.images=d),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),m.length>0&&(r.animations=m),y.length>0&&(r.nodes=y)}return r.object=s,r;function a(c){let l=[];for(let u in c){let d=c[u];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let s=t.children[r];this.add(s.clone())}return this}}return n.DEFAULT_UP=new A(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),si=new A,$i=new A,Ym=new A,qi=new A,ho=new A,po=new A,gE=new A,Zm=new A,Km=new A,Jm=new A,Qm=new it,eg=new it,tg=new it,Sr=class n{constructor(e=new A,t=new A,i=new A){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),si.subVectors(e,t),r.cross(si);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){si.subVectors(r,t),$i.subVectors(i,t),Ym.subVectors(e,t);let o=si.dot(si),a=si.dot($i),c=si.dot(Ym),l=$i.dot($i),u=$i.dot(Ym),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,h=(l*c-a*u)*f,m=(o*u-a*c)*f;return s.set(1-h-m,m,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,qi)===null?!1:qi.x>=0&&qi.y>=0&&qi.x+qi.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,qi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,qi.x),c.addScaledVector(o,qi.y),c.addScaledVector(a,qi.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return Qm.setScalar(0),eg.setScalar(0),tg.setScalar(0),Qm.fromBufferAttribute(e,t),eg.fromBufferAttribute(e,i),tg.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Qm,s.x),o.addScaledVector(eg,s.y),o.addScaledVector(tg,s.z),o}static isFrontFacing(e,t,i,r){return si.subVectors(i,t),$i.subVectors(e,t),si.cross($i).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return si.subVectors(this.c,this.b),$i.subVectors(this.a,this.b),si.cross($i).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;ho.subVectors(r,i),po.subVectors(s,i),Zm.subVectors(e,i);let c=ho.dot(Zm),l=po.dot(Zm);if(c<=0&&l<=0)return t.copy(i);Km.subVectors(e,r);let u=ho.dot(Km),d=po.dot(Km);if(u>=0&&d<=u)return t.copy(r);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(ho,o);Jm.subVectors(e,s);let h=ho.dot(Jm),m=po.dot(Jm);if(m>=0&&h<=m)return t.copy(s);let y=h*l-c*m;if(y<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(i).addScaledVector(po,a);let g=u*m-h*d;if(g<=0&&d-u>=0&&h-m>=0)return gE.subVectors(s,r),a=(d-u)/(d-u+(h-m)),t.copy(r).addScaledVector(gE,a);let p=1/(g+y+f);return o=y*p,a=f*p,t.copy(i).addScaledVector(ho,o).addScaledVector(po,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},NM={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Er={h:0,s:0,l:0},Hu={h:0,s:0,l:0};function ng(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Ce=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=i,Je.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Je.workingColorSpace){if(e=kg(e,1),t=je(t,0,1),i=je(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=ng(o,s,e+1/3),this.g=ng(o,s,e),this.b=ng(o,s,e-1/3)}return Je.colorSpaceToWorking(this,r),this}setStyle(e,t=zt){function i(s){s!==void 0&&parseFloat(s)<1&&xe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:xe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);xe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){let i=NM[e.toLowerCase()];return i!==void 0?this.setHex(i,t):xe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yi(e.r),this.g=Yi(e.g),this.b=Yi(e.b),this}copyLinearToSRGB(e){return this.r=_o(e.r),this.g=_o(e.g),this.b=_o(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return Je.workingToColorSpace(rn.copy(this),e),Math.round(je(rn.r*255,0,255))*65536+Math.round(je(rn.g*255,0,255))*256+Math.round(je(rn.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(rn.copy(this),t);let i=rn.r,r=rn.g,s=rn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=zt){Je.workingToColorSpace(rn.copy(this),e);let t=rn.r,i=rn.g,r=rn.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Er),this.setHSL(Er.h+e,Er.s+t,Er.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Er),e.getHSL(Hu);let i=Ya(Er.h,Hu.h,t),r=Ya(Er.s,Hu.s,t),s=Ya(Er.l,Hu.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rn=new Ce;Ce.NAMES=NM;var KD=0,xn=class extends ui{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:KD++}),this.uuid=ci(),this.name="",this.type="Material",this.blending=hs,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sd,this.blendDst=od,this.blendEquation=Tr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ce(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=us,this.stencilZFail=us,this.stencilZPass=us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){xe(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){xe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(i.blending=this.blending),this.side!==li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==sd&&(i.blendSrc=this.blendSrc),this.blendDst!==od&&(i.blendDst=this.blendDst),this.blendEquation!==Tr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ps&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==us&&(i.stencilFail=this.stencilFail),this.stencilZFail!==us&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==us&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Fn=class extends xn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wr,this.combine=Tg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var kt=new A,zu=new Te,JD=0,Rt=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:JD++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ad,this.updateRanges=[],this.gpuType=Xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)zu.fromBufferAttribute(this,t),zu.applyMatrix3(e),this.setXY(t,zu.x,zu.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=oi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=at(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=oi(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=oi(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=oi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=oi(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),r=at(r,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ad&&(e.usage=this.usage),e}};var nc=class extends Rt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var ic=class extends Rt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Dt=class extends Rt{constructor(e,t,i){super(new Float32Array(e),t,i)}},QD=0,Gn=new ke,ig=new At,mo=new A,Ln=new On,Ga=new On,$t=new A,Vt=class n extends ui{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:QD++}),this.uuid=ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Fg(e)?ic:nc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,t,i){return Gn.makeTranslation(e,t,i),this.applyMatrix4(Gn),this}scale(e,t,i){return Gn.makeScale(e,t,i),this.applyMatrix4(Gn),this}lookAt(e){return ig.lookAt(e),ig.updateMatrix(),this.applyMatrix4(ig.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mo).negate(),this.translate(mo.x,mo.y,mo.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Dt(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&xe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Ln.setFromBufferAttribute(s),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){let i=this.boundingSphere.center;if(Ln.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Ga.setFromBufferAttribute(a),this.morphTargetsRelative?($t.addVectors(Ln.min,Ga.min),Ln.expandByPoint($t),$t.addVectors(Ln.max,Ga.max),Ln.expandByPoint($t)):(Ln.expandByPoint(Ga.min),Ln.expandByPoint(Ga.max))}Ln.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)$t.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared($t));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)$t.fromBufferAttribute(a,l),c&&(mo.fromBufferAttribute(e,l),$t.add(mo)),r=Math.max(r,i.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rt(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let O=0;O<i.count;O++)a[O]=new A,c[O]=new A;let l=new A,u=new A,d=new A,f=new Te,h=new Te,m=new Te,y=new A,g=new A;function p(O,b,_){l.fromBufferAttribute(i,O),u.fromBufferAttribute(i,b),d.fromBufferAttribute(i,_),f.fromBufferAttribute(s,O),h.fromBufferAttribute(s,b),m.fromBufferAttribute(s,_),u.sub(l),d.sub(l),h.sub(f),m.sub(f);let N=1/(h.x*m.y-m.x*h.y);isFinite(N)&&(y.copy(u).multiplyScalar(m.y).addScaledVector(d,-h.y).multiplyScalar(N),g.copy(d).multiplyScalar(h.x).addScaledVector(u,-m.x).multiplyScalar(N),a[O].add(y),a[b].add(y),a[_].add(y),c[O].add(g),c[b].add(g),c[_].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let O=0,b=M.length;O<b;++O){let _=M[O],N=_.start,k=_.count;for(let V=N,j=N+k;V<j;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let E=new A,T=new A,I=new A,w=new A;function R(O){I.fromBufferAttribute(r,O),w.copy(I);let b=a[O];E.copy(b),E.sub(I.multiplyScalar(I.dot(b))).normalize(),T.crossVectors(w,b);let N=T.dot(c[O])<0?-1:1;o.setXYZW(O,E.x,E.y,E.z,N)}for(let O=0,b=M.length;O<b;++O){let _=M[O],N=_.start,k=_.count;for(let V=N,j=N+k;V<j;V+=3)R(e.getX(V+0)),R(e.getX(V+1)),R(e.getX(V+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Rt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new A,s=new A,o=new A,a=new A,c=new A,l=new A,u=new A,d=new A;if(e)for(let f=0,h=e.count;f<h;f+=3){let m=e.getX(f+0),y=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,y),o.fromBufferAttribute(t,g),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,y),l.fromBufferAttribute(i,g),a.add(u),c.add(u),l.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(y,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u),h=0,m=0;for(let y=0,g=c.length;y<g;y++){a.isInterleavedBufferAttribute?h=c[y]*a.data.stride+a.offset:h=c[y]*u;for(let p=0;p<u;p++)f[m++]=l[h++]}return new Rt(f,u,d)}if(this.index===null)return xe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,i);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],d=s[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},yE=new ke,cs=new Zi,Gu=new yn,xE=new A,ju=new A,Wu=new A,$u=new A,rg=new A,qu=new A,vE=new A,Xu=new A,vt=class extends At{constructor(e=new Vt,t=new Fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){qu.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],d=s[c];u!==0&&(rg.fromBufferAttribute(d,e),o?qu.addScaledVector(rg,u):qu.addScaledVector(rg.sub(t),u))}t.add(qu)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Gu.copy(i.boundingSphere),Gu.applyMatrix4(s),cs.copy(e.ray).recast(e.near),!(Gu.containsPoint(cs.origin)===!1&&(cs.intersectSphere(Gu,xE)===null||cs.origin.distanceToSquared(xE)>(e.far-e.near)**2))&&(yE.copy(s).invert(),cs.copy(e.ray).applyMatrix4(yE),!(i.boundingBox!==null&&cs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,cs)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=f.length;m<y;m++){let g=f[m],p=o[g.materialIndex],M=Math.max(g.start,h.start),E=Math.min(a.count,Math.min(g.start+g.count,h.start+h.count));for(let T=M,I=E;T<I;T+=3){let w=a.getX(T),R=a.getX(T+1),O=a.getX(T+2);r=Yu(this,p,e,i,l,u,d,w,R,O),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),y=Math.min(a.count,h.start+h.count);for(let g=m,p=y;g<p;g+=3){let M=a.getX(g),E=a.getX(g+1),T=a.getX(g+2);r=Yu(this,o,e,i,l,u,d,M,E,T),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,y=f.length;m<y;m++){let g=f[m],p=o[g.materialIndex],M=Math.max(g.start,h.start),E=Math.min(c.count,Math.min(g.start+g.count,h.start+h.count));for(let T=M,I=E;T<I;T+=3){let w=T,R=T+1,O=T+2;r=Yu(this,p,e,i,l,u,d,w,R,O),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),y=Math.min(c.count,h.start+h.count);for(let g=m,p=y;g<p;g+=3){let M=g,E=g+1,T=g+2;r=Yu(this,o,e,i,l,u,d,M,E,T),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function e1(n,e,t,i,r,s,o,a){let c;if(e.side===Kt?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===li,a),c===null)return null;Xu.copy(a),Xu.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(Xu);return l<t.near||l>t.far?null:{distance:l,point:Xu.clone(),object:n}}function Yu(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,ju),n.getVertexPosition(c,Wu),n.getVertexPosition(l,$u);let u=e1(n,e,t,i,ju,Wu,$u,vE);if(u){let d=new A;Sr.getBarycoord(vE,ju,Wu,$u,d),r&&(u.uv=Sr.getInterpolatedAttribute(r,a,c,l,d,new Te)),s&&(u.uv1=Sr.getInterpolatedAttribute(s,a,c,l,d,new Te)),o&&(u.normal=Sr.getInterpolatedAttribute(o,a,c,l,d,new A),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new A,materialIndex:0};Sr.getNormal(ju,Wu,$u,f.normal),u.face=f,u.barycoord=d}return u}var Ai=class n extends Vt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],d=[],f=0,h=0;m("z","y","x",-1,-1,i,t,e,o,s,0),m("z","y","x",1,-1,i,t,-e,o,s,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Dt(l,3)),this.setAttribute("normal",new Dt(u,3)),this.setAttribute("uv",new Dt(d,2));function m(y,g,p,M,E,T,I,w,R,O,b){let _=T/R,N=I/O,k=T/2,V=I/2,j=w/2,G=R+1,q=O+1,J=0,z=0,ne=new A;for(let se=0;se<q;se++){let we=se*N-V;for(let Qe=0;Qe<G;Qe++){let lt=Qe*_-k;ne[y]=lt*M,ne[g]=we*E,ne[p]=j,l.push(ne.x,ne.y,ne.z),ne[y]=0,ne[g]=0,ne[p]=w>0?1:-1,u.push(ne.x,ne.y,ne.z),d.push(Qe/R),d.push(1-se/O),J+=1}}for(let se=0;se<O;se++)for(let we=0;we<R;we++){let Qe=f+we+G*se,lt=f+we+G*(se+1),gt=f+(we+1)+G*(se+1),yt=f+(we+1)+G*se;c.push(Qe,lt,yt),c.push(lt,gt,yt),z+=6}a.addGroup(h,z,b),h+=z,f+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function ws(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(xe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function an(n){let e={};for(let t=0;t<n.length;t++){let i=ws(n[t]);for(let r in i)e[r]=i[r]}return e}function t1(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ug(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}var PM={clone:ws,merge:an},n1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,i1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$n=class extends xn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=n1,this.fragmentShader=i1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ws(e.uniforms),this.uniformsGroups=t1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},rc=class extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Mr=new A,_E=new Te,bE=new Te,Ut=class extends rc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ys*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Xa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ys*2*Math.atan(Math.tan(Xa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Mr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mr.x,Mr.y).multiplyScalar(-e/Mr.z),Mr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Mr.x,Mr.y).multiplyScalar(-e/Mr.z)}getViewSize(e,t){return this.getViewBounds(e,_E,bE),t.subVectors(bE,_E)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Xa*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},go=-90,yo=1,dd=class extends At{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ut(go,yo,e,t);r.layers=this.layers,this.add(r);let s=new Ut(go,yo,e,t);s.layers=this.layers,this.add(s);let o=new Ut(go,yo,e,t);o.layers=this.layers,this.add(o);let a=new Ut(go,yo,e,t);a.layers=this.layers,this.add(a);let c=new Ut(go,yo,e,t);c.layers=this.layers,this.add(c);let l=new Ut(go,yo,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===ai)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ja)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},sc=class extends _n{constructor(e=[],t=Es,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},fd=class extends wi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new sc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ai(5,5,5),s=new $n({name:"CubemapFromEquirect",uniforms:ws(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Kt,blending:Pi});s.uniforms.tEquirect.value=t;let o=new vt(r,s),a=t.minFilter;return t.minFilter===di&&(t.minFilter=Yt),new dd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}},sn=class extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}},r1={type:"move"},Ao=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new sn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new sn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new sn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,i),p=this._getHandJoint(l,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,m=.005;l.inputState.pinching&&f>h+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(r1)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new sn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var oc=class extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wr,this.environmentIntensity=1,this.environmentRotation=new wr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Io=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ad,this.updateRanges=[],this.version=0,this.uuid=ci()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},fn=new A,Co=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.applyMatrix4(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.applyNormalMatrix(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.transformDirection(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=oi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=at(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=oi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=oi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=oi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=oi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),r=at(r,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Qa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Rt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Qa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var EE=new A,ME=new it,SE=new it,s1=new A,TE=new ke,Zu=new A,sg=new yn,wE=new ke,og=new Zi,ac=class extends vt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=fg,this.bindMatrix=new ke,this.bindMatrixInverse=new ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new On),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Zu),this.boundingBox.expandByPoint(Zu)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Zu),this.boundingSphere.expandByPoint(Zu)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sg.copy(this.boundingSphere),sg.applyMatrix4(r),e.ray.intersectsSphere(sg)!==!1&&(wE.copy(r).invert(),og.copy(e.ray).applyMatrix4(wE),!(this.boundingBox!==null&&og.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,og)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new it,t=this.geometry.attributes.skinWeight;for(let i=0,r=t.count;i<r;i++){e.fromBufferAttribute(t,i);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===fg?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===mM?this.bindMatrixInverse.copy(this.bindMatrix).invert():xe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,r=this.geometry;ME.fromBufferAttribute(r.attributes.skinIndex,e),SE.fromBufferAttribute(r.attributes.skinWeight,e),EE.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let o=SE.getComponent(s);if(o!==0){let a=ME.getComponent(s);TE.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),t.addScaledVector(s1.copy(EE).applyMatrix4(TE),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Ro=class extends At{constructor(){super(),this.isBone=!0,this.type="Bone"}},Do=class extends _n{constructor(e=null,t=1,i=1,r,s,o,a,c,l=Xt,u=Xt,d,f){super(null,o,a,c,l,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},AE=new ke,o1=new ke,cc=class n{constructor(e=[],t=[]){this.uuid=ci(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){xe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,r=this.bones.length;i<r;i++)this.boneInverses.push(new ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new ke;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){let a=e[s]?e[s].matrixWorld:o1;AE.multiplyMatrices(a,t[s]),AE.toArray(i,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new Do(t,e,e,kn,Xn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,r=e.bones.length;i<r;i++){let s=e.bones[i],o=t[s];o===void 0&&(xe("Skeleton: No bone found with UUID:",s),o=new Ro),this.bones.push(o),this.boneInverses.push(new ke().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let o=t[r];e.bones.push(o.uuid);let a=i[r];e.boneInverses.push(a.toArray())}return e}},Ar=class extends Rt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},xo=new ke,IE=new ke,Ku=[],CE=new On,a1=new ke,ja=new vt,Wa=new yn,lc=class extends vt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ar(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,a1)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new On),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,xo),CE.copy(e.boundingBox).applyMatrix4(xo),this.boundingBox.union(CE)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,xo),Wa.copy(e.boundingSphere).applyMatrix4(xo),this.boundingSphere.union(Wa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(ja.geometry=this.geometry,ja.material=this.material,ja.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wa.copy(this.boundingSphere),Wa.applyMatrix4(i),e.ray.intersectsSphere(Wa)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,xo),IE.multiplyMatrices(i,xo),ja.matrixWorld=IE,ja.raycast(e,Ku);for(let o=0,a=Ku.length;o<a;o++){let c=Ku[o];c.instanceId=s,c.object=this,t.push(c)}Ku.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ar(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Do(new Float32Array(r*this.count),r,this.count,Bd,Xn));let s=this.morphTexture.source.data.data,o=0;for(let l=0;l<i.length;l++)o+=i[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;s[c]=a,s.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ag=new A,c1=new A,l1=new He,jn=class{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=ag.subVectors(i,t).cross(c1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(ag),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||l1.getNormalMatrix(e),r=this.coplanarPoint(ag).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ls=new yn,u1=new Te(.5,.5),Ju=new A,No=class{constructor(e=new jn,t=new jn,i=new jn,r=new jn,s=new jn,o=new jn){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ai,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],d=s[5],f=s[6],h=s[7],m=s[8],y=s[9],g=s[10],p=s[11],M=s[12],E=s[13],T=s[14],I=s[15];if(r[0].setComponents(l-o,h-u,p-m,I-M).normalize(),r[1].setComponents(l+o,h+u,p+m,I+M).normalize(),r[2].setComponents(l+a,h+d,p+y,I+E).normalize(),r[3].setComponents(l-a,h-d,p-y,I-E).normalize(),i)r[4].setComponents(c,f,g,T).normalize(),r[5].setComponents(l-c,h-f,p-g,I-T).normalize();else if(r[4].setComponents(l-c,h-f,p-g,I-T).normalize(),t===ai)r[5].setComponents(l+c,h+f,p+g,I+T).normalize();else if(t===Ja)r[5].setComponents(c,f,g,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(e){ls.center.set(0,0,0);let t=u1.distanceTo(e.center);return ls.radius=.7071067811865476+t,ls.applyMatrix4(e.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Ju.x=r.normal.x>0?e.max.x:e.min.x,Ju.y=r.normal.y>0?e.max.y:e.min.y,Ju.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ju)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Po=class extends xn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},hd=new A,pd=new A,RE=new ke,$a=new Zi,Qu=new yn,cg=new A,DE=new A,xs=class extends At{constructor(e=new Vt,t=new Po){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)hd.fromBufferAttribute(t,r-1),pd.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=hd.distanceTo(pd);e.setAttribute("lineDistance",new Dt(i,1))}else xe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qu.copy(i.boundingSphere),Qu.applyMatrix4(r),Qu.radius+=s,e.ray.intersectsSphere(Qu)===!1)return;RE.copy(r).invert(),$a.copy(e.ray).applyMatrix4(RE);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){let h=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let y=h,g=m-1;y<g;y+=l){let p=u.getX(y),M=u.getX(y+1),E=ed(this,e,$a,c,p,M,y);E&&t.push(E)}if(this.isLineLoop){let y=u.getX(m-1),g=u.getX(h),p=ed(this,e,$a,c,y,g,m-1);p&&t.push(p)}}else{let h=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let y=h,g=m-1;y<g;y+=l){let p=ed(this,e,$a,c,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=ed(this,e,$a,c,m-1,h,m-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function ed(n,e,t,i,r,s,o){let a=n.geometry.attributes.position;if(hd.fromBufferAttribute(a,r),pd.fromBufferAttribute(a,s),t.distanceSqToSegment(hd,pd,cg,DE)>i)return;cg.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(cg);if(!(l<e.near||l>e.far))return{distance:l,point:DE.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var NE=new A,PE=new A,uc=class extends xs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)NE.fromBufferAttribute(t,r),PE.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+NE.distanceTo(PE);e.setAttribute("lineDistance",new Dt(i,1))}else xe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},dc=class extends xs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Ii=class extends xn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},LE=new ke,mg=new Zi,td=new yn,nd=new A,Ki=class extends At{constructor(e=new Vt,t=new Ii){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),td.copy(i.boundingSphere),td.applyMatrix4(r),td.radius+=s,e.ray.intersectsSphere(td)===!1)return;LE.copy(r).invert(),mg.copy(e.ray).applyMatrix4(LE);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,d=i.attributes.position;if(l!==null){let f=Math.max(0,o.start),h=Math.min(l.count,o.start+o.count);for(let m=f,y=h;m<y;m++){let g=l.getX(m);nd.fromBufferAttribute(d,g),OE(nd,g,c,r,e,t,this)}}else{let f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let m=f,y=h;m<y;m++)nd.fromBufferAttribute(d,m),OE(nd,m,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function OE(n,e,t,i,r,s,o){let a=mg.distanceSqToPoint(n);if(a<t){let c=new A;mg.closestPointToPoint(n,c),c.applyMatrix4(i);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var fc=class extends _n{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},hc=class extends _n{constructor(e,t,i=Pr,r,s,o,a=Xt,c=Xt,l,u=Eo,d=1){if(u!==Eo&&u!==Vo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},pc=class extends _n{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var mc=class n extends Vt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],d=[],f=[],h=[],m=0,y=[],g=i/2,p=0;M(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new Dt(d,3)),this.setAttribute("normal",new Dt(f,3)),this.setAttribute("uv",new Dt(h,2));function M(){let T=new A,I=new A,w=0,R=(t-e)/i;for(let O=0;O<=s;O++){let b=[],_=O/s,N=_*(t-e)+e;for(let k=0;k<=r;k++){let V=k/r,j=V*c+a,G=Math.sin(j),q=Math.cos(j);I.x=N*G,I.y=-_*i+g,I.z=N*q,d.push(I.x,I.y,I.z),T.set(G,R,q).normalize(),f.push(T.x,T.y,T.z),h.push(V,1-_),b.push(m++)}y.push(b)}for(let O=0;O<r;O++)for(let b=0;b<s;b++){let _=y[b][O],N=y[b+1][O],k=y[b+1][O+1],V=y[b][O+1];(e>0||b!==0)&&(u.push(_,N,V),w+=3),(t>0||b!==s-1)&&(u.push(N,k,V),w+=3)}l.addGroup(p,w,0),p+=w}function E(T){let I=m,w=new Te,R=new A,O=0,b=T===!0?e:t,_=T===!0?1:-1;for(let k=1;k<=r;k++)d.push(0,g*_,0),f.push(0,_,0),h.push(.5,.5),m++;let N=m;for(let k=0;k<=r;k++){let j=k/r*c+a,G=Math.cos(j),q=Math.sin(j);R.x=b*q,R.y=g*_,R.z=b*G,d.push(R.x,R.y,R.z),f.push(0,_,0),w.x=G*.5+.5,w.y=q*.5*_+.5,h.push(w.x,w.y),m++}for(let k=0;k<r;k++){let V=I+k,j=N+k;T===!0?u.push(j,j+1,V):u.push(j+1,j,V),O+=3}l.addGroup(p,O,T===!0?1:2),p+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var gc=class n extends Vt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,f=t/c,h=[],m=[],y=[],g=[];for(let p=0;p<u;p++){let M=p*f-o;for(let E=0;E<l;E++){let T=E*d-s;m.push(T,-M,0),y.push(0,0,1),g.push(E/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){let E=M+l*p,T=M+l*(p+1),I=M+1+l*(p+1),w=M+1+l*p;h.push(E,T,w),h.push(T,I,w)}this.setIndex(h),this.setAttribute("position",new Dt(m,3)),this.setAttribute("normal",new Dt(y,3)),this.setAttribute("uv",new Dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ji=class n extends Vt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,u=[],d=new A,f=new A,h=[],m=[],y=[],g=[];for(let p=0;p<=i;p++){let M=[],E=p/i,T=0;p===0&&o===0?T=.5/t:p===i&&c===Math.PI&&(T=-.5/t);for(let I=0;I<=t;I++){let w=I/t;d.x=-e*Math.cos(r+w*s)*Math.sin(o+E*a),d.y=e*Math.cos(o+E*a),d.z=e*Math.sin(r+w*s)*Math.sin(o+E*a),m.push(d.x,d.y,d.z),f.copy(d).normalize(),y.push(f.x,f.y,f.z),g.push(w+T,1-E),M.push(l++)}u.push(M)}for(let p=0;p<i;p++)for(let M=0;M<t;M++){let E=u[p][M+1],T=u[p][M],I=u[p+1][M],w=u[p+1][M+1];(p!==0||o>0)&&h.push(E,T,w),(p!==i-1||c<Math.PI)&&h.push(T,I,w)}this.setIndex(h),this.setAttribute("position",new Dt(m,3)),this.setAttribute("normal",new Dt(y,3)),this.setAttribute("uv",new Dt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var hn=class extends xn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pg,this.normalScale=new Te(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},on=class extends hn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Te(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ce(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ce(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ce(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var md=class extends xn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_M,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},gd=class extends xn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function id(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function d1(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function f1(n){function e(r,s){return n[r]-n[s]}let t=n.length,i=new Array(t);for(let r=0;r!==t;++r)i[r]=r;return i.sort(e),i}function FE(n,e,t){let i=n.length,r=new n.constructor(i);for(let s=0,o=0;o!==i;++s){let a=t[s]*e;for(let c=0;c!==e;++c)r[o++]=n[a+c]}return r}function LM(n,e,t,i){let r=1,s=n[0];for(;s!==void 0&&s[i]===void 0;)s=n[r++];if(s===void 0)return;let o=s[i];if(o!==void 0)if(Array.isArray(o))do o=s[i],o!==void 0&&(e.push(s.time),t.push(...o)),s=n[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[i],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=n[r++];while(s!==void 0);else do o=s[i],o!==void 0&&(e.push(s.time),t.push(o)),s=n[r++];while(s!==void 0)}var Qi=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break t}o=t.length;break n}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break t}o=i,i=0;break n}break e}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},yd=class extends Qi{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ds,endingEnd:ds}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case fs:s=e,a=2*t-i;break;case Za:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case fs:o=e,c=2*i-t;break;case Za:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,m=(i-t)/(r-t),y=m*m,g=y*m,p=-f*g+2*f*y-f*m,M=(1+f)*g+(-1.5-2*f)*y+(-.5+f)*m+1,E=(-1-h)*g+(1.5+h)*y+.5*m,T=h*g-h*y;for(let I=0;I!==a;++I)s[I]=p*o[u+I]+M*o[l+I]+E*o[c+I]+T*o[d+I];return s}},yc=class extends Qi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*d+o[c+f]*u;return s}},xd=class extends Qi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},vn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=id(t,this.TimeBufferType),this.values=id(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:id(e.times,Array),values:id(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new xd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new yc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new yd(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ms:t=this.InterpolantFactoryMethodDiscrete;break;case gs:t=this.InterpolantFactoryMethodLinear;break;case rd:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return xe("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ms;case this.InterpolantFactoryMethodLinear:return gs;case this.InterpolantFactoryMethodSmooth:return rd}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(We("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(We("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){We("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){We("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&d1(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){We("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===rd,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,f=d-i,h=d+i;for(let m=0;m!==i;++m){let y=t[d+m];if(y!==t[f+m]||y!==t[h+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*i,f=o*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};vn.prototype.ValueTypeName="";vn.prototype.TimeBufferType=Float32Array;vn.prototype.ValueBufferType=Float32Array;vn.prototype.DefaultInterpolation=gs;var er=class extends vn{constructor(e,t,i){super(e,t,i)}};er.prototype.ValueTypeName="bool";er.prototype.ValueBufferType=Array;er.prototype.DefaultInterpolation=ms;er.prototype.InterpolantFactoryMethodLinear=void 0;er.prototype.InterpolantFactoryMethodSmooth=void 0;var xc=class extends vn{constructor(e,t,i,r){super(e,t,i,r)}};xc.prototype.ValueTypeName="color";var Ci=class extends vn{constructor(e,t,i,r){super(e,t,i,r)}};Ci.prototype.ValueTypeName="number";var vd=class extends Qi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)Bt.slerpFlat(s,0,o,l-a,o,l,c);return s}},Ri=class extends vn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new vd(this.times,this.values,this.getValueSize(),e)}};Ri.prototype.ValueTypeName="quaternion";Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var tr=class extends vn{constructor(e,t,i){super(e,t,i)}};tr.prototype.ValueTypeName="string";tr.prototype.ValueBufferType=Array;tr.prototype.DefaultInterpolation=ms;tr.prototype.InterpolantFactoryMethodLinear=void 0;tr.prototype.InterpolantFactoryMethodSmooth=void 0;var Di=class extends vn{constructor(e,t,i,r){super(e,t,i,r)}};Di.prototype.ValueTypeName="vector";var vs=class{constructor(e="",t=-1,i=[],r=vf){this.name=e,this.tracks=i,this.duration=t,this.blendMode=r,this.uuid=ci(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,r=1/(e.fps||1);for(let o=0,a=i.length;o!==a;++o)t.push(p1(i[o]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=i.length;s!==o;++s)t.push(vn.toJSON(i[s]));return r}static CreateFromMorphTargetSequence(e,t,i,r){let s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);let u=f1(c);c=FE(c,1,u),l=FE(l,1,u),!r&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new Ci(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/i))}return new this(e,-1,o)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===t)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(s);if(u&&u.length>1){let d=u[1],f=r[d];f||(r[d]=f=[]),f.push(l)}}let o=[];for(let a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,i));return o}static parseAnimation(e,t){if(xe("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return We("AnimationClip: No animation in JSONLoader data."),null;let i=function(d,f,h,m,y){if(h.length!==0){let g=[],p=[];LM(h,g,p,m),g.length!==0&&y.push(new d(f,g,p))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let d=0;d<l.length;d++){let f=l[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let h={},m;for(m=0;m<f.length;m++)if(f[m].morphTargets)for(let y=0;y<f[m].morphTargets.length;y++)h[f[m].morphTargets[y]]=-1;for(let y in h){let g=[],p=[];for(let M=0;M!==f[m].morphTargets.length;++M){let E=f[m];g.push(E.time),p.push(E.morphTarget===y?1:0)}r.push(new Ci(".morphTargetInfluence["+y+"]",g,p))}c=h.length*o}else{let h=".bones["+t[d].name+"]";i(Di,h+".position",f,"pos",r),i(Ri,h+".quaternion",f,"rot",r),i(Di,h+".scale",f,"scl",r)}}return r.length===0?null:new this(s,c,r,a)}resetDuration(){let e=this.tracks,t=0;for(let i=0,r=e.length;i!==r;++i){let s=this.tracks[i];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function h1(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ci;case"vector":case"vector2":case"vector3":case"vector4":return Di;case"color":return xc;case"quaternion":return Ri;case"bool":case"boolean":return er;case"string":return tr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function p1(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=h1(n.type);if(n.times===void 0){let t=[],i=[];LM(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}var Si={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},_d=class{constructor(e,t,i){let r=this,s=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=l.length;d<f;d+=2){let h=l[d],m=l[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},OM=new _d,As=(()=>{class n{constructor(t){this.manager=t!==void 0?t:OM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,i){let r=this;return new Promise(function(s,o){r.load(t,s,i,o)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}return n.DEFAULT_MATERIAL_NAME="__DEFAULT",n})(),Xi={},gg=class extends Error{constructor(e,t){super(e),this.response=t}},Lo=class extends As{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=Si.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Xi[e]!==void 0){Xi[e].push({onLoad:t,onProgress:i,onError:r});return}Xi[e]=[],Xi[e].push({onLoad:t,onProgress:i,onError:r});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&xe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=Xi[e],d=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),h=f?parseInt(f):0,m=h!==0,y=0,g=new ReadableStream({start(p){M();function M(){d.read().then(({done:E,value:T})=>{if(E)p.close();else{y+=T.byteLength;let I=new ProgressEvent("progress",{lengthComputable:m,loaded:y,total:h});for(let w=0,R=u.length;w<R;w++){let O=u[w];O.onProgress&&O.onProgress(I)}p.enqueue(T),M()}},E=>{p.error(E)})}}});return new Response(g)}else throw new gg(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a==="")return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return l.arrayBuffer().then(m=>h.decode(m))}}}).then(l=>{Si.add(`file:${e}`,l);let u=Xi[e];delete Xi[e];for(let d=0,f=u.length;d<f;d++){let h=u[d];h.onLoad&&h.onLoad(l)}}).catch(l=>{let u=Xi[e];if(u===void 0)throw this.manager.itemError(e),l;delete Xi[e];for(let d=0,f=u.length;d<f;d++){let h=u[d];h.onError&&h.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var vo=new WeakMap,bd=class extends As{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=Si.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let d=vo.get(o);d===void 0&&(d=[],vo.set(o,d)),d.push({onLoad:t,onError:r})}return o}let a=Mo("img");function c(){u(),t&&t(this);let d=vo.get(this)||[];for(let f=0;f<d.length;f++){let h=d[f];h.onLoad&&h.onLoad(this)}vo.delete(this),s.manager.itemEnd(e)}function l(d){u(),r&&r(d),Si.remove(`image:${e}`);let f=vo.get(this)||[];for(let h=0;h<f.length;h++){let m=f[h];m.onError&&m.onError(d)}vo.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Si.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}};var vc=class extends As{constructor(e){super(e)}load(e,t,i,r){let s=new _n,o=new bd(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}},Ir=class extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ce(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},_c=class extends Ir{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ce(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},lg=new ke,kE=new A,UE=new A,bc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Te(512,512),this.mapType=fi,this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new No,this._frameExtents=new Te(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;kE.setFromMatrixPosition(e.matrixWorld),t.position.copy(kE),UE.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(UE),t.updateMatrixWorld(),lg.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lg,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(lg)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},yg=class extends bc{constructor(){super(new Ut(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=ys*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},_s=class extends Ir{constructor(e,t,i=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new yg}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},BE=new ke,qa=new A,ug=new A,xg=class extends bc{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Te(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),qa.setFromMatrixPosition(e.matrixWorld),i.position.copy(qa),ug.copy(i.position),ug.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(ug),i.updateMatrixWorld(),r.makeTranslation(-qa.x,-qa.y,-qa.z),BE.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(BE,i.coordinateSystem,i.reversedDepth)}},Cr=class extends Ir{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new xg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},bs=class extends rc{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},vg=class extends bc{constructor(){super(new bs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Rr=class extends Ir{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new vg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Ec=class extends Ir{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var nr=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var dg=new WeakMap,Mc=class extends As{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&xe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&xe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=Si.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{if(dg.has(o)===!0)r&&r(dg.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(l),s.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return Si.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){r&&r(l),dg.set(c,l),Si.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Si.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ed=class extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Sc=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var Md=class{constructor(e,t,i){this.binding=e,this.valueSize=i;let r,s,o;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let i=this.buffer,r=this.valueSize,s=e*r+r,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==r;++a)i[s+a]=i[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(i,s,0,a,r)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,i=this.valueSize,r=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,i=this.buffer,r=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let c=t*this._origIndex;this._mixBufferRegion(i,r,c,1-s,t)}o>0&&this._mixBufferRegionAdditive(i,r,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(i[c]!==i[c+t]){a.setValue(i,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,i=this.valueSize,r=i*this._origIndex;e.getValue(t,r);for(let s=i,o=r;s!==o;++s)t[s]=t[r+s%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[t+o]=e[i+o]}_slerp(e,t,i,r){Bt.slerpFlat(e,t,e,t,e,i,r)}_slerpAdditive(e,t,i,r,s){let o=this._workIndex*s;Bt.multiplyQuaternionsFlat(e,o,e,t,e,i),Bt.slerpFlat(e,t,e,t,e,o,r)}_lerp(e,t,i,r,s){let o=1-r;for(let a=0;a!==s;++a){let c=t+a;e[c]=e[c]*o+e[i+a]*r}}_lerpAdditive(e,t,i,r,s){for(let o=0;o!==s;++o){let a=t+o;e[a]=e[a]+e[i+o]*r}}},Bg="\\[\\]\\.:\\/",m1=new RegExp("["+Bg+"]","g"),Vg="[^"+Bg+"]",g1="[^"+Bg.replace("\\.","")+"]",y1=/((?:WC+[\/:])*)/.source.replace("WC",Vg),x1=/(WCOD+)?/.source.replace("WCOD",g1),v1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vg),_1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vg),b1=new RegExp("^"+y1+x1+v1+_1+"$"),E1=["material","materials","bones","map"],_g=class{constructor(e,t,i){let r=i||bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},bt=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(m1,"")}static parseTrackName(t){let i=b1.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=r.nodeName.substring(s+1);E1.indexOf(o)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=o)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(o){for(let a=0;a<o.length;a++){let c=o[a];if(c.name===i||c.uuid===i)return c;let l=r(c.children);if(l)return l}return null},s=r(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)t[i++]=r[s]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,s=i.propertyName,o=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){xe("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){We("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){We("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===u){u=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){We("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){We("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){We("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[s];if(a===void 0){let u=i.nodeName;We("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=_g,n})();bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};bt.prototype.GetterByBindingType=[bt.prototype._getValue_direct,bt.prototype._getValue_array,bt.prototype._getValue_arrayElement,bt.prototype._getValue_toArray];bt.prototype.SetterByBindingTypeAndVersioning=[[bt.prototype._setValue_direct,bt.prototype._setValue_direct_setNeedsUpdate,bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_array,bt.prototype._setValue_array_setNeedsUpdate,bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_arrayElement,bt.prototype._setValue_arrayElement_setNeedsUpdate,bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_fromArray,bt.prototype._setValue_fromArray_setNeedsUpdate,bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Sd=class{constructor(e,t,i=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=r;let s=t.tracks,o=s.length,a=new Array(o),c={endingStart:ds,endingEnd:ds};for(let l=0;l!==o;++l){let u=s[l].createInterpolant(null);a[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=yM,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i=!1){if(e.fadeOut(t),this.fadeIn(t),i===!0){let r=this._clip.duration,s=e._clip.duration,o=s/r,a=r/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,i=!1){return e.crossFadeFrom(this,t,i)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){let r=this._mixer,s=r.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+i,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,r){if(!this.enabled){this._updateWeight(e);return}let s=this._startTime;if(s!==null){let c=(e-s)*i;c<0||i===0?t=0:(this._startTime=null,t=i*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case vM:for(let u=0,d=c.length;u!==d;++u)c[u].evaluate(o),l[u].accumulateAdditive(a);break;case vf:default:for(let u=0,d=c.length;u!==d;++u)c[u].evaluate(o),l[u].accumulate(r,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let i=this._weightInterpolant;if(i!==null){let r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let i=this._timeScaleInterpolant;if(i!==null){let r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,i=this.loop,r=this.time+e,s=this._loopCount,o=i===xM;if(e===0)return s===-1?r:o&&(s&1)===1?t-r:r;if(i===gM){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=t||r<0){let a=Math.floor(r/t);r-=t*a,s+=Math.abs(a);let c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=r;if(o&&(s&1)===1)return t-r}return r}_setEndings(e,t,i){let r=this._interpolantSettings;i?(r.endingStart=fs,r.endingEnd=fs):(e?r.endingStart=this.zeroSlopeAtStart?fs:ds:r.endingStart=Za,t?r.endingEnd=this.zeroSlopeAtEnd?fs:ds:r.endingEnd=Za)}_scheduleFading(e,t,i){let r=this._mixer,s=r.time,o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=t,a[1]=s+e,c[1]=i,this}},M1=new Float32Array(1),Oo=class extends ui{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let i=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,a=e._interpolants,c=i.uuid,l=this._bindingsByRootAndName,u=l[c];u===void 0&&(u={},l[c]=u);for(let d=0;d!==s;++d){let f=r[d],h=f.name,m=u[h];if(m!==void 0)++m.referenceCount,o[d]=m;else{if(m=o[d],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,h));continue}let y=t&&t._propertyBindings[d].binding.parsedPath;m=new Md(bt.create(i,h,y),f.ValueTypeName,f.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,h),o[d]=m}a[d].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let i=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,i)}let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let s=t[i];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let s=t[i];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){let r=this._actions,s=this._actionsByClip,o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[i]=e}_removeInactiveAction(e){let t=this._actions,i=t[t.length-1],r=e._cacheIndex;i._cacheIndex=r,t[r]=i,t.pop(),e._cacheIndex=null;let s=e._clip.uuid,o=this._actionsByClip,a=o[s],c=a.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;let d=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete d[f],c.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let s=t[i];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){let t=this._actions,i=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_takeBackAction(e){let t=this._actions,i=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_addInactiveBinding(e,t,i){let r=this._bindingsByRootAndName,s=this._bindings,o=r[t];o===void 0&&(o={},r[t]=o),o[i]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){let t=this._bindings,i=e.binding,r=i.rootNode.uuid,s=i.path,o=this._bindingsByRootAndName,a=o[r],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[r]}_lendBinding(e){let t=this._bindings,i=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_takeBackBinding(e){let t=this._bindings,i=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,i=e[t];return i===void 0&&(i=new yc(new Float32Array(2),new Float32Array(2),1,M1),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){let t=this._controlInterpolants,i=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=i,t[i]=s}clipAction(e,t,i){let r=t||this._root,s=r.uuid,o=typeof e=="string"?vs.findByName(r,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(i===void 0&&(o!==null?i=o.blendMode:i=vf),c!==void 0){let d=c.actionByRoot[s];if(d!==void 0&&d.blendMode===i)return d;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let u=new Sd(this,o,t,i);return this._bindAction(u,l),this._addInactiveAction(u,a,s),u}existingAction(e,t){let i=t||this._root,r=i.uuid,s=typeof e=="string"?vs.findByName(i,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;let t=this._actions,i=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==i;++l)t[l]._update(r,e,s,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,i=e.uuid,r=this._actionsByClip,s=r[i];if(s!==void 0){let o=s.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let u=l._cacheIndex,d=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(l)}delete r[i]}}uncacheRoot(e){let t=e.uuid,i=this._actionsByClip;for(let o in i){let a=i[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(let o in s){let a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}};var Fo=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=je(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(je(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Tc=class extends ui{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){xe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Hg(n,e,t,i){let r=S1(i);switch(t){case Rg:return n*e;case Bd:return n*e/r.components*r.byteLength;case Vd:return n*e/r.components*r.byteLength;case Hd:return n*e*2/r.components*r.byteLength;case zd:return n*e*2/r.components*r.byteLength;case Dg:return n*e*3/r.components*r.byteLength;case kn:return n*e*4/r.components*r.byteLength;case Gd:return n*e*4/r.components*r.byteLength;case Ic:case Cc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Rc:case Dc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Wd:case qd:return Math.max(n,16)*Math.max(e,8)/4;case jd:case $d:return Math.max(n,8)*Math.max(e,8)/2;case Xd:case Yd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Zd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Kd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Jd:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Qd:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ef:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case tf:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case nf:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case rf:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case sf:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case of:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case af:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case cf:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case lf:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case uf:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case df:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ff:case hf:case pf:return Math.ceil(n/4)*Math.ceil(e/4)*16;case mf:case gf:return Math.ceil(n/4)*Math.ceil(e/4)*8;case yf:case xf:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function S1(n){switch(n){case fi:case wg:return{byteLength:1,components:1};case Uo:case Ag:case Ts:return{byteLength:2,components:1};case kd:case Ud:return{byteLength:2,components:4};case Pr:case Fd:case Xn:return{byteLength:4,components:1};case Ig:case Cg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"181"}}));typeof window<"u"&&(window.__THREE__?xe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="181");function rS(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function w1(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((h,m)=>h.start-m.start);let f=0;for(let h=1;h<d.length;h++){let m=d[f],y=d[h];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++f,d[f]=y)}d.length=f+1;for(let h=0,m=d.length;h<m;h++){let y=d[h];n.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var A1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,I1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,C1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,R1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,D1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,N1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,P1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,L1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,O1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,F1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,k1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,U1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,B1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,V1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,H1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,z1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,G1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,j1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,W1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,q1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,X1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Y1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Z1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,K1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,J1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Q1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eN=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tN=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nN=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,iN="gl_FragColor = linearToOutputTexel( gl_FragColor );",rN=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sN=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,oN=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,aN=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cN=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lN=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,uN=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dN=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fN=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hN=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pN=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,mN=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gN=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yN=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xN=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,vN=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_N=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bN=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,EN=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,MN=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,SN=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,TN=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wN=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,AN=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,IN=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,CN=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,RN=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,DN=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,NN=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,PN=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,LN=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ON=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,FN=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kN=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,UN=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,BN=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,VN=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,HN=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zN=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,GN=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jN=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,WN=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$N=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qN=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,XN=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,YN=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ZN=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,KN=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,JN=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,QN=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eP=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tP=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,nP=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,iP=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rP=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sP=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,oP=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,aP=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cP=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,lP=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,uP=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dP=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fP=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hP=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pP=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mP=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gP=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yP=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xP=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vP=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_P=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bP=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,EP=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,MP=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,SP=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,TP=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,wP=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,AP=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,IP=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,CP=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RP=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DP=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NP=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,PP=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,LP=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,OP=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,FP=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kP=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,UP=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,BP=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,VP=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,HP=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zP=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GP=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jP=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,WP=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$P=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qP=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,XP=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YP=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZP=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,KP=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JP=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,QP=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eL=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tL=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nL=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iL=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rL=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sL=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:A1,alphahash_pars_fragment:I1,alphamap_fragment:C1,alphamap_pars_fragment:R1,alphatest_fragment:D1,alphatest_pars_fragment:N1,aomap_fragment:P1,aomap_pars_fragment:L1,batching_pars_vertex:O1,batching_vertex:F1,begin_vertex:k1,beginnormal_vertex:U1,bsdfs:B1,iridescence_fragment:V1,bumpmap_pars_fragment:H1,clipping_planes_fragment:z1,clipping_planes_pars_fragment:G1,clipping_planes_pars_vertex:j1,clipping_planes_vertex:W1,color_fragment:$1,color_pars_fragment:q1,color_pars_vertex:X1,color_vertex:Y1,common:Z1,cube_uv_reflection_fragment:K1,defaultnormal_vertex:J1,displacementmap_pars_vertex:Q1,displacementmap_vertex:eN,emissivemap_fragment:tN,emissivemap_pars_fragment:nN,colorspace_fragment:iN,colorspace_pars_fragment:rN,envmap_fragment:sN,envmap_common_pars_fragment:oN,envmap_pars_fragment:aN,envmap_pars_vertex:cN,envmap_physical_pars_fragment:vN,envmap_vertex:lN,fog_vertex:uN,fog_pars_vertex:dN,fog_fragment:fN,fog_pars_fragment:hN,gradientmap_pars_fragment:pN,lightmap_pars_fragment:mN,lights_lambert_fragment:gN,lights_lambert_pars_fragment:yN,lights_pars_begin:xN,lights_toon_fragment:_N,lights_toon_pars_fragment:bN,lights_phong_fragment:EN,lights_phong_pars_fragment:MN,lights_physical_fragment:SN,lights_physical_pars_fragment:TN,lights_fragment_begin:wN,lights_fragment_maps:AN,lights_fragment_end:IN,logdepthbuf_fragment:CN,logdepthbuf_pars_fragment:RN,logdepthbuf_pars_vertex:DN,logdepthbuf_vertex:NN,map_fragment:PN,map_pars_fragment:LN,map_particle_fragment:ON,map_particle_pars_fragment:FN,metalnessmap_fragment:kN,metalnessmap_pars_fragment:UN,morphinstance_vertex:BN,morphcolor_vertex:VN,morphnormal_vertex:HN,morphtarget_pars_vertex:zN,morphtarget_vertex:GN,normal_fragment_begin:jN,normal_fragment_maps:WN,normal_pars_fragment:$N,normal_pars_vertex:qN,normal_vertex:XN,normalmap_pars_fragment:YN,clearcoat_normal_fragment_begin:ZN,clearcoat_normal_fragment_maps:KN,clearcoat_pars_fragment:JN,iridescence_pars_fragment:QN,opaque_fragment:eP,packing:tP,premultiplied_alpha_fragment:nP,project_vertex:iP,dithering_fragment:rP,dithering_pars_fragment:sP,roughnessmap_fragment:oP,roughnessmap_pars_fragment:aP,shadowmap_pars_fragment:cP,shadowmap_pars_vertex:lP,shadowmap_vertex:uP,shadowmask_pars_fragment:dP,skinbase_vertex:fP,skinning_pars_vertex:hP,skinning_vertex:pP,skinnormal_vertex:mP,specularmap_fragment:gP,specularmap_pars_fragment:yP,tonemapping_fragment:xP,tonemapping_pars_fragment:vP,transmission_fragment:_P,transmission_pars_fragment:bP,uv_pars_fragment:EP,uv_pars_vertex:MP,uv_vertex:SP,worldpos_vertex:TP,background_vert:wP,background_frag:AP,backgroundCube_vert:IP,backgroundCube_frag:CP,cube_vert:RP,cube_frag:DP,depth_vert:NP,depth_frag:PP,distanceRGBA_vert:LP,distanceRGBA_frag:OP,equirect_vert:FP,equirect_frag:kP,linedashed_vert:UP,linedashed_frag:BP,meshbasic_vert:VP,meshbasic_frag:HP,meshlambert_vert:zP,meshlambert_frag:GP,meshmatcap_vert:jP,meshmatcap_frag:WP,meshnormal_vert:$P,meshnormal_frag:qP,meshphong_vert:XP,meshphong_frag:YP,meshphysical_vert:ZP,meshphysical_frag:KP,meshtoon_vert:JP,meshtoon_frag:QP,points_vert:eL,points_frag:tL,shadow_vert:nL,shadow_frag:iL,sprite_vert:rL,sprite_frag:sL},oe={common:{diffuse:{value:new Ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Te(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ce(16777215)},opacity:{value:1},center:{value:new Te(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Li={basic:{uniforms:an([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:an([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ce(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:an([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ce(0)},specular:{value:new Ce(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:an([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:an([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Ce(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:an([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:an([oe.points,oe.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:an([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:an([oe.common,oe.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:an([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:an([oe.sprite,oe.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:an([oe.common,oe.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:an([oe.lights,oe.fog,{color:{value:new Ce(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};Li.physical={uniforms:an([Li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Te(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Te},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ce(0)},specularColor:{value:new Ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Te},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};var _f={r:0,b:0,g:0},Is=new wr,oL=new ke;function aL(n,e,t,i,r,s,o){let a=new Ce(0),c=s===!0?0:1,l,u,d=null,f=0,h=null;function m(E){let T=E.isScene===!0?E.background:null;return T&&T.isTexture&&(T=(E.backgroundBlurriness>0?t:e).get(T)),T}function y(E){let T=!1,I=m(E);I===null?p(a,c):I&&I.isColor&&(p(I,1),T=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(E,T){let I=m(T);I&&(I.isCubeTexture||I.mapping===Ac)?(u===void 0&&(u=new vt(new Ai(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:ws(Li.backgroundCube.uniforms),vertexShader:Li.backgroundCube.vertexShader,fragmentShader:Li.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,R,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Is.copy(T.backgroundRotation),Is.x*=-1,Is.y*=-1,Is.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(Is.y*=-1,Is.z*=-1),u.material.uniforms.envMap.value=I,u.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(oL.makeRotationFromEuler(Is)),u.material.toneMapped=Je.getTransfer(I.colorSpace)!==ct,(d!==I||f!==I.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,d=I,f=I.version,h=n.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):I&&I.isTexture&&(l===void 0&&(l=new vt(new gc(2,2),new $n({name:"BackgroundMaterial",uniforms:ws(Li.background.uniforms),vertexShader:Li.background.vertexShader,fragmentShader:Li.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=I,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=Je.getTransfer(I.colorSpace)!==ct,I.matrixAutoUpdate===!0&&I.updateMatrix(),l.material.uniforms.uvTransform.value.copy(I.matrix),(d!==I||f!==I.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,d=I,f=I.version,h=n.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function p(E,T){E.getRGB(_f,Ug(n)),i.buffers.color.setClear(_f.r,_f.g,_f.b,T,o)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,T=1){a.set(E),c=T,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,p(a,c)},render:y,addToRenderList:g,dispose:M}}function cL(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,o=!1;function a(_,N,k,V,j){let G=!1,q=d(V,k,N);s!==q&&(s=q,l(s.object)),G=h(_,V,k,j),G&&m(_,V,k,j),j!==null&&e.update(j,n.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,T(_,N,k,V),j!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function c(){return n.createVertexArray()}function l(_){return n.bindVertexArray(_)}function u(_){return n.deleteVertexArray(_)}function d(_,N,k){let V=k.wireframe===!0,j=i[_.id];j===void 0&&(j={},i[_.id]=j);let G=j[N.id];G===void 0&&(G={},j[N.id]=G);let q=G[V];return q===void 0&&(q=f(c()),G[V]=q),q}function f(_){let N=[],k=[],V=[];for(let j=0;j<t;j++)N[j]=0,k[j]=0,V[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:k,attributeDivisors:V,object:_,attributes:{},index:null}}function h(_,N,k,V){let j=s.attributes,G=N.attributes,q=0,J=k.getAttributes();for(let z in J)if(J[z].location>=0){let se=j[z],we=G[z];if(we===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&(we=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&(we=_.instanceColor)),se===void 0||se.attribute!==we||we&&se.data!==we.data)return!0;q++}return s.attributesNum!==q||s.index!==V}function m(_,N,k,V){let j={},G=N.attributes,q=0,J=k.getAttributes();for(let z in J)if(J[z].location>=0){let se=G[z];se===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&(se=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&(se=_.instanceColor));let we={};we.attribute=se,se&&se.data&&(we.data=se.data),j[z]=we,q++}s.attributes=j,s.attributesNum=q,s.index=V}function y(){let _=s.newAttributes;for(let N=0,k=_.length;N<k;N++)_[N]=0}function g(_){p(_,0)}function p(_,N){let k=s.newAttributes,V=s.enabledAttributes,j=s.attributeDivisors;k[_]=1,V[_]===0&&(n.enableVertexAttribArray(_),V[_]=1),j[_]!==N&&(n.vertexAttribDivisor(_,N),j[_]=N)}function M(){let _=s.newAttributes,N=s.enabledAttributes;for(let k=0,V=N.length;k<V;k++)N[k]!==_[k]&&(n.disableVertexAttribArray(k),N[k]=0)}function E(_,N,k,V,j,G,q){q===!0?n.vertexAttribIPointer(_,N,k,j,G):n.vertexAttribPointer(_,N,k,V,j,G)}function T(_,N,k,V){y();let j=V.attributes,G=k.getAttributes(),q=N.defaultAttributeValues;for(let J in G){let z=G[J];if(z.location>=0){let ne=j[J];if(ne===void 0&&(J==="instanceMatrix"&&_.instanceMatrix&&(ne=_.instanceMatrix),J==="instanceColor"&&_.instanceColor&&(ne=_.instanceColor)),ne!==void 0){let se=ne.normalized,we=ne.itemSize,Qe=e.get(ne);if(Qe===void 0)continue;let lt=Qe.buffer,gt=Qe.type,yt=Qe.bytesPerElement,$=gt===n.INT||gt===n.UNSIGNED_INT||ne.gpuType===Fd;if(ne.isInterleavedBufferAttribute){let Z=ne.data,fe=Z.stride,Ve=ne.offset;if(Z.isInstancedInterleavedBuffer){for(let _e=0;_e<z.locationSize;_e++)p(z.location+_e,Z.meshPerAttribute);_.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let _e=0;_e<z.locationSize;_e++)g(z.location+_e);n.bindBuffer(n.ARRAY_BUFFER,lt);for(let _e=0;_e<z.locationSize;_e++)E(z.location+_e,we/z.locationSize,gt,se,fe*yt,(Ve+we/z.locationSize*_e)*yt,$)}else{if(ne.isInstancedBufferAttribute){for(let Z=0;Z<z.locationSize;Z++)p(z.location+Z,ne.meshPerAttribute);_.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Z=0;Z<z.locationSize;Z++)g(z.location+Z);n.bindBuffer(n.ARRAY_BUFFER,lt);for(let Z=0;Z<z.locationSize;Z++)E(z.location+Z,we/z.locationSize,gt,se,we*yt,we/z.locationSize*Z*yt,$)}}else if(q!==void 0){let se=q[J];if(se!==void 0)switch(se.length){case 2:n.vertexAttrib2fv(z.location,se);break;case 3:n.vertexAttrib3fv(z.location,se);break;case 4:n.vertexAttrib4fv(z.location,se);break;default:n.vertexAttrib1fv(z.location,se)}}}}M()}function I(){O();for(let _ in i){let N=i[_];for(let k in N){let V=N[k];for(let j in V)u(V[j].object),delete V[j];delete N[k]}delete i[_]}}function w(_){if(i[_.id]===void 0)return;let N=i[_.id];for(let k in N){let V=N[k];for(let j in V)u(V[j].object),delete V[j];delete N[k]}delete i[_.id]}function R(_){for(let N in i){let k=i[N];if(k[_.id]===void 0)continue;let V=k[_.id];for(let j in V)u(V[j].object),delete V[j];delete k[_.id]}}function O(){b(),o=!0,s!==r&&(s=r,l(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:O,resetDefaultState:b,dispose:I,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:g,disableUnusedAttributes:M}}function lL(n,e,t){let i;function r(l){i=l}function s(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function o(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function a(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let h=0;for(let m=0;m<d;m++)h+=u[m];t.update(h,i,1)}function c(l,u,d,f){if(d===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<l.length;m++)o(l[m],u[m],f[m]);else{h.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,d);let m=0;for(let y=0;y<d;y++)m+=u[y]*f[y];t.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function uL(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==kn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let O=R===Ts&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==fi&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Xn&&!O)}function c(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(xe("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=m>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:T,vertexTextures:I,maxSamples:w}}function dL(n){let e=this,t=null,i=0,r=!1,s=!1,o=new jn,a=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let m=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,p=n.get(d);if(!r||m===null||m.length===0||s&&!g)s?u(null):l();else{let M=s?0:i,E=M*4,T=p.clippingState||null;c.value=T,T=u(m,f,E,h);for(let I=0;I!==E;++I)T[I]=t[I];p.clippingState=T,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,m){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=c.value,m!==!0||g===null){let p=h+y*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let E=0,T=h;E!==y;++E,T+=4)o.copy(d[E]).applyMatrix4(M,a),o.normal.toArray(g,T),g[T+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function fL(n){let e=new WeakMap;function t(o,a){return a===Pd?o.mapping=Es:a===Ld&&(o.mapping=Ms),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Pd||a===Ld)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new fd(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}var Lr=4,FM=[.125,.215,.35,.446,.526,.582],Rs=20,hL=256,Lc=new bs,kM=new Ce,zg=null,Gg=0,jg=0,Wg=!1,pL=new A,Ef=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=pL}=s;zg=this._renderer.getRenderTarget(),Gg=this._renderer.getActiveCubeFace(),jg=this._renderer.getActiveMipmapLevel(),Wg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=VM(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=BM(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(zg,Gg,jg),this._renderer.xr.enabled=Wg,e.scissorTest=!1,zo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Es||e.mapping===Ms?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zg=this._renderer.getRenderTarget(),Gg=this._renderer.getActiveCubeFace(),jg=this._renderer.getActiveMipmapLevel(),Wg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:Ts,format:kn,colorSpace:Zt,depthBuffer:!1},r=UM(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=UM(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=mL(s)),this._blurMaterial=yL(s,e,t),this._ggxMaterial=gL(s,e,t)}return r}_compileMaterial(e){let t=new vt(new Vt,e);this._renderer.compile(t,Lc)}_sceneToCubeUV(e,t,i,r,s){let c=new Ut(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(kM),d.toneMapping=ir,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new vt(new Ai,new Fn({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,p=!1,M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,p=!0):(g.color.copy(kM),p=!0);for(let E=0;E<6;E++){let T=E%3;T===0?(c.up.set(0,l[E],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[E],s.y,s.z)):T===1?(c.up.set(0,0,l[E]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[E],s.z)):(c.up.set(0,l[E],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[E]));let I=this._cubeSize;zo(r,T*I,E>2?I:0,I,I),d.setRenderTarget(r),p&&d.render(y,c),d.render(e,c)}d.toneMapping=h,d.autoClear=f,e.background=M}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===Es||e.mapping===Ms;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=VM()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=BM());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;zo(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Lc)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let c=o.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=.05+l*.95,h=d*f,{_lodMax:m}=this,y=this._sizeLods[i],g=3*y*(i>m-Lr?i-m+Lr:0),p=4*(this._cubeSize-y);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=m-t,zo(s,g,p,3*y,2*y),r.setRenderTarget(s),r.render(a,Lc),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-i,zo(e,g,p,3*y,2*y),r.setRenderTarget(e),r.render(a,Lc)}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&We("blur direction must be either latitudinal or longitudinal!");let u=3,d=this._lodMeshes[r];d.material=l;let f=l.uniforms,h=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Rs-1),y=s/m,g=isFinite(s)?1+Math.floor(u*y):Rs;g>Rs&&xe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Rs}`);let p=[],M=0;for(let R=0;R<Rs;++R){let O=R/y,b=Math.exp(-O*O/2);p.push(b),R===0?M+=b:R<g&&(M+=2*b)}for(let R=0;R<p.length;R++)p[R]=p[R]/M;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:E}=this;f.dTheta.value=m,f.mipInt.value=E-i;let T=this._sizeLods[r],I=3*T*(r>E-Lr?r-E+Lr:0),w=4*(this._cubeSize-T);zo(t,I,w,3*T,2*T),c.setRenderTarget(t),c.render(d,Lc)}};function mL(n){let e=[],t=[],i=[],r=n,s=n-Lr+1+FM.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);e.push(a);let c=1/a;o>n-Lr?c=FM[o-n+Lr-1]:o===0&&(c=0),t.push(c);let l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,m=6,y=3,g=2,p=1,M=new Float32Array(y*m*h),E=new Float32Array(g*m*h),T=new Float32Array(p*m*h);for(let w=0;w<h;w++){let R=w%3*2/3-1,O=w>2?0:-1,b=[R,O,0,R+2/3,O,0,R+2/3,O+1,0,R,O,0,R+2/3,O+1,0,R,O+1,0];M.set(b,y*m*w),E.set(f,g*m*w);let _=[w,w,w,w,w,w];T.set(_,p*m*w)}let I=new Vt;I.setAttribute("position",new Rt(M,y)),I.setAttribute("uv",new Rt(E,g)),I.setAttribute("faceIndex",new Rt(T,p)),i.push(new vt(I,null)),r>Lr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function UM(n,e,t){let i=new wi(n,e,t);return i.texture.mapping=Ac,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function zo(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function gL(n,e,t){return new $n({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:hL,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Sf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function yL(n,e,t){let i=new Float32Array(Rs),r=new A(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:Rs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Sf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function BM(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function VM(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Sf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function xL(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let c=a.mapping,l=c===Pd||c===Ld,u=c===Es||c===Ms;if(l||u){let d=e.get(a),f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Ef(n)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{let h=a.image;return l&&h&&h.height>0||u&&h&&r(h)?(t===null&&(t=new Ef(n)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){let c=a.target;c.removeEventListener("dispose",s);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function vL(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&To("WebGLRenderer: "+i+" extension not supported."),r}}}function _L(n,e,t,i){let r={},s=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete r[f.id];let h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let h in f)e.update(f[h],n.ARRAY_BUFFER)}function l(d){let f=[],h=d.index,m=d.attributes.position,y=0;if(h!==null){let M=h.array;y=h.version;for(let E=0,T=M.length;E<T;E+=3){let I=M[E+0],w=M[E+1],R=M[E+2];f.push(I,w,w,R,R,I)}}else if(m!==void 0){let M=m.array;y=m.version;for(let E=0,T=M.length/3-1;E<T;E+=3){let I=E+0,w=E+1,R=E+2;f.push(I,w,w,R,R,I)}}else return;let g=new(Fg(f)?ic:nc)(f,1);g.version=y;let p=s.get(d);p&&e.remove(p),s.set(d,g)}function u(d){let f=s.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function bL(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,h){n.drawElements(i,h,s,f*o),t.update(h,i,1)}function l(f,h,m){m!==0&&(n.drawElementsInstanced(i,h,s,f*o,m),t.update(h,i,m))}function u(f,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,m);let g=0;for(let p=0;p<m;p++)g+=h[p];t.update(g,i,1)}function d(f,h,m,y){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)l(f[p]/o,h[p],y[p]);else{g.multiDrawElementsInstancedWEBGL(i,h,0,s,f,0,y,0,m);let p=0;for(let M=0;M<m;M++)p+=h[M]*y[M];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function EL(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:We("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function ML(n,e,t){let i=new WeakMap,r=new it;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let _=function(){O.dispose(),i.delete(a),a.removeEventListener("dispose",_)};var h=_;f!==void 0&&f.texture.dispose();let m=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],T=0;m===!0&&(T=1),y===!0&&(T=2),g===!0&&(T=3);let I=a.attributes.position.count*T,w=1;I>e.maxTextureSize&&(w=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);let R=new Float32Array(I*w*4*d),O=new ec(R,I,w,d);O.type=Xn,O.needsUpdate=!0;let b=T*4;for(let N=0;N<d;N++){let k=p[N],V=M[N],j=E[N],G=I*w*4*N;for(let q=0;q<k.count;q++){let J=q*b;m===!0&&(r.fromBufferAttribute(k,q),R[G+J+0]=r.x,R[G+J+1]=r.y,R[G+J+2]=r.z,R[G+J+3]=0),y===!0&&(r.fromBufferAttribute(V,q),R[G+J+4]=r.x,R[G+J+5]=r.y,R[G+J+6]=r.z,R[G+J+7]=0),g===!0&&(r.fromBufferAttribute(j,q),R[G+J+8]=r.x,R[G+J+9]=r.y,R[G+J+10]=r.z,R[G+J+11]=j.itemSize===4?r.w:1)}}f={count:d,texture:O,size:new Te(I,w)},i.set(a,f),a.addEventListener("dispose",_)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];let y=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",y),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function SL(n,e,t,i){let r=new WeakMap;function s(c){let l=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return d}function o(){r=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}var sS=new _n,HM=new hc(1,1),oS=new ec,aS=new ud,cS=new sc,zM=[],GM=[],jM=new Float32Array(16),WM=new Float32Array(9),$M=new Float32Array(4);function jo(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=zM[r];if(s===void 0&&(s=new Float32Array(r),zM[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Gt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function jt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Tf(n,e){let t=GM[e];t===void 0&&(t=new Int32Array(e),GM[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function TL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function wL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2fv(this.addr,e),jt(t,e)}}function AL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;n.uniform3fv(this.addr,e),jt(t,e)}}function IL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4fv(this.addr,e),jt(t,e)}}function CL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),jt(t,e)}else{if(Gt(t,i))return;$M.set(i),n.uniformMatrix2fv(this.addr,!1,$M),jt(t,i)}}function RL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),jt(t,e)}else{if(Gt(t,i))return;WM.set(i),n.uniformMatrix3fv(this.addr,!1,WM),jt(t,i)}}function DL(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),jt(t,e)}else{if(Gt(t,i))return;jM.set(i),n.uniformMatrix4fv(this.addr,!1,jM),jt(t,i)}}function NL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function PL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2iv(this.addr,e),jt(t,e)}}function LL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;n.uniform3iv(this.addr,e),jt(t,e)}}function OL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4iv(this.addr,e),jt(t,e)}}function FL(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function kL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;n.uniform2uiv(this.addr,e),jt(t,e)}}function UL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;n.uniform3uiv(this.addr,e),jt(t,e)}}function BL(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;n.uniform4uiv(this.addr,e),jt(t,e)}}function VL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(HM.compareFunction=Lg,s=HM):s=sS,t.setTexture2D(e||s,r)}function HL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||aS,r)}function zL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||cS,r)}function GL(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||oS,r)}function jL(n){switch(n){case 5126:return TL;case 35664:return wL;case 35665:return AL;case 35666:return IL;case 35674:return CL;case 35675:return RL;case 35676:return DL;case 5124:case 35670:return NL;case 35667:case 35671:return PL;case 35668:case 35672:return LL;case 35669:case 35673:return OL;case 5125:return FL;case 36294:return kL;case 36295:return UL;case 36296:return BL;case 35678:case 36198:case 36298:case 36306:case 35682:return VL;case 35679:case 36299:case 36307:return HL;case 35680:case 36300:case 36308:case 36293:return zL;case 36289:case 36303:case 36311:case 36292:return GL}}function WL(n,e){n.uniform1fv(this.addr,e)}function $L(n,e){let t=jo(e,this.size,2);n.uniform2fv(this.addr,t)}function qL(n,e){let t=jo(e,this.size,3);n.uniform3fv(this.addr,t)}function XL(n,e){let t=jo(e,this.size,4);n.uniform4fv(this.addr,t)}function YL(n,e){let t=jo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function ZL(n,e){let t=jo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function KL(n,e){let t=jo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function JL(n,e){n.uniform1iv(this.addr,e)}function QL(n,e){n.uniform2iv(this.addr,e)}function eO(n,e){n.uniform3iv(this.addr,e)}function tO(n,e){n.uniform4iv(this.addr,e)}function nO(n,e){n.uniform1uiv(this.addr,e)}function iO(n,e){n.uniform2uiv(this.addr,e)}function rO(n,e){n.uniform3uiv(this.addr,e)}function sO(n,e){n.uniform4uiv(this.addr,e)}function oO(n,e,t){let i=this.cache,r=e.length,s=Tf(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||sS,s[o])}function aO(n,e,t){let i=this.cache,r=e.length,s=Tf(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||aS,s[o])}function cO(n,e,t){let i=this.cache,r=e.length,s=Tf(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||cS,s[o])}function lO(n,e,t){let i=this.cache,r=e.length,s=Tf(t,r);Gt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||oS,s[o])}function uO(n){switch(n){case 5126:return WL;case 35664:return $L;case 35665:return qL;case 35666:return XL;case 35674:return YL;case 35675:return ZL;case 35676:return KL;case 5124:case 35670:return JL;case 35667:case 35671:return QL;case 35668:case 35672:return eO;case 35669:case 35673:return tO;case 5125:return nO;case 36294:return iO;case 36295:return rO;case 36296:return sO;case 35678:case 36198:case 36298:case 36306:case 35682:return oO;case 35679:case 36299:case 36307:return aO;case 35680:case 36300:case 36308:case 36293:return cO;case 36289:case 36303:case 36311:case 36292:return lO}}var qg=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=jL(t.type)}},Xg=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uO(t.type)}},Yg=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},$g=/(\w+)(\])?(\[|\.)?/g;function qM(n,e){n.seq.push(e),n.map[e.id]=e}function dO(n,e,t){let i=n.name,r=i.length;for($g.lastIndex=0;;){let s=$g.exec(i),o=$g.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){qM(t,l===void 0?new qg(a,n,e):new Xg(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new Yg(a),qM(t,d)),t=d}}}var Go=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);dO(s,o,this)}}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function XM(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var fO=37297,hO=0;function pO(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var YM=new He;function mO(n){Je._getMatrix(YM,Je.workingColorSpace,n);let e=`mat3( ${YM.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(n)){case Ka:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return xe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ZM(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+pO(n.getShaderSource(e),a)}else return s}function gO(n,e){let t=mO(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function yO(n,e){let t;switch(e){case cM:t="Linear";break;case lM:t="Reinhard";break;case uM:t="Cineon";break;case dM:t="ACESFilmic";break;case hM:t="AgX";break;case pM:t="Neutral";break;case fM:t="Custom";break;default:xe("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var bf=new A;function xO(){Je.getLuminanceCoefficients(bf);let n=bf.x.toFixed(4),e=bf.y.toFixed(4),t=bf.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vO(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Oc).join(`
`)}function _O(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function bO(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Oc(n){return n!==""}function KM(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function JM(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var EO=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zg(n){return n.replace(EO,SO)}var MO=new Map;function SO(n,e){let t=ze[e];if(t===void 0){let i=MO.get(e);if(i!==void 0)t=ze[i],xe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Zg(t)}var TO=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function QM(n){return n.replace(TO,wO)}function wO(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function eS(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function AO(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Eg?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Td?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ni&&(e="SHADOWMAP_TYPE_VSM"),e}function IO(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Es:case Ms:e="ENVMAP_TYPE_CUBE";break;case Ac:e="ENVMAP_TYPE_CUBE_UV";break}return e}function CO(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ms:e="ENVMAP_MODE_REFRACTION";break}return e}function RO(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Tg:e="ENVMAP_BLENDING_MULTIPLY";break;case oM:e="ENVMAP_BLENDING_MIX";break;case aM:e="ENVMAP_BLENDING_ADD";break}return e}function DO(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function NO(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=AO(t),l=IO(t),u=CO(t),d=RO(t),f=DO(t),h=vO(t),m=_O(s),y=r.createProgram(),g,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Oc).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Oc).join(`
`),p.length>0&&(p+=`
`)):(g=[eS(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Oc).join(`
`),p=[eS(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ir?"#define TONE_MAPPING":"",t.toneMapping!==ir?ze.tonemapping_pars_fragment:"",t.toneMapping!==ir?yO("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,gO("linearToOutputTexel",t.outputColorSpace),xO(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Oc).join(`
`)),o=Zg(o),o=KM(o,t),o=JM(o,t),a=Zg(a),a=KM(a,t),a=JM(a,t),o=QM(o),a=QM(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Og?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Og?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let E=M+g+o,T=M+p+a,I=XM(r,r.VERTEX_SHADER,E),w=XM(r,r.FRAGMENT_SHADER,T);r.attachShader(y,I),r.attachShader(y,w),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function R(N){if(n.debug.checkShaderErrors){let k=r.getProgramInfoLog(y)||"",V=r.getShaderInfoLog(I)||"",j=r.getShaderInfoLog(w)||"",G=k.trim(),q=V.trim(),J=j.trim(),z=!0,ne=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,y,I,w);else{let se=ZM(r,I,"vertex"),we=ZM(r,w,"fragment");We("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+G+`
`+se+`
`+we)}else G!==""?xe("WebGLProgram: Program Info Log:",G):(q===""||J==="")&&(ne=!1);ne&&(N.diagnostics={runnable:z,programLog:G,vertexShader:{log:q,prefix:g},fragmentShader:{log:J,prefix:p}})}r.deleteShader(I),r.deleteShader(w),O=new Go(r,y),b=bO(r,y)}let O;this.getUniforms=function(){return O===void 0&&R(this),O};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=r.getProgramParameter(y,fO)),_},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hO++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=I,this.fragmentShader=w,this}var PO=0,Kg=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Jg(e),t.set(e,i)),i}},Jg=class{constructor(e){this.id=PO++,this.code=e,this.usedTimes=0}};function LO(n,e,t,i,r,s,o){let a=new tc,c=new Kg,l=new Set,u=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures,h=r.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,_,N,k,V){let j=k.fog,G=V.geometry,q=b.isMeshStandardMaterial?k.environment:null,J=(b.isMeshStandardMaterial?t:e).get(b.envMap||q),z=J&&J.mapping===Ac?J.image.height:null,ne=m[b.type];b.precision!==null&&(h=r.getMaxPrecision(b.precision),h!==b.precision&&xe("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));let se=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,we=se!==void 0?se.length:0,Qe=0;G.morphAttributes.position!==void 0&&(Qe=1),G.morphAttributes.normal!==void 0&&(Qe=2),G.morphAttributes.color!==void 0&&(Qe=3);let lt,gt,yt,$;if(ne){let ut=Li[ne];lt=ut.vertexShader,gt=ut.fragmentShader}else lt=b.vertexShader,gt=b.fragmentShader,c.update(b),yt=c.getVertexShaderID(b),$=c.getFragmentShaderID(b);let Z=n.getRenderTarget(),fe=n.state.buffers.depth.getReversed(),Ve=V.isInstancedMesh===!0,_e=V.isBatchedMesh===!0,Xe=!!b.map,qt=!!b.matcap,$e=!!J,Et=!!b.aoMap,C=!!b.lightMap,Ye=!!b.bumpMap,Ze=!!b.normalMap,xt=!!b.displacementMap,me=!!b.emissiveMap,St=!!b.metalnessMap,Me=!!b.roughnessMap,Ue=b.anisotropy>0,S=b.clearcoat>0,x=b.dispersion>0,F=b.iridescence>0,W=b.sheen>0,Y=b.transmission>0,H=Ue&&!!b.anisotropyMap,ve=S&&!!b.clearcoatMap,ae=S&&!!b.clearcoatNormalMap,Ae=S&&!!b.clearcoatRoughnessMap,ye=F&&!!b.iridescenceMap,K=F&&!!b.iridescenceThicknessMap,te=W&&!!b.sheenColorMap,Ne=W&&!!b.sheenRoughnessMap,Re=!!b.specularMap,ue=!!b.specularColorMap,Le=!!b.specularIntensityMap,D=Y&&!!b.transmissionMap,ce=Y&&!!b.thicknessMap,ie=!!b.gradientMap,re=!!b.alphaMap,Q=b.alphaTest>0,X=!!b.alphaHash,he=!!b.extensions,Oe=ir;b.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Oe=n.toneMapping);let _t={shaderID:ne,shaderType:b.type,shaderName:b.name,vertexShader:lt,fragmentShader:gt,defines:b.defines,customVertexShaderID:yt,customFragmentShaderID:$,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:_e,batchingColor:_e&&V._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&V.instanceColor!==null,instancingMorph:Ve&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Z===null?n.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Zt,alphaToCoverage:!!b.alphaToCoverage,map:Xe,matcap:qt,envMap:$e,envMapMode:$e&&J.mapping,envMapCubeUVHeight:z,aoMap:Et,lightMap:C,bumpMap:Ye,normalMap:Ze,displacementMap:f&&xt,emissiveMap:me,normalMapObjectSpace:Ze&&b.normalMapType===EM,normalMapTangentSpace:Ze&&b.normalMapType===Pg,metalnessMap:St,roughnessMap:Me,anisotropy:Ue,anisotropyMap:H,clearcoat:S,clearcoatMap:ve,clearcoatNormalMap:ae,clearcoatRoughnessMap:Ae,dispersion:x,iridescence:F,iridescenceMap:ye,iridescenceThicknessMap:K,sheen:W,sheenColorMap:te,sheenRoughnessMap:Ne,specularMap:Re,specularColorMap:ue,specularIntensityMap:Le,transmission:Y,transmissionMap:D,thicknessMap:ce,gradientMap:ie,opaque:b.transparent===!1&&b.blending===hs&&b.alphaToCoverage===!1,alphaMap:re,alphaTest:Q,alphaHash:X,combine:b.combine,mapUv:Xe&&y(b.map.channel),aoMapUv:Et&&y(b.aoMap.channel),lightMapUv:C&&y(b.lightMap.channel),bumpMapUv:Ye&&y(b.bumpMap.channel),normalMapUv:Ze&&y(b.normalMap.channel),displacementMapUv:xt&&y(b.displacementMap.channel),emissiveMapUv:me&&y(b.emissiveMap.channel),metalnessMapUv:St&&y(b.metalnessMap.channel),roughnessMapUv:Me&&y(b.roughnessMap.channel),anisotropyMapUv:H&&y(b.anisotropyMap.channel),clearcoatMapUv:ve&&y(b.clearcoatMap.channel),clearcoatNormalMapUv:ae&&y(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&y(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&y(b.iridescenceMap.channel),iridescenceThicknessMapUv:K&&y(b.iridescenceThicknessMap.channel),sheenColorMapUv:te&&y(b.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&y(b.sheenRoughnessMap.channel),specularMapUv:Re&&y(b.specularMap.channel),specularColorMapUv:ue&&y(b.specularColorMap.channel),specularIntensityMapUv:Le&&y(b.specularIntensityMap.channel),transmissionMapUv:D&&y(b.transmissionMap.channel),thicknessMapUv:ce&&y(b.thicknessMap.channel),alphaMapUv:re&&y(b.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Ze||Ue),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!G.attributes.uv&&(Xe||re),fog:!!j,useFog:b.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:fe,skinning:V.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Qe,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:Oe,decodeVideoTexture:Xe&&b.map.isVideoTexture===!0&&Je.getTransfer(b.map.colorSpace)===ct,decodeVideoTextureEmissive:me&&b.emissiveMap.isVideoTexture===!0&&Je.getTransfer(b.emissiveMap.colorSpace)===ct,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===qn,flipSided:b.side===Kt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:he&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(he&&b.extensions.multiDraw===!0||_e)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return _t.vertexUv1s=l.has(1),_t.vertexUv2s=l.has(2),_t.vertexUv3s=l.has(3),l.clear(),_t}function p(b){let _=[];if(b.shaderID?_.push(b.shaderID):(_.push(b.customVertexShaderID),_.push(b.customFragmentShaderID)),b.defines!==void 0)for(let N in b.defines)_.push(N),_.push(b.defines[N]);return b.isRawShaderMaterial===!1&&(M(_,b),E(_,b),_.push(n.outputColorSpace)),_.push(b.customProgramCacheKey),_.join()}function M(b,_){b.push(_.precision),b.push(_.outputColorSpace),b.push(_.envMapMode),b.push(_.envMapCubeUVHeight),b.push(_.mapUv),b.push(_.alphaMapUv),b.push(_.lightMapUv),b.push(_.aoMapUv),b.push(_.bumpMapUv),b.push(_.normalMapUv),b.push(_.displacementMapUv),b.push(_.emissiveMapUv),b.push(_.metalnessMapUv),b.push(_.roughnessMapUv),b.push(_.anisotropyMapUv),b.push(_.clearcoatMapUv),b.push(_.clearcoatNormalMapUv),b.push(_.clearcoatRoughnessMapUv),b.push(_.iridescenceMapUv),b.push(_.iridescenceThicknessMapUv),b.push(_.sheenColorMapUv),b.push(_.sheenRoughnessMapUv),b.push(_.specularMapUv),b.push(_.specularColorMapUv),b.push(_.specularIntensityMapUv),b.push(_.transmissionMapUv),b.push(_.thicknessMapUv),b.push(_.combine),b.push(_.fogExp2),b.push(_.sizeAttenuation),b.push(_.morphTargetsCount),b.push(_.morphAttributeCount),b.push(_.numDirLights),b.push(_.numPointLights),b.push(_.numSpotLights),b.push(_.numSpotLightMaps),b.push(_.numHemiLights),b.push(_.numRectAreaLights),b.push(_.numDirLightShadows),b.push(_.numPointLightShadows),b.push(_.numSpotLightShadows),b.push(_.numSpotLightShadowsWithMaps),b.push(_.numLightProbes),b.push(_.shadowMapType),b.push(_.toneMapping),b.push(_.numClippingPlanes),b.push(_.numClipIntersection),b.push(_.depthPacking)}function E(b,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),_.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),b.push(a.mask)}function T(b){let _=m[b.type],N;if(_){let k=Li[_];N=PM.clone(k.uniforms)}else N=b.uniforms;return N}function I(b,_){let N;for(let k=0,V=u.length;k<V;k++){let j=u[k];if(j.cacheKey===_){N=j,++N.usedTimes;break}}return N===void 0&&(N=new NO(n,_,b,s),u.push(N)),N}function w(b){if(--b.usedTimes===0){let _=u.indexOf(b);u[_]=u[u.length-1],u.pop(),b.destroy()}}function R(b){c.remove(b)}function O(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:T,acquireProgram:I,releaseProgram:w,releaseShaderCache:R,programs:u,dispose:O}}function OO(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function FO(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function tS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function nS(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d,f,h,m,y,g){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:m,renderOrder:d.renderOrder,z:y,group:g},n[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=y,p.group=g),e++,p}function a(d,f,h,m,y,g){let p=o(d,f,h,m,y,g);h.transmission>0?i.push(p):h.transparent===!0?r.push(p):t.push(p)}function c(d,f,h,m,y,g){let p=o(d,f,h,m,y,g);h.transmission>0?i.unshift(p):h.transparent===!0?r.unshift(p):t.unshift(p)}function l(d,f){t.length>1&&t.sort(d||FO),i.length>1&&i.sort(f||tS),r.length>1&&r.sort(f||tS)}function u(){for(let d=e,f=n.length;d<f;d++){let h=n[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function kO(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new nS,n.set(i,[o])):r>=s.length?(o=new nS,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function UO(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new Ce};break;case"SpotLight":t={position:new A,direction:new A,color:new Ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new Ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new Ce,groundColor:new Ce};break;case"RectAreaLight":t={color:new Ce,position:new A,halfWidth:new A,halfHeight:new A};break}return n[e.id]=t,t}}}function BO(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Te,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var VO=0;function HO(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function zO(n){let e=new UO,t=BO(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new A);let r=new A,s=new ke,o=new ke;function a(l){let u=0,d=0,f=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let h=0,m=0,y=0,g=0,p=0,M=0,E=0,T=0,I=0,w=0,R=0;l.sort(HO);for(let b=0,_=l.length;b<_;b++){let N=l[b],k=N.color,V=N.intensity,j=N.distance,G=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)u+=k.r*V,d+=k.g*V,f+=k.b*V;else if(N.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(N.sh.coefficients[q],V);R++}else if(N.isDirectionalLight){let q=e.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let J=N.shadow,z=t.get(N);z.shadowIntensity=J.intensity,z.shadowBias=J.bias,z.shadowNormalBias=J.normalBias,z.shadowRadius=J.radius,z.shadowMapSize=J.mapSize,i.directionalShadow[h]=z,i.directionalShadowMap[h]=G,i.directionalShadowMatrix[h]=N.shadow.matrix,M++}i.directional[h]=q,h++}else if(N.isSpotLight){let q=e.get(N);q.position.setFromMatrixPosition(N.matrixWorld),q.color.copy(k).multiplyScalar(V),q.distance=j,q.coneCos=Math.cos(N.angle),q.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),q.decay=N.decay,i.spot[y]=q;let J=N.shadow;if(N.map&&(i.spotLightMap[I]=N.map,I++,J.updateMatrices(N),N.castShadow&&w++),i.spotLightMatrix[y]=J.matrix,N.castShadow){let z=t.get(N);z.shadowIntensity=J.intensity,z.shadowBias=J.bias,z.shadowNormalBias=J.normalBias,z.shadowRadius=J.radius,z.shadowMapSize=J.mapSize,i.spotShadow[y]=z,i.spotShadowMap[y]=G,T++}y++}else if(N.isRectAreaLight){let q=e.get(N);q.color.copy(k).multiplyScalar(V),q.halfWidth.set(N.width*.5,0,0),q.halfHeight.set(0,N.height*.5,0),i.rectArea[g]=q,g++}else if(N.isPointLight){let q=e.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),q.distance=N.distance,q.decay=N.decay,N.castShadow){let J=N.shadow,z=t.get(N);z.shadowIntensity=J.intensity,z.shadowBias=J.bias,z.shadowNormalBias=J.normalBias,z.shadowRadius=J.radius,z.shadowMapSize=J.mapSize,z.shadowCameraNear=J.camera.near,z.shadowCameraFar=J.camera.far,i.pointShadow[m]=z,i.pointShadowMap[m]=G,i.pointShadowMatrix[m]=N.shadow.matrix,E++}i.point[m]=q,m++}else if(N.isHemisphereLight){let q=e.get(N);q.skyColor.copy(N.color).multiplyScalar(V),q.groundColor.copy(N.groundColor).multiplyScalar(V),i.hemi[p]=q,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let O=i.hash;(O.directionalLength!==h||O.pointLength!==m||O.spotLength!==y||O.rectAreaLength!==g||O.hemiLength!==p||O.numDirectionalShadows!==M||O.numPointShadows!==E||O.numSpotShadows!==T||O.numSpotMaps!==I||O.numLightProbes!==R)&&(i.directional.length=h,i.spot.length=y,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=T+I-w,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=R,O.directionalLength=h,O.pointLength=m,O.spotLength=y,O.rectAreaLength=g,O.hemiLength=p,O.numDirectionalShadows=M,O.numPointShadows=E,O.numSpotShadows=T,O.numSpotMaps=I,O.numLightProbes=R,i.version=VO++)}function c(l,u){let d=0,f=0,h=0,m=0,y=0,g=u.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){let E=l[p];if(E.isDirectionalLight){let T=i.directional[d];T.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),d++}else if(E.isSpotLight){let T=i.spot[h];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),h++}else if(E.isRectAreaLight){let T=i.rectArea[m];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(g),o.identity(),s.copy(E.matrixWorld),s.premultiply(g),o.extractRotation(s),T.halfWidth.set(E.width*.5,0,0),T.halfHeight.set(0,E.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),m++}else if(E.isPointLight){let T=i.point[f];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(g),f++}else if(E.isHemisphereLight){let T=i.hemi[y];T.direction.setFromMatrixPosition(E.matrixWorld),T.direction.transformDirection(g),y++}}}return{setup:a,setupView:c,state:i}}function iS(n){let e=new zO(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}let l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function GO(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new iS(n),e.set(r,[a])):s>=o.length?(a=new iS(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var jO=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,WO=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function $O(n,e,t){let i=new No,r=new Te,s=new Te,o=new it,a=new md({depthPacking:bM}),c=new gd,l={},u=t.maxTextureSize,d={[li]:Kt,[Kt]:li,[qn]:qn},f=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Te},radius:{value:4}},vertexShader:jO,fragmentShader:WO}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let m=new Vt;m.setAttribute("position",new Rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new vt(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Eg;let p=this.type;this.render=function(w,R,O){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;let b=n.getRenderTarget(),_=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Pi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let V=p!==Ni&&this.type===Ni,j=p===Ni&&this.type!==Ni;for(let G=0,q=w.length;G<q;G++){let J=w[G],z=J.shadow;if(z===void 0){xe("WebGLShadowMap:",J,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);let ne=z.getFrameExtents();if(r.multiply(ne),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ne.x),r.x=s.x*ne.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ne.y),r.y=s.y*ne.y,z.mapSize.y=s.y)),z.map===null||V===!0||j===!0){let we=this.type!==Ni?{minFilter:Xt,magFilter:Xt}:{};z.map!==null&&z.map.dispose(),z.map=new wi(r.x,r.y,we),z.map.texture.name=J.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();let se=z.getViewportCount();for(let we=0;we<se;we++){let Qe=z.getViewport(we);o.set(s.x*Qe.x,s.y*Qe.y,s.x*Qe.z,s.y*Qe.w),k.viewport(o),z.updateMatrices(J,we),i=z.getFrustum(),T(R,O,z.camera,J,this.type)}z.isPointLightShadow!==!0&&this.type===Ni&&M(z,O),z.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(b,_,N)};function M(w,R){let O=e.update(y);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,h.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new wi(r.x,r.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(R,null,O,f,y,null),h.uniforms.shadow_pass.value=w.mapPass.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(R,null,O,h,y,null)}function E(w,R,O,b){let _=null,N=O.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)_=N;else if(_=O.isPointLight===!0?c:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let k=_.uuid,V=R.uuid,j=l[k];j===void 0&&(j={},l[k]=j);let G=j[V];G===void 0&&(G=_.clone(),j[V]=G,R.addEventListener("dispose",I)),_=G}if(_.visible=R.visible,_.wireframe=R.wireframe,b===Ni?_.side=R.shadowSide!==null?R.shadowSide:R.side:_.side=R.shadowSide!==null?R.shadowSide:d[R.side],_.alphaMap=R.alphaMap,_.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,_.map=R.map,_.clipShadows=R.clipShadows,_.clippingPlanes=R.clippingPlanes,_.clipIntersection=R.clipIntersection,_.displacementMap=R.displacementMap,_.displacementScale=R.displacementScale,_.displacementBias=R.displacementBias,_.wireframeLinewidth=R.wireframeLinewidth,_.linewidth=R.linewidth,O.isPointLight===!0&&_.isMeshDistanceMaterial===!0){let k=n.properties.get(_);k.light=O}return _}function T(w,R,O,b,_){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&_===Ni)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,w.matrixWorld);let V=e.update(w),j=w.material;if(Array.isArray(j)){let G=V.groups;for(let q=0,J=G.length;q<J;q++){let z=G[q],ne=j[z.materialIndex];if(ne&&ne.visible){let se=E(w,ne,b,_);w.onBeforeShadow(n,w,R,O,V,se,z),n.renderBufferDirect(O,null,V,se,w,z),w.onAfterShadow(n,w,R,O,V,se,z)}}}else if(j.visible){let G=E(w,j,b,_);w.onBeforeShadow(n,w,R,O,V,G,null),n.renderBufferDirect(O,null,V,G,w,null),w.onAfterShadow(n,w,R,O,V,G,null)}}let k=w.children;for(let V=0,j=k.length;V<j;V++)T(k[V],R,O,b,_)}function I(w){w.target.removeEventListener("dispose",I);for(let O in l){let b=l[O],_=w.target.uuid;_ in b&&(b[_].dispose(),delete b[_])}}}var qO={[wd]:Ad,[Id]:Dd,[Cd]:Nd,[ps]:Rd,[Ad]:wd,[Dd]:Id,[Nd]:Cd,[Rd]:ps};function XO(n,e){function t(){let D=!1,ce=new it,ie=null,re=new it(0,0,0,0);return{setMask:function(Q){ie!==Q&&!D&&(n.colorMask(Q,Q,Q,Q),ie=Q)},setLocked:function(Q){D=Q},setClear:function(Q,X,he,Oe,_t){_t===!0&&(Q*=Oe,X*=Oe,he*=Oe),ce.set(Q,X,he,Oe),re.equals(ce)===!1&&(n.clearColor(Q,X,he,Oe),re.copy(ce))},reset:function(){D=!1,ie=null,re.set(-1,0,0,0)}}}function i(){let D=!1,ce=!1,ie=null,re=null,Q=null;return{setReversed:function(X){if(ce!==X){let he=e.get("EXT_clip_control");X?he.clipControlEXT(he.LOWER_LEFT_EXT,he.ZERO_TO_ONE_EXT):he.clipControlEXT(he.LOWER_LEFT_EXT,he.NEGATIVE_ONE_TO_ONE_EXT),ce=X;let Oe=Q;Q=null,this.setClear(Oe)}},getReversed:function(){return ce},setTest:function(X){X?Z(n.DEPTH_TEST):fe(n.DEPTH_TEST)},setMask:function(X){ie!==X&&!D&&(n.depthMask(X),ie=X)},setFunc:function(X){if(ce&&(X=qO[X]),re!==X){switch(X){case wd:n.depthFunc(n.NEVER);break;case Ad:n.depthFunc(n.ALWAYS);break;case Id:n.depthFunc(n.LESS);break;case ps:n.depthFunc(n.LEQUAL);break;case Cd:n.depthFunc(n.EQUAL);break;case Rd:n.depthFunc(n.GEQUAL);break;case Dd:n.depthFunc(n.GREATER);break;case Nd:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}re=X}},setLocked:function(X){D=X},setClear:function(X){Q!==X&&(ce&&(X=1-X),n.clearDepth(X),Q=X)},reset:function(){D=!1,ie=null,re=null,Q=null,ce=!1}}}function r(){let D=!1,ce=null,ie=null,re=null,Q=null,X=null,he=null,Oe=null,_t=null;return{setTest:function(ut){D||(ut?Z(n.STENCIL_TEST):fe(n.STENCIL_TEST))},setMask:function(ut){ce!==ut&&!D&&(n.stencilMask(ut),ce=ut)},setFunc:function(ut,hi,Zn){(ie!==ut||re!==hi||Q!==Zn)&&(n.stencilFunc(ut,hi,Zn),ie=ut,re=hi,Q=Zn)},setOp:function(ut,hi,Zn){(X!==ut||he!==hi||Oe!==Zn)&&(n.stencilOp(ut,hi,Zn),X=ut,he=hi,Oe=Zn)},setLocked:function(ut){D=ut},setClear:function(ut){_t!==ut&&(n.clearStencil(ut),_t=ut)},reset:function(){D=!1,ce=null,ie=null,re=null,Q=null,X=null,he=null,Oe=null,_t=null}}}let s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,h=[],m=null,y=!1,g=null,p=null,M=null,E=null,T=null,I=null,w=null,R=new Ce(0,0,0),O=0,b=!1,_=null,N=null,k=null,V=null,j=null,G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,J=0,z=n.getParameter(n.VERSION);z.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(z)[1]),q=J>=1):z.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),q=J>=2);let ne=null,se={},we=n.getParameter(n.SCISSOR_BOX),Qe=n.getParameter(n.VIEWPORT),lt=new it().fromArray(we),gt=new it().fromArray(Qe);function yt(D,ce,ie,re){let Q=new Uint8Array(4),X=n.createTexture();n.bindTexture(D,X),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let he=0;he<ie;he++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,re,0,n.RGBA,n.UNSIGNED_BYTE,Q):n.texImage2D(ce+he,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Q);return X}let $={};$[n.TEXTURE_2D]=yt(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=yt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=yt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=yt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Z(n.DEPTH_TEST),o.setFunc(ps),Ye(!1),Ze(bg),Z(n.CULL_FACE),Et(Pi);function Z(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function fe(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function Ve(D,ce){return d[D]!==ce?(n.bindFramebuffer(D,ce),d[D]=ce,D===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ce),D===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function _e(D,ce){let ie=h,re=!1;if(D){ie=f.get(ce),ie===void 0&&(ie=[],f.set(ce,ie));let Q=D.textures;if(ie.length!==Q.length||ie[0]!==n.COLOR_ATTACHMENT0){for(let X=0,he=Q.length;X<he;X++)ie[X]=n.COLOR_ATTACHMENT0+X;ie.length=Q.length,re=!0}}else ie[0]!==n.BACK&&(ie[0]=n.BACK,re=!0);re&&n.drawBuffers(ie)}function Xe(D){return m!==D?(n.useProgram(D),m=D,!0):!1}let qt={[Tr]:n.FUNC_ADD,[GE]:n.FUNC_SUBTRACT,[jE]:n.FUNC_REVERSE_SUBTRACT};qt[WE]=n.MIN,qt[$E]=n.MAX;let $e={[qE]:n.ZERO,[XE]:n.ONE,[YE]:n.SRC_COLOR,[sd]:n.SRC_ALPHA,[tM]:n.SRC_ALPHA_SATURATE,[QE]:n.DST_COLOR,[KE]:n.DST_ALPHA,[ZE]:n.ONE_MINUS_SRC_COLOR,[od]:n.ONE_MINUS_SRC_ALPHA,[eM]:n.ONE_MINUS_DST_COLOR,[JE]:n.ONE_MINUS_DST_ALPHA,[nM]:n.CONSTANT_COLOR,[iM]:n.ONE_MINUS_CONSTANT_COLOR,[rM]:n.CONSTANT_ALPHA,[sM]:n.ONE_MINUS_CONSTANT_ALPHA};function Et(D,ce,ie,re,Q,X,he,Oe,_t,ut){if(D===Pi){y===!0&&(fe(n.BLEND),y=!1);return}if(y===!1&&(Z(n.BLEND),y=!0),D!==zE){if(D!==g||ut!==b){if((p!==Tr||T!==Tr)&&(n.blendEquation(n.FUNC_ADD),p=Tr,T=Tr),ut)switch(D){case hs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wc:n.blendFunc(n.ONE,n.ONE);break;case Mg:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Sg:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:We("WebGLState: Invalid blending: ",D);break}else switch(D){case hs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case wc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Mg:We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sg:We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:We("WebGLState: Invalid blending: ",D);break}M=null,E=null,I=null,w=null,R.set(0,0,0),O=0,g=D,b=ut}return}Q=Q||ce,X=X||ie,he=he||re,(ce!==p||Q!==T)&&(n.blendEquationSeparate(qt[ce],qt[Q]),p=ce,T=Q),(ie!==M||re!==E||X!==I||he!==w)&&(n.blendFuncSeparate($e[ie],$e[re],$e[X],$e[he]),M=ie,E=re,I=X,w=he),(Oe.equals(R)===!1||_t!==O)&&(n.blendColor(Oe.r,Oe.g,Oe.b,_t),R.copy(Oe),O=_t),g=D,b=!1}function C(D,ce){D.side===qn?fe(n.CULL_FACE):Z(n.CULL_FACE);let ie=D.side===Kt;ce&&(ie=!ie),Ye(ie),D.blending===hs&&D.transparent===!1?Et(Pi):Et(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);let re=D.stencilWrite;a.setTest(re),re&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),me(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Z(n.SAMPLE_ALPHA_TO_COVERAGE):fe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(D){_!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),_=D)}function Ze(D){D!==VE?(Z(n.CULL_FACE),D!==N&&(D===bg?n.cullFace(n.BACK):D===HE?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):fe(n.CULL_FACE),N=D}function xt(D){D!==k&&(q&&n.lineWidth(D),k=D)}function me(D,ce,ie){D?(Z(n.POLYGON_OFFSET_FILL),(V!==ce||j!==ie)&&(n.polygonOffset(ce,ie),V=ce,j=ie)):fe(n.POLYGON_OFFSET_FILL)}function St(D){D?Z(n.SCISSOR_TEST):fe(n.SCISSOR_TEST)}function Me(D){D===void 0&&(D=n.TEXTURE0+G-1),ne!==D&&(n.activeTexture(D),ne=D)}function Ue(D,ce,ie){ie===void 0&&(ne===null?ie=n.TEXTURE0+G-1:ie=ne);let re=se[ie];re===void 0&&(re={type:void 0,texture:void 0},se[ie]=re),(re.type!==D||re.texture!==ce)&&(ne!==ie&&(n.activeTexture(ie),ne=ie),n.bindTexture(D,ce||$[D]),re.type=D,re.texture=ce)}function S(){let D=se[ne];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function F(){try{n.compressedTexImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function W(){try{n.texSubImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function Y(){try{n.texSubImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function ve(){try{n.compressedTexSubImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function ae(){try{n.texStorage2D(...arguments)}catch(D){D("WebGLState:",D)}}function Ae(){try{n.texStorage3D(...arguments)}catch(D){D("WebGLState:",D)}}function ye(){try{n.texImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function K(){try{n.texImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function te(D){lt.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),lt.copy(D))}function Ne(D){gt.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),gt.copy(D))}function Re(D,ce){let ie=l.get(ce);ie===void 0&&(ie=new WeakMap,l.set(ce,ie));let re=ie.get(D);re===void 0&&(re=n.getUniformBlockIndex(ce,D.name),ie.set(D,re))}function ue(D,ce){let re=l.get(ce).get(D);c.get(ce)!==re&&(n.uniformBlockBinding(ce,re,D.__bindingPointIndex),c.set(ce,re))}function Le(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ne=null,se={},d={},f=new WeakMap,h=[],m=null,y=!1,g=null,p=null,M=null,E=null,T=null,I=null,w=null,R=new Ce(0,0,0),O=0,b=!1,_=null,N=null,k=null,V=null,j=null,lt.set(0,0,n.canvas.width,n.canvas.height),gt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:Z,disable:fe,bindFramebuffer:Ve,drawBuffers:_e,useProgram:Xe,setBlending:Et,setMaterial:C,setFlipSided:Ye,setCullFace:Ze,setLineWidth:xt,setPolygonOffset:me,setScissorTest:St,activeTexture:Me,bindTexture:Ue,unbindTexture:S,compressedTexImage2D:x,compressedTexImage3D:F,texImage2D:ye,texImage3D:K,updateUBOMapping:Re,uniformBlockBinding:ue,texStorage2D:ae,texStorage3D:Ae,texSubImage2D:W,texSubImage3D:Y,compressedTexSubImage2D:H,compressedTexSubImage3D:ve,scissor:te,viewport:Ne,reset:Le}}function YO(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Te,u=new WeakMap,d,f=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(S,x){return h?new OffscreenCanvas(S,x):Mo("canvas")}function y(S,x,F){let W=1,Y=Ue(S);if((Y.width>F||Y.height>F)&&(W=F/Math.max(Y.width,Y.height)),W<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let H=Math.floor(W*Y.width),ve=Math.floor(W*Y.height);d===void 0&&(d=m(H,ve));let ae=x?m(H,ve):d;return ae.width=H,ae.height=ve,ae.getContext("2d").drawImage(S,0,0,H,ve),xe("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+H+"x"+ve+")."),ae}else return"data"in S&&xe("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),S;return S}function g(S){return S.generateMipmaps}function p(S){n.generateMipmap(S)}function M(S){return S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?n.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(S,x,F,W,Y=!1){if(S!==null){if(n[S]!==void 0)return n[S];xe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let H=x;if(x===n.RED&&(F===n.FLOAT&&(H=n.R32F),F===n.HALF_FLOAT&&(H=n.R16F),F===n.UNSIGNED_BYTE&&(H=n.R8)),x===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(H=n.R8UI),F===n.UNSIGNED_SHORT&&(H=n.R16UI),F===n.UNSIGNED_INT&&(H=n.R32UI),F===n.BYTE&&(H=n.R8I),F===n.SHORT&&(H=n.R16I),F===n.INT&&(H=n.R32I)),x===n.RG&&(F===n.FLOAT&&(H=n.RG32F),F===n.HALF_FLOAT&&(H=n.RG16F),F===n.UNSIGNED_BYTE&&(H=n.RG8)),x===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(H=n.RG8UI),F===n.UNSIGNED_SHORT&&(H=n.RG16UI),F===n.UNSIGNED_INT&&(H=n.RG32UI),F===n.BYTE&&(H=n.RG8I),F===n.SHORT&&(H=n.RG16I),F===n.INT&&(H=n.RG32I)),x===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(H=n.RGB8UI),F===n.UNSIGNED_SHORT&&(H=n.RGB16UI),F===n.UNSIGNED_INT&&(H=n.RGB32UI),F===n.BYTE&&(H=n.RGB8I),F===n.SHORT&&(H=n.RGB16I),F===n.INT&&(H=n.RGB32I)),x===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(H=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(H=n.RGBA16UI),F===n.UNSIGNED_INT&&(H=n.RGBA32UI),F===n.BYTE&&(H=n.RGBA8I),F===n.SHORT&&(H=n.RGBA16I),F===n.INT&&(H=n.RGBA32I)),x===n.RGB&&(F===n.UNSIGNED_INT_5_9_9_9_REV&&(H=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(H=n.R11F_G11F_B10F)),x===n.RGBA){let ve=Y?Ka:Je.getTransfer(W);F===n.FLOAT&&(H=n.RGBA32F),F===n.HALF_FLOAT&&(H=n.RGBA16F),F===n.UNSIGNED_BYTE&&(H=ve===ct?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(H=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(H=n.RGB5_A1)}return(H===n.R16F||H===n.R32F||H===n.RG16F||H===n.RG32F||H===n.RGBA16F||H===n.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function T(S,x){let F;return S?x===null||x===Pr||x===Bo?F=n.DEPTH24_STENCIL8:x===Xn?F=n.DEPTH32F_STENCIL8:x===Uo&&(F=n.DEPTH24_STENCIL8,xe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Pr||x===Bo?F=n.DEPTH_COMPONENT24:x===Xn?F=n.DEPTH_COMPONENT32F:x===Uo&&(F=n.DEPTH_COMPONENT16),F}function I(S,x){return g(S)===!0||S.isFramebufferTexture&&S.minFilter!==Xt&&S.minFilter!==Yt?Math.log2(Math.max(x.width,x.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?x.mipmaps.length:1}function w(S){let x=S.target;x.removeEventListener("dispose",w),O(x),x.isVideoTexture&&u.delete(x)}function R(S){let x=S.target;x.removeEventListener("dispose",R),_(x)}function O(S){let x=i.get(S);if(x.__webglInit===void 0)return;let F=S.source,W=f.get(F);if(W){let Y=W[x.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&b(S),Object.keys(W).length===0&&f.delete(F)}i.remove(S)}function b(S){let x=i.get(S);n.deleteTexture(x.__webglTexture);let F=S.source,W=f.get(F);delete W[x.__cacheKey],o.memory.textures--}function _(S){let x=i.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),i.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(x.__webglFramebuffer[W]))for(let Y=0;Y<x.__webglFramebuffer[W].length;Y++)n.deleteFramebuffer(x.__webglFramebuffer[W][Y]);else n.deleteFramebuffer(x.__webglFramebuffer[W]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[W])}else{if(Array.isArray(x.__webglFramebuffer))for(let W=0;W<x.__webglFramebuffer.length;W++)n.deleteFramebuffer(x.__webglFramebuffer[W]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let W=0;W<x.__webglColorRenderbuffer.length;W++)x.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[W]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let F=S.textures;for(let W=0,Y=F.length;W<Y;W++){let H=i.get(F[W]);H.__webglTexture&&(n.deleteTexture(H.__webglTexture),o.memory.textures--),i.remove(F[W])}i.remove(S)}let N=0;function k(){N=0}function V(){let S=N;return S>=r.maxTextures&&xe("WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+r.maxTextures),N+=1,S}function j(S){let x=[];return x.push(S.wrapS),x.push(S.wrapT),x.push(S.wrapR||0),x.push(S.magFilter),x.push(S.minFilter),x.push(S.anisotropy),x.push(S.internalFormat),x.push(S.format),x.push(S.type),x.push(S.generateMipmaps),x.push(S.premultiplyAlpha),x.push(S.flipY),x.push(S.unpackAlignment),x.push(S.colorSpace),x.join()}function G(S,x){let F=i.get(S);if(S.isVideoTexture&&St(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&F.__version!==S.version){let W=S.image;if(W===null)xe("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)xe("WebGLRenderer: Texture marked for update but image is incomplete");else{$(F,S,x);return}}else S.isExternalTexture&&(F.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+x)}function q(S,x){let F=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&F.__version!==S.version){$(F,S,x);return}else S.isExternalTexture&&(F.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+x)}function J(S,x){let F=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&F.__version!==S.version){$(F,S,x);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+x)}function z(S,x){let F=i.get(S);if(S.version>0&&F.__version!==S.version){Z(F,S,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+x)}let ne={[Ti]:n.REPEAT,[Wn]:n.CLAMP_TO_EDGE,[bo]:n.MIRRORED_REPEAT},se={[Xt]:n.NEAREST,[Od]:n.NEAREST_MIPMAP_NEAREST,[Ss]:n.NEAREST_MIPMAP_LINEAR,[Yt]:n.LINEAR,[ko]:n.LINEAR_MIPMAP_NEAREST,[di]:n.LINEAR_MIPMAP_LINEAR},we={[MM]:n.NEVER,[CM]:n.ALWAYS,[SM]:n.LESS,[Lg]:n.LEQUAL,[TM]:n.EQUAL,[IM]:n.GEQUAL,[wM]:n.GREATER,[AM]:n.NOTEQUAL};function Qe(S,x){if(x.type===Xn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Yt||x.magFilter===ko||x.magFilter===Ss||x.magFilter===di||x.minFilter===Yt||x.minFilter===ko||x.minFilter===Ss||x.minFilter===di)&&xe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,ne[x.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,ne[x.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,ne[x.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,se[x.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,se[x.minFilter]),x.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,we[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Xt||x.minFilter!==Ss&&x.minFilter!==di||x.type===Xn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(S,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function lt(S,x){let F=!1;S.__webglInit===void 0&&(S.__webglInit=!0,x.addEventListener("dispose",w));let W=x.source,Y=f.get(W);Y===void 0&&(Y={},f.set(W,Y));let H=j(x);if(H!==S.__cacheKey){Y[H]===void 0&&(Y[H]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Y[H].usedTimes++;let ve=Y[S.__cacheKey];ve!==void 0&&(Y[S.__cacheKey].usedTimes--,ve.usedTimes===0&&b(x)),S.__cacheKey=H,S.__webglTexture=Y[H].texture}return F}function gt(S,x,F){return Math.floor(Math.floor(S/F)/x)}function yt(S,x,F,W){let H=S.updateRanges;if(H.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,F,W,x.data);else{H.sort((K,te)=>K.start-te.start);let ve=0;for(let K=1;K<H.length;K++){let te=H[ve],Ne=H[K],Re=te.start+te.count,ue=gt(Ne.start,x.width,4),Le=gt(te.start,x.width,4);Ne.start<=Re+1&&ue===Le&&gt(Ne.start+Ne.count-1,x.width,4)===ue?te.count=Math.max(te.count,Ne.start+Ne.count-te.start):(++ve,H[ve]=Ne)}H.length=ve+1;let ae=n.getParameter(n.UNPACK_ROW_LENGTH),Ae=n.getParameter(n.UNPACK_SKIP_PIXELS),ye=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let K=0,te=H.length;K<te;K++){let Ne=H[K],Re=Math.floor(Ne.start/4),ue=Math.ceil(Ne.count/4),Le=Re%x.width,D=Math.floor(Re/x.width),ce=ue,ie=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Le),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,Le,D,ce,ie,F,W,x.data)}S.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ae),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ae),n.pixelStorei(n.UNPACK_SKIP_ROWS,ye)}}function $(S,x,F){let W=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(W=n.TEXTURE_3D);let Y=lt(S,x),H=x.source;t.bindTexture(W,S.__webglTexture,n.TEXTURE0+F);let ve=i.get(H);if(H.version!==ve.__version||Y===!0){t.activeTexture(n.TEXTURE0+F);let ae=Je.getPrimaries(Je.workingColorSpace),Ae=x.colorSpace===rr?null:Je.getPrimaries(x.colorSpace),ye=x.colorSpace===rr||ae===Ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let K=y(x.image,!1,r.maxTextureSize);K=Me(x,K);let te=s.convert(x.format,x.colorSpace),Ne=s.convert(x.type),Re=E(x.internalFormat,te,Ne,x.colorSpace,x.isVideoTexture);Qe(W,x);let ue,Le=x.mipmaps,D=x.isVideoTexture!==!0,ce=ve.__version===void 0||Y===!0,ie=H.dataReady,re=I(x,K);if(x.isDepthTexture)Re=T(x.format===Vo,x.type),ce&&(D?t.texStorage2D(n.TEXTURE_2D,1,Re,K.width,K.height):t.texImage2D(n.TEXTURE_2D,0,Re,K.width,K.height,0,te,Ne,null));else if(x.isDataTexture)if(Le.length>0){D&&ce&&t.texStorage2D(n.TEXTURE_2D,re,Re,Le[0].width,Le[0].height);for(let Q=0,X=Le.length;Q<X;Q++)ue=Le[Q],D?ie&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,ue.width,ue.height,te,Ne,ue.data):t.texImage2D(n.TEXTURE_2D,Q,Re,ue.width,ue.height,0,te,Ne,ue.data);x.generateMipmaps=!1}else D?(ce&&t.texStorage2D(n.TEXTURE_2D,re,Re,K.width,K.height),ie&&yt(x,K,te,Ne)):t.texImage2D(n.TEXTURE_2D,0,Re,K.width,K.height,0,te,Ne,K.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){D&&ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,Re,Le[0].width,Le[0].height,K.depth);for(let Q=0,X=Le.length;Q<X;Q++)if(ue=Le[Q],x.format!==kn)if(te!==null)if(D){if(ie)if(x.layerUpdates.size>0){let he=Hg(ue.width,ue.height,x.format,x.type);for(let Oe of x.layerUpdates){let _t=ue.data.subarray(Oe*he/ue.data.BYTES_PER_ELEMENT,(Oe+1)*he/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,Oe,ue.width,ue.height,1,te,_t)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,ue.width,ue.height,K.depth,te,ue.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Q,Re,ue.width,ue.height,K.depth,0,ue.data,0,0);else xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ie&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,ue.width,ue.height,K.depth,te,Ne,ue.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Q,Re,ue.width,ue.height,K.depth,0,te,Ne,ue.data)}else{D&&ce&&t.texStorage2D(n.TEXTURE_2D,re,Re,Le[0].width,Le[0].height);for(let Q=0,X=Le.length;Q<X;Q++)ue=Le[Q],x.format!==kn?te!==null?D?ie&&t.compressedTexSubImage2D(n.TEXTURE_2D,Q,0,0,ue.width,ue.height,te,ue.data):t.compressedTexImage2D(n.TEXTURE_2D,Q,Re,ue.width,ue.height,0,ue.data):xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ie&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,ue.width,ue.height,te,Ne,ue.data):t.texImage2D(n.TEXTURE_2D,Q,Re,ue.width,ue.height,0,te,Ne,ue.data)}else if(x.isDataArrayTexture)if(D){if(ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,re,Re,K.width,K.height,K.depth),ie)if(x.layerUpdates.size>0){let Q=Hg(K.width,K.height,x.format,x.type);for(let X of x.layerUpdates){let he=K.data.subarray(X*Q/K.data.BYTES_PER_ELEMENT,(X+1)*Q/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,X,K.width,K.height,1,te,Ne,he)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,te,Ne,K.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,K.width,K.height,K.depth,0,te,Ne,K.data);else if(x.isData3DTexture)D?(ce&&t.texStorage3D(n.TEXTURE_3D,re,Re,K.width,K.height,K.depth),ie&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,te,Ne,K.data)):t.texImage3D(n.TEXTURE_3D,0,Re,K.width,K.height,K.depth,0,te,Ne,K.data);else if(x.isFramebufferTexture){if(ce)if(D)t.texStorage2D(n.TEXTURE_2D,re,Re,K.width,K.height);else{let Q=K.width,X=K.height;for(let he=0;he<re;he++)t.texImage2D(n.TEXTURE_2D,he,Re,Q,X,0,te,Ne,null),Q>>=1,X>>=1}}else if(Le.length>0){if(D&&ce){let Q=Ue(Le[0]);t.texStorage2D(n.TEXTURE_2D,re,Re,Q.width,Q.height)}for(let Q=0,X=Le.length;Q<X;Q++)ue=Le[Q],D?ie&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,te,Ne,ue):t.texImage2D(n.TEXTURE_2D,Q,Re,te,Ne,ue);x.generateMipmaps=!1}else if(D){if(ce){let Q=Ue(K);t.texStorage2D(n.TEXTURE_2D,re,Re,Q.width,Q.height)}ie&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,te,Ne,K)}else t.texImage2D(n.TEXTURE_2D,0,Re,te,Ne,K);g(x)&&p(W),ve.__version=H.version,x.onUpdate&&x.onUpdate(x)}S.__version=x.version}function Z(S,x,F){if(x.image.length!==6)return;let W=lt(S,x),Y=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+F);let H=i.get(Y);if(Y.version!==H.__version||W===!0){t.activeTexture(n.TEXTURE0+F);let ve=Je.getPrimaries(Je.workingColorSpace),ae=x.colorSpace===rr?null:Je.getPrimaries(x.colorSpace),Ae=x.colorSpace===rr||ve===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let ye=x.isCompressedTexture||x.image[0].isCompressedTexture,K=x.image[0]&&x.image[0].isDataTexture,te=[];for(let X=0;X<6;X++)!ye&&!K?te[X]=y(x.image[X],!0,r.maxCubemapSize):te[X]=K?x.image[X].image:x.image[X],te[X]=Me(x,te[X]);let Ne=te[0],Re=s.convert(x.format,x.colorSpace),ue=s.convert(x.type),Le=E(x.internalFormat,Re,ue,x.colorSpace),D=x.isVideoTexture!==!0,ce=H.__version===void 0||W===!0,ie=Y.dataReady,re=I(x,Ne);Qe(n.TEXTURE_CUBE_MAP,x);let Q;if(ye){D&&ce&&t.texStorage2D(n.TEXTURE_CUBE_MAP,re,Le,Ne.width,Ne.height);for(let X=0;X<6;X++){Q=te[X].mipmaps;for(let he=0;he<Q.length;he++){let Oe=Q[he];x.format!==kn?Re!==null?D?ie&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,he,0,0,Oe.width,Oe.height,Re,Oe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,he,Le,Oe.width,Oe.height,0,Oe.data):xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,he,0,0,Oe.width,Oe.height,Re,ue,Oe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,he,Le,Oe.width,Oe.height,0,Re,ue,Oe.data)}}}else{if(Q=x.mipmaps,D&&ce){Q.length>0&&re++;let X=Ue(te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,re,Le,X.width,X.height)}for(let X=0;X<6;X++)if(K){D?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,te[X].width,te[X].height,Re,ue,te[X].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Le,te[X].width,te[X].height,0,Re,ue,te[X].data);for(let he=0;he<Q.length;he++){let _t=Q[he].image[X].image;D?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,he+1,0,0,_t.width,_t.height,Re,ue,_t.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,he+1,Le,_t.width,_t.height,0,Re,ue,_t.data)}}else{D?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,Re,ue,te[X]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Le,Re,ue,te[X]);for(let he=0;he<Q.length;he++){let Oe=Q[he];D?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,he+1,0,0,Re,ue,Oe.image[X]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,he+1,Le,Re,ue,Oe.image[X])}}}g(x)&&p(n.TEXTURE_CUBE_MAP),H.__version=Y.version,x.onUpdate&&x.onUpdate(x)}S.__version=x.version}function fe(S,x,F,W,Y,H){let ve=s.convert(F.format,F.colorSpace),ae=s.convert(F.type),Ae=E(F.internalFormat,ve,ae,F.colorSpace),ye=i.get(x),K=i.get(F);if(K.__renderTarget=x,!ye.__hasExternalTextures){let te=Math.max(1,x.width>>H),Ne=Math.max(1,x.height>>H);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,H,Ae,te,Ne,x.depth,0,ve,ae,null):t.texImage2D(Y,H,Ae,te,Ne,0,ve,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,S),me(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,Y,K.__webglTexture,0,xt(x)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,Y,K.__webglTexture,H),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ve(S,x,F){if(n.bindRenderbuffer(n.RENDERBUFFER,S),x.depthBuffer){let W=x.depthTexture,Y=W&&W.isDepthTexture?W.type:null,H=T(x.stencilBuffer,Y),ve=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=xt(x);me(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae,H,x.width,x.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae,H,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,H,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ve,n.RENDERBUFFER,S)}else{let W=x.textures;for(let Y=0;Y<W.length;Y++){let H=W[Y],ve=s.convert(H.format,H.colorSpace),ae=s.convert(H.type),Ae=E(H.internalFormat,ve,ae,H.colorSpace),ye=xt(x);F&&me(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,Ae,x.width,x.height):me(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ye,Ae,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Ae,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function _e(S,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,S),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=i.get(x.depthTexture);W.__renderTarget=x,(!W.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G(x.depthTexture,0);let Y=W.__webglTexture,H=xt(x);if(x.depthTexture.format===Eo)me(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Y,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Y,0);else if(x.depthTexture.format===Vo)me(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Y,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function Xe(S){let x=i.get(S),F=S.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==S.depthTexture){let W=S.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),W){let Y=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,W.removeEventListener("dispose",Y)};W.addEventListener("dispose",Y),x.__depthDisposeCallback=Y}x.__boundDepthTexture=W}if(S.depthTexture&&!x.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");let W=S.texture.mipmaps;W&&W.length>0?_e(x.__webglFramebuffer[0],S):_e(x.__webglFramebuffer,S)}else if(F){x.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[W]),x.__webglDepthbuffer[W]===void 0)x.__webglDepthbuffer[W]=n.createRenderbuffer(),Ve(x.__webglDepthbuffer[W],S,!1);else{let Y=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=x.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,H)}}else{let W=S.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Ve(x.__webglDepthbuffer,S,!1);else{let Y=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,H)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function qt(S,x,F){let W=i.get(S);x!==void 0&&fe(W.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Xe(S)}function $e(S){let x=S.texture,F=i.get(S),W=i.get(x);S.addEventListener("dispose",R);let Y=S.textures,H=S.isWebGLCubeRenderTarget===!0,ve=Y.length>1;if(ve||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=x.version,o.memory.textures++),H){F.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[ae]=[];for(let Ae=0;Ae<x.mipmaps.length;Ae++)F.__webglFramebuffer[ae][Ae]=n.createFramebuffer()}else F.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let ae=0;ae<x.mipmaps.length;ae++)F.__webglFramebuffer[ae]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(ve)for(let ae=0,Ae=Y.length;ae<Ae;ae++){let ye=i.get(Y[ae]);ye.__webglTexture===void 0&&(ye.__webglTexture=n.createTexture(),o.memory.textures++)}if(S.samples>0&&me(S)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ae=0;ae<Y.length;ae++){let Ae=Y[ae];F.__webglColorRenderbuffer[ae]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[ae]);let ye=s.convert(Ae.format,Ae.colorSpace),K=s.convert(Ae.type),te=E(Ae.internalFormat,ye,K,Ae.colorSpace,S.isXRRenderTarget===!0),Ne=xt(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,te,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,F.__webglColorRenderbuffer[ae])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),Ve(F.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(H){t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Qe(n.TEXTURE_CUBE_MAP,x);for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0)for(let Ae=0;Ae<x.mipmaps.length;Ae++)fe(F.__webglFramebuffer[ae][Ae],S,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ae);else fe(F.__webglFramebuffer[ae],S,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);g(x)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let ae=0,Ae=Y.length;ae<Ae;ae++){let ye=Y[ae],K=i.get(ye),te=n.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(te=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(te,K.__webglTexture),Qe(te,ye),fe(F.__webglFramebuffer,S,ye,n.COLOR_ATTACHMENT0+ae,te,0),g(ye)&&p(te)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(ae=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,W.__webglTexture),Qe(ae,x),x.mipmaps&&x.mipmaps.length>0)for(let Ae=0;Ae<x.mipmaps.length;Ae++)fe(F.__webglFramebuffer[Ae],S,x,n.COLOR_ATTACHMENT0,ae,Ae);else fe(F.__webglFramebuffer,S,x,n.COLOR_ATTACHMENT0,ae,0);g(x)&&p(ae),t.unbindTexture()}S.depthBuffer&&Xe(S)}function Et(S){let x=S.textures;for(let F=0,W=x.length;F<W;F++){let Y=x[F];if(g(Y)){let H=M(S),ve=i.get(Y).__webglTexture;t.bindTexture(H,ve),p(H),t.unbindTexture()}}}let C=[],Ye=[];function Ze(S){if(S.samples>0){if(me(S)===!1){let x=S.textures,F=S.width,W=S.height,Y=n.COLOR_BUFFER_BIT,H=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=i.get(S),ae=x.length>1;if(ae)for(let ye=0;ye<x.length;ye++)t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);let Ae=S.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let ye=0;ye<x.length;ye++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),ae){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ve.__webglColorRenderbuffer[ye]);let K=i.get(x[ye]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,K,0)}n.blitFramebuffer(0,0,F,W,0,0,F,W,Y,n.NEAREST),c===!0&&(C.length=0,Ye.length=0,C.push(n.COLOR_ATTACHMENT0+ye),S.depthBuffer&&S.resolveDepthBuffer===!1&&(C.push(H),Ye.push(H),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ye)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,C))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ae)for(let ye=0;ye<x.length;ye++){t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,ve.__webglColorRenderbuffer[ye]);let K=i.get(x[ye]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ve.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,K,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&c){let x=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function xt(S){return Math.min(r.maxSamples,S.samples)}function me(S){let x=i.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function St(S){let x=o.render.frame;u.get(S)!==x&&(u.set(S,x),S.update())}function Me(S,x){let F=S.colorSpace,W=S.format,Y=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||F!==Zt&&F!==rr&&(Je.getTransfer(F)===ct?(W!==kn||Y!==fi)&&xe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):We("WebGLTextures: Unsupported texture color space:",F)),x}function Ue(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(l.width=S.naturalWidth||S.width,l.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(l.width=S.displayWidth,l.height=S.displayHeight):(l.width=S.width,l.height=S.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=k,this.setTexture2D=G,this.setTexture2DArray=q,this.setTexture3D=J,this.setTextureCube=z,this.rebindTextures=qt,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=Ze,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=me}function ZO(n,e){function t(i,r=rr){let s,o=Je.getTransfer(r);if(i===fi)return n.UNSIGNED_BYTE;if(i===kd)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ud)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ig)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Cg)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===wg)return n.BYTE;if(i===Ag)return n.SHORT;if(i===Uo)return n.UNSIGNED_SHORT;if(i===Fd)return n.INT;if(i===Pr)return n.UNSIGNED_INT;if(i===Xn)return n.FLOAT;if(i===Ts)return n.HALF_FLOAT;if(i===Rg)return n.ALPHA;if(i===Dg)return n.RGB;if(i===kn)return n.RGBA;if(i===Eo)return n.DEPTH_COMPONENT;if(i===Vo)return n.DEPTH_STENCIL;if(i===Bd)return n.RED;if(i===Vd)return n.RED_INTEGER;if(i===Hd)return n.RG;if(i===zd)return n.RG_INTEGER;if(i===Gd)return n.RGBA_INTEGER;if(i===Ic||i===Cc||i===Rc||i===Dc)if(o===ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ic)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Cc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Rc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Dc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ic)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Cc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Rc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Dc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===jd||i===Wd||i===$d||i===qd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===jd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Wd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$d)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===qd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Xd||i===Yd||i===Zd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Xd||i===Yd)return o===ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Zd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Kd||i===Jd||i===Qd||i===ef||i===tf||i===nf||i===rf||i===sf||i===of||i===af||i===cf||i===lf||i===uf||i===df)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Kd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Jd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Qd)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ef)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===tf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===nf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===rf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===sf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===of)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===af)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===cf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===lf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===uf)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===df)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ff||i===hf||i===pf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ff)return o===ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===hf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===pf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===mf||i===gf||i===yf||i===xf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===mf)return s.COMPRESSED_RED_RGTC1_EXT;if(i===gf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===yf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===xf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Bo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var KO=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,JO=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Qg=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new pc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new $n({vertexShader:KO,fragmentShader:JO,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new vt(new gc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},e0=class extends ui{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,m=null,y=typeof XRWebGLBinding<"u",g=new Qg,p={},M=t.getContextAttributes(),E=null,T=null,I=[],w=[],R=new Te,O=null,b=new Ut;b.viewport=new it;let _=new Ut;_.viewport=new it;let N=[b,_],k=new Ed,V=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Z=I[$];return Z===void 0&&(Z=new Ao,I[$]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function($){let Z=I[$];return Z===void 0&&(Z=new Ao,I[$]=Z),Z.getGripSpace()},this.getHand=function($){let Z=I[$];return Z===void 0&&(Z=new Ao,I[$]=Z),Z.getHandSpace()};function G($){let Z=w.indexOf($.inputSource);if(Z===-1)return;let fe=I[Z];fe!==void 0&&(fe.update($.inputSource,$.frame,l||o),fe.dispatchEvent({type:$.type,data:$.inputSource}))}function q(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",J);for(let $=0;$<I.length;$++){let Z=w[$];Z!==null&&(w[$]=null,I[$].disconnect(Z))}V=null,j=null,g.reset();for(let $ in p)delete p[$];e.setRenderTarget(E),h=null,f=null,d=null,r=null,T=null,yt.stop(),i.isPresenting=!1,e.setPixelRatio(O),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&xe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&xe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",q),r.addEventListener("inputsourceschange",J),M.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(R),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,Ve=null,_e=null;M.depth&&(_e=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=M.stencil?Vo:Eo,Ve=M.stencil?Bo:Pr);let Xe={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Xe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),T=new wi(f.textureWidth,f.textureHeight,{format:kn,type:fi,depthTexture:new hc(f.textureWidth,f.textureHeight,Ve,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let fe={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,fe),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),T=new wi(h.framebufferWidth,h.framebufferHeight,{format:kn,type:fi,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),yt.setContext(r),yt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function J($){for(let Z=0;Z<$.removed.length;Z++){let fe=$.removed[Z],Ve=w.indexOf(fe);Ve>=0&&(w[Ve]=null,I[Ve].disconnect(fe))}for(let Z=0;Z<$.added.length;Z++){let fe=$.added[Z],Ve=w.indexOf(fe);if(Ve===-1){for(let Xe=0;Xe<I.length;Xe++)if(Xe>=w.length){w.push(fe),Ve=Xe;break}else if(w[Xe]===null){w[Xe]=fe,Ve=Xe;break}if(Ve===-1)break}let _e=I[Ve];_e&&_e.connect(fe)}}let z=new A,ne=new A;function se($,Z,fe){z.setFromMatrixPosition(Z.matrixWorld),ne.setFromMatrixPosition(fe.matrixWorld);let Ve=z.distanceTo(ne),_e=Z.projectionMatrix.elements,Xe=fe.projectionMatrix.elements,qt=_e[14]/(_e[10]-1),$e=_e[14]/(_e[10]+1),Et=(_e[9]+1)/_e[5],C=(_e[9]-1)/_e[5],Ye=(_e[8]-1)/_e[0],Ze=(Xe[8]+1)/Xe[0],xt=qt*Ye,me=qt*Ze,St=Ve/(-Ye+Ze),Me=St*-Ye;if(Z.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Me),$.translateZ(St),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),_e[10]===-1)$.projectionMatrix.copy(Z.projectionMatrix),$.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let Ue=qt+St,S=$e+St,x=xt-Me,F=me+(Ve-Me),W=Et*$e/S*Ue,Y=C*$e/S*Ue;$.projectionMatrix.makePerspective(x,F,W,Y,Ue,S),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function we($,Z){Z===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Z.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let Z=$.near,fe=$.far;g.texture!==null&&(g.depthNear>0&&(Z=g.depthNear),g.depthFar>0&&(fe=g.depthFar)),k.near=_.near=b.near=Z,k.far=_.far=b.far=fe,(V!==k.near||j!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),V=k.near,j=k.far),k.layers.mask=$.layers.mask|6,b.layers.mask=k.layers.mask&3,_.layers.mask=k.layers.mask&5;let Ve=$.parent,_e=k.cameras;we(k,Ve);for(let Xe=0;Xe<_e.length;Xe++)we(_e[Xe],Ve);_e.length===2?se(k,b,_):k.projectionMatrix.copy(b.projectionMatrix),Qe($,k,Ve)};function Qe($,Z,fe){fe===null?$.matrix.copy(Z.matrixWorld):($.matrix.copy(fe.matrixWorld),$.matrix.invert(),$.matrix.multiply(Z.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Z.projectionMatrix),$.projectionMatrixInverse.copy(Z.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ys*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function($){c=$,f!==null&&(f.fixedFoveation=$),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function($){return p[$]};let lt=null;function gt($,Z){if(u=Z.getViewerPose(l||o),m=Z,u!==null){let fe=u.views;h!==null&&(e.setRenderTargetFramebuffer(T,h.framebuffer),e.setRenderTarget(T));let Ve=!1;fe.length!==k.cameras.length&&(k.cameras.length=0,Ve=!0);for(let $e=0;$e<fe.length;$e++){let Et=fe[$e],C=null;if(h!==null)C=h.getViewport(Et);else{let Ze=d.getViewSubImage(f,Et);C=Ze.viewport,$e===0&&(e.setRenderTargetTextures(T,Ze.colorTexture,Ze.depthStencilTexture),e.setRenderTarget(T))}let Ye=N[$e];Ye===void 0&&(Ye=new Ut,Ye.layers.enable($e),Ye.viewport=new it,N[$e]=Ye),Ye.matrix.fromArray(Et.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(Et.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(C.x,C.y,C.width,C.height),$e===0&&(k.matrix.copy(Ye.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Ve===!0&&k.cameras.push(Ye)}let _e=r.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=i.getBinding();let $e=d.getDepthInformation(fe[0]);$e&&$e.isValid&&$e.texture&&g.init($e,r.renderState)}if(_e&&_e.includes("camera-access")&&y){e.state.unbindTexture(),d=i.getBinding();for(let $e=0;$e<fe.length;$e++){let Et=fe[$e].camera;if(Et){let C=p[Et];C||(C=new pc,p[Et]=C);let Ye=d.getCameraImage(Et);C.sourceTexture=Ye}}}}for(let fe=0;fe<I.length;fe++){let Ve=w[fe],_e=I[fe];Ve!==null&&_e!==void 0&&_e.update(Ve,Z,l||o)}lt&&lt($,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),m=null}let yt=new rS;yt.setAnimationLoop(gt),this.setAnimationLoop=function($){lt=$},this.dispose=function(){}}},Cs=new wr,QO=new ke;function e3(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Ug(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,M,E,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),d(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p)):p.isMeshStandardMaterial?(s(g,p),f(g,p),p.isMeshPhysicalMaterial&&h(g,p,T)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),y(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,M,E):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Kt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Kt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let M=e.get(p),E=M.envMap,T=M.envMapRotation;E&&(g.envMap.value=E,Cs.copy(T),Cs.x*=-1,Cs.y*=-1,Cs.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Cs.y*=-1,Cs.z*=-1),g.envMapRotation.value.setFromMatrix4(QO.makeRotationFromEuler(Cs)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,M,E){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=E*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function h(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Kt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let M=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function t3(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,E){let T=E.program;i.uniformBlockBinding(M,T)}function l(M,E){let T=r[M.id];T===void 0&&(m(M),T=u(M),r[M.id]=T,M.addEventListener("dispose",g));let I=E.program;i.updateUBOMapping(M,I);let w=e.render.frame;s[M.id]!==w&&(f(M),s[M.id]=w)}function u(M){let E=d();M.__bindingPointIndex=E;let T=n.createBuffer(),I=M.__size,w=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,I,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,T),T}function d(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return We("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){let E=r[M.id],T=M.uniforms,I=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let w=0,R=T.length;w<R;w++){let O=Array.isArray(T[w])?T[w]:[T[w]];for(let b=0,_=O.length;b<_;b++){let N=O[b];if(h(N,w,b,I)===!0){let k=N.__offset,V=Array.isArray(N.value)?N.value:[N.value],j=0;for(let G=0;G<V.length;G++){let q=V[G],J=y(q);typeof q=="number"||typeof q=="boolean"?(N.__data[0]=q,n.bufferSubData(n.UNIFORM_BUFFER,k+j,N.__data)):q.isMatrix3?(N.__data[0]=q.elements[0],N.__data[1]=q.elements[1],N.__data[2]=q.elements[2],N.__data[3]=0,N.__data[4]=q.elements[3],N.__data[5]=q.elements[4],N.__data[6]=q.elements[5],N.__data[7]=0,N.__data[8]=q.elements[6],N.__data[9]=q.elements[7],N.__data[10]=q.elements[8],N.__data[11]=0):(q.toArray(N.__data,j),j+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,N.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(M,E,T,I){let w=M.value,R=E+"_"+T;if(I[R]===void 0)return typeof w=="number"||typeof w=="boolean"?I[R]=w:I[R]=w.clone(),!0;{let O=I[R];if(typeof w=="number"||typeof w=="boolean"){if(O!==w)return I[R]=w,!0}else if(O.equals(w)===!1)return O.copy(w),!0}return!1}function m(M){let E=M.uniforms,T=0,I=16;for(let R=0,O=E.length;R<O;R++){let b=Array.isArray(E[R])?E[R]:[E[R]];for(let _=0,N=b.length;_<N;_++){let k=b[_],V=Array.isArray(k.value)?k.value:[k.value];for(let j=0,G=V.length;j<G;j++){let q=V[j],J=y(q),z=T%I,ne=z%J.boundary,se=z+ne;T+=ne,se!==0&&I-se<J.storage&&(T+=I-se),k.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=T,T+=J.storage}}}let w=T%I;return w>0&&(T+=I-w),M.__size=T,M.__cache={},this}function y(M){let E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?xe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):xe("WebGLRenderer: Unsupported uniform value type.",M),E}function g(M){let E=M.target;E.removeEventListener("dispose",g);let T=o.indexOf(E.__bindingPointIndex);o.splice(T,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function p(){for(let M in r)n.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}var n3=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]),sr=null;function i3(){return sr===null&&(sr=new Do(n3,32,32,Hd,Ts),sr.minFilter=Yt,sr.magFilter=Yt,sr.wrapS=Wn,sr.wrapT=Wn,sr.generateMipmaps=!1,sr.needsUpdate=!0),sr}var Mf=class{constructor(e={}){let{canvas:t=RM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;let m=new Set([Gd,zd,Vd]),y=new Set([fi,Pr,Uo,Bo,kd,Ud]),g=new Uint32Array(4),p=new Int32Array(4),M=null,E=null,T=[],I=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ir,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let w=this,R=!1;this._outputColorSpace=zt;let O=0,b=0,_=null,N=-1,k=null,V=new it,j=new it,G=null,q=new Ce(0),J=0,z=t.width,ne=t.height,se=1,we=null,Qe=null,lt=new it(0,0,z,ne),gt=new it(0,0,z,ne),yt=!1,$=new No,Z=!1,fe=!1,Ve=new ke,_e=new A,Xe=new it,qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},$e=!1;function Et(){return _===null?se:1}let C=i;function Ye(v,P){return t.getContext(v,P)}try{let v={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"181"}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",X,!1),t.addEventListener("webglcontextcreationerror",he,!1),C===null){let P="webgl2";if(C=Ye(P,v),C===null)throw Ye(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw v("WebGLRenderer: "+v.message),v}let Ze,xt,me,St,Me,Ue,S,x,F,W,Y,H,ve,ae,Ae,ye,K,te,Ne,Re,ue,Le,D,ce;function ie(){Ze=new vL(C),Ze.init(),Le=new ZO(C,Ze),xt=new uL(C,Ze,e,Le),me=new XO(C,Ze),xt.reversedDepthBuffer&&f&&me.buffers.depth.setReversed(!0),St=new EL(C),Me=new OO,Ue=new YO(C,Ze,me,Me,xt,Le,St),S=new fL(w),x=new xL(w),F=new w1(C),D=new cL(C,F),W=new _L(C,F,St,D),Y=new SL(C,W,F,St),Ne=new ML(C,xt,Ue),ye=new dL(Me),H=new LO(w,S,x,Ze,xt,D,ye),ve=new e3(w,Me),ae=new kO,Ae=new GO(Ze),te=new aL(w,S,x,me,Y,h,c),K=new $O(w,Y,xt),ce=new t3(C,St,xt,me),Re=new lL(C,Ze,St),ue=new bL(C,Ze,St),St.programs=H.programs,w.capabilities=xt,w.extensions=Ze,w.properties=Me,w.renderLists=ae,w.shadowMap=K,w.state=me,w.info=St}ie();let re=new e0(w,C);this.xr=re,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let v=Ze.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Ze.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(v){v!==void 0&&(se=v,this.setSize(z,ne,!1))},this.getSize=function(v){return v.set(z,ne)},this.setSize=function(v,P,U=!0){if(re.isPresenting){xe("WebGLRenderer: Can't change size while VR device is presenting.");return}z=v,ne=P,t.width=Math.floor(v*se),t.height=Math.floor(P*se),U===!0&&(t.style.width=v+"px",t.style.height=P+"px"),this.setViewport(0,0,v,P)},this.getDrawingBufferSize=function(v){return v.set(z*se,ne*se).floor()},this.setDrawingBufferSize=function(v,P,U){z=v,ne=P,se=U,t.width=Math.floor(v*U),t.height=Math.floor(P*U),this.setViewport(0,0,v,P)},this.getCurrentViewport=function(v){return v.copy(V)},this.getViewport=function(v){return v.copy(lt)},this.setViewport=function(v,P,U,B){v.isVector4?lt.set(v.x,v.y,v.z,v.w):lt.set(v,P,U,B),me.viewport(V.copy(lt).multiplyScalar(se).round())},this.getScissor=function(v){return v.copy(gt)},this.setScissor=function(v,P,U,B){v.isVector4?gt.set(v.x,v.y,v.z,v.w):gt.set(v,P,U,B),me.scissor(j.copy(gt).multiplyScalar(se).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(v){me.setScissorTest(yt=v)},this.setOpaqueSort=function(v){we=v},this.setTransparentSort=function(v){Qe=v},this.getClearColor=function(v){return v.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor(...arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha(...arguments)},this.clear=function(v=!0,P=!0,U=!0){let B=0;if(v){let L=!1;if(_!==null){let ee=_.texture.format;L=m.has(ee)}if(L){let ee=_.texture.type,le=y.has(ee),pe=te.getClearColor(),de=te.getClearAlpha(),De=pe.r,Pe=pe.g,be=pe.b;le?(g[0]=De,g[1]=Pe,g[2]=be,g[3]=de,C.clearBufferuiv(C.COLOR,0,g)):(p[0]=De,p[1]=Pe,p[2]=be,p[3]=de,C.clearBufferiv(C.COLOR,0,p))}else B|=C.COLOR_BUFFER_BIT}P&&(B|=C.DEPTH_BUFFER_BIT),U&&(B|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",X,!1),t.removeEventListener("webglcontextcreationerror",he,!1),te.dispose(),ae.dispose(),Ae.dispose(),Me.dispose(),S.dispose(),x.dispose(),Y.dispose(),D.dispose(),ce.dispose(),H.dispose(),re.dispose(),re.removeEventListener("sessionstart",P0),re.removeEventListener("sessionend",L0),Fr.stop()};function Q(v){v.preventDefault(),Qa("WebGLRenderer: Context Lost."),R=!0}function X(){Qa("WebGLRenderer: Context Restored."),R=!1;let v=St.autoReset,P=K.enabled,U=K.autoUpdate,B=K.needsUpdate,L=K.type;ie(),St.autoReset=v,K.enabled=P,K.autoUpdate=U,K.needsUpdate=B,K.type=L}function he(v){We("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Oe(v){let P=v.target;P.removeEventListener("dispose",Oe),_t(P)}function _t(v){ut(v),Me.remove(v)}function ut(v){let P=Me.get(v).programs;P!==void 0&&(P.forEach(function(U){H.releaseProgram(U)}),v.isShaderMaterial&&H.releaseShaderCache(v))}this.renderBufferDirect=function(v,P,U,B,L,ee){P===null&&(P=qt);let le=L.isMesh&&L.matrixWorld.determinant()<0,pe=ES(v,P,U,B,L);me.setMaterial(B,le);let de=U.index,De=1;if(B.wireframe===!0){if(de=W.getWireframeAttribute(U),de===void 0)return;De=2}let Pe=U.drawRange,be=U.attributes.position,Ke=Pe.start*De,dt=(Pe.start+Pe.count)*De;ee!==null&&(Ke=Math.max(Ke,ee.start*De),dt=Math.min(dt,(ee.start+ee.count)*De)),de!==null?(Ke=Math.max(Ke,0),dt=Math.min(dt,de.count)):be!=null&&(Ke=Math.max(Ke,0),dt=Math.min(dt,be.count));let It=dt-Ke;if(It<0||It===1/0)return;D.setup(L,B,pe,U,de);let Ct,mt=Re;if(de!==null&&(Ct=F.get(de),mt=ue,mt.setIndex(Ct)),L.isMesh)B.wireframe===!0?(me.setLineWidth(B.wireframeLinewidth*Et()),mt.setMode(C.LINES)):mt.setMode(C.TRIANGLES);else if(L.isLine){let Ie=B.linewidth;Ie===void 0&&(Ie=1),me.setLineWidth(Ie*Et()),L.isLineSegments?mt.setMode(C.LINES):L.isLineLoop?mt.setMode(C.LINE_LOOP):mt.setMode(C.LINE_STRIP)}else L.isPoints?mt.setMode(C.POINTS):L.isSprite&&mt.setMode(C.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)To("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),mt.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(Ze.get("WEBGL_multi_draw"))mt.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{let Ie=L._multiDrawStarts,Tt=L._multiDrawCounts,nt=L._multiDrawCount,En=de?F.get(de).bytesPerElement:1,Ps=Me.get(B).currentProgram.getUniforms();for(let Mn=0;Mn<nt;Mn++)Ps.setValue(C,"_gl_DrawID",Mn),mt.render(Ie[Mn]/En,Tt[Mn])}else if(L.isInstancedMesh)mt.renderInstances(Ke,It,L.count);else if(U.isInstancedBufferGeometry){let Ie=U._maxInstanceCount!==void 0?U._maxInstanceCount:1/0,Tt=Math.min(U.instanceCount,Ie);mt.renderInstances(Ke,It,Tt)}else mt.render(Ke,It)};function hi(v,P,U){v.transparent===!0&&v.side===qn&&v.forceSinglePass===!1?(v.side=Kt,v.needsUpdate=!0,Uc(v,P,U),v.side=li,v.needsUpdate=!0,Uc(v,P,U),v.side=qn):Uc(v,P,U)}this.compile=function(v,P,U=null){U===null&&(U=v),E=Ae.get(U),E.init(P),I.push(E),U.traverseVisible(function(L){L.isLight&&L.layers.test(P.layers)&&(E.pushLight(L),L.castShadow&&E.pushShadow(L))}),v!==U&&v.traverseVisible(function(L){L.isLight&&L.layers.test(P.layers)&&(E.pushLight(L),L.castShadow&&E.pushShadow(L))}),E.setupLights();let B=new Set;return v.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;let ee=L.material;if(ee)if(Array.isArray(ee))for(let le=0;le<ee.length;le++){let pe=ee[le];hi(pe,U,L),B.add(pe)}else hi(ee,U,L),B.add(ee)}),E=I.pop(),B},this.compileAsync=function(v,P,U=null){let B=this.compile(v,P,U);return new Promise(L=>{function ee(){if(B.forEach(function(le){Me.get(le).currentProgram.isReady()&&B.delete(le)}),B.size===0){L(v);return}setTimeout(ee,10)}Ze.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let Zn=null;function bS(v){Zn&&Zn(v)}function P0(){Fr.stop()}function L0(){Fr.start()}let Fr=new rS;Fr.setAnimationLoop(bS),typeof self<"u"&&Fr.setContext(self),this.setAnimationLoop=function(v){Zn=v,re.setAnimationLoop(v),v===null?Fr.stop():Fr.start()},re.addEventListener("sessionstart",P0),re.addEventListener("sessionend",L0),this.render=function(v,P){if(P!==void 0&&P.isCamera!==!0){We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(P),P=re.getCamera()),v.isScene===!0&&v.onBeforeRender(w,v,P,_),E=Ae.get(v,I.length),E.init(P),I.push(E),Ve.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),$.setFromProjectionMatrix(Ve,ai,P.reversedDepth),fe=this.localClippingEnabled,Z=ye.init(this.clippingPlanes,fe),M=ae.get(v,T.length),M.init(),T.push(M),re.enabled===!0&&re.isPresenting===!0){let ee=w.xr.getDepthSensingMesh();ee!==null&&Pf(ee,P,-1/0,w.sortObjects)}Pf(v,P,0,w.sortObjects),M.finish(),w.sortObjects===!0&&M.sort(we,Qe),$e=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,$e&&te.addToRenderList(M,v),this.info.render.frame++,Z===!0&&ye.beginShadows();let U=E.state.shadowsArray;K.render(U,v,P),Z===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset();let B=M.opaque,L=M.transmissive;if(E.setupLights(),P.isArrayCamera){let ee=P.cameras;if(L.length>0)for(let le=0,pe=ee.length;le<pe;le++){let de=ee[le];F0(B,L,v,de)}$e&&te.render(v);for(let le=0,pe=ee.length;le<pe;le++){let de=ee[le];O0(M,v,de,de.viewport)}}else L.length>0&&F0(B,L,v,P),$e&&te.render(v),O0(M,v,P);_!==null&&b===0&&(Ue.updateMultisampleRenderTarget(_),Ue.updateRenderTargetMipmap(_)),v.isScene===!0&&v.onAfterRender(w,v,P),D.resetDefaultState(),N=-1,k=null,I.pop(),I.length>0?(E=I[I.length-1],Z===!0&&ye.setGlobalState(w.clippingPlanes,E.state.camera)):E=null,T.pop(),T.length>0?M=T[T.length-1]:M=null};function Pf(v,P,U,B){if(v.visible===!1)return;if(v.layers.test(P.layers)){if(v.isGroup)U=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(P);else if(v.isLight)E.pushLight(v),v.castShadow&&E.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||$.intersectsSprite(v)){B&&Xe.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Ve);let le=Y.update(v),pe=v.material;pe.visible&&M.push(v,le,pe,U,Xe.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||$.intersectsObject(v))){let le=Y.update(v),pe=v.material;if(B&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Xe.copy(v.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Xe.copy(le.boundingSphere.center)),Xe.applyMatrix4(v.matrixWorld).applyMatrix4(Ve)),Array.isArray(pe)){let de=le.groups;for(let De=0,Pe=de.length;De<Pe;De++){let be=de[De],Ke=pe[be.materialIndex];Ke&&Ke.visible&&M.push(v,le,Ke,U,Xe.z,be)}}else pe.visible&&M.push(v,le,pe,U,Xe.z,null)}}let ee=v.children;for(let le=0,pe=ee.length;le<pe;le++)Pf(ee[le],P,U,B)}function O0(v,P,U,B){let{opaque:L,transmissive:ee,transparent:le}=v;E.setupLightsView(U),Z===!0&&ye.setGlobalState(w.clippingPlanes,U),B&&me.viewport(V.copy(B)),L.length>0&&kc(L,P,U),ee.length>0&&kc(ee,P,U),le.length>0&&kc(le,P,U),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function F0(v,P,U,B){if((U.isScene===!0?U.overrideMaterial:null)!==null)return;E.state.transmissionRenderTarget[B.id]===void 0&&(E.state.transmissionRenderTarget[B.id]=new wi(1,1,{generateMipmaps:!0,type:Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float")?Ts:fi,minFilter:di,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));let ee=E.state.transmissionRenderTarget[B.id],le=B.viewport||V;ee.setSize(le.z*w.transmissionResolutionScale,le.w*w.transmissionResolutionScale);let pe=w.getRenderTarget(),de=w.getActiveCubeFace(),De=w.getActiveMipmapLevel();w.setRenderTarget(ee),w.getClearColor(q),J=w.getClearAlpha(),J<1&&w.setClearColor(16777215,.5),w.clear(),$e&&te.render(U);let Pe=w.toneMapping;w.toneMapping=ir;let be=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),E.setupLightsView(B),Z===!0&&ye.setGlobalState(w.clippingPlanes,B),kc(v,U,B),Ue.updateMultisampleRenderTarget(ee),Ue.updateRenderTargetMipmap(ee),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let dt=0,It=P.length;dt<It;dt++){let Ct=P[dt],{object:mt,geometry:Ie,material:Tt,group:nt}=Ct;if(Tt.side===qn&&mt.layers.test(B.layers)){let En=Tt.side;Tt.side=Kt,Tt.needsUpdate=!0,k0(mt,U,B,Ie,Tt,nt),Tt.side=En,Tt.needsUpdate=!0,Ke=!0}}Ke===!0&&(Ue.updateMultisampleRenderTarget(ee),Ue.updateRenderTargetMipmap(ee))}w.setRenderTarget(pe,de,De),w.setClearColor(q,J),be!==void 0&&(B.viewport=be),w.toneMapping=Pe}function kc(v,P,U){let B=P.isScene===!0?P.overrideMaterial:null;for(let L=0,ee=v.length;L<ee;L++){let le=v[L],{object:pe,geometry:de,group:De}=le,Pe=le.material;Pe.allowOverride===!0&&B!==null&&(Pe=B),pe.layers.test(U.layers)&&k0(pe,P,U,de,Pe,De)}}function k0(v,P,U,B,L,ee){v.onBeforeRender(w,P,U,B,L,ee),v.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),L.onBeforeRender(w,P,U,B,v,ee),L.transparent===!0&&L.side===qn&&L.forceSinglePass===!1?(L.side=Kt,L.needsUpdate=!0,w.renderBufferDirect(U,P,B,L,v,ee),L.side=li,L.needsUpdate=!0,w.renderBufferDirect(U,P,B,L,v,ee),L.side=qn):w.renderBufferDirect(U,P,B,L,v,ee),v.onAfterRender(w,P,U,B,L,ee)}function Uc(v,P,U){P.isScene!==!0&&(P=qt);let B=Me.get(v),L=E.state.lights,ee=E.state.shadowsArray,le=L.state.version,pe=H.getParameters(v,L.state,ee,P,U),de=H.getProgramCacheKey(pe),De=B.programs;B.environment=v.isMeshStandardMaterial?P.environment:null,B.fog=P.fog,B.envMap=(v.isMeshStandardMaterial?x:S).get(v.envMap||B.environment),B.envMapRotation=B.environment!==null&&v.envMap===null?P.environmentRotation:v.envMapRotation,De===void 0&&(v.addEventListener("dispose",Oe),De=new Map,B.programs=De);let Pe=De.get(de);if(Pe!==void 0){if(B.currentProgram===Pe&&B.lightsStateVersion===le)return B0(v,pe),Pe}else pe.uniforms=H.getUniforms(v),v.onBeforeCompile(pe,w),Pe=H.acquireProgram(pe,de),De.set(de,Pe),B.uniforms=pe.uniforms;let be=B.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(be.clippingPlanes=ye.uniform),B0(v,pe),B.needsLights=SS(v),B.lightsStateVersion=le,B.needsLights&&(be.ambientLightColor.value=L.state.ambient,be.lightProbe.value=L.state.probe,be.directionalLights.value=L.state.directional,be.directionalLightShadows.value=L.state.directionalShadow,be.spotLights.value=L.state.spot,be.spotLightShadows.value=L.state.spotShadow,be.rectAreaLights.value=L.state.rectArea,be.ltc_1.value=L.state.rectAreaLTC1,be.ltc_2.value=L.state.rectAreaLTC2,be.pointLights.value=L.state.point,be.pointLightShadows.value=L.state.pointShadow,be.hemisphereLights.value=L.state.hemi,be.directionalShadowMap.value=L.state.directionalShadowMap,be.directionalShadowMatrix.value=L.state.directionalShadowMatrix,be.spotShadowMap.value=L.state.spotShadowMap,be.spotLightMatrix.value=L.state.spotLightMatrix,be.spotLightMap.value=L.state.spotLightMap,be.pointShadowMap.value=L.state.pointShadowMap,be.pointShadowMatrix.value=L.state.pointShadowMatrix),B.currentProgram=Pe,B.uniformsList=null,Pe}function U0(v){if(v.uniformsList===null){let P=v.currentProgram.getUniforms();v.uniformsList=Go.seqWithValue(P.seq,v.uniforms)}return v.uniformsList}function B0(v,P){let U=Me.get(v);U.outputColorSpace=P.outputColorSpace,U.batching=P.batching,U.batchingColor=P.batchingColor,U.instancing=P.instancing,U.instancingColor=P.instancingColor,U.instancingMorph=P.instancingMorph,U.skinning=P.skinning,U.morphTargets=P.morphTargets,U.morphNormals=P.morphNormals,U.morphColors=P.morphColors,U.morphTargetsCount=P.morphTargetsCount,U.numClippingPlanes=P.numClippingPlanes,U.numIntersection=P.numClipIntersection,U.vertexAlphas=P.vertexAlphas,U.vertexTangents=P.vertexTangents,U.toneMapping=P.toneMapping}function ES(v,P,U,B,L){P.isScene!==!0&&(P=qt),Ue.resetTextureUnits();let ee=P.fog,le=B.isMeshStandardMaterial?P.environment:null,pe=_===null?w.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:Zt,de=(B.isMeshStandardMaterial?x:S).get(B.envMap||le),De=B.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,Pe=!!U.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),be=!!U.morphAttributes.position,Ke=!!U.morphAttributes.normal,dt=!!U.morphAttributes.color,It=ir;B.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(It=w.toneMapping);let Ct=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,mt=Ct!==void 0?Ct.length:0,Ie=Me.get(B),Tt=E.state.lights;if(Z===!0&&(fe===!0||v!==k)){let cn=v===k&&B.id===N;ye.setState(B,v,cn)}let nt=!1;B.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==Tt.state.version||Ie.outputColorSpace!==pe||L.isBatchedMesh&&Ie.batching===!1||!L.isBatchedMesh&&Ie.batching===!0||L.isBatchedMesh&&Ie.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&Ie.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&Ie.instancing===!1||!L.isInstancedMesh&&Ie.instancing===!0||L.isSkinnedMesh&&Ie.skinning===!1||!L.isSkinnedMesh&&Ie.skinning===!0||L.isInstancedMesh&&Ie.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&Ie.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&Ie.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&Ie.instancingMorph===!1&&L.morphTexture!==null||Ie.envMap!==de||B.fog===!0&&Ie.fog!==ee||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==ye.numPlanes||Ie.numIntersection!==ye.numIntersection)||Ie.vertexAlphas!==De||Ie.vertexTangents!==Pe||Ie.morphTargets!==be||Ie.morphNormals!==Ke||Ie.morphColors!==dt||Ie.toneMapping!==It||Ie.morphTargetsCount!==mt)&&(nt=!0):(nt=!0,Ie.__version=B.version);let En=Ie.currentProgram;nt===!0&&(En=Uc(B,P,L));let Ps=!1,Mn=!1,qo=!1,wt=En.getUniforms(),pn=Ie.uniforms;if(me.useProgram(En.program)&&(Ps=!0,Mn=!0,qo=!0),B.id!==N&&(N=B.id,Mn=!0),Ps||k!==v){me.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),wt.setValue(C,"projectionMatrix",v.projectionMatrix),wt.setValue(C,"viewMatrix",v.matrixWorldInverse);let mn=wt.map.cameraPosition;mn!==void 0&&mn.setValue(C,_e.setFromMatrixPosition(v.matrixWorld)),xt.logarithmicDepthBuffer&&wt.setValue(C,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&wt.setValue(C,"isOrthographic",v.isOrthographicCamera===!0),k!==v&&(k=v,Mn=!0,qo=!0)}if(L.isSkinnedMesh){wt.setOptional(C,L,"bindMatrix"),wt.setOptional(C,L,"bindMatrixInverse");let cn=L.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),wt.setValue(C,"boneTexture",cn.boneTexture,Ue))}L.isBatchedMesh&&(wt.setOptional(C,L,"batchingTexture"),wt.setValue(C,"batchingTexture",L._matricesTexture,Ue),wt.setOptional(C,L,"batchingIdTexture"),wt.setValue(C,"batchingIdTexture",L._indirectTexture,Ue),wt.setOptional(C,L,"batchingColorTexture"),L._colorsTexture!==null&&wt.setValue(C,"batchingColorTexture",L._colorsTexture,Ue));let Un=U.morphAttributes;if((Un.position!==void 0||Un.normal!==void 0||Un.color!==void 0)&&Ne.update(L,U,En),(Mn||Ie.receiveShadow!==L.receiveShadow)&&(Ie.receiveShadow=L.receiveShadow,wt.setValue(C,"receiveShadow",L.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(pn.envMap.value=de,pn.flipEnvMap.value=de.isCubeTexture&&de.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&P.environment!==null&&(pn.envMapIntensity.value=P.environmentIntensity),pn.dfgLUT!==void 0&&(pn.dfgLUT.value=i3()),Mn&&(wt.setValue(C,"toneMappingExposure",w.toneMappingExposure),Ie.needsLights&&MS(pn,qo),ee&&B.fog===!0&&ve.refreshFogUniforms(pn,ee),ve.refreshMaterialUniforms(pn,B,se,ne,E.state.transmissionRenderTarget[v.id]),Go.upload(C,U0(Ie),pn,Ue)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Go.upload(C,U0(Ie),pn,Ue),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&wt.setValue(C,"center",L.center),wt.setValue(C,"modelViewMatrix",L.modelViewMatrix),wt.setValue(C,"normalMatrix",L.normalMatrix),wt.setValue(C,"modelMatrix",L.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){let cn=B.uniformsGroups;for(let mn=0,Lf=cn.length;mn<Lf;mn++){let kr=cn[mn];ce.update(kr,En),ce.bind(kr,En)}}return En}function MS(v,P){v.ambientLightColor.needsUpdate=P,v.lightProbe.needsUpdate=P,v.directionalLights.needsUpdate=P,v.directionalLightShadows.needsUpdate=P,v.pointLights.needsUpdate=P,v.pointLightShadows.needsUpdate=P,v.spotLights.needsUpdate=P,v.spotLightShadows.needsUpdate=P,v.rectAreaLights.needsUpdate=P,v.hemisphereLights.needsUpdate=P}function SS(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(v,P,U){let B=Me.get(v);B.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),Me.get(v.texture).__webglTexture=P,Me.get(v.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:U,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,P){let U=Me.get(v);U.__webglFramebuffer=P,U.__useDefaultFramebuffer=P===void 0};let TS=C.createFramebuffer();this.setRenderTarget=function(v,P=0,U=0){_=v,O=P,b=U;let B=!0,L=null,ee=!1,le=!1;if(v){let de=Me.get(v);if(de.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(C.FRAMEBUFFER,null),B=!1;else if(de.__webglFramebuffer===void 0)Ue.setupRenderTarget(v);else if(de.__hasExternalTextures)Ue.rebindTextures(v,Me.get(v.texture).__webglTexture,Me.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let be=v.depthTexture;if(de.__boundDepthTexture!==be){if(be!==null&&Me.has(be)&&(v.width!==be.image.width||v.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ue.setupDepthRenderbuffer(v)}}let De=v.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(le=!0);let Pe=Me.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Pe[P])?L=Pe[P][U]:L=Pe[P],ee=!0):v.samples>0&&Ue.useMultisampledRTT(v)===!1?L=Me.get(v).__webglMultisampledFramebuffer:Array.isArray(Pe)?L=Pe[U]:L=Pe,V.copy(v.viewport),j.copy(v.scissor),G=v.scissorTest}else V.copy(lt).multiplyScalar(se).floor(),j.copy(gt).multiplyScalar(se).floor(),G=yt;if(U!==0&&(L=TS),me.bindFramebuffer(C.FRAMEBUFFER,L)&&B&&me.drawBuffers(v,L),me.viewport(V),me.scissor(j),me.setScissorTest(G),ee){let de=Me.get(v.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+P,de.__webglTexture,U)}else if(le){let de=P;for(let De=0;De<v.textures.length;De++){let Pe=Me.get(v.textures[De]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+De,Pe.__webglTexture,U,de)}}else if(v!==null&&U!==0){let de=Me.get(v.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,de.__webglTexture,U)}N=-1},this.readRenderTargetPixels=function(v,P,U,B,L,ee,le,pe=0){if(!(v&&v.isWebGLRenderTarget)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let de=Me.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de){me.bindFramebuffer(C.FRAMEBUFFER,de);try{let De=v.textures[pe],Pe=De.format,be=De.type;if(!xt.textureFormatReadable(Pe)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xt.textureTypeReadable(be)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=v.width-B&&U>=0&&U<=v.height-L&&(v.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+pe),C.readPixels(P,U,B,L,Le.convert(Pe),Le.convert(be),ee))}finally{let De=_!==null?Me.get(_).__webglFramebuffer:null;me.bindFramebuffer(C.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(v,P,U,B,L,ee,le,pe=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let de=Me.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&le!==void 0&&(de=de[le]),de)if(P>=0&&P<=v.width-B&&U>=0&&U<=v.height-L){me.bindFramebuffer(C.FRAMEBUFFER,de);let De=v.textures[pe],Pe=De.format,be=De.type;if(!xt.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xt.textureTypeReadable(be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ke=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Ke),C.bufferData(C.PIXEL_PACK_BUFFER,ee.byteLength,C.STREAM_READ),v.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+pe),C.readPixels(P,U,B,L,Le.convert(Pe),Le.convert(be),0);let dt=_!==null?Me.get(_).__webglFramebuffer:null;me.bindFramebuffer(C.FRAMEBUFFER,dt);let It=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await DM(C,It,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Ke),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ee),C.deleteBuffer(Ke),C.deleteSync(It),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,P=null,U=0){let B=Math.pow(2,-U),L=Math.floor(v.image.width*B),ee=Math.floor(v.image.height*B),le=P!==null?P.x:0,pe=P!==null?P.y:0;Ue.setTexture2D(v,0),C.copyTexSubImage2D(C.TEXTURE_2D,U,0,0,le,pe,L,ee),me.unbindTexture()};let wS=C.createFramebuffer(),AS=C.createFramebuffer();this.copyTextureToTexture=function(v,P,U=null,B=null,L=0,ee=null){ee===null&&(L!==0?(To("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ee=L,L=0):ee=0);let le,pe,de,De,Pe,be,Ke,dt,It,Ct=v.isCompressedTexture?v.mipmaps[ee]:v.image;if(U!==null)le=U.max.x-U.min.x,pe=U.max.y-U.min.y,de=U.isBox3?U.max.z-U.min.z:1,De=U.min.x,Pe=U.min.y,be=U.isBox3?U.min.z:0;else{let Un=Math.pow(2,-L);le=Math.floor(Ct.width*Un),pe=Math.floor(Ct.height*Un),v.isDataArrayTexture?de=Ct.depth:v.isData3DTexture?de=Math.floor(Ct.depth*Un):de=1,De=0,Pe=0,be=0}B!==null?(Ke=B.x,dt=B.y,It=B.z):(Ke=0,dt=0,It=0);let mt=Le.convert(P.format),Ie=Le.convert(P.type),Tt;P.isData3DTexture?(Ue.setTexture3D(P,0),Tt=C.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(Ue.setTexture2DArray(P,0),Tt=C.TEXTURE_2D_ARRAY):(Ue.setTexture2D(P,0),Tt=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,P.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,P.unpackAlignment);let nt=C.getParameter(C.UNPACK_ROW_LENGTH),En=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Ps=C.getParameter(C.UNPACK_SKIP_PIXELS),Mn=C.getParameter(C.UNPACK_SKIP_ROWS),qo=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,Ct.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Ct.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,De),C.pixelStorei(C.UNPACK_SKIP_ROWS,Pe),C.pixelStorei(C.UNPACK_SKIP_IMAGES,be);let wt=v.isDataArrayTexture||v.isData3DTexture,pn=P.isDataArrayTexture||P.isData3DTexture;if(v.isDepthTexture){let Un=Me.get(v),cn=Me.get(P),mn=Me.get(Un.__renderTarget),Lf=Me.get(cn.__renderTarget);me.bindFramebuffer(C.READ_FRAMEBUFFER,mn.__webglFramebuffer),me.bindFramebuffer(C.DRAW_FRAMEBUFFER,Lf.__webglFramebuffer);for(let kr=0;kr<de;kr++)wt&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Me.get(v).__webglTexture,L,be+kr),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Me.get(P).__webglTexture,ee,It+kr)),C.blitFramebuffer(De,Pe,le,pe,Ke,dt,le,pe,C.DEPTH_BUFFER_BIT,C.NEAREST);me.bindFramebuffer(C.READ_FRAMEBUFFER,null),me.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(L!==0||v.isRenderTargetTexture||Me.has(v)){let Un=Me.get(v),cn=Me.get(P);me.bindFramebuffer(C.READ_FRAMEBUFFER,wS),me.bindFramebuffer(C.DRAW_FRAMEBUFFER,AS);for(let mn=0;mn<de;mn++)wt?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Un.__webglTexture,L,be+mn):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Un.__webglTexture,L),pn?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,cn.__webglTexture,ee,It+mn):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,cn.__webglTexture,ee),L!==0?C.blitFramebuffer(De,Pe,le,pe,Ke,dt,le,pe,C.COLOR_BUFFER_BIT,C.NEAREST):pn?C.copyTexSubImage3D(Tt,ee,Ke,dt,It+mn,De,Pe,le,pe):C.copyTexSubImage2D(Tt,ee,Ke,dt,De,Pe,le,pe);me.bindFramebuffer(C.READ_FRAMEBUFFER,null),me.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else pn?v.isDataTexture||v.isData3DTexture?C.texSubImage3D(Tt,ee,Ke,dt,It,le,pe,de,mt,Ie,Ct.data):P.isCompressedArrayTexture?C.compressedTexSubImage3D(Tt,ee,Ke,dt,It,le,pe,de,mt,Ct.data):C.texSubImage3D(Tt,ee,Ke,dt,It,le,pe,de,mt,Ie,Ct):v.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,ee,Ke,dt,le,pe,mt,Ie,Ct.data):v.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,ee,Ke,dt,Ct.width,Ct.height,mt,Ct.data):C.texSubImage2D(C.TEXTURE_2D,ee,Ke,dt,le,pe,mt,Ie,Ct);C.pixelStorei(C.UNPACK_ROW_LENGTH,nt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,En),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ps),C.pixelStorei(C.UNPACK_SKIP_ROWS,Mn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,qo),ee===0&&P.generateMipmaps&&C.generateMipmap(Tt),me.unbindTexture()},this.initRenderTarget=function(v){Me.get(v).__webglFramebuffer===void 0&&Ue.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Ue.setTextureCube(v,0):v.isData3DTexture?Ue.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Ue.setTexture2DArray(v,0):Ue.setTexture2D(v,0),me.unbindTexture()},this.resetState=function(){O=0,b=0,_=null,me.reset(),D.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}};var lS={type:"change"},n0={type:"start"},dS={type:"end"},wf=new Zi,uS=new jn,s3=Math.cos(70*Pc.DEG2RAD),Wt=new A,bn=2*Math.PI,pt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},t0=1e-6,Af=class extends Tc{constructor(e,t=null){super(e,t),this.state=pt.NONE,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Dr.ROTATE,MIDDLE:Dr.DOLLY,RIGHT:Dr.PAN},this.touches={ONE:Nr.ROTATE,TWO:Nr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new Bt,this._lastTargetPosition=new A,this._quat=new Bt().setFromUnitVectors(e.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Fo,this._sphericalDelta=new Fo,this._scale=1,this._panOffset=new A,this._rotateStart=new Te,this._rotateEnd=new Te,this._rotateDelta=new Te,this._panStart=new Te,this._panEnd=new Te,this._panDelta=new Te,this._dollyStart=new Te,this._dollyEnd=new Te,this._dollyDelta=new Te,this._dollyDirection=new A,this._mouse=new Te,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=a3.bind(this),this._onPointerDown=o3.bind(this),this._onPointerUp=c3.bind(this),this._onContextMenu=m3.bind(this),this._onMouseWheel=d3.bind(this),this._onKeyDown=f3.bind(this),this._onTouchStart=h3.bind(this),this._onTouchMove=p3.bind(this),this._onMouseDown=l3.bind(this),this._onMouseMove=u3.bind(this),this._interceptControlDown=g3.bind(this),this._interceptControlUp=y3.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(lS),this.update(),this.state=pt.NONE}update(e=null){let t=this.object.position;Wt.copy(t).sub(this.target),Wt.applyQuaternion(this._quat),this._spherical.setFromVector3(Wt),this.autoRotate&&this.state===pt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=bn:i>Math.PI&&(i-=bn),r<-Math.PI?r+=bn:r>Math.PI&&(r-=bn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Wt.setFromSpherical(this._spherical),Wt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Wt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Wt.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){let a=new A(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;let l=new A(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Wt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(wf.origin.copy(this.object.position),wf.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(wf.direction))<s3?this.object.lookAt(this.target):(uS.setFromNormalAndCoplanarPoint(this.object.up,this.target),wf.intersectPlane(uS,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>t0||8*(1-this._lastQuaternion.dot(this.object.quaternion))>t0||this._lastTargetPosition.distanceToSquared(this.target)>t0?(this.dispatchEvent(lS),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?bn/60*this.autoRotateSpeed*e:bn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Wt.setFromMatrixColumn(t,0),Wt.multiplyScalar(-e),this._panOffset.add(Wt)}_panUp(e,t){this.screenSpacePanning===!0?Wt.setFromMatrixColumn(t,1):(Wt.setFromMatrixColumn(t,0),Wt.crossVectors(this.object.up,Wt)),Wt.multiplyScalar(e),this._panOffset.add(Wt)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Wt.copy(r).sub(this.target);let s=Wt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Te,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function o3(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function a3(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function c3(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(dS),this.state=pt.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function l3(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Dr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=pt.DOLLY;break;case Dr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pt.ROTATE}break;case Dr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=pt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=pt.PAN}break;default:this.state=pt.NONE}this.state!==pt.NONE&&this.dispatchEvent(n0)}function u3(n){switch(this.state){case pt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case pt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case pt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function d3(n){this.enabled===!1||this.enableZoom===!1||this.state!==pt.NONE||(n.preventDefault(),this.dispatchEvent(n0),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(dS))}function f3(n){this.enabled!==!1&&this._handleKeyDown(n)}function h3(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Nr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=pt.TOUCH_ROTATE;break;case Nr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=pt.TOUCH_PAN;break;default:this.state=pt.NONE}break;case 2:switch(this.touches.TWO){case Nr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=pt.TOUCH_DOLLY_PAN;break;case Nr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=pt.TOUCH_DOLLY_ROTATE;break;default:this.state=pt.NONE}break;default:this.state=pt.NONE}this.state!==pt.NONE&&this.dispatchEvent(n0)}function p3(n){switch(this._trackPointer(n),this.state){case pt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case pt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case pt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case pt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=pt.NONE}}function m3(n){this.enabled!==!1&&n.preventDefault()}function g3(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function y3(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function i0(n,e){if(e===Ng)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Ho||e===Nc){let t=n.getIndex();if(t===null){let o=[],a=n.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);n.setIndex(o),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}let i=t.count-2,r=[];if(e===Ho)for(let o=1;o<=i;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=n.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}var Ns=class extends As{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new u0(t)}),this.register(function(t){return new d0(t)}),this.register(function(t){return new _0(t)}),this.register(function(t){return new b0(t)}),this.register(function(t){return new E0(t)}),this.register(function(t){return new h0(t)}),this.register(function(t){return new p0(t)}),this.register(function(t){return new m0(t)}),this.register(function(t){return new g0(t)}),this.register(function(t){return new l0(t)}),this.register(function(t){return new y0(t)}),this.register(function(t){return new f0(t)}),this.register(function(t){return new v0(t)}),this.register(function(t){return new x0(t)}),this.register(function(t){return new a0(t)}),this.register(function(t){return new M0(t)}),this.register(function(t){return new S0(t)})}load(e,t,i,r){let s=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=nr.extractUrlBase(e);o=nr.resolveURL(l,this.path)}else o=nr.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){r?r(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Lo(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},i,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,r){let s,o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===gS){try{o[qe.KHR_BINARY_GLTF]=new T0(e)}catch(d){r&&r(d);return}s=JSON.parse(o[qe.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new N0(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){let d=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(d){case qe.KHR_MATERIALS_UNLIT:o[d]=new c0;break;case qe.KHR_DRACO_MESH_COMPRESSION:o[d]=new w0(s,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:o[d]=new A0;break;case qe.KHR_MESH_QUANTIZATION:o[d]=new I0;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(i,r)}parseAsync(e,t){let i=this;return new Promise(function(r,s){i.parse(e,t,r,s)})}};function x3(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}var qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},a0=class{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,r=t.length;i<r;i++){let s=t[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,r=t.cache.get(i);if(r)return r;let s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],l,u=new Ce(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Zt);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Rr(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Cr(u),l.distance=d;break;case"spot":l=new _s(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Oi(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(i,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,s=i.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return i._getNodeRef(t.cache,a,c)})}},c0=class{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return Fn}extendParams(e,t,i){let r=[];e.color=new Ce(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Zt),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(i.assignTexture(e,"map",s.baseColorTexture,zt))}return Promise.all(r)}},l0=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},u0=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:on}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(i.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(i.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(i.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Te(a,a)}return Promise.all(s)}},d0=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:on}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},f0=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:on}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(i.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(i.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}},h0=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:on}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new Ce(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Zt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(i.assignTexture(t,"sheenColorMap",o.sheenColorTexture,zt)),o.sheenRoughnessTexture!==void 0&&s.push(i.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}},p0=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:on}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(i.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}},m0=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:on}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(i.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ce().setRGB(a[0],a[1],a[2],Zt),Promise.all(s)}},g0=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:on}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},y0=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:on}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(i.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ce().setRGB(a[0],a[1],a[2],Zt),o.specularColorTexture!==void 0&&s.push(i.assignTexture(t,"specularColorMap",o.specularColorTexture,zt)),Promise.all(s)}},x0=class{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:on}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(i.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}},v0=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let i=this.parser.json.materials[e];return!i.extensions||!i.extensions[this.name]?null:on}extendMaterialParams(e,t){let i=this.parser,r=i.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(i.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}},_0=class{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,r=i.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}},b0=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let o=s.extensions[t],a=r.images[o.source],c=i.textureLoader;if(a.uri){let l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(e,o.source,c)}},E0=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let o=s.extensions[t],a=r.images[o.source],c=i.textureLoader;if(a.uri){let l=i.options.manager.getHandler(a.uri);l!==null&&(c=l)}return i.loadTextureImage(e,o.source,c)}},M0=class{constructor(e){this.name=qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let r=i.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){let c=r.byteOffset||0,l=r.byteLength||0,u=r.count,d=r.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,r.mode,r.filter).then(function(h){return h.buffer}):o.ready.then(function(){let h=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(h),u,d,f,r.mode,r.filter),h})})}else return null}},S0=class{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let r=t.meshes[i.mesh];for(let l of r.primitives)if(l.mode!==Yn.TRIANGLES&&l.mode!==Yn.TRIANGLE_STRIP&&l.mode!==Yn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=i.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),d=u.isGroup?u.children:[u],f=l[0].count,h=[];for(let m of d){let y=new ke,g=new A,p=new Bt,M=new A(1,1,1),E=new lc(m.geometry,m.material,f);for(let T=0;T<f;T++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,T),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,T),c.SCALE&&M.fromBufferAttribute(c.SCALE,T),E.setMatrixAt(T,y.compose(g,p,M));for(let T in c)if(T==="_COLOR_0"){let I=c[T];E.instanceColor=new Ar(I.array,I.itemSize,I.normalized)}else T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"&&m.geometry.setAttribute(T,c[T]);At.prototype.copy.call(E,m),this.parser.assignFinalMaterial(E),h.push(E)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}},gS="glTF",Fc=12,fS={JSON:1313821514,BIN:5130562},T0=class{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Fc),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==gS)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-Fc,s=new DataView(e,Fc),o=0;for(;o<r;){let a=s.getUint32(o,!0);o+=4;let c=s.getUint32(o,!0);if(o+=4,c===fS.JSON){let l=new Uint8Array(e,Fc+o,a);this.content=i.decode(l)}else if(c===fS.BIN){let l=Fc+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},w0=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let u in o){let d=R0[u]||u.toLowerCase();a[d]=o[u]}for(let u in e.attributes){let d=R0[u]||u.toLowerCase();if(o[u]!==void 0){let f=i.accessors[e.attributes[u]],h=Wo[f.componentType];l[d]=h.name,c[d]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,f){r.decodeDracoFile(u,function(h){for(let m in h.attributes){let y=h.attributes[m],g=c[m];g!==void 0&&(y.normalized=g)}d(h)},a,l,Zt,f)})})}},A0=class{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},I0=class{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}},If=class extends Qi{constructor(e,t,i,r){super(e,t,i,r)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)t[o]=i[s+o];return t}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=r-t,d=(i-t)/u,f=d*d,h=f*d,m=e*l,y=m-l,g=-2*h+3*f,p=h-f,M=1-g,E=p-f+d;for(let T=0;T!==a;T++){let I=o[y+T+a],w=o[y+T+c]*u,R=o[m+T+a],O=o[m+T]*u;s[T]=M*I+E*w+g*R+p*O}return s}},v3=new Bt,C0=class extends If{interpolate_(e,t,i,r){let s=super.interpolate_(e,t,i,r);return v3.fromArray(s).normalize().toArray(s),s}},Yn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Wo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},hS={9728:Xt,9729:Yt,9984:Od,9985:ko,9986:Ss,9987:di},pS={33071:Wn,33648:bo,10497:Ti},r0={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},R0={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Or={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},_3={CUBICSPLINE:void 0,LINEAR:gs,STEP:ms},s0={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function b3(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new hn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:li})),n.DefaultMaterial}function Ds(n,e,t){for(let i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function Oi(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function E3(n,e,t){let i=!1,r=!1,s=!1;for(let l=0,u=e.length;l<u;l++){let d=e[l];if(d.POSITION!==void 0&&(i=!0),d.NORMAL!==void 0&&(r=!0),d.COLOR_0!==void 0&&(s=!0),i&&r&&s)break}if(!i&&!r&&!s)return Promise.resolve(n);let o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];if(i){let f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):n.attributes.position;o.push(f)}if(r){let f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):n.attributes.normal;a.push(f)}if(s){let f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):n.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],d=l[1],f=l[2];return i&&(n.morphAttributes.position=u),r&&(n.morphAttributes.normal=d),s&&(n.morphAttributes.color=f),n.morphTargetsRelative=!0,n})}function M3(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,r=t.length;i<r;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function S3(n){let e,t=n.extensions&&n.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+o0(t.attributes):e=n.indices+":"+o0(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,r=n.targets.length;i<r;i++)e+=":"+o0(n.targets[i]);return e}function o0(n){let e="",t=Object.keys(n).sort();for(let i=0,r=t.length;i<r;i++)e+=t[i]+":"+n[t[i]]+";";return e}function D0(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function T3(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var w3=new ke,N0=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new x3,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=-1,s=!1,o=-1;if(typeof navigator<"u"){let a=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);r=i&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&r<17||s&&o<98?this.textureLoader=new vc(this.options.manager):this.textureLoader=new Mc(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Lo(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){let a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:i,userData:{}};return Ds(s,a,r),Oi(a,r),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){let o=t[r].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let r=i.clone(),s=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,u]of o.children.entries())s(u,a.children[l])};return s(i,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let r=e(t[i]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let r=0;r<t.length;r++){let s=e(t[r]);s&&i.push(s)}return i}getDependency(e,t){let i=e+":"+t,r=this.cache.get(i);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(i,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,o){return i.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,o){i.load(nr.resolveURL(t.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let r=t.byteLength||0,s=t.byteOffset||0;return i.slice(s,s+r)})}loadAccessor(e){let t=this,i=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let o=r0[r.type],a=Wo[r.componentType],c=r.normalized===!0,l=new a(r.count*o);return Promise.resolve(new Rt(l,o,c))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){let a=o[0],c=r0[r.type],l=Wo[r.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,f=r.byteOffset||0,h=r.bufferView!==void 0?i.bufferViews[r.bufferView].byteStride:void 0,m=r.normalized===!0,y,g;if(h&&h!==d){let p=Math.floor(f/h),M="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count,E=t.cache.get(M);E||(y=new l(a,p*h,r.count*h/u),E=new Io(y,h/u),t.cache.add(M,E)),g=new Co(E,c,f%h/u,m)}else a===null?y=new l(r.count*c):y=new l(a,f,r.count*c),g=new Rt(y,c,m);if(r.sparse!==void 0){let p=r0.SCALAR,M=Wo[r.sparse.indices.componentType],E=r.sparse.indices.byteOffset||0,T=r.sparse.values.byteOffset||0,I=new M(o[1],E,r.sparse.count*p),w=new l(o[2],T,r.sparse.count*c);a!==null&&(g=new Rt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let R=0,O=I.length;R<O;R++){let b=I[R];if(g.setX(b,w[R*c]),c>=2&&g.setY(b,w[R*c+1]),c>=3&&g.setZ(b,w[R*c+2]),c>=4&&g.setW(b,w[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){let t=this.json,i=this.options,s=t.textures[e].source,o=t.images[s],a=this.textureLoader;if(o.uri){let c=i.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,i){let r=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,i).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let f=(s.samplers||{})[o.sampler]||{};return u.magFilter=hS[f.magFilter]||Yt,u.minFilter=hS[f.minFilter]||di,u.wrapS=pS[f.wrapS]||Ti,u.wrapT=pS[f.wrapT]||Ti,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Xt&&u.minFilter!==Yt,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let i=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let o=r.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=i.getDependency("bufferView",o.bufferView).then(function(d){l=!0;let f=new Blob([d],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(d){return new Promise(function(f,h){let m=f;t.isImageBitmapLoader===!0&&(m=function(y){let g=new _n(y);g.needsUpdate=!0,f(g)}),t.load(nr.resolveURL(d,s.path),m,void 0,h)})}).then(function(d){return l===!0&&a.revokeObjectURL(c),Oi(d,o),d.userData.mimeType=o.mimeType||T3(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,i,r){let s=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),s.extensions[qe.KHR_TEXTURE_TRANSFORM]){let a=i.extensions!==void 0?i.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=s.associations.get(o);o=s.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return r!==void 0&&(o.colorSpace=r),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,i=e.material,r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+i.uuid,c=this.cache.get(a);c||(c=new Ii,xn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(a,c)),i=c}else if(e.isLine){let a="LineBasicMaterial:"+i.uuid,c=this.cache.get(a);c||(c=new Po,xn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(a,c)),i=c}if(r||s||o){let a="ClonedMaterial:"+i.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=i.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(i))),i=c}e.material=i}getMaterialType(){return hn}loadMaterial(e){let t=this,i=this.json,r=this.extensions,s=i.materials[e],o,a={},c=s.extensions||{},l=[];if(c[qe.KHR_MATERIALS_UNLIT]){let d=r[qe.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),l.push(d.extendParams(a,s,t))}else{let d=s.pbrMetallicRoughness||{};if(a.color=new Ce(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){let f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Zt),a.opacity=f[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",d.baseColorTexture,zt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=qn);let u=s.alphaMode||s0.OPAQUE;if(u===s0.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===s0.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Fn&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Te(1,1),s.normalTexture.scale!==void 0)){let d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==Fn&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Fn){let d=s.emissiveFactor;a.emissive=new Ce().setRGB(d[0],d[1],d[2],Zt)}return s.emissiveTexture!==void 0&&o!==Fn&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,zt)),Promise.all(l).then(function(){let d=new o(a);return s.name&&(d.name=s.name),Oi(d,s),t.associations.set(d,{materials:e}),s.extensions&&Ds(r,d,s),d})}createUniqueName(e){let t=bt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,r=this.primitiveCache;function s(a){return i[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return mS(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=S3(l),d=r[u];if(d)o.push(d.promise);else{let f;l.extensions&&l.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?f=s(l):f=mS(new Vt,l,t),r[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,i=this.json,r=this.extensions,s=i.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let u=o[c].material===void 0?b3(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let h=0,m=u.length;h<m;h++){let y=u[h],g=o[h],p,M=l[h];if(g.mode===Yn.TRIANGLES||g.mode===Yn.TRIANGLE_STRIP||g.mode===Yn.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new ac(y,M):new vt(y,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===Yn.TRIANGLE_STRIP?p.geometry=i0(p.geometry,Nc):g.mode===Yn.TRIANGLE_FAN&&(p.geometry=i0(p.geometry,Ho));else if(g.mode===Yn.LINES)p=new uc(y,M);else if(g.mode===Yn.LINE_STRIP)p=new xs(y,M);else if(g.mode===Yn.LINE_LOOP)p=new dc(y,M);else if(g.mode===Yn.POINTS)p=new Ki(y,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&M3(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Oi(p,s),g.extensions&&Ds(r,p,g),t.assignFinalMaterial(p),d.push(p)}for(let h=0,m=d.length;h<m;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return s.extensions&&Ds(r,d[0],s),d[0];let f=new sn;s.extensions&&Ds(r,f,s),t.associations.set(f,{meshes:e});for(let h=0,m=d.length;h<m;h++)f.add(d[h]);return f})}loadCamera(e){let t,i=this.json.cameras[e],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Ut(Pc.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(t=new bs(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Oi(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let r=0,s=t.joints.length;r<s;r++)i.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(r){let s=r.pop(),o=r,a=[],c=[];for(let l=0,u=o.length;l<u;l++){let d=o[l];if(d){a.push(d);let f=new ke;s!==null&&f.fromArray(s.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new cc(a,c)})}loadAnimation(e){let t=this.json,i=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let d=0,f=r.channels.length;d<f;d++){let h=r.channels[d],m=r.samplers[h.sampler],y=h.target,g=y.node,p=r.parameters!==void 0?r.parameters[m.input]:m.input,M=r.parameters!==void 0?r.parameters[m.output]:m.output;y.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",M)),l.push(m),u.push(y))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){let f=d[0],h=d[1],m=d[2],y=d[3],g=d[4],p=[];for(let E=0,T=f.length;E<T;E++){let I=f[E],w=h[E],R=m[E],O=y[E],b=g[E];if(I===void 0)continue;I.updateMatrix&&I.updateMatrix();let _=i._createAnimationTracks(I,w,R,O,b);if(_)for(let N=0;N<_.length;N++)p.push(_[N])}let M=new vs(s,void 0,p);return Oi(M,r),M})}createNodeMesh(e){let t=this.json,i=this,r=t.nodes[e];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(s){let o=i._getNodeRef(i.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=r.weights.length;c<l;c++)a.morphTargetInfluences[c]=r.weights[c]}),o})}loadNode(e){let t=this.json,i=this,r=t.nodes[e],s=i._loadNodeShallow(e),o=[],a=r.children||[];for(let l=0,u=a.length;l<u;l++)o.push(i.getDependency("node",a[l]));let c=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){let u=l[0],d=l[1],f=l[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,w3)});for(let h=0,m=d.length;h<m;h++)u.add(d[h]);return u})}_loadNodeShallow(e){let t=this.json,i=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],o=s.name?r.createUniqueName(s.name):"",a=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(l){return r._getNodeRef(r.cameraCache,s.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(s.isBone===!0?u=new Ro:l.length>1?u=new sn:l.length===1?u=l[0]:u=new At,u!==l[0])for(let d=0,f=l.length;d<f;d++)u.add(l[d]);if(s.name&&(u.userData.name=s.name,u.name=o),Oi(u,s),s.extensions&&Ds(i,u,s),s.matrix!==void 0){let d=new ke;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!r.associations.has(u))r.associations.set(u,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){let d=r.associations.get(u);r.associations.set(u,Nt({},d))}return r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],r=this,s=new sn;i.name&&(s.name=r.createUniqueName(i.name)),Oi(s,i),i.extensions&&Ds(t,s,i);let o=i.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(r.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,d=c.length;u<d;u++)s.add(c[u]);let l=u=>{let d=new Map;for(let[f,h]of r.associations)(f instanceof xn||f instanceof _n)&&d.set(f,h);return u.traverse(f=>{let h=r.associations.get(f);h!=null&&d.set(f,h)}),d};return r.associations=l(s),s})}_createAnimationTracks(e,t,i,r,s){let o=[],a=e.name?e.name:e.uuid,c=[];Or[s.path]===Or.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(Or[s.path]){case Or.weights:l=Ci;break;case Or.rotation:l=Ri;break;case Or.translation:case Or.scale:l=Di;break;default:switch(i.itemSize){case 1:l=Ci;break;case 2:case 3:default:l=Di;break}break}let u=r.interpolation!==void 0?_3[r.interpolation]:gs,d=this._getArrayFromAccessor(i);for(let f=0,h=c.length;f<h;f++){let m=new l(c[f]+"."+Or[s.path],t.array,d,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=D0(t.constructor),r=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)r[s]=t[s]*i;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let r=this instanceof Ri?C0:If;return new r(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function A3(n,e,t){let i=e.attributes,r=new On;if(i.POSITION!==void 0){let a=t.json.accessors[i.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(r.set(new A(c[0],c[1],c[2]),new A(l[0],l[1],l[2])),a.normalized){let u=D0(Wo[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let a=new A,c=new A;for(let l=0,u=s.length;l<u;l++){let d=s[l];if(d.POSITION!==void 0){let f=t.json.accessors[d.POSITION],h=f.min,m=f.max;if(h!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(h[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(h[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(h[2]),Math.abs(m[2]))),f.normalized){let y=D0(Wo[f.componentType]);c.multiplyScalar(y)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}n.boundingBox=r;let o=new yn;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,n.boundingSphere=o}function mS(n,e,t){let i=e.attributes,r=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){n.setAttribute(a,c)})}for(let o in i){let a=R0[o]||o.toLowerCase();a in n.attributes||r.push(s(i[o],a))}if(e.indices!==void 0&&!n.index){let o=t.getDependency("accessor",e.indices).then(function(a){n.setIndex(a)});r.push(o)}return Je.workingColorSpace!==Zt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Je.workingColorSpace}" not supported.`),Oi(n,e),A3(n,e,t),Promise.all(r).then(function(){return e.targets!==void 0?E3(n,e.targets,t):n})}var Cf=class extends At{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Te(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}},$o=new A,yS=new ke,xS=new ke,vS=new A,_S=new A,Rf=class{constructor(e={}){let t=this,i,r,s,o,a={objects:new WeakMap},c=e.element!==void 0?e.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.sortObjects=!0,this.getSize=function(){return{width:i,height:r}},this.render=function(m,y){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),y.parent===null&&y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),yS.copy(y.matrixWorldInverse),xS.multiplyMatrices(y.projectionMatrix,yS),u(m,m,y),this.sortObjects&&h(m)},this.setSize=function(m,y){i=m,r=y,s=i/2,o=r/2,c.style.width=m+"px",c.style.height=y+"px"};function l(m){m.isCSS2DObject&&(m.element.style.display="none");for(let y=0,g=m.children.length;y<g;y++)l(m.children[y])}function u(m,y,g){if(m.visible===!1){l(m);return}if(m.isCSS2DObject){$o.setFromMatrixPosition(m.matrixWorld),$o.applyMatrix4(xS);let p=$o.z>=-1&&$o.z<=1&&m.layers.test(g.layers)===!0,M=m.element;M.style.display=p===!0?"":"none",p===!0&&(m.onBeforeRender(t,y,g),M.style.transform="translate("+-100*m.center.x+"%,"+-100*m.center.y+"%)translate("+($o.x*s+s)+"px,"+(-$o.y*o+o)+"px)",M.parentNode!==c&&c.appendChild(M),m.onAfterRender(t,y,g));let E={distanceToCameraSquared:d(g,m)};a.objects.set(m,E)}for(let p=0,M=m.children.length;p<M;p++)u(m.children[p],y,g)}function d(m,y){return vS.setFromMatrixPosition(m.matrixWorld),_S.setFromMatrixPosition(y.matrixWorld),vS.distanceToSquared(_S)}function f(m){let y=[];return m.traverseVisible(function(g){g.isCSS2DObject&&y.push(g)}),y}function h(m){let y=f(m).sort(function(p,M){if(p.renderOrder!==M.renderOrder)return M.renderOrder-p.renderOrder;let E=a.objects.get(p).distanceToCameraSquared,T=a.objects.get(M).distanceToCameraSquared;return E-T}),g=y.length;for(let p=0,M=y.length;p<M;p++)y[p].element.style.zIndex=g-p}}};var I3=["canvasContainer"],Df=class n{constructor(e){this.ngZone=e}container;renderer;labelRenderer;camera;scene;controls;clock=new Sc;frameId=null;collidableObjects=[];planet;atmosphere;chest;tree;playerModel;mixer;secondaryMixer;animations={};currentAction;backgroundMusic;chestAudio;currentSongIndex=0;attemptedMusicStart=!1;playlist=["assets/audios/song.m4a","assets/audios/Strawberry.mp3"];isNearChest=!1;isNearTree=!1;proximityLabels=[];planetRadius=8;playerSpeed=.08;turnSpeed=.05;constellationString="RITA";keys={forward:!1,backward:!1,left:!1,right:!1};photos=[{src:"assets/pictures/\xF3culos.jpg",caption:"esta foto ganhou o pr\xE9mio de foto mais tuff de 2025"},{src:"assets/pictures/wrapped.png",caption:"O meu Spotify wrapped de 2025, resume bem o meu ano"},{src:"assets/pictures/hand1.jpg",caption:"Minha m\xE3o esquerda, a que segura firme (ainda mais nesse dia)"},{src:"assets/pictures/gato.jpg",caption:"O gatinho que tu te esqueceste dele no teu caderno :( Agora ele t\xE1 aqui contigo"},{src:"assets/pictures/biblioteca.jpg",caption:"Um dos v\xE1rios momentos nossos a estudar intensamente na biblioteca"},{src:"assets/pictures/hand2.jpg",caption:"Quando eu voltei para casa e tu me fizeste este smile e eu tirei foto. Foi naquele dia que disseste para eu n\xE3o lavar e eu deixei at\xE9 o dia seguinte"},{src:"assets/pictures/nos1.jpg",caption:"Esta foto est\xE1 melhor que aquelas que aparecem no pinterest de couple picture ideas"},{src:"assets/pictures/barrits.jpg",caption:"Uma das minhas fotos favoritas tuas, apesar de ter sido dif\xEDcil escolher. \xC9s a strawberry blonde mais bonita, elegante, aesthetic, engra\xE7ada, inteligente e amiga deste mundo, a minha strawberry blonde. Love you :)"}];currentPhotoIndex=0;fireflies;firefliesVelocities=[];ngAfterViewInit(){this.ngZone.runOutsideAngular(()=>{this.initScene(),this.setupLighting(),this.createPlanet(),this.createAtmosphere(),this.beautifyPlanet(),this.createConstellation(this.constellationString,60),this.loadPlayerModel(),this.createChest(),this.loadTree(),this.loadDecorations(),this.loadLampPosts(),this.createAudioUI(),this.setupInputs(),this.initChestAudio(),this.setupBackgroundAudio(),this.animate(),window.addEventListener("resize",this.onWindowResizeBound)})}ngOnDestroy(){window.removeEventListener("resize",this.onWindowResizeBound),this.cleanupInputs(),this.frameId!==null&&cancelAnimationFrame(this.frameId),this.controls?.dispose(),this.renderer?.dispose(),this.stopChestAudio(),this.backgroundMusic&&this.backgroundMusic.pause(),this.closePhotoAlbumModal();let e=document.getElementById("music-controller");e&&e.remove()}initScene(){let e=this.container.nativeElement.clientWidth,t=this.container.nativeElement.clientHeight;this.scene=new oc,this.scene.background=this.createGradientBackground(),this.camera=new Ut(60,e/t,.1,1e3),this.camera.position.set(0,20,20),this.renderer=new Mf({antialias:!0}),this.renderer.setSize(e,t),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Td,this.container.nativeElement.appendChild(this.renderer.domElement),this.labelRenderer=new Rf,this.labelRenderer.setSize(window.innerWidth,window.innerHeight),this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.top="0px",this.labelRenderer.domElement.style.pointerEvents="none",document.body.appendChild(this.labelRenderer.domElement),this.controls=new Af(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.minDistance=5,this.controls.maxDistance=50}setupLighting(){let e=new Rr(16774374,1.5);e.position.set(30,50,30),e.castShadow=!0,e.shadow.camera.left=-20,e.shadow.camera.right=20,e.shadow.camera.top=20,e.shadow.camera.bottom=-20,e.shadow.camera.near=.5,e.shadow.camera.far=60,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048,this.scene.add(e);let t=new Rr(4482815,.4);t.position.set(-20,30,-20),this.scene.add(t);let i=new _c(8900331,3902011,.6);this.scene.add(i);let r=new Ec(16774374,.15);this.scene.add(r),this.addDecorativeLights()}createGradientBackground(){let e=document.createElement("canvas");e.width=1,e.height=256;let t=e.getContext("2d"),i=t.createLinearGradient(0,0,0,256);return i.addColorStop(0,"#0a0a2a"),i.addColorStop(.5,"#1a1a4a"),i.addColorStop(1,"#7b6baeff"),t.fillStyle=i,t.fillRect(0,0,1,256),new Ce(1053984)}createPlanet(){let e=new Ji(this.planetRadius,64,64),t=new hn({color:2254370,roughness:.8,flatShading:!1}),i=this.createGroundTexture();t.map=i,t.map.wrapS=t.map.wrapT=Ti,t.map.repeat.set(2,2),this.planet=new vt(e,t),this.planet.receiveShadow=!0,this.scene.add(this.planet),this.collidableObjects.push(this.planet)}createAtmosphere(){let e=new Ji(this.planetRadius*1.4,32,32),t=new on({color:8965375,transparent:!0,opacity:.15,side:Kt,roughness:0,metalness:0,thickness:1.5});this.atmosphere=new vt(e,t),this.scene.add(this.atmosphere)}beautifyPlanet(){this.addStars(100),this.addSurfacePebbles(120),this.addSurfaceBushes(12)}loadLampPosts(){this.createLampPost(new A(1,1,-1),-1.5),this.createLampPost(new A(-1,-2,-4),-1.5),this.createLampPost(new A(-1,-.3,.2),-1.5)}createLampPost(e,t){new Ns().load("assets/models/lamp_post.glb",r=>{let s=r.scene;s.scale.set(.05,.05,.05);let o=e.normalize().multiplyScalar(this.planetRadius-.15);s.position.copy(o),s.lookAt(new A(0,0,0)),s.rotateOnAxis(new A(1,0,0),t),s.castShadow=!0,this.scene.add(s);let a=new _s(16755251,50);a.angle=Math.PI/6,a.penumbra=.5,a.distance=15,a.castShadow=!0,a.shadow.bias=-1e-4;let l=new A(0,4.5,1.5).clone().applyMatrix4(s.matrixWorld);a.position.copy(l);let u=new At,d=l.clone().sub(s.position).normalize().negate();u.position.copy(new A(0,0,0)),this.scene.add(u),a.target=u,this.scene.add(a);let f=new Cr(16755251,5,5);f.position.copy(l),this.scene.add(f);let h=new Ji(.15,8,8),m=new Fn({color:16777130}),y=new vt(h,m);y.position.copy(l),this.scene.add(y)})}loadDecorations(){let e=new Ns;e.load("assets/models/Cat.glb",s=>{let o=s.scene;o.scale.set(.2,.2,.2);let a=new A(1,1,1).normalize();this.placeObjectOnPlanet(o,a,-.15),o.rotateOnAxis(new A(1,0,0),-Math.PI/2),o.rotateOnAxis(new A(0,1,0),Math.PI-1),this.scene.add(o)}),e.load("assets/models/Bed2.glb",s=>{let o=s.scene;o.scale.set(2,2,2);let a=new A(-1,-1,-1).normalize();this.placeObjectOnPlanet(o,a,-.15),o.rotateOnAxis(new A(1,0,0),-Math.PI/2),o.rotateOnAxis(new A(0,1,0),Math.PI-5),this.scene.add(o)}),e.load("assets/models/prada_bag.glb",s=>{let o=s.scene;o.scale.set(10,10,10);let a=new A(0,-.3,-3).normalize();this.placeObjectOnPlanet(o,a,.25),o.rotateOnAxis(new A(1,0,0),-Math.PI/2),o.rotateOnAxis(new A(0,1,0),Math.PI/3),o.rotateOnAxis(new A(0,0,1),Math.PI/10),this.scene.add(o)}),e.load("assets/models/Temple.glb",s=>{let o=s.scene;o.scale.set(3,3,3);let a=new A(0,.3,3).normalize();this.placeObjectOnPlanet(o,a,-1),o.rotateOnAxis(new A(1,0,0),-Math.PI/2),o.rotateOnAxis(new A(0,1,0),Math.PI/3),this.scene.add(o)}),e.load("assets/models/Ibanez1.glb",s=>{let o=s.scene;o.scale.set(2,2,2);let a=new A(-1,-.2,.13).normalize();this.placeObjectOnPlanet(o,a,.15),o.rotateOnAxis(new A(1,0,0),-Math.PI/2+.05),o.rotateOnAxis(new A(0,1,0),Math.PI/3),this.scene.add(o),this.addFloatingText(o,"Press ' O '")}),e.load("assets/models/Strat.glb",s=>{let o=s.scene;o.scale.set(2,2,2);let a=new A(-1,-.2,-.13).normalize();this.placeObjectOnPlanet(o,a,-.21),o.rotateOnAxis(new A(1,0,0),-3),o.rotateOnAxis(new A(0,1,0),1.66),this.scene.add(o)}),e.load("assets/models/antique_table.glb",s=>{let o=s.scene;o.scale.set(.07,.07,.07);let a=new A(4,0,0).normalize();this.placeObjectOnPlanet(o,a,-.21),o.rotateOnAxis(new A(1,0,0),-Math.PI/2),this.scene.add(o),this.addFloatingText(o,"Sushi e Francesinha nesta mesa!")}),e.load("assets/models/francesinha.glb",s=>{let o=s.scene;o.scale.set(2,2,2);let a=new A(16,-3,0).normalize();o.position.copy(a.multiplyScalar(this.planetRadius+14.6)),o.lookAt(new A(0,0,0)),o.rotateOnAxis(new A(1,0,0),-1.5),o.castShadow=!0,this.scene.add(o)}),e.load("assets/models/sushi.glb",s=>{let o=s.scene;o.scale.set(2,2,2);let a=new A(16,1,0).normalize();o.position.copy(a.multiplyScalar(this.planetRadius+1.35)),o.lookAt(new A(0,0,0)),o.rotateOnAxis(new A(1,0,0),-1.5),o.castShadow=!0,this.scene.add(o)}),e.load("assets/models/dog.glb",s=>{let o=s.scene;o.scale.set(.5,.5,.5);let a=new A(1,0,-1.1).normalize();this.placeObjectOnPlanet(o,a,.7),o.rotateOnAxis(new A(1,0,0),-1.5),this.scene.add(o),this.addFloatingText(o,"Hello Barrita, eu sou a Meggui!"),s.animations?.length&&(this.secondaryMixer=new Oo(o),this.secondaryMixer.clipAction(s.animations[0]).play())});let t=new Ai(3,.2,3),i=new hn({color:2698017}),r=new vt(t,i);r.castShadow=!0,r.position.set(10,this.planetRadius+.5,0),this.scene.add(r),this.collidableObjects.push(r),e.load("assets/models/Billboard.glb",s=>{let o=s.scene;o.scale.set(.9,.9,.9),o.position.copy(r.position),o.rotateOnAxis(new A(0,1,0),-Math.PI/2),o.position.y+=.5,this.scene.add(o)})}placeObjectOnPlanet(e,t,i){e.position.copy(t.multiplyScalar(this.planetRadius+i)),e.lookAt(new A(0,0,0)),e.castShadow=!0}setupBackgroundAudio(){this.backgroundMusic=new Audio(this.playlist[this.currentSongIndex]),this.backgroundMusic.loop=!0,this.backgroundMusic.volume=.3,this.backgroundMusic.addEventListener("error",e=>{console.error(`Error loading audio file: ${this.backgroundMusic.src}`,e)})}initChestAudio(){this.chestAudio=new Audio("assets/audios/RadioheadGuitar.mp4"),this.chestAudio.preload="auto",this.chestAudio.volume=.5,this.chestAudio.loop=!1}createAudioUI(){let e=document.createElement("div");e.id="music-controller",e.style.cssText=`
        position: fixed; top: 20px; right: 20px; background: rgba(0, 0, 0, 0.7);
        padding: 15px; border-radius: 12px; color: white; font-family: Arial, sans-serif;
        display: flex; flex-direction: column; gap: 10px; z-index: 1000;
        backdrop-filter: blur(5px); border: 1px solid rgba(255, 255, 255, 0.2);
        min-width: 150px;
    `;let t=document.createElement("div");t.id="song-title",t.textContent="\u{1F3B5} Music: Paused",t.style.fontSize="12px",e.appendChild(t);let i=document.createElement("div");i.style.display="flex",i.style.gap="10px",i.style.alignItems="center";let r=document.createElement("button");r.innerHTML="\u23ED Skip",r.style.cssText="background: #444; border: none; color: white; padding: 5px 10px; cursor: pointer; border-radius: 4px;",r.onclick=()=>this.skipSong(),i.appendChild(r),e.appendChild(i);let s=document.createElement("div");s.textContent="Volume",s.style.fontSize="10px",e.appendChild(s);let o=document.createElement("input");o.type="range",o.min="0",o.max="1",o.step="0.01",o.value="0.3",o.style.width="100%",o.oninput=a=>{let c=parseFloat(a.target.value);this.backgroundMusic&&(this.backgroundMusic.volume=c)},e.appendChild(o),document.body.appendChild(e)}skipSong(){if(!this.backgroundMusic)return;this.currentSongIndex=(this.currentSongIndex+1)%this.playlist.length,this.backgroundMusic.pause(),this.backgroundMusic.src=this.playlist[this.currentSongIndex],this.backgroundMusic.load();let e=this.backgroundMusic.play();e!==void 0&&e.then(()=>{this.updateMusicUI()}).catch(t=>{console.warn("Auto-play blocked on skip:",t)})}updateMusicUI(){let e=document.getElementById("song-title");if(e){let t=this.playlist[this.currentSongIndex].split("/").pop();e.textContent=`\u{1F3B5} Playing: ${t}`}}loadPlayerModel(){new Ns().load("assets/models/Animated_Woman.glb",t=>{this.playerModel=t.scene,this.playerModel.position.set(0,this.planetRadius,0),this.playerModel.traverse(r=>{r.isMesh&&(r.castShadow=!0)}),this.scene.add(this.playerModel),this.mixer=new Oo(this.playerModel),t.animations.forEach(r=>{this.animations[r.name]=this.mixer.clipAction(r)});let i=Object.keys(this.animations);i.length>4?this.playAnimation(i[4]):i.length>0&&this.playAnimation(i[0])},void 0,t=>console.error("Failed to load Player GLB:",t))}playAnimation(e){let t=this.animations[e];!t||this.currentAction===t||(this.currentAction?.fadeOut(.2),t.reset().fadeIn(.2).play(),this.currentAction=t)}updatePlayerMovement(){if(!this.playerModel)return;let e=Object.keys(this.animations),t=!1;if(this.keys.left&&(this.playerModel.rotateY(this.turnSpeed),t=!0),this.keys.right&&(this.playerModel.rotateY(-this.turnSpeed),t=!0),this.keys.forward&&(this.playerModel.translateZ(this.playerSpeed),t=!0),this.keys.backward&&(this.playerModel.translateZ(-this.playerSpeed),t=!0),t){let i=this.playerModel.position.clone();i.normalize().multiplyScalar(this.planetRadius),this.playerModel.position.copy(i);let r=this.playerModel.position.clone().normalize(),s=new A(0,1,0).applyQuaternion(this.playerModel.quaternion),o=new Bt().setFromUnitVectors(s,r);this.playerModel.quaternion.premultiply(o)}this.keys.forward?this.playAnimation(e[16]||"Run"):this.keys.backward?this.playAnimation(e[17]||"Run_Back"):e.length>4&&this.playAnimation(e[4])}setupInputs(){window.addEventListener("keydown",this.onKeyDownBound),window.addEventListener("keyup",this.onKeyUpBound),window.addEventListener("mousedown",this.handleFirstInteractionBound,{once:!0}),window.addEventListener("keydown",this.handleFirstInteractionBound,{once:!0})}cleanupInputs(){window.removeEventListener("keydown",this.onKeyDownBound),window.removeEventListener("keyup",this.onKeyUpBound),window.removeEventListener("mousedown",this.handleFirstInteractionBound),window.removeEventListener("keydown",this.handleFirstInteractionBound)}onKeyDownBound=e=>{(e.key==="ArrowUp"||e.key==="w")&&(this.keys.forward=!0),(e.key==="ArrowDown"||e.key==="s")&&(this.keys.backward=!0),(e.key==="ArrowLeft"||e.key==="a")&&(this.keys.left=!0),(e.key==="ArrowRight"||e.key==="d")&&(this.keys.right=!0),(e.key==="o"||e.key==="O")&&(this.isNearChest&&this.showCongratsModal(),this.isNearTree&&this.showPhotoAlbumModal())};onKeyUpBound=e=>{(e.key==="ArrowUp"||e.key==="w")&&(this.keys.forward=!1),(e.key==="ArrowDown"||e.key==="s")&&(this.keys.backward=!1),(e.key==="ArrowLeft"||e.key==="a")&&(this.keys.left=!1),(e.key==="ArrowRight"||e.key==="d")&&(this.keys.right=!1)};handleFirstInteractionBound=()=>{!this.attemptedMusicStart&&this.backgroundMusic&&(this.backgroundMusic.play().then(()=>{this.updateMusicUI()}).catch(e=>console.error("Auto-play blocked:",e)),this.attemptedMusicStart=!0)};animate=()=>{this.frameId=requestAnimationFrame(this.animate);let e=this.clock.getDelta();this.mixer&&this.mixer.update(e),this.secondaryMixer&&this.secondaryMixer.update(e),this.updatePlayerMovement(),this.updateFireflies(),this.checkProximities(),this.updateLabels(),this.playerModel&&this.controls&&this.controls.target.copy(this.playerModel.position),this.controls.update(),this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera)};checkProximities(){if(this.playerModel){if(this.chest){let e=this.playerModel.position.distanceTo(this.chest.position);this.isNearChest=e<2.5}if(this.tree){let e=this.playerModel.position.distanceTo(this.tree.position);this.isNearTree=e<3}}}updateLabels(){if(!this.playerModel)return;let e=5;this.proximityLabels.forEach(t=>{let i=this.playerModel.position.distanceTo(t.model.position);t.element.style.opacity=i<e?"1":"0"})}onWindowResizeBound=()=>{if(!this.container)return;let e=this.container.nativeElement.clientWidth,t=this.container.nativeElement.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.labelRenderer.setSize(window.innerWidth,window.innerHeight)};createGroundTexture(){let t=document.createElement("canvas");t.width=1024,t.height=1024;let i=t.getContext("2d");i.fillStyle="#3b8a3b",i.fillRect(0,0,1024,1024);for(let s=0;s<220;s++){let o=Math.random()*1024,a=Math.random()*1024,c=6+Math.random()*40,l=i.createRadialGradient(o,a,0,o,a,c);l.addColorStop(0,`rgba(${Math.floor(80+Math.random()*60)},${120+Math.random()*60},80,0.1)`),l.addColorStop(1,"rgba(59,138,59,0)"),i.fillStyle=l,i.beginPath(),i.arc(o,a,c,0,Math.PI*2),i.fill()}i.fillStyle="rgba(0,0,0,0.03)";for(let s=0;s<4e3;s++)i.fillRect(Math.random()*1024,Math.random()*1024,1,1);let r=new fc(t);return r.needsUpdate=!0,r}addSurfacePebbles(e){let t=new sn,i=new Ji(.06,6,6),r=new hn({color:7829367,roughness:.95});for(let s=0;s<e;s++){let o=new A(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),a=new vt(i,r);a.position.copy(o.multiplyScalar(this.planetRadius+.05)),a.lookAt(new A(0,0,0)),t.add(a)}this.scene.add(t)}addSurfaceBushes(e){let t=new sn,i=[3046706,2853434,3902011];for(let r=0;r<e;r++){let s=new A(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),o=new sn,a=new vt(new mc(.06,.06,.08,6),new hn({color:7031594}));a.position.y=.04,o.add(a);for(let c=0;c<3;c++){let l=new vt(new Ji(.7-c*.18,8,6),new hn({color:i[Math.floor(Math.random()*3)]}));l.position.y=.15+c*.18,o.add(l)}o.position.copy(s.multiplyScalar(this.planetRadius+.02)),o.lookAt(new A(0,0,0)),t.add(o)}this.scene.add(t)}addStars(e){let t=[],i=[],r=new Ce;for(let a=0;a<e;a++){let c=new A(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(40+Math.random()*100);t.push(c.x,c.y,c.z),Math.random()>.5?r.setHex(16777215):r.setHex(16774374),i.push(r.r,r.g,r.b)}let s=new Vt;s.setAttribute("position",new Dt(t,3)),s.setAttribute("color",new Dt(i,3));let o=new Ii({size:.8,vertexColors:!0,transparent:!0,opacity:.9});this.scene.add(new Ki(s,o))}addDecorativeLights(){[{p:new A(15,5,15),c:16755336},{p:new A(-15,8,10),c:8956671}].forEach(t=>{let i=new Cr(t.c,.8,50);i.position.copy(t.p),this.scene.add(i)})}createConstellation(e,t){let i=document.createElement("canvas");i.width=512,i.height=256;let r=i.getContext("2d");r.fillStyle="black",r.fillRect(0,0,512,256),r.fillStyle="white",r.font="bold 100px Arial",r.textAlign="center",r.fillText(e,256,128);let s=[],o=r.getImageData(0,0,512,256).data;for(let l=0;l<256;l+=6)for(let u=0;u<512;u+=6)if(o[(l*512+u)*4]>100){let d=u/512-.5,f=l/256-.5,h=new A(0,0,-t);h.applyAxisAngle(new A(1,0,0),f*Math.PI*.3-Math.PI/6),h.applyAxisAngle(new A(0,1,0),d*Math.PI*.8),h.x+=Math.random()-.5,s.push(h)}let a=new Vt().setFromPoints(s),c=new Ki(a,new Ii({color:8965375,size:.8}));c.rotation.y=Math.PI/2,c.rotation.z=Math.PI,this.scene.add(c)}addFloatingText(e,t){let i=document.createElement("div");i.className="floating-label",i.textContent=t,i.style.cssText="color: white; font-family: Arial; padding: 5px; background: rgba(0,0,0,0.6); border-radius: 5px; opacity: 0; transition: opacity 0.5s; font-size: 14px;";let r=new Cf(i);r.position.set(0,2,0),e.add(r),this.proximityLabels.push({model:e,element:i})}createChest(){let e=new sn,t=new vt(new Ai(.5,.2,.35),new hn({color:9127187}));t.position.y=.2,e.add(t);let i=new vt(new Ai(.52,.1,.37),new hn({color:10506797}));i.position.y=.35,e.add(i);let r=new A(-1,-.2,0).normalize();e.position.copy(r.multiplyScalar(this.planetRadius-.15)),e.lookAt(new A(0,0,0)),e.rotateOnAxis(new A(1,0,0),-Math.PI/2),this.chest=e,this.scene.add(e)}loadTree(){new Ns().load("assets/models/Tree.glb",t=>{this.tree=t.scene,this.tree.scale.set(.6,.6,.6);let i=new A(0,-8,0).normalize();this.placeObjectOnPlanet(this.tree,i,-.15),this.tree.rotateOnAxis(new A(1,0,0),-Math.PI/2),this.tree.rotateOnAxis(new A(0,1,0),Math.PI-5),this.scene.add(this.tree),this.tree.add(this.createFireflies(80)),this.addFloatingText(this.tree,"Press ' O '")})}createFireflies(e){let t=new Float32Array(e*3);this.firefliesVelocities=[];for(let i=0;i<e*3;i+=3){let r=3.5+Math.random()*.5,s=Math.random()*Math.PI*2,o=Math.acos(2*Math.random()-1);t[i]=r*Math.sin(o)*Math.cos(s),t[i+1]=r*Math.sin(o)*Math.sin(s),t[i+2]=r*Math.cos(o),this.firefliesVelocities.push(new A((Math.random()-.5)*.005,(Math.random()-.5)*.005,(Math.random()-.5)*.005))}return this.fireflies=new Ki(new Vt().setAttribute("position",new Rt(t,3)),new Ii({color:16777113,size:.15,transparent:!0,opacity:.8,blending:wc})),this.fireflies}updateFireflies(){if(!this.fireflies)return;let e=this.fireflies.geometry.getAttribute("position"),t=e.array,i=Date.now()*.001;for(let r=0;r<t.length;r+=3){let s=this.firefliesVelocities[r/3];t[r]+=Math.sin(i+r)*.002+s.x,t[r+1]+=Math.cos(i*.7+r)*.002+s.y,t[r+2]+=Math.sin(i*.5+r*.7)*.002+s.z}e.needsUpdate=!0}showCongratsModal(){this.backgroundMusic&&this.backgroundMusic.pause();let e=document.createElement("div");e.style.cssText="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 2000;";let t=document.createElement("div");t.style.cssText="background: white; padding: 40px; border-radius: 10px; text-align: center; font-family: sans-serif;",t.innerHTML="<h1>\u{1F389} PARAB\xC9NSSSS! \u{1F389}</h1><p>Uma lembran\xE7a para os teus 21 anos!</p>";let i=document.createElement("button");i.textContent="Close",i.style.cssText="margin-top: 20px; padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;",i.onclick=()=>{this.stopChestAudio(),e.remove(),this.backgroundMusic&&this.backgroundMusic.play()},t.appendChild(i),e.appendChild(t),document.body.appendChild(e),this.playChestAudio()}showPhotoAlbumModal(){if(document.getElementById("photo-album-modal"))return;this.currentPhotoIndex=0;let e=document.createElement("div");e.id="photo-album-modal",e.style.cssText=`
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.85); display: flex; align-items: center;
      justify-content: center; z-index: 1000; font-family: Arial, sans-serif;
      backdrop-filter: blur(5px);
    `;let t=document.createElement("div");t.style.cssText=`
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 30px; border-radius: 15px; text-align: center;
      max-width: 800px; width: 90%; max-height: 90vh;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex; flex-direction: column;
      overflow-y: auto;
    `;let i=document.createElement("h1");i.textContent="\u{1F4F8} Memory Album",i.style.cssText=`
      color: #fff; font-size: 2.2em; margin: 0 0 20px 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      font-weight: 300; letter-spacing: 1px;
    `;let r=document.createElement("div");r.style.cssText=`
      margin: 20px 0; min-height: 400px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(0, 0, 0, 0.3); border-radius: 10px;
      padding: 20px; position: relative;
    `;let s=document.createElement("img");s.id="album-photo",s.style.cssText=`
      max-width: 100%; max-height: 400px;
      border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.4);
      object-fit: contain;
    `;let o=document.createElement("p");o.id="album-caption",o.style.cssText=`
      color: #ccc; font-size: 1.1em; margin: 20px 0 30px 0;
      line-height: 1.6; padding: 0 20px;
      min-height: 60px;
    `;let a=document.createElement("div");a.style.cssText=`
      display: flex; justify-content: center; align-items: center;
      gap: 20px; margin-top: 10px;
    `;let c=document.createElement("button");c.innerHTML="&larr; Previous",c.style.cssText=`
      background: rgba(255, 255, 255, 0.1); color: white; border: none;
      padding: 12px 25px; font-size: 1em; border-radius: 8px;
      cursor: pointer; transition: all 0.3s; backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `,c.onmouseover=()=>c.style.background="rgba(255, 255, 255, 0.2)",c.onmouseout=()=>c.style.background="rgba(255, 255, 255, 0.1)";let l=document.createElement("span");l.id="photo-counter",l.style.cssText=`
      color: #fff; font-size: 1.1em; min-width: 100px;
    `;let u=document.createElement("button");u.innerHTML="Next &rarr;",u.style.cssText=`
      background: rgba(255, 255, 255, 0.1); color: white; border: none;
      padding: 12px 25px; font-size: 1em; border-radius: 8px;
      cursor: pointer; transition: all 0.3s; backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `,u.onmouseover=()=>u.style.background="rgba(255, 255, 255, 0.2)",u.onmouseout=()=>u.style.background="rgba(255, 255, 255, 0.1)";let d=document.createElement("button");d.textContent="Close Album",d.style.cssText=`
      background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
      color: white; border: none; padding: 12px 40px;
      font-size: 1.1em; border-radius: 8px; cursor: pointer;
      transition: transform 0.3s; margin-top: 30px;
      align-self: center;
    `,d.onmouseover=()=>d.style.transform="scale(1.05)",d.onmouseout=()=>d.style.transform="scale(1)";let f=()=>{let m=this.photos[this.currentPhotoIndex];s.src=m.src,o.textContent=m.caption,l.textContent=`${this.currentPhotoIndex+1} / ${this.photos.length}`,c.disabled=this.currentPhotoIndex===0,u.disabled=this.currentPhotoIndex===this.photos.length-1,c.style.opacity=c.disabled?"0.5":"1",u.style.opacity=u.disabled?"0.5":"1"};c.onclick=()=>{this.currentPhotoIndex>0&&(this.currentPhotoIndex--,f())},u.onclick=()=>{this.currentPhotoIndex<this.photos.length-1&&(this.currentPhotoIndex++,f())},d.onclick=()=>this.closePhotoAlbumModal();let h=m=>{m.key==="ArrowLeft"&&c.click(),m.key==="ArrowRight"&&u.click(),m.key==="Escape"&&this.closePhotoAlbumModal()};window.addEventListener("keydown",h),e._keyHandler=h,r.appendChild(s),a.appendChild(c),a.appendChild(l),a.appendChild(u),t.appendChild(i),t.appendChild(r),t.appendChild(o),t.appendChild(a),t.appendChild(d),e.appendChild(t),document.body.appendChild(e),f()}closePhotoAlbumModal(){let e=document.getElementById("photo-album-modal");e&&e.remove()}playChestAudio(){this.chestAudio&&(this.chestAudio.currentTime=0,this.chestAudio.play().catch(e=>console.warn(e)))}stopChestAudio(){this.chestAudio&&(this.chestAudio.pause(),this.chestAudio.currentTime=0)}static \u0275fac=function(t){return new(t||n)(pu(Qt))};static \u0275cmp=Aa({type:n,selectors:[["app-three-scene"]],viewQuery:function(t,i){if(t&1&&fm(I3,5),t&2){let r;hm(r=pm())&&(i.container=r.first)}},decls:2,vars:0,consts:[["canvasContainer",""],[1,"scene-container"]],template:function(t,i){t&1&&yu(0,"div",1,0)},styles:["[_nghost-%COMP%]{display:block;height:100vh;width:100%}.scene-container[_ngcontent-%COMP%]{width:100%;height:100%;overflow:hidden;background:linear-gradient(180deg,#0b1224,#071029)}"]})};var Nf=class n{title=fa("three-demo");static \u0275fac=function(t){return new(t||n)};static \u0275cmp=Aa({type:n,selectors:[["app-root"]],decls:1,vars:0,template:function(t,i){t&1&&gu(0,"app-three-scene")},dependencies:[Df],encapsulation:2})};Om(Nf,iE).catch(n=>console.error(n));
