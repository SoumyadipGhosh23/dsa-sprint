/**
 * Finds all unique quadruplets in the array which give the sum of the target.
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    const result = [];
    if (nums.length < 4) {
        return result;
    }

    // 1. Sort the array to use the two-pointer technique and skip duplicates.
    nums.sort((a, b) => a - b);
    const n = nums.length;

    // 2. Loop for the first number of the quadruplet.
    for (let j = 0; j < n - 3; j++) {
        // Skip duplicates for the first number.
        if (j > 0 && nums[j] === nums[j - 1]) {
            continue;
        }

        // 3. Loop for the second number of the quadruplet.
        for (let i = j + 1; i < n - 2; i++) {
            // Skip duplicates for the second number.
            if (i > j + 1 && nums[i] === nums[i - 1]) {
                continue;
            }

            // 4. Two-pointer approach for the remaining two numbers.
            let left = i + 1;
            let right = n - 1;

            while (left < right) {
                const sum = nums[j] + nums[i] + nums[left] + nums[right];

                if (sum === target) {
                    result.push([nums[j], nums[i], nums[left], nums[right]]);

                    // Skip duplicates for the third and fourth numbers.
                    while (left < right && nums[left] === nums[left + 1]) {
                        left++;
                    }
                    while (left < right && nums[right] === nums[right - 1]) {
                        right--;
                    }

                    // Move pointers to find the next unique pair.
                    left++;
                    right--;
                } else if (sum < target) {
                    // Sum is too small, need a larger number.
                    left++;
                } else { // sum > target
                    // Sum is too large, need a smaller number.
                    right--;
                }
            }
        }
    }

    return result;
};