const display =
  document.querySelector(
    ".calculator-input"
  ); /* kullanıcıdan alcağımız sayılar için */
const keys = document.querySelector(".calculator-keys"); // butonlar için

let displayValue = "0"; // başlangıç değeri
let firstValue = null; //ilk değer
let operator = null;
let waitingForSecondValue = false; //ikinci bilginin geldiğini kontrol eder

updateDisplay();

function updateDisplay() {
  display.value = displayValue; // her tuşa bastığımızda değeri değiştircek
}

keys.addEventListener("click", function (e) {
  // butona tıkladığımız zaman tepki vermesi için
  const element = e.target;
  console.log(element.value)

  if (!element.matches("button")) return; // sadece butona tıkladığında bir şeyler vermesi için

  if (element.classList.contains("operator")) {
    // basılan tuş operator mü diye kontrol et
    //console.log("operator", element.value);
    
    handleOperator(element.value); //operatorlere tıkladığımızı algılamaları için
    updateDisplay();
    return;
  }

  if (element.classList.contains("decimal")) {
    //console.log("decimal", element.value);
    inputDecimal();
    updateDisplay();
    return;
  }
  if (element.classList.contains("clear")) {
    //console.log("clear", element.value);
    clear();
    updateDisplay();
    return;
  }

  // console.log(element);
  inputNumber(element.value); // sayı bilgileri girilsin
  updateDisplay();
});

function handleOperator(nextoperator) {
  const value = parseFloat(displayValue); //hesap makinesindeki görünen değer nedir.

  if (firstValue == null) {
    //henüz henüz sayı veya operatör girilmemiştir.
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator); //işlem aşamları

    displayValue = String(result); //sonucu ekranda göstermek için stringe çevirdik.
    firstValue = result;
  }

  waitingForSecondValue = true; //2. değeri beklemek
  operator = nextoperator;

  console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }

  return second;
}
function inputNumber(num) {
  //dışarıdan num bilgisi alıcaz
  if (waitingForSecondValue) {
    //burdaki değer true ise 2. sayı bekleniyor demektir.
    displayValue = num;
    waitingForSecondValue = false; //false olarak güncellenir çünkü artık 2. sayı beklenmiyor
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num; //2 sayısını bastığımız zaman yanında başka rakamında gözükmesi için yazdık.
  }

  console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
  //input decimal çağırıldığı zaman sonun anokta eklmek için
  if (!displayValue.includes(".")) {
    //saddece birkere nokta kullanmak için
    displayValue += ".";
  }
}

function clear() {
  displayValue = "0";
}
