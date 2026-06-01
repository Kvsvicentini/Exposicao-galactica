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
  // Ativa a música tema em looping
  gerenciarMusica(somTatooine);

  // 1. Céu em Gradiente Rico (Inspirado nos exemplos: Roxo -> Vermelho -> Laranja -> Amarelo)
  for (let y = 0; y < height; y++) {
    let inter = y / height;
    let c;
    if (inter < 0.4) {
      // Do Roxo escuro do topo para o Vermelho/Rosa do meio
      c = lerpColor(color(35, 10, 35), color(180, 25, 50), inter / 0.4);
    } else {
      // Do Vermelho/Rosa para o Laranja/Amarelo do horizonte
      c = lerpColor(color(180, 25, 50), color(240, 140, 50), (inter - 0.4) / 0.6);
    }
    stroke(c);
    line(0, y, width, y);
  }

  // 2. Estrelas discretas surgindo apenas no topo roxo do céu
  fill(255, 255, 255, 180);
  noStroke();
  randomSeed(888); // Semente fixa para não piscarem freneticamente
  for (let i = 0; i < 40; i++) {
    let estrelaY = random(height * 0.25);
    ellipse(random(width), estrelaY, random(1, 2.5));
  }

  // 3. Sóis Gêmeos (Tamanhos e cores inspirados nos seus arquivos)
  let centroX = width * 0.55;
  let centroY = height * 0.45;
  
  // Sol Maior (Tatoo I - Esbranquiçado / Amarelo Claro)
  fill(255, 250, 220);
  ellipse(centroX, centroY, height * 0.22, height * 0.22);
  
  // Sol Menor (Tatoo II - Laranja/Avermelhado, mais abaixo e à direita)
  fill(230, 70, 40);
  ellipse(centroX + (height * 0.15), centroY + (height * 0.1), height * 0.12, height * 0.12);

  // 4. Horizonte e Silhuetas Terrestres (Em corte totalmente escuro/vetorial)
  let nivelHorizonte = height * 0.78;
  
  // Dunas suaves ao fundo
  fill(45, 15, 20);
  beginShape();
  vertex(0, height);
  bezierVertex(width * 0.3, nivelHorizonte - 40, width * 0.7, nivelHorizonte + 20, width, nivelHorizonte - 10);
  vertex(width, height);
  endShape(CLOSE);

  // Solo plano frontal (Silhueta escura)
  fill(20, 5, 10);
  rect(0, nivelHorizonte, width, height - nivelHorizonte);

  // 5. Estruturas icônicas de Tatooine (Casas em cúpula e Vaporizadores)
  push();
  translate(width * 0.25, nivelHorizonte); // Posicionado à esquerda
  
  // Casa do Luke (Cúpula)
  fill(20, 5, 10);
  arc(0, 5, height * 0.18, height * 0.18, PI, 0); // Desenha a meia-esfera da cabana
  rect(height * 0.08, -height * 0.04, height * 0.03, height * 0.04); // Detalhe da entrada lateral
  
  // Vaporizador de Umidade (Antena fina à direita da casa)
  stroke(20, 5, 10);
  strokeWeight(3);
  let baseAntena = height * 0.12;
  line(baseAntena, 5, baseAntena, -height * 0.09); // Haste principal
  strokeWeight(5);
  line(baseAntena - 4, -height * 0.03, baseAntena + 4, -height * 0.03); // Anéis estruturais
  line(baseAntena - 2, -height * 0.06, baseAntena + 2, -height * 0.06);
  pop();

  // Texto de identificação do cenário
  noStroke();
  fill(255, 200, 120, 180);
  textAlign(RIGHT, BOTTOM);
  textSize(16);
  textStyle(BOLD);
  text("CENÁRIO I: OS SÓIS GÊMEOS DE TATOOINE", width - 25, height - 25);

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