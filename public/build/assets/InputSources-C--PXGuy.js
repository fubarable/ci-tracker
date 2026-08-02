import {
    F as e,
    J as t,
    K as n,
    O as r,
    Sn as i,
    Ut as a,
    Y as o,
    Yt as s,
    dr as c,
    it as l,
    lr as u,
    nt as d,
    or as f,
    q as p,
    qn as m,
    rr as h,
    tt as g,
} from './dist-BjNOdvyx.js';
import { t as _ } from './button-BzNzzr7Y.js';
import { t as v } from './Input-Dpp21zxV.js';
import { t as y } from './badge-CN-XfSW9.js';
import { i as b, n as x, r as S, t as C } from './CardTitle-BtDt8CVB.js';
var w = { class: `max-w-2xl space-y-6 p-6` },
    T = { key: 0, class: `text-sm text-destructive` },
    E = { key: 1, class: `text-sm text-destructive` },
    D = { class: `divide-y` },
    O = { class: `flex items-center gap-2` },
    k = { key: 0, class: `flex gap-2` },
    A = l({
        __name: `InputSources`,
        props: { sources: {} },
        setup(l) {
            let A = l,
                j = m(``),
                M = m({});
            function N() {
                j.value.trim() &&
                    c.post(
                        `/settings/input-sources`,
                        { name: j.value },
                        {
                            preserveScroll: !0,
                            onSuccess: () => {
                                ((j.value = ``), (M.value = {}));
                            },
                            onError: (e) => {
                                M.value = e;
                            },
                        },
                    );
            }
            function P(e) {
                c.patch(
                    `/settings/input-sources/${e.id}/toggle`,
                    {},
                    { preserveScroll: !0 },
                );
            }
            function F(e) {
                confirm(`Delete "${e.name}"? This cannot be undone.`) &&
                    c.delete(`/settings/input-sources/${e.id}`, {
                        preserveScroll: !0,
                    });
            }
            return (c, l) => (
                a(),
                o(`div`, w, [
                    (l[6] ||= n(
                        `h1`,
                        { class: `text-2xl font-semibold` },
                        `Input Sources`,
                        -1,
                    )),
                    d(h(b), null, {
                        default: i(() => [
                            d(h(x), null, {
                                default: i(() => [
                                    d(h(C), null, {
                                        default: i(() => [
                                            ...(l[1] ||= [
                                                g(`Add a custom source`, -1),
                                            ]),
                                        ]),
                                        _: 1,
                                    }),
                                ]),
                                _: 1,
                            }),
                            d(
                                h(S),
                                { class: `flex gap-2` },
                                {
                                    default: i(() => [
                                        d(
                                            h(v),
                                            {
                                                modelValue: j.value,
                                                'onUpdate:modelValue': (l[0] ||=
                                                    (e) => (j.value = e)),
                                                placeholder: `e.g. My Podcast`,
                                                onKeyup: r(N, [`enter`]),
                                            },
                                            null,
                                            8,
                                            [`modelValue`],
                                        ),
                                        d(
                                            h(_),
                                            { onClick: N },
                                            {
                                                default: i(() => [
                                                    ...(l[2] ||= [
                                                        g(`Add`, -1),
                                                    ]),
                                                ]),
                                                _: 1,
                                            },
                                        ),
                                    ]),
                                    _: 1,
                                },
                            ),
                        ]),
                        _: 1,
                    }),
                    M.value.name
                        ? (a(), o(`p`, T, u(M.value.name), 1))
                        : t(``, !0),
                    M.value.source
                        ? (a(), o(`p`, E, u(M.value.source), 1))
                        : t(``, !0),
                    d(h(b), null, {
                        default: i(() => [
                            d(h(x), null, {
                                default: i(() => [
                                    d(h(C), null, {
                                        default: i(() => [
                                            ...(l[3] ||= [
                                                g(`All sources`, -1),
                                            ]),
                                        ]),
                                        _: 1,
                                    }),
                                ]),
                                _: 1,
                            }),
                            d(h(S), null, {
                                default: i(() => [
                                    n(`ul`, D, [
                                        (a(!0),
                                        o(
                                            e,
                                            null,
                                            s(
                                                A.sources,
                                                (e) => (
                                                    a(),
                                                    o(
                                                        `li`,
                                                        {
                                                            key: e.id,
                                                            class: `flex items-center justify-between py-2 text-sm`,
                                                        },
                                                        [
                                                            n(`div`, O, [
                                                                n(
                                                                    `span`,
                                                                    {
                                                                        class: f(
                                                                            {
                                                                                'text-muted-foreground line-through':
                                                                                    !e.is_active,
                                                                            },
                                                                        ),
                                                                    },
                                                                    u(e.name),
                                                                    3,
                                                                ),
                                                                e.is_system
                                                                    ? (a(),
                                                                      p(
                                                                          h(y),
                                                                          {
                                                                              key: 0,
                                                                              variant: `secondary`,
                                                                          },
                                                                          {
                                                                              default:
                                                                                  i(
                                                                                      () => [
                                                                                          ...(l[4] ||=
                                                                                              [
                                                                                                  g(
                                                                                                      `system`,
                                                                                                      -1,
                                                                                                  ),
                                                                                              ]),
                                                                                      ],
                                                                                  ),
                                                                              _: 1,
                                                                          },
                                                                      ))
                                                                    : t(``, !0),
                                                            ]),
                                                            e.is_system
                                                                ? t(``, !0)
                                                                : (a(),
                                                                  o(`div`, k, [
                                                                      d(
                                                                          h(_),
                                                                          {
                                                                              variant: `ghost`,
                                                                              size: `sm`,
                                                                              onClick:
                                                                                  (
                                                                                      t,
                                                                                  ) =>
                                                                                      P(
                                                                                          e,
                                                                                      ),
                                                                          },
                                                                          {
                                                                              default:
                                                                                  i(
                                                                                      () => [
                                                                                          g(
                                                                                              u(
                                                                                                  e.is_active
                                                                                                      ? `Deactivate`
                                                                                                      : `Activate`,
                                                                                              ),
                                                                                              1,
                                                                                          ),
                                                                                      ],
                                                                                  ),
                                                                              _: 2,
                                                                          },
                                                                          1032,
                                                                          [
                                                                              `onClick`,
                                                                          ],
                                                                      ),
                                                                      d(
                                                                          h(_),
                                                                          {
                                                                              variant: `link`,
                                                                              size: `sm`,
                                                                              class: `text-destructive`,
                                                                              onClick:
                                                                                  (
                                                                                      t,
                                                                                  ) =>
                                                                                      F(
                                                                                          e,
                                                                                      ),
                                                                          },
                                                                          {
                                                                              default:
                                                                                  i(
                                                                                      () => [
                                                                                          ...(l[5] ||=
                                                                                              [
                                                                                                  g(
                                                                                                      ` Delete `,
                                                                                                      -1,
                                                                                                  ),
                                                                                              ]),
                                                                                      ],
                                                                                  ),
                                                                              _: 1,
                                                                          },
                                                                          8,
                                                                          [
                                                                              `onClick`,
                                                                          ],
                                                                      ),
                                                                  ])),
                                                        ],
                                                    )
                                                ),
                                            ),
                                            128,
                                        )),
                                    ]),
                                ]),
                                _: 1,
                            }),
                        ]),
                        _: 1,
                    }),
                ])
            );
        },
    });
export { A as default };
