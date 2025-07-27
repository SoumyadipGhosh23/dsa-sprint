/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
// https://leetcode.com/problems/minimum-window-substring/
var minWindow = function (s, t) {
    // --- Edge Cases ---
    // If t is empty, there's nothing to find, return "".
    // If s is shorter than t, it's impossible to find t in s.
    if (t === "" || s.length < t.length) {
        return "";
    }

    // --- Initialization ---

    // 1. Create a frequency map for the target string 't'.
    // This map will store the characters we need to find and their required counts.
    const tMap = new Map();
    for (const char of t) {
        tMap.set(char, (tMap.get(char) || 0) + 1);
    }

    // 2. Initialize pointers and counters for our sliding window.
    let left = 0; // The left pointer of the window.
    let have = 0; // The count of unique characters in our window that match the required count in tMap.
    const need = tMap.size; // The total number of unique characters we need to find from t.

    // 3. Keep track of the best window found so far.
    // `result` stores the [start, end] indices of the minimum window.
    // `resultLength` stores its length, initialized to infinity.
    let result = [-1, -1];
    let resultLength = Infinity;

    // 4. Create a frequency map for the characters in the current window.
    const windowCounts = new Map();

    // --- Sliding Window Algorithm ---

    // Use 'right' to expand the window by iterating through string 's'.
    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        // Add the new character to our window's frequency map.
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

        // --- Check for a Match ---
        // If the current character is one we need (i.e., it's in tMap) AND
        // we have found the exact required number of this character...
        if (tMap.has(char) && windowCounts.get(char) === tMap.get(char)) {
            // ...then we have satisfied the requirement for one unique character.
            have++;
        }

        // --- Contract the Window ---
        // Once `have` equals `need`, it means our current window (from `left` to `right`)
        // is a valid candidate because it contains all characters from `t`.
        // Now, we try to shrink it from the left to find the smallest possible valid window.
        while (have === need) {
            // 1. Check if this valid window is the smallest one we've found so far.
            const currentLength = right - left + 1;
            if (currentLength < resultLength) {
                // If it is, update our result.
                result = [left, right];
                resultLength = currentLength;
            }

            // 2. Shrink the window by moving the `left` pointer to the right.
            const leftChar = s[left];
            windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);

            // 3. Check if removing the `leftChar` makes our window invalid.
            // This happens if `leftChar` was a required character AND
            // its count in our window has just dropped below the required count.
            if (tMap.has(leftChar) && windowCounts.get(leftChar) < tMap.get(leftChar)) {
                // If the window is now invalid, we decrement `have`.
                // This will break the `while` loop, and we'll go back to expanding
                // the window from the right to find a valid one again.
                have--;
            }

            // 4. Move the left pointer to officially shrink the window.
            left++;
        }
    }

    // --- Final Result ---
    // If resultLength is still Infinity, it means we never found a valid window.
    // Otherwise, slice the string `s` using our stored `result` indices.
    const [start, end] = result;
    return resultLength === Infinity ? "" : s.substring(start, end + 1);
};
