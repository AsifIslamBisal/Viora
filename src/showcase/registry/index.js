import { actions } from "./actions.jsx";
import { forms } from "./forms.jsx";
import { feedback } from "./feedback.jsx";
import { overlays } from "./overlays.jsx";
import { navigation } from "./navigation.jsx";
import { data } from "./data.jsx";

export const CATEGORIES = [
  { name: "Actions", items: actions },
  { name: "Forms", items: forms },
  { name: "Feedback", items: feedback },
  { name: "Overlays", items: overlays },
  { name: "Navigation", items: navigation },
  { name: "Data display", items: data },
];

export const COMPONENTS = CATEGORIES.flatMap((category) => category.items);