import { useEffect, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./CodeBlock.css";

const COPY_ICON = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="5.5" y="2.5" width="8" height="10" rx="1.5" stroke="currentColor" />
    <path
      d="M10.5 2.5h-5a2 2 0 0 0-2 2v7.5"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

const CHECK_ICON = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M13 4.5L6.5 11 3 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  copyLabel = "Copy code",
  copiedLabel = "Copied",
  className,
  ...rest
}) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleCopy = () => {
    const source = navigator.clipboard?.writeText
      ? navigator.clipboard.writeText(code)
      : Promise.reject(new Error("clipboard unavailable"));

    source.catch(() => {
      if (typeof document.execCommand === "function") {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
    });

    setCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trimEnd().split("\n");

  return (
    <div className={cx("viora-code-block", className)} {...rest}>
      <header className="viora-code-block__header">
        <span className="viora-code-block__language">{language ?? ""}</span>
        <button
          type="button"
          className="viora-code-block__copy"
          onClick={handleCopy}
          aria-label={copied ? copiedLabel : copyLabel}
        >
          {copied ? CHECK_ICON : COPY_ICON}
          {copied ? copiedLabel : copyLabel}
        </button>
      </header>
      <pre className="viora-code-block__pre">
        <code className="viora-code-block__code">
          {showLineNumbers
            ? lines.map((line, index) => (
                <span key={index} className="viora-code-block__line">
                  <span className="viora-code-block__line-number">
                    {index + 1}
                  </span>
                  <span className="viora-code-block__line-text">
                    {line || " "}
                  </span>
                </span>
              ))
            : code}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock;