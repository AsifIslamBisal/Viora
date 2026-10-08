import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AvatarGroup } from "./AvatarGroup";

const AVATARS = [
  { name: "Ada Lovelace" },
  { name: "Grace Hopper" },
  { name: "Katherine Johnson" },
  { name: "Alan Turing" },
  { name: "Linus Torvalds" },
];

describe("AvatarGroup", () => {
  it("renders all avatars when under the max", () => {
    render(<AvatarGroup avatars={AVATARS.slice(0, 3)} max={4} />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Grace Hopper" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Katherine Johnson" })).toBeInTheDocument();
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it("shows the requested number of avatars plus an overflow count", () => {
    render(<AvatarGroup avatars={AVATARS} max={2} />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Grace Hopper" })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Katherine Johnson" })).not.toBeInTheDocument();
    expect(screen.getByText("+3")).toBeInTheDocument();
  });

  it("labels the overflow for assistive technology", () => {
    render(<AvatarGroup avatars={AVATARS} max={2} />);
    expect(screen.getByLabelText("3 more")).toBeInTheDocument();
  });

  it("defaults to max of four", () => {
    render(<AvatarGroup avatars={AVATARS} />);
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("passes the size to each avatar", () => {
    render(<AvatarGroup avatars={AVATARS.slice(0, 2)} size="lg" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveClass(
      "viora-avatar--lg"
    );
  });

  it("uses the lg overflow style for a large group", () => {
    render(<AvatarGroup avatars={AVATARS} max={2} size="lg" />);
    expect(screen.getByText("+3")).toHaveClass(
      "viora-avatar-group__overflow--lg"
    );
  });

  it("renders avatars from src with their alt", () => {
    render(
      <AvatarGroup avatars={[{ name: "Ada", src: "/ada.jpg" }]} />
    );
    expect(screen.getByRole("img", { name: "Ada" })).toHaveAttribute(
      "src",
      "/ada.jpg"
    );
  });

  it("passes through status dots", () => {
    render(
      <AvatarGroup
        avatars={[{ name: "Ada", status: "online" }]}
        max={5}
      />
    );
    expect(screen.getByRole("img", { name: "Ada" }).closest(".viora-avatar")).toHaveClass(
      "viora-avatar--status-online"
    );
  });

  it("renders an empty group without overflow", () => {
    render(<AvatarGroup avatars={[]} />);
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
  });

  it("merges custom className with component classes", () => {
    render(<AvatarGroup avatars={AVATARS.slice(0, 1)} className="custom-class" />);
    expect(screen.getByRole("list")).toHaveClass(
      "viora-avatar-group",
      "custom-class"
    );
  });

  it("forwards native attributes", () => {
    render(<AvatarGroup avatars={[]} data-testid="group" />);
    expect(screen.getByTestId("group")).toHaveClass("viora-avatar-group");
  });
});