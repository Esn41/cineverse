const movies = [
  {
    id:1,
    title:"Ragnarok",
    type:"Dizi",
    year:2020,
    category:"Dram",
    rating:8.4,
    isNew:true,
    duration:"45 dk",
    language:"Türkçe Dublaj",
    actors:"David Stakston, Jonas Strand Gravli",
    img:"https://picsum.photos/500/800?random=701",
    desc:"Mitolojik atmosferli, heyecanlı bir yapım.",
    video:"https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id:2,
    title:"The Batman",
    type:"Film",
    year:2022,
    category:"Aksiyon",
    rating:8.2,
    isNew:false,
    duration:"176 dk",
    language:"Türkçe Altyazı",
    actors:"Robert Pattinson, Zoë Kravitz",
    img:"https://picsum.photos/500/800?random=702",
    desc:"Karanlık atmosferli etkileyici bir Batman hikayesi.",
    video:"https://www.w3schools.com/html/movie.mp4"
  },
  {
    id:3,
    title:"Dune Part Two",
    type:"Film",
    year:2024,
    category:"Bilim Kurgu",
    rating:8.7,
    isNew:true,
    duration:"166 dk",
    language:"Türkçe Dublaj",
    actors:"Timothée Chalamet, Zendaya",
    img:"https://picsum.photos/500/800?random=703",
    desc:"Çöl gezegeninde geçen büyük bilim kurgu macerası.",
    video:"https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id:4,
    title:"Oppenheimer",
    type:"Film",
    year:2023,
    category:"Dram",
    rating:8.6,
    isNew:true,
    duration:"180 dk",
    language:"Türkçe Altyazı",
    actors:"Cillian Murphy, Emily Blunt",
    img:"https://picsum.photos/500/800?random=704",
    desc:"Tarihin en büyük bilimsel projelerinden birinin dramatik hikayesi.",
    video:"https://www.w3schools.com/html/movie.mp4"
  },
  {
    id:5,
    title:"Stranger Things",
    type:"Dizi",
    year:2022,
    category:"Bilim Kurgu",
    rating:8.7,
    isNew:false,
    duration:"50 dk",
    language:"Türkçe Dublaj",
    actors:"Millie Bobby Brown, Finn Wolfhard",
    img:"https://picsum.photos/500/800?random=705",
    desc:"Gizem, macera ve bilim kurgunun birleşimi.",
    video:"https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id:6,
    title:"John Wick 4",
    type:"Film",
    year:2023,
    category:"Aksiyon",
    rating:8.1,
    isNew:false,
    duration:"169 dk",
    language:"Türkçe Altyazı",
    actors:"Keanu Reeves, Donnie Yen",
    img:"https://picsum.photos/500/800?random=706",
    desc:"Aksiyon temposu yüksek karanlık bir intikam hikayesi.",
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
      <img src="${movie.img}" alt="${movie.title}" onclick="openDetails(${movie.id})">

      <h4>${movie.title}</h4>
      <p>
        ${movie.year} • ${movie.language}
        <br>
        <span class="rating">⭐ ${movie.rating}</span>
      </p>

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
          <i class="${isList ? "fa-solid fa-check" : "fa-solid fa-plus"}"></i>
        </button>
      </div>
    </div>
  `;
}

function renderHero(){
  heroMovie = movies[0];

  document.getElementById("heroSlider").style.backgroundImage =
    `url('${heroMovie.img}')`;

  document.getElementById("heroSlider").innerHTML = `
    <div class="hero-overlay">
      <h2>${heroMovie.title}</h2>
      <p>${heroMovie.category} • ${heroMovie.year} • ⭐ ${heroMovie.rating}</p>

      <div class="hero-buttons">
        <button class="play-btn" onclick="watchMovie(${heroMovie.id})">
          <i class="fa-solid fa-play"></i> Oynat
        </button>

        <button class="list-btn" onclick="toggleList(${heroMovie.id})">
          <i class="fa-solid fa-plus"></i> Listem
        </button>
      </div>
    </div>
  `;
}

function renderHome(){
  renderHero();
  showTab("new");
}

function hideAll(){
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("resultPage").classList.add("hidden");
  document.getElementById("playerPage").classList.add("hidden");
  document.getElementById("menuPage").classList.add("hidden");

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

function showTab(type){
  const buttons = document.querySelectorAll(".tabs button");
  buttons.forEach(btn => btn.classList.remove("active"));

  if(type === "new"){
    buttons[0].classList.add("active");
    document.getElementById("homeGrid").innerHTML =
      movies.filter(m=>m.isNew).map(movieCard).join("");
  }

  if(type === "recommended"){
    buttons[1].classList.add("active");
    document.getElementById("homeGrid").innerHTML =
      movies.map(movieCard).join("");
  }

  if(type === "imdb"){
    buttons[2].classList.add("active");
    document.getElementById("homeGrid").innerHTML =
      movies.filter(m=>m.rating >= 7).map(movieCard).join("");
  }
}

function showResults(title,items){
  hideAll();
  document.getElementById("resultPage").classList.remove("hidden");
  document.getElementById("resultTitle").innerText = title;

  document.getElementById("resultGrid").innerHTML =
    items.length
      ? items.map(movieCard).join("")
      : "<p class='empty-text'>İçerik bulunamadı.</p>";

  window.scrollTo(0,0);
}

function showAllMovies(){
  showResults("Filmler", movies.filter(m=>m.type === "Film"));
}

function showSeries(){
  showResults("Diziler", movies.filter(m=>m.type === "Dizi"));
}

function showCategories(){
  hideAll();
  document.getElementById("resultPage").classList.remove("hidden");
  document.getElementById("resultTitle").innerText = "Kategoriler";

  document.getElementById("resultGrid").innerHTML = categories.map(c => `
    <button class="category-card" onclick="filterMovie('${c[0]}')">
      <i class="fa-solid ${c[1]}"></i>
      ${c[0]}
    </button>
  `).join("");
}

function filterMovie(cat){
  showResults(cat, movies.filter(m=>m.category === cat));
}

function showFavorites(){
  showResults("Favorilerim", movies.filter(m=>favorites.includes(m.id)));
}

function showList(){
  showResults("Listem", movies.filter(m=>list.includes(m.id)));
}

function showContinueMovies(){
  const continueList = JSON.parse(localStorage.getItem("continueList")) || [];

  const continueMovies = continueList
    .map(id => movies.find(m => m.id === id))
    .filter(Boolean);

  showResults("Son İzlenenler", continueMovies);
}

function showMenu(){
  hideAll();
  document.getElementById("menuPage").classList.remove("hidden");
  window.scrollTo(0,0);
}

function toggleFavorite(id){
  if(favorites.includes(id)){
    favorites = favorites.filter(x => x !== id);
  }else{
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderHome();
}

function toggleList(id){
  if(list.includes(id)){
    list = list.filter(x => x !== id);
  }else{
    list.push(id);
  }

  localStorage.setItem("list", JSON.stringify(list));
  renderHome();
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
  continueList = continueList.slice(0,8);
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

function focusSearch(){
  document.getElementById("searchInput").focus();
}

function toggleTheme(){
  document.body.classList.toggle("light");
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
    m.type.toLowerCase().includes(q) ||
    String(m.year).includes(q)
  );

  showResults("Arama Sonuçları", found);
});

renderHome();
