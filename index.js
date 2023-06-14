// set variables
let user = {
    cards: [],
    sum: 0
}

let dealer = {
    cards: [],
    sum: 0
}

let isAlive = false
let dealerAlive = true
let hasBlackJack = false // blackjack happens when sum = 21
let cardEl = document.querySelector("#card-el")
let sumEl = document.querySelector("#sum-el")
let initialEl = document.querySelector("#initial-el")
let dealerEl = document.querySelector("#dealer-el")
let dealerSumEl = document.querySelector("#dealer-sum-el")

// functions
function getRandomNumber(){
    //number should be between 1 and 10 unless its ace, it will become 11
    var cardValue = Math.floor(Math.random()*10+1)
    return cardValue
}

function aceElevenOrOne(person){
    let hasOne = false;
    let hasEleven = false;
    
    //to find the one and swap
    for(let j=0; j<person.cards.length; j++){
        if(person.cards[j] === 1){
            hasOne = true
        }
        if(person.cards[j] === 11){
            hasEleven = true
        }
    }

    //prevent it from bursting
    if(person.sum>21 && hasEleven){
        var target = person.cards.indexOf(11)
        person.cards[target] = 1
        person.sum -= 10
    }
    
    //increase potential to win & prevent bursting if adding it will burst
    if(person.sum<21 && hasOne && person.sum+10 < 21){
        var target = person.cards.indexOf(1)
        person.cards[target] = 11
        person.sum += 10
    }

}

function startGame(){
    //player variables
    isAlive = true
    hasBlackJack = false
    hasShownHand = false 
    let firstCard = getRandomNumber()
    let secondCard = getRandomNumber()
    user.cards = [firstCard, secondCard]
    user.sum = firstCard + secondCard

    //dealer variables
    let dealerFirstCard = getRandomNumber()
    let dealerSecondCard = getRandomNumber()
    dealer.cards = [dealerFirstCard, dealerSecondCard]
    dealer.sum = dealerFirstCard + dealerSecondCard
    
    //render game
    renderGame()
}

function renderGame(){

    //update the cards for Aces
    aceElevenOrOne(user)
    aceElevenOrOne(dealer)
    
    // updating the user cards array & on webpage
    cardEl.textContent = "Your Cards: "
    for (let i=0; i < user.cards.length; i++){
        cardEl.textContent += user.cards[i] + " "
    }

    // updating the dealer cards array & on webpage
    dealerEl.textContent = "Dealer's Cards: "
    for (let i=0; i< dealer.cards.length; i++){
        dealerEl.textContent += dealer.cards[i] + " "
    }

    //updating the sum & on webpage
    sumEl.textContent = `Sum: ${user.sum}`

    dealerSumEl.textContent = `Dealer's Sum: ${dealer.sum}`
    //logic behind blackjack
    if(user.sum < 21){
        initialEl.textContent = "Do you want a new card?"
    }
    else if (user.sum === 21){
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
        user.sum += newCard
        user.cards.push(newCard)
        renderGame()
    }
}

function showHand(){

    while(dealer.sum<21 && dealer.sum !== 21){
        var newDealerCard = getRandomNumber()
        dealer.sum += newDealerCard
        dealer.cards.push(newDealerCard)
        renderGame()
    }

    if(dealer.sum > 21){
        dealerAlive = false
    }

    if(dealerAlive && dealer.sum>user.sum){
        initialEl.textContent = "You lost!"
    } else if(dealerAlive && dealer.sum === user.sum){
        initialEl.textContent = "It's a tie!"
    } else{
        initialEl.textContent = "You win!"
    }
    
}

