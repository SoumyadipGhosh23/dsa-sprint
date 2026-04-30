/**
 * FRACTIONAL KNAPSACK
 *
 * Problem: Given items with values and weights, maximize total value in a knapsack
 *          of given capacity. You can take FRACTIONS of items (unlike 0/1 knapsack).
 *
 * Greedy Intuition:
 * - To maximize value, prioritize items that give the MOST value per unit weight
 * - Calculate value/weight ratio for each item
 * - Sort by ratio descending
 * - Take as much as possible of the best ratio item first
 *
 * Why Greedy Works:
 * - Local optimal choice (highest ratio) leads to global optimal
 * - No future decision affects past choices
 * - Exchange argument: Any optimal solution can be transformed to include
 *   the highest ratio item without decreasing total value
 *
 * Time Complexity: O(n log n) for sorting
 * Space Complexity: O(n) for storing items
 */

function compare(a, b) {
    // Compare by value/weight ratio (descending)
    const ratioA = a[0] / a[1];
    const ratioB = b[0] / b[1];
    return ratioB - ratioA;
}

function fractionalKnapsack(values, weights, capacity) {
    const n = values.length;

    // Create pairs of [value, weight]
    const items = [];
    for (let i = 0; i < n; i++) {
        items.push([values[i], weights[i]]);
    }

    // Sort by value/weight ratio in descending order
    items.sort(compare);

    let totalValue = 0;
    let remainingCapacity = capacity;

    for (let i = 0; i < n; i++) {
        const [value, weight] = items[i];

        if (weight <= remainingCapacity) {
            // Take the entire item
            totalValue += value;
            remainingCapacity -= weight;
        } else {
            // Take fraction of item to fill remaining capacity
            const fraction = remainingCapacity / weight;
            totalValue += value * fraction;
            break; // Knapsack is full
        }
    }

    return totalValue;
}

// Test
const values = [60, 100, 120];
const weights = [10, 20, 30];
const capacity = 50;

console.log(fractionalKnapsack(values, weights, capacity)); // Output: 240