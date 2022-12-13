let field = document.createElement("div");
document.body.appendChild(field);
field.classList.add("field");

for(let i=1; i<101; i++) {
    let excel = document.createElement("div"); 
    field.appendChild(excel);
    excel.classList.add("excel");
}

let excel = document.getElementsByClassName(`excel`);
let x = 1;
let y = 10;
for(let i=0; i<excel.length; i++ ) {
    if (x>10) {
        x=1;
        y--;
    }
    excel[i].setAttribute(`posX`, x);
    excel[i].setAttribute(`posY`, y);
    x++;
}

function generateSnake() {
    let posX = Math.round(Math.random() * (10-3)+3);
    let posY = Math.round(Math.random() * (10-1)+1);
    return [posX, posY];
}
let coordinates = generateSnake();
 let snakeBody = [document.querySelector(`[posX = "` + coordinates[0] +`"][posY = "` + coordinates[1] +`"]`), 
 document.querySelector(`[posX = "` + (coordinates[0]-1) +`"][posY = "` + coordinates[1] +`"]`), 
 document.querySelector(`[posX = "` + (coordinates[0]-2) +`"][posY = "` + coordinates[1] +`"]`)];

 for (let i=0; i<snakeBody.length; i++) {
    snakeBody[i].classList.add(`snakeBody`);
 }
 snakeBody[0].classList.add(`snakeHead`);

 let mouse;
 function createMouse() {
    function generateMouse() {
         let posX = Math.round(Math.random() * (10-1)+1);
         let posY = Math.round(Math.random() * (10-1)+1);
         return [posX, posY];
        }
        let mouseCordinates = generateMouse(); 
        mouse = document.querySelector (`[posX = "` + mouseCordinates[0] +`"][posY = "` + mouseCordinates[1] +`"]`);
        while(mouse.classList.contains(`snakeBody`)) {
            let mouseCordinates = generateMouse(); 
            mouse = document.querySelector (`[posX = "` + mouseCordinates[0] +`"][posY = "` + mouseCordinates[1] +`"]`);
        }
        mouse.classList.add(`mouse`);
    }
    createMouse();

    let direction = `right`;

    let input = document.createElement(`input`);
    document.body.appendChild(input);
    input.style.cssText = `
    margin: auto;
    margin-top: 40px;
    font-size: 30px;
    display: block
    `;

    let score = 0;
    input.value = `Очки: ${score}`;

    function move() {
        let snakeCordinates = [snakeBody[0].getAttribute(`posX`), snakeBody[0].getAttribute(`posY`)];
        snakeBody[0].classList.remove(`snakeHead`);
        snakeBody[snakeBody.length-1].classList.remove(`snakeBody`);
        snakeBody.pop();

        if (direction == `right`) {
            if (snakeCordinates[0] < 10) {
                snakeBody.unshift(document.querySelector(`[posX = "` + (+snakeCordinates[0]+1) +`"][posY = "` + snakeCordinates[1] +`"]`));
            } else {
                alert(`Игра окончена. Итого очков: ${score}`);
            }
        } else if (direction == `left`) {
            if (snakeCordinates[0] > 1) {
                snakeBody.unshift(document.querySelector(`[posX = "` + (+snakeCordinates[0]-1) +`"][posY = "` + snakeCordinates[1] +`"]`));
            } else {
                alert(`Игра окончена. Итого очков: ${score}`);
            }
        } else if (direction == `up`) {
            if (snakeCordinates[1] < 10) {
                snakeBody.unshift(document.querySelector(`[posX = "` + snakeCordinates[0] +`"][posY = "` + (+snakeCordinates[1]+1) +`"]`));
            } else {
                alert(`Игра окончена. Итого очков: ${score}`);
            }
        } else if (direction == `down`) {
            if (snakeCordinates[1] > 1) {
                snakeBody.unshift(document.querySelector(`[posX = "` + snakeCordinates[0] +`"][posY = "` + (+snakeCordinates[1]-1) +`"]`));
            } else {
                alert(`Игра окончена. Итого очков: ${score}`);
        }
    }

    if (snakeBody[0].getAttribute(`posX`) == mouse.getAttribute(`posX`) && snakeBody[0].getAttribute(`posY`) == mouse.getAttribute(`posY`)) {
        mouse.classList.remove(`mouse`);
        let a = snakeBody[snakeBody.length-1].getAttribute(`posX`);
        let b = snakeBody[snakeBody.length-1].getAttribute(`posY`);
        snakeBody.push(document.querySelector(`[posX = "` + a + `"][posY = "` + b + `"]`));
        createMouse();
        score++;
        input.value = `Очки: ${score}`;
    }

    if (snakeBody[0].classList.contains(`snakeBody`)) {
        setTimeout(() => {
           alert(`Игра окончена. Итого очков: ${score}`); 
        }, 200);
        clearInterval(interval);
    }

        snakeBody[0].classList.add(`snakeHead`);
        for (let i=0; i<snakeBody.length; i++) {
            snakeBody[i].classList.add(`snakeBody`);
        }
    }

    let interval = setInterval (move, 300);

    window.addEventListener(`keydown`, function(e) {
            if (e.which == 37 && direction != `right` || e.which == 65 && direction != `right`) { 
            direction = `left`;
        } else if (e.which == 38 && direction != `down` || e.which == 87 && direction != `down`) {
            direction = `up`;
        } else if (e.which == 39 && direction != `left` || e.which == 68 && direction != `left`) {
            direction = `right`;
        } else if (e.which == 40 && direction != `up` || e.which == 83 && direction != `up`) {
            direction = `down`;
        } else if (e.which == 13) {
            location.reload();
        }  
    });
