// 402. Remove K Digits
// https://leetcode.com/problems/remove-k-digits/
var removeKdigits = function (num, k) {
    const stack = [];
    for (let digit of num) {
        while (k > 0 && stack.length && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }

    stack.splice(stack.length - k, k); // remove remaining if k > 0
    const result = stack.join('').replace(/^0+/, '');
    return result === '' ? '0' : result;
};