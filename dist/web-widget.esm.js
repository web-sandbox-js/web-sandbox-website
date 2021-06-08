const NOT_LOADED="NOT_LOADED",LOADING_SOURCE_CODE="LOADING_SOURCE_CODE",NOT_BOOTSTRAPPED="NOT_BOOTSTRAPPED",BOOTSTRAPPING="BOOTSTRAPPING",NOT_MOUNTED="NOT_MOUNTED",MOUNTING="MOUNTING",MOUNTED="MOUNTED",UPDATING="UPDATING",UNMOUNTING="UNMOUNTING",UNLOADING="UNLOADING",LOAD_ERROR="LOAD_ERROR",BOOTSTRAPP_ERROR="BOOTSTRAPP_ERROR",MOUNT_ERROR="MOUNT_ERROR",UPDAT_ERROR="UPDAT_ERROR",UNMOUNT_ERROR="UNMOUNT_ERROR",UNLOAD_ERROR="UNLOAD_ERROR",SKIP_BECAUSE_BROKEN="SKIP_BECAUSE_BROKEN",appendSourceUrl=(a,b)=>{const c=/(\/\/# sourceURL=)((https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?)/;return c.test(a)?a=a.replace(c,(a,c,d)=>`${c}${URL(d,b).href}`):a+=`\n//# sourceURL=${b}`,a},evaluate=(a,b,c)=>{if(b)return b.evaluate(a.toString(),c);if(!c&&"string"!=typeof a)return a;c=c||{};const d=Object.keys(c),e=Object.values(c),f=`'use strict';return eval(${JSON.stringify(a)})`;return new Function(...d,f)(...e)};function UMDParser(a,b,c={}){const{define:d,module:e,exports:f}=evaluate(()=>{const a={},b={exports:a};return{module:b,exports:a,define:a=>{b.exports="function"==typeof a?a():a}}},b)();return d.amd=!0,evaluate(a,b,{define:d,module:e,exports:f,...c}),e.exports}const scriptSourceLoader=(a,b={})=>fetch(a,{credentials:"same-origin",cache:"force-cache",...b}).then(b=>{if(!b.ok)throw Error([b.status,b.statusText,a].join(", "));const c=b.headers.get("content-type");if(!c||!/^(text|application)\/(x-)?javascript(;|$)/.test(c))throw Error(c);return b.text()}),MAP=Symbol("data");class WebWidgetPortalRegistry{constructor(){this[MAP]=new Map}get(a){return this[MAP].get(a)}define(a,b){this[MAP].set(a,b)}}class Model{constructor({children:a,container:b,debug:c,id:d,loader:e,name:f,parent:g,properties:h,rootPortalRegistry:i,sandbox:j,shadow:k,url:l,view:m}){Object.assign(this,{bootstrap:null,bootstrapPromise:null,container:b,debug:c,id:d,loader:e,loadPromise:null,mount:null,mountPromise:null,name:f,portalRegistry:new WebWidgetPortalRegistry,portals:[],properties:h,rootPortalRegistry:i,sandbox:j,shadow:k,status:NOT_LOADED,timeouts:null,unload:null,unloadPromise:null,unmount:null,unmountPromise:null,update:null,url:l,view:m}),Object.defineProperties(this,{children:{get(){return Object.freeze(a())}},parent:{get(){return g()}}}),Object.seal(this)}}function formatErrorMessage(a,b){return"object"!=typeof b&&(b=new Error(b)),b.message=`WebWidget<${a.name}> Error: ${b.message}`,b}const findCustomPortal=(a,b)=>{let c=a;do if(c=c.parent,c&&c.portalRegistry.get(b))return c.portalRegistry.get(b);while(c);return a.rootPortalRegistry.get(b)};function toProperties(a){const b=a.name;let c="function"==typeof a.properties?a.properties(b):a.properties;("object"!=typeof c||null===c||Array.isArray(c))&&(c={});const d={unmount(){return a.view.unmount()}},e={get context(){return d},get name(){return a.name},get container(){return a.container},get sandboxed(){return!!a.sandbox},customPortals:{get(){return a.customPortals.get(...arguments)},define(){return a.customPortals.define(...arguments)}},createPortal(b,c){let d;const e=findCustomPortal(a,c);if(e&&(d=e()),!d)throw formatErrorMessage(a,new Error(`The portal cannot be found: ${c}`));if(!(d instanceof HTMLWebWidgetElement))throw formatErrorMessage(a,new Error(`Portal must be an instance of "HTMLWebWidgetElement": ${c}`));a.sandbox&&!b.isConnected&&a.container.appendChild(b),b.slot||(b.slot="");const f=d.querySelector(`[slot="${b.slot}"]`);f&&d.removeChild(f),d.appendChild(b);const g=d.constructor.MODEL,h=d.mount();return a.portals.push(d[g]),{async mount(){return await h,d.mount()},async unmount(){return await h,d.unmount()}}},...c};return a.sandbox?a.sandbox.toVirtual(e):e}function smellsLikeAPromise(a){return a&&"function"==typeof a.then&&"function"==typeof a.catch}function flattenFnArray(a,b,c){let d=b[c]||(async()=>{});return d=Array.isArray(d)?d:[d],0===d.length&&(d=[()=>Promise.resolve()]),function(b){return d.reduce((c,d,e)=>c.then(()=>{const c=d(b);return smellsLikeAPromise(c)?c:Promise.reject(formatErrorMessage(a,new Error(`The lifecycle function at array index ${e} did not return a promise`)))}),Promise.resolve())}}const defaultWarningMillis=1e3,globalTimeoutConfig={bootstrap:{millis:4e3,dieOnTimeout:!1,warningMillis:1000},mount:{millis:3e3,dieOnTimeout:!1,warningMillis:1000},unmount:{millis:3e3,dieOnTimeout:!1,warningMillis:1000},unload:{millis:3e3,dieOnTimeout:!1,warningMillis:1000},update:{millis:3e3,dieOnTimeout:!1,warningMillis:1000}};function reasonableTime(a,b){return new Promise((c,d)=>{function e(b){if(!i)if(!0===b)j=!0,f.dieOnTimeout?d(formatErrorMessage(a,new Error(h))):console.error(formatErrorMessage(a,new Error(h)));else if(!j){const c=b;console.warn(formatErrorMessage(a,new Error(h))),c*g+g<f.millis&&setTimeout(()=>e(c+1),g)}}const f=a.timeouts[b],g=f.warningMillis,h=`Lifecycle function ${b} for ${a.name} lifecycle did not resolve or reject for ${f.millis} ms.`;let i=!1,j=!1;a[b](toProperties(a)).then(a=>{i=!0,c(a)}).catch(a=>{i=!0,d(a)}),setTimeout(()=>e(1),g),setTimeout(()=>e(!0),f.millis)})}function ensureValidAppTimeouts(a){const b={};for(const c in globalTimeoutConfig)b[c]={...globalTimeoutConfig[c],...(a&&a[c]||{})};return b}async function toBootstrapPromise(a){return a.bootstrapPromise?a.bootstrapPromise:a.status===NOT_BOOTSTRAPPED?(a.status=BOOTSTRAPPING,a.bootstrapPromise=reasonableTime(a,"bootstrap").then(()=>{a.status=NOT_MOUNTED}).catch(b=>{throw a.status=BOOTSTRAPP_ERROR,a.bootstrapPromise=null,formatErrorMessage(a,b)}),a.bootstrapPromise):void 0}async function toLoadPromise(a){return a.loadPromise?a.loadPromise:a.status===NOT_LOADED||a.status===LOAD_ERROR?(a.status=LOADING_SOURCE_CODE,a.loadPromise=a.loader(toProperties(a)).then((b={})=>{Object.assign(a,{bootstrap:flattenFnArray(a,b,"bootstrap"),mount:flattenFnArray(a,b,"mount"),status:NOT_BOOTSTRAPPED,timeouts:ensureValidAppTimeouts(b.timeouts),unload:flattenFnArray(a,b,"unload"),unmount:flattenFnArray(a,b,"unmount"),update:flattenFnArray(a,b,"update")})}).catch(b=>{throw a.status=LOAD_ERROR,a.loadPromise=null,formatErrorMessage(a,b)}),a.loadPromise):void 0}async function toUnmountPromise(a){if(a.unmountPromise)return a.unmountPromise;if(a.status!==MOUNTED)return;a.status=UNMOUNTING;const b=a.children,c=b.map(async a=>toUnmountPromise(a).catch(b=>(a.status=SKIP_BECAUSE_BROKEN,void console.warn(b))));return a.unmountPromise=Promise.all(c).then(()=>reasonableTime(a,"unmount").then(()=>{a.status=NOT_MOUNTED,a.mountPromise=null}).catch(b=>{throw a.status=UNMOUNT_ERROR,a.unmountPromise=null,formatErrorMessage(a,b)})),a.unmountPromise}async function toMountPromise(a){return a.mountPromise?a.mountPromise:a.status===NOT_MOUNTED?(a.mountPromise=reasonableTime(a,"mount").then(()=>{a.status=MOUNTED,a.unmountPromise=null}).catch(async b=>{throw a.status=MOUNTED,await toUnmountPromise(a),a.status=MOUNT_ERROR,a.mountPromise=null,formatErrorMessage(a,b)}),a.mountPromise):void 0}function resetModel(a){Object.assign(a,{bootstrap:null,mount:null,status:NOT_LOADED,timeouts:null,unload:null,unmount:null,update:null})}async function toUnloadPromise(a){return a.unloadPromise?a.unloadPromise:a.status===NOT_LOADED?void resetModel(a):a.status===NOT_MOUNTED||a.status===LOAD_ERROR?(a.unloadPromise=a.status===LOAD_ERROR?Promise.resolve(a):reasonableTime(a,"unload"),a.status=UNLOADING,a.unloadPromise.then(()=>{resetModel(a)}).catch(b=>{throw a.status=UNLOAD_ERROR,formatErrorMessage(a,b)})):void 0}async function toUpdatePromise(a){if(a.status!==MOUNTED)throw formatErrorMessage(a,new Error(`Cannot update: Not mounted: ${a.name}`));return a.status=UPDATING,reasonableTime(a,"update").then(()=>{a.status=MOUNTED}).catch(b=>{throw a.status=UPDAT_ERROR,formatErrorMessage(a,b)})}let promise;const queueMicrotask="function"==typeof window.queueMicrotask?window.queueMicrotask.bind(window):a=>(promise||(promise=Promise.resolve())).then(a).catch(a=>setTimeout(()=>{throw a},0)),FIRST_CONNECTED=Symbol("first-connect"),MOVEING=Symbol("moveing");class HTMLWebSandboxBaseInterface extends HTMLElement{constructor(){if(super(),"function"!=typeof this.lifecycleCallback)throw new Error("Must implement interface: lifecycleCallback")}get name(){return this.getAttribute("name")||""}set name(a){this.setAttribute("name",a)}get src(){const a=this.getAttribute("src");return null===a?"":new URL(a,this.baseURI).href}set src(a){this.setAttribute("src",a)}get text(){return this.getAttribute("text")||""}set text(a){this.setAttribute("text",a)}connectedCallback(){this.lifecycleCallback("connected"),this[FIRST_CONNECTED]?this[MOVEING]&&this.lifecycleCallback("moved"):(this.lifecycleCallback("firstConnected"),this[FIRST_CONNECTED]=!0)}disconnectedCallback(){this[MOVEING]=!0,this.lifecycleCallback("disconnected"),queueMicrotask(()=>{this.isConnected||(this[MOVEING]=!1,this.lifecycleCallback("destroyed"))})}attributeChangedCallback(){this.lifecycleCallback("attributeChanged",...arguments)}adoptedCallback(){this.lifecycleCallback("adopted",...arguments)}}window.HTMLWebSandboxBaseInterface=HTMLWebSandboxBaseInterface;const HTMLWebSandboxElement=window.HTMLWebSandboxElement||HTMLWebSandboxBaseInterface,rootPortalRegistry=new WebWidgetPortalRegistry,AUTOLOAD_DISABLED=HTMLWebSandboxElement.HTMLWebSandboxElement,SANDBOX_INSTANCE=HTMLWebSandboxElement.SANDBOX_INSTANCE,CONFIG=Symbol("config"),PARSER=Symbol("parser"),MODEL=Symbol("model"),APPLICATION=Symbol("application"),RESOURCE_LOAD_EVENT=Symbol("resourceLoaded"),ATTRIBUTE_CHANGED_IGNORE=Symbol("attributeChangedIgnore"),getProperty=(a,b)=>{const c=a[CONFIG]||{};return c[b]||a[b]},isActive=a=>!getProperty(a,"inactive"),isResourceReady=a=>a.isConnected&&(getProperty(a,"src")||getProperty(a,"application")||getProperty(a,"text")),isAutoLoad=a=>isActive(a)&&isResourceReady(a),toLoader=(a,b,c)=>{let d=a;if("string"==typeof a){const e=a,f=()=>scriptSourceLoader(e).then(a=>{const d=c(appendSourceUrl(a,e),b);return d});f.url=e,d=f}else"function"!=typeof a&&(d=()=>Promise.resolve(a));return(...a)=>d(...a).then(a=>("string"==typeof a&&(a=c(a,b)),a))},getParentWebWidgetElement=a=>{let b=a;do if(b=b.getRootNode().host,b&&b[MODEL])return b;while(b);return null},getChildWebWidgetElements=a=>{const b=[],c=[...a.children];for(;c.length;){const a=c.pop();a[MODEL]?b.push(a):c.unshift(...a.children)}return b},getParentModel=a=>{const b=getParentWebWidgetElement(a);return b?b[MODEL]:null},getChildModels=a=>{const b=a[MODEL],c=b.shadow,d=[...getChildWebWidgetElements(a),...getChildWebWidgetElements(c)],e=d.map(a=>a[MODEL]);return e.push(...b.portals),e},getDataset=a=>{const b={},c=a.getAttribute("include-data");if(c){const d=c&&a.ownerDocument.getElementById(c),e=d&&d.textContent;e&&Object.assign(b,JSON.parse(e))}return Object.assign(b,a.dataset),b},tryAutoLoad=async a=>{isAutoLoad(a)&&(isActive(a)?a.mount():a.unmount())},createWebWidget=a=>{if(a[MODEL])return a[MODEL];if(!isResourceReady(a))throw new Error("Resources are not yet ready");let b,c;const d=getProperty(a,"src"),e=getProperty(a,"text"),f=getProperty(a,"application"),g=getProperty(a,"debug"),h=getProperty(a,PARSER)||UMDParser,i=a.id,j=a.name,k=a[SANDBOX_INSTANCE],l=d||f.url,m=getDataset(a);if(k){const a=k.global.document,d=a.createElement("style");d.textContent=`body{margin:0}`,a.head.appendChild(d),b=k.global.document.body,c=k.toNative(k.global.document)}else b=c=a.attachShadow({mode:"closed"});const n=toLoader(d||f||(async()=>e),k,h);return a[MODEL]=new Model({children:()=>getChildModels(a),container:b,debug:g,id:i,loader:n,name:j||(f?f.name:a.localName),parent:()=>getParentModel(a),properties:{data:m},rootPortalRegistry,sandbox:k,shadow:c,url:l,view:a}),a[MODEL]};class HTMLWebWidgetElement$1 extends HTMLWebSandboxElement{constructor(){super(),AUTOLOAD_DISABLED&&(this[AUTOLOAD_DISABLED]=!0)}get application(){return this[APPLICATION]||null}set application(a){this[APPLICATION]=a,tryAutoLoad(this)}get inactive(){return null!==this.getAttribute("inactive")}set inactive(a){return a?this.setAttribute("inactive",""):this.removeAttribute("inactive")}get importance(){return this.getAttribute("importance")||""}set importance(a){this.setAttribute("importance",a)}get loading(){return this.getAttribute("loading")||""}set loading(a){this.setAttribute("loading",a)}get sandboxed(){return null!==this.getAttribute("sandboxed")}set sandboxed(a){return a?this.setAttribute("sandboxed",""):this.removeAttribute("sandboxed")}get status(){return this[MODEL]?this[MODEL].status:NOT_LOADED}static get portals(){return rootPortalRegistry}async load(){createWebWidget(this);const a=toLoadPromise(this[MODEL]);return this.src&&!this[RESOURCE_LOAD_EVENT]&&(this[RESOURCE_LOAD_EVENT]=!0,a.then(()=>{this.dispatchEvent(new Event("load"))},()=>{this.dispatchEvent(new Event("error"))})),a}async bootstrap(){await this.load(),await toBootstrapPromise(this[MODEL])}async mount(){await this.bootstrap(),await toMountPromise(this[MODEL]),this[ATTRIBUTE_CHANGED_IGNORE]=!0,this.removeAttribute("inactive"),this[ATTRIBUTE_CHANGED_IGNORE]=!1}async update(a){if(!this[MODEL])throw new Error("Not initialized");this[MODEL].properties=a,await toUpdatePromise(this[MODEL])}async unmount(){this[MODEL]&&(await toUnmountPromise(this[MODEL]),this[ATTRIBUTE_CHANGED_IGNORE]=!0,this.setAttribute("inactive",""),this[ATTRIBUTE_CHANGED_IGNORE]=!1)}async unload(){this[MODEL]&&(await this.unmount(),await toUnloadPromise(this[MODEL]))}lifecycleCallback(a,...b){let c;switch(a){case"firstConnected":if(c=getParentModel(this),c){const a=!!c.sandbox;a&&(this.sandboxed=a)}if(this.sandboxed){if("function"!=typeof super.evaluate)throw new Error(`"window.HTMLWebSandboxElement" is required to run the sandbox`);super.lifecycleCallback(...arguments)}tryAutoLoad(this);break;case"destroyed":this.sandboxed&&super.lifecycleCallback(...arguments),this.unload();break;case"attributeChanged":if(this[ATTRIBUTE_CHANGED_IGNORE])break;switch(this.sandboxed&&super.lifecycleCallback(...arguments),b[0]){case"text":case"src":case"inactive":tryAutoLoad(this);}}}static get observedAttributes(){return["src","text","inactive"]}}Object.assign(HTMLWebWidgetElement$1,{CONFIG,PARSER,MODEL}),Object.assign(HTMLWebWidgetElement$1,{NOT_LOADED:"NOT_LOADED",LOADING_SOURCE_CODE,NOT_BOOTSTRAPPED,BOOTSTRAPPING,NOT_MOUNTED,MOUNTING,MOUNTED,UPDATING,UNMOUNTING,UNLOADING,LOAD_ERROR,BOOTSTRAPP_ERROR,MOUNT_ERROR,UPDAT_ERROR,UNMOUNT_ERROR,UNLOAD_ERROR,SKIP_BECAUSE_BROKEN}),window.WebWidget=HTMLWebWidgetElement$1,window.HTMLWebWidgetElement=HTMLWebWidgetElement$1,customElements.define("web-widget",HTMLWebWidgetElement$1);export default HTMLWebWidgetElement$1;
//# sourceMappingURL=web-widget.esm.js.map