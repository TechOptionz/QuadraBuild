import { delay } from "@/lib/style";

export function SectionHead({
  eyebrow,
  title,
  children,
  stack = false,
  align = "split",
  titleClass = "h-xl",
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  stack?: boolean;
  /** `split`: title left, intro right (default). `center`: both centred in one column. */
  align?: "split" | "center";
  titleClass?: string;
  id?: string;
}) {
  return (
    <div className={`section-head ${stack ? "section-head--stack" : ""} ${align === "center" ? "section-head--center" : ""}`.replace(/\s+/g, " ").trim()}>
      <div>
        {eyebrow && (
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
        )}
        <h2 className={titleClass} id={id} data-reveal style={delay(80)}>
          {title}
        </h2>
      </div>
      {children && (
        <div className="lead" data-reveal style={delay(160)}>
          {children}
        </div>
      )}
    </div>
  );
}
