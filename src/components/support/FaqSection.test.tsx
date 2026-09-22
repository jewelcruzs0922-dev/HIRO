// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FaqSection from "./FaqSection";
import { faqs } from "@/lib/support";

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

describe("FaqSection", () => {
  it("renders all FAQ questions grouped by category", () => {
    render(<FaqSection />);
    for (const faq of faqs) {
      expect(screen.getByRole("button", { name: faq.q })).toBeInTheDocument();
    }
    expect(screen.getByText("Knowledge base")).toBeInTheDocument();
  });

  it("opens the first question by default and toggles on click", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    const first = screen.getByRole("button", { name: faqs[0].q });
    const second = screen.getByRole("button", { name: faqs[1].q });

    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(second).toHaveAttribute("aria-expanded", "false");

    await user.click(second);
    await waitFor(() => {
      expect(first).toHaveAttribute("aria-expanded", "false");
      expect(second).toHaveAttribute("aria-expanded", "true");
    });

    await user.click(second);
    await waitFor(() => {
      expect(second).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("keeps only one panel open at a time", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    const first = screen.getByRole("button", { name: faqs[0].q });
    const second = screen.getByRole("button", { name: faqs[1].q });

    await user.click(second);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: faqs[0].q })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });
});
