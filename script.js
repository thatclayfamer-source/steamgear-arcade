// =======================
// GAME DATA
// =======================
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

// =======================
// LOAD GAME CARDS
// =======================
function loadGames() {
  const container = document.getElementById("gameContainer");

  games.forEach((game) => {
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <div class="game-name">${game.name}</div>
      <button onclick="playGame('${game.file}')">Play</button>
    `;

    container.appendChild(card);
  });
}

// =======================
// PLAY GAME
// =======================
function playGame(file) {
  const overlay = document.getElementById("gameOverlay");
  const frame = document.getElementById("gameFrame");

  frame.src = file;
  overlay.style.display = "flex";
}

// =======================
// CLOSE GAME (X BUTTON ONLY)
// =======================
function closeGame() {
  const overlay = document.getElementById("gameOverlay");
  const frame = document.getElementById("gameFrame");

  frame.src = "";
  overlay.style.display = "none";
}

// =======================
// SUBMIT GAME BUTTON
// =======================
function openSubmit() {
  window.open("https://forms.gle/Avpzf4uzVMt2vWQv5", "_blank");
}

// =======================
// REMOVE ESC KEY FUNCTIONALITY (intentionally blank)
// =======================
// (ESC does nothing now)

// =======================
// INIT
// =======================
window.onload = () => {
  loadGames();
};
window.showFav = showFav;
