import {
    F as e,
    G as t,
    J as n,
    K as r,
    O as i,
    Sn as a,
    Ut as o,
    Y as s,
    Yt as c,
    _n as l,
    dr as u,
    it as d,
    lr as f,
    nt as p,
    or as m,
    q as h,
    qn as g,
    rr as _,
    tt as v,
} from './dist-BjNOdvyx.js';
import { t as y } from './button-BzNzzr7Y.js';
import {
    a as b,
    i as x,
    n as S,
    r as C,
    t as w,
} from './SelectValue-CmTTkaRd.js';
import {
    a as T,
    i as E,
    n as D,
    o as O,
    r as k,
    t as A,
} from './DialogTrigger-Bw2YAVF-.js';
import { t as j } from './Label-BSXB3WZu.js';
import { t as M } from './Input-Dpp21zxV.js';
import { t as N } from './badge-CN-XfSW9.js';
import { t as P } from './dialog-BsBm-aYI.js';
var F = { class: `space-y-2` },
    I = { class: `flex flex-wrap gap-1` },
    L = { class: `flex flex-wrap gap-1` },
    ee = d({
        __name: `TagInput`,
        props: { tags: {}, modelValue: {} },
        emits: [`update:modelValue`, `newTag`],
        setup(t, { emit: n }) {
            let l = t,
                u = n,
                d = g(``),
                m = () => l.tags.filter((e) => l.modelValue.includes(e.id));
            function b(e) {
                let t = l.modelValue.includes(e.id);
                u(
                    `update:modelValue`,
                    t
                        ? l.modelValue.filter((t) => t !== e.id)
                        : [...l.modelValue, e.id],
                );
            }
            function x() {
                let e = d.value.trim();
                if (!e) return;
                let t = l.tags.find(
                    (t) => t.name.toLowerCase() === e.toLowerCase(),
                );
                (t
                    ? l.modelValue.includes(t.id) ||
                      u(`update:modelValue`, [...l.modelValue, t.id])
                    : u(`newTag`, e),
                    (d.value = ``));
            }
            return (n, l) => (
                o(),
                s(`div`, F, [
                    r(`div`, I, [
                        (o(!0),
                        s(
                            e,
                            null,
                            c(
                                m(),
                                (e) => (
                                    o(),
                                    h(
                                        _(N),
                                        {
                                            key: e.id,
                                            variant: `secondary`,
                                            class: `cursor-pointer`,
                                            onClick: (t) => b(e),
                                        },
                                        {
                                            default: a(() => [
                                                v(f(e.name) + ` ✕ `, 1),
                                            ]),
                                            _: 2,
                                        },
                                        1032,
                                        [`onClick`],
                                    )
                                ),
                            ),
                            128,
                        )),
                    ]),
                    p(
                        _(M),
                        {
                            modelValue: d.value,
                            'onUpdate:modelValue': (l[0] ||= (e) =>
                                (d.value = e)),
                            placeholder: `Type a tag...`,
                            onKeyup: i(x, [`enter`]),
                            class: `flex-1`,
                        },
                        null,
                        8,
                        [`modelValue`],
                    ),
                    p(
                        _(y),
                        {
                            type: `button`,
                            variant: `outline`,
                            size: `sm`,
                            onClick: x,
                        },
                        {
                            default: a(() => [...(l[1] ||= [v(` Add `, -1)])]),
                            _: 1,
                        },
                    ),
                    r(`div`, L, [
                        (o(!0),
                        s(
                            e,
                            null,
                            c(
                                t.tags.filter(
                                    (e) => !t.modelValue.includes(e.id),
                                ),
                                (e) => (
                                    o(),
                                    h(
                                        _(N),
                                        {
                                            key: e.id,
                                            variant: `outline`,
                                            class: `cursor-pointer text-muted-foreground`,
                                            onClick: (t) => b(e),
                                        },
                                        {
                                            default: a(() => [
                                                v(` + ` + f(e.name), 1),
                                            ]),
                                            _: 2,
                                        },
                                        1032,
                                        [`onClick`],
                                    )
                                ),
                            ),
                            128,
                        )),
                    ]),
                ])
            );
        },
    }),
    te = { class: `space-y-4` },
    ne = { class: `grid gap-4 sm:grid-cols-3` },
    re = { class: `space-y-2` },
    ie = { class: `space-y-2` },
    ae = { class: `space-y-2` },
    oe = { class: `grid gap-4 sm:grid-cols-2` },
    se = { class: `space-y-2` },
    ce = { class: `space-y-2` },
    le = { key: 0, class: `text-sm text-destructive` },
    ue = { class: `space-y-2` },
    de = { class: `space-y-2` },
    fe = { class: `space-y-2` },
    R = d({
        __name: `SessionFormDialog`,
        props: {
            languages: {},
            modalities: {},
            inputSources: {},
            tags: {},
            session: {},
        },
        emits: [`close`],
        setup(i, { emit: d }) {
            let m = i,
                N = d,
                F = t(() => !!m.session),
                I = g(F.value),
                L = g(``),
                R = g(``),
                z = g(``),
                B = g(``),
                V = g(``),
                H = g(``),
                U = g(``),
                W = g({}),
                G = g([]),
                K = g([...m.tags]);
            function q(e) {
                return e ? e.slice(0, 16).replace(` `, `T`) : ``;
            }
            function J() {
                m.session &&
                    ((L.value = String(m.session.language_id)),
                    (R.value = String(m.session.modality_id)),
                    (z.value = String(m.session.input_source_id)),
                    (B.value = q(m.session.started_at)),
                    (V.value = q(m.session.ended_at)),
                    (H.value = m.session.title ?? ``),
                    (U.value = m.session.notes ?? ``),
                    (G.value = m.session.tag_ids ?? []));
            }
            (l(
                () => m.session,
                () => {
                    (J(), (I.value = !!m.session));
                },
                { immediate: !0 },
            ),
                l(
                    () => m.tags,
                    (e) => {
                        K.value = [...e];
                    },
                ));
            let Y = t(
                () =>
                    L.value !== `` &&
                    R.value !== `` &&
                    z.value !== `` &&
                    B.value !== `` &&
                    V.value !== ``,
            );
            function X() {
                let e = {
                        language_id: Number(L.value),
                        modality_id: Number(R.value),
                        input_source_id: Number(z.value),
                        started_at: B.value,
                        ended_at: V.value,
                        title: H.value || void 0,
                        notes: U.value || void 0,
                        tag_ids: G.value,
                    },
                    t = {
                        preserveScroll: !0,
                        onSuccess: () => {
                            ((I.value = !1), Z(), N(`close`));
                        },
                        onError: (e) => {
                            W.value = e;
                        },
                    };
                F.value && m.session
                    ? u.patch(`/tracker/${m.session.id}`, e, t)
                    : u.post(`/tracker/manual`, e, t);
            }
            function Z() {
                (F.value ||
                    ((L.value =
                        m.languages.length === 1
                            ? String(m.languages[0].id)
                            : ``),
                    (R.value = ``),
                    (z.value = ``),
                    (B.value = ``),
                    (V.value = ``),
                    (H.value = ``),
                    (U.value = ``)),
                    (G.value = []),
                    (W.value = {}));
            }
            function Q(e) {
                ((I.value = e), e || N(`close`));
            }
            async function $(e) {
                let t = await (
                    await fetch(`/settings/tags/find-or-create`, {
                        method: `POST`,
                        headers: {
                            'Content-Type': `application/json`,
                            'X-CSRF-TOKEN':
                                document.querySelector(
                                    `meta[name="csrf-token"]`,
                                )?.content ?? ``,
                        },
                        body: JSON.stringify({ name: e }),
                    })
                ).json();
                (K.value.some((e) => e.id === t.id) || K.value.push(t),
                    (G.value = [...G.value, t.id]));
            }
            return (t, l) => (
                o(),
                h(
                    _(O),
                    { open: I.value, 'onUpdate:open': Q },
                    {
                        default: a(() => [
                            F.value
                                ? n(``, !0)
                                : (o(),
                                  h(
                                      _(A),
                                      { key: 0, 'as-child': `` },
                                      {
                                          default: a(() => [
                                              p(
                                                  _(y),
                                                  { variant: `outline` },
                                                  {
                                                      default: a(() => [
                                                          ...(l[8] ||= [
                                                              v(
                                                                  `Log a past session`,
                                                                  -1,
                                                              ),
                                                          ]),
                                                      ]),
                                                      _: 1,
                                                  },
                                              ),
                                          ]),
                                          _: 1,
                                      },
                                  )),
                            p(
                                _(T),
                                { class: `sm:max-w-md` },
                                {
                                    default: a(() => [
                                        p(_(k), null, {
                                            default: a(() => [
                                                p(_(D), null, {
                                                    default: a(() => [
                                                        v(
                                                            f(
                                                                F.value
                                                                    ? `Edit session`
                                                                    : `Log a past session`,
                                                            ),
                                                            1,
                                                        ),
                                                    ]),
                                                    _: 1,
                                                }),
                                                p(_(E), null, {
                                                    default: a(() => [
                                                        v(
                                                            f(
                                                                F.value
                                                                    ? `Update the details of this session.`
                                                                    : `Record a session you completed earlier.`,
                                                            ),
                                                            1,
                                                        ),
                                                    ]),
                                                    _: 1,
                                                }),
                                            ]),
                                            _: 1,
                                        }),
                                        r(`div`, te, [
                                            r(`div`, ne, [
                                                r(`div`, re, [
                                                    p(_(j), null, {
                                                        default: a(() => [
                                                            ...(l[9] ||= [
                                                                v(
                                                                    `Modality`,
                                                                    -1,
                                                                ),
                                                            ]),
                                                        ]),
                                                        _: 1,
                                                    }),
                                                    p(
                                                        _(b),
                                                        {
                                                            modelValue: R.value,
                                                            'onUpdate:modelValue':
                                                                (l[0] ||= (e) =>
                                                                    (R.value =
                                                                        e)),
                                                        },
                                                        {
                                                            default: a(() => [
                                                                p(_(S), null, {
                                                                    default: a(
                                                                        () => [
                                                                            p(
                                                                                _(
                                                                                    w,
                                                                                ),
                                                                                {
                                                                                    placeholder: `Select...`,
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                    _: 1,
                                                                }),
                                                                p(_(x), null, {
                                                                    default: a(
                                                                        () => [
                                                                            (o(
                                                                                !0,
                                                                            ),
                                                                            s(
                                                                                e,
                                                                                null,
                                                                                c(
                                                                                    i.modalities,
                                                                                    (
                                                                                        e,
                                                                                    ) => (
                                                                                        o(),
                                                                                        h(
                                                                                            _(
                                                                                                C,
                                                                                            ),
                                                                                            {
                                                                                                key: e.id,
                                                                                                value: String(
                                                                                                    e.id,
                                                                                                ),
                                                                                            },
                                                                                            {
                                                                                                default:
                                                                                                    a(
                                                                                                        () => [
                                                                                                            v(
                                                                                                                f(
                                                                                                                    e.name,
                                                                                                                ),
                                                                                                                1,
                                                                                                            ),
                                                                                                        ],
                                                                                                    ),
                                                                                                _: 2,
                                                                                            },
                                                                                            1032,
                                                                                            [
                                                                                                `value`,
                                                                                            ],
                                                                                        )
                                                                                    ),
                                                                                ),
                                                                                128,
                                                                            )),
                                                                        ],
                                                                    ),
                                                                    _: 1,
                                                                }),
                                                            ]),
                                                            _: 1,
                                                        },
                                                        8,
                                                        [`modelValue`],
                                                    ),
                                                ]),
                                                r(`div`, ie, [
                                                    p(_(j), null, {
                                                        default: a(() => [
                                                            ...(l[10] ||= [
                                                                v(`Source`, -1),
                                                            ]),
                                                        ]),
                                                        _: 1,
                                                    }),
                                                    p(
                                                        _(b),
                                                        {
                                                            modelValue: z.value,
                                                            'onUpdate:modelValue':
                                                                (l[1] ||= (e) =>
                                                                    (z.value =
                                                                        e)),
                                                        },
                                                        {
                                                            default: a(() => [
                                                                p(_(S), null, {
                                                                    default: a(
                                                                        () => [
                                                                            p(
                                                                                _(
                                                                                    w,
                                                                                ),
                                                                                {
                                                                                    placeholder: `Select...`,
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                    _: 1,
                                                                }),
                                                                p(_(x), null, {
                                                                    default: a(
                                                                        () => [
                                                                            (o(
                                                                                !0,
                                                                            ),
                                                                            s(
                                                                                e,
                                                                                null,
                                                                                c(
                                                                                    i.inputSources,
                                                                                    (
                                                                                        e,
                                                                                    ) => (
                                                                                        o(),
                                                                                        h(
                                                                                            _(
                                                                                                C,
                                                                                            ),
                                                                                            {
                                                                                                key: e.id,
                                                                                                value: String(
                                                                                                    e.id,
                                                                                                ),
                                                                                            },
                                                                                            {
                                                                                                default:
                                                                                                    a(
                                                                                                        () => [
                                                                                                            v(
                                                                                                                f(
                                                                                                                    e.name,
                                                                                                                ),
                                                                                                                1,
                                                                                                            ),
                                                                                                        ],
                                                                                                    ),
                                                                                                _: 2,
                                                                                            },
                                                                                            1032,
                                                                                            [
                                                                                                `value`,
                                                                                            ],
                                                                                        )
                                                                                    ),
                                                                                ),
                                                                                128,
                                                                            )),
                                                                        ],
                                                                    ),
                                                                    _: 1,
                                                                }),
                                                            ]),
                                                            _: 1,
                                                        },
                                                        8,
                                                        [`modelValue`],
                                                    ),
                                                ]),
                                                r(`div`, ae, [
                                                    p(_(j), null, {
                                                        default: a(() => [
                                                            ...(l[11] ||= [
                                                                v(
                                                                    `Language`,
                                                                    -1,
                                                                ),
                                                            ]),
                                                        ]),
                                                        _: 1,
                                                    }),
                                                    p(
                                                        _(b),
                                                        {
                                                            modelValue: L.value,
                                                            'onUpdate:modelValue':
                                                                (l[2] ||= (e) =>
                                                                    (L.value =
                                                                        e)),
                                                        },
                                                        {
                                                            default: a(() => [
                                                                p(_(S), null, {
                                                                    default: a(
                                                                        () => [
                                                                            p(
                                                                                _(
                                                                                    w,
                                                                                ),
                                                                                {
                                                                                    placeholder: `Select...`,
                                                                                },
                                                                            ),
                                                                        ],
                                                                    ),
                                                                    _: 1,
                                                                }),
                                                                p(_(x), null, {
                                                                    default: a(
                                                                        () => [
                                                                            (o(
                                                                                !0,
                                                                            ),
                                                                            s(
                                                                                e,
                                                                                null,
                                                                                c(
                                                                                    i.languages,
                                                                                    (
                                                                                        e,
                                                                                    ) => (
                                                                                        o(),
                                                                                        h(
                                                                                            _(
                                                                                                C,
                                                                                            ),
                                                                                            {
                                                                                                key: e.id,
                                                                                                value: String(
                                                                                                    e.id,
                                                                                                ),
                                                                                            },
                                                                                            {
                                                                                                default:
                                                                                                    a(
                                                                                                        () => [
                                                                                                            v(
                                                                                                                f(
                                                                                                                    e.name,
                                                                                                                ),
                                                                                                                1,
                                                                                                            ),
                                                                                                        ],
                                                                                                    ),
                                                                                                _: 2,
                                                                                            },
                                                                                            1032,
                                                                                            [
                                                                                                `value`,
                                                                                            ],
                                                                                        )
                                                                                    ),
                                                                                ),
                                                                                128,
                                                                            )),
                                                                        ],
                                                                    ),
                                                                    _: 1,
                                                                }),
                                                            ]),
                                                            _: 1,
                                                        },
                                                        8,
                                                        [`modelValue`],
                                                    ),
                                                ]),
                                            ]),
                                            r(`div`, oe, [
                                                r(`div`, se, [
                                                    p(_(j), null, {
                                                        default: a(() => [
                                                            ...(l[12] ||= [
                                                                v(`Start`, -1),
                                                            ]),
                                                        ]),
                                                        _: 1,
                                                    }),
                                                    p(
                                                        _(M),
                                                        {
                                                            modelValue: B.value,
                                                            'onUpdate:modelValue':
                                                                (l[3] ||= (e) =>
                                                                    (B.value =
                                                                        e)),
                                                            type: `datetime-local`,
                                                        },
                                                        null,
                                                        8,
                                                        [`modelValue`],
                                                    ),
                                                ]),
                                                r(`div`, ce, [
                                                    p(_(j), null, {
                                                        default: a(() => [
                                                            ...(l[13] ||= [
                                                                v(`End`, -1),
                                                            ]),
                                                        ]),
                                                        _: 1,
                                                    }),
                                                    p(
                                                        _(M),
                                                        {
                                                            modelValue: V.value,
                                                            'onUpdate:modelValue':
                                                                (l[4] ||= (e) =>
                                                                    (V.value =
                                                                        e)),
                                                            type: `datetime-local`,
                                                        },
                                                        null,
                                                        8,
                                                        [`modelValue`],
                                                    ),
                                                ]),
                                            ]),
                                            W.value.ended_at
                                                ? (o(),
                                                  s(
                                                      `p`,
                                                      le,
                                                      f(W.value.ended_at),
                                                      1,
                                                  ))
                                                : n(``, !0),
                                            r(`div`, ue, [
                                                p(_(j), null, {
                                                    default: a(() => [
                                                        ...(l[14] ||= [
                                                            v(`Title `, -1),
                                                            r(
                                                                `span`,
                                                                {
                                                                    class: `text-muted-foreground`,
                                                                },
                                                                `(optional)`,
                                                                -1,
                                                            ),
                                                        ]),
                                                    ]),
                                                    _: 1,
                                                }),
                                                p(
                                                    _(M),
                                                    {
                                                        modelValue: H.value,
                                                        'onUpdate:modelValue':
                                                            (l[5] ||= (e) =>
                                                                (H.value = e)),
                                                    },
                                                    null,
                                                    8,
                                                    [`modelValue`],
                                                ),
                                            ]),
                                            r(`div`, de, [
                                                p(_(j), null, {
                                                    default: a(() => [
                                                        ...(l[15] ||= [
                                                            v(`Notes `, -1),
                                                            r(
                                                                `span`,
                                                                {
                                                                    class: `text-muted-foreground`,
                                                                },
                                                                `(optional)`,
                                                                -1,
                                                            ),
                                                        ]),
                                                    ]),
                                                    _: 1,
                                                }),
                                                p(
                                                    _(M),
                                                    {
                                                        modelValue: U.value,
                                                        'onUpdate:modelValue':
                                                            (l[6] ||= (e) =>
                                                                (U.value = e)),
                                                    },
                                                    null,
                                                    8,
                                                    [`modelValue`],
                                                ),
                                            ]),
                                            r(`div`, fe, [
                                                p(_(j), null, {
                                                    default: a(() => [
                                                        ...(l[16] ||= [
                                                            v(`Tags`, -1),
                                                        ]),
                                                    ]),
                                                    _: 1,
                                                }),
                                                p(
                                                    ee,
                                                    {
                                                        modelValue: G.value,
                                                        'onUpdate:modelValue':
                                                            (l[7] ||= (e) =>
                                                                (G.value = e)),
                                                        tags: K.value,
                                                        onNewTag: $,
                                                    },
                                                    null,
                                                    8,
                                                    [`modelValue`, `tags`],
                                                ),
                                            ]),
                                        ]),
                                        p(_(P), null, {
                                            default: a(() => [
                                                p(
                                                    _(y),
                                                    {
                                                        disabled: !Y.value,
                                                        onClick: X,
                                                    },
                                                    {
                                                        default: a(() => [
                                                            v(
                                                                f(
                                                                    F.value
                                                                        ? `Save changes`
                                                                        : `Save session`,
                                                                ),
                                                                1,
                                                            ),
                                                        ]),
                                                        _: 1,
                                                    },
                                                    8,
                                                    [`disabled`],
                                                ),
                                            ]),
                                            _: 1,
                                        }),
                                    ]),
                                    _: 1,
                                },
                            ),
                        ]),
                        _: 1,
                    },
                    8,
                    [`open`],
                )
            );
        },
    }),
    z = { class: `space-y-6 p-6` },
    B = { class: `flex items-center justify-between` },
    V = { class: `space-y-4 rounded-lg border p-4` },
    H = { class: `grid grid-cols-3 gap-3` },
    U = { class: `space-y-1` },
    W = { class: `space-y-1` },
    G = { class: `space-y-1` },
    K = { class: `grid grid-cols-2 gap-3` },
    q = { class: `space-y-1` },
    J = { class: `space-y-1` },
    Y = { class: `flex items-center justify-between` },
    X = { class: `rounded-lg border p-4` },
    Z = { class: `mb-2 text-sm text-muted-foreground` },
    Q = { class: `divide-y` },
    $ = { class: `font-medium` },
    pe = { class: `text-muted-foreground` },
    me = { key: 0, class: `text-muted-foreground` },
    he = { key: 1, class: `text-muted-foreground` },
    ge = { class: `flex items-center justify-between gap-3 sm:justify-end` },
    _e = { class: `text-muted-foreground` },
    ve = { class: `flex gap-1` },
    ye = { class: `mt-4 flex flex-wrap gap-1` },
    be = d({
        __name: `History`,
        props: {
            languages: {},
            modalities: {},
            inputSources: {},
            tags: {},
            sessions: {},
            filters: {},
        },
        setup(t) {
            let i = t,
                l = g(i.filters.language_id ?? `all`),
                d = g(i.filters.modality_id ?? `all`),
                T = g(i.filters.input_source_id ?? `all`),
                E = g(i.filters.date_from ?? ``),
                D = g(i.filters.date_to ?? ``);
            function O() {
                u.get(
                    `/tracker/history`,
                    {
                        language_id: l.value === `all` ? void 0 : l.value,
                        modality_id: d.value === `all` ? void 0 : d.value,
                        input_source_id: T.value === `all` ? void 0 : T.value,
                        date_from: E.value || void 0,
                        date_to: D.value || void 0,
                    },
                    { preserveState: !0, replace: !0 },
                );
            }
            function k() {
                ((l.value = `all`),
                    (d.value = `all`),
                    (T.value = `all`),
                    (E.value = ``),
                    (D.value = ``),
                    O());
            }
            function A(e) {
                return new Date(e).toLocaleString(void 0, {
                    month: `short`,
                    day: `numeric`,
                    year: `numeric`,
                    hour: `numeric`,
                    minute: `2-digit`,
                });
            }
            function N(e) {
                if (!e.ended_at) return `in progress`;
                let t = Math.max(
                    0,
                    Math.floor(
                        (Date.parse(e.ended_at) - Date.parse(e.started_at)) /
                            1e3,
                    ) - e.paused_duration_seconds,
                );
                return `${Math.floor(t / 60)}m ${t % 60}s`;
            }
            let P = g(null);
            function F(e) {
                confirm(`Delete this session? This cannot be undone.`) &&
                    u.delete(`/tracker/${e}`, { preserveScroll: !0 });
            }
            function I() {
                let e = new URLSearchParams();
                (l.value !== `all` && e.set(`language_id`, l.value),
                    d.value !== `all` && e.set(`modality_id`, d.value),
                    T.value !== `all` && e.set(`input_source_id`, T.value),
                    E.value && e.set(`date_from`, E.value),
                    D.value && e.set(`date_to`, D.value),
                    (window.location.href = `/tracker/history/export?${e.toString()}`));
            }
            function L(e) {
                return e.replace(/&laquo;/g, `«`).replace(/&raquo;/g, `»`);
            }
            return (i, g) => (
                o(),
                s(`div`, z, [
                    r(`div`, B, [
                        (g[5] ||= r(
                            `h1`,
                            { class: `text-2xl font-semibold` },
                            `Session History`,
                            -1,
                        )),
                        p(
                            R,
                            {
                                languages: t.languages,
                                modalities: t.modalities,
                                'input-sources': t.inputSources,
                                tags: t.tags,
                            },
                            null,
                            8,
                            [
                                `languages`,
                                `modalities`,
                                `input-sources`,
                                `tags`,
                            ],
                        ),
                    ]),
                    r(`div`, V, [
                        r(`div`, H, [
                            r(`div`, U, [
                                p(
                                    _(j),
                                    { class: `text-xs` },
                                    {
                                        default: a(() => [
                                            ...(g[6] ||= [v(`Language`, -1)]),
                                        ]),
                                        _: 1,
                                    },
                                ),
                                p(
                                    _(b),
                                    {
                                        modelValue: l.value,
                                        'onUpdate:modelValue': [
                                            (g[0] ||= (e) => (l.value = e)),
                                            O,
                                        ],
                                    },
                                    {
                                        default: a(() => [
                                            p(_(S), null, {
                                                default: a(() => [
                                                    p(_(w), {
                                                        placeholder: `All`,
                                                    }),
                                                ]),
                                                _: 1,
                                            }),
                                            p(_(x), null, {
                                                default: a(() => [
                                                    p(
                                                        _(C),
                                                        { value: `all` },
                                                        {
                                                            default: a(() => [
                                                                ...(g[7] ||= [
                                                                    v(
                                                                        `All`,
                                                                        -1,
                                                                    ),
                                                                ]),
                                                            ]),
                                                            _: 1,
                                                        },
                                                    ),
                                                    (o(!0),
                                                    s(
                                                        e,
                                                        null,
                                                        c(
                                                            t.languages,
                                                            (e) => (
                                                                o(),
                                                                h(
                                                                    _(C),
                                                                    {
                                                                        key: e.id,
                                                                        value: String(
                                                                            e.id,
                                                                        ),
                                                                    },
                                                                    {
                                                                        default:
                                                                            a(
                                                                                () => [
                                                                                    v(
                                                                                        f(
                                                                                            e.name,
                                                                                        ),
                                                                                        1,
                                                                                    ),
                                                                                ],
                                                                            ),
                                                                        _: 2,
                                                                    },
                                                                    1032,
                                                                    [`value`],
                                                                )
                                                            ),
                                                        ),
                                                        128,
                                                    )),
                                                ]),
                                                _: 1,
                                            }),
                                        ]),
                                        _: 1,
                                    },
                                    8,
                                    [`modelValue`],
                                ),
                            ]),
                            r(`div`, W, [
                                p(
                                    _(j),
                                    { class: `text-xs` },
                                    {
                                        default: a(() => [
                                            ...(g[8] ||= [v(`Modality`, -1)]),
                                        ]),
                                        _: 1,
                                    },
                                ),
                                p(
                                    _(b),
                                    {
                                        modelValue: d.value,
                                        'onUpdate:modelValue': [
                                            (g[1] ||= (e) => (d.value = e)),
                                            O,
                                        ],
                                    },
                                    {
                                        default: a(() => [
                                            p(_(S), null, {
                                                default: a(() => [
                                                    p(_(w), {
                                                        placeholder: `All`,
                                                    }),
                                                ]),
                                                _: 1,
                                            }),
                                            p(_(x), null, {
                                                default: a(() => [
                                                    p(
                                                        _(C),
                                                        { value: `all` },
                                                        {
                                                            default: a(() => [
                                                                ...(g[9] ||= [
                                                                    v(
                                                                        `All`,
                                                                        -1,
                                                                    ),
                                                                ]),
                                                            ]),
                                                            _: 1,
                                                        },
                                                    ),
                                                    (o(!0),
                                                    s(
                                                        e,
                                                        null,
                                                        c(
                                                            t.modalities,
                                                            (e) => (
                                                                o(),
                                                                h(
                                                                    _(C),
                                                                    {
                                                                        key: e.id,
                                                                        value: String(
                                                                            e.id,
                                                                        ),
                                                                    },
                                                                    {
                                                                        default:
                                                                            a(
                                                                                () => [
                                                                                    v(
                                                                                        f(
                                                                                            e.name,
                                                                                        ),
                                                                                        1,
                                                                                    ),
                                                                                ],
                                                                            ),
                                                                        _: 2,
                                                                    },
                                                                    1032,
                                                                    [`value`],
                                                                )
                                                            ),
                                                        ),
                                                        128,
                                                    )),
                                                ]),
                                                _: 1,
                                            }),
                                        ]),
                                        _: 1,
                                    },
                                    8,
                                    [`modelValue`],
                                ),
                            ]),
                            r(`div`, G, [
                                p(
                                    _(j),
                                    { class: `text-xs` },
                                    {
                                        default: a(() => [
                                            ...(g[10] ||= [v(`Source`, -1)]),
                                        ]),
                                        _: 1,
                                    },
                                ),
                                p(
                                    _(b),
                                    {
                                        modelValue: T.value,
                                        'onUpdate:modelValue': [
                                            (g[2] ||= (e) => (T.value = e)),
                                            O,
                                        ],
                                    },
                                    {
                                        default: a(() => [
                                            p(_(S), null, {
                                                default: a(() => [
                                                    p(_(w), {
                                                        placeholder: `All`,
                                                    }),
                                                ]),
                                                _: 1,
                                            }),
                                            p(_(x), null, {
                                                default: a(() => [
                                                    p(
                                                        _(C),
                                                        { value: `all` },
                                                        {
                                                            default: a(() => [
                                                                ...(g[11] ||= [
                                                                    v(
                                                                        `All`,
                                                                        -1,
                                                                    ),
                                                                ]),
                                                            ]),
                                                            _: 1,
                                                        },
                                                    ),
                                                    (o(!0),
                                                    s(
                                                        e,
                                                        null,
                                                        c(
                                                            t.inputSources,
                                                            (e) => (
                                                                o(),
                                                                h(
                                                                    _(C),
                                                                    {
                                                                        key: e.id,
                                                                        value: String(
                                                                            e.id,
                                                                        ),
                                                                    },
                                                                    {
                                                                        default:
                                                                            a(
                                                                                () => [
                                                                                    v(
                                                                                        f(
                                                                                            e.name,
                                                                                        ),
                                                                                        1,
                                                                                    ),
                                                                                ],
                                                                            ),
                                                                        _: 2,
                                                                    },
                                                                    1032,
                                                                    [`value`],
                                                                )
                                                            ),
                                                        ),
                                                        128,
                                                    )),
                                                ]),
                                                _: 1,
                                            }),
                                        ]),
                                        _: 1,
                                    },
                                    8,
                                    [`modelValue`],
                                ),
                            ]),
                        ]),
                        r(`div`, K, [
                            r(`div`, q, [
                                p(
                                    _(j),
                                    { class: `text-xs` },
                                    {
                                        default: a(() => [
                                            ...(g[12] ||= [v(`From`, -1)]),
                                        ]),
                                        _: 1,
                                    },
                                ),
                                p(
                                    _(M),
                                    {
                                        modelValue: E.value,
                                        'onUpdate:modelValue': (g[3] ||= (e) =>
                                            (E.value = e)),
                                        type: `date`,
                                        onChange: O,
                                    },
                                    null,
                                    8,
                                    [`modelValue`],
                                ),
                            ]),
                            r(`div`, J, [
                                p(
                                    _(j),
                                    { class: `text-xs` },
                                    {
                                        default: a(() => [
                                            ...(g[13] ||= [v(`To`, -1)]),
                                        ]),
                                        _: 1,
                                    },
                                ),
                                p(
                                    _(M),
                                    {
                                        modelValue: D.value,
                                        'onUpdate:modelValue': (g[4] ||= (e) =>
                                            (D.value = e)),
                                        type: `date`,
                                        onChange: O,
                                    },
                                    null,
                                    8,
                                    [`modelValue`],
                                ),
                            ]),
                        ]),
                        r(`div`, Y, [
                            p(
                                _(y),
                                { variant: `outline`, size: `sm`, onClick: k },
                                {
                                    default: a(() => [
                                        ...(g[14] ||= [v(`Clear filters`, -1)]),
                                    ]),
                                    _: 1,
                                },
                            ),
                            p(
                                _(y),
                                { variant: `outline`, size: `sm`, onClick: I },
                                {
                                    default: a(() => [
                                        ...(g[15] ||= [v(`Export CSV`, -1)]),
                                    ]),
                                    _: 1,
                                },
                            ),
                        ]),
                    ]),
                    r(`div`, X, [
                        r(
                            `p`,
                            Z,
                            ` Showing ` +
                                f(t.sessions.from ?? 0) +
                                `–` +
                                f(t.sessions.to ?? 0) +
                                ` of ` +
                                f(t.sessions.total),
                            1,
                        ),
                        r(`ul`, Q, [
                            (o(!0),
                            s(
                                e,
                                null,
                                c(
                                    t.sessions.data,
                                    (e) => (
                                        o(),
                                        s(
                                            `li`,
                                            {
                                                key: e.id,
                                                class: `flex flex-col gap-2 py-2 text-sm sm:flex-row sm:items-center sm:justify-between`,
                                            },
                                            [
                                                r(`div`, null, [
                                                    r(
                                                        `span`,
                                                        $,
                                                        f(e.modality.name),
                                                        1,
                                                    ),
                                                    r(
                                                        `span`,
                                                        pe,
                                                        ` — ` +
                                                            f(
                                                                e.input_source
                                                                    .name,
                                                            ),
                                                        1,
                                                    ),
                                                    t.languages.length > 1
                                                        ? (o(),
                                                          s(
                                                              `span`,
                                                              me,
                                                              ` (` +
                                                                  f(
                                                                      e.language
                                                                          .name,
                                                                  ) +
                                                                  `)`,
                                                              1,
                                                          ))
                                                        : n(``, !0),
                                                    e.title
                                                        ? (o(),
                                                          s(
                                                              `span`,
                                                              he,
                                                              ` · ` +
                                                                  f(e.title),
                                                              1,
                                                          ))
                                                        : n(``, !0),
                                                ]),
                                                r(`div`, ge, [
                                                    r(
                                                        `span`,
                                                        _e,
                                                        f(A(e.started_at)) +
                                                            ` · ` +
                                                            f(N(e)),
                                                        1,
                                                    ),
                                                    r(`div`, ve, [
                                                        p(
                                                            _(y),
                                                            {
                                                                variant: `link`,
                                                                size: `sm`,
                                                                onClick: (t) =>
                                                                    (P.value =
                                                                        e),
                                                            },
                                                            {
                                                                default: a(
                                                                    () => [
                                                                        ...(g[16] ||=
                                                                            [
                                                                                v(
                                                                                    `Edit`,
                                                                                    -1,
                                                                                ),
                                                                            ]),
                                                                    ],
                                                                ),
                                                                _: 1,
                                                            },
                                                            8,
                                                            [`onClick`],
                                                        ),
                                                        p(
                                                            _(y),
                                                            {
                                                                variant: `link`,
                                                                size: `sm`,
                                                                class: `text-destructive`,
                                                                onClick: (t) =>
                                                                    F(e.id),
                                                            },
                                                            {
                                                                default: a(
                                                                    () => [
                                                                        ...(g[17] ||=
                                                                            [
                                                                                v(
                                                                                    `Delete`,
                                                                                    -1,
                                                                                ),
                                                                            ]),
                                                                    ],
                                                                ),
                                                                _: 1,
                                                            },
                                                            8,
                                                            [`onClick`],
                                                        ),
                                                    ]),
                                                ]),
                                            ],
                                        )
                                    ),
                                ),
                                128,
                            )),
                        ]),
                        r(`div`, ye, [
                            (o(!0),
                            s(
                                e,
                                null,
                                c(
                                    t.sessions.links,
                                    (e) => (
                                        o(),
                                        h(
                                            _(y),
                                            {
                                                key: e.label,
                                                variant: `outline`,
                                                size: `sm`,
                                                disabled: !e.url,
                                                class: m({
                                                    'bg-accent': e.active,
                                                }),
                                                onClick: (t) =>
                                                    e.url &&
                                                    _(u).visit(e.url, {
                                                        preserveState: !0,
                                                    }),
                                            },
                                            {
                                                default: a(() => [
                                                    v(f(L(e.label)), 1),
                                                ]),
                                                _: 2,
                                            },
                                            1032,
                                            [`disabled`, `class`, `onClick`],
                                        )
                                    ),
                                ),
                                128,
                            )),
                        ]),
                    ]),
                ])
            );
        },
    });
export { be as default };
