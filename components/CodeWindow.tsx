/* The hero graphic: a brand written as code, then built and shipped.
   Static markup, no JS. Swatches are this site's own brass and greys. */

const lines: React.ReactNode[] = [
  <span className="tk-c">{"// built with you. no templates."}</span>,
  <>
    <span className="tk-k">export const</span> <span className="tk-p">brand</span> = {"{"}
  </>,
  <>
    {"  "}name: <span className="tk-s">&quot;Your Business&quot;</span>,
  </>,
  <>
    {"  "}story: <span className="tk-s">&quot;told your way&quot;</span>,
  </>,
  <>
    {"  "}colours: [<span className="tk-sw" style={{ background: "#d1ad66" }} />
    <span className="tk-s">&quot;yours&quot;</span>, <span className="tk-sw" style={{ background: "#3c3f45" }} />
    <span className="tk-s">&quot;exactly&quot;</span>],
  </>,
  <>
    {"  "}type: <span className="tk-s">&quot;picked for your crowd&quot;</span>,
  </>,
  <>
    {"  "}signature: <span className="tk-s">&quot;what people remember&quot;</span>,
  </>,
  <>
    {"  "}contact: <span className="tk-s">&quot;one tap, WhatsApp&quot;</span>,
  </>,
  <>{"};"}</>,
];

export function CodeWindow() {
  return (
    <figure className="code-window" aria-label="Illustration: a brand described as code, then built and deployed">
      <div className="code-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="code-tab">
          your-brand.ts <span>— studio</span>
        </span>
      </div>
      <div className="code-body" aria-hidden="true">
        <pre>
          {lines.map((l, i) => (
            <span className="ln" key={i}>
              {l}
            </span>
          ))}
        </pre>
      </div>
      <div className="term" aria-hidden="true">
        <span className="cmd">npm run build</span>
        <span className="ok">design approved by you</span>
        <span className="ok">checked from 360px phones to desktop</span>
        <span className="ok">fast on mobile data · ready for Google</span>
        <span className="live">
          → live at <b>yourbusiness.com</b>
        </span>
      </div>
    </figure>
  );
}
