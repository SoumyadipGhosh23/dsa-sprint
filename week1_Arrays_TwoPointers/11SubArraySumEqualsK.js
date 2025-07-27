/**
 * A correct sliding window implementation for NON-NEGATIVE numbers.
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// https://leetcode.com/problems/subarray-sum-equals-k/

var subarraySum_correct_sliding_window = function (nums, k) {
    // This approach only works if all numbers in `nums` are non-negative.
    let left = 0, sum = 0, ans = 0;

    for (let right = 0; right < nums.length; right++) {
        // 1. Expand the window to the right
        sum += nums[right];

        // 2. If sum exceeds k, shrink the window from the left
        //    until the sum is no longer greater than k.
        while (sum > k && left <= right) {
            sum -= nums[left];
            left++;
        }

        // 3. Check if the current window sum is exactly k.
        //    Note: for k=0, this needs special handling if the array contains 0s.
        //    A subarray like [0] has sum 0.
        if (sum === k) {
            ans++;
        }
    }
    return ans;
};

const nums = [1, 1, 1], k = 2;
console.log(subarraySum_correct_sliding_window(nums, k));

const nums2 = [1, 2, 3], k2 = 3;
console.log(subarraySum_correct_sliding_window(nums2, k2));