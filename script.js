const container = document.querySelector(".seatcontainer");
const moviename = document.getElementById("movie-name");
const seats = document.querySelectorAll(".seat:not(.seatoccupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
let ticketPrice = +moviename.value;



populateUI()

function updateSelectedcount (){
    let selectedseats = document.querySelectorAll('.row .seatselected')
    // Storage in array
    
    const Seatindex = [...selectedseats].map(seat => [...seats].indexOf(seat)
    )

    

    //Local Stroge
    
    //JSON Stringfy
    //The JSON.stringify() static method converts a JavaScript value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.

    localStorage.setItem('selectedseats',JSON.stringify(Seatindex))
    let selectedseatcount = selectedseats.length
    total.innerText = ticketPrice*selectedseatcount
    count.innerText = selectedseatcount
    
}



function setMoviedata(movieIndex,Movieprice){
    localStorage.setItem('MovieseatIndex',movieIndex)
    localStorage.setItem('Movieticketprice',Movieprice)
}

function populateUI(){
    const selectedseat = JSON.parse(localStorage.getItem('selectedseats'))
    if(selectedseat !== null && selectedseat.length >0){
        seats.forEach((seat,index) => {
            if(selectedseat.indexOf(index) > -1){
                seat.classList.add('seatselected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('MovieseatIndex')
    if(selectedMovieIndex !== null){
        moviename.selectedIndex = selectedMovieIndex
        updateSelectedcount ()
    }


}

moviename.addEventListener('change', (e) =>{
    ticketPrice = +e.target.value;
    setMoviedata(e.target.selectedIndex, e.target.value)
    updateSelectedcount()

})


container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat')){
        e.target.classList.toggle("seatselected");
        updateSelectedcount()
    }
});







