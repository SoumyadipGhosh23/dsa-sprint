/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
    let left = 0, right = 0;
    // Using k directly to track remaining flips is common and clearer.
    let zeroCount = 0;
    let maxLen = 0;

    while (right < nums.length) {
        // 1. EXPAND: Always consider the new element at 'right'.
        // If it's a zero, increment our count of zeros in the window.
        if (nums[right] === 0) {
            zeroCount++;
        }

        // 2. SHRINK: If the number of zeros is now more than k,
        // shrink the window from the left until it's valid again.
        while (zeroCount > k) {
            // If the element we are removing ('left') was a zero,
            // decrement the window's zero count.
            if (nums[left] === 0) {
                zeroCount--;
            }
            // Always shrink by moving the left pointer.
            left++;
        }

        // 3. UPDATE RESULT: The current window [left, right] is valid.
        // Check if it's the longest we've seen so far.
        maxLen = Math.max(maxLen, right - left + 1);

        // 4. ADVANCE: Move to the next element.
        right++;
    }

    return maxLen;
};