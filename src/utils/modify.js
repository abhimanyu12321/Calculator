export function ModifyOperation(str, size) {
    if (str === '*-') return str;
    else if (str === '÷-') return str;
    else if (str === '+-') return str;
    else {
        return str[size - 1]
    }
}