import { l as e } from './Presence-2uTOxF-0.js';
import {
    Sn as t,
    Ut as n,
    Xt as r,
    er as i,
    it as a,
    kt as o,
    q as s,
    qn as c,
    rr as l,
} from './dist-BjNOdvyx.js';
import { c as u } from './button-BzNzzr7Y.js';
import { c as d, t as f } from './useForwardExpose-JHVakd1j.js';
import { t as p } from './createLucideIcon-DhBKMkeN.js';
var [m, h] = e(`DialogRoot`),
    g = a({
        inheritAttrs: !1,
        __name: `DialogRoot`,
        props: {
            open: { type: Boolean, required: !1, default: void 0 },
            defaultOpen: { type: Boolean, required: !1, default: !1 },
            modal: { type: Boolean, required: !1, default: !0 },
            unmountOnHide: { type: Boolean, required: !1, default: !0 },
        },
        emits: [`update:open`],
        setup(e, { emit: t }) {
            let n = e,
                a = d(n, `open`, t, {
                    defaultValue: n.defaultOpen,
                    passive: n.open === void 0,
                }),
                o = c(),
                s = c(),
                { modal: u, unmountOnHide: f } = i(n);
            return (
                h({
                    open: a,
                    modal: u,
                    unmountOnHide: f,
                    openModal: () => {
                        a.value = !0;
                    },
                    onOpenChange: (e) => {
                        a.value = e;
                    },
                    onOpenToggle: () => {
                        a.value = !a.value;
                    },
                    contentId: ``,
                    titleId: ``,
                    descriptionId: ``,
                    triggerElement: o,
                    contentElement: s,
                }),
                (e, t) =>
                    r(e.$slots, `default`, {
                        open: l(a),
                        close: () => (a.value = !1),
                    })
            );
        },
    }),
    _ = a({
        __name: `DialogClose`,
        props: {
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1, default: `button` },
        },
        setup(e) {
            let i = e;
            f();
            let a = m();
            return (e, c) => (
                n(),
                s(
                    l(u),
                    o(i, {
                        type: e.as === `button` ? `button` : void 0,
                        onClick: (c[0] ||= (e) => l(a).onOpenChange(!1)),
                    }),
                    { default: t(() => [r(e.$slots, `default`)]), _: 3 },
                    16,
                    [`type`],
                )
            );
        },
    }),
    v = p(`x`, [
        [`path`, { d: `M18 6 6 18`, key: `1bl5f8` }],
        [`path`, { d: `m6 6 12 12`, key: `d8bk6v` }],
    ]);
export { m as i, _ as n, g as r, v as t };
