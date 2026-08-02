import {
    At as e,
    Ct as t,
    F as n,
    G as r,
    Gn as i,
    Hn as a,
    Ht as o,
    Lt as s,
    M as c,
    Pn as l,
    Sn as u,
    Ut as d,
    W as f,
    Xn as p,
    Xt as m,
    _n as h,
    _t as g,
    er as _,
    ft as v,
    ht as y,
    it as b,
    jn as ee,
    kt as te,
    or as ne,
    q as x,
    qn as S,
    rr as C,
    tr as w,
    vn as T,
    zn as E,
} from './dist-BjNOdvyx.js';
function D(e) {
    var t,
        n,
        r = ``;
    if (typeof e == `string` || typeof e == `number`) r += e;
    else if (typeof e == `object`)
        if (Array.isArray(e)) {
            var i = e.length;
            for (t = 0; t < i; t++)
                e[t] && (n = D(e[t])) && (r && (r += ` `), (r += n));
        } else for (n in e) e[n] && (r && (r += ` `), (r += n));
    return r;
}
function O() {
    for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++)
        (e = arguments[n]) && (t = D(e)) && (r && (r += ` `), (r += t));
    return r;
}
var k = (e) => (typeof e == `boolean` ? `${e}` : e === 0 ? `0` : e),
    A = O,
    j = (e, t) => (n) => {
        if (t?.variants == null) return A(e, n?.class, n?.className);
        let { variants: r, defaultVariants: i } = t,
            a = Object.keys(r).map((e) => {
                let t = n?.[e],
                    a = i?.[e];
                if (t === null) return null;
                let o = k(t) || k(a);
                return r[e][o];
            }),
            o =
                n &&
                Object.entries(n).reduce((e, t) => {
                    let [n, r] = t;
                    return (r === void 0 || (e[n] = r), e);
                }, {});
        return A(
            e,
            a,
            t?.compoundVariants?.reduce((e, t) => {
                let { class: n, className: r, ...a } = t;
                return Object.entries(a).every((e) => {
                    let [t, n] = e;
                    return Array.isArray(n)
                        ? n.includes({ ...i, ...o }[t])
                        : { ...i, ...o }[t] === n;
                })
                    ? [...e, n, r]
                    : e;
            }, []),
            n?.class,
            n?.className,
        );
    },
    re = (e, t) => {
        let n = Array(e.length + t.length);
        for (let t = 0; t < e.length; t++) n[t] = e[t];
        for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
        return n;
    },
    M = (e, t) => ({ classGroupId: e, validator: t }),
    ie = (e = new Map(), t = null, n) => ({
        nextPart: e,
        validators: t,
        classGroupId: n,
    }),
    N = `-`,
    ae = [],
    oe = `arbitrary..`,
    P = (e) => {
        let t = se(e),
            { conflictingClassGroups: n, conflictingClassGroupModifiers: r } =
                e;
        return {
            getClassGroupId: (e) => {
                if (e.startsWith(`[`) && e.endsWith(`]`)) return I(e);
                let n = e.split(N);
                return F(n, +(n[0] === `` && n.length > 1), t);
            },
            getConflictingClassGroupIds: (e, t) => {
                if (t) {
                    let t = r[e],
                        i = n[e];
                    return t ? (i ? re(i, t) : t) : i || ae;
                }
                return n[e] || ae;
            },
        };
    },
    F = (e, t, n) => {
        if (e.length - t === 0) return n.classGroupId;
        let r = e[t],
            i = n.nextPart.get(r);
        if (i) {
            let n = F(e, t + 1, i);
            if (n) return n;
        }
        let a = n.validators;
        if (a === null) return;
        let o = t === 0 ? e.join(N) : e.slice(t).join(N),
            s = a.length;
        for (let e = 0; e < s; e++) {
            let t = a[e];
            if (t.validator(o)) return t.classGroupId;
        }
    },
    I = (e) =>
        e.slice(1, -1).indexOf(`:`) === -1
            ? void 0
            : (() => {
                  let t = e.slice(1, -1),
                      n = t.indexOf(`:`),
                      r = t.slice(0, n);
                  return r ? oe + r : void 0;
              })(),
    se = (e) => {
        let { theme: t, classGroups: n } = e;
        return L(n, t);
    },
    L = (e, t) => {
        let n = ie();
        for (let r in e) {
            let i = e[r];
            R(i, n, r, t);
        }
        return n;
    },
    R = (e, t, n, r) => {
        let i = e.length;
        for (let a = 0; a < i; a++) {
            let i = e[a];
            z(i, t, n, r);
        }
    },
    z = (e, t, n, r) => {
        if (typeof e == `string`) {
            B(e, t, n);
            return;
        }
        if (typeof e == `function`) {
            ce(e, t, n, r);
            return;
        }
        V(e, t, n, r);
    },
    B = (e, t, n) => {
        let r = e === `` ? t : le(t, e);
        r.classGroupId = n;
    },
    ce = (e, t, n, r) => {
        if (ue(e)) {
            R(e(r), t, n, r);
            return;
        }
        (t.validators === null && (t.validators = []),
            t.validators.push(M(n, e)));
    },
    V = (e, t, n, r) => {
        let i = Object.entries(e),
            a = i.length;
        for (let e = 0; e < a; e++) {
            let [a, o] = i[e];
            R(o, le(t, a), n, r);
        }
    },
    le = (e, t) => {
        let n = e,
            r = t.split(N),
            i = r.length;
        for (let e = 0; e < i; e++) {
            let t = r[e],
                i = n.nextPart.get(t);
            (i || ((i = ie()), n.nextPart.set(t, i)), (n = i));
        }
        return n;
    },
    ue = (e) => `isThemeGetter` in e && e.isThemeGetter === !0,
    de = (e) => {
        if (e < 1) return { get: () => void 0, set: () => {} };
        let t = 0,
            n = Object.create(null),
            r = Object.create(null),
            i = (i, a) => {
                ((n[i] = a),
                    t++,
                    t > e && ((t = 0), (r = n), (n = Object.create(null))));
            };
        return {
            get(e) {
                let t = n[e];
                if (t !== void 0) return t;
                if ((t = r[e]) !== void 0) return (i(e, t), t);
            },
            set(e, t) {
                e in n ? (n[e] = t) : i(e, t);
            },
        };
    },
    fe = `!`,
    pe = `:`,
    me = [],
    he = (e, t, n, r, i) => ({
        modifiers: e,
        hasImportantModifier: t,
        baseClassName: n,
        maybePostfixModifierPosition: r,
        isExternal: i,
    }),
    ge = (e) => {
        let { prefix: t, experimentalParseClassName: n } = e,
            r = (e) => {
                let t = [],
                    n = 0,
                    r = 0,
                    i = 0,
                    a,
                    o = e.length;
                for (let s = 0; s < o; s++) {
                    let o = e[s];
                    if (n === 0 && r === 0) {
                        if (o === pe) {
                            (t.push(e.slice(i, s)), (i = s + 1));
                            continue;
                        }
                        if (o === `/`) {
                            a = s;
                            continue;
                        }
                    }
                    o === `[`
                        ? n++
                        : o === `]`
                          ? n--
                          : o === `(`
                            ? r++
                            : o === `)` && r--;
                }
                let s = t.length === 0 ? e : e.slice(i),
                    c = s,
                    l = !1;
                s.endsWith(fe)
                    ? ((c = s.slice(0, -1)), (l = !0))
                    : s.startsWith(fe) && ((c = s.slice(1)), (l = !0));
                let u = a && a > i ? a - i : void 0;
                return he(t, l, c, u);
            };
        if (t) {
            let e = t + pe,
                n = r;
            r = (t) =>
                t.startsWith(e)
                    ? n(t.slice(e.length))
                    : he(me, !1, t, void 0, !0);
        }
        if (n) {
            let e = r;
            r = (t) => n({ className: t, parseClassName: e });
        }
        return r;
    },
    _e = (e) => {
        let t = new Map();
        return (
            e.orderSensitiveModifiers.forEach((e, n) => {
                t.set(e, 1e6 + n);
            }),
            (e) => {
                let n = [],
                    r = [];
                for (let i = 0; i < e.length; i++) {
                    let a = e[i],
                        o = a[0] === `[`,
                        s = t.has(a);
                    o || s
                        ? (r.length > 0 && (r.sort(), n.push(...r), (r = [])),
                          n.push(a))
                        : r.push(a);
                }
                return (r.length > 0 && (r.sort(), n.push(...r)), n);
            }
        );
    },
    ve = (e) => ({
        cache: de(e.cacheSize),
        parseClassName: ge(e),
        sortModifiers: _e(e),
        postfixLookupClassGroupIds: ye(e),
        ...P(e),
    }),
    ye = (e) => {
        let t = Object.create(null),
            n = e.postfixLookupClassGroups;
        if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
        return t;
    },
    be = /\s+/,
    xe = (e, t) => {
        let {
                parseClassName: n,
                getClassGroupId: r,
                getConflictingClassGroupIds: i,
                sortModifiers: a,
                postfixLookupClassGroupIds: o,
            } = t,
            s = [],
            c = e.trim().split(be),
            l = ``;
        for (let e = c.length - 1; e >= 0; --e) {
            let t = c[e],
                {
                    isExternal: u,
                    modifiers: d,
                    hasImportantModifier: f,
                    baseClassName: p,
                    maybePostfixModifierPosition: m,
                } = n(t);
            if (u) {
                l = t + (l.length > 0 ? ` ` + l : l);
                continue;
            }
            let h = !!m,
                g;
            if (h) {
                g = r(p.substring(0, m));
                let e = g && o[g] ? r(p) : void 0;
                e && e !== g && ((g = e), (h = !1));
            } else g = r(p);
            if (!g) {
                if (!h) {
                    l = t + (l.length > 0 ? ` ` + l : l);
                    continue;
                }
                if (((g = r(p)), !g)) {
                    l = t + (l.length > 0 ? ` ` + l : l);
                    continue;
                }
                h = !1;
            }
            let _ =
                    d.length === 0
                        ? ``
                        : d.length === 1
                          ? d[0]
                          : a(d).join(`:`),
                v = f ? _ + fe : _,
                y = v + g;
            if (s.indexOf(y) > -1) continue;
            s.push(y);
            let b = i(g, h);
            for (let e = 0; e < b.length; ++e) {
                let t = b[e];
                s.push(v + t);
            }
            l = t + (l.length > 0 ? ` ` + l : l);
        }
        return l;
    },
    Se = (...e) => {
        let t = 0,
            n,
            r,
            i = ``;
        for (; t < e.length;)
            (n = e[t++]) && (r = Ce(n)) && (i && (i += ` `), (i += r));
        return i;
    },
    Ce = (e) => {
        if (typeof e == `string`) return e;
        let t,
            n = ``;
        for (let r = 0; r < e.length; r++)
            e[r] && (t = Ce(e[r])) && (n && (n += ` `), (n += t));
        return n;
    },
    we = (e, ...t) => {
        let n,
            r,
            i,
            a,
            o = (o) => (
                (n = ve(t.reduce((e, t) => t(e), e()))),
                (r = n.cache.get),
                (i = n.cache.set),
                (a = s),
                s(o)
            ),
            s = (e) => {
                let t = r(e);
                if (t) return t;
                let a = xe(e, n);
                return (i(e, a), a);
            };
        return ((a = o), (...e) => a(Se(...e)));
    },
    Te = [],
    H = (e) => {
        let t = (t) => t[e] || Te;
        return ((t.isThemeGetter = !0), t);
    },
    Ee = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
    De = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
    Oe = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
    ke = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    Ae =
        /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    je = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
    Me = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    Ne =
        /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    U = (e) => Oe.test(e),
    W = (e) => !!e && !Number.isNaN(Number(e)),
    G = (e) => !!e && Number.isInteger(Number(e)),
    Pe = (e) => e.endsWith(`%`) && W(e.slice(0, -1)),
    K = (e) => ke.test(e),
    Fe = () => !0,
    Ie = (e) => Ae.test(e) && !je.test(e),
    Le = () => !1,
    Re = (e) => Me.test(e),
    ze = (e) => Ne.test(e),
    Be = (e) => !q(e) && !Y(e),
    Ve = (e) =>
        e.startsWith(`@container`) &&
        ((e[10] === `/` && e[11] !== void 0) ||
            (e[11] === `s` && e[16] !== void 0 && e.startsWith(`-size/`, 10)) ||
            (e[11] === `n` &&
                e[18] !== void 0 &&
                e.startsWith(`-normal/`, 10))),
    He = (e) => Q(e, nt, Le),
    q = (e) => Ee.test(e),
    J = (e) => Q(e, rt, Ie),
    Ue = (e) => Q(e, it, W),
    We = (e) => Q(e, ot, Fe),
    Ge = (e) => Q(e, at, Le),
    Ke = (e) => Q(e, et, Le),
    qe = (e) => Q(e, tt, ze),
    Je = (e) => Q(e, st, Re),
    Y = (e) => De.test(e),
    X = (e) => $(e, rt),
    Ye = (e) => $(e, at),
    Xe = (e) => $(e, et),
    Ze = (e) => $(e, nt),
    Qe = (e) => $(e, tt),
    Z = (e) => $(e, st, !0),
    $e = (e) => $(e, ot, !0),
    Q = (e, t, n) => {
        let r = Ee.exec(e);
        return r ? (r[1] ? t(r[1]) : n(r[2])) : !1;
    },
    $ = (e, t, n = !1) => {
        let r = De.exec(e);
        return r ? (r[1] ? t(r[1]) : n) : !1;
    },
    et = (e) => e === `position` || e === `percentage`,
    tt = (e) => e === `image` || e === `url`,
    nt = (e) => e === `length` || e === `size` || e === `bg-size`,
    rt = (e) => e === `length`,
    it = (e) => e === `number`,
    at = (e) => e === `family-name`,
    ot = (e) => e === `number` || e === `weight`,
    st = (e) => e === `shadow`,
    ct = we(() => {
        let e = H(`color`),
            t = H(`font`),
            n = H(`text`),
            r = H(`font-weight`),
            i = H(`tracking`),
            a = H(`leading`),
            o = H(`breakpoint`),
            s = H(`container`),
            c = H(`spacing`),
            l = H(`radius`),
            u = H(`shadow`),
            d = H(`inset-shadow`),
            f = H(`text-shadow`),
            p = H(`drop-shadow`),
            m = H(`blur`),
            h = H(`perspective`),
            g = H(`aspect`),
            _ = H(`ease`),
            v = H(`animate`),
            y = () => [
                `auto`,
                `avoid`,
                `all`,
                `avoid-page`,
                `page`,
                `left`,
                `right`,
                `column`,
            ],
            b = () => [
                `center`,
                `top`,
                `bottom`,
                `left`,
                `right`,
                `top-left`,
                `left-top`,
                `top-right`,
                `right-top`,
                `bottom-right`,
                `right-bottom`,
                `bottom-left`,
                `left-bottom`,
            ],
            ee = () => [...b(), Y, q],
            te = () => [`auto`, `hidden`, `clip`, `visible`, `scroll`],
            ne = () => [`auto`, `contain`, `none`],
            x = () => [Y, q, c],
            S = () => [U, `full`, `auto`, ...x()],
            C = () => [G, `none`, `subgrid`, Y, q],
            w = () => [`auto`, { span: [`full`, G, Y, q] }, G, Y, q],
            T = () => [G, `auto`, Y, q],
            E = () => [`auto`, `min`, `max`, `fr`, Y, q],
            D = () => [
                `start`,
                `end`,
                `center`,
                `between`,
                `around`,
                `evenly`,
                `stretch`,
                `baseline`,
                `center-safe`,
                `end-safe`,
            ],
            O = () => [
                `start`,
                `end`,
                `center`,
                `stretch`,
                `center-safe`,
                `end-safe`,
            ],
            k = () => [`auto`, ...x()],
            A = () => [
                U,
                `auto`,
                `full`,
                `dvw`,
                `dvh`,
                `lvw`,
                `lvh`,
                `svw`,
                `svh`,
                `min`,
                `max`,
                `fit`,
                ...x(),
            ],
            j = () => [
                U,
                `screen`,
                `full`,
                `dvw`,
                `lvw`,
                `svw`,
                `min`,
                `max`,
                `fit`,
                ...x(),
            ],
            re = () => [
                U,
                `screen`,
                `full`,
                `lh`,
                `dvh`,
                `lvh`,
                `svh`,
                `min`,
                `max`,
                `fit`,
                ...x(),
            ],
            M = () => [e, Y, q],
            ie = () => [...b(), Xe, Ke, { position: [Y, q] }],
            N = () => [
                `no-repeat`,
                { repeat: [``, `x`, `y`, `space`, `round`] },
            ],
            ae = () => [`auto`, `cover`, `contain`, Ze, He, { size: [Y, q] }],
            oe = () => [Pe, X, J],
            P = () => [``, `none`, `full`, l, Y, q],
            F = () => [``, W, X, J],
            I = () => [`solid`, `dashed`, `dotted`, `double`],
            se = () => [
                `normal`,
                `multiply`,
                `screen`,
                `overlay`,
                `darken`,
                `lighten`,
                `color-dodge`,
                `color-burn`,
                `hard-light`,
                `soft-light`,
                `difference`,
                `exclusion`,
                `hue`,
                `saturation`,
                `color`,
                `luminosity`,
            ],
            L = () => [W, Pe, Xe, Ke],
            R = () => [``, `none`, m, Y, q],
            z = () => [`none`, W, Y, q],
            B = () => [`none`, W, Y, q],
            ce = () => [W, Y, q],
            V = () => [U, `full`, ...x()];
        return {
            cacheSize: 500,
            theme: {
                animate: [`spin`, `ping`, `pulse`, `bounce`],
                aspect: [`video`],
                blur: [K],
                breakpoint: [K],
                color: [Fe],
                container: [K],
                'drop-shadow': [K],
                ease: [`in`, `out`, `in-out`],
                font: [Be],
                'font-weight': [
                    `thin`,
                    `extralight`,
                    `light`,
                    `normal`,
                    `medium`,
                    `semibold`,
                    `bold`,
                    `extrabold`,
                    `black`,
                ],
                'inset-shadow': [K],
                leading: [
                    `none`,
                    `tight`,
                    `snug`,
                    `normal`,
                    `relaxed`,
                    `loose`,
                ],
                perspective: [
                    `dramatic`,
                    `near`,
                    `normal`,
                    `midrange`,
                    `distant`,
                    `none`,
                ],
                radius: [K],
                shadow: [K],
                spacing: [`px`, W],
                text: [K],
                'text-shadow': [K],
                tracking: [
                    `tighter`,
                    `tight`,
                    `normal`,
                    `wide`,
                    `wider`,
                    `widest`,
                ],
            },
            classGroups: {
                aspect: [{ aspect: [`auto`, `square`, U, q, Y, g] }],
                container: [`container`],
                'container-type': [
                    { '@container': [``, `normal`, `size`, Y, q] },
                ],
                'container-named': [Ve],
                columns: [{ columns: [W, q, Y, s] }],
                'break-after': [{ 'break-after': y() }],
                'break-before': [{ 'break-before': y() }],
                'break-inside': [
                    {
                        'break-inside': [
                            `auto`,
                            `avoid`,
                            `avoid-page`,
                            `avoid-column`,
                        ],
                    },
                ],
                'box-decoration': [{ 'box-decoration': [`slice`, `clone`] }],
                box: [{ box: [`border`, `content`] }],
                display: [
                    `block`,
                    `inline-block`,
                    `inline`,
                    `flex`,
                    `inline-flex`,
                    `table`,
                    `inline-table`,
                    `table-caption`,
                    `table-cell`,
                    `table-column`,
                    `table-column-group`,
                    `table-footer-group`,
                    `table-header-group`,
                    `table-row-group`,
                    `table-row`,
                    `flow-root`,
                    `grid`,
                    `inline-grid`,
                    `contents`,
                    `list-item`,
                    `hidden`,
                ],
                sr: [`sr-only`, `not-sr-only`],
                float: [{ float: [`right`, `left`, `none`, `start`, `end`] }],
                clear: [
                    {
                        clear: [
                            `left`,
                            `right`,
                            `both`,
                            `none`,
                            `start`,
                            `end`,
                        ],
                    },
                ],
                isolation: [`isolate`, `isolation-auto`],
                'object-fit': [
                    {
                        object: [
                            `contain`,
                            `cover`,
                            `fill`,
                            `none`,
                            `scale-down`,
                        ],
                    },
                ],
                'object-position': [{ object: ee() }],
                overflow: [{ overflow: te() }],
                'overflow-x': [{ 'overflow-x': te() }],
                'overflow-y': [{ 'overflow-y': te() }],
                overscroll: [{ overscroll: ne() }],
                'overscroll-x': [{ 'overscroll-x': ne() }],
                'overscroll-y': [{ 'overscroll-y': ne() }],
                position: [`static`, `fixed`, `absolute`, `relative`, `sticky`],
                inset: [{ inset: S() }],
                'inset-x': [{ 'inset-x': S() }],
                'inset-y': [{ 'inset-y': S() }],
                start: [{ 'inset-s': S(), start: S() }],
                end: [{ 'inset-e': S(), end: S() }],
                'inset-bs': [{ 'inset-bs': S() }],
                'inset-be': [{ 'inset-be': S() }],
                top: [{ top: S() }],
                right: [{ right: S() }],
                bottom: [{ bottom: S() }],
                left: [{ left: S() }],
                visibility: [`visible`, `invisible`, `collapse`],
                z: [{ z: [G, `auto`, Y, q] }],
                basis: [{ basis: [U, `full`, `auto`, s, ...x()] }],
                'flex-direction': [
                    { flex: [`row`, `row-reverse`, `col`, `col-reverse`] },
                ],
                'flex-wrap': [{ flex: [`nowrap`, `wrap`, `wrap-reverse`] }],
                flex: [{ flex: [W, U, `auto`, `initial`, `none`, q] }],
                grow: [{ grow: [``, W, Y, q] }],
                shrink: [{ shrink: [``, W, Y, q] }],
                order: [{ order: [G, `first`, `last`, `none`, Y, q] }],
                'grid-cols': [{ 'grid-cols': C() }],
                'col-start-end': [{ col: w() }],
                'col-start': [{ 'col-start': T() }],
                'col-end': [{ 'col-end': T() }],
                'grid-rows': [{ 'grid-rows': C() }],
                'row-start-end': [{ row: w() }],
                'row-start': [{ 'row-start': T() }],
                'row-end': [{ 'row-end': T() }],
                'grid-flow': [
                    {
                        'grid-flow': [
                            `row`,
                            `col`,
                            `dense`,
                            `row-dense`,
                            `col-dense`,
                        ],
                    },
                ],
                'auto-cols': [{ 'auto-cols': E() }],
                'auto-rows': [{ 'auto-rows': E() }],
                gap: [{ gap: x() }],
                'gap-x': [{ 'gap-x': x() }],
                'gap-y': [{ 'gap-y': x() }],
                'justify-content': [{ justify: [...D(), `normal`] }],
                'justify-items': [{ 'justify-items': [...O(), `normal`] }],
                'justify-self': [{ 'justify-self': [`auto`, ...O()] }],
                'align-content': [{ content: [`normal`, ...D()] }],
                'align-items': [
                    { items: [...O(), { baseline: [``, `last`] }] },
                ],
                'align-self': [
                    { self: [`auto`, ...O(), { baseline: [``, `last`] }] },
                ],
                'place-content': [{ 'place-content': D() }],
                'place-items': [{ 'place-items': [...O(), `baseline`] }],
                'place-self': [{ 'place-self': [`auto`, ...O()] }],
                p: [{ p: x() }],
                px: [{ px: x() }],
                py: [{ py: x() }],
                ps: [{ ps: x() }],
                pe: [{ pe: x() }],
                pbs: [{ pbs: x() }],
                pbe: [{ pbe: x() }],
                pt: [{ pt: x() }],
                pr: [{ pr: x() }],
                pb: [{ pb: x() }],
                pl: [{ pl: x() }],
                m: [{ m: k() }],
                mx: [{ mx: k() }],
                my: [{ my: k() }],
                ms: [{ ms: k() }],
                me: [{ me: k() }],
                mbs: [{ mbs: k() }],
                mbe: [{ mbe: k() }],
                mt: [{ mt: k() }],
                mr: [{ mr: k() }],
                mb: [{ mb: k() }],
                ml: [{ ml: k() }],
                'space-x': [{ 'space-x': x() }],
                'space-x-reverse': [`space-x-reverse`],
                'space-y': [{ 'space-y': x() }],
                'space-y-reverse': [`space-y-reverse`],
                size: [{ size: A() }],
                'inline-size': [{ inline: [`auto`, ...j()] }],
                'min-inline-size': [{ 'min-inline': [`auto`, ...j()] }],
                'max-inline-size': [{ 'max-inline': [`none`, ...j()] }],
                'block-size': [{ block: [`auto`, ...re()] }],
                'min-block-size': [{ 'min-block': [`auto`, ...re()] }],
                'max-block-size': [{ 'max-block': [`none`, ...re()] }],
                w: [{ w: [s, `screen`, ...A()] }],
                'min-w': [{ 'min-w': [s, `screen`, `none`, ...A()] }],
                'max-w': [
                    {
                        'max-w': [
                            s,
                            `screen`,
                            `none`,
                            `prose`,
                            { screen: [o] },
                            ...A(),
                        ],
                    },
                ],
                h: [{ h: [`screen`, `lh`, ...A()] }],
                'min-h': [{ 'min-h': [`screen`, `lh`, `none`, ...A()] }],
                'max-h': [{ 'max-h': [`screen`, `lh`, ...A()] }],
                'font-size': [{ text: [`base`, n, X, J] }],
                'font-smoothing': [`antialiased`, `subpixel-antialiased`],
                'font-style': [`italic`, `not-italic`],
                'font-weight': [{ font: [r, $e, We] }],
                'font-stretch': [
                    {
                        'font-stretch': [
                            `ultra-condensed`,
                            `extra-condensed`,
                            `condensed`,
                            `semi-condensed`,
                            `normal`,
                            `semi-expanded`,
                            `expanded`,
                            `extra-expanded`,
                            `ultra-expanded`,
                            Pe,
                            q,
                        ],
                    },
                ],
                'font-family': [{ font: [Ye, Ge, t] }],
                'font-features': [{ 'font-features': [q] }],
                'fvn-normal': [`normal-nums`],
                'fvn-ordinal': [`ordinal`],
                'fvn-slashed-zero': [`slashed-zero`],
                'fvn-figure': [`lining-nums`, `oldstyle-nums`],
                'fvn-spacing': [`proportional-nums`, `tabular-nums`],
                'fvn-fraction': [`diagonal-fractions`, `stacked-fractions`],
                tracking: [{ tracking: [i, Y, q] }],
                'line-clamp': [{ 'line-clamp': [W, `none`, Y, Ue] }],
                leading: [{ leading: [a, ...x()] }],
                'list-image': [{ 'list-image': [`none`, Y, q] }],
                'list-style-position': [{ list: [`inside`, `outside`] }],
                'list-style-type': [
                    { list: [`disc`, `decimal`, `none`, Y, q] },
                ],
                'text-alignment': [
                    {
                        text: [
                            `left`,
                            `center`,
                            `right`,
                            `justify`,
                            `start`,
                            `end`,
                        ],
                    },
                ],
                'placeholder-color': [{ placeholder: M() }],
                'text-color': [{ text: M() }],
                'text-decoration': [
                    `underline`,
                    `overline`,
                    `line-through`,
                    `no-underline`,
                ],
                'text-decoration-style': [{ decoration: [...I(), `wavy`] }],
                'text-decoration-thickness': [
                    { decoration: [W, `from-font`, `auto`, Y, J] },
                ],
                'text-decoration-color': [{ decoration: M() }],
                'underline-offset': [{ 'underline-offset': [W, `auto`, Y, q] }],
                'text-transform': [
                    `uppercase`,
                    `lowercase`,
                    `capitalize`,
                    `normal-case`,
                ],
                'text-overflow': [`truncate`, `text-ellipsis`, `text-clip`],
                'text-wrap': [
                    { text: [`wrap`, `nowrap`, `balance`, `pretty`] },
                ],
                indent: [{ indent: x() }],
                'tab-size': [{ tab: [G, Y, q] }],
                'vertical-align': [
                    {
                        align: [
                            `baseline`,
                            `top`,
                            `middle`,
                            `bottom`,
                            `text-top`,
                            `text-bottom`,
                            `sub`,
                            `super`,
                            Y,
                            q,
                        ],
                    },
                ],
                whitespace: [
                    {
                        whitespace: [
                            `normal`,
                            `nowrap`,
                            `pre`,
                            `pre-line`,
                            `pre-wrap`,
                            `break-spaces`,
                        ],
                    },
                ],
                break: [{ break: [`normal`, `words`, `all`, `keep`] }],
                wrap: [{ wrap: [`break-word`, `anywhere`, `normal`] }],
                hyphens: [{ hyphens: [`none`, `manual`, `auto`] }],
                content: [{ content: [`none`, Y, q] }],
                'bg-attachment': [{ bg: [`fixed`, `local`, `scroll`] }],
                'bg-clip': [
                    { 'bg-clip': [`border`, `padding`, `content`, `text`] },
                ],
                'bg-origin': [
                    { 'bg-origin': [`border`, `padding`, `content`] },
                ],
                'bg-position': [{ bg: ie() }],
                'bg-repeat': [{ bg: N() }],
                'bg-size': [{ bg: ae() }],
                'bg-image': [
                    {
                        bg: [
                            `none`,
                            {
                                linear: [
                                    {
                                        to: [
                                            `t`,
                                            `tr`,
                                            `r`,
                                            `br`,
                                            `b`,
                                            `bl`,
                                            `l`,
                                            `tl`,
                                        ],
                                    },
                                    G,
                                    Y,
                                    q,
                                ],
                                radial: [``, Y, q],
                                conic: [G, Y, q],
                            },
                            Qe,
                            qe,
                        ],
                    },
                ],
                'bg-color': [{ bg: M() }],
                'gradient-from-pos': [{ from: oe() }],
                'gradient-via-pos': [{ via: oe() }],
                'gradient-to-pos': [{ to: oe() }],
                'gradient-from': [{ from: M() }],
                'gradient-via': [{ via: M() }],
                'gradient-to': [{ to: M() }],
                rounded: [{ rounded: P() }],
                'rounded-s': [{ 'rounded-s': P() }],
                'rounded-e': [{ 'rounded-e': P() }],
                'rounded-t': [{ 'rounded-t': P() }],
                'rounded-r': [{ 'rounded-r': P() }],
                'rounded-b': [{ 'rounded-b': P() }],
                'rounded-l': [{ 'rounded-l': P() }],
                'rounded-ss': [{ 'rounded-ss': P() }],
                'rounded-se': [{ 'rounded-se': P() }],
                'rounded-ee': [{ 'rounded-ee': P() }],
                'rounded-es': [{ 'rounded-es': P() }],
                'rounded-tl': [{ 'rounded-tl': P() }],
                'rounded-tr': [{ 'rounded-tr': P() }],
                'rounded-br': [{ 'rounded-br': P() }],
                'rounded-bl': [{ 'rounded-bl': P() }],
                'border-w': [{ border: F() }],
                'border-w-x': [{ 'border-x': F() }],
                'border-w-y': [{ 'border-y': F() }],
                'border-w-s': [{ 'border-s': F() }],
                'border-w-e': [{ 'border-e': F() }],
                'border-w-bs': [{ 'border-bs': F() }],
                'border-w-be': [{ 'border-be': F() }],
                'border-w-t': [{ 'border-t': F() }],
                'border-w-r': [{ 'border-r': F() }],
                'border-w-b': [{ 'border-b': F() }],
                'border-w-l': [{ 'border-l': F() }],
                'divide-x': [{ 'divide-x': F() }],
                'divide-x-reverse': [`divide-x-reverse`],
                'divide-y': [{ 'divide-y': F() }],
                'divide-y-reverse': [`divide-y-reverse`],
                'border-style': [{ border: [...I(), `hidden`, `none`] }],
                'divide-style': [{ divide: [...I(), `hidden`, `none`] }],
                'border-color': [{ border: M() }],
                'border-color-x': [{ 'border-x': M() }],
                'border-color-y': [{ 'border-y': M() }],
                'border-color-s': [{ 'border-s': M() }],
                'border-color-e': [{ 'border-e': M() }],
                'border-color-bs': [{ 'border-bs': M() }],
                'border-color-be': [{ 'border-be': M() }],
                'border-color-t': [{ 'border-t': M() }],
                'border-color-r': [{ 'border-r': M() }],
                'border-color-b': [{ 'border-b': M() }],
                'border-color-l': [{ 'border-l': M() }],
                'divide-color': [{ divide: M() }],
                'outline-style': [{ outline: [...I(), `none`, `hidden`] }],
                'outline-offset': [{ 'outline-offset': [W, Y, q] }],
                'outline-w': [{ outline: [``, W, X, J] }],
                'outline-color': [{ outline: M() }],
                shadow: [{ shadow: [``, `none`, u, Z, Je] }],
                'shadow-color': [{ shadow: M() }],
                'inset-shadow': [{ 'inset-shadow': [`none`, d, Z, Je] }],
                'inset-shadow-color': [{ 'inset-shadow': M() }],
                'ring-w': [{ ring: F() }],
                'ring-w-inset': [`ring-inset`],
                'ring-color': [{ ring: M() }],
                'ring-offset-w': [{ 'ring-offset': [W, J] }],
                'ring-offset-color': [{ 'ring-offset': M() }],
                'inset-ring-w': [{ 'inset-ring': F() }],
                'inset-ring-color': [{ 'inset-ring': M() }],
                'text-shadow': [{ 'text-shadow': [`none`, f, Z, Je] }],
                'text-shadow-color': [{ 'text-shadow': M() }],
                opacity: [{ opacity: [W, Y, q] }],
                'mix-blend': [
                    { 'mix-blend': [...se(), `plus-darker`, `plus-lighter`] },
                ],
                'bg-blend': [{ 'bg-blend': se() }],
                'mask-clip': [
                    {
                        'mask-clip': [
                            `border`,
                            `padding`,
                            `content`,
                            `fill`,
                            `stroke`,
                            `view`,
                        ],
                    },
                    `mask-no-clip`,
                ],
                'mask-composite': [
                    { mask: [`add`, `subtract`, `intersect`, `exclude`] },
                ],
                'mask-image-linear-pos': [{ 'mask-linear': [W] }],
                'mask-image-linear-from-pos': [{ 'mask-linear-from': L() }],
                'mask-image-linear-to-pos': [{ 'mask-linear-to': L() }],
                'mask-image-linear-from-color': [{ 'mask-linear-from': M() }],
                'mask-image-linear-to-color': [{ 'mask-linear-to': M() }],
                'mask-image-t-from-pos': [{ 'mask-t-from': L() }],
                'mask-image-t-to-pos': [{ 'mask-t-to': L() }],
                'mask-image-t-from-color': [{ 'mask-t-from': M() }],
                'mask-image-t-to-color': [{ 'mask-t-to': M() }],
                'mask-image-r-from-pos': [{ 'mask-r-from': L() }],
                'mask-image-r-to-pos': [{ 'mask-r-to': L() }],
                'mask-image-r-from-color': [{ 'mask-r-from': M() }],
                'mask-image-r-to-color': [{ 'mask-r-to': M() }],
                'mask-image-b-from-pos': [{ 'mask-b-from': L() }],
                'mask-image-b-to-pos': [{ 'mask-b-to': L() }],
                'mask-image-b-from-color': [{ 'mask-b-from': M() }],
                'mask-image-b-to-color': [{ 'mask-b-to': M() }],
                'mask-image-l-from-pos': [{ 'mask-l-from': L() }],
                'mask-image-l-to-pos': [{ 'mask-l-to': L() }],
                'mask-image-l-from-color': [{ 'mask-l-from': M() }],
                'mask-image-l-to-color': [{ 'mask-l-to': M() }],
                'mask-image-x-from-pos': [{ 'mask-x-from': L() }],
                'mask-image-x-to-pos': [{ 'mask-x-to': L() }],
                'mask-image-x-from-color': [{ 'mask-x-from': M() }],
                'mask-image-x-to-color': [{ 'mask-x-to': M() }],
                'mask-image-y-from-pos': [{ 'mask-y-from': L() }],
                'mask-image-y-to-pos': [{ 'mask-y-to': L() }],
                'mask-image-y-from-color': [{ 'mask-y-from': M() }],
                'mask-image-y-to-color': [{ 'mask-y-to': M() }],
                'mask-image-radial': [{ 'mask-radial': [Y, q] }],
                'mask-image-radial-from-pos': [{ 'mask-radial-from': L() }],
                'mask-image-radial-to-pos': [{ 'mask-radial-to': L() }],
                'mask-image-radial-from-color': [{ 'mask-radial-from': M() }],
                'mask-image-radial-to-color': [{ 'mask-radial-to': M() }],
                'mask-image-radial-shape': [
                    { 'mask-radial': [`circle`, `ellipse`] },
                ],
                'mask-image-radial-size': [
                    {
                        'mask-radial': [
                            {
                                closest: [`side`, `corner`],
                                farthest: [`side`, `corner`],
                            },
                        ],
                    },
                ],
                'mask-image-radial-pos': [{ 'mask-radial-at': b() }],
                'mask-image-conic-pos': [{ 'mask-conic': [W] }],
                'mask-image-conic-from-pos': [{ 'mask-conic-from': L() }],
                'mask-image-conic-to-pos': [{ 'mask-conic-to': L() }],
                'mask-image-conic-from-color': [{ 'mask-conic-from': M() }],
                'mask-image-conic-to-color': [{ 'mask-conic-to': M() }],
                'mask-mode': [{ mask: [`alpha`, `luminance`, `match`] }],
                'mask-origin': [
                    {
                        'mask-origin': [
                            `border`,
                            `padding`,
                            `content`,
                            `fill`,
                            `stroke`,
                            `view`,
                        ],
                    },
                ],
                'mask-position': [{ mask: ie() }],
                'mask-repeat': [{ mask: N() }],
                'mask-size': [{ mask: ae() }],
                'mask-type': [{ 'mask-type': [`alpha`, `luminance`] }],
                'mask-image': [{ mask: [`none`, Y, q] }],
                filter: [{ filter: [``, `none`, Y, q] }],
                blur: [{ blur: R() }],
                brightness: [{ brightness: [W, Y, q] }],
                contrast: [{ contrast: [W, Y, q] }],
                'drop-shadow': [{ 'drop-shadow': [``, `none`, p, Z, Je] }],
                'drop-shadow-color': [{ 'drop-shadow': M() }],
                grayscale: [{ grayscale: [``, W, Y, q] }],
                'hue-rotate': [{ 'hue-rotate': [W, Y, q] }],
                invert: [{ invert: [``, W, Y, q] }],
                saturate: [{ saturate: [W, Y, q] }],
                sepia: [{ sepia: [``, W, Y, q] }],
                'backdrop-filter': [{ 'backdrop-filter': [``, `none`, Y, q] }],
                'backdrop-blur': [{ 'backdrop-blur': R() }],
                'backdrop-brightness': [{ 'backdrop-brightness': [W, Y, q] }],
                'backdrop-contrast': [{ 'backdrop-contrast': [W, Y, q] }],
                'backdrop-grayscale': [{ 'backdrop-grayscale': [``, W, Y, q] }],
                'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [W, Y, q] }],
                'backdrop-invert': [{ 'backdrop-invert': [``, W, Y, q] }],
                'backdrop-opacity': [{ 'backdrop-opacity': [W, Y, q] }],
                'backdrop-saturate': [{ 'backdrop-saturate': [W, Y, q] }],
                'backdrop-sepia': [{ 'backdrop-sepia': [``, W, Y, q] }],
                'border-collapse': [{ border: [`collapse`, `separate`] }],
                'border-spacing': [{ 'border-spacing': x() }],
                'border-spacing-x': [{ 'border-spacing-x': x() }],
                'border-spacing-y': [{ 'border-spacing-y': x() }],
                'table-layout': [{ table: [`auto`, `fixed`] }],
                caption: [{ caption: [`top`, `bottom`] }],
                transition: [
                    {
                        transition: [
                            ``,
                            `all`,
                            `colors`,
                            `opacity`,
                            `shadow`,
                            `transform`,
                            `none`,
                            Y,
                            q,
                        ],
                    },
                ],
                'transition-behavior': [{ transition: [`normal`, `discrete`] }],
                duration: [{ duration: [W, `initial`, Y, q] }],
                ease: [{ ease: [`linear`, `initial`, _, Y, q] }],
                delay: [{ delay: [W, Y, q] }],
                animate: [{ animate: [`none`, v, Y, q] }],
                backface: [{ backface: [`hidden`, `visible`] }],
                perspective: [{ perspective: [h, Y, q] }],
                'perspective-origin': [{ 'perspective-origin': ee() }],
                rotate: [{ rotate: z() }],
                'rotate-x': [{ 'rotate-x': z() }],
                'rotate-y': [{ 'rotate-y': z() }],
                'rotate-z': [{ 'rotate-z': z() }],
                scale: [{ scale: B() }],
                'scale-x': [{ 'scale-x': B() }],
                'scale-y': [{ 'scale-y': B() }],
                'scale-z': [{ 'scale-z': B() }],
                'scale-3d': [`scale-3d`],
                skew: [{ skew: ce() }],
                'skew-x': [{ 'skew-x': ce() }],
                'skew-y': [{ 'skew-y': ce() }],
                transform: [{ transform: [Y, q, ``, `none`, `gpu`, `cpu`] }],
                'transform-origin': [{ origin: ee() }],
                'transform-style': [{ transform: [`3d`, `flat`] }],
                translate: [{ translate: V() }],
                'translate-x': [{ 'translate-x': V() }],
                'translate-y': [{ 'translate-y': V() }],
                'translate-z': [{ 'translate-z': V() }],
                'translate-none': [`translate-none`],
                zoom: [{ zoom: [G, Y, q] }],
                accent: [{ accent: M() }],
                appearance: [{ appearance: [`none`, `auto`] }],
                'caret-color': [{ caret: M() }],
                'color-scheme': [
                    {
                        scheme: [
                            `normal`,
                            `dark`,
                            `light`,
                            `light-dark`,
                            `only-dark`,
                            `only-light`,
                        ],
                    },
                ],
                cursor: [
                    {
                        cursor: [
                            `auto`,
                            `default`,
                            `pointer`,
                            `wait`,
                            `text`,
                            `move`,
                            `help`,
                            `not-allowed`,
                            `none`,
                            `context-menu`,
                            `progress`,
                            `cell`,
                            `crosshair`,
                            `vertical-text`,
                            `alias`,
                            `copy`,
                            `no-drop`,
                            `grab`,
                            `grabbing`,
                            `all-scroll`,
                            `col-resize`,
                            `row-resize`,
                            `n-resize`,
                            `e-resize`,
                            `s-resize`,
                            `w-resize`,
                            `ne-resize`,
                            `nw-resize`,
                            `se-resize`,
                            `sw-resize`,
                            `ew-resize`,
                            `ns-resize`,
                            `nesw-resize`,
                            `nwse-resize`,
                            `zoom-in`,
                            `zoom-out`,
                            Y,
                            q,
                        ],
                    },
                ],
                'field-sizing': [{ 'field-sizing': [`fixed`, `content`] }],
                'pointer-events': [{ 'pointer-events': [`auto`, `none`] }],
                resize: [{ resize: [`none`, ``, `y`, `x`] }],
                'scroll-behavior': [{ scroll: [`auto`, `smooth`] }],
                'scrollbar-thumb-color': [{ 'scrollbar-thumb': M() }],
                'scrollbar-track-color': [{ 'scrollbar-track': M() }],
                'scrollbar-gutter': [
                    { 'scrollbar-gutter': [`auto`, `stable`, `both`] },
                ],
                'scrollbar-w': [{ scrollbar: [`auto`, `thin`, `none`] }],
                'scroll-m': [{ 'scroll-m': x() }],
                'scroll-mx': [{ 'scroll-mx': x() }],
                'scroll-my': [{ 'scroll-my': x() }],
                'scroll-ms': [{ 'scroll-ms': x() }],
                'scroll-me': [{ 'scroll-me': x() }],
                'scroll-mbs': [{ 'scroll-mbs': x() }],
                'scroll-mbe': [{ 'scroll-mbe': x() }],
                'scroll-mt': [{ 'scroll-mt': x() }],
                'scroll-mr': [{ 'scroll-mr': x() }],
                'scroll-mb': [{ 'scroll-mb': x() }],
                'scroll-ml': [{ 'scroll-ml': x() }],
                'scroll-p': [{ 'scroll-p': x() }],
                'scroll-px': [{ 'scroll-px': x() }],
                'scroll-py': [{ 'scroll-py': x() }],
                'scroll-ps': [{ 'scroll-ps': x() }],
                'scroll-pe': [{ 'scroll-pe': x() }],
                'scroll-pbs': [{ 'scroll-pbs': x() }],
                'scroll-pbe': [{ 'scroll-pbe': x() }],
                'scroll-pt': [{ 'scroll-pt': x() }],
                'scroll-pr': [{ 'scroll-pr': x() }],
                'scroll-pb': [{ 'scroll-pb': x() }],
                'scroll-pl': [{ 'scroll-pl': x() }],
                'snap-align': [
                    { snap: [`start`, `end`, `center`, `align-none`] },
                ],
                'snap-stop': [{ snap: [`normal`, `always`] }],
                'snap-type': [{ snap: [`none`, `x`, `y`, `both`] }],
                'snap-strictness': [{ snap: [`mandatory`, `proximity`] }],
                touch: [{ touch: [`auto`, `none`, `manipulation`] }],
                'touch-x': [{ 'touch-pan': [`x`, `left`, `right`] }],
                'touch-y': [{ 'touch-pan': [`y`, `up`, `down`] }],
                'touch-pz': [`touch-pinch-zoom`],
                select: [{ select: [`none`, `text`, `all`, `auto`] }],
                'will-change': [
                    {
                        'will-change': [
                            `auto`,
                            `scroll`,
                            `contents`,
                            `transform`,
                            Y,
                            q,
                        ],
                    },
                ],
                fill: [{ fill: [`none`, ...M()] }],
                'stroke-w': [{ stroke: [W, X, J, Ue] }],
                stroke: [{ stroke: [`none`, ...M()] }],
                'forced-color-adjust': [
                    { 'forced-color-adjust': [`auto`, `none`] },
                ],
            },
            conflictingClassGroups: {
                'container-named': [`container-type`],
                overflow: [`overflow-x`, `overflow-y`],
                overscroll: [`overscroll-x`, `overscroll-y`],
                inset: [
                    `inset-x`,
                    `inset-y`,
                    `inset-bs`,
                    `inset-be`,
                    `start`,
                    `end`,
                    `top`,
                    `right`,
                    `bottom`,
                    `left`,
                ],
                'inset-x': [`right`, `left`],
                'inset-y': [`top`, `bottom`],
                flex: [`basis`, `grow`, `shrink`],
                gap: [`gap-x`, `gap-y`],
                p: [
                    `px`,
                    `py`,
                    `ps`,
                    `pe`,
                    `pbs`,
                    `pbe`,
                    `pt`,
                    `pr`,
                    `pb`,
                    `pl`,
                ],
                px: [`pr`, `pl`],
                py: [`pt`, `pb`],
                m: [
                    `mx`,
                    `my`,
                    `ms`,
                    `me`,
                    `mbs`,
                    `mbe`,
                    `mt`,
                    `mr`,
                    `mb`,
                    `ml`,
                ],
                mx: [`mr`, `ml`],
                my: [`mt`, `mb`],
                size: [`w`, `h`],
                'font-size': [`leading`],
                'fvn-normal': [
                    `fvn-ordinal`,
                    `fvn-slashed-zero`,
                    `fvn-figure`,
                    `fvn-spacing`,
                    `fvn-fraction`,
                ],
                'fvn-ordinal': [`fvn-normal`],
                'fvn-slashed-zero': [`fvn-normal`],
                'fvn-figure': [`fvn-normal`],
                'fvn-spacing': [`fvn-normal`],
                'fvn-fraction': [`fvn-normal`],
                'line-clamp': [`display`, `overflow`],
                rounded: [
                    `rounded-s`,
                    `rounded-e`,
                    `rounded-t`,
                    `rounded-r`,
                    `rounded-b`,
                    `rounded-l`,
                    `rounded-ss`,
                    `rounded-se`,
                    `rounded-ee`,
                    `rounded-es`,
                    `rounded-tl`,
                    `rounded-tr`,
                    `rounded-br`,
                    `rounded-bl`,
                ],
                'rounded-s': [`rounded-ss`, `rounded-es`],
                'rounded-e': [`rounded-se`, `rounded-ee`],
                'rounded-t': [`rounded-tl`, `rounded-tr`],
                'rounded-r': [`rounded-tr`, `rounded-br`],
                'rounded-b': [`rounded-br`, `rounded-bl`],
                'rounded-l': [`rounded-tl`, `rounded-bl`],
                'border-spacing': [`border-spacing-x`, `border-spacing-y`],
                'border-w': [
                    `border-w-x`,
                    `border-w-y`,
                    `border-w-s`,
                    `border-w-e`,
                    `border-w-bs`,
                    `border-w-be`,
                    `border-w-t`,
                    `border-w-r`,
                    `border-w-b`,
                    `border-w-l`,
                ],
                'border-w-x': [`border-w-r`, `border-w-l`],
                'border-w-y': [`border-w-t`, `border-w-b`],
                'border-color': [
                    `border-color-x`,
                    `border-color-y`,
                    `border-color-s`,
                    `border-color-e`,
                    `border-color-bs`,
                    `border-color-be`,
                    `border-color-t`,
                    `border-color-r`,
                    `border-color-b`,
                    `border-color-l`,
                ],
                'border-color-x': [`border-color-r`, `border-color-l`],
                'border-color-y': [`border-color-t`, `border-color-b`],
                translate: [`translate-x`, `translate-y`, `translate-none`],
                'translate-none': [
                    `translate`,
                    `translate-x`,
                    `translate-y`,
                    `translate-z`,
                ],
                'scroll-m': [
                    `scroll-mx`,
                    `scroll-my`,
                    `scroll-ms`,
                    `scroll-me`,
                    `scroll-mbs`,
                    `scroll-mbe`,
                    `scroll-mt`,
                    `scroll-mr`,
                    `scroll-mb`,
                    `scroll-ml`,
                ],
                'scroll-mx': [`scroll-mr`, `scroll-ml`],
                'scroll-my': [`scroll-mt`, `scroll-mb`],
                'scroll-p': [
                    `scroll-px`,
                    `scroll-py`,
                    `scroll-ps`,
                    `scroll-pe`,
                    `scroll-pbs`,
                    `scroll-pbe`,
                    `scroll-pt`,
                    `scroll-pr`,
                    `scroll-pb`,
                    `scroll-pl`,
                ],
                'scroll-px': [`scroll-pr`, `scroll-pl`],
                'scroll-py': [`scroll-pt`, `scroll-pb`],
                touch: [`touch-x`, `touch-y`, `touch-pz`],
                'touch-x': [`touch`],
                'touch-y': [`touch`],
                'touch-pz': [`touch`],
            },
            conflictingClassGroupModifiers: { 'font-size': [`leading`] },
            postfixLookupClassGroups: [`container-type`],
            orderSensitiveModifiers: [
                `*`,
                `**`,
                `after`,
                `backdrop`,
                `before`,
                `details-content`,
                `file`,
                `first-letter`,
                `first-line`,
                `marker`,
                `placeholder`,
                `selection`,
            ],
        };
    });
function lt(...e) {
    return ct(O(e));
}
function ut(e) {
    return typeof e == `string` ? e : e?.url;
}
function dt(e) {
    return e ? e.flatMap((e) => (e.type === n ? dt(e.children) : [e])) : [];
}
var ft = b({
        name: `PrimitiveSlot`,
        inheritAttrs: !1,
        setup(e, { attrs: t, slots: n }) {
            return () => {
                if (!n.default) return null;
                let e = dt(n.default()),
                    r = e.findIndex((e) => e.type !== c);
                if (r === -1) return e;
                let i = e[r];
                delete i.props?.ref;
                let a = i.props ? te(t, i.props) : t,
                    o = f({ ...i, props: {} }, a);
                return e.length === 1 ? o : ((e[r] = o), e);
            };
        },
    }),
    pt = [`area`, `img`, `input`],
    mt = b({
        name: `Primitive`,
        inheritAttrs: !1,
        props: {
            asChild: { type: Boolean, default: !1 },
            as: { type: [String, Object], default: `div` },
        },
        setup(e, { attrs: t, slots: n }) {
            let r = e.asChild ? `template` : e.as;
            return typeof r == `string` && pt.includes(r)
                ? () => y(r, t)
                : r === `template`
                  ? () => y(ft, t, { default: n.default })
                  : () => y(e.as, t, { default: n.default });
        },
    });
function ht(e, t) {
    let n,
        r,
        i,
        a = p(!0),
        o = () => {
            ((a.value = !0), i());
        };
    h(e, o, { flush: `sync` });
    let s = typeof t == `function` ? t : t.get,
        c = typeof t == `function` ? void 0 : t.set,
        l = ee(
            (e, t) => (
                (r = e),
                (i = t),
                {
                    get() {
                        return ((a.value &&= ((n = s(n)), !1)), r(), n);
                    },
                    set(e) {
                        c?.(e);
                    },
                }
            ),
        );
    return (Object.isExtensible(l) && (l.trigger = o), l);
}
function gt(e) {
    return l() ? (a(e), !0) : !1;
}
var _t = new WeakMap(),
    vt = (...e) => {
        let n = e[0],
            r = v()?.proxy;
        if (r == null && !g())
            throw Error(`injectLocal must be called in setup`);
        return r && _t.has(r) && n in _t.get(r) ? _t.get(r)[n] : t(...e);
    };
function yt(e) {
    return E(e)
        ? i(
              new Proxy(
                  {},
                  {
                      get(t, n, r) {
                          return C(Reflect.get(e.value, n, r));
                      },
                      set(t, n, r) {
                          return (
                              E(e.value[n]) && !E(r)
                                  ? (e.value[n].value = r)
                                  : (e.value[n] = r),
                              !0
                          );
                      },
                      deleteProperty(t, n) {
                          return Reflect.deleteProperty(e.value, n);
                      },
                      has(t, n) {
                          return Reflect.has(e.value, n);
                      },
                      ownKeys() {
                          return Object.keys(e.value);
                      },
                      getOwnPropertyDescriptor() {
                          return { enumerable: !0, configurable: !0 };
                      },
                  },
              ),
          )
        : i(e);
}
function bt(e) {
    return yt(r(e));
}
function xt(e, ...t) {
    let n = t.flat(),
        r = n[0];
    return bt(() =>
        Object.fromEntries(
            typeof r == `function`
                ? Object.entries(_(e)).filter(([e, t]) => !r(w(t), e))
                : Object.entries(_(e)).filter((e) => !n.includes(e[0])),
        ),
    );
}
var St = typeof window < `u` && typeof document < `u`;
typeof WorkerGlobalScope < `u` && globalThis instanceof WorkerGlobalScope;
var Ct = (e) => e !== void 0,
    wt = Object.prototype.toString,
    Tt = (e) => wt.call(e) === `[object Object]`;
function Et(e) {
    return e.endsWith(`rem`) ? Number.parseFloat(e) * 16 : Number.parseFloat(e);
}
function Dt(e) {
    return Array.isArray(e) ? e : [e];
}
function Ot(e, t, n) {
    return h(e, t, { ...n, immediate: !0 });
}
var kt = St ? window : void 0,
    At = St ? window.document : void 0;
(St && window.navigator, St && window.location);
function jt(e) {
    let t = w(e);
    return t?.$el ?? t;
}
function Mt(...e) {
    let t = [],
        n = () => {
            (t.forEach((e) => e()), (t.length = 0));
        },
        i = (e, t, n, r) => (
            e.addEventListener(t, n, r),
            () => e.removeEventListener(t, n, r)
        ),
        a = r(() => {
            let t = Dt(w(e[0])).filter((e) => e != null);
            return t.every((e) => typeof e != `string`) ? t : void 0;
        }),
        o = Ot(
            () => [
                a.value?.map((e) => jt(e)) ?? [kt].filter((e) => e != null),
                Dt(w(a.value ? e[1] : e[0])),
                Dt(C(a.value ? e[2] : e[1])),
                w(a.value ? e[3] : e[2]),
            ],
            ([e, r, a, o]) => {
                if ((n(), !e?.length || !r?.length || !a?.length)) return;
                let s = Tt(o) ? { ...o } : o;
                t.push(
                    ...e.flatMap((e) =>
                        r.flatMap((t) => a.map((n) => i(e, t, n, s))),
                    ),
                );
            },
            { flush: `post` },
        );
    return (
        gt(n),
        () => {
            (o(), n());
        }
    );
}
function Nt() {
    let e = p(!1),
        t = v();
    return (
        t &&
            s(() => {
                e.value = !0;
            }, t),
        e
    );
}
function Pt(e) {
    let t = Nt();
    return r(() => (t.value, !!e()));
}
var Ft = Symbol(`vueuse-ssr-width`);
function It() {
    let e = g() ? vt(Ft, null) : null;
    return typeof e == `number` ? e : void 0;
}
function Lt(e, t = {}) {
    let { window: n = kt, ssrWidth: i = It() } = t,
        a = Pt(
            () => n && `matchMedia` in n && typeof n.matchMedia == `function`,
        ),
        o = p(typeof i == `number`),
        s = p(),
        c = p(!1);
    return (
        T(() => {
            if (o.value) {
                o.value = !a.value;
                let t = w(e).split(`,`);
                c.value = t.some((e) => {
                    let t = e.includes(`not all`),
                        n = e.match(
                            /\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/,
                        ),
                        r = e.match(
                            /\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/,
                        ),
                        a = !!(n || r);
                    return (
                        n && a && (a = i >= Et(n[1])),
                        r && a && (a = i <= Et(r[1])),
                        t ? !a : a
                    );
                });
                return;
            }
            a.value &&
                ((s.value = n.matchMedia(w(e))), (c.value = s.value.matches));
        }),
        Mt(
            s,
            `change`,
            (e) => {
                c.value = e.matches;
            },
            { passive: !0 },
        ),
        r(() => c.value)
    );
}
function Rt(e) {
    return JSON.parse(JSON.stringify(e));
}
function zt(e) {
    let t = v(),
        n = ht(
            () => null,
            () => (e ? jt(e) : t.proxy.$el),
        );
    return (o(n.trigger), s(n.trigger), n);
}
function Bt(t, n, i, a = {}) {
    let {
            clone: o = !1,
            passive: s = !1,
            eventName: c,
            deep: l = !1,
            defaultValue: u,
            shouldEmit: d,
        } = a,
        f = v(),
        p =
            i ||
            f?.emit ||
            f?.$emit?.bind(f) ||
            f?.proxy?.$emit?.bind(f?.proxy),
        m = c;
    ((n ||= `modelValue`), (m ||= `update:${n.toString()}`));
    let g = (e) => (o ? (typeof o == `function` ? o(e) : Rt(e)) : e),
        _ = () => (Ct(t[n]) ? g(t[n]) : u),
        y = (e) => {
            d ? d(e) && p(m, e) : p(m, e);
        };
    if (s) {
        let r = S(_()),
            i = !1;
        return (
            h(
                () => t[n],
                (t) => {
                    i || ((i = !0), (r.value = g(t)), e(() => (i = !1)));
                },
            ),
            h(
                r,
                (e) => {
                    !i && (e !== t[n] || l) && y(e);
                },
                { deep: l },
            ),
            r
        );
    } else
        return r({
            get() {
                return _();
            },
            set(e) {
                y(e);
            },
        });
}
var Vt = b({
        __name: `Button`,
        props: {
            variant: {},
            size: {},
            class: { type: [Boolean, null, String, Object, Array] },
            asChild: { type: Boolean },
            as: { default: `button` },
        },
        setup(e) {
            let t = e;
            return (n, r) => (
                d(),
                x(
                    C(mt),
                    {
                        'data-slot': `button`,
                        'data-variant': e.variant,
                        'data-size': e.size,
                        as: e.as,
                        'as-child': e.asChild,
                        class: ne(
                            C(lt)(
                                C(Ht)({ variant: e.variant, size: e.size }),
                                t.class,
                            ),
                        ),
                    },
                    { default: u(() => [m(n.$slots, `default`)]), _: 3 },
                    8,
                    [`data-variant`, `data-size`, `as`, `as-child`, `class`],
                )
            );
        },
    }),
    Ht = j(
        `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`,
        {
            variants: {
                variant: {
                    default: `bg-primary text-primary-foreground hover:bg-primary/90`,
                    destructive: `bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60`,
                    outline: `border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50`,
                    secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80`,
                    ghost: `hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50`,
                    link: `text-primary underline-offset-4 hover:underline`,
                },
                size: {
                    default: `h-9 px-4 py-2 has-[>svg]:px-3`,
                    xs: `h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3`,
                    sm: `h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5`,
                    lg: `h-10 rounded-md px-6 has-[>svg]:px-4`,
                    icon: `size-9`,
                    'icon-xs': `size-6 rounded-md [&_svg:not([class*='size-'])]:size-3`,
                    'icon-sm': `size-8`,
                    'icon-lg': `size-10`,
                },
            },
            defaultVariants: { variant: `default`, size: `default` },
        },
    );
export {
    Lt as a,
    mt as c,
    lt as d,
    ut as f,
    Mt as i,
    ft as l,
    At as n,
    Bt as o,
    j as p,
    zt as r,
    xt as s,
    Vt as t,
    dt as u,
};
