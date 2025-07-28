// 395. Longest Substring with At Least K Repeating Characters
// https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/
function longestSubstring(s, k) {
    const n = s.length;

    // Base case: if string is too short, it can't be a solution
    if (n === 0 || n < k) {
        return 0;
    }

    // Count character frequencies in the current string s
    const charCount = new Map();
    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Find a "splitting" character
    let splitChar = null;
    for (const [char, count] of charCount) {
        if (count < k) {
            splitChar = char;
            break; // Found a character to split by
        }
    }

    // If no character needs to be split, the whole string is valid
    if (splitChar === null) {
        return n;
    }

    // --- Divide and Conquer Step ---
    let maxLength = 0;
    // Split the string by the invalid character and recurse on each part
    const substrings = s.split(splitChar);
    for (const sub of substrings) {
        maxLength = Math.max(maxLength, longestSubstring(sub, k));
    }

    return maxLength;
}

// Example Usage:
console.log(longestSubstring("aaabb", 3)); // Output: 3
console.log(longestSubstring("ababbc", 2)); // Output: 5