// Variables 

let round = 1
let maxRound = 3
let gameOver = false;
let timer;
let enemy;
let playerTurn = true;

const playerStat = {
    playerAtk: 0,
    playerHeal: 0,
    playerHealth: 10
}

const enemyStat = {
    enemyAtk: 0,
    enemyHealth: 10
}

// Cached Element References 

const atkBtnEl = document.querySelector('#attack')
const healBtnEL = document.querySelector('#heal')
const healthStatEL = document.querySelector('#health-stat')
const enemyHealthStatEl = document.querySelector('#enemy-health-stat')
const roundEl = document.querySelector('#current-round')
const roundBtnEl = document.querySelector('#next-round')
const lossMsgEl = document.querySelector('#loss-msg')
const winMsgEL = document.querySelector('#win-msg')
const retryBtnEl = document.querySelector('#restart')
const msgBoxEL = document.querySelector('#msg-box')
const display = document.querySelector('.display')

// Functions

function init() {
    console.log('Running')
    gameOver = false;
    lossMsgEl.classList.add('hidden')
    winMsgEL.classList.add('hidden')
    retryBtnEl.classList.add('hidden')
    roundBtnEl.classList.add('hidden')
    runGame()
}

function runGame() {
    checkGameOver()
    render()
    
}

function checkGameOver() {
    if (playerStat.playerHealth <= 0) {
        playerStat.playerHealth = 0
        gameOver = true
        render() 
    }
}

function render() {
    healthStatEL.textContent = playerStat.playerHealth
    enemyHealthStatEl.textContent = enemyStat.enemyHealth
    roundEl.textContent = round
    if(gameOver === true) {
        lossMsgEl.classList.remove('hidden')
        retryBtnEl.classList.remove('hidden')
        return
    }
    if(enemyStat.enemyHealth === 0) {
        roundBtnEl.classList.remove('hidden')
    }
    if (round === maxRound && enemyStat.enemyHealth === 0) {
        winMsgEL.classList.remove('hidden')
        retryBtnEl.classList.remove('hidden')
        if(round === 3) {
            roundBtnEl.classList.add('hidden')
        }
    }
    checkGameOver()
}

// function updateStat() {
//     enemyStat.enemyAtk += Math.floor(Math.random() * 4) + 1
//         if (roundEl === 2) {
//             enemyStat.enemyAtk += Math.floor(Math.random() * 6) + 1
//             playerStat.playerHealth = 15
//             enemyStat.enemyHealth = 15
//         }
        
//         if (roundEl === 3) {
//             enemyStat.enemyAtk += Math.floor(Math.random() * 8) + 1
//             playerStat.playerHealth = 20
//             playerStat.playerHealth = 20
//         }
//         checkGameOver()
// }

function atkBtnClick() {
    enemyStat.enemyHealth -= Math.floor(Math.random() * 3) + 1
    if (enemyStat.enemyHealth < 0) {
        enemyStat.enemyHealth = 0
    }
    if (playerStat.playerHealth < 0) {
        playerStat.playerHealth = 0
    }
    if(roundEl === 2) {
        enemyStat.enemyHealth -= Math.floor(Math.random() * 5) + 1
    }
    if(roundEl === 3) {
        enemyStat.enemyHealth -= Math.floor(Math.random() * 7) + 1
    }
    render()
    checkPlayerTurn()
}

function healBtnClick() {
    playerStat.playerHealth += Math.floor(Math.random() * 4) + 2
    if(playerStat.playerHealth > 10) {
        playerStat.playerHealth = 10
    }
    if (round === 2) {
        playerStat.playerHealth += Math.floor(Math.random() * 6) + 2
        if(playerStat.playerHealth > 15) {
            playerStat.playerHealth = 15
        }
    }
    if (round === 3) {
        playerStat.playerHealth += Math.floor(Math.random() * 8) + 2
        if(playerStat.playerHealth > 20) {
            playerStat.playerHealth = 20
        }
    }
    render()
    checkPlayerTurn()
}


function checkPlayerTurn() {
    if(gameOver === true || enemyStat.enemyHealth === 0) return
    if(playerTurn === true) {
        playerTurn = false
        atkBtnEl.disabled = true
        healBtnEL.disabled = true
        setTimeout(() => {
            enemyTurn()
            render()
        },2000 )
    } else {
        playerTurn = true
        atkBtnEl.disabled = false
        healBtnEL.disabled = false
    }
}

function enemyTurn() {
    playerStat.playerHealth -= Math.floor(Math.random() * 3) + 1
    if (roundEl === 2) {
        enemyStat.enemyAtk += Math.floor(Math.random() * 5) + 1
        playerStat.playerHealth = 15
        enemyStat.enemyHealth = 15
    }
                
    if (roundEl === 3) {
        enemyStat.enemyAtk += Math.floor(Math.random() * 7) + 1
        playerStat.playerHealth = 20
        playerStat.playerHealth = 20
    }
    checkPlayerTurn()
}


function retryClick() {
    playerStat.playerHealth = 10
    enemyStat.enemyHealth = 10
    init()
}

function nextRoundClick() {
    round = round + 1
    if(round === 2) {
        enemyStat.enemyHealth = 15
        playerStat.playerHealth = 15
    }
    if(round === 3) {
        enemyStat.enemyHealth = 20
        playerStat.playerHealth = 20
    }
    init()
    render()
}

init();
render();
checkGameOver();

// Event Listeners

atkBtnEl.addEventListener('click', atkBtnClick)
healBtnEL.addEventListener('click', healBtnClick)
retryBtnEl.addEventListener('click', retryClick)
roundBtnEl.addEventListener('click', nextRoundClick)