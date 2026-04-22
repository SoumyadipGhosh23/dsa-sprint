/**
 * @param {number[]} deadline
 * @param {number[]} profit
 * @returns {number[]}
 */

class Solution {
    compare(a, b) {
        return b[1] - a[1];
    }

    find(parent, x) {
        if (parent[x] === x) return x;
        return parent[x] = this.find(parent, parent[x]);
    }

    jobSequencing(deadline, profit) {
        let helper = [];
        let size = deadline.length;

        for (let i = 0; i < size; i++) {
            helper.push([deadline[i], profit[i]]);
        }

        helper.sort(this.compare);

        let maxDeadline = 0;
        for (let i = 0; i < size; i++) {
            maxDeadline = Math.max(maxDeadline, helper[i][0]);
        }

        let parent = Array(maxDeadline + 1);
        for (let i = 0; i <= maxDeadline; i++) {
            parent[i] = i;
        }

        let noOfJobs = 0;
        let totalProfit = 0;

        for (let i = 0; i < size; i++) {
            let jobDeadline = helper[i][0];
            let jobProfit = helper[i][1];

            let availableSlot = this.find(parent, jobDeadline);

            if (availableSlot > 0) {
                noOfJobs++;
                totalProfit += jobProfit;

                parent[availableSlot] = this.find(parent, availableSlot - 1);
            }
        }

        return [noOfJobs, totalProfit];
    }
}