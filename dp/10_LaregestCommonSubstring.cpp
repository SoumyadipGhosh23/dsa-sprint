class Solution {
public:
    int lcsubstring(string &s1, string &s2) {
        int n = s1.size();
        int m = s2.size();

        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        int ans = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                    ans = max(ans, dp[i][j]);
                } else {
                    dp[i][j] = 0;
                }
            }
        }

        return ans;
    }
};

// recursion way
class Solution {
public:
    int helper(string &s1, string &s2, int i, int j, vector<vector<int>> &dp) {
        if (i == 0 || j == 0) return 0;

        if (dp[i][j] != -1) return dp[i][j];

        if (s1[i - 1] == s2[j - 1]) {
            return dp[i][j] = 1 + helper(s1, s2, i - 1, j - 1, dp);
        }

        return dp[i][j] = 0;
    }

    int lcsubstring(string &s1, string &s2) {
        int n = s1.size();
        int m = s2.size();

        vector<vector<int>> dp(n + 1, vector<int>(m + 1, -1));

        int ans = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                ans = max(ans, helper(s1, s2, i, j, dp));
            }
        }

        return ans;
    }
};