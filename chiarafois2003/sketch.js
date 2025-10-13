// Variabili globali 
let dataTable;
let validRows = []; 

// Variabili per risultati
let meanCol0;
let meanCol1;
let stdDevCol1;
let modeCol2;
let medianCol3;
let meanCol4; 
let stdDevCol4; 

// Liste per i valori delle colonne
let valuesCol0 = [];
let valuesCol1 = [];
let valuesCol2 = [];
let valuesCol3 = [];
let valuesCol4 = [];

let counts = {};
let highestCount = 0;

// Caricamento dati 
function preload() {
  dataTable = loadTable('dataset.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Scorrere le righe della tabella e prendere quelle che ci interessano
  for (let row of dataTable.getRows()) {
    let valCol0 = row.getNum(0); // Colonna 0
    let valCol2 = row.getNum(2); // Colonna 2
    // Condizioni per selezionare le righe
    if (valCol2 < 0 && valCol0 % 5 === 0) {
      // Aggiunta righe valide alla lista
      validRows.push(row);
    }
  }

  // Estrarre i valori in liste separate
  for (let row of validRows) {
    valuesCol0.push(row.getNum(0));
    valuesCol1.push(row.getNum(1));
    valuesCol2.push(row.getNum(2));
    valuesCol3.push(row.getNum(3));
    valuesCol4.push(row.getNum(4));
  }

  // 1. Calcolare la media della colonna 0
  let sumCol0 = 0;
  for (let val of valuesCol0) {
    sumCol0 = sumCol0 + val;
  }
  meanCol0 = sumCol0 / valuesCol0.length;
  // print("Media colonna 0 delle righe valide: " + meanCol0);

  // 2. Calcolare la deviazione standard della colonna 1
  // Media della colonna 1
  let sumCol1 = 0;
  for (let val of valuesCol1) {
    sumCol1 += val;
  }
  meanCol1 = sumCol1 / valuesCol1.length;

  // Calcolare la varianza
  let sumOfSquares = 0;
  for (let val of valuesCol1) {
    let difference = val - meanCol1;
    sumOfSquares += difference * difference; // Somma delle differenze al quadrato
  }
  let variance = sumOfSquares / valuesCol1.length;

  // Deviazione standard = radice quadrata della varianza
  stdDevCol1 = sqrt(variance); 

  // 3. Calcolare la moda della colonna 2
  counts = {}; // Memorizzare quante volte vediamo ogni numero
  
  // Riempire l'oggetto con i conteggi
  for (let val of valuesCol2) {
    if (counts[val]) {
      counts[val]++; // Se l'abbiamo già visto, aumentiamo il suo contatore
    } else {
      counts[val] = 1; // Se è la prima volta, partiamo da 1
    }
  }

  // Trovare qual è il numero con il conteggio più alto
  highestCount = 0;
  for (let val in counts) {
    if (counts[val] > highestCount) {
      highestCount = counts[val];
      modeCol2 = val; // Memorizzare il numero
    }
  }

  // 4. Calcolare la mediana della colonna 3
  // Ordinare l'array
  let sortedCol3 = valuesCol3.sort((a, b) => a - b);

  // Trovare l'indice di mezzo
  let midIndex = Math.floor(sortedCol3.length / 2);

  // Controllare se la lunghezza è pari o dispari
  if (sortedCol3.length % 2 === 0) {
    // Caso PARI: la mediana è la media dei due valori centrali
    let val1 = sortedCol3[midIndex - 1];
    let val2 = sortedCol3[midIndex];
    medianCol3 = (val1 + val2) / 2;
  } else {
    // Caso DISPARI: la mediana è il valore centrale
    medianCol3 = sortedCol3[midIndex];
  }

  // 5. Calcolare media e deviazione standard della colonna 4
  // Media
  let sumCol4 = 0;
  for (let val of valuesCol4) {
    sumCol4 += val;
  }
  meanCol4 = sumCol4 / valuesCol4.length;

  // Deviazione Standard
  let sumOfSquaresCol4 = 0;
  for (let val of valuesCol4) {
    let difference = val - meanCol4;
    sumOfSquaresCol4 += difference * difference;
  }
  let varianceCol4 = sumOfSquaresCol4 / valuesCol4.length;
  stdDevCol4 = sqrt(varianceCol4);
}

function draw() {
  background(230, 240, 255);
  
  // Titolo Principale
  fill(0);
  textSize(50); 
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("ASSIGNMENT 1", width / 2, 20);

  // Funzione per disegnare i riquadri 
  function drawBox(x, y, w, h, title) {
    stroke(180);
    strokeWeight(2);
    fill(255);
    rect(x, y, w, h, 10);
    
    fill(0);
    noStroke();
    textSize(20); 
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(title.toUpperCase(), x + w / 2, y + 20); 
  }

  // Calcolo posizioni
  let padding = 30;
  let boxWidth = (width - padding * 4) / 3;
  let boxHeight = (height - 120 - padding * 2) / 2; 
  let topY = 90; 
  let bottomY = topY + boxHeight + padding;

  // Riquadri
  // Fila in alto
  let box1X = padding;
    drawBox(box1X, topY, boxWidth, boxHeight, "Rappresentazione Colonna 0");
    drawGraphicBox1(box1X, topY, boxWidth, boxHeight);

  let box2X = padding * 2 + boxWidth;
    drawBox(box2X, topY, boxWidth, boxHeight, "Rappresentazione Colonna 1");
    drawGraphicBox2(box2X, topY, boxWidth, boxHeight);
  
  let box3X = padding * 3 + boxWidth * 2;
  let box3Y = topY;
  drawBox(box3X, box3Y, boxWidth, boxHeight, "Rappresentazione Colonna 2");
  drawGraphicBox3(box3X, box3Y, boxWidth, boxHeight);
  
  // Fila in basso
  let bottomX1 = padding * 1.5 + boxWidth / 2;
  drawBox(bottomX1, bottomY, boxWidth, boxHeight, "Rappresentazione Colonna 3");
  drawTextBox4(bottomX1, bottomY, boxWidth, boxHeight);
  
  let box5X = bottomX1 + boxWidth + padding;
  drawBox(box5X, bottomY, boxWidth, boxHeight, "Rappresentazione Colonna 4");
  drawChoiceBox5(box5X, bottomY, boxWidth, boxHeight);
}

// Riquadro 1: Media colonna 0
function drawGraphicBox1(x, y, w, h) {
  // Parametri della barra
  let padding = 40;
  let barHeight = 50;
  let scaleMin = 0;
  let scaleMax = 100; 
  
  // Posizione della barra
  let barX = x + padding;
  let barY = y + h/2 - barHeight/2;
  let barTotalWidth = w - padding * 2;
  
  // Sfondo della barra 
  noStroke();
  fill(230);
  rect(barX, barY, barTotalWidth, barHeight, 10);
  
  // Barra riempita 
  // Mappare la media a una larghezza in pixel
  let filledWidth = map(meanCol0, scaleMin, scaleMax, 0, barTotalWidth);
  fill(50, 100, 200); // Blu
  rect(barX, barY, filledWidth, barHeight, 10);
  
  // Valore numerico 
  fill(255);
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  // Posizionare il testo all'interno della barra
  let textXPos = max(barX + 31, barX + filledWidth - 40);
  text(meanCol0.toFixed(2), textXPos, barY + barHeight/2);
  
  // Tacche 
  stroke(150);
  strokeWeight(1);
  for (let i = 0; i <= 10; i++) {
    let tickX = barX + (i * barTotalWidth / 10);
    line(tickX, barY + barHeight, tickX, barY + barHeight + 5);
    
    noStroke();
    fill(150);
    textSize(10);
    textAlign(CENTER, TOP);
    text(i * 10, tickX, barY + barHeight + 10);
  }
}

// Riquadro 2: Deviazione Standard colonna 1
function drawGraphicBox2(x, y, w, h) {
  // Parametri
  let centerX = x + w / 2;
  let bottomY = y + h - 40; 
  let scaleFactor = 2; 

  // Linea della Media 
  stroke(200);
  strokeWeight(1);
  line(centerX, bottomY, centerX, y + 60);

  // Area ombreggiata 
  let stdDevWidth = stdDevCol1 * scaleFactor;
  fill(204, 102, 0, 50); 
  noStroke();
  rect(centerX - stdDevWidth, y + 60, stdDevWidth * 2, bottomY - (y + 60));

  // Curva a campana
  beginShape();
  fill(204, 102, 0, 150);
  vertex(x + 20, bottomY);
  for (let i = x + 20; i <= x + w - 20; i++) {
    let exponent = -pow(i - centerX, 2) / (2 * pow(stdDevWidth, 2));
    let curveY = bottomY - (h * 0.6) * exp(exponent);
    vertex(i, curveY);
  }
  vertex(x + w - 20, bottomY);
  endShape(CLOSE);
  
  // Freccia a doppia punta per evidenziare 
  stroke(0);
  strokeWeight(1.5);
  line(centerX - stdDevWidth, bottomY + 10, centerX + stdDevWidth, bottomY + 10);
  line(centerX - stdDevWidth, bottomY + 5, centerX - stdDevWidth, bottomY + 15);
  line(centerX + stdDevWidth, bottomY + 5, centerX + stdDevWidth, bottomY + 15);
  
  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  textSize(12);
  text("Deviazione standard: " + stdDevCol1.toFixed(2), centerX, bottomY + 15);
}

// Riquadro 3: Moda colonna 2
function drawGraphicBox3(x, y, w, h) {
  // 1. Get unique numbers and sort them
  let uniqueNumbers = Object.keys(counts).map(Number).sort((a, b) => a - b);
  
  // 2. Define the color gradient
  let colorStart = color(255, 255, 204);
  let colorEnd = color(255, 165, 0);
  
  // 3. Grid layout calculations
  let numItems = uniqueNumbers.length;
  let padding = 40; 
  let cols = 8;
  let rows = Math.ceil(numItems / cols);
  let cellWidth = (w - padding * 2) / cols;
  let cellHeight = (h - padding * 2 - 20) / rows;

  // 4. Loop to draw circles
  for (let i = 0; i < numItems; i++) {
    let val = uniqueNumbers[i];
    let count = counts[val];
    
    let c = i % cols;
    let r = Math.floor(i / cols);
    
    let xPos = x + padding + c * cellWidth + cellWidth / 2;
    let yPos = y + padding + 20 + r * cellHeight + cellHeight / 2;
    
    // Calculate size and color
    // <<< AUMENTATO il range della dimensione
    let size = map(count, 0, highestCount, 12, min(cellWidth, cellHeight) * 1);
    let colorAmount = map(count, 0, highestCount, 0, 1);
    let circleColor = lerpColor(colorStart, colorEnd, colorAmount);
    
    fill(circleColor);
    noStroke();
    ellipse(xPos, yPos, size, size);

    // 5. Interactivity
    let distance = dist(mouseX, mouseY, xPos, yPos);
    if (distance < size / 2) {
      fill(0);
      textSize(14);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text("Val: " + val + " (x" + count + ")", xPos, yPos - size / 2 - 10);
    }
  }
}

// Riquadro 4: Mediana colonna 3
function drawTextBox4(x, y, w, h) {
  fill(0);
  textSize(72);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(medianCol3.toFixed(2), x + w / 2, y + h / 2 - 10);

  fill(100);
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  text("MEDIANA COLONNA 3", x + w / 2, y + h / 2 + 30);
}

// Riquadro 5: Media e Deviazione Standard colonna 4
function drawChoiceBox5(x, y, w) {
  let labelX = x + w / 2;
  let labelY = y + 85; 
  let spacing = 100;    
  textAlign(CENTER, CENTER);
  
  // MEDIA COLONNA 4 
  fill(100);
  textSize(20); 
  textStyle(NORMAL);
  text("Media colonna 4", labelX, labelY);

  fill(50, 100, 200);
  textSize(50); 
  textStyle(BOLD);
  text(meanCol4.toFixed(2), labelX, labelY + 40);

  // DEVIAZIONE STANDARD COLONNA 4 
  labelY += spacing;
  fill(100);
  textSize(20); 
  textStyle(NORMAL);
  text("Deviazione standard colonna 4", labelX, labelY);

  fill(204, 102, 0);
  textSize(50);
  textStyle(BOLD);
  text(stdDevCol4.toFixed(2), labelX, labelY + 40);
}