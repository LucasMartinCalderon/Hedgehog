(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[29],{7365:function(e,t,r){"use strict";r.d(t,{$s:function(){return m},L:function(){return l},LL:function(){return h},ZR:function(){return f},eu:function(){return d},hl:function(){return u},m9:function(){return b},ru:function(){return c},zI:function(){return p}}),r(2040);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let a=function(e){let t=[],r=0;for(let a=0;a<e.length;a++){let n=e.charCodeAt(a);n<128?t[r++]=n:n<2048?(t[r++]=n>>6|192,t[r++]=63&n|128):(64512&n)==55296&&a+1<e.length&&(64512&e.charCodeAt(a+1))==56320?(n=65536+((1023&n)<<10)+(1023&e.charCodeAt(++a)),t[r++]=n>>18|240,t[r++]=n>>12&63|128,t[r++]=n>>6&63|128,t[r++]=63&n|128):(t[r++]=n>>12|224,t[r++]=n>>6&63|128,t[r++]=63&n|128)}return t},n=function(e){let t=[],r=0,a=0;for(;r<e.length;){let n=e[r++];if(n<128)t[a++]=String.fromCharCode(n);else if(n>191&&n<224){let i=e[r++];t[a++]=String.fromCharCode((31&n)<<6|63&i)}else if(n>239&&n<365){let i=e[r++],o=e[r++],s=e[r++],l=((7&n)<<18|(63&i)<<12|(63&o)<<6|63&s)-65536;t[a++]=String.fromCharCode(55296+(l>>10)),t[a++]=String.fromCharCode(56320+(1023&l))}else{let i=e[r++],o=e[r++];t[a++]=String.fromCharCode((15&n)<<12|(63&i)<<6|63&o)}}return t.join("")},i={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,a=[];for(let t=0;t<e.length;t+=3){let n=e[t],i=t+1<e.length,o=i?e[t+1]:0,s=t+2<e.length,l=s?e[t+2]:0,c=n>>2,u=(3&n)<<4|o>>4,d=(15&o)<<2|l>>6,p=63&l;s||(p=64,i||(d=64)),a.push(r[c],r[u],r[d],r[p])}return a.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(a(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):n(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let r=t?this.charToByteMapWebSafe_:this.charToByteMap_,a=[];for(let t=0;t<e.length;){let n=r[e.charAt(t++)],i=t<e.length,s=i?r[e.charAt(t)]:0;++t;let l=t<e.length,c=l?r[e.charAt(t)]:64;++t;let u=t<e.length,d=u?r[e.charAt(t)]:64;if(++t,null==n||null==s||null==c||null==d)throw new o;let p=n<<2|s>>4;if(a.push(p),64!==c){let e=s<<4&240|c>>2;if(a.push(e),64!==d){let e=c<<6&192|d;a.push(e)}}}return a},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class o extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}let s=function(e){let t=a(e);return i.encodeByteArray(t,!0)},l=function(e){return s(e).replace(/\./g,"")};function c(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function u(){try{return"object"==typeof indexedDB}catch(e){return!1}}function d(){return new Promise((e,t)=>{try{let r=!0,a="validate-browser-context-for-indexeddb-analytics-module",n=self.indexedDB.open(a);n.onsuccess=()=>{n.result.close(),r||self.indexedDB.deleteDatabase(a),e(!0)},n.onupgradeneeded=()=>{r=!1},n.onerror=()=>{var e;t((null===(e=n.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})}function p(){return"undefined"!=typeof navigator&&!!navigator.cookieEnabled}class f extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,f.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,h.prototype.create)}}class h{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},a=`${this.service}/${e}`,n=this.errors[e],i=n?n.replace(g,(e,t)=>{let a=r[t];return null!=a?String(a):`<${t}?>`}):"Error",o=`${this.serviceName}: ${i} (${a}).`,s=new f(a,o,r);return s}}let g=/\{\$([^}]+)}/g;function m(e,t=1e3,r=2){let a=t*Math.pow(r,e);return Math.min(144e5,a+Math.round(.5*a*(Math.random()-.5)*2))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(e){return e&&e._delegate?e._delegate:e}},1007:function(e,t,r){"use strict";r.d(t,{Z:function(){return I}});var a=r(6750),n=r(431),i=r(6006),o=r(9791),s=r(7562),l=r(5457),c=r(8006),u=r(8473),d=r(5991),p=r(8539),f=r(3809);function h(e){return(0,f.Z)("MuiAppBar",e)}(0,p.Z)("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent"]);var g=r(9268);let m=["className","color","enableColorOnDark","position"],b=e=>{let{color:t,position:r,classes:a}=e,n={root:["root",`color${(0,u.Z)(t)}`,`position${(0,u.Z)(r)}`]};return(0,s.Z)(n,h,a)},w=(e,t)=>e?`${null==e?void 0:e.replace(")","")}, ${t})`:t,v=(0,l.ZP)(d.Z,{name:"MuiAppBar",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`position${(0,u.Z)(r.position)}`],t[`color${(0,u.Z)(r.color)}`]]}})(({theme:e,ownerState:t})=>{let r="light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[900];return(0,n.Z)({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},"fixed"===t.position&&{position:"fixed",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},"absolute"===t.position&&{position:"absolute",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0},"sticky"===t.position&&{position:"sticky",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0},"static"===t.position&&{position:"static"},"relative"===t.position&&{position:"relative"},!e.vars&&(0,n.Z)({},"default"===t.color&&{backgroundColor:r,color:e.palette.getContrastText(r)},t.color&&"default"!==t.color&&"inherit"!==t.color&&"transparent"!==t.color&&{backgroundColor:e.palette[t.color].main,color:e.palette[t.color].contrastText},"inherit"===t.color&&{color:"inherit"},"dark"===e.palette.mode&&!t.enableColorOnDark&&{backgroundColor:null,color:null},"transparent"===t.color&&(0,n.Z)({backgroundColor:"transparent",color:"inherit"},"dark"===e.palette.mode&&{backgroundImage:"none"})),e.vars&&(0,n.Z)({},"default"===t.color&&{"--AppBar-background":t.enableColorOnDark?e.vars.palette.AppBar.defaultBg:w(e.vars.palette.AppBar.darkBg,e.vars.palette.AppBar.defaultBg),"--AppBar-color":t.enableColorOnDark?e.vars.palette.text.primary:w(e.vars.palette.AppBar.darkColor,e.vars.palette.text.primary)},t.color&&!t.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":t.enableColorOnDark?e.vars.palette[t.color].main:w(e.vars.palette.AppBar.darkBg,e.vars.palette[t.color].main),"--AppBar-color":t.enableColorOnDark?e.vars.palette[t.color].contrastText:w(e.vars.palette.AppBar.darkColor,e.vars.palette[t.color].contrastText)},{backgroundColor:"var(--AppBar-background)",color:"inherit"===t.color?"inherit":"var(--AppBar-color)"},"transparent"===t.color&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))}),y=i.forwardRef(function(e,t){let r=(0,c.Z)({props:e,name:"MuiAppBar"}),{className:i,color:s="primary",enableColorOnDark:l=!1,position:u="fixed"}=r,d=(0,a.Z)(r,m),p=(0,n.Z)({},r,{color:s,position:u,enableColorOnDark:l}),f=b(p);return(0,g.jsx)(v,(0,n.Z)({square:!0,component:"header",ownerState:p,elevation:4,className:(0,o.Z)(f.root,i,"fixed"===u&&"mui-fixed"),ref:t},d))});var I=y},1771:function(e,t,r){"use strict";r.d(t,{Z:function(){return w}});var a=r(431),n=r(6750),i=r(6006),o=r(9791),s=r(4323),l=r(1579),c=r(6601),u=r(5887),d=r(9268);let p=["className","component"];var f=r(7327),h=r(5287),g=r(6356);let m=(0,h.Z)(),b=function(e={}){let{themeId:t,defaultTheme:r,defaultClassName:f="MuiBox-root",generateClassName:h}=e,g=(0,s.ZP)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(l.Z),m=i.forwardRef(function(e,i){let s=(0,u.Z)(r),l=(0,c.Z)(e),{className:m,component:b="div"}=l,w=(0,n.Z)(l,p);return(0,d.jsx)(g,(0,a.Z)({as:b,ref:i,className:(0,o.Z)(m,h?h(f):f),theme:t&&s[t]||s},w))});return m}({themeId:g.Z,defaultTheme:m,defaultClassName:"MuiBox-root",generateClassName:f.Z.generate});var w=b},2618:function(e,t,r){"use strict";r.d(t,{Z:function(){return S}});var a=r(6750),n=r(431),i=r(6006),o=r(9791),s=r(8451),l=r(3809),c=r(7562),u=r(6292),d=r(6263),p=r(1153),f=r(9268);let h=["className","component","disableGutters","fixed","maxWidth","classes"],g=(0,p.Z)(),m=(0,d.Z)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`maxWidth${(0,s.Z)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),b=e=>(0,u.Z)({props:e,name:"MuiContainer",defaultTheme:g}),w=(e,t)=>{let{classes:r,fixed:a,disableGutters:n,maxWidth:i}=e,o={root:["root",i&&`maxWidth${(0,s.Z)(String(i))}`,a&&"fixed",n&&"disableGutters"]};return(0,c.Z)(o,e=>(0,l.Z)(t,e),r)};var v=r(8473),y=r(5457),I=r(8006);let E=function(e={}){let{createStyledComponent:t=m,useThemeProps:r=b,componentName:s="MuiContainer"}=e,l=t(({theme:e,ownerState:t})=>(0,n.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}}),({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce((t,r)=>{let a=e.breakpoints.values[r];return 0!==a&&(t[e.breakpoints.up(r)]={maxWidth:`${a}${e.breakpoints.unit}`}),t},{}),({theme:e,ownerState:t})=>(0,n.Z)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}})),c=i.forwardRef(function(e,t){let i=r(e),{className:c,component:u="div",disableGutters:d=!1,fixed:p=!1,maxWidth:g="lg"}=i,m=(0,a.Z)(i,h),b=(0,n.Z)({},i,{component:u,disableGutters:d,fixed:p,maxWidth:g}),v=w(b,s);return(0,f.jsx)(l,(0,n.Z)({as:u,ownerState:b,className:(0,o.Z)(v.root,c),ref:t},m))});return c}({createStyledComponent:(0,y.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`maxWidth${(0,v.Z)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,I.Z)({props:e,name:"MuiContainer"})});var S=E},1947:function(e,t,r){"use strict";r.d(t,{Z:function(){return v}});var a=r(431),n=r(6750),i=r(6006);let o=i.createContext(null);function s(){let e=i.useContext(o);return e}let l="function"==typeof Symbol&&Symbol.for;var c=l?Symbol.for("mui.nested"):"__THEME_NESTED__",u=r(9268),d=function(e){let{children:t,theme:r}=e,a=s(),n=i.useMemo(()=>{let e=null===a?r:function(e,t){if("function"==typeof t){let r=t(e);return r}return{...e,...t}}(a,r);return null!=e&&(e[c]=null!==a),e},[r,a]);return(0,u.jsx)(o.Provider,{value:n,children:t})},p=r(7464),f=r(5396);let h={};function g(e,t,r,n=!1){return i.useMemo(()=>{let i=e&&t[e]||t;if("function"==typeof r){let o=r(i),s=e?(0,a.Z)({},t,{[e]:o}):o;return n?()=>s:s}return e?(0,a.Z)({},t,{[e]:r}):(0,a.Z)({},t,r)},[e,t,r,n])}var m=function(e){let{children:t,theme:r,themeId:a}=e,n=(0,f.Z)(h),i=s()||h,o=g(a,n,r),l=g(a,i,r,!0);return(0,u.jsx)(d,{theme:l,children:(0,u.jsx)(p.T.Provider,{value:o,children:t})})},b=r(6356);let w=["theme"];function v(e){let{theme:t}=e,r=(0,n.Z)(e,w),i=t[b.Z];return(0,u.jsx)(m,(0,a.Z)({},r,{themeId:i?b.Z:void 0,theme:i||t}))}},2040:function(e,t,r){"use strict";var a,n;e.exports=(null==(a=r.g.process)?void 0:a.env)&&"object"==typeof(null==(n=r.g.process)?void 0:n.env)?r.g.process:r(6003)},6003:function(e){!function(){var t={229:function(e){var t,r,a,n=e.exports={};function i(){throw Error("setTimeout has not been defined")}function o(){throw Error("clearTimeout has not been defined")}function s(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:i}catch(e){t=i}try{r="function"==typeof clearTimeout?clearTimeout:o}catch(e){r=o}}();var l=[],c=!1,u=-1;function d(){c&&a&&(c=!1,a.length?l=a.concat(l):u=-1,l.length&&p())}function p(){if(!c){var e=s(d);c=!0;for(var t=l.length;t;){for(a=l,l=[];++u<t;)a&&a[u].run();u=-1,t=l.length}a=null,c=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===o||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function h(){}n.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];l.push(new f(e,t)),1!==l.length||c||s(p)},f.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=h,n.addListener=h,n.once=h,n.off=h,n.removeListener=h,n.removeAllListeners=h,n.emit=h,n.prependListener=h,n.prependOnceListener=h,n.listeners=function(e){return[]},n.binding=function(e){throw Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(e){throw Error("process.chdir is not supported")},n.umask=function(){return 0}}},r={};function a(e){var n=r[e];if(void 0!==n)return n.exports;var i=r[e]={exports:{}},o=!0;try{t[e](i,i.exports,a),o=!1}finally{o&&delete r[e]}return i.exports}a.ab="//";var n=a(229);e.exports=n}()},5568:function(e,t,r){"use strict";let a,n;r.d(t,{qX:function(){return B},Xd:function(){return _},KN:function(){return L}});var i,o=r(8341),s=r(4794),l=r(7365);let c=(e,t)=>t.some(t=>e instanceof t),u=new WeakMap,d=new WeakMap,p=new WeakMap,f=new WeakMap,h=new WeakMap,g={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return d.get(e);if("objectStoreNames"===t)return e.objectStoreNames||p.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return m(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function m(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,r)=>{let a=()=>{e.removeEventListener("success",n),e.removeEventListener("error",i)},n=()=>{t(m(e.result)),a()},i=()=>{r(e.error),a()};e.addEventListener("success",n),e.addEventListener("error",i)});return t.then(t=>{t instanceof IDBCursor&&u.set(t,e)}).catch(()=>{}),h.set(t,e),t}(e);if(f.has(e))return f.get(e);let r="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(n||(n=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(b(this),e),m(u.get(this))}:function(...e){return m(t.apply(b(this),e))}:function(e,...r){let a=t.call(b(this),e,...r);return p.set(a,e.sort?e.sort():[e]),m(a)}:(t instanceof IDBTransaction&&function(e){if(d.has(e))return;let t=new Promise((t,r)=>{let a=()=>{e.removeEventListener("complete",n),e.removeEventListener("error",i),e.removeEventListener("abort",i)},n=()=>{t(),a()},i=()=>{r(e.error||new DOMException("AbortError","AbortError")),a()};e.addEventListener("complete",n),e.addEventListener("error",i),e.addEventListener("abort",i)});d.set(e,t)}(t),c(t,a||(a=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,g):t;return r!==e&&(f.set(e,r),h.set(r,e)),r}let b=e=>h.get(e),w=["get","getKey","getAll","getAllKeys","count"],v=["put","add","delete","clear"],y=new Map;function I(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(y.get(t))return y.get(t);let r=t.replace(/FromIndex$/,""),a=t!==r,n=v.includes(r);if(!(r in(a?IDBIndex:IDBObjectStore).prototype)||!(n||w.includes(r)))return;let i=async function(e,...t){let i=this.transaction(e,n?"readwrite":"readonly"),o=i.store;return a&&(o=o.index(t.shift())),(await Promise.all([o[r](...t),n&&i.done]))[0]};return y.set(t,i),i}g={...i=g,get:(e,t,r)=>I(e,t)||i.get(e,t,r),has:(e,t)=>!!I(e,t)||i.has(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e){this.container=e}getPlatformInfoString(){let e=this.container.getProviders();return e.map(e=>{if(!function(e){let t=e.getComponent();return(null==t?void 0:t.type)==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}let S="@firebase/app",D="0.9.13",C=new s.Yd("@firebase/app"),T={[S]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},x=new Map,A=new Map;function _(e){let t=e.name;if(A.has(t))return C.debug(`There were multiple attempts to register component ${t}.`),!1;for(let r of(A.set(t,e),x.values()))!function(e,t){try{e.container.addComponent(t)}catch(r){C.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,r)}}(r,e);return!0}function B(e,t){let r=e.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),e.container.getProvider(t)}let k=new l.LL("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});function L(e,t,r){var a;let n=null!==(a=T[e])&&void 0!==a?a:e;r&&(n+=`-${r}`);let i=n.match(/\s|\//),s=t.match(/\s|\//);if(i||s){let e=[`Unable to register library "${n}" with version "${t}":`];i&&e.push(`library name "${n}" contains illegal characters (whitespace or "/")`),i&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),C.warn(e.join(" "));return}_(new o.wA(`${n}-version`,()=>({library:n,version:t}),"VERSION"))}let M="firebase-heartbeat-store",$=null;function N(){return $||($=(function(e,t,{blocked:r,upgrade:a,blocking:n,terminated:i}={}){let o=indexedDB.open(e,1),s=m(o);return a&&o.addEventListener("upgradeneeded",e=>{a(m(o.result),e.oldVersion,e.newVersion,m(o.transaction),e)}),r&&o.addEventListener("blocked",e=>r(e.oldVersion,e.newVersion,e)),s.then(e=>{i&&e.addEventListener("close",()=>i()),n&&e.addEventListener("versionchange",e=>n(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s})("firebase-heartbeat-database",0,{upgrade:(e,t)=>{0===t&&e.createObjectStore(M)}}).catch(e=>{throw k.create("idb-open",{originalErrorMessage:e.message})})),$}async function O(e){try{let t=await N(),r=await t.transaction(M).objectStore(M).get(P(e));return r}catch(e){if(e instanceof l.ZR)C.warn(e.message);else{let t=k.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});C.warn(t.message)}}}async function j(e,t){try{let r=await N(),a=r.transaction(M,"readwrite"),n=a.objectStore(M);await n.put(t,P(e)),await a.done}catch(e){if(e instanceof l.ZR)C.warn(e.message);else{let t=k.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});C.warn(t.message)}}}function P(e){return`${e.name}!${e.options.appId}`}class R{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new F(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){let e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),r=Z();return(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{let t=new Date(e.date).valueOf(),r=Date.now();return r-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache))}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";let e=Z(),{heartbeatsToSend:t,unsentEntries:r}=function(e,t=1024){let r=[],a=e.slice();for(let n of e){let e=r.find(e=>e.agent===n.agent);if(e){if(e.dates.push(n.date),H(r)>t){e.dates.pop();break}}else if(r.push({agent:n.agent,dates:[n.date]}),H(r)>t){r.pop();break}a=a.slice(1)}return{heartbeatsToSend:r,unsentEntries:a}}(this._heartbeatsCache.heartbeats),a=(0,l.L)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}}function Z(){let e=new Date;return e.toISOString().substring(0,10)}class F{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,l.hl)()&&(0,l.eu)().then(()=>!0).catch(()=>!1)}async read(){let e=await this._canUseIndexedDBPromise;if(!e)return{heartbeats:[]};{let e=await O(this.app);return e||{heartbeats:[]}}}async overwrite(e){var t;let r=await this._canUseIndexedDBPromise;if(r){let r=await this.read();return j(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;let r=await this._canUseIndexedDBPromise;if(r){let r=await this.read();return j(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}}}function H(e){return(0,l.L)(JSON.stringify({version:2,heartbeats:e})).length}_(new o.wA("platform-logger",e=>new E(e),"PRIVATE")),_(new o.wA("heartbeat",e=>new R(e),"PRIVATE")),L(S,D,""),L(S,D,"esm2017"),L("fire-js","")},8341:function(e,t,r){"use strict";r.d(t,{wA:function(){return a}}),r(7365);class a{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}},4794:function(e,t,r){"use strict";var a,n;r.d(t,{Yd:function(){return u}});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let i=[];(n=a||(a={}))[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT";let o={debug:a.DEBUG,verbose:a.VERBOSE,info:a.INFO,warn:a.WARN,error:a.ERROR,silent:a.SILENT},s=a.INFO,l={[a.DEBUG]:"log",[a.VERBOSE]:"log",[a.INFO]:"info",[a.WARN]:"warn",[a.ERROR]:"error"},c=(e,t,...r)=>{if(t<e.logLevel)return;let a=new Date().toISOString(),n=l[t];if(n)console[n](`[${a}]  ${e.name}:`,...r);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class u{constructor(e){this.name=e,this._logLevel=s,this._logHandler=c,this._userLogHandler=null,i.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in a))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?o[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,a.DEBUG,...e),this._logHandler(this,a.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,a.VERBOSE,...e),this._logHandler(this,a.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,a.INFO,...e),this._logHandler(this,a.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,a.WARN,...e),this._logHandler(this,a.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,a.ERROR,...e),this._logHandler(this,a.ERROR,...e)}}},3380:function(e,t,r){"use strict";let a,n,i,o,s,l;var c,u=r(5568),d=r(4794),p=r(7365),f=r(8341);let h=(e,t)=>t.some(t=>e instanceof t),g=new WeakMap,m=new WeakMap,b=new WeakMap,w=new WeakMap,v=new WeakMap,y={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return m.get(e);if("objectStoreNames"===t)return e.objectStoreNames||b.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return I(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function I(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,r)=>{let a=()=>{e.removeEventListener("success",n),e.removeEventListener("error",i)},n=()=>{t(I(e.result)),a()},i=()=>{r(e.error),a()};e.addEventListener("success",n),e.addEventListener("error",i)});return t.then(t=>{t instanceof IDBCursor&&g.set(t,e)}).catch(()=>{}),v.set(t,e),t}(e);if(w.has(e))return w.get(e);let r="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(n||(n=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(E(this),e),I(g.get(this))}:function(...e){return I(t.apply(E(this),e))}:function(e,...r){let a=t.call(E(this),e,...r);return b.set(a,e.sort?e.sort():[e]),I(a)}:(t instanceof IDBTransaction&&function(e){if(m.has(e))return;let t=new Promise((t,r)=>{let a=()=>{e.removeEventListener("complete",n),e.removeEventListener("error",i),e.removeEventListener("abort",i)},n=()=>{t(),a()},i=()=>{r(e.error||new DOMException("AbortError","AbortError")),a()};e.addEventListener("complete",n),e.addEventListener("error",i),e.addEventListener("abort",i)});m.set(e,t)}(t),h(t,a||(a=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,y):t;return r!==e&&(w.set(e,r),v.set(r,e)),r}let E=e=>v.get(e),S=["get","getKey","getAll","getAllKeys","count"],D=["put","add","delete","clear"],C=new Map;function T(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(C.get(t))return C.get(t);let r=t.replace(/FromIndex$/,""),a=t!==r,n=D.includes(r);if(!(r in(a?IDBIndex:IDBObjectStore).prototype)||!(n||S.includes(r)))return;let i=async function(e,...t){let i=this.transaction(e,n?"readwrite":"readonly"),o=i.store;return a&&(o=o.index(t.shift())),(await Promise.all([o[r](...t),n&&i.done]))[0]};return C.set(t,i),i}y={...c=y,get:(e,t,r)=>T(e,t)||c.get(e,t,r),has:(e,t)=>!!T(e,t)||c.has(e,t)};let x="@firebase/installations",A="0.6.4",_=`w:${A}`,B="FIS_v2",k=new p.LL("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function L(e){return e instanceof p.ZR&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function $(e){return{token:e.token,requestStatus:2,expiresIn:Number(e.expiresIn.replace("s","000")),creationTime:Date.now()}}async function N(e,t){let r=await t.json(),a=r.error;return k.create("request-failed",{requestName:e,serverCode:a.code,serverMessage:a.message,serverStatus:a.status})}function O({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function j(e){let t=await e();return t.status>=500&&t.status<600?e():t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function P({appConfig:e,heartbeatServiceProvider:t},{fid:r}){let a=M(e),n=O(e),i=t.getImmediate({optional:!0});if(i){let e=await i.getHeartbeatsHeader();e&&n.append("x-firebase-client",e)}let o={fid:r,authVersion:B,appId:e.appId,sdkVersion:_},s={method:"POST",headers:n,body:JSON.stringify(o)},l=await j(()=>fetch(a,s));if(l.ok){let e=await l.json(),t={fid:e.fid||r,registrationStatus:2,refreshToken:e.refreshToken,authToken:$(e.authToken)};return t}throw await N("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Z=/^[cdef][\w-]{21}$/;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let H=new Map;function W(e,t){let r=F(e);V(r,t),function(e,t){let r=(!q&&"BroadcastChannel"in self&&((q=new BroadcastChannel("[Firebase] FID Change")).onmessage=e=>{V(e.data.key,e.data.fid)}),q);r&&r.postMessage({key:e,fid:t}),0===H.size&&q&&(q.close(),q=null)}(r,t)}function V(e,t){let r=H.get(e);if(r)for(let e of r)e(t)}let q=null,z="firebase-installations-store",U=null;function K(){return U||(U=function(e,t,{blocked:r,upgrade:a,blocking:n,terminated:i}={}){let o=indexedDB.open(e,1),s=I(o);return a&&o.addEventListener("upgradeneeded",e=>{a(I(o.result),e.oldVersion,e.newVersion,I(o.transaction))}),r&&o.addEventListener("blocked",()=>r()),s.then(e=>{i&&e.addEventListener("close",()=>i()),n&&e.addEventListener("versionchange",()=>n())}).catch(()=>{}),s}("firebase-installations-database",0,{upgrade:(e,t)=>{0===t&&e.createObjectStore(z)}})),U}async function G(e,t){let r=F(e),a=await K(),n=a.transaction(z,"readwrite"),i=n.objectStore(z),o=await i.get(r);return await i.put(t,r),await n.done,o&&o.fid===t.fid||W(e,t.fid),t}async function X(e){let t=F(e),r=await K(),a=r.transaction(z,"readwrite");await a.objectStore(z).delete(t),await a.done}async function J(e,t){let r=F(e),a=await K(),n=a.transaction(z,"readwrite"),i=n.objectStore(z),o=await i.get(r),s=t(o);return void 0===s?await i.delete(r):await i.put(s,r),await n.done,s&&(!o||o.fid!==s.fid)&&W(e,s.fid),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Y(e){let t;let r=await J(e.appConfig,r=>{let a=function(e){let t=e||{fid:function(){try{let e=new Uint8Array(17),t=self.crypto||self.msCrypto;t.getRandomValues(e),e[0]=112+e[0]%16;let r=function(e){let t=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t=btoa(String.fromCharCode(...e));return t.replace(/\+/g,"-").replace(/\//g,"_")}(e);return t.substr(0,22)}(e);return Z.test(r)?r:""}catch(e){return""}}(),registrationStatus:0};return er(t)}(r),n=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){let e=Promise.reject(k.create("app-offline"));return{installationEntry:t,registrationPromise:e}}let r={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},a=Q(e,r);return{installationEntry:r,registrationPromise:a}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:ee(e)}:{installationEntry:t}}(e,a);return t=n.registrationPromise,n.installationEntry});return""===r.fid?{installationEntry:await t}:{installationEntry:r,registrationPromise:t}}async function Q(e,t){try{let r=await P(e,t);return G(e.appConfig,r)}catch(r){throw L(r)&&409===r.customData.serverCode?await X(e.appConfig):await G(e.appConfig,{fid:t.fid,registrationStatus:0}),r}}async function ee(e){let t=await et(e.appConfig);for(;1===t.registrationStatus;)await R(100),t=await et(e.appConfig);if(0===t.registrationStatus){let{installationEntry:t,registrationPromise:r}=await Y(e);return r||t}return t}function et(e){return J(e,e=>{if(!e)throw k.create("installation-not-found");return er(e)})}function er(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ea({appConfig:e,heartbeatServiceProvider:t},r){let a=function(e,{fid:t}){return`${M(e)}/${t}/authTokens:generate`}(e,r),n=function(e,{refreshToken:t}){let r=O(e);return r.append("Authorization",`${B} ${t}`),r}(e,r),i=t.getImmediate({optional:!0});if(i){let e=await i.getHeartbeatsHeader();e&&n.append("x-firebase-client",e)}let o={installation:{sdkVersion:_,appId:e.appId}},s={method:"POST",headers:n,body:JSON.stringify(o)},l=await j(()=>fetch(a,s));if(l.ok){let e=await l.json(),t=$(e);return t}throw await N("Generate Auth Token",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function en(e,t=!1){let r;let a=await J(e.appConfig,a=>{var n;if(!el(a))throw k.create("not-registered");let i=a.authToken;if(!t&&2===(n=i).requestStatus&&!function(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(n))return a;if(1===i.requestStatus)return r=ei(e,t),a;{if(!navigator.onLine)throw k.create("app-offline");let t=function(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(a);return r=es(e,t),t}}),n=r?await r:a.authToken;return n}async function ei(e,t){let r=await eo(e.appConfig);for(;1===r.authToken.requestStatus;)await R(100),r=await eo(e.appConfig);let a=r.authToken;return 0===a.requestStatus?en(e,t):a}function eo(e){return J(e,e=>{if(!el(e))throw k.create("not-registered");let t=e.authToken;return 1===t.requestStatus&&t.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function es(e,t){try{let r=await ea(e,t),a=Object.assign(Object.assign({},t),{authToken:r});return await G(e.appConfig,a),r}catch(r){if(L(r)&&(401===r.customData.serverCode||404===r.customData.serverCode))await X(e.appConfig);else{let r=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await G(e.appConfig,r)}throw r}}function el(e){return void 0!==e&&2===e.registrationStatus}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ec(e){let{installationEntry:t,registrationPromise:r}=await Y(e);return r?r.catch(console.error):en(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eu(e,t=!1){await ed(e);let r=await en(e,t);return r.token}async function ed(e){let{registrationPromise:t}=await Y(e);t&&await t}function ep(e){return k.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ef="installations";(0,u.Xd)(new f.wA(ef,e=>{let t=e.getProvider("app").getImmediate(),r=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(!e||!e.options)throw ep("App Configuration");if(!e.name)throw ep("App Name");for(let t of["projectId","apiKey","appId"])if(!e.options[t])throw ep(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),a=(0,u.qX)(t,"heartbeat");return{app:t,appConfig:r,heartbeatServiceProvider:a,_delete:()=>Promise.resolve()}},"PUBLIC")),(0,u.Xd)(new f.wA("installations-internal",e=>{let t=e.getProvider("app").getImmediate(),r=(0,u.qX)(t,ef).getImmediate();return{getId:()=>ec(r),getToken:e=>eu(r,e)}},"PRIVATE")),(0,u.KN)(x,A),(0,u.KN)(x,A,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eh="analytics",eg="https://www.googletagmanager.com/gtag/js",em=new d.Yd("@firebase/analytics"),eb=new p.LL("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ew(e){if(!e.startsWith(eg)){let t=eb.create("invalid-gtag-resource",{gtagURL:e});return em.warn(t.message),""}return e}function ev(e){return Promise.all(e.map(e=>e.catch(e=>e)))}async function ey(e,t,r,a,n,i){let o=a[n];try{if(o)await t[o];else{let e=await ev(r),a=e.find(e=>e.measurementId===n);a&&await t[a.appId]}}catch(e){em.error(e)}e("config",n,i)}async function eI(e,t,r,a,n){try{let i=[];if(n&&n.send_to){let e=n.send_to;Array.isArray(e)||(e=[e]);let a=await ev(r);for(let r of e){let e=a.find(e=>e.measurementId===r),n=e&&t[e.appId];if(n)i.push(n);else{i=[];break}}}0===i.length&&(i=Object.values(t)),await Promise.all(i),e("event",a,n||{})}catch(e){em.error(e)}}let eE=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};async function eS(e){var t;let{appId:r,apiKey:a}=e,n={method:"GET",headers:new Headers({Accept:"application/json","x-goog-api-key":a})},i="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",r),o=await fetch(i,n);if(200!==o.status&&304!==o.status){let e="";try{let r=await o.json();(null===(t=r.error)||void 0===t?void 0:t.message)&&(e=r.error.message)}catch(e){}throw eb.create("config-fetch-failed",{httpStatus:o.status,responseMessage:e})}return o.json()}async function eD(e,t=eE,r){let{appId:a,apiKey:n,measurementId:i}=e.options;if(!a)throw eb.create("no-app-id");if(!n){if(i)return{measurementId:i,appId:a};throw eb.create("no-api-key")}let o=t.getThrottleMetadata(a)||{backoffCount:0,throttleEndTimeMillis:Date.now()},s=new eT;return setTimeout(async()=>{s.abort()},void 0!==r?r:6e4),eC({appId:a,apiKey:n,measurementId:i},o,s,t)}async function eC(e,{throttleEndTimeMillis:t,backoffCount:r},a,n=eE){var i;let{appId:o,measurementId:s}=e;try{await new Promise((e,r)=>{let n=Math.max(t-Date.now(),0),i=setTimeout(e,n);a.addEventListener(()=>{clearTimeout(i),r(eb.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}catch(e){if(s)return em.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${null==e?void 0:e.message}]`),{appId:o,measurementId:s};throw e}try{let t=await eS(e);return n.deleteThrottleMetadata(o),t}catch(c){if(!function(e){if(!(e instanceof p.ZR)||!e.customData)return!1;let t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(c)){if(n.deleteThrottleMetadata(o),s)return em.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${null==c?void 0:c.message}]`),{appId:o,measurementId:s};throw c}let t=503===Number(null===(i=null==c?void 0:c.customData)||void 0===i?void 0:i.httpStatus)?(0,p.$s)(r,n.intervalMillis,30):(0,p.$s)(r,n.intervalMillis),l={throttleEndTimeMillis:Date.now()+t,backoffCount:r+1};return n.setThrottleMetadata(o,l),em.debug(`Calling attemptFetch again in ${t} millis`),eC(e,l,a,n)}}class eT{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function ex(e,t,r,a,n){if(n&&n.global){e("event",r,a);return}{let n=await t,i=Object.assign(Object.assign({},a),{send_to:n});e("event",r,i)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eA(){if(!(0,p.hl)())return em.warn(eb.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await (0,p.eu)()}catch(e){return em.warn(eb.create("indexeddb-unavailable",{errorInfo:null==e?void 0:e.toString()}).message),!1}return!0}async function e_(e,t,r,a,n,s,l){var c;let u=eD(e);u.then(t=>{r[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&em.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>em.error(e)),t.push(u);let d=eA().then(e=>e?a.getId():void 0),[p,f]=await Promise.all([u,d]);!function(e){let t=window.document.getElementsByTagName("script");for(let r of Object.values(t))if(r.src&&r.src.includes(eg)&&r.src.includes(e))return r;return null}(s)&&function(e,t){let r;let a=(window.trustedTypes&&(r=window.trustedTypes.createPolicy("firebase-js-sdk-policy",{createScriptURL:ew})),r),n=document.createElement("script"),i=`${eg}?l=${e}&id=${t}`;n.src=a?null==a?void 0:a.createScriptURL(i):i,n.async=!0,document.head.appendChild(n)}(s,p.measurementId),o&&(n("consent","default",o),o=void 0),n("js",new Date);let h=null!==(c=null==l?void 0:l.config)&&void 0!==c?c:{};return h.origin="firebase",h.update=!0,null!=f&&(h.firebase_id=f),n("config",p.measurementId,h),i&&(n("set",i),i=void 0),p.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eB{constructor(e){this.app=e}_delete(){return delete ek[this.app.options.appId],Promise.resolve()}}let ek={},eL=[],eM={},e$="dataLayer",eN=!1,eO="@firebase/analytics",ej="0.10.0";(0,u.Xd)(new f.wA(eh,(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),a=e.getProvider("installations-internal").getImmediate();return function(e,t,r){!function(){let e=[];if((0,p.ru)()&&e.push("This is a browser extension environment."),(0,p.zI)()||e.push("Cookies are not available."),e.length>0){let t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),r=eb.create("invalid-analytics-context",{errorInfo:t});em.warn(r.message)}}();let a=e.options.appId;if(!a)throw eb.create("no-app-id");if(!e.options.apiKey){if(e.options.measurementId)em.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw eb.create("no-api-key")}if(null!=ek[a])throw eb.create("already-exists",{id:a});if(!eN){var n,i;let e,t;e=[],Array.isArray(window[e$])?e=window[e$]:window[e$]=e;let{wrappedGtag:r,gtagCore:a}=(n="gtag",t=function(...e){window[e$].push(arguments)},window[n]&&"function"==typeof window[n]&&(t=window[n]),window[n]=(i=t,async function(e,...t){try{if("event"===e){let[e,r]=t;await eI(i,ek,eL,e,r)}else if("config"===e){let[e,r]=t;await ey(i,ek,eL,eM,e,r)}else if("consent"===e){let[e]=t;i("consent","update",e)}else if("get"===e){let[e,r,a]=t;i("get",e,r,a)}else if("set"===e){let[e]=t;i("set",e)}else i(e,...t)}catch(e){em.error(e)}}),{gtagCore:t,wrappedGtag:window[n]});l=r,s=a,eN=!0}ek[a]=e_(e,eL,eM,t,s,e$,r);let o=new eB(e);return o}(r,a,t)},"PUBLIC")),(0,u.Xd)(new f.wA("analytics-internal",function(e){try{let t=e.getProvider(eh).getImmediate();return{logEvent:(e,r,a)=>(function(e,t,r,a){ex(l,ek[(e=(0,p.m9)(e)).app.options.appId],t,r,a).catch(e=>em.error(e))})(t,e,r,a)}}catch(e){throw eb.create("interop-component-reg-failed",{reason:e})}},"PRIVATE")),(0,u.KN)(eO,ej),(0,u.KN)(eO,ej,"esm2017")},1313:function(e,t,r){"use strict";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(0,r(5568).KN)("firebase","9.23.0","app")}}]);