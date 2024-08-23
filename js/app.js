// Variables 

let round = 1
let maxRound = 3
let gameOver = false;
let timer;

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
    updateStat()
}

function runGame() {
    checkGameOver()
    updateStat()
    render()
    
}

function checkGameOver() {
    if (playerStat.playerHealth <= 0) {
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
    }
    if(enemyStat.enemyHealth === 0) {
        roundBtnEl.classList.remove('hidden')
    }
}

function updateStat() {
    enemyStat.enemyAtk += Math.floor(Math.random() * 4)
    
    // if(enemyStat.enemyHealth <= 0) {
        //     roundBtnEl.classList.remove('hidden')
        // }
        
        if (roundEl === 2) {
            enemyStat.enemyAtk += Math.floor(Math.random() * 6)
            playerStat.playerHealth = 15
            enemyStat.enemyHealth = 15
        }
        
        if (roundEl === 3) {
            enemyStat.enemyAtk += Math.floor(Math.random() * 8)
            playerStat.playerHealth = 20
            playerStat.playerHealth = 20
        }
}

function atkBtnClick() {
    enemyStat.enemyHealth -= Math.floor(Math.random() * 4)

    if(roundEl === 2) {
        enemyStat.enemyHealth -= Math.floor(Math.random() * 6)
    }
    if(roundEl === 3) {
        enemyStat.enemyHealth -= Math.floor(Math.random() * 8)
    }
    render()
}

function healBtnClick() {
    playerStat.playerHealth += Math.floor(Math.random() * 4)

    if (round === 2) {
        playerStat.playerHealth += Math.floor(Math.random() * 6)
    }
    if (round === 3) {
        playerStat.playerHealth += Math.floor(Math.random() * 8)
    }
    render()
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
    if (round > maxRound) {
        winMsgEL.classList.remove('hidden')
        retryBtnEl.classList.remove('hidden')
    }
    init()
    updateStat()
}

init();
render();
checkGameOver();

// Event Listeners

atkBtnEl.addEventListener('click', atkBtnClick)
healBtnEL.addEventListener('click', healBtnClick)
retryBtnEl.addEventListener('click', retryClick)
roundBtnEl.addEventListener('click', nextRoundClick)