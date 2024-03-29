if (!self.define) {
	let e,
		i = {};
	const n = (n, c) => (
		(n = new URL(n + ".js", c).href),
		i[n] ||
			new Promise((i) => {
				if ("document" in self) {
					const e = document.createElement("script");
					(e.src = n), (e.onload = i), document.head.appendChild(e);
				} else (e = n), importScripts(n), i();
			}).then(() => {
				let e = i[n];
				if (!e) throw new Error(`Module ${n} didn’t register its module`);
				return e;
			})
	);
	self.define = (c, a) => {
		const f =
			e ||
			("document" in self ? document.currentScript.src : "") ||
			location.href;
		if (i[f]) return;
		let o = {};
		const r = (e) => n(e, f),
			s = { module: { uri: f }, exports: o, require: r };
		i[f] = Promise.all(c.map((e) => s[e] || r(e))).then((e) => (a(...e), o));
	};
}
define(["./workbox-1ab968a5"], function (e) {
	"use strict";
	self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{
					url: "client/_astro/home.BgHya0BO.css",
					revision: "d51427619400531aa288a6a6ef5c7362",
				},
				{
					url: "client/favicons/favicon-114x114.png",
					revision: "3449ae1bfcafe84bd145387c1b335625",
				},
				{
					url: "client/favicons/favicon-120x120.png",
					revision: "0fb70b6dd0783051503901253ff4f2b0",
				},
				{
					url: "client/favicons/favicon-128x128.png",
					revision: "198b7e1a5e0c9408fec2fb258e45f5ea",
				},
				{
					url: "client/favicons/favicon-144x144.png",
					revision: "3490ebee72b12b3facac82f9b6d6929c",
				},
				{
					url: "client/favicons/favicon-150x150.png",
					revision: "4d53646da0b389c96a54b5087430867c",
				},
				{
					url: "client/favicons/favicon-152x152.png",
					revision: "98194ba9f6a7726c25caeb33ef1b2e7d",
				},
				{
					url: "client/favicons/favicon-16x16.png",
					revision: "e30ad43cd87d37c518a798d693133814",
				},
				{
					url: "client/favicons/favicon-180x180.png",
					revision: "8792952fe8547467ed2ee66dc8f0cec3",
				},
				{
					url: "client/favicons/favicon-192x192.png",
					revision: "165f12d717b0f71bf6f460ef795fb6ce",
				},
				{
					url: "client/favicons/favicon-310x310.png",
					revision: "3c8b0f61723c4b0abba2b679d46e2c76",
				},
				{
					url: "client/favicons/favicon-32x32.png",
					revision: "b3528c9a3c7ae9e171f3db7be5b5ebf6",
				},
				{
					url: "client/favicons/favicon-384x384.png",
					revision: "a5261b7302b389a13fdd92822717736f",
				},
				{
					url: "client/favicons/favicon-512x512.png",
					revision: "2c88ed05bed3ae7b5c8e5774a72eb0c3",
				},
				{
					url: "client/favicons/favicon-57x57.png",
					revision: "acd83078add362626c975d54c95dbb09",
				},
				{
					url: "client/favicons/favicon-60x60.png",
					revision: "a71b84f634ab0ee7ddc97ad1beeaf67c",
				},
				{
					url: "client/favicons/favicon-70x70.png",
					revision: "3477e0395607bf04029c3f8b0ea283c8",
				},
				{
					url: "client/favicons/favicon-72x72.png",
					revision: "ffa242d778cd9e0aae113c97c23256b2",
				},
				{
					url: "client/favicons/favicon-76x76.png",
					revision: "c8af3ed31e779fd899874a7aa73ee301",
				},
				{
					url: "client/favicons/favicon-96x96.png",
					revision: "7400384aecca83a6bb310489064d7922",
				},
				{
					url: "client/favicons/favicon.ico",
					revision: "87fa938c1eff256c180c4a861d70ddd2",
				},
				{
					url: "client/registerSW.js",
					revision: "6a0a0c8ba795b804f5fac2886a79f79c",
				},
				{ url: "client/sw.js", revision: "31e7eee6f3534e71ee079434ad2211cd" },
				{ url: "client/workbox-1ab968a5.js", revision: null },
				{
					url: "server/registerSW.js",
					revision: "1872c500de691dce40960bb85481de07",
				},
				{
					url: "favicons/favicon-192x192.png",
					revision: "14f615d469e15fd097dbfb96cff00c68",
				},
				{
					url: "favicons/favicon-512x512.png",
					revision: "43bbd0bc6f2df0d48fc711b941f1124e",
				},
				{
					url: "manifest.webmanifest",
					revision: "bc69eaf46302e60bf3bd5cc3ab768769",
				},
			],
			{},
		),
		e.cleanupOutdatedCaches();
});
