const grid = document.getElementById("gameGrid");
const overlay = document.getElementById("overlay");
const frame = document.getElementById("gameFrame");

let currentGame = null;
let viewMode = "all"; // all | fav

/* ---------------- GAMES ---------------- */

const games = [
    { name:"Cookie clicker", file:"games/cookieclicker.html" },
    { name:"Drive mad", file:"games/drivemad.html" },
    { name:"fnaf", file:"games/fnaf.html" },
    { name:"fnaf 2", file:"games/fnaf2.html" },
    { name:"fnaf 3", file:"games/fnaf3.html" },
    { name:"fnaf 4", file:"games/fnaf4.html" }, 
    { name:"Google dino", file:"games/googledino.html" },
    { name:"Melon playground", file:"games/melonplayground.html" },
    { name:"Granny", file:"games/granny.html" },
    { name:"Granny 2", file:"games/granny2.html" },
    { name:"Level devil", file:"games/leveldevil.html" },
    { name:"OvO", file:"games/ovo.html" },
    { name:"Poly track", file:"games/polytrack.html" },
    { name:"Poor bunny", file:"games/poorbunny.html" },
    { name:"Run", file:"games/run.html" },
    { name:"Slope", file:"games/slope.html" },
    { name:"Tunnel rush", file:"games/tunnelrush.html" },
    { name:"Pixel speedrun", file:"games/pixelspeedrun.html" },
    { name:"PvZ", file:"games/plantsvszombies.html" },
    { name:"Tattle tail", file:"games/tattletail.html" },
    { name:"Terraria", file:"games/terraria.html" },
    { name:"Minecraft", file:"games/tuffclient.html" },
    { name:"Fire Boy and Water Girl", file:"games/fireboyandwatergirl.html" }
];

/* ---------------- FAVORITES ---------------- */

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function toggleFavorite(name){
    if(favorites.includes(name)){
        favorites = favorites.filter(f => f !== name);
    } else {
        favorites.push(name);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    render();
}

function showAll(){
    viewMode = "all";
    render();
}

function showFav(){
    viewMode = "fav";
    render();
}

/* ---------------- RENDER UI ---------------- */

function render(){

    grid.innerHTML = "";

    let list = games;

    if(viewMode === "fav"){
        list = games.filter(g => favorites.includes(g.name));
    }

    list.forEach(g => {

        const isFav = favorites.includes(g.name);

        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
            <h3>
                ${g.name}
                <span onclick="toggleFavorite('${g.name}')"
                style="
                    float:right;
                    cursor:pointer;
                    color:${isFav ? '#d4af37' : '#666'};
                    font-size:18px;
                ">
                    ★
                </span>
            </h3>

            <button onclick="playGame('${g.file}','${g.name}')">Play</button>
        `;

        grid.appendChild(card);
    });
}

render();

/* ---------------- PLAY GAME ---------------- */

function playGame(file,name){
    currentGame = name;
    frame.src = file;
    overlay.classList.remove("hidden");
}

function closeGame(){
    overlay.classList.add("hidden");
    frame.src = "";
    currentGame = null;
}

/* ESC CLOSE */
document.addEventListener("keydown",(e)=>{
    if(e.key === "Escape") closeGame();
});

/* ---------------- FULLSCREEN ---------------- */

function toggleFullscreen(){
    if(!document.fullscreenElement){
        overlay.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/* ---------------- SAVE SYSTEM ---------------- */

function clearSave(){
    if(currentGame){
        localStorage.removeItem("save_" + currentGame);
        alert("Save cleared");
    }
}

/* ---------------- SUBMIT GAME ---------------- */

function openSubmit(){

    let name = prompt("Enter game name to submit:");

    if(!name) return;

    fetch("/api/submit-game",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ gameName: name })
    })
    .then(() => {
        alert("Game submitted!");
    });
}

/* ---------------- ADMIN ---------------- */

const ADMIN_PASSWORD = "tommy0812";

async function openAdmin(){

    let pass = prompt("Enter admin password:");

    if(pass !== ADMIN_PASSWORD){
        alert("Wrong password");
        return;
    }

    const res = await fetch("/api/submissions?password=" + pass);
    const data = await res.json();

    if(!data.length){
        alert("No submissions yet.");
        return;
    }

    let text = "SUBMITTED GAMES:\n\n";

    data.forEach(g=>{
        text += "• " + g.game_name + "\n";
    });

    alert(text);
}

/* ---------------- GLOBAL ACCESS ---------------- */

window.playGame = playGame;
window.closeGame = closeGame;
window.toggleFullscreen = toggleFullscreen;
window.clearSave = clearSave;

window.openSubmit = openSubmit;
window.openAdmin = openAdmin;

window.toggleFavorite = toggleFavorite;
window.showAll = showAll;
window.showFav = showFav;
