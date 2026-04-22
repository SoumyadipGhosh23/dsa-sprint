class Solution {
    helper(arr, n, target, dp) {
        if (n === 0) {
            return target === 0 ? 1 : 0;
        }

        if (dp[n][target] !== -1) return dp[n][target];

        let notTake = this.helper(arr, n - 1, target, dp);
        let take = 0;

        if (arr[n - 1] <= target) {
            take = this.helper(arr, n - 1, target - arr[n - 1], dp);
        }

        return dp[n][target] = take + notTake;
    }

    perfectSum(arr, target) {
        const n = arr.length;
        const dp = Array.from({ length: n + 1 }, () =>
            Array(target + 1).fill(-1)
        );

        return this.helper(arr, n, target, dp);
    }
}