import { c as e, o as t, s as n } from './Presence-2uTOxF-0.js';
import {
    At as r,
    G as i,
    Gn as a,
    J as o,
    Sn as s,
    Ut as c,
    Vt as l,
    Xt as u,
    _n as d,
    cr as f,
    it as p,
    q as m,
    qn as h,
    rr as g,
    tr as _,
    vn as v,
    z as y,
} from './dist-BjNOdvyx.js';
import { c as b } from './button-BzNzzr7Y.js';
import {
    a as x,
    d as S,
    f as C,
    g as w,
    i as ee,
    o as te,
    p as T,
    r as ne,
    t as E,
    u as re,
} from './useForwardExpose-JHVakd1j.js';
function D(e, t, n) {
    let r = n.originalEvent.target,
        i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
    (t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(i));
}
function O(e) {
    if (typeof e != `object` || !e) return !1;
    let t = Object.getPrototypeOf(e);
    return (t !== null &&
        t !== Object.prototype &&
        Object.getPrototypeOf(t) !== null) ||
        Symbol.iterator in e
        ? !1
        : Symbol.toStringTag in e
          ? Object.prototype.toString.call(e) === `[object Module]`
          : !0;
}
function k(e, t, n = `.`, r) {
    if (!O(t)) return k(e, {}, n, r);
    let i = { ...t };
    for (let t of Object.keys(e)) {
        if (t === `__proto__` || t === `constructor`) continue;
        let a = e[t];
        a != null &&
            ((r && r(i, t, a, n)) ||
                (Array.isArray(a) && Array.isArray(i[t])
                    ? (i[t] = [...a, ...i[t]])
                    : O(a) && O(i[t])
                      ? (i[t] = k(
                            a,
                            i[t],
                            (n ? `${n}.` : ``) + t.toString(),
                            r,
                        ))
                      : (i[t] = a)));
    }
    return i;
}
function ie(e) {
    return (...t) => t.reduce((t, n) => k(t, n, ``, e), {});
}
var A = ie(),
    ae = S(() => {
        let e = h(new Map()),
            n = h(),
            a = i(() => {
                for (let t of e.value.values()) if (t) return !0;
                return !1;
            }),
            o = t({ scrollBody: h(!0) }),
            s = null,
            c = () => {
                ((document.body.style.paddingRight = ``),
                    (document.body.style.marginRight = ``),
                    (document.body.style.pointerEvents = ``),
                    document.documentElement.style.removeProperty(
                        `--scrollbar-width`,
                    ),
                    (document.body.style.overflow = n.value ?? ``),
                    T && s?.(),
                    (n.value = void 0));
            };
        return (
            d(
                a,
                (e, t) => {
                    if (!C) return;
                    if (!e) {
                        t && c();
                        return;
                    }
                    n.value === void 0 &&
                        (n.value = document.body.style.overflow);
                    let i =
                            window.innerWidth -
                            document.documentElement.clientWidth,
                        l = { padding: i, margin: 0 },
                        u = o.scrollBody?.value
                            ? typeof o.scrollBody.value == `object`
                                ? A(
                                      {
                                          padding:
                                              o.scrollBody.value.padding === !0
                                                  ? i
                                                  : o.scrollBody.value.padding,
                                          margin:
                                              o.scrollBody.value.margin === !0
                                                  ? i
                                                  : o.scrollBody.value.margin,
                                      },
                                      l,
                                  )
                                : l
                            : { padding: 0, margin: 0 };
                    (i > 0 &&
                        ((document.body.style.paddingRight =
                            typeof u.padding == `number`
                                ? `${u.padding}px`
                                : String(u.padding)),
                        (document.body.style.marginRight =
                            typeof u.margin == `number`
                                ? `${u.margin}px`
                                : String(u.margin)),
                        document.documentElement.style.setProperty(
                            `--scrollbar-width`,
                            `${i}px`,
                        ),
                        (document.body.style.overflow = `hidden`)),
                        T &&
                            (s = x(document, `touchmove`, (e) => oe(e), {
                                passive: !1,
                            })),
                        r(() => {
                            a.value &&
                                ((document.body.style.pointerEvents = `none`),
                                (document.body.style.overflow = `hidden`));
                        }));
                },
                { immediate: !0, flush: `sync` },
            ),
            e
        );
    });
function j(e) {
    let t = Math.random().toString(36).substring(2, 7),
        n = ae();
    n.value.set(t, e ?? !1);
    let r = i({
        get: () => n.value.get(t) ?? !1,
        set: (e) => n.value.set(t, e),
    });
    return (
        w(() => {
            n.value.delete(t);
        }),
        r
    );
}
function M(e) {
    let t = window.getComputedStyle(e);
    if (
        t.overflowX === `scroll` ||
        t.overflowY === `scroll` ||
        (t.overflowX === `auto` && e.clientWidth < e.scrollWidth) ||
        (t.overflowY === `auto` && e.clientHeight < e.scrollHeight)
    )
        return !0;
    {
        let t = e.parentNode;
        return !(t instanceof Element) || t.tagName === `BODY` ? !1 : M(t);
    }
}
function oe(e) {
    let t = e || window.event,
        n = t.target;
    return n instanceof Element && M(n)
        ? !1
        : t.touches.length > 1
          ? !0
          : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
var se = function (e) {
        return typeof document > `u`
            ? null
            : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
    },
    N = new WeakMap(),
    P = new WeakMap(),
    F = {},
    I = 0,
    L = function (e) {
        return e && (e.host || L(e.parentNode));
    },
    ce = function (e, t) {
        return t
            .map(function (t) {
                if (e.contains(t)) return t;
                var n = L(t);
                return n && e.contains(n)
                    ? n
                    : (console.error(
                          `aria-hidden`,
                          t,
                          `in not contained inside`,
                          e,
                          `. Doing nothing`,
                      ),
                      null);
            })
            .filter(function (e) {
                return !!e;
            });
    },
    le = function (e, t, n, r) {
        var i = ce(t, Array.isArray(e) ? e : [e]);
        F[n] || (F[n] = new WeakMap());
        var a = F[n],
            o = [],
            s = new Set(),
            c = new Set(i),
            l = function (e) {
                !e || s.has(e) || (s.add(e), l(e.parentNode));
            };
        i.forEach(l);
        var u = function (e) {
            !e ||
                c.has(e) ||
                Array.prototype.forEach.call(e.children, function (e) {
                    if (s.has(e)) u(e);
                    else
                        try {
                            var t = e.getAttribute(r),
                                i = t !== null && t !== `false`,
                                c = (N.get(e) || 0) + 1,
                                l = (a.get(e) || 0) + 1;
                            (N.set(e, c),
                                a.set(e, l),
                                o.push(e),
                                c === 1 && i && P.set(e, !0),
                                l === 1 && e.setAttribute(n, `true`),
                                i || e.setAttribute(r, `true`));
                        } catch (t) {
                            console.error(
                                `aria-hidden: cannot operate on `,
                                e,
                                t,
                            );
                        }
                });
        };
        return (
            u(t),
            s.clear(),
            I++,
            function () {
                (o.forEach(function (e) {
                    var t = N.get(e) - 1,
                        i = a.get(e) - 1;
                    (N.set(e, t),
                        a.set(e, i),
                        t || (P.has(e) || e.removeAttribute(r), P.delete(e)),
                        i || e.removeAttribute(n));
                }),
                    I--,
                    I ||
                        ((N = new WeakMap()),
                        (N = new WeakMap()),
                        (P = new WeakMap()),
                        (F = {})));
            }
        );
    },
    ue = function (e, t, n) {
        n === void 0 && (n = `data-aria-hidden`);
        var r = Array.from(Array.isArray(e) ? e : [e]),
            i = t || se(e);
        return i
            ? (r.push.apply(
                  r,
                  Array.from(i.querySelectorAll(`[aria-live], script`)),
              ),
              le(r, i, n, `aria-hidden`))
            : function () {
                  return null;
              };
    };
function de(e) {
    let t;
    (d(
        () => ee(e),
        (e) => {
            let n = !1;
            try {
                n = !!e?.closest(`[popover]:not(:popover-open)`);
            } catch {}
            e && !n ? (t = ue(e)) : t && t();
        },
    ),
        l(() => {
            t && t();
        }));
}
var R = `dismissableLayer.pointerDownOutside`,
    z = `dismissableLayer.focusOutside`;
function B(e, t) {
    if (!(t instanceof Element)) return !1;
    let n = t.closest(`[data-dismissable-layer]`),
        r =
            e.dataset.dismissableLayer === ``
                ? e
                : e.querySelector(`[data-dismissable-layer]`),
        i = Array.from(
            e.ownerDocument.querySelectorAll(`[data-dismissable-layer]`),
        );
    return !!(n && (r === n || i.indexOf(r) < i.indexOf(n)));
}
function V(e, t, n = !0) {
    let r = t?.value?.ownerDocument ?? globalThis?.document,
        i = h(!1),
        a = h(() => {});
    return (
        v((o) => {
            if (!C || !_(n)) return;
            let s = async (n) => {
                    let o = n.target;
                    if (!(!t?.value || !o)) {
                        if (B(t.value, o)) {
                            i.value = !1;
                            return;
                        }
                        if (n.target && !i.value) {
                            let t = { originalEvent: n };
                            function i() {
                                D(R, e, t);
                            }
                            n.pointerType === `touch`
                                ? (r.removeEventListener(`click`, a.value),
                                  (a.value = i),
                                  r.addEventListener(`click`, a.value, {
                                      once: !0,
                                  }))
                                : i();
                        } else r.removeEventListener(`click`, a.value);
                        i.value = !1;
                    }
                },
                c = window.setTimeout(() => {
                    r.addEventListener(`pointerdown`, s);
                }, 0);
            o(() => {
                (window.clearTimeout(c),
                    r.removeEventListener(`pointerdown`, s),
                    r.removeEventListener(`click`, a.value));
            });
        }),
        {
            onPointerDownCapture: () => {
                _(n) && (i.value = !0);
            },
        }
    );
}
function H(e, t, n = !0) {
    let i = t?.value?.ownerDocument ?? globalThis?.document,
        a = h(!1);
    return (
        v((o) => {
            if (!C || !_(n)) return;
            let s = async (n) => {
                if (!t?.value) return;
                (await r(), await r());
                let i = n.target;
                !t.value ||
                    !i ||
                    B(t.value, i) ||
                    (n.target && !a.value && D(z, e, { originalEvent: n }));
            };
            (i.addEventListener(`focusin`, s),
                o(() => i.removeEventListener(`focusin`, s)));
        }),
        {
            onFocusCapture: () => {
                _(n) && (a.value = !0);
            },
            onBlurCapture: () => {
                _(n) && (a.value = !1);
            },
        }
    );
}
var U = a({
        layersRoot: new Set(),
        layersWithOutsidePointerEventsDisabled: new Set(),
        originalBodyPointerEvents: void 0,
        branches: new Set(),
    }),
    fe = p({
        __name: `DismissableLayer`,
        props: {
            disableOutsidePointerEvents: {
                type: Boolean,
                required: !1,
                default: !1,
            },
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1 },
            present: { type: Boolean, required: !1, default: !0 },
        },
        emits: [
            `escapeKeyDown`,
            `pointerDownOutside`,
            `focusOutside`,
            `interactOutside`,
            `dismiss`,
        ],
        setup(e, { emit: t }) {
            let a = e,
                o = t,
                { forwardRef: l, currentElement: p } = E(),
                h = i(() => p.value?.ownerDocument ?? globalThis.document),
                _ = i(() => U.layersRoot),
                y = i(() =>
                    p.value ? Array.from(_.value).indexOf(p.value) : -1,
                ),
                x = i(() => U.layersWithOutsidePointerEventsDisabled.size > 0),
                S = i(() => {
                    let e = Array.from(_.value),
                        [t] = [
                            ...U.layersWithOutsidePointerEventsDisabled,
                        ].slice(-1),
                        n = e.indexOf(t);
                    return y.value >= n;
                }),
                C = V(async (e) => {
                    let t = [...U.branches].some((t) => t?.contains(e.target));
                    !a.present ||
                        !S.value ||
                        t ||
                        (o(`pointerDownOutside`, e),
                        o(`interactOutside`, e),
                        await r(),
                        e.defaultPrevented || o(`dismiss`));
                }, p),
                w = H((e) => {
                    let t = [...U.branches].some((t) => t?.contains(e.target));
                    !a.present ||
                        t ||
                        (o(`focusOutside`, e),
                        o(`interactOutside`, e),
                        e.defaultPrevented || o(`dismiss`));
                }, p);
            return (
                ne(`Escape`, (e) => {
                    a.present &&
                        y.value === _.value.size - 1 &&
                        (o(`escapeKeyDown`, e),
                        e.defaultPrevented || o(`dismiss`));
                }),
                d(
                    [p, () => a.disableOutsidePointerEvents, () => a.present],
                    ([e, t, r], i, a) => {
                        !e ||
                            !r ||
                            (t &&
                                (U.layersWithOutsidePointerEventsDisabled
                                    .size === 0 &&
                                    ((U.originalBodyPointerEvents =
                                        h.value.body.style.pointerEvents),
                                    (h.value.body.style.pointerEvents = `none`)),
                                U.layersWithOutsidePointerEventsDisabled.add(e),
                                a(() => {
                                    (U.layersWithOutsidePointerEventsDisabled.delete(
                                        e,
                                    ),
                                        U.layersWithOutsidePointerEventsDisabled
                                            .size === 0 &&
                                            !n(U.originalBodyPointerEvents) &&
                                            (h.value.body.style.pointerEvents =
                                                U.originalBodyPointerEvents));
                                })));
                    },
                    { immediate: !0 },
                ),
                d(
                    [p, () => a.present],
                    ([e, t], n, r) => {
                        !e ||
                            !t ||
                            (_.value.add(e),
                            r(() => {
                                _.value.delete(e);
                            }));
                    },
                    { immediate: !0 },
                ),
                v((e) => {
                    e(() => {
                        p.value &&
                            (_.value.delete(p.value),
                            U.layersWithOutsidePointerEventsDisabled.delete(
                                p.value,
                            ));
                    });
                }),
                (e, t) => (
                    c(),
                    m(
                        g(b),
                        {
                            ref: g(l),
                            'as-child': e.asChild,
                            as: e.as,
                            'data-dismissable-layer': ``,
                            style: f({
                                pointerEvents: x.value
                                    ? S.value
                                        ? `auto`
                                        : `none`
                                    : void 0,
                            }),
                            onFocusCapture: g(w).onFocusCapture,
                            onBlurCapture: g(w).onBlurCapture,
                            onPointerdownCapture: g(C).onPointerDownCapture,
                        },
                        { default: s(() => [u(e.$slots, `default`)]), _: 3 },
                        8,
                        [
                            `as-child`,
                            `as`,
                            `style`,
                            `onFocusCapture`,
                            `onBlurCapture`,
                            `onPointerdownCapture`,
                        ],
                    )
                )
            );
        },
    }),
    pe = re(() => h([]));
function me() {
    let e = pe();
    return {
        add(t) {
            let n = e.value[0];
            (t !== n && n?.pause(),
                (e.value = W(e.value, t)),
                e.value.unshift(t));
        },
        remove(t) {
            ((e.value = W(e.value, t)), e.value[0]?.resume());
        },
    };
}
function W(e, t) {
    let n = [...e],
        r = n.indexOf(t);
    return (r !== -1 && n.splice(r, 1), n);
}
var G = `focusScope.autoFocusOnMount`,
    K = `focusScope.autoFocusOnUnmount`,
    q = { bubbles: !1, cancelable: !0 };
function he(t, { select: n = !1 } = {}) {
    let r = e();
    for (let i of t) if ((X(i, { select: n }), e() !== r)) return !0;
}
function ge(e) {
    let t = J(e);
    return [Y(t, e), Y(t.reverse(), e)];
}
function J(e) {
    let t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: (e) => {
                let t = e.tagName === `INPUT` && e.type === `hidden`;
                return e.disabled || e.hidden || t
                    ? NodeFilter.FILTER_SKIP
                    : e.tabIndex >= 0
                      ? NodeFilter.FILTER_ACCEPT
                      : NodeFilter.FILTER_SKIP;
            },
        });
    for (; n.nextNode();) t.push(n.currentNode);
    return t;
}
function Y(e, t) {
    for (let n of e) if (!_e(n, { upTo: t })) return n;
}
function _e(e, { upTo: t }) {
    if (getComputedStyle(e).visibility === `hidden`) return !0;
    for (; e;) {
        if (t !== void 0 && e === t) return !1;
        if (getComputedStyle(e).display === `none`) return !0;
        e = e.parentElement;
    }
    return !1;
}
function ve(e) {
    return e instanceof HTMLInputElement && `select` in e;
}
function X(t, { select: n = !1 } = {}) {
    if (t && t.focus) {
        let r = e();
        (t.focus({ preventScroll: !0 }), t !== r && ve(t) && n && t.select());
    }
}
var ye = p({
        __name: `FocusScope`,
        props: {
            loop: { type: Boolean, required: !1, default: !1 },
            trapped: { type: Boolean, required: !1, default: !1 },
            present: { type: Boolean, required: !1, default: !0 },
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1 },
        },
        emits: [`mountAutoFocus`, `unmountAutoFocus`],
        setup(t, { emit: n }) {
            let i = t,
                o = n,
                { currentRef: l, currentElement: f } = E(),
                p = h(null),
                _ = me(),
                y = a({
                    paused: !1,
                    pause() {
                        this.paused = !0;
                    },
                    resume() {
                        this.paused = !1;
                    },
                });
            v((e) => {
                if (!C) return;
                let t = f.value;
                if (!i.trapped) return;
                function n(e) {
                    if (y.paused || !t) return;
                    let n = e.target;
                    t.contains(n) ? (p.value = n) : X(p.value, { select: !0 });
                }
                function r(e) {
                    if (y.paused || !t) return;
                    let n = e.relatedTarget;
                    n !== null && (t.contains(n) || X(p.value, { select: !0 }));
                }
                function a(e) {
                    let n = p.value;
                    n !== null &&
                        e.some((e) => e.removedNodes.length > 0) &&
                        (t.contains(n) || X(t));
                }
                (document.addEventListener(`focusin`, n),
                    document.addEventListener(`focusout`, r));
                let o = new MutationObserver(a);
                (t && o.observe(t, { childList: !0, subtree: !0 }),
                    e(() => {
                        (document.removeEventListener(`focusin`, n),
                            document.removeEventListener(`focusout`, r),
                            o.disconnect());
                    }));
            });
            function x(t, n) {
                let r = new CustomEvent(G, q),
                    i = (e) => o(`mountAutoFocus`, e);
                (t.addEventListener(G, i),
                    t.dispatchEvent(r),
                    t.removeEventListener(G, i),
                    r.defaultPrevented ||
                        (he(J(t), { select: !0 }), e() === n && X(t)));
            }
            (v(async (t) => {
                let n = f.value;
                if ((await r(), !n)) return;
                i.present !== !1 && _.add(y);
                let a = e();
                (!n.contains(a) && i.present !== !1 && x(n, a),
                    t(() => {
                        let e = new CustomEvent(K, q),
                            t = (e) => {
                                o(`unmountAutoFocus`, e);
                            };
                        (n.addEventListener(K, t),
                            n.dispatchEvent(e),
                            n.setAttribute(`data-focus-scope-unmounting`, ``),
                            setTimeout(() => {
                                (e.defaultPrevented ||
                                    X(a ?? document.body, { select: !0 }),
                                    n.removeEventListener(K, t),
                                    _.remove(y),
                                    n.removeAttribute(
                                        `data-focus-scope-unmounting`,
                                    ));
                            }, 0));
                    }));
            }),
                d(
                    () => i.present,
                    async (t, n) => {
                        if (!C) return;
                        if (t === !1 && n === !0) {
                            _.remove(y);
                            return;
                        }
                        if (t !== !0 || n !== !1) return;
                        (_.add(y), await r());
                        let i = f.value;
                        if (!i) return;
                        let a = e();
                        i.contains(a) || x(i, a);
                    },
                ));
            function S(t) {
                if ((!i.loop && !i.trapped) || y.paused) return;
                let n =
                        t.key === `Tab` &&
                        !t.altKey &&
                        !t.ctrlKey &&
                        !t.metaKey,
                    r = e();
                if (n && r) {
                    let e = t.currentTarget,
                        [n, a] = ge(e);
                    n && a
                        ? !t.shiftKey && r === a
                            ? (t.preventDefault(),
                              i.loop && X(n, { select: !0 }))
                            : t.shiftKey &&
                              r === n &&
                              (t.preventDefault(),
                              i.loop && X(a, { select: !0 }))
                        : r === e && t.preventDefault();
                }
            }
            return (e, t) => (
                c(),
                m(
                    g(b),
                    {
                        ref_key: `currentRef`,
                        ref: l,
                        tabindex: `-1`,
                        'as-child': e.asChild,
                        as: e.as,
                        onKeydown: S,
                    },
                    { default: s(() => [u(e.$slots, `default`)]), _: 3 },
                    8,
                    [`as-child`, `as`],
                )
            );
        },
    }),
    be = `menu.itemSelect`,
    Z = [`Enter`, ` `],
    xe = [`ArrowDown`, `PageUp`, `Home`],
    Q = [`ArrowUp`, `PageDown`, `End`],
    Se = [...xe, ...Q];
([...Z], [...Z]);
function Ce(e) {
    return e ? `open` : `closed`;
}
function $(t) {
    let n = e();
    for (let r of t) if (r === n || (r.focus(), e() !== n)) return;
}
function we(e, t) {
    let { x: n, y: r } = e,
        i = !1;
    for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
        let o = t[e].x,
            s = t[e].y,
            c = t[a].x,
            l = t[a].y;
        s > r != l > r && n < ((c - o) * (r - s)) / (l - s) + o && (i = !i);
    }
    return i;
}
function Te(e, t) {
    return t ? we({ x: e.clientX, y: e.clientY }, t) : !1;
}
function Ee(e) {
    return e.pointerType === `mouse`;
}
var De = p({
    __name: `Teleport`,
    props: {
        to: { type: null, required: !1 },
        disabled: { type: Boolean, required: !1 },
        defer: { type: Boolean, required: !1 },
        forceMount: { type: Boolean, required: !1 },
    },
    setup(e) {
        let n = e,
            r = t({}),
            a = i(() => n.to ?? r.teleportTo?.value ?? `body`),
            s = te();
        return (e, t) =>
            g(s) || e.forceMount
                ? (c(),
                  m(
                      y,
                      {
                          key: 0,
                          to: a.value,
                          disabled: e.disabled,
                          defer: e.defer,
                      },
                      [u(e.$slots, `default`)],
                      8,
                      [`to`, `disabled`, `defer`],
                  ))
                : o(`v-if`, !0);
    },
});
export {
    Z as a,
    Ee as c,
    fe as d,
    de as f,
    D as h,
    Q as i,
    Te as l,
    A as m,
    Se as n,
    $ as o,
    j as p,
    be as r,
    Ce as s,
    De as t,
    ye as u,
};
