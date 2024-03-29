define(["exports"], function (e) {
	"use strict";
	try {
		self["workbox:core:7.0.0"] && _();
	} catch (e) {}
	class t extends Error {
		constructor(e, t) {
			super(
				((e, ...t) => {
					let s = e;
					return t.length > 0 && (s += ` :: ${JSON.stringify(t)}`), s;
				})(e, t),
			),
				(this.name = e),
				(this.details = t);
		}
	}
	try {
		self["workbox:routing:7.0.0"] && _();
	} catch (e) {}
	const s = (e) => (e && "object" == typeof e ? e : { handle: e });
	class n {
		constructor(e, t, n = "GET") {
			(this.handler = s(t)), (this.match = e), (this.method = n);
		}
		setCatchHandler(e) {
			this.catchHandler = s(e);
		}
	}
	class a extends n {
		constructor(e, t, s) {
			super(
				({ url: t }) => {
					const s = e.exec(t.href);
					if (s && (t.origin === location.origin || 0 === s.index))
						return s.slice(1);
				},
				t,
				s,
			);
		}
	}
	class r {
		constructor() {
			(this.t = new Map()), (this.i = new Map());
		}
		get routes() {
			return this.t;
		}
		addFetchListener() {
			self.addEventListener("fetch", (e) => {
				const { request: t } = e,
					s = this.handleRequest({ request: t, event: e });
				s && e.respondWith(s);
			});
		}
		addCacheListener() {
			self.addEventListener("message", (e) => {
				if (e.data && "CACHE_URLS" === e.data.type) {
					const { payload: t } = e.data,
						s = Promise.all(
							t.urlsToCache.map((t) => {
								"string" == typeof t && (t = [t]);
								const s = new Request(...t);
								return this.handleRequest({ request: s, event: e });
							}),
						);
					e.waitUntil(s),
						e.ports && e.ports[0] && s.then(() => e.ports[0].postMessage(!0));
				}
			});
		}
		handleRequest({ request: e, event: t }) {
			const s = new URL(e.url, location.href);
			if (!s.protocol.startsWith("http")) return;
			const n = s.origin === location.origin,
				{ params: a, route: r } = this.findMatchingRoute({
					event: t,
					request: e,
					sameOrigin: n,
					url: s,
				});
			let i = r && r.handler;
			const c = e.method;
			if ((!i && this.i.has(c) && (i = this.i.get(c)), !i)) return;
			let o;
			try {
				o = i.handle({ url: s, request: e, event: t, params: a });
			} catch (e) {
				o = Promise.reject(e);
			}
			const h = r && r.catchHandler;
			return (
				o instanceof Promise &&
					(this.o || h) &&
					(o = o.catch(async (n) => {
						if (h)
							try {
								return await h.handle({
									url: s,
									request: e,
									event: t,
									params: a,
								});
							} catch (e) {
								e instanceof Error && (n = e);
							}
						if (this.o) return this.o.handle({ url: s, request: e, event: t });
						throw n;
					})),
				o
			);
		}
		findMatchingRoute({ url: e, sameOrigin: t, request: s, event: n }) {
			const a = this.t.get(s.method) || [];
			for (const r of a) {
				let a;
				const i = r.match({ url: e, sameOrigin: t, request: s, event: n });
				if (i)
					return (
						(a = i),
						((Array.isArray(a) && 0 === a.length) ||
							(i.constructor === Object && 0 === Object.keys(i).length) ||
							"boolean" == typeof i) &&
							(a = void 0),
						{ route: r, params: a }
					);
			}
			return {};
		}
		setDefaultHandler(e, t = "GET") {
			this.i.set(t, s(e));
		}
		setCatchHandler(e) {
			this.o = s(e);
		}
		registerRoute(e) {
			this.t.has(e.method) || this.t.set(e.method, []),
				this.t.get(e.method).push(e);
		}
		unregisterRoute(e) {
			if (!this.t.has(e.method))
				throw new t("unregister-route-but-not-found-with-method", {
					method: e.method,
				});
			const s = this.t.get(e.method).indexOf(e);
			if (!(s > -1)) throw new t("unregister-route-route-not-registered");
			this.t.get(e.method).splice(s, 1);
		}
	}
	let i;
	const c = () => (
			i || ((i = new r()), i.addFetchListener(), i.addCacheListener()), i
		),
		o = {
			googleAnalytics: "googleAnalytics",
			precache: "precache-v2",
			prefix: "workbox",
			runtime: "runtime",
			suffix: "undefined" != typeof registration ? registration.scope : "",
		},
		h = (e) =>
			[o.prefix, e, o.suffix].filter((e) => e && e.length > 0).join("-"),
		l = (e) => e || h(o.precache);
	function u(e, t) {
		const s = t();
		return e.waitUntil(s), s;
	}
	try {
		self["workbox:precaching:7.0.0"] && _();
	} catch (e) {}
	function f(e) {
		if (!e) throw new t("add-to-cache-list-unexpected-type", { entry: e });
		if ("string" == typeof e) {
			const t = new URL(e, location.href);
			return { cacheKey: t.href, url: t.href };
		}
		const { revision: s, url: n } = e;
		if (!n) throw new t("add-to-cache-list-unexpected-type", { entry: e });
		if (!s) {
			const e = new URL(n, location.href);
			return { cacheKey: e.href, url: e.href };
		}
		const a = new URL(n, location.href),
			r = new URL(n, location.href);
		return (
			a.searchParams.set("__WB_REVISION__", s),
			{ cacheKey: a.href, url: r.href }
		);
	}
	class d {
		constructor() {
			(this.updatedURLs = []),
				(this.notUpdatedURLs = []),
				(this.handlerWillStart = async ({ request: e, state: t }) => {
					t && (t.originalRequest = e);
				}),
				(this.cachedResponseWillBeUsed = async ({
					event: e,
					state: t,
					cachedResponse: s,
				}) => {
					if (
						"install" === e.type &&
						t &&
						t.originalRequest &&
						t.originalRequest instanceof Request
					) {
						const e = t.originalRequest.url;
						s ? this.notUpdatedURLs.push(e) : this.updatedURLs.push(e);
					}
					return s;
				});
		}
	}
	class p {
		constructor({ precacheController: e }) {
			(this.cacheKeyWillBeUsed = async ({ request: e, params: t }) => {
				const s =
					(null == t ? void 0 : t.cacheKey) || this.h.getCacheKeyForURL(e.url);
				return s ? new Request(s, { headers: e.headers }) : e;
			}),
				(this.h = e);
		}
	}
	let w;
	function g(e, t) {
		const s = new URL(e);
		for (const e of t) s.searchParams.delete(e);
		return s.href;
	}
	class y {
		constructor() {
			this.promise = new Promise((e, t) => {
				(this.resolve = e), (this.reject = t);
			});
		}
	}
	const m = new Set();
	try {
		self["workbox:strategies:7.0.0"] && _();
	} catch (e) {}
	function R(e) {
		return "string" == typeof e ? new Request(e) : e;
	}
	class v {
		constructor(e, t) {
			(this.u = {}),
				Object.assign(this, t),
				(this.event = t.event),
				(this.l = e),
				(this.p = new y()),
				(this.R = []),
				(this.m = [...e.plugins]),
				(this.v = new Map());
			for (const e of this.m) this.v.set(e, {});
			this.event.waitUntil(this.p.promise);
		}
		async fetch(e) {
			const { event: s } = this;
			let n = R(e);
			if (
				"navigate" === n.mode &&
				s instanceof FetchEvent &&
				s.preloadResponse
			) {
				const e = await s.preloadResponse;
				if (e) return e;
			}
			const a = this.hasCallback("fetchDidFail") ? n.clone() : null;
			try {
				for (const e of this.iterateCallbacks("requestWillFetch"))
					n = await e({ request: n.clone(), event: s });
			} catch (e) {
				if (e instanceof Error)
					throw new t("plugin-error-request-will-fetch", {
						thrownErrorMessage: e.message,
					});
			}
			const r = n.clone();
			try {
				let e;
				e = await fetch(
					n,
					"navigate" === n.mode ? void 0 : this.l.fetchOptions,
				);
				for (const t of this.iterateCallbacks("fetchDidSucceed"))
					e = await t({ event: s, request: r, response: e });
				return e;
			} catch (e) {
				throw (
					(a &&
						(await this.runCallbacks("fetchDidFail", {
							error: e,
							event: s,
							originalRequest: a.clone(),
							request: r.clone(),
						})),
					e)
				);
			}
		}
		async fetchAndCachePut(e) {
			const t = await this.fetch(e),
				s = t.clone();
			return this.waitUntil(this.cachePut(e, s)), t;
		}
		async cacheMatch(e) {
			const t = R(e);
			let s;
			const { cacheName: n, matchOptions: a } = this.l,
				r = await this.getCacheKey(t, "read"),
				i = Object.assign(Object.assign({}, a), { cacheName: n });
			s = await caches.match(r, i);
			for (const e of this.iterateCallbacks("cachedResponseWillBeUsed"))
				s =
					(await e({
						cacheName: n,
						matchOptions: a,
						cachedResponse: s,
						request: r,
						event: this.event,
					})) || void 0;
			return s;
		}
		async cachePut(e, s) {
			const n = R(e);
			await (0, new Promise((e) => setTimeout(e, 0)));
			const a = await this.getCacheKey(n, "write");
			if (!s)
				throw new t("cache-put-with-no-response", {
					url:
						((r = a.url),
						new URL(String(r), location.href).href.replace(
							new RegExp(`^${location.origin}`),
							"",
						)),
				});
			var r;
			const i = await this.q(s);
			if (!i) return !1;
			const { cacheName: c, matchOptions: o } = this.l,
				h = await self.caches.open(c),
				l = this.hasCallback("cacheDidUpdate"),
				u = l
					? await (async function (e, t, s, n) {
							const a = g(t.url, s);
							if (t.url === a) return e.match(t, n);
							const r = Object.assign(Object.assign({}, n), {
									ignoreSearch: !0,
								}),
								i = await e.keys(t, r);
							for (const t of i) if (a === g(t.url, s)) return e.match(t, n);
						})(h, a.clone(), ["__WB_REVISION__"], o)
					: null;
			try {
				await h.put(a, l ? i.clone() : i);
			} catch (e) {
				if (e instanceof Error)
					throw (
						("QuotaExceededError" === e.name &&
							(await (async function () {
								for (const e of m) await e();
							})()),
						e)
					);
			}
			for (const e of this.iterateCallbacks("cacheDidUpdate"))
				await e({
					cacheName: c,
					oldResponse: u,
					newResponse: i.clone(),
					request: a,
					event: this.event,
				});
			return !0;
		}
		async getCacheKey(e, t) {
			const s = `${e.url} | ${t}`;
			if (!this.u[s]) {
				let n = e;
				for (const e of this.iterateCallbacks("cacheKeyWillBeUsed"))
					n = R(
						await e({
							mode: t,
							request: n,
							event: this.event,
							params: this.params,
						}),
					);
				this.u[s] = n;
			}
			return this.u[s];
		}
		hasCallback(e) {
			for (const t of this.l.plugins) if (e in t) return !0;
			return !1;
		}
		async runCallbacks(e, t) {
			for (const s of this.iterateCallbacks(e)) await s(t);
		}
		*iterateCallbacks(e) {
			for (const t of this.l.plugins)
				if ("function" == typeof t[e]) {
					const s = this.v.get(t),
						n = (n) => {
							const a = Object.assign(Object.assign({}, n), { state: s });
							return t[e](a);
						};
					yield n;
				}
		}
		waitUntil(e) {
			return this.R.push(e), e;
		}
		async doneWaiting() {
			let e;
			for (; (e = this.R.shift()); ) await e;
		}
		destroy() {
			this.p.resolve(null);
		}
		async q(e) {
			let t = e,
				s = !1;
			for (const e of this.iterateCallbacks("cacheWillUpdate"))
				if (
					((t =
						(await e({
							request: this.request,
							response: t,
							event: this.event,
						})) || void 0),
					(s = !0),
					!t)
				)
					break;
			return s || (t && 200 !== t.status && (t = void 0)), t;
		}
	}
	class b {
		constructor(e = {}) {
			(this.cacheName = ((e) => e || h(o.runtime))(e.cacheName)),
				(this.plugins = e.plugins || []),
				(this.fetchOptions = e.fetchOptions),
				(this.matchOptions = e.matchOptions);
		}
		handle(e) {
			const [t] = this.handleAll(e);
			return t;
		}
		handleAll(e) {
			e instanceof FetchEvent && (e = { event: e, request: e.request });
			const t = e.event,
				s = "string" == typeof e.request ? new Request(e.request) : e.request,
				n = "params" in e ? e.params : void 0,
				a = new v(this, { event: t, request: s, params: n }),
				r = this.U(a, s, t);
			return [r, this.L(r, a, s, t)];
		}
		async U(e, s, n) {
			let a;
			await e.runCallbacks("handlerWillStart", { event: n, request: s });
			try {
				if (((a = await this._(s, e)), !a || "error" === a.type))
					throw new t("no-response", { url: s.url });
			} catch (t) {
				if (t instanceof Error)
					for (const r of e.iterateCallbacks("handlerDidError"))
						if (((a = await r({ error: t, event: n, request: s })), a)) break;
				if (!a) throw t;
			}
			for (const t of e.iterateCallbacks("handlerWillRespond"))
				a = await t({ event: n, request: s, response: a });
			return a;
		}
		async L(e, t, s, n) {
			let a, r;
			try {
				a = await e;
			} catch (r) {}
			try {
				await t.runCallbacks("handlerDidRespond", {
					event: n,
					request: s,
					response: a,
				}),
					await t.doneWaiting();
			} catch (e) {
				e instanceof Error && (r = e);
			}
			if (
				(await t.runCallbacks("handlerDidComplete", {
					event: n,
					request: s,
					response: a,
					error: r,
				}),
				t.destroy(),
				r)
			)
				throw r;
		}
	}
	class U extends b {
		constructor(e = {}) {
			(e.cacheName = l(e.cacheName)),
				super(e),
				(this.C = !1 !== e.fallbackToNetwork),
				this.plugins.push(U.copyRedirectedCacheableResponsesPlugin);
		}
		async _(e, t) {
			return (
				(await t.cacheMatch(e)) ||
				(t.event && "install" === t.event.type
					? await this.O(e, t)
					: await this.N(e, t))
			);
		}
		async N(e, s) {
			let n;
			const a = s.params || {};
			if (!this.C)
				throw new t("missing-precache-entry", {
					cacheName: this.cacheName,
					url: e.url,
				});
			{
				const t = a.integrity,
					r = e.integrity,
					i = !r || r === t;
				(n = await s.fetch(
					new Request(e, { integrity: "no-cors" !== e.mode ? r || t : void 0 }),
				)),
					t &&
						i &&
						"no-cors" !== e.mode &&
						(this.k(), await s.cachePut(e, n.clone()));
			}
			return n;
		}
		async O(e, s) {
			this.k();
			const n = await s.fetch(e);
			if (!(await s.cachePut(e, n.clone())))
				throw new t("bad-precaching-response", {
					url: e.url,
					status: n.status,
				});
			return n;
		}
		k() {
			let e = null,
				t = 0;
			for (const [s, n] of this.plugins.entries())
				n !== U.copyRedirectedCacheableResponsesPlugin &&
					(n === U.defaultPrecacheCacheabilityPlugin && (e = s),
					n.cacheWillUpdate && t++);
			0 === t
				? this.plugins.push(U.defaultPrecacheCacheabilityPlugin)
				: t > 1 && null !== e && this.plugins.splice(e, 1);
		}
	}
	(U.defaultPrecacheCacheabilityPlugin = {
		cacheWillUpdate: async ({ response: e }) =>
			!e || e.status >= 400 ? null : e,
	}),
		(U.copyRedirectedCacheableResponsesPlugin = {
			cacheWillUpdate: async ({ response: e }) =>
				e.redirected
					? await (async function (e, s) {
							let n = null;
							if (
								(e.url && (n = new URL(e.url).origin),
								n !== self.location.origin)
							)
								throw new t("cross-origin-copy-response", { origin: n });
							const a = e.clone(),
								r = {
									headers: new Headers(a.headers),
									status: a.status,
									statusText: a.statusText,
								},
								i = s ? s(r) : r,
								c = (function () {
									if (void 0 === w) {
										const e = new Response("");
										if ("body" in e)
											try {
												new Response(e.body), (w = !0);
											} catch (e) {
												w = !1;
											}
										w = !1;
									}
									return w;
								})()
									? a.body
									: await a.blob();
							return new Response(c, i);
						})(e)
					: e,
		});
	class q {
		constructor({
			cacheName: e,
			plugins: t = [],
			fallbackToNetwork: s = !0,
		} = {}) {
			(this.K = new Map()),
				(this.P = new Map()),
				(this.T = new Map()),
				(this.l = new U({
					cacheName: l(e),
					plugins: [...t, new p({ precacheController: this })],
					fallbackToNetwork: s,
				})),
				(this.install = this.install.bind(this)),
				(this.activate = this.activate.bind(this));
		}
		get strategy() {
			return this.l;
		}
		precache(e) {
			this.addToCacheList(e),
				this.W ||
					(self.addEventListener("install", this.install),
					self.addEventListener("activate", this.activate),
					(this.W = !0));
		}
		addToCacheList(e) {
			const s = [];
			for (const n of e) {
				"string" == typeof n
					? s.push(n)
					: n && void 0 === n.revision && s.push(n.url);
				const { cacheKey: e, url: a } = f(n),
					r = "string" != typeof n && n.revision ? "reload" : "default";
				if (this.K.has(a) && this.K.get(a) !== e)
					throw new t("add-to-cache-list-conflicting-entries", {
						firstEntry: this.K.get(a),
						secondEntry: e,
					});
				if ("string" != typeof n && n.integrity) {
					if (this.T.has(e) && this.T.get(e) !== n.integrity)
						throw new t("add-to-cache-list-conflicting-integrities", {
							url: a,
						});
					this.T.set(e, n.integrity);
				}
				if ((this.K.set(a, e), this.P.set(a, r), s.length > 0)) {
					const e = `Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
					console.warn(e);
				}
			}
		}
		install(e) {
			return u(e, async () => {
				const t = new d();
				this.strategy.plugins.push(t);
				for (const [t, s] of this.K) {
					const n = this.T.get(s),
						a = this.P.get(t),
						r = new Request(t, {
							integrity: n,
							cache: a,
							credentials: "same-origin",
						});
					await Promise.all(
						this.strategy.handleAll({
							params: { cacheKey: s },
							request: r,
							event: e,
						}),
					);
				}
				const { updatedURLs: s, notUpdatedURLs: n } = t;
				return { updatedURLs: s, notUpdatedURLs: n };
			});
		}
		activate(e) {
			return u(e, async () => {
				const e = await self.caches.open(this.strategy.cacheName),
					t = await e.keys(),
					s = new Set(this.K.values()),
					n = [];
				for (const a of t) s.has(a.url) || (await e.delete(a), n.push(a.url));
				return { deletedURLs: n };
			});
		}
		getURLsToCacheKeys() {
			return this.K;
		}
		getCachedURLs() {
			return [...this.K.keys()];
		}
		getCacheKeyForURL(e) {
			const t = new URL(e, location.href);
			return this.K.get(t.href);
		}
		getIntegrityForCacheKey(e) {
			return this.T.get(e);
		}
		async matchPrecache(e) {
			const t = e instanceof Request ? e.url : e,
				s = this.getCacheKeyForURL(t);
			if (s) return (await self.caches.open(this.strategy.cacheName)).match(s);
		}
		createHandlerBoundToURL(e) {
			const s = this.getCacheKeyForURL(e);
			if (!s) throw new t("non-precached-url", { url: e });
			return (t) => (
				(t.request = new Request(e)),
				(t.params = Object.assign({ cacheKey: s }, t.params)),
				this.strategy.handle(t)
			);
		}
	}
	let C;
	const L = () => (C || (C = new q()), C);
	class k extends n {
		constructor(e, t) {
			super(({ request: s }) => {
				const n = e.getURLsToCacheKeys();
				for (const a of (function* (
					e,
					{
						ignoreURLParametersMatching: t = [/^utm_/, /^fbclid$/],
						directoryIndex: s = "index.html",
						cleanURLs: n = !0,
						urlManipulation: a,
					} = {},
				) {
					const r = new URL(e, location.href);
					(r.hash = ""), yield r.href;
					const i = (function (e, t = []) {
						for (const s of [...e.searchParams.keys()])
							t.some((e) => e.test(s)) && e.searchParams.delete(s);
						return e;
					})(r, t);
					if ((yield i.href, s && i.pathname.endsWith("/"))) {
						const e = new URL(i.href);
						(e.pathname += s), yield e.href;
					}
					if (n) {
						const e = new URL(i.href);
						(e.pathname += ".html"), yield e.href;
					}
					if (a) {
						const e = a({ url: r });
						for (const t of e) yield t.href;
					}
				})(s.url, t)) {
					const t = n.get(a);
					if (t)
						return { cacheKey: t, integrity: e.getIntegrityForCacheKey(t) };
				}
			}, e.strategy);
		}
	}
	(e.cleanupOutdatedCaches = function () {
		self.addEventListener("activate", (e) => {
			const t = l();
			e.waitUntil(
				(async (e, t = "-precache-") => {
					const s = (await self.caches.keys()).filter(
						(s) =>
							s.includes(t) && s.includes(self.registration.scope) && s !== e,
					);
					return await Promise.all(s.map((e) => self.caches.delete(e))), s;
				})(t).then((e) => {}),
			);
		});
	}),
		(e.clientsClaim = function () {
			self.addEventListener("activate", () => self.clients.claim());
		}),
		(e.precacheAndRoute = function (e, s) {
			!(function (e) {
				L().precache(e);
			})(e),
				(function (e) {
					const s = L();
					!(function (e, s, r) {
						let i;
						if ("string" == typeof e) {
							const t = new URL(e, location.href);
							i = new n(({ url: e }) => e.href === t.href, s, r);
						} else if (e instanceof RegExp) i = new a(e, s, r);
						else if ("function" == typeof e) i = new n(e, s, r);
						else {
							if (!(e instanceof n))
								throw new t("unsupported-route-type", {
									moduleName: "workbox-routing",
									funcName: "registerRoute",
									paramName: "capture",
								});
							i = e;
						}
						c().registerRoute(i);
					})(new k(s, e));
				})(s);
		});
});
