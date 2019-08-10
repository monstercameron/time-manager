/**
 * @name helperFunctions
 * @description assorted helper functions
 * @param {number/string} a start of range
 * @param {number/string} b end of range
 * @param {number} step steps from start to end
 */
const bound = (a, b, step) => {
    let A = [];
    if (typeof a == 'number') {
        A[0] = a;
        step = step || 1;
        while (a + step <= b) {
            A[A.length] = a += step;
        }
    } else {
        var s = 'abcdefghijklmnopqrstuvwxyz';
        if (a === a.toUpperCase()) {
            b = b.toUpperCase();
            s = s.toUpperCase();
        }
        s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
        A = s.split('');
    }
    return A;
}
/**
 * Exports
 */
exports.module = {
    bound
}