#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int helper(string &s1, string &s2, int size1, int size2, vector<vector<int>> &dp) {
        if (size1 == 0 || size2 == 0) return 0;

        if (dp[size1][size2] != -1) return dp[size1][size2];

        if (s1[size1 - 1] == s2[size2 - 1]) {
            return dp[size1][size2] = 1 + helper(s1, s2, size1 - 1, size2 - 1, dp);
        }

        return dp[size1][size2] = max(
            helper(s1, s2, size1 - 1, size2, dp),
            helper(s1, s2, size1, size2 - 1, dp)
        );
    }

    int lcs(string &s1, string &s2) {
        int size1 = s1.size();
        int size2 = s2.size();

        vector<vector<int>> dp;
        dp.assign(size1 + 1, vector<int>(size2 + 1, -1));

        return helper(s1, s2, size1, size2, dp);
    }
};


int main(){
  Solution s;
  string s1 = "AGGTAB";
  string s2 = "GXTXAYB";
  cout << s.lcs(s1, s2) << endl;
}