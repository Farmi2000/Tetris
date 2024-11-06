const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
context.fillStyle = "#808080";
const tetrominoes = [
[[1, 1, 1, 1]]  // I shape
[[1, 1, 0], [0, 1, 1]]     // Z shape
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
    drawGrid.forEach((row, y) => {
        row.foeEach((cell, x) => {
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






 