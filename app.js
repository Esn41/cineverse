const movies = [
  {id:1,title:"Nosferatu",year:1922,category:"Korku",rating:8.5,isNew:false,duration:"94 dk",language:"Sessiz Film",actors:"Max Schreck, Gustav von Wangenheim",img:"https://picsum.photos/400/600?random=101",desc:"Kont Dracula'dan ilham alan sessiz korku klasiği.",video:"https://archive.org/embed/Nosferatu1922"},
  {id:2,title:"The General",year:1926,category:"Klasik",rating:8.3,isNew:false,duration:"78 dk",language:"Sessiz Film",actors:"Buster Keaton, Marion Mack",img:"https://picsum.photos/400/600?random=102",desc:"Buster Keaton'ın unutulmaz sessiz komedi klasiği.",video:"https://archive.org/embed/TheGeneral"},
  {id:3,title:"Metropolis",year:1927,category:"Bilim Kurgu",rating:8.6,isNew:false,duration:"153 dk",language:"Sessiz Film",actors:"Brigitte Helm, Gustav Fröhlich",img:"https://picsum.photos/400/600?random=103",desc:"Bilim kurgu sinemasının öncü yapımlarından biri.",video:"https://archive.org/embed/Metropolis1927Restoration"},
  {id:4,title:"The Phantom of the Opera",year:1925,category:"Korku",rating:8.4,isNew:false,duration:"93 dk",language:"Sessiz Film",actors:"Lon Chaney, Mary Philbin",img:"https://picsum.photos/400/600?random=104",desc:"Gotik atmosferiyle ünlü klasik korku filmi.",video:"https://archive.org/embed/ThePhantomOfTheOpera1925"},
  {id:5,title:"The Kid",year:1921,category:"Komedi",rating:8.4,isNew:false,duration:"68 dk",language:"Sessiz Film",actors:"Charlie Chaplin, Jackie Coogan",img:"https://picsum.photos/400/600?random=105",desc:"Charlie Chaplin'in sevilen komedi klasiği.",video:"https://archive.org/embed/TheKid"},
  {id:6,title:"Night of the Living Dead",year:1968,category:"Korku",rating:8.7,isNew:true,duration:"96 dk",language:"İngilizce",actors:"Duane Jones, Judith O'Dea",img:"https://picsum.photos/400/600?random=106",desc:"Modern zombi filmlerinin temelini atan kült korku klasiği.",video:"https://archive.org/embed/night_of_the_living_dead"}
];

const categories = [
  ["Klasik","fa-film"],
  ["Korku","fa-ghost"],
  ["Bilim Kurgu","fa-rocket"],
  ["Komedi","fa-face-smile"],
  ["Aksiyon","fa-bolt"],
  ["Dram","fa-masks-theater"]
];

let selectedMovie = null;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let list = JSON.parse(localStorage.getItem("list")) || [];

function movieCard(movie){
  const isFav = favorites.includes(movie.id);
  const isList = list.includes(movie.id);

  return `
    <div class="movie-card">
      ${movie.isNew ? `<div class="badge">YENİ</div>` : ""}
      <img src="${movie.img}" alt="${movie.title}">
      <h4>${movie.title}</h4>
      <p>${movie.year} <span class="rating">⭐ ${movie.rating}</span></p>
      <div class="card-actions v55-card-actions">
  <button onclick="watchMovie(${movie.id})" class="v55-watch">
    <i class="fa-solid fa-play"></i>
    <span>İzle</span>
  </button>

  <button onclick="openDetails(${movie.id})" class="v55-small">
    <i class="fa-solid fa-circle-info"></i>
    <span>Bilgi</span>
  </button>

  <button onclick="toggleFavorite(${movie.id})" class="v55-small">
    <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
    <span>Favori</span>
  </button>

  <button onclick="toggleList(${movie.id})" class="v55-small">
    <i class="${isList ? 'fa-solid fa-check' : 'fa-solid fa-list'}"></i>
    <span>Liste</span>
  </button>
</div>
    </div>
  `;
  
}

function renderHome(){
  document.getElementById("popularRow").innerHTML = movies.slice().sort((a,b)=>b.rating-a.rating).map(movieCard).join("");
  document.getElementById("newRow").innerHTML = movies.filter(m=>m.isNew).map(movieCard).join("");

  document.getElementById("categoryBar").innerHTML = categories.map(c => `
    <button class="cat" onclick="filterMovie('${c[0]}')">
      <i class="fa-solid ${c[1]}"></i>${c[0]}
    </button>
  `).join("");
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
  document.getElementById("resultGrid").innerHTML = items.length ? items.map(movieCard).join("") : "<p>Film bulunamadı.</p>";
  window.scrollTo(0,0);
}

function showAllMovies(){ showResults("Tüm Filmler", movies); }
function showMostWatched(){ showResults("En Çok İzlenenler", movies.slice().sort((a,b)=>b.rating-a.rating)); }
function showNewMovies(){ showResults("Yeni Eklenenler", movies.filter(m=>m.isNew)); }
function showCategories(){
  hideAll();
  document.getElementById("resultPage").classList.remove("hidden");
  document.getElementById("resultTitle").innerText = "Kategoriler";

  document.getElementById("resultGrid").innerHTML = categories.map(c => `
    <button class="cat big-cat" onclick="filterMovie('${c[0]}')">
      <i class="fa-solid ${c[1]}"></i> ${c[0]}
    </button>
  `).join("");

  window.scrollTo(0,0);
}
function filterMovie(cat){ showResults(cat, movies.filter(m=>m.category===cat)); }

function toggleFavorite(id){
  if(favorites.includes(id)){
    favorites = favorites.filter(x => x !== id);
    alert("Favorilerden kaldırıldı.");
  }else{
    favorites.push(id);
    alert("Favorilere eklendi.");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  refreshCurrent();
}

function toggleList(id){
  if(list.includes(id)){
    list = list.filter(x => x !== id);
    alert("Listenden kaldırıldı.");
  }else{
    list.push(id);
    alert("Listene eklendi.");
  }

  localStorage.setItem("list", JSON.stringify(list));
  refreshCurrent();
}

function showFavorites(){
  showResults("Favorilerim", movies.filter(m=>favorites.includes(m.id)));
}

function showList(){
  showResults("Listem", movies.filter(m=>list.includes(m.id)));
}

function openDetails(id){
  selectedMovie = movies.find(m => m.id === id);

  document.getElementById("modalImg").src = selectedMovie.img;
  document.getElementById("modalTitle").innerText = selectedMovie.title;

  document.getElementById("modalMeta").innerHTML = `
    <span>⭐ ${selectedMovie.rating}</span>
    <span>${selectedMovie.year}</span>
    <span>${selectedMovie.category}</span>
    <span>${selectedMovie.duration || "120 dk"}</span>
    <span>${selectedMovie.language || "TR"}</span>
  `;

  document.getElementById("modalDesc").innerHTML = `
    <strong>Film Açıklaması</strong>
    <p>${selectedMovie.desc || "Bu film için açıklama yakında eklenecek."}</p>
<div class="modal-actors">
  <strong>Oyuncular</strong>
  <p>${selectedMovie.actors || "Oyuncu bilgisi yakında eklenecek."}</p>
</div>
    <div class="v56-modal-actions">
      <button onclick="watchMovie(${selectedMovie.id})">
        <i class="fa-solid fa-play"></i>
        Fragmanı İzle
      </button>

      <button onclick="toggleFavorite(${selectedMovie.id})">
        <i class="fa-regular fa-heart"></i>
        Favori
      </button>

      <button onclick="toggleList(${selectedMovie.id})">
        <i class="fa-solid fa-list"></i>
        Listem
      </button>
    </div>
  `;

  document.getElementById("movieModal").classList.add("show");
}


function watchMovie(id){
  const movie = movies.find(m=>m.id===id);

  hideAll();
  document.getElementById("playerPage").classList.remove("hidden");
  document.getElementById("playerTitle").innerText = movie.title;
  document.getElementById("player").src = movie.video;

  closeDetails();
  window.scrollTo(0,0);
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

function refreshCurrent(){
  const title = document.getElementById("resultTitle").innerText;

  if(title === "Favorilerim") showFavorites();
  else if(title === "Listem") showList();
  else if(title === "Tüm Filmler") showAllMovies();
  else if(title === "En Çok İzlenenler") showMostWatched();
  else if(title === "Yeni Eklenenler") showNewMovies();
  else renderHome();
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
function closeDetails(){
  document.getElementById("movieModal").classList.remove("show");
}
function fullscreenPlayer(){
  const playerBox = document.querySelector(".netflix-player");

  if(playerBox.requestFullscreen){
    playerBox.requestFullscreen();
  }
}