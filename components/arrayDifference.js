
const arrDifference = async (arr1, arr2) => {
    //1.difference([2,2,3,4],[2,3,3,4]) will return []
    //2.difference([1,2,3],[4,5,6]) will return [4,5,6]
    //3.difference([1,2,3,4],[1,2]) will return []
    //4.difference([1,2],[1,2,3,4]) will return [3,4]

    //arr1=[1,2,3,4]
    //arr2=[4,1,5,3,2]
    //return [ 5 ] 
    let setA = new Set(arr1);
    let differenceSet = new Set(arr2.filter(ele => !setA.has(ele)));
    return [...differenceSet];
}

const absDifference = async (arr1, arr2) => {
    //1.absDifference([2,2,3,4],[2,3,3,4]) will return []
    //2.absDifference([1,2,3],[4,5,6]) will return [4,5,6]
    //3.absDifference([1,2,3,4],[1,2]) will return [3,4]
    //4.absDifference([1,2],[1,2,3,4]) will return [3,4]

    const { larger, smaller } = arr1.length > arr2.length ?
        { larger: arr1, smaller: arr2 } : { larger: arr2, smaller: arr1 }

    let setA = new Set(smaller);
    let absDifferenceSet = new Set(larger.filter(ele => !setA.has(ele)));
    return [...absDifferenceSet];
}

module.exports = { arrDifference, absDifference };