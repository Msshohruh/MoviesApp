const moviesArr = normalizedMovies.splice(0, 100)
let movies = moviesArr
const moviesContainer = document.querySelector('.movies-container')
const inputSearch = document.getElementById('input')
const selectCategory = document.getElementById('select-category')
const selectSort = document.getElementById('select-sort')
const bookmarks = document.querySelector('.bookmarks')
const bookmarksPanel = document.querySelector('.bookmarks-panel')
const bookmarksBtn = document.querySelector('.bookmarks-btn')
const bookmarksRemoveBtn = document.querySelector('.bookmark-remove')
const categoriesArr = []

movies.sort(sortByAlphabet)
if (movies.length) showMovie()

function showMovie($movies = movies){
    moviesContainer.innerHTML = ''
    $movies.forEach((movie, i) => {
        const {title, year, categories, imdbRating, smallPoster, trailer, imdbId} = movie

        categories.forEach((category) => {
            if (!categoriesArr.includes(category)){
                categoriesArr.push(category)
            }
        })

        moviesContainer.innerHTML += `
        <div class="card">
            <div class="card-img">
                <a class="card-link" href=${trailer} target="_blank">
                <img src=${smallPoster}
                alt="movie-img" width="300" height="200">
                <div class="hover-img">${title}</div>
                </a>
            </div>
            
            <h3>${title}</h3>
            <i class="mb-4">${categories}</i>
            <h4 class="mt-auto">${year}</h4>
            <h4>⭐${imdbRating}</h4>
            <div class="d-flex flex-column gap-2">
                <button onclick="showMore('${imdbId}')" class="btn btn-primary">See More</button>
                <button onclick="addBookmarks('${imdbId}')" class="btn btn-outline-danger">Bookmarks</button>
            </div>
        </div>
        `;
    })
}
// Search section
inputSearch.addEventListener('input', () => {
    const search = inputSearch.value.toLowerCase()
    const searchMovies = movies.filter((movie) => {
        return movie.title.toLowerCase().includes(search)
    })
    showMovie(searchMovies)
})



// Select Categories section
categoriesArr.forEach((category) => {
    selectCategory.innerHTML += `
        <option value="${category}">${category}</option>
    `
})

selectCategory.addEventListener('change', () => {
    const category = selectCategory.value
    movies = moviesArr
    movies.sort(sortByAlphabet)
    selectSort.value = 'A-Z'
    if (category == 'All') {
        showMovie()
    } else{
        const filteredMovies = movies.filter((movie) => {
        return movie.categories.includes(category)
    })
    movies = filteredMovies
    showMovie()
    }
})

// Sort section
selectSort.addEventListener('change', () => {
    inputSearch.value = ''
    const sortBy = selectSort.value
    switch(sortBy) {
        case 'A-Z':
            movies.sort(sortByAlphabet)
            showMovie()
            break;
        case 'Z-A':
            movies.sort(sortByAlphabet)
            movies.reverse()
            showMovie()
            break;
        case 'year':
            movies.sort(sortByYear)
            showMovie()
            break;
        case 'rate':
            movies.sort(sortByRate)
            showMovie()
            break;
    }
})

function sortByAlphabet(a, b) {
  if ( a.title.toLowerCase() < b.title.toLowerCase()){
    return -1;
  }
  if ( a.title.toLowerCase() > b.title.toLowerCase()){
    return 1;
  }
  return 0;
}

function sortByYear(a, b) {
    if ( a.year < b.year){
      return 1;
    }
    if ( a.year > b.year){
      return -1;
    }
    return 0;
}

function sortByRate(a, b) {
    if ( a.imdbRating < b.imdbRating){
      return 1;
    }
    if ( a.imdbRating > b.imdbRating){
      return -1;
    }
    return 0;
}


// Bookmarks section
bookmarksBtn.addEventListener('click', () => {
    bookmarks.classList.toggle('hidden')
})



let bookmarksArr = JSON.parse(localStorage.getItem('bookmark')) ? JSON.parse(localStorage.getItem('bookmark')) : []

let bookmarksArrIds = []

bookmarksArr.forEach((movie) => {
    bookmarksArrIds.push(movie.imdbId)
    bookmarksPanel.innerHTML += `
        <a href=${movie.trailer} target='_blank' class="bookmarks-item btn btn-danger">${movie.title}</a>`
})



console.log(bookmarksArr)
console.log(bookmarksArrIds)

function addBookmarks(id) {
    bookmarks.classList.remove('hidden')
    movies.forEach((movie) => {
        if (movie.imdbId == id && !bookmarksArrIds.includes(movie.imdbId)) {
            bookmarksPanel.innerHTML += `
            <a href=${movie.trailer} target='_blank' class="bookmarks-item btn btn-danger">${movie.title}</a>
            `
            bookmarksArr.push(movie)
            bookmarksArrIds.push(movie.imdbId)
        }
    })
    localStorage.setItem('bookmark', JSON.stringify(bookmarksArr))
}

bookmarksRemoveBtn.addEventListener('click', () => {
    bookmarksPanel.innerHTML = ''
    bookmarksArr = []
    bookmarksArrIds = []
    localStorage.setItem('bookmark', JSON.stringify(bookmarksArr))
    bookmarks.classList.add('hidden')
})

// Modal section

const modal = document.querySelector('.modal')
const modalImg = document.querySelector('.modal-img')
const modalTitle = document.querySelector('.modal-title')
const genre = document.querySelector('.genre')
const year = document.querySelector('.year')
const language = document.querySelector('.language')
const runtime = document.querySelector('.runtime')
const summary = document.querySelector('.summary')

function showMore(id) {
    movies.forEach((movie) => {
        if (movie.imdbId == id) {
            modalImg.src = `${movie.bigPoster}`
            modalTitle.textContent = movie.title
            genre.textContent = movie.categories
            year.textContent = movie.year
            language.textContent = movie.language
            runtime.textContent = movie.runtime
            summary.textContent = movie.summary
            modal.classList.remove('hidden')
        }
    })
}

function closeModal() {
    modal.classList.add('hidden')
}