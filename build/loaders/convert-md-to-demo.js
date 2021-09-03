const marked = require("marked");

function mergeParts(parts) {
  const mergedParts = {
    ...parts,
  };
  mergedParts.title = parts.title;
  mergedParts.content = parts.content;
  mergedParts.code = "";
  if (parts.template) {
    mergedParts.code += `<template>\n${parts.template
      .split("\n")
      .map((line) => (line.length ? "  " + line : line))
      .join("\n")}\n</template>`;
  }
  if (parts.script) {
    if (parts.template) mergedParts.code += "\n\n";
    mergedParts.code += `<script>
${parts.script}
</script>`;
  }
  if (parts.style) {
    if (parts.template || parts.script) mergedParts.code += "\n\n";
    mergedParts.code += `<style>
${parts.style}
</style>`;
  }
  mergedParts.code = encodeURIComponent(mergedParts.code);
  return mergedParts;
}

function getPartsOfDemo(tokens) {
  let template = null; // html 和 template
  let script = null;
  let style = null;
  let title = null;
  const contentTokens = [];
  contentTokens.links = tokens.links;
  for (const token of tokens) {
    if (token.type === "heading" && token.depth === 1) {
      title = token.text;
    } else if (
      token.type === "code" &&
      (token.lang === "html" || token.lang === "template")
    ) {
      template = token.text;
    } else if (
      token.type === "code" &&
      (token.lang === "script" || token.lang === "js")
    ) {
      script = token.text;
    } else if (
      token.type === "code" &&
      (token.lang === "style" || token.lang === "css")
    ) {
      style = token.text;
    } else {
      contentTokens.push(token);
    }
  }
  return {
    template: template,
    script: script,
    style: style,
    title: title,
    content: marked.parser(contentTokens, {
      // renderer: mdRenderer
      renderer: new marked.Renderer(),
    }),
  };
}

function convertMd2Demo(text, {}) {
  const noRunning = /<!--no-running-->/.test(text);
  const tokens = marked.lexer(text);
  console.log(tokens);
  const parts = getPartsOfDemo(tokens);
  const mergedParts = mergeParts(parts)
  console.log(mergedParts);
  return "demo-loader"
}

module.exports = convertMd2Demo;
