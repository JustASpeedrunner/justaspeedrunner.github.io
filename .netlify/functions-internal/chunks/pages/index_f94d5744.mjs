/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderSlot, m as maybeRenderHead, s as spreadAttributes, u as unescapeHTML, f as renderComponent, F as Fragment } from '../astro/server_a9e06d77.mjs';
import 'clsx';
import { optimize } from 'svgo';
import { ssr, ssrHydrationKey, escape, createComponent as createComponent$1 } from 'solid-js/web';
import { createSignal, Show } from 'solid-js';

const $$Astro$e = createAstro("https://gianmarco.xyz/");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/x-icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="robots" content="/favicon/sitemap-index.xml"><!-- Basic OG tags for sharing your website's content on platforms like Facebook and LinkedIn --><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:url" content="https://gianmarco.xyz"><meta property="og:image" content="https://gianmarco.xyz/me.webp"><!-- Basic Twitter Card tags --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image" content="https://gianmarco.xyz/me.webp"><link rel="preconnect" href="https://cdn.fontshare.com">${renderHead()}</head><body class="bg-darkslate-700 md:h-screen flex justify-center items-center"><div class="loaderRef bg-darkslate-700 text-neutral-50 text-3xl font-black uppercase flex justify-center items-center w-screen h-screen z-50 fixed top-0 bottom-0 right-0 left-0"></div>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "/home/jas/Documents/grid-astro-portfolio/src/layouts/Layout.astro", void 0);

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({

});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$d = createAstro("https://gianmarco.xyz/");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "/home/jas/Documents/grid-astro-portfolio/node_modules/astro-icon/lib/Icon.astro", void 0);

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$c = createAstro("https://gianmarco.xyz/");
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}</svg>`;
}, "/home/jas/Documents/grid-astro-portfolio/node_modules/astro-icon/lib/Spritesheet.astro", void 0);

const $$Astro$b = createAstro("https://gianmarco.xyz/");
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "/home/jas/Documents/grid-astro-portfolio/node_modules/astro-icon/lib/SpriteProvider.astro", void 0);

const $$Astro$a = createAstro("https://gianmarco.xyz/");
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>${title ? renderTemplate`<title>${title}</title>` : ""}<use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use></svg>`;
}, "/home/jas/Documents/grid-astro-portfolio/node_modules/astro-icon/lib/Sprite.astro", void 0);

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$9 = createAstro("https://gianmarco.xyz/");
const $$Content = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Content;
  const { title, body } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${title && renderTemplate`${maybeRenderHead()}<h2 class="text-xl font-bold m-0">${title}</h2>`}${body && renderTemplate`<p class="m-0 font-light text-base">${body}</p>`}${renderSlot($$result2, $$slots["default"])}` })}`;
}, "/home/jas/Documents/grid-astro-portfolio/src/components/Card/Content.astro", void 0);

const $$Astro$8 = createAstro("https://gianmarco.xyz/");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Index$1;
  const { title, body, colSpan, rowSpan, href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`card group overflow-hidden opacity-0 bg-darkslate-500 shadow-lg rounded-lg p-6 border border-darkslate-100 hover:border-primary-500 align-start flex-none h-full justify-start relative transform perspective-1200 w-full transition duration-75 ease-in-out col-span-1 ${colSpan || "md:col-span-2"} ${rowSpan || ""}`, "class")}>${href ? renderTemplate`<a${addAttribute(href, "href")} class="h-full w-full ddd">${renderComponent($$result, "Icon", $$Icon, { "name": "ri:arrow-right-up-line", "class": "h-6 float-right group-hover:text-primary-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ease-in-out duration-100" })}${renderComponent($$result, "Content", $$Content, { "title": title, "body": body }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}</a>` : renderTemplate`${renderComponent($$result, "Content", $$Content, { "title": title, "body": body }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}</div>`;
}, "/home/jas/Documents/grid-astro-portfolio/src/components/Card/index.astro", void 0);

const $$Astro$7 = createAstro("https://gianmarco.xyz/");
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Button;
  const { rounded } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(`custom-btn text-xl max-h-[50px] shadow-custom active:shadow-none active:translate-x-[3px] active:translate-y-[3px] text-gray-200 px-5 py-2 border border-primary-500 hover:text-primary-500 transition-colors duration-100 ease-in-out bg-gray-900 cursor-pointer ${rounded ? "rounded-full" : "rounded-lg"}`, "class")}>${renderSlot($$result, $$slots["default"])}</button>`;
}, "/home/jas/Documents/grid-astro-portfolio/src/components/Button.astro", void 0);

const LINKS = {
  github: "https://github.com/JustASpeedrunner",
  discord: "https://discordapp.com/users/841484475208826902"
};

const _tmpl$ = ["<div", ` class="absolute left-1/2 -translate-x-1/2 -translate-y-24 mt-1 w-auto max-h-[70px] p-2 bg-black text-white text-center rounded-lg z-10 shadow-custom border border-primary-500 whitespace-normal after:content-[''] after:block after:rotate-45 after:w-4 after:h-4 after:shadow-custom after:absolute after:-bottom-2 after:-translate-x-1/2 after:left-1/2 after:bg-black after:z-20"><p class="w-max">`, "</p></div>"], _tmpl$2 = ["<div", ' class="relative inline-block"><div>', "</div><!--$-->", "<!--/--></div>"];
function Tooltip(props) {
  const [isVisible, setIsVisible] = createSignal(false);
  const [clickCount, setClickCount] = createSignal(0);
  const messages = ["Hi there!", "Clicked again?", "Still here?", "Persistent, aren't you?", "What's up?", "Again? Really?", "You're curious!", "Not cool!", "Give it a break!", "That's annoying!", "Hands off!", "No more clicks!", "Seriously?!", "Ouch! That hurts!", "You're persistent!", "Why the curiosity?", "I'm getting tired!", "I'm bored!", "Enough's enough!", "Find another hobby!", "Stop, please!", "Okay, last one!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "That's it, I'm done!", "Wow. You're really persisent.", "Good job, have a cookie. 🍪"];
  const currentMessage = () => {
    const count = clickCount();
    if (count >= messages.length) {
      return messages[messages.length - 1];
    }
    return messages[count];
  };
  return ssr(_tmpl$2, ssrHydrationKey(), escape(props.children), escape(createComponent$1(Show, {
    get when() {
      return isVisible();
    },
    get children() {
      return ssr(_tmpl$, ssrHydrationKey(), escape(currentMessage()));
    }
  })));
}

const $$Astro$6 = createAstro("https://gianmarco.xyz/");
const $$IntroCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$IntroCard;
  return renderTemplate`${renderComponent($$result, "Card", $$Index$1, { "colSpan": "md:col-span-3", "rowSpan": "md:row-span-2" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="flex w-full h-full"><div class="flex flex-col justify-between md:max-h-[300px] gap-4"><div class="flex flex-col h-full"><h6 class="text-sm font-light m-0 text-gray-500">welcome</h6><p class="m-0 font-light text-xl">
Hi, I'm <b class="font-bold">Thomas Puckett</b>, a software
          developer and high school student with an interest in Rust and 
          game development.<br><br><br><br><br>Image by @reelrollsweat on tumblr
</p></div><div class="flex gap-4"><a${addAttribute(LINKS.github, "href")} aria-label="github profile" target="_blank">${renderComponent($$result2, "Button", $$Button, { "aria-label": "github profile" }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "name": "ri:github-fill", "class": "h-6" })}<span class="sr-only">GitHub Profile</span>` })}</a>${renderComponent($$result2, "Tooltip", Tooltip, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/jas/Documents/grid-astro-portfolio/src/components/Tooltip/index", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "Button", $$Button, { "aria-label": "easter egg btn" }, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Icon", $$Icon, { "name": "ri:emotion-laugh-line", "class": "h-6" })}<span class="sr-only">Easter egg button</span>` })}` })}</div></div><img width="300" height="300" src="/me.png" class="w-auto max-h-[300px] select-none absolute right-[-110px] bottom-[-20px] z-[-1] opacity-50 md:opacity-100 md:relative md:right-auto md:bottom-auto md:z-auto pointer-events-none" alt="Cartoon rendition of Thomas with red horns by @reelrollsweat on tumblr."></div>` })}`;
}, "/home/jas/Documents/grid-astro-portfolio/src/components/IntroCard.astro", void 0);

const $$Astro$5 = createAstro("https://gianmarco.xyz/");
const $$ContactsCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ContactsCard;
  return renderTemplate`${renderComponent($$result, "Card", $$Index$1, { "colSpan": "md:col-span-1", "rowSpan": "md:row-span-2" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="h-full"><header class="flex items-center"><h1 class="text-white text-xl font-bold">
Reach out! Let's talk!
</h1></header><address class="flex flex-col mt-4"><h2 class="text-gray-500">Contact Details</h2><p>jaspeedrunnerbusiness@gmail</p><p>Kentucky, USA</p></address><div class="flex flex-col mt-4 w-fit"><h2 class="text-gray-500">Socials</h2><ul><li><a${addAttribute(LINKS.github, "href")} target="_blank">Github</a></li><li><a${addAttribute(LINKS.discord, "href")} target="_blank">Discord</a></li></ul></div></div>` })}`;
}, "/home/jas/Documents/grid-astro-portfolio/src/components/ContactsCard.astro", void 0);

function getCurrentTimeInChicago() {
  const now = /* @__PURE__ */ new Date();
  const offsetChicago = -6;
  now.setHours(now.getUTCHours() + offsetChicago);
  return now;
}
function formatTimeForChicago(date) {
  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "CST"
  };
  let formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);
  formattedTime += " CST";
  return formattedTime;
}

const $$Astro$4 = createAstro("https://gianmarco.xyz/");
const $$TimeZoneCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$TimeZoneCard;
  return renderTemplate`${renderComponent($$result, "Card", $$Index$1, { "colSpan": "lg:col-span-2", "rowSpan": "md:row-span-1", "title": "Time zone" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<time datetime="" id="timeDisplay" class="text-2xl xl:text-5xl w-50 xl:w-100 h-[calc(100%-28px)] font-serif flex justify-center items-center">${formatTimeForChicago(getCurrentTimeInChicago())}</time>` })}`;
}, "/home/jas/Documents/grid-astro-portfolio/src/components/TimeZoneCard.astro", void 0);

const $$Astro$3 = createAstro("https://gianmarco.xyz/");
const $$AboutMe = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$AboutMe;
  return renderTemplate`${renderComponent($$result, "Card", $$Index$1, { "colSpan": "md:col-span-1", "rowSpan": "md:row-span-4", "title": "About me" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-2"><p class="text-sm font-light">
Hi, I'm Thomas Puckett, a programmer and game developer from Kentucky.
<br>
My primary tools of choice includes:
</p><ul class="list-disc list-inside"><li>Rust w/ Bevy and Egui</li><li>Lua</li><li>C++</li></ul><p class="text-sm font-light">
While I have my preferred tooling and languages, I am a quick learner
      and can easily adapt once I know the basics of the tooling provided.
      Even before that, learning the basics typically comes easily to me, so 
      I should be able to adapt to any environment I'm put in.
</p><p class="text-sm font-light">
Beyond coding, I'm passionate about learning the Japanese language
      and culture surrounding it. While I wouldn't say I'm anywhere near fluent,
      I love interacting with natives and native media. Seeing how different we
      are culturally is fascinating. I love it. Oh, I also play a TON of games,
      Counter-Strike being my favorite series behind Borderlands. Titanfall 2 is up there though.
      I love Source engine movement in any capacity though, it's so much fun.
</p></div>` })}`;
}, "/home/jas/Documents/grid-astro-portfolio/src/components/AboutMe.astro", void 0);

const $$Astro$2 = createAstro("https://gianmarco.xyz/");
const $$Pulse = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Pulse;
  return renderTemplate`${maybeRenderHead()}<span class="relative flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>`;
}, "/home/jas/Documents/grid-astro-portfolio/src/components/Pulse.astro", void 0);

const $$Astro$1 = createAstro("https://gianmarco.xyz/");
const $$Now = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Now;
  return renderTemplate`${renderComponent($$result, "Card", $$Index$1, { "colSpan": "md:col-span-1", "rowSpan": "md:row-span-1" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="flex justify-between w-full items-start mb-2"><div class="flex flex-col"><h2>Now</h2></div>${renderComponent($$result2, "Pulse", $$Pulse, {})}</div><p class="text-xs">Currently working through my senior year of high school.</p>` })}`;
}, "/home/jas/Documents/grid-astro-portfolio/src/components/Now.astro", void 0);

const $$Astro = createAstro("https://gianmarco.xyz/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Thomas Puckett - Rust Developer", "description": "Software developer with a love for memory safety and automation." }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main class="text-white m-auto p-2 grid gap-2 max-w-6xl overflow-hidden relative w-full sm:p-4 sm:gap-2 md:grid-cols-2 md:gap-3 md:p-6 lg:h-screen lg:grid-cols-4 lg:gap-4 lg:max-h-[800px]">${renderComponent($$result2, "IntroCard", $$IntroCard, {})}${renderComponent($$result2, "AboutMe", $$AboutMe, {})}${renderComponent($$result2, "ContactsCard", $$ContactsCard, {})}${renderComponent($$result2, "TimeZone", $$TimeZoneCard, {})}${renderComponent($$result2, "Now", $$Now, {})}${renderComponent($$result2, "Card", $$Index$1, { "colSpan": "md:col-span-1", "rowSpan": "md:row-span-1" }, { "default": ($$result3) => renderTemplate`<p class="text-xs">
© 2023 · Crafted with ♥️ using <a href="https://astro.build/" target="_blank" class="text-red-500">Astro</a> by Gianmarco.
</p>` })}</main>` })}`;
}, "/home/jas/Documents/grid-astro-portfolio/src/pages/index.astro", void 0);

const $$file = "/home/jas/Documents/grid-astro-portfolio/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
