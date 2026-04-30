class Solution {
    helper(coins, n, sum, dp) {
        if (n == 0) {
            return sum == 0 ? 1 : 0;
        }
        if (dp[n][sum] !== -1) return dp[n][sum];

        if (coins[n - 1] <= sum) return dp[n][sum] = this.helper(coins, n, sum - coins[n - 1], dp) + this.helper(coins, n - 1, sum, dp);
        else return dp[n][sum] = this.helper(coins, n - 1, sum, dp)
    }

    count(coins, sum) {
        // code here
        let n = coins.length;
        let dp = Array.from({ length: n + 1 }, () => Array(sum + 1).fill(-1));
        return this.helper(coins, n, sum, dp);

    }
}
