var play = 1
var end = 0
var A=10
var oGroup
var cloudGrp
var trex, trex_running, trex_collided;
var Gameover,GameoverImg
var Retry,RetryImg
var ground, invisibleGround, groundImage;
var cloud, cloudImg
var jumpSound,DieSound,checkpointSound
var o,o1Img,o2Img,o3Img,o4Img,o5Img,o6Img
var gamestate = play
var S=0;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  GameoverImg = loadImage("GameoverImg.PNG")
  RetryImg = loadImage("Retry.PNG")
  cloudImg=loadImage("cloud.png")
  o1Img=loadImage("obstacle1.png")
  o2Img=loadImage("obstacle2.png")
  o3Img=loadImage("obstacle3.png")
  o4Img=loadImage("obstacle4.png")
  o5Img=loadImage("obstacle5.png")
  o6Img=loadImage("obstacle6.png")
  jumpSound=loadSound("smb_jump-small.wav")
  DieSound=loadSound("smb_gameover.wav")
  checkpointSound=loadSound("smb_stage_clear.wav")
  
 
  
}

function setup() {

  createCanvas(windowWidth, windowHeight)
  
  //create a trex sprite
  trex = createSprite(50,height-160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(width/2,height-70,width,2);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  Gameover= createSprite(width/2,height/2- 50)
  Gameover.addImage(GameoverImg)
  Gameover.scale=0.3
  Gameover.visible=false
  
  Retry = createSprite(width/2,height/2)
  Retry.addImage(RetryImg)
  Retry.scale=0.5
  Retry.visible=false
  
  oGroup = new Group()
  
  cloudGrp = new Group()
  
  //creating invisible ground
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)
  
  trex.setCollider("circle",0,0,40)
  trex.debug = false;
  
  
}

function draw() {
  //set background color
  background(180);
  
  //console.log(trex.y)
  console.log(A)
  
  textSize(25)
  text("score  "+S,1500,50)
  
  if(gamestate===play){
   // jump when the space key is pressed
  if((touches.length > 0 || keyDown("space"))&& trex.y >= 700) {
    trex.velocityY = -10;
    jumpSound.play();
    touches = [];
   }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
    //Spawn Clouds
    Clouds()
    Cactus();
    S=S+Math.round(getFrameRate()/60)
    if(S>0 && S%100===0){
       checkpointSound.play();      
    }
    if(trex.isTouching(oGroup)){
     gamestate = end 
     DieSound.play();
      //trex.velocityY=-10
      //jumpSound.play();
    }
      ground.velocityX = -(4+3*S/100);
  }  
  
  else if(gamestate===end){
   ground.velocityX=0 
   oGroup.setVelocityXEach(0)
   cloudGrp.setVelocityXEach(0)
    oGroup.setLifetimeEach(-1)
    cloudGrp.setLifetimeEach(-1)
    trex.velocityY=0;
    trex.changeAnimation("collided", trex_collided);
    Gameover.visible=true
    Retry.visible=true
  }
  
  if(touches.length>0 || mousePressedOver(Retry)){
    Restart();
    touches = []
  }
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

//function to spawn the clouds
function Clouds(){
if(frameCount%60==0){
cloud = createSprite(width+20,height-300,40,10)
cloud.addImage(cloudImg)
cloud.velocityX=-(5+S/100) 
cloud.scale=Math.random(0.5,1.5)
cloud.y=Math.round(random(30,120))
trex.depth=cloud.depth
trex.depth=trex.depth+1
cloud.lifetime=170
cloudGrp.add(cloud)
}
 
}
function Cactus(){
 if(frameCount%70==0){
 o = createSprite(600,height-95,20,30);
  o.scale=0.7
 var R=Math.round(random(1,6))
 switch(R){
   case 1:o.addImage(o1Img);
   break;
   case 2:o.addImage(o2Img);
   break;
   case 3:o.addImage(o3Img);
   break;
   case 4:o.addImage(o4Img);
   break;
   case 5:o.addImage(o5Img);
   break;
   case 6:o.addImage(o6Img);
   break;
   default:break;
 }
 o.velocityX=-(4+S/100)
 o.lifetime=170
 oGroup.add(o) 
 }
}

function Restart(){
gamestate=play;
Gameover.visible=false;
Retry.visible=false;
oGroup.destroyEach();
cloudGrp.destroyEach();
trex.changeAnimation("running", trex_running);
S=0;
}



