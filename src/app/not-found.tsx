import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex min-h-screen flex-col items-center justify-center bg-[#F0EDE8] px-5 text-center"
    >
      <span className="mb-4 text-[13px] font-bold tracking-[0.2em] text-[#2F5D3A] uppercase">
        404
      </span>
      <h1 className="mb-3 text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold tracking-[-0.03em] text-[#1C1C1A]">
        Page not found
      </h1>
      <p className="mb-7 max-w-[360px] text-[15px] leading-relaxed text-[#1C1C1A]/70">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-[48px] items-center justify-center rounded-[8px] bg-[#4A7858] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#3F684C]"
      >
        Back to home
      </Link>
    </main>
  );
}
