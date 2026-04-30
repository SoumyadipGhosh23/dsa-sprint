/**
 * N MEETINGS IN ONE ROOM (Activity Selection - Single Room)
 *
 * Problem: Given start and end times of meetings, find max number of meetings
 *          that can be scheduled in ONE room (no overlaps allowed).
 *
 * Greedy Intuition:
 * - To fit maximum meetings, prioritize meetings that END EARLIEST
 * - Early finishers leave more time for subsequent meetings
 * - Sort by end time, then greedily pick non-conflicting meetings
 *
 * Why Sort by End Time (not Start Time or Duration)?
 * - End time: Leaves maximum remaining time for future meetings
 * - Start time: Early start + long duration blocks many meetings
 * - Duration: Short duration at wrong time still causes conflicts
 *
 * Why Greedy Works:
 * - Choosing earliest finishing meeting always leaves maximum room for rest
 * - Exchange argument: Any optimal solution can be modified to include
 *   the earliest-ending meeting without reducing count
 *
 * Time Complexity: O(n log n) for sorting
 * Space Complexity: O(n) for storing meetings
 *
 * Related: Activity Selection Problem (identical logic, different naming)
 */

class Solution {
    maxMeetings(start, end) {
        const n = start.length;
        const meetings = [];

        // Create [start, end] pairs
        for (let i = 0; i < n; i++) {
            meetings.push([start[i], end[i]]);
        }

        // Sort by end time ascending (earliest finisher first)
        meetings.sort((a, b) => a[1] - b[1]);

        let count = 0;
        let lastEndTime = -1; // Tracks when last selected meeting ends

        for (let i = 0; i < n; i++) {
            const [currStart, currEnd] = meetings[i];

            // If current meeting starts after last one ends, select it
            if (currStart > lastEndTime) {
                count++;
                lastEndTime = currEnd;
            }
        }

        return count;
    }
}