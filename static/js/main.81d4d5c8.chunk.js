(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{114:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(69),i=n.n(o),l=(n(93),n(18)),c=n(63),u=n(12),s=(n(95),n(38)),f=n(39);function h(t,e){var n="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"===typeof t)return m(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(t,e)}(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return i=t.done,t},e:function(t){l=!0,o=t},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw o}}}}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var p=function(){function t(e){Object(s.a)(this,t),this.otherSplits=void 0,this.otherSplits=[];var n,r=e.split(",").filter(function(t){return""!==t.trim()}).map(function(t){return t.toUpperCase().trim().replaceAll(" ","")}),a=h(r);try{for(a.s();!(n=a.n()).done;){var o=n.value,i=void 0;if(o.match(/^[A-Z]+-[A-Z]+$/))i=new y(o);else{if(!o.match(/^[A-Z]+$/)){console.log("Split item created nothing",o,r);continue}i=new v(o)}this.otherSplits.push(i)}}catch(l){a.e(l)}finally{a.f()}}return Object(f.a)(t,[{key:"isInSplit",value:function(t){return console.log(this),0!==this.otherSplits.length&&this.otherSplits.some(function(e){return e.isInSplit(t)})}}]),t}(),d=function(){function t(){Object(s.a)(this,t)}return Object(f.a)(t,[{key:"isInSplit",value:function(t){return!0}}]),t}(),v=function(){function t(e){Object(s.a)(this,t),this.startingString=void 0,this.startingString=e.split("-")[0].toUpperCase()}return Object(f.a)(t,[{key:"isInSplit",value:function(t){return t.toUpperCase().startsWith(this.startingString)}}]),t}(),y=function(){function t(e){Object(s.a)(this,t),this.start=void 0,this.end=void 0;var n=e.toUpperCase().split("-");if(2!==n.length)throw Error("Double last name split isn't actually a double last name split");this.start=n[0],this.end=n[1]}return Object(f.a)(t,[{key:"isInSplit",value:function(t){var e=t.toUpperCase();return this.start<=e.substring(0,this.start.length)&&e.substring(0,this.end.length)<=this.end}}]),t}(),g=n(172),E=n(169),b=n(167),w=n(181),S=n(165),x=n(176),j=n(180),O=n(179),L=n(175),A=n(177),C=n(178),D=n(171),U=n(51),k=n.n(U);function T(t){t=t.toUpperCase().trim();for(var e=0,n=["h:mmA","h:mm A","h:mmsA","h:mms A","H:mm"];e<n.length;e++){var r=n[e],a=k()(t,r,!0);if(a.isValid()){var o=k()(),i=k()(a.format("H:mm"),"H:mm");return i.isBefore(o)&&i.add(1,"day"),i.toDate()}}return null}function M(t){var e=function(t){for(var e=0,n=[["DD-MMM","DD/MMM","MMM/DD","MMM/DD/YYYY"],["YYYY/MM/DD"],["MM/DD/YYYY"]];e<n.length;e++){var r=n[e],a=k()(t,r,!0);if(a.isValid())return a.toDate()}return null}(t.trim());return null===e?t:e.toDateString()}function I(t){var e=T(t);return null===e?t:"".concat(e.getHours(),":").concat(e.getMinutes().toString().padStart(2,"0"))}var Y=n(168),_=n(108),F=n.n(_),N=n(184),G=n(174);function P(){P=function(){return t};var t={},e=Object.prototype,n=e.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(C){c=function(t,e,n){return t[e]=n}}function u(t,e,n,a){var o=e&&e.prototype instanceof h?e:h,i=Object.create(o.prototype),l=new O(a||[]);return r(i,"_invoke",{value:w(t,n,l)}),i}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(C){return{type:"throw",arg:C}}}t.wrap=u;var f={};function h(){}function m(){}function p(){}var d={};c(d,o,function(){return this});var v=Object.getPrototypeOf,y=v&&v(v(L([])));y&&y!==e&&n.call(y,o)&&(d=y);var g=p.prototype=h.prototype=Object.create(d);function E(t){["next","throw","return"].forEach(function(e){c(t,e,function(t){return this._invoke(e,t)})})}function b(t,e){var a;r(this,"_invoke",{value:function(r,o){function i(){return new e(function(a,i){!function r(a,o,i,l){var c=s(t[a],t,o);if("throw"!==c.type){var u=c.arg,f=u.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then(function(t){r("next",t,i,l)},function(t){r("throw",t,i,l)}):e.resolve(f).then(function(t){u.value=t,i(u)},function(t){return r("throw",t,i,l)})}l(c.arg)}(r,o,a,i)})}return a=a?a.then(i,i):i()}})}function w(t,e,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return A()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var l=S(i,n);if(l){if(l===f)continue;return l}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=s(t,e,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===f)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}function S(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,S(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),f;var a=s(r,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,f;var o=a.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function L(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,a=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:A}}function A(){return{value:void 0,done:!0}}return m.prototype=p,r(g,"constructor",{value:p,configurable:!0}),r(p,"constructor",{value:m,configurable:!0}),m.displayName=c(p,l,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,c(t,l,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},E(b.prototype),c(b.prototype,i,function(){return this}),t.AsyncIterator=b,t.async=function(e,n,r,a,o){void 0===o&&(o=Promise);var i=new b(u(e,n,r,a),o);return t.isGeneratorFunction(n)?i:i.next().then(function(t){return t.done?t.value:i.next()})},E(g),c(g,l,"Generator"),c(g,o,function(){return this}),c(g,"toString",function(){return"[object Generator]"}),t.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},t.values=L,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var l=n.call(o,"catchLoc"),c=n.call(o,"finallyLoc");if(l&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(l){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;j(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:L(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},t}function H(t,e){var n="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"===typeof t)return $(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return $(t,e)}(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return i=t.done,t},e:function(t){l=!0,o=t},f:function(){try{i||null==n.return||n.return()}finally{if(l)throw o}}}}function $(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function Z(t,e,n){var r,a,o=e.course,i=e.section,l=H(t);try{for(l.s();!(r=l.n()).done;){var c=r.value;if(o===c.course)if("ALL"===c.section||i===c.section)if(((a=(a=c.split).trim().replaceAll(" ","").toUpperCase()).match(/^[A-Z]+-[A-Z]+$/)?new y(a):a.match(/^[A-Z]+$/)?new v(a):a.match(/,/)?new p(a):new d).isInSplit(n))return c}}catch(u){l.e(u)}finally{l.f()}return null}function W(t){var e=t.examTiming;return a.a.createElement("div",null,e.course," | ",e.date," | ",e.start,"-",e.end," | ",e.location," | ",e.split.replaceAll(" ",""))}function B(t){var e=a.a.useState(!1),n=Object(u.a)(e,2),r=n[0],o=n[1];a.a.useEffect(function(){var t=function(){o(window.innerWidth<660)};return t(),window.addEventListener("resize",t),function(){window.removeEventListener("resize",t)}},[]);for(var i=t.decisionList,l=[],c=0;c<i.length;c++){var s=i[c],f=Z(t.allData.examTimes,s,t.lastName);null!==f&&l.push(f)}return l.sort(function(t,e){if(null===t.date&&null!==e.date)return-1;if(null!==t.date&&null===e.date)return 1;if(null===t.date&&null===e.date)return 0;if(t.date<e.date)return-1;if(t.date>e.date)return 1;var n=T(t.start),r=T(e.start);return null!==n&&null!==r?n.getHours()-r.getHours():null===n&&null!==r?-1:null!==n&&null===r?1:0}),a.a.createElement("div",null,a.a.createElement("div",null,r?l.map(function(t){return a.a.createElement(W,{key:"".concat(t.course,"-").concat(t.location),examTiming:t})}):a.a.createElement(R,{displayCourses:l})))}function R(t){var e=t.displayCourses;return a.a.createElement(L.a,{component:D.a},a.a.createElement(x.a,{sx:{minWidth:650},"aria-label":"simple table"},a.a.createElement(A.a,null,a.a.createElement(C.a,null,a.a.createElement(O.a,null,"Course"),a.a.createElement(O.a,{align:"right"},"Date"),a.a.createElement(O.a,{align:"right"},"Start"),a.a.createElement(O.a,{align:"right"},"End"),a.a.createElement(O.a,{align:"right"},"Location"),a.a.createElement(O.a,{align:"right"},"Split"))),a.a.createElement(j.a,null,e.map(function(t){return a.a.createElement(C.a,{key:t.course,sx:{"&:last-child td, &:last-child th":{border:0}}},a.a.createElement(O.a,{component:"th",scope:"row"},t.course),a.a.createElement(O.a,{align:"right"},M(t.date)),a.a.createElement(O.a,{align:"right"},I(t.start)),a.a.createElement(O.a,{align:"right"},I(t.end)),a.a.createElement(O.a,{align:"right"},t.location),a.a.createElement(O.a,{align:"right"},t.split))}))))}function z(t){return t.replace(/\/+$/,"")}var J={backgroundColor:"white",padding:"6px",borderRadius:"5px"};function V(t){var e=a.a.useState("20231"),n=Object(u.a)(e,2),r=n[0],o=n[1];return a.a.createElement(g.a,{sx:{color:"white",minWidth:120}},a.a.createElement(w.a,{fullWidth:!0},a.a.createElement(E.a,{id:"demo-simple-select-label"},"Session"),a.a.createElement(S.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:r,label:"Age",onChange:function(e){o(e.target.value),t.onSessionUpdate(e.target.value)}},a.a.createElement(b.a,{value:20231},"Apr 2023"),a.a.createElement(b.a,{value:20229},"Dec 2022"))))}function q(t){var e=Object(r.useState)([{course:"",section:""}]),n=Object(u.a)(e,2),o=n[0],i=n[1];function c(e,n,r){var a=Object(l.a)(o);a[n][r]=e.target.value.toUpperCase(),i(a),t.onDataUpdate(a)}return a.a.createElement("div",null,a.a.createElement("table",null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null,"Course"),a.a.createElement("th",null,"Section"),a.a.createElement("th",null,"Action"))),a.a.createElement("tbody",null,o.map(function(e,n){return a.a.createElement("tr",{key:n},a.a.createElement("td",null,a.a.createElement("div",{style:J},a.a.createElement(Y.a,{id:"outlined-basic",label:"Course code",variant:"outlined",type:"text",value:e.course,onChange:function(t){return c(t,n,"course")}}))),a.a.createElement("td",null,a.a.createElement("div",{style:J},a.a.createElement(Y.a,{id:"outlined-basic",label:"Lecture section",variant:"outlined",type:"text",value:e.section,onChange:function(t){return c(t,n,"section")}}))),a.a.createElement("td",{style:{paddingLeft:"10px"}},a.a.createElement(N.a,{"aria-label":"delete",style:{backgroundColor:"red",fill:"#000"},onClick:function(){return function(e){var n=Object(l.a)(o);n.splice(e,1),i(n),t.onDataUpdate(n)}(n)}},a.a.createElement(F.a,null))))}))),a.a.createElement(G.a,{variant:"contained",onClick:function(){var e=[].concat(Object(l.a)(o),[{course:"",section:""}]);i(e),t.onDataUpdate(e)}},"Add Row"))}var K=function(){var t=Object(r.useState)(""),e=Object(u.a)(t,2),n=e[0],o=e[1],i=Object(r.useState)(null),l=Object(u.a)(i,2),s=l[0],f=l[1],h=Object(r.useState)([]),m=Object(u.a)(h,2),p=m[0],d=m[1];Object(r.useEffect)(function(){function t(){return(t=Object(c.a)(P().mark(function t(){var e,n;return P().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("Fetching from ","".concat("/UofT-Exam","/exams_20231.json")),t.next=3,fetch("".concat(z("/UofT-Exam"),"/exams_20231.json"));case 3:return e=t.sent,t.next=6,e.json();case 6:n=t.sent,f(n);case 8:case"end":return t.stop()}},t)}))).apply(this,arguments)}document.title="UofT ArtSci Exam Scheduler",function(){return t.apply(this,arguments)}().then(function(){return console.log("Fetched",s)})},[]);var v=Object(r.useState)(0),y=Object(u.a)(v,2);return y[0],y[1],a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement("h1",null,"UofT ArtSci Exam Timetable Generator"),a.a.createElement("div",{style:J},a.a.createElement(V,{onSessionUpdate:function(t){function e(){return(e=Object(c.a)(P().mark(function t(e){var n,r;return P().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(z("/UofT-Exam"),"/exams_").concat(e,".json"));case 2:return n=t.sent,t.next=5,n.json();case 5:r=t.sent,f(r);case 7:case"end":return t.stop()}},t)}))).apply(this,arguments)}(function(t){return e.apply(this,arguments)})(t).then(function(){})}})),a.a.createElement("div",null,a.a.createElement("label",null,a.a.createElement("div",{style:J},a.a.createElement(Y.a,{id:"filled-basic",label:"Your last name",variant:"filled",autoComplete:"off",onChange:function(t){t.target.value.toUpperCase(),o(t.target.value)}})))),a.a.createElement(q,{onDataUpdate:function(t){d(t)}}),s?a.a.createElement(B,{decisionList:p,lastName:n,allData:s}):null,a.a.createElement("div",{className:"Small-width"},a.a.createElement("p",null," Enter the course in COURSE and section in SECTION. This updates in real time."),a.a.createElement("p",null,"You must type the FULL course code, including the campus number and section. For example, CSC108",a.a.createElement("strong",null,"H1F"),"."),a.a.createElement("p",null,"You only need the section if the course splits exams on sections, which is rare."),a.a.createElement("p",null,"If your last name is not in any split, the course will not show."),a.a.createElement("p",null,"Your surname is not case sensitive. DATA MAY BE OUTDATED!"))))},Q=function(t){t&&t instanceof Function&&n.e(1).then(n.bind(null,164)).then(function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,o=e.getLCP,i=e.getTTFB;n(t),r(t),a(t),o(t),i(t)})};i.a.createRoot(document.getElementById("root")).render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(K,null))),Q()},85:function(t,e,n){t.exports=n(114)},93:function(t,e,n){},95:function(t,e,n){}},[[85,3,2]]]);
//# sourceMappingURL=main.81d4d5c8.chunk.js.map