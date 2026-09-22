"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  Lock,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useCart } from "@/components/cart";
import { formatEuro } from "@/lib/bikes";
import {
  emptyForm,
  fields,
  requiredFields,
  validate,
  type FieldKey,
  type FormValues,
} from "@/lib/checkout";
import { createOrderId, saveOrder } from "@/lib/orders";
import FieldInput from "./FieldInput";
import SectionCard from "./SectionCard";
import OrderSummary from "./OrderSummary";

export default function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [placing, setPlacing] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  const setField = (key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSaveFailed(false);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || placing) return;

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstError = requiredFields.find((f) => nextErrors[f.key]);
    if (firstError) {
      document.getElementById(`checkout-${firstError.key}`)?.focus();
      return;
    }

    setPlacing(true);
    setSaveFailed(false);
    try {
      await new Promise((r) => setTimeout(r, 700));

      const saved = saveOrder({
        id: createOrderId(),
        email: form.email.trim(),
        name: form.name.trim(),
        items: items.map((i) => ({
          label: i.label,
          qty: i.qty,
          unitPrice: i.unitPrice,
        })),
        total: subtotal,
        placedAt: new Date().toISOString(),
      });
      if (!saved) {
        setSaveFailed(true);
        return;
      }
      clearCart();
      router.push("/checkout/confirmation");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[560px] px-5 py-20 text-center sm:px-6">
        <span className="bg-forest/10 text-forest mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full">
          <Package size={26} strokeWidth={1.5} aria-hidden />
        </span>
        <h1 className="text-charcoal mb-3 text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-[-0.03em]">
          Your cart is empty
        </h1>
        <p className="text-charcoal/70 mb-7 text-[15px] leading-relaxed">
          Add a bike to your cart before checking out. Configure a model, pick a
          colour, and it will show up here.
        </p>
        <Button href="/#bikes" className="min-h-[48px]">
          Browse e-bikes
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1080px] px-5 py-10 sm:px-6 md:px-10 md:py-14">
      <div className="mb-8">
        <p className="text-forest mb-2 text-[12.5px] font-bold tracking-[0.16em] uppercase">
          Secure checkout
        </p>
        <h1 className="text-charcoal text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-[-0.03em]">
          Delivery details
        </h1>
      </div>

      <nav aria-label="Checkout progress" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 sm:gap-3">
          {[
            { label: "Cart", state: "done" as const },
            { label: "Details", state: "current" as const },
            { label: "Confirmation", state: "todo" as const },
          ].map((step, i) => (
            <li key={step.label} className="flex items-center gap-2 sm:gap-3">
              {i > 0 && (
                <span
                  className="bg-charcoal/15 hidden h-px w-6 sm:block sm:w-10"
                  aria-hidden
                />
              )}
              <span
                aria-current={step.state === "current" ? "step" : undefined}
                className={`inline-flex min-h-[32px] items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold ${
                  step.state === "current"
                    ? "bg-forest text-white"
                    : step.state === "done"
                      ? "bg-forest/12 text-forest"
                      : "bg-charcoal/6 text-charcoal/65"
                }`}
              >
                {step.state === "done" && (
                  <Check size={13} strokeWidth={2.5} aria-hidden />
                )}
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:gap-10">
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <SectionCard
            step="Step 1"
            title="Contact"
            icon={<Mail size={17} strokeWidth={1.7} />}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields
                .filter((f) => f.key === "email" || f.key === "phone")
                .map((field) => (
                  <FieldInput
                    key={field.key}
                    field={field}
                    value={form[field.key]}
                    error={errors[field.key]}
                    onChange={setField}
                  />
                ))}
            </div>
            <p className="text-charcoal/65 mt-3 text-[12.5px] leading-relaxed">
              We use email for order updates. In this demo nothing is sent or stored
              on a server.
            </p>
          </SectionCard>

          <SectionCard
            step="Step 2"
            title="Shipping address"
            icon={<MapPin size={17} strokeWidth={1.7} />}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields
                .filter(
                  (f) => f.key !== "email" && f.key !== "phone" && f.key !== "notes",
                )
                .map((field) => (
                  <FieldInput
                    key={field.key}
                    field={field}
                    value={form[field.key]}
                    error={errors[field.key]}
                    onChange={setField}
                  />
                ))}
            </div>
            <div className="mt-4">
              <label
                htmlFor="checkout-notes"
                className="text-charcoal mb-1.5 block text-[13px] font-semibold"
              >
                Delivery notes{" "}
                <span className="text-charcoal/65 font-normal">(optional)</span>
              </label>
              <textarea
                id="checkout-notes"
                name="notes"
                rows={3}
                autoComplete="off"
                placeholder="Door code, safe place, landmark…"
                value={form.notes}
                onChange={(e) => setField("notes", e.target.value)}
                className="border-charcoal/50 text-charcoal placeholder:text-charcoal/65 focus:border-forest min-h-[88px] w-full rounded-[8px] border bg-white px-4 py-3 text-[15px] transition-colors outline-none"
              />
            </div>
          </SectionCard>

          <SectionCard
            step="Step 3"
            title="Payment"
            icon={<Lock size={17} strokeWidth={1.7} />}
          >
            <div className="border-forest/25 bg-forest/6 rounded-[8px] border p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={18}
                  strokeWidth={1.7}
                  className="text-forest mt-0.5 shrink-0"
                  aria-hidden
                />
                <div>
                  <p className="text-charcoal text-[13.5px] font-semibold">
                    Simulated payment — demo mode
                  </p>
                  <p className="text-charcoal/70 mt-1 text-[13px] leading-relaxed">
                    Placing an order does not charge a card or call a payment API.
                    The order lives only in this browser tab’s session storage and
                    disappears when you close the tab.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2" aria-hidden>
              {["Visa", "Mastercard", "Apple Pay", "iDEAL"].map((method) => (
                <span
                  key={method}
                  className="border-charcoal/12 bg-paper text-charcoal/65 rounded-[6px] border px-2.5 py-1 text-[12px] font-medium"
                >
                  {method}
                </span>
              ))}
            </div>
            <p className="sr-only">
              Accepted payment methods include Visa, Mastercard, Apple Pay, and iDEAL
              (shown for demo only).
            </p>
          </SectionCard>

          <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
            {saveFailed && (
              <p
                role="alert"
                className="w-full rounded-[8px] border border-red-600/40 bg-red-600/5 px-4 py-3 text-[13.5px] font-medium text-red-700"
              >
                We couldn&apos;t save this order to this browser&apos;s session
                storage (private browsing may block it). Your cart is untouched —
                allow site data and try again.
              </p>
            )}
            <Button type="submit" className="w-full sm:w-auto" showArrow={!placing}>
              {placing ? "Placing order…" : `Place order · ${formatEuro(subtotal)}`}
            </Button>
            <Link
              href="/#bikes"
              className="text-charcoal/70 hover:text-charcoal inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium underline-offset-4 transition-colors hover:underline"
            >
              <ChevronLeft size={15} strokeWidth={1.8} aria-hidden />
              Continue shopping
            </Link>
          </div>
        </form>

        <OrderSummary />
      </div>
    </div>
  );
}
