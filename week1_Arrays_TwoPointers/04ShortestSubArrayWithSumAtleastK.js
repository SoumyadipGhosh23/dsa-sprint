// https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/
var shortestSubarray = function (nums, k) {
    /*
     * Why don't traditional approaches work here?
     *
     * 1. Standard Two-Pointer / Sliding Window:
     * - This approach works well for problems like "find the shortest subarray with sum at least K" ONLY IF all numbers in the array are non-negative.
     * - When numbers are positive, expanding the window (moving the right pointer) always increases the sum, and shrinking it (moving the left pointer) always decreases the sum. This predictable behavior is what makes the sliding window efficient.
     * - However, this problem allows for NEGATIVE numbers. If we have negative numbers, the sum can decrease when we expand the window or increase when we shrink it. This breaks the logic of the sliding window, and we can no longer be sure we've found the optimal subarray.
     *
     * 2. HashMap for "Sum Equals K":
     * - For finding a subarray with a sum *exactly* equal to k, a hashmap is perfect. We store prefix sums and for each new `prefixSum[i]`, we check if `prefixSum[i] - k` exists in the map.
     * - Here, we need a sum *at least* k. This means for a `prefixSum[i]`, we need to find a previous `prefixSum[j]` such that `prefixSum[i] - prefixSum[j] >= k`.
     * - This rearranges to `prefixSum[j] <= prefixSum[i] - k`. A hashmap is not efficient for searching for a *range* of values (all sums less than or equal to a target).
     * - More importantly, we need the *shortest* subarray, which means we need the `j` that is closest to `i`. A hashmap doesn't maintain the order or relative values needed to find this optimal `j` efficiently.
     *
     * This is why we use a monotonic deque with prefix sums. It's specifically designed to solve this "range and optimality" problem in linear time.
    */
    const n = nums.length;
    // Create a prefix sum array.
    // We make it n+1 size to easily handle subarrays starting from index 0.
    // prefixSums[i] will store the sum of the first i elements of nums.
    const prefixSums = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixSums[i + 1] = prefixSums[i] + nums[i];
    }

    let result = n + 1; // Initialize result to a value larger than any possible answer.
    const deque = []; // This will store indices of the prefixSums array.

    // Iterate through all prefix sums.
    for (let i = 0; i <= n; i++) {
        // The current prefix sum is P[i]. We are looking for a previous index j
        // such that P[i] - P[j] >= k, and we want to make (i - j) as small as possible.

        // Check for valid subarrays.
        // While the deque is not empty AND the difference between the current prefix sum
        // and the prefix sum at the front of the deque is at least k...
        while (deque.length > 0 && prefixSums[i] - prefixSums[deque[0]] >= k) {
            // We found a valid subarray! Its length is i - deque[0].
            // We update our result with the minimum length found so far.
            result = Math.min(result, i - deque[0]);

            // We remove the front element because we want the SHORTEST subarray.
            // Any future subarray starting at this same index will be longer.
            deque.shift();
        }

        // Maintain a monotonic (increasing) queue.
        // This is the key trick!
        // If the current prefix sum is smaller than or equal to the one at the end of our deque,
        // it means the one at the end is no longer useful.
        while (deque.length > 0 && prefixSums[i] <= prefixSums[deque[deque.length - 1]]) {
            // Why remove it? Because the new prefix sum P[i] is smaller and occurs later.
            // This makes it a better candidate for starting a future subarray.
            deque.pop();
        }

        // Add the current index to our deque.
        deque.push(i);
    }

    // If result was never updated, it means no valid subarray was found.
    return result <= n ? result : -1;
};


// const num = [48, 99, 37, 4, -31]
// const k = 140
const num = [2, 5, -1, 7, 3]
const k = 6
console.log(shortestSubarray(num, k))
