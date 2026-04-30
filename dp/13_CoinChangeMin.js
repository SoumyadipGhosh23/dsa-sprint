class Solution {
    helper(coins, n, sum, dp) {
        // Base cases
        if (sum === 0) return 0; // Found a valid combination
        if (n === 0) return Infinity; // Out of coins, sum not reached

        if (dp[n][sum] !== -1) return dp[n][sum];

        if (coins[n - 1] <= sum) {
            // Option 1: Take the coin (stay at index n because we have infinite supply)
            let take = 1 + this.helper(coins, n, sum - coins[n - 1], dp);
            // Option 2: Skip the coin
            let skip = this.helper(coins, n - 1, sum, dp);

            return dp[n][sum] = Math.min(take, skip);
        } else {
            return dp[n][sum] = this.helper(coins, n - 1, sum, dp);
        }
    }

    minCoins(coins, sum) {
        let n = coins.length;
        let dp = Array.from({ length: n + 1 }, () => Array(sum + 1).fill(-1));

        let result = this.helper(coins, n, sum, dp);
        return result === Infinity ? -1 : result;
    }
}