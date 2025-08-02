var findAnagrams = function (s, p) {
    if (s.length < p.length) return [];
    const result = [];
    const pCount = Array(26).fill(0);
    const sCount = Array(26).fill(0);
    const a = 'a'.charCodeAt(0);

    for (let i = 0; i < p.length; i++) {
        pCount[p.charCodeAt(i) - a]++;
        sCount[s.charCodeAt(i) - a]++;
    }

    if (pCount.toString() === sCount.toString()) result.push(0);

    for (let i = p.length; i < s.length; i++) {
        sCount[s.charCodeAt(i) - a]++;
        sCount[s.charCodeAt(i - p.length) - a]--;
        if (pCount.toString() === sCount.toString()) result.push(i - p.length + 1);
    }

    return result;
};