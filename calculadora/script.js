const numberButtons = document.querySelectorAll("[data-numbers]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-reset]');
const previosOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

class Calculator{
    constructor(previosOperandTextElement,currentOperandTextElement){
        this.previosOperandTextElement = previosOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    };

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    updateDisplay(){
        this.previosOperandTextElement.innerText = `${this.previousOperand} ${this.operation || ''}`;
        this.currentOperandTextElement.innerText = this.currentOperand;
    }

    appendNumber(number){
        if(this.currentOperand.includes('.') && number === '.') return;
        //linha responsavel por n poder colocar mais de um ponto
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    calculate(){
        let result;

        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand) ;

        if(isNaN(_previousOperand)||isNaN(_currentOperand)) return;

        switch(this.operation){
            case '+':
                result = _previousOperand + _currentOperand;
                break;
            case '-':
                result = _previousOperand - _currentOperand;
                break;
            case '/':
                result = _previousOperand / _currentOperand;
                break;
            case '*':
                result = _previousOperand * _currentOperand;
                break;    
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        // verificacao para que nao consiga colocar operador sem ter um numero especifico 
        if(this.previusOperand !== ''){
            this.calculate();
        }
        /*o que esse if checa, caso tenha algum numero ja colocado no previusOperand, calcule com
         o novo.*/
        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    //metodo responsavel por colocar o numero em cima

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // essa funcao de formatar o numero para colocar uma virgula depois que passa de tantos caracteres
    //  disse o cara que é confusa mesmo, entao nao se faz necessario eu aprende-la totalmente
    formatDisplayNumber(number){

    }

}

const calculator = new Calculator(previosOperandTextElement, currentOperandTextElement);

for(const numberButton of numberButtons){
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    }); 
    // funcao responsavel por colocar os numeros na tela apos o click
}

for (const operationButton of operationButtons){
    operationButton.addEventListener('click', () =>{
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
    // loop resonsavel para que atualize os dados do metodo toda vez que acontecer o click nos 
    // operadores
}

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () =>{
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})