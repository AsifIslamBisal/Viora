import { useState } from "react";
import { Alert } from "../../components/Alert/Alert.jsx";
import { NotificationBanner } from "../../components/NotificationBanner/NotificationBanner.jsx";
import { Spinner } from "../../components/Spinner/Spinner.jsx";
import { Progress } from "../../components/Progress/Progress.jsx";
import { Skeleton } from "../../components/Skeleton/Skeleton.jsx";
import { Rating } from "../../components/Rating/Rating.jsx";
import { Badge } from "../../components/Badge/Badge.jsx";
import { Tag } from "../../components/Tag/Tag.jsx";
import { Stat } from "../../components/Stat/Stat.jsx";
import { ToastProvider, useToast } from "../../components/Toast/Toast.jsx";

import alertJsx from "../../components/Alert/Alert.jsx?raw";
import alertCss from "../../components/Alert/Alert.css?raw";
import notificationJsx from "../../components/NotificationBanner/NotificationBanner.jsx?raw";
import notificationCss from "../../components/NotificationBanner/NotificationBanner.css?raw";
import spinnerJsx from "../../components/Spinner/Spinner.jsx?raw";
import spinnerCss from "../../components/Spinner/Spinner.css?raw";
import progressJsx from "../../components/Progress/Progress.jsx?raw";
import progressCss from "../../components/Progress/Progress.css?raw";
import skeletonJsx from "../../components/Skeleton/Skeleton.jsx?raw";
import skeletonCss from "../../components/Skeleton/Skeleton.css?raw";
import ratingJsx from "../../components/Rating/Rating.jsx?raw";
import ratingCss from "../../components/Rating/Rating.css?raw";
import badgeJsx from "../../components/Badge/Badge.jsx?raw";
import badgeCss from "../../components/Badge/Badge.css?raw";
import tagJsx from "../../components/Tag/Tag.jsx?raw";
import tagCss from "../../components/Tag/Tag.css?raw";
import statJsx from "../../components/Stat/Stat.jsx?raw";
import statCss from "../../components/Stat/Stat.css?raw";
import toastJsx from "../../components/Toast/Toast.jsx?raw";
import toastCss from "../../components/Toast/Toast.css?raw";

const stack = { display: "flex", flexDirection: "column", gap: 12, maxWidth: 520 };

const AlertDemo = () => (
  <div style={stack}>
    <Alert variant="info" title="New version available">
      Upgrade to the latest release for new components and fixes.
    </Alert>
    <Alert variant="danger" title="Payment failed" dismissible>
      Your card was declined. Try another payment method.
    </Alert>
  </div>
);

const NotificationDemo = () => (
  <div style={stack}>
    <NotificationBanner tone="success" title="Profile updated" content="Your changes have been saved successfully." />
    <NotificationBanner tone="warning" title="Storage almost full" content="You have used 92% of your quota." dismissible />
  </div>
);

const SpinnerDemo = () => (
  <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" label="Loading…" />
  </div>
);

const ProgressDemo = () => (
  <div style={{ ...stack, maxWidth: 420 }}>
    <Progress value={72} label="Upload" showValue />
    <Progress value={45} tone="success" />
    <Progress indeterminate label="Preparing…" />
  </div>
);

const SkeletonDemo = () => (
  <div style={{ ...stack, maxWidth: 420 }}>
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Skeleton variant="circle" width={48} height={48} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
    <Skeleton variant="rect" height={96} />
  </div>
);

const RatingDemo = () => {
  const [value, setValue] = useState(0);
  return <Rating value={value} onChange={setValue} label="Rate your experience" />;
};

const BadgeDemo = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
    <Badge variant="secondary">Default</Badge>
    <Badge variant="primary">Primary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="danger">Danger</Badge>
    <Badge dot variant="success">
      Online
    </Badge>
  </div>
);

const TagDemo = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
    <Tag label="Design" />
    <Tag label="React" variant="primary" />
    <Tag label="Removable" onRemove={() => {}} />
  </div>
);

const StatDemo = () => (
  <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
    <Stat label="Total revenue" value="24,500" prefix="$" delta="12%" trend="up" />
    <Stat label="Active users" value="8,412" delta="3%" trend="down" />
  </div>
);

function ToastTrigger() {
  const toast = useToast();
  return (
    <button
      type="button"
      onClick={() =>
        toast({ title: "Saved", description: "Your changes are stored.", variant: "success" })
      }
      style={{
        padding: "8px 16px",
        borderRadius: 8,
        border: "1px solid var(--viora-border)",
        background: "var(--viora-primary)",
        color: "var(--viora-primary-foreground)",
        fontFamily: "inherit",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      Show toast
    </button>
  );
}

const ToastDemo = () => (
  <ToastProvider>
    <ToastTrigger />
  </ToastProvider>
);

export const feedback = [
  {
    id: "alert",
    name: "Alert",
    category: "Feedback",
    description: "Inline, tone-based message with an icon, title and optional dismiss.",
    Demo: AlertDemo,
    usage: `import { Alert } from "@your-npm-username/viora";

<Alert variant="danger" title="Payment failed" dismissible>
  Your card was declined.
</Alert>`,
    sources: [
      { filename: "Alert.jsx", code: alertJsx },
      { filename: "Alert.css", code: alertCss },
    ],
  },
  {
    id: "notification-banner",
    name: "NotificationBanner",
    category: "Feedback",
    description: "Prominent banner with a title and content, using alert/status roles by tone.",
    Demo: NotificationDemo,
    usage: `import { NotificationBanner } from "@your-npm-username/viora";

<NotificationBanner
  tone="success"
  title="Profile updated"
  content="Your changes have been saved."
  dismissible
/>`,
    sources: [
      { filename: "NotificationBanner.jsx", code: notificationJsx },
      { filename: "NotificationBanner.css", code: notificationCss },
    ],
  },
  {
    id: "spinner",
    name: "Spinner",
    category: "Feedback",
    description: "Loading indicator with sizes and an accessible status label.",
    Demo: SpinnerDemo,
    usage: `import { Spinner } from "@your-npm-username/viora";

<Spinner size="lg" label="Loading…" />`,
    sources: [
      { filename: "Spinner.jsx", code: spinnerJsx },
      { filename: "Spinner.css", code: spinnerCss },
    ],
  },
  {
    id: "progress",
    name: "Progress",
    category: "Feedback",
    description: "Determinate or indeterminate progress bar with tones and a value label.",
    Demo: ProgressDemo,
    usage: `import { Progress } from "@your-npm-username/viora";

<Progress value={72} label="Upload" showValue />
<Progress indeterminate label="Preparing…" />`,
    sources: [
      { filename: "Progress.jsx", code: progressJsx },
      { filename: "Progress.css", code: progressCss },
    ],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    description: "Content placeholder shown while data loads. Text, circle and rect variants.",
    Demo: SkeletonDemo,
    usage: `import { Skeleton } from "@your-npm-username/viora";

<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="text" width="60%" />
<Skeleton variant="rect" height={96} />`,
    sources: [
      { filename: "Skeleton.jsx", code: skeletonJsx },
      { filename: "Skeleton.css", code: skeletonCss },
    ],
  },
  {
    id: "rating",
    name: "Rating",
    category: "Feedback",
    description: "Star rating following the APG slider pattern. Interactive or read-only.",
    Demo: RatingDemo,
    usage: `import { useState } from "react";
import { Rating } from "@your-npm-username/viora";

const [value, setValue] = useState(0);

<Rating value={value} onChange={setValue} label="Rate your experience" />`,
    sources: [
      { filename: "Rating.jsx", code: ratingJsx },
      { filename: "Rating.css", code: ratingCss },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    category: "Feedback",
    description: "Compact status badge with variants and an optional leading dot.",
    Demo: BadgeDemo,
    usage: `import { Badge } from "@your-npm-username/viora";

<Badge variant="success">Success</Badge>
<Badge dot variant="success">Online</Badge>`,
    sources: [
      { filename: "Badge.jsx", code: badgeJsx },
      { filename: "Badge.css", code: badgeCss },
    ],
  },
  {
    id: "tag",
    name: "Tag",
    category: "Feedback",
    description: "Small labeled chip, optionally removable.",
    Demo: TagDemo,
    usage: `import { Tag } from "@your-npm-username/viora";

<Tag label="Design" />
<Tag label="React" variant="primary" />
<Tag label="Removable" onRemove={() => {}} />`,
    sources: [
      { filename: "Tag.jsx", code: tagJsx },
      { filename: "Tag.css", code: tagCss },
    ],
  },
  {
    id: "stat",
    name: "Stat",
    category: "Feedback",
    description: "Key metric display with a label, value, affixes and a trend delta.",
    Demo: StatDemo,
    usage: `import { Stat } from "@your-npm-username/viora";

<Stat label="Total revenue" value="24,500" prefix="$" delta="12%" trend="up" />`,
    sources: [
      { filename: "Stat.jsx", code: statJsx },
      { filename: "Stat.css", code: statCss },
    ],
  },
  {
    id: "toast",
    name: "Toast",
    category: "Feedback",
    description: "Transient notifications via ToastProvider and the useToast hook.",
    Demo: ToastDemo,
    usage: `import { ToastProvider, useToast } from "@your-npm-username/viora";

function App() {
  return (
    <ToastProvider>
      <Trigger />
    </ToastProvider>
  );
}

function Trigger() {
  const toast = useToast();
  return (
    <button onClick={() => toast({ title: "Saved", variant: "success" })}>
      Show toast
    </button>
  );
}`,
    sources: [
      { filename: "Toast.jsx", code: toastJsx },
      { filename: "Toast.css", code: toastCss },
    ],
  },
];