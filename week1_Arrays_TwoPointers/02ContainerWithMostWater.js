// 🧠 Pattern: Two Pointers (Opposite Direction Shrinking Window)
// ✅ Time: O(N), Space: O(1)
// 💡 Water is limited by the shorter line — move that inward to possibly find a taller one
// 🧱 Core insight: Max area = width * min(height[left], height[right])
// https://leetcode.com/problems/container-with-most-water/


var maxArea = function (height) {
    let left = 0
    let right = height.length - 1
    let result = 0
    while (left < right) {
        if (height[left] < height[right]) {
            result = Math.max(Math.abs(left - right) * height[left], result)
            left++
        } else {
            result = Math.max(Math.abs(left - right) * height[right], result)
            right--
        }
    }
    return result
};

const height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
console.log(maxArea(height))