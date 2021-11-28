
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine;
var world;

var player;

var projs;

var enemies;

var enemySpawn;

var gameOverSoundPlayed;

var score;
var highscore;

var shootSound;
var killSound;
var gameOverSound;

var gameState = GameStates.PLAY

function setup() {

  createCanvas(600, 600);

  engine = Engine.create();
  world = engine.world;

  highscore = 0;

  shootSound = loadSound("./assets/sound/shoot.mp3");
  killSound = loadSound("./assets/sound/kill.mp3");
  gameOverSound = loadSound("./assets/sound/game_over.mp3");

  gameOverSoundPlayed = false;

  enemySpawnRate = 20;

  playerOpts = {
    isStatic: true
  }

  player = Matter.Bodies.circle(550, 50, 20, playerOpts)
  World.add(world, player)

  projs = [];

  enemies = [];
  
}

function generateEnemySpawn() {

  var side = round(random(0, 1));

  var pos = {

    x: null, 
    y: null

  }

  if (side == 0) {

    pos.x = 0;
    pos.y = random(0, 600);

  }

  else if (side == 1) {

    pos.x = random(0, 600);
    pos.y = 600;

  }

  return pos;

}


function draw() {

  background(0);

  ellipse(player.position.x, player.position.y, 40, 40);

  if (gameState == GameStates.PLAY) {
    score = round(frameCount / 5)
  }

  projs.forEach((proj) => {
    proj.display();
  })

  if (frameCount % 30 == 0 && gameState == GameStates.PLAY) {

    enemySpawn = generateEnemySpawn();
    enemies.push(new Enemy(enemySpawn.x, enemySpawn.y))
    console.log(gameState)

  }

  enemies.forEach((enemy) => {

    enemy.display();
    enemy.update();
    if (Matter.SAT.collides(enemy.body, player).collided) {
      gameState = GameStates.STOP;
      
    }
    
    projs.forEach((proj) => {
      if (Matter.SAT.collides(enemy.body, proj.body).collided) {
        enemies.splice(enemies.indexOf(enemy), 1)
        projs.splice(projs.indexOf(proj), 1)
        killSound.play();
      }
    })
  })

  if (gameState == GameStates.PLAY) {
    Engine.update(engine);
  }

  if (GameStates.STOP == gameState) {
    push()
    textSize(50)
    fill(255, 0, 0)
    text("Defeat", 260, 300)
    pop()
    if (score > highscore) {
      highscore = score;
    }
    if (gameOverSoundPlayed == false) {
      gameOverSound.play();
      gameOverSoundPlayed = true;
    }
  
  }

  push()
  fill(255, 0, 0)
  textSize(20)
  text("Score: " + score + "  Highscore: " + highscore, 25, 50)
  pop()
  
}

function mouseClicked() {

  if (gameState == GameStates.PLAY) {

    var projTrajAng = Math.atan2(mouseY - player.position.y, mouseX - player.position.x)

    var projVel = {
      x: Math.cos(projTrajAng) * 10, 
      y: Math.sin(projTrajAng) * 10
    }

    projs.push(new Projectile(player.position.x, player.position.y, projVel.x, projVel.y))

    shootSound.play();

  }

  else {
    frameCount = 0;
    enemies = []
    projs = []
    gameOverSoundPlayed = false;
    gameState = GameStates.PLAY;
  }

}


