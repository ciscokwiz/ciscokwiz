import Image from "next/image";

/** A screenshot inside a minimal browser window, with the site's address. */
export function Browser({
  src,
  url,
  alt = "",
  sizes,
  priority = false,
  full = false,
}: {
  src: string;
  url: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  full?: boolean;
}) {
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "preview";
  return (
    <div className={`browser${full ? " full" : ""}`}>
      <div className="browser-bar" aria-hidden="true">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">
          https://<b>{host}</b>
        </span>
      </div>
      <Image src={src} alt={alt} width={1440} height={900} sizes={sizes} priority={priority} />
    </div>
  );
}
