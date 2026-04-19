class Solution {
    knapsack(W, val, wt) {
        const n = val.length;

        // create dp matrix filled with -1
        const dp = Array.from({ length: n + 1 }, () =>
            Array(W + 1).fill(-1)
        );

        // initialization
        // if no items OR capacity = 0 → profit = 0
        for (let i = 0; i <= n; i++) {
            dp[i][0] = 0;
        }

        for (let j = 0; j <= W; j++) {
            dp[0][j] = 0;
        }

        // fill remaining table
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= W; j++) {
                if (wt[i - 1] <= j) {
                    dp[i][j] = Math.max(
                        val[i - 1] + dp[i - 1][j - wt[i - 1]],
                        dp[i - 1][j]
                    );
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }

        return dp[n][W];
    }
}

const s = new Solution();

