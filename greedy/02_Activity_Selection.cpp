/**
 * ACTIVITY SELECTION PROBLEM
 *
 * Problem: Given start and finish times of activities, select maximum number of
 *          non-overlapping activities that can be performed by a single person.
 *
 * Greedy Pattern: INTERVAL SCHEDULING
 *
 * Intuition:
 * - Same logic as "N Meetings in One Room" (Problem 02)
 * - Sort activities by finish time (earliest finisher first)
 * - Greedily select activities that start after the last selected activity ends
 *
 * Why Sort by Finish Time:
 * - Activity with earliest finish leaves maximum time for remaining activities
 * - Proven optimal via exchange argument
 *
 * Key Insight:
 * - Track lastSelectedFinish: finish time of last selected activity
 * - Select current activity if start[i] >= lastSelectedFinish
 * - Update lastSelectedFinish = finish[i] when selected
 *
 * Time Complexity: O(n log n) for sorting
 * Space Complexity: O(n) for storing activity pairs
 */

class Solution {
  public:
    static bool compare(vector<int> &a, vector<int> &b) {
        return a[1] < b[1]; // Sort by finish time ascending
    }

    int activitySelection(vector<int> &start, vector<int> &finish) {
        int n = start.size();

        // Create [start, finish] pairs
        vector<vector<int>> activities;
        for (int i = 0; i < n; i++) {
            activities.push_back({start[i], finish[i]});
        }

        // Sort by finish time
        sort(activities.begin(), activities.end(), compare);

        // Always select the first activity (earliest finish)
        int count = 1;
        int lastFinish = activities[0][1];

        // Greedily select remaining activities
        for (int i = 1; i < n; i++) {
            // If current activity starts after/at last selected activity's finish
            if (activities[i][0] >= lastFinish) {
                count++;
                lastFinish = activities[i][1];
            }
        }

        return count;
    }
};