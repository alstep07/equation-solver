import split from './split';

export default (string) => {
  const arr = split(string);

  return arr.slice(0, -1).join('');
};
