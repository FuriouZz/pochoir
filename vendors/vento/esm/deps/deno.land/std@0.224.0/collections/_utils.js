// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/**
 * Filters the given array, removing all elements that do not match the given predicate
 * **in place. This means `array` will be modified!**.
 */
export function filterInPlace(array, predicate) {
    let outputIndex = 0;
    for (const cur of array) {
        if (!predicate(cur)) {
            continue;
        }
        array[outputIndex] = cur;
        outputIndex += 1;
    }
    array.splice(outputIndex);
    return array;
}
/**
 * Produces a random number between the inclusive `lower` and `upper` bounds.
 */
export function randomInteger(lower, upper) {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
}
