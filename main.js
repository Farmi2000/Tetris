const tetrominoes = await fetch("tetrominoes.json").then(response => response.json());
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const tile_width = 32;
const tile_height = 32;

context.imageSmoothingEnabled = false;

const draw_tiles = function(start_x, start_y, rows, columns, color) {
    context.fillStyle = color;

    for(let i = 0; i < rows; i++) {
        const draw_x = tile_width * i + start_x;

        for(let j = 0; j < columns; j++) {
            const draw_y = tile_height * j + start_y;

            context.fillRect(draw_x, draw_y, tile_width, tile_height);
        }  
    } 
}

const draw_grid = function(start_x, start_y, width, height, colors, grid) {
    for(let i = 0; i < height; i++) {
        const draw_y = start_y + i * tile_height;
        const row = i * width;

        for(let j = 0; j < width; j++) {
            const draw_x = start_x + j * tile_width;
            const index = row + j;
            const id = grid[index];
            const color = colors[id];

            if(color !== undefined) {
                context.fillStyle = color;
                context.fillRect(draw_x, draw_y, tile_width, tile_height);
            } else {
                context.fillStyle = "white";
                context.fillRect(draw_x, draw_y, tile_width, tile_height);
            }
        }
    }
}

const draw_grid_lines = function(start_x, start_y, width, height, color) {
    const draw_width = tile_width * width;
    const draw_height = tile_height * height;

    context.fillStyle = color;

    for(let i = 0; i <= height; i++) {
        const draw_y = start_y + i * tile_height;

        context.fillRect(start_x, draw_y, draw_width, 1);
    }

    for(let i = 0; i <= width; i++) {
        const draw_x = start_x + i * tile_width;

        context.fillRect(draw_x, start_y, 1, draw_height);
    }
}

const get_center_position = function(screen_width, screen_height, tile_width, tile_height, rows, columns){
    const width_total = tile_width * rows;
    const height_total = tile_height * columns;
    const center_x = screen_width / 2 - width_total / 2; 
    const center_y = screen_height / 2 - height_total / 2;
    return [center_x, center_y];
}

const outer_color = "#808080";
const rows = 12;
const columns = 22;
const [centerX, centerY] = get_center_position(canvas.width, canvas.height, tile_width, tile_height, rows, columns);
const grid_width = 10; 
const grid_height = 20;
const grid = new Uint8Array(grid_width * grid_height);
const grid_line_color = "pink";
const colors = ["black", "cyan", "red", "green", "purple", "yellow", "orange", "blue"];
console.log(grid);
let last_time_stamp = 0;


const game_loop = function(time_stamp) {
    const delta_time = time_stamp - last_time_stamp;
    last_time_stamp = time_stamp;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw_tiles(centerX, 0, 1, columns, outer_color);
    draw_tiles(centerX, 0, rows, 1, outer_color);
    draw_tiles(centerX + tile_width * rows - tile_width, 0, 1, columns, outer_color);
    draw_tiles(centerX, tile_height * columns - tile_height, rows, 1, outer_color);    
    draw_grid(centerX + tile_width, tile_height, grid_width, grid_height, colors, grid);
    draw_grid_lines(centerX + tile_width, tile_height, grid_width, grid_height, grid_line_color);
    requestAnimationFrame(game_loop);
}
game_loop(0);
console.log(tetrominoes);



