import { ButtonLink } from "@/components/ButtonLink";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container not-found">
        <LogoMark className="not-found-mark" />
        <p className="eyebrow eyebrow--accent">404 — Page not found</p>
        <h1 className="h-xl">This page isn&apos;t part of the plan.</h1>
        <p className="lead">The page you&apos;re looking for may have moved or no longer exists.</p>
        <div className="btn-row">
          <ButtonLink href="/" variant="primary">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
