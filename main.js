const tetrominoes = await fetch("tetrominoes.json").then(response => response.json());
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
context.fillStyle = "#808080";

const draw_tiles = function(start_x, start_y, tile_width, tile_height, rows, columns){
    for(let i = 0; i < rows; i++) {
        const x = tile_width * i + 0 * i + start_x;
        for(let j = 0; j < columns; j++) {
            const y = tile_height * j + 0 * j + start_y;
            context.fillRect(x, y, tile_width, tile_height);
        }  
    } 
}

const get_center_position = function(screen_width, screen_height, tile_width, tile_height, rows, columns){
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

console.log(tetrominoes);
console.log(center_position);
draw_tiles(center_position[0], 0, tile_width, tile_height, 1, columns);
draw_tiles(center_position[0], 0, tile_width, tile_height, rows, 1);
draw_tiles(center_position[0] + tile_width * rows - tile_width , 0, tile_width, tile_height, 1, columns);
draw_tiles(center_position[0], tile_height * columns - tile_height , tile_width, tile_height , rows, 1);