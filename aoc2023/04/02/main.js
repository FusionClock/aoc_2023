const fs = require('node:fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split("\n");

const originalScratchcards = lines.map((line, index) => {
    const [rawWinningNumbers, rawDrawnNumbers] = line.split(' | ');

    const winningNumbers = rawWinningNumbers.replace(/Card \d+:\s+/, '').split(/\s+/).map(Number);
    const drawnNumbers = rawDrawnNumbers.split(/\s+/).map(Number);

    const score = drawnNumbers
        .filter(drawnNumber => winningNumbers.includes(drawnNumber))
        .length;

    return {
        score,
        index,
    };
});

const getScratchCards = (scratchcards, allScratchcards) => scratchcards.flatMap(({ score, index }) => allScratchcards.slice(index + 1, index + score + 1));

const getValue = (total, scratchcards, allScratchcards) => {
    const nextScratchcards = getScratchCards(scratchcards, allScratchcards);

    if (nextScratchcards.length) {
        return getValue(total + nextScratchcards.length, nextScratchcards, allScratchcards);
    }

    return total;
};

const value = getValue(originalScratchcards.length, originalScratchcards, originalScratchcards);

console.log({ answer: value });
