const gTTS = require('gtts');
const fs = require('fs');
const path = require('path');

module.exports = async (text, langCode) => {
  const files = fs
    .readdirSync(path.join(__dirname, '../output'))
    .filter((file) => file.endsWith('.mp3'));

  if (text.length > 150) {
    text = text.substring(0, 150);
  }
  let gtts = new gTTS(text, langCode);

  if (files.length == 0) {
    gtts.save(
      path.join(__dirname, '../output/audio.mp3'),
      (err, result) => {
        if (err) throw new Error(err);
      }
    );
    return 'audio';
  } else if (files.length < 5) {
    gtts.save(
      path.join(__dirname, `../output/audio${files.length + 1}.mp3`),
      (err, result) => {
        if (err) throw new Error(err);
      }
    );
    return `audio${files.length + 1}`;
  } else {
    for (let file of files) {
      fs.unlinkSync(path.join(__dirname, `../output/${file}`));
    }
    gtts.save(
      path.join(__dirname, '../output/audio.mp3'),
      (err, result) => {
        if (err) throw new Error(err);
      }
    );
    return 'audio';
  }
};
