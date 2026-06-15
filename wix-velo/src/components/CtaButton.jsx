import { Link } from "react-router-dom";

export default function CtaButton({ to, href, variant = "primary", children, external, onClick }) {
  const className = `button ${variant === "ghost" ? "button--ghost" : ""}`;

  if (href) {
    return (
      <a
        className={className}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={to} onClick={onClick}>
      {children}
    </Link>
  );
}
