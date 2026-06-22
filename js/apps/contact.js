/**
 * contact.js — app « Contact ». Liens directs (pas de backend, mailto suffit
 * pour un portfolio perso). Email / LinkedIn / GitHub.
 */
import { icon } from "../icons.js";
import { t } from "../i18n.js";

const LINKS = [
  {
    icon: "mail",
    label: "Email",
    value: "nidalyassami@gmail.com",
    href: "mailto:nidalyassami@gmail.com",
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "in/nidal-lyassami",
    href: "https://linkedin.com/in/nidal-lyassami",
    external: true,
  },
  {
    icon: "github",
    label: "GitHub",
    value: "k-aka-shi",
    href: "https://github.com/k-aka-shi",
    external: true,
  },
];

export function render(container) {
  const items = LINKS.map(
    (l) => `
    <a class="contact__link" href="${l.href}"${
      l.external ? ' target="_blank" rel="noopener"' : ""
    }>
      <span class="contact__link-icon">${icon(l.icon, 22)}</span>
      <span class="contact__link-text">
        <span class="contact__link-label">${l.label}</span>
        <span class="contact__link-value">${l.value}</span>
      </span>
    </a>`
  ).join("");

  container.innerHTML = `
    <div class="contact">
      <p class="contact__intro">${t("contact.intro")}</p>
      <div class="contact__links">${items}</div>
    </div>`;
}
