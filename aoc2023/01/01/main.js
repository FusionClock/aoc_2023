const fs = require('node:fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split("\n");

const value = lines.reduce(function (total, line) {
    const preparedLine = line.replaceAll(/\D/g, '').split('');

    const [firstCharacter] = preparedLine;
    const [lastCharacter] = preparedLine.reverse();

    return total + Number(firstCharacter + lastCharacter);
}, 0);

console.log({ answer: value });
