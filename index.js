const spinner = document.querySelector('.spinner p');
const spinnerContainer = document.querySelector('.spinner');
let rotateCount = 0;
let startTime = null;
let rAF;
const btn = document.querySelector('button');
const result = document.querySelector('.result');
// function that takes 2 numbers and gives you a random number between them.
function random(min, max) {
   var num = Math.floor(Math.random() * (max - min)) + min;
   return num;
}
// add a draw() function to animate the spinner
function draw(timestamp) {
   if (!startTime) {
      startTime = timestamp;
   }
   rotateCount = (timestamp - startTime) / 3;
   rotateCount %= 360;
   spinner.style.transform = 'rotate(' + rotateCount + 'deg)';
   rAF = requestAnimationFrame(draw);
}
// hide the result and spinnerContainer to set up the initial state of the game.
result.style.display = 'none';
spinnerContainer.style.display = 'none';
//  create reset function which sets the app back to its original state, required to start the game
function reset() {
   btn.style.display = 'block';
   result.textContent = '';
   result.style.display = 'none';
}
// add event listener to start the game
btn.addEventListener('click', start);
// start function calls draw() function, displays the spinnerContainer, hides the start button. runs endGame function after anywhere between 5-10 seconds
function start() {
   draw();
   spinnerContainer.style.display = 'block';
   btn.style.display = 'none';
   setTimeout(setEndgame, random(5000, 10000));
}
// create endGame function cancels the animation, tells players when to go.
function setEndgame() {
   cancelAnimationFrame(rAF);
   spinnerContainer.style.display = 'none';
   result.style.display = 'block';
   result.textContent = 'PLAYERS GO!!';
   // add event listener that runs the keyHandler function after its been pressed.
   document.addEventListener('keydown', keyHandler);
   // keyHandler function sets the isOver status to false that will only change it if the correct keys are pressed.
   function keyHandler(e) {
      let isOver = false;
      console.log(e.key);
      // checks whether a or l were pressed to determine the winner.
      if (e.key === "a") {
         result.textContent = 'Player 1 won!!';
         isOver = true;
      } else if (e.key === "l") {
         result.textContent = 'Player 2 won!!';
         isOver = true;
      }
      // if game status isOver, remove event listener from keys which then resets the game after 5 seconds.
      if (isOver) {
         document.removeEventListener('keydown', keyHandler);
         setTimeout(reset, 5000);
      }
   };
}