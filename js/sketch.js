let tamanho = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(20);
  // Desenha um mosaico simples em tons de AZUL
  for (let x = 0; x < width; x += tamanho) {
    for (let y = 0; y < height; y += tamanho) {
      let d = dist(mouseX, mouseY, x, y);
      if (d < 150) {
        fill(0, 150, 255); // Azul brilhante perto do mouse
      } else {
        fill(40);
      }
      stroke(0);
      rect(x, y, tamanho, tamanho);
    }
  }
}

function mousePressed() {
  if (mouseX < width / 2) {
    window.location.href = "pagina2.html"; // Se clicar na esquerda, vai para a página 2
  } else {
    console.log("Você clicou na direita! (Ainda não criamos a pagina3.html)");
  }
}