!function(t){function e(e){for(var r,o,a=e[0],l=e[1],p=e[2],c=0,h=[];c<a.length;c++)o=a[c],s[o]&&h.push(s[o][0]),s[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);for(u&&u(e);h.length;)h.shift()();return i.push.apply(i,p||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,a=1;a<n.length;a++){var l=n[a];0!==s[l]&&(r=!1)}r&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},s={1:0},i=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=e,a=a.slice();for(var p=0;p<a.length;p++)e(a[p]);var u=l;i.push([15,0]),n()}({15:function(t,e,n){"use strict";n.r(e);var r=n(4),s=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)};s._withStripped=!0;n(35);var i=n(0),o=Object(i.a)({},s,[],!1,null,null,null);o.options.__file="src/App.vue";var a=o.exports,l=n(8),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"post"},[t._l(t.postContent,function(e){return["title"===e.type?n("BlogTitle",{key:e.index,attrs:{msg:e.msg}}):"p"===e.type?n("BlogBodyGraph",{key:e.index,attrs:{rawMsg:e.rawMsg,links:e.links}}):"img"===e.type?n("BlogImg",{key:e.index,attrs:{baseFileLink:"/"+t.resolvedId+"/"+e.link,altText:e.alt}}):"header"===e.type?n("BlogHeader",{key:e.index,attrs:{msg:e.msg}}):"list"===e.type?n("BlogList",{key:e.index,attrs:{items:e.items}}):t._e()]})],2)};p._withStripped=!0;var u=n(3),c=n.n(u),h=n(2),d=n.n(h),g=function(){var t=this.$createElement;return(this._self._c||t)("h1",[this._v(this._s(this.msg))])};g._withStripped=!0;var v={name:"BlogTitle",props:{msg:String}},_=Object(i.a)(v,g,[],!1,null,null,null);_.options.__file="src/components/BlogTitle.vue";var f=_.exports,m=function(){var t=this.$createElement;return(this._self._c||t)("p",{domProps:{innerHTML:this._s(this.formattedMsg)}})};m._withStripped=!0;var b={name:"BlogBodyGraph",props:{rawMsg:String,links:Object},computed:{formattedMsg(){return this.rawMsg.replace(/\[\[(.*)\]\]/g,this.getFormatLink(this.links))}},methods:{getFormatLink:t=>(e,n)=>{const r=t[n];return`<a href="${r.href}">${r.title}</a>`}}},y=Object(i.a)(b,m,[],!1,null,null,null);y.options.__file="src/components/BlogBodyGraph.vue";var k=y.exports,w=function(){var t=this.$createElement,e=this._self._c||t;return e("a",{attrs:{href:this.baseFileLink}},[e("img",{attrs:{src:this.smallFileLink,alt:this.altText}}),this._v(" "),e("div",{staticClass:"hidden"},[this._v("Click for high-resolution image")])])};w._withStripped=!0;var B={name:"BlogImg",props:{baseFileLink:String,altText:String},computed:{smallFileLink(){return this.baseFileLink.replace(/(\.jpg)/,".small$1")}}},x=Object(i.a)(B,w,[],!1,null,null,null);x.options.__file="src/components/BlogImg.vue";var S=x.exports,j=function(){var t=this.$createElement;return(this._self._c||t)("h2",[this._v(this._s(this.msg))])};j._withStripped=!0;var O={name:"BlogHeader",props:{msg:String}},P=Object(i.a)(O,j,[],!1,null,null,null);P.options.__file="src/components/BlogHeader.vue";var $=P.exports,L=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",t._l(t.items,function(e){return n("li",{key:e},[t._v(t._s(e))])}))};L._withStripped=!0;var T={name:"BlogList",props:{items:Array}},H=Object(i.a)(T,L,[],!1,null,null,null);H.options.__file="src/components/BlogList.vue";var E=H.exports,M={name:"blog",props:["id"],data(){let t=this.id;const e="_"===this.id.charAt(0);if(!this.ajaxData)if(this.ajaxData=[{index:0,type:"title",msg:"Error Loading Post Data"}],e){const e=d.a.get("ft-auth-token");e&&(t=this.id.substring(1),c.a.get(`https://nccu1znzcj.execute-api.us-east-2.amazonaws.com/Prod/post-data/${t}`,{headers:{"X-Api-Key":"oZE5pkcS5H4PlndobzKdH9wmoxO9uLqa2tY5wtaH",Authorization:e}}).then(({data:t})=>{this.postContent=t}))}else c.a.get(`/api/public/${this.id}/post_data.json`).then(({data:t})=>{this.postContent=t});return{postContent:this.ajaxData,resolvedId:t}},components:{BlogTitle:f,BlogBodyGraph:k,BlogImg:S,BlogHeader:$,BlogList:E}},A=Object(i.a)(M,p,[],!1,null,null,null);A.options.__file="src/views/Blog.vue";var I=A.exports,z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"nav"}},[n("SignIn"),t._v(" "),n("h1",[t._v("Currently Available Posts")]),t._v(" "),n("ul",[t._l(t.publicPosts,function(e){return n("li",{key:e.path},[n("h2",[n("router-link",{attrs:{to:"posts/"+e.path}},[t._v("\n          "+t._s(e.title)+"\n        ")])],1)])}),t._v(" "),t._l(t.privatePosts,function(e){return n("li",{key:e.path},[n("h2",[n("router-link",{attrs:{to:"posts/_"+e.path}},[t._v("\n          "+t._s(e.title)+"\n        ")])],1)])})],2)],1)};z._withStripped=!0;var C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"signin-header"}},[t.hasAuthToken?[n("p",[t._v("Hello signed-in user!")]),t._v(" "),n("a",{attrs:{href:"/"},on:{click:t.sign_out}},[t._v("Sign Out")])]:[n("p",[t._v("You are not signed in")]),t._v(" "),n("a",{attrs:{href:"https://signin.fischerthings.com/login?response_type=token&client_id=6a8t6a9st8fqkbt81n9mtb2aag&redirect_uri=https://fischerthings.com/login_success.html"}},[t._v("Click Here to Sign In")])]],2)};C._withStripped=!0;var F={name:"SignInHeader",computed:{hasAuthToken:()=>Boolean(d.a.get("ft-auth-token"))},methods:{sign_out(){d.a.remove("ft-auth-token"),this.$forceUpdate()}}},G=Object(i.a)(F,C,[],!1,null,null,null);G.options.__file="src/components/SignIn.vue";var q={name:"home",components:{SignIn:G.exports},props:{postPaths:{default:()=>[],type:Array}},data(){if(this.publicPosts||c.a.get("/api/public/posts.json").then(({data:t})=>{this.publicPosts=t}),!this.privatePosts){const t=d.a.get("ft-auth-token");t&&c.a.get("https://nccu1znzcj.execute-api.us-east-2.amazonaws.com/Prod/posts",{headers:{"X-Api-Key":"oZE5pkcS5H4PlndobzKdH9wmoxO9uLqa2tY5wtaH",Authorization:t}}).then(({data:t})=>{this.privatePosts=t})}return{publicPosts:this.postPaths,privatePosts:this.postPaths}}},D=Object(i.a)(q,z,[],!1,null,null,null);D.options.__file="src/views/Home.vue";var K=D.exports,Y=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"info"},[e("BlogTitle",{attrs:{msg:"There's nothing here, go back"}}),this._v(" "),e("BlogBodyGraph",{attrs:{rawMsg:"You've either entered a bad link, or you are missing required permissions"}})],1)};Y._withStripped=!0;var J={name:"FourOhFour",components:{BlogTitle:f,BlogBodyGraph:k}},X=Object(i.a)(J,Y,[],!1,null,null,null);X.options.__file="src/views/404.vue";var Z=X.exports;r.a.use(l.a);var U=new l.a({mode:"history",routes:[{path:"/",component:K},{path:"/posts/:id",component:I,props:!0},{path:"*",component:Z}]});r.a.config.productionTip=!1,new r.a({router:U,render:t=>t(a)}).$mount("#app")},35:function(t,e,n){"use strict";var r=n(5);n.n(r).a},5:function(t,e,n){}});