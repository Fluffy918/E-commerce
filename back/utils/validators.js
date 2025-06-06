/**
 * 
 * @param {string} str 
 * @param {number} len 
 * @returns {boolean}
 */

function hasMinimumLength(str, len) {
    return typeof str === 'string' && str.length >= len
}

/**
 * 
 * @param {string} email 
 * @returns {boolean}
 */

function isEmailValid(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

export default {
    hasMinimumLength,
    isEmailValid
};