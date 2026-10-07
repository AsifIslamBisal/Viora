import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials derived from a name", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("derives initials from a single-word name", () => {
    render(<Avatar name="Ada" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("prefers the initials prop over the computed ones", () => {
    render(<Avatar name="Ada Lovelace" initials="A.L." />);
    expect(screen.getByText("A.L.")).toBeInTheDocument();
  });

  it("uses a first-letter fallback when initials are missing", () => {
    render(<Avatar name="Ada" initials="" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders an icon when no name or initials are given", () => {
    const { container } = render(<Avatar />);
    expect(container.querySelector(".viora-avatar__icon")).toBeInTheDocument();
  });

  it("exposes a labelled role img for initials avatars", () => {
    render(<Avatar name="Grace Hopper" />);
    expect(screen.getByRole("img", { name: "Grace Hopper" })).toBeInTheDocument();
  });

  it("renders an image with an alt when src is provided", () => {
    render(<Avatar src="/photo.png" alt="Member photo" />);
    expect(screen.getByRole("img", { name: "Member photo" })).toHaveAttribute(
      "src",
      "/photo.png"
    );
  });

  it("falls back to the name as the image alt", () => {
    render(<Avatar src="/photo.png" name="Grace Hopper" />);
    expect(screen.getByRole("img", { name: "Grace Hopper" })).toBeInTheDocument();
  });

  it("falls back to the default alt", () => {
    render(<Avatar src="/photo.png" />);
    expect(screen.getByRole("img", { name: "Avatar" })).toBeInTheDocument();
  });

  it.each(["sm", "md", "lg"])("applies the %s size class", (size) => {
    render(<Avatar name="Test User" size={size} />);
    expect(screen.getByRole("img", { name: "Test User" })).toHaveClass(
      `viora-avatar--${size}`
    );
  });

  it("assigns a deterministic tone class per name", () => {
    const { container, rerender } = render(<Avatar name="Alice" />);
    const first = container.querySelector(".viora-avatar").className;
    rerender(<Avatar name="Alice" />);
    expect(container.querySelector(".viora-avatar").className).toBe(first);
  });

  it("adds a status dot for online", () => {
    const { container } = render(<Avatar name="Ada" status="online" />);
    expect(container.querySelector(".viora-avatar")).toHaveClass(
      "viora-avatar--status-online"
    );
    expect(container.querySelector(".viora-avatar__status")).toBeInTheDocument();
  });

  it("adds a status dot for offline", () => {
    const { container } = render(<Avatar name="Ada" status="offline" />);
    expect(container.querySelector(".viora-avatar")).toHaveClass(
      "viora-avatar--status-offline"
    );
  });

  it("adds no status dot by default", () => {
    const { container } = render(<Avatar name="Ada" />);
    expect(
      container.querySelector(".viora-avatar__status")
    ).not.toBeInTheDocument();
  });

  it("merges custom className with component classes", () => {
    render(<Avatar name="Ada" className="custom-class" />);
    expect(screen.getByRole("img")).toHaveClass("viora-avatar", "custom-class");
  });

  it("forwards native attributes", () => {
    render(<Avatar name="Ada" data-testid="avatar" />);
    expect(screen.getByTestId("avatar")).toHaveClass("viora-avatar");
  });
});