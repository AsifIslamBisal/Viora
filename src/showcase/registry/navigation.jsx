import { useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb.jsx";
import { Tabs } from "../../components/Tabs/Tabs.jsx";
import { Tree } from "../../components/Tree/Tree.jsx";
import { Pagination } from "../../components/Pagination/Pagination.jsx";
import { Carousel } from "../../components/Carousel/Carousel.jsx";
import { Stepper } from "../../components/Stepper/Stepper.jsx";
import { Timeline } from "../../components/Timeline/Timeline.jsx";
import { Photo, CAROUSEL_SCENES, TABS_PHOTO, sceneSrc } from "../media.jsx";

import breadcrumbJsx from "../../components/Breadcrumb/Breadcrumb.jsx?raw";
import breadcrumbCss from "../../components/Breadcrumb/Breadcrumb.css?raw";
import tabsJsx from "../../components/Tabs/Tabs.jsx?raw";
import tabsCss from "../../components/Tabs/Tabs.css?raw";
import treeJsx from "../../components/Tree/Tree.jsx?raw";
import treeCss from "../../components/Tree/Tree.css?raw";
import paginationJsx from "../../components/Pagination/Pagination.jsx?raw";
import paginationCss from "../../components/Pagination/Pagination.css?raw";
import carouselJsx from "../../components/Carousel/Carousel.jsx?raw";
import carouselCss from "../../components/Carousel/Carousel.css?raw";
import stepperJsx from "../../components/Stepper/Stepper.jsx?raw";
import stepperCss from "../../components/Stepper/Stepper.css?raw";
import timelineJsx from "../../components/Timeline/Timeline.jsx?raw";
import timelineCss from "../../components/Timeline/Timeline.css?raw";

const stack = { display: "flex", flexDirection: "column", gap: 16, maxWidth: 560 };

const BreadcrumbDemo = () => (
  <Breadcrumb
    items={[
      { label: "Home", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Viora", href: "#" },
      { label: "Components" },
    ]}
  />
);

const tabItems = [
  {
    value: "overview",
    label: "Overview",
    content: (
      <div className="vx-tab-shot">
        <Photo src={TABS_PHOTO.src} tones={TABS_PHOTO.tones} alt="Project overview" />
        <p style={{ margin: 0 }}>A high-level summary of the project.</p>
      </div>
    ),
  },
  { value: "activity", label: "Activity", content: <p style={{ margin: 0 }}>Recent commits, issues and discussions.</p> },
  { value: "settings", label: "Settings", content: <p style={{ margin: 0 }}>Manage access, permissions and integrations.</p> },
];

const TabsDemo = () => (
  <div style={{ ...stack, maxWidth: 520 }}>
    <Tabs tabs={tabItems} label="Project sections" />
  </div>
);

const treeItems = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "button", label: "Button" },
          { id: "input", label: "Input" },
        ],
      },
      { id: "utils", label: "utils" },
    ],
  },
  { id: "package", label: "package.json" },
];

const TreeDemo = () => (
  <div style={{ ...stack, maxWidth: 360 }}>
    <Tree items={treeItems} ariaLabel="Project files" defaultExpanded={["src", "components"]} />
  </div>
);

function PaginationDemoInner() {
  const [page, setPage] = useState(4);
  return <Pagination page={page} totalPages={12} onChange={setPage} />;
}
const PaginationDemo = () => <PaginationDemoInner />;

const CarouselDemo = () => (
  <div style={{ ...stack, maxWidth: 560 }}>
    <Carousel autoPlay interval={5000} ariaLabel="Feature highlights">
      {CAROUSEL_SCENES.map((scene) => (
        <Photo
          key={scene.seed}
          className="vx-slide"
          src={sceneSrc(scene)}
          tones={scene.tones}
          alt={scene.title}
        >
          <span className="vx-slide__tag" style={{ background: scene.tones[0] }}>
            {scene.tag}
          </span>
          <span className="vx-slide__copy">
            <strong>{scene.title}</strong>
            <small>{scene.caption}</small>
          </span>
        </Photo>
      ))}
    </Carousel>
  </div>
);

const stepItems = [
  { id: "cart", label: "Cart", description: "Review items" },
  { id: "shipping", label: "Shipping", description: "Address" },
  { id: "payment", label: "Payment", description: "Method" },
  { id: "done", label: "Done" },
];

const StepperDemo = () => (
  <div style={{ ...stack, maxWidth: 560 }}>
    <Stepper steps={stepItems} current={1} />
  </div>
);

const timelineItems = [
  { id: "1", title: "Project created", date: "2026-01-04", content: "Repository initialized with Vite and React." },
  { id: "2", title: "First components", date: "2026-01-12", content: "Button, Input, Badge and Card shipped." },
  { id: "3", title: "Design system", date: "2026-02-20", content: "Tokens, theming and dark mode landed." },
];

const TimelineDemo = () => (
  <div style={{ ...stack, maxWidth: 520 }}>
    <Timeline items={timelineItems} ariaLabel="Project history" />
  </div>
);

export const navigation = [
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    description: "Trail of parent pages with separators and linked or current items.",
    Demo: BreadcrumbDemo,
    usage: `import { Breadcrumb } from "@your-npm-username/viora";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Viora" },
  ]}
/>`,
    sources: [
      { filename: "Breadcrumb.jsx", code: breadcrumbJsx },
      { filename: "Breadcrumb.css", code: breadcrumbCss },
    ],
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Tab panels with keyboard navigation, following the APG tabs pattern.",
    Demo: TabsDemo,
    usage: `import { Tabs } from "@your-npm-username/viora";

const tabs = [
  { value: "overview", label: "Overview", content: <p>Summary</p> },
  { value: "activity", label: "Activity", content: <p>Recent activity</p> },
];

<Tabs tabs={tabs} label="Sections" />`,
    sources: [
      { filename: "Tabs.jsx", code: tabsJsx },
      { filename: "Tabs.css", code: tabsCss },
    ],
  },
  {
    id: "tree",
    name: "Tree",
    category: "Navigation",
    description: "Nested, expandable tree with full roving-tabindex keyboard navigation.",
    Demo: TreeDemo,
    usage: `import { Tree } from "@your-npm-username/viora";

const items = [
  {
    id: "src",
    label: "src",
    children: [{ id: "button", label: "Button" }],
  },
];

<Tree items={items} ariaLabel="Files" defaultExpanded={["src"]} />`,
    sources: [
      { filename: "Tree.jsx", code: treeJsx },
      { filename: "Tree.css", code: treeCss },
    ],
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "Navigation",
    description: "Page navigation with ellipsis and a configurable number of sibling pages.",
    Demo: PaginationDemo,
    usage: `import { useState } from "react";
import { Pagination } from "@your-npm-username/viora";

const [page, setPage] = useState(1);

<Pagination page={page} totalPages={20} onChange={setPage} />`,
    sources: [
      { filename: "Pagination.jsx", code: paginationJsx },
      { filename: "Pagination.css", code: paginationCss },
    ],
  },
  {
    id: "carousel",
    name: "Carousel",
    category: "Navigation",
    description: "Slide rail with arrows, dots and optional autoplay that pauses on interaction.",
    Demo: CarouselDemo,
    usage: `import { Carousel } from "@your-npm-username/viora";

<Carousel autoPlay ariaLabel="Highlights">
  <div>Slide one</div>
  <div>Slide two</div>
  <div>Slide three</div>
</Carousel>`,
    sources: [
      { filename: "Carousel.jsx", code: carouselJsx },
      { filename: "Carousel.css", code: carouselCss },
    ],
  },
  {
    id: "stepper",
    name: "Stepper",
    category: "Navigation",
    description: "Progress step indicator with completed, current and upcoming states.",
    Demo: StepperDemo,
    usage: `import { Stepper } from "@your-npm-username/viora";

const steps = [
  { id: "cart", label: "Cart" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

<Stepper steps={steps} current={1} />`,
    sources: [
      { filename: "Stepper.jsx", code: stepperJsx },
      { filename: "Stepper.css", code: stepperCss },
    ],
  },
  {
    id: "timeline",
    name: "Timeline",
    category: "Navigation",
    description: "Vertical event feed with dates, content and optional icons.",
    Demo: TimelineDemo,
    usage: `import { Timeline } from "@your-npm-username/viora";

const items = [
  { id: "1", title: "Project created", date: "2026-01-04", content: "Initialized." },
  { id: "2", title: "First components", date: "2026-01-12", content: "Shipped." },
];

<Timeline items={items} ariaLabel="History" />`,
    sources: [
      { filename: "Timeline.jsx", code: timelineJsx },
      { filename: "Timeline.css", code: timelineCss },
    ],
  },
];