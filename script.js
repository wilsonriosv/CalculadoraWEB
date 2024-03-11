// script.js
/* function calculate() {
    const expression = document.getElementById('expression').value;
    try {
        const result = eval(expression);
        document.getElementById('result').textContent = result;
    } catch (error) {
        document.getElementById('result').textContent = 'Error en la expresión' + error;
    }
} */

function calculate() {
    const expression = document.getElementById('expression').value;
    try {
        const tokens = tokenize(expression);
        const result = evaluate(tokens);
        document.getElementById('result').textContent = result;
    } catch (error) {
        document.getElementById('result').textContent = 'Error en la expresión';
    }
}

function tokenize(expression) {
    const tokens = [];
    let token = '';
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (/\d/.test(char)) { // Si el carácter es un dígito
            token += char;
        } else { // Si el carácter es un operador o paréntesis
            if (token) {
                tokens.push(token);
                token = '';
            }
            tokens.push(char);
        }
    }
    if (token) {
        tokens.push(token);
    }
    return tokens;
}

function evaluate(tokens) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    };

    const stack = [];
    for (let token of tokens) {
        if (/\d/.test(token)) {
            stack.push(Number(token));
        } else if (token in operators) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operators[token](a, b));
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            let temp = [];
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                temp.push(stack.pop());
            }
            stack.pop(); // Elimina el paréntesis de apertura
            const result = evaluate(temp);
            stack.push(result);
        }
    }
    return stack.pop();
}
