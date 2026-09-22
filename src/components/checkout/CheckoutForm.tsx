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

  const setField = (key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
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
    await new Promise((r) => setTimeout(r, 700));

    saveOrder({
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
    clearCart();
    setPlacing(false);
    router.push("/checkout/confirmation");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[560px] px-5 py-20 text-center sm:px-6">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#2F5D3A]/10 text-[#2F5D3A]">
          <Package size={26} strokeWidth={1.5} aria-hidden />
        </span>
        <h1 className="mb-3 text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#1C1C1A]">
          Your cart is empty
        </h1>
        <p className="mb-7 text-[15px] leading-relaxed text-[#1C1C1A]/70">
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
        <p className="mb-2 text-[12.5px] font-bold tracking-[0.16em] text-[#2F5D3A] uppercase">
          Secure checkout
        </p>
        <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#1C1C1A]">
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
                  className="hidden h-px w-6 bg-[#1C1C1A]/15 sm:block sm:w-10"
                  aria-hidden
                />
              )}
              <span
                aria-current={step.state === "current" ? "step" : undefined}
                className={`inline-flex min-h-[32px] items-center gap-1.5 rounded-full px-3 text-[12.5px] font-semibold ${
                  step.state === "current"
                    ? "bg-[#2F5D3A] text-white"
                    : step.state === "done"
                      ? "bg-[#2F5D3A]/12 text-[#2F5D3A]"
                      : "bg-[#1C1C1A]/6 text-[#1C1C1A]/65"
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
            <p className="mt-3 text-[12.5px] leading-relaxed text-[#1C1C1A]/65">
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
                className="mb-1.5 block text-[13px] font-semibold text-[#1C1C1A]"
              >
                Delivery notes{" "}
                <span className="font-normal text-[#1C1C1A]/65">(optional)</span>
              </label>
              <textarea
                id="checkout-notes"
                name="notes"
                rows={3}
                autoComplete="off"
                placeholder="Door code, safe place, landmark…"
                value={form.notes}
                onChange={(e) => setField("notes", e.target.value)}
                className="min-h-[88px] w-full rounded-[8px] border border-[#1C1C1A]/20 bg-white px-4 py-3 text-[15px] text-[#1C1C1A] transition-colors outline-none placeholder:text-[#1C1C1A]/65 focus:border-[#2F5D3A]"
              />
            </div>
          </SectionCard>

          <SectionCard
            step="Step 3"
            title="Payment"
            icon={<Lock size={17} strokeWidth={1.7} />}
          >
            <div className="rounded-[8px] border border-[#2F5D3A]/25 bg-[#2F5D3A]/6 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={18}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0 text-[#2F5D3A]"
                  aria-hidden
                />
                <div>
                  <p className="text-[13.5px] font-semibold text-[#1C1C1A]">
                    Simulated payment — demo mode
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#1C1C1A]/70">
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
                  className="rounded-[6px] border border-[#1C1C1A]/12 bg-[#F7F5F1] px-2.5 py-1 text-[12px] font-medium text-[#1C1C1A]/65"
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
            <Button type="submit" className="w-full sm:w-auto" showArrow={!placing}>
              {placing ? "Placing order…" : `Place order · ${formatEuro(subtotal)}`}
            </Button>
            <Link
              href="/#bikes"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium text-[#1C1C1A]/70 underline-offset-4 transition-colors hover:text-[#1C1C1A] hover:underline"
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
