const numberButtons = document.querySelectorAll("[data-numbers]");
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-reset]');
const operationButtons = document.querySelectorAll("[data-operator]");
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
        if(this.previusOperand !== ''){
            this.calculate();
        }

        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
}

}

const calculator = new Calculator(previosOperandTextElement, currentOperandTextElement);

for(const numberButton of numberButtons){
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    }); 
}

for (const operationButton of operationButtons){
    operationButton.addEventListener('click', () =>{
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
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
