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