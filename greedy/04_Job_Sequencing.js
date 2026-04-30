/**
 * JOB SEQUENCING WITH DEADLINES
 *
 * Problem: Each job has a deadline and profit. Schedule jobs to maximize total profit.
 *          Each job takes 1 unit time. Only one job can be scheduled at a time.
 *
 * Greedy Intuition:
 * - Prioritize HIGH PROFIT jobs (sort by profit descending)
 * - For each job, schedule it on the LATEST available slot before its deadline
 * - Latest slot leaves earlier slots free for jobs with tighter deadlines
 *
 * Slot Allocation Strategy:
 * - Brute force: For each job, scan from deadline down to 1 → O(n * maxDeadline)
 * - Optimized: Use Disjoint Set Union (Union-Find) for O(α(n)) slot finding
 *
 * DSU Optimization:
 * - parent[i] = latest available slot at or before i
 * - find(x): returns the latest free slot ≤ x
 * - After using slot s: union s with s-1 (parent[s] = find(s-1))
 *
 * Why Greedy Works:
 * - High profit jobs are scheduled first
 * - Latest possible slot maximizes flexibility for remaining jobs
 * - DSU path compression ensures efficient slot tracking
 *
 * Time Complexity: O(n log n) for sorting + O(n * α(maxDeadline)) for DSU
 * Space Complexity: O(maxDeadline) for DSU parent array
 */

class Solution {
    // Sort by profit descending (higher profit first)
    compare(a, b) {
        return b[1] - a[1];
    }

    // Find with path compression
    find(parent, x) {
        if (parent[x] === x) return x;
        return parent[x] = this.find(parent, parent[x]);
    }

    jobSequencing(deadline, profit) {
        const n = deadline.length;
        const jobs = [];

        // Create [deadline, profit] pairs
        for (let i = 0; i < n; i++) {
            jobs.push([deadline[i], profit[i]]);
        }

        // Sort by profit descending
        jobs.sort((a, b) => this.compare(a, b));

        // Find maximum deadline to size DSU array
        let maxDeadline = 0;
        for (let i = 0; i < n; i++) {
            maxDeadline = Math.max(maxDeadline, jobs[i][0]);
        }

        // DSU: parent[i] = latest available slot ≤ i
        const parent = new Array(maxDeadline + 1);
        for (let i = 0; i <= maxDeadline; i++) {
            parent[i] = i;
        }

        let jobCount = 0;
        let totalProfit = 0;

        for (let i = 0; i < n; i++) {
            const [jobDeadline, jobProfit] = jobs[i];

            // Find latest available slot before/at deadline
            const availableSlot = this.find(parent, jobDeadline);

            if (availableSlot > 0) {
                // Schedule job in this slot
                jobCount++;
                totalProfit += jobProfit;

                // Mark slot as used: point to previous available slot
                parent[availableSlot] = this.find(parent, availableSlot - 1);
            }
        }

        return [jobCount, totalProfit];
    }
}