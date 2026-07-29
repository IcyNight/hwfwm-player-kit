const documents = [
  { id: "rank", title: "Rank Basics", note: "Known ranks", path: "Rank Basics.md" },
  { id: "essence", title: "Essence Basics", note: "Known powers", path: "Essence Basics.md" },
  { id: "party", title: "Party Reference", note: "Team details", path: "Party Reference.md" },
  { id: "inventory", title: "Party Inventory", note: "Shared loot", path: "Party Inventory.md" },
  { id: "npcs", title: "Known NPCs", note: "People met", path: "Known NPCs.md" },
  { id: "orgs", title: "Known Organizations", note: "Groups", path: "Known Organizations.md" },
  { id: "events", title: "Known Events", note: "Timeline", path: "Known Events.md" },
];

const portraits = new Map([
  ["Beth Geller", "Beth Geller.png"],
  ["Clive Standish", "Clive Standish.png"],
  ["Don", "Don.png"],
  ["Esbeth Shivon", "Esbeth Shivon.png"],
  ["Keith Geller", "Keith Geller.jpeg"],
  ["Neil Davone", "Neil Davone.png"],
  ["Ron", "Ron.png"],
  ["Thadwick Mercer", "Thadwick Mercer.png"],
]);

const state = {
  activeId: "rank",
  cache: new Map(),
  theme: "light",
};

const nav = document.querySelector("#doc-nav");
const reader = document.querySelector("#reader");
const search = document.querySelector("#site-search");
const searchResults = document.querySelector("#search-results");
const themeToggle = document.querySelector("#theme-toggle");

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function getDocument(id) {
  return documents.find((doc) => doc.id === id) || documents[0];
}

function setActiveButton() {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.id === state.activeId);
  });
}

function buildNav() {
  nav.innerHTML = documents.map((doc) => `
    <button class="nav-button" type="button" data-id="${doc.id}">
      <span class="nav-title">${escapeHtml(doc.title)}</span>
      <span class="nav-note">${escapeHtml(doc.note)}</span>
    </button>
  `).join("");

  nav.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-id]");
    if (!button) return;
    navigate(button.dataset.id);
  });
}

async function loadMarkdown(doc) {
  if (state.cache.has(doc.id)) return state.cache.get(doc.id);

  const response = await fetch(encodePath(doc.path));
  if (!response.ok) {
    throw new Error(`Could not load ${doc.path}`);
  }

  const text = await response.text();
  state.cache.set(doc.id, text);
  return text;
}

async function renderActive() {
  const doc = getDocument(state.activeId);
  state.activeId = doc.id;
  setActiveButton();

  reader.innerHTML = `<p class="empty-state">Loading ${escapeHtml(doc.title)}...</p>`;

  try {
    const markdown = await loadMarkdown(doc);
    reader.innerHTML = doc.id === "npcs" ? renderKnownNpcs(markdown) : renderMarkdown(markdown);
  } catch (error) {
    reader.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
}

function navigate(id) {
  state.activeId = id;
  window.location.hash = id;
  renderActive();
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let list = [];
  let orderedList = [];
  let table = [];
  let inQuote = false;

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
    list = [];
  }

  function flushOrderedList() {
    if (!orderedList.length) return;
    html.push(`<ol>${orderedList.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ol>`);
    orderedList = [];
  }

  function flushTable() {
    if (table.length < 2) {
      table = [];
      return;
    }

    const rows = table.map((row) => row.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
    const header = rows[0];
    const body = rows.slice(2);
    html.push(`
      <div class="table-wrap">
        <table>
          <thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead>
          <tbody>
            ${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
    `);
    table = [];
  }

  function closeBlocks() {
    flushParagraph();
    flushList();
    flushOrderedList();
    flushTable();
    if (inQuote) {
      html.push("</blockquote>");
      inQuote = false;
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      closeBlocks();
      continue;
    }

    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      table.push(trimmed);
      continue;
    }

    flushTable();

    if (trimmed.startsWith(">")) {
      flushParagraph();
      flushList();
      flushOrderedList();
      if (!inQuote) {
        html.push("<blockquote>");
        inQuote = true;
      }
      html.push(`<p>${inlineMarkdown(trimmed.replace(/^>\s?/, ""))}</p>`);
      continue;
    }

    if (inQuote) {
      html.push("</blockquote>");
      inQuote = false;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushOrderedList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      flushOrderedList();
      list.push(trimmed.slice(2));
      continue;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      flushList();
      orderedList.push(ordered[1]);
      continue;
    }

    paragraph.push(trimmed);
  }

  closeBlocks();
  return html.join("");
}

function renderKnownNpcs(markdown) {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const titleMatch = normalized.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : "Known NPCs";
  const parsed = splitNpcSections(normalized);

  const intro = parsed.intro ? renderMarkdown(parsed.intro) : "";
  const cards = [];
  const extras = [];

  for (const section of parsed.sections) {
    const { name, body } = section;
    const content = renderMarkdown(body);
    const file = portraits.get(name);
    const image = file ? `
      <img class="npc-portrait" src="${encodePath(`NPC Pictures/${file}`)}" alt="${escapeHtml(name)}">
    ` : "";

    if (file || !name.toLowerCase().startsWith("ask the dm")) {
      cards.push(`
        <section class="npc-card${file ? "" : " no-portrait"}">
          ${image}
          <div class="npc-details">
            <h2>${escapeHtml(name)}</h2>
            ${content}
          </div>
        </section>
      `);
    } else {
      extras.push(`
        <section class="reader-section">
          <h2>${escapeHtml(name)}</h2>
          ${content}
        </section>
      `);
    }
  }

  return `
    <h1>${escapeHtml(title)}</h1>
    ${intro}
    <div class="npc-list">${cards.join("")}</div>
    ${extras.join("")}
  `;
}

function splitNpcSections(markdown) {
  const lines = markdown.split("\n");
  const intro = [];
  const sections = [];
  let current = null;

  for (const line of lines) {
    const heading = line.match(/^##\s+(.+)$/);

    if (heading) {
      if (current) sections.push(current);
      current = { name: heading[1].trim(), lines: [] };
      continue;
    }

    if (current) {
      current.lines.push(line);
    } else if (!line.match(/^#\s+/)) {
      intro.push(line);
    }
  }

  if (current) sections.push(current);

  return {
    intro: intro.join("\n").trim(),
    sections: sections.map((section) => ({
      name: section.name,
      body: section.lines.join("\n").trim(),
    })),
  };
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getExcerpt(text, query) {
  const normalized = text.replace(/\s+/g, " ");
  const index = normalized.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return normalized.slice(0, 180);
  const start = Math.max(0, index - 70);
  const end = Math.min(normalized.length, index + query.length + 110);
  const excerpt = normalized.slice(start, end);
  const marked = escapeHtml(excerpt).replace(new RegExp(escapeRegExp(query), "ig"), (match) => `<mark>${match}</mark>`);
  return `${start > 0 ? "..." : ""}${marked}${end < normalized.length ? "..." : ""}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function runSearch(query) {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    searchResults.hidden = true;
    return;
  }

  const searchable = documents;
  const loaded = await Promise.all(searchable.map(async (doc) => ({ doc, text: await loadMarkdown(doc) })));
  const matches = loaded
    .filter(({ text }) => text.toLowerCase().includes(trimmed.toLowerCase()))
    .map(({ doc, text }) => `
      <button class="result-button" type="button" data-id="${doc.id}">
        <strong>${escapeHtml(doc.title)}</strong><br>
        <span>${getExcerpt(text, trimmed)}</span>
      </button>
    `);

  searchResults.hidden = false;
  searchResults.innerHTML = `
    <h2>${matches.length ? `${matches.length} result${matches.length === 1 ? "" : "s"}` : "No results"}</h2>
    <div class="result-list">${matches.join("") || '<p class="empty-state">Try another term.</p>'}</div>
  `;
}

search.addEventListener("input", () => {
  runSearch(search.value);
});

searchResults.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  search.value = "";
  searchResults.hidden = true;
  navigate(button.dataset.id);
});

window.addEventListener("hashchange", () => {
  const id = window.location.hash.replace("#", "");
  if (id && id !== state.activeId) {
    state.activeId = id;
    renderActive();
  }
});

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  state.theme = nextTheme;
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("player-kit-theme", nextTheme);

  const isDark = nextTheme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.querySelector(".theme-icon").textContent = isDark ? "L" : "D";
  themeToggle.querySelector(".theme-label").textContent = isDark ? "Light" : "Dark";
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("player-kit-theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(savedTheme || preferredTheme);
}

themeToggle.addEventListener("click", () => {
  applyTheme(state.theme === "dark" ? "light" : "dark");
});

initializeTheme();
buildNav();
state.activeId = window.location.hash.replace("#", "") || "rank";
renderActive();
