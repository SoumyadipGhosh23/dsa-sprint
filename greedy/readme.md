# Greedy Algorithms

## Identifying a Greedy Problem
We usually identify a Greedy problem by these characteristics:

### 1. Optimal Solution Required
The problem asks for optimizations like:
- Minimum
- Maximum
- Largest
- Smallest
- Fewest
- Earliest finish
- Maximum profit

### 2. Local Best Choice Works
At every step, making the best immediate (local) choice helps lead to the overall best (global) answer.

### 3. No Need to Reconsider Previous Choices
Once a decision is made, we usually don’t go back and change it.

### 4. Choices Don’t Depend on Future Decisions Much
The current best decision can be taken confidently without exploring all future possibilities.

---

## Simple Difference from Dynamic Programming (DP)

### DP (Dynamic Programming):
- Try **all** possible choices.
- Store results (memoization/tabulation).
- Find the best answer from all possibilities.

### Greedy:
- Directly take the **best-looking choice** right now and move forward.



# 03. Job Sequencing
here my main intution was we need to do the job with max profit, so I sort in that order, but then I thought each job
````md
## Job Sequencing Notes

### My First Thought

I first thought:

- Sort jobs by profit in descending order
- Keep a `today` counter
- If `today < deadline`, take the job

Example:

```js
if (today < jobDeadline) {
    noOfJobs++;
    totalProfit += jobProfit;
    today++;
}
````

### Why This Is Wrong

This assumes every job must be done on the **next immediate day**.

But actually, a job can be done on **any slot before its deadline**, not just on the current running day.

Example:

If `deadline = 4`, the job can be scheduled on:

* Day 1
* Day 2
* Day 3
* Day 4

So the problem is not about counting how many jobs we have done, it is about checking which time slots are still free.

That means tracking only `today` is incorrect.

---

### Second Solution

Then I used the correct greedy idea:

* Sort jobs by profit in descending order
* Create a `slots[]` array to track occupied days
* For every job, check from `deadline → 1`
* Place the job in the latest free slot

Example:

```js
for (let day = jobDeadline; day >= 1; day--) {
    if (!slots[day]) {
        slots[day] = true;
        noOfJobs++;
        totalProfit += jobProfit;
        break;
    }
}
```

### Why This Gives TLE

Although this logic is correct, for every job we scan backwards:

```js
for (day = deadline; day >= 1; day--)
```

So time complexity becomes:

```text
O(n * maxDeadline)
```

For large inputs, this becomes too slow and causes TLE.

---

### Final Optimized Solution (DSU / Union Find)

To avoid scanning every day manually, we use Disjoint Set (Union Find).

The goal is to quickly find:

> the latest available free slot before or on the deadline

Instead of checking every slot one by one.

Main idea:

```js
availableSlot = find(jobDeadline)
```

This means:

> Give me the latest free slot I can still use for this job

After using a slot:

```js
parent[availableSlot] = find(availableSlot - 1)
```

This means:

* Current slot is now occupied
* Next time, redirect to the previous available free slot

This makes the solution much faster and avoids TLE.

---

## Final Learning

### Wrong Approach

Using only:

```js
today++
```

because it assumes jobs must be done one after another only.

---

### Correct Greedy

Use:

```text
Latest free slot <= deadline
```

because each job can be scheduled anywhere before its deadline.

---

### Best Optimized Version

Use:

```text
Greedy + DSU (Union Find)
```

for fast slot allocation. 



Phase 1: The Greedy vs. DP SplitAsk yourself: "If I make a choice now, will I regret it later?"1. The Greedy Vibe (Local = Global)The Vibe: You can make a decision (like picking the smallest number) and never need to change your mind.The Proof: The Exchange Argument. If you swap any two items and the result gets worse, you’re in Greedy territory.Constraints: Usually $N > 10^5$. DP almost never works at this scale.2. The DP Vibe (Choices have Consequences)The Vibe: Picking the "best" thing now might screw you over later. You have to try "Option A" and "Option B" and see which path leads to a better future.The Sign: You see words like "Maximum ways to...", "Minimum cost to...", or "Can you reach...".Constraints: Usually $N < 10^4$. If you see $N=500$ or $N=2000$, your brain should scream DP.Phase 2: Choosing the Greedy ArchetypeIf you’ve settled on Greedy, you need to pick your "weapon." Think of it like this:Route A: The "Static" Sort (Sorting Pattern)When: All items are available at the start, and their "value" doesn't change after you pick one.The Logic: "If I order these items correctly, the answer will reveal itself."Mental Check: Can I define a single compare() function that works for every pair?Common Targets: Intervals, Fractional Knapsack, Job Scheduling.Route B: The "Dynamic" Best (Priority Queue Pattern)When: Every time you take an action, the "state" of the remaining items changes.The Logic: "I need the best item right now, but after I take it, I’ll need to find the new best item."Mental Check: Does picking an item create a new item? (e.g., merging two files into one).Common Targets: Huffman Coding, K-closest elements, Dijkstra’s.Route C: The "Timeline" (Two-Pointer/Event Pattern)When: You are dealing with time, arrival/departure, or points on a 1D line.The Logic: "I’m not picking items; I’m walking through time and reacting to events."Mental Check: Do things happen at specific "start" and "end" points?Common Targets: Minimum Platforms, Meeting Rooms, Merging Intervals.