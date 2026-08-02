import {
    J as e,
    Sn as t,
    Ut as n,
    Xt as r,
    Y as i,
    it as a,
    nt as o,
    or as s,
    q as c,
    rr as l,
    tt as u,
} from './dist-BjNOdvyx.js';
import { d, t as f } from './button-BzNzzr7Y.js';
import { n as p } from './x-dBkW_o3i.js';
var m = a({
    __name: `DialogFooter`,
    props: {
        class: { type: [Boolean, null, String, Object, Array] },
        showCloseButton: { type: Boolean, default: !1 },
    },
    setup(a) {
        let m = a;
        return (h, g) => (
            n(),
            i(
                `div`,
                {
                    'data-slot': `dialog-footer`,
                    class: s(
                        l(d)(
                            `flex flex-col-reverse gap-2 sm:flex-row sm:justify-end`,
                            m.class,
                        ),
                    ),
                },
                [
                    r(h.$slots, `default`),
                    a.showCloseButton
                        ? (n(),
                          c(
                              l(p),
                              { key: 0, 'as-child': `` },
                              {
                                  default: t(() => [
                                      o(
                                          l(f),
                                          { variant: `outline` },
                                          {
                                              default: t(() => [
                                                  ...(g[0] ||= [
                                                      u(` Close `, -1),
                                                  ]),
                                              ]),
                                              _: 1,
                                          },
                                      ),
                                  ]),
                                  _: 1,
                              },
                          ))
                        : e(``, !0),
                ],
                2,
            )
        );
    },
});
export { m as t };
