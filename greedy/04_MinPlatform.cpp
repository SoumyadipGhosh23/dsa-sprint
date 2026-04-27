class Solution {
  public:
    int minPlatform(vector<int>& arr, vector<int>& dep) {
        int n = arr.size();
        
        // Sort both arrays independently
        sort(arr.begin(), arr.end());
        sort(dep.begin(), dep.end());

        int platforms_needed = 0;
        int max_platforms = 0;
        
        int i = 0; // Pointer for arrival
        int j = 0; // Pointer for departure

        // Walk through the timeline
        while (i < n && j < n) {
            // If a train arrives before or at the time the next one departs
            if (arr[i] <= dep[j]) {
                platforms_needed++;
                i++;
            } 
            // If a train departs before the next one arrives
            else {
                platforms_needed--;
                j++;
            }
            
            // Track the maximum value platforms_needed reached
            max_platforms = max(max_platforms, platforms_needed);
        }

        return max_platforms;
    }
};