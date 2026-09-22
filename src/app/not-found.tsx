import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="bg-featured flex min-h-screen flex-col items-center justify-center px-5 text-center"
    >
      <span className="text-forest mb-4 text-[13px] font-bold tracking-[0.2em] uppercase">
        404
      </span>
      <h1 className="text-charcoal mb-3 text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold tracking-[-0.03em]">
        Page not found
      </h1>
      <p className="text-charcoal/70 mb-7 max-w-[360px] text-[15px] leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="bg-cta hover:bg-cta-hover inline-flex min-h-[48px] items-center justify-center rounded-[8px] px-6 py-3 text-[14px] font-medium text-white transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
