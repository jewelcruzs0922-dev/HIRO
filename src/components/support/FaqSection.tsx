"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { faqGroups } from "@/lib/support";
import Overline from "./Overline";

function faqDomId(q: string) {
  return `faq-${q
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

export default function FaqSection() {
  const [openQ, setOpenQ] = useState<string | null>(
    faqGroups[0]?.items[0]?.q ?? null,
  );

  return (
    <section id="faq" className="scroll-mt-20 bg-white" aria-label="FAQ">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,360px)_1fr] md:gap-12 lg:gap-16">
          <Reveal>
            <div className="md:sticky md:top-28 md:self-start">
              <Overline>Knowledge base</Overline>
              <h2 className="text-charcoal mb-4 text-[clamp(1.5rem,4vw,2.1rem)] leading-[1.15] font-extrabold tracking-[-0.025em]">
                Frequently asked,
                <br />
                fully answered.
              </h2>
              <p className="text-charcoal/75 mb-7 text-[17px] leading-[1.7]">
                Eight questions cover most of what riders ask, grouped by topic. If
                yours isn&apos;t here, the contact form below reaches a real person
                within one business day.
              </p>
              <Button
                href="#contact"
                variant="outline"
                className="min-h-[52px] text-[16px]!"
              >
                Ask a question
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-9">
              {faqGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-forest mb-3 flex items-center gap-3 text-[14px] font-bold tracking-[0.16em] uppercase">
                    <span aria-hidden className="bg-cta h-2 w-2 rounded-full" />
                    {group.category}
                  </h3>
                  <div className="space-y-3">
                    {group.items.map((faq) => {
                      const isOpen = openQ === faq.q;
                      const id = faqDomId(faq.q);
                      return (
                        <div
                          key={faq.q}
                          className={`overflow-hidden rounded-[16px] border transition-colors ${
                            isOpen
                              ? "border-cta/35 shadow-card"
                              : "border-charcoal/10 bg-canvas hover:border-charcoal/25"
                          }`}
                        >
                          <h4>
                            <button
                              type="button"
                              id={`faq-trigger-${id}`}
                              aria-expanded={isOpen}
                              aria-controls={`faq-panel-${id}`}
                              onClick={() => setOpenQ(isOpen ? null : faq.q)}
                              className="text-charcoal hover:text-forest flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[17px] leading-snug font-semibold transition-colors sm:px-6 sm:py-6 sm:text-[18px]"
                            >
                              {faq.q}
                              <span
                                aria-hidden
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                                  isOpen
                                    ? "bg-cta text-white"
                                    : "bg-charcoal/8 text-charcoal/60"
                                }`}
                              >
                                <ChevronDown
                                  size={18}
                                  strokeWidth={2.2}
                                  className={`transition-transform duration-300 ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </span>
                            </button>
                          </h4>
                          <div
                            id={`faq-panel-${id}`}
                            role="region"
                            aria-labelledby={`faq-trigger-${id}`}
                            hidden={!isOpen}
                            className="border-charcoal/10 border-t bg-white px-5 py-5 sm:px-6 sm:py-6"
                          >
                            <p className="text-charcoal/80 text-[16.5px] leading-[1.8] sm:text-[17px]">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
