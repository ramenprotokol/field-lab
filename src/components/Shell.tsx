"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections, site, type Section } from "@/lib/site";
import { sectionBySlug } from "@/lib/site";
import { toneColor, toneGlow } from "@/lib/theme";
import Reticle from "./Reticle";
import Clock from "./Clock";

function currentSlug(pathname: string): string {
  return pathname.split("/").filter(Boolean)[0] ?? "";
}

function NavItem({ item, active }: { item: Section; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`flex w-full items-center gap-2.5 rounded-md border px-2 py-2.5 text-left transition-colors ${
        active
          ? "border-[#23332a] bg-gradient-to-r from-accent/10 to-accent/[0.02] text-fg"
          : "border-transparent text-muted hover:bg-white/[0.03] hover:text-fg-2"
      }`}
    >
      <span
        className="mono w-5 flex-none text-left text-[11px]"
        style={{ color: active ? toneColor.ok : "#767d81" }}
      >
        {item.code}
      </span>
      <span className="flex-1 text-left text-[13.5px] font-medium">{item.label}</span>
      <span
        aria-hidden
        className="h-1.5 w-1.5 flex-none rounded-full"
        style={{ background: toneColor[item.status], boxShadow: `0 0 6px ${toneGlow[item.status]}` }}
      />
    </Link>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slug = currentSlug(pathname);
  const meta = sectionBySlug(slug);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const asideRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Track the < 900px drawer breakpoint (matches the CSS), so off-canvas nav
  // can be made inert on mobile while the page content is inert when it's open.
  // Crossing up to desktop force-closes the drawer — otherwise an open drawer
  // would leave body scroll locked with no visible toggle to release it.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const update = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Drawer dialog behaviour: lock scroll, move focus in on open, restore it to
  // the toggle on close, and close on Escape.
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    // Capture the stable drawer/toggle nodes for use in cleanup.
    const aside = asideRef.current;
    const hamburger = hamburgerRef.current;
    aside?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      // Return focus to the toggle if it still lived inside the closing drawer.
      if (aside?.contains(document.activeElement)) {
        hamburger?.focus();
      }
    };
  }, [menuOpen]);

  // While the drawer is open on mobile, the page content is inert (focus stays
  // trapped in the drawer + overlay); while it's closed on mobile, the
  // off-canvas nav is inert so keyboard users don't tab through hidden links.
  const contentInert = isMobile && menuOpen;
  const navInert = isMobile && !menuOpen;

  return (
    <div className="grid-bg min-h-screen">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* ----------------------------- Sidebar ----------------------------- */}
      <aside
        ref={asideRef}
        id="nav"
        aria-label="Sections"
        inert={navInert}
        className={`fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col border-r border-line bg-panel-2 transition-[transform,visibility] duration-[260ms] ease-[cubic-bezier(.4,0,.2,1)] ${
          menuOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        } min-[900px]:visible min-[900px]:translate-x-0`}
      >
        <div className="flex items-center gap-[11px] border-b border-line px-[18px] pb-[18px] pt-5">
          <Reticle />
          <div className="leading-[1.1]">
            <div className="font-display text-[13px] font-bold tracking-[0.02em] text-fg">
              {site.name}
            </div>
            <div className="mono mt-0.5 text-[9.5px] tracking-[0.34em] text-accent">
              {site.unit}
            </div>
          </div>
        </div>

        <div className="px-3.5 pb-2 pt-3.5">
          <div className="mono px-1.5 pb-2 text-[9.5px] tracking-[0.22em] text-dim-2">
            SECTIONS
          </div>
          <nav className="flex flex-col gap-0.5">
            {sections.map((item) => (
              <NavItem key={item.href} item={item} active={item.slug === slug} />
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-line p-3.5">
          <div className="mono flex items-center justify-between text-[10px] tracking-[0.08em] text-dim-2">
            <span>BUILD {site.build}</span>
            <span className="text-accent">● ONLINE</span>
          </div>
          <div className="mono mt-1.5 text-[10px] tracking-[0.06em] text-dim-3">{site.coords}</div>
        </div>
      </aside>

      {/* Mobile drawer overlay */}
      {isMobile && menuOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-[rgba(5,6,7,0.62)] backdrop-blur-[1px] min-[900px]:hidden"
        />
      ) : null}

      {/* ------------------------------ Main ------------------------------- */}
      <div className="min-h-screen min-[900px]:ml-[248px]" inert={contentInert}>
        <header className="sticky top-0 z-30 flex h-[54px] items-center gap-3.5 border-b border-line bg-ink/[0.86] px-5 backdrop-blur-[10px]">
          <button
            ref={hamburgerRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav"
            onClick={() => setMenuOpen((v) => !v)}
            className="-ml-2 flex h-11 w-11 flex-col items-center justify-center gap-[3px] rounded border border-line-2 bg-[#0f1315] min-[900px]:hidden"
          >
            <span className="h-[1.5px] w-[15px] bg-[#9aa1a5]" />
            <span className="h-[1.5px] w-[15px] bg-[#9aa1a5]" />
            <span className="h-[1.5px] w-[15px] bg-[#9aa1a5]" />
          </button>

          <div className="flex min-w-0 items-baseline gap-[9px]">
            <span className="mono text-[11px] tracking-[0.1em] text-accent">{meta.code}</span>
            <span className="truncate font-display text-[15px] font-semibold text-fg">
              {meta.label}
            </span>
          </div>

          <div className="flex-1" />

          <div className="mono flex items-center gap-2 whitespace-nowrap text-[11px] tracking-[0.04em] text-dim">
            <span className="h-[7px] w-[7px] animate-blink rounded-full bg-accent shadow-[0_0_7px_#3fb95099]" />
            <span className="hidden text-muted min-[560px]:inline">SYSTEMS NOMINAL</span>
            <span className="hidden text-line-2 min-[560px]:inline">·</span>
            <Clock />
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-[22px]">
          <div className="mono text-[10.5px] tracking-[0.06em] text-dim-2">
            RAMEN PROTOKOL · FIELD LAB — AI-ASSISTED DELIVERY, TESTED IN PUBLIC
          </div>
          <div className="mono text-[10.5px] tracking-[0.06em] text-dim-3">
            © 2026 · {site.station} · ALL EVIDENCE PUBLIC
          </div>
        </footer>
      </div>
    </div>
  );
}
