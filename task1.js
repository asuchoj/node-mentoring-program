const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input, output) => {
  const reverseData = [...input].reverse().join('');
  console.log(reverseData);
});
