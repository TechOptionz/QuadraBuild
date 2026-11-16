import { cssVar } from "@/lib/style";

/** Numbered timeline: horizontal on desktop, vertical on small screens. */
export function ProcessSteps({ steps, note }: { steps: { title: string; text: string }[]; note?: string }) {
  return (
    <>
      <ol className="process" data-reveal="fade" style={cssVar("--steps", steps.length)}>
        {steps.map((s, i) => (
          <li key={s.title} style={cssVar("--i", i)}>
            <span className="step-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="rail" aria-hidden="true" />
            <h3 className="h-sm">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      {note && <p className="process-note">{note}</p>}
    </>
  );
}
