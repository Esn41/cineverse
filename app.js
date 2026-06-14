const movies = [
  {
    id: 1,
    title: "Nosferatu",
    year: 1922,
    category: "Korku",
    rating: 8.5,
    isNew: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/9/92/NosferatuPoster.jpg",
    desc: "Kont Dracula'dan ilham alan sessiz korku klasiği.",
    video: "https://archive.org/embed/Nosferatu1922"
  },
  {
    id: 2,
    title: "The General",
    year: 1926,
    category: "Klasik",
    rating: 8.3,
    isNew: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/04/The_General_%281926%29_poster.jpg",
    desc: "Buster Keaton'ın unutulmaz sessiz komedi klasiği.",
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
    desc: "Bilim kurgu sinemasının öncü yapımlarından biri.",
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
    desc: "Gotik atmosferiyle ünlü klasik korku filmi.",
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
    desc: "Charlie Chaplin'in sevilen komedi klasiği.",
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
    desc: "Karanlık insan doğasını anlatan klasik yapım.",
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
    desc: "Alman dışavurumcu sinemasının önemli örneklerinden.",
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
    desc: "Kült bilim kurgu filmlerinden biri.",
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
    desc: "Gizemli atmosferiyle kültleşmiş korku filmi.",
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
    desc: "Sinema tarihinin etkili sessiz dram filmlerinden.",
    video: "https://archive.org/embed/BattleshipPotemkin"
  },
  {
    id: 11,
    title: "The Thief of Bagdad",
    year: 1924,
    category: "Aksiyon",
    rating: 7.8,
    isNew: true,
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Thief_of_Bagdad_poster.jpg",
    desc: "Fantastik macera sinemasının erken dönem örneği.",
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
  ["Klasik", "fa-film"],
  ["Korku", "fa-ghost"],
  ["Bilim Kurgu", "fa-planet-ringed"],
  ["Komedi", "fa-face-smile"],
  ["Aksiyon", "fa-bolt"],
  ["Dram", "fa-masks-theater"],
  ["Belgesel", "fa-video"],
  ["Animasyon", "fa-clapperboard"]
];

let selectedMovie = null;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let list = JSON.parse(localStorage.getItem("list")) || [];

function card(movie) {
  return `
    <div class="movie-card">
      ${movie.isNew ? `<div class="badge">YENİ</div>` : ""}
      <img src="${movie.img}" alt="${movie.title}">
      <h4>${movie.title}</h4>
      <p>${movie.year} <span class="rating">⭐ ${movie.rating}</span></p>
      <div class="card-buttons">
        <button onclick="watchMovie(${movie.id})"><i class="fa-solid fa-play"></i></button>
        <button onclick="openDetails(${movie.id})"><i class="fa-solid fa-circle-info"></i></button>
        <button onclick="addFavorite(${movie.id})"><i class="fa-regular fa-heart"></i></button>
      </div>
    </div>
  `;
}

function renderHome() {
  document.getElementById("popularRow").innerHTML = movies.slice(0, 6).map(card).join("");
  document.getElementById("newRow").innerHTML = movies.filter(m => m.isNew).map(card).join("");

  document.getElementById("categoryBar").innerHTML = categories.map(c => `
    <button class="cat" onclick="filterMovie('${c[0]}')">
      <i class="fa-solid ${c[1]}"></i>${c[0]}
    </button>
  `).join("");
}

function hideSections() {
  document.querySelector(".hero").style.display = "none";
  document.querySelector(".categories").style.display = "none";
  document.querySelectorAll(".row-head").forEach(e => e.style.display = "none");
  document.querySelectorAll(".movie-row").forEach(e => e.style.display = "none");
  document.getElementById("resultArea").style.display = "none";
  document.querySelectorAll(".text-page").forEach(e => e.style.display = "none");
  document.getElementById("playerPage").style.display = "none";
  document.getElementById("player").src = "";
}

function goHome() {
  hideSections();
  document.querySelector(".hero").style.display = "flex";
  document.querySelector(".categories").style.display = "flex";
  document.querySelectorAll(".row-head").forEach(e => e.style.display = "flex");
  document.querySelectorAll(".movie-row").forEach(e => e.style.display = "flex");
  window.scrollTo(0,0);
}

function showResults(title, items) {
  hideSections();
  document.getElementById("resultArea").style.display = "block";
  document.getElementById("resultTitle").innerText = title;
  document.getElementById("resultGrid").innerHTML = items.length ? items.map(card).join("") : "<p>Film bulunamadı.</p>";
  window.scrollTo(0,0);
}

function showAllMovies() {
  showResults("Tüm Filmler", movies);
}

function showMostWatched() {
  showResults("En Çok İzlenenler", movies.slice().sort((a,b) => b.rating - a.rating));
}

function showNewMovies() {
  showResults("Yeni Eklenenler", movies.filter(m => m.isNew));
}

function showCategories() {
  showResults("Kategoriler", movies);
}

function filterMovie(cat) {
  showResults(cat, movies.filter(m => m.category === cat));
}

function addFavorite(id) {
  if (!favorites.includes(id)) favorites.push(id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("Favorilere eklendi.");
}

function addToList(id) {
  if (!list.includes(id)) list.push(id);
  localStorage.setItem("list", JSON.stringify(list));
  alert("Listene eklendi.");
}

function showFavorites() {
  showResults("Favorilerim", movies.filter(m => favorites.includes(m.id)));
}

function showList() {
  showResults("Listem", movies.filter(m => list.includes(m.id)));
}

function openDetails(id) {
  selectedMovie = movies.find(m => m.id === id);
  document.getElementById("modalImg").src = selectedMovie.img;
  document.getElementById("modalTitle").innerText = selectedMovie.title;
  document.getElementById("modalInfo").innerText = `${selectedMovie.year} • ${selectedMovie.category} • ⭐ ${selectedMovie.rating}`;
  document.getElementById("modalDesc").innerText = selectedMovie.desc;
  document.getElementById("modal").style.display = "flex";
}

function closeDetails() {
  document.getElementById("modal").style.display = "none";
}

function watchMovie(id) {
  const movie = movies.find(m => m.id === id);
  hideSections();
  document.getElementById("playerPage").style.display = "block";
  document.getElementById("playerTitle").innerText = movie.title;
  document.getElementById("player").src = movie.video;
  closeDetails();
  window.scrollTo(0,0);
}

function watchSelected() {
  if (selectedMovie) watchMovie(selectedMovie.id);
}

function favoriteSelected() {
  if (selectedMovie) addFavorite(selectedMovie.id);
}

function listSelected() {
  if (selectedMovie) addToList(selectedMovie.id);
}

function showText(id) {
  hideSections();
  document.getElementById(id).style.display = "block";
  window.scrollTo(0,0);
}

document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  if (!q) return goHome();

  const found = movies.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.category.toLowerCase().includes(q) ||
    String(m.year).includes(q)
  );

  showResults("Arama Sonuçları", found);
});

renderHome();