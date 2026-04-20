# Dynamic Programming (DP)

## Identifying a DP Problem
We can identify a Dynamic Programming problem primarily by two characteristics:
1. **Optimal Solution:** The problem asks for an optimal value—such as "Minimum", "Maximum", or "Largest".
2. **Choice:** At each step, we have choices to make (e.g., to "pick" or "not pick" an element).

*Note: DP is typically applied when a problem can be solved using recursion, and that recursive solution has **overlapping subproblems**.*

---

## 0/1 Knapsack Problem

### Identifying Knapsack Problems
A problem is likely a variation of the 0/1 Knapsack if it fits this pattern:
- We are given a set of items.
- We have the choice to either **pick** an item or **not pick** it (0/1).
- We make these choices constrained by a limit, with the goal of reaching a target (like maximizing value or exactly matching a sum).

### Related Problems
Problems that are variations of the 0/1 Knapsack pattern include:
- Subset Sum Problem
- Equal sum problem
