function movimientosPeon(fila, col, color, tablero) {
    const dir = color === 'w' ? -1 : 1;
    const inicioFila = color === 'w' ? 6 : 1;
    const movimientos = [];

    const adelante = fila + dir;
    if (adelante >= 0 && adelante < 8 && tablero[adelante][col] === "") {
        movimientos.push([adelante, col]);

        // Si está en la fila inicial puede avanzar dos
        const dobleAdelante = fila + 2 * dir;
        if (fila === inicioFila && tablero[dobleAdelante][col] === "") {
            movimientos.push([dobleAdelante, col]);
        }
    }

    // Capturas diagonales
    for (let dx of [-1, 1]) {
        const x = col + dx;
        if (x >= 0 && x < 8 && adelante >= 0 && adelante < 8) {
            const destino = tablero[adelante][x];
            if (destino && destino.startsWith(color === 'w' ? 'b_' : 'w_')) {
                movimientos.push([adelante, x]);
            }
        }
    }

    return movimientos;
}

function movimientosCaballo(fila, col, color, tablero) {
    const movimientos = [];
    const saltos = [
        [-2, -1], [-2, 1],
        [-1, -2], [-1, 2],
        [1, -2], [1, 2],
        [2, -1], [2, 1]
    ];

    for (const [df, dc] of saltos) {
        const nf = fila + df;
        const nc = col + dc;
        if (nf >= 0 && nf < 8 && nc >= 0 && nc < 8) {
            const destino = tablero[nf][nc];
            if (!destino || destino.startsWith(color === 'w' ? 'b_' : 'w_')) {
                movimientos.push([nf, nc]);
            }
        }
    }

    return movimientos;
}

function movimientosAlfil(fila, col, color, tablero) {
    const movimientos = [];

    const direcciones = [
        [-1, -1], [-1, 1], // diagonales superiores
        [1, -1], [1, 1]    // diagonales inferiores
    ];

    for (const [df, dc] of direcciones) {
        let f = fila + df;
        let c = col + dc;

        while (f >= 0 && f < 8 && c >= 0 && c < 8) {
            const destino = tablero[f][c];
            if (destino === "") {
                movimientos.push([f, c]);
            } else {
                if (destino.startsWith(color === "w" ? "b_" : "w_")) {
                    movimientos.push([f, c]);
                }
                break; // no puede saltar sobre piezas
            }
            f += df;
            c += dc;
        }
    }

    return movimientos;
}

function movimientosTorre(fila, col, color, tablero) {
    const movimientos = [];

    const direcciones = [
        [-1, 0], [1, 0], // verticales
        [0, -1], [0, 1]  // horizontales
    ];

    for (const [df, dc] of direcciones) {
        let f = fila + df;
        let c = col + dc;

        while (f >= 0 && f < 8 && c >= 0 && c < 8) {
            const destino = tablero[f][c];
            if (destino === "") {
                movimientos.push([f, c]);
            } else {
                if (destino.startsWith(color === "w" ? "b_" : "w_")) {
                    movimientos.push([f, c]);
                }
                break;
            }
            f += df;
            c += dc;
        }
    }

    return movimientos;
}

function movimientosReina(fila, col, color, tablero) {
    const movimientos = [];

    movimientos.push(...movimientosAlfil(fila, col, color, tablero));
    movimientos.push(...movimientosTorre(fila, col, color, tablero));

    return movimientos;
}

function movimientosRey(fila, col, color, tablero) {
    const movimientos = [];
    const direcciones = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0], [1, 1],
    ];

    for (let [dx, dy] of direcciones) {
        const nuevaFila = fila + dx;
        const nuevaCol = col + dy;

        if (nuevaFila >= 0 && nuevaFila < 8 && nuevaCol >= 0 && nuevaCol < 8) {
            const destino = tablero[nuevaFila][nuevaCol];
            if (!destino || destino.startsWith(color === 'w' ? 'b_' : 'w_')) {
                movimientos.push([nuevaFila, nuevaCol]);
            }
        }
    }
    return movimientos;
}
