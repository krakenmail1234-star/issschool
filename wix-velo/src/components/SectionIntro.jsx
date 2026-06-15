export default function SectionIntro({ badge, title, subtitle, lead }) {
  return (
    <div className="section__head">
      {badge && (
        <div className="badge">
          <span className="badge__dot" aria-hidden="true" />
          <span>{badge}</span>
        </div>
      )}
      {title && <h1 className="h1">{title}</h1>}
      {lead && <p className="lead" style={{ fontWeight: 600, color: "var(--text)" }}>{lead}</p>}
      {subtitle && <p className="sublead">{subtitle}</p>}
    </div>
  );
}
