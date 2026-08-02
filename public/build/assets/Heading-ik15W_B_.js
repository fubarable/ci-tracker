import {
    J as e,
    K as t,
    Ut as n,
    Y as r,
    it as i,
    lr as a,
    or as o,
} from './dist-BjNOdvyx.js';
var s = { key: 0, class: `text-sm text-muted-foreground` },
    c = i({
        __name: `Heading`,
        props: { title: {}, description: {}, variant: { default: `default` } },
        setup(i) {
            return (c, l) => (
                n(),
                r(
                    `header`,
                    {
                        class: o(
                            i.variant === `small` ? `` : `mb-8 space-y-0.5`,
                        ),
                    },
                    [
                        t(
                            `h2`,
                            {
                                class: o(
                                    i.variant === `small`
                                        ? `mb-0.5 text-base font-medium`
                                        : `text-xl font-semibold tracking-tight`,
                                ),
                            },
                            a(i.title),
                            3,
                        ),
                        i.description
                            ? (n(), r(`p`, s, a(i.description), 1))
                            : e(``, !0),
                    ],
                    2,
                )
            );
        },
    });
export { c as t };
