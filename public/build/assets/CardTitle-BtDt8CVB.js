import {
    Ut as e,
    Xt as t,
    Y as n,
    it as r,
    or as i,
    rr as a,
} from './dist-BjNOdvyx.js';
import { d as o } from './button-BzNzzr7Y.js';
var s = r({
        __name: `Card`,
        props: { class: { type: [Boolean, null, String, Object, Array] } },
        setup(r) {
            let s = r;
            return (r, c) => (
                e(),
                n(
                    `div`,
                    {
                        'data-slot': `card`,
                        class: i(
                            a(o)(
                                `bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm`,
                                s.class,
                            ),
                        ),
                    },
                    [t(r.$slots, `default`)],
                    2,
                )
            );
        },
    }),
    c = r({
        __name: `CardContent`,
        props: { class: { type: [Boolean, null, String, Object, Array] } },
        setup(r) {
            let s = r;
            return (r, c) => (
                e(),
                n(
                    `div`,
                    {
                        'data-slot': `card-content`,
                        class: i(a(o)(`px-6`, s.class)),
                    },
                    [t(r.$slots, `default`)],
                    2,
                )
            );
        },
    }),
    l = r({
        __name: `CardHeader`,
        props: { class: { type: [Boolean, null, String, Object, Array] } },
        setup(r) {
            let s = r;
            return (r, c) => (
                e(),
                n(
                    `div`,
                    {
                        'data-slot': `card-header`,
                        class: i(
                            a(o)(
                                `@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6`,
                                s.class,
                            ),
                        ),
                    },
                    [t(r.$slots, `default`)],
                    2,
                )
            );
        },
    }),
    u = r({
        __name: `CardTitle`,
        props: { class: { type: [Boolean, null, String, Object, Array] } },
        setup(r) {
            let s = r;
            return (r, c) => (
                e(),
                n(
                    `h3`,
                    {
                        'data-slot': `card-title`,
                        class: i(a(o)(`leading-none font-semibold`, s.class)),
                    },
                    [t(r.$slots, `default`)],
                    2,
                )
            );
        },
    });
export { s as i, l as n, c as r, u as t };
