// script.js
function calculate() {
    const expression = document.getElementById('expression').value;
    try {
        const result = eval(expression);
        document.getElementById('result').textContent = result;
    } catch (error) {
        document.getElementById('result').textContent = 'Error en la expresión';
    }
}