(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51bd404e"],{"0120":function(t,e,s){"use strict";var a=s("5ce8"),n=s.n(a);n.a},"58c2":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"font-roboto bg-gray-100 overflow-auto",staticStyle:{height:"80%"}},[s("div",{staticClass:"px-6 py-8"},[s("div",{staticClass:"flex justify-between container mx-auto"},[s("div",{staticClass:"w-full lg:w-8/12"},[t._m(0),s("div",{staticClass:"post-container"},t._l(t.posts,(function(t){return s("div",{key:t.id,staticClass:"mt-6"},[s("post",{attrs:{data:t}})],1)})),0)])])])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flex items-center justify-between"},[s("h1",{staticClass:"text-xl font-bold text-gray-700 md:text-2xl"},[t._v("Post")])])}],i=(s("96cf"),s("1da1")),c=s("028f"),r=s("18a8"),o=s("2fa3"),l={name:"Articles",components:{Post:c["a"]},data:function(){return{isLoading:!1,posts:[]}},methods:{fetchArticles:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var a,n,i;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,e.isLoading=!0,a=t?"?categoryId=".concat(t):"",s.next=5,r["a"].getArticles(a);case 5:n=s.sent,i=n.data,!0===i.success&&(e.posts=i.articles),e.isLoading=!1,s.next=15;break;case 11:s.prev=11,s.t0=s["catch"](0),e.isLoading=!1,o["a"].fire({icon:"error",title:"無法取得文章，請稍後再試"});case 15:case"end":return s.stop()}}),s,null,[[0,11]])})))()}},created:function(){var t=this.$route.params.id;this.fetchArticles(t)}},u=l,f=(s("0120"),s("2877")),d=Object(f["a"])(u,a,n,!1,null,"2c1ec97a",null);e["default"]=d.exports},"5ce8":function(t,e,s){}}]);
//# sourceMappingURL=chunk-51bd404e.a6759c65.js.map