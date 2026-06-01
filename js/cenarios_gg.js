// --- HUB PRINCIPAL DE GUARDIÕES DA GALÁXIA ---
function telaGuardiansHub() {
  desenharFundoEstrelas();
  desenharBotaoVoltar("inicio");

  fill(236, 64, 122); // Rosa/Magenta espacial
  textAlign(CENTER, CENTER);
  textSize(36);
  textStyle(BOLD);
  text("GUARDIÕES DA GALÁXIA", width/2, 90);

  fill(220);
  textSize(16);
  textStyle(NORMAL);
  let info = "Guiados pelas direções de James Gunn na Marvel, o grupo de saqueadores cósmicos\ntraz uma identidade super colorida, descontraída e regada a grandes sucessos\nmusicais das décadas de 70 e 80 gravados em fitas K7.";
  text(info, width/2, 180);

  // Botões dos sub-cenários
  let irParaMilano = criarBotao(width/2 - 210, 300, 200, 50, "Nebulosa e a Milano", color(20, 10, 30), color(156, 39, 176, 100));
  if (irParaMilano && mouseIsPressed) {
    estado = "gg_milano";
    mouseIsPressed = false;
  }

  let irParaCassette = criarBotao(width/2 + 10, 300, 200, 50, "Awesome Mix Vol. 1", color(30, 20, 10), color(255, 112, 67, 100));
  if (irParaCassette && mouseIsPressed) {
    estado = "gg_cassette";
    mouseIsPressed = false;
  }
}

// --- CENÁRIO 1: A NAVE MILANO EM XANDAR ---
function cenarioMilano() {
  background(10, 5, 20);
  
  // Efeito Nebulosa Cósmica (Camadas transparentes)
  noStroke();
  for (let i = 4; i > 0; i--) {
    fill(150, 0, 150, 12 - i * 2);
    ellipse(300, 200, 180 + i * 80, 140 + i * 60);
    fill(0, 150, 200, 10 - i * 1.5);
    ellipse(520, 260, 220 + i * 70, 160 + i * 50);
  }

  // Animação de flutuação da nave usando Seno
  anguloNave += 0.04;
  let naveY = 240 + sin(anguloNave) * 15;

  // Renderização simplificada da Milano
  push();
  translate(width/2 - 60, naveY);
  scale(1.2);

  // Fogo azul dos motores
  fill(0, 191, 255, 150 + sin(frameCount * 0.5) * 50);
  triangle(-40, 5, -75, 10, -40, 15);

  // Corpo e Asas da Nave
  fill(40, 80, 150);
  rect(-20, 0, 40, 20, 4); // Centro
  fill(20, 50, 100);
  triangle(-10, 5, 30, -25, 10, 5); // Asa Cima
  triangle(-10, 15, 30, 45, 10, 15); // Asa Baixo
  fill(220, 100, 20);
  triangle(10, 5, 45, 10, 10, 15); // Detalhe Laranja frontal

  pop();

  fill(0, 191, 255);
  textAlign(RIGHT, BOTTOM);
  textSize(18);
  textStyle(BOLD);
  text("CENÁRIO: A NAVE MILANO VIAJANDO", width - 25, height - 25);

  desenharBotaoVoltar("guardians_hub");
}

// --- CENÁRIO 2: CASSETE RETRÔ (AWESOME MIX) ---
function cenarioCassette() {
  background(20, 10, 15);
  
  // Linhas de perspectiva estilo anos 80 neon
  stroke(255, 20, 147, 40);
  line(0, 360, width, 360);
  for(let x=0; x<=width; x+=50) line(x, 360, x + (x - width/2)*1.3, height);

  // Corpo da Fita Cassete
  rectMode(CENTER);
  stroke(40); strokeWeight(5); fill(30, 30, 35);
  rect(width/2, 210, 360, 210, 12); // Chassi

  stroke(100); strokeWeight(2); fill(235, 220, 180);
  rect(width/2, 210, 310, 160, 6); // Adesivo de papel

  // Texto impresso na fita
  noStroke(); fill(0, 50, 150); textAlign(CENTER, CENTER); textSize(18); textStyle(BOLD);
  text("Awesome Mix Vol. 1", width/2, 160);

  // Janela central dos rolos de fita
  stroke(80); fill(15, 15, 15);
  rect(width/2, 225, 150, 55, 4);

  // Engrenagens pretas e cinzas dos rolos giratórios
  stroke(200); fill(60);
  ellipse(width/2 - 40, 225, 35, 35);
  ellipse(width/2 + 40, 225, 35, 35);

  // Efeito Visualizer de Ondas Sonoras (Tocando música)
  tempoSom += 0.25;
  stroke(0, 255, 255); strokeWeight(4);
  for(let i = 0; i < 12; i++) {
    let amp = 15 + sin(tempoSom + i) * 20;
    line(80 + i*6, 225 - amp/2, 80 + i*6, 225 + amp/2);
    line(650 + i*6, 225 - amp/2, 650 + i*6, 225 + amp/2);
  }

  rectMode(CORNER); // Restaura o comportamento padrão para não quebrar outros desenhos
  
  noStroke(); fill(255, 105, 180); textAlign(RIGHT, BOTTOM); textSize(18); textStyle(BOLD);
  text("CENÁRIO: TAPE RETRÔ DO STAR-LORD", width - 25, height - 25);

  desenharBotaoVoltar("guardians_hub");
}