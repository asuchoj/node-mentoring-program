process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  let chank;

  while ((chank = process.stdin.read()) !== null ) {
    process.stdout.write([...chank].reverse().join(''));
  }
});
