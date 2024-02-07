(()=>{"use strict";var e={91:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),t.hash&&(e+=t.hash),t.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(e)?'"'.concat(e,'"'):e):e}},122:(e,t,s)=>{e.exports=s.p+"d3c18b51945b5dcfea35.png"}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,s),l.exports}s.m=e,s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;s.g.importScripts&&(e=s.g.location+"");var t=s.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var a=n.length-1;a>-1&&!e;)e=n[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e})(),s.b=document.baseURI||self.location.href,(()=>{var e=s(91),t=s.n(e),n=new URL(s(122),s.b);t()(n);const a=(e,t)=>{const s=document.createElement(e);return s.classList.add(t),s};let l,r,i,o,c,d,p,u,m,g;const v=[{matrix:[[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,1],[0,0,0,0,1],[1,1,1,1,1]],leftClues:["","",5,"","",1,"","",5,"","",1,"","",5],topClues:["",1,1,1,"",3,1,1,1,1,1,1,1,1,3],name:"snake(5x5)",units:17},{matrix:[[0,1,1,1,0],[1,1,0,1,1],[1,0,0,0,1],[1,1,0,1,1],[0,1,1,1,0]],leftClues:["","",3,"",2,2,"",1,1,"",2,2,"","",3],topClues:["","","","","","",2,1,2,"",3,2,1,2,3],name:"cross(5x5)",units:16},{matrix:[[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0]],leftClues:["",1,1,"","",5,"",1,1,"","",5,"",1,1],topClues:["","","","","",1,"",1,"",1,1,5,1,5,1],name:"sharp(5x5)",units:16},{matrix:[[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1]],leftClues:[1,1,1,"",1,1,1,1,1,"",1,1,1,1,1],topClues:[1,"",1,"",1,1,1,1,1,1,1,1,1,1,1],name:"shess(5x5)",units:13},{matrix:[[1,0,1,0,1],[0,1,1,1,0],[1,1,0,1,1],[0,1,1,1,0],[1,0,1,0,1]],leftClues:[1,1,1,"","",3,"",2,2,"","",3,1,1,1],topClues:[1,"","","",1,1,"",2,"",1,1,3,2,3,1],name:"snowflake(5x5)",units:16},{matrix:[[1,0,1,0,1],[1,1,1,1,1],[0,1,1,1,0],[0,1,0,1,0],[0,1,1,1,0]],leftClues:[1,1,1,"","",5,"","",3,"",1,1,"","",3],topClues:["","","","","","","",3,"","",2,4,1,4,2],name:"tower(5x5)",units:16},{matrix:[[1,1,1,1,1],[1,0,1,0,1],[1,1,1,0,1],[1,0,1,0,1],[1,1,1,1,1]],leftClues:["","",5,1,1,1,"",3,1,1,1,1,"","",5],topClues:["",1,"","","","",1,"",1,"",5,1,5,1,5],name:"window(5x5)",units:20},{matrix:[[0,0,0,1,1],[1,1,0,1,0],[1,1,1,1,0],[1,0,1,0,0],[1,0,1,0,0]],leftClues:["","",2,"",2,1,"","",4,"",1,1,"",1,1],topClues:["","","","","","","","","","",4,2,3,3,1],name:"camel(5x5)",units:13},{matrix:[[0,1,1,0,0],[1,1,0,0,1],[1,1,1,1,0],[0,1,1,0,0],[1,0,0,1,0]],leftClues:["","",2,"",2,1,"","",4,"","",2,"",1,1],topClues:["","","","","",2,"",1,1,"",1,4,2,1,1],name:"stroller(5x5)",units:13}],f=document.querySelector("html"),x=(e,t)=>{const s=document.createElement(e);return s.classList.add(t),s},h=document.querySelector("body"),L=x("div","container"),b=x("div","victory-wrapper"),y=x("h3","victory-message"),w=x("div","selected-template"),S=x("div","playing-field"),k=x("div","playing-field-container"),C=x("div","top-clues-wrapper"),T=x("div","timer"),_=x("div","playing-field-left-clues-wrapper"),E=x("div","playing-field-wrapper"),O=x("div","playing-field-left-wrapper"),I=x("div","timer-top-clues-wrapper"),N=x("div","results-wrapper"),J=x("h3","best-results");h.append(L),S.append(k),L.append(S,w,(()=>{const e=a("div","settings"),t=a("div","settings-button-wrapper");i=a("button","settings__reset"),i.classList.add("button"),o=a("button","settings__solution"),o.classList.add("button"),m=a("button","settings__continue-last-game"),m.classList.add("button"),c=a("button","settings__random-game"),c.classList.add("button"),g=a("button","settings__theme"),g.classList.add("button"),u=a("button","settings__save"),u.classList.add("button"),i.innerText="reset",d=a("button","settings__sound"),d.classList.add("button"),d.innerText="sound on",o.innerText="solution",m.innerText="continue last game",m.setAttribute("disabled","true"),c.innerText="random game",g.innerText="dark theme  ",u.innerText="save game";const s=a("form","settings__form"),n=a("label","settings__form-label");l=a("select","settings__form-select");const v=a("option","settings__form-option"),f=a("option","settings__form-option"),x=a("option","settings__form-option");n.setAttribute("for","levels"),l.setAttribute("name","levels"),n.innerText="levels",l.value="5",v.value="5",v.innerText="5x5",f.value="10",f.innerText="10x10",x.value="15",x.innerText="15x15",l.append(v,f,x);const h=a("label","settings__form-label");r=a("select","settings__form-select"),h.setAttribute("for","images"),r.setAttribute("name","images"),h.innerText="templates",r.value="0";let L=0;const b=["snake(5x5)","cross(5x5)","sharp(5x5)","shess(5x5)","snowflake(5x5)","tower(5x5)","window(5x5)","camel(5x5)","stroller(5x5)"];for(let e=0;e<b.length;e+=1)p=a("option","settings__form-option"),p.value=L,L+=1,p.innerText=b[e],r.append(p);return s.append(h,r),e.append(t,s),t.append(i,o,u,m,c,g,d),e})(),b,N),b.append(y),k.append(T,I,_),I.append(T,C),N.append(J);let A,M=0,H=0,j=0,G=!0,P=!0,$=!1,q=!1;const B=[],R=[],U=[];let Y=[],D=[],F=[],Q=[];const z=[],K=[],V=[],W=l.value;let X,Z=r.value;T.innerText="00:00",J.innerText="Best results:",w.innerText="snake(5x5)";const ee=new Audio("./assets/audio/click.wav"),te=new Audio("./assets/audio/click2.mp3"),se=new Audio("./assets/audio/click-right.mp3"),ne=new Audio("./assets/audio/victory.mp3"),ae=new Audio("./assets/audio/click-settings.mp3"),le=[ee,te,se,ne,ae];le.forEach((e=>e.volume=0));const re=()=>{const e=[];for(let t=0;t<X.length;t+=1){const s=X[t].substring(X[t].indexOf(":")-2,X[t].indexOf(":")+3),[n,a]=s.split(":").map(Number),l=60*n+a;e.push(l)}X.sort(((t,s)=>{const n=X.indexOf(t),a=X.indexOf(s);return e[n]-e[a]}))};window.addEventListener("load",(()=>{X=JSON.parse(localStorage.getItem("best results"))||[],re(),(()=>{for(let e=0;e<=4;e+=1){const t=x("div","results-element"),s=x("span","results-number"),n=x("span","results-value");N.append(t),t.append(s,n),s.innerText="".concat(e+1,"."),n.innerText=X[e],void 0===X[e]&&(n.innerText="--------------------------------------"),z.push(t),K.push(s),V.push(n)}})()})),(()=>{const e=JSON.parse(localStorage.getItem("clicks"));null!==e&&e.length>0&&(m.disabled=!1)})();const ie=e=>{X=JSON.parse(localStorage.getItem("best results"))||[],X.length>=5&&X.shift(),X.push("Template ".concat(v[e].name," in ").concat(T.innerHTML," seconds.")),localStorage.setItem("best results",JSON.stringify(X)),re();for(let e=0;e<=4;e+=1)K[e].innerText="".concat(e+1,"."),V[e].innerText=X[e],void 0===X[e]&&(V[e].innerText="--------------------------------------")};function oe(){A=setInterval((()=>{M+=1,H=Math.floor(M/60).toString().padStart(2,"0"),j=(M%60).toString().padStart(2,"0"),T.innerHTML="".concat(H,":").concat(j)}),1e3)}function ce(){clearInterval(A),H=0,j=0,M=0}const de=e=>{for(let t=0;t<e;t+=1)for(let s=0;s<e;s+=1)B[t][s].classList.remove("cell--activ"),B[t][s].classList.remove("cell--active-cross"),B[t][s].textContent="";T.innerHTML="00:00",y.textContent="",ce(),Y=[],D=[]};((e,t)=>{const s=e[0];for(let e=0;e<t;e+=1){B[e]=[];for(let n=0;n<t;n+=1){const t=x("div","cell");t.textContent="",E.append(t),B[e][n]=t,E.addEventListener("click",(a=>{$=!0,a.target===t&&(t.classList.toggle("cell--activ"),t.classList.contains("cell--activ")?(ee.play(),F.push([e,n]),1===s.matrix[e][n]&&Y.push(1),0===s.matrix[e][n]&&D.push(1)):(te.play(),F.pop([e,n]),0===s.matrix[e][n]&&Y.pop(1),0===s.matrix[e][n]&&D.pop(1))),s.units===Y.length&&0===D.length&&0!==Y.length&&(y.textContent="Great! You have solved the nonogram in ".concat(T.innerHTML," seconds!"),y.classList.add("victory-message--open"),E.classList.add("playing-field-wrapper--blocked"),ne.play(),F=[],Q=[],q||("0"===Z&&ie(0),q=!0),q=!1,ce(),Y=[],D=[])}));let a=!1;t.addEventListener("contextmenu",(s=>{s.preventDefault(),a?(t.classList.remove("cell--active-cross"),Q.pop([e,n]),a=!1):(t.classList.add("cell--active-cross"),Q.push([e,n]),a=!0),se.play()}))}}(e=>{for(let t=0;t<15;t+=1){const s=x("div","cell");s.textContent=e[0].topClues[t],C.append(s),R.push(s)}})(v),(e=>{for(let t=0;t<15;t+=1){const s=x("div","cell-left");O.append(s),s.textContent=e[0].leftClues[t],U.push(s)}})(v)})(v,W),_.append(O,E);let pe=!1;const ue=e=>{for(let t=0;t<15;t+=1)R[t].textContent=v[e].topClues[t],U[t].textContent=v[e].leftClues[t];w.innerText=v[e].name,((e,t)=>{let s=[],n=[];const a=e[t];for(let e=0;e<5;e+=1)for(let l=0;l<5;l+=1)B[e][l].classList.remove("cell--activ"),B[e][l].classList.remove("cell--active-cross"),E.addEventListener("click",(r=>{$=!0,r.target===B[e][l]&&(1===a.matrix[e][l]&&(B[e][l].classList.contains("cell--activ")?s.push(1):s.pop(1)),0===a.matrix[e][l]&&(B[e][l].classList.contains("cell--activ")?n.push(1):n.pop(1))),i.addEventListener("click",(()=>{s=[],n=[]})),a.units===s.length&&0===n.length&&0!==s.length&&(y.textContent="Great! You have solved the nonogram in ".concat(T.innerHTML," seconds!"),ne.play(),y.classList.add("victory-message--open"),E.classList.add("playing-field-wrapper--blocked"),s=[],n=[],F=[],Q=[],ce(),pe||("0"!==Z&&ie(t),pe=!0),pe=!1)}))})(v,e),de(W)};r.addEventListener("change",(()=>{Z=r.value,ue(Z),E.addEventListener("click",oe,{once:P},(()=>{P=!1})),F=[],Q=[],ae.play(),E.classList.remove("playing-field-wrapper--blocked")})),i.addEventListener("click",(()=>{de(W),P=!0,E.addEventListener("click",oe,{once:P},(()=>{P=!1})),ae.play(),E.classList.remove("playing-field-wrapper--blocked")})),o.addEventListener("click",(()=>{((e,t)=>{const s=e[Z];for(let e=0;e<t;e+=1)for(let n=0;n<t;n+=1)B[e][n].classList.contains("cell--activ")&&B[e][n].classList.remove("cell--activ"),1===s.matrix[e][n]&&B[e][n].classList.add("cell--activ")})(v,W),ae.play()})),c.addEventListener("click",(()=>{ue((()=>{const e=Math.floor(Math.random()*v.length);return Z=e,e})()),E.addEventListener("click",oe,{once:P},(()=>{P=!1})),ae.play(),F=[],Q=[],E.classList.remove("playing-field-wrapper--blocked")})),d.addEventListener("click",(()=>{G?(le.forEach((e=>e.volume=.4)),d.innerText="sound off",G=!1):(le.forEach((e=>e.volume=0)),G=!0,d.innerText="sound on"),ae.play()})),E.addEventListener("click",oe,{once:P},(()=>{P=!1})),u.addEventListener("click",(()=>{$&&(m.disabled=!1,localStorage.removeItem("clicks"),localStorage.setItem("game",JSON.stringify(Z)),localStorage.setItem("clicks",JSON.stringify(F)),localStorage.setItem("rightClicks",JSON.stringify(Q)),localStorage.setItem("arrayGuessedCells",JSON.stringify(Y)),localStorage.setItem("arrayEmptyCells",JSON.stringify(D)),F=[],Q=[],Y=[],D=[],$=!1),ae.play()})),m.addEventListener("click",(()=>{E.classList.remove("playing-field-wrapper--blocked"),ae.play(),(()=>{Z=JSON.parse(localStorage.getItem("game")),ue(Z);for(const e of JSON.parse(localStorage.getItem("clicks")))B[e[0]][e[1]].classList.add("cell--activ");for(const e of JSON.parse(localStorage.getItem("rightClicks")))B[e[0]][e[1]].classList.add("cell--active-cross");Y=JSON.parse(localStorage.getItem("arrayGuessedCells")),D=JSON.parse(localStorage.getItem("arrayEmptyCells"))})()})),g.addEventListener("click",(()=>{ae.play(),f.classList.contains("theme")?(f.classList.remove("theme"),g.innerText="dark theme"):(f.classList.add("theme"),g.innerText="light theme")}))})()})();