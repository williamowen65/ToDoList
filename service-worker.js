if(!self.define){let e,i={};const t=(t,s)=>(t=new URL(t+".js",s).href,i[t]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=i,document.head.appendChild(e)}else e=t,importScripts(t),i()})).then((()=>{let e=i[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(s,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const d=e=>t(e,r),f={module:{uri:r},exports:o,require:d};i[r]=Promise.all(s.map((e=>f[e]||d(e)))).then((e=>(n(...e),o)))}}define(["./workbox-915e8d08"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"3fa92a932a0b34119a529fd11604139b"},{url:"main.js",revision:"6e8e6852dc70aefda0fc9e495fb1161a"},{url:"main.js.LICENSE.txt",revision:"ddcb909930ad3a1956d0e825efecfbb7"}],{})}));
