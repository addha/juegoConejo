//  Pro34 y 35 Sonido /ajuntar  canvas  deacuerdo al dispositivo/ estrellas puntuacion



const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;//_________________creacion una cuerda mas

var bg_img;
var food;
var rabbit;

var button,button2,button3;  /////anexo 2  botones mas
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

var star;//___________________________________ Insertar estrellas   34PRO
var star_img;

//__________________________-variables PRo35  ajuste de pantalla
var canvasWidth;
var canvasHeight;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  
  bk_song = loadSound('sound1.mp3');/// sonido de fondo
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  ////////////////////////anexo de estrellas______________________declararlas__     34PRO
  empty_star = loadAnimation("empty.png");
  one_star = loadAnimation("one_star.png");
  two_star = loadAnimation("stars.png");
  star_img = loadImage('star.png'); ///_______________________par de estrellas
 


   //////////////////////////////__________________________________
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
 // createCanvas(600,700);
  frameRate(80);
  //__________________________________ajuste canvas
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canvasWidth = displayWidth
    canvasHeight = displayHeight
    createCanvas(canvasWidth,canvasHeight);
    console.log("Es movil");
  }else{
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth,canvasHeight);
    console.log("No es movil");
    console.log("CanvasWidth: " +canvasWidth);
    console.log("CanvasHeight: " +canvasHeight);
  }


  bk_song.play();// sonido de fondo
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1_____________________________________________________________
  button = createImg('cut_btn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2   anexo de nuevo boton
   button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
   button2.mousePressed(mute);
 //_______________________________creacion de cuerdadas_________________________________________
   rope = new Rope(7,{x:120,y:90});
   rope2 = new Rope(8,{x:490,y:90});
  
//boton mute___________________________________
  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  //ground = new Ground(300,height,width,20);
  ground = new Ground(200,canvasHeight,600,20);  ///________________ajuste obj1 PRO35
  blink.frameDelay = 20;
  eat.frameDelay = 20;

 // bunny = createSprite(200,height-80,100,100);
  bunny = createSprite(170,canvasHeight-100,100,100);   ///________________ajuste obj1 PRO35
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  ////anexo imagenes de estrellas_______________________________PRO34
  star_display = createSprite(50,20,30,30);
  star_display.scale = 0.2;
  star_display.addAnimation('empty',empty_star);
  star_display.addAnimation('one',one_star);
  star_display.addAnimation('two',two_star);
  star_display.changeAnimation('empty');

  //sprite estrella__________________________creao objetos  tipo star___________________________-
  star = createSprite(320,50,20,20);
  star.addImage(star_img);
  star.scale=0.02;

  star2 = createSprite(50,330,20,20);
  star2.addImage(star_img);
  star2.scale=0.02;
//___________________________________________________________________________
  blower = createImg('baloon2.png');
  blower.position(260,370);
  blower.size(120,120);
  blower.mouseClicked(airblow);
  
  fruit = Bodies.circle(300,300,20);

  //Permite la union de dos objetos
  // Matter.Composite.add(rope.body,fruit);
 //Matter.Composite.add(rope2.body,fruit); // separacion entre objeto fruta  y objeto cuerda

 fruit_con = new Link(rope,fruit); //si omito el se unen ambos links  Matter.Composite.add(rope.body,fruit);  conecta la ambos objetos 
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
 // image(bg_img,0,0,width,height);
 image(bg_img,0,0,displayWidth+80,displayHeight);    ///________________ajuste obj3 PRO35
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
//____________________________________-mostrar
  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
   }


///Logica para  verificar una colision entre objeto fruta y estrella  PRO34


   if(collide(fruit,star,20)==true)
   {
     star.visible = false;
     star_display.changeAnimation('one');
   }

   if(collide(fruit,star2,40)==true)
   {
     star2.visible= false;
     star_display.changeAnimation('two');
   }   
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03});
  air.play();
}


