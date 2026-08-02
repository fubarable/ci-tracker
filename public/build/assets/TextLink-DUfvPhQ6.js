import {
    Sn as e,
    Ut as t,
    Xt as n,
    i as r,
    it as i,
    q as a,
    rr as o,
} from './dist-BjNOdvyx.js';
var s = i({
    __name: `TextLink`,
    props: { href: {}, tabindex: {}, method: {}, as: {} },
    setup(i) {
        return (s, c) => (
            t(),
            a(
                o(r),
                {
                    href: i.href,
                    tabindex: i.tabindex,
                    method: i.method,
                    as: i.as,
                    class: `text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500`,
                },
                { default: e(() => [n(s.$slots, `default`)]), _: 3 },
                8,
                [`href`, `tabindex`, `method`, `as`],
            )
        );
    },
});
export { s as t };
