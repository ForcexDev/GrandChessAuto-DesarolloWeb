const tablero = [
    ["b_rook", "b_knight", "b_bishop", "b_queen", "b_king", "b_bishop", "b_knight", "b_rook"],
    Array(8).fill("b_pawn"),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill("w_pawn"),
    ["w_rook", "w_knight", "w_bishop", "w_queen", "w_king", "w_bishop", "w_knight", "w_rook"]
];

function generarTablero() {
    // eslint-disable-next-line no-undef
    const container = document.getElementById("tablero-ajedrez");
    container.innerHTML = "";

    for (let fila = 0; fila < 8; fila++) {
        for (let col = 0; col < 8; col++) {
            // eslint-disable-next-line no-undef
            const casilla = document.createElement("div");
            casilla.classList.add("casilla");
            casilla.classList.add((fila + col) % 2 === 0 ? "blanca" : "negra");
            casilla.id = `casilla-${fila}-${col}`;

            const piezaData = tablero[fila][col];
            if (piezaData) {
                // eslint-disable-next-line no-undef
                const pieza = document.createElement("div");
                pieza.classList.add("pieza");
                pieza.setAttribute("draggable", "true");
                pieza.id = `pieza-${fila}-${col}`;

                // eslint-disable-next-line no-undef
                const img = document.createElement("img");
                img.src = `/img/playstation/${piezaData}_2x.png`;
                img.alt = piezaData;
                img.classList.add("pieza");

                pieza.appendChild(img);
                casilla.appendChild(pieza);
            }

            container.appendChild(casilla);
        }
    }
}

// eslint-disable-next-line no-undef
document.addEventListener("DOMContentLoaded", generarTablero);


