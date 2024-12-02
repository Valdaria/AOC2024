import run from "aocrunner";

type DoubleList = {
  ListA: number[];
  ListB: number[];
}

const parseInput = (rawInput: string) => {
  const result: DoubleList = {ListA: [], ListB: []};
  rawInput.split("\n").forEach(line => {
    const split = line.split("   ")
    result.ListA.push(parseInt(split[0]));
    result.ListB.push(parseInt(split[1]));
  });
  result.ListA.sort((a, b) => a - b);
  result.ListB.sort((a, b) => a - b);
  return result;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let difference = 0;

  input.ListA.forEach((a, index) => {
      difference += (Math.abs(a - input.ListB[index]));
  })

  return difference;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let similarity = 0;
  input.ListA.forEach((a) => {
    similarity += a * input.ListB.filter((b) => a===b).length;
  })

  return similarity;
};

run({
  part1: {
    tests: [
       {
         input: `3   4
4   3
2   5
1   3
3   9
3   3`,
         expected: 11,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
       {
         input: `3   4
4   3
2   5
1   3
3   9
3   3`,
         expected: 31,
       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
