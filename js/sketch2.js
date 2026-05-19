let colunas = 8; // Quantas divisões na horizontal
let linhas = 6;  // Quantas divisões na vertical
let largBloco, altBloco;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Calcula o tamanho de cada bloco baseado no tamanho da tela
  largBloco = width / colunas;
  altBloco = height / linhas;
  
  // Define que as linhas pretas vão ser bem grossas como na obra de arte
  strokeWeight(6); 
  stroke(0); // Cor da linha: Preta
}

function draw() {
  background(255); // Fundo branco (base do Mondrian)

  // Loop para andar pelas colunas e linhas
  for (let i = 0; i < colunas; i++) {
    for (let j = 0; j < linhas; j++) {
      
      let x = i * largBloco;
      let y = j * altBloco;
      
      // --- MATEMÁTICA E INTERATIVIDADE ---
      // Calcula a distância do mouse até o bloco atual
      let d = dist(mouseX, mouseY, x + largBloco/2, y + altBloco/2);
      
      if (d < 180) {
        // Se o mouse estiver perto, escolhe uma cor primária baseada na posição
        if ((i + j) % 3 === 0) {
          fill(230, 40, 40);    // Vermelho Mondrian
        } else if ((i + j) % 3 === 1) {
          fill(40, 100, 200);   // Azul Mondrian
        } else {
          fill(240, 200, 40);   // Amarelo Mondrian
        }
      } else {
        // Se o mouse estiver longe, alguns blocos ficam brancos e outros pretos/cinzas
        if ((i * j) % 7 === 0) {
          fill(20); // Bloco Preto
        } else {
          fill(255); // Bloco Branco
        }
      }
      
      // Desenha o bloco do mosaico
      rect(x, y, largBloco, altBloco);
    }
  }
}

// --- NAVEGAÇÃO DA ÁRVORE BINÁRIA ---
function mousePressed() {
  if (mouseX < width / 2) {
    window.location.href = "pagina2.html"; // Vai para a Página 2 (Nó 2)
  } else {
    console.log("Você clicou na direita! Crie a pagina3.html para navegar para ela.");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  largBloco = width / colunas;
  altBloco = height / linhas;
}