import "cookie";
import { bold, red, yellow, dim, blue } from "kleur/colors";
import "./chunks/astro_khQyWLKJ.mjs";
import "clsx";
import { compile } from "path-to-regexp";

const dateTimeFormat = new Intl.DateTimeFormat([], {
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
});
const levels = {
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	silent: 90,
};
function log(opts, level, label, message, newLine = true) {
	const logLevel = opts.level;
	const dest = opts.dest;
	const event = {
		label,
		level,
		message,
		newLine,
	};
	if (!isLogLevelEnabled(logLevel, level)) {
		return;
	}
	dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
	return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
	return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
	return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
	return log(opts, "error", label, message, newLine);
}
function debug(...args) {
	if ("_astroGlobalDebug" in globalThis) {
		globalThis._astroGlobalDebug(...args);
	}
}
function getEventPrefix({ level, label }) {
	const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
	const prefix = [];
	if (level === "error" || level === "warn") {
		prefix.push(bold(timestamp));
		prefix.push(`[${level.toUpperCase()}]`);
	} else {
		prefix.push(timestamp);
	}
	if (label) {
		prefix.push(`[${label}]`);
	}
	if (level === "error") {
		return red(prefix.join(" "));
	}
	if (level === "warn") {
		return yellow(prefix.join(" "));
	}
	if (prefix.length === 1) {
		return dim(prefix[0]);
	}
	return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
	let proc = process;
	if ("argv" in proc && Array.isArray(proc.argv)) {
		if (proc.argv.includes("--verbose"));
		else if (proc.argv.includes("--silent"));
		else;
	}
}
class Logger {
	options;
	constructor(options) {
		this.options = options;
	}
	info(label, message, newLine = true) {
		info(this.options, label, message, newLine);
	}
	warn(label, message, newLine = true) {
		warn(this.options, label, message, newLine);
	}
	error(label, message, newLine = true) {
		error(this.options, label, message, newLine);
	}
	debug(label, ...messages) {
		debug(label, ...messages);
	}
	level() {
		return this.options.level;
	}
	forkIntegrationLogger(label) {
		return new AstroIntegrationLogger(this.options, label);
	}
}
class AstroIntegrationLogger {
	options;
	label;
	constructor(logging, label) {
		this.options = logging;
		this.label = label;
	}
	/**
	 * Creates a new logger instance with a new label, but the same log options.
	 */
	fork(label) {
		return new AstroIntegrationLogger(this.options, label);
	}
	info(message) {
		info(this.options, this.label, message);
	}
	warn(message) {
		warn(this.options, this.label, message);
	}
	error(message) {
		error(this.options, this.label, message);
	}
	debug(message) {
		debug(this.label, message);
	}
}

function getRouteGenerator(segments, addTrailingSlash) {
	const template = segments
		.map((segment) => {
			return (
				"/" +
				segment
					.map((part) => {
						if (part.spread) {
							return `:${part.content.slice(3)}(.*)?`;
						} else if (part.dynamic) {
							return `:${part.content}`;
						} else {
							return part.content
								.normalize()
								.replace(/\?/g, "%3F")
								.replace(/#/g, "%23")
								.replace(/%5B/g, "[")
								.replace(/%5D/g, "]")
								.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
						}
					})
					.join("")
			);
		})
		.join("");
	let trailing = "";
	if (addTrailingSlash === "always" && segments.length) {
		trailing = "/";
	}
	const toPath = compile(template + trailing);
	return (params) => {
		const path = toPath(params);
		return path || "/";
	};
}

function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		generate: getRouteGenerator(
			rawRouteData.segments,
			rawRouteData._meta.trailingSlash,
		),
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute
			? deserializeRouteData(rawRouteData.redirectRoute)
			: void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
	};
}

function deserializeManifest(serializedManifest) {
	const routes = [];
	for (const serializedRoute of serializedManifest.routes) {
		routes.push({
			...serializedRoute,
			routeData: deserializeRouteData(serializedRoute.routeData),
		});
		const route = serializedRoute;
		route.routeData = deserializeRouteData(serializedRoute.routeData);
	}
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	return {
		// in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
		middleware(_, next) {
			return next();
		},
		...serializedManifest,
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
	};
}

const manifest = deserializeManifest({
	adapterName: "@astrojs/vercel/serverless",
	routes: [
		{
			file: "",
			links: [],
			scripts: [],
			styles: [],
			routeData: {
				type: "endpoint",
				isIndex: false,
				route: "/_image",
				pattern: "^\\/_image$",
				segments: [[{ content: "_image", dynamic: false, spread: false }]],
				params: [],
				component: "node_modules/astro/dist/assets/endpoint/generic.js",
				pathname: "/_image",
				prerender: false,
				fallbackRoutes: [],
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [{ type: "inline", value: "\n" }],
			styles: [{ type: "external", src: "/_astro/home.BgHya0BO.css" }],
			routeData: {
				route: "/home",
				isIndex: false,
				type: "page",
				pattern: "^\\/home\\/?$",
				segments: [[{ content: "home", dynamic: false, spread: false }]],
				params: [],
				component: "src/pages/home.astro",
				pathname: "/home",
				prerender: false,
				fallbackRoutes: [],
				_meta: { trailingSlash: "ignore" },
			},
		},
		{
			file: "",
			links: [],
			scripts: [{ type: "inline", value: "\n" }],
			styles: [
				{
					type: "inline",
					content:
						'@import"https://fonts.googleapis.com/css2?family=Poppins:wght@400;900&display=swap";body{margin:0;width:100vw;height:100vh;background:#ecf0f3;display:flex;align-items:center;text-align:center;justify-content:center;place-items:center;overflow:hidden;font-family:poppins}.container[data-astro-cid-j7pv25f6]{position:relative;width:350px;height:400px;border-radius:20px;padding:40px;box-sizing:border-box;background:#ecf0f3;box-shadow:14px 14px 20px #cbced1,-14px -14px 20px #fff}.brand-logo[data-astro-cid-j7pv25f6]{height:100px;width:100px;background:url(https://img.icons8.com/color/100/000000/twitter--v2.png);margin:auto;border-radius:50%;box-sizing:border-box;box-shadow:7px 7px 10px #cbced1,-7px -7px 10px #fff}.brand-title[data-astro-cid-j7pv25f6]{margin-top:10px;font-weight:900;font-size:1.8rem;color:#1da1f2;letter-spacing:1px}.inputs[data-astro-cid-j7pv25f6]{text-align:left;margin-top:30px}label[data-astro-cid-j7pv25f6],input[data-astro-cid-j7pv25f6],button[data-astro-cid-j7pv25f6]{display:block;width:100%;padding:0;border:none;outline:none;box-sizing:border-box}label[data-astro-cid-j7pv25f6]{margin-bottom:4px}label[data-astro-cid-j7pv25f6]:nth-of-type(2){margin-top:12px}input[data-astro-cid-j7pv25f6]::-moz-placeholder{color:gray}input[data-astro-cid-j7pv25f6]::placeholder{color:gray}input[data-astro-cid-j7pv25f6]{background:#ecf0f3;padding:10px 10px 10px 20px;height:50px;font-size:14px;border-radius:50px;box-shadow:inset 6px 6px 6px #cbced1,inset -6px -6px 6px #fff}button[data-astro-cid-j7pv25f6]{color:#fff;margin-top:30px;background:#1da1f2;height:40px;border-radius:20px;cursor:pointer;font-weight:900;box-shadow:6px 6px 6px #cbced1,-6px -6px 6px #fff;transition:.5s}button[data-astro-cid-j7pv25f6]:hover{box-shadow:none}a[data-astro-cid-j7pv25f6]{position:absolute;font-size:8px;bottom:4px;right:4px;text-decoration:none;color:#000;background:#ff0;border-radius:10px;padding:2px}h1[data-astro-cid-j7pv25f6]{position:absolute;top:0;left:0}\n',
				},
				{ type: "external", src: "/_astro/home.BgHya0BO.css" },
			],
			routeData: {
				route: "/",
				isIndex: true,
				type: "page",
				pattern: "^\\/$",
				segments: [],
				params: [],
				component: "src/pages/index.astro",
				pathname: "/",
				prerender: false,
				fallbackRoutes: [],
				_meta: { trailingSlash: "ignore" },
			},
		},
	],
	site: "https://example.com",
	base: "/",
	trailingSlash: "ignore",
	compressHTML: true,
	componentMetadata: [
		[
			"C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/src/pages/home.astro",
			{ propagation: "none", containsHead: true },
		],
		[
			"C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/src/pages/index.astro",
			{ propagation: "none", containsHead: true },
		],
	],
	renderers: [],
	clientDirectives: [
		[
			"idle",
			'(()=>{var i=t=>{let e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event("astro:idle"));})();',
		],
		[
			"load",
			'(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();',
		],
		[
			"media",
			'(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();',
		],
		[
			"only",
			'(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();',
		],
		[
			"visible",
			'(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event("astro:visible"));})();',
		],
	],
	entryModules: {
		"\u0000@astrojs-ssr-virtual-entry": "entry.mjs",
		"\u0000@astro-renderers": "renderers.mjs",
		"\u0000noop-middleware": "_noop-middleware.mjs",
		"/node_modules/astro/dist/assets/endpoint/generic.js":
			"chunks/pages/generic_DSHhnWzA.mjs",
		"/src/pages/index.astro": "chunks/pages/index_FBDEn7de.mjs",
		"\u0000@astrojs-manifest": "manifest_Dkc8I0Sx.mjs",
		"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":
			"chunks/generic_waO3A3a7.mjs",
		"\u0000@astro-page:src/pages/home@_@astro": "chunks/home_DaFLBFMj.mjs",
		"\u0000@astro-page:src/pages/index@_@astro": "chunks/index_DkYogMU7.mjs",
		"/astro/hoisted.js?q=0": "_astro/hoisted.l0sNRNKZ.js",
		"astro:scripts/before-hydration.js": "",
	},
	inlinedScripts: [],
	assets: [
		"/_astro/home.BgHya0BO.css",
		"/browserconfig.xml",
		"/humans.txt",
		"/manifest.webmanifest",
		"/registerSW.js",
		"/robots.txt",
		"/sw.js",
		"/workbox-1ab968a5.js",
		"/favicons/favicon-114x114.png",
		"/favicons/favicon-120x120.png",
		"/favicons/favicon-128x128.png",
		"/favicons/favicon-144x144.png",
		"/favicons/favicon-150x150.png",
		"/favicons/favicon-152x152.png",
		"/favicons/favicon-16x16.png",
		"/favicons/favicon-180x180.png",
		"/favicons/favicon-192x192.png",
		"/favicons/favicon-310x310.png",
		"/favicons/favicon-32x32.png",
		"/favicons/favicon-384x384.png",
		"/favicons/favicon-512x512.png",
		"/favicons/favicon-57x57.png",
		"/favicons/favicon-60x60.png",
		"/favicons/favicon-70x70.png",
		"/favicons/favicon-72x72.png",
		"/favicons/favicon-76x76.png",
		"/favicons/favicon-96x96.png",
		"/favicons/favicon.ico",
	],
	buildFormat: "directory",
});

export {
	AstroIntegrationLogger as A,
	Logger as L,
	getEventPrefix as g,
	levels as l,
	manifest,
};
