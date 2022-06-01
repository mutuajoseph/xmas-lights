/*
 * Implementations of the different pattern functions used in the app
 *
 * A pattern function has only one task: Decide if the light in the specified
 * position is ON or OFF, creating a pattern.
 *
 * It receives the following parameters and returns another function:
 * - total: The total number of lights displayed
 * - rowSize: The number of lights in each row
 *
 * The function returned receives the following parameters and returns a
 * boolean value:
 * - i: A 0 based index of the current light (0 => first light, 1 => second)
 * - step: A number that auto increments over time, acts as some sort of
 * indicator that tells the function which is the current frame.
 * Another way to explain the above function is:
 * "Tell me if the light in the position X and in the frame Y is ON or OFF"
 * Where X is the "i" param and Y is the "step"
 */

import {PatternFunction} from './types';

/**
 * Lights one column at a time from left to right
 */
const oneColumnAtaTime: PatternFunction = (total, rowSize) => (i, step) => {
  return i % rowSize === step % rowSize;
};

/**
 * Lightens all bulbs, one at a time, then starts over
 */
const lightAllOneAtaTime: PatternFunction = total => (i, step) => {
  return i - 1 <= (step % total) - 1;
};

/**
 * Making complex animations with a function alone would be really hard,
 * so the following function enables the creation of pattern functions that
 * follow a pre-made step-by-step pattern in the form of a matrix.
 *
 * There are two types of patterns:
 * - A "row step" pattern, which indicates what lights are ON (1) or OFF (0) in
 * an entire row.
 * - A "starting step by row" pattern, which indicates from which step pattern
 * the a given row will start at.
 *
 * While the animation is running, each row will cycle through all the row
 * patterns defined in the row step pattern.
 *
 * As an example consider the following row step pattern:
 * [
 *  [1, 1, 1, 1, 1, 1, 1],
 *  [0, 0, 0, 0, 0, 0, 0]
 * ]
 * by using this in an animation, in the first step or "frame", all the lights
 * in the row will be ON, then in the next step, all the lights will be OFF,
 * then all ON, OFF, ON, OFF and so on.
 *
 * But this isn't enough to make a nice animation as all rows would have the
 * same lights ON and OFF.
 *
 * This is where a "starting step by row" is used. Given the following one:
 * [
 *   [0],                  // For 1 row
 *   [0, 0],               // For 2 rows
 *   [0, 1, 0],            // For 3 rows
 *   [0, 1, 1, 0],         // For 4 rows
 *   [0, 1, 1, 1, 0],      // For 5 rows
 *   [0, 1, 1, 1, 1, 0],   // For 6 rows
 *   [0, 1, 1, 0, 1, 1, 0] // For 7 rows
 * ]
 * Each inner array defines at which index of the "row step" pattern the row
 * will start at. When displaying 3 rows, the first and third rows will start
 * at the first step (0) of the "row step" pattern, while the second row starts
 *  at the second step (1). Creating a way to a lot of possibilities.
 */
const patternCreator = (
  startingStepByRowPattern: number[][],
  rowStepPattern: number[][]
): PatternFunction => (total, rowSize) => (i, step) => {
  const totalRows = total / rowSize;
  const currentRow = Math.floor(i / rowSize);
  const patternStep = startingStepByRowPattern[totalRows - 1][currentRow];
  return (
    rowStepPattern[(step + patternStep) % rowStepPattern.length][
      i % rowSize
    ] === 1
  );
};

// Starting step by row patterns
const centerSSPattern = [
  [0],
  [0, 0],
  [0, 1, 0],
  [0, 1, 1, 0],
  [0, 1, 2, 1, 0],
  [0, 1, 2, 2, 1, 0],
  [0, 1, 2, 3, 2, 1, 0]
];

const topToBottomSSPattern = [
  [0],
  [0, 1],
  [0, 1, 2],
  [0, 1, 2, 3],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5, 6]
];

const equalSSPattern = [
  [0],
  [0, 0],
  [0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

// Row step patterns
const dividingAtMiddleHPattern = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1]
];

const dividingAtMiddleVPattern = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0]
];

const arrowToRightPattern = [
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 1]
];

const theMatrixPattern = [
  [1, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 1],
  [0, 1, 0, 0, 0, 0, 1],
  [0, 1, 0, 1, 0, 0, 1],
  [0, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1],
  [0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 1]
];

const expansionPattern1 = [
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1]
];

const expansionPattern2 = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1]
];

const patterns = [
  oneColumnAtaTime,
  lightAllOneAtaTime,
  patternCreator(centerSSPattern, dividingAtMiddleHPattern),
  patternCreator(equalSSPattern, dividingAtMiddleVPattern),
  patternCreator(centerSSPattern, arrowToRightPattern),
  patternCreator(topToBottomSSPattern, theMatrixPattern),
  patternCreator(centerSSPattern, expansionPattern1),
  patternCreator(centerSSPattern, expansionPattern2)
];

export default patterns;
