import Image from "next/image";
import { images, type SiteImage } from "@/content/images";
import { site } from "@/content/site";
import { delay } from "@/lib/style";
import { ButtonLink } from "./ButtonLink";

export function CtaBand({
  title = "Have a Project in Mind?",
  text = "Whether you're planning a renovation, a new home, a commercial fit-out, or exploring a development opportunity, let's talk about what comes next.",
  cta = "Start Your Enquiry",
  href = "/contact",
  image = images.ctaDefault,
}: {
  title?: string;
  text?: string;
  cta?: string;
  href?: string;
  image?: SiteImage;
}) {
  const { phone, email } = site.contact;
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="bg" data-parallax>
        <Image src={image.src} alt="" fill placeholder="blur" sizes="(max-width: 860px) 100vw, 50vw" />
      </div>
      <div className="container cta-inner">
        <div className="copy">
          <p className="eyebrow" data-reveal>
            Get in touch
          </p>
          <h2 id="cta-title" className="h-xl" data-reveal style={delay(80)}>
            {title}
          </h2>
          <p data-reveal style={delay(160)}>
            {text}
          </p>
          <div className="btn-row" data-reveal style={delay(240)}>
            <ButtonLink href={href} variant="primary">
              {cta}
            </ButtonLink>
            <ButtonLink href="/service-areas" variant="outline-light" arrow={false}>
              View Service Areas
            </ButtonLink>
          </div>
          {(phone || email) && (
            <p className="cta-contact" data-reveal style={delay(300)}>
              {phone && <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>}
              {email && <a href={`mailto:${email}`}>{email}</a>}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
