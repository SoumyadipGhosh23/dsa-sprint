class Solution {
    helper(arr, sum, n, dp) {
        if (sum === 0) return true;
        if (n === 0) return false;

        if (dp[n][sum] !== -1) return dp[n][sum];

        if (arr[n - 1] <= sum) {
            return dp[n][sum] =
                this.helper(arr, sum - arr[n - 1], n - 1, dp) ||
                this.helper(arr, sum, n - 1, dp);
        } else {
            return dp[n][sum] = this.helper(arr, sum, n - 1, dp);
        }
    }

    isSubsetSum(arr, sum) {
        const n = arr.length;
        const dp = Array.from({ length: n + 1 }, () => Array(sum + 1).fill(-1));
        return this.helper(arr, sum, n, dp);
    }
}