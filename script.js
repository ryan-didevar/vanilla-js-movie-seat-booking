const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;
populateUI();
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
};
/**
 *
 * @param {number} movieIndex
 * @param {string} moviePrice
 */
const saveSelectedMovieInfo = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex
  }
};
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  saveSelectedMovieInfo(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat select event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
updateSelectedCount();