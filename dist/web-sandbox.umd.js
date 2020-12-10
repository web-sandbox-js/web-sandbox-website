(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,e.WebSandbox=t())})(this,function(){'use strict';var A=String.prototype;function e(e,t=void 0){const o=`please report internal shim error: ${e}`;console.error(o),t&&(console.error(`${t}`),console.error(`${t.stack}`));debugger;throw o}function t(t,o){t||e(o)}function o(e){let t=`'use strict'; (${e})`;return t=t.replace(/\(0,\s*_[0-9a-fA-F]{3}\u200D\.e\)/g,"(0, eval)"),t=t.replace(/_[0-9a-fA-F]{3}\u200D\.g\./g,""),t=t.replace(/cov_[^+]+\+\+[;,]/g,""),t}function n(e,t){const{callAndWrapError:o}=e,{initRootRealm:n,initCompartment:a,getRealmGlobal:r,realmEvaluate:i}=t,{create:c,defineProperties:l}=Object;class s{constructor(){throw new TypeError("Realm is not a constructor")}static makeRootRealm(t={}){const a=c(s.prototype);return o(n,[e,a,t]),a}static makeCompartment(t={}){const n=c(s.prototype);return o(a,[e,n,t]),n}get global(){return o(r,[this])}evaluate(e,t,n={}){return o(i,[this,e,t,n])}}return l(s,{toString:{value:()=>"function Realm() { [shim code] }",writable:!1,enumerable:!1,configurable:!0}}),l(s.prototype,{toString:{value:()=>"[object Realm]",writable:!1,enumerable:!1,configurable:!0}}),s}function a(e,o=!1){function n(o,n,r,i){for(const c of o){const o=k(e,c);o&&(t("value"in o,`unexpected accessor on global property: ${c}`),a[c]={value:o.value,writable:n,enumerable:r,configurable:i})}}const a={};return o?(n(Y,!0,!1,!0),n(J,!0,!1,!0)):(n(Y,!1,!1,!1),n(J,!1,!1,!1)),n(Q,!0,!1,!0),a}function r(){function e(e){if(void 0===e||null===e)throw new TypeError(`can't convert undefined or null to object`);return Object(e)}function t(e){return"symbol"==typeof e?e:`${e}`}function o(e,t){if("function"!=typeof e)throw TypeError(`invalid ${t} usage`);return e}const{defineProperty:n,defineProperties:a,getOwnPropertyDescriptor:r,getPrototypeOf:i,prototype:c}=Object;try{(0,c.__lookupGetter__)("x")}catch(e){return}a(c,{__defineGetter__:{value:function(t,a){const r=e(this);n(r,t,{get:o(a,"getter"),enumerable:!0,configurable:!0})}},__defineSetter__:{value:function(t,a){const r=e(this);n(r,t,{set:o(a,"setter"),enumerable:!0,configurable:!0})}},__lookupGetter__:{value:function(o){let n=e(this);o=t(o);let a;for(;n&&!(a=r(n,o));)n=i(n);return a&&a.get}},__lookupSetter__:{value:function(o){let n=e(this);o=t(o);let a;for(;n&&!(a=r(n,o));)n=i(n);return a&&a.set}}})}function i(){function e(e,a){let r;try{r=(0,eval)(a)}catch(t){if(t instanceof SyntaxError)return;throw t}const i=o(r),c=function(){throw new TypeError("Not available")};t(c,{name:{value:e}}),t(i,{constructor:{value:c}}),t(c,{prototype:{value:i}}),c!==Function.prototype.constructor&&n(c,Function.prototype.constructor)}const{defineProperties:t,getPrototypeOf:o,setPrototypeOf:n}=Object;e("Function","(function(){})"),e("GeneratorFunction","(function*(){})"),e("AsyncFunction","(async function(){})"),e("AsyncGeneratorFunction","(async function*(){})")}function c(){const e=new Function("try {return this===global}catch(e){return false}")();if(!e)return;const t=require("vm"),o=t.runInNewContext($);return o}function l(){if("undefined"!=typeof document){const e=document.createElement("iframe");e.style.display="none",document.body.appendChild(e);const t=e.contentWindow.eval(Z);return t}}function s(e,t=[],o=!1){const n=a(e,o),r=e.eval,i=e.Function,c=r(x)();return P({unsafeGlobal:e,sharedGlobalDescs:n,unsafeEval:r,unsafeFunction:i,callAndWrapError:c,allShims:t})}function d(e,t=!1){const o=ee(),n=s(o,e,t),{unsafeEval:a}=n;return a(te)(),a(oe)(),n}function u(e,t={}){const o=I(e),n=K(o,o=>{if(o in t)return!1;if("eval"===o||ae.has(o)||!V(ne,o))return!1;const n=k(e,o);return!1===n.configurable&&!1===n.writable&&G(n,"value")});return n}function p(e){const t=e.search(se);if(-1!==t){const o=e.slice(0,t).split("\n").length;throw new SyntaxError(`possible html comment syntax rejected around line ${o}`)}}function m(e){const t=e.search(de);if(-1!==t){const o=e.slice(0,t).split("\n").length;throw new SyntaxError(`possible import expression rejected around line ${o}`)}}function f(e){const t=e.search(ue);if(-1!==t){const o=e.slice(0,t).split("\n").length;throw new SyntaxError(`possible direct eval expression rejected around line ${o}`)}}function b(e){p(e),m(e),f(e)}function y(e){return 0===e.length?"":`const {${z(e,",")}} = this;`}function g(e,t){const{unsafeFunction:o}=e,n=y(t);return o(`with (arguments[0]) {${n};return function() {'use strict';return eval(arguments[0]);};}`)}function h(t,o,n,a){const{unsafeEval:r}=t,i=r(le);return function(c={},l={}){const s=l.transforms||[],d=q(s,n||[],[pe]);return function(n){let l={src:n,endowments:c};l=i(l,d);const s=u(o,l.endowments),p=u(l.endowments),m=q(s,p),f=g(t,m),b=r(re)(t,o,l.endowments,a),y=Proxy.revocable({},b),h=y.proxy,S=_(f,o,[h]);b.useUnsafeEvaluator=!0;let E;try{return _(S,o,[l.src])}catch(t){throw E=t,t}finally{b.useUnsafeEvaluator&&(y.revoke(),e("handler did not revoke useUnsafeEvaluator",E))}}}}function S(e,o){const{unsafeEval:n,unsafeFunction:a}=e,r=n(ie)(e,o);return t(M(r).constructor!==Function,"hide Function"),t(M(r).constructor!==a,"hide unsafeFunction"),r}function E(e){return(t,o,n={})=>e(o,n)(t)}function v(e,o){const{unsafeGlobal:n,unsafeEval:a,unsafeFunction:r}=e,i=a(ce)(e,function(...e){const t=`${B(e)||""}`;let a=`${z(e,",")}`;if(!V(/^[\w\s,]*$/,a))throw new SyntaxError("shim limitation: Function arg must be simple ASCII identifiers, possibly separated by commas: no default values, pattern matches, or non-ASCII parameter names");if(new r(t),X(a,")"))throw new n.SyntaxError("shim limitation: Function arg string contains parenthesis");0<a.length&&(a+="\n/*``*/");const i=`(function(${a}){\n${t}\n})`;return o(i)});return t(M(i).constructor!==Function,"hide Function"),t(M(i).constructor!==r,"hide unsafeFunction"),i}function O(e){return t(Object(e)===e,"bad object, not a Realm instance"),t(me.has(e),"Realm instance has no record"),me.get(e)}function w(e,o){t(Object(e)===e,"bad object, not a Realm instance"),t(!me.has(e),"Realm instance already has a record"),me.set(e,o)}function C(e,t,o){D(e,{eval:{value:t,writable:!0,configurable:!0},Function:{value:o,writable:!0,configurable:!0}})}function T(e,t,o){const{sharedGlobalDescs:n,unsafeGlobal:a}=e,r=j(a.Object.prototype,n),i=h(e,r,t,o),c=i(),l=S(e,c),s=v(e,c),d=E(i);C(r,l,s);const u=P({safeGlobal:r,safeEval:l,safeEvalWhichTakesEndowments:d,safeFunction:s});return u}function N(){return window.document.createElement("web-sandbox")}const R=o(n),x=o(function(){const{getPrototypeOf:e}=Object,{apply:t}=Reflect,o=e=>(o,...n)=>t(e,o,n),n=o(Map.prototype.get),a=o(Set.prototype.has),r=new Map([["EvalError",EvalError],["RangeError",RangeError],["ReferenceError",ReferenceError],["SyntaxError",SyntaxError],["TypeError",TypeError],["URIError",URIError]]),i=new Set([EvalError.prototype,RangeError.prototype,ReferenceError.prototype,SyntaxError.prototype,TypeError.prototype,URIError.prototype,Error.prototype]);return function(o,c){try{return t(o,void 0,c)}catch(t){if(Object(t)!==t)throw t;if(a(i,e(t)))throw t;let o,c,l;try{o=`${t.name}`,c=`${t.message}`,l=`${t.stack||c}`}catch(e){throw new Error("unknown error")}const s=n(r,o)||Error;try{throw new s(c)}catch(e){throw e.stack=l,e}}}}),{assign:H,create:j,freeze:P,defineProperties:D,getOwnPropertyDescriptor:k,getOwnPropertyDescriptors:L,getOwnPropertyNames:I,getPrototypeOf:M,setPrototypeOf:F}=Object,{apply:_,ownKeys:U}=Reflect,W=e=>(t,...o)=>_(e,t,o),G=W(Object.prototype.hasOwnProperty),K=W(Array.prototype.filter),B=W(Array.prototype.pop),z=W(Array.prototype.join),q=W(Array.prototype.concat),V=W(RegExp.prototype.test),X=W(A.includes),Y=["Infinity","NaN","undefined"],J=["isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","Array","ArrayBuffer","Boolean","DataView","EvalError","Float32Array","Float64Array","Int8Array","Int16Array","Int32Array","Map","Number","Object","RangeError","ReferenceError","Set","String","Symbol","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet","JSON","Math","Reflect","escape","unescape"],Q=["Date","Error","Promise","Proxy","RegExp","Intl"],Z="'use strict'; this",$=`(0, eval)("'use strict'; this")`,ee=()=>{const e=l(),t=c();if(!e&&!t||e&&t)throw new Error("unexpected platform, unable to create Realm");return e||t},te=o(r),oe=o(i),ne=/^[a-zA-Z_$][\w$]*$/,ae=new Set(["await","break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","let","static","enum","implements","package","protected","interface","private","public","await","null","true","false","this","arguments"]),re=o(function(e,t,o={},n=!1){const{unsafeGlobal:a,unsafeEval:r}=e,{freeze:i,getOwnPropertyDescriptor:c}=Object,{get:l,set:s}=Reflect,d=new Proxy(i({}),{get(e,t){throw new TypeError(`unexpected scope handler trap called: ${t+""}`)}});return{__proto__:d,useUnsafeEvaluator:!1,get(e,n){return"symbol"==typeof n?void 0:"eval"===n&&!0===this.useUnsafeEvaluator?(this.useUnsafeEvaluator=!1,r):n in o?l(o,n,t):l(t,n)},set(e,n,a){if(n in o){const e=c(o,n);return"value"in e?s(o,n,a):s(o,n,a,t)}return s(t,n,a)},has(e,r){return!!n||!!("eval"===r||r in o||r in t||r in a)},getPrototypeOf(){return null}}}),ie=o(function(e,t){const{callAndWrapError:o}=e,{defineProperties:n}=Object,a={eval(){return o(t,arguments)}}.eval;return n(a,{toString:{value:()=>`function ${"eval"}() { [shim code] }`,writable:!1,enumerable:!1,configurable:!0}}),a}),ce=o(function(e,t){const{callAndWrapError:o,unsafeFunction:n}=e,{defineProperties:a}=Object,r=function(){return o(t,arguments)};return a(r,{prototype:{value:n.prototype},toString:{value:()=>"function Function() { [shim code] }",writable:!1,enumerable:!1,configurable:!0}}),r}),le=o(function(e,t){const{create:o,getOwnPropertyDescriptors:n}=Object,{apply:a}=Reflect,r=(e=>(t,...o)=>a(e,t,o))(Array.prototype.reduce);return e={src:`${e.src}`,endowments:o(null,n(e.endowments))},e=r(t,(e,t)=>t.rewrite?t.rewrite(e):e,e),e={src:`${e.src}`,endowments:o(null,n(e.endowments))},e}),se=/(?:<!--|-->)/,de=/\bimport\s*(?:\(|\/[/*])/,ue=/\beval\s*(?:\(|\/[/*])/,pe={rewrite(e){return b(e.src),e}},me=new WeakMap,fe={initRootRealm:function(e,t,o){const{shims:n,transforms:a,sloppyGlobals:r,configurableGlobals:i}=o,c=q(e.allShims,n),l=d(c,i),{unsafeEval:s}=l,u=s(R)(l,fe);l.sharedGlobalDescs.Realm={value:u,writable:!0,configurable:!0};const p=T(l,a,r),{safeEvalWhichTakesEndowments:m}=p;for(const n of c)m(n);w(t,p)},initCompartment:function(e,t,o={}){const{transforms:n,sloppyGlobals:a}=o,r=T(e,n,a);w(t,r)},getRealmGlobal:function(e){const{safeGlobal:t}=O(e);return t},realmEvaluate:function(e,t,o={},n={}){const{safeEvalWhichTakesEndowments:a}=O(e);return a(t,o,n)}},be=function(){const e=eval,t=e(Z);return r(),i(),s(t)}(),ye=n(be,fe);var ge=({name:e,compartment:t,top:o,parent:n,view:a,allow:r,debug:i,utils:c})=>{const l={};l.name=e,l.compartment=t,l.top=o,l.parent=n,l.debug=i,l.view=a,l.allow=r,l.Symbol={proxy:Symbol("proxy"),static:Symbol("static"),createdCallback:Symbol("createdCallback"),connectedCallback:Symbol("connectedCallback"),disconnectedCallback:Symbol("disconnectedCallback"),adoptedCallback:Symbol("adoptedCallback"),attributeChangedCallback:Symbol("attributeChangedCallback")},l.WebSandboxSecurityError=class extends TypeError{constructor(){super(...arguments),this.name="WebSandboxSecurityError"}},l.toHostObject=function(e){const t=l.toHostObject.cache.get(e);if(t)return t;throw new TypeError(`Unknown object: ${e}`)},l.toHostObject.cache=new WeakMap,l.toSafeObject=function(e,t){if(l.toSafeObject.cache.has(e))return l.toSafeObject.cache.get(e);if(t||(t=l.constructorRegistry.get(e.constructor.name)),!t||[l.parent,l.parent.document].includes(e)||e.isConnected&&e instanceof l.parent.Node&&l.parent.document.documentElement.contains(e))throw new l.WebSandboxSecurityError(`Forbidden: ${e.toString()}`);let o=Object.create(t.prototype);const n=Reflect.get(o,l.Symbol.proxy);return l.toHostObject.cache.set(o,e),n&&(o=new Proxy(o,n),l.toHostObject.cache.set(o,e)),l.toSafeObject.cache.set(e,o),o[l.Symbol.createdCallback]&&o[l.Symbol.createdCallback](),o},l.toSafeObject.cache=new WeakMap,l.toHostArray=function(){throw new TypeError(`Unable to convert array`)},l.toSafeArray=function(){throw new TypeError(`Unable to convert array`)},l.toHostFunction=function(e){if(l.toHostFunction.cache.has(e))return l.toHostFunction.cache.get(e);const t=e=>e.map(e=>l.toSafeAny(e)),o=new Proxy(e,{apply(e,o,n){const a=l.toSafeObject(o),r=t(n),i=Reflect.apply(e,a,r);return l.toHostAny(i)}});return l.toHostFunction.cache.set(e,o),o},l.toHostFunction.cache=new WeakMap,l.toSafeFunction=function(e){if(l.toSafeFunction.cache.has(e))return l.toSafeFunction.cache.get(e);const t=e=>e.map(e=>l.toHostAny(e)),o=new Proxy(e,{apply(e,o,n){const a=l.toHostObject(o),r=t(n),i=Reflect.apply(e,a,r);return l.toSafeAny(i)}});return l.toSafeFunction.cache.set(e,o),o},l.toSafeFunction.cache=new WeakMap,l.toSafeAny=function(e){return c.isArray(e)?l.toSafeArray(e):c.isObject(e)?l.toSafeObject(e):c.isFunction(e)?l.toSafeFunction(e):e},l.toHostAny=function(e){return c.isArray(e)?l.toHostArray(e):c.isObject(e)?l.toHostObject(e):c.isFunction(e)?l.toHostFunction(e):e};const s=(e,t,o)=>{class n extends o{constructor(){const e=[...arguments].map(e=>l.toHostAny(e));return l.toSafeAny(new t(...e))}}const a=(e,t,o)=>{Reflect.defineProperty(e,t,{value:o,writable:!1,enumerable:!1,configurable:!0})};return a(n,"name",e),a(n.prototype,Symbol.toStringTag,e),a(n,"toString",()=>`function ${e}() { [virtual code] }`),a(n.prototype,l.Symbol.createdCallback,()=>{}),n};class d extends Map{define(e,t){return this.set(e,t),t}}l.elementRegistry=new d;class u extends Map{define(e,t){return this.set(e,t),t}}return l.constructorRegistry=new u,l.constructorGenerator=function(e,o){const n={Document:l.parent.ShadowRoot,Window:l.parent.Node},a=n[e]||l.parent[e];if(!a)return l.console.warn(`parent['${e}'] is not defined`),!1;const r=Reflect.getPrototypeOf(a);let d;d=""===r.name?Object:l.constructorRegistry.get(r.name),d||(d=Object,i&&l.console.warn(`class ${e} extends ${r.name}: ${r.name} is not defined`));const u=s(e,a,d),p=c.isObject(o)?o:i?o(l):t.evaluate(o.toString())(l),m=Reflect.get(p,l.Symbol.static),f=Reflect.get(p,l.Symbol.proxy),b=(e,t)=>{const o=l.parent.Reflect.getOwnPropertyDescriptor(e,t);if(!o){const o=l.parent.Reflect.getPrototypeOf(e);return o?b(o,t):null}return o},y=(e,t,o,n)=>c.isObject(n)?Reflect.defineProperty(e,o,n):(n=b(t,o),!n)?(i&&l.console.warn(`'${o}' is not included in the prototype of '${t.toString()}'`),!1):(Reflect.ownKeys(n).forEach(e=>{n[e]=l.toSafeAny(n[e])}),Reflect.defineProperty(e,o,n));m&&Reflect.ownKeys(m).forEach(e=>{const t=m[e];t&&y(u,a,e,t)});const g=[l.Symbol.static,l.Symbol.proxy];return Reflect.ownKeys(p).filter(e=>!g.includes(e)).forEach(e=>{const t=p[e];t&&y(u.prototype,a.prototype,e,t)}),f&&Reflect.defineProperty(u.prototype,l.Symbol.proxy,{value:f}),u},l},he=e=>{e.console=Object.entries(e.parent.console).reduce((t,[o,n])=>(t[o]=e.debug?n:new Proxy(n,{apply(){return Reflect.apply(...arguments)}}),t),{}),e.cloneHostConstructor=t=>{const o=e.parent[t];if(!o)return e.debug&&e.console.warn(`window['${t}'] is not defined`),!1;const n=["arguments","caller","length","name","prototype"],a=["constructor"],r=Reflect.has(o.prototype,Symbol.iterator),i=r?e.arrayLikeProxyhandler:null,c=Reflect.ownKeys(o.prototype).filter(e=>!a.includes(e)).reduce((e,t)=>(e[t]=!0,e),{[e.Symbol.static]:Reflect.ownKeys(o).filter(e=>!n.includes(e)).reduce((e,t)=>(e[t]=!0,e),{})});return i&&(c[e.Symbol.proxy]=i),e.constructorGenerator(t,c)};const t=(t,o,n)=>{const a=e.parent.Node;let r;switch(t.nodeType){case a.ELEMENT_NODE:r=n.createElement(t.tagName.toLowerCase()),[...t.attributes].forEach(e=>{r.setAttribute(e.name,e.value)});break;case a.TEXT_NODE:r=n.createTextNode(t.data);break;case a.CDATA_SECTION_NODE:r=n.createCDATASection(t.data);break;case a.PROCESSING_INSTRUCTION_NODE:r=n.createProcessingInstruction(t.target,t.data);break;case a.COMMENT_NODE:r=n.createComment(t.data);break;default:throw new e.WebSandboxSecurityError(`Unsupported features: node.nodeType: ${t.nodeType}`);}return o&&t.childNodes.forEach(e=>{r.append(e.cloneNode(o))}),r};e.htmlSanitize=o=>{const n=new e.top.DOMParser,a=n.parseFromString(o,"text/html"),r=e.compartment.global.document.createDocumentFragment();return[...a.body.childNodes].forEach(o=>{r.appendChild(t(e.toSafeObject(o),!0,e.compartment.global.document))}),r},e.tagSanitize=e=>e,e.attributeSanitize=(t,o,n)=>{if(0===o.indexOf("on")&&Reflect.has(e.parent.HTMLElement.prototype,o)||"SCRIPT"===t.nodeName&&"type"===o&&"undefined"!=typeof n&&["","text/javascript","text/ecmascript","application/javascript","module"].includes(n))throw new e.WebSandboxSecurityError(`Forbidden: attribute [${o}${"undefined"==typeof n?``:`=${JSON.stringify(n)}`}]`);return[o,n]},e.arrayLikeProxyhandler={get(t,o,n){if(Reflect.has(t,o))return Reflect.get(t,o,n);const a=Reflect.getOwnPropertyDescriptor(e.toHostObject(t),o),r=a?a.value:void 0;return e.toSafeAny(r)},has(t,o){const n=Reflect.has(t,o);return n||Reflect.has(e.toHostObject(t),o)},ownKeys(t){const o=new Set;for(const e of Reflect.ownKeys(t))o.add(e);for(const n of Reflect.ownKeys(e.toHostObject(t)))o.add(n);return[...o]},set(t,o,n,a){if(Reflect.has(t,o))return Reflect.set(t,o,n,a);const r=e.toHostObject(t),i=Reflect.getOwnPropertyDescriptor(r,o);return!!(i&&i.writable)&&(i.value=e.toHostAny(n),Reflect.defineProperty(r,o,i))},deleteProperty(t,o){return Reflect.has(t,o)?Reflect.deleteProperty(t,o):Reflect.deleteProperty(e.toHostObject(t),o)},getOwnPropertyDescriptor(t,o){const n=Reflect.getOwnPropertyDescriptor(t,o)||Reflect.getOwnPropertyDescriptor(e.toHostObject(t),o);return n&&Reflect.ownKeys(n).forEach(t=>{n[t]=e.toSafeAny(n[t])}),n}}},Se=()=>{return{isArray:function(e){return Array.isArray(e)},isObject:function(e){return"object"==typeof e&&null!==e},isFunction:function(e){return"function"==typeof e}}},Ee=e=>{e.utils=Se();const t=e.debug?ge(e):e.compartment.evaluate(ge.toString())(e);return he(t),t},ve=e=>{const t=[],o=[],n=[];return{name:e.name,[Symbol.toStringTag]:"Window",window:e.compartment.global,self:e.compartment.global,constructor:e.constructorRegistry.get("Window"),console:e.console,atob:e.toSafeFunction(e.parent.atob),btoa:e.toSafeFunction(e.parent.btoa),localStorage:e.toSafeObject(e.parent.localStorage),navigator:e.toSafeObject(e.parent.navigator),document:(()=>{const t=e.toSafeObject(e.view.shadowRoot,e.constructorRegistry.get("HTMLDocument")),o=t.createElement("html"),n=t.createElement("head"),a=t.createElement("title"),r=t.createElement("body");a.textContent=e.name,n.appendChild(a);const i=t.createElement("style");return i.textContent=`body { height: min-content }`,n.appendChild(i),Object.entries({defaultView:e.compartment.global,documentElement:t.appendChild(o),head:o.appendChild(n),body:o.appendChild(r),nodeName:"#document",nodeType:9}).forEach(([e,o])=>{Reflect.defineProperty(t,e,{writable:!1,configurable:!1,enumerable:!0,value:o})}),t})(),location:Object.defineProperties(e.toSafeObject(e.parent.location),{...["href","protocol","host","hostname","port","pathname","search","hash","username","password","origin"].reduce((t,o)=>(t[o]={enumerable:!0,get(){return e.parent.location[o]},set(t){e.allow["top-navigation"]?e.parent.location[o]=t:e.console.error(`The document is sandboxed, and the 'allow-top-navigation' keyword is not set.`)}},t),{}),...["assign","reload","replace"].reduce((t,o)=>(t[o]={enumerable:!0,value(){e.allow["top-navigation"]?e.parent.location[o](...arguments):e.console.error(`The document is sandboxed, and the 'allow-top-navigation' keyword is not set.`)}},t),{}),...{toString:{enumerable:!0,value(){return this.href}}}}),close(){this.dispatchEvent(new this.Event("beforeunload")),this.dispatchEvent(new this.Event("pagehide")),this.dispatchEvent(new this.Event("unload")),t.forEach(e=>this.clearTimeout(e)),o.forEach(e=>this.clearInterval(e)),n.forEach(e=>this.cancelAnimationFrame(e)),this.document.removeChild(this.document.documentElement)},setTimeout(o,...n){if("string"==typeof o)throw new e.WebSandboxSecurityError(`The first parameter must be a function`);return t.push(e.parent.setTimeout(o.bind(this),...n))},clearTimeout(o){const n=t.indexOf(o);-1!==n&&(t.splice(n,1),e.parent.clearTimeout(o))},setInterval(t,...n){if("string"==typeof t)throw new e.WebSandboxSecurityError(`The first parameter must be a function`);return o.push(e.parent.setInterval(t.bind(this),...n))},clearInterval(t){const n=o.indexOf(t);-1!==n&&(o.splice(n,1),e.parent.clearInterval(t))},requestAnimationFrame(t){return n.push(e.parent.requestAnimationFrame(t.bind(this)))},cancelAnimationFrame(t){const o=n.indexOf(t);-1!==o&&(n.splice(o,1),e.parent.cancelAnimationFrame(t))},getComputedStyle(t,o){const n=e.toHostObject(t),a=e.parent.getComputedStyle(n,o);return e.toSafeObject(a)},addEventListener:e.toSafeFunction(e.view.addEventListener),removeEventListener:e.toSafeFunction(e.view.removeEventListener),dispatchEvent:e.toSafeFunction(e.view.dispatchEvent)}};const Oe={HTMLCanvasElement:()=>({width:!0,height:!0,captureStream:!0,getContext:!0,toDataURL:!0,toBlob:!0,transferControlToOffscreen:!0}),HTMLInputElement:()=>({accept:!0,alt:!0,autocomplete:!0,defaultChecked:!0,checked:!0,dirName:!0,disabled:!0,form:!0,files:!0,formAction:!0,formEnctype:!0,formMethod:!0,formNoValidate:!0,formTarget:!0,height:!0,indeterminate:!0,list:!0,max:!0,maxLength:!0,min:!0,minLength:!0,multiple:!0,name:!0,pattern:!0,placeholder:!0,readOnly:!0,required:!0,size:!0,src:!0,step:!0,type:!0,defaultValue:!0,value:!0,valueAsDate:!0,valueAsNumber:!0,width:!0,willValidate:!0,validity:!0,validationMessage:!0,labels:!0,selectionStart:!0,selectionEnd:!0,selectionDirection:!0,align:!0,useMap:!0,incremental:!0,checkValidity:!0,reportValidity:!0,select:!0,setCustomValidity:!0,setRangeText:!0,setSelectionRange:!0,stepDown:!0,stepUp:!0}),HTMLLinkElement:()=>({href:!0,rel:!0}),HTMLScriptElement:e=>{const t=new WeakMap,o="text/web-sandbox-script",n=["","text/javascript","text/ecmascript","application/javascript","module"],a=e=>e.replace(/\.import\(/g,`['import'](`);return{[e.Symbol.createdCallback]:{value(){this.type=n[0]}},[e.Symbol.connectedCallback]:{value(){if(!n.includes(this.type))return;const t=e.compartment.global.Error,o=e.constructorRegistry.get("Event"),r=e.top.fetch,i=t=>{t=a(t),e.compartment.evaluate(t),this.dispatchEvent(new o("load"))};if(this.src){const o=new e.top.URL(this.src,this.baseURI).href;r(o,{}).then(e=>{if(!e.ok)throw t([e.status,e.statusText,o].join(", "));const n=e.headers.get("content-type");if(!n||!/^(text|application)\/(x-)?javascript(;|$)/.test(n))throw t(n);return e.text().then(e=>{0>e.indexOf("//# sourceURL=")&&(e+=`\n//# sourceURL=${o}`),i(e)})})}else i(this.textContent)}},type:{get(){const n=e.toHostObject(this).type;return n===o?t.get(this)||"":n},set(a){a=(a+"").trim().toLocaleLowerCase(),e.toHostObject(this).type=n.includes(a)?o:a,t.set(this,a)}},src:!0,charset:!0,async:!0,defer:!0,crossOrigin:!0,text:!0,noModule:!0,referrerPolicy:!0}},HTMLTemplateElement:()=>({content:!0}),HTMLUnknownElement:()=>({})};var we=e=>{const t=t=>e.constructorRegistry.get(t),o=o=>{const n=e.parent.document.createElement(o)[e.parent.Symbol.toStringTag],a=t(n)?t(n):e.constructorGenerator(n,()=>({}));return a&&(e.constructorRegistry.define(n,a),e.elementRegistry.define(o,a)),a};return Object.entries(Oe).forEach(([t,o])=>{const n=e.constructorGenerator(t,o);n&&e.constructorRegistry.define(t,n)}),Object.entries({a:!0,abbr:!0,address:!0,area:!0,article:!0,aside:!0,audio:!1,b:!0,base:!0,bdi:!0,bdo:!0,blockquote:!0,body:!0,br:!0,button:!0,canvas:!0,caption:!0,cite:!0,code:!0,col:!0,colgroup:!0,data:!0,datalist:!0,dd:!0,del:!0,details:!0,dfn:!0,dialog:!0,div:!0,dl:!0,dt:!0,em:!0,embed:!0,fieldset:!0,figcaption:!0,figure:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,head:!0,header:!0,hr:!0,html:!0,i:!0,iframe:!0,img:!0,input:!0,ins:!0,kbd:!0,label:!0,legend:!0,li:!0,link:!0,main:!0,map:!0,mark:!0,meta:!0,meter:!0,nav:!0,noscript:!0,object:!0,ol:!0,optgroup:!0,option:!0,output:!0,p:!0,param:!0,picture:!0,pre:!0,progress:!0,q:!0,rb:!0,rp:!0,rt:!0,rtc:!0,ruby:!0,s:!0,samp:!0,script:!0,section:!0,select:!0,slot:!0,small:!0,source:!0,span:!0,strong:!0,style:!0,sub:!0,summary:!0,sup:!0,table:!0,tbody:!0,td:!0,template:!0,textarea:!0,tfoot:!0,th:!0,thead:!0,time:!0,title:!0,tr:!0,track:!0,u:!0,ul:!0,var:!0,video:!1,wbr:!0}).reduce((e,[n,a])=>(a&&(!0===a&&(t(n)?a=t(n):a=o(n)),e[a.name]=a),e),{})},Ce=e=>{const t=t=>e.constructorRegistry.get(t),o=t=>{const o=e.cloneHostConstructor(t);return o&&e.constructorRegistry.define(t,o),o};return Object.entries({CSSRule:!0,CSSGroupingRule:!0,StyleSheet:!0,CSSConditionRule:!0,CSSKeyframeRule:!0,CSSKeyframesRule:!0,CSSMediaRule:!0,CSSNamespaceRule:!0,CSSPageRule:!0,CSSRuleList:!0,CSSStyleDeclaration:!0,CSSStyleRule:!0,CSSStyleSheet:!0,CSSSupportsRule:!0,MediaQueryList:!0,Screen:!0,StyleSheetList:!0}).reduce((e,[n,a])=>(a&&(!0===a&&(t(n)?a=t(n):a=o(n)),a&&(e[a.name]=a)),e),{})};const Te={CompositionEvent:()=>({data:!0}),ErrorEvent:()=>({message:!0,filename:!0,lineno:!0,colno:!0,error:!0}),HashChangeEvent:()=>({newURL:!0,oldURL:!0}),InputEvent:()=>({data:!0,isComposing:!0}),KeyboardEvent:e=>({altKey:!0,code:!0,ctrlKey:!0,isComposing:!0,key:!0,location:!0,metaKey:!0,repeat:!0,shiftKey:!0,[e.Symbol.static]:{DOM_KEY_LOCATION_STANDARD:!0,DOM_KEY_LOCATION_LEFT:!0,DOM_KEY_LOCATION_RIGHT:!0,DOM_KEY_LOCATION_NUMPAD:!0}}),MouseEvent:()=>({altKey:!0,button:!0,buttons:!0,ctrlKey:!0,metaKey:!0,offsetX:!0,offsetY:!0,relatedTarget:!0,shiftKey:!0,x:!1,y:!1})};var Ne=e=>{const t={};return Object.entries(Te).forEach(([o,n])=>{const a=e.constructorGenerator(o,n);a&&(e.constructorRegistry.define(o,a),t[o]=a)}),t};const Ae={EventTarget:()=>({addEventListener:!0,removeEventListener:!0,dispatchEvent:!0}),Node:e=>({baseURI:!0,childNodes:!0,firstChild:!0,isConnected:!0,lastChild:!0,nextSibling:!0,nodeName:!0,nodeType:!0,nodeValue:!0,ownerDocument:{get(){return null}},parentNode:{get(){const t=e.toHostObject(this).parentNode;return null===t?null:t===e.toHostObject(this.ownerDocument)?this.ownerDocument:e.toSafeObject(t)}},previousSibling:!0,textContent:!0,appendChild:{value(t){const o=e.toHostObject(t),n=e.toHostObject(this).appendChild(o);return t[e.Symbol.connectedCallback]&&t[e.Symbol.connectedCallback](),e.toSafeAny(n)}},cloneNode:!0,compareDocumentPosition:!0,contains:!0,getRootNode:!0,hasChildNodes:!0,insertBefore:!0,isDefaultNamespace:!0,isEqualNode:!0,isSameNode:!0,lookupPrefix:!0,lookupNamespaceURI:!0,normalize:!0,removeChild:!0,replaceChild:!0,[e.Symbol.static]:{ELEMENT_NODE:!0,TEXT_NODE:!0,CDATA_SECTION_NODE:!0,PROCESSING_INSTRUCTION_NODE:!0,COMMENT_NODE:!0,DOCUMENT_NODE:!0,DOCUMENT_TYPE_NODE:!0,DOCUMENT_FRAGMENT_NODE:!0}}),DocumentFragment:()=>({}),Document:e=>{const t=t=>({value(){const o=this,n=e.parent.document[t](...arguments),a=e.toSafeObject(n);return Reflect.has(n,"ownerDocument")&&Reflect.defineProperty(a,"ownerDocument",{value:o}),a}}),o=t("createAttribute"),n=t("createAttributeNS"),a=t("createCDATASection"),r=t("createComment"),i=t("createDocumentFragment"),c=t("createElement"),l=t("createElementNS"),s=t("createEvent"),d=t("createProcessingInstruction"),u=t("createTextNode");return{nodeName:{get(){return e.parent.document.nodeName}},nodeType:{get(){return e.parent.document.nodeType}},body:{get(){return this.querySelector("body")}},documentElement:{get(){return this.querySelector("html")}},head:{get(){return this.querySelector("head")}},title:{get(){return this.querySelector("title").textContent},set(e){this.querySelector("title").textContent=e}},hidden:{get(){return e.parent.document.hiddent}},visibilityState:{get(){return e.parent.document.visibilityState}},childElementCount:!0,children:!0,firstElementChild:!0,lastElementChild:!0,readyState:{get(){return e.parent.document.readyState}},activeElement:!0,createAttribute:{value(t,n){return e.attributeSanitize(this,t,n),o.value.apply(this,arguments)}},createAttributeNS:{value(t,o,a){return e.attributeSanitize(this,o,a),n.value.apply(this,arguments)}},createCDATASection:a,createComment:r,createDocumentFragment:i,createElement:{value(){return e.tagSanitize(arguments[0]),c.value.apply(this,arguments)}},createElementNS:{value(){return e.tagSanitize(arguments[1]),l.value.apply(this,arguments)}},createEvent:s,createProcessingInstruction:d,createTextNode:u,getElementById:!0,querySelector:!0,querySelectorAll:!0}},CharacterData:()=>({data:!0,length:!0,nextElementSibling:!0,previousElementSibling:!0}),Element:e=>({attributes:!0,childElementCount:!0,children:!0,classList:!0,className:!0,clientHeight:!0,clientLeft:!0,clientTop:!0,clientWidth:!0,firstElementChild:!0,id:!0,innerHTML:{set(t){e.debug&&/<\/script>/i.test(t)&&e.console.warn(new e.WebSandboxSecurityError(`Element.innerHTML: <script> is not supported`));const o=e.htmlSanitize(t);e.toHostObject(this).innerHTML="",this.append(o)},get(){return e.toHostObject(this).innerHTML}},lastElementChild:!0,localName:!0,namespaceURI:!0,nextElementSibling:!0,outerHTML:!0,part:!0,prefix:!0,previousElementSibling:!0,scrollHeight:!0,scrollLeft:!0,scrollTop:!0,scrollWidth:!0,shadowRoot:!0,slot:!0,tagName:!0,after:!0,animate:!0,append:!0,attachShadow:!0,before:!0,closest:!0,getAnimations:!0,getAttribute:!0,getAttributeNames:!0,getAttributeNS:!0,getBoundingClientRect:!0,getClientRects:!0,getElementsByClassName:!0,getElementsByTagName:!0,getElementsByTagNameNS:!0,hasAttribute:!0,hasAttributeNS:!0,hasAttributes:!0,matches:!0,querySelector:!0,querySelectorAll:!0,remove:!0,removeAttribute:!0,removeAttributeNS:!0,scroll:!0,scrollBy:!0,scrollIntoView:!0,scrollTo:!0,setAttribute:{value(t,o){return e.attributeSanitize(this,t,o),e.toHostObject(this).setAttribute(...arguments)}},setAttributeNS:{value(t,o,n){return e.attributeSanitize(this,o,n),e.toHostObject(this).setAttributeNS(...arguments)}},setAttributeNode:!0,setAttributeNodeNS:!0,toggleAttribute:!0}),Event:e=>({bubbles:!0,cancelable:!0,composed:{get(){return!1}},currentTarget:!0,defaultPrevented:!0,eventPhase:!0,target:!0,timeStamp:!0,type:!0,composedPath:{value(){const t=this.target.ownerDocument.defaultView,o=e.view.shadowRoot,n=e.toHostObject(this).composedPath();return n.filter(t=>t===e.parent||t instanceof e.parent.Node&&o.contains(t)).map(o=>o===e.parent?t:e.toSafeObject(o))}},initEvent:!0,preventDefault:!0,stopImmediatePropagation:!0,stopPropagation:!0}),UIEvent:()=>({detail:!0}),DOMTokenList:e=>({length:!0,value:!0,item:!0,contains:!0,add:!0,remove:!0,replace:!0,supports:!0,toggle:!0,entries:{value:Array.prototype.entries},forEach:{value:Array.prototype.forEach},keys:{value:Array.prototype.keys},values:{value:Array.prototype[Symbol.iterator]},[Symbol.iterator]:{value:Array.prototype[Symbol.iterator]},[e.Symbol.proxy]:e.arrayLikeProxyhandler}),Attr:()=>({name:!0,namespaceURI:!0,localName:!0,prefix:!0,ownerElement:!0,specified:!0,value:!0}),CanvasGradient:()=>({addColorStop:!0}),CanvasPattern:()=>({setTransform:!0}),CanvasRenderingContext2D:e=>({canvas:!0,direction:!0,fillStyle:{get(){return e.toHostObject(this).fillStyle},set(t){e.toHostObject(this).fillStyle=t}},filter:!0,font:!0,globalAlpha:!0,globalCompositeOperation:!0,imageSmoothingEnabled:!0,imageSmoothingQuality:!0,lineCap:!0,lineDashOffset:!0,lineJoin:!0,lineWidth:!0,miterLimit:!0,shadowBlur:!0,shadowColor:!0,shadowOffsetX:!0,shadowOffsetY:!0,strokeStyle:{get(){return e.toHostObject(this).strokeStyle},set(t){e.toHostObject(this).strokeStyle=t}},textAlign:!0,textBaseline:!0,...Object.entries({arc:!0,arcTo:!0,beginPath:!0,bezierCurveTo:!0,clearRect:!0,clip:!0,closePath:!0,createImageData:!0,createLinearGradient:!0,createPattern:{value(t,o){const n=e.toHostObject(t);return e.toHostObject(this).createPattern(n,o)}},createRadialGradient:!0,drawFocusIfNeeded:{value(...t){return 1===t.length?t[0]=e.toHostObject(t[0]):t[1]=e.toHostObject(t[1]),e.toHostObject(this).drawFocusIfNeeded(...t)}},drawImage:{value(t,...o){const n=e.toHostObject(t);return e.toHostObject(this).drawImage(n,...o)}},ellipse:!0,fill:!0,fillRect:!0,fillText:!0,getImageData:!0,getLineDash:!0,getTransform:!0,isPointInPath:!0,isPointInStroke:!0,lineTo:!0,measureText:!0,moveTo:!0,putImageData:!0,quadraticCurveTo:!0,rect:!0,resetTransform:!0,restore:!0,rotate:!0,save:!0,scale:!0,setLineDash:!0,setTransform:!0,stroke:!0,strokeRect:!0,strokeText:!0,transform:!0,translate:!0}).reduce((t,[o,n])=>(t[o]=!0===n?{value(){return e.toHostObject(this)[o](...arguments)}}:n,t),{})}),Comment:()=>({}),DOMStringMap:()=>({}),HTMLCollection:e=>({length:!0,item:!0,namedItem:!0,[Symbol.iterator]:{value:Array.prototype[Symbol.iterator]},[e.Symbol.proxy]:e.arrayLikeProxyhandler}),HTMLDocument:()=>({}),HTMLElement:()=>({accessKey:!0,dataset:!0,dir:!0,draggable:!0,hidden:!0,innerText:!0,lang:!0,offsetHeight:!0,offsetLeft:!0,offsetParent:!0,offsetTop:!0,offsetWidth:!0,spellcheck:!0,style:!0,tabIndex:!0,title:!0,blur:!0,click:!0,focus:!0}),Location:()=>({}),NamedNodeMap:e=>({length:!0,getNamedItem:!0,setNamedItem:!0,removeNamedItem:!0,item:!0,getNamedItemNS:!0,setNamedItemNS:!0,removeNamedItemNS:!0,[Symbol.iterator]:{value:Array.prototype[Symbol.iterator]},[e.Symbol.proxy]:e.arrayLikeProxyhandler}),Navigator:()=>({language:!0,languages:!0,onLine:!0,userAgent:!0,cookieEnabled:{get(){return!1}}}),NodeList:e=>({item:!0,length:!0,[Symbol.iterator]:{value:Array.prototype[Symbol.iterator]},keys:{value:Array.prototype.keys},values:{value:Array.prototype[Symbol.iterator]},entries:{value:Array.prototype.entries},forEach:{value:Array.prototype.forEach},[e.Symbol.proxy]:e.arrayLikeProxyhandler}),OffscreenCanvas:()=>({height:!0,width:!0,convertToBlob:!0,getContext:!0,transferToImageBitmap:!0}),ShadowRoot:e=>({host:!0,innerHTML:{set(t){e.debug&&/<\/script>/i.test(t)&&e.console.warn(`Element.innerHTML: <script> is not supported`);const o=e.htmlSanitize(t);e.toHostObject(this).innerHTML="",this.append(o)},get(){return e.toHostObject(this).innerHTML}},mode:!0}),Storage:e=>{const t=`websandbox/${e.name}`;return{length:{get(){throw new e.WebSandboxSecurityError(`Forbidden: Storage.length`)}},key:{value(){throw new e.WebSandboxSecurityError(`Forbidden: Storage.key()`)}},getItem:{value(o){return e.toHostObject(this).getItem(`${t}/${o}`)}},setItem:{value(o,n){return e.toHostObject(this).setItem(`${t}/${o}`,n)}},removeItem:{value(o){return e.toHostObject(this).removeItem(`${t}/${o}`)}},clear:{value(){const o=e.toHostObject(this);Reflect.ownKeys(o).filter(e=>0===e.indexOf(t)).forEach(e=>o.removeItem(e))}},[e.Symbol.proxy]:{get(e,t,o){return Reflect.has(e,t)?Reflect.get(e,t,o):e.getItem(t)},set(e,t,o,n){return Reflect.has(e,t)?Reflect.set(e,t,o,n):e.setItem(t,o)},deleteProperty(e,t){return Reflect.has(e,t)?Reflect.deleteProperty(e,t):e.removeItem(t)}}}},Text:()=>({wholeText:!0}),Window:()=>({})},Re=e=>Object.entries(Ae).reduce((t,[o,n])=>{const a=e.constructorGenerator(o,n);return a&&(e.constructorRegistry.define(o,a),t[o]=a),t},{});let xe;const He=window,je=Symbol("importScript"),Pe=Symbol("compartment"),De=Symbol("sandbox"),ke=e=>{const t=Ee(e),o=e.compartment,n=o.global,a=e.debug,r=e.parent,i=e.view;return Object.assign(n,Re(t),we(t),Ce(t),Ne(t)),Object.assign(n,a?ve(t):o.evaluate(ve.toString())(t)),["window","document","location","close"].forEach(e=>{Reflect.defineProperty(n,e,{writable:!1,configurable:!1,enumerable:!0})}),t.toHostObject.cache.set(n,i),t.toSafeObject.cache.set(i,n),r.setTimeout(()=>{n.dispatchEvent(new n.Event("DOMContentLoaded")),n.dispatchEvent(new n.Event("load"))},16),r.addEventListener("hashchange",e=>{const o=t.toSafeObject(new e.constructor(e.type,{newUrl:e.newURL,oldURL:e.oldURL}));n.dispatchEvent(o)}),t.allow["top-navigation"]||n.document.addEventListener("click",e=>{"A"===e.target.nodeName&&(t.console.error(`The document is sandboxed, and the 'allow-top-navigation' keyword is not set.`),e.preventDefault())}),Reflect.setPrototypeOf(n,n.Window.prototype),{global:n,bridge:t}},Le=()=>{if(!xe){xe=ye.makeRootRealm();const e=window.document.body.lastChild;if("IFRAME"===e.nodeName&&e.contentWindow&&xe.global instanceof e.contentWindow.Object){const t=e.contentDocument;t.removeChild(t.documentElement)}}return xe.global.Realm.makeCompartment()},Ie=e=>e.replace(/\.import\(/g,`['import'](`);class Me extends window.HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this[Pe]=null,this[De]=window.document.createElement("i"),this.addEventListener("close",()=>{})}get[Symbol.toStringTag](){return"HTMLWebSandboxElement"}get name(){return this.getAttribute("name")}set name(e){this.setAttribute("name",e)}get src(){return this.getAttribute("src")}set src(e){this.setAttribute("src",e)}get srcdoc(){return this.getAttribute("srcdoc")}set srcdoc(e){this.setAttribute("srcdoc",e)}get sandbox(){return this[De].classList}set sandbox(e){this.setAttribute("sandbox",e),this[De].classList=e}get contentWindow(){return this[Pe].global}get contentDocument(){return this[Pe].global.document}evaluate(e,t={}){return e=Ie(e),this[Pe].evaluate(e,t)}connectedCallback(){let e={forms:!0,"pointer-lock":!0,popups:!0,"top-navigation":!0};const t=this.debug,o=this.getAttribute("sandbox");""===o&&(e={forms:!1,"pointer-lock":!1,popups:!1,"top-navigation":!1}),this.sandbox.forEach(t=>{e[t.replace(/^allow-/,"")]=!0});const n=Le(),{bridge:a}=ke({name:this.name,view:this,allow:e,top:window,parent:window,compartment:n,debug:t});this[Pe]=n;const r=a.constructorGenerator("HTMLWebSandboxElement",e=>({name:{get(){return e.toHostObject(this).name},set(t){e.toHostObject(this).name=`${e.name}/${t}`}},sandbox:!0,src:!0,srcdoc:!0,contentWindow:!0,contentDocument:!0,evaluate:!0}));a.constructorRegistry.define("HTMLWebSandboxElement",r),a.elementRegistry.define("web-sandbox",r),n.global.HTMLWebSandboxElement=r,this.srcdoc?(this.evaluate(this.srcdoc),this.dispatchEvent(new window.Event("load"))):this.src&&this[je]().then(()=>{this.dispatchEvent(new window.Event("load"))})}disconnectedCallback(){this.contentWindow.close()}attributeChangedCallback(e,t,o){t!==o&&(this[e]=o)}[je](){const e=new He.URL(this.src,this.baseURI).href;return He.fetch(e,{}).then(t=>{if(!t.ok)throw Error([t.status,t.statusText,e].join(", "));const o=t.headers.get("content-type");if(!o||!/^(text|application)\/(x-)?javascript(;|$)/.test(o))throw Error(o);return t.text().then(t=>{0>t.indexOf("//# sourceURL=")&&(t+=`\n//# sourceURL=${e}`),this.evaluate(t)})})}}return Reflect.defineProperty(Me,"name",{value:"HTMLWebSandboxElement"}),Reflect.defineProperty(Me.prototype,"debug",{configurable:!0,enumerable:!1,writable:!0,value:(()=>{}).toString().includes("/**/")}),window.HTMLWebSandboxElement=Me,window.customElements.define("web-sandbox",Me),N.instantiate=function(e,t){const o=new N;return o.evaluate(e,t),o},N});
//# sourceMappingURL=web-sandbox.umd.js.map