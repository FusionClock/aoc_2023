const fs = require('node:fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split("\n");

const value = lines.reduce((total, line) => {
    const [rawWinningNumbers, rawDrawnNumbers] = line.split(' | ');

    const winningNumbers = rawWinningNumbers.replace(/Card \d+:\s+/, '').split(/\s+/).map(Number);
    const drawnNumbers = rawDrawnNumbers.split(/\s+/).map(Number);

    const score = drawnNumbers
        .map(drawnNumber => winningNumbers.includes(drawnNumber))
        .reduce((points, isWinningNumber) => {
            if (!isWinningNumber) {
                return points;
            }

            if (points === 0) {
                return 1;
            }

            return points * 2;
        }, 0);

    return total + score;
}, 0);

console.log({ answer: value });
