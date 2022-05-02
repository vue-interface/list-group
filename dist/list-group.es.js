var Shadowable = {
  props: {
    dropShadow: [Boolean, String],
    dropShadowableClassPrefix: {
      type: String,
      default: "drop-shadow"
    },
    shadow: [Boolean, String],
    shadowableClassPrefix: {
      type: String,
      default: "shadow"
    }
  },
  computed: {
    shadowableClass() {
      const dropShadowClassName = this.dropShadow === true ? "" : this.dropShadow && `-${this.dropShadow}`;
      const shadowClassName = this.shadow === true ? "" : this.shadow && `-${this.shadow}`;
      return {
        [`${this.dropShadowableClassPrefix}${dropShadowClassName}`]: !!this.dropShadow,
        [`${this.shadowableClassPrefix}${shadowClassName}`]: !!this.shadow
      };
    }
  }
};
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
function appendClass(vnode, str) {
  vnode.data.staticClass = `${vnode.data.staticClass && vnode.data.staticClass.replace(str, "") || ""} ${str}`.trim();
}
function wrap(wrapper, fn) {
  return (e) => {
    if (typeof fn === "function") {
      fn(e);
    }
    if (!e.cancelBubble) {
      wrapper(e);
    }
  };
}
function listener(vnode, key) {
  return vnode.data && vnode.data.on && vnode.data.on[key];
}
function prop(vnode, key) {
  const attr = vnode.data && vnode.data.attrs && vnode.data.attrs[key];
  if (attr === "") {
    return true;
  }
  if (!!attr) {
    return attr;
  }
  return vnode.componentOptions && vnode.componentOptions.propsData && vnode.componentOptions.propsData[key];
}
const __vue2_script$1 = {
  functional: true,
  render(h, context) {
    context.children.filter((vnode) => !!vnode.tag).forEach((vnode, i) => {
      vnode.data = Object.assign({ staticClass: void 0 }, vnode.data);
      if (!vnode.data.attrs) {
        vnode.data.attrs = {};
      }
      if (!vnode.data.on) {
        vnode.data.on = {};
      }
      vnode.data.on.click = wrap((e) => {
        context.parent.$emit("click-item", e, vnode);
      }, listener(vnode, "click"));
      vnode.data.on.blur = wrap((e) => {
        context.parent.$emit("focus-item", e, vnode);
      }, listener(vnode, "focus"));
      vnode.data.on.blur = wrap((e) => {
        context.parent.$emit("blur-item", e, vnode);
      }, listener(vnode, "blur"));
      if (vnode.data.attrs && prop(vnode, "active")) {
        appendClass(vnode, "active");
      }
      if (vnode.data.attrs && prop(vnode, "disabled")) {
        appendClass(vnode, "disabled");
      }
      appendClass(vnode, "list-group-item");
      const isAction = prop(vnode, "action") === "" || !!prop(vnode, "action");
      if (isAction || vnode.tag === "a" || vnode.tag === "button" || vnode.componentOptions && vnode.componentOptions.tag === "router-link") {
        vnode.data.attrs["href"] = vnode.data.attrs["href"] || "#";
        appendClass(vnode, "list-group-item-action");
      }
      if (vnode.data.attrs && prop(vnode, "variant")) {
        appendClass(vnode, `list-group-item-${prop(vnode, "variant")}`);
      }
    });
    return context.children;
  }
};
let __vue2_render, __vue2_staticRenderFns;
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, __vue2_render, __vue2_staticRenderFns, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var ListGroupItems = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "list-group", class: _vm.classes }, [_c("list-group-items", [_vm._t("default")], 2)], 1);
};
var staticRenderFns = [];
const __vue2_script = {
  components: {
    ListGroupItems
  },
  mixins: [
    Shadowable
  ],
  props: {
    flush: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        "list-group-flush": this.flush,
        [this.shadowableClass]: !!this.shadow
      };
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var ListGroup = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { ListGroup, ListGroupItems };
