class Solution {
    Helper(W, val, wt, n, dp) {
        if (n === 0 || W === 0) {
            return 0;
        }

        if (dp[W][n] !== -1) {
            return dp[W][n];
        }

        if (wt[n - 1] <= W) {
            return dp[W][n] = Math.max(
                val[n - 1] + this.Helper(W - wt[n - 1], val, wt, n - 1, dp),
                this.Helper(W, val, wt, n - 1, dp)
            );
        } else {
            return dp[W][n] = this.Helper(W, val, wt, n - 1, dp);
        }
    }

    knapsack(W, val, wt) {
        const dp = Array.from({ length: W + 1 }, () =>
            Array(val.length + 1).fill(-1)
        );

        return this.Helper(W, val, wt, val.length, dp);
    }
}

const s = new Solution();
