

var listScores = document.querySelector('.high-scores');

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// To display the array from localStorage into a list 
listScores.innerHTML = highScores.map(scores => {
  return `<li>${scores.name}-${scores.score} </li> `
}) 
.join("");
// return back to homepage or restart quiz for another run
function returnHomepage() {
    window.location.href = "index.html";
}
// clears data from local storage and the page
function clearHighScores(){
  listScores.innerHTML = "";  
  localStorage.clear();
}

