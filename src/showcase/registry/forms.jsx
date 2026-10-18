import { useState } from "react";
import { Input } from "../../components/Input/Input.jsx";
import { Textarea } from "../../components/Textarea/Textarea.jsx";
import { Checkbox } from "../../components/Checkbox/Checkbox.jsx";
import { Switch } from "../../components/Switch/Switch.jsx";
import { Select } from "../../components/Select/Select.jsx";
import { Combobox } from "../../components/Combobox/Combobox.jsx";
import { RadioGroup } from "../../components/Radio/RadioGroup.jsx";
import { Radio } from "../../components/Radio/Radio.jsx";
import { NumberInput } from "../../components/NumberInput/NumberInput.jsx";
import { Slider } from "../../components/Slider/Slider.jsx";
import { MultiSelect } from "../../components/MultiSelect/MultiSelect.jsx";
import { TimePicker } from "../../components/TimePicker/TimePicker.jsx";
import { ColorPicker } from "../../components/ColorPicker/ColorPicker.jsx";
import { SegmentedControl } from "../../components/SegmentedControl/SegmentedControl.jsx";
import { FileUpload } from "../../components/FileUpload/FileUpload.jsx";
import { Label } from "../../components/Label/Label.jsx";
import { Fieldset } from "../../components/Fieldset/Fieldset.jsx";

import inputJsx from "../../components/Input/Input.jsx?raw";
import inputCss from "../../components/Input/Input.css?raw";
import textareaJsx from "../../components/Textarea/Textarea.jsx?raw";
import textareaCss from "../../components/Textarea/Textarea.css?raw";
import checkboxJsx from "../../components/Checkbox/Checkbox.jsx?raw";
import checkboxCss from "../../components/Checkbox/Checkbox.css?raw";
import switchJsx from "../../components/Switch/Switch.jsx?raw";
import switchCss from "../../components/Switch/Switch.css?raw";
import selectJsx from "../../components/Select/Select.jsx?raw";
import selectCss from "../../components/Select/Select.css?raw";
import comboboxJsx from "../../components/Combobox/Combobox.jsx?raw";
import comboboxCss from "../../components/Combobox/Combobox.css?raw";
import radioGroupJsx from "../../components/Radio/RadioGroup.jsx?raw";
import radioJsx from "../../components/Radio/Radio.jsx?raw";
import radioCss from "../../components/Radio/Radio.css?raw";
import numberInputJsx from "../../components/NumberInput/NumberInput.jsx?raw";
import numberInputCss from "../../components/NumberInput/NumberInput.css?raw";
import sliderJsx from "../../components/Slider/Slider.jsx?raw";
import sliderCss from "../../components/Slider/Slider.css?raw";
import multiSelectJsx from "../../components/MultiSelect/MultiSelect.jsx?raw";
import multiSelectCss from "../../components/MultiSelect/MultiSelect.css?raw";
import timePickerJsx from "../../components/TimePicker/TimePicker.jsx?raw";
import timePickerCss from "../../components/TimePicker/TimePicker.css?raw";
import colorPickerJsx from "../../components/ColorPicker/ColorPicker.jsx?raw";
import colorPickerCss from "../../components/ColorPicker/ColorPicker.css?raw";
import segmentedJsx from "../../components/SegmentedControl/SegmentedControl.jsx?raw";
import segmentedCss from "../../components/SegmentedControl/SegmentedControl.css?raw";
import fileUploadJsx from "../../components/FileUpload/FileUpload.jsx?raw";
import fileUploadCss from "../../components/FileUpload/FileUpload.css?raw";
import labelJsx from "../../components/Label/Label.jsx?raw";
import labelCss from "../../components/Label/Label.css?raw";
import fieldsetJsx from "../../components/Fieldset/Fieldset.jsx?raw";
import fieldsetCss from "../../components/Fieldset/Fieldset.css?raw";

const stack = { display: "flex", flexDirection: "column", gap: 16, maxWidth: 420 };

const InputDemo = () => (
  <div style={stack}>
    <Input label="Email" type="email" placeholder="you@example.com" hint="We'll never share your email." />
    <Input label="Username" error="This username is already taken." defaultValue="taken_name" />
  </div>
);

const TextareaDemo = () => (
  <div style={stack}>
    <Textarea label="Bio" placeholder="Tell us about yourself" rows={4} hint="A short summary helps others find you." />
  </div>
);

const CheckboxDemo = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <Checkbox label="Accept the terms of service" defaultChecked />
    <Checkbox label="Subscribe to newsletter" />
    <Checkbox label="Indeterminate state" indeterminate />
  </div>
);

const SwitchDemo = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <Switch label="Enable email notifications" defaultChecked />
    <Switch label="Dark mode on launch" />
  </div>
);

const SelectDemo = () => (
  <div style={stack}>
    <Select label="Country" defaultValue="bd">
      <option value="bd">Bangladesh</option>
      <option value="in">India</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
    </Select>
  </div>
);

const comboboxOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "angular", label: "Angular" },
];

const ComboboxDemo = () => {
  const [value, setValue] = useState("");
  return (
    <div style={stack}>
      <Combobox
        label="Framework"
        options={comboboxOptions}
        value={value}
        onChange={setValue}
        placeholder="Search frameworks…"
      />
    </div>
  );
};

const RadioDemo = () => {
  const [plan, setPlan] = useState("monthly");
  return (
    <div style={stack}>
      <RadioGroup label="Billing plan" name="plan" value={plan} onChange={setPlan}>
        <Radio value="monthly" label="Monthly" />
        <Radio value="yearly" label="Yearly" />
        <Radio value="lifetime" label="Lifetime" />
      </RadioGroup>
    </div>
  );
};

const NumberInputDemo = () => {
  const [qty, setQty] = useState(2);
  return (
    <div style={stack}>
      <NumberInput label="Quantity" value={qty} onChange={setQty} min={0} max={20} />
    </div>
  );
};

const SliderDemo = () => {
  const [volume, setVolume] = useState(60);
  return (
    <div style={{ ...stack, maxWidth: 360 }}>
      <Slider label="Volume" value={volume} onChange={setVolume} showValue tone="primary" />
    </div>
  );
};

const multiSelectOptions = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
  { value: "go", label: "Go" },
  { value: "rs", label: "Rust" },
  { value: "py", label: "Python" },
];

const MultiSelectDemo = () => {
  const [langs, setLangs] = useState(["js", "ts"]);
  return (
    <div style={stack}>
      <MultiSelect label="Languages" options={multiSelectOptions} value={langs} onChange={setLangs} />
    </div>
  );
};

const TimePickerDemo = () => {
  const [time, setTime] = useState("09:30");
  return (
    <div style={stack}>
      <TimePicker label="Meeting time" value={time} onChange={setTime} />
    </div>
  );
};

const ColorPickerDemo = () => {
  const [color, setColor] = useState("#6366f1");
  return (
    <div style={stack}>
      <ColorPicker label="Accent color" value={color} onChange={setColor} />
    </div>
  );
};

const SegmentedDemo = () => (
  <div style={{ ...stack, maxWidth: 360 }}>
    <SegmentedControl
      label="View"
      defaultValue="grid"
      options={[
        { value: "grid", label: "Grid" },
        { value: "list", label: "List" },
        { value: "board", label: "Board" },
      ]}
    />
  </div>
);

const FileUploadDemo = () => {
  const [files, setFiles] = useState([]);
  return (
    <div style={stack}>
      <FileUpload
        label="Attachments"
        hint="PDF or PNG, up to 5MB"
        accept=".pdf,.png"
        files={files}
        onChange={setFiles}
      />
    </div>
  );
};

const LabelDemo = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <Label size="sm">Small label</Label>
    <Label>Default label</Label>
    <Label size="lg">Large label</Label>
    <Label tone="primary">Primary tone</Label>
  </div>
);

const FieldsetDemo = () => (
  <div style={{ maxWidth: 420 }}>
    <Fieldset legend="Shipping address">
      <Input label="Full name" placeholder="Jane Doe" />
      <Input label="City" placeholder="Dhaka" />
    </Fieldset>
  </div>
);

export const forms = [
  {
    id: "input",
    name: "Input",
    category: "Forms",
    description: "Single-line text field with label, hint and error wiring.",
    Demo: InputDemo,
    usage: `import { Input } from "@your-npm-username/viora";

<Input label="Email" type="email" hint="We'll never share it." />`,
    sources: [
      { filename: "Input.jsx", code: inputJsx },
      { filename: "Input.css", code: inputCss },
    ],
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "Forms",
    description: "Multi-line text field with the same label/hint/error behavior as Input.",
    Demo: TextareaDemo,
    usage: `import { Textarea } from "@your-npm-username/viora";

<Textarea label="Bio" rows={4} placeholder="Tell us about yourself" />`,
    sources: [
      { filename: "Textarea.jsx", code: textareaJsx },
      { filename: "Textarea.css", code: textareaCss },
    ],
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Forms",
    description: "Boolean checkbox with optional indeterminate state, hint and error.",
    Demo: CheckboxDemo,
    usage: `import { Checkbox } from "@your-npm-username/viora";

<Checkbox label="Accept the terms" defaultChecked />`,
    sources: [
      { filename: "Checkbox.jsx", code: checkboxJsx },
      { filename: "Checkbox.css", code: checkboxCss },
    ],
  },
  {
    id: "switch",
    name: "Switch",
    category: "Forms",
    description: "Toggle switch for an on/off setting.",
    Demo: SwitchDemo,
    usage: `import { Switch } from "@your-npm-username/viora";

<Switch label="Enable notifications" defaultChecked />`,
    sources: [
      { filename: "Switch.jsx", code: switchJsx },
      { filename: "Switch.css", code: switchCss },
    ],
  },
  {
    id: "select",
    name: "Select",
    category: "Forms",
    description: "Native dropdown wrapper with label, hint and error.",
    Demo: SelectDemo,
    usage: `import { Select } from "@your-npm-username/viora";

<Select label="Country">
  <option value="bd">Bangladesh</option>
  <option value="us">United States</option>
</Select>`,
    sources: [
      { filename: "Select.jsx", code: selectJsx },
      { filename: "Select.css", code: selectCss },
    ],
  },
  {
    id: "combobox",
    name: "Combobox",
    category: "Forms",
    description: "Single-select typeahead. Filter options by typing, pick with the keyboard.",
    Demo: ComboboxDemo,
    usage: `import { useState } from "react";
import { Combobox } from "@your-npm-username/viora";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

const [value, setValue] = useState("");

<Combobox label="Framework" options={options} value={value} onChange={setValue} />`,
    sources: [
      { filename: "Combobox.jsx", code: comboboxJsx },
      { filename: "Combobox.css", code: comboboxCss },
    ],
  },
  {
    id: "radio-group",
    name: "RadioGroup",
    category: "Forms",
    description: "Grouped radio buttons with keyboard navigation and a shared label.",
    Demo: RadioDemo,
    usage: `import { useState } from "react";
import { RadioGroup, Radio } from "@your-npm-username/viora";

const [plan, setPlan] = useState("monthly");

<RadioGroup label="Billing plan" name="plan" value={plan} onChange={setPlan}>
  <Radio value="monthly" label="Monthly" />
  <Radio value="yearly" label="Yearly" />
</RadioGroup>`,
    sources: [
      { filename: "RadioGroup.jsx", code: radioGroupJsx },
      { filename: "Radio.jsx", code: radioJsx },
      { filename: "Radio.css", code: radioCss },
    ],
  },
  {
    id: "number-input",
    name: "NumberInput",
    category: "Forms",
    description: "Numeric stepper input with min, max and step.",
    Demo: NumberInputDemo,
    usage: `import { useState } from "react";
import { NumberInput } from "@your-npm-username/viora";

const [qty, setQty] = useState(2);

<NumberInput label="Quantity" value={qty} onChange={setQty} min={0} max={20} />`,
    sources: [
      { filename: "NumberInput.jsx", code: numberInputJsx },
      { filename: "NumberInput.css", code: numberInputCss },
    ],
  },
  {
    id: "slider",
    name: "Slider",
    category: "Forms",
    description: "Range slider with tones, an optional value label and full keyboard support.",
    Demo: SliderDemo,
    usage: `import { useState } from "react";
import { Slider } from "@your-npm-username/viora";

const [volume, setVolume] = useState(60);

<Slider label="Volume" value={volume} onChange={setVolume} showValue />`,
    sources: [
      { filename: "Slider.jsx", code: sliderJsx },
      { filename: "Slider.css", code: sliderCss },
    ],
  },
  {
    id: "multi-select",
    name: "MultiSelect",
    category: "Forms",
    description: "Multi-value listbox with removable tag chips and keyboard navigation.",
    Demo: MultiSelectDemo,
    usage: `import { useState } from "react";
import { MultiSelect } from "@your-npm-username/viora";

const options = [
  { value: "js", label: "JavaScript" },
  { value: "ts", label: "TypeScript" },
];

const [langs, setLangs] = useState(["js"]);

<MultiSelect label="Languages" options={options} value={langs} onChange={setLangs} />`,
    sources: [
      { filename: "MultiSelect.jsx", code: multiSelectJsx },
      { filename: "MultiSelect.css", code: multiSelectCss },
    ],
  },
  {
    id: "time-picker",
    name: "TimePicker",
    category: "Forms",
    description: "Time input (24h) with a clock icon and a configurable minute step.",
    Demo: TimePickerDemo,
    usage: `import { useState } from "react";
import { TimePicker } from "@your-npm-username/viora";

const [time, setTime] = useState("09:30");

<TimePicker label="Meeting time" value={time} onChange={setTime} />`,
    sources: [
      { filename: "TimePicker.jsx", code: timePickerJsx },
      { filename: "TimePicker.css", code: timePickerCss },
    ],
  },
  {
    id: "color-picker",
    name: "ColorPicker",
    category: "Forms",
    description: "Popover with preset swatches, a native color input and a validated hex field.",
    Demo: ColorPickerDemo,
    usage: `import { useState } from "react";
import { ColorPicker } from "@your-npm-username/viora";

const [color, setColor] = useState("#6366f1");

<ColorPicker label="Accent color" value={color} onChange={setColor} />`,
    sources: [
      { filename: "ColorPicker.jsx", code: colorPickerJsx },
      { filename: "ColorPicker.css", code: colorPickerCss },
    ],
  },
  {
    id: "segmented-control",
    name: "SegmentedControl",
    category: "Forms",
    description: "Single-choice segmented button row following the APG radiogroup pattern.",
    Demo: SegmentedDemo,
    usage: `import { SegmentedControl } from "@your-npm-username/viora";

<SegmentedControl
  label="View"
  defaultValue="grid"
  options={[
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
  ]}
/>`,
    sources: [
      { filename: "SegmentedControl.jsx", code: segmentedJsx },
      { filename: "SegmentedControl.css", code: segmentedCss },
    ],
  },
  {
    id: "file-upload",
    name: "FileUpload",
    category: "Forms",
    description: "Drag-and-drop dropzone with accept filters and file size validation.",
    Demo: FileUploadDemo,
    usage: `import { useState } from "react";
import { FileUpload } from "@your-npm-username/viora";

const [files, setFiles] = useState([]);

<FileUpload label="Attachments" accept=".pdf,.png" files={files} onChange={setFiles} />`,
    sources: [
      { filename: "FileUpload.jsx", code: fileUploadJsx },
      { filename: "FileUpload.css", code: fileUploadCss },
    ],
  },
  {
    id: "label",
    name: "Label",
    category: "Forms",
    description: "Form label primitive with sizes and tones.",
    Demo: LabelDemo,
    usage: `import { Label } from "@your-npm-username/viora";

<Label size="lg">Email</Label>
<Label tone="primary">Required</Label>`,
    sources: [
      { filename: "Label.jsx", code: labelJsx },
      { filename: "Label.css", code: labelCss },
    ],
  },
  {
    id: "fieldset",
    name: "Fieldset",
    category: "Forms",
    description: "Groups related fields under a legend, with a shared disabled state.",
    Demo: FieldsetDemo,
    usage: `import { Fieldset, Input } from "@your-npm-username/viora";

<Fieldset legend="Shipping address">
  <Input label="Full name" />
  <Input label="City" />
</Fieldset>`,
    sources: [
      { filename: "Fieldset.jsx", code: fieldsetJsx },
      { filename: "Fieldset.css", code: fieldsetCss },
    ],
  },
];