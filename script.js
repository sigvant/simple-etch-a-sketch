const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".screen");
const clearButton = document.getElementById('clear');
const resizeButton = document.getElementById('resize');

let pixel = '';
let gridsize = 64;
let isDown = false;
let color;
let black = 0;

screen.addEventListener('mousedown', () => {
    isDown = true;
    
});

screen.addEventListener('mouseup', () => {
    isDown = false;
    
});

screen.addEventListener('mouseleave', () => {
    isDown = false;
    
});

function randomColor(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

const drawGrid = (screenSize) => {
    //the loop populates the grid with empty pixel divs
    //respecting the number of columns and rows as defined
    //in the grid template functions
    for(i = 0; i < screenSize ** 2; i++) {
        pixel = document.createElement('div');
        pixel.classList.add("pixel");
        pixel.style.backgroundColor = 'white';
        screen.appendChild(pixel);
    }    
    
    // the following lines adjust the pixels in the grid setting the
    // number of columns and number of rows according to the size
    screen.style.gridTemplateColumns =  `repeat(${screenSize}, auto)`;
    screen.style.gridTemplateRows =  `repeat(${screenSize}, auto)`;
}

const clear = () => {
    screen.innerHTML = '';
    drawGrid(gridsize);
    active();
}

const active = () => {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => pixel.addEventListener('mouseover', () => {
        if(isDown){
            pixel.style.backgroundColor = `rgba(${randomColor(1, 255)}, ${randomColor(1, 255)}, ${randomColor(1, 255)}, ${1 - black})`;
            black += 0.001;
        } else {
            black = 0;
        }
    }));
}


clearButton.addEventListener('click', clear);

resizeButton.addEventListener('click', () => {
    gridsize = +prompt(`Please select a gridsize between 20 and 100:`, 50);
    while(isNaN(gridsize)) {
        gridsize = +prompt(`Please select a gridsize between 20 and 100:`, 50);
    }
    drawGrid(gridsize); 
    clear();
});



drawGrid(gridsize);
active();