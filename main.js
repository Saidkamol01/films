// let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'

let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'

let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`

const elTopBtn = document.querySelector("#top-btn");
const popularBtn = document.querySelector('#popular-btn');
const upcomingBtn = document.querySelector('#upcoming-btn');
const filtrBtn = document.querySelector(".btn");
const inputReyting = document.querySelector("#score");
const yilMax = document.querySelector("#max");
const yilMin = document.querySelector("#min");
const inputSearch = document.querySelector("#search");
const divAppend = document.querySelector(".append");

function renderCinema(token) {
    fetch(token).then((response) => response.json()).then((data) => {
        const array = data.results;
        divAppend.textContent = "";
        for (let i = 0; i < array.length; i++) {
            const movie = document.createElement("div");
            movie.classList.add("movie");
            const image = document.createElement('img');
            image.src = "https://image.tmdb.org/t/p/w500" + array[i].poster_path;
            image.alt = array[i].original_title;
            movie.appendChild(image);
            const info = document.createElement("div");
            info.classList.add("movie-info");
            const heading = document.createElement("h3");
            heading.textContent = array[i].original_title;
            info.appendChild(heading);
            const span = document.createElement("span");
            span.classList.add('orange');
            span.textContent = array[i].vote_average
            info.appendChild(span);
            movie.appendChild(info);
            const dateSpan = document.createElement("span");
            dateSpan.classList.add('date');
            dateSpan.textContent = array[i].release_date
            movie.appendChild(dateSpan);
            divAppend.appendChild(movie);
          }
    });
}

function clear() {
    inputReyting.value = '';
    yilMax.value = '';
    yilMin.value = '';
    inputSearch.value = '';
}

function topCinema() {
    renderCinema(tokenTop);
    clear()
    localStorage.setItem("token", tokenTop)
}

function popularCinema() {
    renderCinema(tokenPopular);
    clear()
    localStorage.setItem("token", tokenPopular)
}

function upcomingCinema() {
    renderCinema(tokenUpComing);
    clear()
    localStorage.setItem("token", tokenUpComing)
}

function filtrCinema() {
    const hozirgiToken = localStorage.getItem("token");
    fetch(hozirgiToken).then((response) => response.json()).then((data) => {
        const array = data.results;
        divAppend.textContent = "";
        const search = inputSearch.value.trim();
        const reyting = inputReyting.value.trim();
        const min = yilMin.value.trim();
        const max = yilMax.value.trim();
        for (let i = 0; i < array.length; i++) {
            const yil = array[i].release_date.slice(0, 4);
            if (!reyting || reyting <= array[i].vote_average) {
                if (!min || min <= yil) {
                    if (!max || max >= yil) {
                        if (!search || search == array[i].original_title) {
                            const movie = document.createElement("div");
                            movie.classList.add("movie");
                            const image = document.createElement('img');
                            image.src = "https://image.tmdb.org/t/p/w500" + array[i].poster_path;
                            image.alt = array[i].original_title;
                            movie.appendChild(image);
                            const info = document.createElement("div");
                            info.classList.add("movie-info");
                            const heading = document.createElement("h3");
                            heading.textContent = array[i].original_title;
                            info.appendChild(heading);
                            const span = document.createElement("span");
                            span.classList.add('orange');
                            span.textContent = array[i].vote_average
                            info.appendChild(span);
                            movie.appendChild(info);
                            const dateSpan = document.createElement("span");
                            dateSpan.classList.add('date');
                            dateSpan.textContent = array[i].release_date
                            movie.appendChild(dateSpan);
                            divAppend.appendChild(movie);
                          }
                      }
                  }
              }
          }
    });
}

elTopBtn.addEventListener('click', topCinema)
popularBtn.addEventListener('click', popularCinema)
upcomingBtn.addEventListener('click', upcomingCinema)
filtrBtn.addEventListener('click', filtrCinema)

const hozirgiToken = localStorage.getItem("token");
renderCinema(hozirgiToken || tokenTop);
