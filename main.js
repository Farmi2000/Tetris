const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
context.fillStyle = "#808080";
let grid = Array.from({length: gridHeight }, () => Array(gridWidth).fill(0));
const tetrominoes = [
    [[1, 1, 1, 1]],  // I shape
    [[1, 1, 0], [0, 1, 1]],     // Z shape
    [[0, 1, 1], [1, 1, 0]],  // S shape
    [[1, 1, 1], [0, 1, 0]],  // T shape
    [[1, 1], [1, 1]],        // O shape
    [[1, 1, 1], [1, 0, 0]],  // L shape
    [[1, 1, 1], [0, 0, 1]]   // J shape
];


const draw_tiles = function(start_x, start_y, tile_width, tile_height, rows, columns){
    for(let i = 0; i < rows; i++) {
        const x = tile_width * i + 0 * i + start_x;
        for(let j = 0; j < columns; j++) {
            const y = tile_height * j + 0 * j + start_y;
            context.fillRect(x, y, tile_width, tile_height);
        }  
    } 
}
function get_center_position(screen_width, screen_height, tile_width, tile_height, rows, columns){
    const width_total = tile_width * rows;
    const height_total = tile_height * columns;
    const center_x = screen_width / 2 - width_total / 2; 
    const center_y = screen_height / 2 - height_total / 2;
    return [center_x, center_y];
}
const tile_width = 32;
const tile_height = 32;
const rows = 12;
const columns = 22;
const center_position = get_center_position(canvas.width, canvas.height, tile_width, tile_height, rows, columns);
console.log(center_position);
draw_tiles(center_position[0], 0, tile_width, tile_height, 1, columns);
draw_tiles(center_position[0], 0, tile_width, tile_height, rows, 1);
draw_tiles(center_position[0] + tile_width * rows - tile_width , 0, tile_width, tile_height, 1, columns);
draw_tiles(center_position[0], tile_height * columns - tile_height , tile_width, tile_height , rows, 1);

function getRandomTetromino() {
    const index = Math.floor(Math.random() * tetrominoes.length); 
    return tetrominoes[index];
}

let currentPiece = getRandomTetromino();
let pieceX = 4, pieceY = 0; // Initial position of the piece 

function drawGrid() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                context.fillStyle = 'blue';
                context.fillRect(x, y, 1, 1);
            }
        });
    });
    currentPiece.forEach((row, y) => {
        row.foeEach((cell, x) => {
        if (cell) {
            context.fillStyle = 'red';
            context.fillRect(x + pieceX, pieceY, 1, 1);
            }
        });
    });
}

function moveDown() {
    pieceY++;
    if(collision()) {
        pieceY--; // Revert the position if it collides
        mergePiece(); // Add piece to the grid
        resetPiece(); // Spawn a new piece
    }
    drawGrid();
}

function collision() {
    for (let y = 0; y < currentPiece.length; y++) {
        for (let x = 0; x < currentPiece[y].length; x++) {
            if (
                currentPiece[y][x] &&
                (grid[y + pieceY] && grid[y + pieceY[x + pieceX]]) !== 0
            ) {
                return true;
            }
         }
    }
    return false;

}

function clearRows() {
    for (let y = gridHeight - 1; y >= 0; y--) {
        if (grid[y].every(cell => !== 0)) {
            grid.splice(y, 1); // Remove the row
            grid.unshift(Array(gridWidth).fill(0)); // Add a new empty row at the top
        }
    }
}

function gameLoop() {
    moveDown();
    clearRows();
    drawGrid();
}

setInterval(gameLoop, 500); // Adjust speed as needed

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') pieceX--;
    else if (event.key === 'ArrowRight') pieceX++;
    else if (event.key === 'ArrowDown') moveDown();
    else if (event.key === 'ArrowUp') rotatePiece();
    drawGrid();
});






 