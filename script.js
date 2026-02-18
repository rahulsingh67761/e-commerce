// ---------- script.js (smart search) ----------
const products = [
  "Shoes", "T-shirt", "Laptop", "Headphones", "Smartphone",
  "Watch", "Bag", "Sunglasses", "Charger", "Backpack"
];

const searchBar = document.getElementById("searchBar");
const searchResults = document.getElementById("searchResults");

let blurTimeout = null;
let activeIndex = -1;
let currentMatches = [];

function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

function renderSuggestions(matches) {
  searchResults.innerHTML = "";
  currentMatches = matches;

  if (matches.length === 0) {
    searchResults.style.display = "none";
    return;
  }

  matches.forEach((match, idx) => {
    const a = document.createElement("a");
    a.className = "list-group-item list-group-item-action";
    a.textContent = match;
    a.href = `products.html#${slugify(match)}`;
    a.addEventListener("mousedown", (e) => {}); // keeps click working before blur
    a.addEventListener("mouseover", () => setActiveIndex(idx));
    searchResults.appendChild(a);
  });

  activeIndex = -1;
  highlightActive();
  searchResults.style.display = "block";
}

function setActiveIndex(i) {
  activeIndex = i;
  highlightActive();
}

function highlightActive() {
  const items = searchResults.querySelectorAll(".list-group-item");
  items.forEach((el, idx) => {
    el.classList.toggle("active-suggestion", idx === activeIndex);
  });
}

function showMatches() {
  const q = searchBar.value.trim().toLowerCase();
  const matches = q === "" ? products.slice(0, 5) : products.filter(p => p.toLowerCase().includes(q));
  renderSuggestions(matches);
}

// Events
searchBar.addEventListener("input", showMatches);

searchBar.addEventListener("blur", () => {
  blurTimeout = setTimeout(() => { searchResults.style.display = "none"; }, 180);
});

searchBar.addEventListener("keydown", (e) => {
  const items = searchResults.querySelectorAll(".list-group-item");
  if (!items.length) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setActiveIndex(activeIndex < items.length - 1 ? activeIndex + 1 : 0);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    setActiveIndex(activeIndex > 0 ? activeIndex - 1 : items.length - 1);
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (activeIndex >= 0 && items[activeIndex]) window.location.href = items[activeIndex].href;
    else window.location.href = `products.html?search=${encodeURIComponent(searchBar.value.trim())}`;
  } else if (e.key === "Escape") {
    searchResults.style.display = "none";
  }
});

