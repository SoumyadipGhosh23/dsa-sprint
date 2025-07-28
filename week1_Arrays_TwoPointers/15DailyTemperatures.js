// https://leetcode.com/problems/daily-temperatures/description/
var dailyTemperatures = function (temperatures) {
    // FIX 1: Use a Map. Your original `[]` can't use `.set()` or `.get()`.
    // This will map an index to its wait time. e.g., { 0: 1, 1: 1, 2: 4, ... }
    const waitTimeMap = new Map();
    const stack = [];

    for (let i = 0; i < temperatures.length; i++) {
        // This while loop logic is correct.
        while (stack.length > 0 && temperatures[i] > stack[stack.length - 1][0]) {
            // FIX 2: Pop from the stack only ONCE per iteration.
            // Your original code popped twice, which breaks the logic.
            const [temp, originalIndex] = stack.pop();

            // Store the result in the map, using the original index as the key.
            waitTimeMap.set(originalIndex, i - originalIndex);
        }

        // Your logic to push [temperature, index] onto the stack is preserved.
        stack.push([temperatures[i], i]);
    }

    // This second loop is preserved from your original flow.
    const result = [];
    for (let i = 0; i < temperatures.length; i++) {
        // FIX 3: Get the wait time from the map using the index `i`.
        // If the map doesn't have the index, it means no warmer day was
        // found, so we default to 0.
        result.push(waitTimeMap.get(i) || 0);
    }

    return result;
};