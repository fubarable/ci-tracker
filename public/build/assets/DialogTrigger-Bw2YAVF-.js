import { i as e, n as t, r as n } from './Presence-2uTOxF-0.js';
import {
    J as r,
    K as i,
    Lt as a,
    Sn as o,
    Ut as s,
    Xt as c,
    Y as l,
    it as u,
    kt as d,
    mt as f,
    nt as p,
    or as m,
    q as h,
    rr as g,
    sr as _,
} from './dist-BjNOdvyx.js';
import { c as v, d as y, s as b } from './button-BzNzzr7Y.js';
import { t as x } from './useForwardExpose-JHVakd1j.js';
import { i as S, n as C, r as w, t as T } from './x-dBkW_o3i.js';
import {
    a as E,
    i as D,
    n as O,
    r as k,
    t as A,
} from './DialogTitle-5Rzv9E0b.js';
var j = u({
        __name: `DialogTrigger`,
        props: {
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1, default: `button` },
        },
        setup(e) {
            let n = e,
                r = S(),
                { forwardRef: i, currentElement: l } = x();
            return (
                (r.contentId ||= t(void 0, `reka-dialog-content`)),
                a(() => {
                    r.triggerElement.value = l.value;
                }),
                (e, t) => (
                    s(),
                    h(
                        g(v),
                        d(n, {
                            ref: g(i),
                            type: e.as === `button` ? `button` : void 0,
                            'aria-haspopup': `dialog`,
                            'aria-expanded': g(r).open.value || !1,
                            'aria-controls': g(r).open.value
                                ? g(r).contentId
                                : void 0,
                            'data-state': g(r).open.value ? `open` : `closed`,
                            onClick: g(r).onOpenToggle,
                        }),
                        { default: o(() => [c(e.$slots, `default`)]), _: 3 },
                        16,
                        [
                            `type`,
                            `aria-expanded`,
                            `aria-controls`,
                            `data-state`,
                            `onClick`,
                        ],
                    )
                )
            );
        },
    }),
    M = u({
        __name: `Dialog`,
        props: {
            open: { type: Boolean },
            defaultOpen: { type: Boolean },
            modal: { type: Boolean },
            unmountOnHide: { type: Boolean },
        },
        emits: [`update:open`],
        setup(e, { emit: t }) {
            let r = n(e, t);
            return (e, t) => (
                s(),
                h(
                    g(w),
                    d({ 'data-slot': `dialog` }, g(r)),
                    {
                        default: o((t) => [c(e.$slots, `default`, _(f(t)))]),
                        _: 3,
                    },
                    16,
                )
            );
        },
    }),
    N = u({
        __name: `DialogOverlay`,
        props: {
            forceMount: { type: Boolean },
            asChild: { type: Boolean },
            as: {},
            class: { type: [Boolean, null, String, Object, Array] },
        },
        setup(e) {
            let t = e,
                n = b(t, `class`);
            return (e, r) => (
                s(),
                h(
                    g(k),
                    d({ 'data-slot': `dialog-overlay` }, g(n), {
                        class: g(y)(
                            `data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80`,
                            t.class,
                        ),
                    }),
                    { default: o(() => [c(e.$slots, `default`)]), _: 3 },
                    16,
                    [`class`],
                )
            );
        },
    }),
    P = u({
        inheritAttrs: !1,
        __name: `DialogContent`,
        props: {
            forceMount: { type: Boolean },
            disableOutsidePointerEvents: { type: Boolean },
            asChild: { type: Boolean },
            as: {},
            class: { type: [Boolean, null, String, Object, Array] },
            showCloseButton: { type: Boolean, default: !0 },
        },
        emits: [
            `escapeKeyDown`,
            `pointerDownOutside`,
            `focusOutside`,
            `interactOutside`,
            `openAutoFocus`,
            `closeAutoFocus`,
        ],
        setup(e, { emit: t }) {
            let a = e,
                l = t,
                u = n(b(a, `class`), l);
            return (t, n) => (
                s(),
                h(g(O), null, {
                    default: o(() => [
                        p(N),
                        p(
                            g(E),
                            d(
                                { 'data-slot': `dialog-content` },
                                { ...t.$attrs, ...g(u) },
                                {
                                    class: g(y)(
                                        `bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg`,
                                        a.class,
                                    ),
                                },
                            ),
                            {
                                default: o(() => [
                                    c(t.$slots, `default`),
                                    e.showCloseButton
                                        ? (s(),
                                          h(
                                              g(C),
                                              {
                                                  key: 0,
                                                  'data-slot': `dialog-close`,
                                                  class: `ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
                                              },
                                              {
                                                  default: o(() => [
                                                      p(g(T)),
                                                      (n[0] ||= i(
                                                          `span`,
                                                          { class: `sr-only` },
                                                          `Close`,
                                                          -1,
                                                      )),
                                                  ]),
                                                  _: 1,
                                              },
                                          ))
                                        : r(``, !0),
                                ]),
                                _: 3,
                            },
                            16,
                            [`class`],
                        ),
                    ]),
                    _: 3,
                })
            );
        },
    }),
    F = u({
        __name: `DialogDescription`,
        props: {
            asChild: { type: Boolean },
            as: {},
            class: { type: [Boolean, null, String, Object, Array] },
        },
        setup(t) {
            let n = t,
                r = e(b(n, `class`));
            return (e, t) => (
                s(),
                h(
                    g(D),
                    d({ 'data-slot': `dialog-description` }, g(r), {
                        class: g(y)(`text-muted-foreground text-sm`, n.class),
                    }),
                    { default: o(() => [c(e.$slots, `default`)]), _: 3 },
                    16,
                    [`class`],
                )
            );
        },
    }),
    I = u({
        __name: `DialogHeader`,
        props: { class: { type: [Boolean, null, String, Object, Array] } },
        setup(e) {
            let t = e;
            return (e, n) => (
                s(),
                l(
                    `div`,
                    {
                        'data-slot': `dialog-header`,
                        class: m(
                            g(y)(
                                `flex flex-col gap-2 text-center sm:text-left`,
                                t.class,
                            ),
                        ),
                    },
                    [c(e.$slots, `default`)],
                    2,
                )
            );
        },
    }),
    L = u({
        __name: `DialogTitle`,
        props: {
            asChild: { type: Boolean },
            as: {},
            class: { type: [Boolean, null, String, Object, Array] },
        },
        setup(t) {
            let n = t,
                r = e(b(n, `class`));
            return (e, t) => (
                s(),
                h(
                    g(A),
                    d({ 'data-slot': `dialog-title` }, g(r), {
                        class: g(y)(
                            `text-lg leading-none font-semibold`,
                            n.class,
                        ),
                    }),
                    { default: o(() => [c(e.$slots, `default`)]), _: 3 },
                    16,
                    [`class`],
                )
            );
        },
    }),
    R = u({
        __name: `DialogTrigger`,
        props: { asChild: { type: Boolean }, as: {} },
        setup(e) {
            let t = e;
            return (e, n) => (
                s(),
                h(
                    g(j),
                    d({ 'data-slot': `dialog-trigger` }, t),
                    { default: o(() => [c(e.$slots, `default`)]), _: 3 },
                    16,
                )
            );
        },
    });
export { P as a, F as i, L as n, M as o, I as r, R as t };
