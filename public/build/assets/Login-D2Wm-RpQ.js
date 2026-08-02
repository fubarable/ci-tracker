import { l as e, n as t, r as n, s as r, t as i } from './Presence-2uTOxF-0.js';
import {
    $t as a,
    At as o,
    F as s,
    G as c,
    J as l,
    K as u,
    Lt as d,
    O as f,
    Sn as p,
    Ut as m,
    Vt as h,
    Xt as g,
    Y as _,
    _n as v,
    cn as ee,
    ft as y,
    it as b,
    k as x,
    kt as S,
    lr as C,
    mt as w,
    n as T,
    nt as E,
    q as D,
    r as O,
    rr as k,
    sr as te,
    tt as A,
} from './dist-BjNOdvyx.js';
import { c as j, d as M, s as ne, t as re } from './button-BzNzzr7Y.js';
import { n as ie, r as N, t as ae } from './check-DzFiyizp.js';
import { c as oe, t as P } from './useForwardExpose-JHVakd1j.js';
import { n as F } from './VisuallyHidden-CkwGWtf9.js';
import { t as I } from './VisuallyHiddenInput-Dn2PK-mm.js';
import { a as L, i as R, r as z } from './utils-D3Q8CJms.js';
import { n as B } from './RovingFocusGroup-D6yCy9GY.js';
import { t as V } from './Label-BSXB3WZu.js';
import { t as H } from './PasswordInput-BdWN21u9.js';
import { t as U } from './Input-Dpp21zxV.js';
import { n as W } from './wayfinder-Dp7PqxvV.js';
import { t as G } from './InputError-nQpSasUY.js';
import { r as K } from './confirm-H95D8_gG.js';
import { t as q } from './TextLink-DUfvPhQ6.js';
import { n as se } from './password-DAqg_SNm.js';
function J(e, t) {
    return r(e) ? !1 : Array.isArray(e) ? e.some((e) => N(e, t)) : N(e, t);
}
function ce() {
    let e = y()?.vnode?.scopeId;
    return e ? { [e]: `` } : {};
}
var le = b({
        __name: `RovingFocusItem`,
        props: {
            tabStopId: { type: String, required: !1 },
            focusable: { type: Boolean, required: !1, default: !0 },
            active: { type: Boolean, required: !1 },
            allowShiftKey: { type: Boolean, required: !1 },
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1, default: `span` },
        },
        setup(e) {
            let n = e,
                r = B(),
                i = t(),
                a = c(() => n.tabStopId || i),
                s = c(() => r.currentTabStopId.value === a.value),
                { getItems: l, CollectionItem: u } = F();
            (d(() => {
                n.focusable && r.onFocusableItemAdd();
            }),
                h(() => {
                    n.focusable && r.onFocusableItemRemove();
                }),
                v(
                    () => n.focusable,
                    (e, t) => {
                        e !== t &&
                            (e
                                ? r.onFocusableItemAdd()
                                : r.onFocusableItemRemove());
                    },
                ));
            function f(e) {
                if (e.key === `Tab` && e.shiftKey) {
                    r.onItemShiftTab();
                    return;
                }
                if (e.target !== e.currentTarget) return;
                let t = R(e, r.orientation.value, r.dir.value);
                if (t !== void 0) {
                    if (
                        e.metaKey ||
                        e.ctrlKey ||
                        e.altKey ||
                        (!n.allowShiftKey && e.shiftKey)
                    )
                        return;
                    e.preventDefault();
                    let i = [
                        ...l()
                            .map((e) => e.ref)
                            .filter((e) => e.dataset.disabled !== ``),
                    ];
                    if (t === `last`) i.reverse();
                    else if (t === `prev` || t === `next`) {
                        t === `prev` && i.reverse();
                        let n = i.indexOf(e.currentTarget);
                        i = r.loop.value ? L(i, n + 1) : i.slice(n + 1);
                    }
                    o(() => z(i));
                }
            }
            return (e, t) => (
                m(),
                D(k(u), null, {
                    default: p(() => [
                        E(
                            k(j),
                            {
                                tabindex: s.value ? 0 : -1,
                                'data-orientation': k(r).orientation.value,
                                'data-active': e.active ? `` : void 0,
                                'data-disabled': e.focusable ? void 0 : ``,
                                as: e.as,
                                'as-child': e.asChild,
                                onMousedown: (t[0] ||= (t) => {
                                    e.focusable
                                        ? k(r).onItemFocus(a.value)
                                        : t.preventDefault();
                                }),
                                onFocus: (t[1] ||= (e) =>
                                    k(r).onItemFocus(a.value)),
                                onKeydown: f,
                            },
                            {
                                default: p(() => [g(e.$slots, `default`)]),
                                _: 3,
                            },
                            8,
                            [
                                `tabindex`,
                                `data-orientation`,
                                `data-active`,
                                `data-disabled`,
                                `as`,
                                `as-child`,
                            ],
                        ),
                    ]),
                    _: 3,
                })
            );
        },
    }),
    [ue, de] = e(`CheckboxGroupRoot`);
function Y(e) {
    return e === `indeterminate`;
}
function X(e) {
    return Y(e) ? `indeterminate` : e ? `checked` : `unchecked`;
}
var [fe, pe] = e(`CheckboxRoot`),
    me = b({
        inheritAttrs: !1,
        __name: `CheckboxRoot`,
        props: {
            defaultValue: { type: null, required: !1 },
            modelValue: { type: null, required: !1, default: void 0 },
            disabled: { type: Boolean, required: !1 },
            value: { type: null, required: !1, default: `on` },
            id: { type: String, required: !1 },
            trueValue: { type: null, required: !1, default: () => !0 },
            falseValue: { type: null, required: !1, default: () => !1 },
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1, default: `button` },
            name: { type: String, required: !1 },
            required: { type: Boolean, required: !1 },
        },
        emits: [`update:modelValue`],
        setup(e, { emit: t }) {
            let n = e,
                i = t,
                { forwardRef: o, currentElement: u } = P(),
                d = ue(null),
                h = oe(n, `modelValue`, i, {
                    defaultValue: n.defaultValue ?? n.falseValue,
                    passive: n.modelValue === void 0,
                }),
                v = c(() => d?.disabled.value || n.disabled),
                y = c(() => N(h.value, n.trueValue)),
                b = c(() =>
                    r(d?.modelValue.value)
                        ? h.value === `indeterminate`
                            ? `indeterminate`
                            : y.value
                        : J(d.modelValue.value, n.value),
                );
            function C() {
                if (r(d?.modelValue.value))
                    h.value === `indeterminate`
                        ? (h.value = n.trueValue)
                        : (h.value = y.value ? n.falseValue : n.trueValue);
                else {
                    let e = [...(d.modelValue.value || [])];
                    if (J(e, n.value)) {
                        let t = e.findIndex((e) => N(e, n.value));
                        e.splice(t, 1);
                    } else e.push(n.value);
                    d.modelValue.value = e;
                }
            }
            let w = ie(u),
                T = ce(),
                E = ee(),
                O = c(() => {
                    if (!E[`aria-label`])
                        return n.id && u.value
                            ? document.querySelector(`[for="${n.id}"]`)
                                  ?.innerText
                            : void 0;
                });
            return (
                pe({ disabled: v, state: b }),
                (e, t) => (
                    m(),
                    _(
                        s,
                        null,
                        [
                            (m(),
                            D(
                                a(k(d)?.rovingFocus.value ? k(le) : k(j)),
                                S(
                                    { ...e.$attrs, ...k(T) },
                                    {
                                        id: e.id,
                                        ref: k(o),
                                        role: `checkbox`,
                                        'as-child': e.asChild,
                                        as: e.as,
                                        type:
                                            e.as === `button`
                                                ? `button`
                                                : void 0,
                                        'aria-checked': k(Y)(b.value)
                                            ? `mixed`
                                            : b.value,
                                        'aria-required': e.required,
                                        'aria-label':
                                            e.$attrs[`aria-label`] || O.value,
                                        'data-state': k(X)(b.value),
                                        'data-disabled': v.value ? `` : void 0,
                                        disabled: v.value,
                                        focusable: k(d)?.rovingFocus.value
                                            ? !v.value
                                            : void 0,
                                        onKeydown: f(
                                            x(() => {}, [`prevent`]),
                                            [`enter`],
                                        ),
                                        onClick: C,
                                    },
                                ),
                                {
                                    default: p(() => [
                                        g(e.$slots, `default`, {
                                            modelValue: k(h),
                                            state: b.value,
                                        }),
                                    ]),
                                    _: 3,
                                },
                                16,
                                [
                                    `id`,
                                    `as-child`,
                                    `as`,
                                    `type`,
                                    `aria-checked`,
                                    `aria-required`,
                                    `aria-label`,
                                    `data-state`,
                                    `data-disabled`,
                                    `disabled`,
                                    `focusable`,
                                    `onKeydown`,
                                ],
                            )),
                            k(w) && e.name && !k(d)
                                ? (m(),
                                  D(
                                      k(I),
                                      S(
                                          {
                                              key: 0,
                                              type: `checkbox`,
                                              checked: !!b.value,
                                              name: e.name,
                                              value: e.value,
                                              disabled: v.value,
                                              required: e.required,
                                          },
                                          k(T),
                                      ),
                                      null,
                                      16,
                                      [
                                          `checked`,
                                          `name`,
                                          `value`,
                                          `disabled`,
                                          `required`,
                                      ],
                                  ))
                                : l(`v-if`, !0),
                        ],
                        64,
                    )
                )
            );
        },
    }),
    he = b({
        __name: `CheckboxIndicator`,
        props: {
            forceMount: { type: Boolean, required: !1 },
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1, default: `span` },
        },
        setup(e) {
            let { forwardRef: t } = P(),
                n = fe();
            return (e, r) => (
                m(),
                D(
                    k(i),
                    {
                        present:
                            e.forceMount ||
                            k(Y)(k(n).state.value) ||
                            k(n).state.value === !0,
                    },
                    {
                        default: p(() => [
                            E(
                                k(j),
                                S(
                                    {
                                        ref: k(t),
                                        'data-state': k(X)(k(n).state.value),
                                        'data-disabled': k(n).disabled.value
                                            ? ``
                                            : void 0,
                                        style: { pointerEvents: `none` },
                                        'as-child': e.asChild,
                                        as: e.as,
                                    },
                                    e.$attrs,
                                ),
                                {
                                    default: p(() => [g(e.$slots, `default`)]),
                                    _: 3,
                                },
                                16,
                                [
                                    `data-state`,
                                    `data-disabled`,
                                    `as-child`,
                                    `as`,
                                ],
                            ),
                        ]),
                        _: 3,
                    },
                    8,
                    [`present`],
                )
            );
        },
    }),
    Z = b({
        __name: `Checkbox`,
        props: {
            defaultValue: {},
            modelValue: {},
            disabled: { type: Boolean },
            value: {},
            id: {},
            trueValue: {},
            falseValue: {},
            asChild: { type: Boolean },
            as: {},
            name: {},
            required: { type: Boolean },
            class: { type: [Boolean, null, String, Object, Array] },
        },
        emits: [`update:modelValue`],
        setup(e, { emit: t }) {
            let r = e,
                i = t,
                a = n(ne(r, `class`), i);
            return (e, t) => (
                m(),
                D(
                    k(me),
                    S({ 'data-slot': `checkbox` }, k(a), {
                        class: k(M)(
                            `peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50`,
                            r.class,
                        ),
                    }),
                    {
                        default: p((t) => [
                            E(
                                k(he),
                                {
                                    'data-slot': `checkbox-indicator`,
                                    class: `grid place-content-center text-current transition-none`,
                                },
                                {
                                    default: p(() => [
                                        g(e.$slots, `default`, te(w(t)), () => [
                                            E(k(ae), { class: `size-3.5` }),
                                        ]),
                                    ]),
                                    _: 2,
                                },
                                1024,
                            ),
                        ]),
                        _: 3,
                    },
                    16,
                    [`class`],
                )
            );
        },
    }),
    Q = (e) => ({ url: Q.url(e), method: `post` });
((Q.definition = { methods: [`post`], url: `/login` }),
    (Q.url = (e) => Q.definition.url + W(e)),
    (Q.post = (e) => ({ url: Q.url(e), method: `post` })));
var $ = (e) => ({ action: Q.url(e), method: `post` });
(($.post = (e) => ({ action: Q.url(e), method: `post` })),
    (Q.form = $),
    Object.assign(Q, Q));
var ge = {
        key: 0,
        class: `mb-4 text-center text-sm font-medium text-green-600`,
    },
    _e = { class: `grid gap-6` },
    ve = { class: `grid gap-2` },
    ye = { class: `grid gap-2` },
    be = { class: `flex items-center justify-between` },
    xe = { class: `flex items-center justify-between` },
    Se = b({
        layout: {
            title: `Log in to your account`,
            description: `Enter your email and password below to log in`,
        },
        __name: `Login`,
        props: { status: {}, canResetPassword: { type: Boolean } },
        setup(e) {
            return (t, n) => (
                m(),
                _(
                    s,
                    null,
                    [
                        E(k(O), { title: `Log in` }),
                        e.status
                            ? (m(), _(`div`, ge, C(e.status), 1))
                            : l(``, !0),
                        E(
                            k(T),
                            S(k(Q).form(), {
                                'reset-on-success': [`password`],
                                class: `flex flex-col gap-6`,
                            }),
                            {
                                default: p(({ errors: t, processing: r }) => [
                                    u(`div`, _e, [
                                        u(`div`, ve, [
                                            E(
                                                k(V),
                                                { for: `email` },
                                                {
                                                    default: p(() => [
                                                        ...(n[0] ||= [
                                                            A(
                                                                `Email address`,
                                                                -1,
                                                            ),
                                                        ]),
                                                    ]),
                                                    _: 1,
                                                },
                                            ),
                                            E(k(U), {
                                                id: `email`,
                                                type: `email`,
                                                name: `email`,
                                                required: ``,
                                                autofocus: ``,
                                                tabindex: 1,
                                                autocomplete: `email`,
                                                placeholder: `email@example.com`,
                                            }),
                                            E(
                                                G,
                                                { message: t.email },
                                                null,
                                                8,
                                                [`message`],
                                            ),
                                        ]),
                                        u(`div`, ye, [
                                            u(`div`, be, [
                                                E(
                                                    k(V),
                                                    { for: `password` },
                                                    {
                                                        default: p(() => [
                                                            ...(n[1] ||= [
                                                                A(
                                                                    `Password`,
                                                                    -1,
                                                                ),
                                                            ]),
                                                        ]),
                                                        _: 1,
                                                    },
                                                ),
                                                e.canResetPassword
                                                    ? (m(),
                                                      D(
                                                          q,
                                                          {
                                                              key: 0,
                                                              href: k(se)(),
                                                              class: `text-sm`,
                                                              tabindex: 5,
                                                          },
                                                          {
                                                              default: p(() => [
                                                                  ...(n[2] ||= [
                                                                      A(
                                                                          ` Forgot your password? `,
                                                                          -1,
                                                                      ),
                                                                  ]),
                                                              ]),
                                                              _: 1,
                                                          },
                                                          8,
                                                          [`href`],
                                                      ))
                                                    : l(``, !0),
                                            ]),
                                            E(H, {
                                                id: `password`,
                                                name: `password`,
                                                required: ``,
                                                tabindex: 2,
                                                autocomplete: `current-password`,
                                                placeholder: `Password`,
                                            }),
                                            E(
                                                G,
                                                { message: t.password },
                                                null,
                                                8,
                                                [`message`],
                                            ),
                                        ]),
                                        u(`div`, xe, [
                                            E(
                                                k(V),
                                                {
                                                    for: `remember`,
                                                    class: `flex items-center space-x-3`,
                                                },
                                                {
                                                    default: p(() => [
                                                        E(k(Z), {
                                                            id: `remember`,
                                                            name: `remember`,
                                                            tabindex: 3,
                                                        }),
                                                        (n[3] ||= u(
                                                            `span`,
                                                            null,
                                                            `Remember me`,
                                                            -1,
                                                        )),
                                                    ]),
                                                    _: 1,
                                                },
                                            ),
                                        ]),
                                        E(
                                            k(re),
                                            {
                                                type: `submit`,
                                                class: `mt-4 w-full`,
                                                tabindex: 4,
                                                disabled: r,
                                                'data-test': `login-button`,
                                            },
                                            {
                                                default: p(() => [
                                                    r
                                                        ? (m(),
                                                          D(k(K), { key: 0 }))
                                                        : l(``, !0),
                                                    (n[4] ||= A(
                                                        ` Log in `,
                                                        -1,
                                                    )),
                                                ]),
                                                _: 2,
                                            },
                                            1032,
                                            [`disabled`],
                                        ),
                                    ]),
                                ]),
                                _: 1,
                            },
                            16,
                        ),
                    ],
                    64,
                )
            );
        },
    });
export { Se as default };
