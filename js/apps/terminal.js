/**
 * terminal.js — terminal interactif. Commandes dans content/terminal-commands.<lang>.json.
 * Historique (flèches ↑/↓), prompt façon shell, easter eggs, raccourcis mobile.
 */
import { windowManager } from "../windowManager.js";
import { APPS } from "./registry.js";
import { loadProjects } from "./finder.js";
import { getLang, t } from "../i18n.js";
import { isMobile } from "../platform.js";

const configCache = {};

async function loadConfig(lang = getLang()) {
  if (configCache[lang]) return configCache[lang];
  let res = await fetch(`content/terminal-commands.${lang}.json`);
  if (!res.ok && lang !== "fr")
    res = await fetch("content/terminal-commands.fr.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  configCache[lang] = await res.json();
  return configCache[lang];
}

function escapeHtml(s) {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

/** Échappe puis rend cliquables les URLs et emails. */
function linkify(text) {
  let out = escapeHtml(text).replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener">$1</a>'
  );
  out = out.replace(
    /([\w.+-]+@[\w-]+\.[\w.-]+)/g,
    '<a href="mailto:$1">$1</a>'
  );
  return out;
}

const NEOFETCH = [
  "   ╔════════════╗",
  "   ║  Nidal OS  ║   nidal@portfolio",
  "   ╚════════════╝   -----------------",
  "                    OS      : Nidal OS (web edition)",
  "                    Host    : homelab — Proxmox / VPS",
  "                    Shell   : vanilla-js",
  "                    Uptime  : depuis 2024, et ça tourne",
  "                    Stack   : Python · FastAPI · Next.js · Flutter · Docker",
  "                    Coffee  : not found (essaie: sudo make-coffee)",
];

export async function render(container) {
  // Le terminal occupe toute la fenêtre (on retire le padding du corps).
  container.style.padding = "0";
  container.innerHTML = `
    <div class="terminal">
      <div class="terminal__output" role="log" aria-live="polite"></div>
      <div class="terminal__shortcuts" hidden></div>
      <form class="terminal__inputline">
        <span class="terminal__prompt"></span>
        <input class="terminal__input" type="text" autocomplete="off"
               autocapitalize="off" spellcheck="false" aria-label="Commande" />
      </form>
    </div>`;

  const output = container.querySelector(".terminal__output");
  const form = container.querySelector(".terminal__inputline");
  const input = container.querySelector(".terminal__input");
  const promptEl = container.querySelector(".terminal__prompt");
  const shortcutsEl = container.querySelector(".terminal__shortcuts");

  const history = [];
  let histIndex = 0;

  const scrollToEnd = () => {
    container.scrollTop = container.scrollHeight;
  };
  const appendLine = (html, cls) => {
    const div = document.createElement("div");
    div.className = "terminal__line" + (cls ? ` ${cls}` : "");
    div.innerHTML = html;
    output.appendChild(div);
  };

  let cfg;
  try {
    cfg = await loadConfig();
  } catch (err) {
    console.error("[terminal] échec chargement terminal-commands.json", err);
    appendLine("Erreur : impossible de charger les commandes.", "terminal__error");
    return;
  }

  const prompt = cfg.prompt || "$";
  const commands = cfg.commands || {};
  promptEl.textContent = prompt;
  (cfg.welcome || []).forEach((l) => appendLine(linkify(l), "terminal__muted"));

  function printHelp() {
    appendLine("Commandes disponibles :");
    Object.entries(commands)
      .filter(([, v]) => !v.hidden && !v.alias)
      .forEach(([name, v]) =>
        appendLine(`  ${escapeHtml(name.padEnd(12))} ${escapeHtml(v.desc || "")}`)
      );
  }

  async function printProjects() {
    let projects;
    try {
      projects = await loadProjects();
    } catch (_) {
      appendLine("Impossible de charger les projets.", "terminal__error");
      return;
    }
    appendLine("Projets (clique pour ouvrir dans le Finder) :");
    projects.forEach((p) => {
      const line = document.createElement("div");
      line.className = "terminal__line";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "terminal__link";
      btn.textContent = `→ ${p.title} — ${p.pitch || ""}`;
      btn.addEventListener("click", () =>
        windowManager.open("finder", { projectId: p.id })
      );
      line.appendChild(btn);
      output.appendChild(line);
    });
    scrollToEnd();
  }

  async function runAction(action) {
    if (action === "help") return printHelp();
    if (action === "projects") return printProjects();
    if (action === "neofetch")
      return NEOFETCH.forEach((l) => appendLine(escapeHtml(l)));
    if (action === "clear") {
      output.innerHTML = "";
      return;
    }
    if (action === "cv") {
      appendLine("Ouverture du CV…");
      if (APPS.cv && APPS.cv.href) window.open(APPS.cv.href, "_blank", "noopener");
      return;
    }
    if (action.startsWith("open:")) {
      const id = action.slice(5);
      appendLine(`Ouverture de « ${(APPS[id] && APPS[id].title) || id} »…`);
      windowManager.open(id);
    }
  }

  async function run(raw) {
    const cmd = raw.trim();
    appendLine(
      `<span class="terminal__prompt">${escapeHtml(prompt)}</span> ${escapeHtml(cmd)}`,
      "terminal__cmd"
    );
    if (!cmd) return;
    history.push(cmd);
    histIndex = history.length;

    let entry = commands[cmd] || commands[cmd.split(" ")[0]];
    if (entry && entry.alias) entry = commands[entry.alias];

    if (!entry) {
      appendLine(
        `command not found: ${escapeHtml(
          cmd.split(" ")[0]
        )} — tape \`help\` pour la liste des commandes`,
        "terminal__error"
      );
    } else if (entry.action) {
      await runAction(entry.action);
    } else if (entry.output) {
      entry.output.forEach((l) => appendLine(linkify(l)));
    }
    scrollToEnd();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;
    input.value = "";
    run(value);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      if (histIndex > 0) {
        histIndex -= 1;
        input.value = history[histIndex];
        e.preventDefault();
        setTimeout(() => input.setSelectionRange(input.value.length, input.value.length));
      }
    } else if (e.key === "ArrowDown") {
      if (histIndex < history.length - 1) {
        histIndex += 1;
        input.value = history[histIndex];
      } else {
        histIndex = history.length;
        input.value = "";
      }
      e.preventDefault();
    }
  });

  // Boutons de raccourci (surtout utiles sur mobile pour éviter de tout taper).
  if (isMobile()) {
    shortcutsEl.hidden = false;
    shortcutsEl.innerHTML = `<span class="terminal__shortcuts-label">${t(
      "terminal.shortcuts"
    )}</span>`;
    ["help", "projects", "cv"].forEach((cmd) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "terminal__chip";
      b.textContent = cmd;
      b.addEventListener("click", () => {
        run(cmd);
        input.focus();
      });
      shortcutsEl.appendChild(b);
    });
  }

  // Cliquer dans le terminal redonne le focus à l'input.
  container.addEventListener("mousedown", (e) => {
    if (e.target.closest(".terminal__link, a, .terminal__chip")) return;
    setTimeout(() => input.focus());
  });
  input.focus();
}
