// User function Template for javascript

/**
 * @param {number[]} start
 * @param {number[]} end
 * @returns {number}
 */

class Solution {
    maxMeetings(start, end) {
        const meetings = [];

        for (let i = 0; i < start.length; i++) {
            meetings.push([start[i], end[i]]);
        }

        // sort by end time
        meetings.sort((a, b) => a[1] - b[1]);

        let count = 0;
        let lastMeetingEndTime = -1;

        for (let i = 0; i < meetings.length; i++) {
            if (meetings[i][0] > lastMeetingEndTime) {
                count++;
                lastMeetingEndTime = meetings[i][1];
            }
        }

        return count;
    }
}