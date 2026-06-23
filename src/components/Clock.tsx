"use client";

import { useEffect, useState } from "react";

function utcStamp(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ` +
    `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}Z`
  );
}

/**
 * Live UTC mission clock. Renders a stable placeholder on the server and first
 * client paint, then ticks once mounted — avoids any hydration mismatch.
 */
export default function Clock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setNow(utcStamp(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className={`mono tabular-nums ${className}`} suppressHydrationWarning>
      {now ?? "---------- --:--:--Z"}
    </time>
  );
}
