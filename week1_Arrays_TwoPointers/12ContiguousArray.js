/**
 * @param {number[]} nums
 * @return {number}
 */
// https://leetcode.com/problems/contiguous-array/
var findMaxLength = function (nums) {
    // Convert all 0s to -1s to transform the problem into
    // finding the longest subarray with a sum of 0.
    for (let index = 0; index < nums.length; index++) {
        if (nums[index] === 0) {
            nums[index] = -1;
        }
    }

    let result = 0;
    let sum = 0;
    const map = new Map();

    // 1. FIX: Initialize map with {0: -1}.
    // This handles cases where the subarray starts from index 0.
    // It means a sum of 0 is found at an index *before* the array begins.
    map.set(0, -1);

    for (let index = 0; index < nums.length; index++) {
        sum += nums[index];

        // 2. FIX: Check if the current 'sum' has been seen before.
        // If the same prefix sum occurs at two different indices, the subarray
        // between them must sum to 0.
        if (map.has(sum)) {
            // 3. FIX: Calculate the length as the difference between the current index
            // and the index where this sum was first seen.
            result = Math.max(result, index - map.get(sum));
        } else {
            // If this sum is new, store the index of its first occurrence.
            map.set(sum, index);
        }
    }

    return result;
};