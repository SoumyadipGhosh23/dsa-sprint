/**
 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
    subsetSum(arr, n, sum, dp) {
        if (sum == 0) return true;
        if (n == 0) return false;

        if (dp[n][sum] !== -1) return dp[n][sum];

        if (arr[n - 1] <= sum) return dp[n][sum] = this.subsetSum(arr, n - 1, sum - arr[n - 1], dp) || this.subsetSum(arr, n - 1, sum, dp);
        else return dp[n][sum] = this.subsetSum(arr, n - 1, sum, dp);
    }
    minDifference(arr) {
        // your code here
        let sum = 0;
        let n = arr.length;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        let dp = []
        for (let i = Math.floor(sum / 2); i >= 0; i--) {
            dp = Array.from({ length: n + 1 }, () => Array(i + 1).fill(-1));
            if (this.subsetSum(arr, n, i, dp))
                return (sum - i) - i;
        }
    }
}

const obj = new Solution();
console.log(obj.minDifference([1, 6, 11, 5]));