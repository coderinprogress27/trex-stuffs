var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ObstaclesGroup
var count = 0
var trex
var trex2
var ground,groundpng
var invisibleGround
var cloudy
var CloudsGroup
var obstacle
var obstacle11
var obstacle2
var obstacle3
var obstacle4
var obstacle5
var obstacle6
var oof
var gameover
var restart
var gameovers
var restarts
function preload() {
  trex2=loadAnimation("trex1.png","trex3.png","trex4.png")
  oof=loadAnimation("trex_collided.png")
  groundpng=loadImage("ground2.png")
cloudy=loadImage("cloud.png")
obstacle=loadImage("obstacle.png")
obstacle11=loadImage("obstacle1.png")
obstacle2=loadImage("obstacle2.png")
obstacle3=loadImage("obstacle3.png")
obstacle4=loadImage("obstacle4.png")
obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
arggh=loadSound("die.mp3")
whoop=loadSound("checkPoint.mp3")
boingz=loadSound("jump.mp3")
gameovers=loadImage("gameOver.png")
restarts=loadImage("restart.png")
}

function setup() {
gameover = createSprite(300,100);
restart = createSprite(300,140);
    gameover.addImage("gameover",gameovers);
    gameover.scale = 0.5;
    restart.addImage("restart",restarts);
    restart.scale = 0.5;

  createCanvas(600, 200);
trex = createSprite(50,170,20,20);
trex.addAnimation("run",trex2)
trex.addAnimation("oof",oof)
trex.scale=0.5
  ground = createSprite(300,180,600,20);
ground.addImage(groundpng);
ground.x = ground.width /2;

  CloudsGroup=new Group();
  ObstaclesGroup=new Group();
//invisible Ground to support Trex
invisibleGround=createSprite(300,183,600,5);
invisibleGround.visible = false;
}

function draw() {
  background(245);
 if (gameState === PLAY) {
    gameover.visible=false;
restart.visible=false;
  }
  
  if (gameState === END) {
  gameover.visible=true;
restart.visible=true;
}
  if (gameState === PLAY){
  if (ground.x < 0){
    ground.x = ground.width/2;
   
}
  ground.velocityX=-8 
  
      if(keyDown("space")&& trex.y>149){
    trex.velocityY = -10 ;
    boingz.play();
      }
     if(count>0 && count % 100 === 0){
     whoop.play();
     }
  //add gravity
  trex.velocityY = trex.velocityY + 0.8; 

  trex.collide(invisibleGround);

  count =count+Math.round(getFrameRate() / 30);
  if(frameCount>200){ 
  spawnOuchies();
}
if (frameCount % 500 === 0) {
    ground.velocityX=ground.velocityX+2;
  }
spawnClouds();
  if(frameCount>2000){
  spawnpokes();
     }
if (trex.isTouching(ObstaclesGroup)){
gameState = END
arggh.play();
}
}
  else if (gameState === END){
    trex.changeAnimation("oof",oof);
    ground.velocityX = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    trex.velocityY=0; 
  }
if (mousePressedOver(restart)&&gameState===END) {
    trex.changeAnimation("run",trex2);
    ObstaclesGroup.destroyEach();
    CloudsGroup.destroyEach();
    count = 0;
    gameState = PLAY;
  }
  
    text("Score: "+ count, 530, 20); 
drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudy);
    cloud.scale = 0.5;
    cloud.velocityX = -8;
  
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}
function spawnOuchies()  {
  if(World.frameCount % 200 === 0) {
    var obstacle1 = createSprite(600,165,10,10);
    obstacle1.velocityX = -8;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle1.addImage(obstacle11)
    break
    case 2:obstacle1.addImage(obstacle2)
    break
    case 3:obstacle1.addImage(obstacle3)
    break
    case 4:obstacle1.addImage(obstacle4)
    break
    case 5:obstacle1.addImage(obstacle5)
    break
    case 6:obstacle1.addImage(obstacle6)
    break
    default:break
    }

    //assign scale and lifetime to the obstacle           
    obstacle1.scale = 0.5;
    obstacle1.lifetime = 70;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle1);
  }
}
  function spawnpokes() {
  //write code here to spawn the clouds
  if (frameCount% 200 === 0) {
    var obstacle= createSprite(600,170,40,10);
    obstacle.y = 370;
    obstacle.addImage(obstacle);
    obstacle.scale = 0.5;
    obstacle.velocityX = -10;
    
   ObstaclesGroup.add(obstacle);
  }
}