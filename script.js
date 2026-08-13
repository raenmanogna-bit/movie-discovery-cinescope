// ==========================================
// CINESCOPE — MOVIE DISCOVERY ENGINE
// ==========================================


// ==========================================
// MOVIE DATABASE
// ==========================================

const movies = [

    {
        id: 1,
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        genre: "sci-fi",
        genreLabel: "Sci-Fi",
        duration: "2h 49m",
        number: "01",

        moods: [
            "mind",
            "emotional",
            "adventure"
        ],

        description:
            "A group of explorers travel through a wormhole in space in search of a new home for humanity."
    },


    {
        id: 2,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        genre: "thriller",
        genreLabel: "Thriller",
        duration: "2h 28m",
        number: "02",

        moods: [
            "mind",
            "intense"
        ],

        description:
            "A skilled thief enters the dreams of others to steal valuable secrets and faces one final impossible mission."
    },


    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        genre: "action",
        genreLabel: "Action",
        duration: "2h 32m",
        number: "03",

        moods: [
            "intense",
            "emotional"
        ],

        description:
            "Batman faces a criminal mastermind who pushes Gotham into chaos and forces the hero to confront his limits."
    },


    {
        id: 4,
        title: "The Martian",
        year: 2015,
        rating: 8.0,
        genre: "sci-fi",
        genreLabel: "Sci-Fi",
        duration: "2h 24m",
        number: "04",

        moods: [
            "adventure",
            "fun"
        ],

        description:
            "An astronaut stranded on Mars uses science, creativity and determination to survive while Earth works to bring him home."
    },


    {
        id: 5,
        title: "Whiplash",
        year: 2014,
        rating: 8.5,
        genre: "drama",
        genreLabel: "Drama",
        duration: "1h 46m",
        number: "05",

        moods: [
            "intense",
            "emotional"
        ],

        description:
            "A young drummer enters an intense musical program where ambition and perfection collide."
    },


    {
        id: 6,
        title: "The Grand Budapest Hotel",
        year: 2014,
        rating: 8.1,
        genre: "comedy",
        genreLabel: "Comedy",
        duration: "1h 39m",
        number: "06",

        moods: [
            "fun"
        ],

        description:
            "A legendary concierge and his young lobby boy become involved in a bizarre adventure surrounding a priceless painting."
    },


    {
        id: 7,
        title: "Avengers: Endgame",
        year: 2019,
        rating: 8.4,
        genre: "action",
        genreLabel: "Action",
        duration: "3h 1m",
        number: "07",

        moods: [
            "intense",
            "emotional",
            "adventure"
        ],

        description:
            "The remaining heroes of Earth unite for one final attempt to reverse a devastating event and restore what was lost."
    },


    {
        id: 8,
        title: "The Prestige",
        year: 2006,
        rating: 8.5,
        genre: "thriller",
        genreLabel: "Thriller",
        duration: "2h 10m",
        number: "08",

        moods: [
            "mind",
            "intense"
        ],

        description:
            "Two rival magicians become obsessed with creating the ultimate illusion, with increasingly dangerous consequences."
    }

];


// ==========================================
// DOM ELEMENTS
// ==========================================

const movieGrid =
    document.getElementById("movie-grid");

const searchInput =
    document.getElementById("movie-search");

const filterButtons =
    document.querySelectorAll(".filter");

const moodButtons =
    document.querySelectorAll(".mood-btn");

const clearMood =
    document.getElementById("clear-mood");

const watchlistGrid =
    document.getElementById("watchlist-grid");

const watchlistCount =
    document.getElementById("watchlist-count");

const watchlistTotal =
    document.getElementById("watchlist-total");

const emptyWatchlist =
    document.getElementById("empty-watchlist");

const movieModal =
    document.getElementById("movie-modal");

const modalBody =
    document.getElementById("modal-body");

const modalClose =
    document.getElementById("modal-close");

const trailerModal =
    document.getElementById("trailer-modal");

const trailerClose =
    document.getElementById("trailer-close");

const themeToggle =
    document.getElementById("theme-toggle");

const heroAdd =
    document.getElementById("hero-add");

const heroWatch =
    document.getElementById("hero-watch");


// ==========================================
// STATE
// ==========================================

let watchlist =
    JSON.parse(
        localStorage.getItem(
            "cinescope-watchlist"
        )
    ) || [];

let selectedGenre = "all";

let selectedMood = "all";


// ==========================================
// WATCHLIST STORAGE
// ==========================================

function saveWatchlist() {

    localStorage.setItem(
        "cinescope-watchlist",
        JSON.stringify(watchlist)
    );

}


// ==========================================
// MOVIE CARD
// ==========================================

function createMovieCard(movie) {

    const saved =
        watchlist.includes(movie.id);

    return `

        <article class="movie-card">

            <div class="poster">

                <div class="poster-number">
                    ${movie.number}
                </div>

                <div class="poster-title">
                    ${movie.title}
                </div>

                <button
                    class="favorite ${saved ? "saved" : ""}"
                    onclick="toggleWatchlist(${movie.id})"
                    aria-label="Toggle watchlist"
                >
                    ${saved ? "♥" : "♡"}
                </button>

            </div>


            <div class="movie-info">

                <h3>
                    ${movie.title}
                </h3>

                <div class="movie-meta">

                    <span class="movie-rating">
                        ★ ${movie.rating}
                    </span>

                    <span>
                        ${movie.year}
                    </span>

                    <span>
                        ${movie.genreLabel}
                    </span>

                </div>


                <button
                    onclick="openMovieDetails(${movie.id})"
                >
                    View details →
                </button>

            </div>

        </article>

    `;
}


// ==========================================
// FILTER + SEARCH ENGINE
// ==========================================

function renderMovies() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    const results =
        movies.filter(movie => {

            const genreMatch =
                selectedGenre === "all" ||
                movie.genre === selectedGenre;


            const moodMatch =
                selectedMood === "all" ||
                movie.moods.includes(
                    selectedMood
                );


            const searchMatch =
                movie.title
                    .toLowerCase()
                    .includes(searchTerm) ||

                movie.genreLabel
                    .toLowerCase()
                    .includes(searchTerm);


            return (
                genreMatch &&
                moodMatch &&
                searchMatch
            );

        });


    movieGrid.innerHTML =
        results
            .map(createMovieCard)
            .join("");


    const noResults =
        document.getElementById(
            "no-results"
        );


    noResults.style.display =
        results.length === 0
            ? "block"
            : "none";

}


// ==========================================
// GENRE FILTER
// ==========================================

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            selectedGenre =
                button.dataset.genre;


            renderMovies();

        }
    );

});


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    renderMovies
);


// ==========================================
// MOOD MATCH
// ==========================================

moodButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            moodButtons.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            selectedMood =
                button.dataset.mood;


            renderMovies();

        }
    );

});


// ==========================================
// CLEAR MOOD
// ==========================================

clearMood.addEventListener(
    "click",
    () => {

        selectedMood = "all";


        moodButtons.forEach(button => {

            button.classList.remove(
                "active"
            );

        });


        renderMovies();

    }
);


// ==========================================
// WATCHLIST
// ==========================================

function toggleWatchlist(movieId) {

    if (
        watchlist.includes(movieId)
    ) {

        watchlist =
            watchlist.filter(
                id => id !== movieId
            );

    } else {

        watchlist.push(movieId);

    }


    saveWatchlist();

    renderMovies();

    renderWatchlist();

    updateHeroButton();

}


// ==========================================
// DISPLAY WATCHLIST
// ==========================================

function renderWatchlist() {

    const savedMovies =
        movies.filter(movie =>
            watchlist.includes(
                movie.id
            )
        );


    watchlistCount.textContent =
        savedMovies.length;


    watchlistTotal.textContent =
        `${savedMovies.length} saved`;


    if (
        savedMovies.length === 0
    ) {

        watchlistGrid.innerHTML = "";

        emptyWatchlist.style.display =
            "flex";

        return;

    }


    emptyWatchlist.style.display =
        "none";


    watchlistGrid.innerHTML =
        savedMovies
            .map(createMovieCard)
            .join("");

}


// ==========================================
// MOVIE DETAILS
// ==========================================

function openMovieDetails(movieId) {

    const movie =
        movies.find(
            item =>
                item.id === movieId
        );


    if (!movie) {
        return;
    }


    const saved =
        watchlist.includes(
            movie.id
        );


    modalBody.innerHTML = `

        <p class="eyebrow">
            MOVIE DETAILS
        </p>


        <h2 class="detail-title">
            ${movie.title}
        </h2>


        <p class="detail-rating">
            ★ ${movie.rating}
        </p>


        <p class="detail-description">
            ${movie.description}
        </p>


        <div class="detail-tags">

            <span>
                ${movie.genreLabel}
            </span>

            <span>
                ${movie.year}
            </span>

            <span>
                ${movie.duration}
            </span>

        </div>


        <div class="hero-actions">

            <button
                class="primary-btn"
                onclick="
                    toggleWatchlist(${movie.id});
                    openMovieDetails(${movie.id});
                "
            >
                ${
                    saved
                        ? "♥ Remove from Watchlist"
                        : "+ Add to Watchlist"
                }
            </button>


            <button
                class="secondary-btn"
                onclick="closeMovieModal()"
            >
                Close
            </button>

        </div>

    `;


    movieModal.classList.add(
        "open"
    );


    movieModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


// ==========================================
// CLOSE MOVIE DETAILS
// ==========================================

function closeMovieModal() {

    movieModal.classList.remove(
        "open"
    );


    movieModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


modalClose.addEventListener(
    "click",
    closeMovieModal
);


// ==========================================
// TRAILER
// ==========================================

function openTrailer() {

    trailerModal.classList.add(
        "open"
    );


    trailerModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeTrailer() {

    trailerModal.classList.remove(
        "open"
    );


    trailerModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


heroWatch.addEventListener(
    "click",
    openTrailer
);


trailerClose.addEventListener(
    "click",
    closeTrailer
);


// ==========================================
// HERO WATCHLIST
// ==========================================

function updateHeroButton() {

    const featured =
        movies[0];


    const saved =
        watchlist.includes(
            featured.id
        );


    heroAdd.textContent =
        saved
            ? "♥ In Watchlist"
            : "+ Add to Watchlist";

}


heroAdd.addEventListener(
    "click",
    () => {

        toggleWatchlist(
            movies[0].id
        );

    }
);


// ==========================================
// CLOSE MODALS WITH BACKDROP
// ==========================================

movieModal.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal-backdrop"
            )
        ) {

            closeMovieModal();

        }

    }
);


trailerModal.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal-backdrop"
            )
        ) {

            closeTrailer();

        }

    }
);


// ==========================================
// DARK / LIGHT MODE
// ==========================================

const savedTheme =
    localStorage.getItem(
        "cinescope-theme"
    );


if (
    savedTheme === "light"
) {

    document.body.classList.add(
        "light-mode"
    );

    themeToggle.textContent =
        "☀";

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-mode"
        );


        const isLight =
            document.body.classList.contains(
                "light-mode"
            );


        themeToggle.textContent =
            isLight
                ? "☀"
                : "◐";


        localStorage.setItem(
            "cinescope-theme",
            isLight
                ? "light"
                : "dark"
        );

    }
);


// ==========================================
// INITIAL LOAD
// ==========================================

renderMovies();

renderWatchlist();

updateHeroButton();