import { useState } from "react";

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return Promise.resolve();
}

export function CodePanel({ component }) {
  const tabs = [
    { key: "usage", label: "Usage", code: component.usage },
    ...component.sources.map((source) => ({
      key: source.filename,
      label: source.filename,
      code: source.code,
    })),
  ];

  const [activeKey, setActiveKey] = useState("usage");
  const [copied, setCopied] = useState(false);

  const active = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  const onCopy = async () => {
    await copyText(active.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="vx-code" aria-label={`${component.name} code`}>
      <div className="vx-code__bar">
        <div className="vx-code__tabs" role="tablist" aria-label="Code views">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={tab.key === active.key}
              className={
                tab.key === active.key
                  ? "vx-code__tab vx-code__tab--active"
                  : "vx-code__tab"
              }
              onClick={() => setActiveKey(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button type="button" className="vx-copy" onClick={onCopy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="vx-code__pre" role="tabpanel">
        <code>{active.code}</code>
      </pre>
    </section>
  );
}