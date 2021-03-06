import Vue from 'vue';

var toString = function (x) {
  return Object.prototype.toString.call(x);
};
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}
var hasSymbol =
  typeof Symbol !== 'undefined' &&
  isNative(Symbol) &&
  typeof Reflect !== 'undefined' &&
  isNative(Reflect.ownKeys);
var noopFn = function (_) {
  return _;
};
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noopFn,
  set: noopFn,
};
function proxy(target, key, _a) {
  var get = _a.get,
    set = _a.set;
  sharedPropertyDefinition.get = get || noopFn;
  sharedPropertyDefinition.set = set || noopFn;
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function assert(condition, msg) {
  if (!condition) throw new Error('[vue-composition-api] ' + msg);
}
function isArray(x) {
  return Array.isArray(x);
}
function isPlainObject(x) {
  return toString(x) === '[object Object]';
}
function isFunction(x) {
  return typeof x === 'function';
}
function warn(msg, vm) {
  Vue.util.warn(msg, vm);
}
function logError(err, vm, info) {
  if (__DEV__) {
    warn('Error in ' + info + ': "' + err.toString() + '"', vm);
  }
  if (typeof window !== 'undefined' && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}

var currentVue = null;
var currentVM = null;
function getCurrentVue() {
  if (__DEV__) {
    assert(currentVue, 'must call Vue.use(plugin) before using any function.');
  }
  return currentVue;
}
function setCurrentVue(vue) {
  currentVue = vue;
}
function getCurrentVM() {
  return currentVM;
}
function setCurrentVM(vm) {
  currentVM = vm;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

function __values(o) {
  var s = typeof Symbol === 'function' && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === 'number')
    return {
      next: function () {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      },
    };
  throw new TypeError(s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}

function __read(o, n) {
  var m = typeof Symbol === 'function' && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error: error };
  } finally {
    try {
      if (r && !r.done && (m = i['return'])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}

function currentVMInFn(hook) {
  var vm = getCurrentVM();
  if (__DEV__ && !vm) {
    warn(
      hook +
        ' is called when there is no active component instance to be ' +
        'associated with. ' +
        'Lifecycle injection APIs can only be used during execution of setup().'
    );
  }
  return vm;
}
function defineComponentInstance(Ctor, options) {
  if (options === void 0) {
    options = {};
  }
  var silent = Ctor.config.silent;
  Ctor.config.silent = true;
  var vm = new Ctor(options);
  Ctor.config.silent = silent;
  return vm;
}
function isComponentInstance(obj) {
  return currentVue && obj instanceof currentVue;
}
function createSlotProxy(vm, slotName) {
  return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (!vm.$scopedSlots[slotName]) {
      return warn('slots.' + slotName + '() got called outside of the "render()" scope', vm);
    }
    return vm.$scopedSlots[slotName].apply(vm, args);
  };
}
function resolveSlots(slots, normalSlots) {
  var res;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else {
    res = {};
    for (var key in slots) {
      if (slots[key] && key[0] !== '$') {
        res[key] = true;
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key in normalSlots) {
    if (!(key in res)) {
      res[key] = true;
    }
  }
  return res;
}

function createSymbol(name) {
  return hasSymbol ? Symbol.for(name) : name;
}
var WatcherPreFlushQueueKey = createSymbol('vfa.key.preFlushQueue');
var WatcherPostFlushQueueKey = createSymbol('vfa.key.postFlushQueue');
var AccessControlIdentifierKey = createSymbol('vfa.key.accessControlIdentifier');
var ReactiveIdentifierKey = createSymbol('vfa.key.reactiveIdentifier');
var RawIdentifierKey = createSymbol('vfa.key.rawIdentifierKey');
// must be a string, symbol key is ignored in reactive
var RefKey = 'vfa.key.refKey';

var RefImpl = /** @class */ (function () {
  function RefImpl(_a) {
    var get = _a.get,
      set = _a.set;
    proxy(this, 'value', {
      get: get,
      set: set,
    });
  }
  return RefImpl;
})();
function createRef(options) {
  // seal the ref, this could prevent ref from being observed
  // It's safe to seal the ref, since we really shouldn't extend it.
  // related issues: #79
  return Object.seal(new RefImpl(options));
}
function ref(raw) {
  var _a;
  if (isRef(raw)) {
    return raw;
  }
  var value = reactive(((_a = {}), (_a[RefKey] = raw), _a));
  return createRef({
    get: function () {
      return value[RefKey];
    },
    set: function (v) {
      return (value[RefKey] = v);
    },
  });
}
function isRef(value) {
  return value instanceof RefImpl;
}
function unref(ref) {
  return isRef(ref) ? ref.value : ref;
}
function toRefs(obj) {
  if (!isPlainObject(obj)) return obj;
  if (__DEV__ && !isReactive(obj)) {
    warn('toRefs() expects a reactive object but received a plain one.');
  }
  var ret = {};
  for (var key in obj) {
    ret[key] = toRef(obj, key);
  }
  return ret;
}
function toRef(object, key) {
  var v = object[key];
  if (isRef(v)) return v;
  return createRef({
    get: function () {
      return object[key];
    },
    set: function (v) {
      return (object[key] = v);
    },
  });
}
function shallowRef(raw) {
  var _a;
  if (isRef(raw)) {
    return raw;
  }
  var value = shallowReactive(((_a = {}), (_a[RefKey] = raw), _a));
  return createRef({
    get: function () {
      return value[RefKey];
    },
    set: function (v) {
      return (value[RefKey] = v);
    },
  });
}
function triggerRef(value) {
  if (!isRef(value)) return;
  value.value = value.value;
}

var AccessControlIdentifier = {};
var ReactiveIdentifier = {};
var RawIdentifier = {};
function isRaw(obj) {
  return hasOwn(obj, RawIdentifierKey) && obj[RawIdentifierKey] === RawIdentifier;
}
function isReactive(obj) {
  return (
    Object.isExtensible(obj) &&
    hasOwn(obj, ReactiveIdentifierKey) &&
    obj[ReactiveIdentifierKey] === ReactiveIdentifier
  );
}
/**
 * Proxing property access of target.
 * We can do unwrapping and other things here.
 */
function setupAccessControl(target) {
  if (
    !isPlainObject(target) ||
    isRaw(target) ||
    Array.isArray(target) ||
    isRef(target) ||
    isComponentInstance(target)
  ) {
    return;
  }
  if (
    hasOwn(target, AccessControlIdentifierKey) &&
    target[AccessControlIdentifierKey] === AccessControlIdentifier
  ) {
    return;
  }
  if (Object.isExtensible(target)) {
    def(target, AccessControlIdentifierKey, AccessControlIdentifier);
  }
  var keys = Object.keys(target);
  for (var i = 0; i < keys.length; i++) {
    defineAccessControl(target, keys[i]);
  }
}
/**
 * Auto unwrapping when access property
 */
function defineAccessControl(target, key, val) {
  if (key === '__ob__') return;
  var getter;
  var setter;
  var property = Object.getOwnPropertyDescriptor(target, key);
  if (property) {
    if (property.configurable === false) {
      return;
    }
    getter = property.get;
    setter = property.set;
    if ((!getter || setter) /* not only have getter */ && arguments.length === 2) {
      val = target[key];
    }
  }
  setupAccessControl(val);
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function getterHandler() {
      var value = getter ? getter.call(target) : val;
      // if the key is equal to RefKey, skip the unwrap logic
      if (key !== RefKey && isRef(value)) {
        return value.value;
      } else {
        return value;
      }
    },
    set: function setterHandler(newVal) {
      if (getter && !setter) return;
      var value = getter ? getter.call(target) : val;
      // If the key is equal to RefKey, skip the unwrap logic
      // If and only if "value" is ref and "newVal" is not a ref,
      // the assignment should be proxied to "value" ref.
      if (key !== RefKey && isRef(value) && !isRef(newVal)) {
        value.value = newVal;
      } else if (setter) {
        setter.call(target, newVal);
      } else {
        val = newVal;
      }
      setupAccessControl(newVal);
    },
  });
}
function observe(obj) {
  var Vue = getCurrentVue();
  var observed;
  if (Vue.observable) {
    observed = Vue.observable(obj);
  } else {
    var vm = defineComponentInstance(Vue, {
      data: {
        $$state: obj,
      },
    });
    observed = vm._data.$$state;
  }
  return observed;
}
function shallowReactive(obj) {
  var e_1, _a;
  if (__DEV__ && !obj) {
    warn('"shallowReactive()" is called without provide an "object".');
    // @ts-ignore
    return;
  }
  if (!isPlainObject(obj) || isReactive(obj) || isRaw(obj) || !Object.isExtensible(obj)) {
    return obj;
  }
  var observed = observe({});
  markReactive(observed, true);
  setupAccessControl(observed);
  var ob = observed.__ob__;
  var _loop_1 = function (key) {
    var val = obj[key];
    var getter;
    var setter;
    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property) {
      if (property.configurable === false) {
        return 'continue';
      }
      getter = property.get;
      setter = property.set;
      if ((!getter || setter) /* not only have getter */ && arguments_1.length === 2) {
        val = obj[key];
      }
    }
    // setupAccessControl(val);
    Object.defineProperty(observed, key, {
      enumerable: true,
      configurable: true,
      get: function getterHandler() {
        var value = getter ? getter.call(obj) : val;
        ob.dep.depend();
        return value;
      },
      set: function setterHandler(newVal) {
        if (getter && !setter) return;
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        ob.dep.notify();
      },
    });
  };
  var arguments_1 = arguments;
  try {
    for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var key = _c.value;
      _loop_1(key);
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return observed;
}
function markReactive(target, shallow) {
  if (shallow === void 0) {
    shallow = false;
  }
  if (
    !isPlainObject(target) ||
    isRaw(target) ||
    Array.isArray(target) ||
    isRef(target) ||
    isComponentInstance(target)
  ) {
    return;
  }
  if (
    hasOwn(target, ReactiveIdentifierKey) &&
    target[ReactiveIdentifierKey] === ReactiveIdentifier
  ) {
    return;
  }
  if (Object.isExtensible(target)) {
    def(target, ReactiveIdentifierKey, ReactiveIdentifier);
  }
  if (shallow) {
    return;
  }
  var keys = Object.keys(target);
  for (var i = 0; i < keys.length; i++) {
    markReactive(target[keys[i]]);
  }
}
/**
 * Make obj reactivity
 */
function reactive(obj) {
  if (__DEV__ && !obj) {
    warn('"reactive()" is called without provide an "object".');
    // @ts-ignore
    return;
  }
  if (!isPlainObject(obj) || isReactive(obj) || isRaw(obj) || !Object.isExtensible(obj)) {
    return obj;
  }
  var observed = observe(obj);
  // def(obj, ReactiveIdentifierKey, ReactiveIdentifier);
  markReactive(obj);
  setupAccessControl(observed);
  return observed;
}
/**
 * Make sure obj can't be a reactive
 */
function markRaw(obj) {
  if (!isPlainObject(obj)) {
    return obj;
  }
  // set the vue observable flag at obj
  def(obj, '__ob__', observe({}).__ob__);
  // mark as Raw
  def(obj, RawIdentifierKey, RawIdentifier);
  return obj;
}
function toRaw(observed) {
  if (isRaw(observe) || !Object.isExtensible(observed)) {
    return observed;
  }
  return observed.__ob__.value || observed;
}

function isUndef(v) {
  return v === undefined || v === null;
}
function isPrimitive(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  );
}
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
/**
 * Set a property on an object. Adds the new property, triggers change
 * notification and intercept it's subsequent access if the property doesn't
 * already exist.
 */
function set(target, key, val) {
  var Vue = getCurrentVue();
  var _a = Vue.util,
    warn = _a.warn,
    defineReactive = _a.defineReactive;
  if (__DEV__ && (isUndef(target) || isPrimitive(target))) {
    warn('Cannot set reactive property on undefined, null, or primitive value: ' + target);
  }
  if (isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  var ob = target.__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    __DEV__ &&
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
          'at runtime - declare it upfront in the data option.'
      );
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val);
  // IMPORTANT: define access control before trigger watcher
  defineAccessControl(target, key, val);
  markReactive(ob.value[key]);
  ob.dep.notify();
  return val;
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(from, to) {
  if (!from) return to;
  var key;
  var toVal;
  var fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') continue;
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      to[key] = fromVal;
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      !isRef(toVal) &&
      isPlainObject(fromVal) &&
      !isRef(fromVal)
    ) {
      mergeData(fromVal, toVal);
    }
  }
  return to;
}
function install(Vue, _install) {
  if (currentVue && currentVue === Vue) {
    if (__DEV__) {
      assert(false, 'already installed. Vue.use(plugin) should be called only once');
    }
    return;
  }
  Vue.config.optionMergeStrategies.setup = function (parent, child) {
    return function mergedSetupFn(props, context) {
      return mergeData(
        typeof parent === 'function' ? parent(props, context) || {} : {},
        typeof child === 'function' ? child(props, context) || {} : {}
      );
    };
  };
  setCurrentVue(Vue);
  _install(Vue);
}

function set$1(vm, key, value) {
  var state = (vm.__secret_vfa_state__ = vm.__secret_vfa_state__ || {});
  state[key] = value;
}
function get(vm, key) {
  return (vm.__secret_vfa_state__ || {})[key];
}
var vmStateManager = {
  set: set$1,
  get: get,
};

function asVmProperty(vm, propName, propValue) {
  var props = vm.$options.props;
  if (!(propName in vm) && !(props && hasOwn(props, propName))) {
    proxy(vm, propName, {
      get: function () {
        return propValue.value;
      },
      set: function (val) {
        propValue.value = val;
      },
    });
    if (__DEV__) {
      // expose binding to Vue Devtool as a data property
      // delay this until state has been resolved to prevent repeated works
      vm.$nextTick(function () {
        proxy(vm._data, propName, {
          get: function () {
            return propValue.value;
          },
          set: function (val) {
            propValue.value = val;
          },
        });
      });
    }
  } else if (__DEV__) {
    if (props && hasOwn(props, propName)) {
      warn('The setup binding property "' + propName + '" is already declared as a prop.', vm);
    } else {
      warn('The setup binding property "' + propName + '" is already declared.', vm);
    }
  }
}
function updateTemplateRef(vm) {
  var rawBindings = vmStateManager.get(vm, 'rawBindings') || {};
  if (!rawBindings || !Object.keys(rawBindings).length) return;
  var refs = vm.$refs;
  var oldRefKeys = vmStateManager.get(vm, 'refs') || [];
  for (var index = 0; index < oldRefKeys.length; index++) {
    var key = oldRefKeys[index];
    var setupValue = rawBindings[key];
    if (!refs[key] && setupValue && isRef(setupValue)) {
      setupValue.value = null;
    }
  }
  var newKeys = Object.keys(refs);
  var validNewKeys = [];
  for (var index = 0; index < newKeys.length; index++) {
    var key = newKeys[index];
    var setupValue = rawBindings[key];
    if (refs[key] && setupValue && isRef(setupValue)) {
      setupValue.value = refs[key];
      validNewKeys.push(key);
    }
  }
  vmStateManager.set(vm, 'refs', validNewKeys);
}
function resolveScopedSlots(vm, slotsProxy) {
  var parentVode = vm.$options._parentVnode;
  if (!parentVode) return;
  var prevSlots = vmStateManager.get(vm, 'slots') || [];
  var curSlots = resolveSlots(parentVode.data.scopedSlots, vm.$slots);
  // remove staled slots
  for (var index = 0; index < prevSlots.length; index++) {
    var key = prevSlots[index];
    if (!curSlots[key]) {
      delete slotsProxy[key];
    }
  }
  // proxy fresh slots
  var slotNames = Object.keys(curSlots);
  for (var index = 0; index < slotNames.length; index++) {
    var key = slotNames[index];
    if (!slotsProxy[key]) {
      slotsProxy[key] = createSlotProxy(vm, key);
    }
  }
  vmStateManager.set(vm, 'slots', slotNames);
}
function activateCurrentInstance(vm, fn, onError) {
  var preVm = getCurrentVM();
  setCurrentVM(vm);
  try {
    return fn(vm);
  } catch (err) {
    if (onError) {
      onError(err);
    } else {
      throw err;
    }
  } finally {
    setCurrentVM(preVm);
  }
}
function mixin(Vue) {
  Vue.mixin({
    beforeCreate: functionApiInit,
    mounted: function () {
      updateTemplateRef(this);
    },
    updated: function () {
      updateTemplateRef(this);
    },
  });
  /**
   * Vuex init hook, injected into each instances init hooks list.
   */
  function functionApiInit() {
    var vm = this;
    var $options = vm.$options;
    var setup = $options.setup,
      render = $options.render;
    if (render) {
      // keep currentInstance accessible for createElement
      $options.render = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return activateCurrentInstance(vm, function () {
          return render.apply(_this, args);
        });
      };
    }
    if (!setup) {
      return;
    }
    if (typeof setup !== 'function') {
      if (__DEV__) {
        warn(
          'The "setup" option should be a function that returns a object in component definitions.',
          vm
        );
      }
      return;
    }
    var data = $options.data;
    // wrapper the data option, so we can invoke setup before data get resolved
    $options.data = function wrappedData() {
      initSetup(vm, vm.$props);
      return typeof data === 'function' ? data.call(vm, vm) : data || {};
    };
  }
  function initSetup(vm, props) {
    if (props === void 0) {
      props = {};
    }
    var setup = vm.$options.setup;
    var ctx = createSetupContext(vm);
    // resolve scopedSlots and slots to functions
    resolveScopedSlots(vm, ctx.slots);
    var binding;
    activateCurrentInstance(vm, function () {
      binding = setup(props, ctx);
    });
    if (!binding) return;
    if (isFunction(binding)) {
      // keep typescript happy with the binding type.
      var bindingFunc_1 = binding;
      // keep currentInstance accessible for createElement
      vm.$options.render = function () {
        resolveScopedSlots(vm, ctx.slots);
        return activateCurrentInstance(vm, function () {
          return bindingFunc_1();
        });
      };
      return;
    }
    if (isPlainObject(binding)) {
      var bindingObj_1 = binding;
      vmStateManager.set(vm, 'rawBindings', binding);
      Object.keys(binding).forEach(function (name) {
        var bindingValue = bindingObj_1[name];
        // only make primitive value reactive
        if (!isRef(bindingValue)) {
          if (isReactive(bindingValue)) {
            bindingValue = ref(bindingValue);
          } else {
            // a non-reactive should not don't get reactivity
            bindingValue = ref(markRaw(bindingValue));
          }
        }
        asVmProperty(vm, name, bindingValue);
      });
      return;
    }
    if (__DEV__) {
      assert(
        false,
        '"setup" must return a "Object" or a "Function", got "' +
          Object.prototype.toString.call(binding).slice(8, -1) +
          '"'
      );
    }
  }
  function createSetupContext(vm) {
    var ctx = {
      slots: {},
    };
    var props = ['root', 'parent', 'refs', 'attrs', 'listeners', 'isServer', 'ssrContext'];
    var methodReturnVoid = ['emit'];
    props.forEach(function (key) {
      var _a;
      var targetKey;
      var srcKey;
      if (Array.isArray(key)) {
        (_a = __read(key, 2)), (targetKey = _a[0]), (srcKey = _a[1]);
      } else {
        targetKey = srcKey = key;
      }
      srcKey = '$' + srcKey;
      proxy(ctx, targetKey, {
        get: function () {
          return vm[srcKey];
        },
        set: function () {
          warn("Cannot assign to '" + targetKey + "' because it is a read-only property", vm);
        },
      });
    });
    methodReturnVoid.forEach(function (key) {
      var srcKey = '$' + key;
      proxy(ctx, key, {
        get: function () {
          return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var fn = vm[srcKey];
            fn.apply(vm, args);
          };
        },
      });
    });
    return ctx;
  }
}

var fallbackCreateElement;
var createElement = function createElement() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  if (!currentVM) {
    warn('`createElement()` has been called outside of render function.');
    if (!fallbackCreateElement) {
      fallbackCreateElement = defineComponentInstance(getCurrentVue()).$createElement;
    }
    return fallbackCreateElement.apply(fallbackCreateElement, args);
  }
  return currentVM.$createElement.apply(currentVM, args);
};

// implementation, close to no-op
function defineComponent(options) {
  return options;
}
// implementation, deferring to defineComponent, but logging a warning in dev mode
function createComponent(options) {
  if (__DEV__) {
    Vue.util.warn('`createComponent` has been renamed to `defineComponent`.');
  }
  return defineComponent(options);
}

var genName = function (name) {
  return 'on' + (name[0].toUpperCase() + name.slice(1));
};
function createLifeCycle(lifeCyclehook) {
  return function (callback) {
    var vm = currentVMInFn(genName(lifeCyclehook));
    if (vm) {
      injectHookOption(getCurrentVue(), vm, lifeCyclehook, callback);
    }
  };
}
function injectHookOption(Vue, vm, hook, val) {
  var options = vm.$options;
  var mergeFn = Vue.config.optionMergeStrategies[hook];
  options[hook] = mergeFn(options[hook], wrapHookCall(vm, val));
}
function wrapHookCall(vm, fn) {
  return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var preVm = getCurrentVM();
    setCurrentVM(vm);
    try {
      return fn.apply(void 0, __spread(args));
    } finally {
      setCurrentVM(preVm);
    }
  };
}
// export const onCreated = createLifeCycle('created');
var onBeforeMount = createLifeCycle('beforeMount');
var onMounted = createLifeCycle('mounted');
var onBeforeUpdate = createLifeCycle('beforeUpdate');
var onUpdated = createLifeCycle('updated');
var onBeforeUnmount = createLifeCycle('beforeDestroy');
var onUnmounted = createLifeCycle('destroyed');
var onErrorCaptured = createLifeCycle('errorCaptured');
var onActivated = createLifeCycle('activated');
var onDeactivated = createLifeCycle('deactivated');
var onServerPrefetch = createLifeCycle('serverPrefetch');

var fallbackVM;
function flushPreQueue() {
  flushQueue(this, WatcherPreFlushQueueKey);
}
function flushPostQueue() {
  flushQueue(this, WatcherPostFlushQueueKey);
}
function hasWatchEnv(vm) {
  return vm[WatcherPreFlushQueueKey] !== undefined;
}
function installWatchEnv(vm) {
  vm[WatcherPreFlushQueueKey] = [];
  vm[WatcherPostFlushQueueKey] = [];
  vm.$on('hook:beforeUpdate', flushPreQueue);
  vm.$on('hook:updated', flushPostQueue);
}
function getWatcherOption(options) {
  return __assign(
    {
      immediate: false,
      deep: false,
      flush: 'post',
    },
    options
  );
}
function getWatchEffectOption(options) {
  return __assign(
    {
      immediate: true,
      deep: false,
      flush: 'post',
    },
    options
  );
}
function getWatcherVM() {
  var vm = getCurrentVM();
  if (!vm) {
    if (!fallbackVM) {
      fallbackVM = defineComponentInstance(getCurrentVue());
    }
    vm = fallbackVM;
  } else if (!hasWatchEnv(vm)) {
    installWatchEnv(vm);
  }
  return vm;
}
function flushQueue(vm, key) {
  var queue = vm[key];
  for (var index = 0; index < queue.length; index++) {
    queue[index]();
  }
  queue.length = 0;
}
function queueFlushJob(vm, fn, mode) {
  // flush all when beforeUpdate and updated are not fired
  var fallbackFlush = function () {
    vm.$nextTick(function () {
      if (vm[WatcherPreFlushQueueKey].length) {
        flushQueue(vm, WatcherPreFlushQueueKey);
      }
      if (vm[WatcherPostFlushQueueKey].length) {
        flushQueue(vm, WatcherPostFlushQueueKey);
      }
    });
  };
  switch (mode) {
    case 'pre':
      fallbackFlush();
      vm[WatcherPreFlushQueueKey].push(fn);
      break;
    case 'post':
      fallbackFlush();
      vm[WatcherPostFlushQueueKey].push(fn);
      break;
    default:
      assert(false, 'flush must be one of ["post", "pre", "sync"], but got ' + mode);
      break;
  }
}
function createVueWatcher(vm, getter, callback, options) {
  var index = vm._watchers.length;
  // @ts-ignore: use undocumented options
  vm.$watch(getter, callback, {
    immediate: options.immediateInvokeCallback,
    deep: options.deep,
    lazy: options.noRun,
    sync: options.sync,
    before: options.before,
  });
  return vm._watchers[index];
}
// We have to monkeypatch the teardown function so Vue will run
// runCleanup() when it tears down the watcher on unmmount.
function patchWatcherTeardown(watcher, runCleanup) {
  var _teardown = watcher.teardown;
  watcher.teardown = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    _teardown.apply(watcher, args);
    runCleanup();
  };
}
function createWatcher(vm, source, cb, options) {
  var flushMode = options.flush;
  var isSync = flushMode === 'sync';
  var cleanup;
  var registerCleanup = function (fn) {
    cleanup = function () {
      try {
        fn();
      } catch (error) {
        logError(error, vm, 'onCleanup()');
      }
    };
  };
  // cleanup before running getter again
  var runCleanup = function () {
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
  };
  var createScheduler = function (fn) {
    if (isSync || /* without a current active instance, ignore pre|post mode */ vm === fallbackVM) {
      return fn;
    }
    return function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return queueFlushJob(
        vm,
        function () {
          fn.apply(void 0, __spread(args));
        },
        flushMode
      );
    };
  };
  // effect watch
  if (cb === null) {
    var getter_1 = function () {
      return source(registerCleanup);
    };
    var watcher_1 = createVueWatcher(vm, getter_1, noopFn, {
      deep: options.deep || false,
      sync: isSync,
      before: runCleanup,
    });
    patchWatcherTeardown(watcher_1, runCleanup);
    // enable the watcher update
    watcher_1.lazy = false;
    var originGet = watcher_1.get.bind(watcher_1);
    // always run watchEffect
    watcher_1.get = createScheduler(originGet);
    return function () {
      watcher_1.teardown();
    };
  }
  var deep = options.deep;
  var getter;
  if (Array.isArray(source)) {
    getter = function () {
      return source.map(function (s) {
        return isRef(s) ? s.value : s();
      });
    };
  } else if (isRef(source)) {
    getter = function () {
      return source.value;
    };
  } else if (isReactive(source)) {
    getter = function () {
      return source;
    };
    deep = true;
  } else if (isFunction(source)) {
    getter = source;
  } else {
    getter = noopFn;
    warn(
      'Invalid watch source: ' +
        JSON.stringify(source) +
        '.\n      A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.',
      vm
    );
  }
  var applyCb = function (n, o) {
    // cleanup before running cb again
    runCleanup();
    cb(n, o, registerCleanup);
  };
  var callback = createScheduler(applyCb);
  if (options.immediate) {
    var originalCallbck_1 = callback;
    // `shiftCallback` is used to handle the first sync effect run.
    // The subsequent callbacks will redirect to `callback`.
    var shiftCallback_1 = function (n, o) {
      shiftCallback_1 = originalCallbck_1;
      applyCb(n, o);
    };
    callback = function (n, o) {
      shiftCallback_1(n, o);
    };
  }
  // @ts-ignore: use undocumented option "sync"
  var stop = vm.$watch(getter, callback, {
    immediate: options.immediate,
    deep: deep,
    sync: isSync,
  });
  // Once again, we have to hack the watcher for proper teardown
  var watcher = vm._watchers[vm._watchers.length - 1];
  patchWatcherTeardown(watcher, runCleanup);
  return function () {
    stop();
  };
}
function watchEffect(effect, options) {
  var opts = getWatchEffectOption(options);
  var vm = getWatcherVM();
  return createWatcher(vm, effect, null, opts);
}
// implementation
function watch(source, cb, options) {
  var callback = null;
  if (typeof cb === 'function') {
    // source watch
    callback = cb;
  } else {
    // effect watch
    if (__DEV__) {
      warn(
        '`watch(fn, options?)` signature has been moved to a separate API. ' +
          'Use `watchEffect(fn, options?)` instead. `watch` now only ' +
          'supports `watch(source, cb, options?) signature.'
      );
    }
    options = cb;
    callback = null;
  }
  var opts = getWatcherOption(options);
  var vm = getWatcherVM();
  return createWatcher(vm, source, callback, opts);
}

// implement
function computed(options) {
  var vm = getCurrentVM();
  var get, set;
  if (typeof options === 'function') {
    get = options;
  } else {
    get = options.get;
    set = options.set;
  }
  var computedHost = defineComponentInstance(getCurrentVue(), {
    computed: {
      $$state: {
        get: get,
        set: set,
      },
    },
  });
  vm &&
    vm.$on('hook:destroyed', function () {
      return computedHost.$destroy();
    });
  return createRef({
    get: function () {
      return computedHost.$$state;
    },
    set: function (v) {
      if (__DEV__ && !set) {
        warn('Computed property was assigned to but it has no setter.', vm);
        return;
      }
      computedHost.$$state = v;
    },
  });
}

var NOT_FOUND = {};
function resolveInject(provideKey, vm) {
  var source = vm;
  while (source) {
    // @ts-ignore
    if (source._provided && hasOwn(source._provided, provideKey)) {
      //@ts-ignore
      return source._provided[provideKey];
    }
    source = source.$parent;
  }
  return NOT_FOUND;
}
function provide(key, value) {
  var vm = currentVMInFn('provide');
  if (!vm) return;
  if (!vm._provided) {
    var provideCache_1 = {};
    Object.defineProperty(vm, '_provided', {
      get: function () {
        return provideCache_1;
      },
      set: function (v) {
        return Object.assign(provideCache_1, v);
      },
    });
  }
  vm._provided[key] = value;
}
function inject(key, defaultValue) {
  if (!key) {
    return defaultValue;
  }
  var vm = getCurrentVM();
  if (vm) {
    var val = resolveInject(key, vm);
    if (val !== NOT_FOUND) {
      return val;
    } else {
      if (defaultValue === undefined && 'development' !== 'production') {
        warn('Injection "' + String(key) + '" not found', vm);
      }
      return defaultValue;
    }
  } else {
    warn('inject() can only be used inside setup() or functional components.');
  }
}

var _install = function (Vue) {
  return install(Vue, mixin);
};
var plugin = {
  install: _install,
};
// Auto install if it is not done yet and `window` has `Vue`.
// To allow users to avoid auto-installation in some cases,
if (currentVue && typeof window !== 'undefined' && window.Vue) {
  _install(window.Vue);
}

export default plugin;
export {
  computed,
  createComponent,
  createElement,
  defineComponent,
  getCurrentVM as getCurrentInstance,
  inject,
  isReactive,
  isRef,
  markRaw,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onServerPrefetch,
  onUnmounted,
  onUpdated,
  provide,
  reactive,
  ref,
  set,
  shallowReactive,
  shallowRef,
  toRaw,
  toRef,
  toRefs,
  triggerRef,
  unref,
  watch,
  watchEffect,
};
