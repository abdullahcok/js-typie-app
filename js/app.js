const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


const words = [
  'sign for', 'i am the danger', 'playmaker', 'independent', 'rome', 'full-stack developer', 'evening lightlamp', 'advance english language', 'daily podcast', 'start-up for future', 'may is coming', 'daily projects make me crazy', 'caligula was right', 'fatih the conquerer', 'willy-hernangomez'
];

// init word
let randomWord;

//init score
let score = 0;

//init time
let time = 15;


//set difficulty to value in localStorage or slow
let difficulty = localStorage.getItem('difficulty') !== null ?
                 localStorage.getItem('difficulty') : 'slow';

// set difficulty to select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ?
                         localStorage.getItem('difficulty') : 'slow';

//focus on text on start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000);


// generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// console.log(getRandomWord());


//add word to dom
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}


//update time
function updateTime() {
  // console.log(1);
  time--;// console.log(1);
  timeEl.innerHTML = time + 's';

  if(time === 0){
    clearInterval(timeInterval);

    gameOver();
  }
}

// game over show on the screen
function gameOver(){
  endGameEl.innerHTML = `
    <h1>Time is over!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endGameEl.style.display = 'flex';
}


addWordToDom();

// ----------- event listners /////

// typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;
  // console.log(insertedText);

  if(insertedText === randomWord){
    addWordToDom();
    updateScore();

    // clear
    e.target.value = ''

    if (difficulty === 'fast') {
      time += 2;
    } else if (difficulty === 'average') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});


// settings btn click
settingsBtn.addEventListener('click', () =>
    settings.classList.toggle('hide'));

// settings select
settingsForm.addEventListener('change', e=> {
  difficulty = e.target.value;
  //console.log(difficulty);
  localStorage.setItem('difficulty', difficulty);
})
