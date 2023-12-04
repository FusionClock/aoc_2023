const fs = require('node:fs');

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.trim().split("\n");

const value = lines.reduce(function (total, line) {
    const [, sets] = line.split(': ')

    const initialBag = {
        red: 0,
        green: 0,
        blue: 0,
    };

    const cubes = sets
        .split('; ')
        .flatMap(set => set
            .split(', ')
            .map((cubes) => {
                const [count, color] = cubes.split(' ');

                return { count: Number(count), color: String(color) };
            }),
        );

    const minimumBag = cubes
        .reduce((bag, { count, color }) => ({
            ...bag,
            [color]: count > bag[color]
                ? count
                : bag[color],
        }), { ...initialBag });

    const power = Object
        .values(minimumBag)
        .reduce((total, count) => Math.max(1, total) * Math.max(1, count), 0);

    return total + power;
}, 0);

console.log({ answer: value });
