import { site } from "@/data/site";

/** Where "Start a project" goes: WhatsApp if set, then email, then LinkedIn. */
export function primaryContact(): { href: string; label: string; external: boolean } {
  const { whatsapp, email, message } = site.contact;
  if (whatsapp) {
    return { href: `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, label: "Message me on WhatsApp", external: true };
  }
  if (email) {
    return { href: `mailto:${email}?subject=${encodeURIComponent("Website project")}&body=${encodeURIComponent(message)}`, label: "Email me", external: false };
  }
  return { href: site.social.linkedin, label: "Message me on LinkedIn", external: true };
}
