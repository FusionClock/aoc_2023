const fs = require('node:fs');

const input = fs.readFileSync('input.txt', 'utf8');

const [rawSeeds, ...rawMaps] = input.trim().split("\n\n");

const seeds = rawSeeds
    .replace('seeds: ', '')
    .split(' ')
    .map(Number)
    .reduce((pairs, value, index, all) => index % 2 === 0? [...pairs, all.slice(index, index + 2)] : pairs, [])
    .map(([rangeStart, rangeLength]) => ({ rangeStart, rangeEnd: rangeStart + rangeLength }))
    .map(({ rangeStart, rangeEnd }) => function*() {
        while (rangeStart <= rangeEnd) {
            yield rangeStart;

            rangeStart++;
        }
    });

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

const promises = seeds.map(generator => new Promise(resolve => {
    let smallestRangeLocation = null;

    for (const seed of generator()) {
        const location = maps.reduce((value, ranges) => {
            const range = ranges.find(({ sourceRangeStart, sourceRangeEnd }) => value >= sourceRangeStart && value <= sourceRangeEnd);

            if (range) {
                const { destinationRangeStart, sourceRangeStart} = range;

                return destinationRangeStart + (value - sourceRangeStart);
            }

            return value;
        }, seed);

        smallestRangeLocation = smallestRangeLocation === null || location < smallestRangeLocation
            ? location
            : smallestRangeLocation;
    }

    return resolve(smallestRangeLocation);
}));

Promise.all(promises).then(locations => {
    const answer = Math.min(...locations);

    console.log({ answer: answer });
});
