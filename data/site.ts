/* =====================================================================
   SITE DETAILS — the file you will edit most.
   Change the words between the quotes, save, and the whole site updates.
   Leave a value as "" to hide it everywhere.
   ===================================================================== */

export const site = {
  // The live address, no trailing slash. Used for Google and link previews.
  url: "https://kosiso.cv",

  name: "Kosiso Ikezogwo",
  // The short name used for the wordmark in the nav.
  wordmark: "kosiso",
  role: "Frontend engineer",
  location: "Nigeria",

  // One line for Google and WhatsApp/LinkedIn link previews.
  description:
    "Kosiso Ikezogwo designs and builds fast, mobile-first websites for hosts, brands and small businesses, and writes open-source payment tooling on Stellar.",

  contact: {
    // WhatsApp number: digits only, country code first, no "+" or spaces,
    // e.g. "2348012345678". When set, every "Start a project" button opens
    // a WhatsApp chat with a message already written.
    whatsapp: "",
    // Shown as a button in the contact section when set.
    email: "",
    // Message pre-filled in WhatsApp and in the email subject line.
    message: "Hi Kosiso, I saw your portfolio and I'd like a website for my business.",
  },

  social: {
    linkedin: "https://www.linkedin.com/in/kosiso-ikezogwo/",
    github: "https://github.com/ciscokwiz",
    discord: "ciscokwiz",
  },

  // What you're building right now. Shown in the hero.
  currently: "SARV, an AI inbox that lets social-media vendors handle DMs, orders and customer service from one app",
};

export type Site = typeof site;
