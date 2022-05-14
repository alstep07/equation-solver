import { MAX_EXPRESSIONS_COUNT, ERROR_DELAY_MS } from './constants';
import getNotValidInputIndexes from './utils/getNotValidInputIndexes';
import resolveEquations from './resolveEquations';
import safeBackspace from './utils/safeBackspace';

const controls = document.getElementById('controls');
const form = document.getElementById('calculator-form');
const newExpressionButton = document.getElementById('new-expression');
const errorMessage = document.getElementById('error-message');
let currentInput = document.getElementById('initial-input');
const resultContainer = document.getElementById('result-container');

const addNewInput = () => {
  const newInput = document.createElement('input');
  newInput.setAttribute('readonly', true);
  newInput.classList.add('input');
  form.append(newInput);
  currentInput = newInput;
};

const resetForm = () => {
  form.innerHTML = '';
  newExpressionButton.removeAttribute('disabled');
  addNewInput();
};

newExpressionButton.addEventListener('click', ({ target }) => {
  addNewInput();

  if (form.childElementCount === MAX_EXPRESSIONS_COUNT) {
    target.setAttribute('disabled', true);
  }
});

const setFieldErrors = (indexes) => {
  Array.from(form.children).forEach((input, index) => {
    if (indexes.includes(index)) {
      input.classList.add('error');
      setTimeout(() => {
        input.classList.remove('error');
      }, ERROR_DELAY_MS);
    } else {
      input.classList.remove('error');
    }
  });
};

const showErrorMessage = () => {
  errorMessage.innerHTML = 'Please enter valid expressions!';
  setTimeout(() => {
    errorMessage.innerHTML = '';
  }, ERROR_DELAY_MS);
};

controls.addEventListener('click', ({ target }) => {
  if (target.id === 'backspace') {
    currentInput.value = safeBackspace(currentInput.value);
  }

  if (!target.classList.contains('calculator-button')) return;

  currentInput.value += target.innerHTML;
});

form.addEventListener('click', ({ target }) => {
  if (!target.classList.contains('input')) return;

  currentInput = target;
});

form.addEventListener('reset', (e) => {
  e.preventDefault();
  resetForm();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValues = Array.from(e.target.children).map(({ value }) => value);
  const notValidInputIndexes = getNotValidInputIndexes(inputValues);
  setFieldErrors(notValidInputIndexes);

  if (notValidInputIndexes.length > 0) {
    showErrorMessage();
    return;
  }
  errorMessage.innerHTML = '';
  const result = resolveEquations(inputValues);
  const { total, emojiValues } = result;
  const formattedValues = Object.entries(emojiValues).map(([emoji, value]) => {
    const formattedValue = typeof value === 'number' ? value :'?';
    return `${emoji} = ${formattedValue}`;
  });
  resultContainer.innerHTML = `Result: ${total}`;
  formattedValues.forEach(value => {
    const resultItem = document.createElement('p');
    resultItem.innerHTML = value;
    resultContainer.append(resultItem);
  })
});
