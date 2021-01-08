const { assert } = require('console');

const test = id => {
    const fs = require('fs');
    fs.readFileSync('/web/test.txt');
}

/**
 * @TODO Start Test
 */
let t = test(1);
assert(t, 'hello world');