let estado = "inicio"; 

let estrelas = [];
let numEstrelas = 1000;
let anguloNave = 0;
let trilhaMouse = [];
let aneisPortal = [];

let somTatooine;
let somImperial;
let milano;
let musicaAtual = null;

let playlistGG = [];         // Array que guardará os arquivos e os nomes das músicas
let indiceMusicaAtual = 0;   // Controla qual música da lista está selecionada
let tocandoGG = false;       // Diz se o rádio está ativo (tocando) ou pausado

// Variáveis para as naves decorativas animadas do Menu Star Wars Hub
let navesHub = [
  // A X-Wing e a TIE Fighter começam na mesma altura (será calculada dinamicamente no setup/draw)
  { x: -100, y: 0, velocidade: 3.0, tamanho: 0.4, tipo: "xwing", offset: 0 },
  { x: -220, y: 0, velocidade: 3.0, tamanho: 0.4, tipo: "tiefighter", offset: 0 }, 
  // A Falcon passará sozinha mais embaixo
  { x: -350, y: 0, velocidade: 4.0, tamanho: 0.35, tipo: "falcon", offset: Math.PI }
];

// Variáveis para o efeito de fitas flutuantes no Menu Guardiões da Galáxia
let partículasGuardiões = [];

function preload() {
  // Preload estrutural vazio para evitar travamentos
}

function gerenciarMusica(musicaDesejada) {
  if (musicaAtual === musicaDesejada) return;
  
  // Se houver uma música de fundo padrão tocando, ela é pausada
  if (musicaAtual) {
    musicaAtual.pause();
    musicaAtual.currentTime = 0;
  }
  
  // Se sairmos do deck de fita cassete, força a fita a pausar
  if (musicaDesejada === null && estado !== "gg_cassette") {
    if (playlistGG.length > 0 && tocandoGG) {
      playlistGG[indiceMusicaAtual].audio.pause();
      tocandoGG = false;
    }
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
  
  // Inicialização dos áudios nativos de Star Wars
  somTatooine = new Audio('audios/tatooine.mp3');
  somImperial = new Audio('audios/imperial.mp3');
  somTatooine.loop = true;
  somImperial.loop = true;

  milano = new Audio ('audios/somMilano.mp3')
  milano.loop = true
  
  // --- MONTAGEM DA PLAYLIST RETRÔ DOS GUARDIÕES ---
  playlistGG = [
    { audio: new Audio('audios/Cherry.mp3'), titulo: "Cherry Bomb" },
    { audio: new Audio('audios/cassette.mp3'), titulo: "Come and Get Your Love" },
    { audio: new Audio('audios/Hooked On A Feeling.mp3'), titulo: "Hooked on a Feeling" }, 
    { audio: new Audio('audios/You Back.mp3'), titulo: "I Want You Back" },
    { audio: new Audio('audios/Mr. Blue Sky.mp3'), titulo: "Mr.Blue Sky" }
  ];
  
  // Configuração para detectar o fim de cada música e pular automaticamente
  for (let i = 0; i < playlistGG.length; i++) {
    // IMPORTANTE: Removemos o .loop = true para a música poder de fato terminar!
    playlistGG[i].audio.loop = false; 

    // Ouvinte de evento: Quando a música 'i' terminar...
    playlistGG[i].audio.onended = function() {
      // Avança o índice para a próxima música
      indiceMusicaAtual = (indiceMusicaAtual + 1) % playlistGG.length;
      
      // Se o rádio ainda estiver ativo (tocando), dá play na próxima faixa automaticamente
      if (tocandoGG) {
        let proximaMusica = playlistGG[indiceMusicaAtual].audio;
        proximaMusica.play().catch(e => console.log("Erro ao pular automaticamente:", e));
      }
    };
  }
  
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
  for (let i = 0; i < 50; i++) {
    partículasGuardiões.push({
      x: random(windowWidth),
      y: random(windowHeight),
      w: random(2, 5),
      h: random(15, 40),
      vel: random(1, 3)
    });
  }
  trilhaMouse = []; // Garante que começa limpo

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
  trilhaMouse.push({
    x: mouseX,
    y: mouseY,
    alpha: 255, // Opacidade inicial (brilhante)
    size: 10,   // Tamanho inicial
    // Sorteia se a partícula vai ser Azul (Rebeldes) ou Vermelha (Império)
    cor: random() > 0.5 ? color(0, 191, 255) : color(255, 0, 0)
  });

  // Limita o tamanho do array para não travar a memória (máximo 40 partículas)
  while (trilhaMouse.length > 40) {
    trilhaMouse.shift(); // Remove as mais antigas
  }

  // Percorre o array para atualizar e desenhar cada partícula
  for (let i = 0; i < trilhaMouse.length; i++) {
    let p = trilhaMouse[i];

    // Atualiza a partícula (fading)
    p.alpha -= 8; // Diminui opacidade lentamente
    p.size *= 0.94; // Diminui o tamanho lentamente
    
    noStroke();
    
    // Define a cor e a opacidade atual da partícula
    let c = p.cor;
    fill(red(c), green(c), blue(c), p.alpha);

    // Desenha a partícula (pode ser ellipse ou rect)
    // Um leve blur/glow (brilho) deixa mais real:
    drawingContext.shadowBlur = 15; // Intensidade do brilho
    drawingContext.shadowColor = p.cor; // Cor do brilho
    ellipse(p.x, p.y, p.size, p.size);
    drawingContext.shadowBlur = 0; // Desliga o brilho para não poluir o resto
  }
  desenharBotaoVoltar("inicio");

  // Laço de renderização e atualização das naves temáticas
  for (let nave of navesHub) {
    nave.x += nave.velocidade;
    if (nave.x > width + 250) nave.x = -250; 

    // Define a altura correta baseada no tipo da nave
    if (nave.tipo === "xwing" || nave.tipo === "tiefighter") {
      // Passando estritamente ENTRE o texto (0.36) e os botões (0.6)
      nave.y = height * 0.48; 
    } else if (nave.tipo === "falcon") {
      // Passando ABAIXO dos botões (0.6)
      nave.y = height * 0.78; 
    }

    // Efeito ondulatório suave no eixo Y
    let oscilacaoY = sin(frameCount * 0.04 + nave.offset) * 15;
    let posYAtual = nave.y + oscilacaoY;

    // --- DESENHO VETORIAL DAS NAVES ---
    push();
    translate(nave.x, posYAtual); 
    scale(nave.tamanho);
    
    if (nave.tipo === "xwing") {
      fill(160, 165, 170); noStroke();
      rect(-30, -5, 60, 10, 3); 
      fill(200, 50, 50);
      rect(10, -4, 12, 8); 
      stroke(130, 135, 140); strokeWeight(4);
      line(-15, -22, 10, -5); line(-15, 22, 10, 5); 
      stroke(255, 50, 50, 150); strokeWeight(2);
      line(-30, 0, -50, 0); // Rastro do motor
    } 
    else if (nave.tipo === "tiefighter") {
      let tomCinza = 140;
      stroke(tomCinza - 25); fill(tomCinza); strokeWeight(1);
      rect(-18, -22, 4, 44, 1); 
      rect(14, -22, 4, 44, 1);  
      line(-14, 0, -6, 0);       
      line(6, 0, 14, 0);
      ellipse(0, 0, 12, 12);     
      fill(25, 35, 45); ellipse(0, 0, 6, 6);       
    } 
    else if (nave.tipo === "falcon") {
      fill(180, 185, 190); noStroke();
      ellipse(0, 0, 65, 60); 
      rect(20, -12, 25, 24); 
      fill(50, 60, 75); rect(-10, -31, 15, 8); 
      stroke(0, 191, 255); strokeWeight(3);
      line(-32, -10, -32, 10); // Rastro azul do motor
    }
    pop();
  

    // --- DESENHO DAS NAVES ---
    push();
    translate(nave.x, posYAtual); 
    scale(nave.tamanho);
    
    if (nave.tipo === "xwing") {
      fill(160, 165, 170); noStroke();
      rect(-30, -5, 60, 10, 3); 
      fill(200, 50, 50);
      rect(10, -4, 12, 8); 
      stroke(130, 135, 140); strokeWeight(4);
      line(-15, -22, 10, -5); line(-15, 22, 10, 5); 
      stroke(255, 50, 50, 150); strokeWeight(2);
      line(-30, 0, -50, 0); 
    } 
    else if (nave.tipo === "tiefighter") {
      let tomCinza = 140;
      stroke(tomCinza - 25); fill(tomCinza); strokeWeight(1);
      rect(-18, -22, 4, 44, 1); 
      rect(14, -22, 4, 44, 1);  
      line(-14, 0, -6, 0);       
      line(6, 0, 14, 0);
      ellipse(0, 0, 12, 12);     
      fill(25, 35, 45); ellipse(0, 0, 6, 6);       
    } 
    else if (nave.tipo === "falcon") {
      fill(180, 185, 190); noStroke();
      ellipse(0, 0, 65, 60); 
      rect(20, -12, 25, 24); 
      fill(50, 60, 75); rect(-10, -31, 15, 8); 
      stroke(0, 191, 255); strokeWeight(3);
      line(-32, -10, -32, 10); 
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
  // A cada 25 frames, gera um novo anel de energia no centro da tela
  if (frameCount % 25 === 0) {
    aneisPortal.push({
      diametro: 10,
      velocidade: 4, // Velocidade de expansão do círculo
      alpha: 255,    // Opacidade máxima inicial
      // Alterna entre as cores marcantes dos Guardiões (Rosa Choque ou Ciano Neon)
      cor: random() > 0.5 ? color(236, 64, 122) : color(0, 229, 255)
    });
  }

  // Percorre e atualiza os anéis de trás para a frente
  for (let i = aneisPortal.length - 1; i >= 0; i--) {
    let anel = aneisPortal[i];
    
    anel.diametro += anel.velocidade; // O círculo expande
    anel.alpha -= 1.8;                // Vai sumindo conforme cresce

    // Desenha o contorno do anel luminoso com efeito neon
    noFill();
    stroke(red(anel.cor), green(anel.cor), blue(anel.cor), anel.alpha);
    strokeWeight(4); // Linha espessa para destacar o portal
    
    // Ativa um efeito leve de brilho/glow usando o canvas 2D do navegador
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = anel.cor;
    
    // Desenha o anel exatamente no centro do Canvas
    ellipse(width / 2, height * 0.5, anel.diametro, anel.diametro * 0.6); // Multiplicar por 0.6 dá uma perspetiva oval/3D achatada
    
    // Desliga o brilho para não interferir na renderização do restante do menu
    drawingContext.shadowBlur = 0;

    // Se o anel ficar completamente invisível, remove do array para economizar memória
    if (anel.alpha <= 0) {
      aneisPortal.splice(i, 1);
    }
  }
  push();
  push();
  let numBarras = 30; // Quantidade de barras verticais do equalizador
  let larguraBarra = width / numBarras;
  
  for (let i = 0; i < numBarras; i++) {
    // Usa noise para fazer as barras subirem e descerem de forma suave e rítmica
    let alturaBarra = noise(frameCount * 0.05 + i * 0.2) * 90;
    
    // Alterna as cores das barras entre azul neon e rosa choque para combinar com o menu
    let corBarra = (i % 2 === 0) ? color(0, 229, 255, 180) : color(236, 64, 122, 180);
    
    // Aplica o efeito de brilho neon nas barras
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = corBarra;
    
    fill(corBarra);
    noStroke();
    
    // Desenha a barra a partir da base da tela (height) para cima
    rect(i * larguraBarra + 2, height - alturaBarra, larguraBarra - 4, alturaBarra, 3);
  }
  drawingContext.shadowBlur = 0; // Desliga o brilho para o resto dos elementos
  pop();
  // Posiciona o Groot no canto inferior direito da tela
  let grootX = width * 0.88;
  let grootY = height * 0.82;
  translate(grootX, grootY);

  // Variáveis matemáticas para criar o gingado da dança rítmica
  let balancoCorpo = sin(frameCount * 0.08) * 8;
  let balancoCabeca = sin(frameCount * 0.08 + 0.3) * 0.15;
  let balancoBracoE = sin(frameCount * 0.12) * 15;
  let balancoBracoD = cos(frameCount * 0.12) * 15;

  // 1. O VASO BRANCO (Estático)
  fill(240); noStroke();
  quad(-25, 35, 25, 35, 18, 75, -18, 75); // Corpo do vaso
  rect(-28, 25, 56, 10, 2); // Borda de cima do vaso

  // 2. O TRONCO/CORPO (Balança para os lados)
  stroke(110, 75, 45); strokeWeight(10); strokeJoin(ROUND);
  noFill();
  beginShape();
  vertex(0, 30);
  vertex(balancoCorpo * 0.5, 0); // O meio do corpo desloca ligeiramente
  vertex(balancoCorpo, -35);    // Onde conecta o pescoço
  endShape();

  // 3. BRAÇO ESQUERDO (Gesticula para cima e para baixo)
  push();
  translate(balancoCorpo * 0.5, -5);
  stroke(120, 85, 50); strokeWeight(5);
  line(0, 0, -22, -15 + balancoBracoE);
  // Folhinha no braço
  fill(76, 175, 80); noStroke();
  ellipse(-22, -15 + balancoBracoE, 6, 4);
  pop();

  // 4. BRAÇO DIREITO
  push();
  translate(balancoCorpo * 0.5, -5);
  stroke(120, 85, 50); strokeWeight(5);
  line(0, 0, 22, -12 + balancoBracoD);
  // Folhinha no braço
  fill(76, 175, 80); noStroke();
  ellipse(22, -12 + balancoBracoD, 6, 4);
  pop();

  // 5. A CABEÇA (Fica no topo do tronco e rotaciona no ritmo)
  push();
  translate(balancoCorpo, -40);
  rotate(balancoCabeca);
  
  // Rosto de madeira do Groot
  fill(130, 90, 55); noStroke();
  rect(-16, -25, 32, 28, 4);
  // Detalhes de galhos no topo da cabeça
  triangle(-16, -24, -8, -24, -14, -32);
  triangle(-6, -24, 6, -24, 0, -34);
  triangle(8, -24, 16, -24, 13, -31);

  // Olhos pretos fofos
  fill(20);
  ellipse(-6, -10, 5, 5);
  ellipse(6, -10, 5, 5);
  // Brilho nos olhos
  fill(255);
  ellipse(-5, -11, 1.5, 1.5);
  ellipse(7, -11, 1.5, 1.5);

  // Sorriso minimalista
  noFill(); stroke(60, 35, 15); strokeWeight(2);
  arc(0, -2, 8, 6, 0, PI);

  // Folhinha brotando na cabeça dele
  push();
  translate(6, -28);
  fill(139, 195, 74); noStroke();
  ellipse(0, 0, 7, 4);
  pop();

  pop(); // Fim da Cabeça
  pop(); // Fim do Groot
  // =================================================================

  // Elementos do Menu Guardiões
  noStroke();
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