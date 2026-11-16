/**
 * Abstract service-area graphic: survey rings centred on Brisbane. It is
 * deliberately not a real map, so it implies no specific suburbs or boundaries.
 */
export function AreaMap({ className = "" }: { className?: string }) {
  const grid = Array.from({ length: 9 }, (_, i) => 40 * (i + 1));
  return (
    <div className={`area-map ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none">
        <g className="area-map-grid">
          {grid.map((p) => (
            <path key={p} d={`M${p} 0V400M0 ${p}H400`} />
          ))}
        </g>
        <circle className="area-map-ring area-map-ring--outer" cx="200" cy="200" r="168" />
        <circle className="area-map-ring" cx="200" cy="200" r="112" />
        <circle className="area-map-ring area-map-ring--inner" cx="200" cy="200" r="56" />
        <circle className="area-map-halo" cx="200" cy="200" r="22" />
        <circle className="area-map-pin" cx="200" cy="200" r="7" />
        <text className="area-map-label" x="232" y="197">
          Brisbane
        </text>
        <text className="area-map-sub" x="232" y="214">
          QLD
        </text>
        <text className="area-map-sub" x="200" y="388" textAnchor="middle">
          SOUTH EAST QUEENSLAND
        </text>
      </svg>
    </div>
  );
}
