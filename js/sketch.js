let estado = "inicio"; 

let estrelas = [];
let numEstrelas = 100;
let anguloNave = 0;
let tempoSom = 0;

let somTatooine;
let somImperial;
let somMilano;    
let somCassette;  
let musicaAtual = null;

function preload() {
  // 1. PRELOAD VAZIO (Essencial para não travar arquivos locais)
}

// 2. LOGICA DE GERENCIAMENTO COM AUDIO NATIVO
function gerenciarMusica(musicaDesejada) {
  if (musicaAtual === musicaDesejada) return;

  // Para a música anterior e reseta o tempo dela
  if (musicaAtual) {
    musicaAtual.pause();
    musicaAtual.currentTime = 0;
  }

  // Toca a nova música (com tratamento para evitar alertas chatos no console)
  if (musicaDesejada) {
    musicaDesejada.play().catch(e => {
      console.log("Áudio aguarda o primeiro clique na tela para tocar.");
    });
  }
  
  musicaAtual = musicaDesejada;
}

// 3. INICIALIZAÇÃO NO SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Criando os áudios nativos de Star Wars
  somTatooine = new Audio('audios/tatooine.mp3');
  somImperial = new Audio('audios/imperial.mp3');
  
  // CORRIGIDO: Criando os áudios nativos de Guardiões da Galáxia
  somMilano = new Audio('audios/milano.mp3');
  somCassette = new Audio('audios/cassette.mp3');
  
  // Ativando a repetição automática (looping) em todas as músicas
  somTatooine.loop = true;
  somImperial.loop = true;
  somMilano.loop = true;
  somCassette.loop = true;
  
  // Inicialização das estrelas de fundo do menu
  for (let i = 0; i < numEstrelas; i++) {
    estrelas.push({
      x: random(windowWidth),
      y: random(windowHeight),
      tamanho: random(1, 3),
      brilho: random(100, 255),
      velocidade: random(0.5, 1.5)
    });
  }
}

// 4. ATIVADOR DE ÁUDIO REFORMULADO (Sem comandos do p5.sound)
function mousePressed() {
  // Se houver uma música ativa pausada por restrição do navegador, ela começa a tocar ao clicar
  if (musicaAtual && musicaAtual.paused) {
    musicaAtual.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(5, 5, 15); // Fundo padrão espacial
  
  // Máquina de estados para renderizar a tela correta
  if (estado === "inicio") {
    telaInicio();
  } else if (estado === "star_wars_hub") {
    telaStarWarsHub();
  } else if (estado === "guardians_hub") {
    telaGuardiansHub();
  } else if (estado === "sw_tatooine") {
    cenarioTatooine();
  } else if (estado === "sw_trench") {
    cenarioEstrelaDaMorte();
  } else if (estado === "gg_milano") {
    cenarioMilano();
  } else if (estado === "gg_cassette") {
    cenarioCassette();
  }
}

// --- FUNÇÃO PARA CRIAR BOTÕES NA TELA ---
function criarBotao(x, y, w, h, texto, corFundo, corHover, corTexto = 255) {
  let hover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  
  stroke(hover ? 255 : 100, hover ? 255 : 100, 255, 150);
  strokeWeight(2);
  fill(hover ? corHover : corFundo);
  rect(x, y, w, h, 8);
  
  noStroke();
  fill(corTexto);
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  text(texto, x + w/2, y + h/2);
  
  return hover; 
}

function desenharBotaoVoltar(destino) {
  let clicou = criarBotao(25, 25, 90, 35, "◄ Voltar", color(40, 40, 60), color(70, 70, 110));
  if (clicou && mouseIsPressed) {
    estado = destino;
    mouseIsPressed = false; 
  }
}

function desenharFundoEstrelas() {
  noStroke();
  for (let i = 0; i < estrelas.length; i++) {
    let est = estrelas[i];
    fill(est.brilho, est.brilho, 255, 200);
    ellipse(est.x, est.y, est.tamanho, est.tamanho);
    
    est.y += est.velocidade * 0.2;
    if (est.y > height) {
      est.y = 0;
      est.x = random(width);
    }
  }
}

function telaInicio() {
  desenharFundoEstrelas();

  textAlign(CENTER, CENTER);
  fill(255);
  textSize(42);
  textStyle(BOLD);
  text("A GALÁXIA NO CINEMA", width / 2, 120);
  
  textSize(16);
  textStyle(NORMAL);
  fill(180, 180, 220);
  text("Selecione um universo para explorar suas informações e cenários:", width / 2, 175);

  // Botão Star Wars
  let irParaSW = criarBotao(width/2 - 210, 260, 200, 60, "STAR WARS", color(20, 20, 30), color(255, 215, 0, 80), color(255, 215, 0));
  if (irParaSW && mouseIsPressed) {
    estado = "star_wars_hub";
    mouseIsPressed = false;
  }

  // Botão Guardiões da Galáxia
  let irParaGG = criarBotao(width/2 + 10, 260, 200, 60, "GUARDIÕES", color(20, 20, 30), color(236, 64, 122, 80), color(236, 64, 122));
  if (irParaGG && mouseIsPressed) {
    estado = "guardians_hub";
    mouseIsPressed = false;
  }
}