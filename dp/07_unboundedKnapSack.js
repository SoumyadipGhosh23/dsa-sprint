/**
 * @param {number[]} val
 * @param {number[]} wt
 * @param {number} capacity
 * @return {number}
 */

class Solution {
    helper(val, wt, n, capacity, dp) {
        if (capacity == 0 || n == 0) return 0;

        if (dp[n][capacity] !== -1) return dp[n][capacity];

        if (wt[n - 1] <= capacity) return dp[n][capacity] = Math.max((val[n - 1] + this.helper(val, wt, n, capacity - wt[n - 1], dp)), this.helper(val, wt, n - 1, capacity, dp))
        else return dp[n][capacity] = this.helper(val, wt, n - 1, capacity, dp)
    }

    knapSack(val, wt, capacity) {
        // code here
        let n = val.length;
        let dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(-1));

        return this.helper(val, wt, n, capacity, dp);
    }
}