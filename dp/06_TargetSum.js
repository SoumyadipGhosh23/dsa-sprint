class Solution {
    countOfSubSetSum(arr, n, sum, dp) {
        if (n === 0) {
            return sum === 0 ? 1 : 0;
        }

        if (dp[n][sum] !== -1) return dp[n][sum];

        if (arr[n - 1] <= sum) {
            return dp[n][sum] = this.countOfSubSetSum(arr, n - 1, sum - arr[n - 1], dp) +
                this.countOfSubSetSum(arr, n - 1, sum, dp);
        } else {
            return dp[n][sum] = this.countOfSubSetSum(arr, n - 1, sum, dp);
        }
    }

    totalWays(arr, target) {
        let sum = arr.reduce((acc, curr) => acc + curr, 0);

        // 1. Target can't be bigger than total sum
        // 2. (sum + target) must be even to split into two integers
        if ((sum + target) % 2 !== 0 || sum < Math.abs(target)) {
            return 0;
        }

        let targetSum = (sum + target) / 2;
        let n = arr.length;

        // Dynamic DP size based on n
        let dp = Array.from({ length: n + 1 }, () => Array(targetSum + 1).fill(-1));

        return this.countOfSubSetSum(arr, n, targetSum, dp);
    }
}

// x + y = sum
// x - y taregt

// x = (sum + target)/2