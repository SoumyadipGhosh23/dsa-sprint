class Solution {
    countSubsetSum(arr, n, sum, dp) {
        if (n === 0) {
            return sum === 0 ? 1 : 0;
        }

        if (dp[n][sum] !== -1) return dp[n][sum];

        if (arr[n - 1] <= sum) {
            dp[n][sum] =
                this.countSubsetSum(arr, n - 1, sum - arr[n - 1], dp) +
                this.countSubsetSum(arr, n - 1, sum, dp);
        } else {
            dp[n][sum] = this.countSubsetSum(arr, n - 1, sum, dp);
        }

        return dp[n][sum];
    }

    countPartitions(arr, diff) {
        const n = arr.length;
        const sum = arr.reduce((acc, curr) => acc + curr, 0);

        if ((sum + diff) % 2 !== 0 || sum < Math.abs(diff)) {
            return 0;
        }

        const targetSum = (sum + diff) / 2;
        const dp = Array.from({ length: n + 1 }, () =>
            Array(targetSum + 1).fill(-1)
        );

        return this.countSubsetSum(arr, n, targetSum, dp);
    }
}