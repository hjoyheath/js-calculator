/**
 * Calculator.Prototype
 */
const Calculator  = {
  
  //  [TODO] method to handle each operation
  // can injest the value or read from this.stack
  add: () => {},
  subtract: () => {},
  multiply: () => {},
  divide: () => {},
  equal: () => {},
  decimal: () => {},

  // map input op values to function to call with
  ops: {
    "+": this.add,
    "-": this.subtract,
    "*": this.multiply,
    "/": this.divide,
    "=": this.equal,
    ".": this.decimal,
    // "%": 'percent'
  },

  // the current total displayed on the results panel
  result:null,

  // 
  stack: [],

  // init/reset the state and return the object
  init: () => {
    this.result = null;
    this.stack = [0];
    return this;
  },

  // this.op.contains(rawInput) ?? this.op.filter();
  // [TODO] Write the asOperation function here
  // 1. This function will check if the input, x, is a valid op.
  // 2. If valid, the operation is returned as the Function to call.
  // 3. Why did we do the above two steps and not just use eval? WHY (NO EVAL. NOT EVEN ONCE)
  // 3...HINT: Let me know when you need a hint :)
  // 4. Ensure `asOperation` function you wrote has:
  //   a) a proper  jsdoc comment with a minimum of @param and @return
  //   b) @see <https://jsdoc.app/> for help with that
  // 5. @return the instance of Function or (bool) FALSE
  asOperation: (x) => {

  },

  /* 
  * @name op.contains(rawInput)
  * Check if input value is an int
  * If int, return it, otherwise return FALSE
  */
  asInteger: (x) => {
    const intX = parseInt(x);
    return intX === x ? intX : false;
  },

  /**
   * @param e {Event} PointerEvent object
   * @returm {void} a whole lotta nada
   */
  handleButtonClick: (e) => {
    
    // [TODO] all the magic here !!!

    // 1. Parse the input value e 
    // @see parseInt

    // save the rawInput, maybe we'll need it
    const  rawInput = e.target.innerText;

    /* 
    * If CLEAR button,
    * reset the calculator's state
    * AND then exit.
    * */ 
    if(rawInput === 'C') {
      this = this.init();
      return;
    }

    // [TODO] pass the value through the click handler
    // instead of parsing innerHTML content here
    // ... only then, add the parsed input to the stack
    const stackCount = this.stack.push(rawInput);

    /*
    * Check if we got a number, and...
    * IFF we got a number,
    * ... process that number.
    */
    const intVal = this.asInteger(rawInput);

    if(intval) {
      this.processNumber(intVal);
    }
    else {
      /*
      * Check if we got a operation, and...
      * IFF we got a Function,
      * ...run it.
      */
      const opFunc = this.asOp();
      // [TODO] run the operation, whatever it is
      if(opFunc instanceof Function) {
        opFunc();
      }
    };

    // ...otherwise move along

    // [TODO] Percent logic is easy now. Just folow the pattern

    // 2. Evaulate the current state,
    // and determine if more action is necessary.
    // HOW TO DO KNOW IF WE STILL HAVE WORK TO DO THIS GO ROUND?
    // @see this.stack an Array.prototype.length

    // [TODO]  [TODO]  [TODO] POSSIBLE EDGE CASES
    // How can you use the `-` op as a sign change?
    // A sequence of click events culd look like: ['2','+','9','-','=']

    // UX, do as many as you want, but you MUST do (A)
    // A) Hover, click, and error indications on actions
    // B) Flash the result display when it is updated.
    // C) Sound to indicate you can't do that thing you're doing.

    // always check if we should equal out before returning,
    // [TODO] write this function
    this.equalOut();

  }
};

const calculator = Calculator.init();

// addEventListener per button
// or add them to the HTML as `onclick=...`


const result = document.querySelector(".result");
console.log("show display", result);

const minus = document.getElementById("minus");
console.log("show minus", minus);
const plus = document.getElementById("plus");
console.log("show plus", plus);
const divide = document.getElementById("divide");
console.log("show divide", divide);
const multiply = document.getElementById("multiply");
console.log("show multiply", multiply);
const equals = document.getElementById("equals");
console.log("show equals", equals);
const clear = document.getElementById("clear");
console.log("show clear", clear);
const decimal = document.getElementById("decimal");
console.log("show decimal", decimal);

let buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    console.log(event, event.target.innerText);

    if (event.target.id !== "result") {
      result.innerText += event.target.id;
      console.log("event object", event.target.id);
    }

    if (event.target.id === "clear") {
      result.innerText = "";
      console.log("event object", event.target.id);
    }

    if (event.target.id === "result") {
      let result = result(result.innerText);
      result.innerText = result;
    }
  });
}
