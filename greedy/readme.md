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