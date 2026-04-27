// User function Template for javascript
/**
 * @param {number[]} price
 * @returns {number}
 */

class Solution {
    helper(price, index, size, dp) {
        if (size === 0 || index >= price.length) return 0;
        if (dp[index][size] !== -1) return dp[index][size];

        if (index + 1 <= size)
            return (dp[index][size] = Math.max(
                price[index] + this.helper(price, index, size - (index + 1), dp),
                this.helper(price, index + 1, size, dp),
            ));
        else return dp[index][size] = this.helper(price, index + 1, size, dp);
    }
    cutRod(price) {
        // code here
        const n = price.length;
        const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(-1));
        return this.helper(price, 0, n, dp);
    }
}