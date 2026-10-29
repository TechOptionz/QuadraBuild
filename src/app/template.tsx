/** Re-mounts on navigation, giving each page a gentle entrance transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
