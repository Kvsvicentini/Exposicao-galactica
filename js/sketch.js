let estado = "inicio"; 

let estrelas = [];
let numEstrelas = 100;
let anguloNave = 0;

let somTatooine;
let somImperial;
let somMilano;    
let somCassette;  
let musicaAtual = null;

// Variáveis para as naves decorativas animadas do Menu Star Wars Hub
let navesHub = [
  { x: -100, y: 180, velocidade: 2.0, tamanho: 0.4, tipo: "xwing", offset: 0 },
  { x: -350, y: 320, velocidade: 2.8, tamanho: 0.35, tipo: "falcon", offset: Math.PI }
];

// Variáveis para o efeito de fitas flutuantes no Menu Guardiões da Galáxia
let partículasGuardiões = [];

function preload() {
  // Preload estrutural vazio para evitar travamentos
}

function gerenciarMusica(musicaDesejada) {
  if (musicaAtual === musicaDesejada) return;
  if (musicaAtual) {
    musicaAtual.pause();
    musicaAtual.currentTime = 0;
  }
  if (musicaDesejada) {
    musicaDesejada.play().catch(e => {
      console.log("Áudio aguarda interação inicial para tocar.");
    });
  }
  musicaAtual = musicaDesejada;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Inicialização dos áudios nativos
  somTatooine = new Audio('audios/tatooine.mp3');
  somImperial = new Audio('audios/imperial.mp3');
  somMilano = new Audio('audios/milano.mp3');
  somCassette = new Audio('audios/cassette.mp3');
  
  somTatooine.loop = true;
  somImperial.loop = true;
  somMilano.loop = true;
  somCassette.loop = true;
  
  // Inicialização do fundo estrelado padrão
  for (let i = 0; i < numEstrelas; i++) {
    estrelas.push({
      x: random(windowWidth),
      y: random(windowHeight),
      tamanho: random(1, 3),
      brilho: random(100, 255),
      velocidade: random(0.5, 1.5)
    });
  }

  // Inicialização das partículas retrô para o menu dos Guardiões
  for (let i = 0; i < 20; i++) {
    partículasGuardiões.push({
      x: random(windowWidth),
      y: random(windowHeight),
      w: random(2, 5),
      h: random(15, 40),
      vel: random(1, 3)
    });
  }
}

function mousePressed() {
  if (musicaAtual && musicaAtual.paused) {
    musicaAtual.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(5, 5, 15); 
  
  if (estado === "inicio") {
    telaInicio();
  } else if (estado === "star_wars_hub") {
    telaStarWarsHub();
  } else if (estado === "guardians_hub") {
    telaGuardiansHub();
  } else if (estado === "sw_tatooine") {
    if (typeof cenarioTatooine === 'function') cenarioTatooine();
  } else if (estado === "sw_trench") {
    if (typeof cenarioEstrelaDaMorte === 'function') cenarioEstrelaDaMorte();
  } else if (estado === "gg_milano") {
    if (typeof cenarioMilano === 'function') cenarioMilano();
  } else if (estado === "gg_cassette") {
    if (typeof cenarioCassette === 'function') cenarioCassette();
  }
}

// --- INTEGRAÇÃO DOS BOTÕES ---
function criarBotao(x, y, w, h, texto, corFundo, corHover, corTexto = 255) {
  let hover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  stroke(hover ? 255 : 100, hover ? 255 : 100, 255, 150);
  strokeWeight(2);
  fill(hover ? corHover : corFundo);
  rect(x, y, w, h, 8);
  noStroke(); fill(corTexto); textAlign(CENTER, CENTER); textSize(15); textStyle(BOLD);
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
    if (est.y > height) { est.y = 0; est.x = random(width); }
  }
}

// ==========================================
// 1. TELA INICIAL: ESTRELA PULSANTE E ÓRBITAS
// ==========================================
function telaInicio() {
  desenharFundoEstrelas();

  let centroX = width / 2;
  let centroY = height * 0.64; 

  // Efeito de Brilho Dinâmico (Pulsação usando Seno)
  let pulsoBrilho = sin(frameCount * 0.04) * 15;
  noStroke();
  
  // Camadas de brilho externo (Glow)
  fill(255, 200, 50, 35);
  ellipse(centroX, centroY, 110 + pulsoBrilho, 110 + pulsoBrilho);
  fill(255, 220, 100, 75);
  ellipse(centroX, centroY, 80 + pulsoBrilho * 0.5, 80 + pulsoBrilho * 0.5);
  
  // Núcleo da Estrela
  fill(255, 245, 200);
  ellipse(centroX, centroY, 50, 50);

  // Sistema de Órbitas dos Planetas
  let planetasMenu = [
    { vel: 0.015, raio: 120, tam: 14, cor: color(0, 191, 255) }, 
    { vel: 0.009, raio: 195, tam: 22, cor: color(255, 127, 80) },  
    { vel: 0.005, raio: 280, tam: 18, cor: color(50, 205, 50) }  
  ];

  for (let i = 0; i < planetasMenu.length; i++) {
    let p = planetasMenu[i];
    let px = centroX + cos(frameCount * p.vel + i * 120) * p.raio;
    let py = centroY + sin(frameCount * p.vel + i * 120) * p.raio;

    noFill();
    stroke(255, 255, 255, 15);
    ellipse(centroX, centroY, p.raio * 2, p.raio * 2);

    noStroke();
    fill(p.cor);
    ellipse(px, py, p.tam, p.tam);
  }

  // Textos estáticos do Menu
  textAlign(CENTER, CENTER); fill(255); textSize(42); textStyle(BOLD);
  text("A GALÁXIA NO CINEMA", width / 2, 80);
  textSize(16); textStyle(NORMAL); fill(180, 180, 220);
  text("Selecione um universo para explorar suas informações e cenários:", width / 2, 135);

  let irParaSW = criarBotao(width/2 - 210, 185, 200, 50, "STAR WARS", color(20, 20, 30), color(255, 215, 0, 80), color(255, 215, 0));
  if (irParaSW && mouseIsPressed) { estado = "star_wars_hub"; mouseIsPressed = false; }

  let irParaGG = criarBotao(width/2 + 10, 185, 200, 50, "GUARDIÕES", color(20, 20, 30), color(236, 64, 122, 80), color(236, 64, 122));
  if (irParaGG && mouseIsPressed) { estado = "guardians_hub"; mouseIsPressed = false; }
}

// ==========================================
// 2. MENU STAR WARS: ANIMAÇÃO DE NAVES (X-WING E FALCON)
// ==========================================
function telaStarWarsHub() {
  gerenciarMusica(null); 
  desenharFundoEstrelas();
  desenharBotaoVoltar("inicio");

  // Laço de renderização e atualização das naves temáticas
  for (let nave of navesHub) {
    nave.x += nave.velocidade;
    if (nave.x > width + 250) nave.x = -250; 

    push();
    // Aplica translação e um efeito ondulatório suave no eixo Y
    translate(nave.x, nave.y + sin(frameCount * 0.04 + nave.offset) * 20); 
    scale(nave.tamanho);
    
    if (nave.tipo === "xwing") {
      // Fuselagem e Asas da X-Wing em vetor proporcional
      fill(160, 165, 170); noStroke();
      rect(-30, -5, 60, 10, 3); // Corpo principal
      fill(200, 50, 50);
      rect(10, -4, 12, 8); // Detalhes vermelhos
      stroke(130, 135, 140); strokeWeight(4);
      line(-15, -22, 10, -5); line(-15, 22, 10, 5); // Par de asas duplas
      stroke(255, 0, 0); strokeWeight(2);
      line(-30, -3, -45, -3); // Rastro de propulsão a laser traseiro
    } else if (nave.tipo === "falcon") {
      // Design achatado característico da Millennium Falcon
      fill(180, 185, 190); noStroke();
      ellipse(0, 0, 65, 60); // Disco central
      rect(20, -12, 25, 24); // Mandíbulas frontais
      fill(50, 60, 75);
      rect(-10, -31, 15, 8); // Cabine lateral descentralizada
      stroke(0, 191, 255); strokeWeight(3);
      line(-32, -10, -32, 10); // Escape azul dos motores hiperpropulsores
    }
    pop();
  }

  // Título e interface Star Wars
  fill(255, 215, 0); textAlign(CENTER, CENTER); textSize(width * 0.045); textStyle(BOLD);
  text("STAR WARS", width / 2, height * 0.18);
  fill(220); textSize(max(14, width * 0.018)); textStyle(NORMAL);
  let info = "Há muito tempo, em uma galáxia muito, muito distante...\nDesign de cenários marcados por sóis binários e superestruturas imperiais.";
  text(info, width / 2, height * 0.36);

  let larguraBotao = 240; let alturaBotao = 50;
  let irParaTatooine = criarBotao(width/2 - larguraBotao - 15, height * 0.6, larguraBotao, alturaBotao, "O Pôr do Sol de Tatooine", color(35, 20, 15), color(230, 80, 40, 100));
  if (irParaTatooine && mouseIsPressed) { estado = "sw_tatooine"; mouseIsPressed = false; }

  let irParaEstrelaDaMorte = criarBotao(width/2 + 15, height * 0.6, larguraBotao, alturaBotao, "A Órbita da Estrela da Morte", color(20, 25, 35), color(79, 195, 247, 100));
  if (irParaEstrelaDaMorte && mouseIsPressed) { estado = "sw_trench"; mouseIsPressed = false; }
}

// ==========================================
// 3. MENU GUARDIÕES: CHUVA DE PARTÍCULAS NEON RETRÔ (ANOS 80)
// ==========================================
function telaGuardiansHub() {
  gerenciarMusica(null);
  background(15, 8, 25); // Fundo purpúreo espacial profundo
  desenharBotaoVoltar("inicio");

  // Animação temática: Chuva de fitas de luz neon sintetizadas (Vibe fita cassete/Synthwave)
  for (let p of partículasGuardiões) {
    p.y += p.vel;
    if (p.y > height) { p.y = -50; p.x = random(width); }

    noStroke();
    // Alterna cores neon vibrantes baseadas na velocidade da partícula
    if (p.vel > 2.2) fill(236, 64, 122, 160); // Rosa Choque
    else if (p.vel > 1.6) fill(0, 229, 255, 160); // Ciano Claro
    else fill(224, 64, 251, 120); // Roxo Dinâmico
    
    rect(p.x, p.y, p.w, p.h, 2);
  }

  // Elementos do Menu Guardiões
  fill(236, 64, 122); textAlign(CENTER, CENTER); textSize(width * 0.045); textStyle(BOLD);
  text("GUARDIÕES DA GALÁXIA", width / 2, height * 0.18);
  fill(220); textSize(max(14, width * 0.018)); textStyle(NORMAL);
  text("Aventuras embaladas por trilhas sonoras marcantes dos anos 70 e 80,\ncruzando o cosmos a bordo de naves coloridas e estações vivas.", width / 2, height * 0.36);

  let larguraBotao = 240; let alturaBotao = 50;
  let irParaMilano = criarBotao(width/2 - larguraBotao - 15, height * 0.6, larguraBotao, alturaBotao, "A Cabine da Milano", color(20, 30, 45), color(0, 191, 255, 100));
  if (irParaMilano && mouseIsPressed) { estado = "gg_milano"; mouseIsPressed = false; }

  let irParaCassette = criarBotao(width/2 + 15, height * 0.6, larguraBotao, alturaBotao, "Awesome Mix Vol. 1", color(35, 15, 30), color(236, 64, 122, 100));
  if (irParaCassette && mouseIsPressed) { estado = "gg_cassette"; mouseIsPressed = false; }
}