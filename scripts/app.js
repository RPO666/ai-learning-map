import { CATEGORIES, TOPICS } from "./data.js";

const STORAGE_KEY = "ai-learning-atlas:completed:v1";
const grid = document.querySelector("#concept-grid");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const incompleteOnly = document.querySelector("#incomplete-only");
const dialog = document.querySelector("#topic-dialog");
const dialogBody = document.querySelector("#dialog-body");
const dialogCategory = document.querySelector("#dialog-category");
const completeButton = document.querySelector("#dialog-complete");
const categoryLabels = {
  "基礎觀念": "FOUNDATIONS",
  "模型架構": "ARCHITECTURE",
  "模型效率": "EFFICIENCY",
  "工程實作": "IN PRACTICE"
};

/** 儲存失敗（隱私模式、權限限制）時仍能使用介面，只是不持久保存。 */
function loadCompleted() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return new Set(Array.isArray(data) ? data.filter(value => typeof value === "string") : []);
  } catch {
    return new Set();
  }
}

const completed = loadCompleted();
let activeTopicId = null;

function saveCompleted() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed])); }
  catch { /* 無法存取 localStorage 時，暫時保留當前頁面狀態。 */ }
}

function makeElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function matches(topic) {
  const query = searchInput.value.trim().toLocaleLowerCase("zh-Hant");
  const searchable = [topic.title, topic.summary, topic.category, ...topic.tags].join(" ").toLocaleLowerCase("zh-Hant");
  return (!query || searchable.includes(query)) &&
    (categoryFilter.value === "all" || topic.category === categoryFilter.value) &&
    (!incompleteOnly.checked || !completed.has(topic.id));
}

function renderCard(topic, index) {
  const card = makeElement("article", "concept-card");
  const isComplete = completed.has(topic.id);
  card.dataset.category = topic.category;
  const top = makeElement("div", "card-top");
  top.append(makeElement("span", "card-category", topic.category), makeElement("span", "card-index", String(index + 1).padStart(2, "0")));
  const title = makeElement("h3", "card-title", topic.title);
  const summary = makeElement("p", "card-summary", topic.summary);
  const tags = makeElement("div", "card-tags");
  topic.tags.slice(0, 3).forEach(tag => tags.append(makeElement("span", "card-tag", `# ${tag}`)));
  const bottom = makeElement("div", "card-bottom");
  const meta = makeElement("span", "card-meta", `${topic.level} · ${topic.minutes} 分鐘`);
  const button = makeElement("button", "card-open", isComplete ? "已學會 ✓" : "查看內容 ↗");
  button.type = "button";
  button.setAttribute("aria-label", `查看「${topic.title}」詳細內容`);
  button.addEventListener("click", () => openTopic(topic.id));
  if (isComplete) card.classList.add("is-complete");
  bottom.append(meta, button);
  card.append(top, title, summary, tags, bottom);
  return card;
}

function updateProgress() {
  const validCompleted = TOPICS.filter(topic => completed.has(topic.id)).length;
  const percent = Math.round((validCompleted / TOPICS.length) * 100);
  document.querySelector("#completed-count").textContent = validCompleted;
  document.querySelector("#total-count").textContent = TOPICS.length;
  document.querySelector("#hero-count").textContent = TOPICS.length;
  document.querySelector("#progress-percent").textContent = `${percent}%`;
  document.querySelector("#progress-fill").style.width = `${percent}%`;
  document.querySelector("#progress-track").setAttribute("aria-valuenow", String(percent));
}

function renderCards() {
  if (!grid) return;
  const visible = TOPICS.filter(matches);
  grid.replaceChildren(...visible.map(topic => renderCard(topic, TOPICS.indexOf(topic))));
  document.querySelector("#results-status").textContent = `顯示 ${visible.length} / ${TOPICS.length} 個概念`;
  document.querySelector("#empty-state").hidden = visible.length !== 0;
  updateProgress();
}

function makeDetailSection(title, content, list = false) {
  const section = makeElement("section", "detail-section");
  section.append(makeElement("h3", "", title));
  if (list) {
    const ul = makeElement("ul", "detail-list");
    content.forEach(line => ul.append(makeElement("li", "", line)));
    section.append(ul);
  } else section.append(makeElement("p", "", content));
  return section;
}

function openTopic(id) {
  const topic = TOPICS.find(item => item.id === id);
  if (!topic || !dialog?.showModal) return;
  activeTopicId = id;
  dialogCategory.textContent = `${topic.category} / ${categoryLabels[topic.category]}`;
  const heading = makeElement("h2", "dialog-title", topic.title);
  heading.id = "dialog-title";
  const intro = makeElement("p", "dialog-summary", topic.summary);
  const info = makeElement("div", "dialog-info", `${topic.level} · 約 ${topic.minutes} 分鐘 · ${topic.tags.join(" / ")}`);
  dialogBody.replaceChildren(heading, info, intro,
    makeDetailSection("✳ 用生活例子理解", topic.analogy),
    makeDetailSection("↗ 什麼時候用得到？", topic.application),
    makeDetailSection("✓ 記住這三件事", topic.takeaways, true));
  updateCompleteButton();
  dialog.showModal();
}

function updateCompleteButton() {
  const isComplete = completed.has(activeTopicId);
  completeButton.textContent = isComplete ? "取消完成標記 ↺" : "標記為已學會 ✓";
  completeButton.setAttribute("aria-pressed", String(isComplete));
}

function clearFilters() {
  searchInput.value = "";
  categoryFilter.value = "all";
  incompleteOnly.checked = false;
  renderCards();
}

if (grid) {
  // 搜尋、篩選器只影響展示，不會刪除既有學習進度。
  searchInput.addEventListener("input", renderCards);
  categoryFilter.addEventListener("change", renderCards);
  incompleteOnly.addEventListener("change", renderCards);
  document.querySelector("#clear-filters").addEventListener("click", clearFilters);
  document.querySelector("#empty-reset").addEventListener("click", clearFilters);
  document.querySelectorAll("[data-category-link]").forEach(link => {
    link.addEventListener("click", () => {
      categoryFilter.value = CATEGORIES.includes(link.dataset.categoryLink) ? link.dataset.categoryLink : "all";
      searchInput.value = "";
      incompleteOnly.checked = false;
      renderCards();
    });
  });
  completeButton.addEventListener("click", () => {
    if (!activeTopicId) return;
    if (completed.has(activeTopicId)) completed.delete(activeTopicId);
    else completed.add(activeTopicId);
    saveCompleted();
    updateCompleteButton();
    renderCards();
  });
  document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => { activeTopicId = null; });
  renderCards();
}
