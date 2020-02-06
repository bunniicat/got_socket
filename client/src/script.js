let diceValue;

const playerOne = {
    tile: 1,
    playerTurn: true,
    playerToken: sessionStorage.getItem("playerToken1"),
    tokenId: 1,
    playerName: sessionStorage.getItem("playerName1")
};

const playerTwo = {
    tile: 1,
    playerTurn: false,
    playerToken: sessionStorage.getItem("playerToken2"),
    tokenId: 2,
    playerName: sessionStorage.getItem("playerName2")
};

function whoseTurn() {
    if (playerOne.playerTurn === true) {
        showTurn(playerOne);
    } else {
        showTurn(playerTwo);   
    }
}

function showTurn(player){
    const turn = document.getElementById("displayTurn");
    turn.innerHTML = "";
    if(diceValue === 6){
        turn.innerHTML += `<p>${player.playerName}, you rolled a 6, you get to roll again!</p>`
    } else {
        turn.innerHTML += `<p>${player.playerName}, it is your turn to roll the dice!</p>`
    }
}

function youRolled() {
    const rolled = document.getElementById("displayRoll");
    if (playerOne.playerTurn === false) {
        rolled.innerHTML = "";
        rolled.innerHTML += `<p>${playerOne.playerName}, you rolled a ${diceValue}!</p>`
    } else {
        rolled.innerHTML = "";
        rolled.innerHTML += `<p>${playerTwo.playerName}, you rolled a ${diceValue}!</p>`
    }
}

whoseTurn();

function theBoard() {
    for (i = 1; i < 31; i++) {
        document.getElementById("board-wrapper").innerHTML += `<div id="tile${i}" class="board-tile"><p class="board-tile-number">Tile ${i}</p>
        </div>`
    }
    document.getElementById("tile10").classList.add("trap");
    document.getElementById("tile22").classList.add("trap");
    document.getElementById("tile16").classList.add("trap");
    document.getElementById("tile18").classList.add("trap");
    document.getElementById("tile25").classList.add("trap");
}

function remove(elem) {
    elem.parentElement.removeChild(elem)
}

theBoard();

function placeToken() {
    document.getElementById(`tile${playerOne.tile}`).innerHTML += `<div id="token1${playerOne.tile}" class="bounceIn"> <img src="${playerOne.playerToken}"> </div>`
    document.getElementById(`tile${playerTwo.tile}`).innerHTML += `<div id="token2${playerTwo.tile}" class="bounceIn"> <img src="${playerTwo.playerToken}"> </div>`
}

placeToken();

const roll = document.querySelector('#roll');

roll.addEventListener('click', () => {
    diceValue = Math.ceil(Math.random() * 6);

    if (playerOne.playerTurn === true) {
        movePlayers(playerOne, playerOne.tokenId);
        if (diceValue != 6) {
            playerOne.playerTurn = false;
        }

    } else {
        movePlayers(playerTwo, playerTwo.tokenId);
        if (diceValue != 6) {
            playerOne.playerTurn = true;
        }
    }

    traps(playerOne, playerOne.tokenId);
    traps(playerTwo, playerTwo.tokenId);
    whoseTurn();
    youRolled();
})

function movePlayers(player, tokenid) {
    let elem = document.getElementById(`token${tokenid}${player.tile}`);
    elem.parentElement.removeChild(elem);
    player.tile = player.tile + diceValue;
    goal(player);
    document.getElementById(`tile${player.tile}`).innerHTML += `<div id="token${tokenid}${player.tile}" class="bounceIn"> <img src="${player.playerToken}">  </div>`
}



function traps(player, tokenid) {
    switch (player.tile) {
        case 10:
            swal({
                title: "You get pushed out of a window, you land on tile 5, have fun in a wheelchair!",
                showCancelButton: false,
                confirmButtonText: "OK",
                confirmButtonColor: "#000000",
            });
            remove(document.getElementById(`token${tokenid}${player.tile}`))
            player.tile = player.tile -= 5;
            document.getElementById(`tile${player.tile}`).innerHTML += `<div id="token${tokenid}${player.tile}"> <img src="${player.playerToken}">  </div>`
            break;
        case 22:
            swal({
                title: "One of your dragons die, you are not a great pet caretaker, as punishment go back 8 tiles",
                showCancelButton: false,
                confirmButtonText: "OK",
                confirmButtonColor: "#000000",
            });
            remove(document.getElementById(`token${tokenid}${player.tile}`))
            player.tile = player.tile -= 8;
            document.getElementById(`tile${player.tile}`).innerHTML += `<div id="token${tokenid}${player.tile}"> <img src="${player.playerToken}">  </div>`
            break;
        case 16:
            swal({
                title: "Your whole family gets slaughtered at a wedding, you go back 4 tiles while mourning their deaths",
                showCancelButton: false,
                confirmButtonText: "OK",
                confirmButtonColor: "#000000",
            });
            remove(document.getElementById(`token${tokenid}${player.tile}`))
            player.tile = player.tile -= 4;
            document.getElementById(`tile${player.tile}`).innerHTML += `<div id="token${tokenid}${player.tile}"> <img src="${player.playerToken}">  </div>`
            break;
        case 18:
            swal({
                title: "You freed all the slaves, +2 tiles for you!",
                showCancelButton: false,
                confirmButtonText: "OK",
                confirmButtonColor: "#000000",
            });
            remove(document.getElementById(`token${tokenid}${player.tile}`))
            player.tile = player.tile += 2;
            document.getElementById(`tile${player.tile}`).innerHTML += `<div id="token${tokenid}${player.tile}"> <img src="${player.playerToken}">  </div>`
            break;
        case 25:
            swal({
                title: "Jon gets killed by his squire, f*ck Olly, and f*ck you -move back 4 tiles",
                showCancelButton: false,
                confirmButtonText: "OK",
                confirmButtonColor: "#000000",
            });
            remove(document.getElementById(`token${tokenid}${player.tile}`))
            player.tile = player.tile -= 4;
            document.getElementById(`tile${player.tile}`).innerHTML += `<div id="token${tokenid}${player.tile}"> <img src="${player.playerToken}">  </div>`
            break;
    }
}

function announceWinner() {
    if ("winner" in sessionStorage) {
        const popup = document.getElementById("popup");
        popup.style.display = "block";
        winnerName = sessionStorage.getItem("winner");
        winnerAvatar = sessionStorage.getItem("winnerToken");
        document.getElementById("winner").innerHTML += `<div class="winnerAnnouncement">Congratulations, ${winnerName}!</div>
        <div class="winnerToken"><img src="${winnerAvatar}"></div>
        <div class="playAgainBtn"><a href="character-select.html"><button onclick="playAgain()">Play again</button></a></div>`
    }
}

function goal(player) {
    if (player.tile >= 30) {
        player.tile = 30
        sessionStorage.setItem("winner", player.playerName)
        sessionStorage.setItem("winnerToken", player.playerToken)
        announceWinner();
    }
}

function playAgain() {
    sessionStorage.clear();
}