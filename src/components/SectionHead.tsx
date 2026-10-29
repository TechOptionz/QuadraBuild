import { delay } from "@/lib/style";

export function SectionHead({
  eyebrow,
  title,
  children,
  stack = false,
  titleClass = "h-xl",
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  stack?: boolean;
  titleClass?: string;
  id?: string;
}) {
  return (
    <div className={`section-head ${stack ? "section-head--stack" : ""}`}>
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
