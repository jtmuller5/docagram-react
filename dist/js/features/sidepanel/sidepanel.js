/*! For license information please see sidepanel.js.LICENSE.txt */
(() => {
  "use strict";
  var e = {
      20: (e, t, r) => {
        var n = r(540);
        Symbol.for("react.element"),
          Symbol.for("react.fragment"),
          Object.prototype.hasOwnProperty,
          n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
            .ReactCurrentOwner;
      },
      287: (e, t) => {
        var r = Symbol.for("react.element"),
          n = Symbol.for("react.portal"),
          o = Symbol.for("react.fragment"),
          u = Symbol.for("react.strict_mode"),
          a = Symbol.for("react.profiler"),
          c = Symbol.for("react.provider"),
          i = Symbol.for("react.context"),
          f = Symbol.for("react.forward_ref"),
          s = Symbol.for("react.suspense"),
          l = Symbol.for("react.memo"),
          p = Symbol.for("react.lazy"),
          y = Symbol.iterator,
          d = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          _ = Object.assign,
          h = {};
        function m(e, t, r) {
          (this.props = e),
            (this.context = t),
            (this.refs = h),
            (this.updater = r || d);
        }
        function v() {}
        function b(e, t, r) {
          (this.props = e),
            (this.context = t),
            (this.refs = h),
            (this.updater = r || d);
        }
        (m.prototype.isReactComponent = {}),
          (m.prototype.setState = function (e, t) {
            if ("object" != typeof e && "function" != typeof e && null != e)
              throw Error(
                "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
              );
            this.updater.enqueueSetState(this, e, t, "setState");
          }),
          (m.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, "forceUpdate");
          }),
          (v.prototype = m.prototype);
        var S = (b.prototype = new v());
        (S.constructor = b), _(S, m.prototype), (S.isPureReactComponent = !0);
        var E = Array.isArray,
          R = Object.prototype.hasOwnProperty,
          w = { current: null },
          $ = { key: !0, ref: !0, __self: !0, __source: !0 };
        function k(e, t, n) {
          var o,
            u = {},
            a = null,
            c = null;
          if (null != t)
            for (o in (void 0 !== t.ref && (c = t.ref),
            void 0 !== t.key && (a = "" + t.key),
            t))
              R.call(t, o) && !$.hasOwnProperty(o) && (u[o] = t[o]);
          var i = arguments.length - 2;
          if (1 === i) u.children = n;
          else if (1 < i) {
            for (var f = Array(i), s = 0; s < i; s++) f[s] = arguments[s + 2];
            u.children = f;
          }
          if (e && e.defaultProps)
            for (o in (i = e.defaultProps)) void 0 === u[o] && (u[o] = i[o]);
          return {
            $$typeof: r,
            type: e,
            key: a,
            ref: c,
            props: u,
            _owner: w.current,
          };
        }
        function C(e) {
          return "object" == typeof e && null !== e && e.$$typeof === r;
        }
        var O = /\/+/g;
        function g(e, t) {
          return "object" == typeof e && null !== e && null != e.key
            ? (function (e) {
                var t = { "=": "=0", ":": "=2" };
                return (
                  "$" +
                  e.replace(/[=:]/g, function (e) {
                    return t[e];
                  })
                );
              })("" + e.key)
            : t.toString(36);
        }
        function j(e, t, o, u, a) {
          var c = typeof e;
          ("undefined" !== c && "boolean" !== c) || (e = null);
          var i = !1;
          if (null === e) i = !0;
          else
            switch (c) {
              case "string":
              case "number":
                i = !0;
                break;
              case "object":
                switch (e.$$typeof) {
                  case r:
                  case n:
                    i = !0;
                }
            }
          if (i)
            return (
              (a = a((i = e))),
              (e = "" === u ? "." + g(i, 0) : u),
              E(a)
                ? ((o = ""),
                  null != e && (o = e.replace(O, "$&/") + "/"),
                  j(a, t, o, "", function (e) {
                    return e;
                  }))
                : null != a &&
                  (C(a) &&
                    (a = (function (e, t) {
                      return {
                        $$typeof: r,
                        type: e.type,
                        key: t,
                        ref: e.ref,
                        props: e.props,
                        _owner: e._owner,
                      };
                    })(
                      a,
                      o +
                        (!a.key || (i && i.key === a.key)
                          ? ""
                          : ("" + a.key).replace(O, "$&/") + "/") +
                        e
                    )),
                  t.push(a)),
              1
            );
          if (((i = 0), (u = "" === u ? "." : u + ":"), E(e)))
            for (var f = 0; f < e.length; f++) {
              var s = u + g((c = e[f]), f);
              i += j(c, t, o, s, a);
            }
          else if (
            ((s = (function (e) {
              return null === e || "object" != typeof e
                ? null
                : "function" == typeof (e = (y && e[y]) || e["@@iterator"])
                ? e
                : null;
            })(e)),
            "function" == typeof s)
          )
            for (e = s.call(e), f = 0; !(c = e.next()).done; )
              i += j((c = c.value), t, o, (s = u + g(c, f++)), a);
          else if ("object" === c)
            throw (
              ((t = String(e)),
              Error(
                "Objects are not valid as a React child (found: " +
                  ("[object Object]" === t
                    ? "object with keys {" + Object.keys(e).join(", ") + "}"
                    : t) +
                  "). If you meant to render a collection of children, use an array instead."
              ))
            );
          return i;
        }
        function x(e, t, r) {
          if (null == e) return e;
          var n = [],
            o = 0;
          return (
            j(e, n, "", "", function (e) {
              return t.call(r, e, o++);
            }),
            n
          );
        }
        function I(e) {
          if (-1 === e._status) {
            var t = e._result;
            (t = t()).then(
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 1), (e._result = t));
              },
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 2), (e._result = t));
              }
            ),
              -1 === e._status && ((e._status = 0), (e._result = t));
          }
          if (1 === e._status) return e._result.default;
          throw e._result;
        }
        var P = { current: null },
          T = { transition: null },
          D = {
            ReactCurrentDispatcher: P,
            ReactCurrentBatchConfig: T,
            ReactCurrentOwner: w,
          };
        function L() {
          throw Error(
            "act(...) is not supported in production builds of React."
          );
        }
        (t.Children = {
          map: x,
          forEach: function (e, t, r) {
            x(
              e,
              function () {
                t.apply(this, arguments);
              },
              r
            );
          },
          count: function (e) {
            var t = 0;
            return (
              x(e, function () {
                t++;
              }),
              t
            );
          },
          toArray: function (e) {
            return (
              x(e, function (e) {
                return e;
              }) || []
            );
          },
          only: function (e) {
            if (!C(e))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return e;
          },
        }),
          (t.Component = m),
          (t.Fragment = o),
          (t.Profiler = a),
          (t.PureComponent = b),
          (t.StrictMode = u),
          (t.Suspense = s),
          (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = D),
          (t.act = L),
          (t.cloneElement = function (e, t, n) {
            if (null == e)
              throw Error(
                "React.cloneElement(...): The argument must be a React element, but you passed " +
                  e +
                  "."
              );
            var o = _({}, e.props),
              u = e.key,
              a = e.ref,
              c = e._owner;
            if (null != t) {
              if (
                (void 0 !== t.ref && ((a = t.ref), (c = w.current)),
                void 0 !== t.key && (u = "" + t.key),
                e.type && e.type.defaultProps)
              )
                var i = e.type.defaultProps;
              for (f in t)
                R.call(t, f) &&
                  !$.hasOwnProperty(f) &&
                  (o[f] = void 0 === t[f] && void 0 !== i ? i[f] : t[f]);
            }
            var f = arguments.length - 2;
            if (1 === f) o.children = n;
            else if (1 < f) {
              i = Array(f);
              for (var s = 0; s < f; s++) i[s] = arguments[s + 2];
              o.children = i;
            }
            return {
              $$typeof: r,
              type: e.type,
              key: u,
              ref: a,
              props: o,
              _owner: c,
            };
          }),
          (t.createContext = function (e) {
            return (
              ((e = {
                $$typeof: i,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
                _defaultValue: null,
                _globalName: null,
              }).Provider = { $$typeof: c, _context: e }),
              (e.Consumer = e)
            );
          }),
          (t.createElement = k),
          (t.createFactory = function (e) {
            var t = k.bind(null, e);
            return (t.type = e), t;
          }),
          (t.createRef = function () {
            return { current: null };
          }),
          (t.forwardRef = function (e) {
            return { $$typeof: f, render: e };
          }),
          (t.isValidElement = C),
          (t.lazy = function (e) {
            return {
              $$typeof: p,
              _payload: { _status: -1, _result: e },
              _init: I,
            };
          }),
          (t.memo = function (e, t) {
            return { $$typeof: l, type: e, compare: void 0 === t ? null : t };
          }),
          (t.startTransition = function (e) {
            var t = T.transition;
            T.transition = {};
            try {
              e();
            } finally {
              T.transition = t;
            }
          }),
          (t.unstable_act = L),
          (t.useCallback = function (e, t) {
            return P.current.useCallback(e, t);
          }),
          (t.useContext = function (e) {
            return P.current.useContext(e);
          }),
          (t.useDebugValue = function () {}),
          (t.useDeferredValue = function (e) {
            return P.current.useDeferredValue(e);
          }),
          (t.useEffect = function (e, t) {
            return P.current.useEffect(e, t);
          }),
          (t.useId = function () {
            return P.current.useId();
          }),
          (t.useImperativeHandle = function (e, t, r) {
            return P.current.useImperativeHandle(e, t, r);
          }),
          (t.useInsertionEffect = function (e, t) {
            return P.current.useInsertionEffect(e, t);
          }),
          (t.useLayoutEffect = function (e, t) {
            return P.current.useLayoutEffect(e, t);
          }),
          (t.useMemo = function (e, t) {
            return P.current.useMemo(e, t);
          }),
          (t.useReducer = function (e, t, r) {
            return P.current.useReducer(e, t, r);
          }),
          (t.useRef = function (e) {
            return P.current.useRef(e);
          }),
          (t.useState = function (e) {
            return P.current.useState(e);
          }),
          (t.useSyncExternalStore = function (e, t, r) {
            return P.current.useSyncExternalStore(e, t, r);
          }),
          (t.useTransition = function () {
            return P.current.useTransition();
          }),
          (t.version = "18.3.1");
      },
      540: (e, t, r) => {
        e.exports = r(287);
      },
      848: (e, t, r) => {
        r(20);
      },
    },
    t = {};
  function r(n) {
    var o = t[n];
    if (void 0 !== o) return o.exports;
    var u = (t[n] = { exports: {} });
    return e[n](u, u.exports, r), u.exports;
  }
  r(848), r(540);
})();
