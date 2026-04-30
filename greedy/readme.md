# Greedy Algorithms

## How to Identify a Greedy Problem

| Characteristic | Description |
|---------------|-------------|
| **Optimization Goal** | Problem asks for: Minimum, Maximum, Largest, Smallest, Maximum Profit, Earliest Finish |
| **Local Choice Works** | Making the best immediate choice leads to global optimal |
| **No Backtracking** | Once a decision is made, it never needs to be reconsidered |
| **Future Independence** | Current decision doesn't depend heavily on future choices |

---

## Greedy vs Dynamic Programming

| Aspect | Greedy | Dynamic Programming |
|--------|--------|---------------------|
| Approach | Take best choice NOW | Try ALL possible choices |
| State | No state/memory needed | Store results (memoization/tabulation) |
| Guarantee | Works only if greedy choice property holds | Always finds optimal (if state space is manageable) |
| Constraints | Usually N > 10^5 | Usually N < 10^4 (N=500 or 2000 screams DP) |

---

## Common Greedy Patterns

### Pattern 1: Sort by Ratio/Value
**When:** Need to maximize value per unit
**Key:** Define a comparison metric, sort descending
**Examples:** Fractional Knapsack (value/weight ratio)

### Pattern 2: Sort by End Time (Interval Scheduling)
**When:** Selecting maximum non-overlapping items
**Key:** Earliest finisher leaves most room for others
**Examples:** Activity Selection, N Meetings in One Room

### Pattern 3: Two-Pointer Timeline Sweep
**When:** Tracking concurrent events over time
**Key:** Sort events, use two pointers to simulate timeline
**Examples:** Minimum Platforms, Merge Intervals

### Pattern 4: Greedy + Data Structure (DSU/Priority Queue)
**When:** Need fast lookup for "best available slot"
**Key:** Sort by primary criteria, use DSU/heap for allocation
**Examples:** Job Sequencing (DSU), Huffman Coding (Heap)

---

## Problem Index

| # | Problem | Pattern | Key Insight |
|---|---------|---------|-------------|
| 01 | Fractional Knapsack | Sort by Ratio | Value/Weight ratio determines priority |
| 02 | N Meetings in One Room | Interval Scheduling | Sort by end time, pick non-conflicting |
| 03 | Activity Selection | Interval Scheduling | Same as #02 (different naming) |
| 04 | Job Sequencing | Greedy + DSU | Sort by profit, schedule at latest free slot |
| 05 | Minimum Platforms | Two-Pointer Timeline | Count max concurrent trains |

---

## Problem Details

### 01. Fractional Knapsack

**Problem:** Maximize value in capacity-limited knapsack (can take fractions of items)

**Greedy Strategy:**
1. Calculate value/weight ratio for each item
2. Sort by ratio descending
3. Take as much as possible of highest ratio items first

**Why It Works:**
- Local optimal (highest ratio) leads to global optimal
- Exchange argument: Any optimal solution can include the highest ratio item without loss

**Complexity:** O(n log n) time, O(n) space

---

### 02. N Meetings in One Room

**Problem:** Schedule maximum non-overlapping meetings in one room

**Greedy Strategy:**
1. Sort meetings by end time (ascending)
2. Select first meeting
3. For each subsequent meeting, select if it starts after last selected ends

**Why Sort by End Time (not Start or Duration)?**
- End time: Leaves maximum remaining time
- Start time: Early start + long duration blocks many meetings  
- Duration: Short but poorly timed still conflicts

**Related:** Activity Selection Problem (identical logic)

**Complexity:** O(n log n) time, O(n) space

---

### 03. Activity Selection

**Problem:** Select maximum activities for single person (no overlaps)

**Note:** Identical to "N Meetings in One Room" - different problem statement, same solution.

**Greedy Strategy:**
1. Sort by finish time
2. Track `lastFinish` - end time of last selected activity
3. Select activity if `start[i] >= lastFinish`
4. Update `lastFinish = finish[i]`

**Complexity:** O(n log n) time, O(n) space

---

### 04. Job Sequencing

**Problem:** Schedule jobs with deadlines and profits to maximize total profit

**Greedy Strategy:**
1. Sort jobs by profit descending
2. For each job, schedule at latest available slot before deadline
3. Use DSU (Union-Find) to find slots in O(α(n))

**Why Latest Slot?**
- Leaves earlier slots free for jobs with tighter deadlines
- Maximizes flexibility for remaining (lower profit) jobs

**DSU Optimization:**
```
parent[i] = latest free slot at or before i
find(x)   = get latest free slot ≤ x
union     = mark slot used, point to previous slot
```

**Complexity:** O(n log n + n·α(maxDeadline)) time, O(maxDeadline) space

---

### 05. Minimum Platforms

**Problem:** Find minimum platforms needed so no train waits

**Pattern:** Two-Pointer Timeline Sweep

**Strategy:**
1. Sort arrivals and departures independently
2. Use two pointers to process events chronologically
3. Increment count on arrival, decrement on departure
4. Track maximum count

**Why Sort Independently?**
- We don't need to match specific trains
- Just need to count concurrent trains at any time
- Similar to merging two sorted arrays

**Complexity:** O(n log n) time, O(1) extra space

---

## Quick Decision Guide

```
Start Here: Can you make ONE choice and never regret it?
    │
    ├── YES → Greedy Candidate
    │   │
    │   ├── Items have ratios? → Sort by ratio (Fractional Knapsack)
    │   │
    │   ├── Intervals/Time slots? → Sort by end time (Activity Selection)
    │   │
    │   ├── Concurrent events? → Two-pointer sweep (Min Platforms)
    │   │
    │   └── Need best slot lookup? → Greedy + DSU/Heap (Job Sequencing)
    │
    └── NO → Try DP or Backtracking
        │
        ├── Small constraints (N < 10^4)? → DP
        │
        └── Need to explore all paths? → Backtracking/DFS
```

---

## Exchange Argument (Greedy Proof Technique)

To prove greedy works, show:
1. There exists an optimal solution that includes your greedy choice
2. If an optimal solution doesn't include it, you can swap to include it without worsening the result

**Example (Activity Selection):**
- Let G = greedy solution (pick earliest finisher)
- Let O = any optimal solution
- If O's first activity ends later than G's, swap them
- Count stays same, so G is also optimal
