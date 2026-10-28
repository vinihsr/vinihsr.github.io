import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default function (eleventyConfig) {
  // Aplica o pathPrefix automaticamente em href/src que começam com "/"
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/images");

  // Bloco de código com botão "Copiar"
  eleventyConfig.addPairedShortcode("codeblock", (content, lang = "sql") => `
<div class="code-wrapper">
    <button class="copy-btn">Copiar</button>
<pre><code class="language-${lang}">${esc(content.trim())}</code></pre>
</div>`);

  // Imagem com moldura, legenda e zoom
  eleventyConfig.addShortcode("figure", (src, alt, caption) => `
<div class="figure">
    <div class="figure-box">
        <img src="${src}" alt="${alt}" class="zoomable">
        <p class="figure-caption">${caption}</p>
    </div>
</div>`);

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: "/",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}