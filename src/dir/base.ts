export const add = (...numbers: number[]) => {
    return numbers.reduce((prev: number, cur: number) => {
        return prev + cur;
    }, 0);
}

export const plus = (...numbers: number[]) => {
    return numbers.reduce((prev: number, cur: number) => {
        return prev * cur;
    }, 1);
}
