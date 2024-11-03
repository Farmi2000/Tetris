const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
context.fillStyle = "#808080";

console.time();
const tilewidth = 32
const tileheight = 32
const rows = 12
const columns = 22

for(let i = 0; i < rows; i++) {
    const x = tilewidth*i+5*i
    for(let j = 0; j < columns; j++){
        const y = tileheight*j+5*j
        context.fillRect(x, y, tilewidth, tileheight);
    
    }
    
}
console.timeEnd();


