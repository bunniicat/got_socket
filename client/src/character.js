function getInfo(id) {
    fetch("https://anapioficeandfire.com/api/characters/" + id)
        .then(response => response.json())
        .then(charInfo => populateCard(charInfo));
}

const popup = document.getElementById("popup");

function populateCard(character) {
    popup.style.display = "block";
    document.getElementById("popupInfo").innerHTML = "";
    document.getElementById("popupInfo").innerHTML += `<div class="character-info">
    <p>Character Name: ${character.name}</p>
    <p>Gender: ${character.gender}</p>
    <p>Title: ${character.titles}</p>
    </div>`
}

window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

for (i = 1; i < 11; i++) {
    let button = document.getElementById(`btn${i}`);
    button.onclick = saveTokens;

    function saveTokens() {
        if ("playerToken1" in sessionStorage) {
            sessionStorage.setItem("playerToken2", this.getAttribute("data-image"));
            sessionStorage.setItem("playerName2", this.getAttribute("data-name"));
            if ("playerToken1" in sessionStorage && "playerToken2" in sessionStorage) {
                document.getElementById("instructions").innerHTML = `<a href="board.html"><button class="start-btn">Start Game</button></a>`
            }
        } else {
            sessionStorage.setItem("playerToken1", this.getAttribute("data-image"));
            sessionStorage.setItem("playerName1", this.getAttribute("data-name"));
        }
    }
}