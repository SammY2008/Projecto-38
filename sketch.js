var airplane, airplaneImg;
var sky, skyImg;
var bird, birdsImg;
var birdsG;
var coin, coinImg;
var coinG
var gameState = "play";
var END=0;
var score = 0;




function preload(){
  airplaneImg = loadImage("avion.png");
  skyImg = loadImage("cielo.jpg");
  birdImg = loadImage("pajaro1.png");
  coinImg = loadImage("coin.png");
  
  
}
function setup() {
  createCanvas(700, 400);
  airplane = createSprite(350,200);
  airplane.addImage(airplaneImg);
  airplane.scale = 0.3;
  airplane.setCollider("rectangle", 0, 0, 500, 200);   airplane.debug = false;
  
  
  sky = createSprite(200,200);
  sky.addImage(skyImg);
  sky.scale = 3;
  sky.velocityX = 4;
  
  birdsG = new Group();
  coinG = new Group();
  
}

function draw() {
  background("black");
  if(gameState === "play"){
 airplane.depth = airplane.depth +1; 
    
    sky.visible = true;
    airplane.visible = true;
  if(sky.x > 500){
    sky.x = 350;
    
  }
  if(coinG.isTouching(airplane)){
    coin.destroy();
    score = score +1;
    
  }
  if(birdsG.isTouching(airplane)){
    gameState = END;
    
  }
  airplane.y = World.mouseY;
  
  createBirds();
  createCoins();
  }
  if(gameState === END){
    textSize(24);
    stroke("red");
    fill("red");
    text("GAME OVER",300,200);
    textSize(20);
    stroke("white");
    fill("white");
    text("PRESIONA ESPACIO PARA VOLVER A JUGAR",220,300);
    airplane.visible = false;
    birdsG.destroyEach();
    sky.visible = false;
    coinG.destroyEach();
    if(keyDown("SPACE")){
      score = 0;
      gameState = "play";
    }
    
  
  }
  drawSprites();

  textSize(20);
  fill(255);
  text("gasolina recogida:"+ score,350,30);


}
function createBirds (){

if(frameCount % 60 ===0){
  bird = createSprite(-10,Math.round(random(400, 0)))
  bird.scale = 0.2
  bird.velocityX = 12;
  
  bird.addImage(birdImg);
  bird.setLifetime=600;
  birdsG.add(bird);
}
}
function createCoins (){

if(frameCount % 60 ===0){
  coin = createSprite(-75,Math.round(random(400, 0)))
  coin.scale = 0.03
  coin.velocityX = 9;
  
  coin.addImage(coinImg);
  coin.setLifetime=600;
  coinG.add(coin);
  coin.setCollider("circle",0,0,40);
  coin.debug = false;
}
}