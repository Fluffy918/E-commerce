exports.isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

exports.hasMinimumLength = (str, len) => {
    return typeof str === 'string' && str.length >= len
}