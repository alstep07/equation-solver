import { EMOJIS, EMOJI_REG_EXP } from '../constants';

const validateInputValue = (value) => {
  const formattedValue = value.replace(EMOJI_REG_EXP, '0');
  const regExp = /^\-?[0-9]+(([-+/*][0-9]+)?([.,][0-9]+)?)*?=([0-9]+|\?)$/;
  return regExp.test(formattedValue);
};

export default (inputValues) => {
  const notValidInputsIndexes = [];

  inputValues.forEach((value, index) => {
    if (!validateInputValue(value)) {
      notValidInputsIndexes.push(index);
    }
  });

  return notValidInputsIndexes;
};
