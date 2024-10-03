const wordLists = {
  animals: [
      "PERRO", "GATO", "ELEFANTE", "LEÓN", "TIGRE", "CABALLO", "DOLPHIN", "GIRAFA",
      "RATÓN", "SERPIENTE", "CANGURO", "PANDA", "TORTUGA", "AGUILA", "FELINO", "LAGARTIJA",
      "OSO", "CONEJO", "KOALA", "CROCODILO", "HIPOPÓTAMO", "CABRA", "ZORRO", "LOBO",
      "RINOCERONTE", "GORILA", "BALLENA", "CANGREJO", "PULPO", "FOCA", "CALAMAR", "CAMELLO"
  ],
  jobs: [
      "MÉDICO", "INGENIERO", "CARPINTERO", "PINTOR", "DOCENTE", "CANTANTE", "CHEF",
      "VETERINARIO", "CERRAJERO", "MECÁNICO", "CANTINERO", "BARBERO", "CARNICERO",
      "PANADERO", "FARMACÉUTICO", "ARQUITECTO", "CIRUJANO", "PILOTO", "RECEPCIONISTA",
      "ABOGADO", "ENFERMERO", "CONTADOR", "POLICÍA", "BOMBERO", "ELECTRICISTA", "JUEZ",
      "PROGRAMADOR", "ESCRITOR", "FOTÓGRAFO", "AGRICULTOR", "PSICÓLOGO", "DISEÑADOR", "ADMINISTRADOR"
  ],
  fruits: [
      "MANZANA", "NARANJA", "BANANA", "FRESA", "KIWI", "MELÓN", "PIÑA", "CEREZA",
      "UVA", "MANGO", "PAPAYA", "LIMÓN", "PERA", "CÓCTEL", "COCO", "FRAMBUESA",
      "ALBARICOQUE", "CIRUELA", "SANDÍA", "GRANADA", "TAMARINDO", "DURAZNO", "MORA", 
      "FRUTILLA", "GUAYABA", "LICHI", "MARACUYÁ", "NECTARINA", "ARÁNDANO", "MANDARINA", "PLÁTANO"
  ],
  sports: [
      "FÚTBOL", "BÁSQUETBOL", "TENIS", "NATACIÓN", "CICLISMO", "VOLEIBOL", "GOLF",
      "RUGBY", "CRÍQUET", "BOXEO", "HOCKEY", "ESQUÍ", "SURF", "PATINAJE", "ATLETISMO",
      "BÉISBOL", "ARTESMARCIALES", "TIROCONARCO", "BALONMANO", "JUDO", "TAEKWONDO", 
      "ESGRIMA", "SÓFTBOL", "ESCALADA", "LACROSSE", "BADMINTON", "TRIATLÓN", "REMO", "SQUASH"
  ],
  countries: [
      "ARGENTINA", "BRASIL", "CANADÁ", "CHILE", "CHINA", "ESPAÑA", "FRANCIA", "ALEMANIA",
      "ITALIA", "JAPÓN", "MÉXICO", "PERÚ", "COLOMBIA", "RUSIA", "SUECIA", "AUSTRALIA",
      "INDIA", "EGIPTO", "NORUEGA", "SUIZA", "GRECIA", "DINAMARCA", "ISLANDIA", "SINGAPUR",
      "PAÍSESBAJOS", "NIGERIA", "VIETNAM", "FILIPINAS", "INDONESIA", "KENIA", "IRLANDA", "PORTUGAL"
  ],
  colors: [
      "ROJO", "AZUL", "VERDE", "AMARILLO", "NARANJA", "MORADO", "ROSADO", "NEGRO", "BLANCO",
      "GRIS", "VIOLETA", "CELESTE", "MARRÓN", "LILA", "TURQUESA", "CARMESÍ", "DORADO",
      "PLATEADO", "MAGENTA", "CAQUI", "CIAN", "ESMERALDA", "CORAL", "AQUA", "MALVA", "OLIVA"
  ],
  foods: [
      "PIZZA", "PASTA", "TACOS", "SUSHI", "HAMBURGUESA", "LASAÑA", "ENSALADA", "QUESO", 
      "PAN", "SÁNDWICH", "SOPA", "POLLO", "CARNE", "PESCADO", "ARROZ", "CEREALES", "TOSTADA",
      "EMPANADA", "PAELLA", "TORTILLA", "GAZPACHO", "SALMÓN", "BISTEC", "HUEVOS", "TOFU", 
      "NACHOS", "BURRITO", "CHURROS", "PAPASFRITAS", "AREPA", "CROISSANT", "CACAO"
  ],
  technology: [
      "COMPUTADORA", "SMARTPHONE", "TABLETA", "IMPRESORA", "ROUTER", "TECLADO", "MOUSE",
      "AURICULARES", "MONITOR", "MICRÓFONO", "CÁMARA", "USB", "CARGADOR", "LÁPIZÓPTICO",
      "ALTAVOZ", "BATERÍARECARGABLE", "DRON", "IMPRESORA3D", "SMARTWATCH", "CONSOLA",
      "ROBOT", "PROCESADOR", "TARJETADEVIDEO", "MEMORIARAM", "DISCODURO", "SSD", "FUENTEDEALIMENTACIÓN", 
      "MOTHERBOARD", "ANTENA", "MICROCHIP", "SOFTWARE", "HARDWARE"
  ]
};

let selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

const wordContainer = document.getElementById("word-container");
const keyboard = document.getElementById("keyboard");
const hangmanFigure = document.getElementById("hangman-figure");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-button");

// Renderiza la palabra con guiones y letras correctas
function renderWord() {
  wordContainer.innerHTML = selectedWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

// Renderiza el teclado
function renderKeyboard() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  keyboard.innerHTML = alphabet
    .map(
      letter => `
      <button onclick="guessLetter('${letter}')">${letter}</button>
    `
    )
    .join("");
}

// Adivinar una letra
window.guessLetter = (letter) => {
  if (guessedLetters.includes(letter) || mistakes >= maxMistakes) return;

  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
    renderWord();
    checkWin();
  } else {
    mistakes++;
    updateHangmanFigure();
    checkLoss();
  }
};

// Actualizar figura del ahorcado
function updateHangmanFigure() {
    const parts = [
      document.querySelector(".head"),
      document.querySelector(".body"),
      document.querySelector(".left-arm"),
      document.querySelector(".right-arm"),
      document.querySelector(".left-leg"),
      document.querySelector(".right-leg")
    ];
  
    // Mostrar las partes del muñeco de acuerdo con la cantidad de errores
    for (let i = 0; i < mistakes; i++) {
      if (parts[i]) {
        parts[i].style.display = "block";
      }
    }
  
    hangmanFigure.textContent = `Errores: ${mistakes} / ${maxMistakes}`;
  }
  

// Comprobar si el jugador ha ganado
function checkWin() {
  if (!wordContainer.textContent.includes("_")) {
    message.textContent = "¡Ganaste!";
    disableKeyboard();
  }
}

// Comprobar si el jugador ha perdido
function checkLoss() {
  if (mistakes >= maxMistakes) {
    message.textContent = `Perdiste. La palabra era ${selectedWord}`;
    disableKeyboard();
  }
}

// Deshabilitar el teclado después de ganar o perder
function disableKeyboard() {
  const buttons = keyboard.querySelectorAll("button");
  for (const button of buttons) {
    button.disabled = true;
  }
}

// Reiniciar el juego
resetButton.addEventListener("click", () => {
  guessedLetters = [];
  mistakes = 0;
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  renderWord();
  renderKeyboard();
  updateHangmanFigure();
  message.textContent = "";
});

// Inicializar el juego
renderWord();
renderKeyboard();
updateHangmanFigure();
