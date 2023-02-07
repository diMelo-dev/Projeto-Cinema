//Initial Data
let selectedMovie = new URLSearchParams(location.search).get("movieIndex");
let selectedSeats = [];
let price = 34;
checkUrl();
randomReservedSeats();

//Events
document.querySelector('.back-arrow').addEventListener('click', backClick);
document.querySelectorAll('.seats-group .seat').forEach(item => {
    item.addEventListener('click', e => {toggleSelectedSeat(e)});
});




//Functions
function backClick() {
    if(selectedMovie != null) {
        selectedMovie = parseInt(selectedMovie);
        
        let pageUrl = `films.html?movieIndex=${selectedMovie}`;

        window.location.href = pageUrl;
    }
}

function randomReservedSeats() {
    let seats = [];
    let reservedSeats = [];
    document.querySelectorAll('.seats-group .seat').forEach((item) => {
        let seatId = item.getAttribute('data-seat');
        seats.push(seatId);
    });
    
    let occupiedAmount = Math.floor(Math.random() * (seats.length / 2));

    for(let i = 0; i <= occupiedAmount; i++) {
        let randomSeatIndex = Math.floor(Math.random() * seats.length);
        let randomSeat = seats[randomSeatIndex];

        seats.splice(randomSeatIndex, 1)
        reservedSeats.push(randomSeat);
    }
    
    for(i in reservedSeats) {
        document.querySelector(`.seat[data-seat='${reservedSeats[i]}']`).classList.add('reserved');
    }
}

function toggleSelectedSeat(e) {
    let seat = e.target;
    let seatId = seat.getAttribute('data-seat');
    
    if(!seat.classList.contains('reserved')) {
        if (!seat.classList.contains('selected')) {
            seat.classList.add('selected');
            
            selectedSeats.push(seatId);
            updateSelectedSeats(seatId, 'Add');
        } else {
            seat.classList.remove('selected');
        
            selectedSeats = selectedSeats.filter(item => item !== seatId);
            updateSelectedSeats(seatId, 'Del');
        } 
    }
}

function updateSelectedSeats(seatId, action) {
    let selectedSeatsBox = document.querySelector('.selected-seats-list');
    let seatsDetailedBox = document.querySelector('.seats-detailed');


    switch (action) {
        case 'Add': 
            let seatBox = document.querySelector('.selected-seat').cloneNode(true);
            let seatDetailedBox = document.querySelector('.seat-detailed').cloneNode(true);
            let detailedPrice = 0;


            //SeatBox Data
            seatBox.innerHTML = seatId.toUpperCase();
            seatBox.setAttribute('data-seat', seatId);
            
            //SeatDetailedBox Data
            seatDetailedBox.setAttribute('data-seat', seatId);
            seatDetailedBox.querySelector('.detailed-code').innerHTML = seatId.toUpperCase();
            seatDetailedBox.querySelector('.seat-price').innerHTML = `R$ ${price.toFixed(2)}`;


            selectedSeatsBox.append(seatBox);
            seatsDetailedBox.append(seatDetailedBox);
            updateBookingRightVisibility();
            break;
        case 'Del':
            let removedSeat = document.querySelector(`.selected-seats-list [data-seat='${seatId}']`);
            let removedSeatDetailed = document.querySelector(`.seats-detailed [data-seat='${seatId}']`);

            
            selectedSeatsBox.removeChild(removedSeat);
            seatsDetailedBox.removeChild(removedSeatDetailed);
            updateBookingRightVisibility();
            break;
    }
    
    calculateTotalPrice();
}

function changePrice(methodBox) {
    let priceDiv = methodBox.nextElementSibling;

    switch (methodBox.value) {
        case 'full-price':
            priceDiv.innerHTML = `R$ ${price.toFixed(2)}`;
            break;
        case 'student-discount':
            priceDiv.innerHTML = `R$ ${( price * 0.5 ).toFixed(2)}`;
            break;
        default:
            priceDiv.innerHTML = `R$ ${price.toFixed(2)}`;
    } 
    
    calculateTotalPrice();
}

function calculateTotalPrice() {
    let priceArray = []
    let soma = 0;

    document.querySelectorAll('.seats-detailed .seat-price').forEach((item) => {
        priceArray.push(item.innerHTML);
    });

    for(i in priceArray) {
        soma += parseFloat(priceArray[i].split(' ')[1]);
    }

    document.querySelector('.info-action .total-price').innerHTML = `R$ ${soma.toFixed(2)}`;
}

function checkUrl() {
    if(selectedMovie != null) {
        selectedMovie = parseInt(selectedMovie);
        displayMovieInfo(selectedMovie);
    }
}

function displayMovieInfo(index) {
    let banner = document.querySelector('.banner');
    
    banner.style.backgroundImage = `url('assets/images/${movies[index].images.trailer}')`; 
    banner.querySelector('.banner-poster img').setAttribute('src', `assets/images/${movies[index].images.poster}`);
    banner.querySelector('.banner-title').innerHTML = movies[index].title;
    banner.querySelector('.banner-info-runtime').innerHTML = movies[index].runtime;
    banner.querySelector('.banner-info-genre').innerHTML = movies[index].genre;
    banner.querySelector('.banner-info-director').innerHTML = movies[index].director;
    banner.querySelector('.banner-info-year').innerHTML = movies[index].year;
    document.querySelector('.info-headline').innerHTML = movies[index].title;
}

function updateBookingRightVisibility() {
    if(selectedSeats.length > 0) {
        document.querySelector('.info-right-body').style.visibility = 'visible';
        document.querySelector('.info-right-body').style.opacity = 1;
        
        document.querySelector('.info-right-warning').style.display = 'none';
        document.querySelector('.info-right-warning').style.opacity = 0;
    } else {
        document.querySelector('.info-right-body').style.visibility = 'hidden';
        document.querySelector('.info-right-body').style.opacity = 0;
        
        document.querySelector('.info-right-warning').style.display = 'flex';
        document.querySelector('.info-right-warning').style.opacity = 1;
    }
}
