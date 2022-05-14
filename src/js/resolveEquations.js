import split from './utils/split';
import { EMOJIS, EMOJI_REG_EXP } from './constants';

export default (equations) => {
  const emojiValues = Object.fromEntries(
    EMOJIS.map((emoji) => [emoji, undefined])
  );
  let total;

  equations.forEach((equation) => {
    let [expression, result] = equation.split('=');

    const calculateExpression = (expression) => {
      console.log(expression);
      const expressionValues = expression.replace(/-/gi, '+-').split('+');
      return expressionValues.map((value) => {
        let minus = '';
        if (value.startsWith('-')) {
          minus = '-';
          value = value.slice(1);
        }
        if (emojiValues[value]) {
          value = emojiValues[value];
        }
        console.log(value);
        if (EMOJI_REG_EXP.test(value)) {
          return split(value)
            .map((char) => `${minus}${char}`)
            .join('+');
        }
        return `${minus}${value}`;
      });
    };

    const expressionValues = calculateExpression(expression);
    const unknownValues = expressionValues
      .map((value) => {
        if (emojiValues[value]) {
          value = emojiValues[value];
        }
        if (/^[0-9-]*$/.test(value) && result !== '?') {
          result = parseFloat(result);
          result -= parseFloat(value);
          return null;
        }
        return value;
      })
      .filter((value) => !!value)
      .join('+');

    const uniqueEmojis = new Set(unknownValues.match(EMOJI_REG_EXP));
    if (uniqueEmojis.size === 1) {
      let multiplier = 0;
      unknownValues.split('+').forEach((value) => {
        if (value.startsWith('-')) {
          multiplier--;
        } else {
          multiplier++;
        }
      });
      emojiValues[[...uniqueEmojis][0]] = result / multiplier;
    }

    if (result === '?') {
      total = calculateExpression(expression)[0];
    }
  });

  return { total, emojiValues };
};
