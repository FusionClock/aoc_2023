const fs = require('node:fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split("\n");

const replace = (line, { key, value, index }) => `${line.substring(0, index)}${value}${line.substring(index + key.length)}`;

const doReplace = (line, replacement) => (replacement ? replace(line, replacement) : line)
    .replaceAll(/\D/g, '')
    .split('');

const value = lines.reduce(function (total, line) {
    const digits = [
        { key: 'one', value: 1 },
        { key: 'two', value: 2 },
        { key: 'three', value: 3 },
        { key: 'four', value: 4 },
        { key: 'five', value: 5 },
        { key: 'six', value: 6 },
        { key: 'seven', value: 7 },
        { key: 'eight', value: 8 },
        { key: 'nine', value: 9 },
    ];

    const replacements = digits
        .reduce((accumulator, { key, value }) => [
            ...accumulator,
            ...Array.from(line.matchAll(new RegExp(key, 'g')), ({ index }) => ({ key, value, index })),
        ], [])
        .filter(({ index }) => index > -1)
        .sort((a, b) => a.index - b.index);

    const [firstReplacement] = replacements;
    const [lastReplacement] = replacements.reverse();

    const firstPreparedLine = doReplace(line, firstReplacement);
    const lastPreparedLine = doReplace(line, lastReplacement);

    const [firstCharacter] = firstPreparedLine;
    const [lastCharacter] = lastPreparedLine.reverse();

    return total + Number(firstCharacter + lastCharacter);
}, 0);

console.log({ answer: value });
