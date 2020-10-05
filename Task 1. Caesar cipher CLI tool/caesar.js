module.exports.caesarCipherConverter = caesarCipherConverter = (str, shift, mode) => {
  return str.split('').map((char) => {
    if((char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) || (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122)) {
      if(mode === 'encode') {
        let num = char.charCodeAt(0) + shift;
        if ((num > 90 && num < 97 ) || (num > 122 && num < 148)) {
          char = String.fromCharCode(num - 26);
        }
        else {
          char = String.fromCharCode(num);
        }
      }
      if (mode === 'decode') {
        let num = char.charCodeAt(0) - shift;
        if ((num > 39 && num < 65) || (num > 90 && num < 97)) {
          char = String.fromCharCode(num + 26);
        }
        else {
          char = String.fromCharCode(num);
        }
      }
    }
    return char;
  }).join('');
};
