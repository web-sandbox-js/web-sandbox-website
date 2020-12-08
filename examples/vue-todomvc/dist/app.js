(()=>{"use strict";var e={n:t=>{var o=t&&t.__esModule?()=>t.default:()=>t;return e.d(o,{a:o}),o},d:(t,o)=>{for(var i in o)e.o(o,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:o[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=Vue;var o=e.n(t),i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app"},[o("section",{staticClass:"todoapp"},[o("header",{staticClass:"header"},[o("h1",[e._v("todos")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.newTodo,expression:"newTodo"}],staticClass:"new-todo",attrs:{autofocus:"",autocomplete:"off",placeholder:"What needs to be done?"},domProps:{value:e.newTodo},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addTodo(t)},input:function(t){t.target.composing||(e.newTodo=t.target.value)}}})]),e._v(" "),o("section",{directives:[{name:"show",rawName:"v-show",value:e.todos.length,expression:"todos.length"}],staticClass:"main"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.allDone,expression:"allDone"}],staticClass:"toggle-all",attrs:{id:"toggle-all",type:"checkbox"},domProps:{checked:Array.isArray(e.allDone)?e._i(e.allDone,null)>-1:e.allDone},on:{change:function(t){var o=e.allDone,i=t.target,s=!!i.checked;if(Array.isArray(o)){var l=e._i(o,null);i.checked?l<0&&(e.allDone=o.concat([null])):l>-1&&(e.allDone=o.slice(0,l).concat(o.slice(l+1)))}else e.allDone=s}}}),e._v(" "),o("label",{attrs:{for:"toggle-all"}}),e._v(" "),o("ul",{staticClass:"todo-list"},e._l(e.filteredTodos,(function(t){return o("li",{key:t.id,staticClass:"todo",class:{completed:t.completed,editing:t==e.editedTodo}},[o("div",{staticClass:"view"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.completed,expression:"todo.completed"}],staticClass:"toggle",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.completed)?e._i(t.completed,null)>-1:t.completed},on:{change:function(o){var i=t.completed,s=o.target,l=!!s.checked;if(Array.isArray(i)){var n=e._i(i,null);s.checked?n<0&&e.$set(t,"completed",i.concat([null])):n>-1&&e.$set(t,"completed",i.slice(0,n).concat(i.slice(n+1)))}else e.$set(t,"completed",l)}}}),e._v(" "),o("label",{on:{dblclick:function(o){return e.editTodo(t)}}},[e._v(e._s(t.title))]),e._v(" "),o("button",{staticClass:"destroy",on:{click:function(o){return e.removeTodo(t)}}})]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"todo.title"},{name:"todo-focus",rawName:"v-todo-focus",value:t==e.editedTodo,expression:"todo == editedTodo"}],staticClass:"edit",attrs:{type:"text"},domProps:{value:t.title},on:{blur:function(o){return e.doneEdit(t)},keyup:[function(o){return!o.type.indexOf("key")&&e._k(o.keyCode,"enter",13,o.key,"Enter")?null:e.doneEdit(t)},function(o){return!o.type.indexOf("key")&&e._k(o.keyCode,"esc",27,o.key,["Esc","Escape"])?null:e.cancelEdit(t)}],input:function(o){o.target.composing||e.$set(t,"title",o.target.value)}}})])})),0)]),e._v(" "),o("footer",{directives:[{name:"show",rawName:"v-show",value:e.todos.length,expression:"todos.length"}],staticClass:"footer"},[o("span",{staticClass:"todo-count"},[o("strong",[e._v(e._s(e.remaining))]),e._v(" "+e._s(e._f("pluralize")(e.remaining))+" left\n      ")]),e._v(" "),o("ul",{staticClass:"filters"},[o("li",[o("a",{class:{selected:"all"==e.visibility},attrs:{href:"#/all"}},[e._v("All")])]),e._v(" "),o("li",[o("a",{class:{selected:"active"==e.visibility},attrs:{href:"#/active"}},[e._v("Active")])]),e._v(" "),o("li",[o("a",{class:{selected:"completed"==e.visibility},attrs:{href:"#/completed"}},[e._v("Completed")])])]),e._v(" "),o("button",{directives:[{name:"show",rawName:"v-show",value:e.todos.length>e.remaining,expression:"todos.length > remaining"}],staticClass:"clear-completed",on:{click:e.removeCompleted}},[e._v("\n        Clear completed\n      ")])])]),e._v(" "),e._m(0)])};i._withStripped=!0;const s={all:e=>e,active:e=>e.filter((function(e){return!e.completed})),completed:e=>e.filter((function(e){return e.completed}))},l="todos-vuejs-2.0",n={fetch(){const e=JSON.parse(localStorage.getItem(l)||"[]");return e.forEach((function(e,t){e.id=t})),n.uid=e.length,e},save(e){localStorage.setItem(l,JSON.stringify(e))}};var a=function(e,t,o,i,s,l,n,a){var d,r="function"==typeof e?e.options:e;if(t&&(r.render=t,r.staticRenderFns=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("footer",{staticClass:"info"},[o("p",[e._v("Double-click to edit a todo")]),e._v(" "),o("p",[e._v("Written by "),o("a",{attrs:{href:"http://evanyou.me"}},[e._v("Evan You")])]),e._v(" "),o("p",[e._v("Part of "),o("a",{attrs:{href:"http://todomvc.com"}},[e._v("TodoMVC")])])])}],r._compiled=!0),d)if(r.functional){r._injectStyles=d;var c=r.render;r.render=function(e,t){return d.call(t),c(e,t)}}else{var u=r.beforeCreate;r.beforeCreate=u?[].concat(u,d):[d]}return{exports:e,options:r}}({data:()=>({todos:n.fetch(),newTodo:"",editedTodo:null,visibility:"all"}),watch:{todos:{handler(e){n.save(e)},deep:!0}},computed:{filteredTodos(){return s[this.visibility](this.todos)},remaining(){return s.active(this.todos).length},allDone:{get(){return 0===this.remaining},set(e){this.todos.forEach((function(t){t.completed=e}))}}},filters:{pluralize:e=>1===e?"item":"items"},methods:{addTodo(){const e=this.newTodo&&this.newTodo.trim();e&&(this.todos.push({id:n.uid++,title:e,completed:!1}),this.newTodo="")},removeTodo(e){this.todos.splice(this.todos.indexOf(e),1)},editTodo(e){this.beforeEditCache=e.title,this.editedTodo=e},doneEdit(e){this.editedTodo&&(this.editedTodo=null,e.title=e.title.trim(),e.title||this.removeTodo(e))},cancelEdit(e){this.editedTodo=null,e.title=this.beforeEditCache},removeCompleted(){this.todos=s.active(this.todos)}},directives:{"todo-focus":function(e,t){t.value&&e.focus()}},mounted(){const e=()=>{const e=window.location.hash.replace(/#\/?/,"");s[e]?this.visibility=e:(window.location.hash="",this.visibility="all")};window.addEventListener("hashchange",e),e()}},i);a.options.__file="examples/vue-todomvc/src/App.vue";const d=a.exports;new(o())({el:"#app",components:{App:d},render:e=>e(d)})})();
//# sourceMappingURL=app.js.map