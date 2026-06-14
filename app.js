const movies = [
  {
    id:1,
    title:"Ragnarok",
    year:2020,
    category:"Dram",
    rating:8.4,
    isNew:true,
    duration:"45 dk",
    language:"Türkçe",
    actors:"David Stakston, Jonas Strand Gravli",
    img:"https://picsum.photos/500/800?random=501",
    desc:"Mitolojik atmosferli, heyecanlı bir yapım.",
    video:"https://archive.org/embed/Nosferatu1922"
  },
  {
    id:2,
    title:"Wonder Woman 1984",
    year:2020,
    category:"Aksiyon",
    rating:7.8,
    isNew:false,
    duration:"151 dk",
    language:"Türkçe",
    actors:"Gal Gadot, Chris Pine",
    img:"https://picsum.photos/500/800?random=502",
    desc:"Süper kahraman aksiyon filmi.",
    video:"https://archive.org/embed/TheGeneral"
  },
  {
    id:3,
    title:"Altın Topraklar",
    year:2023,
    category:"Dram",
    rating:8.1,
    isNew:true,
    duration:"120 dk",
    language:"Türkçe",
    actors:"Oyuncu 1, Oyuncu 2",
    img:"https://picsum.photos/500/800?random=503",
    desc:"Macera ve dramı birleştiren güçlü bir hikaye.",
    video:"https://archive.org/embed/Metropolis1927Restoration"
  },
  {
    id:4,
    title:"Escobar",
    year:2022,
    category:"Aksiyon",
    rating:8.0,
    isNew:false,
    duration:"110 dk",
    language:"Türkçe",
    actors:"Oyuncu 1, Oyuncu 2",
    img:"https://picsum.photos/500/800?random=504",
    desc:"Suç dünyasında geçen tempolu bir hikaye.",
    video:"https://archive.org/embed/ThePhantomOfTheOpera1925"
  },
  {
    id:5,
    title:"Stranger Things",
    year:2022,
    category:"Bilim Kurgu",
    rating:8.7,
    isNew:true,
    duration:"50 dk",
    language:"Türkçe",
    actors:"Millie Bobby Brown, Finn Wolfhard",
    img:"https://picsum.photos/500/800?random=505",
    desc:"Gizem, macera ve bilim kurgunun birleşimi.",
    video:"https://archive.org/embed/TheKid"
  },
  {
    id:6,
    title:"The Last Airbender",
    year:2024,
    category:"Fantastik",
    rating:7.9,
    isNew:true,
    duration:"55 dk",
    language:"Türkçe",
    actors:"Gordon Cormier, Kiawentiio",
    img:"https://picsum.photos/500/800?random=506",
    desc:"Elementlerin gücünü konu alan fantastik macera.",
    video:"https://archive.org/embed/night_of_the_living_dead"
  },
  {
    id:7,
    title:"La Casa De Papel",
    year:2021,
    category:"Aksiyon",
    rating:8.5,
    isNew:false,
    duration:"48 dk",
    language:"Türkçe",
    actors:"Úrsula Corberó, Álvaro Morte",
    img:"https://picsum.photos/500/800?random=507",
    desc:"Büyük soygun planlarının anlatıldığı aksiyon dizisi.",
    video:"https://archive.org/embed/Nosferatu1922"
  },
  {
    id:8,
    title:"The Batman",
    year:2022,
    category:"Aksiyon",
    rating:8.2,
    isNew:false,
    duration:"176 dk",
    language:"Türkçe",
    actors:"Robert Pattinson, Zoë Kravitz",
    img:"https://picsum.photos/500/800?random=508",
    desc:"Karanlık ve etkileyici bir Batman hikayesi.",
    video:"https://archive.org/embed/TheGeneral"
  }
];

const categories = [
  ["Aksiyon","fa-bolt"],
  ["Dram","fa-masks-theater"],
  ["Bilim Kurgu","fa-rocket"],
  ["Fantastik","fa-wand-magic-sparkles"],
  ["Korku","fa-ghost"],
  ["Komedi","fa-face-smile"]
];

let selectedMovie = null;
let heroMovie = movies[0];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let list = JSON.parse(localStorage.getItem("list")) || [];

function movieCard(movie){
  const isFav = favorites.includes(movie.id);
  const isList = list.includes(movie.id);

  return `
    <div class="movie-card">
      ${movie.isNew ? `<div class="badge">TOP 10</div>` : ""}

      <img src="${movie.img}" alt="${movie.title}" onclick="openDetails(${movie.id})">

      <h4>${movie.title}</h4>
      <p>${movie.category} <span class="rating">⭐ ${movie.rating}</span></p>

      <div class="card-actions">
        <button onclick="watchMovie(${movie.id})">
          <i class="fa-solid fa-play"></i>
          <span>İzle</span>
        </button>

        <button onclick="openDetails(${movie.id})">
          <i class="fa-solid fa-circle-info"></i>
          <span>Bilgi</span>
        </button>

        <button onclick="toggleFavorite(${movie.id})">
          <i class="${isFav ? "fa-solid" : "fa-regular"} fa-heart"></i>
          <span>Favori</span>
        </button>

        <button onclick="toggleList(${movie.id})">
          <i class="${isList ? "fa-solid fa-check" : "fa-solid fa-ellipsis-vertical"}"></i>
          <span>Liste</span>
        </button>
      </div>
    </div>
  `;
}

function renderHome(){
  heroMovie = movies[0];

  document.getElementById("heroImg").src = heroMovie.img;
  document.getElementById("heroTitle").innerText = heroMovie.title;
  document.getElementById("heroDesc").innerText = `${heroMovie.category} • ${heroMovie.language} • ${heroMovie.year}`;

  document.getElementById("gameRow").innerHTML =
    movies.slice(0,4).map(movieCard).join("");

  const continueList = JSON.parse(localStorage.getItem("continueList")) || [];
  const continueMovies = continueList
    .map(id => movies.find(m => m.id === id))
    .filter(Boolean);

  document.getElementById("continuePreview").innerHTML =
    continueMovies.length
      ? continueMovies.map(movieCard).join("")
      : "<p class='empty-text'>Henüz izlenen film yok.</p>";

  document.getElementById("popularRow").innerHTML =
    movies.slice().sort((a,b)=>b.rating-a.rating).map(movieCard).join("");

  document.getElementById("newRow").innerHTML =
    movies.filter(m=>m.isNew).map(movieCard).join("");
}

function hideAll(){
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("resultPage").classList.add("hidden");
  document.getElementById("playerPage").classList.add("hidden");
  document.querySelectorAll(".text-page").forEach(p=>p.classList.add("hidden"));
  document.getElementById("player").src = "";
}

function goHome(){
  hideAll();
  document.getElementById("homePage").classList.remove("hidden");
  renderHome();
  window.scrollTo(0,0);
}

function showResults(title,items){
  hideAll();
  document.getElementById("resultPage").classList.remove("hidden");
  document.getElementById("resultTitle").innerText = title;

  document.getElementById("resultGrid").innerHTML =
    items.length
      ? items.map(movieCard).join("")
      : "<p class='empty-text'>Film bulunamadı.</p>";

  window.scrollTo(0,0);
}

function showAllMovies(){
  showResults("Filmler", movies);
}

function showMostWatched(){
  showResults("Popüler", movies.slice().sort((a,b)=>b.rating-a.rating));
}

function showNewMovies(){
  showResults("Yeni ve Popüler", movies.filter(m=>m.isNew));
}

function showCategories(){
  showResults("Kategoriler", []);

  document.getElementById("resultGrid").innerHTML = categories.map(c => `
    <button class="category-card" onclick="filterMovie('${c[0]}')">
      <i class="fa-solid ${c[1]}"></i>
      ${c[0]}
    </button>
  `).join("");
}

function filterMovie(cat){
  showResults(cat, movies.filter(m=>m.category===cat));
}

function showContinueMovies(){
  const continueList = JSON.parse(localStorage.getItem("continueList")) || [];

  const continueMovies = continueList
    .map(id => movies.find(m => m.id === id))
    .filter(Boolean);

  showResults("İzlemeye Devam Et", continueMovies);
}

function toggleFavorite(id){
  if(favorites.includes(id)){
    favorites = favorites.filter(x => x !== id);
    alert("Favorilerden kaldırıldı.");
  }else{
    favorites.push(id);
    alert("Favorilere eklendi.");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderHome();
}

function toggleList(id){
  if(list.includes(id)){
    list = list.filter(x => x !== id);
    alert("Listemden kaldırıldı.");
  }else{
    list.push(id);
    alert("Listeme eklendi.");
  }

  localStorage.setItem("list", JSON.stringify(list));
  renderHome();
}

function showFavorites(){
  showResults("Favorilerim", movies.filter(m=>favorites.includes(m.id)));
}

function showList(){
  showResults("Benim CineVerse’im", movies.filter(m=>list.includes(m.id)));
}

function openDetails(id){
  selectedMovie = movies.find(m => m.id === id);

  document.getElementById("modalImg").src = selectedMovie.img;
  document.getElementById("modalTitle").innerText = selectedMovie.title;

  document.getElementById("modalMeta").innerHTML = `
    <span>⭐ ${selectedMovie.rating}</span>
    <span>${selectedMovie.year}</span>
    <span>${selectedMovie.category}</span>
    <span>${selectedMovie.duration}</span>
    <span>${selectedMovie.language}</span>
  `;

  document.getElementById("modalDesc").innerHTML = `
    <strong>Film Açıklaması</strong>
    <p>${selectedMovie.desc}</p>

    <div class="modal-actors">
      <strong>Oyuncular</strong>
      <p>${selectedMovie.actors}</p>
    </div>

    <div class="v56-modal-actions">
      <button onclick="watchMovie(${selectedMovie.id})">
        <i class="fa-solid fa-play"></i>
        Oynat
      </button>

      <button onclick="toggleFavorite(${selectedMovie.id})">
        <i class="fa-regular fa-heart"></i>
        Favori
      </button>

      <button onclick="toggleList(${selectedMovie.id})">
        <i class="fa-solid fa-plus"></i>
        Listem
      </button>
    </div>
  `;

  document.getElementById("movieModal").classList.add("show");
}

function closeDetails(){
  document.getElementById("movieModal").classList.remove("show");
}

function watchMovie(id){
  const movie = movies.find(m=>m.id===id);

  let continueList = JSON.parse(localStorage.getItem("continueList")) || [];
  continueList = continueList.filter(x => x !== id);
  continueList.unshift(id);
  continueList = continueList.slice(0,6);
  localStorage.setItem("continueList", JSON.stringify(continueList));

  hideAll();
  document.getElementById("playerPage").classList.remove("hidden");
  document.getElementById("playerTitle").innerText = movie.title;
  document.getElementById("player").src = movie.video;

  closeDetails();
  window.scrollTo(0,0);
}

function watchHero(){
  watchMovie(heroMovie.id);
}

function addHeroToList(){
  toggleList(heroMovie.id);
}

function watchSelected(){
  if(selectedMovie) watchMovie(selectedMovie.id);
}

function favoriteSelected(){
  if(selectedMovie) toggleFavorite(selectedMovie.id);
}

function listSelected(){
  if(selectedMovie) toggleList(selectedMovie.id);
}

function showText(id){
  hideAll();
  document.getElementById(id).classList.remove("hidden");
  window.scrollTo(0,0);
}

function focusSearch(){
  document.getElementById("searchInput").focus();
}

function fullscreenPlayer(){
  const playerBox = document.querySelector(".netflix-player");

  if(playerBox.requestFullscreen){
    playerBox.requestFullscreen();
  }
}

function back10(){
  alert("10 saniye geri alma özelliği MP4 video yükleyince aktif olacak.");
}

function forward10(){
  alert("10 saniye ileri alma özelliği MP4 video yükleyince aktif olacak.");
}

function playPause(){
  alert("Oynat/Duraklat kontrolü MP4 video yükleyince aktif olacak.");
}

document.getElementById("searchInput").addEventListener("input", function(){
  const q = this.value.toLowerCase();

  if(!q){
    goHome();
    return;
  }

  const found = movies.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.category.toLowerCase().includes(q) ||
    String(m.year).includes(q)
  );

  showResults("Arama Sonuçları", found);
});

renderHome();