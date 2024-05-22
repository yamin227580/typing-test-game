let textareaTag = document.querySelector(".inputText");
let typingTextTag = document.querySelector(".typingText");

let i = 0;
let count = 0;
let intervalID;
let typeChar = 0;
let typeError = 0;
let totalError = 0;
let current_quote;
let quotes_array = [
  "The only thing we have to fear is fear itself",
  "Spread love everywhere you go",
  "Let no one ever come to you without leaving happier",
  "You only live once, but if you do it right, once is enough",
  "Turn your wounds into wisdom",
  "I like criticism. It makes you strong",
];

function startGame() {
  UpdateQuote();
  reset();
}

function UpdateQuote() {
  //typingTextTag.textContent = wordsCollection[i]

  typingTextTag.textContent = null;
  current_quote = quotes_array[i];

  // separate each character and make an element
  // out of each of them to individually style them
  current_quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    typingTextTag.appendChild(charSpan);
  });
}

const restartBtn = document.querySelector(".restart");
const notiTag = document.querySelector(".noti");
const typeErrorTag = document.querySelector(".typeError");
const accuracyTag = document.querySelector(".accuracy");

function checkText() {
  let currentText = textareaTag.value;
  let currentTextArray = currentText.split("");

  typeChar++;
  console.log(typeChar);
  typeError = 0;
  let quoteArraySpan = typingTextTag.querySelectorAll("span");
  quoteArraySpan.forEach((char, index) => {
    let currentChar = currentTextArray[index];

    // characters not currently typed
    if (currentChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");

      // correct characters
    } else if (currentChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");

      // incorrect characters
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");

      // increment number of errors
      typeError++;
    }
  });

  typeErrorTag.textContent = totalError + typeError;

  // update accuracy text
  let correctCharacters = typeChar - (totalError + typeError);
  let accuracyVal = (correctCharacters / typeChar) * 100;
  accuracyTag.textContent = Math.round(accuracyVal);

  if (currentTextArray.length === quotes_array[i].length) {
    totalError += typeError;
    i += 1;
    UpdateQuote();
    textareaTag.value = "";
  }
}

restartBtn.addEventListener("click", () => {
  location.reload();
});

const countTime = document.querySelector(".countTime");

const myFuntion = () => {
  count++;
  if (count > 120) {
    clearInterval(intervalID);
    notiTag.classList.add("redColor");
    notiTag.classList.remove("greenColor");
    typingTextTag.textContent = "Click below to start typing";
    textareaTag.value = "start typing here.....";
    notiTag.textContent = "Alert!!! You fail your game and restart now";
    restartBtn.style.display = "block";
  } else {
    if (i === 6) {
      notiTag.classList.remove("redColor");
      notiTag.classList.add("greenColor");
      typingTextTag.textContent = "You Finish Now!!!";
      notiTag.textContent = "Congulations! You Win the Game";
      textareaTag.value = "Restart typing here.....";
      restartBtn.style.display = "block";

      clearInterval(intervalID);
    }
  }
  countTime.textContent = `${count} Sec`;
};

function reset() {
  intervalID = setInterval(myFuntion, 1000);
}
