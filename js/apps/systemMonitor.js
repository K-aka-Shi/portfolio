/**
 * systemMonitor.js — widget "live".
 * Affiche UNIQUEMENT des données réelles :
 *  - le dépôt GitHub public le plus récemment poussé (API publique, sans auth) ;
 *  - le statut serveur SI une API perso est configurée, sinon un fallback honnête
 *    (jamais de fausse métrique présentée comme réelle, cf. 03-CONTENT-APPS.md).
 * Rafraîchissement toutes les 60s, avec indicateur "live" qui pulse.
 */
import { t, getLang } from "../i18n.js";

const GITHUB_USER = "k-aka-shi";
// Renseigner une URL d'API perso (ex: https://.../status.json) pour afficher
// un vrai uptime serveur. Laissé vide → fallback explicite, pas de fausse donnée.
const SERVER_API = "";

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleString(getLang() === "en" ? "en-GB" : "fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch (_) {
    return iso;
  }
}

async function fetchLatestRepo() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=1`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  const repos = await res.json();
  if (!Array.isArray(repos) || !repos.length) return null;
  const r = repos[0];
  return { name: r.name, pushedAt: r.pushed_at, url: r.html_url };
}

export function render(container) {
  container.innerHTML = `
    <div class="monitor">
      <div class="monitor__head">
        <span class="monitor__live"><span class="monitor__dot"></span>${t("monitor.live")}</span>
        <span class="monitor__updated" id="monitor-updated"></span>
      </div>

      <section class="monitor__card">
        <h3 class="monitor__label">${t("monitor.githubLabel")}</h3>
        <div id="monitor-github" class="monitor__value">${t("common.loading")}</div>
      </section>

      <section class="monitor__card">
        <h3 class="monitor__label">${t("monitor.serverLabel")}</h3>
        <div id="monitor-server" class="monitor__value monitor__muted">${t("monitor.serverFallback")}</div>
      </section>

      <p class="monitor__note">${t("monitor.note")}</p>
    </div>`;

  const ghEl = container.querySelector("#monitor-github");
  const updatedEl = container.querySelector("#monitor-updated");
  const serverEl = container.querySelector("#monitor-server");

  async function update() {
    // Si la fenêtre a été fermée, on arrête le timer (pas de fuite).
    if (!document.body.contains(container)) {
      clearInterval(timer);
      return;
    }
    try {
      const repo = await fetchLatestRepo();
      if (repo) {
        ghEl.innerHTML = `<a href="${repo.url}" target="_blank" rel="noopener">${repo.name}</a> — ${t(
          "monitor.pushedOn"
        )} ${fmtDate(repo.pushedAt)}`;
      } else {
        ghEl.textContent = "—";
      }
    } catch (err) {
      console.warn("[monitor] GitHub", err);
      ghEl.textContent = t("monitor.ghError");
    }

    if (SERVER_API) {
      try {
        const res = await fetch(SERVER_API);
        const data = await res.json();
        serverEl.classList.remove("monitor__muted");
        serverEl.textContent = JSON.stringify(data);
      } catch (_) {
        serverEl.classList.add("monitor__muted");
        serverEl.textContent = t("monitor.serverFallback");
      }
    }

    updatedEl.textContent = `${t("monitor.updated")} ${new Date().toLocaleTimeString(
      getLang() === "en" ? "en-GB" : "fr-FR",
      { hour: "2-digit", minute: "2-digit" }
    )}`;
  }

  update();
  const timer = setInterval(update, 60000);
}
