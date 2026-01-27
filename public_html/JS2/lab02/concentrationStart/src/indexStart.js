/*  Overview
    This application simulates a concentration or memory game of 20 cards.
    The game begins with 20 (10 pairs of 2) cards "face down" on the board.
    The user clicks 2 cards at a time.  The cards are displayed "face up".
    After a brief pause the cards are removed from the board if they match
    or are turned "face down" if they are not.  The game is over when the 
    user has cleared all 20 cards from the board.

    There are 6 global variables that are used to keep track of the "state"
    of the application.
    -  imagePath - the folder where the cards are stored
    -  images - an array of 20 card file names
    -  firstPick - the 0 based index of the first card picked by the user
    -  secondPick - the 0 based index of the 2nd card picked by the user
    -  matches - the number of matches the user has removed from the board so far
    -  tries - the number of pairs of cards the user has selected so far

    The function handleClick is associated with the click event handler for each card.

    There are lots of  "helper" functions.  Comments in the code describe each of these functions.
    I've written more functions that I might have done to make each function as simple as possible.
*/

// start with these global variables
// the folder where your card images are stored
const imagePath = 'Cards/';
// an array that stores the images for each card
const images = Array(19).fill(null);
// the index of the first card picked by the user
let firstPick = -1;
// the index of the second card picked by the user
let secondPick = -1;
// statistics about this "round"
let matches = 0;
let tries = 0;

// --------------------------------- PART 1 --------------------------------------- //
// when the page loads, call the function init

document.addEventListener("DOMContentLoaded", init);

// this function initializes the page
function init()
{   
    fillImages()
    shuffleImages()
    showMatches()
    enableAllCards()
    showAllBacks()
    // fill the array of images by calling fillImages
    // shuffle them by calling shuffle images
    // show the number of matches on the page by calling showMatches
    // enable all of the card elements on the page by calling enableAllCards
    // show the backs of all of the cards by calling showAllBacks
}

// shows the number of matches and tries in the status element on the page
function showMatches() {
    // update the element on the page to display the variable matches and tries
    let status = document.querySelector("#status");
    status.innerHTML = `Matches: ${matches} Tries: ${tries}`;
}

// fills the array images with 10 pairs of card filenames
// card filenames follow this pattern:  cardvs.jpg where
// v is the first char of the value of the card and 
// s is the first char of the suit of the card
// example:  cardjh.jpg is the jack of hearts
function fillImages() {
    var values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
    var suits = ['h', 's'];
    // create a variable called index and set it to 0
    let index = 0;
    // create a for loop that iterates through each value in the values array
    for (let value of values){
        // create a for loop that iterates through each suit in the suits array
        for (let suit of suits){
            // set the element in the images array at index to a string that contains card + value + suit + .jpg
            // increment the index
            images[index] = `card${value}${suit}.jpg`;
            index ++
         
        }
    }

        // end for loop for the suits
    // end for loop for the values
}

// shuffles the elements in the images array
function shuffleImages() {
    // create a for loop that iterates through the images array
        // set rndIndex to a random number between 0 and 19
        // set a variable called temp to the current image from the array
        // set current image from the array to the element in images at the rndIndex
        // set the element at the rndIndex to temp
    // end for loop
    for (let i = 1; i < images.length; i++){
        const rndIndex = Math.floor(Math.random() * images.length);
        const temp = images[i];
        images[i] = images[rndIndex];
        images[rndIndex] = temp;
    }
    console.log(images)
}

// assigns the handleclick function to the onclick event for all cards
// on the page.  All cards have the name attribute set to card.
// It also sets the cursor (part of the style) to 'pointer'
function enableAllCards() {
    // create a variable called cards and set it equal to the elements on the page with a name of card
    // create a for loop that iterates through cards
        // set the onclick property for the current element in cards to handleClick
        // set the style.cursor to 'pointer' too
    // end for loop
    const cards = document.querySelectorAll("[name=card]");
    for (const card of cards){
        card.onclick = () => handleClick(card);
        card.style.cursor = 'pointer';
    }

}

// enables (see enable all) only the cards whose backgroundImage
// style property is not 'none'
function enableAllRemainingCards() {
    // create a variable called cards and set it equal to the elements on the page with a name of card
    // create a for loop that iterates through cards
        // if the style.backgroundImage of the current element in cards is not 'none'
            // set the onclick property for the current element in cards to handleClick
            // set the style.cursor to 'pointer' too
        // end if
    // end for loop
    const cards = document.querySelectorAll("[name=card]");
    for (let card of cards){
        if (card.style.backgroundImage == 'none'){
            card.onclick = () => handleClick(card);
            card.style.cursor = 'pointer';
        }
    }
}

// shows the back of one card based on it's index
// each card has an id attribute set to it's index in the html page
// the backgroundImage (style) is set to the url of the image
// for a card back to "show the back"
function showBack(index) {
    // create a variable card and set it equal to the ui element with an id of index
    // set the style.backgroundImage of card to the filename for the back of a card
    let card = document.getElementById(`${index}`);
    card.style.backgroundImage = `url(${imagePath}/black_back.jpg)`;
}

// shows the back for all cards
// calls showBack in the body of a for loop
function showAllBacks() {
    // create a loop that iterates through indices 0 to 19
        // call the function showBack for the current index
    // end for loop
    for (let i = 0; i < 20; i++){
        showBack(i);
    }
}
// END PART 1 - TEST THIS FAR //

// --------------------------------- PART 2 --------------------------------------- //
// this is the function that fires when the user clicks on a card
function handleClick(card) {
    // declare the variable index and assign it to the current card's id attribute
    // declare cardImage and assign it to the image for this card
    // set the backgroundImage to the url of the cardImage
    // disable the card 
    const index = card.id;
    console.log(card);
    const cardImage = images[index];
    card.style.backgroundImage = `url(${imagePath}${cardImage})`;
    // if this is the first card picked
    //      assign firstPick to index
    // else
    //      assign secondPick to index
    //      disable all of the cards
    //      set a timer for 2 seconds.  Call checkCards when it fires.
    // end if
    console.log(firstPick, secondPick)
    if (firstPick == -1){
        firstPick = index;
    }
    else {
        secondPick = index;
        disableAllCards();
        setTimeout(checkCards, 2000);
    }
}

// disable one card based on it's index
function disableCard(index) {
    var card = document.getElementById(`${index}`);
    card.onclick = () => {}; 
    card.style.cursor = 'none';
    console.log("disabled: " + card);
}

// disable all of the cards
function disableAllCards() {
    for (let i = 0; i < 20; i++){
        disableCard(i);
    }
}
// END PART 2 - TEST TO HERE //

// --------------------------------- PART 3 --------------------------------------- //
// checks the 2 cards that have been picked for matches 
function checkCards() {
    // increment the number of tries
    tries ++;
    // if the 2 cards match
    //      increment the number of matches
    //      remove the first(pick) card from the board
    //      remove the secon(pick) card from the board
    console.log(isMatch(firstPick, secondPick))
    if (isMatch(firstPick, secondPick)){
        matches ++;
        removeCard(firstPick);
        removeCard(secondPick);
        if (matches < 10){
            enableAllCards();
        }  
    } 
    else {
        showBack(firstPick);
        showBack(secondPick);
        enableAllCards();
    }
    //      if there are cards on the board
    //          enable all of the remaining cards
    //      end if
    // else
    //      turn the first(pick) card back over
    //      turn the second(pick) card back over
    //      enable all of the remaining cards
    // end if
    // update the matches and tries on the page
    // reset the firstpick to -1
    // reset the secondpick to -1
    showMatches()
    firstPick = -1;
    secondPick = -1;
}

// determines if the images in firstPick and secondPick are a matches
// 2 cards are a match if they have the same value
// cardvs.jpg is the pattern for card file names
function isMatch(first, second) {
    let output = false;
    let firstCard = images[first];
    let secondCard = images[second];
    if (firstCard.slice(4,5) === secondCard.slice(4,5)){
        output = true;
    }
    return output;
}

// removes one card from the board based on it's index
// set the backgroundImage to 'none' to remove the card
function removeCard(index) {
    let card = document.getElementById(`${index}`);
    card.style.backgroundImage = 'none';
}
// END PART 3 - TEST THE ENTIRE APP //



