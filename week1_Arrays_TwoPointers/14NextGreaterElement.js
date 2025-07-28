// https://leetcode.com/problems/next-greater-element-i/

const nextGreaterElement = function (nums1, nums2) {
    // Map to store {element: nextGreaterElement}
    const nextGreaterMap = new Map();

    // Stack to keep track of elements for which we haven't found a next greater element yet.
    const stack = [];

    // Iterate through nums2 to populate the map.
    for (const num of nums2) {
        // While the stack is not empty and the current number is greater 
        // than the element at the top of the stack...
        while (stack.length > 0 && num > stack[stack.length - 1]) {
            // ...it means we've found the next greater element for the stack's top element.
            const smallerNum = stack.pop();
            nextGreaterMap.set(smallerNum, num);
        }
        // Push the current number onto the stack.
        stack.push(num);
    }

    // Any numbers left in the stack have no next greater element in the array.
    // The map will not have entries for them, so we will use -1 later.

    // Build the result array by looking up each element of nums1 in our map.
    const result = [];
    for (const num of nums1) {
        // If the number is in the map, get its next greater element.
        // Otherwise, default to -1.
        result.push(nextGreaterMap.get(num) ?? -1);
    }

    return result;
};