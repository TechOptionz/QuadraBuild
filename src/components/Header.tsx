"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { mainNav, serviceLinks } from "@/content/navigation";
import { cssVar } from "@/lib/style";
import { ButtonLink } from "./ButtonLink";
import { divisionKeyStyle } from "./DivisionKey";
import { Arrow, Chevron } from "./Icons";
import { Logo } from "./Logo";
import { LogoSwitcher } from "./LogoSwitcher";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
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

  // The header gains a soft shadow once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open, and close it if the
  // viewport grows to the desktop layout.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const mq = matchMedia("(min-width: 1101px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => {
      document.documentElement.style.overflow = "";
      mq.removeEventListener("change", onChange);
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const servicesActive = pathname.startsWith("/services");

  return (
    <>
      <header className="site-header" data-scrolled={scrolled} data-menu-open={menuOpen}>
        <div className="container header-inner">
          <div className="brand">
            <Logo priority />
            <LogoSwitcher />
          </div>
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
                  <div className="dropdown-grid">
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="dropdown-item"
                        style={divisionKeyStyle(s.slug)}
                        tabIndex={servicesOpen ? 0 : -1}
                        aria-current={isActive(s.href) ? "page" : undefined}
                      >
                        <span className="num">{s.number}</span>
                        <span className="dropdown-item-body">
                          <strong>
                            {s.label} <Arrow />
                          </strong>
                          <span className="summary">{s.summary}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/contact" className="dropdown-foot" tabIndex={servicesOpen ? 0 : -1}>
                    <span>Not sure which service fits your project?</span>
                    <span className="dropdown-foot-cta">
                      Talk to our team <Arrow />
                    </span>
                  </Link>
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
            <ButtonLink href="/contact" variant="primary" className="header-cta" arrow={false}>
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
                    <span className="num">{s.number}</span>
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
    </>
  );
}
