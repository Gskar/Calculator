const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equals]");
const clearAllBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const screen = document.querySelector("[data-current]");
const history = document.querySelector(".currentOperation");
const dot = document.querySelector("#dotBtn");

let firstNumber = "";
let secondNumber = "";
let currentOperation = null;

//Main Functions
add = (a, b) => {
  let calculation = a + b;
  return Math.round(calculation * 1000) / 1000;
};

subtract = (a, b) => {
  let calculation = a - b;
  return Math.round(calculation * 1000) / 1000;
};

multiply = (a, b) => {
  let calculation = a * b;
  return Math.round(calculation * 1000) / 1000;
};

divide = (a, b) => {
  if (b === 0) {
    alert(`You cant divide by 0`);
  } else {
    let calculation = a / b;
    return Math.round(calculation * 1000) / 1000;
  }
};

//History
historyText = () => {
  if (currentOperation === "add") {
    let calc = "+";
    history.textContent = `${firstNumber} ${calc} ${secondNumber}`;
  } else if (currentOperation === "subtract") {
    let calc = "-";
    history.textContent = `${firstNumber} ${calc} ${secondNumber}`;
  } else if (currentOperation === "multiply") {
    let calc = "×";
    history.textContent = `${firstNumber} ${calc} ${secondNumber}`;
  } else if (currentOperation === "divide") {
    let calc = "÷";
    history.textContent = `${firstNumber} ${calc} ${secondNumber}`;
  }
};

//Operate Function
operate = (operator, a, b) => {
  a = Number(a);
  b = Number(b);
  if (operator === "add") {
    return add(a, b);
  } else if (operator === "subtract") {
    return subtract(a, b);
  } else if (operator === "multiply") {
    return multiply(a, b);
  } else if (operator === "divide") {
    return divide(a, b);
  }
};

//dotDisable
dotDisable = (e) => {
  if (screen.textContent.includes(".")) {
    document.querySelector("#dotBtn").style.pointerEvents = "none";
    if (firstNumber.includes(".")) {
      dotEnable();
    }
  }
};

//dotEnable
dotEnable = (e) => {
  document.querySelector("#dotBtn").style.pointerEvents = "all";
};

//ClearAllFunction
clearAll = () => {
  screen.textContent = "";
  history.textContent = "";
  firstNumber = "";
  secondNumber = "";
  currentOperation = null;
  dot.disabled = false;
  enable(document.querySelector("#addBtn"));
  enable(document.querySelector("#subBtn"));
  enable(document.querySelector("#divBtn"));
  enable(document.querySelector("#multBtn"));
  dotEnable();
};

//DisableDoubleButtons
disable = (e) => {
  if (
    e.textContent.includes("+") ||
    e.textContent.includes("-") ||
    e.textContent.includes("×") ||
    e.textContent.includes("÷")
  ) {
    e.style.pointerEvents = "none";
  }
};

//EnableButtons
enable = (e) => {
  e.style.pointerEvents = "all";
};

//AppendNumbersFunction
appendNumber = (number) => {
  screen.textContent += number;
};

//DeleteOneNumber
deleteNumber = () => {
  screen.textContent = screen.textContent.toString().slice(0, -1);
};

//EVENT LISTENERS
numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
    dotDisable();
  });
});

operationBtn.forEach((button) => {
  button.addEventListener("click", () => {
    dotEnable();
    firstNumber = screen.textContent;
    appendNumber(button.textContent);

    if (button.textContent === "+") {
      currentOperation = "add";
      disable(document.querySelector("#addBtn"));
      disable(document.querySelector("#subBtn"));
      disable(document.querySelector("#divBtn"));
      disable(document.querySelector("#multBtn"));
    } else if (button.textContent === "-") {
      currentOperation = "subtract";
      disable(document.querySelector("#addBtn"));
      disable(document.querySelector("#subBtn"));
      disable(document.querySelector("#divBtn"));
      disable(document.querySelector("#multBtn"));
    } else if (button.textContent === "×") {
      currentOperation = "multiply";
      disable(document.querySelector("#addBtn"));
      disable(document.querySelector("#subBtn"));
      disable(document.querySelector("#divBtn"));
      disable(document.querySelector("#multBtn"));
    } else if (button.textContent === "÷") {
      currentOperation = "divide";
      disable(document.querySelector("#addBtn"));
      disable(document.querySelector("#subBtn"));
      disable(document.querySelector("#divBtn"));
      disable(document.querySelector("#multBtn"));
    }
  });
});

equalBtn.addEventListener("click", () => {
  dotEnable();
  enable(document.querySelector("#addBtn"));
  enable(document.querySelector("#subBtn"));
  enable(document.querySelector("#divBtn"));
  enable(document.querySelector("#multBtn"));
  if (screen.textContent.includes("+")) {
    let secondArray = screen.textContent.split("+");
    secondNumber = secondArray[1];
  } else if (screen.textContent.includes("-")) {
    let secondArray = screen.textContent.split("-");
    secondNumber = secondArray[1];
  } else if (screen.textContent.includes("×")) {
    let secondArray = screen.textContent.split("×");
    secondNumber = secondArray[1];
  } else if (screen.textContent.includes("÷")) {
    let secondArray = screen.textContent.split("÷");
    secondNumber = secondArray[1];
  }
  screen.textContent = operate(currentOperation, firstNumber, secondNumber);
  historyText();
});

clearAllBtn.addEventListener("click", clearAll);
deleteBtn.addEventListener("click", deleteNumber);
