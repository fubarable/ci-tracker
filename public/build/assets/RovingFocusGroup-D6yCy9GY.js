import { l as e } from './Presence-2uTOxF-0.js';
import {
    Sn as t,
    Ut as n,
    Xt as r,
    er as i,
    it as a,
    nt as o,
    q as s,
    qn as c,
    rr as l,
} from './dist-BjNOdvyx.js';
import { c as u } from './button-BzNzzr7Y.js';
import { c as d } from './useForwardExpose-JHVakd1j.js';
import { i as f, n as p } from './VisuallyHidden-CkwGWtf9.js';
import { n as m, r as h, t as g } from './utils-D3Q8CJms.js';
var [_, v] = e(`RovingFocusGroup`),
    y = a({
        __name: `RovingFocusGroup`,
        props: {
            orientation: { type: String, required: !1, default: void 0 },
            dir: { type: String, required: !1 },
            loop: { type: Boolean, required: !1, default: !1 },
            currentTabStopId: { type: [String, null], required: !1 },
            defaultCurrentTabStopId: { type: String, required: !1 },
            preventScrollOnEntryFocus: {
                type: Boolean,
                required: !1,
                default: !1,
            },
            asChild: { type: Boolean, required: !1 },
            as: { type: null, required: !1 },
        },
        emits: [`entryFocus`, `update:currentTabStopId`],
        setup(e, { expose: a, emit: _ }) {
            let y = e,
                b = _,
                { loop: x, orientation: S, dir: C } = i(y),
                w = f(C),
                T = d(y, `currentTabStopId`, b, {
                    defaultValue: y.defaultCurrentTabStopId,
                    passive: y.currentTabStopId === void 0,
                }),
                E = c(!1),
                D = c(!1),
                O = c(0),
                { getItems: k, CollectionSlot: A } = p({ isProvider: !0 });
            function j(e) {
                let t = !D.value;
                if (
                    e.currentTarget &&
                    e.target === e.currentTarget &&
                    t &&
                    !E.value
                ) {
                    let t = new CustomEvent(g, m);
                    if (
                        (e.currentTarget.dispatchEvent(t),
                        b(`entryFocus`, t),
                        !t.defaultPrevented)
                    ) {
                        let e = k()
                            .map((e) => e.ref)
                            .filter((e) => e.dataset.disabled !== ``);
                        h(
                            [
                                e.find(
                                    (e) => e.getAttribute(`data-active`) === ``,
                                ),
                                e.find(
                                    (e) =>
                                        e.getAttribute(`data-highlighted`) ===
                                        ``,
                                ),
                                e.find((e) => e.id === T.value),
                                ...e,
                            ].filter(Boolean),
                            y.preventScrollOnEntryFocus,
                        );
                    }
                }
                D.value = !1;
            }
            function M() {
                setTimeout(() => {
                    D.value = !1;
                }, 1);
            }
            return (
                a({ getItems: k }),
                v({
                    loop: x,
                    dir: w,
                    orientation: S,
                    currentTabStopId: T,
                    onItemFocus: (e) => {
                        T.value = e;
                    },
                    onItemShiftTab: () => {
                        E.value = !0;
                    },
                    onFocusableItemAdd: () => {
                        O.value++;
                    },
                    onFocusableItemRemove: () => {
                        O.value--;
                    },
                }),
                (e, i) => (
                    n(),
                    s(l(A), null, {
                        default: t(() => [
                            o(
                                l(u),
                                {
                                    tabindex: E.value || O.value === 0 ? -1 : 0,
                                    'data-orientation': l(S),
                                    as: e.as,
                                    'as-child': e.asChild,
                                    dir: l(w),
                                    style: { outline: `none` },
                                    onMousedown: (i[0] ||= (e) =>
                                        (D.value = !0)),
                                    onMouseup: M,
                                    onFocus: j,
                                    onBlur: (i[1] ||= (e) => (E.value = !1)),
                                },
                                {
                                    default: t(() => [r(e.$slots, `default`)]),
                                    _: 3,
                                },
                                8,
                                [
                                    `tabindex`,
                                    `data-orientation`,
                                    `as`,
                                    `as-child`,
                                    `dir`,
                                ],
                            ),
                        ]),
                        _: 3,
                    })
                )
            );
        },
    });
export { _ as n, y as t };
