/**
 * Finds all unique triplets in the array which give the sum of zero.
 * @param {number[]} nums
 * @return {number[][]}
 */
// https://leetcode.com/problems/3sum/
var threeSum = function (nums) {
    const result = [];

    // 1. Sort the input array. This is crucial for the two-pointer approach
    //    and for skipping duplicates.
    nums.sort((a, b) => a - b);

    // 2. Iterate through the array to pick the first element of the triplet.
    for (let i = 0; i < nums.length - 2; i++) {
        // 3. Skip duplicate first elements. If the current element is the same
        //    as the previous one, we have already processed it.
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        // Initialize two pointers, one at the element after `i` and one at the end.
        let left = i + 1;
        let right = nums.length - 1;

        // 4. Use the two-pointer technique on the rest of the array.
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                // Found a triplet!
                result.push([nums[i], nums[left], nums[right]]);

                // 5. Skip duplicate second and third elements to ensure uniqueness.
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }

                // 6. Move pointers to find the next unique pair.
                left++;
                right--;

            } else if (sum < 0) {
                // Sum is too small, need a larger number.
                left++;
            } else { // sum > 0
                // Sum is too large, need a smaller number.
                right--;
            }
        }
    }

    return result;
};

// Example:
const inputArray = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(inputArray));
// Expected Output: [[-1, -1, 2], [-1, 0, 1]]