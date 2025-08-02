// https://leetcode.com/problems/permutation-in-string/
var checkInclusion = function (s1, s2) {
    // Edge case: If s1 is longer than s2, a permutation is impossible.
    if (s1.length > s2.length) {
        return false;
    }

    // Create the frequency map for s1. This part of the original logic was correct.
    const s1Map = new Map();
    for (const char of s1) {
        s1Map.set(char, (s1Map.get(char) || 0) + 1);
    }

    let left = 0; // The left pointer of our sliding window.
    let matches = 0; // Counts how many unique characters we have matched perfectly.
    const requiredMatches = s1Map.size; // The number of unique characters in s1.

    // Iterate through s2 with the right pointer of the window.
    for (let right = 0; right < s2.length; right++) {
        const rightChar = s2[right];

        // If the character entering the window (rightChar) is in our map, update its count.
        if (s1Map.has(rightChar)) {
            s1Map.set(rightChar, s1Map.get(rightChar) - 1);
            // If we've found exactly the right number of this character, we have a "match" for it.
            if (s1Map.get(rightChar) === 0) {
                matches++;
            }
        }

        // The window is the correct size, now we check for a permutation.
        // A permutation exists if we have matched all required unique characters.
        if (matches === requiredMatches) {
            return true;
        }

        // If the window has grown larger than s1's length, we must shrink it from the left.
        // This happens after the initial window is formed (i.e., right >= s1.length - 1).
        if (right >= s1.length - 1) {
            const leftChar = s2[left];
            left++; // Slide the window forward by incrementing the left pointer.

            // If the character leaving the window (leftChar) is one we were tracking...
            if (s1Map.has(leftChar)) {
                // If its count was 0, it means we had a perfect match, which we are now losing.
                // So, we decrement our total matches.
                if (s1Map.get(leftChar) === 0) {
                    matches--;
                }
                // Add the character's count back to the map, since it's no longer in the window.
                s1Map.set(leftChar, s1Map.get(leftChar) + 1);
            }
        }
    }

    // If we get through the whole string without finding a match, return false.
    return false;
};