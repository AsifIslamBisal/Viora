import { useId, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./Tabs.css";

export function Tabs({
  tabs,
  defaultValue,
  value,
  onChange,
  label,
  className,
  ...rest
}) {
  const generatedId = useId();
  const tabsRef = useRef(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? tabs[0]?.value
  );
  const activeValue = isControlled ? value : internalValue;
  const activeTab = tabs.find((tab) => tab.value === activeValue) ?? tabs[0];

  const setActive = (nextValue) => {
    if (isControlled) {
      onChange?.(nextValue);
    } else {
      setInternalValue(nextValue);
    }
  };

  const handleKeyDown = (event, index) => {
    const count = tabs.length;
    let next = -1;

    if (event.key === "ArrowRight") {
      next = (index + 1) % count;
    } else if (event.key === "ArrowLeft") {
      next = (index - 1 + count) % count;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = count - 1;
    }

    if (next === -1) {
      return;
    }

    event.preventDefault();
    const tabElement = tabsRef.current.querySelectorAll('[role="tab"]')[next];
    tabElement.focus();
    setActive(tabs[next].value);
  };

  return (
    <div className={cx("viora-tabs", className)} {...rest}>
      <div
        ref={tabsRef}
        role="tablist"
        className="viora-tabs__list"
        aria-label={label}
      >
        {tabs.map((tab, index) => {
          const selected = tab.value === activeTab.value;
          const tabId = `${generatedId}-tab-${tab.value}`;
          const panelId = `${generatedId}-panel-${tab.value}`;

          return (
            <button
              type="button"
              role="tab"
              id={tabId}
              key={tab.value}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={cx(
                "viora-tabs__tab",
                selected && "viora-tabs__tab--active"
              )}
              onClick={() => setActive(tab.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${generatedId}-panel-${activeTab.value}`}
        aria-labelledby={`${generatedId}-tab-${activeTab.value}`}
        className="viora-tabs__panel"
        tabIndex={0}
      >
        {activeTab.content}
      </div>
    </div>
  );
}

export default Tabs;