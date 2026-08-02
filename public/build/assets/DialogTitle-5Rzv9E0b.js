import { a as e, c as t, n, t as r } from './Presence-2uTOxF-0.js';
import {
    D as i,
    G as a,
    J as o,
    Lt as s,
    Sn as c,
    Ut as l,
    Xt as u,
    _n as d,
    it as f,
    k as p,
    kt as m,
    mt as h,
    nt as g,
    q as _,
    qn as v,
    rr as y,
    sr as b,
    wn as x,
} from './dist-BjNOdvyx.js';
import { c as S } from './button-BzNzzr7Y.js';
import {
    d as C,
    f as w,
    p as T,
    s as E,
    t as D,
    u as O,
} from './Teleport-sqMVJvDv.js';
import { t as k } from './useForwardExpose-JHVakd1j.js';
import { i as A } from './x-dBkW_o3i.js';
var j = f({
        __name: `DialogContentImpl`,
        props: {
            forceMount: { type: Boolean, required: !1 },
            trapFocus: { type: Boolean, required: !1 },
            disableOutsidePointerEvents: { type: Boolean, required: !1 },
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1 },
            present: { type: Boolean, required: !1 },
        },
        emits: [
            `escapeKeyDown`,
            `pointerDownOutside`,
            `focusOutside`,
            `interactOutside`,
            `openAutoFocus`,
            `closeAutoFocus`,
        ],
        setup(e, { emit: r }) {
            let i = e,
                a = r,
                o = A(),
                { forwardRef: d, currentElement: f } = k();
            return (
                (o.titleId ||= n(void 0, `reka-dialog-title`)),
                (o.descriptionId ||= n(void 0, `reka-dialog-description`)),
                s(() => {
                    ((o.contentElement = f),
                        t() !== document.body &&
                            (o.triggerElement.value = t()));
                }),
                (e, t) => (
                    l(),
                    _(
                        y(O),
                        {
                            'as-child': ``,
                            loop: ``,
                            trapped: i.trapFocus,
                            present: i.present,
                            onMountAutoFocus: (t[5] ||= (e) =>
                                a(`openAutoFocus`, e)),
                            onUnmountAutoFocus: (t[6] ||= (e) =>
                                a(`closeAutoFocus`, e)),
                        },
                        {
                            default: c(() => [
                                g(
                                    y(C),
                                    m(
                                        {
                                            id: y(o).contentId,
                                            ref: y(d),
                                            as: e.as,
                                            'as-child': e.asChild,
                                            present: i.present,
                                            'disable-outside-pointer-events':
                                                e.disableOutsidePointerEvents,
                                            role: `dialog`,
                                            'aria-describedby':
                                                y(o).descriptionId,
                                            'aria-labelledby': y(o).titleId,
                                            'data-state': y(E)(y(o).open.value),
                                        },
                                        e.$attrs,
                                        {
                                            onDismiss: (t[0] ||= (e) =>
                                                y(o).onOpenChange(!1)),
                                            onEscapeKeyDown: (t[1] ||= (e) =>
                                                a(`escapeKeyDown`, e)),
                                            onFocusOutside: (t[2] ||= (e) =>
                                                a(`focusOutside`, e)),
                                            onInteractOutside: (t[3] ||= (e) =>
                                                a(`interactOutside`, e)),
                                            onPointerDownOutside: (t[4] ||= (
                                                e,
                                            ) => a(`pointerDownOutside`, e)),
                                        },
                                    ),
                                    {
                                        default: c(() => [
                                            u(e.$slots, `default`),
                                        ]),
                                        _: 3,
                                    },
                                    16,
                                    [
                                        `id`,
                                        `as`,
                                        `as-child`,
                                        `present`,
                                        `disable-outside-pointer-events`,
                                        `aria-describedby`,
                                        `aria-labelledby`,
                                        `data-state`,
                                    ],
                                ),
                            ]),
                            _: 3,
                        },
                        8,
                        [`trapped`, `present`],
                    )
                )
            );
        },
    }),
    M = f({
        __name: `DialogContentModal`,
        props: {
            forceMount: { type: Boolean, required: !1 },
            trapFocus: { type: Boolean, required: !1 },
            disableOutsidePointerEvents: {
                type: Boolean,
                required: !1,
                default: !0,
            },
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1 },
            present: { type: Boolean, required: !0 },
        },
        emits: [
            `escapeKeyDown`,
            `pointerDownOutside`,
            `focusOutside`,
            `interactOutside`,
            `openAutoFocus`,
            `closeAutoFocus`,
        ],
        setup(t, { emit: n }) {
            let r = t,
                i = n,
                o = A(),
                s = e(i),
                { forwardRef: f, currentElement: p } = k();
            w(a(() => (r.present ? p.value : void 0)));
            let h = a(() => {
                let { present: e, ...t } = r;
                return t;
            });
            return (
                d(
                    () => r.present,
                    (e, t) => {
                        !e && t && o.triggerElement.value?.focus();
                    },
                ),
                (e, t) => (
                    l(),
                    _(
                        j,
                        m(
                            { ...h.value, ...y(s) },
                            {
                                ref: y(f),
                                present: e.present,
                                'trap-focus': y(o).open.value,
                                'disable-outside-pointer-events':
                                    r.disableOutsidePointerEvents,
                                onCloseAutoFocus: (t[0] ||= (e) => {
                                    e.defaultPrevented ||
                                        (e.preventDefault(),
                                        y(o).triggerElement.value?.focus());
                                }),
                                onPointerDownOutside: (t[1] ||= (e) => {
                                    let t = e.detail.originalEvent,
                                        n = t.button === 0 && t.ctrlKey === !0;
                                    (t.button === 2 || n) && e.preventDefault();
                                }),
                                onFocusOutside: (t[2] ||= (e) => {
                                    e.preventDefault();
                                }),
                            },
                        ),
                        { default: c(() => [u(e.$slots, `default`)]), _: 3 },
                        16,
                        [
                            `present`,
                            `trap-focus`,
                            `disable-outside-pointer-events`,
                        ],
                    )
                )
            );
        },
    }),
    N = f({
        __name: `DialogContentNonModal`,
        props: {
            forceMount: { type: Boolean, required: !1 },
            trapFocus: { type: Boolean, required: !1 },
            disableOutsidePointerEvents: { type: Boolean, required: !1 },
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1 },
            present: { type: Boolean, required: !0 },
        },
        emits: [
            `escapeKeyDown`,
            `pointerDownOutside`,
            `focusOutside`,
            `interactOutside`,
            `openAutoFocus`,
            `closeAutoFocus`,
        ],
        setup(t, { emit: n }) {
            let r = t,
                i = e(n);
            k();
            let o = A(),
                s = v(!1),
                f = v(!1),
                p = a(() => {
                    let { present: e, ...t } = r;
                    return t;
                });
            return (
                d(
                    () => r.present,
                    (e, t) => {
                        !e &&
                            t &&
                            (s.value || o.triggerElement.value?.focus(),
                            (s.value = !1),
                            (f.value = !1));
                    },
                ),
                (e, t) => (
                    l(),
                    _(
                        j,
                        m(
                            { ...p.value, ...y(i) },
                            {
                                present: e.present,
                                'trap-focus': !1,
                                'disable-outside-pointer-events': !1,
                                onCloseAutoFocus: (t[0] ||= (e) => {
                                    (e.defaultPrevented ||
                                        (s.value ||
                                            y(o).triggerElement.value?.focus(),
                                        e.preventDefault()),
                                        (s.value = !1),
                                        (f.value = !1));
                                }),
                                onInteractOutside: (t[1] ||= (e) => {
                                    e.defaultPrevented ||
                                        ((s.value = !0),
                                        e.detail.originalEvent.type ===
                                            `pointerdown` && (f.value = !0));
                                    let t = e.target;
                                    (y(o).triggerElement.value?.contains(t) &&
                                        e.preventDefault(),
                                        e.detail.originalEvent.type ===
                                            `focusin` &&
                                            f.value &&
                                            e.preventDefault());
                                }),
                            },
                        ),
                        { default: c(() => [u(e.$slots, `default`)]), _: 3 },
                        16,
                        [`present`],
                    )
                )
            );
        },
    }),
    P = f({
        __name: `DialogContent`,
        props: {
            forceMount: { type: Boolean, required: !1 },
            disableOutsidePointerEvents: {
                type: Boolean,
                required: !1,
                default: void 0,
            },
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1 },
        },
        emits: [
            `escapeKeyDown`,
            `pointerDownOutside`,
            `focusOutside`,
            `interactOutside`,
            `openAutoFocus`,
            `closeAutoFocus`,
        ],
        setup(t, { emit: n }) {
            let a = t,
                o = n,
                s = A(),
                d = e(o),
                { forwardRef: f } = k();
            return (e, t) => (
                l(),
                _(
                    y(r),
                    {
                        present: e.forceMount || y(s).open.value,
                        'force-mount':
                            e.forceMount || !y(s).unmountOnHide.value,
                    },
                    {
                        default: c(({ present: t }) => [
                            y(s).modal.value
                                ? x(
                                      (l(),
                                      _(
                                          M,
                                          m(
                                              {
                                                  key: 0,
                                                  ref: y(f),
                                                  present:
                                                      y(s).unmountOnHide
                                                          .value || t,
                                              },
                                              { ...a, ...y(d), ...e.$attrs },
                                          ),
                                          {
                                              default: c(() => [
                                                  u(e.$slots, `default`),
                                              ]),
                                              _: 2,
                                          },
                                          1040,
                                          [`present`],
                                      )),
                                      [[i, y(s).unmountOnHide.value || t]],
                                  )
                                : x(
                                      (l(),
                                      _(
                                          N,
                                          m(
                                              {
                                                  key: 1,
                                                  ref: y(f),
                                                  present:
                                                      y(s).unmountOnHide
                                                          .value || t,
                                              },
                                              { ...a, ...y(d), ...e.$attrs },
                                          ),
                                          {
                                              default: c(() => [
                                                  u(e.$slots, `default`),
                                              ]),
                                              _: 2,
                                          },
                                          1040,
                                          [`present`],
                                      )),
                                      [[i, y(s).unmountOnHide.value || t]],
                                  ),
                        ]),
                        _: 3,
                    },
                    8,
                    [`present`, `force-mount`],
                )
            );
        },
    }),
    F = f({
        __name: `DialogDescription`,
        props: {
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1, default: `p` },
        },
        setup(e) {
            let t = e;
            k();
            let n = A();
            return (e, r) => (
                l(),
                _(
                    y(S),
                    m(t, { id: y(n).descriptionId }),
                    { default: c(() => [u(e.$slots, `default`)]), _: 3 },
                    16,
                    [`id`],
                )
            );
        },
    }),
    I = f({
        __name: `DialogOverlayImpl`,
        props: {
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1 },
            present: { type: Boolean, required: !1, default: !0 },
        },
        setup(e) {
            let t = e,
                n = A(),
                r = T(t.present);
            return (
                d(
                    () => t.present,
                    (e) => (r.value = e),
                ),
                k(),
                (e, t) => (
                    l(),
                    _(
                        y(S),
                        {
                            as: e.as,
                            'as-child': e.asChild,
                            'data-state': y(n).open.value ? `open` : `closed`,
                            style: { 'pointer-events': `auto` },
                            onPointerdown: (t[0] ||= p(() => {}, [
                                `left`,
                                `self`,
                                `prevent`,
                            ])),
                        },
                        { default: c(() => [u(e.$slots, `default`)]), _: 3 },
                        8,
                        [`as`, `as-child`, `data-state`],
                    )
                )
            );
        },
    }),
    L = f({
        __name: `DialogOverlay`,
        props: {
            forceMount: { type: Boolean, required: !1 },
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1 },
        },
        setup(e) {
            let t = A(),
                { forwardRef: n } = k();
            return (e, a) =>
                y(t)?.modal.value
                    ? (l(),
                      _(
                          y(r),
                          {
                              key: 0,
                              present: e.forceMount || y(t).open.value,
                              'force-mount':
                                  e.forceMount || !y(t).unmountOnHide.value,
                          },
                          {
                              default: c(({ present: r }) => [
                                  x(
                                      g(
                                          I,
                                          m(e.$attrs, {
                                              ref: y(n),
                                              as: e.as,
                                              'as-child': e.asChild,
                                              present:
                                                  y(t).unmountOnHide.value || r,
                                          }),
                                          {
                                              default: c(() => [
                                                  u(e.$slots, `default`),
                                              ]),
                                              _: 2,
                                          },
                                          1040,
                                          [`as`, `as-child`, `present`],
                                      ),
                                      [[i, y(t).unmountOnHide.value || r]],
                                  ),
                              ]),
                              _: 3,
                          },
                          8,
                          [`present`, `force-mount`],
                      ))
                    : o(`v-if`, !0);
        },
    }),
    R = f({
        __name: `DialogPortal`,
        props: {
            to: { type: null, required: !1 },
            disabled: { type: Boolean, required: !1 },
            defer: { type: Boolean, required: !1 },
            forceMount: { type: Boolean, required: !1 },
        },
        setup(e) {
            let t = e;
            return (e, n) => (
                l(),
                _(
                    y(D),
                    b(h(t)),
                    { default: c(() => [u(e.$slots, `default`)]), _: 3 },
                    16,
                )
            );
        },
    }),
    z = f({
        __name: `DialogTitle`,
        props: {
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1, default: `h2` },
        },
        setup(e) {
            let t = e,
                n = A();
            return (
                k(),
                (e, r) => (
                    l(),
                    _(
                        y(S),
                        m(t, { id: y(n).titleId }),
                        { default: c(() => [u(e.$slots, `default`)]), _: 3 },
                        16,
                        [`id`],
                    )
                )
            );
        },
    });
export { P as a, F as i, R as n, L as r, z as t };
