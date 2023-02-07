//INITIAL DATA
displayMovies();

//EVENTS


//FUNCTIONS
function displayMovies() {
    for(i in movies) {
        let movieCard = document.querySelector('.card').cloneNode(true);

        //Data
        movieCard.querySelector('.card-poster img').setAttribute('src', `assets/images/${movies[i].images.poster}`);
        movieCard.querySelector('.card-info-movie h1').innerHTML = movies[i].title;
        movieCard.querySelector('.card-info-movie h2').innerHTML = movies[i].runtime;
        movieCard.setAttribute('data-movie', i);

        //Events
        movieCard.addEventListener('click', e => {infoClick(e)});

        document.querySelector('.film-cards').append(movieCard);

    };
};


function infoClick(e) {
    let card = e.target.closest('.card');
    let movieIndex = card.getAttribute('data-movie');

    openHTML(movieIndex);
};

function openHTML(movieIndex) {
    let pageUrl = `films.html?movieIndex=${movieIndex}`;

    window.location.href = pageUrl;

}

