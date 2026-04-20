/**
 * @param {number[]} arr
 * @returns {boolean}
 */

class Solution {
    helper(arr, target, n, dp) {
        if (n == 0 && target !== 0) return false
        if (target == 0) return true

        if (dp[n][target]) return dp[n][target]

        if (arr[n - 1] <= target) {
            return dp[n][target] = this.helper(arr, target - arr[n - 1], n - 1, dp) || this.helper(arr, target, n - 1, dp);

        }
        else {
            return dp[n][target] = this.helper(arr, target, n - 1, dp);
        }
    }

    equalPartition(arr) {
        // your code here
        const sum = arr.reduce((acc, curr) => acc + curr, 0);
        if (sum % 2 !== 0) return false;
        const target = sum / 2;
        const n = arr.length;
        const dp = Array.from({ length: n + 1 }, () => Array(target + 1))
        return this.helper(arr, target, n, dp);
    }
}