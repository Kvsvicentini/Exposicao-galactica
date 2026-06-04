function telaStarWarsHub() {
  // Desliga qualquer música ativa ao voltar para o menu informativo
  gerenciarMusica(null); 

  desenharFundoEstrelas();
  desenharBotaoVoltar("inicio");

  fill(255, 215, 0); // Amarelo clássico Star Wars
  textAlign(CENTER, CENTER);
  textSize(width * 0.045); // Tamanho responsivo para tela cheia
  textStyle(BOLD);
  text("STAR WARS", width / 2, height * 0.18);

  fill(220);
  textSize(max(14, width * 0.018));
  textStyle(NORMAL);
  let info = "Há muito tempo, em uma galáxia muito, muito distante...\nCriada por George Lucas, a franquia mistura fantasia científica e batalhas épicas,\nrevolucionando os efeitos visuais e o design de cenários no cinema.";
  text(info, width / 2, height * 0.36);

  // Botões dos sub-cenários (posições ajustadas proporcionalmente para tela cheia)
  let larguraBotao = 240;
  let alturaBotao = 50;
  
  let irParaTatooine = criarBotao(width / 2 - larguraBotao - 15, height * 0.6, larguraBotao, alturaBotao, "O Pôr do Sol de Tatooine", color(35, 20, 15), color(230, 80, 40, 100));
  if (irParaTatooine && mouseIsPressed) {
    estado = "sw_tatooine";
    mouseIsPressed = false;
  }

  let irParaEstrelaDaMorte = criarBotao(width / 2 + 15, height * 0.6, larguraBotao, alturaBotao, "A Órbita da Estrela da Morte", color(20, 25, 35), color(79, 195, 247, 100));
  if (irParaEstrelaDaMorte && mouseIsPressed) {
    estado = "sw_trench"; // Nota: Se mudar o nome no seu switch do sketch.js, mude aqui para "sw_estrela_morte"
    mouseIsPressed = false;
  }
}

function cenarioTatooine() {
  // Ativa a trilha sonora de Tatooine se ela existir
  if (typeof somTatooine !== 'undefined' && somTatooine) gerenciarMusica(somTatooine);

  // ==========================================
  // CONFIGURAÇÃO DO TEMPO (ACELERADO)
  // ==========================================
  // Multiplicador de tempo
  let cicloTempo = (frameCount * 0.15) % height; 
  let progressoPorDoSol = cicloTempo / height; // 0.0 (dia inicial) a 1.0 (noite profunda)

  // 1. GRADIENTE DO CÉU (Fiel à imagem de referência)
  let corCeuTop = lerpColor(color(43, 19, 58), color(10, 5, 20), progressoPorDoSol);
  let corCeuBottom = lerpColor(color(244, 114, 52), color(25, 12, 35), progressoPorDoSol);
  
  for (let y = 0; y < height * 0.75; y++) {
    let inter = map(y, 0, height * 0.75, 0, 1);
    let c = lerpColor(corCeuTop, corCeuBottom, inter);
    stroke(c);
    line(0, y, width, y);
  }

  // 2. OS SÓIS BINÁRIOS
  let horizonteY = height * 0.75;
  let sol1Y = (height * 0.38) + (cicloTempo * 0.6);
  let sol2Y = (height * 0.45) + (cicloTempo * 0.5);
  
  // Sol Esquerdo (Branco Puro)
  if (sol1Y < horizonteY + 40) {
    noStroke();
    let pulso = sin(frameCount * 0.08) * 6; // O pulso acompanha o ritmo da velocidade
    fill(255, 255, 255, 30);
    ellipse(width * 0.58, sol1Y, width * 0.09 + pulso, width * 0.09 + pulso);
    fill(255, 255, 255);
    ellipse(width * 0.58, sol1Y, width * 0.06, width * 0.06);
  }

  // Sol Direito (Vermelho Puro)
  if (sol2Y < horizonteY + 30) {
    noStroke();
    let pulso2 = cos(frameCount * 0.08) * 4;
    fill(217, 4, 41, 45);
    ellipse(width * 0.74, sol2Y, width * 0.08 + pulso2, width * 0.08 + pulso2);
    fill(217, 4, 41);
    ellipse(width * 0.74, sol2Y, width * 0.055, width * 0.055);
  }

  // 3. SOLO PLANO DO DESERTO
  fill(12, 9, 15);
  noStroke();
  rect(0, horizonteY, width, height * 0.25);

  // 4. ESTRUTURAS SILHUETADAS
  fill(12, 9, 15);
  
  // O Domo dos Lars (Casa do Luke à esquerda)
  let domoW = min(width * 0.28, 220);
  let domoH = domoW * 0.55;
  let domoX = width * 0.22;
  arc(domoX, horizonteY + 5, domoW, domoH * 2, PI, TWO_PI);
  
  // Pequeno anexo/entrada do domo à direita dele
  rect(domoX + domoW * 0.38, horizonteY - domoH * 0.3, domoW * 0.15, domoH * 0.3);

  // Vaporizador de Umidade
  let vapX = width * 0.9;
  let vapW = min(width * 0.015, 14);
  rect(vapX - vapW/2, horizonteY - 80, vapW, 80);
  rect(vapX - 2, horizonteY - 130, 4, 50);
  ellipse(vapX, horizonteY - 80, vapW * 1.6, 6);
  ellipse(vapX, horizonteY - 105, vapW * 1.3, 5);

  // 5. ANIMAÇÃO VELOZ DO LUKE CAMINHANDO
  let lukeX = width * 0.46;
  let lukeY = horizonteY;
  let tamLuke = min(height * 0.05, 32);

  // Janela de tempo ajustada proporcionalmente ao novo ciclo rápido
  if (progressoPorDoSol > 0.60 && progressoPorDoSol < 0.82) {
    // A velocidade da caminhada mapeada acelera junto com a descida do sol
    lukeX = map(progressoPorDoSol, 0.60, 0.82, width * 0.46, domoX + domoW * 0.45);
    lukeY = horizonteY + sin(frameCount * 0.5) * 2; // Passos mais rápidos combinando com o deslocamento
  } else if (progressoPorDoSol >= 0.82) {
    lukeX = -999; // Entrou na residência
  }

  // Renderização do Luke
  if (lukeX > 0) {
    fill(12, 9, 15);
    stroke(12, 9, 15);
    strokeWeight(1);
    ellipse(lukeX, lukeY - tamLuke, tamLuke * 0.28, tamLuke * 0.28);
    triangle(lukeX, lukeY - tamLuke * 0.8, lukeX - tamLuke * 0.18, lukeY, lukeX + tamLuke * 0.18, lukeY);
  }

  // 6. IDENTIFICAÇÃO
  noStroke();
  fill(255, 215, 0, 140);
  textAlign(RIGHT, BOTTOM);
  textSize(15);
  textStyle(BOLD);
  text("TATOOINE: THE TWIN SUNS", width - 25, height - 25);

  desenharBotaoVoltar("star_wars_hub");
}

function cenarioEstrelaDaMorte() {
  gerenciarMusica(somImperial);

  // 1. Espaço Cósmico Profundo
  for (let y = 0; y < height; y++) {
    let inter = y / height;
    let c = lerpColor(color(10, 12, 18), color(2, 2, 5), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // 2. Campo de Estrelas Estáticas
  fill(255);
  noStroke();
  randomSeed(54321); 
  for (let i = 0; i < 150; i++) {
    let tam = random(0.5, 2.5);
    fill(255, 255, 255, random(100, 255));
    ellipse(random(width), random(height), tam, tam);
  }

  // ==========================================================
  // FUNÇÕES AUXILIARES INTERNAS DE RENDERIZAÇÃO
  // ==========================================================
  function desenharTieFighter(x, y, tScale, tomCinza) {
    push();
    translate(x, y);
    scale(tScale);
    stroke(tomCinza - 25);
    fill(tomCinza);
    strokeWeight(1);
    rect(-18, -22, 4, 44, 1); // Painel solar esquerdo
    rect(14, -22, 4, 44, 1);  // Painel solar direito
    line(-14, 0, -6, 0);       // Hastes
    line(6, 0, 14, 0);
    ellipse(0, 0, 12, 12);     // Cockpit
    fill(25, 35, 45);
    ellipse(0, 0, 6, 6);       // Janela
    pop();
  }

  function desenharStarDestroyer(x, y, tScale, tomCinza, flutuacao) {
    push();
    translate(x, y + flutuacao);
    scale(tScale);
    noStroke();
    
    // Casco em cunha triangular principal
    fill(tomCinza);
    beginShape();
    vertex(-75, 10);
    vertex(65, -5);
    vertex(-65, -25);
    endShape(CLOSE);
    
    // Sombra do convés inferior para dar volume 3D
    fill(tomCinza - 15);
    beginShape();
    vertex(-75, 10);
    vertex(65, -5);
    vertex(-70, -5);
    endShape(CLOSE);

    // Superestrutura de Comando
    fill(tomCinza + 15);
    rect(-55, -22, 35, 12);
    fill(tomCinza - 10);
    rect(-45, -18, 25, 8);
    
    // Torre da ponte superior
    fill(tomCinza + 25);
    rect(-42, -29, 18, 7);
    stroke(tomCinza - 20);
    strokeWeight(1.5);
    line(-33, -29, -33, -33); // Haste defletora de escudo
    pop();
  }

  // ==========================================================
  // CAMADA A: CAÇAS TIE DE FUNDO (Passam ATRÁS das estruturas)
  // ==========================================================
  // Caças com índice par (0 e 2) ficam em segundo plano, bem distantes
  for (let i = 0; i < 8; i += 2) {
    noiseSeed(i * 125);
    let tieX = noise(frameCount * 0.0025 + i) * (width * 1.5) - (width * 0.25);
    let tieY = noise(frameCount * 0.004 + i + 30) * (height * 0.6);
    let profundidade = noise(frameCount * 0.002 + i * 2);
    
    // Escala menor e tom escuro para parecer muito longe ao fundo
    let tScale = map(profundidade, 0, 1, 0.12, 0.25);
    let tomCinza = map(profundidade, 0, 1, 50, 80);
    desenharTieFighter(tieX, tieY, tScale, tomCinza);
  }

  // ==========================================================
  // CAMADA B: A FROTA DE STAR DESTROYERS DE SEGUNDO PLANO
  // ==========================================================
  // 1. Destroyer de Fundo Esquerdo (Pequeno e distante)
  desenharStarDestroyer(width * 0.20, height * 0.22, 0.35, 33, sin(frameCount * 0.01) * 3);
  
  // 2. Destroyer de Médio Fundo Direito
  desenharStarDestroyer(width * 0.82, height * 0.20, 0.50, 42, sin(frameCount * 0.012) * 4);

  // 3. Destroyer Clássico Lateral (O original de tamanho médio)
  desenharStarDestroyer(width * 0.76, height * 0.38, 0.85, 52, sin(frameCount * 0.015) * 6);

  // ==========================================================
  // CAMADA C: A ESTRELA DA MORTE (Estrutura Central Megalítica)
  // ==========================================================
  push();
  let edmX = width * 0.48; 
  let edmY = height * 0.45;
  let edmRaio = min(width, height) * 0.50; 
  translate(edmX, edmY);

  noStroke();
  fill(25, 32, 40); 
  ellipse(0, 0, edmRaio, edmRaio);
  fill(55, 68, 83);
  arc(0, 0, edmRaio, edmRaio, -HALF_PI, HALF_PI);

  stroke(10, 12, 15);
  strokeWeight(edmRaio * 0.015);
  line(-edmRaio / 2, 0, edmRaio / 2, 0);

  // Superlaser
  let laserX = edmRaio * 0.15;
  let laserY = -edmRaio * 0.22;
  let laserDiam = edmRaio * 0.28;
  noStroke();
  fill(20, 26, 33); 
  ellipse(laserX, laserY, laserDiam, laserDiam);
  fill(40, 50, 62); 
  ellipse(laserX + (laserDiam * 0.05), laserY + (laserDiam * 0.05), laserDiam * 0.85, laserDiam * 0.85);
  fill(15, 20, 25); 
  ellipse(laserX + (laserDiam * 0.05), laserY + (laserDiam * 0.05), laserDiam * 0.35, laserDiam * 0.35);

  // Textura Inacabada (image_527fbf.png)
  randomSeed(999);
  fill(10, 12, 15); 
  for (let i = 0; i < 12; i++) {
    let ang = random(PI * 0.7, PI * 1.3); 
    let rx = cos(ang) * (edmRaio / 2);
    let ry = sin(ang) * (edmRaio / 2);
    rect(rx - 5, ry - 10, random(15, 30), random(10, 20));
  }
  stroke(35, 45, 55);
  strokeWeight(2);
  for (let i = 0; i < 8; i++) {
    let ang = random(PI * 0.8, PI * 1.2);
    let rx = cos(ang) * (edmRaio * 0.45);
    let ry = sin(ang) * (edmRaio * 0.45);
    line(rx, ry, rx + random(10, 35), ry + random(-10, 10));
  }
  pop();

  // ==========================================================
  // CAMADA D: STAR DESTROYER DE PRIMEIRO PLANO
  // ==========================================================
  // 4. Destroyer Gigante (Passa na frente da parte inferior da Estrela da Morte)
  desenharStarDestroyer(width * 0.35, height * 0.68, 1.25, 62, sin(frameCount * 0.02) * 8);

  // ==========================================================
  // CAMADA E: CAÇAS TIE DE VANGUARDA (Passam NA FRENTE de tudo)
  // ==========================================================
  // Caças com índice ímpar (1 e 3) cruzam o primeiro plano em alta velocidade e tamanho grande
  for (let i = 1; i < 9; i += 2) {
    noiseSeed(i * 240);
    let tieX = noise(frameCount * 0.0045 + i) * (width * 1.6) - (width * 0.3);
    let tieY = noise(frameCount * 0.0055 + i + 80) * (height * 0.8);
    let profundidade = noise(frameCount * 0.003 + i * 1.5);
    
    // Escala expandida e cor nítida clara (Dando rasantes na tela)
    let tScale = map(profundidade, 0, 1, 0.65, 1.3);
    let tomCinza = map(profundidade, 0, 1, 100, 165);
    
    desenharTieFighter(tieX, tieY, tScale, tomCinza);
  }

  // 6. Silhueta de Montanhas Terrestres Distantes no Rodapé
  fill(8, 8, 12);
  noStroke();
  beginShape();
  vertex(0, height);
  vertex(0, height * 0.85);
  bezierVertex(width * 0.2, height * 0.82, width * 0.4, height * 0.92, width * 0.6, height * 0.88);
  bezierVertex(width * 0.75, height * 0.85, width * 0.9, height * 0.82, width, height * 0.86);
  vertex(width, height);
  endShape(CLOSE);

  // Texto de identificação
  fill(79, 195, 247, 180);
  textAlign(RIGHT, BOTTOM);
  textSize(16);
  textStyle(BOLD);
  text("CENÁRIO II: A ESTRELA DA MORTE EM ÓRBITA", width - 25, height - 25);

  desenharBotaoVoltar("star_wars_hub");
}