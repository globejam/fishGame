var fishingRod;
var fishingRodImg;
var fisherman,fishermanImg;
var bg;
var fLineLength;
var hook,hookPos=862,hookPosY =672;
var deepSea;
var bluepurpleFish;
var greenFish;
var fishGroup;
var crabImg;
var hookINS;
var randomNub;
var byFish;
var ybFish;
var shakeFactor = 0;
var score = 0;
var life =185;
var fishImg;
var fishFrameCount =75
var times = 0
var scaryFish,scaryFish2,turtleImg
var boatMovingSound,boatidleSound
//loading Images,gifs,sounds
function preload(){
fishingRodImg = loadImage("./assets/FishingRod.png");
bg=loadImage("./assets/background.gif");
fishermanImg=loadImage("./assets/fishingBoat2 copy.png");
hook=loadImage("./assets/hook.png");
deepSea=loadGif("./assets/DI5 (1).gif");
bluepurpleFish=loadImage("./assets/bluePurpleFish.png");
greenFish=loadImage("./assets/green-YellowFish.png");
byFish=loadImage("./assets/bY.png");
ybFish=loadImage("./assets/yB.png");
lifeImage = loadImage("./assets/life.png");
scaryFish = loadImage("./assets/Scary_Fish.png");
scaryFish2 = loadImage("./assets/ScaryFish2.png");
turtleImg = loadImage("./assets/turtle.png");
boatMovingSound = loadSound("./assets/Boat moving sound.mp3");
boatidleSound = loadSound("./assets/Boat idle sound.mp3");
}

//setting up canvas and hook and fisherman sprite
function setup() {
  boatidleSound.loop();
  boatMovingSound.play();
 boatMovingSound.isPlaying = false
 fishImg = [];
  createCanvas(windowWidth,windowHeight);
 // fishingRod = createSprite(windowWidth/2+200,windowHeight/2-200,10,10);
  fisherman = createSprite(1050,980,10,10);
  hookINS = createSprite(902,800,100,100);
  hookINS.addImage(hook);
  hookINS.scale = 0.3
//fishingRod.addImage(fishingRodImg);
fisherman.addImage(fishermanImg);
fLineLength = 56;
fishGroup=new Group();

}
// creating the background,camera position and fishes and adding score
function draw() {
  
  times = times+1
//console.log(fishFrameCount);
  console.log(times);
  shakeFactor+=1
  fisherman.rotation = shakeFactor

 background(50);
  camera.position.y=hookPos;
  image(bg, 0, 0, width, height);
 
  image(deepSea, 0, 1050, width, height);
  rodLength()
  skake();
  fish(0,1200);
  
 hookINS.isTouching(fishGroup,removeFish)
  fishGroup.depth +=100
  fishGroup.setVelocityXEach(10)
  
  if(keyIsDown(LEFT_ARROW)){
    fisherman.x -=10
    if(boatMovingSound.isPlaying == true){
      boatMovingSound.play();
    }
  }

  if(keyIsDown(RIGHT_ARROW)){
    fisherman.x +=10
  }
 drawSprites();
 textSize(30)
  text("Score: "+score,1900,350+fLineLength);
 showLife();
 ChangeFrameCount();
}

//FUNCTIONS

//changing rod length
function rodLength(){
  fill("red");
  if(keyIsDown(UP_ARROW)&& fLineLength>=0){
    fLineLength -=2
  }

  if(keyIsDown(DOWN_ARROW)&& fLineLength<=872){
    fLineLength +=2
  }
   rect(fisherman.x-130,760,2,fLineLength);

 hookPos = 760+fLineLength
 hookPosY = fisherman.x-130
 hookINS.y = hookPos;
 hookINS.x = hookPosY;
}
//creating fishes and differnt images for fishes
function fish(x,y){
  
  if(frameCount%fishFrameCount==0){
  var fish = createSprite(x,Math.round(random(1200,1400)),80,80);
  fishGroup.add(fish);
  fish.scale = 0.5;
 
  randomNub = Math.round(random(1,7));

  switch(randomNub){
    case 1:
      fish.addImage(bluepurpleFish)
      break;

      case 2:
         fish.addImage(byFish);
      break;

      case 3:
        fish.addImage(greenFish);
      break;

      case 4:
        fish.addImage(ybFish);
      break;

      case 5:
        fish.addImage(scaryFish);
      break;

      case 6:
        fish.addImage(scaryFish2);
      break;

      case 7:
        fish.addImage(turtleImg);
      break;

      default :
      break;
  }

  
 
//move the fishes back to the other side of the screen when it touches the edge
  if(fish.position.x>1000){
    fish.position.x = x;
  }
  }

 
}
//giving score and health and loosing health
function removeFish(hookINS,fish){
  
  //console.log(fish);
 
//changing values of score
  if(randomNub === 1 && hookINS.isTouching(fishGroup)){
    score +=5
  }

  if(randomNub === 2 && hookINS.isTouching(fishGroup)){
    score +=3
  }
  if(randomNub === 3 && hookINS.isTouching(fishGroup)){
    score +=1
  }
  if(randomNub === 4 && hookINS.isTouching(fishGroup)){
    score +=1
  }

//changing values of life

  if(randomNub === 5 && hookINS.isTouching(fishGroup)){
    life -= 40
  }

  if(randomNub === 6 && hookINS.isTouching(fishGroup)){
    life -= 20
  }

  if(randomNub === 7 && hookINS.isTouching(fishGroup)){
   life  -= 1
  }
  fish.remove();
}
function skake(){
  if(shakeFactor>5){
    shakeFactor-=1.2
  }
}

 function showLife() {
  if(life<-1){
    life=-1
    gameOver();
  }
  if(life>185){
    life=185
  }
  image(lifeImage, width-230,400+fLineLength, 20, 20);
  fill("white");
  rect(width-200, 400+fLineLength, 185, 20);
  fill("#f50057");
  rect(width-200,400+fLineLength, life, 20);
  noStroke(); 
}

function ChangeFrameCount(){
  if(times == 288){
    fishFrameCount=70
  }else if(times == 576){
    fishFrameCount = 50
  }
  if(times==864){
    fishFrameCount = 25
  }
}
//function gameOver(){
  
//swal({
//   title: `Game Over`, 
 //  text: "You lost", 
 //  imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
 // imageSize: "100x100", 
 //   confirmButtonText: "Thanks For Playing"
   
 // })
 // if (isConfirm) { 
 //   location.reload(); 
 // } 
//}
function gameOver(){
swal(
  {
    title: `Try again`,
    text: "You lost", 
    imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
   imageSize: "100x100", 
    confirmButtonText: 'Play again'
    },
      function (isConfirm) {
      if (isConfirm) {
            location.reload();
          }
        }
      );
  }
