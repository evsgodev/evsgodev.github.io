!function(t){function e(e){for(var i,a,s=e[0],c=e[1],u=e[2],d=0,h=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&h.push(o[a][0]),o[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);for(l&&l(e);h.length;)h.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(i=!1)}i&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},o={0:0},r=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="dev/assets/js/";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;r.push([20,1]),n()}({20:function(t,e,n){"use strict";n.r(e);var i=n(5),o=n.n(i),r=n(6),a=n.n(r),s=(n(17),function(t){(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)?t():document.addEventListener("DOMContentLoaded",t)}),c=n(11),u=n.n(c),l=function(t,e){u()(t).on("always",e)},d="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,h=n(3),f=n(0),p=function(){function t(){o()(this,t)}return a()(t,null,[{key:"init",value:function(){t.fixed(),t.tooltip()}},{key:"fixed",value:function(){var t=document.querySelector(".page-header"),e=t.offsetHeight+20;document.addEventListener("scroll",(function(){t.classList.toggle("is-fixed",window.pageYOffset>e)}))}},{key:"tooltip",value:function(){var t=document.querySelector(".page-header__tooltip");if(t){var e=h.a.timeline();h.a.set(t,{opacity:0,scale:.5}),e.to(t,{opacity:1,scale:1,display:"block",delay:4,ease:f.a.easeOut.config(2)}).to(t,{opacity:0,scale:.5,display:"none",delay:7,ease:f.a.easeIn.config(2)})}}}]),t}(),m=n(16),y=n(7);h.a.registerPlugin(m.a,y.a);var v=function(){function t(){o()(this,t)}return a()(t,null,[{key:"lettersWrap",value:function(t){var e=t;e.innerHTML=e.textContent.replace(/\S/g,'<span class="letter">$&</span>')}},{key:"typing",value:function(t){h.a.timeline({repeat:-1,yoyo:!0,repeatDelay:0}).to(t,{text:{value:t.getAttribute("data-value-second")},duration:.8,delay:2}).to(t,{text:{value:t.getAttribute("data-value-default")},duration:.8,delay:2})}},{key:"init",value:function(){var e=document.querySelector(".intro-placeholder"),n=document.querySelector(".intro-caption__title"),i=document.querySelector(".intro__bg"),o=document.querySelector(".intro__title"),r=document.querySelector(".page-header"),a=document.querySelector(".page-header__title-link"),s=document.querySelectorAll(".intro__title-letters"),c=o.querySelector(".text-type"),u=h.a.timeline(),l=h.a.timeline({delay:.2});h.a.set(a,{opacity:0,onStart:function(){a.style.pointerEvents="none"}}),h.a.set(n,{clipPath:"polygon(0 0, -10% 0, -10% 100%, 0 100%)",x:"100px"}),h.a.set(c,{opacity:0,x:"40px"}),s.forEach((function(e){t.lettersWrap(e),h.a.set(e.children,{y:"1.1em",autoAlpha:0})})),h.a.to(i,{scrollTrigger:{trigger:e,start:"top",end:"bottom top",scrub:!0},y:"-40%",ease:"none"}),l.to(n,{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",duration:2,ease:"power1.inOut"}).to(n,{x:0,duration:2},"-=1.5").to(s[0].children,{y:0,autoAlpha:1,stagger:.04,duration:.8,delay:0,ease:f.a.easeInOut.config(8)},"-=2").to(s[1].children,{y:0,autoAlpha:1,stagger:.04,duration:.8,ease:f.a.easeInOut.config(4)},"-=1.5").to(c,{opacity:1,x:0,onComplete:function(){return t.typing(c)}},"-=0.5"),u.to(o,{scrollTrigger:{trigger:e,start:"top",end:"bottom",scrub:.1},y:"-340%",ease:"none"}).to(o,{scrollTrigger:{trigger:e,start:"top",end:"50%",scrub:!0,onEnterBack:function(){r.classList.remove("page-header--fixed"),h.a.to(a,{opacity:0,y:"0",ease:"none",duration:.2,onStart:function(){a.style.pointerEvents="none"}})},onLeave:function(){r.classList.add("page-header--fixed"),h.a.to(a,{opacity:1,y:0,ease:"none",delay:.1,duration:.2,onStart:function(){a.style.pointerEvents=""}})}},opacity:0,ease:"none"})}}]),t}(),g=n(12),w=n.n(g),S=n(23),T=n(22);S.a.use([T.a]),h.a.registerPlugin(y.a);var b=function(){function t(){o()(this,t),this.nodes={projectsContainer:document.querySelector(".project-covers"),switcherGrid:document.querySelector(".js-switcher-grid")},this.SWITCHER_ACTIVE_CLS="switcher-grid--active",this.toggleDuration=.2,this.windowWidth=window.innerWidth,this.detectWidth=this.windowWidth<768}return a()(t,[{key:"init",value:function(){var t=this;this.nodes.projectsContainer&&(window.addEventListener("orientationchange",(function(){setTimeout((function(){t.windowWidth=window.innerWidth}),50)})),w.a.init(document.querySelectorAll(".project-cover__image-wrap"),{max:10,axis:"x",speed:2e3,perspective:3e3,glare:!0,scale:1.04,transition:!0,easing:"cubic-bezier(.03,.98,.52,.99)"}),this.toggleGrid(),this.itemsGrid())}},{key:"slider",value:function(){var t=document.getElementById("content"),e=document.getElementById("projectsCoverSlider"),n=function(n,i,o){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;t.addEventListener(n,(function(t){t.currentTarget;e.querySelectorAll(".swiper-slide").forEach((function(t){h.a.to(t,{scale:i,duration:o,delay:r})}))}))},i=new S.a(e,{init:!1,slidesPerView:"auto",centeredSlides:!0,loop:!0,spaceBetween:50,speed:400,touchStartPreventDefault:!1,pagination:{el:".project-covers__progress-line",type:"progressbar"},breakpoints:{768:{spaceBetween:80,centeredSlides:!1,freeMode:!0,touchRatio:2,resistanceRatio:.5,longSwipes:!0,longSwipesRatio:.5}}});return["mousedown","touchstart"].forEach((function(t){return n(t,.9,.4)})),["mouseup","touchend"].forEach((function(t){return n(t,1,.4,.1)})),i.init()}},{key:"toggleGrid",value:function(){var t,e=this,n=this.SWITCHER_ACTIVE_CLS,i=this.toggleDuration,o=this.nodes.switcherGrid,r=document.querySelector(".project-covers__items"),a=document.querySelector(".project-covers__row"),s=r.querySelectorAll(":scope > .project-covers__item"),c=a.querySelector(".project-covers__row-slider"),u=document.querySelector(".footer"),l=document.querySelector(".project-covers__title-text"),d=document.querySelector(".project-covers__progress-line"),p=document.querySelector(".project-covers__row-guide");o.addEventListener("click",(function(o){var p=o.currentTarget,m=h.a.timeline(),y=h.a.timeline();o.preventDefault(),p.classList.toggle(n),p.classList.contains(n)?(h.a.to(s,{scale:0,duration:i+.2}),h.a.set(c,{x:"100%",autoAlpha:0}),h.a.set(u,{autoAlpha:0}),h.a.set(l,{x:"-18%",autoAlpha:0}),m.to(r,{autoAlpha:0,duration:i,ease:"linear"}).to(a,{autoAlpha:1,duration:i,ease:"linear",onStart:function(){r.style.display="none",a.style.display="block",y.to(c,{x:"0",duration:i+.5,ease:"power4.out"}).to(c,{autoAlpha:1,duration:i+.2,ease:"power1.in"},"-=0.75").to(l,{x:"0",autoAlpha:1,duration:i+.6,ease:f.b.easeOut},"-=0.75"),h.a.to(u,{autoAlpha:1}),d.classList.add("is-visible"),t||(t=!0,e.slider())}})):(d.classList.remove("is-visible"),m.to(a,{autoAlpha:0,duration:i,ease:"linear"}).to(r,{autoAlpha:1,duration:i,ease:"linear",onStart:function(){r.style.display="",a.style.display="none",h.a.to(s,{scale:1,duration:i+.1,ease:f.a.easeOut.config(1)})}}))})),p.addEventListener("click",(function(t){var e=t.currentTarget;h.a.to(e,{opacity:0,duration:.2,display:"none"})}))}},{key:"itemsGrid",value:function(){var t=this,e=this.nodes,n=e.projectsContainer,i=e.switcherGrid,o=document.querySelector(".page-header"),r=document.querySelectorAll(".project-covers__item"),a=document.querySelectorAll(".project-cover"),s=document.querySelector(".project-covers__title");h.a.set(s,{x:-30}),h.a.set(r,{y:this.detectWidth?"5%":50}),h.a.set(a,{y:this.detectWidth?"2%":75,clipPath:"polygon(0 0, 0 0, 0 100%, 0 100%)"}),r.forEach((function(t){var e=t;h.a.to(e,{scrollTrigger:{trigger:e,start:"top 90%",end:"bottom 80%",scrub:.4},y:0,duration:.4,ease:"power1.inOut"})})),a.forEach((function(e){var n=e;h.a.to(n,{scrollTrigger:{trigger:n,start:t.detectWidth?"20% 100%":"25% 100%",end:"40% bottom"},y:0,clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",duration:.4,ease:"power1.inOut",onComplete:function(){n.style.clipPath="",n.classList.add("is-visible")}})})),h.a.to(s,{scrollTrigger:{trigger:s,start:"top 100%",end:"bottom bottom",scrub:1.4},x:0,duration:.4,ease:"power1.inOut"}),h.a.to(i,{scrollTrigger:{trigger:n,start:"-".concat(o.offsetHeight+20),end:"0",scrub:!0,onEnter:function(){return i.parentNode.classList.add("is-sticky")},onLeaveBack:function(){return i.parentNode.classList.remove("is-sticky")}}})}}]),t}(),_=function(){function t(){o()(this,t),this.switcher=document.querySelectorAll(".switcher"),this.SWITCHER_ACTIVE_CLS="switcher--active",this.SWITCHER_THEME_CLS="theme-alt"}return a()(t,[{key:"init",value:function(){var t=this;this.switcher.forEach((function(e){e.addEventListener("click",(function(e){return t.toggle(e)}))}))}},{key:"toggle",value:function(t){var e=t.currentTarget,n=e.getAttribute("data-switch");switch(t.preventDefault(),e.classList.toggle(this.SWITCHER_ACTIVE_CLS),n){case"theme":document.querySelector("html").classList.toggle(this.SWITCHER_THEME_CLS),localStorage.setItem("theme-alt",this.SWITCHER_THEME_CLS),localStorage.setItem("switcher-theme-alt",this.SWITCHER_ACTIVE_CLS),e.classList.contains(this.SWITCHER_ACTIVE_CLS)||(localStorage.removeItem("theme-alt"),localStorage.removeItem("switcher-theme-alt"))}}}]),t}(),E=function(){function t(e,n,i,r){o()(this,t),this.ctx=e.getContext("2d"),this.size=n,this.speed=i,this.color=r,this.x=t.rand(window.innerWidth),this.y=t.rand(window.innerHeight)}return a()(t,[{key:"animate",value:function(t){this.x+=this.speed*t,this.y-=this.speed*t,this.y<0&&(this.y=window.innerHeight),this.x>window.innerWidth&&(this.x=0),this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x,this.y,this.size,this.size)}}],[{key:"rand",value:function(t){return Math.random()*t}}]),t}(),k=function(){function t(e){o()(this,t),this.canvas=document.getElementById(e),this.stars=[],this.resizeTimeout=null,this.resizeCooldown=500,this.lastResizeTime=Date.now(),this.ms=16,this.lastPaintTime=0}return a()(t,[{key:"init",value:function(){var t=this,e=this.canvas;e&&(e.width=e.clientWidth,e.height=e.clientHeight,e.style.display="none",setTimeout((function(){t.fadeIn(e,500),t.initStars()}),300),window.addEventListener("resize",(function(){Date.now()-t.lastResizeTime<t.resizeCooldown&&t.resizeTimeout&&(clearTimeout(t.resizeTimeout),t.resizeTimeout=null),t.lastResizeTime=Date.now(),e.style.display="none",t.resizeTimeout=setTimeout((function(){t.fadeIn(e,500),t.initStars(),e.width=e.clientWidth,e.height=e.clientHeight}),500)})),window.requestAnimationFrame&&requestAnimationFrame((function(e){return t.paintLoop(e)}))||setTimeout((function(e){return t.paintLoop(e)}),ms))}},{key:"initStars",value:function(){var t=this.canvas.clientWidth*this.canvas.clientHeight,e=3e-4*t,n=5e-5*t,i=2e-5*t;this.stars=[];for(var o=0;o<e;o++)this.stars.push(new E(this.canvas,.9,3,"#ffffff"));for(var r=0;r<n;r++)this.stars.push(new E(this.canvas,2,9,"#ffffff"));for(var a=0;a<i;a++)this.stars.push(new E(this.canvas,3,18,"#ffffff"))}},{key:"renderStars",value:function(t){this.stars.forEach((function(e){return e.animate(t)}))}},{key:"paintLoop",value:function(t){var e=this,n=(window.requestAnimationFrame?t-this.lastPaintTime:this.ms)/1e3;this.canvas.getContext("2d").clearRect(0,0,this.canvas.width,this.canvas.height),n>.05&&(n=.05),this.renderStars(n),window.requestAnimationFrame&&requestAnimationFrame((function(t){return e.paintLoop(t)}))||setTimeout((function(t){return e.paintLoop(t)}),this.ms),this.lastPaintTime=t}},{key:"fadeIn",value:function(t,e,n){var i=this,o=t,r=Date.now();o.style.opacity=0,o.style.display="block",function t(){var a=(Date.now()-r)/e;a>1?(a=1,n&&n()):window.requestAnimationFrame&&requestAnimationFrame((function(){return t()}))||setTimeout((function(){return t()}),i.sm),o.style.opacity=a}()}}]),t}(),L=n(13),x=n.n(L),q=n(9),A=n.n(q),C=function(){function t(){o()(this,t)}var e;return a()(t,null,[{key:"detectTimeOfDay",value:(e=x()(A.a.mark((function t(){var e,n,i;return A.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://worldtimeapi.org/api/ip");case 2:return e=t.sent,t.next=5,e.json();case 5:n=t.sent,t.prev=9,i=n.datetime.slice(11,16).split(":"),(i=60*Number(i[0])+Number(i[1]))<360&&(document.querySelector("html").classList.add("theme-alt"),document.querySelectorAll(".switcher--theme").forEach((function(t){return t.classList.add("switcher--active")}))),t.next=18;break;case 15:return t.prev=15,t.t0=t.catch(9),t.abrupt("return",!1);case 18:return t.abrupt("return",n);case 19:case"end":return t.stop()}}),t,null,[[9,15]])}))),function(){return e.apply(this,arguments)})}]),t}(),j=n(14);h.a.registerPlugin(y.a,j.a);var I=document.querySelector(".page-header"),W=function(){function t(){o()(this,t)}return a()(t,null,[{key:"linksToTarget",value:function(t,e,n){document.querySelectorAll(t).forEach((function(t){var i=t.getAttribute("href");i&&t.addEventListener("click",(function(t){t.preventDefault(),function(t,e,n){var i;document.querySelector(t)&&("number"==typeof e?i=I.offsetHeight+e:!0===e?i=I.offsetHeight+20:!1===e&&(i=0),h.a.to(window,{duration:n,scrollTo:{y:t,offsetY:i}}))}(i,e,n)}))}))}},{key:"toTop",value:function(){var t=document.querySelector(".back-to-top-fixed"),e=document.getElementById("content"),n=document.querySelector(".back-to-top-fixed__bar");if(t){var i=function(){return n.getTotalLength()};n.style.strokeDasharray=i(),n.style.strokeDashoffset=i(),t.addEventListener("click",(function(t){t.preventDefault(),h.a.to(window,{duration:.4,scrollTo:0})})),window.addEventListener("scroll",(function(){!function(t,e){var n=t,i=document.documentElement.clientHeight,o=document.documentElement.scrollHeight,r=document.documentElement.scrollTop/(o-i);n.style.strokeDashoffset=e-e*r}(n,i())})),h.a.to(t,{scrollTrigger:{trigger:e,start:"0",end:"0",scrub:!0,onEnter:function(){return t.classList.add("is-active")},onLeaveBack:function(){return t.classList.remove("is-active")}}})}}}]),t}(),H=n(10),O=n.n(H),D=n(8),P=n.n(D),R=n(15),z=n.n(R),M=function t(e){var n=this;o()(this,t),O()(this,"animateCurrent",(function(t){return f.x.to(t.container,{opacity:0,duration:.3})})),O()(this,"animateNext",(function(t){return f.x.from(t.container,{opacity:0,duration:.8,ease:"power1.in"})})),P.a.hooks.before((function(){document.querySelector("body").classList.add("is-animating")})),P.a.hooks.enter((function(){window.scrollTo(0,0),document.querySelector("html").classList.remove("theme-alt"),document.querySelector("body").classList.remove("is-animating")})),P.a.hooks.after((function(){e()})),P.a.use(z.a,{routes:[{name:"home",path:"/index.html"},{name:"about",path:"/about.html"}]}),P.a.init({sync:!0,transitions:[{leave:function(t){var e=t.current;return n.animateCurrent(e)},after:function(t){var e=t.next;return n.animateNext(e)}}]})},B=function(){function t(){o()(this,t)}return a()(t,null,[{key:"init",value:function(){d&&document.querySelector("html").classList.add("is-touch"),p.init(),v.init(),(new _).init(),(new b).init(),new k("stars").init(),C.detectTimeOfDay(),W.linksToTarget(".js-scroll-link",0,.6),W.toTop(),l(document.querySelector("body"),(function(){document.querySelector("body").classList.add("load")}))}},{key:"transitions",value:function(){new M((function(){return t.init()}))}}]),t}();s((function(){B.init(),B.transitions()}))}});