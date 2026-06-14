const movies = [
  {
    id: 1,
    title: "Nosferatu",
    year: 1922,
    category: "Korku",
    rating: 8.5,
    isNew: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/9/92/NosferatuPoster.jpg",
    desc: "Kont Dracula'dan ilham alan bu sessiz korku klasiği, sinema tarihinin en etkileyici yapımlarındandır.",
    video: "https://archive.org/embed/Nosferatu1922"
  },
  {
    id: 2,
    title: "The General",
    year: 1926,
    category: "Klasikler",
    rating: 8.3,
    isNew: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/04/The_General_%281926%29_poster.jpg",
    desc: "Buster Keaton'ın unutulmaz sessiz komedi ve aksiyon klasiği.",
    video: "https://archive.org/embed/TheGeneral"
  },
  {
    id: 3,
    title: "Metropolis",
    year: 1927,
    category: "Bilim Kurgu",
    rating: 8.6,
    isNew: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/06/Metropolisposter.jpg",
    desc: "Fritz Lang imzalı bilim kurgu sinemasının öncü yapımlarından biri.",
    video: "https://archive.org/embed/Metropolis1927Restoration"
  },
  {
    id: 4,
    title: "The Phantom of the Opera",
    year: 1925,
    category: "Korku",
    rating: 8.4,
    isNew: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Phantom_of_the_opera_1925_poster.jpg",
    desc: "Gotik atmosferiyle ünlü klasik korku ve dram filmi.",
    video: "https://archive.org/embed/ThePhantomOfTheOpera1925"
  },
  {
    id: 5,
    title: "The Kid",
    year: 1921,
    category: "Komedi",
    rating: 8.4,
    isNew: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/The_Kid_1921.jpg",
    desc: "Charlie Chaplin'in sıcak, duygusal ve komik başyapıtlarından biri.",
    video: "https://archive.org/embed/TheKid"
  },
  {
    id: 6,
    title: "Dr. Jekyll and Mr. Hyde",
    year: 1920,
    category: "Korku",
    rating: 8.2,
    isNew: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/3/35/Dr._Jekyll_and_Mr._Hyde_%281920%29_poster.jpg",
    desc: "İnsan doğasının karanlık tarafını anlatan klasik korku hikâyesi.",
    video: "https://archive.org/embed/DrJekyllAndMrHyde1920"
  },
  {
    id: 7,
    title: "The Cabinet of Dr. Caligari",
    year: 1920,
    category: "Korku",
    rating: 8.1,
    isNew: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Das_Cabinet_des_Dr._Caligari_poster.jpg",
    desc: "Alman dışavurumcu sinemasının en önemli örneklerinden biri.",
    video: "https://archive.org/embed/TheCabinetOfDrCaligari1920"
  },
  {
    id: 8,
    title: "Plan 9 from Outer Space",
    year: 1959,
    category: "Bilim Kurgu",
    rating: 6.6,
    isNew: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/9/97/Plan_nine_from_outer_space.jpg",
    desc: "Kült bilim kurgu filmleri arasında yer alan sıra dışı bir yapım.",
    video: "https://archive.org/embed/Plan_9_from_Outer_Space_1959"
  },
  {
    id: 9,
    title: "Carnival of Souls",
    year: 1962,
    category: "Korku",
    rating: 7.6,
    isNew: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/06/Carnival_of_Souls_%281962%29_poster.jpg",
    desc: "Gizemli ve rahatsız edici atmosferiyle kültleşmiş bağımsız korku filmi.",
    video: "https://archive.org/embed/CarnivalofSouls"
  },
  {
    id: 10,
    title: "Battleship Potemkin",
    year: 1925,
    category: "Dram",
    rating: 8.5,
    isNew: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/8/80/Battleship_Potemkin_poster.jpg",
    desc: "Sinema tarihinin en etkili sessiz dram filmlerinden biri.",
    video: "https://archive.org/embed/BattleshipPotemkin"
  },
  {
    id: 11,
    title: "The Thief of Bagdad",
    year: 1924,
    category: "Klasikler",
    rating: 7.8,
    isNew: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Thief_of_Bagdad_poster.jpg",
    desc: "Fantastik macera sinemasının erken dönem görkemli örneklerinden biri.",
    video: "https://archive.org/embed/TheThiefOfBagdad1924"
  },
  {
    id: 12,
    title: "Night of the Living Dead",
    year: 1968,
    category: "Korku",
    rating: 8.7,
    isNew: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/06/Night_of_the_Living_Dead_%281968%29_theatrical_poster.jpg",
    desc: "Modern zombi filmlerinin temelini atan kült korku klasiği.",
    video: "https://archive.org/embed/night_of_the_living_dead"
  }
];

const categories = [
  { name: "Klasikler", icon: "fa-film" },
  { name: "Korku", icon: "fa-ghost" },
  { name: "Bilim Kurgu", icon: "fa-planet-ringed" },
  { name: "Komedi", icon: "fa-face-smile" },
  { name: "Aksiyon", icon: "fa-bolt" },
  { name: "Dram", icon: "fa-masks-theater" },
  { name: "Belgesel", icon: "fa-video" },
  { name: "Animasyon", icon: "fa-clapperboard" }
];

let selectedMovieId = null;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

const pages = {
  home: document.getElementById("homePage"),
  movies: document.getElementById("moviesPage"),
  categories: document.getElementById("categoriesPage"),
  watchlist: document.getElementById("watchlistPage"),
  favorites: document.getElementById("favoritesPage"),
  watch: document.getElementById("watchPage"),
  about: document.getElementById("aboutPage"),
  privacy: document.getElementById("privacyPage"),
  contact: document.getElementById("contactPage"),
  terms: document.getElementById("termsPage")
};

function showPage(pageName) {
  Object.values(pages).forEach(page => page.classList.remove("active-page"));
  pages[pageName].classList.add("active-page");

  document.querySelectorAll(".side-link, .nav-btn").forEach(btn => btn.classList.remove("active"));

  if (pageName === "movies") renderMovies(movies);
  if (pageName === "watchlist") renderWatchlist();
  if (pageName === "favorites") renderFavorites();
  if (pageName === "categories") renderCategoryPage();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("open");
}

function movieCard(movie) {
  return `
    <div class="movie-card">
      ${movie.isNew ? `<div class="badge">Yeni</div>` : ""}
      <img src="${movie.img}" alt="${movie.title}">
      <div class="movie-info">
        <h4>${movie.title}</h4>
        <p>${movie.year} <span class="rating">⭐ ${movie.rating}</span></p>
      </div>
      <div class="card-actions">
        <button onclick="watchMovie(${movie.id})"><i class="fa-solid fa-play"></i></button>
        <button onclick="openDetails(${movie.id})"><i class="fa-solid fa-circle-info"></i></button>
        <button onclick="toggleFavorite(${movie.id})"><i class="fa-regular fa-heart"></i></button>
        <button onclick="addToList(${movie.id})"><i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
  `;
}

function renderHome() {
  document.getElementById("popularGrid").innerHTML = movies.slice(0, 6).map(movieCard).join("");
  document.getElementById("newGrid").innerHTML = movies.filter(m => m.isNew).map(movieCard).join("");
}

function renderMovies(list) {
  document.getElementById("movieGrid").innerHTML = list.map(movieCard).join("");
}

function renderCategoryButtons() {
  const html = categories.map(cat => `
    <button class="cat-btn" onclick="filterByCategory('${cat.name}')">
      <i class="fa-solid ${cat.icon}"></i> ${cat.name}
    </button>
  `).join("");

  document.getElementById("categoryButtons").innerHTML = html;
}

function renderCategoryPage() {
  const html = categories.map(cat => `
    <button class="cat-btn" onclick="filterCategoryPage('${cat.name}')">
      <i class="fa-solid ${cat.icon}"></i> ${cat.name}
    </button>
  `).join("");

  document.getElementById("categoryPageButtons").innerHTML = html;
  document.getElementById("categoryResult").innerHTML = movies.map(movieCard).join("");
}

function filterByCategory(category) {
  showPage("movies");
  const result = movies.filter(movie => movie.category === category);
  renderMovies(result);
}

function filterCategoryPage(category) {
  const result = movies.filter(movie => movie.category === category);
  document.getElementById("categoryResult").innerHTML = result.length
    ? result.map(movieCard).join("")
    : `<p>Bu kategoride henüz film yok.</p>`;
}

function openDetails(id) {
  selectedMovieId = id;
  const movie = movies.find(m => m.id === id);

  document.getElementById("detailImage").src = movie.img;
  document.getElementById("detailTitle").innerText = movie.title;
  document.getElementById("detailInfo").innerText = `${movie.year} • ${movie.category} • ⭐ ${movie.rating}`;
  document.getElementById("detailDesc").innerText = movie.desc;

  document.getElementById("detailModal").style.display = "flex";
}

function closeDetails() {
  document.getElementById("detailModal").style.display = "none";
}

function watchMovie(id) {
  const movie = movies.find(m => m.id === id);

  document.getElementById("watchTitle").innerText = movie.title;
  document.getElementById("moviePlayer").src = movie.video;
  selectedMovieId = id;

  closeDetails();
  showPage("watch");
}

function watchSelected() {
  if (selectedMovieId) watchMovie(selectedMovieId);
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
    alert("Favorilerden kaldırıldı.");
  } else {
    favorites.push(id);
    alert("Favorilere eklendi.");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function favoriteSelected() {
  if (selectedMovieId) toggleFavorite(selectedMovieId);
}

function addToList(id) {
  if (!watchlist.includes(id)) {
    watchlist.push(id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Listene eklendi.");
  } else {
    alert("Bu film zaten listende.");
  }
}

function listSelected() {
  if (selectedMovieId) addToList(selectedMovieId);
}

function renderFavorites() {
  const list = movies.filter(movie => favorites.includes(movie.id));
  document.getElementById("favoritesGrid").innerHTML = list.length
    ? list.map(movieCard).join("")
    : `<p>Henüz favori film eklemedin.</p>`;
}

function renderWatchlist() {
  const list = movies.filter(movie => watchlist.includes(movie.id));
  document.getElementById("watchlistGrid").innerHTML = list.length
    ? list.map(movieCard).join("")
    : `<p>Listene henüz film eklemedin.</p>`;
}

document.getElementById("searchInput").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(value) ||
    movie.category.toLowerCase().includes(value) ||
    movie.year.toString().includes(value)
  );

  showPage("movies");
  renderMovies(filtered);
});

renderHome();
renderMovies(movies);
renderCategoryButtons();
renderCategoryPage();