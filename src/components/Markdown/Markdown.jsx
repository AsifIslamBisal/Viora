import { cx } from "../../utils/cx";
import "./Markdown.css";

const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isSafeHref = (href) => /^(https?:\/\/|mailto:|#|\/)/i.test(href);

const applyInline = (text) => {
  const protectedCode = [];
  const raw = text.replace(/`([^`]+)`/g, (match, code) => {
    protectedCode.push(code);
    return `\u0000${protectedCode.length - 1}\u0001`;
  });
  const bolded = raw.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const italicized = bolded.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  const linked = italicized.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (match, label, href) => {
      const safe = isSafeHref(href) ? href : "#";
      return `<a href="${safe}">${label}</a>`;
    }
  );

  // eslint-disable-next-line no-control-regex
  return linked.replace(/\u0000(\d+)\u0001/g, (match, index) => {
    const code = protectedCode[Number(index)];
    return `<code>${code}</code>`;
  });
};

const renderBlock = (block) => {
  const inline = applyInline(escapeHtml(block));

  if (/^(#{1,6})\s+/.test(block)) {
    const level = block.match(/^#{1,6}/)[0].length;
    return `<h${level}>${inline.replace(/^#{1,6}\s+/, "")}</h${level}>`;
  }

  if (block.startsWith("> ")) {
    return `<blockquote>${applyInline(escapeHtml(block.slice(2)))}</blockquote>`;
  }

  if (/^\s*[-*]\s+/.test(block)) {
    return `<ul>${block
      .split("\n")
      .map((line) => `<li>${applyInline(escapeHtml(line.replace(/^\s*[-*]\s+/, "")))}</li>`)
      .join("")}</ul>`;
  }

  if (/^\s*\d+\.\s+/.test(block)) {
    return `<ol>${block
      .split("\n")
      .map((line) => `<li>${applyInline(escapeHtml(line.replace(/^\s*\d+\.\s+/, "")))}</li>`)
      .join("")}</ol>`;
  }

  return `<p>${inline}</p>`;
};

export function Markdown({ content, className, ...rest }) {
  const lines = (content ?? "").split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith("```")) {
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        `<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`
      );
      continue;
    }

    if (/^(#{1,6})\s+/.test(line)) {
      blocks.push(renderBlock(line));
      index += 1;
      continue;
    }

    if (/^\s*[-*]\s+|^\s*\d+\.\s+/.test(line)) {
      const isOrdered = /^\s*\d+\.\s+/.test(line);
      const group = [];
      while (
        index < lines.length &&
        (isOrdered
          ? /^\s*\d+\.\s+/.test(lines[index])
          : /^\s*[-*]\s+/.test(lines[index]))
      ) {
        group.push(lines[index]);
        index += 1;
      }
      blocks.push(renderBlock(group.join("\n")));
      continue;
    }

    if (line === "---") {
      blocks.push("<hr />");
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const group = [];
      while (index < lines.length && lines[index].startsWith("> ")) {
        group.push(lines[index]);
        index += 1;
      }
      blocks.push(renderBlock(group.join("\n")));
      continue;
    }

    if (line.trim() === "") {
      index += 1;
      continue;
    }

    blocks.push(renderBlock(line));
    index += 1;
  }

  return (
    <div
      className={cx("viora-markdown", className)}
      dangerouslySetInnerHTML={{ __html: blocks.join("\n") }}
      {...rest}
    />
  );
}

export default Markdown;