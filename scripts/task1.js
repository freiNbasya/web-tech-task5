function concatenateString(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.slice(0, maxLength) + '...';
    }
}
const result = concatenateString('Longer than expected', 5);
console.log(result);