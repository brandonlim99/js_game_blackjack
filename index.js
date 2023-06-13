// set variables
let cards = [] // card in user's hand
let sum = 0 
let isAlive = false
let hasBlackJack = false // blackjack happens when sum = 21
let cardEl = document.querySelector("#card-el")
let sumEl = document.querySelector("#sum-el")
let initialEl = document.querySelector("#initial-el")

// functions
function getRandomNumber(){
    //number should be between 1 and 10 unless its ace, it will become 11
    var cardValue = Math.floor(Math.random()*10+1)
    return cardValue
}

function aceElevenOrOne(){
    let hasOne = false;
    let hasEleven = false;
    
    //to find the one and swap
    for(let j=0; j<cards.length; j++){
        if(cards[j] === 1){
            hasOne = true
        }
        if(cards[j] === 11){
            hasEleven = true
        }
    }
    console.log(cards)

    //prevent it from bursting
    if(sum>21 && hasEleven){
        var target = cards.indexOf(11)
        cards[target] = 1
        sum -= 10
    }
    
    //increase potential to win & prevent bursting if adding it will burst
    if(sum<21 && hasOne && sum+10 < 21){
        var target = cards.indexOf(1)
        cards[target] = 11
        sum += 10
        console.log(cards, sum)
    }
}

function startGame(){
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomNumber()
    let secondCard = getRandomNumber()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame(){

    //update the cards for Aces
    aceElevenOrOne()

    // updating the cards array & on webpage
    cardEl.textContent = "Cards: "
    for (let i=0; i < cards.length; i++){
        cardEl.textContent += cards[i] + " ";
    }
    
    //updating the sum & on webpage
    sumEl.textContent = `Sum: ${sum}`

    //logic behind blackjack
    if(sum < 21){
        initialEl.textContent = "Do you want a new card?"
    }
    else if (sum === 21){
        hasBlackJack = true
        initialEl.textContent = "Blackjack!"
    }
    else{
        isAlive = false
        initialEl.textContent = "You are out!"
    }
    
}

function newCard(){
    if(isAlive && !hasBlackJack){
        var newCard = getRandomNumber()
        sum += newCard
        cards.push(newCard)
        renderGame()
    }
}



