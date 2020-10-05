const commander = require('commander');
const { pipeline } = require('stream');
const fs = require('fs');
const { Transform } = require('readable-stream');
const { caesarCipherConverter } = require('./caesar');

commander.storeOptionsAsProperties();

commander
  .option('-s, --shift <value>', 'output extra debugging')
  .option('-i, --input <filename>', 'small pizza size')
  .option('-o, --output <filename>', 'flavour of pizza')
  .option('-a, --action <encode|decode>', 'flavour of pizza');

commander.parse(process.argv);

if(typeof commander.action !== 'function') {
  if(!commander.shift) {
    console.error("Error: no shift");
    process.exit(1);
  }
  if(!commander.input) {
    process.stdin.on('readable', () => {
      let inputFileName = process.stdin.read().toString();
      inputFileName = inputFileName.substr(0, inputFileName.length-2);
      process.stdout.write(`Input filename: ${inputFileName.length}`);
      sendPipeline(inputFileName);
    });
  }
  else {
    sendPipeline(commander.input);
  }
  function sendPipeline(readFrom) {
    if(!fs.existsSync(readFrom)) {
      console.error("Error: file not found " + readFrom);
      process.exit(1);
    }
    pipeline(
      fs.createReadStream(readFrom, "utf8"),
      new Transform({
        transform(chunk, enc, callback) {
          this.push(
            caesarCipherConverter(chunk.toString('utf8'), parseInt(commander.shift), commander.action)
          );
          callback();
        }
      }),
      fs.createWriteStream(typeof commander.output !== 'undefined' ? commander.output : process.stdout, {
        'flags': 'a',
        'encoding': null,
        'mode': 0666
      }),
      (err) => {
        if(err) {
          console.error(err);
        }
        else {
          console.log("Good");
        }
      }
    );
  }
}
else {
  console.error("Error: no action");
  process.exit(1);
}
