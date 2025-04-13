let currentInput = '';
let previousInput = '';
let operator = null;

function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}

function calculateResult() {
    if (previousInput === '' || currentInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay(currentInput);
    addHistory();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    document.getElementById('display').value = value;
}

function addHistory() {
    const historyList = document.getElementById('historyList');
    const listItem = document.createElement('li');
    listItem.textContent = `${previousInput} ${operator} ${currentInput} = ${document.getElementById('display').value}`;
    historyList.appendChild(listItem);
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '+') {
        appendOperator('+');
    } else if (event.key === '-') {
        appendOperator('-');
    } else if (event.key === '*') {
        appendOperator('*');
    } else if (event.key === '/') {
        appendOperator('/');
    } else if (event.key === 'Enter') {
        calculateResult();
    } else if (event.key === 'Backspace') {
        clearDisplay();
    }
});
