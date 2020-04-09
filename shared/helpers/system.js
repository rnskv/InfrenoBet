export function getUniqueObjectsInArray(array, key) {
    let tmpArray = [];
    function itemCheck(item) {
        if (tmpArray.indexOf(item[key]) === -1) {
            tmpArray.push(item[key]);
            return true
        }
        return false;
    }

    return array.filter((item) => itemCheck(item));
}