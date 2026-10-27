import { primaryContact } from "@/lib/contact";

export function ContactButton({ label, className = "btn btn-primary" }: { label?: string; className?: string }) {
  const c = primaryContact();
  return (
    <a className={className} href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {label ?? c.label}
    </a>
  );
}
