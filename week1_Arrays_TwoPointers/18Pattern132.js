// https://leetcode.com/problems/132-pattern/
var find132pattern = function (nums) {
    if (nums.length < 3) {
        return false;
    }

    const stack = []; // Stores potential '3's
    let s2 = -Infinity; // Stores the best candidate for '2'

    // Iterate from right to left
    // nums[i] will be our candidate for '1'
    for (let i = nums.length - 1; i >= 0; i--) {
        // If we find a number smaller than s2, we have found a 132 pattern.
        // nums[i] is the '1', s2 is the '2', and a number popped from the stack was the '3'.
        if (nums[i] < s2) {
            return true;
        }

        // Maintain the stack to find the best s2
        // While the top of the stack is smaller than the current number,
        // it's a better candidate for s2 than what we have.
        // The current number nums[i] is a candidate for '3'.
        while (stack.length > 0 && nums[i] > stack[stack.length - 1]) {
            s2 = stack.pop();
        }

        // Push the current number onto the stack. It's a potential '3' for elements to its left.
        stack.push(nums[i]);
    }

    // If we finish the loop, no pattern was found.
    return false;
};