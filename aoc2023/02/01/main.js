const fs = require('node:fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split("\n");

const value = lines.reduce(function (total, line) {
    const [game, sets] = line.split(': ')

    const id = Number(game.replace('Game ', ''));

    const initialBag = {
        red: 12,
        green: 13,
        blue: 14,
    };

    const pulls = sets
        .split('; ')
        .map(set => set
            .split(', ')
            .map((cubes) => {
                const [count, color] = cubes.split(' ');

                return { count: Number(count), color: String(color) };
            }),
        );

    const bagsAfterPulls = pulls
        .flatMap(pull => pull
            .reduce((bag, cubes) => ({
                ...bag,
                [cubes.color]: bag[cubes.color] - cubes.count
            }), { ...initialBag }),
        );

    const isPlayPossible = bagsAfterPulls.every(bag => Object.values(bag).every(cubes => cubes >= 0));

    return isPlayPossible
        ? total + id
        : total;
}, 0);

console.log({ answer: value });
