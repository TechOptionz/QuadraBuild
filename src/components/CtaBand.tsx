import Image from "next/image";
import { images, type SiteImage } from "@/content/images";
import { delay } from "@/lib/style";
import { ButtonLink } from "./ButtonLink";

export function CtaBand({
  title = "Have a Project in Mind?",
  text = "Whether you're planning a renovation, a new home, a commercial fit-out, or exploring a development opportunity, let's talk about what comes next.",
  cta = "Start Your Enquiry",
  href = "/contact",
  image = images.bedroom,
}: {
  title?: string;
  text?: string;
  cta?: string;
  href?: string;
  image?: SiteImage;
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="bg">
        <Image src={image.src} alt="" fill placeholder="blur" sizes="100vw" />
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
        </div>
        <div className="btn-row" data-reveal style={delay(240)}>
          <ButtonLink href={href} variant="primary">
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
