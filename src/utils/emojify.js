const emojiMap = require('./emoijMap.json');

module.exports = (text) => {
  const foundEmojis = [];
  const words = text.split(' ');
  for (const word of words) {
    const convertedWord = word
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    for (const key of Object.keys(emojiMap)) {
      if (foundEmojis.includes(emojiMap[convertedWord])) continue;
      if (convertedWord.includes(key)) {
        foundEmojis.push(emojiMap[key]);
      }
    }
  }
  return foundEmojis.flat();
};
