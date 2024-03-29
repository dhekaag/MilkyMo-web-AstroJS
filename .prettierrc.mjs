// module.exports = {
// 	plugins: [
// 		require("prettier-plugin-tailwindcss"),
// 		require("prettier-plugin-astro")
// 	],
// 	overrides: [
// 		{
// 			files: "*.astro",
// 			options: { parser: "astro" }
// 		}
// 	],
// 	trailingComma: "none",
// 	semi: false,
// 	singleQuote: false,
// 	printWidth: 80
// }

// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
	plugins: ["prettier-plugin-astro"],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
			trailingComma: "none",
			semi: false,
			singleQuote: false,
			printWidth: 80,
		},
	],
};
