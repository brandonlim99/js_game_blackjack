// set variables
let user = {
    name: "",
    cards: [],
    sum: 0,
    chips: 100
}

let dealer = {
    cards: [],
    sum: 0
}
let playerBet
let isAlive = false
let dealerAlive = true
let hasBlackJack = false // blackjack happens when sum = 21
let cardEl = document.querySelector("#card-el")
let sumEl = document.querySelector("#sum-el")
let initialEl = document.querySelector("#initial-el")
let dealerEl = document.querySelector("#dealer-el")
let dealerSumEl = document.querySelector("#dealer-sum-el")
let userStatsEl = document.querySelector("#user-stats")

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

function newGame(){
    playerBet = prompt("How much do you want to bet?")
    playerBet = Number(playerBet)

    while(playerBet > user.chips && playerBet != 0 && playerBet != null){
        alert("Bet amount can't be more than current number of chips")
        playerBet = prompt("How much do you want to bet?")
    }

    isAlive = true
    hasBlackJack = false
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

    //hide new game btn
    var hideNewGameBtn = document.querySelector("#newGame")
    hideNewGameBtn.style.display = "none"

    //shows the new card & show hand buttons
    var showNewCardBtn = document.querySelector("#newCard")
    var showHandBtn = document.querySelector("#showHand")

    showNewCardBtn.style.display = ""
    showHandBtn.style.display = ""
}

function startGame(){
    //player variables
    let playerName = prompt("Enter your name")
    user.name = playerName

    //new game
    newGame()

    //remove startgame btn
    var hideStartGameBtn = document.querySelector("#startGame")
    hideStartGameBtn.style.display = "none"
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
        user.chips -= playerBet

        //end of game
        endOfGame()
    }

    //render number of chips
    renderChips()
    
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
        user.chips -= playerBet
        renderChips()

    } else if(dealerAlive && dealer.sum === user.sum){
        initialEl.textContent = "It's a tie!"
    } else{
        initialEl.textContent = "You win!"
        user.chips += playerBet
        console.log(user.chips)
        renderChips()
    }
    
    //end of game
    endOfGame()
}

function renderChips(){
    userStatsEl.textContent = `${user.name}: ${user.chips} chips`
}

function endOfGame(){
    var showNewGameBtn = document.querySelector("#newGame")
    showNewGameBtn.style.display = ""

    var hideNewCardBtn = document.querySelector("#newCard")
    var hideShowHandBtn = document.querySelector("#showHand")

    hideNewCardBtn.style.display = "none"
    hideShowHandBtn.style.display = "none"
}