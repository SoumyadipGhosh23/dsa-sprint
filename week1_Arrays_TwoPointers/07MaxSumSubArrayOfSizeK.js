function MaxSumSubArrayOfSizeK(nums,k){
    if(nums.length < k) return 0
    let sum  = 0
    for (let index = 0; index < k; index++) {
        sum += nums[index] 
    }
    let ans = sum
    let left = 1
    let right = k

    while(right<nums.length){
        sum += nums[right]
        sum -= nums[left - 1]
        right++
        left++
        ans = Math.max(ans, sum)
    }
    return ans
}

const nums = [2, 1, 5, 1, 3, 2], k = 3
console.log(MaxSumSubArrayOfSizeK(nums,k))