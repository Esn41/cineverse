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
    video:"https://www.w3schools.com/html/mov_bbb.mp4"
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
    video:"https://www.w3schools.com/html/movie.mp4"
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
    video:"https://www.w3schools.com/html/mov_bbb.mp4"
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
    video:"https://www.w3schools.com/html/movie.mp4"
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
        </button>

        <button onclick="openDetails(${movie.id})">
          <i class="fa-solid fa-circle-info"></i>
        </button>

        <button onclick="toggleFavorite(${movie.id})">
          <i class="${isFav ? "fa-solid" : "fa-regular"} fa-heart"></i>
        </button>

        <button onclick="toggleList(${movie.id})">
          <i class="${isList ? "fa-solid fa-check" : "fa-solid fa-ellipsis-vertical"}"></i>
        </button>
      </div>
    </div>
  `;
}

function renderHome(){
  heroMovie = movies[0];

  document.getElementById("heroImg").src = heroMovie.img;
  document.getElementById("heroTitle").innerText = heroMovie.title;
  document.getElementById("heroDesc").innerText =
    `${heroMovie.category} • ${heroMovie.language} • ${heroMovie.year}`;

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

  const player = document.getElementById("player");
  player.pause();
  player.src = "";
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

  const player = document.getElementById("player");
  const btn = document.getElementById("playPauseBtn");

  player.src = movie.video;
  player.load();

  player.play().then(()=>{
    btn.innerText = "Ⅱ";
  }).catch(()=>{
    btn.innerText = "▶";
  });

  closeDetails();
  window.scrollTo(0,0);
}

function watchHero(){
  watchMovie(heroMovie.id);
}

function addHeroToList(){
  toggleList(heroMovie.id);
}

function playPause(){
  const player = document.getElementById("player");
  const btn = document.getElementById("playPauseBtn");

  if(player.paused){
    player.play();
    btn.innerText = "Ⅱ";
  }else{
    player.pause();
    btn.innerText = "▶";
  }
}

function back10(){
  const player = document.getElementById("player");
  player.currentTime = Math.max(0, player.currentTime - 10);
}

function forward10(){
  const player = document.getElementById("player");

  if(player.duration){
    player.currentTime = Math.min(player.duration, player.currentTime + 10);
  }
}

function fullscreenPlayer(){
  const box = document.getElementById("playerBox");

  if(box.requestFullscreen){
    box.requestFullscreen();
  }else if(box.webkitRequestFullscreen){
    box.webkitRequestFullscreen();
  }
}

function seekVideo(e){
  const player = document.getElementById("player");
  const line = e.currentTarget;
  const rect = line.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;

  if(player.duration){
    player.currentTime = percent * player.duration;
  }
}

document.getElementById("player").addEventListener("timeupdate", function(){
  const player = this;
  const fill = document.getElementById("progressFill");
  const timeLeft = document.getElementById("timeLeft");

  if(player.duration){
    const percent = (player.currentTime / player.duration) * 100;
    fill.style.width = percent + "%";

    const remaining = Math.max(0, player.duration - player.currentTime);
    const min = Math.floor(remaining / 60);
    const sec = Math.floor(remaining % 60);

    timeLeft.innerText = `${min}:${sec < 10 ? "0" + sec : sec}`;
  }
});

function showText(id){
  hideAll();
  document.getElementById(id).classList.remove("hidden");
  window.scrollTo(0,0);
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