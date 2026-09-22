"use client";

import { useState, type FormEvent } from "react";
import { Check, Clock, Mail, MapPin, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Overline from "./Overline";

const topics = [
  "Order & delivery",
  "Technical issue",
  "Warranty claim",
  "Service booking",
  "Something else",
] as const;

type FormState = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  topic: topics[0],
  message: "",
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "support@hiro.bike",
    detail: "Best for orders, warranty, and anything that needs a paper trail.",
    href: "mailto:support@hiro.bike",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri, 9:00–18:00 CET",
    detail: "Real humans during hours — no phone trees, no bots.",
  },
  {
    icon: MapPin,
    label: "Workshop",
    value: "Amsterdam, NL",
    detail: "Visits by appointment — bring your order ID.",
  },
];

const fieldClass =
  "bg-canvas border-charcoal/15 focus:border-cta text-charcoal placeholder:text-charcoal/45 min-h-[52px] w-full rounded-[10px] border px-4 text-[16.5px] transition-colors outline-none";

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.email.trim()) {
      next.email = "We need an email to reply to.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "That email doesn't look right.";
    }
    if (form.message.trim().length < 10) {
      next.message = "A few more details help us help you (10+ characters).";
    }
    return next;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    const firstKey = (["name", "email", "message"] as const).find((k) => next[k]);
    if (firstKey) {
      document.getElementById(`support-${firstKey}`)?.focus();
      return;
    }

    const subject = `[${form.topic}] Support request — ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Topic: ${form.topic}`,
      "",
      form.message.trim(),
    ].join("\n");
    window.location.href = `mailto:support@hiro.bike?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="bg-cream scroll-mt-20" aria-label="Contact">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <Reveal>
          <div className="mb-9 max-w-[600px] sm:mb-11">
            <Overline>Contact</Overline>
            <h2 className="text-charcoal mb-4 text-[clamp(1.5rem,4vw,2.1rem)] leading-[1.15] font-extrabold tracking-[-0.025em]">
              Still stuck? We&apos;re one message away.
            </h2>
            <p className="text-charcoal/75 text-[17px] leading-[1.7]">
              Tell us what&apos;s going on and we&apos;ll get back to you within one
              business day — usually much sooner. Prefer email? Write to{" "}
              <a
                href="mailto:support@hiro.bike"
                className="text-cta hover:text-cta-hover font-semibold underline underline-offset-4"
              >
                support@hiro.bike
              </a>{" "}
              anytime.
            </p>
          </div>
        </Reveal>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {channels.map((ch, i) => (
            <Reveal key={ch.label} delay={i * 0.06}>
              <div className="border-charcoal/10 flex h-full flex-col rounded-[18px] border bg-white p-5 sm:p-6">
                <span className="bg-cta/10 text-cta mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[12px]">
                  <ch.icon size={20} strokeWidth={1.7} aria-hidden />
                </span>
                <p className="text-charcoal/50 mb-1 text-[14px] font-bold tracking-[0.12em] uppercase">
                  {ch.label}
                </p>
                {ch.href ? (
                  <a
                    href={ch.href}
                    className="text-charcoal hover:text-cta mb-2 text-[17px] font-bold tracking-[-0.01em] transition-colors"
                  >
                    {ch.value}
                  </a>
                ) : (
                  <p className="text-charcoal mb-2 text-[17px] font-bold tracking-[-0.01em]">
                    {ch.value}
                  </p>
                )}
                <p className="text-charcoal/70 mt-auto text-[16px] leading-[1.55]">
                  {ch.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="border-charcoal/12 shadow-card overflow-hidden rounded-[20px] border bg-white">
            <div className="bg-ink flex flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-8 sm:py-6">
              <div>
                <h3 className="text-[19px] font-bold text-white">Send a message</h3>
                <p className="mt-1 text-[16px] text-white/70">
                  Opens your email app — nothing is stored here.
                </p>
              </div>
              <p className="text-[15.5px] font-semibold text-white/55">
                Reply within 24 hours
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {sent ? (
                <div
                  className="flex min-h-[320px] flex-col items-start justify-center"
                  role="status"
                >
                  <span className="bg-cta/10 text-cta mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full">
                    <Check size={28} strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="text-charcoal mb-3 text-[22px] font-extrabold tracking-[-0.02em]">
                    Your email app is opening
                  </h3>
                  <p className="text-charcoal/80 mb-2 max-w-[460px] text-[17px] leading-[1.7]">
                    We&apos;ve drafted your message to support@hiro.bike — hit send
                    there and we&apos;ll reply within one business day.
                  </p>
                  <p className="text-charcoal/65 mb-6 max-w-[460px] text-[16px] leading-[1.65]">
                    Nothing opened? Email us directly at{" "}
                    <a
                      href="mailto:support@hiro.bike"
                      className="text-cta font-semibold underline underline-offset-4"
                    >
                      support@hiro.bike
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm(emptyForm);
                    }}
                    className="text-charcoal/75 hover:text-charcoal min-h-[48px] text-[16px] font-semibold underline underline-offset-4 transition-colors"
                  >
                    Write another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="support-name"
                        className="text-charcoal mb-2 block text-[16px] font-semibold"
                      >
                        Name
                      </label>
                      <input
                        id="support-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "support-name-error" : undefined
                        }
                        className={fieldClass}
                        placeholder="Alex Rider"
                      />
                      {errors.name && (
                        <p
                          id="support-name-error"
                          className="mt-2 text-[15px] font-medium text-red-700"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="support-email"
                        className="text-charcoal mb-2 block text-[16px] font-semibold"
                      >
                        Email
                      </label>
                      <input
                        id="support-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "support-email-error" : undefined
                        }
                        className={fieldClass}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p
                          id="support-email-error"
                          className="mt-2 text-[15px] font-medium text-red-700"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="support-topic"
                      className="text-charcoal mb-2 block text-[16px] font-semibold"
                    >
                      Topic
                    </label>
                    <select
                      id="support-topic"
                      value={form.topic}
                      onChange={(e) => setField("topic", e.target.value)}
                      className={fieldClass}
                    >
                      {topics.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="support-message"
                      className="text-charcoal mb-2 block text-[16px] font-semibold"
                    >
                      Message
                    </label>
                    <textarea
                      id="support-message"
                      rows={6}
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "support-message-error" : undefined
                      }
                      className="bg-canvas border-charcoal/15 focus:border-cta text-charcoal placeholder:text-charcoal/45 w-full resize-y rounded-[10px] border px-4 py-3 text-[16.5px] leading-[1.65] transition-colors outline-none"
                      placeholder="Order ID (if you have one), what's happening, and what you've already tried…"
                    />
                    {errors.message && (
                      <p
                        id="support-message-error"
                        className="mt-2 text-[15px] font-medium text-red-700"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Button type="submit" className="min-h-[52px] text-[16px]!">
                      <Send size={17} strokeWidth={1.9} aria-hidden />
                      Send message
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
