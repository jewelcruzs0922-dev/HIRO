// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactSection from "./ContactSection";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/ui/Reveal", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("ContactSection", () => {
  it("renders channel tiles and the form", () => {
    render(<ContactSection />);
    expect(screen.getAllByText("support@hiro.bike").length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/please tell us your name/i)).toBeInTheDocument();
    expect(screen.getByText(/we need an email to reply to/i)).toBeInTheDocument();
    expect(screen.getByText(/10\+ characters/i)).toBeInTheDocument();
  });

  it("clears a field error when the user edits that field", async () => {
    const user = userEvent.setup();
    render(<ContactSection />);

    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/please tell us your name/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/name/i), "Alex");
    expect(screen.queryByText(/please tell us your name/i)).not.toBeInTheDocument();
  });
});
