//Tenho q descobrir quantos filmes tem

//Com a quantidade de slides, calcular a largura do slider

//Para cada filme, copiar o modelo de slide e substituir as informaões

//Adicionar o slide criado no slider

//INITIAL DATA
let moviesAmount = movies.length;
let currentSlide = 0;
let slider = document.querySelector('.slider');
let slideWidth = document.querySelector('body').clientWidth;

slideGenerator();
calculateSliderWidth();



//EVENTS
window.addEventListener('resize', calculateSliderWidth);


//FUNCTIONS
function calculateSliderWidth() {
    slideWidth = document.querySelector('body').clientWidth;
    slider.style.width = `${moviesAmount * slideWidth}px`;
    document.querySelector('header').style.width = `${slideWidth}px`;
}

function slideGenerator() {
    for(i in movies) {
        let movieSlide = document.querySelector('.slide').cloneNode(true);

        //Fill in the slide data
        movieSlide.style.backgroundImage = `url('assets/images/${movies[i].images.bg}')`;
        movieSlide.style.backgroundSize = 'cover';
        movieSlide.setAttribute('id', i);
        movieSlide.querySelector('.movie-content-title').innerHTML = movies[i].title;
        movieSlide.querySelector('.movie-content-info-director').innerHTML = movies[i].director;
        movieSlide.querySelector('.movie-content-info-year').innerHTML = movies[i].year;
        movieSlide.querySelector('.movie-content-info-runtime').innerHTML = movies[i].runtime;
        movieSlide.querySelector('.movie-content-sinopse').innerHTML = movies[i].sinopse;
        movieSlide.querySelector('.trailer-box-img').style.backgroundImage = `url('assets/images/${movies[i].images.trailer}')`;
        movieSlide.querySelector('.trailer-button').setAttribute('data-movie', i);
        movieSlide.querySelector('.movie-button.bt-choose').setAttribute('data-movie', i);

        //Add the events
        movieSlide.querySelector('.bt-slide-back').addEventListener('click', slideClickBack);
        movieSlide.querySelector('.bt-slide-next').addEventListener('click', slideClickNext);
        movieSlide.querySelector('.trailer-button').addEventListener('click', (e) => { trailerClick(e) });
        movieSlide.querySelector('.modal').addEventListener('click', modalClick);
        movieSlide.querySelector('.movie-button.bt-choose').addEventListener('click', (e) => chooseClick(e));

        document.querySelector('.slider').append(movieSlide);
    }

    checkUrl();
    slider.style.display = 'flex';
}

function slideClickNext() {
    if(currentSlide + 1 >= movies.length) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    
    updateMargin();
}

function slideClickBack() {
    if(currentSlide - 1 < 0) {
        currentSlide = (movies.length - 1);
    } else {
        currentSlide--;
    }
    
    updateMargin();
}

function updateMargin() {
    margin = currentSlide * 100;
    slider.style.marginLeft = `-${margin}vw`;
}

function trailerClick(e) {
    let trailerButton = e.target.closest('.trailer-button');
    let index = trailerButton.getAttribute('data-movie');
    let movie = movies[index];
    let movieSlides = document.querySelectorAll('.slider .slide');
    let currentSlide = movieSlides[index];

    currentSlide.querySelector('.modal .modal-video').innerHTML = movie.trailer;
    currentSlide.querySelector('.modal').style.display = 'flex';
}

function modalClick() {
    document.querySelectorAll('.modal-video').forEach(item => {
        if(item.querySelector('.modal-video iframe') != null) {
            item.querySelector('.modal-video iframe').parentNode.removeChild(item.querySelector('.modal-video iframe'));
        };
        
        document.querySelectorAll('.modal').forEach(item => {
            item.style.display = 'none';
        });
    });
}

function checkUrl() {
    let selectedMovie = new URLSearchParams(location.search).get("movieIndex");
    
    if(selectedMovie != null) {
        selectedMovie = parseInt(selectedMovie);
        currentSlide = selectedMovie;
        updateMargin();
    }
}

function chooseClick(e) {
    let button = e.target.closest('.bt-choose');
    let movieIndex = button.getAttribute('data-movie');
    let pageUrl = `booking.html?movieIndex=${movieIndex}`;

    window.location.href = pageUrl;
}