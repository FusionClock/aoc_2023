const fs = require('node:fs');

const input = fs.readFileSync('input.txt', 'utf8');

const [rawSeeds, ...rawMaps] = input.trim().split("\n\n");

const seeds = rawSeeds.replace('seeds: ', '').split(' ').map(Number);

const maps = rawMaps.map(map => map.split("\n").slice(1).map(line => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = line.split(' ').map(Number);

    const adjustedRangedLength = rangeLength - 1;

    return {
        sourceRangeStart,
        sourceRangeEnd: sourceRangeStart + adjustedRangedLength,
        destinationRangeStart,
        destinationRangeEnd: destinationRangeStart + adjustedRangedLength,
        rangeLength: adjustedRangedLength,
    };
}));


const locations = seeds.map(seed => maps
    .reduce((value, ranges) => {
        const range = ranges.find(({ sourceRangeStart, sourceRangeEnd }) => value >= sourceRangeStart && value <= sourceRangeEnd);

        if (range) {
            const { destinationRangeStart, sourceRangeStart} = range;

            return destinationRangeStart + (value - sourceRangeStart);
        }

        return value;
    }, seed));

const answer = Math.min(...locations);

console.log({ answer: answer });
