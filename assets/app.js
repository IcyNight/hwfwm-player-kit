const documents = [
  { id: "readme", title: "Overview", note: "Reading order", path: "README.md" },
  { id: "rank", title: "Rank Basics", note: "Known ranks", path: "Rank Basics.md" },
  { id: "essence", title: "Essence Basics", note: "Known powers", path: "Essence Basics.md" },
  { id: "party", title: "Party Reference", note: "Team details", path: "Party Reference.md" },
  { id: "npcs", title: "Known NPCs", note: "People met", path: "Known NPCs.md" },
  { id: "orgs", title: "Known Organizations", note: "Groups", path: "Known Organizations.md" },
  { id: "events", title: "Known Events", note: "Timeline", path: "Known Events.md" },
  { id: "portraits", title: "NPC Pictures", note: "Portrait gallery", pictures: true },
];

const portraits = [
  "Beth Geller.png",
  "Clive Standish.png",
  "Don.png",
  "Esbeth Shivon.png",
  "Keith Geller.jpeg",
  "Ron.png",
];

const state = {
  activeId: "readme",
  cache: new Map(),
};

const nav = document.querySelector("#doc-nav");
const reader = document.querySelector("#reader");
const search = document.querySelector("#site-search");
const searchResults = document.querySelector("#search-results");

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
  setActiveButton();

  if (doc.pictures) {
    reader.innerHTML = renderPortraits();
    return;
  }

  reader.innerHTML = `<p class="empty-state">Loading ${escapeHtml(doc.title)}...</p>`;

  try {
    const markdown = await loadMarkdown(doc);
    reader.innerHTML = renderMarkdown(markdown);
  } catch (error) {
    reader.innerHTML = `<p class="empty-state">${escapeHtml(error.message)}</p>`;
  }
}

function navigate(id) {
  state.activeId = id;
  window.location.hash = id;
  renderActive();
}

function renderPortraits() {
  const cards = portraits.map((file) => {
    const name = file.replace(/\.(png|jpe?g|webp)$/i, "");
    return `
      <figure class="portrait-card">
        <img src="${encodePath(`NPC Pictures/${file}`)}" alt="${escapeHtml(name)}">
        <strong>${escapeHtml(name)}</strong>
      </figure>
    `;
  }).join("");

  return `
    <h1>NPC Pictures</h1>
    <div class="portrait-grid">${cards}</div>
  `;
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

  const searchable = documents.filter((doc) => !doc.pictures);
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

buildNav();
state.activeId = window.location.hash.replace("#", "") || "readme";
renderActive();
