let operandA = undefined;
let operandB = undefined;
let operator = undefined;
let setOperandA = true;
let displayValue = 0;


function operate(a, b, operator) {
    if (b === 0 && operator === '÷') {
        return '>_> NaN'
    }
    let result = 0;
    switch(operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case 'x':
            result = a * b;
            break;
        case '÷':
            result = a / b;
            break;
        default:
    }
    return Number(result.toFixed(4));
}

let screen = document.querySelector('#screen');
screen.innerText = displayValue;


let equalButton = document.querySelector('#equal');
equalButton.addEventListener('click', function() {
    if (operandA == undefined || operator === undefined || operandB === undefined) {
        return;
    }
    // Display the final result
    let result = operate(operandA, operandB, operator);
    displayValue = result;
    screen.innerText = String(displayValue);
    // Reset the state
    operandA = result; 
    operator = undefined;
    operandB = undefined;
    setOperandA = true;
})

let numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    // Add click event listener to each button
    button.addEventListener('click', function() {
        let value = Number(button.innerText);
        if (operator === undefined) {
            if (operandA === undefined || setOperandA) {
                operandA = value;
                setOperandA = false;
            } else {
                operandA = (operandA * 10) + value;
            }
            displayValue = operandA;
            screen.innerText = displayValue;
        } else {
            // We are populating operand B
            if (operandB === undefined) {
                operandB = value;
            } else {
                operandB = (operandB * 10) + value;
            }
            displayValue = operandB;
            screen.innerText = displayValue;
        }
    });
});

let operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    // Add click event listener to each button
    button.addEventListener('click', function() {
        if (operandA === undefined) {
            return;
        }
        if (operator === undefined) {
            operator = button.innerText;
            return;    
        }
        if (operandB !== undefined) {
            // Evaluate
            let result = operate(operandA, operandB, operator);
            operandA = result;
            screen.innerText = result;
            operator = button.innerText;
            operandB = undefined;
        } else {
            console.log('Input Operand B before selecting another operator!')
        }
    });
});

let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function() {
    operandA = undefined;
    operandB = undefined;
    operator = undefined;
    setOperandA = true;
    displayValue = 0;
    screen.innerText = 0;
})


let signButton = document.querySelector('#sign');
signButton.addEventListener('click', function() {
    if (operandA === undefined) {
        return;
    }
    if (operator === undefined) {
        // Apply Sign to Operand A
        operandA *= -1;
        displayValue = operandA;
        screen.innerText = displayValue;
        return;
    }
    if (operandB === undefined) {
        return;
    }
    // Apply Sign to Operand B
    operandB *= -1;
    displayValue = operandB;
    screen.innerText = displayValue;
})

// Finish later
let deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', function() {
    if (operandA === undefined) {
        return;
    }
    if (operator === undefined) {
        // Truncate OperandA
        screen.innerText = screen.innerText.slice(0, -1);
        operandA = Number(screen.innerText)
        displayValue = operandA;
        return;
    }
    if (operandB === undefined) {
        return;
    }
    // Truncate OperandB
    screen.innerText = screen.innerText.slice(0, -1);
    operandB = Number(screen.innerText)
    displayValue = operandB;
})
