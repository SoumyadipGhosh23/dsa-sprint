// 🧠 Pattern: Prefix-Suffix Max Arrays
// ✅ Time: O(N), Space: O(N)
// 💡 Water at index i = min(maxLeft, maxRight) - height[i]
// ⚠️ Must have taller bars both sides to trap water
// https://leetcode.com/problems/trapping-rain-water/

var trap = function (height) {
    let prefix = new Array(height.length).fill(0)
    let suffix = new Array(height.length).fill(0)
    let index = 1
    let left_max = height[0]
    prefix[0] = left_max
    while (index < height.length) {
        left_max = Math.max(height[index], left_max)
        prefix[index] = left_max
        index++
    }
    index = height.length - 2
    let right_max = height[height.length - 1]
    suffix[height.length - 1] = right_max
    while (index >= 0) {
        right_max = Math.max(right_max, height[index])
        suffix[index] = right_max
        index--
    }
    let result = 0
    for (let index = 0; index < height.length; index++) {
        result += Math.min(prefix[index], suffix[index]) - height[index]
    }
    return result
};

// 🧠 Pattern: Two Pointers (Optimized Trapping)
// ✅ Time: O(N), Space: O(1)
// 💡 Always move the side with smaller height — it limits the water level
// 💧 Water = min(left_max, right_max) - height[i], but since we know the smaller side, we can safely calculate it inline

//Optimized Version
var trap = function (height) {
    let left = 0
    let right = height.length - 1
    let left_max = height[0]
    let right_max = height[height.length - 1]
    let result = 0
    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] > left_max) {
                left_max = height[left]
            } else {
                result += left_max - height[left]
            }
            left++
        } else {
            if (height[right] > right_max) {
                right_max = height[right]
            } else {
                result += right_max - height[right]
            }
            right--
        }
    }
    return result
};

const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
console.log(trap(height))