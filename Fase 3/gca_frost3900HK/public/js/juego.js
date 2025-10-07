let movimientosValidosGlobal = [];
// eslint-disable-next-line no-unused-vars
let piezaSeleccionada = null;
let turno = 'w';
let movimientosRealizados = [];
const piezasRobadas = {
    w: [],
    b: []
}

// Aqui estan todas las funciones del juego, incluye modificaciones correspondientes a la entrega 3

function obtenerPosicionDesdeId(id) {
    const partes = id.split("-");
    return [parseInt(partes[1]), parseInt(partes[2])];
}

function puedeMover(color) {
    return color === turno;
}

function cambiarTurno() {
    turno = turno === 'w' ? 'b' : 'w';
}

function abreviarPieza(tipo) {
    switch (tipo) {
        case "king": return "R";
        case "queen": return "D";
        case "rook": return "T";
        case "bishop": return "A";
        case "knight": return "C";
        default: return "";
    }
}

function GenerarBandeja(FiguraRobada, Capturador, Bandejaid) {
    // eslint-disable-next-line no-undef
    const bandeja = document.getElementById(Bandejaid);
    // eslint-disable-next-line no-undef
    const icono = document.createElement("span");

    icono.textContent = FiguraRobada;
    icono.classList.add("pieza-robada");
    if(Capturador === "w"){
        icono.style.color = "#000";
    }
    else if (Capturador === "b"){
        icono.style.color = "#1a5f7a";
    }
    bandeja.appendChild(icono);
}

function regenerarBandejas() {

    // eslint-disable-next-line no-undef
    document.getElementById("BandejaP1").innerHTML = "";
    // eslint-disable-next-line no-undef
    document.getElementById("BandejaP2").innerHTML = "";

    piezasRobadas.w.forEach(figura => {
        GenerarBandeja(figura, "w", "BandejaP2");
    });

    piezasRobadas.b.forEach(figura => {
        GenerarBandeja(figura, "b", "BandejaP1");
    });
}

function actualizarHistorialVisual(filaOrigen, colOrigen, filaDestino, colDestino, pieza) {
    const letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const colLetra = letras[colDestino];
    const filaNumero = 8 - filaDestino;

    const tipo = pieza.split("_")[1];
    const abreviado = tipo === "pawn" ? "" : abreviarPieza(tipo);
    const jugada = abreviado + colLetra + filaNumero;

    const columna = turno === 'w'
        // eslint-disable-next-line no-undef
        ? document.getElementById("movimientos-blancas")
        // eslint-disable-next-line no-undef
        : document.getElementById("movimientos-negras");

    // eslint-disable-next-line no-undef
    const nuevoMovimiento = document.createElement("li");
    nuevoMovimiento.textContent = jugada;
    columna.appendChild(nuevoMovimiento);
}


// eslint-disable-next-line no-undef
document.addEventListener("DOMContentLoaded", () => {
    // eslint-disable-next-line no-undef
    const tableroGuardado = localStorage.getItem("tablero");
    // eslint-disable-next-line no-undef
    const turnoGuardado = localStorage.getItem("turno");
    // eslint-disable-next-line no-undef
    const movimientosGuardados = localStorage.getItem("movimientos");

    const partidaId = window.location.pathname.split('/').pop();
    // eslint-disable-next-line no-undef
    const piezasGuardadas = localStorage.getItem("piezasRobadas");
    if (piezasGuardadas) {
        Object.assign(piezasRobadas, JSON.parse(piezasGuardadas));

        regenerarBandejas();
    }

    if (tableroGuardado && turnoGuardado) {
        // eslint-disable-next-line no-undef
        Object.assign(tablero, JSON.parse(tableroGuardado));
        turno = turnoGuardado;
        movimientosRealizados = JSON.parse(movimientosGuardados) || [];
        // eslint-disable-next-line no-undef
        generarTablero();
        actualizarHistorialMovimientos();

        console.log("Partida restaurada. Turno:", turno);
    }

    // eslint-disable-next-line no-undef
    document.querySelectorAll(".pieza").forEach(pieza => {
        pieza.setAttribute("draggable", "true");

        pieza.addEventListener("dragstart", e => {
            const id = pieza.id;
            piezaSeleccionada = pieza;
            const [fila, col] = obtenerPosicionDesdeId(id);
            // eslint-disable-next-line no-undef
            const piezaNombre = tablero[fila][col];

            if (!piezaNombre) {
                e.preventDefault();
                return;
            }

            const [color, tipo] = piezaNombre.split("_");

            if (!puedeMover(color[0])) {
                e.preventDefault();
                return;
            }

            switch (tipo) {
                case "pawn":
                    // eslint-disable-next-line no-undef
                    movimientosValidosGlobal = movimientosPeon(fila, col, color[0], tablero);
                    break;
                case "knight":
                    // eslint-disable-next-line no-undef
                    movimientosValidosGlobal = movimientosCaballo(fila, col, color[0], tablero);
                    break;
                case "bishop":
                    // eslint-disable-next-line no-undef
                    movimientosValidosGlobal = movimientosAlfil(fila, col, color[0], tablero);
                    break;
                case "rook":
                    // eslint-disable-next-line no-undef
                    movimientosValidosGlobal = movimientosTorre(fila, col, color[0], tablero);
                    break;
                case "queen":
                    // eslint-disable-next-line no-undef
                    movimientosValidosGlobal = movimientosReina(fila, col, color[0], tablero);
                    break;
                case "king":
                    // eslint-disable-next-line no-undef
                    movimientosValidosGlobal = movimientosRey(fila, col, color[0], tablero);
                    break;
            }

            pieza.style.opacity = "0";

            e.dataTransfer.setData("text/plain", pieza.id);
        });

        pieza.addEventListener("dragend", e => {
            pieza.style.opacity = "1";
            piezaSeleccionada = null;
        });
    });



    // eslint-disable-next-line no-undef
    document.querySelectorAll(".casilla").forEach(casilla => {
        casilla.addEventListener("dragover", e => e.preventDefault());

        casilla.addEventListener("drop", e => {
            e.preventDefault();
            const id = e.dataTransfer.getData("text/plain");
            // eslint-disable-next-line no-undef
            const origen = document.getElementById(id);
            const destino = e.currentTarget;

            const [fOrigen, cOrigen] = obtenerPosicionDesdeId(id);
            const [fDest, cDest] = obtenerPosicionDesdeId(destino.id);

            const esMovimientoValido = movimientosValidosGlobal.some(
                ([f, c]) => f === fDest && c === cDest
            );

            if (esMovimientoValido) {
                // eslint-disable-next-line no-undef
                const victima = tablero[fDest][cDest];
                let Figura = null;
                if (victima) {
                    const [ColorVictima, TipoVictima] = victima.split("_");
                    switch (TipoVictima) {
                        case "pawn":
                            Figura = "♟";
                            break;
                        case "knight":
                            Figura = "♞";
                            break;
                        case "bishop":
                            Figura = "♝";
                            break;
                        case "rook":
                            Figura = "♜";
                            break;
                        case "queen":
                            Figura = "♛";
                            break;
                        case "king":
                            Figura = "♚";
                            break;
                    }
                    piezasRobadas[turno].push(Figura);
                    // eslint-disable-next-line no-undef
                    localStorage.setItem("piezasRobadas", JSON.stringify(piezasRobadas));
                    if(turno === "w") {
                        const Capturador = "w";
                        GenerarBandeja(Figura, Capturador, "BandejaP2")
                    }
                    else if (turno === "b") {
                        const Capturador = "b";
                        GenerarBandeja(Figura, Capturador, "BandejaP1")
                    }
                    destino.classList.add("casilla-captura");
                    setTimeout(() => destino.classList.remove("casilla-captura"), 400);
                }

                destino.innerHTML = "";
                destino.appendChild(origen);

                // eslint-disable-next-line no-undef
                tablero[fDest][cDest] = tablero[fOrigen][cOrigen];
                // eslint-disable-next-line no-undef
                tablero[fOrigen][cOrigen] = "";

                origen.id = `pieza-${fDest}-${cDest}`;

                // eslint-disable-next-line no-undef
                const piezaMovida = tablero[fDest][cDest];

                movimientosRealizados.push({
                    pieza: piezaMovida,
                    de: [fOrigen, cOrigen],
                    a: [fDest, cDest],
                    turno: turno
                });

                actualizarHistorialVisual(fOrigen, cOrigen, fDest, cDest, piezaMovida);
                cambiarTurno();
                actualizarHistorialMovimientos();
                // eslint-disable-next-line no-undef
                    localStorage.setItem("tablero", JSON.stringify(tablero));
                // eslint-disable-next-line no-undef
                localStorage.setItem("turno", turno);
                // eslint-disable-next-line no-undef
                localStorage.setItem("movimientos", JSON.stringify(movimientosRealizados));

                // Enviar movimiento al servidor para guardar en MongoDB
                fetch('/playstation/mover', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: partidaId,
                        pieza: piezaMovida,
                        de: convertirCoordenada(fOrigen, cOrigen),
                        a: convertirCoordenada(fDest, cDest),
                        turno: turno,
                        tablero: tablero
                    })
                })
                    .then(res => res.text())
                    .then(msg => console.log("Movimiento guardado:", msg))
                    .catch(err => console.error("Error al guardar movimiento:", err));

            }

            movimientosValidosGlobal = [];
            piezaSeleccionada = null;
        });
    });

    // eslint-disable-next-line no-undef
    document.getElementById("rendirse").addEventListener("click", () => {
        const color = turno === 'w' ? 'Blancas' : 'Negras';
        // eslint-disable-next-line no-undef
        const confirmar = confirm(`${color} se rinden. ¿Deseas terminar la partida?`);

        if (confirmar) {
            // eslint-disable-next-line no-undef
            alert(`${color} han perdido por rendición.`);
            // eslint-disable-next-line no-undef
            Storage.clear();
            // eslint-disable-next-line no-undef
            location.reload();
        } else {
            return;
        }
    });

    // eslint-disable-next-line no-undef
    document.getElementById("reiniciar").addEventListener("click", () => {
        // eslint-disable-next-line no-undef
        const confirmar = confirm('¿Deseas reiniciar la partida?');
        if (confirmar){
            // eslint-disable-next-line no-undef
            localStorage.clear();
            // eslint-disable-next-line no-undef
            location.reload();
        } else {
            return;
        }
    });

    // eslint-disable-next-line no-undef
    document.getElementById("empatar").addEventListener("click", () => {
        const color = turno === 'w' ? 'Blancas' : 'Negras';
        // eslint-disable-next-line no-undef
        const confirmar = confirm(`${color} desea empatar, ¿Deseas empatar?`);
        if (confirmar){
            // eslint-disable-next-line no-undef
            localStorage.clear();
            // eslint-disable-next-line no-undef
            location.reload();
        } else {
            return;
        }
    });

});

function convertirCoordenada(fila, col) {
    const letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return letras[col] + (8 - fila);
}

function actualizarHistorialMovimientos() {
    // eslint-disable-next-line no-undef
    const listaBlancas = document.getElementById("movimientos-blancas");
    // eslint-disable-next-line no-undef
    const listaNegras = document.getElementById("movimientos-negras");

    if (!listaBlancas || !listaNegras) return;

    listaBlancas.innerHTML = "";
    listaNegras.innerHTML = "";

    movimientosRealizados.forEach(movimiento => {
        // eslint-disable-next-line no-undef
        const li = document.createElement("li");
        const [fOrigen, cOrigen] = movimiento.de;
        const [fDest, cDest] = movimiento.a;
        const algebraico = `${convertirCoordenada(fOrigen, cOrigen)} → ${convertirCoordenada(fDest, cDest)}`;
        li.textContent = algebraico;
        if (movimiento.turno === 'w') {
            listaBlancas.appendChild(li);
        } else {
            listaNegras.appendChild(li);
        }
    });
}



