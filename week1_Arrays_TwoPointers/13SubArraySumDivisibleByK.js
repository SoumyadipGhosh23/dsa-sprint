/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// https://leetcode.com/problems/subarray-sums-divisible-by-k/description/
var subarraysDivByK = function (nums, k) {
    // A map to store the frequency of remainders.
    const map = new Map();
    // Initialize with remainder 0 having a count of 1.
    // This handles subarrays that start from index 0.
    map.set(0, 1);

    let sum = 0;
    let result = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];

        // 1. Calculate the remainder.
        let rem = sum % k;

        // 2. Handle negative remainders.
        if (rem < 0) {
            rem += k;
        }

        // If this remainder has been seen before, it means there are
        // `map.get(rem)` subarrays ending at the previous index
        // that form a valid subarray with the current element.
        if (map.has(rem)) {
            result += map.get(rem);
        }

        // 3. Increment the count for the current remainder using the correct logic.
        map.set(rem, (map.get(rem) || 0) + 1);
    }

    return result;
};

const nums = [4, 5, 0, -2, -3, 1];
const k = 5;
console.log(subarraysDivByK(nums, k)); // Output: 7