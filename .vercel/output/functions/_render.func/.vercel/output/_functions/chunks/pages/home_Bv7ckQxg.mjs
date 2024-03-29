import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, s as spreadAttributes, u as unescapeHTML, i as renderComponent, j as renderSlot, k as renderHead, m as maybeRenderHead } from '../astro_khQyWLKJ.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro$b = createAstro("https://example.com");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate``;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/src/components/global/Header/Header.astro", void 0);

const $$Astro$a = createAstro("https://example.com");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate``;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/src/components/global/Footer/Footer.astro", void 0);

const $$Astro$9 = createAstro("https://example.com");
const $$OpenGraphArticleTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro", void 0);

const $$Astro$8 = createAstro("https://example.com");
const $$OpenGraphBasicTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}><meta property="og:type"${addAttribute(openGraph.basic.type, "content")}><meta property="og:image"${addAttribute(openGraph.basic.image, "content")}><meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro", void 0);

const $$Astro$7 = createAstro("https://example.com");
const $$OpenGraphImageTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}${height ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}${alt ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/node_modules/astro-seo/src/components/OpenGraphImageTags.astro", void 0);

const $$Astro$6 = createAstro("https://example.com");
const $$OpenGraphOptionalTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro", void 0);

const $$Astro$5 = createAstro("https://example.com");
const $$ExtendedTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}${props.extend.meta?.map(({ content, httpEquiv, name, property }) => renderTemplate`<meta${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(name, "name")}${addAttribute(property, "property")}>`)}`;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/node_modules/astro-seo/src/components/ExtendedTags.astro", void 0);

const $$Astro$4 = createAstro("https://example.com");
const $$TwitterTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/node_modules/astro-seo/src/components/TwitterTags.astro", void 0);

const $$Astro$3 = createAstro("https://example.com");
const $$LanguageAlternatesTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro", void 0);

const $$Astro$2 = createAstro("https://example.com");
const $$SEO = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || (props.openGraph.basic.title ?? void 0) == void 0 || (props.openGraph.basic.type ?? void 0) == void 0 || (props.openGraph.basic.image ?? void 0) == void 0) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is stongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}<link rel="canonical"${addAttribute(Astro2.props.canonical || Astro2.url.href, "href")}>${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/node_modules/astro-seo/src/SEO.astro", void 0);

const seoConfig = {
  baseURL: "https://example.com",
  // Change this to your production URL.
  description: "Astro PWA Starter is an opionated Astro starter for building robust static websites.",
  // Change this to be your website's description.
  type: "website",
  image: {
    url: "https://picsum.photos/1200/630",
    // Change this to your website's thumbnail.
    alt: "OpenGraph thumbnail description.",
    // Change this to your website's thumbnail description.
    width: 1200,
    height: 630
  },
  siteName: "MilkyMo",
  // Change this to your website's name,
  twitter: {
    card: "summary_large_image"
  }
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://example.com");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    ogTitle,
    description,
    image,
    disableIndexing = false
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><!-- SEO. -->', '<!-- Global meta tags. --><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><!-- Favicons. --><link rel="apple-touch-icon" sizes="57x57" href="/favicons/favicon-57x57.png"><link rel="apple-touch-icon" sizes="60x60" href="/favicons/favicon-60x60.png"><link rel="apple-touch-icon" sizes="72x72" href="/favicons/favicon-72x72.png"><link rel="apple-touch-icon" sizes="76x76" href="/favicons/favicon-76x76.png"><link rel="apple-touch-icon" sizes="114x114" href="/favicons/favicon-114x114.png"><link rel="apple-touch-icon" sizes="120x120" href="/favicons/favicon-120x120.png"><link rel="apple-touch-icon" sizes="144x144" href="/favicons/favicon-144x144.png"><link rel="apple-touch-icon" sizes="152x152" href="/favicons/favicon-152x152.png"><link rel="apple-touch-icon" sizes="180x180" href="/favicons/favicon-180x180.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png"><link rel="icon" type="image/png" sizes="192x192" href="/favicons/favicon-192x192.png"><link rel="shortcut icon" type="image/x-icon" href="/favicons/favicon.ico"><link rel="icon" type="image/x-icon" href="/favicons/favicon.ico"><meta name="msapplication-TileColor" content="#30E130"><meta name="msapplication-TileImage" content="/favicons/favicon-144x144.png"><meta name="msapplication-config" content="/browserconfig.xml"><link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg"><meta name="theme-color" content="#30E130"><!-- Service worker registration. --><script src="/registerSW.js"><\/script><link rel="manifest" href="/manifest.webmanifest">', '</head> <body class="min-h-screen flex flex-col w-full overflow-x-hidden "> <main class="flex flex-1 flex-col h-[100%] w-full justify-center items-center place-items-center"> ', " </main>  </body> </html>"])), renderComponent($$result, "SEO", $$SEO, { "title": title, "description": seoConfig.description , "noindex": disableIndexing, "nofollow": disableIndexing, "openGraph": {
    basic: {
      title: ogTitle || title,
      type: "website",
      image: seoConfig.image.url 
    },
    image: {
      width: seoConfig.image.width,
      height: seoConfig.image.height,
      alt: seoConfig.image.alt 
    },
    optional: {
      siteName: seoConfig.siteName,
      description: seoConfig.description 
    }
  }, "twitter": {
    card: seoConfig.twitter.card
  } }), renderHead(), renderSlot($$result, $$slots["default"]));
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/src/components/global/Layout/Layout.astro", void 0);

const $$Astro = createAstro("https://example.com");
const $$Home = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Home;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home page" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>this is home page</h1> <a href="/">LOGOUT</a> ` })}`;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/src/pages/home.astro", void 0);

const $$file = "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/src/pages/home.astro";
const $$url = "/home";

const home = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Home,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, home as h };
