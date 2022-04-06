console.log(math);
const { add, subtract, multiply, divide } = math;

// stack of inputs
let stack = [0];

const updateResult = () => {
  document.querySelector("#result").innerText = stack[0];
};

const clearResult = () => {
  stack = [0];
  updateResult();
};

const equalOut = () => {
  console.log("equalOut", stack);

  while (stack.length >= 3) {
    const x = stack.shift();
    const op = stack.shift();
    const y = stack.shift();
    stack.unshift(op(x, y));
  }

  updateResult();
};

const processOp = (op) => {
  let last = stack[stack.length - 1];
  if (typeof last !== "function") {
    stack.push(op);
  }
};

const handleDot = () => {
  let last = stack[stack.length - 1];

  if (typeof last === "function") {
    stack.push(0 + ".");
  } else {
    const dotIndex = last.toString().indexOf(".");
    if (dotIndex === -1) {
      stack[stack.length - 1] = last + ".";
    }
  }

  updateResult();
};

const processNumber = (rawInput) => {
  let last = stack[stack.length - 1];

  if (typeof last === "function") {
    stack.push(parseInt(rawInput));
  } else {
    rawInput = Number.parseFloat(last.toString() + rawInput);
    stack[stack.length - 1] = rawInput;
  }
};

const handleClick = (e) => {
  console.log(e);

  // save the rawinput for ref.
  const rawInput = e.target.innerText;
  console.log(rawInput);

  if (rawInput === "AC") {
    clearResult();
    return;
  }

  if (rawInput === "=") {
    equalOut();
    return;
  }

  if (rawInput === ".") {
    handleDot();
    return;
  }

  // is it an operator?
  const opMap = {
    "÷": divide,
    "×": multiply,
    "-": subtract,
    "+": add,
  };

  if (typeof opMap[rawInput] === "function") {
    processOp(opMap[rawInput]);
  } else {
    processNumber(rawInput);
  }

  updateResult();
  console.log(stack);
};

let buttons = document.querySelectorAll(".button");

for (let button of buttons) {
  button.addEventListener("click", handleClick);
}

clearResult();
