
window.addEventListener('DOMContentLoaded', (event) =>{


    let score = 0


    let keysPressed = {};

document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });


    let tutorial_canvas = document.getElementById("tutorial");


    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

 //   tutorial_canvas_context.scale(.1, .1);  // this scales the canvas
    tutorial_canvas.style.background = "#000000"




 let flex = tutorial_canvas.getBoundingClientRect();

 // Add the event listeners for mousedown, mousemove, and mouseup
 let tip = {}
 let xs
 let ys
 let tap = {}
 let xz
 let yz


 
 window.addEventListener('mousedown', e => {


    flex = tutorial_canvas.getBoundingClientRect();


    xs = e.clientX - flex.left;
    ys = e.clientY - flex.top;
      tip.x = xs
      tip.y = ys

      tip.body = tip

      for(let g = 0; g<guy.body.length; g++){
         if(squarecircle(guy.body[g].walls, tip)){

            viewer = new Selectedcell(guy.body[g])
         }
      }


   window.addEventListener('mousemove', beamdrag);
 });



 window.addEventListener('mouseup', e => {
 window.removeEventListener("mousemove", beamdrag);
 })

function beamdrag(e) {
flex = tutorial_canvas.getBoundingClientRect();
    xz = e.clientX - flex.left;
    yz = e.clientY - flex.top;
      tap.x = xz
      tap.y = yz


  }

  class Animal{
      constructor(){
          this.body = []
          this.xacc = 0
          this.yacc = 0
      }
      push(obj){
        this.body.push(obj)
      }
      live(){
          this.shift()
          for(let y = 0; y<this.body.length; y++){
              this.body[y].live()
          }
      }
      shift(){
        for(let y = 0; y<this.body.length; y++){
            this.body[y].walls.x += this.xacc
            this.body[y].walls.y+= this.yacc
            this.body[y].ball.x += this.xacc
            this.body[y].ball.y += this.yacc
            this.body[y].box.x += this.xacc
            this.body[y].box.y += this.yacc

            
        }
        this.yacc = 0
        this.xacc = 0
      }
  }

  class Cell{
      constructor(x, y, wid, hei){
          this.ball = new Circle(x+wid/2,y+hei/2, .8,  getRandomLightColor(), (Math.random()-.5)/1, (Math.random()-.5)/1)
          this.walls = new Rectangle(x-1,y-1,wid+2,hei+2, "white")
          this.box = new Rectangle(x,y,wid,hei, "black")

      }
      draw(){
          this.walls.draw()
          this.box.draw()
          this.ball.draw()
          if(squarecircle(this.walls, collectable)){
              score+=1
              collectable.x =Math.random()*tutorial_canvas.width
              collectable.y =Math.random()*tutorial_canvas.height
          }
      }
      move(){
          this.ball.move()

          if(this.ball.x < this.box.x){
            guy.xacc+=this.ball.xmom/1
            this.ball.x = this.box.x
            if(this.ball.xmom < 0){
                this.ball.xac*=.95
                this.ball.xmom*=-1
            }
         }
        if(this.ball.y < this.box.y){
            guy.yacc+=this.ball.ymom/1
            this.ball.y = this.box.y
            if(this.ball.ymom < 0){
                this.ball.yac*=.95
                this.ball.ymom*=-1
            }
      }
        if(this.ball.x > this.box.x+this.box.width){
            guy.xacc+=this.ball.xmom/1
            this.ball.x = this.box.width+this.box.x
            if(this.ball.xmom > 0){
                this.ball.xac*=.95
            this.ball.xmom*=-1
            }
        }
        if(this.ball.y > this.box.y+this.box.height){
            guy.yacc+=this.ball.ymom/1
            this.ball.y = this.box.height+this.box.y
            if(this.ball.ymom > 0){
                this.ball.yac*=.95
            this.ball.ymom*=-1
            }
        }
      }
      live(){
          this.move()
          this.draw()
      }
  }

  class Selectedcell{
      constructor(cell){
          this.cell = cell
          this.view = new Rectangle(0,0, this.cell.box.width*5, this.cell.box.height*5, "black")
          this.walls = new Rectangle(0,0, 5+(this.cell.box.width*5), 5+(this.cell.box.height*5), "white")
          this.viewball = new Circle(5*(this.cell.ball.x-this.cell.box.x), 5*(this.cell.ball.y-this.cell.box.y), 5, this.cell.ball.color)
      }
      draw(){
        // players(this.cell.ball)
        this.viewball = new Circle(5*(this.cell.ball.x-this.cell.box.x), 5*(this.cell.ball.y-this.cell.box.y), 5,  this.cell.ball.color)
        this.walls.draw()
        this.view.draw()
        this.viewball.draw()
      }
  }


    // can be drawn, or moved.
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){

            this.x+=this.xmom
            this.y+=this.ymom

        }
    }

    // can be drawn, or moved with friction.  and richochet 
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.xac = 0
            this.yac = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){

            // this.xmom*=.9999
            // this.ymom*=.9999   //friction

            this.xmom += this.xac
            this.ymom+=this.yac
            this.x += this.xmom
            this.y += this.ymom

            if(this.x+this.radius > tutorial_canvas.width){

                if(this.xmom > 0){
                this.xmom *= -1
                }

            }
            if(this.y+this.radius > tutorial_canvas.height){
                if(this.ymom > 0){
                this.ymom *= -1
                }

            }
            if(this.x-this.radius < 0){
                if(this.xmom < 0){
                    this.xmom *= -1
                }

            }
            if(this.y-this.radius < 0){

                if(this.ymom < 0){
                    this.ymom *= -1
                }
        
            }

            // ^ this reflects balls off the wall
            // the internal checks make it always return to the screen

        }


    }

    // let x = 0
    // let y = 0

     let circ = new Circle(125, 200, 10, getRandomLightColor(), Math.random()-.5, Math.random()-.5)  // starts with ramndom velocities and color
     let rect = new Rectangle ( 200, 200, 50, 80, getRandomLightColor())
    // rect.ymom = 1

    // example objects
    
    let splork1 = new Cell(300,300, 30, 30)
    let splork2 = new Cell(270,300, 30, 30)
    let splork3 = new Cell(240,300, 30, 30)
    let splork4 = new Cell(300,270, 30, 30)
    let splork5 = new Cell(270,270, 30, 30)
    let splork6 = new Cell(240,270, 30, 30)
    let splork7 = new Cell(300,240, 30, 30)
    let splork8 = new Cell(270,240, 30, 30)
    let splork9 = new Cell(240,240, 30, 30)

    let guy = new Animal()

    guy.push(splork1)

    guy.push(splork2)
    guy.push(splork3)

    guy.push(splork4)
    guy.push(splork5)
    guy.push(splork6)
    guy.push(splork7)
    guy.push(splork8)
    guy.push(splork9)

    let collectable = new Circle(500, 500, 10, "red")


    let viewer = new Selectedcell(guy.body[0])
// interval, fill this with game logic 
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(0, 0, tutorial_canvas.width, tutorial_canvas.height)  // refreshes the image

        players(viewer.cell.ball)
        viewer.draw()


        tutorial_canvas_context.font = `${28.5}px Arial`
        tutorial_canvas_context.fillStyle = "white";
        tutorial_canvas_context.fillText(`${score}`, 660, 30);





        guy.live()

        collectable.draw()
    }, 1) // length of refresh interval




    // run on any object with x/y attributes in the timer to give them wasd controls
    function players(racer){
        if (keysPressed['w']) {
                racer.yac -= .0001
        }
        if (keysPressed['a']) {
            racer.xac -= .0001
        }
        if (keysPressed['s']) {
            racer.yac += .0001
        }
        if (keysPressed['d']) {
            racer.xac += .0001
        }
        if (keysPressed[' ']) {
            racer.xac = 0
            racer.yac = 0
            racer.xmom = 0
            racer.ymom = 0
        }


        // any key combination can be made from a nested if statement, all keys can just be accessed by name (if you can find it)

    }





// can check if one circle contains the cneter of the other circle, and / or it can check if any constructed object with an x and y attribute is inside of a circle. With tinkering, this can check boundaries of two circles.
function intersects(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius * circle.radius;
}

// random color that will be visible on  blac backgroung
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 15)+1)];
    }
    return color;
  }


// checks if a square contains the centerpoint of a circle
function squarecircle(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}

// checks if two squares are intersecting ( not touching, for touching cnange the evaluations from ">" to ">=" etc)
function squaresquare(a, b){

    a.left = a.x
    b.left = b.x
    a.right = a.x + a.width
    b.right = b.x + b.width
    a.top = a.y 
    b.top = b.y
    a.bottom = a.y + a.height
    b.bottom = b.y + b.height



    if (a.left > b.right || a.top > b.bottom || 
        a.right < b.left || a.bottom < b.top)
    {
       return false
    }
    else
    {
        return true
    }
}





})