const pathImages = "./src/assets/icons/";

const state = {
    score:{
        playerScore: 0,
        enemyScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        playerBox: document.querySelector(".card-box.framed#enemy-cards"),
        enemy: document.getElementById("enemy-field-card"),
        enemyBox: document.querySelector(".card-box.framed#player-cards"),
    },
    actions:{
        button: document.getElementById("next-duel"),
    }
};

const playerSides = {
    player1: "player-cards",
    enemy: "enemy-cards"
};

const cardData = [
    {
        id:0,
        name:"Blue Eyes White Dragon",
        type:"paper",
        img:`${pathImages}dragon.png`,
        WinOf:[1],
        LoseOf:[2],
    },
    {
        id:1,
        name:"Dark Magician",
        type:"rock",
        img:`${pathImages}magician.png`,
        WinOf:[2],
        LoseOf:[0],
    },
    {
        id:2,
        name:"Exodia",
        type:"scissors",
        img:`${pathImages}exodia.png`,
        WinOf:[0],
        LoseOf:[1],
    },
];

function init() {
    drawCard(5, playerSides.player1);
    drawCard(5, playerSides.enemy);
};

init();

async function drawCard(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++ ){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    };
};

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
};

async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", `${pathImages}card-back.png`);
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if(fieldSide === playerSides.player1){
        cardImage.addEventListener('click', ()=>{
            setCardsField(cardImage.getAttribute("data-id"));
        });

        cardImage.addEventListener("mouseover", ()=> {
            drawSelectCard(idCard);
        });
    };

    

    return cardImage;
};

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attibute : "+ cardData[index].type;
}

async function setCardsField(cardId) {

    await removeAllCardsImages();

    let enemyCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.enemy.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.enemy.src = cardData[enemyCardId].img;

    let duelResult = await checkDuelResults(cardId, enemyCardId);

    await updateScore();
    await drawButton();
}

async function removeAllCardsImages() {
    let {playerBox, enemyBox} = state.fieldCards;

    // remove as cartas do oponente
    let imgElements = playerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    // remove as cartas do jogador
    let imgElementsPlayer = enemyBox.querySelectorAll("img");
    imgElementsPlayer.forEach((img) => img.remove());
}

async function checkDuelResults(playerCardId, enemyCardId) {
    let duelResults = "Empate";
    let playerCard = cardData[playerCardId];
}