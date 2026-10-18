import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, COMPONENTS } from "./registry/index.js";
import { CodePanel } from "./CodePanel.jsx";

function getInitialTheme() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(COMPONENTS[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const selected =
    COMPONENTS.find((c) => c.id === selectedId) ?? COMPONENTS[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return CATEGORIES;
    }
    return CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) =>
        item.name.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [query]);

  const select = (id) => {
    setSelectedId(id);
    setSidebarOpen(false);
  };

  return (
    <div className="vx">
      <header className="vx-topbar">
        <button
          type="button"
          className="vx-burger"
          aria-label="Toggle component list"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <a className="vx-brand" href="#top">
          <span className="vx-brand__logo" aria-hidden="true">
            V
          </span>
          <span className="vx-brand__text">
            <strong>Viora</strong>
            <small>React component library</small>
          </span>
        </a>

        <div className="vx-search">
          <input
            type="search"
            placeholder="Search components…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search components"
          />
        </div>

        <button
          type="button"
          className="vx-theme"
          aria-label="Toggle color theme"
          onClick={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </header>

      <div className="vx-body">
        {sidebarOpen && (
          <button
            type="button"
            className="vx-scrim"
            aria-label="Close component list"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`vx-sidebar${sidebarOpen ? " vx-sidebar--open" : ""}`}
        >
          <nav aria-label="Components">
            {filtered.map((cat) => (
              <div className="vx-nav-group" key={cat.name}>
                <p className="vx-nav-group__title">{cat.name}</p>
                <ul>
                  {cat.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={
                          item.id === selectedId
                            ? "vx-nav-link vx-nav-link--active"
                            : "vx-nav-link"
                        }
                        aria-current={
                          item.id === selectedId ? "page" : undefined
                        }
                        onClick={() => select(item.id)}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="vx-nav-empty">No components match “{query}”.</p>
            )}
          </nav>
        </aside>

        <main className="vx-main" id="top">
          <div className="vx-main__inner">
            <div className="vx-detail__head">
              <span className="vx-detail__category">{selected.category}</span>
              <h1 className="vx-detail__title">{selected.name}</h1>
              <p className="vx-detail__desc">{selected.description}</p>
            </div>

            <section className="vx-stage" aria-label={`${selected.name} live demo`}>
              <selected.Demo />
            </section>

            <CodePanel component={selected} />
          </div>
        </main>
      </div>
    </div>
  );
}