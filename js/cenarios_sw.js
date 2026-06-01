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
  // CONFIGURAÇÃO DO TEMPO (BEM LENTO)
  // ==========================================
  let cicloTempo = (frameCount * 0.012) % height; 
  let progressoPorDoSol = cicloTempo / height; // 0.0 (dia inicial) a 1.0 (noite profunda)

  // 1. GRADIENTE DO CÉU (Fiel à imagem de referência)
  // Transita do roxo escuro/preto no topo para o laranja vivo e depois azul escuro na noite
  let corCeuTop = lerpColor(color(43, 19, 58), color(10, 5, 20), progressoPorDoSol);
  let corCeuBottom = lerpColor(color(244, 114, 52), color(25, 12, 35), progressoPorDoSol);
  
  for (let y = 0; y < height * 0.75; y++) {
    let inter = map(y, 0, height * 0.75, 0, 1);
    let c = lerpColor(corCeuTop, corCeuBottom, inter);
    stroke(c);
    line(0, y, width, y);
  }

  // 2. OS SÓIS BINÁRIOS (Posições baseadas no pôster de referência)
  let horizonteY = height * 0.75;
  let sol1Y = (height * 0.38) + (cicloTempo * 0.6);
  let sol2Y = (height * 0.45) + (cicloTempo * 0.5);
  
  // Sol Esquerdo (Branco Puro / Amarelado na borda)
  if (sol1Y < horizonteY + 40) {
    noStroke();
    let pulso = sin(frameCount * 0.04) * 6;
    fill(255, 255, 255, 30); // Brilho suave externo
    ellipse(width * 0.58, sol1Y, width * 0.09 + pulso, width * 0.09 + pulso);
    fill(255, 255, 255);
    ellipse(width * 0.58, sol1Y, width * 0.06, width * 0.06);
  }

  // Sol Direito (Vermelho Puro / Alaranjado)
  if (sol2Y < horizonteY + 30) {
    noStroke();
    let pulso2 = cos(frameCount * 0.04) * 4;
    fill(217, 4, 41, 45); // Brilho avermelhado
    ellipse(width * 0.74, sol2Y, width * 0.08 + pulso2, width * 0.08 + pulso2);
    fill(217, 4, 41);
    ellipse(width * 0.74, sol2Y, width * 0.055, width * 0.055);
  }

  // 3. SOLO PLANO DO DESERTO (Preto Puro minimalista da referência)
  fill(12, 9, 15);
  noStroke();
  rect(0, horizonteY, width, height * 0.25);

  // 4. ESTRUTURAS SILHUETADAS (Totalmente pretas como no pôster)
  fill(12, 9, 15);
  
  // O Domo dos Lars (Casa do Luke à esquerda)
  let domoW = min(width * 0.28, 220);
  let domoH = domoW * 0.55;
  let domoX = width * 0.22;
  arc(domoX, horizonteY + 5, domoW, domoH * 2, PI, TWO_PI);
  
  // Pequeno anexo/entrada do domo à direita dele
  rect(domoX + domoW * 0.38, horizonteY - domoH * 0.3, domoW * 0.15, domoH * 0.3);

  // Vaporizador de Umidade (À extrema direita da imagem)
  let vapX = width * 0.9;
  let vapW = min(width * 0.015, 14);
  rect(vapX - vapW/2, horizonteY - 80, vapW, 80); // Base da torre
  rect(vapX - 2, horizonteY - 130, 4, 50);       // Antena fina superior
  ellipse(vapX, horizonteY - 80, vapW * 1.6, 6);   // Anéis modulares
  ellipse(vapX, horizonteY - 105, vapW * 1.3, 5);

  // 5. ANIMAÇÃO DO LUKE OBSERVANDO E ENTRANDO (Controle Cinematográfico)
  let lukeX = width * 0.46;
  let lukeY = horizonteY;
  let tamLuke = min(height * 0.05, 32);

  // Lógica do tempo de tela:
  if (progressoPorDoSol > 0.68 && progressoPorDoSol < 0.88) {
    // Quando os sóis se escondem, Luke caminha em direção à entrada do domo
    lukeX = map(progressoPorDoSol, 0.68, 0.88, width * 0.46, domoX + domoW * 0.45);
    lukeY = horizonteY + sin(frameCount * 0.25) * 1.5; // Balanço sutil dos passos
  } else if (progressoPorDoSol >= 0.88) {
    // Entrou na residência subterrânea
    lukeX = -999;
  }

  // Renderização da silhueta do Luke
  if (lukeX > 0) {
    fill(12, 9, 15);
    stroke(12, 9, 15);
    strokeWeight(1);
    
    // Cabeça
    ellipse(lukeX, lukeY - tamLuke, tamLuke * 0.28, tamLuke * 0.28);
    // Corpo/Túnica
    triangle(lukeX, lukeY - tamLuke * 0.8, lukeX - tamLuke * 0.18, lukeY, lukeX + tamLuke * 0.18, lukeY);
  }

  // 6. DETALHES DE IDENTIFICAÇÃO
  noStroke();
  fill(255, 215, 0, 140);
  textAlign(RIGHT, BOTTOM);
  textSize(15);
  textStyle(BOLD);
  text("TATOOINE: THE TWIN SUNS", width - 25, height - 25);

  desenharBotaoVoltar("star_wars_hub");
}

function cenarioEstrelaDaMorte() {
  // Ativa a Marcha Imperial em looping
  gerenciarMusica(somImperial);

  // 1. Espaço Cósmico Profundo (Fundo em degradê sutil do cinza muito escuro para o preto)
  for (let y = 0; y < height; y++) {
    let inter = y / height;
    let c = lerpColor(color(10, 12, 18), color(2, 2, 5), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // 2. Campo de Estrelas densas e variadas (Inspirado na imagem 1)
  fill(255);
  noStroke();
  randomSeed(54321); // Garante que fiquem estáticas no mesmo lugar
  for (let i = 0; i < 150; i++) {
    let tam = random(0.5, 2.5);
    // Cria variações de opacidade para simular profundidade espacial
    fill(255, 255, 255, random(100, 255));
    ellipse(random(width), random(height), tam, tam);
  }

  // 3. Desenho Central da Estrela da Morte (Inspirado nas imagens 1 e 2)
  push();
  // Centraliza a estação na metade superior/direita da tela, dando um aspecto de órbita cinematográfica
  let edmX = width * 0.5;
  let edmY = height * 0.45;
  let edmRaio = min(width, height) * 0.55; // Tamanho proporcional à tela

  translate(edmX, edmY);

  // Base circular principal da estação (Lado esquerdo na sombra, lado direito iluminado em azul/cinza)
  noStroke();
  fill(25, 32, 40); // Cor da sombra escura
  ellipse(0, 0, edmRaio, edmRaio);

  // Máscara de Iluminação (Meio círculo para dar volume esférico tridimensional igual à imagem 2)
  fill(55, 68, 83);
  arc(0, 0, edmRaio, edmRaio, -HALF_PI, HALF_PI);

  // Trincheira Equatorial Central (A linha preta divisória horizontal)
  stroke(10, 12, 15);
  strokeWeight(edmRaio * 0.015);
  line(-edmRaio / 2, 0, edmRaio / 2, 0);

  // 4. O Superlaser (A famosa cratera côncava de disparo)
  // Posicionada no quadrante superior direito (como na foto 1)
  let laserX = edmRaio * 0.15;
  let laserY = -edmRaio * 0.22;
  let laserDiam = edmRaio * 0.28;

  noStroke();
  fill(20, 26, 33); // Fundo côncavo interno da cratera
  ellipse(laserX, laserY, laserDiam, laserDiam);
  
  fill(40, 50, 62); // Borda interna iluminada para dar efeito de profundidade
  ellipse(laserX + (laserDiam * 0.05), laserY + (laserDiam * 0.05), laserDiam * 0.85, laserDiam * 0.85);
  
  fill(15, 20, 25); // Miolo central da lente do laser
  ellipse(laserX + (laserDiam * 0.05), laserY + (laserDiam * 0.05), laserDiam * 0.35, laserDiam * 0.35);

  // 5. Efeito de Textura/Construção Inacabada (Inspirado na Estrela da Morte II da imagem 1)
  // Desenha retângulos e linhas mecânicas recortando a lateral esquerda para simular a estrutura exposta
  randomSeed(999);
  fill(10, 12, 15); // Cor do espaço de fundo para fazer os recortes estruturais
  for (let i = 0; i < 12; i++) {
    let ang = random(PI * 0.7, PI * 1.3); // Focado na borda esquerda da esfera
    let rx = cos(ang) * (edmRaio / 2);
    let ry = sin(ang) * (edmRaio / 2);
    rect(rx - 5, ry - 10, random(15, 30), random(10, 20));
  }

  // Vigas e painéis internos expostos na área "destruída/em obras"
  stroke(35, 45, 55);
  strokeWeight(2);
  for (let i = 0; i < 8; i++) {
    let ang = random(PI * 0.8, PI * 1.2);
    let rx = cos(ang) * (edmRaio * 0.45);
    let ry = sin(ang) * (edmRaio * 0.45);
    line(rx, ry, rx + random(10, 35), ry + random(-10, 10));
  }

  pop();

  // 6. Silhueta de Montanhas Terrestres Distantes no Rodapé (Inspirado na imagem 1)
  fill(8, 8, 12);
  noStroke();
  beginShape();
  vertex(0, height);
  vertex(0, height * 0.85);
  bezierVertex(width * 0.2, height * 0.82, width * 0.4, height * 0.92, width * 0.6, height * 0.88);
  bezierVertex(width * 0.75, height * 0.85, width * 0.9, height * 0.82, width, height * 0.86);
  vertex(width, height);
  endShape(CLOSE);

  // Texto de identificação do cenário
  fill(79, 195, 247, 180);
  textAlign(RIGHT, BOTTOM);
  textSize(16);
  textStyle(BOLD);
  text("CENÁRIO II: A ESTRELA DA MORTE EM ÓRBITA", width - 25, height - 25);

  desenharBotaoVoltar("star_wars_hub");
}