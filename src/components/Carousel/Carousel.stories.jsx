import { Carousel } from "./Carousel";
import "./Carousel.stories.css";

const BANNERS = [
  <div className="viora-story-banner" key="a">
    <strong>Welcome</strong>
    <span>Get started with Viora today.</span>
  </div>,
  <div className="viora-story-banner viora-story-banner--teal" key="b">
    <strong>New components</strong>
    <span>Carousel, DataGrid and more shipped this release.</span>
  </div>,
  <div className="viora-story-banner viora-story-banner--indigo" key="c">
    <strong>Theme it</strong>
    <span>Full CSS variable theming across the library.</span>
  </div>,
];

export default {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    interval: { control: { type: "number", min: 1000, step: 500 } },
    initialSlide: { control: { type: "number", min: 0, step: 1 } },
  },
};

export const Basic = {
  render: () => (
    <Carousel ariaLabel="Promotions" initialSlide={1}>
      {BANNERS}
    </Carousel>
  ),
};

export const AutoPlay = {
  render: () => (
    <Carousel ariaLabel="Promotions" autoPlay interval={3000}>
      {BANNERS}
    </Carousel>
  ),
};

export const NoLoop = {
  render: () => (
    <Carousel ariaLabel="Promotions" loop={false}>
      {BANNERS}
    </Carousel>
  ),
};