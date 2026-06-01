// --- 1. TELA INTERMÉDIA: GUARDIANS HUB ---
function telaGuardiansHub() {
  // Desliga qualquer som ativo ao voltar para o painel informativo
  gerenciarMusica(null);

  desenharFundoEstrelas();
  desenharBotaoVoltar("inicio");

  fill(236, 64, 122); // Rosa vibrante característico dos Guardiões
  textAlign(CENTER, CENTER);
  textSize(width * 0.045);
  textStyle(BOLD);
  text("GUARDIÕES DA GALÁXIA", width / 2, height * 0.18);

  fill(220);
  textSize(max(14, width * 0.018));
  textStyle(NORMAL);
  let info = "Embalados por uma trilha sonora lendária dos anos 70 e 80,\nos desajustados mais amados do espaço defendem o universo.\nUma mistura perfeita de estética retrô, naves estilosas e cores neon pop.";
  text(info, width / 2, height * 0.36);

  let larguraBotao = 240;
  let alturaBotao = 50;
  
  // Botão para o Cenário da Nave Milano
  let irParaMilano = criarBotao(width / 2 - larguraBotao - 15, height * 0.6, larguraBotao, alturaBotao, "A Batalha da Milano", color(25, 35, 45), color(236, 64, 122, 100));
  if (irParaMilano && mouseIsPressed) {
    estado = "gg_milano";
    mouseIsPressed = false;
  }

  // Botão para o Cenário do Toca-Fitas
  let irParaCassette = criarBotao(width / 2 + 15, height * 0.6, larguraBotao, alturaBotao, "Awesome Mix Vol. 2", color(40, 30, 20), color(255, 193, 7, 100));
  if (irParaCassette && mouseIsPressed) {
    estado = "gg_cassette";
    mouseIsPressed = false;
  }
}

// --- 2. CENÁRIO I: A MILANO E AS ÓRBITAS ESTILIZADAS ---
function cenarioMilano() {
  // Ativa o som dos Guardiões (vamos configurar a variável já já no sketch.js)
  if (typeof somMilano !== 'undefined') gerenciarMusica(somMilano);

  // Fundo Espacial comNeblina Rosa/Roxa igual à ilustração fornecida
  background(15, 12, 22);
  
  // Efeito de Nebulosa de fundo usando partículas suaves
  randomSeed(777);
  for(let i = 0; i < 5; i++) {
    fill(200, 30, 80, 15);
    noStroke();
    ellipse(random(width), random(height), 400, 300);
  }

  // Desenho das Linhas de Órbita Excêntricas (Inspirado no pôster circular)
  noFill();
  stroke(255, 255, 255, 35);
  strokeWeight(1.5);
  
  let centroOrbitaX = -width * 0.1; // Centro deslocado para a esquerda criando arcos dramáticos
  let centroOrbitaY = height * 0.5;
  
  for (let r = 200; r < max(width, height) * 1.5; r += 70) {
    ellipse(centroOrbitaX, centroOrbitaY, r, r);
  }

  // Planetas Estilizados sobre as órbitas (Cores pop: Vermelho, Rosa, Azul Claro)
  randomSeed(12345);
  let coresPlanetas = [
    color(230, 70, 90),   // Vermelho Listrado
    color(66, 165, 245),  // Azul Claro com Crateras
    color(142, 68, 173),  // Roxo Escuro
    color(240, 98, 146)   // Rosa Claro
  ];

  for(let i = 0; i < 6; i++) {
    let ang = random( -QUARTER_PI, QUARTER_PI);
    let distOrbita = 350 + i * 140;
    let px = centroOrbitaX + cos(ang) * (distOrbita / 2);
    let py = centroOrbitaY + sin(ang) * (distOrbita / 2);
    let tam = random(30, 75);
    
    // Sombra do planeta
    fill(coresPlanetas[i % coresPlanetas.length]);
    noStroke();
    ellipse(px, py, tam, tam);
    
    // Detalhes estilizados de listras ou crateras
    stroke(255, 50);
    strokeWeight(2);
    line(px - tam/2 + 2, py, px + tam/2 - 2, py); // Listra equatorial de estilo retrô
  }

  // Linha de Trajetória da Nave (Faixa Diagonal Rosa)
  let inicioX = width * 0.2;
  let inicioY = height * 1.1;
  let fimX = width * 1.1;
  let fimY = height * -0.1;
  
  stroke(236, 64, 122, 180);
  strokeWeight(width * 0.18); // Faixa diagonal larga igual à imagem
  line(inicioX, inicioY, fimX, fimY);

  // ==========================================
  // CÁLCULO DA ANIMAÇÃO VIVA DA MILANO
  // ==========================================
  let flutuacao = sin(frameCount * 0.08) * 8; // Flutuação suave de subida/descida
  let tremor = random(-1.2, 1.2);            // Vibração mecânica de alta velocidade

  // Brilho do Rastro do Motor (Agora vibrando e piscando dinamicamente!)
  stroke(255, 255, 220); // Tom branco-amarelado brilhante super aquecido
  strokeWeight(12 + random(0, 5)); 
  line(inicioX + 15, inicioY + 15, width * 0.72 + tremor, height * 0.32 + flutuacao);

  // Desenho Vetorial Avançado da Nave MILANO (Com coordenadas amarradas à animação)
  push();
  // Posicionando a nave aplicando a flutuação e o tremor dinâmicos
  translate(width * 0.75 + tremor, height * 0.28 + flutuacao);
  rotate(-QUARTER_PI - 0.1); // Inclina a nave no ângulo correto de subida
  
  let tamNave = min(width, height) * 0.14;

  // Asas superiores estendidas (Formato de águia)
  fill(30, 136, 229); // Azul Milano
  noStroke();
  beginShape();
  vertex(0, -tamNave * 0.3);
  vertex(-tamNave * 0.9, tamNave * 0.4);
  vertex(-tamNave * 0.6, tamNave * 0.5);
  vertex(0, tamNave * 0.1);
  vertex(tamNave * 0.6, tamNave * 0.5);
  vertex(tamNave * 0.9, tamNave * 0.4);
  endShape(CLOSE);

  // Detalhes Laranja das Asas
  fill(245, 124, 0); 
  triangle(-tamNave * 0.4, tamNave * 0.2, -tamNave * 0.7, tamNave * 0.4, -tamNave * 0.5, tamNave * 0.4);
  triangle(tamNave * 0.4, tamNave * 0.2, tamNave * 0.7, tamNave * 0.4, tamNave * 0.5, tamNave * 0.4);

  // Corpo Central (Fuselagem e Cockpit)
  fill(20, 90, 160);
  quad(-tamNave * 0.2, -tamNave * 0.4, tamNave * 0.2, -tamNave * 0.4, tamNave * 0.25, tamNave * 0.2, -tamNave * 0.25, tamNave * 0.2);
  
  // Cabine de Vidro Brilhante
  fill(178, 235, 242, 220);
  triangle(0, -tamNave * 0.35, -tamNave * 0.1, -tamNave * 0.1, tamNave * 0.1, -tamNave * 0.1);

  pop();

  // Pequenas naves de escolta (Também acompanham a flutuação para fazer sentido no voo)
  fill(15, 12, 22);
  triangle(width * 0.88 + tremor, height * 0.55 + flutuacao, width * 0.86 + tremor, height * 0.58 + flutuacao, width * 0.90 + tremor, height * 0.58 + flutuacao);
  triangle(width * 0.60 + tremor, height * 0.85 + flutuacao, width * 0.58 + tremor, height * 0.88 + flutuacao, width * 0.62 + tremor, height * 0.88 + flutuacao);

  // Identificação do cenário
  noStroke();
  fill(236, 64, 122, 200);
  textAlign(RIGHT, BOTTOM);
  textSize(16);
  textStyle(BOLD);
  text("CENÁRIO I: A FUGA DA MILANO", width - 25, height - 25);

  desenharBotaoVoltar("guardians_hub");
}

// --- 3. CENÁRIO II: O DECK DO TOCA-FITAS (AWESOME MIX VOL. 2) ---
function cenarioCassette() {
  if (typeof somCassette !== 'undefined' && somCassette) gerenciarMusica(somCassette);

  // 1. Textura Base de Madeira
  background(62, 39, 24); 
  
  stroke(46, 26, 14);
  strokeWeight(3);
  for(let y = 0; y < height; y += 15) {
    line(0, y + sin(y) * 10, width, y + cos(y) * 5);
  }

  // 2. Chapa de Metal Central Principal
  let deckW = min(width * 0.7, 500);
  let deckH = min(height * 0.5, 380);
  let deckX = width / 2 - deckW / 2;
  let deckY = height / 2 - deckH / 2;

  // Moldura externa metálica
  fill(160, 160, 160);
  noStroke();
  rect(deckX - 10, deckY - 10, deckW + 20, deckH + 20, 6);
  
  // Painel interno escovado escuro
  fill(33, 33, 33);
  rect(deckX, deckY, deckW, deckH, 4);

  // 3. Compartimento de Encaixe da Fita
  let fitaW = deckW * 0.75;
  let fitaH = deckH * 0.62;
  let fitaX = deckX + (deckW - fitaW) / 2;
  let fitaY = deckY + 30;

  fill(18, 18, 18);
  rect(fitaX, fitaY, fitaW, fitaH, 10);

  // 4. A FITA CASSETE
  let cW = fitaW * 0.9;
  let cH = fitaH * 0.88;
  let cX = fitaX + (fitaW - cW) / 2;
  let cY = fitaY + (fitaH - cH) / 2;

  // Corpo de plástico da fita
  fill(55, 60, 65);
  rect(cX, cY, cW, cH, 8);

  // Rótulo Central da Fita (Awesome Mix Vol. 2)
  let rotW = cW * 0.85;
  let rotH = cH * 0.55;
  let rotX = cX + (cW - rotW) / 2; // Centralizado dinamicamente em relação à fita
  let rotY = cY + 12;

  fill(245, 242, 235); 
  rect(rotX, rotY, rotW, rotH, 4); // Ajustado de rotW para rotX na posição horizontal
  
  // Faixas decorativas magentas do rótulo
  fill(197, 17, 98);
  rect(rotX, rotY + 5, rotW, 6);
  rect(rotX, rotY + rotH - 12, rotW, 6);

  // Texto manuscrito "Awesome Mix Vol. 2"
  fill(25, 35, 90); 
  textAlign(CENTER, CENTER);
  textSize(max(12, rotH * 0.2));
  textStyle(ITALIC);
  text("Awesome Mix Vol. 2", rotX + rotW/2, rotY + rotH/2);

  // 5. Orifícios das Bobinas de Engrenagem
  let centroEsquerdoX = cX + cW * 0.32;
  let centroDireitoX = cX + cW * 0.68;
  let bobinaY = cY + cH * 0.72;
  let bobinaDiam = cH * 0.22;

  fill(20);
  stroke(0);
  ellipse(centroEsquerdoX, bobinaY, bobinaDiam, bobinaDiam);
  ellipse(centroDireitoX, bobinaY, bobinaDiam, bobinaDiam);

  // Dentes de engrenagem internos
  stroke(180);
  strokeWeight(3);
  for (let a = 0; a < TWO_PI; a += TWO_PI / 6) {
    line(centroEsquerdoX, bobinaY, centroEsquerdoX + cos(a)*(bobinaDiam/2), bobinaY + sin(a)*(bobinaDiam/2));
    line(centroDireitoX, bobinaY, centroDireitoX + cos(a)*(bobinaDiam/2), bobinaY + sin(a)*(bobinaDiam/2));
  }

  // 6. Botões Mecânicos do Player Inferior
  let btnW = deckW / 6;
  let btnH = 25;
  let btnY = deckY + deckH - btnH - 15;

  for(let i = 0; i < 5; i++) {
    let bx = deckX + (deckW * 0.08) + (i * (btnW + 5));
    let hoverBtn = mouseX > bx && mouseX < bx + btnW && mouseY > btnY && mouseY < btnY + btnH;
    
    fill(hoverBtn ? 140 : 100);
    stroke(180);
    strokeWeight(1.5);
    rect(bx, btnY, btnW, btnH, 2);
    
    stroke(220);
    line(bx + 2, btnY + 3, bx + btnW - 2, btnY + 3);
  }

  // Medidores analógicos de VU nos locais corretos (Displays amarelos)
  let vuSize = 65;
  desenharVU(deckX + 35, deckY + deckH * 0.68, vuSize);
  desenharVU(deckX + deckW - 35 - vuSize, deckY + deckH * 0.68, vuSize);

  // Identificação do cenário
  noStroke();
  fill(255, 193, 7, 200);
  textAlign(RIGHT, BOTTOM);
  textSize(16);
  textStyle(BOLD);
  text("CENÁRIO II: AWESOME MIX CASSETTE PLAYER", width - 25, height - 25);

  desenharBotaoVoltar("guardians_hub");
}

// Função auxiliar para renderizar os visores analógicos com ponteiro móvel
function desenharVU(x, y, sz) {
  fill(225, 200, 40); // Amarelo retrô aquecido
  stroke(40);
  strokeWeight(2);
  rect(x, y, sz, sz * 0.6, 3);
  
  // Ponteiro dinâmico usando o frameCount para simular a música batendo
  stroke(0);
  strokeWeight(1.5);
  let angVU = map(sin(frameCount * 0.2 + x), -1, 1, -PI * 0.75, -PI * 0.25);
  line(x + sz/2, y + sz * 0.55, x + sz/2 + cos(angVU)*(sz*0.48), y + sz * 0.55 + sin(angVU)*(sz*0.48));
}