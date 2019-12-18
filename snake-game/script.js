
var Stage = this.document.getElementById('stage');
var Score_html = this.document.getElementById('score');

var Score = 0;
var context = Stage.getContext('2d');
var width = 600, height = 600, box_size = 10;

var r_square, Snake, direction;

Snake = []
Stage.width = width;
Stage.height = height;
direction = 'right'


var Square = function(x, y, w, h, color){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color;
  this.draw = function(){
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
    context.stroke();
  }
}
var vilocity = {
  dx :box_size,
  dy :0
}

addEventListener('keydown', function(event){
  if(event.key == 'ArrowRight' && direction != 'left'){
      direction = 'right';
      vilocity.dx = box_size;
      vilocity.dy = 0;
  }else if (event.key == 'ArrowLeft' && direction != 'right') {
      direction = 'left';
    vilocity.dx = -box_size;
    vilocity.dy = 0;
  }else if (event.key == 'ArrowUp'&& direction != 'down') {
      direction = 'up';
    vilocity.dx = 0;
    vilocity.dy = -box_size;
  }else if (event.key == 'ArrowDown' && direction != 'up') {
      direction = 'down';
    vilocity.dx = 0;
    vilocity.dy = box_size;
  }
})

function draw_background(color1, color2){
  var x;
  for( let i = 0; i< width / box_size; i++)
    for(let j = 0; j < height / box_size; j++){
      if(j % 2 == 0){
        if(i % 2 ==0){
          x = new Square(i * box_size, j * box_size, box_size, box_size, color1);
            x.draw();
        }
        else{
          x = new Square(i * box_size, j * box_size, box_size, box_size, color2);
            x.draw();
        }
      }else{
        if(i % 2 ==0){
          x = new Square(i * box_size, j * box_size, box_size, box_size, color2);
            x.draw();
        }
        else{
          x = new Square(i * box_size, j * box_size, box_size, box_size, color1);
            x.draw();
          }
      }
    }
}



function random_squar(){
  x = Math.floor(Math.random() * (width/ box_size))*box_size;
  y = Math.floor(Math.random() * (height/ box_size))*box_size;
  r_square = new Square(x, y, box_size, box_size, 'red');
  r_square.draw()
}

function init_snake(){

  let s ;
  for(let i = 0; i< 3; i++){
    s = new Square((10-i) * box_size, 10 * box_size, box_size, box_size, 'white');
    Snake.push(s);
  }
}

function draw_snake(){
  Snake[0].color = 'red'
  for(let i = 0; i< Snake.length; i++)
    Snake[i].draw();
}

function mov_snake(){

  new_x = Snake[0].x + vilocity.dx;
  new_y = Snake[0].y + vilocity.dy;
  if(new_x < width && new_x >= 0 && new_y < height && new_y >= 0){
  Snake[0].color = 'white'
  Snake.pop();
  new_head = new Square(new_x, new_y, box_size, box_size, 'red');
  Snake.unshift(new_head);
}else{
  location.reload();
}


}
function self_collision(){
  head_x = Snake[0].x;
  head_y = Snake[0].y;
  var i ;
  for(i = 1 ; i < Snake.length; i++){
      if(head_x == Snake[i].x && head_y == Snake[i].y){
        break;
      }

  }
  if (i < Snake.length)
    return true;
  else
    return false;
}

function collision(head, squar){
  if ((head.x == squar.x) && (head.y == squar.y))
    return true;
  else
    return false;
}

init_snake();
r_square = new Square(25 * box_size, 25 * box_size, box_size, box_size, 'red');
function main(){
  Score_html.textContent = 'Score : ' + Score;
  context.clearRect(0, 0, width, height);
  draw_background('#108E09', '#108E35');
  draw_snake();
  r_square.draw();
  if(self_collision()){
    location.reload();
  }
  if(collision(Snake[0], r_square)){
    new_head = new Square(Snake.length-1 * -box_size, Snake[Snake.length-1].y, box_size, box_size, 'white');
    Snake.push(new_head);
    Score += 1;
    random_squar();
  }
  mov_snake();

}
setInterval(main, 100);