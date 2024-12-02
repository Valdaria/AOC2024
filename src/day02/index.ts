import run from "aocrunner";

type InputLists =  Array<number[]>;

const parseInput = (rawInput: string) => {

  const inputLists: InputLists = [];

  rawInput.split("\n").forEach((line) => {
    inputLists.push(line.split(" ").map((char) => parseInt(char)));
  });
  return inputLists;
}

function numberBetween(number: number, min: number, max: number) {
  return number >= min && number <= max;
}

function isSafeP1(list: number[]) {
  let isSafe = true;
  let lastDirection = 0;

  for(let i = 0; i<list.length -1; i++){
    const a = list[i];
    const b = list[i+1];
    const diff = a-b
    if(lastDirection !== 0 && lastDirection !== Math.sign(diff)){
      console.log(`[${list}] = isUnsafe`);
      console.log(`${a} - ${b} = ${diff}`);
      return false;
    }
    if(!numberBetween(Math.abs(diff), 1, 3)) {
      console.log(`[${list}] = isUnsafe`);
      console.log(`${a} - ${b} = ${Math.abs(diff)}`);
      return false;
    }
    lastDirection = Math.sign(diff);
  }

  return isSafe;
}

function isSafeP2(list: number[]) {
  let isSafe = true;
  let lastDirection = 0;
  let isDampenerUsed = false;

  let i = 0;

  while(i<list.length -1){
    const a = list[i];
    const b = list[i+1];
    const diff = a-b
    let falseNow = false;
    if(lastDirection !== 0 && lastDirection !== Math.sign(diff)){
      if(isDampenerUsed) {

        console.log(`[${list}] = isUnsafe => direction`);
        console.log(`abs(${a} - ${b}) = ${Math.sign(diff)} != ${lastDirection}`);
        return false
      }
      isDampenerUsed = true;
      falseNow = true;
    }
    if(!numberBetween(Math.abs(diff), 1, 3)) {
      if(isDampenerUsed) {
        console.log(`[${list}] = isUnsafe => not between 1 2 3`);
        console.log(`${a} - ${b} = ${Math.abs(diff)}`);
        return false
      }
      isDampenerUsed = true;
      falseNow = true;
    }
    if(!falseNow){
      lastDirection = Math.sign(diff);
      i++
    } else {

      i++;
    }
  }

  return isSafe;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.filter((i => {
    return isSafeP1(i);
  })).length;

};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.filter((i => {
    return isSafeP2(i);
  })).length;
};

run({
  part1: {
    tests: [
       {
         input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
         expected: 2,
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
