"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { mainNav, serviceLinks } from "@/content/navigation";
import { cssVar } from "@/lib/style";
import { ButtonLink } from "./ButtonLink";
import { DivisionKey } from "./DivisionKey";
import { Chevron } from "./Icons";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const menuId = useId();

  // Close menus whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Header style on scroll; hide when scrolling down, reveal when scrolling up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 480 && y > lastY + 4 ? true : y < lastY - 4 ? false : (h) => h);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape and outside-click handling.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (servicesOpen) {
        setServicesOpen(false);
        servicesBtnRef.current?.focus();
      }
      if (menuOpen) {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (servicesOpen && servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [servicesOpen, menuOpen]);

  const overlay = isHome && !scrolled && !menuOpen;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const servicesActive = pathname.startsWith("/services");

  return (
    <>
      <header
        className="site-header"
        data-overlay={overlay}
        data-menu-open={menuOpen}
        data-hidden={hidden && !menuOpen && !servicesOpen}
      >
        <div className="container header-inner">
          <Logo />
          <nav className="nav" aria-label="Main">
            <ul className="nav-list">
              <li
                className="dropdown"
                ref={servicesRef}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  ref={servicesBtnRef}
                  type="button"
                  className="nav-link"
                  aria-expanded={servicesOpen}
                  aria-controls={panelId}
                  data-active={servicesActive}
                  onClick={() => setServicesOpen((o) => !o)}
                >
                  Services <Chevron />
                </button>
                <div id={panelId} className="dropdown-panel" data-open={servicesOpen}>
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      tabIndex={servicesOpen ? 0 : -1}
                      aria-current={isActive(s.href) ? "page" : undefined}
                    >
                      <span className="num">
                        <DivisionKey slug={s.slug} />
                        {s.number}
                      </span>
                      <strong>{s.label}</strong>
                      <span>{s.summary}</span>
                    </Link>
                  ))}
                </div>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="nav-link" aria-current={isActive(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact" variant="primary" className="header-cta">
              Discuss Your Project
            </ButtonLink>
            <button
              ref={menuBtnRef}
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <span className="bars" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </nav>
        </div>
      </header>

      <div id={menuId} className="mobile-menu" data-open={menuOpen} inert={!menuOpen} aria-label="Mobile navigation">
        <div className="container mobile-menu-inner">
          <div>
            <p className="group-label">Services</p>
            <ul>
              {serviceLinks.map((s, i) => (
                <li key={s.href} style={cssVar("--i", i)}>
                  <Link href={s.href} aria-current={isActive(s.href) ? "page" : undefined}>
                    <span className="num">
                        <DivisionKey slug={s.slug} />
                        {s.number}
                      </span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="group-label">Company</p>
            <ul>
              {[...mainNav, { href: "/contact", label: "Contact" }].map((item, i) => (
                <li key={item.href} style={cssVar("--i", i + 4)}>
                  <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ButtonLink href="/contact" variant="primary">
            Discuss Your Project
          </ButtonLink>
        </div>
      </div>

      {!isHome && <div className="header-spacer" aria-hidden="true" />}
    </>
  );
}
