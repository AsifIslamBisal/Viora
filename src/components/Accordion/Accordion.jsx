import { useId, useState } from "react";
import { cx } from "../../utils/cx";
import "./Accordion.css";

function AccordionItem({ title, content, open, onToggle }) {
  const headerId = useId();
  const panelId = `${headerId}-panel`;

  return (
    <div
      className={cx(
        "viora-accordion__item",
        open && "viora-accordion__item--open"
      )}
    >
      <h3 className="viora-accordion__header">
        <button
          type="button"
          id={headerId}
          className="viora-accordion__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="viora-accordion__title">{title}</span>
          <svg
            className="viora-accordion__chevron"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={open ? "false" : "true"}
        className="viora-accordion__panel"
      >
        <div className="viora-accordion__content">{content}</div>
      </div>
    </div>
  );
}

export function Accordion({
  items,
  defaultOpen,
  open: controlledOpen,
  onToggle,
  collapsible = true,
  className,
  ...rest
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? null);
  const openValue = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const toggle = (value) => {
    const next = openValue === value ? null : value;
    if (controlledOpen !== undefined) {
      onToggle?.(next);
    } else {
      setInternalOpen(next);
    }
  };

  return (
    <div className={cx("viora-accordion", className)} {...rest}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          title={item.title}
          content={item.content}
          open={openValue === item.value}
          onToggle={collapsible ? () => toggle(item.value) : () => openValue !== item.value && toggle(item.value)}
        />
      ))}
    </div>
  );
}

export default Accordion;