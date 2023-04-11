//Ball variables
let xBolinha = 300;
let yBolinha = 200;
const diametroB = 28;
const raioB = diametroB / 2;

//Ball's speed variables
let velocidadeXBolinha = 0;
let velocidadeYBolinha = 0;
let bolinhaParada = false;

//Paddle variables
let xRaquete = 5;
let yRaquete = 150;
const widthR = 15;
const heightR = 90;

let hit = false;

//Opponent paddle variables
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//Score variables
let meusPontos = 0;
let pontosDoOponente = 0;

//Sound variables
let raquetada;
let ponto;
let trilha;

function preload() {
  //Preload sounds
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop(); //Play background music
}

function draw() {
  background(0); //Background color
  circle(xBolinha, yBolinha, diametroB); //Draw ball
  rect(xRaquete, yRaquete, widthR, heightR); //Draw player's paddle
  rect(xRaqueteOponente, yRaqueteOponente, widthR, heightR); //Draw opponent's paddle
  moveBall(); //Move ball
  moveRect(); //Move player's paddle
  rectColision(xRaquete, yRaquete); //Check collision with player's paddle
  rectColision(xRaqueteOponente, yRaqueteOponente); //Check collision with opponent's paddle
  OpponentRectMovement(); //Move opponent's paddle
  incluiPlacar(); //Draw score
  marcaPonto(); //Score points
  bolinhaNaoFicaPresa(); //Prevent ball from getting stuck
}

function moveBall() {
  xBolinha += velocidadeXBolinha; //Move ball horizontally
  yBolinha += velocidadeYBolinha; //Move ball vertically

  //Check border collision
  if (xBolinha + raioB >= width || xBolinha - raioB <= 0) {
    velocidadeXBolinha *= -1; //Invert horizontal direction
  }
  if (yBolinha + raioB >= height || yBolinha - raioB <= 0) {
    velocidadeYBolinha *= -1; //Invert vertical direction
  }
}

function moveRect() {
  if (keyIsDown(87)) { //W key
    yRaquete -= 10; //Move paddle up
  }
  if (keyIsDown(83)) { //S key
    yRaquete += 10; //Move paddle down
  }
}

function OpponentRectMovement() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 10; //Move paddle up
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10; //Move paddle down
  }
}

function rectColision(x, y){
  hit = collideRectCircle(x,y,widthR,heightR,xBolinha,yBolinha,raioB);
  if(hit){
    raquetada.play();
    if (xBolinha + diametroB > xRaqueteOponente && yBolinha - raioB > yRaqueteOponente && yBolinha + raioB < yRaqueteOponente + heightR) {
      velocidadeXBolinha *= -1; // inverte a direção da bolinha
      velocidadeXBolinha += -0.3; // aumenta a velocidade em 0.3
    }
    
    // quando a bolinha bate na raquete esquerda
    if (xBolinha - diametroB < xRaquete + widthR && yBolinha - raioB >yRaquete && yBolinha + raioB <yRaquete + heightR) {
      velocidadeXBolinha *= -1; // inverte a direção da bolinha
      velocidadeXBolinha += 0.3; // aumenta a velocidade em 0.3
    }

    if (Math.abs(velocidadeXBolinha) > 10) {
      velocidadeXBolinha = (velocidadeXBolinha > 0) ? 10 : -10; // limita a velocidade para 10
    }
    if (Math.abs(velocidadeYBolinha) > 10) {
      velocidadeYBolinha = (velocidadeYBolinha > 0) ? 10 : -10; // limita a velocidade para 10
    }
    
    console.log('Velocidade Bolinha = ', velocidadeXBolinha, ',', velocidadeYBolinha);
  }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(18);
    fill(color(127,255,0));
    rect(150,10,40,20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(178,34,34));
    rect(450,10,40,20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 585) {
      meusPontos += 1;
      ponto.play();
      xBolinha = 300;
      yBolinha = 200;
      velocidadeXBolinha = 0;
      velocidadeYBolinha = 0;
      bolinhaParada = true;
  }

  if (xBolinha < 15) {
      pontosDoOponente += 1;
      ponto.play();
      xBolinha = 300;
      yBolinha = 200;
      velocidadeXBolinha = 0;
      velocidadeYBolinha = 0;
      bolinhaParada = true;
  }
}

function keyPressed() {
  if (bolinhaParada) {
      // faça a bolinha se mover novamente e resete a velocidade
      velocidadeXBolinha = 5;
      velocidadeYBolinha = 5;
      bolinhaParada = false;
  }
}

function bolinhaNaoFicaPresa(){
  if (xBolinha - raioB < 0 || xBolinha + raioB >= 600){
    // verifica se a bolinha está colidindo com a raquete antes de reposicioná-la
    if (!collideRectCircle(xRaquete, yRaquete, widthR, heightR, xBolinha, yBolinha, diametroB) && 
        !collideRectCircle(xRaqueteOponente, yRaqueteOponente, widthR, heightR, xBolinha, yBolinha, diametroB)) {
      
    }
  }
}

const botao = document.getElementById('start');

botao.onclick = startButton;

function startButton(){
  if(velocidadeXBolinha < 5 && velocidadeYBolinha < 5){
    velocidadeXBolinha = 5;
    velocidadeYBolinha = 5;
    let direcaoInicial = Math.random() < 0.5 ? -1 : 1;
    velocidadeXBolinha = velocidadeXBolinha * direcaoInicial;
    velocidadeYBolinha = velocidadeYBolinha *direcaoInicial;
  }
}
