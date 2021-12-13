export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
}

export function defaultCompare(a,b) {
    if(a===b) {
        return 0
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN    
}

export function defaultEquals(a,b) {
    return a === b
}

export function defaultDiff(a, b) {
    return Number(a) - Number(b);
}