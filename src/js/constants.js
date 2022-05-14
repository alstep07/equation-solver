const MAX_EXPRESSIONS_COUNT = 6;
const ERROR_DELAY_MS = 3000;
const EMOJIS = ['🐴', '🐯', '🦁', '🦝', '🐗'];
const EMOJI_REG_EXP =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;

export { MAX_EXPRESSIONS_COUNT, ERROR_DELAY_MS, EMOJIS, EMOJI_REG_EXP };
