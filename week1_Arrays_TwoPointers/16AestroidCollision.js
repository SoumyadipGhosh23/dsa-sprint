//https://leetcode.com/problems/asteroid-collision/
var asteroidCollision = function (asteroids) {
    const stack = [];

    // Iterate through each asteroid
    for (let i = 0; i < asteroids.length; i++) {
        let currentAst = asteroids[i];
        let survived = true; // Assume the current asteroid will survive initially

        // This while loop handles all collisions for the current asteroid.
        // A collision happens ONLY if the stack has asteroids, the current one is moving left (< 0),
        // and the one on top of the stack is moving right (> 0).
        while (stack.length > 0 && currentAst < 0 && stack[stack.length - 1] > 0) {
            const top = stack[stack.length - 1];

            // Case 1: The asteroid on top of the stack is bigger.
            if (Math.abs(top) > Math.abs(currentAst)) {
                survived = false; // The current asteroid is destroyed.
                break; // Exit the collision loop.
            }
            // Case 2: The current asteroid is bigger.
            else if (Math.abs(top) < Math.abs(currentAst)) {
                stack.pop(); // The top asteroid is destroyed. Loop continues.
            }
            // Case 3: Both are the same size.
            else {
                stack.pop(); // The top asteroid is destroyed.
                survived = false; // The current asteroid is also destroyed.
                break; // Exit the collision loop.
            }
        }

        // If the current asteroid survived all collisions, add it to the stack.
        if (survived) {
            stack.push(currentAst);
        }
    }

    return stack;
};