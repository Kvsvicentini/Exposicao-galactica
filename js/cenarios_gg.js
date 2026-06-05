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

    // === CORREÇÃO: Inicia a música aqui, apenas uma vez no clique ===
    if (typeof milano !== 'undefined') {
      gerenciarMusica(milano);
      milano.play().catch(e => console.log("Interação necessária para áudio:", e));
    }
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
  if (typeof milano !== 'undefined') gerenciarMusica(milano);

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


  // CÁLCULO DA ANIMAÇÃO VIVA DA MILANO
 
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
  text(playlistGG[indiceMusicaAtual].titulo, rotX + rotW/2, rotY + rotH/2);

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
  //  SISTEMA DE RÁDIO INTERATIVO E FUNCIONAL 
  let btnW = deckW / 6.5;
  let btnH = 30;
  let btnY = deckY + deckH - btnH - 15;
  let espacamento = 8;
  
  // Centraliza o bloco dos 5 botões na largura do deck dinamicamente
  let startX = deckX + (deckW - (5 * btnW + 4 * espacamento)) / 2;

  // Mapeamento dos botões físicos do rádio e suas funções
  let botoesRadio = [
    { txt: "◀◀", acao: "retroceder" },
    { txt: "▶",  acao: "play" },
    { txt: "⏸",  acao: "pause" },
    { txt: "■",  acao: "stop" },
    { txt: "▶▶", acao: "avancar" }
  ];

  // Pega qual áudio está ativo no índice atual da playlist
  let musicaRolando = playlistGG[indiceMusicaAtual].audio;

  for (let i = 0; i < botoesRadio.length; i++) {
    let bx = startX + (i * (btnW + espacamento));
    let hoverBtn = mouseX > bx && mouseX < bx + btnW && mouseY > btnY && mouseY < btnY + btnH;
    
    // Feedback visual: Muda a cor se estiver ativo ou clicado
    if (botoesRadio[i].acao === "play" && tocandoGG) {
      fill(0, 229, 255, 200); // Brilha azul neon se o som estiver rolando
    } else if (botoesRadio[i].acao === "pause" && !tocandoGG && musicaRolando.currentTime > 0) {
      fill(236, 64, 122, 200); // Brilha rosa se estiver pausada no meio da música
    } else {
      fill(hoverBtn ? 140 : 90);
    }

    stroke(hoverBtn ? 255 : 150);
    strokeWeight(1.5);
    rect(bx, btnY, btnW, btnH, 4);
    
    // Efeito de relevo metálico superior no botão
    stroke(220); line(bx + 2, btnY + 3, bx + btnW - 2, btnY + 3);

    // Renderiza o caractere do controle (Play, Pause, etc)
    noStroke();
    fill(hoverBtn ? 255 : 210);
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(botoesRadio[i].txt, bx + btnW/2, btnY + btnH/2);

    // --- PROCESSAMENTO DO CLIQUE DO CONTROLE ---
    if (hoverBtn && mouseIsPressed) {
      mouseIsPressed = false; // Trava o clique do frame para não disparar em loop

      if (botoesRadio[i].acao === "play") {
        gerenciarMusica(null); // Desliga outras trilhas de fundo se houver
        musicaRolando.play().catch(e => console.log("Aguardando interação inicial do usuário."));
        tocandoGG = true;
      } 
      else if (botoesRadio[i].acao === "pause") {
        musicaRolando.pause();
        tocandoGG = false;
      } 
      else if (botoesRadio[i].acao === "stop") {
        musicaRolando.pause();
        musicaRolando.currentTime = 0; // Volta para o início da música
        tocandoGG = false;
      } 
      else if (botoesRadio[i].acao === "avancar" || botoesRadio[i].acao === "retroceder") {
        // Pausa e reseta a música atual antes de mudar de faixa
        musicaRolando.pause();
        musicaRolando.currentTime = 0;

        if (botoesRadio[i].acao === "avancar") {
          // Vai para o próximo índice (e volta pro 0 se chegar ao fim da lista)
          indiceMusicaAtual = (indiceMusicaAtual + 1) % playlistGG.length;
        } else {
          // Volta uma música (e se for menor que 0, vai para o final da lista)
          indiceMusicaAtual = (indiceMusicaAtual - 1 + playlistGG.length) % playlistGG.length;
        }

        // Atualiza a variável local com o novo arquivo de áudio da lista
        musicaRolando = playlistGG[indiceMusicaAtual].audio;

        // Se o player já estava ativo, começa a tocar a nova faixa automaticamente
        if (tocandoGG) {
          musicaRolando.play().catch(e => console.log(e));
        }
      }
    }
  }

  // --- ANIMAÇÃO DO VU DINÂMICO ---
  let vuSize = 65;
  // Se estiver tocando, gera oscilação rítmica baseada em noise(), se não, ponteiro fica no zero
  let intensidadeVU = tocandoGG ? noise(frameCount * 0.18) * vuSize : 4;
  
  desenharVU(deckX + 35, deckY + deckH * 0.68, vuSize, intensidadeVU);
  desenharVU(deckX + deckW - 35 - vuSize, deckY + deckH * 0.68, vuSize, intensidadeVU);

 

  // Identificação do cenário
  noStroke();
  fill(255, 193, 7, 200);
  textAlign(RIGHT, BOTTOM);
  textSize(16);
  textStyle(BOLD);
  text("CENÁRIO II: AWESOME MIX CASSETTE PLAYER", width - 25, height - 25);

  // --- BOTÃO VOLTAR COM DESLIGAMENTO DO RÁDIO ---
  let clicouVoltar = criarBotao(25, 25, 90, 35, "◄ Voltar", color(40, 40, 60), color(70, 70, 110));
  if (clicouVoltar && mouseIsPressed) {
    estado = "guardians_hub";
    mouseIsPressed = false; 

    // Se houver uma playlist configurada e o rádio estiver ativo, pausa o som atual
    if (typeof playlistGG !== 'undefined' && playlistGG.length > 0) {
      playlistGG[indiceMusicaAtual].audio.pause();
      playlistGG[indiceMusicaAtual].audio.currentTime = 0; // Opcional: reseta para o começo da faixa
    }
    tocandoGG = false; // Desliga o status de reprodução (para os ponteiros do VU e engrenagens)
  }
}

// Função auxiliar para renderizar os visores analógicos com ponteiro móvel
function desenharVU(x, y, tamanho, valorDinamico = 5) {
  fill(30, 25, 20);
  stroke(100);
  rect(x, y, tamanho, tamanho * 0.6, 3);
  
  // Linha do arco analógico
  noFill();
  stroke(255, 193, 7, 90);
  arc(x + tamanho/2, y + tamanho * 0.55, tamanho * 0.8, tamanho * 0.8, PI, TWO_PI);
  
  // Ponteiro vermelho que oscila rítmico
  stroke(255, 50, 50);
  strokeWeight(2);
  let anguloVU = map(valorDinamico, 0, tamanho, PI + 0.3, TWO_PI - 0.3);
  let px = x + tamanho/2 + cos(anguloVU) * (tamanho * 0.35);
  let py = y + tamanho * 0.55 + sin(anguloVU) * (tamanho * 0.35);
  line(x + tamanho/2, y + tamanho * 0.55, px, py);
}