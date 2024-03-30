import { defineConfig } from "astro/config";

// Astro integration imports
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import { VitePWA } from "vite-plugin-pwa";

// Helper imports
import { manifest, seoConfig } from "./utils/seoConfig";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
	site: seoConfig.baseURL,
	output: "server",
	integrations: [
		tailwind({
			configFile: "./tailwind.config.js",
			applyBaseStyles: false,
		}),
		sitemap(),
		compress(),
	],
	vite: {
		plugins: [
			VitePWA({
				registerType: "autoUpdate",
				manifest,
				workbox: {
					globDirectory: "dist",
					globPatterns: [
						"**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}",
					],
					// Don't fallback on document based (e.g. `/some-page`) requests
					// This removes an errant console.log message from showing up.
					navigateFallback: null,
				},
			}),
		],
	},
	adapter: vercel({
		edgeMiddleware: true,
		webAnalytics: true,
	}),
});
