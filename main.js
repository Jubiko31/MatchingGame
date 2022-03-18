//@author: juba_matsaberidze

var cards = [
    { "name": "Python", 'img': 'logos/python.png'},
    { "name": "JavaScript", 'img': "logos/javascript.png"},
    { "name": "HTML", 'img': "logos/html.png"},
    { "name": "CSS", 'img': "logos/css.png"},
    { "name": "Java", 'img': "logos/java.png"},
    { "name": "Kotlin", 'img': "logos/kotlin.png"},
    { "name": "Cpp", 'img': "logos/cpp.png"},
    { "name": "CSharp", 'img': "logos/csharp.png"},
    { "name": "Ruby", 'img': "logos/ruby.png"},
    { "name": "Swift", 'img': "logos/swift.png"},
    { "name": "PHP", 'img': "logos/php.png"},
    { "name": "Fortran", 'img': "logos/fortran.png"},

]

var gameGrid = cards.concat(cards);

//randomize cards' display on screen
gameGrid.sort(() => {
    return 0.5 - Math.random();
})

var game = document.getElementById('game-board');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (let i = 0; i < gameGrid.length; i++) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = gameGrid[i].name;
    //front of the card
    var face = document.createElement('div');
    face.classList.add('face');
    //back of the card
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    grid.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
}

//add count
var count = 0;
var previousTarget = null;
var delay = 1000;

//add match CSS
var guess1 = '';
var guess2 = '';

var match = () => {
    var selected = document.querySelectorAll('.selected');

    for (i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    }
}

//reset guesses
var reset = () => {
    guess1 = '';
    guess2 = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    for (let i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};



//add eventListener to the grid
grid.addEventListener('click', function(event) {
    var clicked = event.target;
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
        return;
    }

    if(count < 2) {
        count++;
        
        if (count === 1) {
            guess1 = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            guess2 = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        
        if (guess1 !== '' && guess2 !== '') {
            if(guess1 === guess2) {
                setTimeout(match, delay);
                setTimeout(reset, delay);
            } else {
                setTimeout(reset, delay);
            }
        }
        previousTarget = clicked;
    }
})

//add timer
