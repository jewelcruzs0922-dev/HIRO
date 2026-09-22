"use client";

import { useSyncExternalStore } from "react";

function workshopOpenNow(): boolean {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Amsterdam",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
    const weekdayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(weekday);
    if (weekdayIndex < 0) return false;
    return hour >= 9 && hour < 18;
  } catch {
    return true;
  }
}

function subscribeWorkshopClock(onChange: () => void): () => void {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

export default function WorkshopStatusCard() {
  const open = useSyncExternalStore(
    subscribeWorkshopClock,
    workshopOpenNow,
    () => true,
  );

  return (
    <div className="w-full rounded-[16px] border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm sm:p-6 lg:w-[320px]">
      <div className="mb-4 flex items-center gap-2.5">
        <span
          className={`h-2.5 w-2.5 rounded-full ${open ? "bg-cta" : "bg-white/40"}`}
          aria-hidden
        />
        <span
          suppressHydrationWarning
          className="text-[15.5px] font-semibold text-white"
        >
          {open ? "Workshop open now" : "Workshop closed"}
        </span>
      </div>
      <dl className="space-y-3.5">
        <div className="border-t border-white/10 pt-3.5">
          <dt className="text-[14.5px] font-semibold tracking-[0.08em] text-white/65 uppercase">
            Hours
          </dt>
          <dd className="mt-1 text-[16.5px] font-medium text-white">
            Mon–Fri, 9:00–18:00 CET
          </dd>
        </div>
        <div className="border-t border-white/10 pt-3.5">
          <dt className="text-[14.5px] font-semibold tracking-[0.08em] text-white/65 uppercase">
            Typical first reply
          </dt>
          <dd className="mt-1 text-[16.5px] font-medium text-white">
            Under 24 hours
          </dd>
        </div>
      </dl>
    </div>
  );
}
