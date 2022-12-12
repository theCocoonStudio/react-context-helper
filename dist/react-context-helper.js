import { useState as se, useCallback as G, useMemo as ye, useContext as me, memo as be } from "react";
import { jsx as M } from "react/jsx-runtime";
function m(e) {
  for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  if (process.env.NODE_ENV !== "production") {
    var o = Ee[e], u = o ? typeof o == "function" ? o.apply(null, r) : o : "unknown error nr: " + e;
    throw Error("[Immer] " + u);
  }
  throw Error("[Immer] minified error nr: " + e + (r.length ? " " + r.map(function(i) {
    return "'" + i + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function E(e) {
  return !!e && !!e[d];
}
function N(e) {
  return !!e && (function(t) {
    if (!t || typeof t != "object")
      return !1;
    var r = Object.getPrototypeOf(t);
    if (r === null)
      return !0;
    var n = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
    return n === Object || typeof n == "function" && Function.toString.call(n) === Ne;
  }(e) || Array.isArray(e) || !!e[ce] || !!e.constructor[ce] || L(e) || Q(e));
}
function S(e, t, r) {
  r === void 0 && (r = !1), F(e) === 0 ? (r ? Object.keys : I)(e).forEach(function(n) {
    r && typeof n == "symbol" || t(n, e[n], e);
  }) : e.forEach(function(n, o) {
    return t(o, n, e);
  });
}
function F(e) {
  var t = e[d];
  return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(e) ? 1 : L(e) ? 2 : Q(e) ? 3 : 0;
}
function _(e, t) {
  return F(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function ge(e, t) {
  return F(e) === 2 ? e.get(t) : e[t];
}
function le(e, t, r) {
  var n = F(e);
  n === 2 ? e.set(t, r) : n === 3 ? (e.delete(t), e.add(r)) : e[t] = r;
}
function pe(e, t) {
  return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
}
function L(e) {
  return Ae && e instanceof Map;
}
function Q(e) {
  return De && e instanceof Set;
}
function A(e) {
  return e.o || e.t;
}
function Y(e) {
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  var t = ve(e);
  delete t[d];
  for (var r = I(t), n = 0; n < r.length; n++) {
    var o = r[n], u = t[o];
    u.writable === !1 && (u.writable = !0, u.configurable = !0), (u.get || u.set) && (t[o] = { configurable: !0, writable: !0, enumerable: u.enumerable, value: e[o] });
  }
  return Object.create(Object.getPrototypeOf(e), t);
}
function z(e, t) {
  return t === void 0 && (t = !1), Z(e) || E(e) || !N(e) || (F(e) > 1 && (e.set = e.add = e.clear = e.delete = Pe), Object.freeze(e), t && S(e, function(r, n) {
    return z(n, !0);
  }, !0)), e;
}
function Pe() {
  m(2);
}
function Z(e) {
  return e == null || typeof e != "object" || Object.isFrozen(e);
}
function j(e) {
  var t = H[e];
  return t || m(18, e), t;
}
function Oe(e, t) {
  H[e] || (H[e] = t);
}
function X() {
  return process.env.NODE_ENV === "production" || k || m(0), k;
}
function W(e, t) {
  t && (j("Patches"), e.u = [], e.s = [], e.v = t);
}
function V(e) {
  q(e), e.p.forEach(je), e.p = null;
}
function q(e) {
  e === k && (k = e.l);
}
function re(e) {
  return k = { p: [], l: k, h: e, m: !0, _: 0 };
}
function je(e) {
  var t = e[d];
  t.i === 0 || t.i === 1 ? t.j() : t.O = !0;
}
function $(e, t) {
  t._ = t.p.length;
  var r = t.p[0], n = e !== void 0 && e !== r;
  return t.h.g || j("ES5").S(t, e, n), n ? (r[d].P && (V(t), m(4)), N(e) && (e = K(t, e), t.l || T(t, e)), t.u && j("Patches").M(r[d].t, e, t.u, t.s)) : e = K(t, r, []), V(t), t.u && t.v(t.u, t.s), e !== de ? e : void 0;
}
function K(e, t, r) {
  if (Z(t))
    return t;
  var n = t[d];
  if (!n)
    return S(t, function(u, i) {
      return ne(e, n, t, u, i, r);
    }, !0), t;
  if (n.A !== e)
    return t;
  if (!n.P)
    return T(e, n.t, !0), n.t;
  if (!n.I) {
    n.I = !0, n.A._--;
    var o = n.i === 4 || n.i === 5 ? n.o = Y(n.k) : n.o;
    S(n.i === 3 ? new Set(o) : o, function(u, i) {
      return ne(e, n, o, u, i, r);
    }), T(e, o, !1), r && e.u && j("Patches").R(n, r, e.u, e.s);
  }
  return n.o;
}
function ne(e, t, r, n, o, u) {
  if (process.env.NODE_ENV !== "production" && o === r && m(5), E(o)) {
    var i = K(e, o, u && t && t.i !== 3 && !_(t.D, n) ? u.concat(n) : void 0);
    if (le(r, n, i), !E(i))
      return;
    e.m = !1;
  }
  if (N(o) && !Z(o)) {
    if (!e.h.F && e._ < 1)
      return;
    K(e, o), t && t.A.l || T(e, o);
  }
}
function T(e, t, r) {
  r === void 0 && (r = !1), e.h.F && e.m && z(t, r);
}
function U(e, t) {
  var r = e[d];
  return (r ? A(r) : e)[t];
}
function oe(e, t) {
  if (t in e)
    for (var r = Object.getPrototypeOf(e); r; ) {
      var n = Object.getOwnPropertyDescriptor(r, t);
      if (n)
        return n;
      r = Object.getPrototypeOf(r);
    }
}
function D(e) {
  e.P || (e.P = !0, e.l && D(e.l));
}
function J(e) {
  e.o || (e.o = Y(e.t));
}
function B(e, t, r) {
  var n = L(t) ? j("MapSet").N(t, r) : Q(t) ? j("MapSet").T(t, r) : e.g ? function(o, u) {
    var i = Array.isArray(o), a = { i: i ? 1 : 0, A: u ? u.A : X(), P: !1, I: !1, D: {}, l: u, t: o, k: null, o: null, j: null, C: !1 }, f = a, c = R;
    i && (f = [a], c = C);
    var s = Proxy.revocable(f, c), p = s.revoke, l = s.proxy;
    return a.k = l, a.j = p, l;
  }(t, r) : j("ES5").J(t, r);
  return (r ? r.A : X()).p.push(n), n;
}
function we(e) {
  return E(e) || m(22, e), function t(r) {
    if (!N(r))
      return r;
    var n, o = r[d], u = F(r);
    if (o) {
      if (!o.P && (o.i < 4 || !j("ES5").K(o)))
        return o.t;
      o.I = !0, n = ie(r, u), o.I = !1;
    } else
      n = ie(r, u);
    return S(n, function(i, a) {
      o && ge(o.t, i) === a || le(n, i, t(a));
    }), u === 3 ? new Set(n) : n;
  }(e);
}
function ie(e, t) {
  switch (t) {
    case 2:
      return new Map(e);
    case 3:
      return Array.from(e);
  }
  return Y(e);
}
function xe() {
  function e(i, a) {
    var f = u[i];
    return f ? f.enumerable = a : u[i] = f = { configurable: !0, enumerable: a, get: function() {
      var c = this[d];
      return process.env.NODE_ENV !== "production" && o(c), R.get(c, i);
    }, set: function(c) {
      var s = this[d];
      process.env.NODE_ENV !== "production" && o(s), R.set(s, i, c);
    } }, f;
  }
  function t(i) {
    for (var a = i.length - 1; a >= 0; a--) {
      var f = i[a][d];
      if (!f.P)
        switch (f.i) {
          case 5:
            n(f) && D(f);
            break;
          case 4:
            r(f) && D(f);
        }
    }
  }
  function r(i) {
    for (var a = i.t, f = i.k, c = I(f), s = c.length - 1; s >= 0; s--) {
      var p = c[s];
      if (p !== d) {
        var l = a[p];
        if (l === void 0 && !_(a, p))
          return !0;
        var v = f[p], h = v && v[d];
        if (h ? h.t !== l : !pe(v, l))
          return !0;
      }
    }
    var y = !!a[d];
    return c.length !== I(a).length + (y ? 0 : 1);
  }
  function n(i) {
    var a = i.k;
    if (a.length !== i.t.length)
      return !0;
    var f = Object.getOwnPropertyDescriptor(a, a.length - 1);
    if (f && !f.get)
      return !0;
    for (var c = 0; c < a.length; c++)
      if (!a.hasOwnProperty(c))
        return !0;
    return !1;
  }
  function o(i) {
    i.O && m(3, JSON.stringify(A(i)));
  }
  var u = {};
  Oe("ES5", { J: function(i, a) {
    var f = Array.isArray(i), c = function(p, l) {
      if (p) {
        for (var v = Array(l.length), h = 0; h < l.length; h++)
          Object.defineProperty(v, "" + h, e(h, !0));
        return v;
      }
      var y = ve(l);
      delete y[d];
      for (var w = I(y), P = 0; P < w.length; P++) {
        var x = w[P];
        y[x] = e(x, p || !!y[x].enumerable);
      }
      return Object.create(Object.getPrototypeOf(l), y);
    }(f, i), s = { i: f ? 5 : 4, A: a ? a.A : X(), P: !1, I: !1, D: {}, l: a, t: i, k: c, o: null, O: !1, C: !1 };
    return Object.defineProperty(c, d, { value: s, writable: !0 }), c;
  }, S: function(i, a, f) {
    f ? E(a) && a[d].A === i && t(i.p) : (i.u && function c(s) {
      if (s && typeof s == "object") {
        var p = s[d];
        if (p) {
          var l = p.t, v = p.k, h = p.D, y = p.i;
          if (y === 4)
            S(v, function(g) {
              g !== d && (l[g] !== void 0 || _(l, g) ? h[g] || c(v[g]) : (h[g] = !0, D(p)));
            }), S(l, function(g) {
              v[g] !== void 0 || _(v, g) || (h[g] = !1, D(p));
            });
          else if (y === 5) {
            if (n(p) && (D(p), h.length = !0), v.length < l.length)
              for (var w = v.length; w < l.length; w++)
                h[w] = !1;
            else
              for (var P = l.length; P < v.length; P++)
                h[P] = !0;
            for (var x = Math.min(v.length, l.length), O = 0; O < x; O++)
              v.hasOwnProperty(O) || (h[O] = !0), h[O] === void 0 && c(v[O]);
          }
        }
      }
    }(i.p[0]), t(i.p));
  }, K: function(i) {
    return i.i === 4 ? r(i) : n(i);
  } });
}
var ue, k, ee = typeof Symbol < "u" && typeof Symbol("x") == "symbol", Ae = typeof Map < "u", De = typeof Set < "u", ae = typeof Proxy < "u" && Proxy.revocable !== void 0 && typeof Reflect < "u", de = ee ? Symbol.for("immer-nothing") : ((ue = {})["immer-nothing"] = !0, ue), ce = ee ? Symbol.for("immer-draftable") : "__$immer_draftable", d = ee ? Symbol.for("immer-state") : "__$immer_state", Ee = { 0: "Illegal state", 1: "Immer drafts cannot have computed properties", 2: "This object has been frozen and should not be mutated", 3: function(e) {
  return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
}, 4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.", 5: "Immer forbids circular references", 6: "The first or second argument to `produce` must be a function", 7: "The third argument to `produce` must be a function or undefined", 8: "First argument to `createDraft` must be a plain object, an array, or an immerable object", 9: "First argument to `finishDraft` must be a draft returned by `createDraft`", 10: "The given draft is already finalized", 11: "Object.defineProperty() cannot be used on an Immer draft", 12: "Object.setPrototypeOf() cannot be used on an Immer draft", 13: "Immer only supports deleting array indices", 14: "Immer only supports setting array indices and the 'length' property", 15: function(e) {
  return "Cannot apply patch, path doesn't resolve: " + e;
}, 16: 'Sets cannot have "replace" patches.', 17: function(e) {
  return "Unsupported patch operation: " + e;
}, 18: function(e) {
  return "The plugin for '" + e + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + e + "()` when initializing your application.";
}, 20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available", 21: function(e) {
  return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + e + "'";
}, 22: function(e) {
  return "'current' expects a draft, got: " + e;
}, 23: function(e) {
  return "'original' expects a draft, got: " + e;
}, 24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed" }, Ne = "" + Object.prototype.constructor, I = typeof Reflect < "u" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Object.getOwnPropertyNames, ve = Object.getOwnPropertyDescriptors || function(e) {
  var t = {};
  return I(e).forEach(function(r) {
    t[r] = Object.getOwnPropertyDescriptor(e, r);
  }), t;
}, H = {}, R = { get: function(e, t) {
  if (t === d)
    return e;
  var r = A(e);
  if (!_(r, t))
    return function(o, u, i) {
      var a, f = oe(u, i);
      return f ? "value" in f ? f.value : (a = f.get) === null || a === void 0 ? void 0 : a.call(o.k) : void 0;
    }(e, r, t);
  var n = r[t];
  return e.I || !N(n) ? n : n === U(e.t, t) ? (J(e), e.o[t] = B(e.A.h, n, e)) : n;
}, has: function(e, t) {
  return t in A(e);
}, ownKeys: function(e) {
  return Reflect.ownKeys(A(e));
}, set: function(e, t, r) {
  var n = oe(A(e), t);
  if (n != null && n.set)
    return n.set.call(e.k, r), !0;
  if (!e.P) {
    var o = U(A(e), t), u = o == null ? void 0 : o[d];
    if (u && u.t === r)
      return e.o[t] = r, e.D[t] = !1, !0;
    if (pe(r, o) && (r !== void 0 || _(e.t, t)))
      return !0;
    J(e), D(e);
  }
  return e.o[t] === r && typeof r != "number" && (r !== void 0 || t in e.o) || (e.o[t] = r, e.D[t] = !0, !0);
}, deleteProperty: function(e, t) {
  return U(e.t, t) !== void 0 || t in e.t ? (e.D[t] = !1, J(e), D(e)) : delete e.D[t], e.o && delete e.o[t], !0;
}, getOwnPropertyDescriptor: function(e, t) {
  var r = A(e), n = Reflect.getOwnPropertyDescriptor(r, t);
  return n && { writable: !0, configurable: e.i !== 1 || t !== "length", enumerable: n.enumerable, value: r[t] };
}, defineProperty: function() {
  m(11);
}, getPrototypeOf: function(e) {
  return Object.getPrototypeOf(e.t);
}, setPrototypeOf: function() {
  m(12);
} }, C = {};
S(R, function(e, t) {
  C[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
}), C.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && m(13), C.set.call(this, e, t, void 0);
}, C.set = function(e, t, r) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && m(14), R.set.call(this, e[0], t, r, e[0]);
};
var Se = function() {
  function e(r) {
    var n = this;
    this.g = ae, this.F = !0, this.produce = function(o, u, i) {
      if (typeof o == "function" && typeof u != "function") {
        var a = u;
        u = o;
        var f = n;
        return function(y) {
          var w = this;
          y === void 0 && (y = a);
          for (var P = arguments.length, x = Array(P > 1 ? P - 1 : 0), O = 1; O < P; O++)
            x[O - 1] = arguments[O];
          return f.produce(y, function(g) {
            var te;
            return (te = u).call.apply(te, [w, g].concat(x));
          });
        };
      }
      var c;
      if (typeof u != "function" && m(6), i !== void 0 && typeof i != "function" && m(7), N(o)) {
        var s = re(n), p = B(n, o, void 0), l = !0;
        try {
          c = u(p), l = !1;
        } finally {
          l ? V(s) : q(s);
        }
        return typeof Promise < "u" && c instanceof Promise ? c.then(function(y) {
          return W(s, i), $(y, s);
        }, function(y) {
          throw V(s), y;
        }) : (W(s, i), $(c, s));
      }
      if (!o || typeof o != "object") {
        if ((c = u(o)) === void 0 && (c = o), c === de && (c = void 0), n.F && z(c, !0), i) {
          var v = [], h = [];
          j("Patches").M(o, c, v, h), i(v, h);
        }
        return c;
      }
      m(21, o);
    }, this.produceWithPatches = function(o, u) {
      if (typeof o == "function")
        return function(c) {
          for (var s = arguments.length, p = Array(s > 1 ? s - 1 : 0), l = 1; l < s; l++)
            p[l - 1] = arguments[l];
          return n.produceWithPatches(c, function(v) {
            return o.apply(void 0, [v].concat(p));
          });
        };
      var i, a, f = n.produce(o, u, function(c, s) {
        i = c, a = s;
      });
      return typeof Promise < "u" && f instanceof Promise ? f.then(function(c) {
        return [c, i, a];
      }) : [f, i, a];
    }, typeof (r == null ? void 0 : r.useProxies) == "boolean" && this.setUseProxies(r.useProxies), typeof (r == null ? void 0 : r.autoFreeze) == "boolean" && this.setAutoFreeze(r.autoFreeze);
  }
  var t = e.prototype;
  return t.createDraft = function(r) {
    N(r) || m(8), E(r) && (r = we(r));
    var n = re(this), o = B(this, r, void 0);
    return o[d].C = !0, q(n), o;
  }, t.finishDraft = function(r, n) {
    var o = r && r[d];
    process.env.NODE_ENV !== "production" && (o && o.C || m(9), o.I && m(10));
    var u = o.A;
    return W(u, n), $(void 0, u);
  }, t.setAutoFreeze = function(r) {
    this.F = r;
  }, t.setUseProxies = function(r) {
    r && !ae && m(20), this.g = r;
  }, t.applyPatches = function(r, n) {
    var o;
    for (o = n.length - 1; o >= 0; o--) {
      var u = n[o];
      if (u.path.length === 0 && u.op === "replace") {
        r = u.value;
        break;
      }
    }
    o > -1 && (n = n.slice(o + 1));
    var i = j("Patches").$;
    return E(r) ? i(r, n) : this.produce(r, function(a) {
      return i(a, n);
    });
  }, e;
}(), b = new Se(), _e = b.produce;
b.produceWithPatches.bind(b);
b.setAutoFreeze.bind(b);
b.setUseProxies.bind(b);
b.applyPatches.bind(b);
b.createDraft.bind(b);
b.finishDraft.bind(b);
function Ie(e) {
  var t = se(function() {
    return z(typeof e == "function" ? e() : e, !0);
  }), r = t[1];
  return [t[0], G(function(n) {
    r(typeof n == "function" ? _e(n) : z(n));
  }, [])];
}
xe();
const fe = ({
  value: e,
  contextObj: t,
  children: r
}) => {
  const [n, o] = Ie(e), u = G((f) => {
    o((c) => {
      Object.assign(c, f);
    });
  }, [o]), i = G((f) => {
    o((c) => {
      f.forEach((s) => {
        delete c[s];
      });
    });
  }, [o]), a = ye(() => ({
    ...n,
    updateContext: u,
    removeFromContext: i
  }), [n, u, i]);
  return /* @__PURE__ */ M(t.Provider, {
    value: a,
    children: r
  });
}, ke = (e, t, r) => {
  const n = me(t), o = r.filter((a) => Object.prototype.hasOwnProperty.call(n, a)).map((a) => [a, n[a]]), u = Object.fromEntries(o), [i] = se(be(e));
  return [i, u];
}, he = (e) => e.displayName || e.name || "Component", Me = (e, t, r = {}) => {
  const n = ({
    children: o,
    ...u
  }) => /* @__PURE__ */ M(fe, {
    contextObj: t,
    value: r,
    children: e === fe ? o : /* @__PURE__ */ M(e, {
      ...u,
      children: o
    })
  });
  return n.displayName = `WithContextProvider(${he(e)})`, n;
}, ze = (e, t, r) => {
  const n = ({
    children: o,
    ...u
  }) => {
    const [i, a] = ke(e, t, r);
    return /* @__PURE__ */ M(i, {
      ...a,
      ...u,
      children: o
    });
  };
  return n.displayName = `WithOptimizedConsumer(${he(e)})`, n;
}, Re = (...e) => ({
  children: t
}) => e.reduce((r, n) => /* @__PURE__ */ M(n, {
  children: r
}), t);
export {
  fe as ContextProvider,
  Re as composeProviders,
  ke as useMemoConsumer,
  Me as withContextProvider,
  ze as withOptimizedConsumer
};
