/**
 * MINIMUM PLATFORMS REQUIRED
 *
 * Problem: Given arrival and departure times of trains, find minimum platforms
 *          needed so that no train waits.
 *
 * Greedy Pattern: TWO-POINTER / TIMELINE SWEEP
 *
 * Intuition:
 * - Sort arrivals and departures separately
 * - Use two pointers to simulate time progression
 * - At each arrival: platform needed increases
 * - At each departure: platform needed decreases
 * - Track maximum platforms needed at any time
 *
 * Why Two Pointers:
 * - Arrivals and departures are independent events
 * - Sorting lets us process events in chronological order
 * - No need to match specific trains, just count concurrent trains
 *
 * Algorithm:
 * - i = arrival pointer, j = departure pointer
 * - If arr[i] <= dep[j]: train arrives before current departure → need platform
 * - Else: train departs → free up a platform
 *
 * Time Complexity: O(n log n) for sorting
 * Space Complexity: O(1) extra (if sorting in-place) or O(n)
 *
 * Related: Similar to "merge two sorted arrays" pattern
 */

class Solution {
  public:
    int minPlatform(vector<int>& arr, vector<int>& dep) {
        int n = arr.size();

        // Sort independently: we only care about event order, not train identity
        sort(arr.begin(), arr.end());
        sort(dep.begin(), dep.end());

        int platformsNeeded = 0;
        int maxPlatforms = 0;

        int i = 0; // Arrival pointer
        int j = 0; // Departure pointer

        // Process all events in chronological order
        while (i < n && j < n) {
            if (arr[i] <= dep[j]) {
                // Train arrives before/at departure → need new platform
                platformsNeeded++;
                i++;
            } else {
                // Train departs before next arrival → free a platform
                platformsNeeded--;
                j++;
            }

            maxPlatforms = max(maxPlatforms, platformsNeeded);
        }

        return maxPlatforms;
    }
};