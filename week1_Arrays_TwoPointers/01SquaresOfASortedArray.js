// 🧠 Pattern: Two Pointers (Opposite Direction Merge)
// 💡 Idea: Since squaring negatives turns them positive, merge the two halves (negatives reversed and positives) like in merge sort
// ✅ Time: O(N), Space: O(N)
// 🔥 Avoid sorting after squaring; use two pointers for optimal time
// https://leetcode.com/problems/squares-of-a-sorted-array/

var sortedSquares01 = function (nums) {
    let right = 0
    while (right < nums.length && nums[right] < 0) {
        right++
    }
    let left = right - 1
    let arr = []
    while (right < nums.length && left >= 0) {
        if (nums[right] < nums[left] * (-1)) {
            arr.push(nums[right])
            right++
        } else {
            arr.push(nums[left])
            left--
        }
    }
    while (left >= 0) {
        arr.push(nums[left])
        left--
    }
    while (right < nums.length) {
        arr.push(nums[right])
        right++
    }
    for (let index = 0; index < nums.length; index++) {
        nums[index] = arr[index] * arr[index]
    }
    return nums
};


var sortedSquares = function (nums) {
    let left = 0
    let right = nums.length - 1
    let k = nums.length - 1
    let res = new Array(nums.length).fill(0)
    while (left < right) {
        if (Math.abs(nums[left]) > Math.abs(nums[right])) {
            res[k] = nums[left]
            k--
            left++
        } else {
            res[k] = nums[right]
            k--
            right--
        }
    }
    for (let index = 0; index < res.length; index++) {
        res[index] = res[index] * res[index]
    }
    return res
};

const nums = [-4, -1, 0, 3, 10]
console.log(sortedSquares(nums))